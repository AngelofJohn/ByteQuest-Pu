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
  // Major Stats - These have significant, noticeable effects
  [StatType.STAMINA]: {
    id: StatType.STAMINA,
    name: 'Stamina',
    type: 'major',
    icon: '❤️',
    description: '+8 Max HP per point. More HP means more room for mistakes.',
    color: '#e63946',
    active: true,
    effect: {
      type: 'maxHp',
      perPoint: 8
    }
  },
  [StatType.STRENGTH]: {
    id: StatType.STRENGTH,
    name: 'Strength',
    type: 'major',
    icon: '⚔️',
    description: 'Reduces damage by 1 per point. Min 5 damage.',
    color: '#e76f51',
    active: true,
    effect: {
      type: 'damageReduction',
      perPoint: 1,
      minDamage: 5
    }
  },
  [StatType.AGILITY]: {
    id: StatType.AGILITY,
    name: 'Agility',
    type: 'major',
    icon: '💨',
    description: '+5% bonus time on timed questions per point. Faster gathering.',
    color: '#4cc9f0',
    active: true,
    effect: {
      type: 'speedBonus',
      timerBonusPerPoint: 0.05,
      gatherSpeedPerPoint: 0.03
    }
  },
  [StatType.INSIGHT]: {
    id: StatType.INSIGHT,
    name: 'Insight',
    type: 'major',
    icon: '👁️',
    description: '+1 hint per 5 points. At 10+, hints show more detail.',
    color: '#f4a261',
    active: true,
    effect: {
      type: 'hintCharges',
      pointsPerCharge: 5,
      improvedHintsThreshold: 10
    }
  },
  // Minor Stats - Smaller but useful passive bonuses
  [StatType.LUCK]: {
    id: StatType.LUCK,
    name: 'Luck',
    type: 'minor',
    icon: '🍀',
    description: '5% chance per point to avoid damage. Also gives 2% shop discount per point.',
    color: '#2a9d8f',
    active: true,
    effect: {
      type: 'avoidDamage',
      chancePerPoint: 0.05,
      shopDiscount: 0.02
    }
  },
  [StatType.DEVOTION]: {
    id: StatType.DEVOTION,
    name: 'Devotion',
    type: 'minor',
    icon: '✨',
    description: '+10% reputation gain per point with all factions.',
    color: '#ffd700',
    active: true,
    effect: {
      type: 'reputationBonus',
      perPoint: 0.10
    }
  },
  [StatType.KNOWLEDGE]: {
    id: StatType.KNOWLEDGE,
    name: 'Knowledge',
    type: 'minor',
    icon: '📖',
    description: '+5% XP from lessons per point. Words decay slower.',
    color: '#90be6d',
    active: true,
    effect: {
      type: 'masteryRetention',
      decayReduction: 0.1,
      xpBonus: 0.05
    }
  }
};

// Starting stat values - low to allow meaningful progression
const STARTING_STATS = {
  [StatType.STAMINA]: 3,    // 30 HP from stat + 30 base = 60 HP
  [StatType.STRENGTH]: 2,   // -2 damage reduction (8 damage on normal)
  [StatType.AGILITY]: 2,    // No streak protection yet (need 8)
  [StatType.INSIGHT]: 3,    // 0 hints (need 5 for first hint)
  [StatType.LUCK]: 1,       // 5% avoid chance, 2% shop discount
  [StatType.DEVOTION]: 1,   // +10% rep gain
  [StatType.KNOWLEDGE]: 1   // +5% XP, minor decay reduction
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

  getEnhancementStat(statId) {
    // Get bonus from Enhancement System (Tier 3 permanent upgrades)
    return this.state.player.enhancementStats?.[statId] || 0;
  }

  getTotalStat(statId) {
    return this.getBaseStat(statId) + this.getBonusStat(statId) + this.getEnhancementStat(statId);
  }

  getAllStats() {
    const stats = {};
    for (const statId of Object.values(StatType)) {
      stats[statId] = {
        base: this.getBaseStat(statId),
        bonus: this.getBonusStat(statId),
        enhancement: this.getEnhancementStat(statId),
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
  // Stat Effects - Rebalanced for meaningful progression
  // ===================================================

  /**
   * Calculate max HP based on Stamina
   * Base 15 + (Stamina * 8) + level bonus
   * At start (3 Sta): 15 + 24 = 39 HP (~4 mistakes at 10 dmg)
   * At level 10 with 7 Sta: 15 + 56 + 18 = 89 HP
   */
  calculateMaxHp() {
    const stamina = this.getTotalStat(StatType.STAMINA);
    const baseHp = 15;
    const staminaBonus = stamina * 8;
    const levelBonus = (this.state.player.level - 1) * 2;
    return baseHp + staminaBonus + levelBonus;
  }

  /**
   * Calculate damage taken on wrong answer based on Strength
   * -1 damage per Strength point, minimum 5 damage
   * At start (2 Str): 10 - 2 = 8 damage (but normal difficulty is 10)
   * At 5 Str: 10 - 5 = 5 damage (minimum)
   */
  calculateDamageTaken(baseDamage = 10) {
    const strength = this.getTotalStat(StatType.STRENGTH);
    const minDamage = STAT_DEFINITIONS[StatType.STRENGTH].effect.minDamage;
    return Math.max(minDamage, baseDamage - strength);
  }

  /**
   * Check if Luck prevents damage
   * 5% chance per Luck point
   * At start (1 Luck): 5% chance
   * At 5 Luck: 25% chance
   */
  rollLuckAvoidDamage() {
    const luck = this.getTotalStat(StatType.LUCK);
    const chance = luck * STAT_DEFINITIONS[StatType.LUCK].effect.chancePerPoint;
    const roll = Math.random();
    return roll < chance;
  }

  /**
   * Calculate shop discount based on Luck
   * 2% per Luck point
   * At 5 Luck: 10% discount
   */
  calculateShopDiscount() {
    const luck = this.getTotalStat(StatType.LUCK);
    return luck * STAT_DEFINITIONS[StatType.LUCK].effect.shopDiscount;
  }

  /**
   * Calculate timer bonus from Agility
   * 5% per point
   * At 5 Agility: +25% time on timed questions
   */
  calculateTimerBonus() {
    const agility = this.getTotalStat(StatType.AGILITY);
    return agility * (STAT_DEFINITIONS[StatType.AGILITY].effect.timerBonusPerPoint || 0.05);
  }

  /**
   * Calculate gathering speed bonus from Agility
   * 3% per point
   * At 5 Agility: +15% faster gathering
   */
  calculateGatherSpeedBonus() {
    const agility = this.getTotalStat(StatType.AGILITY);
    return agility * (STAT_DEFINITIONS[StatType.AGILITY].effect.gatherSpeedPerPoint || 0.03);
  }

  /**
   * Calculate reputation bonus from Devotion
   * 10% per point
   * At 5 Devotion: +50% rep gain
   */
  calculateReputationMultiplier() {
    const devotion = this.getTotalStat(StatType.DEVOTION);
    return 1.0 + (devotion * STAT_DEFINITIONS[StatType.DEVOTION].effect.perPoint);
  }

  /**
   * Calculate mastery decay reduction from Knowledge
   * 10% reduction per point (max 50% at 5 Knowledge)
   */
  calculateMasteryDecayReduction() {
    const knowledge = this.getTotalStat(StatType.KNOWLEDGE);
    return Math.min(0.5, knowledge * STAT_DEFINITIONS[StatType.KNOWLEDGE].effect.decayReduction);
  }

  /**
   * Calculate XP bonus from Knowledge
   * 5% per point
   * At 5 Knowledge: +25% XP
   */
  calculateXpBonus() {
    const knowledge = this.getTotalStat(StatType.KNOWLEDGE);
    return knowledge * (STAT_DEFINITIONS[StatType.KNOWLEDGE].effect.xpBonus || 0.05);
  }

  /**
   * Calculate number of hint charges from Insight
   * 1 charge per 5 points
   * At 5 Insight: 1 hint
   * At 10 Insight: 2 hints + improved quality
   */
  calculateHintCharges() {
    const insight = this.getTotalStat(StatType.INSIGHT);
    const pointsPerCharge = STAT_DEFINITIONS[StatType.INSIGHT].effect.pointsPerCharge;
    return Math.floor(insight / pointsPerCharge);
  }

  /**
   * Calculate hint quality tier based on Insight
   * 0 = basic, 1 = good (10+), 2 = great (15+)
   */
  calculateHintTier() {
    const insight = this.getTotalStat(StatType.INSIGHT);
    if (insight >= 15) return 2;
    if (insight >= 10) return 1;
    return 0;
  }

  /**
   * Get a summary of all stat effects for UI display
   */
  getStatEffectsSummary() {
    return {
      maxHp: this.calculateMaxHp(),
      damageReduction: this.getTotalStat(StatType.STRENGTH),
      minDamage: STAT_DEFINITIONS[StatType.STRENGTH].effect.minDamage,
      luckChance: Math.round(this.getTotalStat(StatType.LUCK) * STAT_DEFINITIONS[StatType.LUCK].effect.chancePerPoint * 100),
      shopDiscount: Math.round(this.calculateShopDiscount() * 100),
      timerBonus: Math.round(this.calculateTimerBonus() * 100),
      gatherSpeedBonus: Math.round(this.calculateGatherSpeedBonus() * 100),
      hintCharges: this.calculateHintCharges(),
      hintTier: this.calculateHintTier(),
      xpBonus: Math.round(this.calculateXpBonus() * 100),
      repBonus: Math.round((this.calculateReputationMultiplier() - 1) * 100),
      decayReduction: Math.round(this.calculateMasteryDecayReduction() * 100)
    };
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
