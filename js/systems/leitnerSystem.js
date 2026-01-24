/**
 * ByteQuest - Leitner Spaced Repetition System
 * Simple box-based spacing for vocabulary retention
 *
 * Box system:
 *   Box 1: Review daily (new/forgotten words)
 *   Box 2: Review every 2 days
 *   Box 3: Review every 4 days
 *   Box 4: Review every 7 days
 *   Box 5: Review every 14 days (mastered)
 *
 * Correct answer: Move up one box
 * Wrong answer: Back to box 1
 */

const LeitnerSystem = {
  // Review intervals in days for each box (index = box number)
  intervals: [0, 1, 2, 4, 7, 14],

  // Box names for display
  boxNames: ['New', 'Learning', 'Familiar', 'Practiced', 'Known', 'Mastered'],

  /**
   * Initialize vocabulary object if needed
   */
  _ensureVocabulary() {
    if (!GameState.player.vocabulary) {
      GameState.player.vocabulary = {};
    }
  },

  /**
   * Generate a consistent word ID
   */
  _generateWordId(word, translation) {
    // Simple ID from word + translation to avoid duplicates
    return `${word}_${translation}`.toLowerCase().replace(/[^a-z0-9_]/g, '');
  },

  /**
   * Add a word to vocabulary tracking
   * Called when a word is first encountered in a lesson
   *
   * @param {string} wordId - Unique identifier for the word
   * @param {Object} wordData - Word data (word, translation, etc.)
   */
  addWord(wordId, wordData) {
    this._ensureVocabulary();

    // Don't overwrite existing words
    if (GameState.player.vocabulary[wordId]) {
      return false;
    }

    GameState.player.vocabulary[wordId] = {
      word: wordData.word || '',
      translation: wordData.translation || wordData.correctAnswer || '',
      zone: wordData.zone || null,
      category: wordData.category || null,
      box: 1,
      nextReview: Date.now(), // Due immediately for first review
      timesCorrect: 0,
      timesWrong: 0,
      lastSeen: Date.now(),
      dateAdded: Date.now()
    };

    console.log(`[LeitnerSystem] Added word: ${wordId}`);
    return true;
  },

  /**
   * Update a word after a review/answer
   *
   * @param {string} wordId - Word identifier
   * @param {boolean} correct - Whether the answer was correct
   */
  updateWord(wordId, correct) {
    this._ensureVocabulary();

    const word = GameState.player.vocabulary[wordId];
    if (!word) {
      console.warn(`[LeitnerSystem] Word not found: ${wordId}`);
      return null;
    }

    const oldBox = word.box;

    if (correct) {
      // Move up one box (max 5)
      word.box = Math.min(word.box + 1, 5);
      word.timesCorrect++;
    } else {
      // Back to box 1
      word.box = 1;
      word.timesWrong++;
    }

    // Calculate next review date
    const intervalDays = this.intervals[word.box];
    word.nextReview = Date.now() + (intervalDays * 24 * 60 * 60 * 1000);
    word.lastSeen = Date.now();

    console.log(`[LeitnerSystem] Updated ${wordId}: box ${oldBox} -> ${word.box}, next review in ${intervalDays} days`);

    return {
      wordId,
      oldBox,
      newBox: word.box,
      correct,
      nextReviewDays: intervalDays
    };
  },

  /**
   * Get words that are due for review
   *
   * @param {number} limit - Maximum words to return
   * @returns {Array} Array of word objects with their IDs
   */
  getDueWords(limit = 20) {
    this._ensureVocabulary();

    const now = Date.now();
    const dueWords = [];

    for (const [id, word] of Object.entries(GameState.player.vocabulary)) {
      if (word.nextReview <= now) {
        dueWords.push({ id, ...word });
      }
    }

    // Sort by box (lower boxes first - more urgent)
    // Then by next review date (oldest first)
    dueWords.sort((a, b) => {
      if (a.box !== b.box) return a.box - b.box;
      return a.nextReview - b.nextReview;
    });

    return dueWords.slice(0, limit);
  },

  /**
   * Get count of words due for review
   */
  getDueCount() {
    this._ensureVocabulary();

    const now = Date.now();
    let count = 0;

    for (const word of Object.values(GameState.player.vocabulary)) {
      if (word.nextReview <= now) {
        count++;
      }
    }

    return count;
  },

  /**
   * Get total vocabulary count
   */
  getTotalCount() {
    this._ensureVocabulary();
    return Object.keys(GameState.player.vocabulary).length;
  },

  /**
   * Get mastery statistics by box
   * Returns array of counts: [box0, box1, box2, box3, box4, box5]
   */
  getMasteryStats() {
    this._ensureVocabulary();

    const counts = [0, 0, 0, 0, 0, 0];

    for (const word of Object.values(GameState.player.vocabulary)) {
      if (word.box >= 0 && word.box <= 5) {
        counts[word.box]++;
      }
    }

    return counts;
  },

  /**
   * Get mastery breakdown as object (for display)
   */
  getMasteryBreakdown() {
    const stats = this.getMasteryStats();
    return {
      new: stats[0],
      learning: stats[1],
      familiar: stats[2],
      practiced: stats[3],
      known: stats[4],
      mastered: stats[5],
      total: stats.reduce((a, b) => a + b, 0)
    };
  },

  /**
   * Check if enough words are due to start a review session
   *
   * @param {number} minWords - Minimum words needed
   */
  canReview(minWords = 4) {
    return this.getDueCount() >= minWords;
  },

  /**
   * Get a word by ID
   */
  getWord(wordId) {
    this._ensureVocabulary();
    return GameState.player.vocabulary[wordId] || null;
  },

  /**
   * Get accuracy percentage for a word
   */
  getWordAccuracy(wordId) {
    const word = this.getWord(wordId);
    if (!word) return 0;

    const total = word.timesCorrect + word.timesWrong;
    if (total === 0) return 0;

    return Math.round((word.timesCorrect / total) * 100);
  },

  /**
   * Get summary statistics
   */
  getStats() {
    const breakdown = this.getMasteryBreakdown();
    const dueCount = this.getDueCount();

    // Calculate overall mastery percentage
    // Weight: box 1 = 0%, box 2 = 20%, box 3 = 40%, box 4 = 60%, box 5 = 80%, mastered = 100%
    let totalMastery = 0;
    const weights = [0, 0, 0.2, 0.4, 0.6, 0.8, 1.0];
    const stats = this.getMasteryStats();

    for (let i = 1; i <= 5; i++) {
      totalMastery += stats[i] * weights[i];
    }

    const masteryPercent = breakdown.total > 0
      ? Math.round((totalMastery / breakdown.total) * 100)
      : 0;

    return {
      totalWords: breakdown.total,
      dueForReview: dueCount,
      masteryPercent,
      breakdown
    };
  },

  /**
   * Get count of mastered words (Box 4+) for a specific category
   * Used for vocabulary mastery upgrades
   *
   * @param {string} category - The vocabulary category (nature, water, earth, etc.)
   * @param {number} minBox - Minimum box level to count as "mastered" (default 4)
   * @returns {Object} { mastered: count, total: totalInCategory }
   */
  getMasteredCountByCategory(category, minBox = 4) {
    this._ensureVocabulary();

    let mastered = 0;
    let total = 0;

    for (const word of Object.values(GameState.player.vocabulary)) {
      if (word.category === category) {
        total++;
        if (word.box >= minBox) {
          mastered++;
        }
      }
    }

    return { mastered, total };
  },

  /**
   * Get mastery counts for all categories
   * Returns object with category -> { mastered, total }
   */
  getAllCategoryMastery(minBox = 4) {
    this._ensureVocabulary();

    const categories = {};

    for (const word of Object.values(GameState.player.vocabulary)) {
      if (!word.category) continue;

      if (!categories[word.category]) {
        categories[word.category] = { mastered: 0, total: 0 };
      }

      categories[word.category].total++;
      if (word.box >= minBox) {
        categories[word.category].mastered++;
      }
    }

    return categories;
  }
};

// Make available globally
if (typeof window !== 'undefined') {
  window.LeitnerSystem = LeitnerSystem;
}
