const APP_STATES = {
  IDLE: "idle",
};

const CAT_STATES = {
  IDLE: "idle",
  RUB: "rub",
  RUN: "run",
  SLEEP: "sleep",
  STARTLED: "startled",
  WALK: "walk",
};

const CAT_POINTER_STATES = {
  OUTSIDE: "outside",
  HOVER: "hover",
  PRESS: "press",
};

const CAT_DIRECTIONS = {
  LEFT: "left",
  RIGHT: "right",
};

const PERSONALITY_IDS = {
  AFFECTIONATE: "affectionate",
  COY: "coy",
  TIMID: "timid",
  RELAXED: "relaxed",
  PLAYFUL: "playful",
};

const MOVEMENT_CONFIG = {
  INTERVAL_MS: 4000,
  TRANSITION_MS: 1200,
};

const PETTING_CONFIG = {
  MIN_DRAG_DISTANCE: 24,
  RUB_DURATION_MS: 1400,
};

const STARTLED_CONFIG = {
  APPROACH_DISTANCE: 120,
  RUN_DISTANCE: 180,
  RUN_DURATION_MS: 700,
  STARTLED_DURATION_MS: 280,
  TRIGGER_SPEED: 0.9,
};

const AFFECTIONATE_CONFIG = {
  APPROACH_DISTANCE: 220,
  APPROACH_STEP_DISTANCE: 70,
  APPROACH_COOLDOWN_MS: 1800,
  LINGER_DISTANCE: 150,
};

const COY_CONFIG = {
  AVOID_DISTANCE: 140,
  AVOID_STEP_DISTANCE: 90,
  AVOID_COOLDOWN_MS: 2200,
  OVERCONTACT_DRAG_DISTANCE: 72,
};

const TIMID_CONFIG = {
  CORNER_MOVE_CHANCE: 0.65,
  CORNER_PADDING: 32,
  SLOW_PETTING_SPEED: 0.35,
  SLOW_PETTING_RUB_BONUS: 0.3,
  FAST_PETTING_RUB_PENALTY: 0.25,
};

const RELAXED_CONFIG = {
  PETTING_REST_DURATION_MULTIPLIER: 1.25,
};

const PLAYFUL_CONFIG = {
  CHASE_DISTANCE: 260,
  CHASE_STEP_DISTANCE: 130,
  CHASE_COOLDOWN_MS: 1200,
  IDLE_HOP_CHANCE: 0.45,
  IDLE_HOP_DURATION_MS: 420,
};

const CAT_PROFILE_CONFIG = {
  DEFAULT_NAME: "고양이",
  MAX_NAME_LENGTH: 16,
};

const CAT_BREED_IDS = {
  DOMESTIC: "domestic",
  FOLD: "fold",
  BOBTAIL: "bobtail",
};

const DEFAULT_BREED_ID = CAT_BREED_IDS.DOMESTIC;

const CAT_BREEDS = {
  [CAT_BREED_IDS.DOMESTIC]: {
    id: CAT_BREED_IDS.DOMESTIC,
    name: "코리안 숏헤어",
  },
  [CAT_BREED_IDS.FOLD]: {
    id: CAT_BREED_IDS.FOLD,
    name: "폴드",
  },
  [CAT_BREED_IDS.BOBTAIL]: {
    id: CAT_BREED_IDS.BOBTAIL,
    name: "짧은 꼬리",
  },
};

const CAT_EYE_COLOR_IDS = {
  GREEN: "green",
  GOLD: "gold",
  BLUE: "blue",
};

const DEFAULT_EYE_COLOR_ID = CAT_EYE_COLOR_IDS.GREEN;

const CAT_EYE_COLORS = {
  [CAT_EYE_COLOR_IDS.GREEN]: {
    id: CAT_EYE_COLOR_IDS.GREEN,
    name: "초록",
    value: "#2a9d8f",
  },
  [CAT_EYE_COLOR_IDS.GOLD]: {
    id: CAT_EYE_COLOR_IDS.GOLD,
    name: "금색",
    value: "#e9c46a",
  },
  [CAT_EYE_COLOR_IDS.BLUE]: {
    id: CAT_EYE_COLOR_IDS.BLUE,
    name: "파랑",
    value: "#457b9d",
  },
};

const CAT_FUR_COLOR_IDS = {
  ORANGE: "orange",
  GRAY: "gray",
  CREAM: "cream",
};

const DEFAULT_FUR_COLOR_ID = CAT_FUR_COLOR_IDS.ORANGE;

const CAT_FUR_COLORS = {
  [CAT_FUR_COLOR_IDS.ORANGE]: {
    id: CAT_FUR_COLOR_IDS.ORANGE,
    name: "주황",
    fur: "#f4a261",
    ear: "#e76f51",
    shadow: "#c96f3f",
  },
  [CAT_FUR_COLOR_IDS.GRAY]: {
    id: CAT_FUR_COLOR_IDS.GRAY,
    name: "회색",
    fur: "#adb5bd",
    ear: "#6c757d",
    shadow: "#868e96",
  },
  [CAT_FUR_COLOR_IDS.CREAM]: {
    id: CAT_FUR_COLOR_IDS.CREAM,
    name: "크림",
    fur: "#f1dca7",
    ear: "#d9a76c",
    shadow: "#c6a15b",
  },
};

const DEFAULT_PERSONALITY_ID = PERSONALITY_IDS.AFFECTIONATE;

const CAT_PERSONALITIES = {
  [PERSONALITY_IDS.AFFECTIONATE]: {
    id: PERSONALITY_IDS.AFFECTIONATE,
    name: "애교쟁이",
    movement: {
      intervalMultiplier: 0.9,
      idleWeight: 1,
      walkWeight: 1.1,
      sleepWeight: 0.2,
    },
    interaction: {
      approachChance: 0.7,
      rubChance: 0.85,
      runChance: 0.1,
      startledSensitivity: 0.75,
      rubDurationMultiplier: 1.25,
    },
  },
  [PERSONALITY_IDS.COY]: {
    id: PERSONALITY_IDS.COY,
    name: "새침이",
    movement: {
      intervalMultiplier: 1,
      idleWeight: 1.1,
      walkWeight: 0.8,
      sleepWeight: 0.3,
    },
    interaction: {
      approachChance: 0.25,
      rubChance: 0.45,
      runChance: 0.35,
      startledSensitivity: 1,
      rubDurationMultiplier: 0.75,
    },
  },
  [PERSONALITY_IDS.TIMID]: {
    id: PERSONALITY_IDS.TIMID,
    name: "겁쟁이",
    movement: {
      intervalMultiplier: 0.85,
      idleWeight: 0.9,
      walkWeight: 1.2,
      sleepWeight: 0.15,
    },
    interaction: {
      approachChance: 0.1,
      rubChance: 0.35,
      runChance: 0.8,
      startledSensitivity: 1.35,
      rubDurationMultiplier: 0.9,
    },
  },
  [PERSONALITY_IDS.RELAXED]: {
    id: PERSONALITY_IDS.RELAXED,
    name: "느긋이",
    movement: {
      intervalMultiplier: 1.5,
      idleWeight: 1.4,
      walkWeight: 0.45,
      sleepWeight: 0.85,
    },
    interaction: {
      approachChance: 0.25,
      rubChance: 0.65,
      runChance: 0.08,
      startledSensitivity: 0.6,
      rubDurationMultiplier: 1.1,
    },
  },
  [PERSONALITY_IDS.PLAYFUL]: {
    id: PERSONALITY_IDS.PLAYFUL,
    name: "장난꾸러기",
    movement: {
      intervalMultiplier: 0.65,
      idleWeight: 0.65,
      walkWeight: 1.35,
      sleepWeight: 0.1,
    },
    interaction: {
      approachChance: 0.6,
      rubChance: 0.55,
      runChance: 0.2,
      startledSensitivity: 0.95,
      rubDurationMultiplier: 0.9,
    },
  },
};

const elements = {
  app: document.querySelector("[data-app-state]"),
  stage: document.querySelector(".cat-stage"),
  cat: document.querySelector("[data-cat-state]"),
  controls: document.querySelector(".cat-controls"),
  nameInput: document.querySelector("[data-cat-name-input]"),
  nameLabel: document.querySelector("[data-cat-name-label]"),
  breedSelect: document.querySelector("[data-cat-breed-select]"),
  eyeColorSelect: document.querySelector("[data-cat-eye-color-select]"),
  furColorSelect: document.querySelector("[data-cat-fur-color-select]"),
  personalitySelect: document.querySelector("[data-cat-personality-select]"),
};

let isIgnoringMouseEvents = true;
let movementTimeoutId = null;
let rubTimeoutId = null;
let runTimeoutId = null;
let startledTimeoutId = null;
let affectionateApproachTimeoutId = null;
let coyAvoidTimeoutId = null;
let playfulTimeoutId = null;
let lastAffectionateApproachTimestamp = 0;
let lastCoyAvoidTimestamp = 0;
let lastPlayfulChaseTimestamp = 0;
const mouseState = {
  position: {
    x: 0,
    y: 0,
  },
  distanceToCat: null,
  isInsideWindow: false,
  lastTimestamp: null,
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
const catProfile = {
  breedId: DEFAULT_BREED_ID,
  eyeColorId: DEFAULT_EYE_COLOR_ID,
  furColorId: DEFAULT_FUR_COLOR_ID,
  name: CAT_PROFILE_CONFIG.DEFAULT_NAME,
  personalityId: DEFAULT_PERSONALITY_ID,
};

function clampValue(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setCatState(catState) {
  elements.cat.dataset.catState = catState;
}

function getCatState() {
  return elements.cat.dataset.catState;
}

function setCatDirection(direction) {
  elements.cat.dataset.catDirection = direction;
}

function normalizeCatName(name) {
  const normalizedName = name.trim().slice(0, CAT_PROFILE_CONFIG.MAX_NAME_LENGTH);

  return normalizedName || CAT_PROFILE_CONFIG.DEFAULT_NAME;
}

function setCatName(name, { syncInput = true } = {}) {
  catProfile.name = normalizeCatName(name);
  elements.cat.dataset.catName = catProfile.name;
  elements.cat.setAttribute("aria-label", catProfile.name);
  elements.nameLabel.textContent = catProfile.name;

  if (syncInput) {
    elements.nameInput.value = catProfile.name;
  }
}

function setCatBreed(breedId) {
  catProfile.breedId = CAT_BREEDS[breedId] ? breedId : DEFAULT_BREED_ID;
  elements.cat.dataset.catBreed = catProfile.breedId;
  elements.breedSelect.value = catProfile.breedId;
}

function setCatEyeColor(eyeColorId) {
  catProfile.eyeColorId = CAT_EYE_COLORS[eyeColorId] ? eyeColorId : DEFAULT_EYE_COLOR_ID;
  elements.cat.dataset.catEyeColor = catProfile.eyeColorId;
  elements.cat.style.setProperty("--cat-eye", CAT_EYE_COLORS[catProfile.eyeColorId].value);
  elements.eyeColorSelect.value = catProfile.eyeColorId;
}

function setCatFurColor(furColorId) {
  catProfile.furColorId = CAT_FUR_COLORS[furColorId] ? furColorId : DEFAULT_FUR_COLOR_ID;
  elements.cat.dataset.catFurColor = catProfile.furColorId;
  elements.cat.style.setProperty("--cat-fur", CAT_FUR_COLORS[catProfile.furColorId].fur);
  elements.cat.style.setProperty("--cat-ear", CAT_FUR_COLORS[catProfile.furColorId].ear);
  elements.cat.style.setProperty("--cat-shadow", CAT_FUR_COLORS[catProfile.furColorId].shadow);
  elements.furColorSelect.value = catProfile.furColorId;
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

function isChanceSuccessful(chance) {
  return Math.random() <= clampValue(chance, 0, 1);
}

function setCatPersonality(personalityId) {
  catProfile.personalityId = CAT_PERSONALITIES[personalityId]
    ? personalityId
    : DEFAULT_PERSONALITY_ID;
  elements.cat.dataset.catPersonality = getActivePersonality().id;
  elements.personalitySelect.value = getActivePersonality().id;
}

function getMovementBounds() {
  const stageRect = elements.stage.getBoundingClientRect();
  const halfCatWidth = elements.cat.offsetWidth / 2;
  const halfCatHeight = elements.cat.offsetHeight / 2;

  return {
    minX: halfCatWidth,
    minY: halfCatHeight,
    maxX: Math.max(halfCatWidth, stageRect.width - halfCatWidth),
    maxY: Math.max(halfCatHeight, stageRect.height - halfCatHeight),
  };
}

function clampCatPosition(position) {
  const bounds = getMovementBounds();

  return {
    x: clampValue(position.x, bounds.minX, bounds.maxX),
    y: clampValue(position.y, bounds.minY, bounds.maxY),
  };
}

function setCatPosition(position) {
  const clampedPosition = clampCatPosition(position);

  elements.cat.style.left = `${clampedPosition.x}px`;
  elements.cat.style.top = `${clampedPosition.y}px`;
  updateMouseDistanceToCat();
}

function setInitialState() {
  elements.app.dataset.appState = APP_STATES.IDLE;
  setCatName(catProfile.name);
  setCatBreed(catProfile.breedId);
  setCatEyeColor(catProfile.eyeColorId);
  setCatFurColor(catProfile.furColorId);
  setCatState(CAT_STATES.IDLE);
  setCatDirection(CAT_DIRECTIONS.RIGHT);
  setCatPersonality(catProfile.personalityId);
  elements.cat.dataset.catPointerState = CAT_POINTER_STATES.OUTSIDE;
  elements.cat.dataset.catPetting = "false";
}

function isPointInsideElement(pointX, pointY, element) {
  const rect = element.getBoundingClientRect();

  return pointX >= rect.left && pointX <= rect.right && pointY >= rect.top && pointY <= rect.bottom;
}

function setMouseEventPassThrough(shouldIgnore) {
  if (isIgnoringMouseEvents === shouldIgnore) {
    return;
  }

  isIgnoringMouseEvents = shouldIgnore;
  window.catWindow.setIgnoreMouseEvents(shouldIgnore);
}

function setMousePosition(event) {
  const nextPosition = {
    x: event.clientX,
    y: event.clientY,
  };

  if (mouseState.lastTimestamp === null) {
    mouseState.speed = 0;
  } else {
    const elapsedMs = Math.max(event.timeStamp - mouseState.lastTimestamp, 1);
    mouseState.speed = getDistanceBetweenPoints(mouseState.position, nextPosition) / elapsedMs;
  }

  mouseState.position.x = event.clientX;
  mouseState.position.y = event.clientY;
  mouseState.isInsideWindow = true;
  mouseState.lastTimestamp = event.timeStamp;
  updateMouseDistanceToCat();
}

function clearMousePosition() {
  mouseState.isInsideWindow = false;
  mouseState.distanceToCat = null;
  mouseState.lastTimestamp = null;
  mouseState.speed = 0;
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
    return;
  }

  mouseState.distanceToCat = getDistanceBetweenPoints(mouseState.position, getCatCenterPosition());
}

function updateMouseEventPassThrough(event) {
  setMousePosition(event);
  updatePettingDrag(event);
  updateAffectionateReaction(event);
  updateCoyReaction(event);
  updatePlayfulReaction(event);
  updateStartledReaction();

  const isOverCat = isPointInsideElement(event.clientX, event.clientY, elements.cat);
  const isOverControls = isPointInsideElement(event.clientX, event.clientY, elements.controls);

  setMouseEventPassThrough(!isOverCat && !isOverControls && !pettingState.isDragging);
}

function setCatPointerState(pointerState) {
  elements.cat.dataset.catPointerState = pointerState;
}

function setCatPetting(isPetting) {
  if (pettingState.isPetting === isPetting) {
    return;
  }

  pettingState.isPetting = isPetting;
  elements.cat.dataset.catPetting = String(isPetting);

  if (isPetting) {
    triggerRubReaction();
  }
}

function getRubDuration() {
  return PETTING_CONFIG.RUB_DURATION_MS * getPersonalityInteraction().rubDurationMultiplier;
}

function getPettingReactionDuration() {
  const rubDuration = getRubDuration();

  return isRelaxedPersonality()
    ? rubDuration * RELAXED_CONFIG.PETTING_REST_DURATION_MULTIPLIER
    : rubDuration;
}

function getPettingRubChance() {
  const baseRubChance = getPersonalityInteraction().rubChance;

  if (!isTimidPersonality()) {
    return baseRubChance;
  }

  const timidRubModifier =
    mouseState.speed <= TIMID_CONFIG.SLOW_PETTING_SPEED
      ? TIMID_CONFIG.SLOW_PETTING_RUB_BONUS
      : -TIMID_CONFIG.FAST_PETTING_RUB_PENALTY;

  return clampValue(baseRubChance + timidRubModifier, 0, 1);
}

function triggerRubReaction() {
  window.clearTimeout(movementTimeoutId);
  window.clearTimeout(rubTimeoutId);
  setCatState(isRelaxedPersonality() ? CAT_STATES.SLEEP : CAT_STATES.RUB);
  rubTimeoutId = window.setTimeout(() => {
    setCatState(CAT_STATES.IDLE);
    setCatPetting(false);
  }, getPettingReactionDuration());
}

function isCatReacting() {
  return [CAT_STATES.RUB, CAT_STATES.RUN, CAT_STATES.STARTLED].includes(getCatState());
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

function isAffectionateLingeringNearMouse() {
  return (
    isAffectionatePersonality() &&
    mouseState.distanceToCat !== null &&
    mouseState.distanceToCat <= AFFECTIONATE_CONFIG.LINGER_DISTANCE
  );
}

function shouldTriggerAffectionateApproach(event) {
  return (
    isAffectionatePersonality() &&
    mouseState.distanceToCat !== null &&
    mouseState.distanceToCat <= AFFECTIONATE_CONFIG.APPROACH_DISTANCE &&
    mouseState.speed < getStartledSpeedThreshold() &&
    event.timeStamp - lastAffectionateApproachTimestamp >=
      AFFECTIONATE_CONFIG.APPROACH_COOLDOWN_MS &&
    !pettingState.isDragging &&
    !pettingState.isPetting &&
    !isCatReacting() &&
    isChanceSuccessful(getPersonalityInteraction().approachChance)
  );
}

function getAffectionateApproachPosition() {
  const catCenter = getCatCenterPosition();
  const towardMouseVector = {
    x: mouseState.position.x - catCenter.x,
    y: mouseState.position.y - catCenter.y,
  };
  const vectorLength = Math.max(Math.hypot(towardMouseVector.x, towardMouseVector.y), 1);
  const stepDistance = Math.min(
    AFFECTIONATE_CONFIG.APPROACH_STEP_DISTANCE,
    Math.max(mouseState.distanceToCat - elements.cat.offsetWidth, 0)
  );

  return clampCatPosition({
    x: elements.cat.offsetLeft + (towardMouseVector.x / vectorLength) * stepDistance,
    y: elements.cat.offsetTop + (towardMouseVector.y / vectorLength) * stepDistance,
  });
}

function triggerAffectionateApproach(event) {
  const approachPosition = getAffectionateApproachPosition();

  window.clearTimeout(movementTimeoutId);
  window.clearTimeout(affectionateApproachTimeoutId);
  lastAffectionateApproachTimestamp = event.timeStamp;
  setCatDirection(
    approachPosition.x < elements.cat.offsetLeft ? CAT_DIRECTIONS.LEFT : CAT_DIRECTIONS.RIGHT
  );
  setCatState(CAT_STATES.WALK);
  setCatPosition(approachPosition);
  affectionateApproachTimeoutId = window.setTimeout(() => {
    setCatState(CAT_STATES.IDLE);
  }, MOVEMENT_CONFIG.TRANSITION_MS);
}

function updateAffectionateReaction(event) {
  if (shouldTriggerAffectionateApproach(event)) {
    triggerAffectionateApproach(event);
  }
}

function shouldTriggerCoyAvoid(event) {
  return (
    isCoyPersonality() &&
    mouseState.distanceToCat !== null &&
    mouseState.distanceToCat <= COY_CONFIG.AVOID_DISTANCE &&
    mouseState.speed < getStartledSpeedThreshold() &&
    event.timeStamp - lastCoyAvoidTimestamp >= COY_CONFIG.AVOID_COOLDOWN_MS &&
    !pettingState.isDragging &&
    !pettingState.isPetting &&
    !isCatReacting() &&
    isChanceSuccessful(getPersonalityInteraction().runChance)
  );
}

function getCoyAvoidPosition() {
  const catCenter = getCatCenterPosition();
  const awayVector = {
    x: catCenter.x - mouseState.position.x,
    y: catCenter.y - mouseState.position.y,
  };
  const fallbackDirection = elements.cat.dataset.catDirection === CAT_DIRECTIONS.LEFT ? -1 : 1;
  const vectorLength = Math.hypot(awayVector.x, awayVector.y);
  const normalizedVector = {
    x: vectorLength === 0 ? fallbackDirection : awayVector.x / vectorLength,
    y: vectorLength === 0 ? 0 : awayVector.y / vectorLength,
  };

  return clampCatPosition({
    x: elements.cat.offsetLeft + normalizedVector.x * COY_CONFIG.AVOID_STEP_DISTANCE,
    y: elements.cat.offsetTop + normalizedVector.y * COY_CONFIG.AVOID_STEP_DISTANCE,
  });
}

function triggerCoyAvoid(event, { force = false } = {}) {
  if (!force && isCatReacting()) {
    return;
  }

  const avoidPosition = getCoyAvoidPosition();

  window.clearTimeout(movementTimeoutId);
  window.clearTimeout(rubTimeoutId);
  window.clearTimeout(coyAvoidTimeoutId);
  lastCoyAvoidTimestamp = event.timeStamp;
  setCatPetting(false);
  setCatDirection(
    avoidPosition.x < elements.cat.offsetLeft ? CAT_DIRECTIONS.LEFT : CAT_DIRECTIONS.RIGHT
  );
  setCatState(CAT_STATES.WALK);
  setCatPosition(avoidPosition);
  coyAvoidTimeoutId = window.setTimeout(() => {
    setCatState(CAT_STATES.IDLE);
  }, MOVEMENT_CONFIG.TRANSITION_MS);
}

function updateCoyReaction(event) {
  if (shouldTriggerCoyAvoid(event)) {
    triggerCoyAvoid(event);
  }
}

function shouldTriggerPlayfulChase(event) {
  return (
    isPlayfulPersonality() &&
    mouseState.distanceToCat !== null &&
    mouseState.distanceToCat <= PLAYFUL_CONFIG.CHASE_DISTANCE &&
    mouseState.speed >= getStartledSpeedThreshold() &&
    event.timeStamp - lastPlayfulChaseTimestamp >= PLAYFUL_CONFIG.CHASE_COOLDOWN_MS &&
    !pettingState.isDragging &&
    !pettingState.isPetting &&
    !isCatReacting() &&
    isChanceSuccessful(getPersonalityInteraction().approachChance)
  );
}

function getPlayfulChasePosition() {
  const catCenter = getCatCenterPosition();
  const chaseVector = {
    x: mouseState.position.x - catCenter.x,
    y: mouseState.position.y - catCenter.y,
  };
  const vectorLength = Math.max(Math.hypot(chaseVector.x, chaseVector.y), 1);
  const stepDistance = Math.min(
    PLAYFUL_CONFIG.CHASE_STEP_DISTANCE,
    Math.max(mouseState.distanceToCat - elements.cat.offsetWidth / 2, 0)
  );

  return clampCatPosition({
    x: elements.cat.offsetLeft + (chaseVector.x / vectorLength) * stepDistance,
    y: elements.cat.offsetTop + (chaseVector.y / vectorLength) * stepDistance,
  });
}

function triggerPlayfulChase(event) {
  const chasePosition = getPlayfulChasePosition();

  window.clearTimeout(movementTimeoutId);
  window.clearTimeout(playfulTimeoutId);
  lastPlayfulChaseTimestamp = event.timeStamp;
  setCatDirection(
    chasePosition.x < elements.cat.offsetLeft ? CAT_DIRECTIONS.LEFT : CAT_DIRECTIONS.RIGHT
  );
  setCatState(CAT_STATES.RUN);
  setCatPosition(chasePosition);
  playfulTimeoutId = window.setTimeout(() => {
    setCatState(CAT_STATES.IDLE);
  }, STARTLED_CONFIG.RUN_DURATION_MS);
}

function updatePlayfulReaction(event) {
  if (shouldTriggerPlayfulChase(event)) {
    triggerPlayfulChase(event);
  }
}

function getStartledSpeedThreshold() {
  return STARTLED_CONFIG.TRIGGER_SPEED / getPersonalityInteraction().startledSensitivity;
}

function shouldTriggerStartledReaction() {
  return (
    mouseState.distanceToCat !== null &&
    mouseState.distanceToCat <= STARTLED_CONFIG.APPROACH_DISTANCE &&
    mouseState.speed >= getStartledSpeedThreshold() &&
    !pettingState.isDragging &&
    !pettingState.isPetting &&
    !isCatReacting() &&
    isChanceSuccessful(getPersonalityInteraction().runChance)
  );
}

function getRunAwayPosition() {
  const catCenter = getCatCenterPosition();
  const awayVector = {
    x: catCenter.x - mouseState.position.x,
    y: catCenter.y - mouseState.position.y,
  };
  const vectorLength = Math.max(Math.hypot(awayVector.x, awayVector.y), 1);

  return clampCatPosition({
    x: elements.cat.offsetLeft + (awayVector.x / vectorLength) * STARTLED_CONFIG.RUN_DISTANCE,
    y: elements.cat.offsetTop + (awayVector.y / vectorLength) * STARTLED_CONFIG.RUN_DISTANCE,
  });
}

function startRunReaction() {
  const runPosition = getRunAwayPosition();

  setCatDirection(
    runPosition.x < elements.cat.offsetLeft ? CAT_DIRECTIONS.LEFT : CAT_DIRECTIONS.RIGHT
  );
  setCatState(CAT_STATES.RUN);
  setCatPosition(runPosition);
  runTimeoutId = window.setTimeout(() => {
    setCatState(CAT_STATES.IDLE);
  }, STARTLED_CONFIG.RUN_DURATION_MS);
}

function triggerStartledReaction() {
  window.clearTimeout(movementTimeoutId);
  window.clearTimeout(rubTimeoutId);
  window.clearTimeout(runTimeoutId);
  window.clearTimeout(startledTimeoutId);
  setCatState(CAT_STATES.STARTLED);
  startledTimeoutId = window.setTimeout(startRunReaction, STARTLED_CONFIG.STARTLED_DURATION_MS);
}

function updateStartledReaction() {
  if (shouldTriggerStartledReaction()) {
    triggerStartledReaction();
  }
}

function startPettingDrag(event) {
  pettingState.isDragging = true;
  pettingState.hasResolvedInteraction = false;
  pettingState.hasTriggeredCoyOvercontact = false;
  pettingState.totalDragDistance = 0;
  pettingState.lastPosition.x = event.clientX;
  pettingState.lastPosition.y = event.clientY;
  setCatPetting(false);
}

function updatePettingDrag(event) {
  if (!pettingState.isDragging) {
    return;
  }

  const currentPosition = {
    x: event.clientX,
    y: event.clientY,
  };

  pettingState.totalDragDistance += getDistanceBetweenPoints(
    pettingState.lastPosition,
    currentPosition
  );
  pettingState.lastPosition = currentPosition;

  if (
    pettingState.totalDragDistance >= PETTING_CONFIG.MIN_DRAG_DISTANCE &&
    !pettingState.hasResolvedInteraction
  ) {
    pettingState.hasResolvedInteraction = true;
    setCatPetting(isChanceSuccessful(getPettingRubChance()));
  }

  if (
    isCoyPersonality() &&
    pettingState.totalDragDistance >= COY_CONFIG.OVERCONTACT_DRAG_DISTANCE &&
    !pettingState.hasTriggeredCoyOvercontact
  ) {
    pettingState.hasTriggeredCoyOvercontact = true;
    triggerCoyAvoid(event, { force: true });
  }
}

function stopPettingDrag() {
  pettingState.isDragging = false;
}

function registerCatMouseEvents() {
  elements.cat.addEventListener("mouseenter", () => {
    setCatPointerState(CAT_POINTER_STATES.HOVER);
  });

  elements.cat.addEventListener("mousedown", (event) => {
    startPettingDrag(event);
    setCatPointerState(CAT_POINTER_STATES.PRESS);
  });

  elements.cat.addEventListener("mouseup", () => {
    setCatPointerState(CAT_POINTER_STATES.HOVER);
  });

  elements.cat.addEventListener("mouseleave", () => {
    setCatPointerState(CAT_POINTER_STATES.OUTSIDE);
  });
}

function registerPointerTracking() {
  window.addEventListener("mousemove", updateMouseEventPassThrough);
  window.addEventListener("mouseup", stopPettingDrag);
  window.addEventListener("mouseleave", () => {
    clearMousePosition();
    stopPettingDrag();
    setMouseEventPassThrough(true);
    setCatPointerState(CAT_POINTER_STATES.OUTSIDE);
  });
}

function getRandomStagePosition() {
  const bounds = getMovementBounds();

  return {
    x: bounds.minX + Math.random() * (bounds.maxX - bounds.minX),
    y: bounds.minY + Math.random() * (bounds.maxY - bounds.minY),
  };
}

function getRandomCornerPosition() {
  const bounds = getMovementBounds();
  const horizontalEdge = Math.random() < 0.5 ? bounds.minX : bounds.maxX;
  const verticalEdge = Math.random() < 0.5 ? bounds.minY : bounds.maxY;

  return {
    x: clampValue(
      horizontalEdge + (Math.random() * 2 - 1) * TIMID_CONFIG.CORNER_PADDING,
      bounds.minX,
      bounds.maxX
    ),
    y: clampValue(
      verticalEdge + (Math.random() * 2 - 1) * TIMID_CONFIG.CORNER_PADDING,
      bounds.minY,
      bounds.maxY
    ),
  };
}

function getPersonalityRandomPosition() {
  if (isTimidPersonality() && isChanceSuccessful(TIMID_CONFIG.CORNER_MOVE_CHANCE)) {
    return getRandomCornerPosition();
  }

  return getRandomStagePosition();
}

function getRandomMovementInterval() {
  return MOVEMENT_CONFIG.INTERVAL_MS * getPersonalityMovement().intervalMultiplier;
}

function shouldMoveRandomly() {
  const movement = getPersonalityMovement();
  const totalWeight = movement.idleWeight + movement.walkWeight + movement.sleepWeight;

  return isChanceSuccessful(movement.walkWeight / totalWeight);
}

function getPersonalityRestState() {
  if (!isRelaxedPersonality()) {
    return CAT_STATES.IDLE;
  }

  const movement = getPersonalityMovement();
  const restWeight = movement.idleWeight + movement.sleepWeight;
  const sleepChance = restWeight === 0 ? 0 : movement.sleepWeight / restWeight;

  return isChanceSuccessful(sleepChance) ? CAT_STATES.SLEEP : CAT_STATES.IDLE;
}

function triggerPlayfulIdleHop() {
  window.clearTimeout(movementTimeoutId);
  window.clearTimeout(playfulTimeoutId);
  setCatDirection(Math.random() < 0.5 ? CAT_DIRECTIONS.LEFT : CAT_DIRECTIONS.RIGHT);
  setCatState(CAT_STATES.WALK);
  playfulTimeoutId = window.setTimeout(() => {
    setCatState(CAT_STATES.IDLE);
  }, PLAYFUL_CONFIG.IDLE_HOP_DURATION_MS);
}

function moveCatToRandomPosition() {
  if (
    pettingState.isDragging ||
    pettingState.isPetting ||
    isCatReacting() ||
    isAffectionateLingeringNearMouse()
  ) {
    return;
  }

  if (!shouldMoveRandomly()) {
    if (isPlayfulPersonality() && isChanceSuccessful(PLAYFUL_CONFIG.IDLE_HOP_CHANCE)) {
      triggerPlayfulIdleHop();
      return;
    }

    setCatState(getPersonalityRestState());
    return;
  }

  window.clearTimeout(movementTimeoutId);
  setCatState(CAT_STATES.WALK);
  setCatPosition(getPersonalityRandomPosition());
  movementTimeoutId = window.setTimeout(() => {
    setCatState(CAT_STATES.IDLE);
  }, MOVEMENT_CONFIG.TRANSITION_MS);
}

function registerRandomMovement() {
  window.setInterval(moveCatToRandomPosition, getRandomMovementInterval());
}

function getCurrentCatPosition() {
  return {
    x: elements.cat.offsetLeft,
    y: elements.cat.offsetTop,
  };
}

function keepCatInsideStage() {
  setCatPosition(getCurrentCatPosition());
}

function registerBoundaryGuards() {
  window.addEventListener("resize", keepCatInsideStage);
}

function registerNameControls() {
  elements.controls.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  elements.nameInput.addEventListener("input", (event) => {
    setCatName(event.target.value, { syncInput: false });
  });

  elements.nameInput.addEventListener("blur", () => {
    setCatName(elements.nameInput.value);
  });

  elements.breedSelect.addEventListener("change", (event) => {
    setCatBreed(event.target.value);
  });

  elements.eyeColorSelect.addEventListener("change", (event) => {
    setCatEyeColor(event.target.value);
  });

  elements.furColorSelect.addEventListener("change", (event) => {
    setCatFurColor(event.target.value);
  });

  elements.personalitySelect.addEventListener("change", (event) => {
    setCatPersonality(event.target.value);
  });
}

setInitialState();
registerPointerTracking();
registerCatMouseEvents();
registerNameControls();
registerRandomMovement();
registerBoundaryGuards();
