//autoUpdate and ipcRenderer stuff
window.updateVersion = function() {
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
    });
  
    console.log("UpdateVersion ran");
  }
  