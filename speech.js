/**
 * Módulo de accesibilidad: lectura en voz alta con Web Speech API (Español)
 */

(function (app) {
  let currentButton = null;

function getSpanishVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  return (
    voices.find(v => v.lang.toLowerCase() === 'es-ec') ||
    voices.find(v => v.lang.toLowerCase().startsWith('es-419')) ||
    voices.find(v => v.lang.toLowerCase().startsWith('es')) ||
    null
  );
}

  function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (currentButton) {
    currentButton.classList.remove('is-speaking');
    currentButton = null;
  }
}

  function speakText(text, triggerButton = null) {
  if (!('speechSynthesis' in window) || !text) {
    return false;
  }

  const wasSameButton = currentButton && triggerButton === currentButton && window.speechSynthesis.speaking;
  stopSpeaking();
  if (wasSameButton) {
    return true;
  }

  const utterance = new SpeechSynthesisUtterance(text.trim());
  utterance.lang = 'es-EC';
  utterance.rate = 0.94;
  utterance.pitch = 1.05;

  const voice = getSpanishVoice();
  if (voice) {
    utterance.voice = voice;
  }

  if (triggerButton) {
    currentButton = triggerButton;
    triggerButton.classList.add('is-speaking');
  }

  utterance.onend = () => stopSpeaking();
  utterance.onerror = () => stopSpeaking();

  window.speechSynthesis.speak(utterance);
  return true;
}

// Precarga de voces en navegadores Chromium
if ('speechSynthesis' in window && typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
  window.speechSynthesis.onvoiceschanged = () => {
    getSpanishVoice();
  };
}

  app.speech = {
    speakText,
    stopSpeaking
  };
})(window.RutaCondor = window.RutaCondor || {});
