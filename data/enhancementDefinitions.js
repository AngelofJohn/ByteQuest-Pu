// ByteQuest - Enhancement System Definitions
// Defines stat investment upgrades and material transmutation recipes

// =====================================================
// Stat Investment Configuration
// =====================================================

const ENHANCEMENT_STATS = {
  // Major stats - 20 level cap
  stamina: {
    id: 'stamina',
    name: 'Stamina',
    icon: '💚',
    description: 'Increases maximum HP',
    perLevel: 0.5,
    maxLevel: 20,
    baseCost: {
      gold: 50,
      moonblossom: 2,
      silver_vein: 1
    }
  },
  strength: {
    id: 'strength',
    name: 'Strength',
    icon: '💪',
    description: 'Reduces damage taken from wrong answers',
    perLevel: 0.5,
    maxLevel: 20,
    baseCost: {
      gold: 50,
      bear_fur: 2,
      ironwood: 1
    }
  },
  agility: {
    id: 'agility',
    name: 'Agility',
    icon: '⚡',
    description: 'Increases timer bonus and gathering speed',
    perLevel: 0.5,
    maxLevel: 20,
    baseCost: {
      gold: 50,
      moonblossom: 1,
      bear_fur: 1,
      silver_vein: 1
    }
  },
  insight: {
    id: 'insight',
    name: 'Insight',
    icon: '👁️',
    description: 'Increases hint capacity',
    perLevel: 0.5,
    maxLevel: 20,
    baseCost: {
      gold: 50,
      moonblossom: 2,
      ironwood: 1
    }
  },

  // Minor stats - 10 level cap
  luck: {
    id: 'luck',
    name: 'Luck',
    icon: '🍀',
    description: 'Chance to avoid damage, shop discounts',
    perLevel: 0.5,
    maxLevel: 10,
    baseCost: {
      gold: 75,
      moonblossom: 3,
      silver_vein: 2
    }
  },
  devotion: {
    id: 'devotion',
    name: 'Devotion',
    icon: '🙏',
    description: 'Increases reputation gains',
    perLevel: 0.5,
    maxLevel: 10,
    baseCost: {
      gold: 75,
      bear_fur: 3,
      ironwood: 2
    }
  },
  knowledge: {
    id: 'knowledge',
    name: 'Knowledge',
    icon: '📚',
    description: 'Increases XP gains',
    perLevel: 0.5,
    maxLevel: 10,
    baseCost: {
      gold: 75,
      moonblossom: 2,
      silver_vein: 1,
      ironwood: 1
    }
  }
};

// Cost multiplier per level: baseCost * (COST_SCALING ^ level)
const ENHANCEMENT_COST_SCALING = 1.4;

// =====================================================
// Transmutation Recipes
// =====================================================

const TRANSMUTATION_RECIPES = {
  // Tier 1 → Tier 2 (Mining)
  copper_to_iron: {
    id: 'copper_to_iron',
    input: 'copper_chunk',
    inputName: 'Copper Chunk',
    output: 'iron_ore',
    outputName: 'Iron Ore',
    ratio: 10,
    category: 'mining'
  },
  // Tier 2 → Tier 3 (Mining)
  iron_to_silver: {
    id: 'iron_to_silver',
    input: 'iron_ore',
    inputName: 'Iron Ore',
    output: 'silver_vein',
    outputName: 'Silver Vein',
    ratio: 10,
    category: 'mining'
  },

  // Tier 1 → Tier 2 (Woodcutting)
  pine_to_oak: {
    id: 'pine_to_oak',
    input: 'pine_log',
    inputName: 'Pine Log',
    output: 'oak_timber',
    outputName: 'Oak Timber',
    ratio: 10,
    category: 'woodcutting'
  },
  // Tier 2 → Tier 3 (Woodcutting)
  oak_to_ironwood: {
    id: 'oak_to_ironwood',
    input: 'oak_timber',
    inputName: 'Oak Timber',
    output: 'ironwood',
    outputName: 'Ironwood',
    ratio: 10,
    category: 'woodcutting'
  },

  // Tier 1 → Tier 2 (Hunting)
  boar_to_wolf: {
    id: 'boar_to_wolf',
    input: 'boar_hide',
    inputName: 'Boar Hide',
    output: 'wolf_pelt',
    outputName: 'Wolf Pelt',
    ratio: 10,
    category: 'hunting'
  },
  // Tier 2 → Tier 3 (Hunting)
  wolf_to_bear: {
    id: 'wolf_to_bear',
    input: 'wolf_pelt',
    inputName: 'Wolf Pelt',
    output: 'bear_fur',
    outputName: 'Bear Fur',
    ratio: 10,
    category: 'hunting'
  },

  // Tier 1 → Tier 2 (Herbalism)
  meadow_to_sunpetal: {
    id: 'meadow_to_sunpetal',
    input: 'meadow_leaf',
    inputName: 'Meadow Leaf',
    output: 'sunpetal',
    outputName: 'Sunpetal',
    ratio: 10,
    category: 'herbalism'
  },
  // Tier 2 → Tier 3 (Herbalism)
  sunpetal_to_moonblossom: {
    id: 'sunpetal_to_moonblossom',
    input: 'sunpetal',
    inputName: 'Sunpetal',
    output: 'moonblossom',
    outputName: 'Moonblossom',
    ratio: 10,
    category: 'herbalism'
  },

  // Tier 1 → Tier 2 (Fishing)
  perch_to_trout: {
    id: 'perch_to_trout',
    input: 'river_perch',
    inputName: 'River Perch',
    output: 'lake_trout',
    outputName: 'Lake Trout',
    ratio: 10,
    category: 'fishing'
  },
  // Tier 2 → Tier 3 (Fishing)
  trout_to_bass: {
    id: 'trout_to_bass',
    input: 'lake_trout',
    inputName: 'Lake Trout',
    output: 'sea_bass',
    outputName: 'Sea Bass',
    ratio: 10,
    category: 'fishing'
  }
};

// =====================================================
// Helper Functions
// =====================================================

/**
 * Calculate the cost for upgrading a stat to a specific level
 * @param {string} statId - The stat identifier
 * @param {number} targetLevel - The level being upgraded to (1-indexed)
 * @returns {Object} Cost object with gold and material amounts
 */
function getEnhancementCost(statId, targetLevel) {
  const stat = ENHANCEMENT_STATS[statId];
  if (!stat) return null;

  const multiplier = Math.pow(ENHANCEMENT_COST_SCALING, targetLevel - 1);
  const cost = {};

  for (const [resource, baseAmount] of Object.entries(stat.baseCost)) {
    cost[resource] = Math.ceil(baseAmount * multiplier);
  }

  return cost;
}

/**
 * Get the total bonus for a stat at a given level
 * @param {string} statId - The stat identifier
 * @param {number} level - Current enhancement level
 * @returns {number} Total stat bonus
 */
function getEnhancementBonus(statId, level) {
  const stat = ENHANCEMENT_STATS[statId];
  if (!stat) return 0;
  return stat.perLevel * level;
}

// =====================================================
// Global Export
// =====================================================

window.ENHANCEMENT_STATS = ENHANCEMENT_STATS;
window.ENHANCEMENT_COST_SCALING = ENHANCEMENT_COST_SCALING;
window.TRANSMUTATION_RECIPES = TRANSMUTATION_RECIPES;
window.getEnhancementCost = getEnhancementCost;
window.getEnhancementBonus = getEnhancementBonus;

console.log('[enhancementDefinitions.js] Enhancement definitions loaded:', {
  stats: Object.keys(ENHANCEMENT_STATS).length,
  transmutations: Object.keys(TRANSMUTATION_RECIPES).length
});
