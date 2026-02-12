// ByteQuest - Enhancement System
// Tier 3 permanent stat upgrades via material investment + transmutation

// =====================================================
// Enhancement Manager Class
// =====================================================

class EnhancementManager {
  constructor(gameState) {
    this.state = gameState;
    this.initializeEnhancements();
  }

  // ===================================================
  // Initialization
  // ===================================================

  initializeEnhancements() {
    // Ensure enhancement state exists
    if (!this.state.player.enhancements) {
      this.state.player.enhancements = {
        statLevels: {
          stamina: 0,
          strength: 0,
          agility: 0,
          insight: 0,
          luck: 0,
          devotion: 0,
          knowledge: 0
        }
      };
    }

    if (!this.state.player.enhancementStats) {
      this.state.player.enhancementStats = {
        stamina: 0,
        strength: 0,
        agility: 0,
        insight: 0,
        luck: 0,
        devotion: 0,
        knowledge: 0
      };
    }

    // Recalculate stats on init (in case of save load)
    this.recalculateEnhancementStats();
  }

  // ===================================================
  // Stat Investment
  // ===================================================

  /**
   * Get current level for a stat
   * @param {string} statId - The stat identifier
   * @returns {number} Current enhancement level (0-maxLevel)
   */
  getStatLevel(statId) {
    return this.state.player.enhancements?.statLevels?.[statId] || 0;
  }

  /**
   * Get stat configuration from definitions
   * @param {string} statId - The stat identifier
   * @returns {Object|null} Stat configuration
   */
  getStatConfig(statId) {
    return ENHANCEMENT_STATS?.[statId] || null;
  }

  /**
   * Get the cost to upgrade a stat to the next level
   * @param {string} statId - The stat identifier
   * @returns {Object|null} Cost object with gold and material amounts
   */
  getStatCost(statId) {
    const currentLevel = this.getStatLevel(statId);
    const config = this.getStatConfig(statId);

    if (!config) return null;

    // Already at max level
    if (currentLevel >= config.maxLevel) return null;

    // Use the helper function from definitions
    return getEnhancementCost(statId, currentLevel + 1);
  }

  /**
   * Check if player can upgrade a stat
   * @param {string} statId - The stat identifier
   * @returns {Object} Result with canUpgrade, reason, and missing resources
   */
  canUpgradeStat(statId) {
    const config = this.getStatConfig(statId);
    if (!config) {
      return { canUpgrade: false, reason: 'Invalid stat' };
    }

    const currentLevel = this.getStatLevel(statId);
    if (currentLevel >= config.maxLevel) {
      return { canUpgrade: false, reason: 'Already at maximum level' };
    }

    const cost = this.getStatCost(statId);
    if (!cost) {
      return { canUpgrade: false, reason: 'Could not calculate cost' };
    }

    // Check resources
    const checkResult = this.hasResources(cost);
    if (!checkResult.hasAll) {
      return {
        canUpgrade: false,
        reason: 'Insufficient resources',
        missing: checkResult.missing
      };
    }

    return { canUpgrade: true };
  }

  /**
   * Upgrade a stat by one level
   * @param {string} statId - The stat identifier
   * @returns {Object} Result with success, new level, and stat bonus
   */
  upgradeStat(statId) {
    const canResult = this.canUpgradeStat(statId);
    if (!canResult.canUpgrade) {
      return { success: false, ...canResult };
    }

    const config = this.getStatConfig(statId);
    const cost = this.getStatCost(statId);
    const currentLevel = this.getStatLevel(statId);

    // Consume resources
    this.consumeResources(cost);

    // Increment level
    this.state.player.enhancements.statLevels[statId] = currentLevel + 1;

    // Recalculate bonuses
    this.recalculateEnhancementStats();

    const newLevel = currentLevel + 1;
    const totalBonus = getEnhancementBonus(statId, newLevel);

    return {
      success: true,
      statId,
      statName: config.name,
      newLevel,
      maxLevel: config.maxLevel,
      totalBonus,
      perLevel: config.perLevel
    };
  }

  /**
   * Recalculate all enhancement stat bonuses
   */
  recalculateEnhancementStats() {
    const stats = {
      stamina: 0,
      strength: 0,
      agility: 0,
      insight: 0,
      luck: 0,
      devotion: 0,
      knowledge: 0
    };

    for (const statId of Object.keys(stats)) {
      const level = this.getStatLevel(statId);
      stats[statId] = getEnhancementBonus(statId, level);
    }

    this.state.player.enhancementStats = stats;
    return stats;
  }

  /**
   * Get the current enhancement bonus for a stat
   * @param {string} statId - The stat identifier
   * @returns {number} Current bonus from enhancements
   */
  getEnhancementBonus(statId) {
    return this.state.player.enhancementStats?.[statId] || 0;
  }

  /**
   * Get all enhancement stats
   * @returns {Object} All enhancement stat bonuses
   */
  getAllEnhancementStats() {
    return this.state.player.enhancementStats || {};
  }

  // ===================================================
  // Transmutation
  // ===================================================

  /**
   * Get a transmutation recipe
   * @param {string} recipeId - The recipe identifier
   * @returns {Object|null} Transmutation recipe
   */
  getTransmutationRecipe(recipeId) {
    return TRANSMUTATION_RECIPES?.[recipeId] || null;
  }

  /**
   * Get all transmutation recipes
   * @returns {Array} All transmutation recipes
   */
  getAllTransmutationRecipes() {
    return Object.values(TRANSMUTATION_RECIPES || {});
  }

  /**
   * Get transmutation recipes grouped by category
   * @returns {Object} Recipes grouped by gathering skill category
   */
  getTransmutationsByCategory() {
    const recipes = this.getAllTransmutationRecipes();
    const categories = {};

    for (const recipe of recipes) {
      if (!categories[recipe.category]) {
        categories[recipe.category] = [];
      }
      categories[recipe.category].push(recipe);
    }

    return categories;
  }

  /**
   * Check if player can transmute materials
   * @param {string} recipeId - The recipe identifier
   * @param {number} amount - Number of times to transmute (default 1)
   * @returns {Object} Result with canTransmute, amount available, etc.
   */
  canTransmute(recipeId, amount = 1) {
    const recipe = this.getTransmutationRecipe(recipeId);
    if (!recipe) {
      return { canTransmute: false, reason: 'Recipe not found' };
    }

    const inputCount = this.getItemCount(recipe.input);
    const inputRequired = recipe.ratio * amount;
    const maxTransmutes = Math.floor(inputCount / recipe.ratio);

    if (inputCount < inputRequired) {
      return {
        canTransmute: false,
        reason: 'Insufficient materials',
        have: inputCount,
        need: inputRequired,
        maxTransmutes
      };
    }

    return {
      canTransmute: true,
      have: inputCount,
      need: inputRequired,
      maxTransmutes,
      outputAmount: amount
    };
  }

  /**
   * Perform a transmutation
   * @param {string} recipeId - The recipe identifier
   * @param {number} amount - Number of times to transmute (default 1)
   * @returns {Object} Result with success, amounts, etc.
   */
  transmute(recipeId, amount = 1) {
    const canResult = this.canTransmute(recipeId, amount);
    if (!canResult.canTransmute) {
      return { success: false, ...canResult };
    }

    const recipe = this.getTransmutationRecipe(recipeId);
    const inputCost = recipe.ratio * amount;

    // Remove input materials
    this.removeItem(recipe.input, inputCost);

    // Add output materials
    this.addItem(recipe.output, amount);

    return {
      success: true,
      recipe,
      inputUsed: inputCost,
      inputRemaining: this.getItemCount(recipe.input),
      outputGained: amount,
      outputTotal: this.getItemCount(recipe.output)
    };
  }

  /**
   * Transmute all possible materials for a recipe
   * @param {string} recipeId - The recipe identifier
   * @returns {Object} Result with success, amounts, etc.
   */
  transmuteAll(recipeId) {
    const canResult = this.canTransmute(recipeId, 1);
    if (!canResult.canTransmute) {
      return { success: false, ...canResult };
    }

    return this.transmute(recipeId, canResult.maxTransmutes);
  }

  // ===================================================
  // Resource Helpers
  // ===================================================

  /**
   * Check if player has all required resources
   * @param {Object} costs - Object mapping resource IDs to amounts
   * @returns {Object} Result with hasAll and missing resources
   */
  hasResources(costs) {
    const missing = [];

    for (const [resourceId, amount] of Object.entries(costs)) {
      if (resourceId === 'gold') {
        const playerGold = this.state.player.gold || 0;
        if (playerGold < amount) {
          missing.push({
            id: 'gold',
            name: 'Gold',
            need: amount,
            have: playerGold
          });
        }
      } else {
        const have = this.getItemCount(resourceId);
        if (have < amount) {
          // Get item name from definitions if available
          const itemData = RESOURCE_ITEMS?.[resourceId] || {};
          missing.push({
            id: resourceId,
            name: itemData.name || resourceId,
            icon: itemData.icon || '?',
            need: amount,
            have
          });
        }
      }
    }

    return {
      hasAll: missing.length === 0,
      missing
    };
  }

  /**
   * Consume resources (gold and items)
   * @param {Object} costs - Object mapping resource IDs to amounts
   */
  consumeResources(costs) {
    for (const [resourceId, amount] of Object.entries(costs)) {
      if (resourceId === 'gold') {
        if (typeof spendGold === 'function') {
          spendGold(amount);
        } else {
          this.state.player.gold = Math.max(0, (this.state.player.gold || 0) - amount);
        }
      } else {
        this.removeItem(resourceId, amount);
      }
    }
  }

  /**
   * Get count of an item in player inventory
   * @param {string} itemId - The item identifier
   * @returns {number} Count of items
   */
  getItemCount(itemId) {
    // Use itemManager if available
    if (typeof itemManager !== 'undefined' && itemManager) {
      return itemManager.getItemCount(itemId);
    }

    // Fallback: check inventory directly
    const inv = this.state.player.inventory || [];
    const item = inv.find(i => i.id === itemId);
    return item ? item.count : 0;
  }

  /**
   * Add item to player inventory
   * @param {string} itemId - The item identifier
   * @param {number} count - Amount to add
   */
  addItem(itemId, count) {
    if (typeof itemManager !== 'undefined' && itemManager) {
      itemManager.addItem(itemId, count);
      return;
    }

    // Fallback: add to inventory directly
    const inv = this.state.player.inventory;
    const existing = inv.find(i => i.id === itemId);
    if (existing) {
      existing.count += count;
    } else {
      inv.push({ id: itemId, count });
    }
  }

  /**
   * Remove item from player inventory
   * @param {string} itemId - The item identifier
   * @param {number} count - Amount to remove
   */
  removeItem(itemId, count) {
    if (typeof itemManager !== 'undefined' && itemManager) {
      itemManager.removeItem(itemId, count);
      return;
    }

    // Fallback: remove from inventory directly
    const inv = this.state.player.inventory;
    const item = inv.find(i => i.id === itemId);
    if (item) {
      item.count -= count;
      if (item.count <= 0) {
        const index = inv.indexOf(item);
        inv.splice(index, 1);
      }
    }
  }

  // ===================================================
  // UI Helpers
  // ===================================================

  /**
   * Get stat investment progress info for UI
   * @param {string} statId - The stat identifier
   * @returns {Object} Progress info
   */
  getStatProgress(statId) {
    const config = this.getStatConfig(statId);
    if (!config) return null;

    const level = this.getStatLevel(statId);
    const maxLevel = config.maxLevel;
    const bonus = getEnhancementBonus(statId, level);
    const maxBonus = getEnhancementBonus(statId, maxLevel);
    const cost = this.getStatCost(statId);
    const canUpgrade = this.canUpgradeStat(statId).canUpgrade;
    const isMaxed = level >= maxLevel;

    return {
      statId,
      name: config.name,
      icon: config.icon,
      description: config.description,
      level,
      maxLevel,
      bonus,
      maxBonus,
      perLevel: config.perLevel,
      cost,
      canUpgrade,
      isMaxed,
      progressPercent: Math.floor((level / maxLevel) * 100)
    };
  }

  /**
   * Get all stat progress for UI
   * @returns {Array} Array of stat progress objects
   */
  getAllStatProgress() {
    return Object.keys(ENHANCEMENT_STATS || {}).map(statId => this.getStatProgress(statId));
  }

  /**
   * Get transmutation info for UI
   * @param {string} recipeId - The recipe identifier
   * @returns {Object} Transmutation info
   */
  getTransmutationInfo(recipeId) {
    const recipe = this.getTransmutationRecipe(recipeId);
    if (!recipe) return null;

    const inputCount = this.getItemCount(recipe.input);
    const outputCount = this.getItemCount(recipe.output);
    const maxTransmutes = Math.floor(inputCount / recipe.ratio);
    const canTransmute = maxTransmutes > 0;

    // Get icons from resource definitions
    const inputData = RESOURCE_ITEMS?.[recipe.input] || {};
    const outputData = RESOURCE_ITEMS?.[recipe.output] || {};

    return {
      ...recipe,
      inputIcon: inputData.icon || '?',
      outputIcon: outputData.icon || '?',
      inputCount,
      outputCount,
      maxTransmutes,
      canTransmute
    };
  }

  /**
   * Get all transmutation info for UI
   * @returns {Array} Array of transmutation info objects
   */
  getAllTransmutationInfo() {
    return this.getAllTransmutationRecipes().map(recipe => this.getTransmutationInfo(recipe.id));
  }

  /**
   * Format a cost object for display
   * @param {Object} cost - Cost object
   * @returns {Array} Formatted cost items
   */
  formatCost(cost) {
    if (!cost) return [];

    return Object.entries(cost).map(([resourceId, amount]) => {
      if (resourceId === 'gold') {
        return {
          id: 'gold',
          name: 'Gold',
          icon: '💰',
          amount,
          have: this.state.player.gold || 0,
          sufficient: (this.state.player.gold || 0) >= amount
        };
      }

      const itemData = RESOURCE_ITEMS?.[resourceId] || {};
      const have = this.getItemCount(resourceId);

      return {
        id: resourceId,
        name: itemData.name || resourceId,
        icon: itemData.icon || '?',
        amount,
        have,
        sufficient: have >= amount
      };
    });
  }

  /**
   * Get category display info
   * @param {string} category - Category identifier
   * @returns {Object} Category display info
   */
  getCategoryInfo(category) {
    const info = {
      mining: { name: 'Mining', icon: '⛏️' },
      woodcutting: { name: 'Woodcutting', icon: '🪓' },
      hunting: { name: 'Hunting', icon: '🏹' },
      herbalism: { name: 'Herbalism', icon: '🌿' },
      fishing: { name: 'Fishing', icon: '🎣' }
    };

    return info[category] || { name: category, icon: '📦' };
  }
}

// =====================================================
// Global Instance
// =====================================================

let enhancementManager = null;

/**
 * Initialize the enhancement manager
 * @param {Object} gameState - The game state object
 */
function initializeEnhancementManager(gameState) {
  enhancementManager = new EnhancementManager(gameState);
  console.log('[enhancementSystem.js] Enhancement manager initialized');
  return enhancementManager;
}

// =====================================================
// Export
// =====================================================

window.EnhancementManager = EnhancementManager;
window.enhancementManager = enhancementManager;
window.initializeEnhancementManager = initializeEnhancementManager;

console.log('[enhancementSystem.js] Enhancement system loaded');
