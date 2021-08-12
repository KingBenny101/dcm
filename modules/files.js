const glob = require("glob");
const fs = require("fs");

function generateFilesList() {
  var getDirectories = function (src, callback) {
    glob(src + "/**/*", callback);
  };
  getDirectories("./assets", function (err, res) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log(res);

      fs.writeFile("files.json", JSON.stringify(res), function (err) {
        if (err) throw err;
        console.log("complete");
      });
    }
  });
}

function checkFiles() {
  var results = JSON.parse(fs.readFileSync("./modules/files.json", "utf8"));
  //console.log(results);
  for (i = 0; i < results.length; i++) {
    if (fs.existsSync(results[i])) {
      continue;
    } else {
      console.log(`${results[i]} doesnt exist.`);
      return false;
    }
  }
  console.log("All files exist");
  return true;
}

function deleteFiles() {
  var results = JSON.parse(fs.readFileSync("./modules/files.json", "utf8"));
  //console.log(results);
  for (i = 0; i < results.length; i++) {
    removeDir(results[i]);
  }
  console.log("All files deleted");
}
function removeDir(path) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path);

    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename);
        } else {
          fs.unlinkSync(path + "/" + filename);
        }
      });
      fs.rmdirSync(path);
    } else {
      fs.rmdirSync(path);
    }
  } else {
    console.log("Directory path not found.");
  }
}

module.exports = { checkFiles, deleteFiles };
