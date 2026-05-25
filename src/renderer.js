const APP_STATES = {
  IDLE: "idle",
};

const CAT_STATES = {
  IDLE: "idle",
};

const elements = {
  app: document.querySelector("[data-app-state]"),
  cat: document.querySelector("[data-cat-state]"),
};

function setInitialState() {
  elements.app.dataset.appState = APP_STATES.IDLE;
  elements.cat.dataset.catState = CAT_STATES.IDLE;
}

setInitialState();
