// ByteQuest - Practice System
// Provides vocabulary practice modes via the Memory Shrine
// Uses repurposed minigame mechanics (Streak Challenge, Speed Round)

// =====================================================
// Practice Mode Definitions
// =====================================================

const PRACTICE_MODES = {
  streak: {
    id: 'streak',
    name: 'Meditation of Persistence',
    icon: '🔥',
    description: 'Build streaks by answering correctly in a row. Streaks grant bonus XP!',
    basedOn: 'woodcutting', // Uses WoodcuttingMinigame mechanics
    xpReward: { base: 15, perCorrect: 2, streakBonus: 5 }
  },
  speed: {
    id: 'speed',
    name: 'Trial of Swiftness',
    icon: '⚡',
    description: 'Answer 10 questions as fast as possible. Beat target times for bonus XP!',
    basedOn: 'hunting', // Uses HuntingMinigame mechanics
    xpReward: { base: 15, perStar: 10, perfectBonus: 15 }
  }
};

// =====================================================
// Practice Manager
// =====================================================

class PracticeManager {
  constructor(gameState) {
    this.gameState = gameState;
    this.currentSession = null;
  }

  /**
   * Get available practice modes
   */
  getAvailableModes() {
    return Object.values(PRACTICE_MODES);
  }

  /**
   * Get a specific practice mode by ID
   */
  getMode(modeId) {
    return PRACTICE_MODES[modeId] || null;
  }

  /**
   * Start a practice session
   * @param {string} modeId - 'streak' or 'speed'
   * @param {string} vocabCategory - Optional category filter (null = all learned vocab)
   */
  startPractice(modeId, vocabCategory = null) {
    const mode = this.getMode(modeId);
    if (!mode) {
      console.error(`[PracticeManager] Unknown practice mode: ${modeId}`);
      return false;
    }

    this.currentSession = {
      mode: mode,
      vocabCategory: vocabCategory,
      startTime: Date.now(),
      results: null
    };

    // Launch the appropriate minigame in practice mode
    if (modeId === 'streak') {
      this.startStreakPractice();
    } else if (modeId === 'speed') {
      this.startSpeedPractice();
    }

    return true;
  }

  /**
   * Start streak practice (Meditation of Persistence)
   */
  startStreakPractice() {
    const minigame = new PracticeStreakMinigame();
    minigame.practiceManager = this;
    minigame.start();
  }

  /**
   * Start speed practice (Trial of Swiftness)
   */
  startSpeedPractice() {
    const minigame = new PracticeSpeedMinigame();
    minigame.practiceManager = this;
    minigame.start();
  }

  /**
   * End the current practice session and grant rewards
   * @param {object} results - Results from the minigame
   */
  endPractice(results) {
    if (!this.currentSession) return;

    const mode = this.currentSession.mode;
    let xpEarned = mode.xpReward.base;

    // Calculate XP based on mode
    if (mode.id === 'streak') {
      xpEarned += (results.correctAnswers || 0) * mode.xpReward.perCorrect;
      // Streak bonuses
      if (results.bestStreak >= 15) xpEarned += mode.xpReward.streakBonus * 3;
      else if (results.bestStreak >= 10) xpEarned += mode.xpReward.streakBonus * 2;
      else if (results.bestStreak >= 5) xpEarned += mode.xpReward.streakBonus;
    } else if (mode.id === 'speed') {
      xpEarned += (results.stars || 0) * mode.xpReward.perStar;
      if (results.isPerfect) xpEarned += mode.xpReward.perfectBonus;
    }

    // Grant XP to player
    if (typeof GameState !== 'undefined' && GameState.player) {
      GameState.player.xp = (GameState.player.xp || 0) + xpEarned;

      // Check for level up
      if (typeof checkLevelUp === 'function') {
        checkLevelUp();
      }
    }

    // Update Leitner boxes for practiced words
    if (results.practicedWords && typeof leitnerManager !== 'undefined') {
      results.practicedWords.forEach(wordResult => {
        if (wordResult.correct) {
          leitnerManager.promoteWord(wordResult.wordId);
        } else {
          leitnerManager.demoteWord(wordResult.wordId);
        }
      });
    }

    // Store results
    this.currentSession.results = results;
    this.currentSession.xpEarned = xpEarned;
    this.currentSession.endTime = Date.now();

    // Show notification
    if (typeof showNotification !== 'undefined') {
      showNotification(`Practice complete! +${xpEarned} XP`, 'success');
    }

    const session = this.currentSession;
    this.currentSession = null;

    return session;
  }
}

// =====================================================
// Practice Streak Minigame (Meditation of Persistence)
// Based on WoodcuttingMinigame mechanics
// =====================================================

class PracticeStreakMinigame {
  constructor() {
    this.totalQuestions = 15;
    this.currentQuestionIndex = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.correctAnswers = 0;
    this.practicedWords = [];
    this.practiceManager = null;
    this.isActive = false;
  }

  start() {
    this.isActive = true;
    this.currentQuestionIndex = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.correctAnswers = 0;
    this.practicedWords = [];
    this.showUI();
    this.showNextQuestion();
  }

  showUI() {
    const content = `
      <div class="practice-streak-ui">
        <div class="streak-display">
          <div class="current-streak">
            <span class="streak-label">Current Streak:</span>
            <span class="streak-flames" id="practice-streak-flames"></span>
            <span class="streak-value" id="practice-streak-value">0</span>
          </div>
          <div class="best-streak">
            Best Streak: <span id="practice-best-streak">0</span>
          </div>
        </div>

        <div class="progress-display">
          Question <span id="practice-question-num">1</span>/${this.totalQuestions}
        </div>

        <div class="question-area" id="practice-question">
          <!-- Question will be inserted here -->
        </div>

        <div class="streak-bonuses">
          <span class="bonus-info">Streak Bonuses: 5 = +5 XP | 10 = +10 XP | 15 = +15 XP</span>
        </div>
      </div>
    `;

    if (typeof showModal !== 'undefined') {
      showModal('practice-modal', `
        <div class="practice-container">
          <div class="practice-header">
            <h2>🔥 Meditation of Persistence</h2>
            <p class="practice-subtitle">Build your streak with consecutive correct answers</p>
          </div>
          <div class="practice-content">
            ${content}
          </div>
        </div>
      `);
    }
  }

  generateQuestion() {
    // Get vocabulary from learned words
    let vocab = this.getLearnedVocabulary();
    if (!vocab || vocab.length < 4) {
      // Fallback to course vocabulary if not enough learned
      vocab = this.getCourseVocabulary();
    }

    if (!vocab || vocab.length < 4) return null;

    // Pick a random word
    const wordIndex = Math.floor(Math.random() * vocab.length);
    const word = vocab[wordIndex];

    // Generate wrong options
    const wrongOptions = vocab
      .filter((_, i) => i !== wordIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.english);

    const options = [...wrongOptions, word.english].sort(() => Math.random() - 0.5);

    return {
      wordId: word.id || word.word,
      word: word.word || word.french || word.greek || word.dutch,
      correctAnswer: word.english,
      options: options,
      prompt: 'What does this mean?'
    };
  }

  getLearnedVocabulary() {
    if (typeof GameState === 'undefined' || !GameState.player) return [];

    const learned = GameState.player.learnedVocabulary || [];
    if (learned.length === 0) return [];

    // Get full word objects
    const courseVocab = this.getCourseVocabulary();
    return courseVocab.filter(word => {
      const id = word.id || word.word;
      return learned.includes(id);
    });
  }

  getCourseVocabulary() {
    // Try to get vocabulary from course manager
    if (typeof courseManager !== 'undefined' && courseManager.getVocabulary) {
      return courseManager.getVocabulary() || [];
    }

    // Fallback to window.FRENCH_VOCABULARY or similar
    const lang = GameState?.currentCourse || 'french';
    const vocabKey = `${lang.toUpperCase()}_VOCABULARY`;
    if (typeof window !== 'undefined' && window[vocabKey]) {
      // Flatten vocabulary categories into single array
      const vocabData = window[vocabKey];
      let allWords = [];
      Object.values(vocabData).forEach(category => {
        if (Array.isArray(category)) {
          allWords = allWords.concat(category);
        }
      });
      return allWords;
    }

    return [];
  }

  showNextQuestion() {
    if (this.currentQuestionIndex >= this.totalQuestions) {
      this.end();
      return;
    }

    const question = this.generateQuestion();
    if (!question) {
      this.end();
      return;
    }

    this.currentQuestion = question;
    this.currentQuestionIndex++;

    // Update question number
    const numEl = document.getElementById('practice-question-num');
    if (numEl) numEl.textContent = this.currentQuestionIndex;

    // Show question
    const questionArea = document.getElementById('practice-question');
    if (!questionArea) return;

    questionArea.innerHTML = `
      <div class="question-prompt">
        <span class="question-word">"${question.word}"</span>
        <span class="question-text">${question.prompt}</span>
      </div>
      <div class="answer-grid">
        ${question.options.map((opt, i) => `
          <button class="answer-btn" onclick="window.practiceStreakMinigame.checkAnswer('${opt.replace(/'/g, "\\'")}')">
            ${opt}
          </button>
        `).join('')}
      </div>
    `;

    // Store reference for answer checking
    window.practiceStreakMinigame = this;
  }

  checkAnswer(answer) {
    if (!this.isActive || !this.currentQuestion) return;

    const isCorrect = answer === this.currentQuestion.correctAnswer;

    // Track for Leitner
    this.practicedWords.push({
      wordId: this.currentQuestion.wordId,
      correct: isCorrect
    });

    if (isCorrect) {
      this.correctAnswers++;
      this.streak++;
      if (this.streak > this.bestStreak) {
        this.bestStreak = this.streak;
      }
      this.showFeedback(true);
    } else {
      this.streak = 0;
      this.showFeedback(false, this.currentQuestion.correctAnswer);
    }

    // Update streak display
    this.updateStreakDisplay();

    // Next question after brief delay
    setTimeout(() => this.showNextQuestion(), isCorrect ? 500 : 1500);
  }

  showFeedback(correct, correctAnswer = null) {
    const questionArea = document.getElementById('practice-question');
    if (!questionArea) return;

    const buttons = questionArea.querySelectorAll('.answer-btn');
    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent.trim() === this.currentQuestion.correctAnswer) {
        btn.classList.add('correct');
      } else if (!correct && btn.textContent.trim() === correctAnswer) {
        btn.classList.add('correct');
      }
    });

    if (!correct) {
      const feedbackEl = document.createElement('div');
      feedbackEl.className = 'answer-feedback wrong';
      feedbackEl.textContent = `Correct answer: ${correctAnswer}`;
      questionArea.appendChild(feedbackEl);
    }
  }

  updateStreakDisplay() {
    const streakValue = document.getElementById('practice-streak-value');
    const bestStreak = document.getElementById('practice-best-streak');
    const flames = document.getElementById('practice-streak-flames');

    if (streakValue) streakValue.textContent = this.streak;
    if (bestStreak) bestStreak.textContent = this.bestStreak;
    if (flames) {
      // Show flames based on streak
      let flameStr = '';
      if (this.streak >= 15) flameStr = '🔥🔥🔥';
      else if (this.streak >= 10) flameStr = '🔥🔥';
      else if (this.streak >= 5) flameStr = '🔥';
      flames.textContent = flameStr;
    }
  }

  end() {
    this.isActive = false;
    window.practiceStreakMinigame = null;

    const results = {
      correctAnswers: this.correctAnswers,
      totalQuestions: this.totalQuestions,
      bestStreak: this.bestStreak,
      practicedWords: this.practicedWords
    };

    this.showResults(results);

    if (this.practiceManager) {
      this.practiceManager.endPractice(results);
    }
  }

  showResults(results) {
    const accuracy = Math.round((results.correctAnswers / results.totalQuestions) * 100);

    let streakBonus = 0;
    if (results.bestStreak >= 15) streakBonus = 15;
    else if (results.bestStreak >= 10) streakBonus = 10;
    else if (results.bestStreak >= 5) streakBonus = 5;

    const content = `
      <div class="practice-results">
        <h3>🔥 Meditation Complete!</h3>
        <div class="results-stats">
          <div class="stat-row">
            <span class="stat-label">Correct Answers:</span>
            <span class="stat-value">${results.correctAnswers}/${results.totalQuestions}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Accuracy:</span>
            <span class="stat-value">${accuracy}%</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Best Streak:</span>
            <span class="stat-value">${results.bestStreak} ${'🔥'.repeat(Math.min(3, Math.floor(results.bestStreak / 5)))}</span>
          </div>
          ${streakBonus > 0 ? `
          <div class="stat-row bonus">
            <span class="stat-label">Streak Bonus XP:</span>
            <span class="stat-value">+${streakBonus}</span>
          </div>
          ` : ''}
        </div>
        <button class="btn-primary" onclick="hideModal('practice-modal')">Continue</button>
      </div>
    `;

    const container = document.querySelector('.practice-content');
    if (container) {
      container.innerHTML = content;
    }
  }
}

// =====================================================
// Practice Speed Minigame (Trial of Swiftness)
// Based on HuntingMinigame mechanics
// =====================================================

class PracticeSpeedMinigame {
  constructor() {
    this.totalQuestions = 10;
    this.currentQuestionIndex = 0;
    this.totalTime = 0;
    this.questionStartTime = 0;
    this.wrongPenalty = 5000; // 5 second penalty
    this.mistakes = 0;
    this.correctAnswers = 0;
    this.practicedWords = [];
    this.starThresholds = { 3: 30000, 2: 45000, 1: 60000 }; // milliseconds
    this.practiceManager = null;
    this.isActive = false;
    this.timerInterval = null;
  }

  start() {
    this.isActive = true;
    this.currentQuestionIndex = 0;
    this.totalTime = 0;
    this.mistakes = 0;
    this.correctAnswers = 0;
    this.practicedWords = [];
    this.showUI();
    this.showNextQuestion();
  }

  showUI() {
    const content = `
      <div class="practice-speed-ui">
        <div class="speed-header">
          <div class="progress-display">
            Question <span id="speed-question-num">1</span>/${this.totalQuestions}
          </div>
          <div class="time-display">
            Total Time: <span id="speed-total-time">0.0s</span>
          </div>
        </div>

        <div class="question-area" id="speed-question">
          <!-- Question will be inserted here -->
        </div>

        <div class="star-targets">
          <span class="star-target">⭐⭐⭐ &lt;30s</span>
          <span class="star-target">⭐⭐ &lt;45s</span>
          <span class="star-target">⭐ &lt;60s</span>
        </div>
      </div>
    `;

    if (typeof showModal !== 'undefined') {
      showModal('practice-modal', `
        <div class="practice-container">
          <div class="practice-header">
            <h2>⚡ Trial of Swiftness</h2>
            <p class="practice-subtitle">Answer quickly! Wrong answers add 5 seconds</p>
          </div>
          <div class="practice-content">
            ${content}
          </div>
        </div>
      `);
    }

    // Start timer display update
    this.startTimerDisplay();
  }

  startTimerDisplay() {
    this.timerInterval = setInterval(() => {
      if (!this.isActive) {
        clearInterval(this.timerInterval);
        return;
      }
      const elapsed = this.totalTime + (Date.now() - this.questionStartTime);
      const timeEl = document.getElementById('speed-total-time');
      if (timeEl) {
        timeEl.textContent = (elapsed / 1000).toFixed(1) + 's';
      }
    }, 100);
  }

  generateQuestion() {
    // Reuse the same vocabulary logic as streak minigame
    let vocab = this.getLearnedVocabulary();
    if (!vocab || vocab.length < 4) {
      vocab = this.getCourseVocabulary();
    }

    if (!vocab || vocab.length < 4) return null;

    const wordIndex = Math.floor(Math.random() * vocab.length);
    const word = vocab[wordIndex];

    const wrongOptions = vocab
      .filter((_, i) => i !== wordIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.english);

    const options = [...wrongOptions, word.english].sort(() => Math.random() - 0.5);

    return {
      wordId: word.id || word.word,
      word: word.word || word.french || word.greek || word.dutch,
      correctAnswer: word.english,
      options: options,
      prompt: 'What does this mean?'
    };
  }

  getLearnedVocabulary() {
    if (typeof GameState === 'undefined' || !GameState.player) return [];

    const learned = GameState.player.learnedVocabulary || [];
    if (learned.length === 0) return [];

    const courseVocab = this.getCourseVocabulary();
    return courseVocab.filter(word => {
      const id = word.id || word.word;
      return learned.includes(id);
    });
  }

  getCourseVocabulary() {
    if (typeof courseManager !== 'undefined' && courseManager.getVocabulary) {
      return courseManager.getVocabulary() || [];
    }

    const lang = GameState?.currentCourse || 'french';
    const vocabKey = `${lang.toUpperCase()}_VOCABULARY`;
    if (typeof window !== 'undefined' && window[vocabKey]) {
      const vocabData = window[vocabKey];
      let allWords = [];
      Object.values(vocabData).forEach(category => {
        if (Array.isArray(category)) {
          allWords = allWords.concat(category);
        }
      });
      return allWords;
    }

    return [];
  }

  showNextQuestion() {
    if (this.currentQuestionIndex >= this.totalQuestions) {
      this.end();
      return;
    }

    const question = this.generateQuestion();
    if (!question) {
      this.end();
      return;
    }

    this.currentQuestion = question;
    this.currentQuestionIndex++;
    this.questionStartTime = Date.now();

    // Update question number
    const numEl = document.getElementById('speed-question-num');
    if (numEl) numEl.textContent = this.currentQuestionIndex;

    // Show question
    const questionArea = document.getElementById('speed-question');
    if (!questionArea) return;

    questionArea.innerHTML = `
      <div class="question-prompt">
        <span class="question-word">"${question.word}"</span>
        <span class="question-text">${question.prompt}</span>
      </div>
      <div class="answer-grid">
        ${question.options.map((opt, i) => `
          <button class="answer-btn" onclick="window.practiceSpeedMinigame.checkAnswer('${opt.replace(/'/g, "\\'")}')">
            ${opt}
          </button>
        `).join('')}
      </div>
    `;

    window.practiceSpeedMinigame = this;
  }

  checkAnswer(answer) {
    if (!this.isActive || !this.currentQuestion) return;

    const questionTime = Date.now() - this.questionStartTime;
    const isCorrect = answer === this.currentQuestion.correctAnswer;

    // Track for Leitner
    this.practicedWords.push({
      wordId: this.currentQuestion.wordId,
      correct: isCorrect
    });

    if (isCorrect) {
      this.correctAnswers++;
      this.totalTime += questionTime;
      this.showFeedback(true);
    } else {
      this.mistakes++;
      this.totalTime += questionTime + this.wrongPenalty;
      this.showFeedback(false, this.currentQuestion.correctAnswer);
    }

    // Next question
    setTimeout(() => this.showNextQuestion(), isCorrect ? 300 : 1200);
  }

  showFeedback(correct, correctAnswer = null) {
    const questionArea = document.getElementById('speed-question');
    if (!questionArea) return;

    const buttons = questionArea.querySelectorAll('.answer-btn');
    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent.trim() === this.currentQuestion.correctAnswer) {
        btn.classList.add('correct');
      }
    });

    if (!correct) {
      const feedbackEl = document.createElement('div');
      feedbackEl.className = 'answer-feedback wrong';
      feedbackEl.innerHTML = `Wrong! +5s penalty<br>Correct: ${correctAnswer}`;
      questionArea.appendChild(feedbackEl);
    }
  }

  calculateStars() {
    if (this.totalTime <= this.starThresholds[3]) return 3;
    if (this.totalTime <= this.starThresholds[2]) return 2;
    if (this.totalTime <= this.starThresholds[1]) return 1;
    return 0;
  }

  end() {
    this.isActive = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    window.practiceSpeedMinigame = null;

    const stars = this.calculateStars();
    const isPerfect = this.mistakes === 0 && stars === 3;

    const results = {
      correctAnswers: this.correctAnswers,
      totalQuestions: this.totalQuestions,
      totalTime: this.totalTime,
      mistakes: this.mistakes,
      stars: stars,
      isPerfect: isPerfect,
      practicedWords: this.practicedWords
    };

    this.showResults(results);

    if (this.practiceManager) {
      this.practiceManager.endPractice(results);
    }
  }

  showResults(results) {
    const timeSeconds = (results.totalTime / 1000).toFixed(1);
    const starDisplay = '⭐'.repeat(results.stars) + '☆'.repeat(3 - results.stars);

    const content = `
      <div class="practice-results">
        <h3>⚡ Trial Complete!</h3>
        <div class="results-stats">
          <div class="stat-row">
            <span class="stat-label">Total Time:</span>
            <span class="stat-value">${timeSeconds}s</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Rating:</span>
            <span class="stat-value star-rating">${starDisplay}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Correct:</span>
            <span class="stat-value">${results.correctAnswers}/${results.totalQuestions}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Mistakes:</span>
            <span class="stat-value">${results.mistakes} (+${results.mistakes * 5}s penalty)</span>
          </div>
          ${results.isPerfect ? `
          <div class="stat-row bonus">
            <span class="stat-label">Perfect Run!</span>
            <span class="stat-value">+15 bonus XP</span>
          </div>
          ` : ''}
        </div>
        <button class="btn-primary" onclick="hideModal('practice-modal')">Continue</button>
      </div>
    `;

    const container = document.querySelector('.practice-content');
    if (container) {
      container.innerHTML = content;
    }
  }
}

// =====================================================
// Initialize Practice Manager
// =====================================================

function initPracticeSystem() {
  if (typeof window !== 'undefined') {
    window.practiceManager = new PracticeManager(GameState);
    window.PRACTICE_MODES = PRACTICE_MODES;
    console.log('[PracticeSystem] Initialized');
  }
}

// =====================================================
// Exports
// =====================================================

if (typeof window !== 'undefined') {
  window.PracticeManager = PracticeManager;
  window.PracticeStreakMinigame = PracticeStreakMinigame;
  window.PracticeSpeedMinigame = PracticeSpeedMinigame;
  window.initPracticeSystem = initPracticeSystem;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PRACTICE_MODES,
    PracticeManager,
    PracticeStreakMinigame,
    PracticeSpeedMinigame,
    initPracticeSystem
  };
}
