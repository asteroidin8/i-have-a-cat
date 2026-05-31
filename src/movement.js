const {
  CAT_DIRECTIONS,
  CAT_STATES,
  CORNER_PREFERENCE_CONFIG,
  BEHAVIOR_KIND_IDS,
  IDLE_ACTION_IDS,
  IDLE_BEHAVIOR_CONFIG,
  MOVEMENT_CONFIG,
  PLAYFUL_CONFIG,
  TIMID_CONFIG,
  clampValue,
  isChanceSuccessful,
} = window.CatConfig;

const {
  behaviorState,
  elements,
  pettingState,
  reactionTimestamps,
  timers,
  getDistanceBetweenPoints,
  getPersonalityMovement,
  isCatHesitating,
  isCatPausing,
  isPlayfulPersonality,
  isTimidPersonality,
  playSound,
  setCatDirection,
  setCatHesitating,
  setCatIdleAction,
  setCatState,
  updateMouseDistanceToCat,
} = window.CatState;

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

function updateScreenAwareness(position) {
  elements.cat.dataset.catScreenEdge = window.CatState.getCatScreenEdge(
    position,
    getMovementBounds()
  );
}

function setCatPosition(position) {
  const clampedPosition = clampCatPosition(position);

  elements.cat.style.left = `${clampedPosition.x}px`;
  elements.cat.style.top = `${clampedPosition.y}px`;
  updateScreenAwareness(clampedPosition);
  updateMouseDistanceToCat();
}

function getCurrentCatPosition() {
  return {
    x: elements.cat.offsetLeft,
    y: elements.cat.offsetTop,
  };
}

function getDirectionTowardPosition(position) {
  return position.x < elements.cat.offsetLeft ? CAT_DIRECTIONS.LEFT : CAT_DIRECTIONS.RIGHT;
}

function clearPendingDirectedMovement() {
  window.clearTimeout(timers.turnPause);
  window.clearTimeout(timers.directedMovement);
  elements.cat.dataset.catTurnPause = "false";
}

function startDirectedMovement(position, { state, soundKind } = {}) {
  const direction = getDirectionTowardPosition(position);
  const shouldStageTurn = elements.cat.dataset.catDirection !== direction;

  clearPendingDirectedMovement();

  const beginMovement = () => {
    setCatState(state);

    if (soundKind) {
      playSound(soundKind);
    }

    setCatPosition(position);
  };

  if (!shouldStageTurn) {
    beginMovement();
    return 0;
  }

  setCatState(CAT_STATES.IDLE);
  elements.cat.dataset.catTurnPause = "true";
  timers.turnPause = window.setTimeout(() => {
    elements.cat.dataset.catTurnPause = "false";
    setCatDirection(direction);
    timers.directedMovement = window.setTimeout(beginMovement, MOVEMENT_CONFIG.TURN_FRAME_MS);
  }, MOVEMENT_CONFIG.TURN_PAUSE_MS);

  return MOVEMENT_CONFIG.TURN_PAUSE_MS + MOVEMENT_CONFIG.TURN_FRAME_MS;
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
  const edgePadding = Math.max(TIMID_CONFIG.CORNER_PADDING, CORNER_PREFERENCE_CONFIG.PADDING);

  return {
    x: clampValue(horizontalEdge + (Math.random() * 2 - 1) * edgePadding, bounds.minX, bounds.maxX),
    y: clampValue(verticalEdge + (Math.random() * 2 - 1) * edgePadding, bounds.minY, bounds.maxY),
  };
}

function getPersonalityRandomPosition() {
  const cornerChance = isTimidPersonality()
    ? TIMID_CONFIG.CORNER_MOVE_CHANCE
    : CORNER_PREFERENCE_CONFIG.CHANCE;

  if (isChanceSuccessful(cornerChance)) {
    return getRandomCornerPosition();
  }

  return getRandomStagePosition();
}

function getRandomMovementInterval() {
  const baseInterval =
    MOVEMENT_CONFIG.INTERVAL_MS *
    getPersonalityMovement().intervalMultiplier *
    MOVEMENT_CONFIG.ACTION_INTERVAL_MULTIPLIER;
  const jitter = 1 + (Math.random() * 2 - 1) * MOVEMENT_CONFIG.ACTION_INTERVAL_RANDOMNESS;

  return baseInterval * jitter;
}

function getShortStepPosition(targetPosition) {
  const currentPosition = getCurrentCatPosition();
  const distance = getDistanceBetweenPoints(currentPosition, targetPosition);

  if (distance <= MOVEMENT_CONFIG.MAX_STEP_DISTANCE) {
    return targetPosition;
  }

  const stepRatio = MOVEMENT_CONFIG.MAX_STEP_DISTANCE / distance;

  return clampCatPosition({
    x: currentPosition.x + (targetPosition.x - currentPosition.x) * stepRatio,
    y: currentPosition.y + (targetPosition.y - currentPosition.y) * stepRatio,
  });
}

function shouldMoveRandomly() {
  const movement = getPersonalityMovement();
  const idleWeight = movement.idleWeight * MOVEMENT_CONFIG.IDLE_WEIGHT_MULTIPLIER;
  const totalWeight = idleWeight + movement.walkWeight + movement.sleepWeight;
  const walkChance = (movement.walkWeight / totalWeight) * MOVEMENT_CONFIG.WALK_CHANCE_MULTIPLIER;

  return isChanceSuccessful(walkChance);
}

function isRecentBehaviorKind(behaviorKind) {
  return (
    behaviorState.lastBehaviorKind === behaviorKind &&
    Date.now() - behaviorState.lastBehaviorKindTimestamp <
      IDLE_BEHAVIOR_CONFIG.RECENT_ACTION_REPEAT_COOLDOWN_MS
  );
}

function rememberBehaviorKind(behaviorKind) {
  behaviorState.lastBehaviorKind = behaviorKind;
  behaviorState.lastBehaviorKindTimestamp = Date.now();
}

function getRandomWalkTransitionMs() {
  return (
    MOVEMENT_CONFIG.TRANSITION_MS *
    (MOVEMENT_CONFIG.TRANSITION_RANDOM_MIN +
      Math.random() *
        (MOVEMENT_CONFIG.TRANSITION_RANDOM_MAX - MOVEMENT_CONFIG.TRANSITION_RANDOM_MIN))
  );
}

function getIdleBehaviorWeight(behavior) {
  const movement = getPersonalityMovement();
  const sleepModifier = behavior.state === CAT_STATES.SLEEP ? movement.sleepWeight + 0.2 : 1;
  const repeatedModifier = behavior.id === behaviorState.lastIdleActionId ? 0.25 : 1;
  const longIdleModifier =
    Date.now() - behaviorState.lastInteractionTimestamp >=
      IDLE_BEHAVIOR_CONFIG.LONG_IDLE_SLEEP_MS && behavior.state === CAT_STATES.SLEEP
      ? IDLE_BEHAVIOR_CONFIG.LONG_IDLE_SLEEP_WEIGHT_MULTIPLIER
      : 1;

  return behavior.weight * sleepModifier * repeatedModifier * longIdleModifier;
}

function chooseIdleBehavior() {
  const weightedBehaviors = IDLE_BEHAVIOR_CONFIG.TABLE.map((behavior) => ({
    ...behavior,
    computedWeight: getIdleBehaviorWeight(behavior),
  }));
  const totalWeight = weightedBehaviors.reduce(
    (weightSum, behavior) => weightSum + behavior.computedWeight,
    0
  );
  let cursor = Math.random() * totalWeight;

  for (const behavior of weightedBehaviors) {
    cursor -= behavior.computedWeight;

    if (cursor <= 0) {
      return behavior;
    }
  }

  return weightedBehaviors[0];
}

function applyIdleBehavior() {
  if (Date.now() - behaviorState.lastIdleActionTimestamp < IDLE_BEHAVIOR_CONFIG.COOLDOWN_MS) {
    return;
  }

  const behavior = chooseIdleBehavior();

  rememberBehaviorKind(BEHAVIOR_KIND_IDS.IDLE);
  behaviorState.lastIdleActionId = behavior.id;
  behaviorState.lastIdleActionTimestamp = Date.now();
  setCatIdleAction(behavior.id);
  setCatState(behavior.state);
}

function triggerPlayfulIdleHop() {
  window.clearTimeout(timers.movement);
  window.clearTimeout(timers.hesitation);
  clearPendingDirectedMovement();
  setCatHesitating(false);
  window.clearTimeout(timers.playful);
  rememberBehaviorKind(BEHAVIOR_KIND_IDS.PLAYFUL_HOP);
  const hopDirection = Math.random() < 0.5 ? CAT_DIRECTIONS.LEFT : CAT_DIRECTIONS.RIGHT;
  const turnDelay =
    elements.cat.dataset.catDirection === hopDirection
      ? 0
      : MOVEMENT_CONFIG.TURN_PAUSE_MS + MOVEMENT_CONFIG.TURN_FRAME_MS;

  if (turnDelay > 0) {
    setCatState(CAT_STATES.IDLE);
    elements.cat.dataset.catTurnPause = "true";
    timers.turnPause = window.setTimeout(() => {
      elements.cat.dataset.catTurnPause = "false";
      setCatDirection(hopDirection);
      timers.directedMovement = window.setTimeout(() => {
        setCatState(CAT_STATES.WALK);
      }, MOVEMENT_CONFIG.TURN_FRAME_MS);
    }, MOVEMENT_CONFIG.TURN_PAUSE_MS);
  } else {
    setCatState(CAT_STATES.WALK);
  }

  timers.playful = window.setTimeout(() => {
    setCatState(CAT_STATES.IDLE);
  }, turnDelay + PLAYFUL_CONFIG.IDLE_HOP_DURATION_MS);
}

function moveCatToRandomPosition() {
  if (
    pettingState.isDragging ||
    pettingState.isPetting ||
    isCatHesitating() ||
    isCatPausing() ||
    window.CatInteraction.isCatReacting() ||
    Date.now() < reactionTimestamps.movementRestUntil ||
    window.CatInteraction.isAffectionateLingeringNearMouse()
  ) {
    return;
  }

  if (!shouldMoveRandomly()) {
    if (
      isPlayfulPersonality() &&
      !isRecentBehaviorKind(BEHAVIOR_KIND_IDS.PLAYFUL_HOP) &&
      isChanceSuccessful(PLAYFUL_CONFIG.IDLE_HOP_CHANCE)
    ) {
      triggerPlayfulIdleHop();
      return;
    }

    applyIdleBehavior();
    return;
  }

  window.clearTimeout(timers.movement);
  window.clearTimeout(timers.hesitation);
  clearPendingDirectedMovement();
  const movementTransitionMs = getRandomWalkTransitionMs();

  elements.cat.style.setProperty("--move-duration", `${movementTransitionMs}ms`);
  const nextPosition = getShortStepPosition(getPersonalityRandomPosition());

  rememberBehaviorKind(BEHAVIOR_KIND_IDS.WALK);
  setCatHesitating(true);
  setCatIdleAction(IDLE_ACTION_IDS.SCAN);
  setCatState(CAT_STATES.IDLE);
  timers.hesitation = window.setTimeout(() => {
    setCatHesitating(false);
    const turnDelay = startDirectedMovement(nextPosition, {
      state: CAT_STATES.WALK,
      soundKind: "step",
    });

    timers.movement = window.setTimeout(() => {
      reactionTimestamps.movementRestUntil = Date.now() + MOVEMENT_CONFIG.POST_WALK_REST_MS;
      applyIdleBehavior();
    }, turnDelay + movementTransitionMs);
  }, MOVEMENT_CONFIG.HESITATION_MS);
}

function registerRandomMovement() {
  const scheduleNextMovement = () => {
    timers.randomMovement = window.setTimeout(() => {
      moveCatToRandomPosition();
      scheduleNextMovement();
    }, getRandomMovementInterval());
  };

  window.clearTimeout(timers.randomMovement);
  scheduleNextMovement();
}

function keepCatInsideStage() {
  setCatPosition(getCurrentCatPosition());
}

function registerBoundaryGuards() {
  window.addEventListener("resize", keepCatInsideStage);
}

window.CatMovement = {
  applyIdleBehavior,
  clampCatPosition,
  clearPendingDirectedMovement,
  getCurrentCatPosition,
  keepCatInsideStage,
  registerBoundaryGuards,
  registerRandomMovement,
  setCatPosition,
  startDirectedMovement,
};
