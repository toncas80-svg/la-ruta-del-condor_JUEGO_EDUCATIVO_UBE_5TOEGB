(function (app) {
  const { REGIONS, STATIONS, SURVEY_URL } = app.data;
  const { speakText, stopSpeaking } = app.speech;
  const {
    createInitialSession,
    loadSession,
    saveSession,
    clearSession,
    getTeacherPrefs,
    saveTeacherPrefs
  } = app.storage;
  const {
    AVATARS,
    getAvatarSvg,
    getBadgeSvg,
    getWindingTrailMapSvg,
    getMiniTrailSvg,
    getIconSvg,
    getRegionSceneSvg,
    getTupakSvg,
    getCelebrationSparklesSvg
  } = app.svg;

  const LETTERS = ['A', 'B', 'C'];

  const state = {
    session: null,
    selectedAvatar: AVATARS[0].id,
    activeStationNumber: 1,
    selectedOptionIndex: null,
    attemptNumber: 1,
    questionResolved: false,
    celebrationCallback: null,
    timerId: null,
    timeRemaining: 0,
    walkFromStation: null
  };

  const el = {};

  function cacheElements() {
    el.header = document.getElementById('app-header');
    el.headerAvatar = document.getElementById('header-avatar');
    el.headerAliasText = document.getElementById('header-alias-text');
    el.progressPercent = document.getElementById('progress-percent');
    el.headerScore = document.getElementById('header-score');
    el.headerStars = document.getElementById('header-stars');
    el.globalProgressBar = document.getElementById('global-progress-bar');
    el.globalProgressFill = document.getElementById('global-progress-fill');
    el.btnGoMap = document.getElementById('btn-go-map');
    el.btnLogout = document.getElementById('btn-logout');

    el.views = {
      login: document.getElementById('view-login'),
      map: document.getElementById('view-map'),
      level: document.getElementById('view-level'),
      summary: document.getElementById('view-summary')
    };

    el.loginForm = document.getElementById('login-form');
    el.inputAlias = document.getElementById('input-alias');
    el.aliasError = document.getElementById('alias-error');
    el.avatarGrid = document.getElementById('avatar-grid');
    el.avatarError = document.getElementById('avatar-error');

    el.btnLivesMinus = document.getElementById('btn-lives-minus');
    el.btnLivesPlus = document.getElementById('btn-lives-plus');
    el.livesDisplay = document.getElementById('lives-display');
    el.checkLivesUnlimited = document.getElementById('check-lives-unlimited');
    el.selectTimeLimit = document.getElementById('select-time-limit');

    el.regionTabsNav = document.getElementById('region-tabs-nav');
    el.ecuadorMapContainer = document.getElementById('ecuador-map-container');
    el.mapBadgesGrid = document.getElementById('map-badges-grid');
    el.tupakMapTip = document.getElementById('tupak-map-tip');
    el.btnOpenSummary = document.getElementById('btn-open-summary');

    el.sceneSvgBg = document.getElementById('scene-svg-bg');
    el.miniTrailBar = document.getElementById('mini-trail-bar');
    el.levelRegionPill = document.getElementById('level-region-pill');
    el.levelTitle = document.getElementById('level-title');
    el.levelSubtitle = document.getElementById('level-subtitle');
    el.questionCounter = document.getElementById('question-counter');
    el.hudTimer = document.getElementById('hud-timer');
    el.hudLives = document.getElementById('hud-lives');
    el.questionText = document.getElementById('question-text');
    el.optionsList = document.getElementById('options-list');
    el.feedbackBox = document.getElementById('feedback-box');
    el.feedbackBadge = document.getElementById('feedback-badge');
    el.feedbackMessage = document.getElementById('feedback-message');
    el.culturalFactBox = document.getElementById('cultural-fact-box');
    el.culturalFactText = document.getElementById('cultural-fact-text');
    el.btnSpeakQuestion = document.getElementById('btn-speak-question');
    el.btnSpeakFeedback = document.getElementById('btn-speak-feedback');
    el.btnBackToMap = document.getElementById('btn-back-to-map');
    el.btnSubmitAnswer = document.getElementById('btn-submit-answer');
    el.btnRetryStation = document.getElementById('btn-retry-station');
    el.btnNextQuestion = document.getElementById('btn-next-question');
    el.tupakLevelContainer = document.getElementById('tupak-level-container');
    el.tupakLevelStatus = document.getElementById('tupak-level-status');
    el.levelStarsDisplay = document.getElementById('level-stars-display');

    el.summaryAlias = document.getElementById('summary-alias');
    el.summaryScore = document.getElementById('summary-score');
    el.summaryStars = document.getElementById('summary-stars');
    el.summaryBadgesCount = document.getElementById('summary-badges-count');
    el.summaryTableBody = document.getElementById('summary-table-body');
    el.summaryBadgesGrid = document.getElementById('summary-badges-grid');
    el.btnPrintCertificate = document.getElementById('btn-print-certificate');
    el.certAlias = document.getElementById('cert-alias');
    el.certScore = document.getElementById('cert-score');
    el.certStars = document.getElementById('cert-stars');
    el.certBadgesCount = document.getElementById('cert-badges-count');
    el.certDate = document.getElementById('cert-date');
    el.certTupakSlot = document.getElementById('cert-tupak-slot');
    el.certAvatarSlot = document.getElementById('cert-avatar-slot');
    el.certBadgesGrid = document.getElementById('cert-badges-grid');
    el.btnDownloadCsv = document.getElementById('btn-download-csv');
    el.btnDownloadJson = document.getElementById('btn-download-json');
    el.btnSurveyLink = document.getElementById('btn-survey-link');
    el.btnSummaryBackMap = document.getElementById('btn-summary-back-map');
    el.btnRestartExpedition = document.getElementById('btn-restart-expedition');

    el.celebrationModal = document.getElementById('celebration-modal');
    el.celebrationCard = document.getElementById('celebration-card');
    el.celebrationSparkles = document.getElementById('celebration-sparkles');
    el.celebrationVisual = document.getElementById('celebration-visual');
    el.celebrationTitle = document.getElementById('celebration-title');
    el.celebrationText = document.getElementById('celebration-text');
    el.celebrationCulturalBox = document.getElementById('celebration-cultural-box');
    el.celebrationCulturalText = document.getElementById('celebration-cultural-text');
    el.btnSpeakCelebration = document.getElementById('btn-speak-celebration');
    el.btnCelebrationContinue = document.getElementById('btn-celebration-continue');
    el.btnCelebrationBackMap = document.getElementById('btn-celebration-back-map');
  }

  function hydrateStaticGraphics() {
    document.querySelectorAll('.icon-slot').forEach(slot => {
      const iconName = slot.getAttribute('data-icon');
      slot.innerHTML = getIconSvg(iconName);
    });

    document.getElementById('tupak-login-container').innerHTML = getTupakSvg('happy');
    document.getElementById('tupak-map-container').innerHTML = getTupakSvg('happy');
    document.getElementById('tupak-summary-container').innerHTML = getTupakSvg('celebrate');
    el.tupakLevelContainer.innerHTML = getTupakSvg('happy');
  }

  function renderAvatarSelector() {
    el.avatarGrid.innerHTML = '';
    AVATARS.forEach(avatar => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `avatar-option ${state.selectedAvatar === avatar.id ? 'selected' : ''}`;
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', String(state.selectedAvatar === avatar.id));
      btn.dataset.avatarId = avatar.id;
      btn.innerHTML = `
        <span class="avatar-svg-box">${getAvatarSvg(avatar.id)}</span>
        <span>${avatar.label}</span>
      `;
      btn.addEventListener('click', () => {
        state.selectedAvatar = avatar.id;
        el.avatarError.textContent = '';
        renderAvatarSelector();
      });
      el.avatarGrid.appendChild(btn);
    });
  }

  let teacherSettings = {
    timeLimit: 30,
    maxLives: 3,
    isUnlimitedLives: false,
    livesCount: 3
  };

  function syncTeacherUi() {
    if (!el.livesDisplay) return;
    if (teacherSettings.isUnlimitedLives) {
      el.checkLivesUnlimited.checked = true;
      el.btnLivesMinus.disabled = true;
      el.btnLivesPlus.disabled = true;
      el.livesDisplay.textContent = 'Sin límite';
    } else {
      el.checkLivesUnlimited.checked = false;
      el.btnLivesMinus.disabled = teacherSettings.livesCount <= 1;
      el.btnLivesPlus.disabled = teacherSettings.livesCount >= 10;
      el.livesDisplay.textContent = `${teacherSettings.livesCount} ${teacherSettings.livesCount === 1 ? 'vida' : 'vidas'}`;
    }
    el.selectTimeLimit.value = String(teacherSettings.timeLimit);
  }

  function stopQuestionTimer() {
    if (state.timerId !== null) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function updateHudDisplay() {
    const { timeLimit, maxLives } = state.session.settings || { timeLimit: 0, maxLives: 0 };

    if (timeLimit > 0) {
      el.hudTimer.hidden = false;
      if (state.timeRemaining <= 5) {
        el.hudTimer.textContent = `⏱ ¡${state.timeRemaining}s!`;
        el.hudTimer.classList.remove('hud-pill-warn');
        el.hudTimer.classList.add('hud-pill-danger');
      } else if (state.timeRemaining <= 10) {
        el.hudTimer.textContent = `⏱ ${state.timeRemaining}s`;
        el.hudTimer.classList.add('hud-pill-warn');
        el.hudTimer.classList.remove('hud-pill-danger');
      } else {
        el.hudTimer.textContent = `⏱ ${state.timeRemaining}s`;
        el.hudTimer.classList.remove('hud-pill-warn', 'hud-pill-danger');
      }
    } else {
      el.hudTimer.hidden = true;
      el.hudTimer.classList.remove('hud-pill-warn', 'hud-pill-danger');
    }

    if (maxLives > 0) {
      el.hudLives.hidden = false;
      const count = Math.max(0, state.session.livesRemaining);
      const hearts = '♥'.repeat(Math.min(count, 7)) + (count > 7 ? ` (+${count - 7})` : '') +
        (count < maxLives && maxLives <= 7 ? '♡'.repeat(maxLives - count) : '');
      el.hudLives.textContent = `Vidas: ${hearts || '0'}`;
      el.hudLives.classList.toggle('hud-pill-warn', state.session.livesRemaining <= 1);
    } else {
      el.hudLives.hidden = true;
    }
  }

  function startQuestionTimer() {
    stopQuestionTimer();
    const { timeLimit } = state.session.settings || { timeLimit: 0 };
    if (!timeLimit || timeLimit <= 0) {
      updateHudDisplay();
      return;
    }

    state.timeRemaining = timeLimit;
    updateHudDisplay();

    state.timerId = setInterval(() => {
      state.timeRemaining -= 1;
      updateHudDisplay();
      if (state.timeRemaining <= 0) {
        handleTimeExpired();
      }
    }, 1000);
  }

  function handleTimeExpired() {
    stopQuestionTimer();
    if (state.questionResolved) return;

    state.questionResolved = true;
    const meta = STATIONS.find(s => s.stationNumber === state.activeStationNumber);
    const { maxLives } = state.session.settings || { maxLives: 0 };

    if (maxLives > 0) {
      state.session.livesRemaining = Math.max(0, state.session.livesRemaining - 1);
      saveSession(state.session);
    }
    updateHudDisplay();

    el.optionsList.querySelectorAll('.option-btn').forEach(b => { b.disabled = true; });
    el.btnSubmitAnswer.hidden = true;
    el.btnNextQuestion.hidden = true;
    el.btnRetryStation.hidden = false;

    el.feedbackBox.hidden = false;
    el.feedbackBox.className = 'feedback-box feedback-hint';
    el.culturalFactBox.hidden = true;

    if (maxLives > 0 && state.session.livesRemaining <= 0) {
      el.feedbackBadge.textContent = '¡Se agotaron las vidas de expedición!';
      el.feedbackMessage.textContent = 'Se agotaron sus vidas al expirar el tiempo. Puede recuperarlas para continuar en esta estación o regresar al mapa.';
      el.btnRetryStation.textContent = 'Aumentar / recuperar vidas';
      openCelebrationModal({
        variant: 'hint',
        showSparkles: false,
        showBackMap: true,
        title: '¡Se agotaron las vidas de expedición!',
        text: 'Se terminó el tiempo y las vidas de la expedición. ¡No se desanime! Puede recuperar vidas ahora mismo o volver al sendero para ver su avance.',
        visualHtml: getTupakSvg('happy'),
        buttonText: 'Aumentar / recuperar vidas',
        onContinue: () => {
          state.session.livesRemaining = Math.max(3, maxLives);
          saveSession(state.session);
          renderStationView();
        },
        onBackMap: () => {
          state.session.livesRemaining = Math.max(3, maxLives);
          saveSession(state.session);
          renderMapView();
        }
      });
    } else {
      const livesInfo = maxLives > 0 ? ` (Perdió 1 vida. Quedan ${state.session.livesRemaining} vidas)` : '';
      el.feedbackBadge.textContent = '¡Tiempo cumplido!';
      el.feedbackMessage.textContent = meta.question.hint + livesInfo;
      el.btnRetryStation.textContent = 'Intentar de nuevo';
      openCelebrationModal({
        variant: 'hint',
        showSparkles: false,
        title: '¡Tiempo cumplido!',
        text: meta.question.hint + (maxLives > 0 ? ` Perdió 1 vida por el tiempo. Le quedan ${state.session.livesRemaining} vidas.` : ''),
        visualHtml: getTupakSvg('happy'),
        buttonText: 'Intentar de nuevo',
        onContinue: () => renderStationView()
      });
    }
    el.tupakLevelStatus.textContent = 'Respire profundo, lea la pista y vuelva a intentarlo con calma.';
  }

  function showView(viewName) {
    stopSpeaking();
    stopQuestionTimer();
    Object.entries(el.views).forEach(([key, section]) => {
      const isActive = key === viewName;
      section.hidden = !isActive;
      section.classList.toggle('active', isActive);
    });

    const showHeader = viewName !== 'login';
    el.header.hidden = !showHeader;
    el.btnGoMap.hidden = viewName === 'map' || viewName === 'login';
    if (viewName !== 'map') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function recalculateRegionsFromStations() {
    REGIONS.forEach(region => {
      const regionStations = region.questions.map(q => state.session.stations[q.stationNumber]);
      const completed = regionStations.every(s => s.completed);
      const correctCount = regionStations.reduce((acc, s) => acc + (s.correct ? 1 : 0), 0);
      const score = regionStations.reduce((acc, s) => acc + s.score, 0);
      const stars = regionStations.reduce((acc, s) => acc + s.stars, 0);

      state.session.regions[region.id] = {
        completed,
        correctCount,
        score,
        stars,
        badgeUnlocked: completed
      };
    });
  }

  function updateGlobalHeader() {
    if (!state.session) return;
    const completedStations = STATIONS.filter(m => state.session.stations[m.stationNumber]?.completed).length;
    const percent = Math.round((completedStations / STATIONS.length) * 100);
    const totalScore = REGIONS.reduce((acc, r) => acc + state.session.regions[r.id].score, 0);
    const totalStars = REGIONS.reduce((acc, r) => acc + state.session.regions[r.id].stars, 0);

    el.headerAvatar.innerHTML = getAvatarSvg(state.session.avatarId);
    el.headerAliasText.textContent = state.session.alias;
    el.progressPercent.textContent = `${percent}%`;
    el.headerScore.textContent = totalScore;
    el.headerStars.textContent = `${totalStars}/12`;
    el.globalProgressBar.setAttribute('aria-valuenow', String(percent));
    el.globalProgressFill.style.width = `${percent}%`;
  }

  function renderBadgesGrid(container) {
    container.innerHTML = '';
    REGIONS.forEach(region => {
      const unlocked = state.session.regions[region.id].badgeUnlocked;
      const div = document.createElement('div');
      div.className = `badge-slot ${unlocked ? 'unlocked' : 'locked'}`;
      div.innerHTML = `
        ${getBadgeSvg(region.id)}
        <span>${region.badgeName}</span>
      `;
      container.appendChild(div);
    });
  }

  function renderRegionTabsNav() {
    el.regionTabsNav.innerHTML = '';
    const shortNames = {
      costa: 'Costa',
      sierra: 'Sierra',
      amazonia: 'Amazonía',
      galapagos: 'Galápagos'
    };

    REGIONS.forEach(region => {
      const rData = state.session.regions[region.id];
      const regionStations = region.questions.map(q => q.stationNumber);
      const hasUnlockedStation = regionStations.some(n => n <= state.session.currentStation);
      const nextStationInRegion = regionStations.find(n => !state.session.stations[n].completed) || regionStations[0];

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.disabled = !hasUnlockedStation;

      if (rData.completed) {
        btn.className = 'region-tab-btn is-completed';
        btn.innerHTML = `<span>✓</span><span>${shortNames[region.id]}</span>`;
      } else if (hasUnlockedStation) {
        btn.className = 'region-tab-btn is-available';
        btn.innerHTML = `<span>★</span><span>${shortNames[region.id]}</span>`;
      } else {
        btn.className = 'region-tab-btn';
        btn.innerHTML = `<span aria-hidden="true">${getIconSvg('lock')}</span><span>${shortNames[region.id]}</span>`;
      }

      if (hasUnlockedStation) {
        btn.addEventListener('click', () => startStation(nextStationInRegion));
      }
      el.regionTabsNav.appendChild(btn);
    });
  }

  function renderMapView() {
    recalculateRegionsFromStations();
    updateGlobalHeader();
    renderRegionTabsNav();

    const fromStation = state.walkFromStation;
    state.walkFromStation = null;

    el.ecuadorMapContainer.innerHTML = getWindingTrailMapSvg(state.session, STATIONS, fromStation);
    const walker = document.getElementById('trail-avatar-walker');
    if (walker && fromStation && fromStation !== state.session.currentStation) {
      const targetX = walker.getAttribute('data-target-x');
      const targetY = walker.getAttribute('data-target-y');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          walker.style.transform = `translate(${targetX}px, ${targetY}px)`;
        });
      });
    }
    el.ecuadorMapContainer.querySelectorAll('.trail-station-node').forEach(node => {
      const stationNumber = Number(node.getAttribute('data-station'));
      const status = node.getAttribute('data-status');
      if (status !== 'locked') {
        node.addEventListener('click', () => startStation(stationNumber));
        node.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            startStation(stationNumber);
          }
        });
      }
    });

    renderBadgesGrid(el.mapBadgesGrid);

    const completedStations = STATIONS.filter(m => state.session.stations[m.stationNumber]?.completed).length;
    el.btnOpenSummary.hidden = completedStations < STATIONS.length;

    if (completedStations === STATIONS.length) {
      el.tupakMapTip.textContent = '¡Misión cumplida! Completó las 12 estaciones y desbloqueó las 4 insignias del Ecuador.';
    } else {
      const currentMeta = STATIONS.find(s => s.stationNumber === state.session.currentStation);
      el.tupakMapTip.textContent = `Lleva ${completedStations} de 12 estaciones. Siguiente parada: Estación ${currentMeta.stationNumber} (${currentMeta.stationTitle}).`;
    }

    showView('map');

    const activeNode = el.ecuadorMapContainer.querySelector(`[data-station="${state.session.currentStation}"]`);
    if (activeNode) {
      requestAnimationFrame(() => {
        activeNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }

  function startStation(stationNumber) {
    state.activeStationNumber = stationNumber;
    renderStationView();
    showView('level');
  }

  function renderStationView() {
    const meta = STATIONS.find(s => s.stationNumber === state.activeStationNumber);
    const question = meta.question;

    state.selectedOptionIndex = null;
    state.attemptNumber = 1;
    state.questionResolved = false;

    el.sceneSvgBg.innerHTML = getRegionSceneSvg(meta.regionId);
    el.miniTrailBar.innerHTML = getMiniTrailSvg(state.session, state.activeStationNumber);
    el.levelRegionPill.textContent = `${meta.regionName} • Estación ${meta.stationNumber} de 12`;
    el.levelTitle.textContent = meta.stationTitle;
    el.levelSubtitle.textContent = meta.regionSubtitle;
    el.questionCounter.textContent = `Reto ${meta.indexInRegion + 1} de 3`;
    el.questionText.textContent = question.prompt;

    const regionStars = state.session.regions[meta.regionId].stars;
    el.tupakLevelContainer.innerHTML = getTupakSvg('happy');
    el.tupakLevelStatus.textContent = 'Lea con calma cada opción. Si necesita ayuda, pulse "Escuchar pregunta".';
    el.levelStarsDisplay.textContent = '★'.repeat(regionStars) + '☆'.repeat(3 - regionStars);

    el.feedbackBox.hidden = true;
    el.culturalFactBox.hidden = true;
    el.btnSubmitAnswer.disabled = true;
    el.btnSubmitAnswer.hidden = false;
    el.btnRetryStation.hidden = true;
    el.btnNextQuestion.hidden = true;

    startQuestionTimer();

    el.optionsList.innerHTML = '';
    question.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', 'false');
      btn.dataset.index = String(idx);
      btn.innerHTML = `
        <span class="option-letter">${LETTERS[idx]}</span>
        <span>${optText}</span>
      `;
      btn.addEventListener('click', () => selectOption(idx));
      el.optionsList.appendChild(btn);
    });
  }

  function selectOption(index) {
    if (state.questionResolved) return;
    state.selectedOptionIndex = index;
    el.btnSubmitAnswer.disabled = false;

    el.optionsList.querySelectorAll('.option-btn').forEach(btn => {
      const idx = Number(btn.dataset.index);
      const isSelected = idx === index;
      btn.classList.toggle('selected', isSelected);
      btn.setAttribute('aria-checked', String(isSelected));
    });
  }

  function completeCurrentStation(correct, pointsEarned) {
    const n = state.activeStationNumber;
    const prev = state.session.stations[n];
    const starsEarned = correct ? 1 : 0;

    state.session.stations[n] = {
      completed: true,
      correct: prev.correct || correct,
      score: Math.max(prev.score, pointsEarned),
      stars: Math.max(prev.stars, starsEarned)
    };

    if (n >= state.session.currentStation && n < STATIONS.length) {
      state.walkFromStation = state.session.currentStation;
      state.session.currentStation = n + 1;
    } else if (n === STATIONS.length) {
      state.session.currentStation = STATIONS.length;
    }

    recalculateRegionsFromStations();
    saveSession(state.session);
    updateGlobalHeader();
  }

  function handleAnswerSubmit() {
    if (state.selectedOptionIndex === null || state.questionResolved) return;

    const meta = STATIONS.find(s => s.stationNumber === state.activeStationNumber);
    const question = meta.question;
    const isCorrect = state.selectedOptionIndex === question.correctIndex;
    const optionButtons = el.optionsList.querySelectorAll('.option-btn');

    if (isCorrect) {
      stopQuestionTimer();
      state.questionResolved = true;
      const pointsEarned = state.attemptNumber === 1 ? 10 : 5;
      completeCurrentStation(true, pointsEarned);
      el.miniTrailBar.innerHTML = getMiniTrailSvg(state.session, state.activeStationNumber);

      let lifeBonusText = '';
      const { maxLives } = state.session.settings || { maxLives: 0 };
      if (maxLives > 0) {
        const maxCap = Math.max(7, maxLives);
        if (state.session.livesRemaining < maxCap) {
          state.session.livesRemaining += 1;
          lifeBonusText = ' • ¡Ganó +1 vida! ♥';
        } else {
          lifeBonusText = ' • Vidas al máximo ♥';
        }
        saveSession(state.session);
        updateHudDisplay();
      }

      optionButtons[state.selectedOptionIndex].classList.add('is-correct');
      optionButtons.forEach(b => { b.disabled = true; });

      el.feedbackBox.hidden = false;
      el.feedbackBox.className = 'feedback-box feedback-success';
      el.feedbackBadge.textContent = `¡Excelente respuesta! (+${pointsEarned} puntos • ★${lifeBonusText})`;
      el.feedbackMessage.textContent = state.attemptNumber === 1
        ? 'Ha completado esta estación en el primer intento. ¡Avance por el camino!'
        : '¡Muy bien! Aprovechó la pista pedagógica y completó la estación.';
      el.culturalFactBox.hidden = false;
      el.culturalFactText.textContent = question.culturalFact;

      const regionStars = state.session.regions[meta.regionId].stars;
      el.tupakLevelContainer.innerHTML = getTupakSvg('celebrate');
      el.tupakLevelStatus.textContent = `¡Estación completada! Ha ganado una estrella en el camino.${lifeBonusText}`;
      el.levelStarsDisplay.textContent = '★'.repeat(regionStars) + '☆'.repeat(3 - regionStars);

      el.btnSubmitAnswer.hidden = true;
      el.btnNextQuestion.hidden = false;
      el.btnNextQuestion.textContent = state.activeStationNumber < STATIONS.length
        ? 'Siguiente estación'
        : 'Ver certificado final';

      const regionData = state.session.regions[meta.regionId];
      const allCompleted = STATIONS.every(s => state.session.stations[s.stationNumber].completed);

      if (allCompleted && meta.stationNumber === STATIONS.length) {
        openCelebrationModal({
          variant: 'success',
          showSparkles: true,
          title: '¡Felicitaciones, explorador!',
          text: `¡Excelente! Completó las 12 estaciones de La Ruta del Cóndor y obtuvo las 4 insignias regionales del Ecuador.${lifeBonusText}`,
          culturalFact: question.culturalFact,
          visualHtml: getTupakSvg('celebrate'),
          buttonText: 'Ver certificado final',
          onContinue: () => renderSummaryView()
        });
      } else if (regionData.badgeUnlocked && meta.indexInRegion === 2) {
        openCelebrationModal({
          variant: 'success',
          showSparkles: true,
          title: '¡Felicitaciones, explorador!',
          text: `Completó las 3 estaciones de ${meta.regionName} y desbloqueó la insignia "${meta.badgeName}" (+${pointsEarned} pts${lifeBonusText}).`,
          culturalFact: question.culturalFact,
          visualHtml: getBadgeSvg(meta.regionId),
          buttonText: 'Siguiente estación',
          onContinue: () => renderMapView()
        });
      } else {
        openCelebrationModal({
          variant: 'success',
          showSparkles: true,
          title: '¡Excelente!',
          text: `Respuesta correcta en la Estación ${meta.stationNumber}: ${meta.stationTitle} (+${pointsEarned} puntos • ★${lifeBonusText}).`,
          culturalFact: question.culturalFact,
          visualHtml: getTupakSvg('celebrate'),
          buttonText: state.activeStationNumber < STATIONS.length ? 'Siguiente estación' : 'Ver certificado final',
          onContinue: () => handleNextAfterStation()
        });
      }
      return;
    }

    // Respuesta incorrecta
    optionButtons[state.selectedOptionIndex].classList.add('is-wrong');
    optionButtons[state.selectedOptionIndex].disabled = true;

    const { maxLives } = state.session.settings || { maxLives: 0 };
    if (maxLives > 0) {
      state.session.livesRemaining = Math.max(0, state.session.livesRemaining - 1);
      saveSession(state.session);
      updateHudDisplay();
    }

    if (maxLives > 0 && state.session.livesRemaining <= 0) {
      stopQuestionTimer();
      state.questionResolved = true;
      optionButtons.forEach(b => { b.disabled = true; });
      el.btnSubmitAnswer.hidden = true;
      el.btnNextQuestion.hidden = true;
      el.btnRetryStation.hidden = false;
      el.btnRetryStation.textContent = 'Aumentar / recuperar vidas';
      el.feedbackBox.hidden = false;
      el.feedbackBox.className = 'feedback-box feedback-hint';
      el.feedbackBadge.textContent = '¡Se agotaron las vidas de expedición!';
      el.feedbackMessage.textContent = 'Se agotaron sus vidas en este intento, pero puede aumentarlas o recuperarlas ahora mismo: ' + question.hint;
      el.culturalFactBox.hidden = true;
      el.tupakLevelStatus.textContent = '¡Ánimo! Puede recuperar sus vidas para volver a intentarlo.';
      openCelebrationModal({
        variant: 'hint',
        showSparkles: false,
        showBackMap: true,
        title: '¡Se agotaron las vidas de expedición!',
        text: 'Se han terminado las vidas en este reto. Puede recuperarlas para continuar en esta estación o volver al sendero para revisar su camino.',
        visualHtml: getTupakSvg('happy'),
        buttonText: 'Aumentar / recuperar vidas',
        onContinue: () => {
          state.session.livesRemaining = Math.max(3, maxLives);
          saveSession(state.session);
          renderStationView();
        },
        onBackMap: () => {
          state.session.livesRemaining = Math.max(3, maxLives);
          saveSession(state.session);
          renderMapView();
        }
      });
      return;
    }

    if (state.attemptNumber === 1) {
      state.attemptNumber = 2;
      state.selectedOptionIndex = null;
      el.btnSubmitAnswer.disabled = true;

      el.feedbackBox.hidden = false;
      el.feedbackBox.className = 'feedback-box feedback-hint';
      el.feedbackBadge.textContent = '¡Inténtelo una vez más!';
      const livesNotice = maxLives > 0 ? ` (Perdió 1 vida. Le quedan ${state.session.livesRemaining} vidas)` : '';
      el.feedbackMessage.textContent = question.hint + livesNotice;
      el.culturalFactBox.hidden = true;
      el.tupakLevelStatus.textContent = 'Tiene una segunda oportunidad. Lea la pista de Tupak con atención.';

      openCelebrationModal({
        variant: 'hint',
        showSparkles: false,
        title: '¡Inténtelo una vez más!',
        text: question.hint + (maxLives > 0 ? ` Perdió 1 vida. Le quedan ${state.session.livesRemaining} vidas.` : ''),
        visualHtml: getTupakSvg('happy'),
        buttonText: 'Volver a intentar',
        onContinue: () => {
          startQuestionTimer();
        }
      });
    } else {
      stopQuestionTimer();
      state.questionResolved = true;
      completeCurrentStation(false, 0);

      optionButtons[question.correctIndex].classList.add('is-correct');
      optionButtons.forEach(b => { b.disabled = true; });

      el.feedbackBox.hidden = false;
      el.feedbackBox.className = 'feedback-box feedback-hint';
      el.feedbackBadge.textContent = '¡Buen esfuerzo! Sigamos aprendiendo';
      el.feedbackMessage.textContent = `La respuesta correcta es: "${question.options[question.correctIndex]}".`;
      el.culturalFactBox.hidden = false;
      el.culturalFactText.textContent = question.culturalFact;
      el.tupakLevelStatus.textContent = 'No se preocupe, cada estación nos enseña algo valioso sobre el Ecuador.';

      el.btnSubmitAnswer.hidden = true;
      el.btnNextQuestion.hidden = false;
      el.btnNextQuestion.textContent = state.activeStationNumber < STATIONS.length
        ? 'Siguiente estación'
        : 'Ver certificado final';

      openCelebrationModal({
        variant: 'hint',
        showSparkles: false,
        title: '¡Buen esfuerzo! Sigamos aprendiendo',
        text: `La respuesta correcta es: "${question.options[question.correctIndex]}".`,
        culturalFact: question.culturalFact,
        visualHtml: getTupakSvg('happy'),
        buttonText: state.activeStationNumber < STATIONS.length ? 'Siguiente estación' : 'Ver certificado final',
        onContinue: () => handleNextAfterStation()
      });
    }
  }

  function openCelebrationModal({
    variant = 'success',
    title,
    text,
    culturalFact = '',
    visualHtml,
    buttonText,
    showSparkles = true,
    showBackMap = false,
    onContinue = null,
    onBackMap = null
  }) {
    stopSpeaking();
    stopQuestionTimer();
    el.celebrationCard.classList.remove('is-success', 'is-hint');
    el.celebrationCard.classList.add(variant === 'hint' ? 'is-hint' : 'is-success');

    el.celebrationSparkles.hidden = !showSparkles;
    el.celebrationSparkles.innerHTML = showSparkles ? getCelebrationSparklesSvg() : '';
    el.celebrationVisual.innerHTML = visualHtml;
    el.celebrationTitle.textContent = title;
    el.celebrationText.textContent = text;

    if (culturalFact) {
      el.celebrationCulturalBox.hidden = false;
      el.celebrationCulturalText.textContent = culturalFact;
    } else {
      el.celebrationCulturalBox.hidden = true;
      el.celebrationCulturalText.textContent = '';
    }

    el.btnCelebrationContinue.textContent = buttonText || 'Continuar';
    state.celebrationCallback = onContinue || null;

    if (showBackMap && el.btnCelebrationBackMap) {
      el.btnCelebrationBackMap.hidden = false;
      el.btnCelebrationBackMap.onclick = () => {
        closeCelebrationModal();
        if (typeof onBackMap === 'function') {
          onBackMap();
        } else {
          renderMapView();
        }
      };
    } else if (el.btnCelebrationBackMap) {
      el.btnCelebrationBackMap.hidden = true;
      el.btnCelebrationBackMap.onclick = null;
    }

    el.celebrationModal.hidden = false;
    el.btnCelebrationContinue.focus();
  }

  function closeCelebrationModal() {
    stopSpeaking();
    el.celebrationModal.hidden = true;
    const cb = state.celebrationCallback;
    state.celebrationCallback = null;
    if (typeof cb === 'function') {
      cb();
    }
  }

  function handleNextAfterStation() {
    stopSpeaking();
    const allCompleted = STATIONS.every(s => state.session.stations[s.stationNumber].completed);
    if (allCompleted && state.activeStationNumber === STATIONS.length) {
      renderSummaryView();
    } else {
      renderMapView();
    }
  }

  function renderSummaryView() {
    recalculateRegionsFromStations();
    updateGlobalHeader();

    const totalScore = REGIONS.reduce((acc, r) => acc + state.session.regions[r.id].score, 0);
    const totalStars = REGIONS.reduce((acc, r) => acc + state.session.regions[r.id].stars, 0);
    const badgesCount = REGIONS.filter(r => state.session.regions[r.id].badgeUnlocked).length;

    el.summaryAlias.textContent = state.session.alias;
    el.summaryScore.textContent = `${totalScore} / 120 pts`;
    el.summaryStars.textContent = `${totalStars} / 12 ★`;
    el.summaryBadgesCount.textContent = `${badgesCount} / 4`;
    el.btnSurveyLink.href = SURVEY_URL;

    el.summaryTableBody.innerHTML = '';
    REGIONS.forEach(region => {
      const rData = state.session.regions[region.id];
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${region.name}</strong></td>
        <td>${rData.correctCount} / 3</td>
        <td>${rData.score} pts</td>
        <td>${'★'.repeat(rData.stars)}${'☆'.repeat(3 - rData.stars)}</td>
        <td>${rData.badgeUnlocked ? region.badgeName : 'Pendiente'}</td>
      `;
      el.summaryTableBody.appendChild(tr);
    });

    renderBadgesGrid(el.summaryBadgesGrid);
    renderCertificate();
    showView('summary');
  }

  function renderCertificate() {
    if (!state.session || !el.certAlias) return;
    const totalScore = REGIONS.reduce((acc, r) => acc + state.session.regions[r.id].score, 0);
    const totalStars = REGIONS.reduce((acc, r) => acc + state.session.regions[r.id].stars, 0);
    const badgesCount = REGIONS.filter(r => state.session.regions[r.id].badgeUnlocked).length;

    el.certAlias.textContent = state.session.alias;
    el.certScore.textContent = `${totalScore} / 120 pts`;
    el.certStars.textContent = `${totalStars} / 12 ★`;
    if (el.certBadgesCount) {
      el.certBadgesCount.textContent = `${badgesCount} de 4`;
    }

    const now = new Date();
    const dateFormatted = now.toLocaleDateString('es-EC', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    if (el.certDate) {
      el.certDate.textContent = dateFormatted;
    }

    if (el.certTupakSlot) {
      el.certTupakSlot.innerHTML = getTupakSvg('celebrate');
    }
    if (el.certAvatarSlot) {
      el.certAvatarSlot.innerHTML = getAvatarSvg(state.session.avatarId);
    }
    if (el.certBadgesGrid) {
      renderBadgesGrid(el.certBadgesGrid);
    }
  }

  function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function exportCsv() {
    const rows = [['Alias', 'Estacion', 'Titulo_Estacion', 'Region', 'Acierto', 'Puntaje', 'Estrellas']];
    STATIONS.forEach(meta => {
      const sData = state.session.stations[meta.stationNumber];
      rows.push([
        state.session.alias,
        String(meta.stationNumber),
        meta.stationTitle,
        meta.regionName,
        sData.correct ? 'Si' : 'No',
        String(sData.score),
        String(sData.stars)
      ]);
    });
    const csvContent = '\uFEFF' + rows.map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    downloadFile(`ruta_condor_${state.session.alias}.csv`, csvContent, 'text/csv;charset=utf-8;');
  }

  function exportJson() {
    const jsonContent = JSON.stringify(state.session, null, 2);
    downloadFile(`ruta_condor_${state.session.alias}.json`, jsonContent, 'application/json');
  }

  function bindEvents() {
    document.querySelectorAll('[data-speak-target]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-speak-target');
        const target = document.getElementById(targetId);
        if (target) {
          speakText(target.textContent, btn);
        }
      });
    });

    el.btnSpeakQuestion.addEventListener('click', () => {
      const meta = STATIONS.find(s => s.stationNumber === state.activeStationNumber);
      const question = meta.question;
      const optionsText = question.options.map((opt, idx) => `Opción ${LETTERS[idx]}: ${opt}`).join('. ');
      speakText(`${question.prompt}. ${optionsText}`, el.btnSpeakQuestion);
    });

    el.btnSpeakFeedback.addEventListener('click', () => {
      const text = `${el.feedbackBadge.textContent}. ${el.feedbackMessage.textContent} ${el.culturalFactBox.hidden ? '' : el.culturalFactText.textContent}`;
      speakText(text, el.btnSpeakFeedback);
    });

    el.loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const alias = el.inputAlias.value.trim();
      const validPattern = /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ _-]{3,20}$/;

      if (!validPattern.test(alias)) {
        el.aliasError.textContent = 'Ingrese un código o alias válido de 3 a 20 caracteres (letras, números, espacios o guiones).';
        el.inputAlias.focus();
        return;
      }

      el.aliasError.textContent = '';
      const settings = {
        timeLimit: teacherSettings.timeLimit,
        maxLives: teacherSettings.isUnlimitedLives ? 0 : teacherSettings.livesCount
      };
      state.session = createInitialSession(alias, state.selectedAvatar, settings);
      saveSession(state.session);
      renderMapView();
    });

    if (el.btnLivesMinus) {
      el.btnLivesMinus.addEventListener('click', () => {
        if (teacherSettings.isUnlimitedLives) return;
        if (teacherSettings.livesCount > 1) {
          teacherSettings.livesCount -= 1;
          teacherSettings.maxLives = teacherSettings.livesCount;
          syncTeacherUi();
          saveTeacherPrefs(teacherSettings);
        }
      });
    }

    if (el.btnLivesPlus) {
      el.btnLivesPlus.addEventListener('click', () => {
        if (teacherSettings.isUnlimitedLives) return;
        if (teacherSettings.livesCount < 10) {
          teacherSettings.livesCount += 1;
          teacherSettings.maxLives = teacherSettings.livesCount;
          syncTeacherUi();
          saveTeacherPrefs(teacherSettings);
        }
      });
    }

    if (el.checkLivesUnlimited) {
      el.checkLivesUnlimited.addEventListener('change', () => {
        teacherSettings.isUnlimitedLives = el.checkLivesUnlimited.checked;
        teacherSettings.maxLives = teacherSettings.isUnlimitedLives ? 0 : teacherSettings.livesCount;
        syncTeacherUi();
        saveTeacherPrefs(teacherSettings);
      });
    }

    if (el.selectTimeLimit) {
      el.selectTimeLimit.addEventListener('change', () => {
        teacherSettings.timeLimit = Number(el.selectTimeLimit.value) || 0;
        saveTeacherPrefs(teacherSettings);
      });
    }

    el.btnGoMap.addEventListener('click', () => renderMapView());
    el.btnBackToMap.addEventListener('click', () => renderMapView());
    el.btnSummaryBackMap.addEventListener('click', () => renderMapView());
    el.btnOpenSummary.addEventListener('click', () => renderSummaryView());

    el.btnSubmitAnswer.addEventListener('click', handleAnswerSubmit);
    el.btnRetryStation.addEventListener('click', () => {
      const { maxLives } = state.session.settings || { maxLives: 0 };
      if (maxLives > 0 && state.session.livesRemaining <= 0) {
        state.session.livesRemaining = maxLives;
        saveSession(state.session);
      }
      renderStationView();
    });
    el.btnNextQuestion.addEventListener('click', handleNextAfterStation);

    el.btnDownloadCsv.addEventListener('click', exportCsv);
    el.btnDownloadJson.addEventListener('click', exportJson);

    el.btnLogout.addEventListener('click', () => {
      clearSession();
      state.session = null;
      el.inputAlias.value = '';
      showView('login');
    });

    el.btnRestartExpedition.addEventListener('click', () => {
      if (!state.session) return;
      state.session = createInitialSession(
        state.session.alias,
        state.session.avatarId,
        state.session.settings || { timeLimit: 0, maxLives: 0 }
      );
      saveSession(state.session);
      renderMapView();
    });

    el.btnSpeakCelebration.addEventListener('click', () => {
      const fact = el.celebrationCulturalBox.hidden ? '' : ` Dato cultural: ${el.celebrationCulturalText.textContent}`;
      speakText(`${el.celebrationTitle.textContent} ${el.celebrationText.textContent}${fact}`, el.btnSpeakCelebration);
    });

    el.btnCelebrationContinue.addEventListener('click', closeCelebrationModal);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !el.celebrationModal.hidden) {
        closeCelebrationModal();
      }
    });
  }

  function init() {
    cacheElements();
    hydrateStaticGraphics();
    renderAvatarSelector();
    teacherSettings = getTeacherPrefs();
    syncTeacherUi();
    bindEvents();

    const existingSession = loadSession();
    if (existingSession) {
      state.session = existingSession;
      renderMapView();
    } else {
      showView('login');
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})(window.RutaCondor = window.RutaCondor || {});
