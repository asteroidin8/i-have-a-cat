const path = require("node:path");
const { app, BrowserWindow, ipcMain } = require("electron");

const MOUSE_EVENTS_CHANNEL = "window:set-ignore-mouse-events";

function registerWindowEventHandlers(mainWindow) {
  ipcMain.on(MOUSE_EVENTS_CHANNEL, (event, shouldIgnore) => {
    if (event.sender !== mainWindow.webContents || typeof shouldIgnore !== "boolean") {
      return;
    }

    mainWindow.setIgnoreMouseEvents(shouldIgnore, { forward: shouldIgnore });
  });
}

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 320,
    minHeight: 240,
    frame: false,
    resizable: true,
    transparent: true,
    backgroundColor: "#00000000",
    alwaysOnTop: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "src", "preload.js"),
    },
  });

  registerWindowEventHandlers(mainWindow);
  mainWindow.setIgnoreMouseEvents(true, { forward: true });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
}

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
