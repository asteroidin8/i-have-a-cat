const {
  APP_STATES,
  CAT_BREEDS,
  CAT_DIRECTIONS,
  CAT_EYE_COLORS,
  CAT_FUR_COLORS,
  CAT_PERSONALITIES,
  CAT_POINTER_STATES,
  DEFAULT_CAT_RENDERER_ID,
  CAT_STATES,
  DEFAULT_BREED_ID,
  DEFAULT_EYE_COLOR_ID,
  DEFAULT_FUR_COLOR_ID,
  DEFAULT_PERSONALITY_ID,
  IDLE_ACTION_IDS,
  MOUSE_GAZE_CONFIG,
  MOVEMENT_CONFIG,
  PERSONALITY_IDS,
  SCREEN_AWARENESS_CONFIG,
  SOUND_CONFIG,
  STATE_TRANSITION_CONFIG,
  clampValue,
} = window.CatConfig;

const elements = {
  app: document.querySelector("[data-app-state]"),
  stage: document.querySelector(".cat-stage"),
  cat: document.querySelector("[data-cat-state]"),
  controls: document.querySelector(".cat-controls"),
  resizeHandle: document.querySelector("[data-window-resize]"),
  settingsButton: document.querySelector("[data-settings-button]"),
  setupPanel: document.querySelector("[data-setup-panel]"),
  setupSubmit: document.querySelector("[data-setup-submit]"),
  soundToggle: document.querySelector("[data-sound-toggle]"),
  startAtLoginToggle: document.querySelector("[data-start-at-login-toggle]"),
  toolbar: document.querySelector("[data-window-toolbar]"),
  volumeInput: document.querySelector("[data-volume-input]"),
  nameInput: document.querySelector("[data-cat-name-input]"),
  nameLabel: document.querySelector("[data-cat-name-label]"),
  breedSelect: document.querySelector("[data-cat-breed-select]"),
  eyeColorSelect: document.querySelector("[data-cat-eye-color-select]"),
  furColorSelect: document.querySelector("[data-cat-fur-color-select]"),
  personalitySelect: document.querySelector("[data-cat-personality-select]"),
};

const timers = {
  movement: null,
  randomMovement: null,
  rub: null,
  run: null,
  startled: null,
  turnPause: null,
  turn: null,
  affectionateApproach: null,
  coyAvoid: null,
  hesitation: null,
  pause: null,
  playful: null,
  directedMovement: null,
  gaze: null,
  stateTransition: null,
};

const reactionTimestamps = {
  lastAffectionateApproach: 0,
  lastCoyAvoid: 0,
  lastPause: 0,
  lastPlayfulChase: 0,
  lastRunReaction: 0,
  movementRestUntil: 0,
};

const mouseState = {
  position: {
    x: 0,
    y: 0,
  },
  distanceToCat: null,
  isInsideWindow: false,
  lastTimestamp: null,
  nearCatSinceTimestamp: null,
  pendingGazeDirection: null,
  speed: 0,
};

const pettingState = {
  isDragging: false,
  isPetting: false,
  hasResolvedInteraction: false,
  hasTriggeredCoyOvercontact: false,
  lastPosition: {
    x: 0,
    y: 0,
  },
  totalDragDistance: 0,
};

const windowResizeState = {
  height: 0,
  isDragging: false,
  pointerId: null,
  startX: 0,
  startY: 0,
  width: 0,
};

const behaviorState = {
  lastBehaviorKind: null,
  lastBehaviorKindTimestamp: 0,
  lastIdleActionId: null,
  lastIdleActionTimestamp: 0,
  lastInteractionTimestamp: Date.now(),
  lingerStartTimestamp: null,
};

const performanceState = {
  pointerFrameId: null,
  pendingPointerEvent: null,
};

let isIgnoringMouseEvents = true;
let isApplyingStoredProfile = false;
let audioContext = null;

const catProfile = window.CatStorage.getDefaultCatProfile();

function setCatState(catState) {
  if (elements.cat.dataset.catState === catState) {
    return;
  }

  startStateTransition();
  elements.cat.dataset.catState = catState;

  if (catState !== CAT_STATES.IDLE && catState !== CAT_STATES.SLEEP) {
    setCatIdleAction("");
  }
}

function startStateTransition() {
  window.clearTimeout(timers.stateTransition);
  elements.cat.style.setProperty(
    "--state-transition-duration",
    `${STATE_TRANSITION_CONFIG.DURATION_MS}ms`
  );
  elements.cat.style.setProperty("--state-transition-easing", STATE_TRANSITION_CONFIG.EASING);
  elements.cat.dataset.catStateTransition = "true";
  timers.stateTransition = window.setTimeout(() => {
    elements.cat.dataset.catStateTransition = "false";
  }, STATE_TRANSITION_CONFIG.DURATION_MS);
}

function getCatState() {
  return elements.cat.dataset.catState;
}

function setCatDirection(direction) {
  if (elements.cat.dataset.catDirection === direction) {
    return;
  }

  window.clearTimeout(timers.turn);
  elements.cat.dataset.catTurning = "true";
  elements.cat.dataset.catDirection = direction;
  timers.turn = window.setTimeout(() => {
    elements.cat.dataset.catTurning = "false";
  }, MOVEMENT_CONFIG.TURN_FRAME_MS);
}

function setCatIdleAction(idleActionId) {
  elements.cat.dataset.catIdleAction = idleActionId;
}

function setCatPausing(isPausing) {
  elements.cat.dataset.catPausing = String(isPausing);
}

function setCatPointerState(pointerState) {
  elements.cat.dataset.catPointerState = pointerState;
}

function setCatUserIdle(isUserIdle) {
  elements.cat.dataset.catUserIdle = String(isUserIdle);
}

function setCatHesitating(isHesitating) {
  elements.cat.dataset.catHesitating = String(isHesitating);
}

function isCatHesitating() {
  return elements.cat.dataset.catHesitating === "true";
}

function isCatPausing() {
  return elements.cat.dataset.catPausing === "true";
}

function saveCatProfile() {
  if (!isApplyingStoredProfile) {
    window.CatStorage.saveCatProfile(catProfile);
  }
}

function applyStoredCatProfile() {
  isApplyingStoredProfile = true;
  Object.assign(catProfile, window.CatStorage.loadStoredCatProfile());
  isApplyingStoredProfile = false;
}

function setCatName(name, { syncInput = true } = {}) {
  catProfile.name = window.CatStorage.normalizeCatName(name);
  elements.cat.dataset.catName = catProfile.name;
  elements.cat.setAttribute("aria-label", catProfile.name);
  elements.nameLabel.textContent = catProfile.name;

  if (syncInput) {
    elements.nameInput.value = catProfile.name;
  }

  saveCatProfile();
}

function setCatBreed(breedId) {
  catProfile.breedId = CAT_BREEDS[breedId] ? breedId : DEFAULT_BREED_ID;
  elements.cat.dataset.catBreed = catProfile.breedId;
  elements.breedSelect.value = catProfile.breedId;
  saveCatProfile();
}

function setCatEyeColor(eyeColorId) {
  catProfile.eyeColorId = CAT_EYE_COLORS[eyeColorId] ? eyeColorId : DEFAULT_EYE_COLOR_ID;
  elements.cat.dataset.catEyeColor = catProfile.eyeColorId;
  elements.cat.style.setProperty("--cat-eye", CAT_EYE_COLORS[catProfile.eyeColorId].value);
  elements.eyeColorSelect.value = catProfile.eyeColorId;
  saveCatProfile();
}

function setCatFurColor(furColorId) {
  catProfile.furColorId = CAT_FUR_COLORS[furColorId] ? furColorId : DEFAULT_FUR_COLOR_ID;
  elements.cat.dataset.catFurColor = catProfile.furColorId;
  elements.cat.style.setProperty("--cat-fur", CAT_FUR_COLORS[catProfile.furColorId].fur);
  elements.cat.style.setProperty("--cat-ear", CAT_FUR_COLORS[catProfile.furColorId].ear);
  elements.cat.style.setProperty("--cat-cream", CAT_FUR_COLORS[catProfile.furColorId].cream);
  elements.cat.style.setProperty("--cat-shadow", CAT_FUR_COLORS[catProfile.furColorId].shadow);
  elements.furColorSelect.value = catProfile.furColorId;
  saveCatProfile();
}

function getActivePersonality() {
  return CAT_PERSONALITIES[catProfile.personalityId] ?? CAT_PERSONALITIES[DEFAULT_PERSONALITY_ID];
}

function getPersonalityInteraction() {
  return getActivePersonality().interaction;
}

function getPersonalityMovement() {
  return getActivePersonality().movement;
}

function setCatPersonality(personalityId) {
  catProfile.personalityId = CAT_PERSONALITIES[personalityId]
    ? personalityId
    : DEFAULT_PERSONALITY_ID;
  elements.cat.dataset.catPersonality = getActivePersonality().id;
  elements.personalitySelect.value = getActivePersonality().id;
  saveCatProfile();
}

function setSoundEnabled(isEnabled) {
  catProfile.soundEnabled = Boolean(isEnabled);
  elements.soundToggle.checked = catProfile.soundEnabled;
  saveCatProfile();
}

function setVolume(volume) {
  catProfile.volume = clampValue(Number(volume), SOUND_CONFIG.MIN_VOLUME, SOUND_CONFIG.MAX_VOLUME);
  elements.volumeInput.value = String(catProfile.volume);
  saveCatProfile();
}

function setStartAtLogin(isEnabled) {
  catProfile.startAtLogin = Boolean(isEnabled);
  elements.startAtLoginToggle.checked = catProfile.startAtLogin;
  window.catWindow.setStartAtLogin(catProfile.startAtLogin);
  saveCatProfile();
}

function getAudioContext() {
  if (!audioContext) {
    audioContext = new window.AudioContext();
  }

  return audioContext;
}

function playSound(kind) {
  if (!catProfile.soundEnabled) {
    return;
  }

  const context = getAudioContext();
  const gain = context.createGain();
  const oscillator = context.createOscillator();
  const soundMap = {
    purr: { frequency: 92, duration: 0.22, type: "sine" },
    step: { frequency: 180, duration: 0.05, type: "square" },
    startled: { frequency: 420, duration: 0.12, type: "triangle" },
  };
  const sound = soundMap[kind] ?? soundMap.purr;

  oscillator.type = sound.type;
  oscillator.frequency.value = sound.frequency;
  gain.gain.value = catProfile.volume * 0.12;
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + sound.duration);
}

function getCatScreenEdge(position, bounds) {
  const edgeDistances = [
    { id: "left", distance: position.x - bounds.minX },
    { id: "right", distance: bounds.maxX - position.x },
    { id: "top", distance: position.y - bounds.minY },
    { id: "bottom", distance: bounds.maxY - position.y },
  ].filter((edge) => edge.distance <= SCREEN_AWARENESS_CONFIG.EDGE_PADDING);

  if (edgeDistances.length === 0) {
    return "none";
  }

  edgeDistances.sort((firstEdge, secondEdge) => firstEdge.distance - secondEdge.distance);

  return edgeDistances[0].id;
}

function getMouseGazeDirection(catCenter) {
  if (mouseState.distanceToCat > MOUSE_GAZE_CONFIG.AWARENESS_DISTANCE) {
    return "none";
  }

  const offsetX = mouseState.position.x - catCenter.x;
  const offsetY = mouseState.position.y - catCenter.y;

  if (
    Math.abs(offsetX) <= MOUSE_GAZE_CONFIG.AXIS_DEAD_ZONE &&
    Math.abs(offsetY) <= MOUSE_GAZE_CONFIG.AXIS_DEAD_ZONE
  ) {
    return "center";
  }

  if (Math.abs(offsetX) >= Math.abs(offsetY)) {
    return offsetX < 0 ? "left" : "right";
  }

  return offsetY < 0 ? "up" : "down";
}

function getCatCenterPosition() {
  const catRect = elements.cat.getBoundingClientRect();

  return {
    x: catRect.left + catRect.width / 2,
    y: catRect.top + catRect.height / 2,
  };
}

function getDistanceBetweenPoints(firstPoint, secondPoint) {
  return Math.hypot(firstPoint.x - secondPoint.x, firstPoint.y - secondPoint.y);
}

function updateMouseDistanceToCat() {
  if (!mouseState.isInsideWindow) {
    mouseState.distanceToCat = null;
    setCatGazeDirection("none", { immediate: true });
    return;
  }

  const catCenter = getCatCenterPosition();
  mouseState.distanceToCat = getDistanceBetweenPoints(mouseState.position, catCenter);
  setCatGazeDirection(getMouseGazeDirection(catCenter));
}

function setCatGazeDirection(gazeDirection, { immediate = false } = {}) {
  if (immediate || gazeDirection === "none") {
    window.clearTimeout(timers.gaze);
    mouseState.pendingGazeDirection = null;
    elements.cat.dataset.catGaze = gazeDirection;
    return;
  }

  if (
    elements.cat.dataset.catGaze === gazeDirection ||
    mouseState.pendingGazeDirection === gazeDirection
  ) {
    return;
  }

  window.clearTimeout(timers.gaze);
  mouseState.pendingGazeDirection = gazeDirection;
  timers.gaze = window.setTimeout(() => {
    elements.cat.dataset.catGaze = gazeDirection;
    mouseState.pendingGazeDirection = null;
  }, MOUSE_GAZE_CONFIG.DIRECTION_DELAY_MS);
}

function setMouseEventPassThrough(shouldIgnore) {
  if (isIgnoringMouseEvents === shouldIgnore) {
    return;
  }

  isIgnoringMouseEvents = shouldIgnore;
  window.catWindow.setIgnoreMouseEvents(shouldIgnore);
}

function setAppState(appState) {
  elements.app.dataset.appState = appState;
  setMouseEventPassThrough(appState !== APP_STATES.SETUP);
}

function isSetupOpen() {
  return elements.app.dataset.appState === APP_STATES.SETUP;
}

function setInitialState() {
  setAppState(APP_STATES.SETUP);
  setCatName(catProfile.name);
  setCatBreed(catProfile.breedId);
  setCatEyeColor(catProfile.eyeColorId);
  setCatFurColor(catProfile.furColorId);
  setCatState(CAT_STATES.IDLE);
  setCatIdleAction(IDLE_ACTION_IDS.SIT);
  elements.cat.dataset.catDirection = CAT_DIRECTIONS.RIGHT;
  elements.cat.dataset.catTurnPause = "false";
  elements.cat.dataset.catTurning = "false";
  setCatPersonality(catProfile.personalityId);
  setSoundEnabled(catProfile.soundEnabled);
  setVolume(catProfile.volume);
  setStartAtLogin(catProfile.startAtLogin);
  elements.cat.dataset.catRenderer = DEFAULT_CAT_RENDERER_ID;
  elements.cat.style.setProperty(
    "--cat-gaze-transition-duration",
    `${MOUSE_GAZE_CONFIG.TRANSITION_MS}ms`
  );
  elements.cat.dataset.catGaze = "none";
  elements.cat.dataset.catHesitating = "false";
  elements.cat.dataset.catPausing = "false";
  elements.cat.dataset.catPointerState = CAT_POINTER_STATES.OUTSIDE;
  elements.cat.dataset.catPetting = "false";
  elements.cat.dataset.catScreenEdge = "none";
  elements.cat.dataset.catStateTransition = "false";
  elements.cat.dataset.catUserIdle = "false";
}

function isAffectionatePersonality() {
  return getActivePersonality().id === PERSONALITY_IDS.AFFECTIONATE;
}

function isCoyPersonality() {
  return getActivePersonality().id === PERSONALITY_IDS.COY;
}

function isTimidPersonality() {
  return getActivePersonality().id === PERSONALITY_IDS.TIMID;
}

function isRelaxedPersonality() {
  return getActivePersonality().id === PERSONALITY_IDS.RELAXED;
}

function isPlayfulPersonality() {
  return getActivePersonality().id === PERSONALITY_IDS.PLAYFUL;
}

window.CatState = {
  behaviorState,
  catProfile,
  elements,
  mouseState,
  performanceState,
  pettingState,
  reactionTimestamps,
  timers,
  windowResizeState,
  applyStoredCatProfile,
  getActivePersonality,
  getCatCenterPosition,
  getCatScreenEdge,
  getCatState,
  getDistanceBetweenPoints,
  getPersonalityInteraction,
  getPersonalityMovement,
  isAffectionatePersonality,
  isCatHesitating,
  isCatPausing,
  isCoyPersonality,
  isPlayfulPersonality,
  isRelaxedPersonality,
  isSetupOpen,
  isTimidPersonality,
  playSound,
  setAppState,
  setCatBreed,
  setCatDirection,
  setCatEyeColor,
  setCatFurColor,
  setCatHesitating,
  setCatIdleAction,
  setCatName,
  setCatPausing,
  setCatPersonality,
  setCatState,
  setInitialState,
  setMouseEventPassThrough,
  setCatPointerState,
  setSoundEnabled,
  setStartAtLogin,
  setCatUserIdle,
  setVolume,
  updateMouseDistanceToCat,
};
