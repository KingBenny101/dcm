const { app, BrowserWindow } = require("electron");
const path = require("path");
const { start } = require("repl");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const main = () => {
  const startWindow = new BrowserWindow({
    width: 400,
    height: 300,
    devTools: false,
    resizable: false,
    fullscreen: false,
    frame: false,
  });

  startWindow.setMenuBarVisibility(false);

  startWindow.loadFile(path.join(__dirname, "src/start.html"));

  startWindow.on("closed", () => {
    // Create the main browser window.
    const mainWindow = new BrowserWindow({
      width: 1366,
      height: 768,
      devTools: false,
      resizable: false,
      fullscreen: true,
      frame: false,
    });
    // remove the menu bar
    mainWindow.setMenuBarVisibility(false);

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "src/index.html"));
    // Open the DevTools.
    //mainWindow.webContents.openDevTools();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", main);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    main();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
