// ByteQuest - Hint System
// Manages hint charges and hint display during lessons

// =====================================================
// HintManager Class
// =====================================================

class HintManager {
  constructor(gameState, statsManager, itemManager) {
    this.state = gameState;
    this.statsManager = statsManager;
    this.itemManager = itemManager;

    // Track current lesson hint state
    this.currentHintRevealed = false;
    this.currentHintText = null;
  }

  // ===================================================
  // Hint Charge Calculation
  // ===================================================

  /**
   * Calculate total hint charges available for a lesson
   * Sources: Insight stat + consumable bonuses
   */
  calculateHintCharges() {
    let charges = 0;

    // Base charges from Insight stat
    if (this.statsManager) {
      charges += this.statsManager.calculateHintCharges();
    }

    // Bonus charges from consumables (scroll_of_insight, etc.)
    if (this.itemManager) {
      const consumableBonus = this.itemManager.getActiveConsumableBonus('hintCharges');
      charges += consumableBonus;
    }

    return charges;
  }

  /**
   * Get hint tier (determines hint quality)
   * Tier 0: Basic hints (first letter)
   * Tier 1: Better hints (first few letters, category)
   * Tier 2: Full hints (multiple letters, mnemonic)
   */
  getHintTier() {
    if (this.statsManager) {
      return this.statsManager.calculateHintTier();
    }
    return 0;
  }

  /**
   * Initialize hints for a new lesson
   * Returns the hint info to store in lessonState
   */
  initializeForLesson() {
    const charges = this.calculateHintCharges();
    this.currentHintRevealed = false;
    this.currentHintText = null;

    return {
      charges: charges,
      maxCharges: charges,
      used: 0
    };
  }

  /**
   * Initialize hints for boss exam (reduced or none)
   * @param {number} multiplier - 0 to 1, where 0 = no hints, 1 = full hints
   */
  initializeForBossExam(multiplier = 0.5) {
    const baseCharges = this.calculateHintCharges();
    const examCharges = Math.floor(baseCharges * multiplier);
    this.currentHintRevealed = false;
    this.currentHintText = null;

    return {
      charges: examCharges,
      maxCharges: examCharges,
      used: 0
    };
  }

  // ===================================================
  // Hint Generation
  // ===================================================

  /**
   * Generate a hint for a vocabulary word
   * @param {object} wordData - The vocabulary word data
   * @param {string} correctAnswer - The correct answer text
   * @param {string} questionType - 'to_english' or 'to_target'
   */
  generateHint(wordData, correctAnswer, questionType) {
    const tier = this.getHintTier();

    // If word has explicit hint, use it (modified by tier)
    if (wordData?.hint) {
      return this._formatExplicitHint(wordData.hint, tier);
    }

    // Generate hint based on answer
    return this._generateAutoHint(correctAnswer, wordData, questionType, tier);
  }

  /**
   * Format an explicit hint based on tier
   */
  _formatExplicitHint(hint, tier) {
    // At tier 0, truncate long hints
    if (tier === 0 && hint.length > 30) {
      return hint.substring(0, 30) + '...';
    }
    // At tier 1+, show full hint
    return hint;
  }

  /**
   * Generate automatic hint based on word/answer
   * Now with 100% more snark!
   */
  _generateAutoHint(answer, wordData, questionType, tier) {
    if (!answer) return this._getSnark('empty');

    // Pick a snarky opener
    const opener = this._getSnark('opener');

    const hints = [];

    // Tier 0: Basic - first letter only
    if (tier >= 0) {
      const firstLetter = answer.charAt(0).toUpperCase();
      hints.push(`It starts with "${firstLetter}". Revolutionary, I know.`);
    }

    // Tier 1: Better - word length + more letters
    if (tier >= 1) {
      hints.push(`${answer.length} letters long`);
      if (answer.length > 3) {
        hints.push(`begins with "${answer.substring(0, 2)}..."`);
      }
    }

    // Tier 2: Full - category, gender, more context
    if (tier >= 2) {
      if (wordData?.category) {
        const categoryHints = {
          basics: "It's basic vocab. Like, really basic.",
          family: "Something about family. No drama, hopefully.",
          food: "Food-related. Now I'm hungry.",
          numbers: "It's a number. Math is involved. Sorry.",
          colors: "A color! Use your imagination.",
          places: "A place. Somewhere you might go. Or not.",
          actions: "It's a verb. Things are happening!",
          adjectives: "It describes stuff. Very descriptive of me to say.",
          time: "Time-related. Tick tock.",
          nature: "Something from nature. Trees are involved, probably.",
          creatures: "A creature. Hopefully not the bitey kind.",
          body: "Body part. Keep it classy.",
          clothing: "Something you wear. Fashion advice not included.",
          commerce: "Money stuff. Capitalism, am I right?",
          travel: "Travel-related. Adventure awaits!",
          weather: "Weather talk. Very British of you.",
          emotions: "It's a feeling. *plays tiny violin*",
          culture: "Cultural term. How sophisticated."
        };
        hints.push(categoryHints[wordData.category] || `Category: ${wordData.category}`);
      }

      // Add gender hint for to_target questions
      if (questionType === 'to_target' && wordData?.gender) {
        const genderSnark = {
          'm': "It's masculine. Very manly word.",
          'f': "It's feminine. Fancy that.",
          'n': "It's neuter. Switzerland of genders.",
          'de': "It uses 'de'. The common one.",
          'het': "It uses 'het'. The special one."
        };
        hints.push(genderSnark[wordData.gender] || `Gender: ${wordData.gender}`);
      }
    }

    // Combine hints based on tier with snarky connectors
    if (tier === 0) {
      return hints[0] || this._getSnark('fallback');
    } else if (tier === 1) {
      return hints.slice(0, 2).join(' Also, ');
    } else {
      return hints.join(' Oh, and ');
    }
  }

  /**
   * Get a snarky message by type
   */
  _getSnark(type) {
    const snarks = {
      empty: [
        "I've got nothing. You're on your own, champ.",
        "My crystal ball is foggy today.",
        "The hint elves are on strike.",
        "*shrugs in ancient wisdom*"
      ],
      fallback: [
        "Just... think harder?",
        "The answer is definitely one of the options.",
        "Have you tried not guessing wrong?",
        "Believe in yourself! (That's all I've got.)"
      ],
      noCharges: [
        "Fresh out of hints. Should've bought more scrolls!",
        "Hint budget: depleted. Wisdom: also depleted.",
        "The hint well has run dry.",
        "No hints left. Time to use that brain of yours."
      ],
      alreadyRevealed: [
        "I already told you! Pay attention!",
        "Scroll up. The hint is right there.",
        "Memory issues? The hint hasn't changed.",
        "Still the same hint. Magic, right?"
      ]
    };

    const messages = snarks[type] || snarks.fallback;
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // ===================================================
  // Hint Usage
  // ===================================================

  /**
   * Check if hints are available in current lesson
   */
  canUseHint() {
    const lessonState = this.state.lessonState;
    if (!lessonState) return { canUse: false, reason: 'No active lesson' };

    // Check if already revealed for this question
    if (this.currentHintRevealed) {
      return { canUse: false, reason: 'Hint already revealed', alreadyRevealed: true };
    }

    // Check charges
    const charges = lessonState.hintCharges || 0;
    if (charges <= 0) {
      return { canUse: false, reason: 'No hint charges remaining' };
    }

    return { canUse: true, charges };
  }

  /**
   * Use a hint for the current question
   * Returns the hint text or null if can't use
   */
  useHint() {
    const canUse = this.canUseHint();
    if (!canUse.canUse) {
      // If already revealed, return the existing hint
      if (canUse.alreadyRevealed && this.currentHintText) {
        return { success: true, hint: this.currentHintText, alreadyRevealed: true };
      }
      return { success: false, reason: canUse.reason };
    }

    const lessonState = this.state.lessonState;
    const currentQuestion = lessonState.questions?.[lessonState.currentQuestion];

    if (!currentQuestion) {
      return { success: false, reason: 'No current question' };
    }

    // Generate hint
    const hint = this.generateHint(
      currentQuestion.wordData,
      currentQuestion.correctAnswer,
      currentQuestion.type
    );

    // Deduct charge
    lessonState.hintCharges--;
    if (lessonState.hintsUsed === undefined) {
      lessonState.hintsUsed = 0;
    }
    lessonState.hintsUsed++;

    // Mark as revealed
    this.currentHintRevealed = true;
    this.currentHintText = hint;

    console.log(`[HintManager] Hint used. Remaining: ${lessonState.hintCharges}`);

    return { success: true, hint, chargesRemaining: lessonState.hintCharges };
  }

  /**
   * Reset hint state for new question
   */
  resetForQuestion() {
    this.currentHintRevealed = false;
    this.currentHintText = null;
  }

  // ===================================================
  // UI Helpers
  // ===================================================

  /**
   * Get hint display info for UI
   */
  getHintDisplayInfo() {
    const lessonState = this.state.lessonState;

    if (!lessonState) {
      return {
        state: 'no-lesson',
        charges: 0,
        maxCharges: 0,
        text: 'No active lesson',
        canUse: false
      };
    }

    const charges = lessonState.hintCharges || 0;
    const maxCharges = lessonState.maxHintCharges || 0;

    // Already revealed
    if (this.currentHintRevealed && this.currentHintText) {
      return {
        state: 'revealed',
        charges,
        maxCharges,
        text: this.currentHintText,
        canUse: false
      };
    }

    // No charges
    if (charges <= 0) {
      return {
        state: 'no-charges',
        charges: 0,
        maxCharges,
        text: 'No hints available',
        canUse: false
      };
    }

    // Available
    return {
      state: 'available',
      charges,
      maxCharges,
      text: `Click for hint (${charges}/${maxCharges})`,
      canUse: true
    };
  }

  /**
   * Get CSS class for hint box based on state
   */
  getHintBoxClass() {
    const info = this.getHintDisplayInfo();

    switch (info.state) {
      case 'revealed':
        return 'hint-revealed-state';
      case 'no-charges':
        return 'hint-no-charges-state';
      case 'available':
        return 'hint-available';
      default:
        return 'hint-locked-state';
    }
  }
}

// =====================================================
// Global Hint Functions (for UI)
// =====================================================

/**
 * Handle hint box click
 */
function onHintClick() {
  if (typeof hintManager === 'undefined' || !hintManager) {
    console.warn('[Hint] HintManager not initialized');
    return;
  }

  const result = hintManager.useHint();

  if (result.success) {
    updateHintDisplay();

    // Show tutorial on first hint use
    if (typeof shouldShowTutorial === 'function' && shouldShowTutorial('useHint')) {
      if (typeof markTutorialComplete === 'function') {
        markTutorialComplete('useHint');
      }
    }
  } else if (!result.alreadyRevealed) {
    // Show message why hint can't be used
    if (typeof showNotification === 'function') {
      showNotification(result.reason, 'warning');
    }
  }
}

/**
 * Update hint display in lesson UI
 */
function updateHintDisplay() {
  const hintBox = document.querySelector('.hint-box');
  if (!hintBox) return;

  // Check showHints setting
  const settings = typeof GameState !== 'undefined' ? GameState.settings : null;
  if (settings?.showHints === 'never') {
    hintBox.style.display = 'none';
    return;
  }

  hintBox.style.display = 'flex';

  if (typeof hintManager === 'undefined' || !hintManager) {
    hintBox.innerHTML = '<span class="hint-text">💡 Hints unavailable</span>';
    hintBox.className = 'hint-box hint-locked-state';
    return;
  }

  const info = hintManager.getHintDisplayInfo();
  const boxClass = hintManager.getHintBoxClass();

  // Build hint box content with snarky messages
  let content = '';

  // Snarky messages for each state
  const availableMessages = [
    "Need help? Click me. No judgment. (Much.)",
    "Stuck? I might know something...",
    "Click for wisdom. Or at least a hint.",
    "The hint gremlin awaits your click.",
    "Dare to ask for help?"
  ];
  const noChargeMessages = [
    "All out of hints! Buy more scrolls, cheapskate.",
    "Hint budget: exhausted. Like my patience.",
    "The well of wisdom has run dry.",
    "Zero hints. Time to actually learn!"
  ];

  if (info.state === 'revealed') {
    content = `
      <span class="hint-icon">💡</span>
      <span class="hint-text">${info.text}</span>
    `;
  } else if (info.state === 'no-charges') {
    const msg = noChargeMessages[Math.floor(Math.random() * noChargeMessages.length)];
    content = `
      <span class="hint-icon">💡</span>
      <span class="hint-text">${msg}</span>
      <span class="hint-charges">(0/${info.maxCharges})</span>
    `;
  } else if (info.state === 'available') {
    const msg = availableMessages[Math.floor(Math.random() * availableMessages.length)];
    content = `
      <span class="hint-icon">💡</span>
      <span class="hint-text">${msg}</span>
      <span class="hint-charges">(${info.charges}/${info.maxCharges})</span>
    `;
  } else {
    content = `
      <span class="hint-icon">💡</span>
      <span class="hint-text">Hints locked</span>
    `;
  }

  hintBox.innerHTML = content;
  hintBox.className = `hint-box ${boxClass}`;

  // Make clickable if available
  if (info.canUse) {
    hintBox.style.cursor = 'pointer';
    hintBox.onclick = onHintClick;
  } else if (info.state === 'revealed') {
    hintBox.style.cursor = 'default';
    hintBox.onclick = null;
  } else {
    hintBox.style.cursor = 'not-allowed';
    hintBox.onclick = null;
  }

  // Auto-show hint if setting enabled and available
  if (settings?.hintAutoShow === true && info.canUse) {
    onHintClick();
  }
}

/**
 * Reset hint for new question
 */
function resetHintForQuestion() {
  if (typeof hintManager !== 'undefined' && hintManager) {
    hintManager.resetForQuestion();
  }
  updateHintDisplay();
}

// =====================================================
// Export
// =====================================================

// Global exports
window.HintManager = HintManager;
window.onHintClick = onHintClick;
window.updateHintDisplay = updateHintDisplay;
window.resetHintForQuestion = resetHintForQuestion;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    HintManager,
    onHintClick,
    updateHintDisplay,
    resetHintForQuestion
  };
}

console.log('[hintSystem.js] Hint system loaded');
