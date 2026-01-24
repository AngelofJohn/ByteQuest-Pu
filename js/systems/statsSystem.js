// ByteQuest - Stats System
// NOTE: Milestones moved to milestoneSystem.js
// NOTE: Achievements moved to achievementSystem.js

// =====================================================
// Stat Definitions
// =====================================================

const StatType = {
  // Major Stats
  STAMINA: 'stamina',
  STRENGTH: 'strength',
  AGILITY: 'agility',
  INSIGHT: 'insight',
  // Minor Stats
  LUCK: 'luck',
  DEVOTION: 'devotion',
  KNOWLEDGE: 'knowledge'
};

const STAT_DEFINITIONS = {
  // Major Stats
  [StatType.STAMINA]: {
    id: StatType.STAMINA,
    name: 'Stamina',
    type: 'major',
    icon: '❤️',
    description: '+5 Max HP per point. Lets you endure more mistakes.',
    color: '#e63946',
    active: true,
    effect: {
      type: 'maxHp',
      perPoint: 5
    }
  },
  [StatType.STRENGTH]: {
    id: StatType.STRENGTH,
    name: 'Strength',
    type: 'major',
    icon: '⚔️',
    description: 'Reduces HP lost on wrong answers. Base 10, -0.5 per point (min 5).',
    color: '#e76f51',
    active: true,
    effect: {
      type: 'damageReduction',
      perPoint: 0.5,
      baseDamage: 10,
      minDamage: 5
    }
  },
  [StatType.AGILITY]: {
    id: StatType.AGILITY,
    name: 'Agility',
    type: 'major',
    icon: '💨',
    description: 'Protects streaks. At 5+, one wrong answer per lesson won\'t break your streak.',
    color: '#4cc9f0',
    active: true,
    effect: {
      type: 'streakProtection',
      threshold: 5,
      protections: 1
    }
  },
  [StatType.INSIGHT]: {
    id: StatType.INSIGHT,
    name: 'Insight',
    type: 'major',
    icon: '👁️',
    description: '+1 hint charge per 3 points. Improves hint quality.',
    color: '#f4a261',
    active: true,
    effect: {
      type: 'hintCharges',
      pointsPerCharge: 3
    }
  },
  // Minor Stats
  [StatType.LUCK]: {
    id: StatType.LUCK,
    name: 'Luck',
    type: 'minor',
    icon: '🍀',
    description: '2% chance per point to avoid HP loss. Better shop prices.',
    color: '#2a9d8f',
    active: true,
    effect: {
      type: 'avoidDamage',
      chancePerPoint: 0.02,
      shopDiscount: 0.01
    }
  },
  [StatType.DEVOTION]: {
    id: StatType.DEVOTION,
    name: 'Devotion',
    type: 'minor',
    icon: '✨',
    description: '+5% reputation gain per point with all factions.',
    color: '#ffd700',
    active: true,
    effect: {
      type: 'reputationBonus',
      perPoint: 0.05
    }
  },
  [StatType.KNOWLEDGE]: {
    id: StatType.KNOWLEDGE,
    name: 'Knowledge',
    type: 'minor',
    icon: '📖',
    description: 'Words stay mastered longer. Reduces review frequency.',
    color: '#90be6d',
    active: true,
    effect: {
      type: 'masteryRetention',
      decayReduction: 0.1
    }
  }
};

// Starting stat values (placeholder - to be balanced later)
const STARTING_STATS = {
  [StatType.STAMINA]: 5,
  [StatType.STRENGTH]: 5,
  [StatType.AGILITY]: 5,
  [StatType.INSIGHT]: 5,
  [StatType.LUCK]: 3,
  [StatType.DEVOTION]: 3,
  [StatType.KNOWLEDGE]: 3
};

// Stat gains per level (automatic assignment)
// Rotates through major stats each level
const LEVEL_UP_STAT_ORDER = [
  StatType.STAMINA,
  StatType.INSIGHT,
  StatType.AGILITY,
  StatType.STRENGTH
];

// =====================================================
// Stats Manager Class
// NOTE: Achievement system moved to achievementSystem.js
// NOTE: Milestone system moved to milestoneSystem.js
// =====================================================

class StatsManager {
  constructor(gameState) {
    this.state = gameState;
    this.initializeStats();
  }

  // ===================================================
  // Initialization
  // ===================================================

  initializeStats() {
    if (!this.state.player.stats) {
      this.state.player.stats = { ...STARTING_STATS };
    }
    if (!this.state.player.bonusStats) {
      this.state.player.bonusStats = {}; // From gear
    }
    if (!this.state.player.unlockedAchievements) {
      this.state.player.unlockedAchievements = [];
    }
    if (!this.state.player.claimedMilestones) {
      this.state.player.claimedMilestones = {}; // { milestoneId: tierIndex }
    }
    if (!this.state.player.titles) {
      this.state.player.titles = [];
    }
    if (!this.state.player.activeTitle) {
      this.state.player.activeTitle = null;
    }
  }

  // ===================================================
  // Stat Getters
  // ===================================================

  getBaseStat(statId) {
    return this.state.player.stats[statId] || 0;
  }

  getBonusStat(statId) {
    return this.state.player.bonusStats[statId] || 0;
  }

  getTotalStat(statId) {
    return this.getBaseStat(statId) + this.getBonusStat(statId);
  }

  getAllStats() {
    const stats = {};
    for (const statId of Object.values(StatType)) {
      stats[statId] = {
        base: this.getBaseStat(statId),
        bonus: this.getBonusStat(statId),
        total: this.getTotalStat(statId),
        definition: STAT_DEFINITIONS[statId]
      };
    }
    return stats;
  }

  getMajorStats() {
    return Object.values(StatType)
      .filter(id => STAT_DEFINITIONS[id].type === 'major')
      .map(id => ({
        id,
        ...this.getAllStats()[id]
      }));
  }

  getMinorStats() {
    return Object.values(StatType)
      .filter(id => STAT_DEFINITIONS[id].type === 'minor')
      .map(id => ({
        id,
        ...this.getAllStats()[id]
      }));
  }

  // ===================================================
  // Stat Modification
  // ===================================================

  addBaseStat(statId, amount) {
    if (!this.state.player.stats[statId]) {
      this.state.player.stats[statId] = 0;
    }
    this.state.player.stats[statId] += amount;
    return this.state.player.stats[statId];
  }

  setBonusStats(bonusStats) {
    // Called when equipment changes
    this.state.player.bonusStats = bonusStats;
  }

  // ===================================================
  // Level Up
  // ===================================================

  handleLevelUp(newLevel) {
    // Automatic stat assignment based on level
    const statIndex = (newLevel - 1) % LEVEL_UP_STAT_ORDER.length;
    const statToIncrease = LEVEL_UP_STAT_ORDER[statIndex];
    this.addBaseStat(statToIncrease, 1);
    
    return {
      stat: statToIncrease,
      statName: STAT_DEFINITIONS[statToIncrease].name,
      newValue: this.getBaseStat(statToIncrease)
    };
  }

  // ===================================================
  // Milestones - DELEGATED TO milestoneSystem.js
  // These methods delegate to milestoneManager for backward compatibility
  // ===================================================

  getMilestoneProgress(milestoneId) {
    if (typeof milestoneManager !== 'undefined' && milestoneManager) {
      return milestoneManager.getMilestoneProgress(milestoneId);
    }
    console.warn('[StatsManager] milestoneManager not available');
    return null;
  }

  getAllMilestoneProgress() {
    if (typeof milestoneManager !== 'undefined' && milestoneManager) {
      return milestoneManager.getAllMilestoneProgress();
    }
    console.warn('[StatsManager] milestoneManager not available');
    return [];
  }

  claimMilestoneReward(milestoneId) {
    if (typeof milestoneManager !== 'undefined' && milestoneManager) {
      return milestoneManager.claimMilestoneReward(milestoneId);
    }
    console.warn('[StatsManager] milestoneManager not available');
    return null;
  }

  // ===================================================
  // Achievements - MOVED TO achievementSystem.js
  // Use achievementManager for achievement operations
  // ===================================================

  // ===================================================
  // Titles
  // ===================================================

  unlockTitle(titleId) {
    // Use titleManager if available (preferred method)
    if (typeof titleManager !== 'undefined' && titleManager) {
      titleManager.awardTitle(titleId);
    } else {
      // Fallback to legacy array (for backwards compatibility)
      if (!this.state.player.titles) {
        this.state.player.titles = [];
      }
      // Ensure titles is an array before using includes
      if (Array.isArray(this.state.player.titles) && !this.state.player.titles.includes(titleId)) {
        this.state.player.titles.push(titleId);
      }
    }
  }

  setActiveTitle(title) {
    // Ensure titles is an array before using includes
    const titles = Array.isArray(this.state.player.titles) ? this.state.player.titles : [];
    if (titles.includes(title) || title === null) {
      this.state.player.activeTitle = title;
    }
  }

  getActiveTitle() {
    return this.state.player.activeTitle;
  }

  getAllTitles() {
    return Array.isArray(this.state.player.titles) ? this.state.player.titles : [];
  }

  // ===================================================
  // Stat Effects (Phase 1 Active Stats)
  // ===================================================

  /**
   * Calculate max HP based on Stamina
   * Base 50 + (Stamina * 3) + level bonus
   */
  calculateMaxHp() {
    const stamina = this.getTotalStat(StatType.STAMINA);
    const baseHp = 50; // Reduced from 100 to make HP feel meaningful
    const staminaBonus = stamina * 3; // Reduced from 5 to 3 per stamina
    const levelBonus = (this.state.player.level - 1) * 2;
    return baseHp + staminaBonus + levelBonus;
  }

  /**
   * Calculate damage taken on wrong answer based on Strength
   * Base 10, -0.5 per Strength point, minimum 5
   */
  calculateDamageTaken(baseDamage = 10) {
    const strength = this.getTotalStat(StatType.STRENGTH);
    const reduction = strength * 0.5;
    return Math.max(Math.floor(baseDamage * 0.5), Math.round(baseDamage - reduction));
  }

  /**
   * Check if Luck prevents damage
   * 2% chance per Luck point
   */
  rollLuckAvoidDamage() {
    const luck = this.getTotalStat(StatType.LUCK);
    const chance = luck * 0.02;
    return Math.random() < chance;
  }

  /**
   * Calculate shop discount based on Luck
   * 1% per Luck point
   */
  calculateShopDiscount() {
    const luck = this.getTotalStat(StatType.LUCK);
    return luck * 0.01;
  }

  /**
   * Check if player has streak protection from Agility
   * Requires 5+ Agility
   */
  hasStreakProtection() {
    const agility = this.getTotalStat(StatType.AGILITY);
    return agility >= 5;
  }

  /**
   * Calculate reputation bonus from Devotion
   * 5% per point
   */
  calculateReputationMultiplier() {
    const devotion = this.getTotalStat(StatType.DEVOTION);
    return 1.0 + (devotion * 0.05);
  }

  /**
   * Calculate mastery decay reduction from Knowledge
   * 10% reduction per point
   */
  calculateMasteryDecayReduction() {
    const knowledge = this.getTotalStat(StatType.KNOWLEDGE);
    return knowledge * 0.1;
  }

  /**
   * Calculate hint quality based on Insight
   * Higher insight = better hints
   * Returns a tier: 0 = basic, 1 = good, 2 = great
   */
  calculateHintTier() {
    const insight = this.getTotalStat(StatType.INSIGHT);
    if (insight >= 15) return 2;
    if (insight >= 8) return 1;
    return 0;
  }
}

// =====================================================
// Helper Functions
// =====================================================

function getStatDefinition(statId) {
  return STAT_DEFINITIONS[statId];
}

// NOTE: getMilestoneDefinition moved to milestoneSystem.js
// NOTE: getAchievementDefinition moved to achievementSystem.js

// =====================================================
// Export
// =====================================================

// Global exports
window.StatType = StatType;
window.STAT_DEFINITIONS = STAT_DEFINITIONS;
window.STARTING_STATS = STARTING_STATS;
window.StatsManager = StatsManager;
window.getStatDefinition = getStatDefinition;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    StatType,
    STAT_DEFINITIONS,
    STARTING_STATS,
    StatsManager,
    getStatDefinition
  };
}

console.log('[statsSystem.js] Stats system loaded');
