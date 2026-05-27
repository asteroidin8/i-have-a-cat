const { contextBridge, ipcRenderer } = require("electron");

const OPEN_SETTINGS_CHANNEL = "app:open-settings";
const START_AT_LOGIN_CHANNEL = "app:set-start-at-login";
const MOUSE_EVENTS_CHANNEL = "window:set-ignore-mouse-events";
const WINDOW_SIZE_CHANNEL = "window:set-size";

contextBridge.exposeInMainWorld("catWindow", {
  onOpenSettings(callback) {
    ipcRenderer.on(OPEN_SETTINGS_CHANNEL, callback);
  },
  setStartAtLogin(shouldOpenAtLogin) {
    ipcRenderer.send(START_AT_LOGIN_CHANNEL, shouldOpenAtLogin);
  },
  setIgnoreMouseEvents(shouldIgnore) {
    ipcRenderer.send(MOUSE_EVENTS_CHANNEL, shouldIgnore);
  },
  setWindowSize(size) {
    ipcRenderer.send(WINDOW_SIZE_CHANNEL, size);
  },
});
