const path = require("node:path");
const { app, BrowserWindow, Menu, Tray, ipcMain, nativeImage } = require("electron");

const MOUSE_EVENTS_CHANNEL = "window:set-ignore-mouse-events";
const OPEN_SETTINGS_CHANNEL = "app:open-settings";
const START_AT_LOGIN_CHANNEL = "app:set-start-at-login";
const WINDOW_SIZE_CHANNEL = "window:set-size";

let tray = null;

function registerWindowEventHandlers(mainWindow) {
  ipcMain.on(MOUSE_EVENTS_CHANNEL, (event, shouldIgnore) => {
    if (event.sender !== mainWindow.webContents || typeof shouldIgnore !== "boolean") {
      return;
    }

    mainWindow.setIgnoreMouseEvents(shouldIgnore, { forward: shouldIgnore });
  });

  ipcMain.on(WINDOW_SIZE_CHANNEL, (event, size) => {
    if (
      event.sender !== mainWindow.webContents ||
      typeof size?.width !== "number" ||
      typeof size?.height !== "number"
    ) {
      return;
    }

    mainWindow.setSize(
      Math.max(Math.round(size.width), 320),
      Math.max(Math.round(size.height), 240)
    );
  });

  ipcMain.on(START_AT_LOGIN_CHANNEL, (event, shouldOpenAtLogin) => {
    if (event.sender !== mainWindow.webContents || typeof shouldOpenAtLogin !== "boolean") {
      return;
    }

    app.setLoginItemSettings({
      openAtLogin: shouldOpenAtLogin,
      openAsHidden: false,
    });
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
    icon: path.join(__dirname, "src", "assets", "app-icon.svg"),
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

  return mainWindow;
}

function createTray(mainWindow) {
  try {
    const icon = nativeImage.createFromPath(path.join(__dirname, "src", "assets", "app-icon.svg"));

    tray = new Tray(icon);
    tray.setToolTip("나도 고양이 있어");
    tray.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: "보이기",
          click() {
            mainWindow.show();
          },
        },
        {
          label: "설정",
          click() {
            mainWindow.show();
            mainWindow.webContents.send(OPEN_SETTINGS_CHANNEL);
          },
        },
        {
          label: "숨기기",
          click() {
            mainWindow.hide();
          },
        },
        {
          label: "종료",
          click() {
            app.quit();
          },
        },
      ])
    );
  } catch {
    tray = null;
  }
}

app.whenReady().then(() => {
  const mainWindow = createMainWindow();
  createTray(mainWindow);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
