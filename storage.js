/**
 * Gestión de almacenamiento local (localStorage) y sincronización opcional con Supabase
 * mediante variables de entorno inyectadas en window.__ENV__ (sin credenciales hardcodeadas).
 */
(function (app) {
  const STORAGE_KEY = 'ruta_condor_ecuador_session_v2';
  const TEACHER_PREFS_KEY = 'ruta_condor_teacher_prefs_v1';

  function createEmptyStations() {
    const stations = {};
    for (let i = 1; i <= 12; i += 1) {
      stations[i] = { completed: false, correct: false, score: 0, stars: 0 };
    }
    return stations;
  }

  function getTeacherPrefs() {
    try {
      const raw = localStorage.getItem(TEACHER_PREFS_KEY);
      if (!raw) return { timeLimit: 30, maxLives: 3, isUnlimitedLives: false, livesCount: 3 };
      const parsed = JSON.parse(raw);
      return {
        timeLimit: typeof parsed.timeLimit !== 'undefined' ? Number(parsed.timeLimit) : 30,
        maxLives: typeof parsed.maxLives !== 'undefined' ? Number(parsed.maxLives) : 3,
        isUnlimitedLives: Boolean(parsed.isUnlimitedLives),
        livesCount: typeof parsed.livesCount !== 'undefined' ? Number(parsed.livesCount) : 3
      };
    } catch {
      return { timeLimit: 30, maxLives: 3, isUnlimitedLives: false, livesCount: 3 };
    }
  }

  function saveTeacherPrefs(prefs) {
    if (!prefs) return;
    try {
      localStorage.setItem(TEACHER_PREFS_KEY, JSON.stringify(prefs));
    } catch {
      // Silencioso
    }
  }

  function createInitialSession(alias, avatarId, settings = { timeLimit: 30, maxLives: 3 }) {
    const timeLimit = Number(settings.timeLimit) || 0;
    const maxLives = Number(settings.maxLives) || 0;
    return {
      alias,
      avatarId,
      settings: { timeLimit, maxLives },
      livesRemaining: maxLives,
      currentStation: 1,
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stations: createEmptyStations(),
      regions: {
        costa: { completed: false, correctCount: 0, score: 0, stars: 0, badgeUnlocked: false },
        sierra: { completed: false, correctCount: 0, score: 0, stars: 0, badgeUnlocked: false },
        amazonia: { completed: false, correctCount: 0, score: 0, stars: 0, badgeUnlocked: false },
        galapagos: { completed: false, correctCount: 0, score: 0, stars: 0, badgeUnlocked: false }
      }
    };
  }

  function loadSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.alias || !parsed.regions || !parsed.stations) return null;
      if (!parsed.settings) {
        parsed.settings = { timeLimit: 0, maxLives: 0 };
        parsed.livesRemaining = 0;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  function saveSession(session) {
    if (!session) return;
    session.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      // Silencioso si el almacenamiento está restringido
    }
    syncToSupabase(session);
  }

  function clearSession() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Silencioso
    }
  }

  /**
   * Envía el progreso anónimo (alias, puntaje, estrellas y estación actual) a Supabase
   * únicamente si SUPABASE_URL y SUPABASE_ANON_KEY están configurados en window.__ENV__.
   */
  async function syncToSupabase(session) {
    const env = window.__ENV__ || {};
    const supabaseUrl = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return { synced: false, reason: 'env_not_configured' };
    }

    const totalScore = Object.values(session.regions).reduce((acc, r) => acc + r.score, 0);
    const totalStars = Object.values(session.regions).reduce((acc, r) => acc + r.stars, 0);

    const payload = {
      explorer_alias: session.alias,
      avatar_id: session.avatarId,
      current_station: session.currentStation,
      total_score: totalScore,
      total_stars: totalStars,
      stations_progress: session.stations,
      regions_progress: session.regions,
      updated_at: session.updatedAt
    };

    try {
      const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/explorer_progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'resolution=merge-duplicates'
        },
        body: JSON.stringify(payload)
      });
      return { synced: response.ok };
    } catch {
      return { synced: false, reason: 'network_error' };
    }
  }

  app.storage = {
    createInitialSession,
    loadSession,
    saveSession,
    clearSession,
    getTeacherPrefs,
    saveTeacherPrefs,
    syncToSupabase
  };
})(window.RutaCondor = window.RutaCondor || {});
