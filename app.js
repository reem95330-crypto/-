/**
 * تطبيق مِرْبَاع التفاعلي للألعاب التراثية السعودية
 * app.js - إدارة الحالة العامة للتطبيق والملاحة ثلاثية المستويات ومستمعات الصوت والنافذة المنبثقة
 */

// ==========================================================================
// 1. نظام إدارة الصوت الذاتي (Web Audio Synth FX)
// ==========================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playDoorOpen() {
    if (!this.enabled) return;
    this.init();
    
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(70, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(30, this.ctx.currentTime + 1.4);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 1.4);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.4);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.4);
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    
    const notes = [523.25, 659.25, 783.99, 1046.50];
    const time = this.ctx.currentTime;
    
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time + idx * 0.12);
      
      gain.gain.setValueAtTime(0.08, time + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, time + idx * 0.12 + 0.3);
      
      osc.start(time + idx * 0.12);
      osc.stop(time + idx * 0.12 + 0.3);
    });
  }

  playFlip() {
    if (!this.enabled) return;
    this.init();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(640, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playFail() {
    if (!this.enabled) return;
    this.init();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(90, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }
}

const soundFX = new SoundFX();

// ==========================================================================
// 2. نظام الجزيئات المحيطة البصري (Ambient Particles System)
// ==========================================================================
function initAmbientParticles() {
  const container = document.getElementById('ambient-particles');
  if (!container) return;

  const particleCount = 20;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 6 + 3;
    const left = Math.random() * 100;
    const duration = Math.random() * 6 + 6;
    const delay = Math.random() * -10;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
  }
}

// ==========================================================================
// 3. إدارة حالة اللعبة والتقدم والنقاط (App State)
// ==========================================================================
const AppState = {
  score: 0,
  activeGame: null,
  completedGames: new Set(), // لتتبع الألعاب المكتملة

  addScore(points) {
    this.score += points;
    this.syncScoreUI();
  },

  resetScore() {
    this.score = 0;
    this.syncScoreUI();
  },

  syncScoreUI() {
    const arabicScore = this.score.toLocaleString('ar-SA');
    const lobbyScoreCounter = document.getElementById('score-counter');
    const gameScoreCounter = document.getElementById('game-score-counter');

    if (lobbyScoreCounter) {
      lobbyScoreCounter.innerText = `النقاط: ${arabicScore}`;
    }
    if (gameScoreCounter) {
      gameScoreCounter.innerText = `النقاط: ${arabicScore}`;
    }
  }
};

// ==========================================================================
// 4. معالجة الملاحة والتنقل المتعدد (Navigation Flow Management)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // تهيئة غبار الذهب
  initAmbientParticles();

  // تهيئة تقدم المجلس
  if (typeof updateLobbyProgress === 'function') {
    updateLobbyProgress();
  }

  // الواجهات الثلاث
  const splashScreen = document.getElementById('splash-screen');
  const mainLobby = document.getElementById('main-lobby');
  const gameScreen = document.getElementById('game-screen');
  const infoModal = document.getElementById('info-modal');
  const arena = document.getElementById('game-arena-content');

  // الأزرار
  const enterBtn = document.getElementById('enter-btn');
  const lobbyBackBtn = document.getElementById('lobby-back-btn');
  const backToLobbyBtn = document.getElementById('back-to-lobby-btn');
  const soundToggle = document.getElementById('sound-toggle');
  const lobbySoundToggle = document.getElementById('lobby-sound-toggle');
  const modalCloseCorner = document.getElementById('modal-close-corner');

  // أ. الدخول من شاشة الترحيب (Home) إلى المجلس (Lobby)
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      soundFX.playDoorOpen();
      splashScreen.classList.add('door-opened');

      // الانتظار للزووم الانتقالي الفخم (1.6 ثانية)
      setTimeout(() => {
        splashScreen.classList.remove('active');
        splashScreen.classList.add('inactive');
        
        mainLobby.classList.remove('inactive');
        mainLobby.classList.add('active');
      }, 1600);
    });
  }

  // ب. العودة من المجلس (Lobby) إلى شاشة الترحيب (Home)
  if (lobbyBackBtn) {
    lobbyBackBtn.addEventListener('click', () => {
      soundFX.playClick();
      
      mainLobby.classList.remove('active');
      mainLobby.classList.add('inactive');
      
      splashScreen.classList.remove('door-opened');
      splashScreen.classList.remove('inactive');
      splashScreen.classList.add('active');
    });
  }

  // ج. اختيار ولعب اللعبة من بطاقات المجلس
  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach(card => {
    card.addEventListener('click', () => {
      // تجنب التفاعل مع الألعاب المغلقة
      if (card.classList.contains('disabled')) return;

      const gameType = card.getAttribute('data-game');
      soundFX.playClick();
      
      mainLobby.classList.remove('active');
      mainLobby.classList.add('inactive');
      
      gameScreen.classList.remove('inactive');
      gameScreen.classList.add('active');

      launchGame(gameType, arena);
    });

    // دعم لوحة المفاتيح
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (card.classList.contains('disabled')) return;
        e.preventDefault();
        const gameType = card.getAttribute('data-game');
        soundFX.playClick();
        
        mainLobby.classList.remove('active');
        mainLobby.classList.add('inactive');
        
        gameScreen.classList.remove('inactive');
        gameScreen.classList.add('active');

        launchGame(gameType, arena);
      }
    });
  });

  // د. العودة من ساحة اللعبة إلى المجلس (Lobby)
  if (backToLobbyBtn) {
    backToLobbyBtn.addEventListener('click', () => {
      soundFX.playClick();
      
      // تفكيك اللعبة النشطة
      if (AppState.activeGame && typeof AppState.activeGame.destroy === 'function') {
        AppState.activeGame.destroy();
      }
      AppState.activeGame = null;

      // إغلاق أي نافذة مفتوحة
      hideModal();

      gameScreen.classList.remove('active');
      gameScreen.classList.add('inactive');
      
      mainLobby.classList.remove('inactive');
      mainLobby.classList.add('active');
    });
  }

  // هـ. التحكم بالصوت (تزامن صوت الترويستين)
  const handleSoundToggle = () => {
    const enabled = soundFX.toggle();
    const icon = enabled ? '🔊' : '🔇';
    
    if (soundToggle) soundToggle.querySelector('.sound-icon').innerText = icon;
    if (lobbySoundToggle) lobbySoundToggle.querySelector('.sound-icon').innerText = icon;
    
    soundFX.playClick();
  };

  if (soundToggle) soundToggle.addEventListener('click', handleSoundToggle);
  if (lobbySoundToggle) lobbySoundToggle.addEventListener('click', handleSoundToggle);

  // و. إغلاق النافذة المنبثقة
  if (modalCloseCorner) {
    modalCloseCorner.addEventListener('click', () => {
      soundFX.playClick();
      hideModal();
    });
  }

  if (infoModal) {
    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) {
        soundFX.playClick();
        hideModal();
      }
    });
  }

  // ز. إغلاق نافذة المساعدة المنبثقة
  const helpModal = document.getElementById('help-modal');
  const helpModalCloseCorner = document.getElementById('help-modal-close-corner');
  const helpModalCloseBtn = document.getElementById('help-modal-close-btn');

  const handleCloseHelp = () => {
    soundFX.playClick();
    if (typeof window.hideHelpModal === 'function') {
      window.hideHelpModal();
    }
  };

  if (helpModalCloseCorner) {
    helpModalCloseCorner.addEventListener('click', handleCloseHelp);
  }
  if (helpModalCloseBtn) {
    helpModalCloseBtn.addEventListener('click', handleCloseHelp);
  }
  if (helpModal) {
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) {
        handleCloseHelp();
      }
    });
  }

});

// ==========================================================================
// 5. إدارة النوافذ المنبثقة التراثية (Modals System)
// ==========================================================================
function hideModal() {
  const modal = document.getElementById('info-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.classList.add('inactive');
  }
}

// ==========================================================================
// 6. تشغيل وتحميل الألعاب التراثية (Game Loader)
// ==========================================================================
function launchGame(gameType, arena) {
  if (!arena) return;

  // تنظيف أي لعبة جارية مسبقاً
  if (AppState.activeGame && typeof AppState.activeGame.destroy === 'function') {
    AppState.activeGame.destroy();
  }
  arena.innerHTML = '';

  const gameSubtitle = document.getElementById('game-subtitle');

  if (gameType === 'coffee-puzzle') {
    if (gameSubtitle) gameSubtitle.innerText = 'سر القهوة السعودية';
    AppState.activeGame = new CoffeePuzzleGame(arena);
  } else if (gameType === 'door-puzzle') {
    if (gameSubtitle) gameSubtitle.innerText = 'لغز الباب النجدي';
    AppState.activeGame = new DoorPuzzleGame(arena);
  } else if (gameType === 'heritage-symbols') {
    if (gameSubtitle) gameSubtitle.innerText = 'رموزنا التراثية';
    AppState.activeGame = new HeritageMemoryGame(arena);
  } else if (gameType === 'sadu-journey') {
    if (gameSubtitle) gameSubtitle.innerText = 'رحلة السدو';
    AppState.activeGame = new SaduJourneyGame(arena);
  } else if (gameType === 'council-stories') {
    if (gameSubtitle) gameSubtitle.innerText = 'حكايات المجلس';
    AppState.activeGame = new CouncilStoriesGame(arena);
  }
}
