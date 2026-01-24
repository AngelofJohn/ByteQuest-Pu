// ByteQuest - Milestone System
// Tracks player progress milestones and rewards

// =====================================================
// Milestone Type Enum
// =====================================================

const MilestoneType = {
  WORDS_MASTERED: 'words_mastered',
  LESSONS_COMPLETED: 'lessons_completed',
  QUESTS_COMPLETED: 'quests_completed',
  ACCURACY: 'accuracy',
  BEST_STREAK: 'best_streak',
  GOLD_EARNED: 'gold_earned',
  REPUTATION: 'reputation'
};

// =====================================================
// Milestone Definitions
// =====================================================

const MILESTONE_DEFINITIONS = {
  [MilestoneType.WORDS_MASTERED]: {
    id: MilestoneType.WORDS_MASTERED,
    name: 'Word Master',
    description: 'Master vocabulary words',
    icon: '📝',
    tiers: [
      { threshold: 25, reward: { stat: 'knowledge', amount: 1, title: 'vocabulary_apprentice' }, label: 'Novice' },
      { threshold: 50, reward: { stat: 'knowledge', amount: 1, title: 'word_collector' }, label: 'Apprentice' },
      { threshold: 100, reward: { stat: 'knowledge', amount: 1, title: 'linguist' }, label: 'Adept' },
      { threshold: 200, reward: { stat: 'knowledge', amount: 1, title: 'polyglot' }, label: 'Expert' }
    ],
    getValue: (state) => {
      if (!state.player.vocabulary) return 0;
      return Object.values(state.player.vocabulary).filter(w => w.level >= 5).length;
    }
  },
  [MilestoneType.LESSONS_COMPLETED]: {
    id: MilestoneType.LESSONS_COMPLETED,
    name: 'Dedicated Student',
    description: 'Complete lessons',
    icon: '🎓',
    tiers: [
      { threshold: 1, reward: { title: 'novice_learner' }, label: 'First Steps' },
      { threshold: 10, reward: { stat: 'knowledge', amount: 1, title: 'dedicated_student' }, label: 'Beginner' },
      { threshold: 25, reward: { stat: 'knowledge', amount: 1, title: 'scholar' }, label: 'Student' },
      { threshold: 50, reward: { stat: 'knowledge', amount: 1, title: 'master_student' }, label: 'Scholar' }
    ],
    getValue: (state) => state.player.lessonsCompleted || 0
  },
  [MilestoneType.QUESTS_COMPLETED]: {
    id: MilestoneType.QUESTS_COMPLETED,
    name: 'Adventurer',
    description: 'Complete quests',
    icon: '📜',
    tiers: [
      { threshold: 5, reward: { stat: 'insight', amount: 1 }, label: 'Errand Runner' },
      { threshold: 15, reward: { stat: 'insight', amount: 1 }, label: 'Adventurer' },
      { threshold: 30, reward: { stat: 'insight', amount: 1 }, label: 'Veteran' },
      { threshold: 50, reward: { stat: 'insight', amount: 1 }, label: 'Legend' }
    ],
    getValue: (state) => state.player.completedQuests?.length || 0
  },
  [MilestoneType.ACCURACY]: {
    id: MilestoneType.ACCURACY,
    name: 'Precise Mind',
    description: 'Achieve high lifetime accuracy',
    icon: '🎯',
    tiers: [
      { threshold: 70, reward: { stat: 'insight', amount: 1 }, label: 'Careful' },
      { threshold: 80, reward: { stat: 'insight', amount: 1 }, label: 'Precise' },
      { threshold: 90, reward: { stat: 'insight', amount: 1 }, label: 'Masterful' }
    ],
    getValue: (state) => {
      const total = (state.player.totalCorrectAnswers || 0) + (state.player.totalWrongAnswers || 0);
      if (total === 0) return 0;
      return Math.round((state.player.totalCorrectAnswers / total) * 100);
    }
  },
  [MilestoneType.BEST_STREAK]: {
    id: MilestoneType.BEST_STREAK,
    name: 'On Fire',
    description: 'Achieve answer streaks',
    icon: '🔥',
    tiers: [
      { threshold: 10, reward: { stat: 'agility', amount: 1, title: 'streak_master' }, label: 'Warm' },
      { threshold: 25, reward: { stat: 'agility', amount: 1 }, label: 'Hot' },
      { threshold: 50, reward: { stat: 'agility', amount: 1 }, label: 'Blazing' }
    ],
    getValue: (state) => state.player.longestStreak || 0
  },
  [MilestoneType.GOLD_EARNED]: {
    id: MilestoneType.GOLD_EARNED,
    name: 'Prosperous',
    description: 'Earn gold throughout your journey',
    icon: '💰',
    tiers: [
      { threshold: 100, reward: { stat: 'luck', amount: 1 }, label: 'Coin Collector' },
      { threshold: 500, reward: { stat: 'luck', amount: 1 }, label: 'Wealthy' },
      { threshold: 1000, reward: { stat: 'luck', amount: 1 }, label: 'Rich' }
    ],
    getValue: (state) => state.player.totalGoldEarned || 0
  },
  [MilestoneType.REPUTATION]: {
    id: MilestoneType.REPUTATION,
    name: 'Renowned',
    description: 'Build reputation with factions',
    icon: '🏛️',
    tiers: [
      { threshold: 2, reward: { stat: 'devotion', amount: 1 }, label: 'Known' },
      { threshold: 3, reward: { stat: 'devotion', amount: 1 }, label: 'Respected' },
      { threshold: 4, reward: { stat: 'devotion', amount: 1 }, label: 'Honored' },
      { threshold: 5, reward: { stat: 'devotion', amount: 1 }, label: 'Exalted' }
    ],
    getValue: (state) => {
      // Returns highest reputation rank achieved with any faction
      const reps = state.player.reputation || {};
      if (Object.keys(reps).length === 0) return 0;
      return Math.max(...Object.values(reps).map(r => Math.floor(r / 100) + 1));
    }
  }
};

// =====================================================
// Milestone Manager Class
// =====================================================

class MilestoneManager {
  constructor(gameState) {
    this.state = gameState;
    this.initialize();
    console.log('[MilestoneManager] Initialized');
  }

  /**
   * Initialize milestone tracking in player state
   */
  initialize() {
    if (!this.state.player.claimedMilestones) {
      this.state.player.claimedMilestones = {};
    }
  }

  /**
   * Get progress for a specific milestone
   * @param {string} milestoneId
   * @returns {object|null} Progress info or null if milestone not found
   */
  getMilestoneProgress(milestoneId) {
    const milestone = MILESTONE_DEFINITIONS[milestoneId];
    if (!milestone) return null;

    const currentValue = milestone.getValue(this.state);
    const claimedTier = this.state.player.claimedMilestones[milestoneId] ?? -1;

    // Find current tier and next tier
    let currentTierIndex = -1;
    let nextTierIndex = -1;

    for (let i = 0; i < milestone.tiers.length; i++) {
      if (currentValue >= milestone.tiers[i].threshold) {
        currentTierIndex = i;
      }
      if (nextTierIndex === -1 && currentValue < milestone.tiers[i].threshold) {
        nextTierIndex = i;
      }
    }

    const nextTier = nextTierIndex >= 0 ? milestone.tiers[nextTierIndex] : null;
    const currentTier = currentTierIndex >= 0 ? milestone.tiers[currentTierIndex] : null;

    return {
      milestone,
      currentValue,
      currentTier,
      currentTierIndex,
      nextTier,
      nextTierIndex,
      claimedTier,
      // Must have reached at least one tier AND have unclaimed tiers
      hasUnclaimedReward: currentTierIndex >= 0 && currentTierIndex > claimedTier,
      isMaxed: currentTierIndex === milestone.tiers.length - 1,
      progressToNext: nextTier
        ? Math.min(100, (currentValue / nextTier.threshold) * 100)
        : 100
    };
  }

  /**
   * Get progress for all milestones
   * @returns {array} Array of progress objects
   */
  getAllMilestoneProgress() {
    return Object.keys(MILESTONE_DEFINITIONS).map(id => this.getMilestoneProgress(id));
  }

  /**
   * Claim reward for a milestone
   * @param {string} milestoneId
   * @returns {array|null} Array of rewards claimed or null if nothing to claim
   */
  claimMilestoneReward(milestoneId) {
    const progress = this.getMilestoneProgress(milestoneId);
    if (!progress || !progress.hasUnclaimedReward) {
      return null;
    }

    // Claim all unclaimed tiers up to current
    const rewards = [];
    for (let i = progress.claimedTier + 1; i <= progress.currentTierIndex; i++) {
      const tier = progress.milestone.tiers[i];

      // Grant stat reward
      if (tier.reward.stat) {
        // Use statsManager if available
        if (typeof statsManager !== 'undefined' && statsManager) {
          statsManager.addBaseStat(tier.reward.stat, tier.reward.amount);
        } else {
          // Fallback: add directly to player stats
          if (!this.state.player.stats) {
            this.state.player.stats = {};
          }
          this.state.player.stats[tier.reward.stat] =
            (this.state.player.stats[tier.reward.stat] || 0) + tier.reward.amount;
        }

        rewards.push({
          type: 'stat',
          stat: tier.reward.stat,
          amount: tier.reward.amount,
          tierLabel: tier.label
        });
      }

      // Grant title reward
      if (tier.reward.title) {
        this._unlockTitle(tier.reward.title);
        rewards.push({
          type: 'title',
          title: tier.reward.title,
          tierLabel: tier.label
        });
      }
    }

    this.state.player.claimedMilestones[milestoneId] = progress.currentTierIndex;

    console.log(`[MilestoneManager] Claimed rewards for ${milestoneId}:`, rewards);
    return rewards;
  }

  /**
   * Unlock a title for the player
   * @param {string} titleId
   */
  _unlockTitle(titleId) {
    // Use titleManager if available (preferred)
    if (typeof titleManager !== 'undefined' && titleManager) {
      titleManager.awardTitle(titleId);
    } else if (typeof statsManager !== 'undefined' && statsManager) {
      statsManager.unlockTitle(titleId);
    } else {
      // Fallback to direct array manipulation
      if (!this.state.player.titles) {
        this.state.player.titles = [];
      }
      if (Array.isArray(this.state.player.titles) && !this.state.player.titles.includes(titleId)) {
        this.state.player.titles.push(titleId);
      }
    }
  }

  /**
   * Check all milestones and return any with unclaimed rewards
   * @returns {array} Array of milestone IDs with unclaimed rewards
   */
  getUnclaimedMilestones() {
    const unclaimed = [];
    for (const milestoneId of Object.keys(MILESTONE_DEFINITIONS)) {
      const progress = this.getMilestoneProgress(milestoneId);
      if (progress && progress.hasUnclaimedReward) {
        unclaimed.push(milestoneId);
      }
    }
    return unclaimed;
  }

  /**
   * Check if any milestones have unclaimed rewards
   * @returns {boolean}
   */
  hasUnclaimedRewards() {
    return this.getUnclaimedMilestones().length > 0;
  }
}

// =====================================================
// Global Functions
// =====================================================

/**
 * Check milestones and notify about unclaimed rewards
 * Called after various game actions
 */
function checkMilestones() {
  if (typeof milestoneManager !== 'undefined' && milestoneManager) {
    const unclaimed = milestoneManager.getUnclaimedMilestones();
    if (unclaimed.length > 0 && typeof showNotification === 'function') {
      showNotification('You have unclaimed milestone rewards!', 'info');
    }
    return unclaimed;
  }
  return [];
}

/**
 * Get milestone definition by ID
 * @param {string} milestoneId
 * @returns {object|undefined}
 */
function getMilestoneDefinition(milestoneId) {
  return MILESTONE_DEFINITIONS[milestoneId];
}

/**
 * Get all milestone definitions
 * @returns {object}
 */
function getAllMilestoneDefinitions() {
  return MILESTONE_DEFINITIONS;
}

// =====================================================
// Global Exports
// =====================================================

window.MilestoneType = MilestoneType;
window.MILESTONE_DEFINITIONS = MILESTONE_DEFINITIONS;
window.MilestoneManager = MilestoneManager;
window.checkMilestones = checkMilestones;
window.getMilestoneDefinition = getMilestoneDefinition;
window.getAllMilestoneDefinitions = getAllMilestoneDefinitions;

console.log('[milestoneSystem.js] Milestone system loaded');
