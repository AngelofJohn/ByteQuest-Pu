// ByteQuest - Smithing System
// Crafting weapons and armor from ore and bars

// =====================================================
// Constants
// =====================================================

const SmithingSkillTiers = {
  INITIATE: { name: 'Initiate', minLevel: 1, maxLevel: 25 },
  APPRENTICE: { name: 'Apprentice', minLevel: 26, maxLevel: 50 },
  JOURNEYMAN: { name: 'Journeyman', minLevel: 51, maxLevel: 75 },
  EXPERT: { name: 'Expert', minLevel: 76, maxLevel: 100 },
  MASTER: { name: 'Master', minLevel: 101, maxLevel: 150 }
};

// =====================================================
// Recipe Definitions
// =====================================================

const SMITHING_RECIPES = {
  // -------------------------------------------------
  // Smelting (Ore -> Bars)
  // -------------------------------------------------
  copper_bar: {
    id: 'copper_bar',
    name: 'Copper Bar',
    category: 'smelting',
    description: 'Smelt copper chunks into a usable bar.',
    icon: '🔶',

    levelRequired: 1,
    unlockMethod: 'known',

    ingredients: [
      { type: 'ore', item: 'copper_chunk', amount: 3 }
    ],

    output: { item: 'copper_bar', amount: 1 },
    xpReward: 10
  },

  iron_bar: {
    id: 'iron_bar',
    name: 'Iron Bar',
    category: 'smelting',
    description: 'Smelt iron ore into a sturdy bar.',
    icon: '🔷',

    levelRequired: 20,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'ore', item: 'iron_ore', amount: 3 }
    ],

    output: { item: 'iron_bar', amount: 1 },
    xpReward: 25
  },

  silver_bar: {
    id: 'silver_bar',
    name: 'Silver Bar',
    category: 'smelting',
    description: 'Smelt silver vein into a gleaming bar.',
    icon: '⬜',

    levelRequired: 40,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'ore', item: 'silver_vein', amount: 3 }
    ],

    output: { item: 'silver_bar', amount: 1 },
    xpReward: 40
  },

  // -------------------------------------------------
  // Gathering Tools - Boost gathering efficiency
  // -------------------------------------------------
  copper_pickaxe: {
    id: 'copper_pickaxe',
    name: 'Copper Pickaxe',
    category: 'tools',
    description: 'A basic mining tool. +10% mining speed.',
    icon: '⛏️',

    levelRequired: 5,
    unlockMethod: 'known',

    ingredients: [
      { type: 'bar', item: 'copper_bar', amount: 2 },
      { type: 'wood', item: 'pine_log', amount: 2 }
    ],

    output: { item: 'copper_pickaxe', amount: 1 },
    xpReward: 20,

    craftsEquipment: true,
    equipmentSlot: 'tool',
    equipmentStats: { gatherSpeed: 0.10, gatherType: 'mining' }
  },

  copper_axe: {
    id: 'copper_axe',
    name: 'Copper Axe',
    category: 'tools',
    description: 'A basic woodcutting tool. +10% woodcutting speed.',
    icon: '🪓',

    levelRequired: 5,
    unlockMethod: 'known',

    ingredients: [
      { type: 'bar', item: 'copper_bar', amount: 2 },
      { type: 'wood', item: 'pine_log', amount: 2 }
    ],

    output: { item: 'copper_axe', amount: 1 },
    xpReward: 20,

    craftsEquipment: true,
    equipmentSlot: 'tool',
    equipmentStats: { gatherSpeed: 0.10, gatherType: 'woodcutting' }
  },

  iron_pickaxe: {
    id: 'iron_pickaxe',
    name: 'Iron Pickaxe',
    category: 'tools',
    description: 'A sturdy mining tool. +20% mining speed.',
    icon: '⛏️',

    levelRequired: 25,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'bar', item: 'iron_bar', amount: 3 },
      { type: 'wood', item: 'oak_timber', amount: 2 }
    ],

    output: { item: 'iron_pickaxe', amount: 1 },
    xpReward: 45,

    craftsEquipment: true,
    equipmentSlot: 'tool',
    equipmentStats: { gatherSpeed: 0.20, gatherType: 'mining' }
  },

  iron_axe: {
    id: 'iron_axe',
    name: 'Iron Axe',
    category: 'tools',
    description: 'A sturdy woodcutting tool. +20% woodcutting speed.',
    icon: '🪓',

    levelRequired: 25,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'bar', item: 'iron_bar', amount: 3 },
      { type: 'wood', item: 'oak_timber', amount: 2 }
    ],

    output: { item: 'iron_axe', amount: 1 },
    xpReward: 45,

    craftsEquipment: true,
    equipmentSlot: 'tool',
    equipmentStats: { gatherSpeed: 0.20, gatherType: 'woodcutting' }
  },

  silver_fishing_rod: {
    id: 'silver_fishing_rod',
    name: 'Silver Fishing Rod',
    category: 'tools',
    description: 'An elegant fishing tool. +15% fishing speed, +5% rare catch chance.',
    icon: '🎣',

    levelRequired: 45,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'bar', item: 'silver_bar', amount: 2 },
      { type: 'wood', item: 'ironwood', amount: 1 }
    ],

    output: { item: 'silver_fishing_rod', amount: 1 },
    xpReward: 60,

    craftsEquipment: true,
    equipmentSlot: 'tool',
    equipmentStats: { gatherSpeed: 0.15, rarityBonus: 0.05, gatherType: 'fishing' }
  },

  // -------------------------------------------------
  // Trade Goods - Higher value crafted items
  // -------------------------------------------------
  copper_ingot_stack: {
    id: 'copper_ingot_stack',
    name: 'Copper Ingot Stack',
    category: 'trade_goods',
    description: 'Bundled copper bars. Valuable for trade.',
    icon: '📦',

    levelRequired: 10,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'bar', item: 'copper_bar', amount: 5 }
    ],

    output: { item: 'copper_ingot_stack', amount: 1 },
    xpReward: 30,
    sellPrice: 50
  },

  iron_ingot_stack: {
    id: 'iron_ingot_stack',
    name: 'Iron Ingot Stack',
    category: 'trade_goods',
    description: 'Bundled iron bars. Highly sought after by merchants.',
    icon: '📦',

    levelRequired: 30,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'bar', item: 'iron_bar', amount: 5 }
    ],

    output: { item: 'iron_ingot_stack', amount: 1 },
    xpReward: 50,
    sellPrice: 120
  },

  silver_ingot_stack: {
    id: 'silver_ingot_stack',
    name: 'Silver Ingot Stack',
    category: 'trade_goods',
    description: 'Bundled silver bars. A luxury trade commodity.',
    icon: '📦',

    levelRequired: 50,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'bar', item: 'silver_bar', amount: 5 }
    ],

    output: { item: 'silver_ingot_stack', amount: 1 },
    xpReward: 80,
    sellPrice: 300
  },

  // -------------------------------------------------
  // Accessories - Stat-boosting jewelry
  // -------------------------------------------------
  copper_ring: {
    id: 'copper_ring',
    name: 'Copper Ring',
    category: 'accessories',
    description: 'A simple copper band. +1 Luck.',
    icon: '💍',

    levelRequired: 8,
    unlockMethod: 'known',

    ingredients: [
      { type: 'bar', item: 'copper_bar', amount: 2 }
    ],

    output: { item: 'copper_ring', amount: 1 },
    xpReward: 15,

    craftsEquipment: true,
    equipmentSlot: 'accessory',
    equipmentStats: { luck: 1 }
  },

  iron_amulet: {
    id: 'iron_amulet',
    name: 'Iron Amulet',
    category: 'accessories',
    description: 'A sturdy iron pendant. +1 Strength, +1 Stamina.',
    icon: '📿',

    levelRequired: 28,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'bar', item: 'iron_bar', amount: 2 },
      { type: 'hide', item: 'wolf_pelt', amount: 1 }
    ],

    output: { item: 'iron_amulet', amount: 1 },
    xpReward: 40,

    craftsEquipment: true,
    equipmentSlot: 'accessory',
    equipmentStats: { strength: 1, stamina: 1 }
  },

  silver_ring: {
    id: 'silver_ring',
    name: 'Silver Ring',
    category: 'accessories',
    description: 'An elegant silver band. +2 Luck, +1 Insight.',
    icon: '💍',

    levelRequired: 42,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'bar', item: 'silver_bar', amount: 2 }
    ],

    output: { item: 'silver_ring', amount: 1 },
    xpReward: 55,

    craftsEquipment: true,
    equipmentSlot: 'accessory',
    equipmentStats: { luck: 2, insight: 1 }
  },

  silver_amulet: {
    id: 'silver_amulet',
    name: 'Silver Amulet',
    category: 'accessories',
    description: 'A gleaming silver pendant. +2 Knowledge, +1 Devotion.',
    icon: '📿',

    levelRequired: 48,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'bar', item: 'silver_bar', amount: 3 },
      { type: 'herb', item: 'moonblossom', amount: 1 }
    ],

    output: { item: 'silver_amulet', amount: 1 },
    xpReward: 70,

    craftsEquipment: true,
    equipmentSlot: 'accessory',
    equipmentStats: { knowledge: 2, devotion: 1 }
  }
};

// =====================================================
// Smithing Manager Class
// =====================================================

class SmithingManager {
  constructor(gameState) {
    this.state = gameState;
    this.recipes = SMITHING_RECIPES;
    this.initializeSmithing();
  }

  // ===================================================
  // Initialization
  // ===================================================

  initializeSmithing() {
    if (!this.state.player.skills) {
      this.state.player.skills = {};
    }

    if (!this.state.player.skills.smithing) {
      this.state.player.skills.smithing = {
        level: 1,
        xp: 0
      };
    }

    if (!this.state.player.unlockedRecipes) {
      this.state.player.unlockedRecipes = [];
    }
  }

  /**
   * Check if player has a village project unlock
   */
  hasVillageUnlock(unlockId) {
    if (typeof villageProjectsManager !== 'undefined' && villageProjectsManager) {
      return villageProjectsManager.hasUnlock(unlockId);
    }
    return this.state.player.unlockedFeatures?.includes(unlockId) || false;
  }

  /**
   * Get adjusted ingredient amount (with smithing_efficiency discount)
   */
  getAdjustedIngredientAmount(baseAmount) {
    if (this.hasVillageUnlock('smithing_efficiency')) {
      // 10% reduction, minimum 1
      return Math.max(1, Math.floor(baseAmount * 0.9));
    }
    return baseAmount;
  }

  // ===================================================
  // Skill Management
  // ===================================================

  getSmithingLevel() {
    return this.state.player.skills.smithing?.level || 1;
  }

  getSmithingXP() {
    return this.state.player.skills.smithing?.xp || 0;
  }

  getXPForLevel(level) {
    // XP required scales: 100 * level^1.5
    return Math.floor(100 * Math.pow(level, 1.5));
  }

  getXPToNextLevel() {
    const currentLevel = this.getSmithingLevel();
    const currentXP = this.getSmithingXP();
    const requiredXP = this.getXPForLevel(currentLevel);
    return requiredXP - currentXP;
  }

  addSmithingXP(amount) {
    const skills = this.state.player.skills.smithing;
    skills.xp += amount;

    const result = {
      xpGained: amount,
      leveledUp: false,
      newLevel: skills.level
    };

    // Check for level up
    while (skills.xp >= this.getXPForLevel(skills.level)) {
      skills.xp -= this.getXPForLevel(skills.level);
      skills.level++;
      result.leveledUp = true;
      result.newLevel = skills.level;
    }

    return result;
  }

  getSkillTier() {
    const level = this.getSmithingLevel();
    for (const [key, tier] of Object.entries(SmithingSkillTiers)) {
      if (level >= tier.minLevel && level <= tier.maxLevel) {
        return tier;
      }
    }
    return SmithingSkillTiers.INITIATE;
  }

  getSkillProgressPercent() {
    const currentXP = this.getSmithingXP();
    const requiredXP = this.getXPForLevel(this.getSmithingLevel());
    return Math.floor((currentXP / requiredXP) * 100);
  }

  // ===================================================
  // Recipe Management
  // ===================================================

  getRecipe(recipeId) {
    return this.recipes[recipeId] || null;
  }

  getAllRecipes() {
    return Object.values(this.recipes);
  }

  getAvailableRecipes() {
    const level = this.getSmithingLevel();
    const unlockedRecipes = this.state.player.unlockedRecipes || [];

    return this.getAllRecipes().filter(recipe => {
      // Check level requirement
      if (recipe.levelRequired > level) {
        return false;
      }

      // Check unlock method
      switch (recipe.unlockMethod) {
        case 'known':
          return true;
        case 'skill':
          return recipe.levelRequired <= level;
        case 'shop':
        case 'reputation':
        case 'quest':
          return unlockedRecipes.includes(recipe.id);
        default:
          return false;
      }
    });
  }

  getLockedRecipes() {
    const available = this.getAvailableRecipes();
    const availableIds = new Set(available.map(r => r.id));

    return this.getAllRecipes().filter(r => !availableIds.has(r.id));
  }

  isRecipeUnlocked(recipeId) {
    const recipe = this.getRecipe(recipeId);
    if (!recipe) return false;

    const level = this.getSmithingLevel();
    const unlockedRecipes = this.state.player.unlockedRecipes || [];

    if (recipe.levelRequired > level) return false;

    switch (recipe.unlockMethod) {
      case 'known':
        return true;
      case 'skill':
        return recipe.levelRequired <= level;
      case 'shop':
      case 'reputation':
      case 'quest':
        return unlockedRecipes.includes(recipe.id);
      default:
        return false;
    }
  }

  unlockRecipe(recipeId) {
    if (!this.state.player.unlockedRecipes) {
      this.state.player.unlockedRecipes = [];
    }

    if (!this.state.player.unlockedRecipes.includes(recipeId)) {
      this.state.player.unlockedRecipes.push(recipeId);
      return { success: true, message: `Recipe unlocked: ${this.recipes[recipeId]?.name}` };
    }

    return { success: false, message: 'Recipe already unlocked' };
  }

  getRecipesByCategory() {
    const recipes = this.getAvailableRecipes();
    const categories = {};

    for (const recipe of recipes) {
      if (!categories[recipe.category]) {
        categories[recipe.category] = [];
      }
      categories[recipe.category].push(recipe);
    }

    return categories;
  }

  // ===================================================
  // Crafting
  // ===================================================

  canCraft(recipeId) {
    const recipe = this.getRecipe(recipeId);
    if (!recipe) {
      return { canCraft: false, reason: 'Recipe not found' };
    }

    // Check if recipe is unlocked
    if (!this.isRecipeUnlocked(recipeId)) {
      return { canCraft: false, reason: 'Recipe not unlocked' };
    }

    // Check ingredients (with smithing_efficiency discount applied)
    const missingIngredients = [];

    for (const ingredient of recipe.ingredients) {
      const available = this.getIngredientCount(ingredient);
      const requiredAmount = this.getAdjustedIngredientAmount(ingredient.amount);
      if (available < requiredAmount) {
        missingIngredients.push({
          ...ingredient,
          have: available,
          need: requiredAmount,
          originalNeed: ingredient.amount
        });
      }
    }

    if (missingIngredients.length > 0) {
      return {
        canCraft: false,
        reason: 'Missing ingredients',
        missingIngredients
      };
    }

    return { canCraft: true };
  }

  getIngredientCount(ingredient) {
    // Check inventory using item manager if available
    if (typeof itemManager !== 'undefined' && itemManager) {
      return itemManager.getItemCount(ingredient.item);
    }
    // Fallback: check inventory directly
    const inv = this.state.player.inventory || [];
    const item = inv.find(i => i.id === ingredient.item);
    return item ? item.count : 0;
  }

  craft(recipeId) {
    const canCraftResult = this.canCraft(recipeId);
    if (!canCraftResult.canCraft) {
      return { success: false, ...canCraftResult };
    }

    const recipe = this.getRecipe(recipeId);

    // Remove ingredients (with smithing_efficiency discount applied)
    for (const ingredient of recipe.ingredients) {
      const adjustedAmount = this.getAdjustedIngredientAmount(ingredient.amount);
      this.removeIngredient({ ...ingredient, amount: adjustedAmount });
    }

    // Add output item
    if (typeof itemManager !== 'undefined' && itemManager) {
      itemManager.addItem(recipe.output.item, recipe.output.amount);
    } else {
      // Fallback: add to inventory directly
      const inv = this.state.player.inventory || [];
      const existing = inv.find(i => i.id === recipe.output.item);
      if (existing) {
        existing.count += recipe.output.amount;
      } else {
        inv.push({ id: recipe.output.item, count: recipe.output.amount });
      }
    }

    // Award XP
    const xpResult = this.addSmithingXP(recipe.xpReward);

    return {
      success: true,
      recipe,
      output: recipe.output,
      xpGained: recipe.xpReward,
      leveledUp: xpResult.leveledUp,
      newLevel: xpResult.newLevel
    };
  }

  removeIngredient(ingredient) {
    if (typeof itemManager !== 'undefined' && itemManager) {
      itemManager.removeItem(ingredient.item, ingredient.amount);
    } else {
      const inv = this.state.player.inventory || [];
      const item = inv.find(i => i.id === ingredient.item);
      if (item) {
        item.count -= ingredient.amount;
        if (item.count <= 0) {
          const index = inv.indexOf(item);
          inv.splice(index, 1);
        }
      }
    }
  }

  // ===================================================
  // UI Helpers
  // ===================================================

  formatIngredient(ingredient) {
    // Get item info
    const itemData = GAME_DATA?.items?.[ingredient.item];
    const available = this.getIngredientCount(ingredient);

    return {
      name: itemData?.name || ingredient.item,
      icon: itemData?.icon || '?',
      amount: ingredient.amount,
      have: available,
      sufficient: available >= ingredient.amount
    };
  }

  getCategoryIcon(category) {
    const icons = {
      smelting: '🔥',
      tools: '🔧',
      trade_goods: '📦',
      accessories: '💍'
    };
    return icons[category] || '🔨';
  }

  getCategoryName(category) {
    const names = {
      smelting: 'Smelting',
      tools: 'Gathering Tools',
      trade_goods: 'Trade Goods',
      accessories: 'Accessories'
    };
    return names[category] || category;
  }
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SmithingSkillTiers,
    SMITHING_RECIPES,
    SmithingManager
  };
}
