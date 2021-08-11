const { ipcRenderer, app } = require("electron");

//version update
window.updateVersion = function () {
  const version = document.getElementById("version");

  // Updates the version number from package.json
  ipcRenderer.send("app_version");
  ipcRenderer.on("app_version", (event, arg) => {
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

    console.log("Message from updater:", text);
  });

  ipcRenderer.on("continue", function (event) {
    console.log("Got Continue event");
    console.log("sending downloaded-assets");
  
    ipcRenderer.send("downloaded-assets");
      
 

  });

  ipcRenderer.on("windowQuit", function (event) {
    window.close();
  });
  console.log("ipcWrapper ran");

}
