const { ipcRenderer, app } = require("electron");

//version update
window.updateVersion = function () {
  const version = document.getElementById("version");

  // Updates the version number from package.json
  ipcRenderer.send("appVersion");
  ipcRenderer.on("appVersion", (event, arg) => {
    ipcRenderer.removeAllListeners("app_version");
    version.innerText = arg.version;
  });


  console.log("UpdateVersion ran");
};

window.getPath = function(){
  const path = require("path");
  var dirPath = path.join(__dirname,"/assets");
  var temp = dirPath.split("modules");
  dirPath = temp[0] + "assets";
  return dirPath;
}


//ipc stuff
window.ipcWrapper = function (){

  // IPC events
  ipcRenderer.on("message", function (event, text) {
    var log = document.getElementById("logtext");

    log.innerHTML = text;

    console.log("Message from Main:", text);
  });

  ipcRenderer.on("loadedAssets", function (event) {
  
    ipcRenderer.send("launchApp");
      
  });

  ipcRenderer.on("windowQuit", function (event) {
    window.close();
  });
  console.log("ipcWrapper ran");

}
