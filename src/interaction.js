const {
  AFFECTIONATE_CONFIG,
  APP_STATES,
  CAT_POINTER_STATES,
  CAT_STATES,
  COY_CONFIG,
  MOUSE_APPROACH_CONFIG,
  MOVEMENT_CONFIG,
  PETTING_CONFIG,
  PLAYFUL_CONFIG,
  RELAXED_CONFIG,
  SHORT_PAUSE_CONFIG,
  STARTLED_CONFIG,
  TIMID_CONFIG,
  isChanceSuccessful,
} = window.CatConfig;

const {
  behaviorState,
  elements,
  mouseState,
  performanceState,
  pettingState,
  reactionTimestamps,
  timers,
  windowResizeState,
  getCatCenterPosition,
  getCatState,
  getDistanceBetweenPoints,
  getPersonalityInteraction,
  isAffectionatePersonality,
  isCatPausing,
  isCoyPersonality,
  isPlayfulPersonality,
  isRelaxedPersonality,
  isSetupOpen,
  isTimidPersonality,
  playSound,
  setAppState,
  setCatName,
  setCatPausing,
  setCatPointerState,
  setCatState,
  setCatUserIdle,
  setMouseEventPassThrough,
  updateMouseDistanceToCat,
} = window.CatState;

function isPointInsideElement(pointX, pointY, element) {
  const rect = element.getBoundingClientRect();

  return pointX >= rect.left && pointX <= rect.right && pointY >= rect.top && pointY <= rect.bottom;
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
  behaviorState.lastInteractionTimestamp = Date.now();
  setCatUserIdle(false);
  updateMouseDistanceToCat();
  updateMouseNearCatTimestamp();
}

function clearMousePosition() {
  mouseState.isInsideWindow = false;
  mouseState.distanceToCat = null;
  mouseState.lastTimestamp = null;
  mouseState.nearCatSinceTimestamp = null;
  mouseState.speed = 0;
}

function getMouseReactionAwarenessDistance() {
  return Math.max(
    getPersonalityReactionDistance(AFFECTIONATE_CONFIG.APPROACH_DISTANCE),
    getPersonalityReactionDistance(COY_CONFIG.AVOID_DISTANCE),
    getPersonalityReactionDistance(PLAYFUL_CONFIG.CHASE_DISTANCE),
    getPersonalityReactionDistance(SHORT_PAUSE_CONFIG.TRIGGER_DISTANCE),
    getStartledReactionDistance()
  );
}

function getPersonalityReactionDistance(baseDistance) {
  return baseDistance * getPersonalityInteraction().reactionDistanceMultiplier;
}

function isFastMouseMovement() {
  return mouseState.speed >= getStartledSpeedThreshold() * STARTLED_CONFIG.FAST_SPEED_MULTIPLIER;
}

function getStartledReactionDistance() {
  const fastDistanceMultiplier = isFastMouseMovement()
    ? STARTLED_CONFIG.FAST_APPROACH_DISTANCE_MULTIPLIER
    : 1;

  return getPersonalityReactionDistance(STARTLED_CONFIG.APPROACH_DISTANCE) * fastDistanceMultiplier;
}

function getStartledReactionChance() {
  const baseChance =
    getPersonalityInteraction().runChance * STARTLED_CONFIG.RUN_REACTION_MULTIPLIER;
  const fastBonus = isFastMouseMovement() ? STARTLED_CONFIG.FAST_RUN_CHANCE_BONUS : 0;

  return window.CatConfig.clampValue(baseChance + fastBonus, 0, 1);
}

function updateMouseNearCatTimestamp() {
  if (
    mouseState.distanceToCat === null ||
    mouseState.distanceToCat > getMouseReactionAwarenessDistance()
  ) {
    mouseState.nearCatSinceTimestamp = null;
    return;
  }

  if (mouseState.nearCatSinceTimestamp === null) {
    mouseState.nearCatSinceTimestamp = Date.now();
  }
}

function hasMouseStayedNearCat() {
  return (
    mouseState.nearCatSinceTimestamp !== null &&
    Date.now() - mouseState.nearCatSinceTimestamp >= MOUSE_APPROACH_CONFIG.REACTION_DELAY_MS
  );
}

function getStartledSpeedThreshold() {
  return STARTLED_CONFIG.TRIGGER_SPEED / getPersonalityInteraction().startledSensitivity;
}

function shouldTriggerShortPause() {
  const catState = getCatState();

  return (
    mouseState.distanceToCat !== null &&
    hasMouseStayedNearCat() &&
    mouseState.distanceToCat <=
      getPersonalityReactionDistance(SHORT_PAUSE_CONFIG.TRIGGER_DISTANCE) &&
    mouseState.speed < getStartledSpeedThreshold() &&
    (catState === CAT_STATES.IDLE || catState === CAT_STATES.SLEEP) &&
    Date.now() - reactionTimestamps.lastPause >= SHORT_PAUSE_CONFIG.COOLDOWN_MS &&
    !pettingState.isDragging &&
    !pettingState.isPetting &&
    !isCatPausing() &&
    !isCatReacting() &&
    isChanceSuccessful(SHORT_PAUSE_CONFIG.CHANCE)
  );
}

function triggerShortPause() {
  window.clearTimeout(timers.pause);
  reactionTimestamps.lastPause = Date.now();
  setCatPausing(true);
  timers.pause = window.setTimeout(() => {
    setCatPausing(false);
  }, SHORT_PAUSE_CONFIG.DURATION_MS);
}

function updateShortPauseReaction() {
  if (shouldTriggerShortPause()) {
    triggerShortPause();
  }
}

function updateMouseEventPassThrough(event) {
  setMousePosition(event);

  if (isSetupOpen()) {
    setMouseEventPassThrough(false);
    return;
  }

  updatePettingDrag(event);
  updateShortPauseReaction();
  updateAffectionateReaction(event);
  updateCoyReaction(event);
  updatePlayfulReaction(event);
  updateStartledReaction();

  const isOverCat = isPointInsideElement(event.clientX, event.clientY, elements.cat);
  const isOverControls = isPointInsideElement(event.clientX, event.clientY, elements.controls);
  const isOverResizeHandle = isPointInsideElement(
    event.clientX,
    event.clientY,
    elements.resizeHandle
  );
  const isOverSettingsButton = isPointInsideElement(
    event.clientX,
    event.clientY,
    elements.settingsButton
  );
  const isOverToolbar = isPointInsideElement(event.clientX, event.clientY, elements.toolbar);

  setMouseEventPassThrough(
    !isOverCat &&
      !isOverControls &&
      !isOverResizeHandle &&
      !isOverSettingsButton &&
      !isOverToolbar &&
      !pettingState.isDragging
  );
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

  return window.CatConfig.clampValue(baseRubChance + timidRubModifier, 0, 1);
}

function triggerRubReaction() {
  window.clearTimeout(timers.movement);
  window.CatMovement.clearPendingDirectedMovement();
  window.clearTimeout(timers.rub);
  playSound("purr");
  setCatState(isRelaxedPersonality() ? CAT_STATES.SLEEP : CAT_STATES.RUB);
  window.CatMovement.setCatPosition(getRubNudgePosition());
  timers.rub = window.setTimeout(() => {
    setCatState(CAT_STATES.IDLE);
    setCatPetting(false);
  }, getPettingReactionDuration());
}

function getRubNudgePosition() {
  const directionMultiplier = elements.cat.dataset.catPetDirection === "left" ? -1 : 1;

  return {
    x: elements.cat.offsetLeft + directionMultiplier * PETTING_CONFIG.RUB_NUDGE_DISTANCE,
    y: elements.cat.offsetTop + PETTING_CONFIG.RUB_NUDGE_LIFT,
  };
}

function isCatReacting() {
  return [CAT_STATES.RUB, CAT_STATES.RUN, CAT_STATES.STARTLED].includes(getCatState());
}

function isAffectionateLingeringNearMouse() {
  if (
    !isAffectionatePersonality() ||
    mouseState.distanceToCat === null ||
    mouseState.distanceToCat > AFFECTIONATE_CONFIG.LINGER_DISTANCE
  ) {
    behaviorState.lingerStartTimestamp = null;
    return false;
  }

  if (behaviorState.lingerStartTimestamp === null) {
    behaviorState.lingerStartTimestamp = Date.now();
  }

  return Date.now() - behaviorState.lingerStartTimestamp < AFFECTIONATE_CONFIG.MAX_LINGER_MS;
}

function shouldTriggerAffectionateApproach(event) {
  return (
    isAffectionatePersonality() &&
    mouseState.distanceToCat !== null &&
    hasMouseStayedNearCat() &&
    mouseState.distanceToCat <=
      getPersonalityReactionDistance(AFFECTIONATE_CONFIG.APPROACH_DISTANCE) &&
    mouseState.distanceToCat >
      getPersonalityReactionDistance(AFFECTIONATE_CONFIG.COMFORT_DISTANCE) &&
    mouseState.speed < getStartledSpeedThreshold() &&
    event.timeStamp - reactionTimestamps.lastAffectionateApproach >=
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

  return window.CatMovement.clampCatPosition({
    x: elements.cat.offsetLeft + (towardMouseVector.x / vectorLength) * stepDistance,
    y: elements.cat.offsetTop + (towardMouseVector.y / vectorLength) * stepDistance,
  });
}

function triggerAffectionateApproach(event) {
  const approachPosition = getAffectionateApproachPosition();

  window.clearTimeout(timers.movement);
  window.CatMovement.clearPendingDirectedMovement();
  window.clearTimeout(timers.affectionateApproach);
  reactionTimestamps.lastAffectionateApproach = event.timeStamp;
  const turnDelay = window.CatMovement.startDirectedMovement(approachPosition, {
    state: CAT_STATES.WALK,
  });
  timers.affectionateApproach = window.setTimeout(() => {
    setCatState(CAT_STATES.IDLE);
  }, turnDelay + MOVEMENT_CONFIG.TRANSITION_MS);
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
    hasMouseStayedNearCat() &&
    mouseState.distanceToCat <= getPersonalityReactionDistance(COY_CONFIG.AVOID_DISTANCE) &&
    mouseState.speed < getStartledSpeedThreshold() &&
    event.timeStamp - reactionTimestamps.lastCoyAvoid >= COY_CONFIG.AVOID_COOLDOWN_MS &&
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
  const fallbackDirection = elements.cat.dataset.catDirection === "left" ? -1 : 1;
  const vectorLength = Math.hypot(awayVector.x, awayVector.y);
  const normalizedVector = {
    x: vectorLength === 0 ? fallbackDirection : awayVector.x / vectorLength,
    y: vectorLength === 0 ? 0 : awayVector.y / vectorLength,
  };

  return window.CatMovement.clampCatPosition({
    x: elements.cat.offsetLeft + normalizedVector.x * COY_CONFIG.AVOID_STEP_DISTANCE,
    y: elements.cat.offsetTop + normalizedVector.y * COY_CONFIG.AVOID_STEP_DISTANCE,
  });
}

function triggerCoyAvoid(event, { force = false } = {}) {
  if (!force && isCatReacting()) {
    return;
  }

  const avoidPosition = getCoyAvoidPosition();

  window.clearTimeout(timers.movement);
  window.CatMovement.clearPendingDirectedMovement();
  window.clearTimeout(timers.rub);
  window.clearTimeout(timers.coyAvoid);
  reactionTimestamps.lastCoyAvoid = event.timeStamp;
  setCatPetting(false);
  const turnDelay = window.CatMovement.startDirectedMovement(avoidPosition, {
    state: CAT_STATES.WALK,
  });
  timers.coyAvoid = window.setTimeout(() => {
    setCatState(CAT_STATES.IDLE);
  }, turnDelay + MOVEMENT_CONFIG.TRANSITION_MS);
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
    hasMouseStayedNearCat() &&
    mouseState.distanceToCat <= getPersonalityReactionDistance(PLAYFUL_CONFIG.CHASE_DISTANCE) &&
    mouseState.speed >= getStartledSpeedThreshold() &&
    event.timeStamp - reactionTimestamps.lastPlayfulChase >= PLAYFUL_CONFIG.CHASE_COOLDOWN_MS &&
    !pettingState.isDragging &&
    !pettingState.isPetting &&
    !isCatReacting() &&
    Date.now() - reactionTimestamps.lastRunReaction >= STARTLED_CONFIG.RUN_COOLDOWN_MS &&
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

  return window.CatMovement.clampCatPosition({
    x: elements.cat.offsetLeft + (chaseVector.x / vectorLength) * stepDistance,
    y: elements.cat.offsetTop + (chaseVector.y / vectorLength) * stepDistance,
  });
}

function triggerPlayfulChase(event) {
  const chasePosition = getPlayfulChasePosition();

  window.clearTimeout(timers.movement);
  window.CatMovement.clearPendingDirectedMovement();
  window.clearTimeout(timers.playful);
  reactionTimestamps.lastPlayfulChase = event.timeStamp;
  reactionTimestamps.lastRunReaction = Date.now();
  const turnDelay = window.CatMovement.startDirectedMovement(chasePosition, {
    state: CAT_STATES.RUN,
    soundKind: "step",
  });
  timers.playful = window.setTimeout(() => {
    setCatState(CAT_STATES.IDLE);
  }, turnDelay + STARTLED_CONFIG.RUN_DURATION_MS);
}

function updatePlayfulReaction(event) {
  if (shouldTriggerPlayfulChase(event)) {
    triggerPlayfulChase(event);
  }
}

function shouldTriggerStartledReaction() {
  return (
    mouseState.distanceToCat !== null &&
    (hasMouseStayedNearCat() || isFastMouseMovement()) &&
    mouseState.distanceToCat <= getStartledReactionDistance() &&
    mouseState.speed >= getStartledSpeedThreshold() &&
    !pettingState.isDragging &&
    !pettingState.isPetting &&
    !isCatReacting() &&
    Date.now() - reactionTimestamps.lastRunReaction >= STARTLED_CONFIG.RUN_COOLDOWN_MS &&
    isChanceSuccessful(getStartledReactionChance())
  );
}

function getRunAwayPosition() {
  const catCenter = getCatCenterPosition();
  const awayVector = {
    x: catCenter.x - mouseState.position.x,
    y: catCenter.y - mouseState.position.y,
  };
  const vectorLength = Math.max(Math.hypot(awayVector.x, awayVector.y), 1);

  return window.CatMovement.clampCatPosition({
    x: elements.cat.offsetLeft + (awayVector.x / vectorLength) * STARTLED_CONFIG.RUN_DISTANCE,
    y: elements.cat.offsetTop + (awayVector.y / vectorLength) * STARTLED_CONFIG.RUN_DISTANCE,
  });
}

function startRunReaction() {
  const runPosition = getRunAwayPosition();

  reactionTimestamps.lastRunReaction = Date.now();
  const turnDelay = window.CatMovement.startDirectedMovement(runPosition, {
    state: CAT_STATES.RUN,
    soundKind: "startled",
  });
  timers.run = window.setTimeout(() => {
    setCatState(CAT_STATES.IDLE);
  }, turnDelay + STARTLED_CONFIG.RUN_DURATION_MS);
}

function triggerStartledReaction() {
  window.clearTimeout(timers.movement);
  window.CatMovement.clearPendingDirectedMovement();
  window.clearTimeout(timers.rub);
  window.clearTimeout(timers.run);
  window.clearTimeout(timers.startled);
  setCatState(CAT_STATES.STARTLED);
  timers.startled = window.setTimeout(startRunReaction, STARTLED_CONFIG.STARTLED_DURATION_MS);
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
  elements.cat.dataset.catPetDirection =
    currentPosition.x < pettingState.lastPosition.x ? "left" : "right";
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
  window.addEventListener("mousemove", schedulePointerTracking);
  window.addEventListener("mouseup", stopPettingDrag);
  window.addEventListener("mouseleave", () => {
    clearMousePosition();
    stopPettingDrag();
    if (!isSetupOpen()) {
      setMouseEventPassThrough(true);
    }
    setCatPointerState(CAT_POINTER_STATES.OUTSIDE);
  });
}

function schedulePointerTracking(event) {
  performanceState.pendingPointerEvent = event;

  if (performanceState.pointerFrameId !== null) {
    return;
  }

  performanceState.pointerFrameId = window.requestAnimationFrame(() => {
    performanceState.pointerFrameId = null;

    if (performanceState.pendingPointerEvent) {
      updateMouseEventPassThrough(performanceState.pendingPointerEvent);
      performanceState.pendingPointerEvent = null;
    }
  });
}

function registerNameControls() {
  elements.controls.addEventListener("submit", (event) => {
    event.preventDefault();
    completeSetup();
  });

  elements.nameInput.addEventListener("input", (event) => {
    window.CatState.setCatName(event.target.value, { syncInput: false });
  });

  elements.nameInput.addEventListener("blur", () => {
    setCatName(elements.nameInput.value);
  });

  elements.breedSelect.addEventListener("change", (event) => {
    window.CatState.setCatBreed(event.target.value);
  });

  elements.eyeColorSelect.addEventListener("change", (event) => {
    window.CatState.setCatEyeColor(event.target.value);
  });

  elements.furColorSelect.addEventListener("change", (event) => {
    window.CatState.setCatFurColor(event.target.value);
  });

  elements.personalitySelect.addEventListener("change", (event) => {
    window.CatState.setCatPersonality(event.target.value);
  });

  elements.soundToggle.addEventListener("change", (event) => {
    window.CatState.setSoundEnabled(event.target.checked);
    playSound("purr");
  });

  elements.volumeInput.addEventListener("input", (event) => {
    window.CatState.setVolume(event.target.value);
  });

  elements.startAtLoginToggle.addEventListener("change", (event) => {
    window.CatState.setStartAtLogin(event.target.checked);
  });
}

function completeSetup() {
  setCatName(elements.nameInput.value);
  setAppState(APP_STATES.COMPANION);
  window.CatMovement.keepCatInsideStage();
}

function registerSetupControls() {
  elements.settingsButton.addEventListener("click", () => {
    setAppState(APP_STATES.SETUP);
  });

  window.catWindow.onOpenSettings(() => {
    setAppState(APP_STATES.SETUP);
  });
}

function startWindowResize(event) {
  event.preventDefault();
  windowResizeState.isDragging = true;
  windowResizeState.pointerId = event.pointerId;
  windowResizeState.startX = event.screenX;
  windowResizeState.startY = event.screenY;
  windowResizeState.width = window.innerWidth;
  windowResizeState.height = window.innerHeight;
  elements.resizeHandle.setPointerCapture(event.pointerId);
  setMouseEventPassThrough(false);
}

function updateWindowResize(event) {
  if (!windowResizeState.isDragging) {
    return;
  }

  window.catWindow.setWindowSize({
    width: windowResizeState.width + event.screenX - windowResizeState.startX,
    height: windowResizeState.height + event.screenY - windowResizeState.startY,
  });
}

function stopWindowResize(event) {
  if (!windowResizeState.isDragging) {
    return;
  }

  windowResizeState.isDragging = false;

  if (windowResizeState.pointerId !== null) {
    elements.resizeHandle.releasePointerCapture(windowResizeState.pointerId);
  }

  windowResizeState.pointerId = null;
  updateMouseEventPassThrough(event);
}

function registerWindowResizeControls() {
  elements.resizeHandle.addEventListener("pointerdown", startWindowResize);
  window.addEventListener("pointermove", updateWindowResize);
  window.addEventListener("pointerup", stopWindowResize);
}

window.CatInteraction = {
  isAffectionateLingeringNearMouse,
  isCatReacting,
  registerCatMouseEvents,
  registerNameControls,
  registerPointerTracking,
  registerSetupControls,
  registerWindowResizeControls,
};
