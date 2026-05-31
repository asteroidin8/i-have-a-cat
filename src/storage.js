const {
  CAT_BREEDS,
  CAT_EYE_COLORS,
  CAT_FUR_COLORS,
  CAT_PERSONALITIES,
  CAT_PROFILE_CONFIG,
  DEFAULT_BREED_ID,
  DEFAULT_EYE_COLOR_ID,
  DEFAULT_FUR_COLOR_ID,
  DEFAULT_PERSONALITY_ID,
  SOUND_CONFIG,
  STORAGE_CONFIG,
  clampValue,
} = window.CatConfig;

function normalizeCatName(name) {
  const normalizedName = String(name ?? "")
    .trim()
    .slice(0, CAT_PROFILE_CONFIG.MAX_NAME_LENGTH);

  return normalizedName || CAT_PROFILE_CONFIG.DEFAULT_NAME;
}

function getDefaultCatProfile() {
  return {
    breedId: DEFAULT_BREED_ID,
    eyeColorId: DEFAULT_EYE_COLOR_ID,
    furColorId: DEFAULT_FUR_COLOR_ID,
    name: CAT_PROFILE_CONFIG.DEFAULT_NAME,
    personalityId: DEFAULT_PERSONALITY_ID,
    soundEnabled: SOUND_CONFIG.DEFAULT_ENABLED,
    startAtLogin: false,
    volume: SOUND_CONFIG.DEFAULT_VOLUME,
  };
}

function sanitizeCatProfile(profile) {
  const nextProfile = {
    ...getDefaultCatProfile(),
    ...(profile && typeof profile === "object" ? profile : {}),
  };

  return {
    breedId: CAT_BREEDS[nextProfile.breedId] ? nextProfile.breedId : DEFAULT_BREED_ID,
    eyeColorId: CAT_EYE_COLORS[nextProfile.eyeColorId]
      ? nextProfile.eyeColorId
      : DEFAULT_EYE_COLOR_ID,
    furColorId: CAT_FUR_COLORS[nextProfile.furColorId]
      ? nextProfile.furColorId
      : DEFAULT_FUR_COLOR_ID,
    name: normalizeCatName(nextProfile.name),
    personalityId: CAT_PERSONALITIES[nextProfile.personalityId]
      ? nextProfile.personalityId
      : DEFAULT_PERSONALITY_ID,
    soundEnabled: Boolean(nextProfile.soundEnabled),
    startAtLogin: Boolean(nextProfile.startAtLogin),
    volume: clampValue(
      Number(nextProfile.volume),
      SOUND_CONFIG.MIN_VOLUME,
      SOUND_CONFIG.MAX_VOLUME
    ),
  };
}

function saveCatProfile(profile) {
  try {
    window.localStorage.setItem(STORAGE_CONFIG.PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // 저장소가 막힌 환경에서는 현재 세션 설정만 유지한다.
  }
}

function loadStoredCatProfile() {
  try {
    const storedProfile = window.localStorage.getItem(STORAGE_CONFIG.PROFILE_KEY);

    if (!storedProfile) {
      return getDefaultCatProfile();
    }

    return sanitizeCatProfile(JSON.parse(storedProfile));
  } catch {
    return getDefaultCatProfile();
  }
}

window.CatStorage = {
  getDefaultCatProfile,
  loadStoredCatProfile,
  normalizeCatName,
  sanitizeCatProfile,
  saveCatProfile,
};
