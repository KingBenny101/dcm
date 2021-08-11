const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { google } = require("googleapis");

const log = require("electron-log");

log.transports.file.level = "info";
log.transports.file.file = path
  .join(__dirname, "/../logs/log.log")
  .replace("app.asar", "app.asar.unpacked");
var folderPath = "./assets/";
var zipPath = "./assets/assets.7z";
var extractPath = "./";

//folderPath = path.join(__dirname, folderPath).replace("app.asar", "app.asar.unpacked");
//zipPath = path.join(__dirname, zipPath).replace("app.asar", "app.asar.unpacked");
//extractPath = path.join(__dirname, extractPath).replace("app.asar", "app.asar.unpacked");
folderPath = folderPath.replace("app.asar", "app.asar.unpacked");

zipPath = zipPath.replace("app.asar", "app.asar.unpacked");

extractPath = extractPath.replace("app.asar", "app.asar.unpacked");

// If modifying these scopes, delete token.json.
const SCOPES = [
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "./modules/token.json";

async function startDownloader(callback) {
  // Load client secrets from a local file.
  fs.readFile("./modules/credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Drive API.

    assetsDownloader(content, callback);
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, cback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, cback);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
// function listFiles(auth) {
//   const drive = google.drive({ version: "v3", auth });
//   drive.files.list(
//     {
//       pageSize: 10,
//       fields: "nextPageToken, files(id, name)",
//     },
//     (err, res) => {
//       if (err) return console.log("The API returned an error: " + err);
//       const files = res.data.files;
//       if (files.length) {
//         console.log("Files:");
//         files.map((file) => {
//           console.log(`${file.name} (${file.id})`);
//         });
//       } else {
//         console.log("No files found.");
//       }
//     }
//   );
// }

function downloadFile(auth, callback) {
  const drive = google.drive({ version: "v3", auth });
  var fileId = "1YyjxJDo5X9k31Bb0DqBeedm5mk5-r2k2";

  var dest = fs.createWriteStream(zipPath);

  drive.files.get(
    {
      fileId: fileId,
      alt: "media",
    },
    { responseType: "stream" },
    (err, res) => {
      res.data
        .on("end", () => {
          console.log("Done");
          log.info("Done");
          var stats = fs.statSync(zipPath);
          var fileSizeInBytes = stats.size;
          console.log(fileSizeInBytes);
          log.info(fileSizeInBytes);
          console.log("Extracting");
          log.info("Extracting");

          extractFile(callback);
        })
        .on("error", () => {
          console.log("Error", err);
          log.error(err);
        })
        .pipe(dest);
    }
  );
}

function extractFile(callback) {
  const sevenBin = require("7zip-bin");
  const { extractFull } = require("node-7z");
  const pathTo7zip = sevenBin.path7za;
  const myStream = extractFull(zipPath, extractPath, {
    $bin: pathTo7zip,
    //$progress: true,
  });

  // myStream.on("progress", function (progress) {
  //   console.log(progress.percent);
  //   log.info(progress.percent); //? { percent: 67, fileCount: 5, file: undefinded }
  // });

  myStream.on("end", function () {
    console.log("Extracted the files.");
    log.info("Extracted the files");
    console.log("Deleting ZIP");
    log.info("Deleting ZIP");

    fs.unlinkSync(zipPath);
    callback();
  });

  myStream.on("error", (err) => {
    console.error(err);
    log.error(err);
  });
}

function assetsDownloader(content, callback) {
  const { checkFiles } = require("./files.js");
  if (checkFiles()) {
    console.log("The files exist.");
    log.info("The files exist");
    callback();
  } else if (fs.existsSync(zipPath)) {
    console.log("ZIP exists, so extracting");
    log.info("ZIP exists, so extracting");

    extractFile(callback);
  } else {
    console.log("Downloading Files, Please wait.");
    log.info("Downloading Files, Please wait.");

    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), downloadFile, callback);
  }
}

module.exports = { startDownloader };
