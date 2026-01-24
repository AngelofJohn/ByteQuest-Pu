// ByteQuest - Streak System
// Tracks answer streaks and multipliers for lessons

const StreakSystem = {
  // Current session state
  currentStreak: 0,
  maxStreakThisSession: 0,
  multiplier: 1,

  // Multiplier thresholds
  multiplierThresholds: {
    3: 1.5,   // 3 streak = 1.5x
    5: 2.0,   // 5 streak = 2x
    10: 2.5,  // 10 streak = 2.5x
    15: 3.0,  // 15 streak = 3x
    20: 4.0   // 20 streak = 4x (max)
  },

  /**
   * Initialize streak tracking for a new lesson
   */
  startLesson() {
    this.currentStreak = 0;
    this.maxStreakThisSession = 0;
    this.multiplier = 1;
    console.log('[StreakSystem] Lesson started, streak reset');
  },

  /**
   * Record a correct answer
   * @returns {object} Streak info including multiplier changes
   */
  recordCorrect() {
    this.currentStreak++;

    // Track max streak this session
    if (this.currentStreak > this.maxStreakThisSession) {
      this.maxStreakThisSession = this.currentStreak;
    }

    // Update global longest streak if this is a new record
    this._updateGlobalLongestStreak();

    // Calculate new multiplier
    const oldMultiplier = this.multiplier;
    this.multiplier = this._calculateMultiplier();
    const multiplierIncreased = this.multiplier > oldMultiplier;

    console.log(`[StreakSystem] Correct! Streak: ${this.currentStreak}, Multiplier: ${this.multiplier}x`);

    return {
      currentStreak: this.currentStreak,
      multiplier: this.multiplier,
      multiplierIncreased,
      isNewRecord: this.currentStreak === GameState.player.longestStreak
    };
  },

  /**
   * Record an incorrect answer
   * @returns {object} Streak info after reset
   */
  recordIncorrect() {
    const lostStreak = this.currentStreak;
    this.currentStreak = 0;
    this.multiplier = 1;

    // Track total wrong answers for achievements
    this._incrementWrongAnswers();

    console.log(`[StreakSystem] Incorrect! Lost streak of ${lostStreak}`);

    return {
      currentStreak: 0,
      multiplier: 1,
      lostStreak,
      multiplierLost: lostStreak >= 3
    };
  },

  /**
   * Calculate multiplier based on current streak
   * @returns {number} Current multiplier value
   */
  _calculateMultiplier() {
    let mult = 1;
    for (const [threshold, value] of Object.entries(this.multiplierThresholds)) {
      if (this.currentStreak >= parseInt(threshold)) {
        mult = value;
      }
    }
    return mult;
  },

  /**
   * Update global longest streak in player state
   */
  _updateGlobalLongestStreak() {
    if (!GameState.player.longestStreak) {
      GameState.player.longestStreak = 0;
    }

    if (this.currentStreak > GameState.player.longestStreak) {
      GameState.player.longestStreak = this.currentStreak;
      console.log(`[StreakSystem] New longest streak record: ${this.currentStreak}`);
    }
  },

  /**
   * Increment total wrong answers counter
   */
  _incrementWrongAnswers() {
    if (!GameState.player.totalWrongAnswers) {
      GameState.player.totalWrongAnswers = 0;
    }
    GameState.player.totalWrongAnswers++;
  },

  /**
   * End lesson and finalize stats
   * @param {boolean} passed - Whether the lesson was passed
   * @param {boolean} isPerfect - Whether the lesson had 100% accuracy
   * @returns {object} Final lesson stats
   */
  endLesson(passed, isPerfect) {
    // Track lessons completed
    if (passed) {
      if (!GameState.player.lessonsCompleted) {
        GameState.player.lessonsCompleted = 0;
      }
      GameState.player.lessonsCompleted++;
      console.log(`[StreakSystem] Lessons completed: ${GameState.player.lessonsCompleted}`);
    }

    // Track perfect lessons
    if (isPerfect) {
      if (!GameState.player.perfectLessons) {
        GameState.player.perfectLessons = 0;
      }
      GameState.player.perfectLessons++;
      console.log(`[StreakSystem] Perfect lessons: ${GameState.player.perfectLessons}`);
    }

    // Check time-based achievements
    this._checkTimeBasedAchievements();

    // Check achievements after updating stats
    if (typeof checkAchievements === 'function') {
      checkAchievements();
    }

    const result = {
      maxStreak: this.maxStreakThisSession,
      globalLongestStreak: GameState.player.longestStreak,
      lessonsCompleted: GameState.player.lessonsCompleted,
      perfectLessons: GameState.player.perfectLessons
    };

    // Reset session state
    this.currentStreak = 0;
    this.maxStreakThisSession = 0;
    this.multiplier = 1;

    return result;
  },

  /**
   * Check and set time-based achievement flags
   */
  _checkTimeBasedAchievements() {
    const now = new Date();
    const hour = now.getHours();

    // Night Owl: Study after midnight (00:00 - 04:00)
    if (hour >= 0 && hour < 4) {
      GameState.player.studiedAfterMidnight = true;
      console.log('[StreakSystem] Night Owl flag set');
    }

    // Early Bird: Study before 6 AM (04:00 - 06:00)
    if (hour >= 4 && hour < 6) {
      GameState.player.studiedBeforeSix = true;
      console.log('[StreakSystem] Early Bird flag set');
    }
  },

  /**
   * Get current streak info for UI display
   * @returns {object} Current streak state
   */
  getStreakInfo() {
    // Calculate progress to next multiplier
    let nextThreshold = null;
    let progressToNext = 0;

    const thresholds = Object.keys(this.multiplierThresholds)
      .map(Number)
      .sort((a, b) => a - b);

    for (const threshold of thresholds) {
      if (this.currentStreak < threshold) {
        nextThreshold = threshold;
        const prevThreshold = thresholds[thresholds.indexOf(threshold) - 1] || 0;
        progressToNext = (this.currentStreak - prevThreshold) / (threshold - prevThreshold);
        break;
      }
    }

    return {
      current: this.currentStreak,
      max: this.maxStreakThisSession,
      globalMax: GameState.player?.longestStreak || 0,
      multiplier: this.multiplier,
      nextThreshold,
      progressToNext
    };
  },

  /**
   * Apply multiplier to XP value
   * @param {number} baseXP - Base XP amount
   * @returns {number} XP with multiplier applied
   */
  applyMultiplier(baseXP) {
    return Math.floor(baseXP * this.multiplier);
  }
};

// =====================================================
// Global Exports
// =====================================================

window.StreakSystem = StreakSystem;

console.log('[streakSystem.js] Streak system loaded');
