// ByteQuest - Memory Shrine System
// Gamified spaced repetition with blessings and devotion tiers

// =====================================================
// Blessing Definitions
// =====================================================

const SHRINE_BLESSINGS = {
  insight: {
    id: 'insight',
    name: 'Blessing of Insight',
    icon: '🌟',
    duration: 2 * 60 * 60 * 1000, // 2 hours
    description: '+1 hint charge per lesson',
    flavor: 'The shrine sharpens your mind, revealing hidden patterns in the language.',
    effect: { type: 'hint_bonus', value: 1 },
    unlockTier: 0 // Available from start
  },
  focus: {
    id: 'focus',
    name: 'Blessing of Focus',
    icon: '💪',
    duration: 2 * 60 * 60 * 1000,
    description: '+15% XP from all sources',
    flavor: 'Your dedication to learning intensifies, drawing more wisdom from every experience.',
    effect: { type: 'xp_multiplier', value: 1.15 },
    unlockTier: 0
  },
  retention: {
    id: 'retention',
    name: 'Blessing of Retention',
    icon: '🛡️',
    duration: 6 * 60 * 60 * 1000, // 6 hours
    description: 'Prevents mastery decay from wrong answers',
    flavor: 'The shrine protects your hard-earned knowledge from fading.',
    effect: { type: 'no_decay', value: true },
    unlockTier: 0
  },
  fortune: {
    id: 'fortune',
    name: 'Blessing of Fortune',
    icon: '🪙',
    duration: 2 * 60 * 60 * 1000,
    description: '+25% gold from quests and combat',
    flavor: 'Luck favors the learned. Your efforts bring greater material rewards.',
    effect: { type: 'gold_multiplier', value: 1.25 },
    unlockTier: 0
  },
  discovery: {
    id: 'discovery',
    name: 'Blessing of Discovery',
    icon: '💎',
    duration: 24 * 60 * 60 * 1000, // 24 hours or until triggered
    description: 'Next hotspot or chest gives double loot',
    flavor: 'The ancient spirits guide you to hidden treasures.',
    effect: { type: 'double_loot', value: true, oneTime: true },
    unlockTier: 1 // Unlocks at Apprentice
  },
  swiftness: {
    id: 'swiftness',
    name: 'Blessing of Swiftness',
    icon: '🔥',
    duration: 2 * 60 * 60 * 1000,
    description: 'Lessons have 2 fewer questions',
    flavor: 'Time bends to your will. Learn efficiently without sacrificing mastery.',
    effect: { type: 'question_reduction', value: 2 },
    unlockTier: 2 // Unlocks at Adept
  }
};

// =====================================================
// Devotion Tier Definitions
// =====================================================

const SHRINE_TIERS = [
  {
    tier: 0,
    name: 'Novice',
    icon: '📖',
    sessionsRequired: 0,
    description: 'A newcomer to the Memory Shrine',
    unlocks: [],
    keeperDialogue: 'Welcome, seeker of knowledge. The shrine awaits your devotion.'
  },
  {
    tier: 1,
    name: 'Apprentice',
    icon: '📚',
    sessionsRequired: 5,
    description: 'Your dedication begins to show',
    unlocks: [
      { type: 'blessing', id: 'discovery', name: 'Blessing of Discovery' },
      { type: 'spellbookPage', id: 'memory_techniques', name: 'Memory Techniques' },
      { type: 'stat', stat: 'knowledge', amount: 1 }
    ],
    keeperDialogue: 'You show promise, young scholar. The shrine grants you new wisdom.'
  },
  {
    tier: 2,
    name: 'Adept',
    icon: '🎓',
    sessionsRequired: 15,
    description: 'A skilled practitioner of memory arts',
    unlocks: [
      { type: 'blessing', id: 'swiftness', name: 'Blessing of Swiftness' },
      { type: 'feature', id: 'difficulty_selector', name: 'Review Difficulty Selector' },
      { type: 'stat', stat: 'insight', amount: 1 },
      { type: 'stat', stat: 'knowledge', amount: 1 }
    ],
    keeperDialogue: 'The words come easier to you now. Your mind has been honed.'
  },
  {
    tier: 3,
    name: 'Scholar',
    icon: '🏛️',
    sessionsRequired: 40,
    description: 'A true scholar of the ancient tongues',
    unlocks: [
      { type: 'title', id: 'scholar_of_shrine', name: 'Scholar of the Shrine' },
      { type: 'spellbookPage', id: 'advanced_memory', name: 'Advanced Memory Methods' },
      { type: 'stat', stat: 'knowledge', amount: 2 },
      { type: 'passive', id: 'mastery_xp_bonus', value: 0.1, name: '+10% Mastery XP' }
    ],
    keeperDialogue: 'You have become a true scholar. The shrine honors your dedication.'
  },
  {
    tier: 4,
    name: 'Master',
    icon: '⚡',
    sessionsRequired: 80,
    description: 'A master of memory and retention',
    unlocks: [
      { type: 'feature', id: 'blessing_duration_boost', name: 'Blessing Duration +50%' },
      { type: 'stat', stat: 'insight', amount: 2 },
      { type: 'stat', stat: 'knowledge', amount: 2 },
      { type: 'quest', id: 'ancient_lexicon', name: 'The Ancient Lexicon' }
    ],
    keeperDialogue: 'Few reach such heights. The shrine\'s deepest secrets are revealed to you.'
  },
  {
    tier: 5,
    name: 'Sage',
    icon: '✨',
    sessionsRequired: 150,
    description: 'A legendary sage of the Memory Shrine',
    unlocks: [
      { type: 'title', id: 'sage_of_memory', name: 'Sage of Memory' },
      { type: 'spellbookPage', id: 'first_language_secrets', name: 'Secrets of the First Language' },
      { type: 'stat', stat: 'knowledge', amount: 5 },
      { type: 'stat', stat: 'insight', amount: 5 },
      { type: 'stat', stat: 'devotion', amount: 3 },
      { type: 'feature', id: 'dual_blessings', name: 'Can Have 2 Blessings Active' }
    ],
    keeperDialogue: 'You have mastered the art of memory. The shrine is yours, Sage.'
  }
];

// =====================================================
// Memory Shrine Manager Class
// =====================================================

class MemoryShrineManager {
  constructor(gameState) {
    this.state = gameState;
    this.initializeShrineData();
  }

  // ===================================================
  // Initialization
  // ===================================================

  initializeShrineData() {
    if (!this.state.player.shrineDevotio) {
      this.state.player.shrineDevotio = {
        totalSessions: 0,
        totalWordsReviewed: 0,
        perfectSessions: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastReviewDate: null,
        tier: 0,
        unlockedBlessings: ['insight', 'focus', 'retention', 'fortune'],
        activeBlessings: [],
        unlockedFeatures: [],
        claimedTierRewards: [] // Track which tier rewards have been claimed
      };
    }
  }

  // ===================================================
  // Blessing Management
  // ===================================================

  /**
   * Get all blessings available to the player
   */
  getAvailableBlessings() {
    const currentTier = this.getCurrentTier();
    const available = [];

    for (const [id, blessing] of Object.entries(SHRINE_BLESSINGS)) {
      // Check if blessing is unlocked (either by tier or already in unlocked list)
      const isUnlocked = this.state.player.shrineDevotio.unlockedBlessings.includes(id) ||
                         blessing.unlockTier <= currentTier;

      if (isUnlocked) {
        available.push({
          ...blessing,
          isActive: this.isBlessingActive(id)
        });
      }
    }

    return available;
  }

  /**
   * Check if a specific blessing is currently active
   */
  isBlessingActive(blessingId) {
    const now = Date.now();
    return this.state.player.shrineDevotio.activeBlessings.some(
      b => b.type === blessingId && b.expiresAt > now
    );
  }

  /**
   * Get all currently active blessings
   */
  getActiveBlessings() {
    const now = Date.now();

    // Remove expired blessings
    this.state.player.shrineDevotio.activeBlessings =
      this.state.player.shrineDevotio.activeBlessings.filter(b => b.expiresAt > now);

    return this.state.player.shrineDevotio.activeBlessings.map(activeBlessing => {
      const blessing = SHRINE_BLESSINGS[activeBlessing.type];
      return {
        ...blessing,
        expiresAt: activeBlessing.expiresAt,
        timeRemaining: activeBlessing.expiresAt - now
      };
    });
  }

  /**
   * Activate a blessing
   */
  activateBlessing(blessingId) {
    const blessing = SHRINE_BLESSINGS[blessingId];
    if (!blessing) {
      return { success: false, message: 'Unknown blessing' };
    }

    // Check if player has unlocked this blessing
    const available = this.getAvailableBlessings();
    if (!available.some(b => b.id === blessingId)) {
      return { success: false, message: 'Blessing not yet unlocked' };
    }

    const now = Date.now();
    const expiresAt = now + this.getBlessingDuration(blessing.duration);

    // Check if can have multiple blessings
    const maxBlessings = this.canHaveDualBlessings() ? 2 : 1;

    // Remove existing blessings if at limit
    if (this.state.player.shrineDevotio.activeBlessings.length >= maxBlessings) {
      // Remove oldest blessing
      this.state.player.shrineDevotio.activeBlessings.shift();
    }

    // Add new blessing
    this.state.player.shrineDevotio.activeBlessings.push({
      type: blessingId,
      expiresAt: expiresAt,
      activatedAt: now
    });

    return {
      success: true,
      message: `${blessing.name} activated!`,
      blessing: {
        ...blessing,
        expiresAt,
        timeRemaining: expiresAt - now
      }
    };
  }

  /**
   * Get actual blessing duration (may be modified by tier bonuses)
   */
  getBlessingDuration(baseDuration) {
    // Check if player has blessing duration boost (Tier 4+)
    if (this.hasFeature('blessing_duration_boost')) {
      return Math.floor(baseDuration * 1.5); // +50% duration
    }
    return baseDuration;
  }

  /**
   * Check if player can have dual blessings (Tier 5)
   */
  canHaveDualBlessings() {
    return this.hasFeature('dual_blessings');
  }

  /**
   * Apply blessing effects to a value
   */
  applyBlessingEffects(type, baseValue) {
    const activeBlessings = this.getActiveBlessings();
    let modifiedValue = baseValue;

    for (const blessing of activeBlessings) {
      if (blessing.effect.type === type) {
        switch (type) {
          case 'xp_multiplier':
          case 'gold_multiplier':
            modifiedValue = Math.floor(modifiedValue * blessing.effect.value);
            break;
          case 'hint_bonus':
            modifiedValue += blessing.effect.value;
            break;
          case 'question_reduction':
            modifiedValue = Math.max(4, modifiedValue - blessing.effect.value); // Min 4 questions
            break;
        }
      }
    }

    return modifiedValue;
  }

  /**
   * Check if a blessing effect is active
   */
  hasBlessingEffect(effectType) {
    const activeBlessings = this.getActiveBlessings();
    return activeBlessings.some(b => b.effect.type === effectType);
  }

  /**
   * Consume one-time blessing (like discovery)
   */
  consumeOneTimeBlessing(blessingId) {
    const blessing = SHRINE_BLESSINGS[blessingId];
    if (blessing && blessing.effect.oneTime) {
      this.state.player.shrineDevotio.activeBlessings =
        this.state.player.shrineDevotio.activeBlessings.filter(b => b.type !== blessingId);
      return true;
    }
    return false;
  }

  // ===================================================
  // Devotion Tier Management
  // ===================================================

  /**
   * Get current devotion tier
   */
  getCurrentTier() {
    const sessions = this.state.player.shrineDevotio.totalSessions;

    for (let i = SHRINE_TIERS.length - 1; i >= 0; i--) {
      if (sessions >= SHRINE_TIERS[i].sessionsRequired) {
        return i;
      }
    }
    return 0;
  }

  /**
   * Get tier data
   */
  getTierData(tier) {
    return SHRINE_TIERS[tier] || SHRINE_TIERS[0];
  }

  /**
   * Get next tier data
   */
  getNextTier() {
    const currentTier = this.getCurrentTier();
    if (currentTier < SHRINE_TIERS.length - 1) {
      return SHRINE_TIERS[currentTier + 1];
    }
    return null;
  }

  /**
   * Get progress to next tier
   */
  getProgressToNextTier() {
    const currentTier = this.getCurrentTier();
    const nextTier = this.getNextTier();

    if (!nextTier) {
      return { current: 100, total: 100, percent: 100, isMaxed: true };
    }

    const sessions = this.state.player.shrineDevotio.totalSessions;
    const currentTierSessions = SHRINE_TIERS[currentTier].sessionsRequired;
    const nextTierSessions = nextTier.sessionsRequired;

    const progress = sessions - currentTierSessions;
    const required = nextTierSessions - currentTierSessions;
    const percent = Math.floor((progress / required) * 100);

    return {
      current: sessions,
      total: nextTierSessions,
      progress: progress,
      required: required,
      percent: percent,
      isMaxed: false
    };
  }

  /**
   * Check if player has a specific feature unlocked
   */
  hasFeature(featureId) {
    return this.state.player.shrineDevotio.unlockedFeatures.includes(featureId);
  }

  /**
   * Check and grant tier rewards
   */
  checkTierProgress() {
    const currentTier = this.getCurrentTier();
    const claimedTiers = this.state.player.shrineDevotio.claimedTierRewards || [];
    const newUnlocks = [];

    // Check all tiers up to current that haven't been claimed
    for (let tier = 1; tier <= currentTier; tier++) {
      if (!claimedTiers.includes(tier)) {
        const tierData = SHRINE_TIERS[tier];

        // Grant all unlocks for this tier
        for (const unlock of tierData.unlocks) {
          this.grantUnlock(unlock);
          newUnlocks.push(unlock);
        }

        // Mark tier as claimed
        if (!this.state.player.shrineDevotio.claimedTierRewards) {
          this.state.player.shrineDevotio.claimedTierRewards = [];
        }
        this.state.player.shrineDevotio.claimedTierRewards.push(tier);
      }
    }

    return {
      newTier: currentTier > (this.state.player.shrineDevotio.tier || 0),
      tier: currentTier,
      tierData: SHRINE_TIERS[currentTier],
      unlocks: newUnlocks
    };
  }

  /**
   * Grant a specific unlock
   */
  grantUnlock(unlock) {
    switch (unlock.type) {
      case 'blessing':
        if (!this.state.player.shrineDevotio.unlockedBlessings.includes(unlock.id)) {
          this.state.player.shrineDevotio.unlockedBlessings.push(unlock.id);
        }
        break;

      case 'stat':
        if (typeof statsManager !== 'undefined' && statsManager) {
          statsManager.addBaseStat(unlock.stat, unlock.amount);
        }
        break;

      case 'title':
        if (typeof titleManager !== 'undefined' && titleManager) {
          titleManager.awardTitle(unlock.id);
        }
        break;

      case 'spellbookPage':
        if (typeof unlockSpellbookPages === 'function') {
          unlockSpellbookPages([unlock.id]);
        }
        break;

      case 'feature':
        if (!this.state.player.shrineDevotio.unlockedFeatures.includes(unlock.id)) {
          this.state.player.shrineDevotio.unlockedFeatures.push(unlock.id);
        }
        break;

      case 'passive':
        // Passive bonuses are checked by their presence in unlocked features
        if (!this.state.player.shrineDevotio.unlockedFeatures.includes(unlock.id)) {
          this.state.player.shrineDevotio.unlockedFeatures.push(unlock.id);
        }
        break;

      case 'quest':
        // Quest unlocks would trigger via quest system
        console.log(`[Shrine] Quest unlocked: ${unlock.id}`);
        break;
    }
  }

  /**
   * Get mastery XP multiplier from passive bonuses
   */
  getMasteryXPMultiplier() {
    let multiplier = 1.0;
    if (this.hasFeature('mastery_xp_bonus')) {
      multiplier += 0.1; // +10% from Scholar tier
    }
    return multiplier;
  }

  // ===================================================
  // Review Session Tracking
  // ===================================================

  /**
   * Record a completed review session
   */
  recordReviewSession(results) {
    const { totalWords, correctAnswers, perfectSession, masteryGains } = results;

    // Update session counts
    this.state.player.shrineDevotio.totalSessions++;
    this.state.player.shrineDevotio.totalWordsReviewed += totalWords;

    if (perfectSession) {
      this.state.player.shrineDevotio.perfectSessions++;
    }

    // Update streak
    this.updateStreak();

    // Check for tier progression
    const tierProgress = this.checkTierProgress();

    // Calculate rewards
    const rewards = this.calculateRewards(results);

    return {
      ...rewards,
      tierProgress,
      streakInfo: {
        current: this.state.player.shrineDevotio.currentStreak,
        longest: this.state.player.shrineDevotio.longestStreak
      }
    };
  }

  /**
   * Update daily streak
   */
  updateStreak() {
    const now = Date.now();
    const lastReview = this.state.player.shrineDevotio.lastReviewDate;

    if (!lastReview) {
      // First review ever
      this.state.player.shrineDevotio.currentStreak = 1;
      this.state.player.shrineDevotio.longestStreak = 1;
    } else {
      const daysSinceLastReview = Math.floor((now - lastReview) / (24 * 60 * 60 * 1000));

      if (daysSinceLastReview === 0) {
        // Same day, streak continues (don't increment)
        // This prevents multiple reviews in one day from inflating streak
      } else if (daysSinceLastReview === 1) {
        // Next day, increment streak
        this.state.player.shrineDevotio.currentStreak++;

        // Update longest streak
        if (this.state.player.shrineDevotio.currentStreak > this.state.player.shrineDevotio.longestStreak) {
          this.state.player.shrineDevotio.longestStreak = this.state.player.shrineDevotio.currentStreak;
        }
      } else {
        // Missed a day, reset streak
        this.state.player.shrineDevotio.currentStreak = 1;
      }
    }

    this.state.player.shrineDevotio.lastReviewDate = now;
  }

  /**
   * Calculate rewards for a review session
   */
  calculateRewards(results) {
    const { totalWords, correctAnswers, avgMasteryLevel, masteryGains, perfectSession } = results;

    // Base XP: 75 + (avg mastery * 15)
    let xp = 75 + Math.floor(avgMasteryLevel * 15);

    // Base gold: 30 + (correct answers * 5)
    let gold = 30 + (correctAnswers * 5);

    // Perfect session bonus
    if (perfectSession) {
      xp = Math.floor(xp * 1.5);
      gold = Math.floor(gold * 1.5);
    }

    // Streak bonus (up to +100% XP at streak 4+)
    const streak = this.state.player.shrineDevotio.currentStreak;
    if (streak >= 3) {
      const streakBonus = Math.min(1.0, (streak - 2) * 0.25); // +25% per day, max +100%
      xp = Math.floor(xp * (1 + streakBonus));
    }

    // Mastery level-up bonus
    if (masteryGains > 0) {
      xp += masteryGains * 10;
    }

    return {
      xp,
      gold,
      masteryGains,
      perfectSession,
      streak
    };
  }

  /**
   * Get summary stats for shrine
   */
  getShrineStats() {
    const tier = this.getCurrentTier();
    const tierData = this.getTierData(tier);
    const progress = this.getProgressToNextTier();
    const activeBlessings = this.getActiveBlessings();

    return {
      tier,
      tierData,
      progress,
      totalSessions: this.state.player.shrineDevotio.totalSessions,
      perfectSessions: this.state.player.shrineDevotio.perfectSessions,
      currentStreak: this.state.player.shrineDevotio.currentStreak,
      longestStreak: this.state.player.shrineDevotio.longestStreak,
      activeBlessings,
      availableBlessings: this.getAvailableBlessings()
    };
  }

  /**
   * Check if player has reviews due
   */
  canStartReview() {
    if (typeof LeitnerSystem !== 'undefined') {
      return LeitnerSystem.canReview(4); // Need at least 4 words
    }
    return false;
  }

  /**
   * Get count of due reviews
   */
  getDueReviewCount() {
    if (typeof LeitnerSystem !== 'undefined') {
      return LeitnerSystem.getDueCount();
    }
    return 0;
  }

  /**
   * Get mastery statistics from Leitner system
   */
  getMasteryStats() {
    if (typeof LeitnerSystem !== 'undefined') {
      return LeitnerSystem.getMasteryStats();
    }
    return [0, 0, 0, 0, 0, 0];
  }

  /**
   * Get vocabulary summary for display
   */
  getVocabularySummary() {
    if (typeof LeitnerSystem !== 'undefined') {
      return LeitnerSystem.getStats();
    }
    return {
      totalWords: 0,
      dueForReview: 0,
      masteryPercent: 0,
      breakdown: { new: 0, learning: 0, familiar: 0, practiced: 0, known: 0, mastered: 0, total: 0 }
    };
  }

  // ===================================================
  // Translation Quest Methods
  // ===================================================

  /**
   * Check if player has any ancient texts to translate
   */
  hasAncientTexts() {
    if (typeof VocabularyMasterySystem === 'undefined') return false;
    if (typeof itemManager === 'undefined') return false;

    for (const quest of Object.values(VocabularyMasterySystem.translationQuests)) {
      if (itemManager.hasItem(quest.itemId)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get all ancient texts the player has
   */
  getPlayerAncientTexts() {
    if (typeof VocabularyMasterySystem === 'undefined') return [];
    if (typeof itemManager === 'undefined') return [];

    const texts = [];
    for (const quest of Object.values(VocabularyMasterySystem.translationQuests)) {
      if (itemManager.hasItem(quest.itemId)) {
        const check = VocabularyMasterySystem.canTranslate(quest.id);
        const completed = GameState.player.completedTranslations?.includes(quest.id) || false;

        texts.push({
          ...quest,
          canTranslate: check.canTranslate && !completed,
          completed,
          progress: check.progress || 0,
          needed: quest.wordsRequired,
          reason: check.reason
        });
      }
    }
    return texts;
  }

  /**
   * Attempt to translate an ancient text
   */
  attemptTranslation(questId) {
    if (typeof VocabularyMasterySystem === 'undefined') {
      return { success: false, reason: 'Translation system not available' };
    }
    return VocabularyMasterySystem.translateText(questId);
  }

  /**
   * Get milestone progress for display
   */
  getMilestoneProgress() {
    if (typeof VocabularyMasterySystem === 'undefined') {
      return { milestones: [], next: null, totalMastered: 0 };
    }

    return {
      milestones: VocabularyMasterySystem.getAllMilestones(),
      next: VocabularyMasterySystem.getNextMilestone(),
      totalMastered: VocabularyMasterySystem.getTotalMasteredCount()
    };
  }

  /**
   * Get monument status for display
   */
  getMonumentStatus() {
    if (typeof VocabularyMasterySystem === 'undefined') {
      return { monuments: [], shards: 0, canBuildAny: false };
    }

    const monuments = VocabularyMasterySystem.getAllMonuments();
    const shards = GameState.player.monumentShards || 0;
    const canBuildAny = monuments.some(m => m.canBuild);

    return { monuments, shards, canBuildAny };
  }
}

// =====================================================
// Helper Functions
// =====================================================

/**
 * Format time remaining for blessing
 */
function formatBlessingTime(milliseconds) {
  const minutes = Math.floor(milliseconds / (60 * 1000));
  const hours = Math.floor(milliseconds / (60 * 60 * 1000));
  const days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m`;
  return 'Expires soon';
}

/**
 * Get blessing by ID
 */
function getBlessingData(blessingId) {
  return SHRINE_BLESSINGS[blessingId];
}

/**
 * Get tier by number
 */
function getTierByNumber(tierNum) {
  return SHRINE_TIERS[tierNum];
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SHRINE_BLESSINGS,
    SHRINE_TIERS,
    MemoryShrineManager,
    formatBlessingTime,
    getBlessingData,
    getTierByNumber
  };
}
