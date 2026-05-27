const { contextBridge, ipcRenderer } = require("electron");

const MOUSE_EVENTS_CHANNEL = "window:set-ignore-mouse-events";

contextBridge.exposeInMainWorld("catWindow", {
  setIgnoreMouseEvents(shouldIgnore) {
    ipcRenderer.send(MOUSE_EVENTS_CHANNEL, shouldIgnore);
  },
});
