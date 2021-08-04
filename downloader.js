const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const { Seven } = require("node-7z");
const sevenBin = require("7zip-bin");
const { extractFull } = require("node-7z");

// If modifying these scopes, delete token.json.
const SCOPES = [
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.
fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Google Drive API.

  assetsDownloader(content);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
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
    callback(oAuth2Client);
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
function listFiles(auth) {
  const drive = google.drive({ version: "v3", auth });
  drive.files.list(
    {
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const files = res.data.files;
      if (files.length) {
        console.log("Files:");
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log("No files found.");
      }
    }
  );
}

async function downloadFile(auth) {
  const drive = google.drive({ version: "v3", auth });
  var fileId = "1YyjxJDo5X9k31Bb0DqBeedm5mk5-r2k2";

  var dest = fs.createWriteStream("./assets.7z");

  drive.files.get({ 
    fileId: fileId, alt: "media" 
  },{responseType: 'stream'},(err,res)=>{
    res.data
    .on("end", () => {
      console.log("Done");
      console.log("Extracting");
      extractFile();
    })
    .on("error", () => {
      console.log("Error", err);
    })
    .pipe(dest);

  });


}

function extractFile() {
  const pathTo7zip = sevenBin.path7za;
  const myStream = extractFull("./assets.7z", "./src/", {
    $bin: pathTo7zip,
    $progress: true,
  });

  myStream.on("progress", function (progress) {
    console.log(progress.percent); //? { percent: 67, fileCount: 5, file: undefinded }
  });

  myStream.on("end", function () {
    console.log("Extracted the files.");
    console.log("Deleting ZIP");
    const zipPath = "./assets.7z";

    fs.unlinkSync(zipPath);
  });

  myStream.on("error", (err) => console.error(err));
}

function assetsDownloader(content) {
  const assetsPath = "./src/assets";
  const zipPath = "./assets.7z";
  if (fs.existsSync(assetsPath)) {
    console.log("The files exist.");
  } else if (fs.existsSync(zipPath)) {
    console.log("ZIP exists, so extracting");
    extractFile();
  } else {
    console.log("Downloading Files, Please wait.");
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), downloadFile);
  }
}

module.exports = { assetsDownloader };