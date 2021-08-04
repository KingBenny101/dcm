//autoUpdate and ipcRenderer stuff
window.updateVersion = function () {
  const { ipcRenderer, app } = require("electron");
  const version = document.getElementById("version");

  // Updates the version number from package.json
  ipcRenderer.send("app_version");
  ipcRenderer.on("app_version", (event, arg) => {
    ipcRenderer.removeAllListeners("app_version");
    version.innerText = arg.version;
  });

  // IPC events
  ipcRenderer.on("message", function (event, text) {
    var log = document.getElementById("logtext");

    log.innerHTML = text;

    console.log("Message from updater:", text);
  });

  ipcRenderer.on("continue", function (event) {

    console.log("Running downloader.js");
    const scriptPath = "./downloader.js";
    // Now we can run a script and invoke a callback when complete, e.g.
    runScript(scriptPath, function (err) {
      if (err) throw err;
      console.log("Finished running downloader.js");
    });

    window.close();
  });

  ipcRenderer.on("appQuit", function (event) {
    app.quit();
  });

  console.log("UpdateVersion ran");
};

// running downloader.js using child process

var childProcess = require("child_process");

function runScript(scriptPath, callback) {
  // keep track of whether callback has been invoked to prevent multiple invocations
  var invoked = false;

  var process = childProcess.fork(scriptPath);

  // listen for errors as they may prevent the exit event from firing
  process.on("error", function (err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  // execute the callback once the process has finished running
  process.on("exit", function (code) {
    if (invoked) return;
    invoked = true;
    var err = code === 0 ? null : new Error("exit code " + code);
    callback(err);
  });
}
