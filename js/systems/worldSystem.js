// ByteQuest - World Progression & Multiplier System
// Extracted from game.js (lines 207-699)

// =====================================================
// World Progression & Multiplier System
// =====================================================

/**
 * Get base world multiplier for resources
 * @param {number} world - World number (1-6)
 * @returns {number} Base multiplier
 */
function getWorldMultiplier(world = null) {
  const currentWorld = world !== null ? world : GameState.currentWorld;
  const worldMultipliers = {
    1: 1,
    2: 2,
    3: 5,
    4: 10,
    5: 20,
    6: 100
  };
  return worldMultipliers[currentWorld] || 1;
}

/**
 * Calculate total resource multiplier for a skill
 * Combines world base, upgrades, equipment, buffs, titles, etc.
 * @param {string} skillType - 'mining', 'woodcutting', 'herbalism', 'fishing', 'hunting', etc.
 * @returns {number} Total multiplier
 */
function calculateMultiplier(skillType) {
  const player = GameState.player;

  // Get world base multiplier
  const worldMultiplier = getWorldMultiplier();

  // Get skill-specific bonuses (default to 0 if not set)
  const multipliers = player.multipliers?.[skillType] || {
    upgrades: 0,
    equipment: 0,
    consumables: 0,
    titles: 0,
    village: 0,
    legacy: 0
  };

  // Sum all additive bonuses (these are percentages, e.g., 0.1 = +10%)
  const additiveBonus =
    multipliers.upgrades +
    multipliers.equipment +
    multipliers.consumables +
    multipliers.titles +
    multipliers.village +
    multipliers.legacy;

  // Final calculation: base × (1 + bonuses)
  // Example: W1 with +10% bonus = 1 × (1 + 0.1) = 1.1x
  // Example: W6 with +50% bonus = 100 × (1 + 0.5) = 150x
  const total = worldMultiplier * (1 + additiveBonus);

  return total;
}

/**
 * Apply multiplier bonus to a skill
 * @param {string} skillType - Skill to modify
 * @param {string} source - 'upgrades', 'equipment', 'consumables', 'titles', 'village', 'legacy'
 * @param {number} bonus - Bonus percentage (0.1 = +10%)
 */
function applyMultiplierBonus(skillType, source, bonus) {
  if (!GameState.player.multipliers) {
    GameState.player.multipliers = {};
  }

  if (!GameState.player.multipliers[skillType]) {
    GameState.player.multipliers[skillType] = {
      upgrades: 0,
      equipment: 0,
      consumables: 0,
      titles: 0,
      village: 0,
      legacy: 0
    };
  }

  GameState.player.multipliers[skillType][source] = bonus;
  console.log(`Applied ${(bonus * 100)}% ${source} bonus to ${skillType}`);
}

/**
 * Remove multiplier bonus from a skill
 * @param {string} skillType - Skill to modify
 * @param {string} source - Source to remove
 */
function removeMultiplierBonus(skillType, source) {
  if (GameState.player.multipliers?.[skillType]) {
    GameState.player.multipliers[skillType][source] = 0;
    console.log(`Removed ${source} bonus from ${skillType}`);
  }
}

/**
 * Advance to next world
 * @param {number} newWorld - World to unlock (2-6)
 */
function unlockWorld(newWorld) {
  if (newWorld < 1 || newWorld > 6) {
    console.error(`Invalid world: ${newWorld}`);
    return false;
  }

  if (GameState.worldProgress[newWorld].unlocked) {
    console.log(`World ${newWorld} already unlocked`);
    return false;
  }

  // Mark previous world as completed
  if (newWorld > 1) {
    GameState.worldProgress[newWorld - 1].completed = true;
  }

  // Unlock new world
  GameState.worldProgress[newWorld].unlocked = true;
  GameState.currentWorld = newWorld;

  console.log(`Unlocked World ${newWorld}! Multiplier is now ${getWorldMultiplier()}x`);
  showNotification(`World ${newWorld} Unlocked! Resource multiplier increased to ${getWorldMultiplier()}x`, 'epic');

  return true;
}

// Initialize Quest Manager (after GAME_DATA loads)
let questManager = null;

// Initialize Spaced Repetition Manager
let srManager = null;

// Initialize Stats Manager
let statsManager = null;

// Initialize Reputation Manager
let reputationManager = null;

// Initialize Item Manager
let itemManager = null;

// Initialize Shop Manager
let shopManager = null;

// Initialize Hint Manager
let hintManager = null;

// Initialize Location Manager
let locationManager = null;

// Initialize Boss Exam Manager
let bossExamManager = null;

// Initialize Title Manager
let titleManager = null;

// Initialize Alchemy Manager
let alchemyManager = null;

// Initialize Smithing Manager
let smithingManager = null;

// Initialize Enchanting Manager
let enchantingManager = null;

// Initialize Village Projects Manager
let villageProjectsManager = null;

// =====================================================
// Bonus Calculator - Idleon-style Visible Stacking
// =====================================================

/**
 * BonusCalculator - Tracks and displays all bonus sources
 * Shows: Base + Additive Bonuses × Multiplicative Bonuses = Total
 */
const BonusCalculator = {
  /**
   * Calculate XP with full breakdown
   * @param {number} baseXP - Base XP before bonuses
   * @param {object} context - Context for bonus calculation (streak, lessonType, etc.)
   * @returns {object} - { total, breakdown: [{source, type, value, formatted}] }
   */
  calculateXP(baseXP, context = {}) {
    const breakdown = [];
    let additive = 0;
    let multiplicative = 1.0;

    // Start with base
    breakdown.push({
      source: 'Base XP',
      type: 'base',
      value: baseXP,
      formatted: `${baseXP}`
    });

    // Streak bonus (multiplicative) - requires streak_xp_bonus unlock from Village Well project
    const hasStreakUnlock = villageProjectsManager?.hasUnlock('streak_xp_bonus') || false;
    if (hasStreakUnlock && context.streak && context.streak > 0) {
      const streakMultiplier = getMultiplierForStreak(context.streak);
      if (streakMultiplier > 1) {
        multiplicative *= streakMultiplier;
        breakdown.push({
          source: `${context.streak} Answer Streak`,
          type: 'multiplier',
          value: streakMultiplier,
          formatted: `×${streakMultiplier.toFixed(1)}`
        });
      }
    }

    // Account progression XP multiplier
    if (typeof accountProgression !== 'undefined' && accountProgression) {
      const effects = accountProgression.getActiveEffects();
      if (effects.xpMultiplier && effects.xpMultiplier > 1) {
        multiplicative *= effects.xpMultiplier;
        breakdown.push({
          source: 'Account Mastery',
          type: 'multiplier',
          value: effects.xpMultiplier,
          formatted: `×${effects.xpMultiplier.toFixed(2)}`
        });
      }
      // Flat XP bonus from account upgrades
      if (effects.xpBonus && effects.xpBonus > 0) {
        additive += effects.xpBonus;
        breakdown.push({
          source: 'Quick Learner',
          type: 'additive',
          value: effects.xpBonus,
          formatted: `+${effects.xpBonus}`
        });
      }
    }

    // Equipment XP bonuses (additive percentage converted to flat)
    const equipBonuses = this.getEquipmentBonuses('xp');
    if (equipBonuses.total > 0) {
      const equipFlat = Math.floor(baseXP * equipBonuses.total);
      additive += equipFlat;
      breakdown.push({
        source: 'Equipment',
        type: 'additive',
        value: equipFlat,
        formatted: `+${equipFlat}`,
        details: equipBonuses.sources
      });
    }

    // Title bonuses (if any XP-related titles exist)
    const titleBonus = this.getTitleBonus('xp');
    if (titleBonus.value > 0) {
      const titleFlat = Math.floor(baseXP * titleBonus.value);
      additive += titleFlat;
      breakdown.push({
        source: titleBonus.source,
        type: 'additive',
        value: titleFlat,
        formatted: `+${titleFlat}`
      });
    }

    // Perfect lesson bonus (additive)
    if (context.isPerfect) {
      const perfectBonus = Math.floor(baseXP * 0.25); // 25% bonus for perfect
      additive += perfectBonus;
      breakdown.push({
        source: 'Perfect Lesson',
        type: 'additive',
        value: perfectBonus,
        formatted: `+${perfectBonus}`
      });
    }

    // Calculate total: (base + additive) × multiplicative
    const subtotal = baseXP + additive;
    const total = Math.floor(subtotal * multiplicative);

    return {
      base: baseXP,
      additive,
      multiplicative,
      subtotal,
      total,
      breakdown
    };
  },

  /**
   * Calculate gathering yield with full breakdown
   * @param {number} baseYield - Base resource amount
   * @param {string} skillType - mining, fishing, herbalism, etc.
   * @param {object} context - Additional context
   */
  calculateGathering(baseYield, skillType, context = {}) {
    const breakdown = [];
    let additive = 0;
    let multiplicative = 1.0;

    breakdown.push({
      source: 'Base Yield',
      type: 'base',
      value: baseYield,
      formatted: `${baseYield}`
    });

    // World multiplier (multiplicative base - most impactful)
    const worldMultiplier = typeof getWorldMultiplier !== 'undefined' ? getWorldMultiplier() : 1;
    if (worldMultiplier > 1) {
      multiplicative *= worldMultiplier;
      breakdown.push({
        source: `World ${GameState.currentWorld || 1} Multiplier`,
        type: 'multiplier',
        value: worldMultiplier,
        formatted: `×${worldMultiplier}`
      });
    }

    // Player-specific multiplier bonuses (upgrades, equipment, consumables, titles, village, legacy)
    if (typeof calculateMultiplier !== 'undefined') {
      const totalMultiplier = calculateMultiplier(skillType);
      const playerBonus = totalMultiplier / worldMultiplier; // Remove world base to get player contribution

      if (playerBonus > 1) {
        multiplicative *= playerBonus;
        breakdown.push({
          source: 'Efficiency Bonuses',
          type: 'multiplier',
          value: playerBonus,
          formatted: `×${playerBonus.toFixed(2)}`
        });
      }
    }

    // Skill level bonus (additive)
    const skills = GameState.player.skills?.[skillType];
    if (skills && skills.level > 1) {
      const skillBonus = Math.floor((skills.level - 1) * 0.1 * baseYield);
      if (skillBonus > 0) {
        additive += skillBonus;
        breakdown.push({
          source: `${this.capitalize(skillType)} Lv.${skills.level}`,
          type: 'additive',
          value: skillBonus,
          formatted: `+${skillBonus}`
        });
      }
    }

    // Equipment bonuses for gathering
    const equipBonuses = this.getEquipmentBonuses(skillType);
    if (equipBonuses.total > 0) {
      const equipBonus = Math.floor(baseYield * equipBonuses.total);
      additive += equipBonus;
      breakdown.push({
        source: 'Equipment',
        type: 'additive',
        value: equipBonus,
        formatted: `+${equipBonus}`,
        details: equipBonuses.sources
      });
    }

    // Account progression gathering bonus (flat additive)
    if (typeof accountProgression !== 'undefined' && accountProgression) {
      const effects = accountProgression.getActiveEffects();
      if (effects.gatheringBonus && effects.gatheringBonus > 0) {
        additive += effects.gatheringBonus;
        breakdown.push({
          source: 'Bountiful Harvest',
          type: 'additive',
          value: effects.gatheringBonus,
          formatted: `+${effects.gatheringBonus}`
        });
      }
    }

    // Village project hunting bonus (+1 hide per hunting session)
    if (skillType === 'hunting') {
      const hasHuntingBonus = typeof villageProjectsManager !== 'undefined' && villageProjectsManager
        ? villageProjectsManager.hasUnlock('hunting_bonus')
        : GameState.player.unlockedFeatures?.includes('hunting_bonus');
      if (hasHuntingBonus) {
        additive += 1;
        breakdown.push({
          source: "Hunter's Lodge",
          type: 'additive',
          value: 1,
          formatted: '+1'
        });
      }
    }

    // Vocabulary Mastery bonuses (permanent upgrades from learning French)
    if (typeof VocabularyMasterySystem !== 'undefined') {
      const masteryBonuses = VocabularyMasterySystem.getBonusesForSkill(skillType);
      if (masteryBonuses.gatherAmount > 0) {
        additive += masteryBonuses.gatherAmount;
        breakdown.push({
          source: 'Vocabulary Mastery',
          type: 'additive',
          value: masteryBonuses.gatherAmount,
          formatted: `+${masteryBonuses.gatherAmount}`
        });
      }
    }

    // Lucky proc (multiplicative chance-based)
    if (context.luckyProc) {
      multiplicative *= 2;
      breakdown.push({
        source: 'Lucky Find!',
        type: 'multiplier',
        value: 2,
        formatted: '×2'
      });
    }

    const subtotal = baseYield + additive;
    const total = Math.floor(subtotal * multiplicative);

    return {
      base: baseYield,
      additive,
      multiplicative,
      subtotal,
      total,
      breakdown
    };
  },

  /**
   * Get all XP/stat bonuses from equipped items
   */
  getEquipmentBonuses(bonusType) {
    const sources = [];
    let total = 0;

    if (!GameState.player.equipment) return { total: 0, sources: [] };

    Object.entries(GameState.player.equipment).forEach(([slot, itemId]) => {
      if (!itemId) return;

      const item = GAME_DATA.items?.[itemId];
      if (!item || !item.stats) return;

      // Check for relevant bonus
      let bonus = 0;
      if (bonusType === 'xp' && item.stats.xpBonus) {
        bonus = item.stats.xpBonus;
      } else if (item.stats[bonusType + 'Bonus']) {
        bonus = item.stats[bonusType + 'Bonus'];
      }

      if (bonus > 0) {
        total += bonus;
        sources.push({ name: item.name, value: bonus });
      }
    });

    return { total, sources };
  },

  /**
   * Get bonus from active title
   */
  getTitleBonus(bonusType) {
    if (!GameState.player.activeTitle) return { value: 0, source: null };

    const title = GAME_DATA.titles?.[GameState.player.activeTitle];
    if (!title || !title.effects) return { value: 0, source: null };

    if (bonusType === 'xp' && title.effects.xpBonus) {
      return { value: title.effects.xpBonus, source: title.name };
    }

    return { value: 0, source: null };
  },

  /**
   * Format a breakdown for display in UI
   */
  formatBreakdownHTML(calculation) {
    let html = '<div class="bonus-breakdown">';

    calculation.breakdown.forEach((item, index) => {
      const typeClass = `breakdown-${item.type}`;
      const prefix = index === 0 ? '' : (item.type === 'multiplier' ? '' : '');

      html += `<div class="breakdown-row ${typeClass}">`;
      html += `<span class="breakdown-source">${item.source}</span>`;
      html += `<span class="breakdown-value">${item.formatted}</span>`;
      html += '</div>';

      // Show details if present (e.g., individual equipment pieces)
      if (item.details && item.details.length > 0) {
        item.details.forEach(detail => {
          html += `<div class="breakdown-detail">`;
          html += `<span class="detail-source">  └ ${detail.name}</span>`;
          html += `<span class="detail-value">+${Math.floor(detail.value * 100)}%</span>`;
          html += '</div>';
        });
      }
    });

    // Show total
    html += '<div class="breakdown-total">';
    html += '<span class="breakdown-source">Total</span>';
    html += `<span class="breakdown-value">${calculation.total}</span>`;
    html += '</div>';

    html += '</div>';
    return html;
  },

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};
