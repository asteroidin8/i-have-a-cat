const APP_STATES = {
  COMPANION: "companion",
  SETUP: "setup",
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

const IDLE_ACTION_IDS = {
  CURL: "curl",
  GROOM: "groom",
  LOOK: "look",
  SCAN: "scan",
  SCRATCH: "scratch",
  SIT: "sit",
  TAIL: "tail",
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
  ACTION_INTERVAL_MULTIPLIER: 1.18,
  ACTION_INTERVAL_RANDOMNESS: 0.28,
  HESITATION_MS: 360,
  INTERVAL_MS: 5600,
  IDLE_WEIGHT_MULTIPLIER: 1.25,
  MAX_STEP_DISTANCE: 180,
  POST_WALK_REST_MS: 2200,
  WALK_CHANCE_MULTIPLIER: 0.82,
  TRANSITION_MS: 1200,
  TRANSITION_RANDOM_MAX: 1.35,
  TRANSITION_RANDOM_MIN: 0.85,
  TURN_PAUSE_MS: 160,
  TURN_FRAME_MS: 180,
};

const PETTING_CONFIG = {
  MIN_DRAG_DISTANCE: 24,
  RUB_DURATION_MS: 1400,
};

const STARTLED_CONFIG = {
  APPROACH_DISTANCE: 120,
  RUN_COOLDOWN_MS: 4200,
  RUN_DISTANCE: 180,
  RUN_DURATION_MS: 700,
  RUN_REACTION_MULTIPLIER: 0.72,
  STARTLED_DURATION_MS: 280,
  TRIGGER_SPEED: 0.9,
};

const AFFECTIONATE_CONFIG = {
  APPROACH_DISTANCE: 220,
  APPROACH_STEP_DISTANCE: 54,
  APPROACH_COOLDOWN_MS: 1800,
  COMFORT_DISTANCE: 118,
  LINGER_DISTANCE: 96,
  MAX_LINGER_MS: 9000,
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

const CORNER_PREFERENCE_CONFIG = {
  CHANCE: 0.22,
  PADDING: 56,
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

const IDLE_BEHAVIOR_CONFIG = {
  COOLDOWN_MS: 1800,
  LONG_IDLE_SLEEP_MS: 1000 * 60 * 8,
  TABLE: [
    { id: IDLE_ACTION_IDS.SIT, state: CAT_STATES.IDLE, weight: 1.6 },
    { id: IDLE_ACTION_IDS.CURL, state: CAT_STATES.SLEEP, weight: 0.7 },
    { id: IDLE_ACTION_IDS.LOOK, state: CAT_STATES.IDLE, weight: 1.1 },
    { id: IDLE_ACTION_IDS.SCAN, state: CAT_STATES.IDLE, weight: 0.75 },
    { id: IDLE_ACTION_IDS.SCRATCH, state: CAT_STATES.IDLE, weight: 0.55 },
    { id: IDLE_ACTION_IDS.GROOM, state: CAT_STATES.IDLE, weight: 0.65 },
    { id: IDLE_ACTION_IDS.TAIL, state: CAT_STATES.IDLE, weight: 1 },
  ],
};

const SCREEN_AWARENESS_CONFIG = {
  EDGE_PADDING: 44,
};

const MOUSE_GAZE_CONFIG = {
  AWARENESS_DISTANCE: 260,
  AXIS_DEAD_ZONE: 18,
};

const SHORT_PAUSE_CONFIG = {
  CHANCE: 0.35,
  COOLDOWN_MS: 7000,
  DURATION_MS: 420,
  TRIGGER_DISTANCE: 170,
};

const STATE_TRANSITION_CONFIG = {
  DURATION_MS: 180,
  EASING: "cubic-bezier(0.16, 0.86, 0.2, 1)",
};

const SOUND_CONFIG = {
  DEFAULT_ENABLED: false,
  DEFAULT_VOLUME: 0.25,
  MAX_VOLUME: 1,
  MIN_VOLUME: 0,
};

const CAT_PROFILE_CONFIG = {
  DEFAULT_NAME: "고양이",
  MAX_NAME_LENGTH: 16,
};

const STORAGE_CONFIG = {
  PROFILE_KEY: "i-have-a-cat:cat-profile",
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
    cream: "#ffe8b6",
    fur: "#f4a261",
    ear: "#e76f51",
    shadow: "#c96f3f",
  },
  [CAT_FUR_COLOR_IDS.GRAY]: {
    id: CAT_FUR_COLOR_IDS.GRAY,
    name: "회색",
    cream: "#e9ecef",
    fur: "#adb5bd",
    ear: "#6c757d",
    shadow: "#868e96",
  },
  [CAT_FUR_COLOR_IDS.CREAM]: {
    id: CAT_FUR_COLOR_IDS.CREAM,
    name: "크림",
    cream: "#fff3cf",
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

const CAT_RENDERER_IDS = {
  CSS_PIXEL: "css-pixel",
  SPRITE_SHEET: "sprite-sheet",
};

const CAT_SPRITE_SHEET_IDS = {
  BASE: "base",
};

const CAT_SPRITE_SHEETS = {
  [CAT_SPRITE_SHEET_IDS.BASE]: {
    id: CAT_SPRITE_SHEET_IDS.BASE,
    rendererId: CAT_RENDERER_IDS.SPRITE_SHEET,
    src: "./src/assets/sprites/cat-base.png",
    frame: {
      width: 88,
      height: 56,
    },
    sheet: {
      columns: 8,
      rows: 8,
    },
    variants: {
      breeds: Object.values(CAT_BREED_IDS),
      eyeColors: Object.values(CAT_EYE_COLOR_IDS),
      furColors: Object.values(CAT_FUR_COLOR_IDS),
    },
  },
};

const CAT_SPRITE_ANIMATION_IDS = {
  IDLE: "idle",
  RUB: "rub",
  RUN: "run",
  SLEEP: "sleep",
  STARTLED: "startled",
  WALK: "walk",
  TURN: "turn",
};

const CAT_SPRITE_FRAME_TABLE = {
  [CAT_STATES.IDLE]: {
    [CAT_DIRECTIONS.RIGHT]: [
      { x: 0, y: 0, durationMs: 600 },
      { x: 1, y: 0, durationMs: 600 },
    ],
    [CAT_DIRECTIONS.LEFT]: [
      { x: 0, y: 1, durationMs: 600 },
      { x: 1, y: 1, durationMs: 600 },
    ],
  },
  [CAT_STATES.WALK]: {
    [CAT_DIRECTIONS.RIGHT]: [
      { x: 0, y: 2, durationMs: 160 },
      { x: 1, y: 2, durationMs: 160 },
      { x: 2, y: 2, durationMs: 160 },
      { x: 3, y: 2, durationMs: 160 },
    ],
    [CAT_DIRECTIONS.LEFT]: [
      { x: 0, y: 3, durationMs: 160 },
      { x: 1, y: 3, durationMs: 160 },
      { x: 2, y: 3, durationMs: 160 },
      { x: 3, y: 3, durationMs: 160 },
    ],
  },
  [CAT_STATES.SLEEP]: {
    [CAT_DIRECTIONS.RIGHT]: [
      { x: 0, y: 4, durationMs: 900 },
      { x: 1, y: 4, durationMs: 900 },
      { x: 2, y: 4, durationMs: 900 },
    ],
    [CAT_DIRECTIONS.LEFT]: [
      { x: 0, y: 5, durationMs: 900 },
      { x: 1, y: 5, durationMs: 900 },
      { x: 2, y: 5, durationMs: 900 },
    ],
  },
  [CAT_STATES.RUB]: {
    [CAT_DIRECTIONS.RIGHT]: [
      { x: 4, y: 0, durationMs: 175 },
      { x: 5, y: 0, durationMs: 175 },
      { x: 6, y: 0, durationMs: 175 },
      { x: 7, y: 0, durationMs: 175 },
    ],
    [CAT_DIRECTIONS.LEFT]: [
      { x: 4, y: 1, durationMs: 175 },
      { x: 5, y: 1, durationMs: 175 },
      { x: 6, y: 1, durationMs: 175 },
      { x: 7, y: 1, durationMs: 175 },
    ],
  },
  [CAT_STATES.STARTLED]: {
    [CAT_DIRECTIONS.RIGHT]: [
      { x: 4, y: 2, durationMs: 95 },
      { x: 5, y: 2, durationMs: 95 },
      { x: 6, y: 2, durationMs: 95 },
    ],
    [CAT_DIRECTIONS.LEFT]: [
      { x: 4, y: 3, durationMs: 95 },
      { x: 5, y: 3, durationMs: 95 },
      { x: 6, y: 3, durationMs: 95 },
    ],
  },
  [CAT_STATES.RUN]: {
    [CAT_DIRECTIONS.RIGHT]: [
      { x: 4, y: 4, durationMs: 90 },
      { x: 5, y: 4, durationMs: 90 },
      { x: 6, y: 4, durationMs: 90 },
      { x: 7, y: 4, durationMs: 90 },
    ],
    [CAT_DIRECTIONS.LEFT]: [
      { x: 4, y: 5, durationMs: 90 },
      { x: 5, y: 5, durationMs: 90 },
      { x: 6, y: 5, durationMs: 90 },
      { x: 7, y: 5, durationMs: 90 },
    ],
  },
  [CAT_SPRITE_ANIMATION_IDS.TURN]: {
    [CAT_DIRECTIONS.RIGHT]: [{ x: 0, y: 6, durationMs: 180 }],
    [CAT_DIRECTIONS.LEFT]: [{ x: 1, y: 6, durationMs: 180 }],
  },
};

const DEFAULT_CAT_RENDERER_ID = CAT_RENDERER_IDS.CSS_PIXEL;
const DEFAULT_CAT_SPRITE_SHEET_ID = CAT_SPRITE_SHEET_IDS.BASE;

function clampValue(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function isChanceSuccessful(chance) {
  return Math.random() <= clampValue(chance, 0, 1);
}

window.CatConfig = {
  AFFECTIONATE_CONFIG,
  APP_STATES,
  CAT_BREEDS,
  CAT_BREED_IDS,
  CAT_DIRECTIONS,
  CAT_EYE_COLORS,
  CAT_EYE_COLOR_IDS,
  CAT_FUR_COLORS,
  CAT_FUR_COLOR_IDS,
  CAT_PERSONALITIES,
  CAT_POINTER_STATES,
  CAT_PROFILE_CONFIG,
  CAT_RENDERER_IDS,
  CAT_SPRITE_ANIMATION_IDS,
  CAT_SPRITE_FRAME_TABLE,
  CAT_SPRITE_SHEETS,
  CAT_SPRITE_SHEET_IDS,
  CAT_STATES,
  CORNER_PREFERENCE_CONFIG,
  COY_CONFIG,
  DEFAULT_BREED_ID,
  DEFAULT_EYE_COLOR_ID,
  DEFAULT_FUR_COLOR_ID,
  DEFAULT_CAT_RENDERER_ID,
  DEFAULT_CAT_SPRITE_SHEET_ID,
  DEFAULT_PERSONALITY_ID,
  IDLE_ACTION_IDS,
  IDLE_BEHAVIOR_CONFIG,
  MOUSE_GAZE_CONFIG,
  MOVEMENT_CONFIG,
  PERSONALITY_IDS,
  PETTING_CONFIG,
  PLAYFUL_CONFIG,
  RELAXED_CONFIG,
  SCREEN_AWARENESS_CONFIG,
  SHORT_PAUSE_CONFIG,
  SOUND_CONFIG,
  STATE_TRANSITION_CONFIG,
  STARTLED_CONFIG,
  STORAGE_CONFIG,
  TIMID_CONFIG,
  clampValue,
  isChanceSuccessful,
};
