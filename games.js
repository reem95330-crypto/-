/**
 * تطبيق مِرْبَاع التفاعلي للألعاب التراثية السعودية
 * games.js - منطق وبرمجة الألعاب التراثية الخمس بنظام المساعدة الشامل والأيقونات التراثية الموحدة
 */

// ==========================================================================
// الأيقونات التراثية الموحدة SVG (SVGIcons System)
// ==========================================================================
window.SVGIcons = {
  coffee: `
    <svg viewBox="0 0 100 100" class="heritage-svg-icon" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="finjalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C9A15A" />
          <stop offset="100%" stop-color="#B88A45" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="none" stroke="#CDBB9A" stroke-width="2" stroke-dasharray="4,4"/>
      <path d="M25,35 L75,35 L68,75 C67,82 58,85 50,85 C42,85 33,82 32,75 Z" fill="#F3E8D2" stroke="#3A241A" stroke-width="4"/>
      <path d="M28,45 Q50,48 72,45 L69,60 C68,66 58,68 50,68 C42,68 32,66 31,60 Z" fill="url(#finjalGrad)" stroke="#3A241A" stroke-width="2"/>
      <polygon points="50,52 45,62 55,62" fill="#B88A45"/>
      <polygon points="38,50 35,58 42,58" fill="#B88A45"/>
      <polygon points="62,50 58,58 65,58" fill="#B88A45"/>
      <line x1="25" y1="35" x2="75" y2="35" stroke="#3A241A" stroke-width="3"/>
    </svg>
  `,
  door: `
    <svg viewBox="0 0 100 100" class="heritage-svg-icon" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="10" width="60" height="80" rx="4" fill="#3A241A" stroke="#B88A45" stroke-width="4" />
      <line x1="50" y1="10" x2="50" y2="90" stroke="#B88A45" stroke-width="3" />
      <polygon points="35,25 28,35 42,35" fill="#C9A15A" />
      <polygon points="35,45 28,55 42,55" fill="#C9A15A" />
      <polygon points="35,65 28,75 42,75" fill="#C9A15A" />
      <polygon points="65,25 58,35 72,35" fill="#C9A15A" />
      <polygon points="65,45 58,55 72,55" fill="#C9A15A" />
      <polygon points="65,65 58,75 72,75" fill="#C9A15A" />
      <circle cx="25" cy="20" r="2" fill="#111" />
      <circle cx="25" cy="50" r="2" fill="#111" />
      <circle cx="25" cy="80" r="2" fill="#111" />
      <circle cx="75" cy="20" r="2" fill="#111" />
      <circle cx="75" cy="50" r="2" fill="#111" />
      <circle cx="75" cy="80" r="2" fill="#111" />
    </svg>
  `,
  dallah: `
    <svg viewBox="0 0 100 100" class="heritage-svg-icon" xmlns="http://www.w3.org/2000/svg">
      <path d="M45,40 L55,40 L57,65 L43,65 Z" fill="#C9A15A" stroke="#3A241A" stroke-width="3" />
      <path d="M40,65 L60,65 L63,78 L37,78 Z" fill="#B88A45" stroke="#3A241A" stroke-width="3" />
      <path d="M47,40 Q50,28 47,20 L53,20 Q50,28 53,40 Z" fill="#C9A15A" stroke="#3A241A" stroke-width="3" />
      <path d="M45,20 L55,20 L50,8 Z" fill="#B88A45" stroke="#3A241A" stroke-width="2"/>
      <path d="M38,25 Q25,35 38,62" fill="none" stroke="#3A241A" stroke-width="4" stroke-linecap="round"/>
      <path d="M53,28 Q72,25 65,48 Q55,48 53,40" fill="#C9A15A" stroke="#3A241A" stroke-width="3" />
    </svg>
  `,
  sadu: `
    <svg viewBox="0 0 100 100" class="heritage-svg-icon" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="10" width="70" height="80" fill="#3A241A" rx="4" stroke="#CDBB9A" stroke-width="2"/>
      <rect x="25" y="10" width="12" height="80" fill="#B85A5A" />
      <rect x="63" y="10" width="12" height="80" fill="#C9A15A" />
      <path d="M42,20 L50,28 L58,20 M42,35 L50,43 L58,35 M42,50 L50,58 L58,50 M42,65 L50,73 L58,65" fill="none" stroke="#F3E8D2" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `,
  council: `
    <svg viewBox="0 0 100 100" class="heritage-svg-icon" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="25" width="70" height="35" rx="6" fill="#B85A5A" stroke="#3A241A" stroke-width="3"/>
      <rect x="25" y="32" width="50" height="20" fill="none" stroke="#C9A15A" stroke-width="2" stroke-dasharray="5,3"/>
      <line x1="15" y1="42" x2="85" y2="42" stroke="#3A241A" stroke-width="2" />
      <path d="M10,60 L90,60 L85,82 L15,82 Z" fill="#3A241A" stroke="#B88A45" stroke-width="3"/>
      <rect x="35" y="48" width="30" height="22" rx="4" fill="#C9A15A" stroke="#3A241A" stroke-width="2"/>
      <line x1="45" y1="48" x2="45" y2="70" stroke="#3A241A" stroke-width="2"/>
      <line x1="55" y1="48" x2="55" y2="70" stroke="#3A241A" stroke-width="2"/>
    </svg>
  `
};

// ==========================================================================
// وظائف المساعدة العامة للنوافذ المنبثقة (Help Modals)
// ==========================================================================
window.showHelpModal = function(hintText) {
  const modal = document.getElementById('help-modal');
  const content = document.getElementById('help-modal-content');
  if (modal && content) {
    content.innerText = hintText;
    modal.classList.remove('inactive');
    modal.classList.add('active');
  }
};

window.hideHelpModal = function() {
  const modal = document.getElementById('help-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.classList.add('inactive');
  }
};

// ==========================================================================
// الكلاس الأساسي المشترك لجميع الألعاب (BaseGame)
// ==========================================================================
class BaseGame {
  constructor(container, gameId) {
    this.container = container;
    this.gameId = gameId;
    this.helpsRemaining = 3;
    
    this.hints = {
      'saudi-coffee': [
        'تذكّر أن إعداد القهوة يبدأ بالماء.',
        'بعد الماء تأتي القهوة.',
        'فكر في المكونات التي تأتي بعد القهوة.'
      ],
      'door-puzzle': [
        'تأمل تكرار الأشكال في النقش.',
        'قارن الشكل قبل الفراغ بالشكل الذي يليه.',
        'ابحث عن الخيار الذي يحافظ على نفس تسلسل النقش.'
      ],
      'heritage-symbols': [
        'تأمل الألوان الزاهية والنقش المتكرر كشكل العين أو الشجرة.',
        'النقش يمثل رمزاً جغرافياً يعبر عن البيئة البدوية التقليدية.',
        'ابحث عن النقش الذي يرمز لـ (الشجرة) أو (العين) في ثقافة نسيج السدو.'
      ],
      'sadu-journey': [
        'السدو فن هندسي يعتمد على التناظر البصري والتكرار.',
        'قارن الجزء المفقود بالأنماط المجاورة على يمين ويسار الشريط.',
        'ابحث عن خيار القطعة الذي يكرر نفس الزخرفة بانتظام.'
      ],
      'council-stories': [
        'عادات المجلس تركز على توقير الكبير وإظهار الكرم باليد اليمنى.',
        'تذكر أن صب القهوة وحمل الدلة له طريقة مخصصة لا تتغير.',
        'التلويح بالفنجال (هزه) يعني الاكتفاء.'
      ]
    };
  }

  getCurrentHint() {
    const gameHints = this.hints[this.gameId];
    if (!gameHints) return 'ابحث عن الحل الصحيح!';

    if (this.gameId === 'saudi-coffee') {
      const idx = this.currentStepIndex || 0;
      if (idx === 0) return gameHints[0];
      if (idx === 1) return gameHints[1];
      if (idx === 2) return gameHints[2];
      return 'الزعفران يوضع أخيراً ليعطي اللون الذهبي المتميز للقهوة.';
    }

    if (['door-puzzle', 'heritage-symbols', 'sadu-journey', 'council-stories'].includes(this.gameId)) {
      const used = 3 - this.helpsRemaining;
      return gameHints[Math.min(used, gameHints.length - 1)];
    }

    return 'ابحث عن الحل الصحيح!';
  }

  useHelp() {
    if (this.helpsRemaining <= 0) return;
    const hintText = this.getCurrentHint();
    this.helpsRemaining--;
    this.updateHelpUI();
    showHelpModal(hintText);
  }

  updateHelpUI() {
    const helpBtn = document.getElementById('game-help-btn');
    const badge = document.getElementById('help-count-badge');
    if (!helpBtn) return;

    const arabicDigits = ['٠', '١', '٢', '٣'];
    if (this.helpsRemaining > 0) {
      if (badge) badge.innerText = arabicDigits[this.helpsRemaining];
      helpBtn.removeAttribute('disabled');
      helpBtn.classList.remove('disabled-btn');
    } else {
      if (badge) badge.innerText = '٠';
      helpBtn.setAttribute('disabled', 'true');
      helpBtn.classList.add('disabled-btn');
      const label = helpBtn.querySelector('.help-text-label');
      if (label) label.innerText = 'نفدت المساعدات';
    }
  }

  renderHelpButtonHTML() {
    const arabicDigits = ['٠', '١', '٢', '٣'];
    return `
      <button id="game-help-btn" class="btn help-btn" aria-label="طلب مساعدة">
        <span class="help-icon">💡</span>
        <span class="help-text-label">مساعدة</span>
        <span class="help-badge" id="help-count-badge">${arabicDigits[this.helpsRemaining]}</span>
      </button>
    `;
  }

  bindHelpButton() {
    const helpBtn = document.getElementById('game-help-btn');
    if (helpBtn) {
      helpBtn.addEventListener('click', () => {
        soundFX.playClick();
        this.useHelp();
      });
    }
  }
}

// ==========================================================================
// 1. لعبة 1: أحجية سر القهوة السعودية (Coffee Preparation Puzzle)
// ==========================================================================
const COFFEE_STAGE_CONFIG = {
  id: 'saudi-coffee',
  name: 'سر القهوة السعودية',
  correctOrder: ['water', 'coffee', 'cardamom', 'saffron'],
  culturalFact: 'تُعد القهوة السعودية رمزًا أصيلًا للكرم والضيافة، وقد أُدرجت القهوة العربية ضمن القائمة التمثيلية للتراث الثقافي غير المادي لدى اليونسكو.',
  ingredients: [
    { id: 'water', name: 'الماء', emoji: '💧', desc: 'أساس القهوة، يجب غليه أولاً' },
    { id: 'coffee', name: 'القهوة الخولانية', emoji: '🫘', desc: 'البن الخولاني الأصيل والفاخر' },
    { id: 'cardamom', name: 'الهيل المطحون', emoji: '🟢', desc: 'يضفي النكهة الزكية والحرارة' },
    { id: 'saffron', name: 'الزعفران', emoji: '🍂', desc: 'يعطي اللون الذهبي المتميز' }
  ]
};

class CoffeePuzzleGame extends BaseGame {
  constructor(container) {
    super(container, 'saudi-coffee');
    this.config = COFFEE_STAGE_CONFIG;
    this.currentStepIndex = 0;
    this.selectedIngredients = new Set();
    this.gameStatus = 'playing';
    this.isTransitioning = false;

    this.init();
  }

  init() {
    this.shuffledIngredients = [...this.config.ingredients];
    for (let i = this.shuffledIngredients.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledIngredients[i], this.shuffledIngredients[j]] = [this.shuffledIngredients[j], this.shuffledIngredients[i]];
    }
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="coffee-game-wrapper">
        <div class="game-instruction-section">
          <div class="instruction-text-block">
            <p class="instruction-title">أضف المكونات بالترتيب الصحيح لتحضير القهوة السعودية.</p>
            <div class="instruction-meta">
              <div class="step-badge" id="step-badge-counter">الخطوة ١ من ٤</div>
              ${this.renderHelpButtonHTML()}
            </div>
          </div>
          <div class="feedback-toast" id="feedback-toast">حاول مرة أخرى لتتبع الطريقة الأصلية!</div>
        </div>

        <div class="central-cooking-zone">
          <div class="steam-container" id="steam-container"></div>
          <div class="dallah-cooking-container" id="dallah-pot">
            <svg class="dallah-interactive-svg" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15 C52 15 53 10 50 5 C47 10 48 15 50 15 Z" fill="#B88A45"/>
              <path d="M47 15 H53 V25 H47 Z" fill="#C9A15A"/>
              <path d="M42 25 L45 35 H55 L58 25 Z" fill="#B88A45"/>
              <path d="M38 35 C38 35 50 30 62 35 L60 42 H40 Z" fill="#C9A15A"/>
              <path d="M44 42 H56 L54 60 H46 Z" fill="#B88A45"/>
              <path id="dallah-liquid-glow" d="M46 60 C38 65 34 75 34 85 C34 100 42 108 50 108 C58 108 66 100 66 85 C66 75 62 65 54 60 Z" fill="#C9A15A" opacity="0.85"/>
              <path d="M40 108 H60 L58 114 H42 Z" fill="#B88A45"/>
              <path d="M38 48 C30 50 20 62 18 72 C22 72 32 62 45 56 Z" fill="#B88A45"/>
              <path d="M56 60 C68 62 76 72 76 82 C76 92 68 98 60 98 C62 94 68 92 68 82 C68 76 62 68 54 68" fill="#B88A45"/>
            </svg>
            <div class="boiling-bubble-emitter" id="bubble-emitter"></div>
          </div>
        </div>

        <div class="puzzle-progress-wrapper">
          <div class="progress-bar-frame">
            <div class="progress-bar-fill" id="progress-bar-fill" style="width: 0%;"></div>
          </div>
          <span class="progress-fraction-label" id="progress-label">٠ / ٤</span>
        </div>

        <div class="ingredients-cards-grid">
          ${this.shuffledIngredients.map(item => `
            <div class="ingredient-card" data-id="${item.id}" id="card-${item.id}" tabindex="0" role="button" aria-disabled="false" aria-label="${item.name}: ${item.desc}">
              <div class="ingredient-card-pattern"></div>
              <div class="ingredient-emoji">${item.emoji}</div>
              <h4 class="ingredient-name">${item.name}</h4>
              <p class="ingredient-desc">${item.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindHelpButton();

    const cards = this.container.querySelectorAll('.ingredient-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        this.handleCardInteraction(id, card);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-id');
          this.handleCardInteraction(id, card);
        }
      });
    });
  }

  handleCardInteraction(id, cardElement) {
    if (this.gameStatus !== 'playing') return;
    if (this.isTransitioning) return;
    if (this.selectedIngredients.has(id)) return;

    const expectedId = this.config.correctOrder[this.currentStepIndex];

    if (id === expectedId) {
      this.isTransitioning = true;
      soundFX.playSuccess();
      this.selectedIngredients.add(id);
      
      cardElement.classList.add('correct-added');
      cardElement.classList.add('completed-card');
      cardElement.setAttribute('aria-disabled', 'true');
      cardElement.removeAttribute('tabindex');

      this.animateCardToDallah(cardElement);
      this.currentStepIndex++;
      this.updateProgress();
      this.triggerCookingEffects(this.currentStepIndex);

      setTimeout(() => {
        this.isTransitioning = false;
        if (this.currentStepIndex === this.config.correctOrder.length) {
          this.handleGameWin();
        }
      }, 550);
    } else {
      soundFX.playFail();
      cardElement.classList.add('shake-error');
      this.showFeedbackToast('حاولة مرة أخرى لتتبع الطريقة الأصلية!');
      setTimeout(() => {
        cardElement.classList.remove('shake-error');
      }, 500);
    }
  }

  animateCardToDallah(cardElement) {
    cardElement.style.pointerEvents = 'none';
    cardElement.style.opacity = '0.35';
    cardElement.style.transform = 'scale(0.85) translateY(-15px)';
  }

  showFeedbackToast(message) {
    const toast = this.container.querySelector('#feedback-toast');
    if (!toast) return;
    toast.innerText = message;
    toast.classList.remove('show');
    void toast.offsetWidth; 
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 1500);
  }

  triggerCookingEffects(step) {
    const emitter = this.container.querySelector('#bubble-emitter');
    const steamContainer = this.container.querySelector('#steam-container');
    const dallahLiquid = this.container.querySelector('#dallah-liquid-glow');
    const dallahPot = this.container.querySelector('#dallah-pot');
    
    if (!emitter || !steamContainer || !dallahPot) return;

    dallahPot.style.animation = 'dallahPulse 0.4s ease';
    setTimeout(() => dallahPot.style.animation = '', 400);

    const colors = ['#B88A45', '#3A241A', '#4F3526', '#A87B37'];
    if (dallahLiquid && colors[step - 1]) {
      dallahLiquid.style.fill = colors[step - 1];
      dallahLiquid.style.transition = 'fill 0.8s ease';
    }

    const bubble = document.createElement('div');
    bubble.className = 'boiling-bubble';
    bubble.style.left = `${Math.random() * 40 + 30}%`;
    emitter.appendChild(bubble);
    setTimeout(() => bubble.remove(), 1000);

    const steam = document.createElement('div');
    steam.className = 'steam-cloud';
    steam.style.left = `${Math.random() * 20 + 40}%`;
    steamContainer.appendChild(steam);
    setTimeout(() => steam.remove(), 2000);
  }

  updateProgress() {
    const fill = this.container.querySelector('#progress-bar-fill');
    const label = this.container.querySelector('#progress-label');
    const counterBadge = this.container.querySelector('#step-badge-counter');

    if (fill && label) {
      const percentage = (this.currentStepIndex / this.config.correctOrder.length) * 100;
      fill.style.width = `${percentage}%`;
      const arabicDigits = ['٠', '١', '٢', '٣', '٤'];
      label.innerText = `${arabicDigits[this.currentStepIndex]} / ٤`;
      
      if (counterBadge && this.currentStepIndex < 4) {
        counterBadge.innerText = `الخطوة ${arabicDigits[this.currentStepIndex + 1]} من ٤`;
      } else if (counterBadge) {
        counterBadge.innerText = `اكتمل تحضير القهوة!`;
        counterBadge.style.backgroundColor = 'rgba(91, 140, 90, 0.25)';
        counterBadge.style.color = 'var(--success-color)';
      }
    }
  }

  handleGameWin() {
    this.gameStatus = 'success';
    AppState.addScore(40);
    AppState.completedGames.add('coffee-puzzle');
    updateLobbyProgress();
    this.triggerLightConfetti();

    showSuccessModal(
      'أحسنت! 🎉',
      'أتممت إعداد القهوة السعودية بالترتيب الصحيح.',
      this.config.culturalFact,
      'door-puzzle'
    );

    const lobbyCard = document.getElementById('card-game-coffee');
    if (lobbyCard) {
      lobbyCard.classList.add('completed-stage');
      lobbyCard.querySelector('.status-indicator').innerText = 'تم التحضير ⭐';
      lobbyCard.querySelector('.status-indicator').style.backgroundColor = 'rgba(91, 140, 90, 0.25)';
    }
  }

  triggerLightConfetti() {
    const colors = ['#B88A45', '#C9A15A', '#3A241A', '#F3E8D2', '#CDBB9A'];
    for (let i = 0; i < 45; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.width = `${Math.random() * 8 + 4}px`;
      particle.style.height = `${Math.random() * 8 + 4}px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.animationDelay = `${Math.random() * 0.8}s`;
      particle.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 4000);
    }
  }

  destroy() {
    this.selectedIngredients.clear();
    this.currentStepIndex = 0;
    this.gameStatus = 'playing';
  }
}

// ==========================================================================
// 2. لعبة 2: لغز الباب النجدي المطور ثلاثي الأبعاد (Najdi Door Puzzle Game)
// ==========================================================================
class DoorPuzzleGame extends BaseGame {
  constructor(container) {
    super(container, 'door-puzzle');
    this.gameStatus = 'playing';
    this.isTransitioning = false;
    
    this.motifs = {
      A: `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#301E15"/><polygon points="50,15 85,50 50,85 15,50" fill="none" stroke="#C9A15A" stroke-width="4"/><circle cx="50" cy="50" r="14" fill="#B88A45" stroke="#C9A15A" stroke-width="2"/></svg>`,
      B: `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#3A241A"/><path d="M10 10 H90 V90" stroke="#C9A15A" stroke-width="4" fill="none"/><polygon points="25,25 50,50 25,50" fill="#B88A45"/><circle cx="50" cy="50" r="8" fill="#C9A15A"/></svg>`,
      C: `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#3A241A"/><path d="M10 10 H90 M50 10 V90" stroke="#C9A15A" stroke-width="4" fill="none"/><polygon points="30,30 50,10 70,30" fill="#B88A45"/></svg>`
    };

    this.correctMotif = 'A';
    this.options = ['C', 'B', 'A'];
    
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="door-puzzle-container">
        <div class="game-instruction-section">
          <div class="instruction-text-block">
            <h3 class="instruction-title">لغز الباب النجدي</h3>
            <p class="instruction-desc-text">تأمل تفاصيل الباب النجدي، واكتشف النمط الصحيح لفتح باب الحكاية.</p>
            <div class="instruction-meta">
              ${this.renderHelpButtonHTML()}
            </div>
          </div>
          <div class="feedback-toast" id="door-feedback-toast">اقتربت! تأمل تفاصيل النقش وحاول مرة أخرى.</div>
        </div>

        <div class="door-wrapper" id="door-wrapper">
          <div class="door-frame-inner"></div>
          
          <div class="door-inner-content">
            <div class="inner-glow">✨</div>
            <p class="inner-text">اكتمل النقش وانفتح الباب النجدي الأصيل!</p>
          </div>

          <div class="door-leaves">
            <div class="door-leaf left-leaf">
              <div class="door-nail-stud" style="top: 20px;"></div>
              <div class="door-nail-stud" style="top: 100px;"></div>
              <div class="door-nail-stud" style="top: 180px;"></div>
              <div class="door-nail-stud" style="top: 260px;"></div>
              <div class="door-nail-stud" style="top: 330px;"></div>
              
              <div class="shutter-patterns-container">
                <div class="sequence-panel-slot">${this.motifs.B}</div>
                <div class="sequence-panel-slot">${this.motifs.A}</div>
                <div class="sequence-panel-slot">${this.motifs.B}</div>
              </div>
            </div>

            <div class="door-leaf right-leaf">
              <div class="door-nail-stud" style="top: 20px;"></div>
              <div class="door-nail-stud" style="top: 100px;"></div>
              <div class="door-nail-stud" style="top: 180px;"></div>
              <div class="door-nail-stud" style="top: 260px;"></div>
              <div class="door-nail-stud" style="top: 330px;"></div>

              <div class="shutter-patterns-container">
                <div class="central-pattern-row">
                  <div class="sequence-panel-slot" aria-label="نقش ١">${this.motifs.A}</div>
                  <div class="sequence-panel-slot" aria-label="نقش ٢">${this.motifs.B}</div>
                  <div class="sequence-panel-slot" aria-label="نقش ٣">${this.motifs.A}</div>
                  <div class="sequence-panel-slot" aria-label="نقش ٤">${this.motifs.B}</div>
                  <div class="sequence-panel-slot missing-slot" id="missing-slot" aria-label="نقش ناقص">؟</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="door-options-grid">
          ${this.options.map(opt => `
            <div class="door-option-card" data-key="${opt}" tabindex="0" role="button" aria-label="خيار إكمال النقش">
              ${this.motifs[opt]}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindHelpButton();

    const cards = this.container.querySelectorAll('.door-option-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-key');
        this.handleOptionSelection(key, card);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const key = card.getAttribute('data-key');
          this.handleOptionSelection(key, card);
        }
      });
    });
  }

  handleOptionSelection(key, cardElement) {
    if (this.gameStatus !== 'playing') return;
    if (this.isTransitioning) return;

    if (key === this.correctMotif) {
      this.isTransitioning = true;
      this.gameStatus = 'success';
      soundFX.playSuccess();

      const missingSlot = this.container.querySelector('#missing-slot');
      if (missingSlot) {
        missingSlot.classList.remove('missing-slot');
        missingSlot.innerHTML = this.motifs[this.correctMotif];
      }

      cardElement.classList.add('correct-selected');

      setTimeout(() => {
        const doorWrapper = this.container.querySelector('#door-wrapper');
        if (doorWrapper) {
          doorWrapper.classList.add('solved');
          soundFX.playDoorOpen();
        }
      }, 300);

      AppState.addScore(30);
      AppState.completedGames.add('door-puzzle');
      updateLobbyProgress();
      this.triggerLightConfetti();

      setTimeout(() => {
        showSuccessModal(
          'أحسنت! 🎉',
          'اكتشفت حكاية جديدة من تراثنا.',
          'تتميز العمارة النجدية التقليدية بصناعة الأبواب من خشب الأثل أو النخيل المحلي، ويقوم الحرفيون بنقشها وحفرها يدوياً باستخدام نقوش وأشكال هندسية مذهلة تعبر عن الثقافة النجدية الأصيلة.',
          'heritage-symbols'
        );

        const lobbyCard = document.getElementById('card-game-door');
        if (lobbyCard) {
          lobbyCard.classList.add('completed-stage');
          lobbyCard.querySelector('.status-indicator').innerText = 'تم الفتح ⭐';
          lobbyCard.querySelector('.status-indicator').style.backgroundColor = 'rgba(91, 140, 90, 0.25)';
        }
      }, 2000);

    } else {
      soundFX.playFail();
      cardElement.classList.add('shake-error');
      this.showFeedbackToast('اقتربت! تأمل تفاصيل النقش وحاول مرة أخرى.');
      setTimeout(() => {
        cardElement.classList.remove('shake-error');
      }, 500);
    }
  }

  showFeedbackToast(message) {
    const toast = this.container.querySelector('#door-feedback-toast');
    if (!toast) return;
    toast.innerText = message;
    toast.classList.remove('show');
    void toast.offsetWidth; 
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  triggerLightConfetti() {
    const colors = ['#B88A45', '#C9A15A', '#3A241A', '#F3E8D2', '#CDBB9A'];
    for (let i = 0; i < 45; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.width = `${Math.random() * 8 + 4}px`;
      particle.style.height = `${Math.random() * 8 + 4}px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.animationDelay = `${Math.random() * 0.8}s`;
      particle.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 4000);
    }
  }

  destroy() {
    this.gameStatus = 'playing';
  }
}

// ==========================================================================
// 3. رموزنا التراثية: لغز السدو التراثي المباشر
// ==========================================================================
class HeritageMemoryGame extends BaseGame {
  constructor(container) {
    super(container, 'heritage-symbols');
    this.currentIdx = 0;
    this.isTransitioning = false;

    this.questions = [
      {
        motifName: 'الشجرة',
        svg: `
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <rect width="100" height="100" fill="#3A241A" rx="8"/>
            <path d="M50,15 L50,85 M50,30 L30,45 M50,30 L70,45 M50,50 L25,70 M50,50 L75,70" stroke="#C9A15A" stroke-width="4" stroke-linecap="round"/>
            <circle cx="50" cy="15" r="5" fill="#B85A5A"/>
            <circle cx="30" cy="45" r="4" fill="#B85A5A"/>
            <circle cx="70" cy="45" r="4" fill="#B85A5A"/>
          </svg>
        `,
        questionText: 'ما هو اسم هذه النقشة التقليدية الشهيرة في السدو التي تحاكي النبات والنمو الطبيعي في الصحراء؟',
        options: ['الشجرة', 'العويرجان', 'العين'],
        correct: 'الشجرة'
      },
      {
        motifName: 'العين',
        svg: `
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <rect width="100" height="100" fill="#3A241A" rx="8"/>
            <polygon points="50,20 85,50 50,80 15,50" fill="none" stroke="#C9A15A" stroke-width="4"/>
            <circle cx="50" cy="50" r="14" fill="#B85A5A" />
            <circle cx="50" cy="50" r="6" fill="#F3E8D2" />
          </svg>
        `,
        questionText: 'أي النقوش التراثية يمثلها هذا الشكل الهندسي لحماية بيت الشعر والترحيب بالضيف؟',
        options: ['الضلعة', 'العين', 'المشط'],
        correct: 'العين'
      }
    ];

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (this.currentIdx >= this.questions.length) {
      this.handleGameWin();
      return;
    }

    const q = this.questions[this.currentIdx];
    this.container.innerHTML = `
      <div class="sadu-puzzle-wrapper">
        <div class="game-instruction-section">
          <div class="instruction-text-block">
            <h3 class="instruction-title">لغز السدو التراثي</h3>
            <p class="instruction-desc-text">${q.questionText}</p>
            <div class="instruction-meta">
              <div class="step-badge">السؤال ${this.currentIdx + 1} من ٢</div>
              ${this.renderHelpButtonHTML()}
            </div>
          </div>
          <div class="feedback-toast" id="sadu-feedback-toast" style="min-height: 22px; margin-top: 10px;"></div>
        </div>

        <div class="sadu-showcase-frame">
          ${q.svg}
        </div>

        <div class="quiz-options-grid" style="grid-template-columns: 1fr; width: 100%; max-width: 380px;">
          ${q.options.map(opt => `
            <button class="btn secondary-btn quiz-option-btn" data-name="${opt}" style="width: 100%; text-align: center; padding: 14px;">${opt}</button>
          `).join('')}
        </div>
      </div>
    `;

    this.bindHelpButton();

    const buttons = this.container.querySelectorAll('.quiz-option-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        this.handleAnswer(name, q.correct, btn);
      });
    });
  }

  handleAnswer(selected, correct, buttonElement) {
    if (this.isTransitioning) return;

    if (selected === correct) {
      this.isTransitioning = true;
      soundFX.playSuccess();
      buttonElement.style.backgroundColor = 'var(--success-color)';
      buttonElement.style.color = 'var(--white)';
      buttonElement.style.borderColor = 'var(--success-color)';

      this.showToast('نقش صحيح! رائع 🌟', true);

      setTimeout(() => {
        this.currentIdx++;
        this.isTransitioning = false;
        this.render();
      }, 1600);
    } else {
      soundFX.playFail();
      buttonElement.classList.add('shake-error');
      buttonElement.style.borderColor = '#B85A5A';
      buttonElement.style.color = '#B85A5A';
      this.showToast('مو هي! جرّب مرة ثانية ✖', false);

      setTimeout(() => {
        buttonElement.classList.remove('shake-error');
      }, 500);
    }
  }

  showToast(msg, isSuccess) {
    const toast = this.container.querySelector('#sadu-feedback-toast');
    if (!toast) return;
    toast.innerText = msg;
    toast.style.color = isSuccess ? 'var(--success-color)' : '#B85A5A';
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
  }

  handleGameWin() {
    AppState.addScore(30);
    AppState.completedGames.add('heritage-symbols');
    updateLobbyProgress();
    this.triggerLightConfetti();

    showSuccessModal(
      'أحسنت! 🎉',
      'اكتشفت رموزنا التراثية (لغز السدو التراثي).',
      'تعرّفنا بنجاح على نقوش السدو التراثية كالشجرة والعين التي تعكس أصالة الفنون التراثية السعودية وتزيين بيوت الشعر.',
      'sadu-journey'
    );

    const lobbyCard = document.getElementById('card-game-symbols');
    if (lobbyCard) {
      lobbyCard.classList.add('completed-stage');
      lobbyCard.querySelector('.status-indicator').innerText = 'تمت المطابقة ⭐';
      lobbyCard.querySelector('.status-indicator').style.backgroundColor = 'rgba(91, 140, 90, 0.25)';
    }
  }

  triggerLightConfetti() {
    const colors = ['#B88A45', '#C9A15A', '#3A241A', '#F3E8D2', '#CDBB9A'];
    for (let i = 0; i < 45; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.width = `${Math.random() * 8 + 4}px`;
      particle.style.height = `${Math.random() * 8 + 4}px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.animationDelay = `${Math.random() * 0.8}s`;
      particle.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 4000);
    }
  }

  destroy() {
    this.currentIdx = 0;
  }
}

// ==========================================================================
// 4. لعبة 4: رحلة السدو (Sadu Weaving Journey Game)
// ==========================================================================
class SaduJourneyGame extends BaseGame {
  constructor(container) {
    super(container, 'sadu-journey');
    this.gameStatus = 'playing';
    this.isTransitioning = false;

    this.motifs = {
      X: `
        <svg viewBox="0 0 60 80">
          <rect width="60" height="80" fill="#B85A5A" rx="4"/>
          <polygon points="30,15 50,40 30,65 10,40" fill="#C9A15A" stroke="#F3E8D2" stroke-width="2"/>
          <circle cx="30" cy="40" r="6" fill="#3A241A" />
        </svg>
      `,
      Y: `
        <svg viewBox="0 0 60 80">
          <rect width="60" height="80" fill="#3A241A" rx="4"/>
          <line x1="30" y1="10" x2="30" y2="70" stroke="#C9A15A" stroke-width="4"/>
          <polygon points="20,20 30,10 40,20" fill="#B85A5A"/>
          <polygon points="20,60 30,70 40,60" fill="#B85A5A"/>
        </svg>
      `,
      Z: `
        <svg viewBox="0 0 60 80">
          <rect width="60" height="80" fill="#C9A15A" rx="4"/>
          <circle cx="30" cy="40" r="16" fill="#3A241A" stroke="#F3E8D2" stroke-width="2"/>
          <line x1="15" y1="40" x2="45" y2="40" stroke="#B85A5A" stroke-width="3"/>
        </svg>
      `
    };

    this.correctMotif = 'X';
    this.options = ['Y', 'Z', 'X'];

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="sadu-journey-wrapper">
        <div class="game-instruction-section">
          <div class="instruction-text-block">
            <h3 class="instruction-title">رحلة السدو</h3>
            <p class="instruction-desc-text">اكتشف أنماط السدو وتعرّف على جمال هذا الفن التراثي. أكمل النمط الهندسي المفقود في شريط النسيج التراثي.</p>
            <div class="instruction-meta">
              ${this.renderHelpButtonHTML()}
            </div>
          </div>
          <div class="feedback-toast" id="sadu-journey-toast">حاول مرة أخرى لتنسج النمط المتناسق!</div>
        </div>

        <div class="sadu-pattern-strip">
          <div class="sadu-strip-flow">
            <div class="sadu-strip-cell">${this.motifs.X}</div>
            <div class="sadu-strip-cell">${this.motifs.Y}</div>
            <div class="sadu-strip-cell">${this.motifs.X}</div>
            <div class="sadu-strip-cell">${this.motifs.Y}</div>
            <div class="sadu-strip-cell missing-cell" id="sadu-missing-cell">؟</div>
          </div>
        </div>

        <div class="sadu-options-grid">
          ${this.options.map(opt => `
            <div class="sadu-option-card" data-key="${opt}" tabindex="0" role="button" aria-label="خيار نقش السدو">
              ${this.motifs[opt]}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindHelpButton();

    const optionCards = this.container.querySelectorAll('.sadu-option-card');
    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-key');
        this.handleSelection(key, card);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const key = card.getAttribute('data-key');
          this.handleSelection(key, card);
        }
      });
    });
  }

  handleSelection(key, cardElement) {
    if (this.gameStatus !== 'playing') return;
    if (this.isTransitioning) return;

    if (key === this.correctMotif) {
      this.isTransitioning = true;
      this.gameStatus = 'success';
      soundFX.playSuccess();

      const missingCell = this.container.querySelector('#sadu-missing-cell');
      if (missingCell) {
        missingCell.classList.remove('missing-cell');
        missingCell.innerHTML = this.motifs[this.correctMotif];
      }

      cardElement.classList.add('correct-selected');

      AppState.addScore(30);
      AppState.completedGames.add('sadu-journey');
      updateLobbyProgress();
      this.triggerLightConfetti();

      setTimeout(() => {
        showSuccessModal(
          'أحسنت! 🎉',
          'اكتشفت أنماط السدو وتعرّفت على جمال هذا الفن التراثي السعودي.',
          'يُعد نسيج السدو من الفنون التقليدية العريقة في المملكة العربية السعودية، وقد سجلته اليونسكو كجزء من التراث غير المادي للبشرية، حيث تستلهم نقوشه وألوانه من حياة البادية والبيئة الصحراوية الأصيلة.',
          'council-stories'
        );

        const lobbyCard = document.getElementById('card-game-sadu');
        if (lobbyCard) {
          lobbyCard.classList.add('completed-stage');
          lobbyCard.querySelector('.status-indicator').innerText = 'تمت المطابقة ⭐';
          lobbyCard.querySelector('.status-indicator').style.backgroundColor = 'rgba(91, 140, 90, 0.25)';
        }
      }, 1500);

    } else {
      soundFX.playFail();
      cardElement.classList.add('shake-error');
      this.showToast('حاول مرة أخرى لتنسج النمط المتناسق!');
      setTimeout(() => {
        cardElement.classList.remove('shake-error');
      }, 500);
    }
  }

  showToast(message) {
    const toast = this.container.querySelector('#sadu-journey-toast');
    if (!toast) return;
    toast.innerText = message;
    toast.classList.remove('show');
    void toast.offsetWidth; 
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  triggerLightConfetti() {
    const colors = ['#B88A45', '#C9A15A', '#3A241A', '#F3E8D2', '#CDBB9A'];
    for (let i = 0; i < 45; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.width = `${Math.random() * 8 + 4}px`;
      particle.style.height = `${Math.random() * 8 + 4}px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.animationDelay = `${Math.random() * 0.8}s`;
      particle.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 4000);
    }
  }

  destroy() {
    this.gameStatus = 'playing';
  }
}

// ==========================================================================
// 5. لعبة 5: حكايات المجلس (Council Etiquettes & Stories Game)
// ==========================================================================
class CouncilStoriesGame extends BaseGame {
  constructor(container) {
    super(container, 'council-stories');
    this.currentQuestionIndex = 0;
    this.gameStatus = 'playing';
    this.isTransitioning = false;

    this.questions = [
      {
        text: 'عند تقديم القهوة السعودية الأصيلة لضيوف المجلس، بأي يد يُفترض أن تمسك الدلة لصبها؟',
        options: ['اليد اليسرى', 'اليد اليمنى'],
        correct: 'اليد اليسرى'
      },
      {
        text: 'عندما تبدأ في تقديم وصَب القهوة للضيوف الحاضرين في المجلس، بمن تبدأ بالصب أولاً؟',
        options: ['الأكبر سناً أو الأفضل قدراً', 'من على جهة اليسار', 'أول من يقابلك من الحضور'],
        correct: 'الأكبر سناً أو الأفضل قدراً'
      },
      {
        text: 'ما هي الإشارة التراثية التقليدية الهادئة التي يفعلها الضيف بالفنجال ليخبر المضيف بالاكتفاء من القهوة؟',
        options: ['هز الفنجال بلطف', 'وضع اليد فوق فوهة الفنجال', 'قلب الفنجال رأساً على عقب'],
        correct: 'هز الفنجال بلطف'
      }
    ];

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.handleGameWin();
      return;
    }

    const q = this.questions[this.currentQuestionIndex];

    this.container.innerHTML = `
      <div class="council-stories-wrapper">
        <div class="game-instruction-section">
          <div class="instruction-text-block">
            <h3 class="instruction-title">حكايات المجلس</h3>
            <p class="instruction-desc-text">اكتشف أجواء المجلس السعودي وعادات الضيافة التي توارثناها.</p>
            <div class="instruction-meta">
              <div class="step-badge">السلوك التراثي ${this.currentQuestionIndex + 1} من ٣</div>
              ${this.renderHelpButtonHTML()}
            </div>
          </div>
          <div class="feedback-toast" id="council-feedback-toast" style="min-height: 22px; margin-top: 10px;"></div>
        </div>

        <div class="council-showcase-frame">
          ${SVGIcons.council}
        </div>

        <div class="council-question-box">
          <h4>${q.text}</h4>
        </div>

        <div class="council-options-column">
          ${q.options.map(opt => `
            <button class="btn secondary-btn council-option-row" data-name="${opt}">${opt}</button>
          `).join('')}
        </div>
      </div>
    `;

    this.bindHelpButton();

    const buttons = this.container.querySelectorAll('.council-option-row');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        this.handleAnswer(name, q.correct, btn);
      });
    });
  }

  handleAnswer(selected, correct, buttonElement) {
    if (this.isTransitioning) return;

    if (selected === correct) {
      this.isTransitioning = true;
      soundFX.playSuccess();
      buttonElement.style.backgroundColor = 'var(--success-color)';
      buttonElement.style.color = 'var(--white)';
      buttonElement.style.borderColor = 'var(--success-color)';

      this.showToast('سلوك تراثي صحيح! أحسنت 🌟', true);

      setTimeout(() => {
        this.currentQuestionIndex++;
        this.isTransitioning = false;
        this.render();
      }, 1600);
    } else {
      soundFX.playFail();
      buttonElement.classList.add('shake-error');
      buttonElement.style.borderColor = '#B85A5A';
      buttonElement.style.color = '#B85A5A';
      this.showToast('سلوك غير معتاد! جرّب مرة ثانية ✖', false);

      setTimeout(() => {
        buttonElement.classList.remove('shake-error');
      }, 500);
    }
  }

  showToast(msg, isSuccess) {
    const toast = this.container.querySelector('#council-feedback-toast');
    if (!toast) return;
    toast.innerText = msg;
    toast.style.color = isSuccess ? 'var(--success-color)' : '#B85A5A';
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
  }

  handleGameWin() {
    this.gameStatus = 'success';
    AppState.addScore(30);
    AppState.completedGames.add('council-stories');
    updateLobbyProgress();
    this.triggerLightConfetti();

    showSuccessModal(
      'أحسنت! 🎉',
      'اكتشفت أجواء المجلس وعادات الضيافة التي توارثناها.',
      'يعتبر المجلس السعودي الاجتماعي منصة حية لحفظ التراث الثقافي ونقل عادات الأجداد كالتوقير والتقدير وإكرام الضيف بصب الفنجال باليد اليمنى والبدء بالوجهاء وكبار السن.',
      null
    );

    const lobbyCard = document.getElementById('card-game-council');
    if (lobbyCard) {
      lobbyCard.classList.add('completed-stage');
      lobbyCard.querySelector('.status-indicator').innerText = 'تم الاجتياز ⭐';
      lobbyCard.querySelector('.status-indicator').style.backgroundColor = 'rgba(91, 140, 90, 0.25)';
    }
  }

  triggerLightConfetti() {
    const colors = ['#B88A45', '#C9A15A', '#3A241A', '#F3E8D2', '#CDBB9A'];
    for (let i = 0; i < 45; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.width = `${Math.random() * 8 + 4}px`;
      particle.style.height = `${Math.random() * 8 + 4}px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.animationDelay = `${Math.random() * 0.8}s`;
      particle.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 4000);
    }
  }

  destroy() {
    this.currentQuestionIndex = 0;
    this.gameStatus = 'playing';
  }
}

// ==========================================================================
// 6. الدوال المساعدة لإدارة المنصة المشتركة (Lobby Progress / Modals)
// ==========================================================================
function updateLobbyProgress() {
  const fill = document.getElementById('lobby-progress-fill');
  const text = document.getElementById('lobby-progress-text');
  if (!fill || !text) return;

  const count = AppState.completedGames.size;
  const percentage = (count / 5) * 100;
  
  fill.style.width = `${percentage}%`;
  
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥'];
  text.innerText = `اكتشفت ${arabicDigits[count]} من ٥ حكايات`;
}

function showSuccessModal(title, subtitle, fact, nextGameId) {
  const modal = document.getElementById('info-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  
  if (!modal || !modalTitle || !modalContent) return;

  modalTitle.innerText = title;
  modalContent.innerHTML = `
    <p class="success-message-text">${subtitle}</p>
    <div class="cultural-fact-box">
      <h4>هل تعلم؟</h4>
      <p>${fact}</p>
    </div>
  `;

  const nextBtn = document.getElementById('modal-next-game-btn');
  if (nextBtn) {
    if (nextGameId) {
      nextBtn.style.display = 'inline-flex';
      nextBtn.innerText = 'اللعبة التالية ←';
      nextBtn.removeAttribute('disabled');
      nextBtn.className = 'btn primary-btn';
      
      const newNextBtn = nextBtn.cloneNode(true);
      nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
      
      newNextBtn.addEventListener('click', () => {
        soundFX.playClick();
        hideSuccessModal();
        
        const arena = document.getElementById('game-arena-content');
        if (arena) {
          const nextGameSubtitle = document.getElementById('game-subtitle');
          if (nextGameId === 'door-puzzle') {
            if (nextGameSubtitle) nextGameSubtitle.innerText = 'لغز الباب النجدي';
            AppState.activeGame = new DoorPuzzleGame(arena);
          } else if (nextGameId === 'heritage-symbols') {
            if (nextGameSubtitle) nextGameSubtitle.innerText = 'رموزنا التراثية';
            AppState.activeGame = new HeritageMemoryGame(arena);
          } else if (nextGameId === 'sadu-journey') {
            if (nextGameSubtitle) nextGameSubtitle.innerText = 'رحلة السدو';
            AppState.activeGame = new SaduJourneyGame(arena);
          } else if (nextGameId === 'council-stories') {
            if (nextGameSubtitle) nextGameSubtitle.innerText = 'حكايات المجلس';
            AppState.activeGame = new CouncilStoriesGame(arena);
          }
        }
      });
    } else {
      nextBtn.style.display = 'none';
    }
  }

  const backLobbyBtn = document.getElementById('modal-back-lobby-btn');
  if (backLobbyBtn) {
    const newBackBtn = backLobbyBtn.cloneNode(true);
    backLobbyBtn.parentNode.replaceChild(newBackBtn, backLobbyBtn);
    newBackBtn.addEventListener('click', () => {
      soundFX.playClick();
      hideSuccessModal();
      
      const gameScreen = document.getElementById('game-screen');
      const mainLobby = document.getElementById('main-lobby');
      if (gameScreen && mainLobby) {
        gameScreen.classList.remove('active');
        gameScreen.classList.add('inactive');
        mainLobby.classList.remove('inactive');
        mainLobby.classList.add('active');
      }
    });
  }

  modal.classList.remove('inactive');
  modal.classList.add('active');
}

function hideSuccessModal() {
  const modal = document.getElementById('info-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.classList.add('inactive');
  }
}

// تصدير الكلاسات لـ app.js
window.CoffeePuzzleGame = CoffeePuzzleGame;
window.DoorPuzzleGame = DoorPuzzleGame;
window.HeritageMemoryGame = HeritageMemoryGame;
window.SaduJourneyGame = SaduJourneyGame;
window.CouncilStoriesGame = CouncilStoriesGame;
window.updateLobbyProgress = updateLobbyProgress;
