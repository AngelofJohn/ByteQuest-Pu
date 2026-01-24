/**
 * ByteQuest - Practice/Review UI
 * Interface for Leitner spaced repetition review sessions
 */

const PracticeUI = {
  // Current session state
  session: null,
  currentIndex: 0,
  results: [],
  currentTab: 'practice', // practice, translations, monuments

  /**
   * Show the practice hub (entry point)
   */
  showPracticeHub(tab = 'practice') {
    this.currentTab = tab;
    const stats = LeitnerSystem.getStats();

    // Get milestone progress
    let milestoneHtml = '';
    if (typeof VocabularyMasterySystem !== 'undefined') {
      const nextMilestone = VocabularyMasterySystem.getNextMilestone();
      const totalMastered = VocabularyMasterySystem.getTotalMasteredCount();
      if (nextMilestone) {
        const percent = Math.min(100, Math.round((totalMastered / nextMilestone.threshold) * 100));
        milestoneHtml = `
          <div class="milestone-progress">
            <div class="milestone-info">
              <span class="milestone-icon">${nextMilestone.icon}</span>
              <span class="milestone-name">Next: ${nextMilestone.name}</span>
              <span class="milestone-count">${totalMastered}/${nextMilestone.threshold}</span>
            </div>
            <div class="milestone-bar">
              <div class="milestone-fill" style="width: ${percent}%"></div>
            </div>
          </div>
        `;
      } else {
        milestoneHtml = `<div class="milestone-complete">⭐ All milestones achieved!</div>`;
      }
    }

    // Count notifications for tabs
    let translationCount = 0;
    let monumentCount = 0;
    if (typeof VocabularyMasterySystem !== 'undefined') {
      const texts = memoryShrineManager?.getPlayerAncientTexts?.() || [];
      translationCount = texts.filter(t => t.canTranslate).length;
      const monuments = VocabularyMasterySystem.getAllMonuments();
      monumentCount = monuments.filter(m => m.canBuild).length;
    }

    const content = `
      <div class="practice-hub">
        <div class="practice-header">
          <h2>🏛️ Memory Shrine</h2>
          <button class="close-btn" onclick="hideModal('practice-modal')">✕</button>
        </div>

        ${milestoneHtml}

        <div class="shrine-tabs">
          <button class="shrine-tab ${tab === 'practice' ? 'active' : ''}" onclick="PracticeUI.showPracticeHub('practice')">
            📚 Practice
            ${stats.dueForReview > 0 ? `<span class="tab-badge">${stats.dueForReview}</span>` : ''}
          </button>
          <button class="shrine-tab ${tab === 'translations' ? 'active' : ''}" onclick="PracticeUI.showPracticeHub('translations')">
            📜 Translations
            ${translationCount > 0 ? `<span class="tab-badge">${translationCount}</span>` : ''}
          </button>
          <button class="shrine-tab ${tab === 'monuments' ? 'active' : ''}" onclick="PracticeUI.showPracticeHub('monuments')">
            🏛️ Monuments
            ${monumentCount > 0 ? `<span class="tab-badge">${monumentCount}</span>` : ''}
          </button>
        </div>

        <div class="shrine-tab-content">
          ${tab === 'practice' ? this._renderPracticeTab(stats) : ''}
          ${tab === 'translations' ? this._renderTranslationsTab() : ''}
          ${tab === 'monuments' ? this._renderMonumentsTab() : ''}
        </div>

        <div class="practice-actions">
          <button class="pixel-btn" onclick="hideModal('practice-modal')">Close</button>
        </div>
      </div>
    `;

    showModal('practice-modal', content);
  },

  /**
   * Render the Practice tab content
   */
  _renderPracticeTab(stats) {
    const dueCount = stats.dueForReview;
    const canPractice = dueCount >= 4;
    const breakdownHtml = this._renderMasteryBreakdown(stats.breakdown);

    return `
      <div class="practice-stats">
        <div class="stat-card">
          <div class="stat-value">${stats.totalWords}</div>
          <div class="stat-label">Words Learned</div>
        </div>
        <div class="stat-card ${dueCount > 0 ? 'has-due' : ''}">
          <div class="stat-value">${dueCount}</div>
          <div class="stat-label">Due for Review</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${stats.masteryPercent}%</div>
          <div class="stat-label">Mastery</div>
        </div>
      </div>

      <div class="mastery-breakdown">
        <h3>Vocabulary Mastery</h3>
        ${breakdownHtml}
      </div>

      <div class="practice-start">
        ${canPractice ? `
          <button class="pixel-btn primary" onclick="PracticeUI.startSession()">
            Start Review (${Math.min(dueCount, 20)} words)
          </button>
        ` : `
          <div class="no-practice">
            ${stats.totalWords === 0
              ? 'Complete lessons to learn new words!'
              : `Only ${dueCount} word${dueCount !== 1 ? 's' : ''} due. Need at least 4.`}
          </div>
        `}
      </div>
    `;
  },

  /**
   * Render the Translations tab content
   */
  _renderTranslationsTab() {
    if (typeof VocabularyMasterySystem === 'undefined') {
      return '<div class="no-content">Translation system not available</div>';
    }

    // Check milestone unlock
    if (!VocabularyMasterySystem.hasFeatureUnlock('translation_quests')) {
      const milestone = VocabularyMasterySystem.milestones.novice_speaker;
      const totalMastered = VocabularyMasterySystem.getTotalMasteredCount();
      return `
        <div class="feature-locked">
          <div class="lock-icon">🔒</div>
          <div class="lock-text">Translations Locked</div>
          <div class="lock-requirement">
            Master ${milestone.threshold - totalMastered} more words to unlock
          </div>
          <div class="lock-progress">
            <div class="lock-bar" style="width: ${Math.round((totalMastered / milestone.threshold) * 100)}%"></div>
          </div>
        </div>
      `;
    }

    // Get player's ancient texts
    const texts = memoryShrineManager?.getPlayerAncientTexts?.() || [];
    const allQuests = VocabularyMasterySystem.getAllTranslationQuests();

    if (texts.length === 0) {
      return `
        <div class="translations-empty">
          <div class="empty-icon">📜</div>
          <div class="empty-text">No Ancient Texts Found</div>
          <div class="empty-hint">Find ancient texts while gathering resources to translate them here.</div>
        </div>
        <div class="translation-progress">
          <h4>Translation Progress</h4>
          <div class="quest-list">
            ${allQuests.map(q => `
              <div class="quest-item ${q.completed ? 'completed' : 'locked'}">
                <span class="quest-icon">${q.completed ? '✓' : '?'}</span>
                <span class="quest-name">${q.completed ? q.name : '???'}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    return `
      <div class="translations-list">
        <h3>Ancient Texts</h3>
        ${texts.map(text => {
          const categoryMastery = LeitnerSystem.getMasteredCountByCategory(text.category);
          const canTranslate = categoryMastery.mastered >= text.wordsRequired;
          const percent = Math.min(100, Math.round((categoryMastery.mastered / text.wordsRequired) * 100));

          return `
            <div class="translation-card ${canTranslate ? 'ready' : 'locked'}">
              <div class="translation-header">
                <span class="translation-icon">${GAME_DATA.items?.[text.itemId]?.icon || '📜'}</span>
                <span class="translation-name">${text.name}</span>
              </div>
              <div class="translation-desc">${text.description}</div>
              <div class="translation-req">
                <span class="req-label">Requires:</span>
                <span class="req-value">${text.wordsRequired} ${text.category} words mastered</span>
              </div>
              <div class="translation-progress">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${percent}%"></div>
                </div>
                <span class="progress-text">${categoryMastery.mastered}/${text.wordsRequired}</span>
              </div>
              <div class="translation-rewards">
                <span class="reward-label">Rewards:</span>
                <span class="reward-value">🔷 ${text.rewards.monumentShards} Shard${text.rewards.monumentShards > 1 ? 's' : ''}, +${text.rewards.xp} XP</span>
              </div>
              ${canTranslate ? `
                <button class="pixel-btn primary" onclick="PracticeUI.attemptTranslation('${text.id}')">
                  Translate
                </button>
              ` : `
                <div class="translation-locked">Learn more ${text.category} vocabulary</div>
              `}
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  /**
   * Render the Monuments tab content
   */
  _renderMonumentsTab() {
    if (typeof VocabularyMasterySystem === 'undefined') {
      return '<div class="no-content">Monument system not available</div>';
    }

    // Check milestone unlock
    if (!VocabularyMasterySystem.hasFeatureUnlock('monuments')) {
      const milestone = VocabularyMasterySystem.milestones.apprentice_speaker;
      const totalMastered = VocabularyMasterySystem.getTotalMasteredCount();
      return `
        <div class="feature-locked">
          <div class="lock-icon">🔒</div>
          <div class="lock-text">Monuments Locked</div>
          <div class="lock-requirement">
            Master ${milestone.threshold - totalMastered} more words to unlock
          </div>
          <div class="lock-progress">
            <div class="lock-bar" style="width: ${Math.round((totalMastered / milestone.threshold) * 100)}%"></div>
          </div>
        </div>
      `;
    }

    const monuments = VocabularyMasterySystem.getAllMonuments();
    const shards = GameState.player.monumentShards || 0;

    return `
      <div class="monuments-header">
        <div class="shards-display">
          <span class="shards-icon">🔷</span>
          <span class="shards-count">${shards}</span>
          <span class="shards-label">Monument Shards</span>
        </div>
      </div>
      <div class="monuments-list">
        ${monuments.map(monument => {
          const req = monument.requirements;
          return `
            <div class="monument-card ${monument.built ? 'built' : monument.canBuild ? 'ready' : 'locked'}">
              <div class="monument-header">
                <span class="monument-icon">${monument.icon}</span>
                <span class="monument-name">${monument.name}</span>
                ${monument.built ? '<span class="built-badge">✓ Built</span>' : ''}
              </div>
              <div class="monument-desc">${monument.description}</div>
              ${!monument.built ? `
                <div class="monument-requirements">
                  <div class="req-item ${shards >= req.monumentShards ? 'met' : ''}">
                    🔷 ${req.monumentShards} Shards ${shards >= req.monumentShards ? '✓' : `(${shards})`}
                  </div>
                  ${req.gold ? `
                    <div class="req-item ${(GameState.player.gold || 0) >= req.gold ? 'met' : ''}">
                      💰 ${req.gold} Gold
                    </div>
                  ` : ''}
                  ${req.resources ? Object.entries(req.resources).map(([res, amt]) => `
                    <div class="req-item">📦 ${amt} ${res}</div>
                  `).join('') : ''}
                  ${req.totalMastered ? `
                    <div class="req-item ${VocabularyMasterySystem.getTotalMasteredCount() >= req.totalMastered ? 'met' : ''}">
                      📚 ${req.totalMastered} words mastered
                    </div>
                  ` : ''}
                </div>
              ` : ''}
              <div class="monument-bonus">
                <span class="bonus-label">Bonus:</span>
                <span class="bonus-value">${monument.bonus.description}</span>
              </div>
              ${!monument.built && monument.canBuild ? `
                <button class="pixel-btn primary" onclick="PracticeUI.buildMonument('${monument.id}')">
                  Build Monument
                </button>
              ` : ''}
              ${!monument.built && !monument.canBuild ? `
                <div class="monument-locked">${monument.reason}</div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  /**
   * Attempt to translate an ancient text
   */
  attemptTranslation(questId) {
    if (typeof VocabularyMasterySystem === 'undefined') return;

    const result = VocabularyMasterySystem.translateText(questId);

    if (result.success) {
      showNotification(`📜 Translated ${result.quest.name}! +${result.rewards.monumentShards} Monument Shard(s)`, 'success');
      // Refresh the UI
      this.showPracticeHub('translations');
    } else {
      showNotification(result.reason, 'error');
    }
  },

  /**
   * Build a monument
   */
  buildMonument(monumentId) {
    if (typeof VocabularyMasterySystem === 'undefined') return;

    const result = VocabularyMasterySystem.buildMonument(monumentId);

    if (result.success) {
      showNotification(`🏛️ Built ${result.monument.name}! ${result.monument.bonus.description}`, 'success');
      // Refresh the UI
      this.showPracticeHub('monuments');
    } else {
      showNotification(result.reason, 'error');
    }
  },

  /**
   * Render mastery breakdown bars
   */
  _renderMasteryBreakdown(breakdown) {
    const total = breakdown.total || 1;
    const levels = [
      { key: 'learning', name: 'Learning', color: '#e74c3c' },
      { key: 'familiar', name: 'Familiar', color: '#e67e22' },
      { key: 'practiced', name: 'Practiced', color: '#f1c40f' },
      { key: 'known', name: 'Known', color: '#2ecc71' },
      { key: 'mastered', name: 'Mastered', color: '#9b59b6' }
    ];

    if (total === 0) {
      return '<div class="no-words">No words learned yet</div>';
    }

    return `
      <div class="mastery-bars">
        ${levels.map(level => {
          const count = breakdown[level.key] || 0;
          const percent = Math.round((count / total) * 100);
          return `
            <div class="mastery-row">
              <div class="mastery-label">${level.name}</div>
              <div class="mastery-bar-container">
                <div class="mastery-bar" style="width: ${percent}%; background: ${level.color}"></div>
              </div>
              <div class="mastery-count">${count}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  /**
   * Start a practice session
   */
  startSession(wordLimit = 20) {
    const dueWords = LeitnerSystem.getDueWords(wordLimit);

    if (dueWords.length < 4) {
      showNotification('Not enough words due for review', 'warning');
      return;
    }

    // Build questions from due words
    this.session = {
      words: dueWords,
      questions: this._buildQuestions(dueWords),
      startTime: Date.now()
    };
    this.currentIndex = 0;
    this.results = [];

    this._showQuestion();
  },

  /**
   * Build review questions from words
   */
  _buildQuestions(words) {
    const questions = [];

    words.forEach((wordData, index) => {
      // Alternate between asking for translation and asking for original
      const askForTranslation = index % 2 === 0;

      // Get wrong answers from other words
      const otherWords = words.filter(w => w.id !== wordData.id);
      const wrongAnswers = this._shuffle(otherWords)
        .slice(0, 3)
        .map(w => askForTranslation ? w.translation : w.word);

      const correctAnswer = askForTranslation ? wordData.translation : wordData.word;
      const options = this._shuffle([correctAnswer, ...wrongAnswers]);

      questions.push({
        wordId: wordData.id,
        wordData: wordData,
        prompt: askForTranslation
          ? `What does "${wordData.word}" mean?`
          : `How do you say "${wordData.translation}"?`,
        displayWord: askForTranslation ? wordData.word : wordData.translation,
        correctAnswer: correctAnswer,
        options: options,
        box: wordData.box
      });
    });

    return questions;
  },

  /**
   * Show current question
   */
  _showQuestion() {
    const question = this.session.questions[this.currentIndex];
    const progress = `${this.currentIndex + 1}/${this.session.questions.length}`;
    const progressPercent = (this.currentIndex / this.session.questions.length) * 100;

    // Box indicator
    const boxName = LeitnerSystem.boxNames[question.box] || 'Unknown';
    const boxColors = ['#666', '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#9b59b6'];
    const boxColor = boxColors[question.box] || '#666';

    const optionsHtml = question.options.map((option, index) => `
      <button class="practice-option" onclick="PracticeUI.selectAnswer('${this._escapeJs(option)}')" data-option="${index}">
        ${option}
      </button>
    `).join('');

    const content = `
      <div class="practice-session">
        <div class="practice-header">
          <div class="practice-progress">
            <span>Question ${progress}</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progressPercent}%"></div>
            </div>
          </div>
          <button class="abandon-btn" onclick="PracticeUI.abandonSession()" title="Abandon">✕</button>
        </div>

        <div class="word-box-indicator" style="background: ${boxColor}">
          ${boxName}
        </div>

        <div class="practice-question">
          <div class="question-prompt">${question.prompt}</div>
          <div class="question-word">${question.displayWord}</div>
        </div>

        <div class="practice-options">
          ${optionsHtml}
        </div>
      </div>
    `;

    showModal('practice-modal', content);
  },

  /**
   * Handle answer selection
   */
  selectAnswer(selectedAnswer) {
    const question = this.session.questions[this.currentIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;

    // Store result
    this.results.push({
      wordId: question.wordId,
      correct: isCorrect,
      selectedAnswer: selectedAnswer,
      correctAnswer: question.correctAnswer
    });

    // Update Leitner system immediately
    LeitnerSystem.updateWord(question.wordId, isCorrect);

    // Check for vocabulary mastery unlocks
    if (typeof VocabularyMasterySystem !== 'undefined') {
      const newUnlocks = VocabularyMasterySystem.checkForNewUnlocks();
      for (const upgrade of newUnlocks) {
        if (typeof showNotification === 'function') {
          showNotification(`${upgrade.icon} ${upgrade.name} unlocked! ${upgrade.description}`, 'success');
        }
      }
    }

    // Show feedback
    this._showFeedback(isCorrect, question.correctAnswer, selectedAnswer);
  },

  /**
   * Show answer feedback
   */
  _showFeedback(isCorrect, correctAnswer, selectedAnswer) {
    const question = this.session.questions[this.currentIndex];

    const content = `
      <div class="practice-feedback">
        <div class="feedback-icon ${isCorrect ? 'correct' : 'incorrect'}">
          ${isCorrect ? '✓' : '✗'}
        </div>
        <div class="feedback-text">
          ${isCorrect ? 'Correct!' : 'Incorrect'}
        </div>
        ${!isCorrect ? `
          <div class="correct-answer">
            The answer was: <strong>${correctAnswer}</strong>
          </div>
        ` : ''}
        <div class="word-info">
          <span class="word-foreign">${question.wordData.word}</span>
          <span class="word-arrow">→</span>
          <span class="word-translation">${question.wordData.translation}</span>
        </div>
        <button class="pixel-btn primary" onclick="PracticeUI.nextQuestion()">
          ${this.currentIndex < this.session.questions.length - 1 ? 'Next' : 'See Results'}
        </button>
      </div>
    `;

    showModal('practice-modal', content);
  },

  /**
   * Move to next question or finish
   */
  nextQuestion() {
    this.currentIndex++;

    if (this.currentIndex >= this.session.questions.length) {
      this._showResults();
    } else {
      this._showQuestion();
    }
  },

  /**
   * Show session results
   */
  _showResults() {
    const correctCount = this.results.filter(r => r.correct).length;
    const totalCount = this.results.length;
    const accuracy = Math.round((correctCount / totalCount) * 100);
    const isPerfect = correctCount === totalCount;

    // Calculate XP reward
    let xpEarned = correctCount * 5; // 5 XP per correct
    if (isPerfect) xpEarned += 15; // Perfect bonus

    // Award XP
    if (typeof XPSystem !== 'undefined' && xpEarned > 0) {
      XPSystem.awardXP(xpEarned, 'practice');
    }

    // Record session with Memory Shrine if available
    if (typeof memoryShrineManager !== 'undefined') {
      memoryShrineManager.recordReviewSession({
        wordsReviewed: totalCount,
        correctCount: correctCount,
        accuracy: accuracy / 100,
        isPerfect: isPerfect
      });
    }

    const content = `
      <div class="practice-results">
        <div class="results-header">
          <h2>${isPerfect ? '🌟 Perfect!' : '📚 Session Complete'}</h2>
        </div>

        <div class="results-stats">
          <div class="result-stat">
            <div class="stat-value">${correctCount}/${totalCount}</div>
            <div class="stat-label">Correct</div>
          </div>
          <div class="result-stat">
            <div class="stat-value">${accuracy}%</div>
            <div class="stat-label">Accuracy</div>
          </div>
          <div class="result-stat">
            <div class="stat-value">+${xpEarned}</div>
            <div class="stat-label">XP Earned</div>
          </div>
        </div>

        <div class="results-breakdown">
          <h3>Word Results</h3>
          <div class="results-list">
            ${this.results.map(r => {
              const word = this.session.words.find(w => w.id === r.wordId);
              return `
                <div class="result-item ${r.correct ? 'correct' : 'incorrect'}">
                  <span class="result-icon">${r.correct ? '✓' : '✗'}</span>
                  <span class="result-word">${word?.word || r.wordId}</span>
                  <span class="result-translation">${word?.translation || ''}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="results-actions">
          ${LeitnerSystem.canReview(4) ? `
            <button class="pixel-btn" onclick="PracticeUI.startSession()">Practice Again</button>
          ` : ''}
          <button class="pixel-btn primary" onclick="hideModal('practice-modal')">Done</button>
        </div>
      </div>
    `;

    showModal('practice-modal', content);

    // Clear session
    this.session = null;
  },

  /**
   * Abandon current session
   */
  abandonSession() {
    if (confirm('Abandon this practice session? Progress will be lost.')) {
      this.session = null;
      this.results = [];
      hideModal('practice-modal');
    }
  },

  /**
   * Shuffle array
   */
  _shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  /**
   * Escape string for JS onclick
   */
  _escapeJs(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
  }
};

// Global function for easy access
function showPracticeScreen() {
  PracticeUI.showPracticeHub();
}

// Make available globally
if (typeof window !== 'undefined') {
  window.PracticeUI = PracticeUI;
  window.showPracticeScreen = showPracticeScreen;
}
