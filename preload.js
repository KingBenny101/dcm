const downloader = require('./downloader.js');

//autoUpdate and ipcRenderer stuff
window.updateVersion = function () {
  const { ipcRenderer } = require("electron");
  const version = document.getElementById("version");

  ipcRenderer.send("app_version");
  ipcRenderer.on("app_version", (event, arg) => {
    ipcRenderer.removeAllListeners("app_version");
    version.innerText = arg.version;
  });

  ipcRenderer.on("message", function (event, text) {
    var log = document.getElementById("logtext");

    log.innerHTML = text;

    console.log("Message from updater:", text);

    if(text == 'Update not available.'){
        setTimeout(function(){
            window.close();
            window.close();

        },2500);
    }

    if(text == 'Error in auto-updater: Try again later.'){
        setTimeout(function(){
            window.close();
            window.close();
        },2500);
    }

  });

  console.log("UpdateVersion ran");
  downloader.assetsDownloader();

};
