/**
 * ByteQuest - Lesson System
 * Simple vocabulary lesson system with multiple choice questions
 */

const LessonSystem = {
  // Current lesson state
  currentLesson: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: [],

  // Lesson configuration
  config: {
    questionsPerLesson: 2,  // DEV: reduced from 8 for testing
    passingScore: 0.7,
    xpPerCorrect: 10,
    xpPerfectBonus: 25,
    // HP damage for incorrect answers (scales with difficulty)
    damagePerWrong: {
      easy: 0,       // No damage on easy (practice mode)
      normal: 10,    // 10 HP per wrong answer (~4 mistakes at start)
      hard: 15,      // 15 HP per wrong answer (~2-3 mistakes at start)
      nightmare: 20  // 20 HP per wrong answer (~2 mistakes at start)
    }
  },

  // Standard lesson to category mappings (language-agnostic)
  // CourseDataManager.getLessonVocabCategory() handles course-specific mappings
  lessonToCategory: {
    'greetings_vocab': 'greetings',
    'introductions_vocab': 'introductions',
    'numbers_vocab': 'numbers',
    'colors_vocab': 'colors',
    'days_vocab': 'days',
    'cognates_vocab': 'cognates',
    'family_vocab': 'family',
    'food_vocab': 'food',
    'essentials_vocab': 'essentials'
  },

  /**
   * Get vocabulary data (language-agnostic)
   * Uses CourseDataManager if available, falls back to direct access
   */
  _getVocab() {
    // Use CourseDataManager (preferred)
    if (typeof CourseDataManager !== 'undefined' && CourseDataManager.currentCourse) {
      return CourseDataManager.getVocab();
    }

    // Fallback: try common vocab variable names
    if (typeof FRENCH_VOCAB !== 'undefined') return FRENCH_VOCAB;
    if (typeof GREEK_VOCAB !== 'undefined') return GREEK_VOCAB;
    if (typeof DUTCH_VOCAB !== 'undefined') return DUTCH_VOCAB;

    console.error('[LessonSystem] No vocabulary data found!');
    return {};
  },

  /**
   * Get vocabulary for a specific category (language-agnostic)
   */
  _getVocabCategory(category) {
    // Use CourseDataManager (preferred)
    if (typeof CourseDataManager !== 'undefined' && CourseDataManager.currentCourse) {
      return CourseDataManager.getVocabCategory(category);
    }

    // Fallback: direct access
    const vocab = this._getVocab();
    if (vocab[category] && Array.isArray(vocab[category])) {
      return vocab[category];
    }

    return [];
  },

  /**
   * Get the target language name for prompts
   */
  _getTargetLanguage() {
    if (typeof CourseDataManager !== 'undefined' && CourseDataManager.currentCourse) {
      return CourseDataManager.getCourseName();
    }
    return 'the target language';
  },

  /**
   * Get the word field name for the target language
   * Different languages may use different field names (french, greek, target, etc.)
   */
  _getTargetField() {
    if (typeof CourseDataManager !== 'undefined' && CourseDataManager.currentCourse) {
      const course = CourseDataManager.currentCourse;
      // Common field names by language
      const fieldMap = {
        'french': 'french',
        'greek': 'greek',
        'spanish': 'spanish',
        'german': 'german',
        'italian': 'italian',
        'dutch': 'dutch'
      };
      return fieldMap[course] || 'target';
    }
    return 'french'; // Default fallback
  },

  /**
   * Start a lesson from a quest
   */
  startLesson(quest) {
    console.log('[LessonSystem] Starting lesson for quest:', quest.id);

    // Check if vocab is loaded (language-agnostic)
    const vocab = this._getVocab();
    if (!vocab || Object.keys(vocab).length === 0) {
      console.error('[LessonSystem] No vocabulary loaded!');
      this._showError('Vocabulary data not loaded. Please refresh the page.');
      return;
    }

    // Get the vocab category from quest objectives
    // Find the vocabulary_lesson objective (may not be the first one)
    let category = null;
    if (quest.objectives && quest.objectives.length > 0) {
      const obj = quest.objectives.find(o => o.type === 'vocabulary_lesson') || quest.objectives[0];

      // Check for vocabularySource (newer format used by Greek)
      if (obj.vocabularySource) {
        const { category: cat, subcategory } = obj.vocabularySource;
        category = subcategory ? `${cat}.${subcategory}` : cat;
      }
      // Check for lesson field (older format)
      else if (obj.lesson) {
        // Try CourseDataManager mapping first
        if (typeof CourseDataManager !== 'undefined' && CourseDataManager.currentCourse) {
          category = CourseDataManager.getLessonVocabCategory(obj.lesson);
        }
        // Fall back to local mapping
        if (!category) {
          category = this.lessonToCategory[obj.lesson];
        }
      }
    }

    // Fallback: use quest-level vocabCategory if objectives didn't provide one
    if (!category && quest.vocabCategory) {
      category = quest.vocabCategory;
    }

    this.currentLesson = {
      questId: quest.id,
      questName: quest.name,
      questLocation: quest.location || null,
      vocabCategory: category,
      startTime: Date.now()
    };

    console.log('[LessonSystem] Using category:', category);

    // Generate questions
    this.questions = this._generateQuestions(category);
    this.currentQuestionIndex = 0;
    this.answers = [];

    if (this.questions.length === 0) {
      console.error('[LessonSystem] No questions generated!');
      this._showError('Could not generate questions for this lesson.');
      return;
    }

    console.log('[LessonSystem] Generated', this.questions.length, 'questions');

    // Initialize streak tracking for this lesson
    if (typeof StreakSystem !== 'undefined') {
      StreakSystem.startLesson();
    }

    // Initialize hint tracking for this lesson
    if (typeof GameState !== 'undefined') {
      GameState.lessonState = GameState.lessonState || {};
      GameState.lessonState.questions = this.questions;
      GameState.lessonState.currentQuestion = 0;

      if (typeof hintManager !== 'undefined' && hintManager) {
        const hintInfo = hintManager.initializeForLesson();
        GameState.lessonState.hintCharges = hintInfo.charges;
        GameState.lessonState.maxHintCharges = hintInfo.maxCharges;
        GameState.lessonState.hintsUsed = 0;
        console.log('[LessonSystem] Hints initialized:', hintInfo.charges, 'charges');
      }
    }

    // Show the lesson UI
    this._showLessonUI();
  },

  /**
   * Generate multiple choice questions from vocab (language-agnostic)
   */
  _generateQuestions(category) {
    const questions = [];
    let words = [];

    // Get words from the specified category or all categories
    if (category) {
      words = this._getVocabCategory(category);
      if (!words || words.length === 0) {
        // Try without subcategory
        const baseCategory = category.split('.')[0];
        words = this._getVocabCategory(baseCategory);
      }
    }

    // If still no words, gather from all categories
    if (!words || words.length === 0) {
      if (typeof CourseDataManager !== 'undefined' && CourseDataManager.currentCourse) {
        words = CourseDataManager.getAllVocab();
      } else {
        const vocab = this._getVocab();
        Object.values(vocab).forEach(catWords => {
          if (Array.isArray(catWords)) {
            words = words.concat(catWords);
          }
        });
      }
    }

    // Ensure words is an array
    if (!Array.isArray(words)) {
      words = [];
    }

    if (words.length < 4) {
      console.error('[LessonSystem] Not enough words for questions:', words.length);
      return [];
    }

    // Shuffle words
    words = this._shuffle(words);

    // Get the target language field name
    const targetField = this._getTargetField();
    const languageName = this._getTargetLanguage();

    // Generate questions (alternating directions)
    const count = Math.min(this.config.questionsPerLesson, words.length);
    for (let i = 0; i < count; i++) {
      const word = words[i];

      // Get the target language word (supports different field names)
      const targetWord = word[targetField] || word.target || word.word || '';
      const englishWord = word.english || word.en || '';

      if (!targetWord || !englishWord) {
        console.warn('[LessonSystem] Skipping word with missing fields:', word);
        continue;
      }

      const isToEnglish = i % 2 === 0;

      // Get 3 wrong answers from other words
      const otherWords = words.filter(w => w !== word);
      const wrongAnswers = this._shuffle(otherWords)
        .slice(0, 3)
        .map(w => {
          if (isToEnglish) {
            return w.english || w.en || '';
          } else {
            return w[targetField] || w.target || w.word || '';
          }
        })
        .filter(a => a); // Remove empty answers

      if (wrongAnswers.length < 3) {
        console.warn('[LessonSystem] Not enough wrong answers for question');
        continue;
      }

      const correctAnswer = isToEnglish ? englishWord : targetWord;
      const options = this._shuffle([correctAnswer, ...wrongAnswers]);

      questions.push({
        type: isToEnglish ? 'to_english' : 'to_target',
        prompt: isToEnglish
          ? `What does "${targetWord}" mean?`
          : `How do you say "${englishWord}" in ${languageName}?`,
        word: isToEnglish ? targetWord : englishWord,
        correctAnswer: correctAnswer,
        options: options,
        wordData: word  // Store full word data for hints
      });
    }

    return questions;
  },

  /**
   * Show the lesson UI
   */
  _showLessonUI() {
    const question = this.questions[this.currentQuestionIndex];
    const progress = `${this.currentQuestionIndex + 1}/${this.questions.length}`;

    const content = `
      <div class="lesson-container" id="lesson-content">
        <div class="lesson-header">
          <div class="lesson-header-top">
            <h2 class="lesson-title">${this.currentLesson.questName}</h2>
            <button class="lesson-abandon-btn" onclick="LessonSystem.abandonLesson()" title="Abandon Lesson">✕</button>
          </div>
          <div class="lesson-progress">
            <span class="progress-text">Question ${progress}</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${((this.currentQuestionIndex) / this.questions.length) * 100}%"></div>
            </div>
          </div>
        </div>

        <div class="question-area" id="question-area">
          ${this._renderQuestion(question)}
        </div>
      </div>
    `;

    if (typeof showModal === 'function') {
      showModal('lesson-modal', content);
    }

    // Update hint display after modal is shown
    setTimeout(() => {
      if (typeof updateHintDisplay === 'function') {
        updateHintDisplay();
      }
    }, 50);

    // Show lesson basics tutorial for first-time players
    if (!GameState.tutorial?.shownTips?.includes('lessonBasics')) {
      setTimeout(() => {
        showTutorialTip('lessonBasics', '.lesson-container', () => {});
      }, 300);
    }
  },

  /**
   * Render a question
   */
  _renderQuestion(question) {
    if (!question) return '<p>No question available</p>';

    const optionsHtml = question.options.map((option, index) => `
      <button class="answer-option" onclick="LessonSystem.selectAnswer('${this._escapeForJs(option)}')" data-option="${index}">
        ${option}
      </button>
    `).join('');

    // Reset hint state for new question
    if (typeof resetHintForQuestion === 'function') {
      resetHintForQuestion();
    }

    return `
      <div class="question-prompt">${question.prompt}</div>
      <div class="question-word">${question.word}</div>
      <div class="answer-options">
        ${optionsHtml}
      </div>
      <div class="hint-box">
        💡 Loading hints...
      </div>
    `;
  },

  /**
   * Handle answer selection
   */
  selectAnswer(selectedAnswer) {
    const question = this.questions[this.currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;

    this.answers.push({
      questionIndex: this.currentQuestionIndex,
      selectedAnswer: selectedAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect: isCorrect
    });

    // Update streak tracking
    let streakInfo = null;
    if (typeof StreakSystem !== 'undefined') {
      if (isCorrect) {
        streakInfo = StreakSystem.recordCorrect();
      } else {
        streakInfo = StreakSystem.recordIncorrect();
      }
    }

    // Deal HP damage for incorrect answers
    let damageTaken = 0;
    if (!isCorrect) {
      damageTaken = this._applyWrongAnswerDamage();
    }

    this._showAnswerFeedback(isCorrect, question.correctAnswer, damageTaken, streakInfo);
  },

  /**
   * Get damage amount based on difficulty setting
   */
  _getDamageForDifficulty() {
    const difficulty = GameState.settings?.difficulty || 'normal';
    return this.config.damagePerWrong[difficulty] || this.config.damagePerWrong.normal;
  },

  /**
   * Apply HP damage for wrong answer
   * @returns {number} Amount of damage dealt (0 if avoided)
   */
  _applyWrongAnswerDamage() {
    let damage = this._getDamageForDifficulty();
    if (damage <= 0) return 0;

    // Show wrong answer tutorial for first-time players
    if (!GameState.tutorial?.shownTips?.includes('wrongAnswer')) {
      setTimeout(() => {
        showTutorialTip('wrongAnswer', '.player-hp', () => {});
      }, 100);
    }

    // Check Luck stat - chance to avoid damage entirely
    if (typeof statsManager !== 'undefined' && statsManager.rollLuckAvoidDamage()) {
      console.log('[LessonSystem] Luck proc! Damage avoided');
      if (typeof showNotification === 'function') {
        showNotification('Lucky! Damage avoided', 'success');
      }
      return 0;
    }

    // Apply Strength stat - reduces damage taken
    if (typeof statsManager !== 'undefined') {
      const reducedDamage = statsManager.calculateDamageTaken(damage);
      if (reducedDamage < damage) {
        console.log(`[LessonSystem] Strength reduced damage: ${damage} -> ${reducedDamage}`);
      }
      damage = reducedDamage;
    }

    // Check for damage reduction from consumables
    if (typeof itemManager !== 'undefined' && itemManager.getActiveConsumableBonus) {
      const damageReduction = itemManager.getActiveConsumableBonus('damageReduction');
      if (damageReduction > 0) {
        const reducedDamage = Math.round(damage * (1 - damageReduction));
        console.log(`[LessonSystem] Consumable reduced damage: ${damage} -> ${reducedDamage}`);
        damage = reducedDamage;
      }
    }

    // Apply damage to player HP
    const previousHp = GameState.player.hp;
    GameState.player.hp = Math.max(0, GameState.player.hp - damage);

    console.log('[LessonSystem] Wrong answer damage:', damage, 'HP:', previousHp, '->', GameState.player.hp);

    // Update HUD to show HP change
    if (typeof renderHUD === 'function') {
      renderHUD();
    }

    // Check for death (HP reaches 0)
    if (GameState.player.hp <= 0) {
      this._handlePlayerDeath();
    }

    return damage;
  },

  /**
   * Handle player death during lesson (HP reaches 0)
   */
  _handlePlayerDeath() {
    console.log('[LessonSystem] Player died during lesson!');

    // End the lesson immediately
    if (typeof hideModal === 'function') {
      hideModal('lesson-modal');
    }

    // Reset lesson state
    const questId = this.currentLesson?.questId;
    this.currentLesson = null;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.answers = [];

    // Trigger death handling (if DeathSystem exists)
    if (typeof DeathSystem !== 'undefined' && DeathSystem.handleDeath) {
      DeathSystem.handleDeath('lesson');
    } else {
      // Fallback: simple revival with penalty
      GameState.player.hp = Math.floor(GameState.player.maxHp * 0.5);
      if (typeof showNotification === 'function') {
        showNotification('You were overwhelmed! Revived with 50% HP.', 'error');
      }
      if (typeof renderHUD === 'function') {
        renderHUD();
      }
    }
  },

  /**
   * Show answer feedback
   */
  _showAnswerFeedback(isCorrect, correctAnswer, damageTaken = 0, streakInfo = null) {
    const questionArea = document.getElementById('question-area');
    if (!questionArea) return;

    const feedbackClass = isCorrect ? 'correct' : 'incorrect';
    let feedbackText = isCorrect ? 'Correct!' : `Incorrect. The answer is: ${correctAnswer}`;

    // Add damage indicator if damage was taken
    const damageIndicator = damageTaken > 0 ? `<span class="damage-taken">-${damageTaken} HP</span>` : '';

    // Build streak display if available
    let streakDisplay = '';
    if (streakInfo && isCorrect && streakInfo.currentStreak > 0) {
      const streakClass = streakInfo.currentStreak >= 5 ? 'streak-hot' : '';
      const multiplierText = streakInfo.multiplier > 1 ? `<span class="multiplier-badge">${streakInfo.multiplier}x</span>` : '';
      streakDisplay = `
        <div class="streak-indicator ${streakClass}">
          <span class="streak-flame">🔥</span>
          <span class="streak-count">${streakInfo.currentStreak} streak!</span>
          ${multiplierText}
        </div>
      `;
    }

    // Highlight buttons
    const buttons = questionArea.querySelectorAll('.answer-option');
    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent.trim() === correctAnswer) {
        btn.classList.add('correct-answer');
      }
    });

    // Show feedback
    const feedbackHtml = `
      <div class="answer-feedback ${feedbackClass}">
        <span class="feedback-text">${feedbackText}</span>
        ${damageIndicator}
        ${streakDisplay}
      </div>
      <button class="art-btn art-btn-gold continue-btn" onclick="LessonSystem.nextQuestion()">
        ${this.currentQuestionIndex < this.questions.length - 1 ? 'Next Question' : 'Finish Lesson'}
      </button>
    `;

    const feedbackContainer = document.createElement('div');
    feedbackContainer.className = 'feedback-container';
    feedbackContainer.innerHTML = feedbackHtml;
    questionArea.appendChild(feedbackContainer);
  },

  /**
   * Move to next question or finish
   */
  nextQuestion() {
    this.currentQuestionIndex++;

    // Update GameState.lessonState for HintManager
    if (typeof GameState !== 'undefined' && GameState.lessonState) {
      GameState.lessonState.currentQuestion = this.currentQuestionIndex;
    }

    if (this.currentQuestionIndex >= this.questions.length) {
      this._finishLesson();
    } else {
      const questionArea = document.getElementById('question-area');
      if (questionArea) {
        questionArea.innerHTML = this._renderQuestion(this.questions[this.currentQuestionIndex]);
      }

      // Update progress
      const progressFill = document.querySelector('.progress-fill');
      const progressText = document.querySelector('.progress-text');
      if (progressFill) {
        progressFill.style.width = `${(this.currentQuestionIndex / this.questions.length) * 100}%`;
      }
      if (progressText) {
        progressText.textContent = `Question ${this.currentQuestionIndex + 1}/${this.questions.length}`;
      }

      // Update hint display for new question
      setTimeout(() => {
        if (typeof updateHintDisplay === 'function') {
          updateHintDisplay();
        }
      }, 50);
    }
  },

  /**
   * Finish the lesson
   */
  _finishLesson() {
    const correctCount = this.answers.filter(a => a.isCorrect).length;
    const totalCount = this.answers.length;
    const successRate = totalCount > 0 ? correctCount / totalCount : 0;
    const passed = successRate >= this.config.passingScore;
    const isPerfect = correctCount === totalCount;

    // Calculate base XP
    let xpEarned = passed ? (correctCount * this.config.xpPerCorrect) + (isPerfect ? this.config.xpPerfectBonus : 0) : 0;

    // Apply streak multiplier to XP if available
    let multiplierApplied = 1;
    if (typeof StreakSystem !== 'undefined' && xpEarned > 0) {
      const multipliedXP = StreakSystem.applyMultiplier(xpEarned);
      multiplierApplied = multipliedXP / xpEarned;
      xpEarned = Math.floor(multipliedXP);
    }

    // Apply Knowledge stat XP bonus
    if (typeof statsManager !== 'undefined' && xpEarned > 0) {
      const knowledgeBonus = statsManager.calculateXpBonus();
      if (knowledgeBonus > 0) {
        const originalXP = xpEarned;
        xpEarned = Math.round(xpEarned * (1 + knowledgeBonus));
        console.log(`[LessonSystem] Knowledge XP bonus: ${originalXP} -> ${xpEarned} (+${Math.round(knowledgeBonus * 100)}%)`);
      }
    }

    // Apply consumable XP multipliers and bonuses
    if (typeof itemManager !== 'undefined' && itemManager.getActiveConsumableBonus && xpEarned > 0) {
      const xpMultiplier = itemManager.getActiveConsumableBonus('xpMultiplier');
      const xpBonus = itemManager.getActiveConsumableBonus('xpBonus');
      if (xpMultiplier > 1 || xpBonus > 0) {
        const originalXP = xpEarned;
        xpEarned = Math.round(xpEarned * xpMultiplier * (1 + xpBonus));
        console.log(`[LessonSystem] Consumable XP bonus applied: ${originalXP} -> ${xpEarned} (${xpMultiplier}x multiplier, +${Math.round(xpBonus * 100)}% bonus)`);
      }
    }

    // End streak tracking and update achievement stats
    if (typeof StreakSystem !== 'undefined') {
      StreakSystem.endLesson(passed, isPerfect);
    }

    console.log('[LessonSystem] Lesson finished:', { correctCount, totalCount, successRate, passed, isPerfect, xpEarned, multiplierApplied });

    // Award lesson XP through XPSystem (quest rewards are handled separately in NPCSystem)
    if (passed && xpEarned > 0) {
      if (typeof XPSystem !== 'undefined') {
        XPSystem.awardXP(xpEarned, 'lesson');
      } else {
        // Fallback if XPSystem not loaded
        GameState.player.xp = (GameState.player.xp || 0) + xpEarned;
        if (typeof renderHUD === 'function') renderHUD();
      }
    }

    // Hide lesson modal
    if (typeof hideModal === 'function') {
      hideModal('lesson-modal');
    }

    // Show completion screen
    if (typeof showLessonCompletionScreen === 'function') {
      showLessonCompletionScreen({
        passed: passed,
        successRate: successRate,
        correctAnswers: correctCount,
        wrongAnswers: totalCount - correctCount,
        totalQuestions: totalCount,
        xpEarned: xpEarned,
        isPerfect: isPerfect,
        questObjective: this.currentLesson.questId
      });
    }

    // Mark quest as ready to turn in (player must return to NPC for rewards)
    const questId = this.currentLesson?.questId;
    if (passed && questId) {
      // Use QuestManager if available
      if (typeof GameState !== 'undefined' && GameState.questManager) {
        // Complete task and vocabulary_lesson objectives
        const quest = GameState.questManager.getQuest(questId);
        if (quest && quest.objectives) {
          for (const obj of quest.objectives) {
            if (obj.type === 'task' || obj.type === 'vocabulary_lesson') {
              GameState.questManager.completeObjective(questId, obj.id);
            }
          }
        }
        console.log('[LessonSystem] Quest objectives completed:', questId);

        // Show notification to return to NPC
        if (typeof showNotification === 'function') {
          showNotification('Return to the quest giver to claim your rewards!', 'info');
        }
      } else {
        // Fallback: mark in simple player state
        if (!GameState.player.readyToTurnIn) {
          GameState.player.readyToTurnIn = [];
        }
        if (!GameState.player.readyToTurnIn.includes(questId)) {
          GameState.player.readyToTurnIn.push(questId);
          // Remove from active
          if (GameState.player.activeQuests) {
            GameState.player.activeQuests = GameState.player.activeQuests.filter(q => q !== questId);
          }
        }
        console.log('[LessonSystem] Quest marked ready to turn in (fallback):', questId);

        if (typeof showNotification === 'function') {
          showNotification('Return to the quest giver to claim your rewards!', 'info');
        }
      }
    }

    // Decrement consumable effect durations at end of lesson
    if (typeof itemManager !== 'undefined' && itemManager.decrementConsumableEffects) {
      itemManager.decrementConsumableEffects();
    }

    // Track words in Leitner spaced repetition system
    if (typeof LeitnerSystem !== 'undefined') {
      this.answers.forEach((answer, index) => {
        const question = this.questions[answer.questionIndex];
        if (question && question.word) {
          // Generate word ID from the foreign word and its translation
          const foreignWord = question.prompt.includes('mean') ? question.word : question.correctAnswer;
          const englishWord = question.prompt.includes('mean') ? question.correctAnswer : question.word;
          const wordId = LeitnerSystem._generateWordId(foreignWord, englishWord);

          // Add word if new, then update based on answer
          LeitnerSystem.addWord(wordId, {
            word: foreignWord,
            translation: englishWord,
            zone: this.currentLesson?.questLocation,
            category: this.currentLesson?.vocabCategory
          });
          LeitnerSystem.updateWord(wordId, answer.isCorrect);
        }
      });
      console.log(`[LessonSystem] Tracked ${this.answers.length} words in Leitner system`);

      // Check for newly unlocked vocabulary mastery upgrades
      if (typeof VocabularyMasterySystem !== 'undefined') {
        const newUnlocks = VocabularyMasterySystem.checkForNewUnlocks();
        if (newUnlocks.length > 0) {
          for (const upgrade of newUnlocks) {
            if (typeof showNotification === 'function') {
              showNotification(`${upgrade.icon} ${upgrade.name} unlocked! ${upgrade.description}`, 'success');
            }
            console.log(`[LessonSystem] Vocabulary Mastery unlocked: ${upgrade.name}`);
          }
        }

        // Check for newly unlocked milestones
        const newMilestones = VocabularyMasterySystem.checkForNewMilestones();
        if (newMilestones.length > 0) {
          for (const milestone of newMilestones) {
            if (typeof showNotification === 'function') {
              showNotification(`${milestone.icon} MILESTONE: ${milestone.name}! ${milestone.description}`, 'success');
            }
            // Award milestone XP bonus
            if (milestone.rewards.xpBonus && typeof XPSystem !== 'undefined') {
              XPSystem.awardXP(milestone.rewards.xpBonus, 'milestone');
              showNotification(`+${milestone.rewards.xpBonus} XP bonus!`, 'info');
            }
            console.log(`[LessonSystem] Milestone unlocked: ${milestone.name}`);
          }
        }
      }
    }

    // Reset state
    this.currentLesson = null;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.answers = [];
  },

  /**
   * Show error message
   */
  _showError(message) {
    if (typeof showNotification === 'function') {
      showNotification(message, 'error');
    } else {
      alert(message);
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
   * Escape HTML
   */
  _escapeHtml(text) {
    if (typeof text !== 'string') return text;
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  /**
   * Escape text for use inside JavaScript string in onclick handlers
   */
  _escapeForJs(text) {
    if (typeof text !== 'string') return text;
    return text
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"');
  },

  /**
   * Abandon the current lesson without completing it
   * Quest remains active so player can try again
   */
  abandonLesson() {
    if (!this.currentLesson) {
      console.log('[LessonSystem] No active lesson to abandon');
      return;
    }

    const questId = this.currentLesson?.questId;
    console.log('[LessonSystem] Abandoning lesson for quest:', questId);

    // Hide the lesson modal
    if (typeof hideModal === 'function') {
      hideModal('lesson-modal');
    }

    // Show notification
    if (typeof showNotification === 'function') {
      showNotification('Lesson abandoned. You can try again from the Quests menu.', 'info');
    }

    // Reset lesson state but keep quest active
    this.currentLesson = null;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.answers = [];
  }
};

// Make globally accessible
window.LessonSystem = LessonSystem;
