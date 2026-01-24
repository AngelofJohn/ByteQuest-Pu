// ByteQuest - Item System

// =====================================================
// Constants
// =====================================================

const ItemCategory = {
  EQUIPMENT: 'equipment',
  CONSUMABLE: 'consumable',
  QUEST_ITEM: 'quest_item',
  COLLECTIBLE: 'collectible',
  CRAFTING_MATERIAL: 'crafting_material'
};

const ItemCategoryInfo = {
  [ItemCategory.EQUIPMENT]: {
    name: 'Equipment',
    description: 'Equippable items that go in gear slots',
    stackable: false,
    canDrop: true,
    canSell: true
  },
  [ItemCategory.CONSUMABLE]: {
    name: 'Consumable',
    description: 'One-time use items',
    stackable: true,
    canDrop: true,
    canSell: true
  },
  [ItemCategory.QUEST_ITEM]: {
    name: 'Quest Item',
    description: 'Items needed for specific quests',
    stackable: false,
    canDrop: false,
    canSell: false
  },
  [ItemCategory.COLLECTIBLE]: {
    name: 'Collectible',
    description: 'Rare items for achievements and lore',
    stackable: false,
    canDrop: false,
    canSell: false
  },
  [ItemCategory.CRAFTING_MATERIAL]: {
    name: 'Crafting Material',
    description: 'Materials used for crafting',
    stackable: true,
    canDrop: true,
    canSell: true
  }
};

const EquipmentSlot = {
  HELM: 'helm',
  ARMOR: 'armor',
  WEAPON: 'weapon',
  ACCESSORY: 'accessory',
  RING: 'ring'
};

const EquipmentSlotInfo = {
  [EquipmentSlot.HELM]: {
    name: 'Helm',
    icon: '🪖',
    description: 'Head protection'
  },
  [EquipmentSlot.ARMOR]: {
    name: 'Armor',
    icon: '🛡️',
    description: 'Body protection'
  },
  [EquipmentSlot.WEAPON]: {
    name: 'Weapon',
    icon: '⚔️',
    description: 'Primary weapon'
  },
  [EquipmentSlot.ACCESSORY]: {
    name: 'Accessory',
    icon: '📿',
    description: 'Accessory item'
  },
  [EquipmentSlot.RING]: {
    name: 'Ring',
    icon: '💍',
    description: 'Finger ring'
  }
};

const ItemRarity = {
  COMMON: 'common',
  RARE: 'rare',
  LEGENDARY: 'legendary'
};

const ItemRarityInfo = {
  [ItemRarity.COMMON]: {
    name: 'Common',
    color: '#ffffff',
    order: 0
  },
  [ItemRarity.RARE]: {
    name: 'Rare',
    color: '#4a90d9',
    order: 1
  },
  [ItemRarity.LEGENDARY]: {
    name: 'Legendary',
    color: '#ffd700',
    order: 2
  }
};

// =====================================================
// Equipment Set Definitions
// =====================================================

const EQUIPMENT_SETS = {
  scholar: {
    id: 'scholar',
    name: "Scholar's Regalia",
    icon: '📚',
    description: 'Attire of the dedicated student',
    theme: 'knowledge',
    pieces: ['scholars_cap', 'scholars_robe', 'tome_of_wisdom', 'ring_of_knowledge'],
    bonuses: {
      2: {
        stats: { knowledge: 1 },
        description: '+1 Knowledge',
        effect: null
      },
      3: {
        stats: { knowledge: 2, insight: 1 },
        description: '+2 Knowledge, +1 Insight',
        effect: null
      },
      4: {
        stats: { knowledge: 3, insight: 2 },
        description: '+3 Knowledge, +2 Insight, +10% XP from all sources',
        effect: { type: 'xp_bonus', value: 0.10 }
      }
    }
  },

  warrior: {
    id: 'warrior',
    name: "Warrior's Plate",
    icon: '⚔️',
    description: 'Armor of the steadfast protector',
    theme: 'durability',
    pieces: ['iron_helm', 'iron_armor', 'iron_sword', 'warriors_shield'],
    bonuses: {
      2: {
        stats: { stamina: 2 },
        description: '+2 Stamina',
        effect: null
      },
      3: {
        stats: { stamina: 2, strength: 1 },
        description: '+2 Stamina, +1 Strength',
        effect: null
      },
      4: {
        stats: { stamina: 3, strength: 2 },
        description: '+3 Stamina, +2 Strength, Take 25% less damage',
        effect: { type: 'damage_reduction', value: 0.25 }
      }
    }
  }
};

// =====================================================
// Item Template
// =====================================================

/**
 * Creates a new item definition
 * This is the structure all items should follow
 */
function createItemTemplate(overrides = {}) {
  return {
    // Identity
    id: '',
    name: '',
    description: '',
    icon: '❓',
    
    // Classification
    category: ItemCategory.CONSUMABLE,
    rarity: ItemRarity.COMMON,
    
    // Equipment-specific (only if category is EQUIPMENT)
    equipmentSlot: null, // EquipmentSlot value

    // Stats (all optional)
    stats: {
      stamina: 0,
      strength: 0,
      agility: 0,
      insight: 0,
      luck: 0,
      devotion: 0,
      knowledge: 0
    },
    
    // Consumable effects (only if category is CONSUMABLE)
    effects: {
      hp: 0,           // HP restored
      maxHp: 0,        // Temporary max HP boost
      xpBonus: 0,      // Bonus XP (flat)
      xpMultiplier: 0, // Bonus XP (percentage)
      // Future effects can be added here
    },
    
    // Quest item specifics
    questId: null, // Associated quest ID
    
    // Collectible specifics
    collectibleSet: null, // Set this collectible belongs to
    loreText: null,       // Lore/flavor text
    
    // Crafting material specifics
    craftingTier: 0, // Tier of crafting material
    
    // Stacking
    stackable: false,
    maxStack: 1,
    
    // Economy (for future shop system)
    buyPrice: 0,
    sellPrice: 0,
    
    // Requirements
    levelRequired: 0,
    classRequired: null, // null = any class
    reputationRequired: null, // { factionId, rank }
    
    // Flags
    unique: false,     // Can only have one
    soulbound: false,  // Cannot be traded/sold
    hidden: false,     // Not shown in normal inventory views
    
    // Apply overrides
    ...overrides
  };
}

// =====================================================
// Item Manager Class
// =====================================================

class ItemManager {
  constructor(gameState, itemDefinitions) {
    this.state = gameState;
    this.definitions = itemDefinitions || {};
  }

  // ===================================================
  // Item Definition Access
  // ===================================================

  /**
   * Get an item definition by ID
   */
  getDefinition(itemId) {
    return this.definitions[itemId] || null;
  }

  /**
   * Get all items of a specific category
   */
  getItemsByCategory(category) {
    return Object.values(this.definitions).filter(
      item => item.category === category
    );
  }

  /**
   * Get all items of a specific rarity
   */
  getItemsByRarity(rarity) {
    return Object.values(this.definitions).filter(
      item => item.rarity === rarity
    );
  }

  /**
   * Get all equipment for a specific slot
   */
  getEquipmentForSlot(slot) {
    return Object.values(this.definitions).filter(
      item => item.category === ItemCategory.EQUIPMENT && item.equipmentSlot === slot
    );
  }

  // ===================================================
  // Inventory Management
  // ===================================================

  /**
   * Get player's inventory
   */
  getInventory() {
    // Initialize inventory if it doesn't exist (fix: return actual reference, not new array)
    if (!this.state.player.inventory) {
      this.state.player.inventory = [];
    }
    return this.state.player.inventory;
  }

  /**
   * Find an item in inventory by ID
   */
  findInInventory(itemId) {
    return this.getInventory().find(item => item.id === itemId);
  }

  /**
   * Check if player has an item
   */
  hasItem(itemId, count = 1) {
    const item = this.findInInventory(itemId);
    return item && item.count >= count;
  }

  /**
   * Get count of an item in inventory
   */
  getItemCount(itemId) {
    const item = this.findInInventory(itemId);
    return item ? item.count : 0;
  }

  /**
   * Add item to inventory
   */
  addItem(itemId, count = 1) {
    const definition = this.getDefinition(itemId);
    if (!definition) {
      console.warn(`Unknown item: ${itemId}`);
      return { success: false, message: 'Unknown item' };
    }

    // Check if unique and already owned
    if (definition.unique && this.hasItem(itemId)) {
      return { success: false, message: 'You already have this unique item' };
    }

    const inventory = this.getInventory();

    // Derive category from type if not explicitly set (items use type: "consumable", etc.)
    let category = definition.category;
    if (!category && definition.type) {
      if (definition.type === 'consumable') {
        category = ItemCategory.CONSUMABLE;
      } else if (['helm', 'armor', 'weapon', 'accessory', 'ring'].includes(definition.type)) {
        category = ItemCategory.EQUIPMENT;
      } else if (definition.type === 'material') {
        category = ItemCategory.CRAFTING_MATERIAL;
      } else {
        category = ItemCategory.CONSUMABLE; // Default fallback
      }
    }

    const categoryInfo = ItemCategoryInfo[category] || ItemCategoryInfo[ItemCategory.CONSUMABLE];

    if (categoryInfo.stackable && definition.stackable) {
      // Stackable item - find existing stack or create new
      const existing = this.findInInventory(itemId);
      // Calculate max stack with account progression bonus
      const baseMax = definition.maxStack || 99;
      const stackBonus = this.state.maxStackSizeBonus || 0;
      const maxStack = baseMax + stackBonus;

      if (existing) {
        const spaceInStack = maxStack - existing.count;
        const toAdd = Math.min(count, spaceInStack);
        existing.count += toAdd;

        // Handle overflow (create new stacks if needed)
        const overflow = count - toAdd;
        if (overflow > 0) {
          // For now, just cap at max stack
          // Future: create additional stacks
        }
      } else {
        inventory.push({
          id: itemId,
          count: Math.min(count, maxStack)
        });
      }
    } else {
      // Non-stackable - add individual entries
      for (let i = 0; i < count; i++) {
        inventory.push({
          id: itemId,
          count: 1,
          instanceId: this.generateInstanceId() // Unique instance for non-stackables
        });
      }
    }

    // Check gather objectives after adding item
    if (typeof checkGatherObjectives === 'function') {
      checkGatherObjectives(itemId);
    }

    return {
      success: true,
      message: `Received: ${definition.name}${count > 1 ? ` x${count}` : ''}`,
      item: definition
    };
  }

  /**
   * Remove item from inventory
   */
  removeItem(itemId, count = 1) {
    const inventory = this.getInventory();
    const index = inventory.findIndex(item => item.id === itemId);
    
    if (index === -1) {
      return { success: false, message: 'Item not found' };
    }

    const item = inventory[index];
    
    if (item.count > count) {
      item.count -= count;
    } else {
      inventory.splice(index, 1);
    }

    return { success: true, message: 'Item removed' };
  }

  /**
   * Generate unique instance ID for non-stackable items
   */
  generateInstanceId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // ===================================================
  // Equipment Management
  // ===================================================

  /**
   * Get current equipment
   */
  getEquipment() {
    return this.state.player.equipment || {};
  }

  /**
   * Get equipped item in a slot
   */
  getEquippedItem(slot) {
    const equipment = this.getEquipment();
    const itemId = equipment[slot];
    return itemId ? this.getDefinition(itemId) : null;
  }

  /**
   * Equip an item
   */
  equipItem(itemId) {
    const definition = this.getDefinition(itemId);
    if (!definition) {
      return { success: false, message: 'Unknown item' };
    }

    if (definition.category !== ItemCategory.EQUIPMENT) {
      return { success: false, message: 'This item cannot be equipped' };
    }

    if (!definition.equipmentSlot) {
      return { success: false, message: 'This item has no equipment slot defined' };
    }

    // Check requirements
    const reqCheck = this.checkRequirements(definition);
    if (!reqCheck.met) {
      return { success: false, message: reqCheck.reason };
    }

    // Check if item is in inventory
    if (!this.hasItem(itemId)) {
      return { success: false, message: 'You do not have this item' };
    }

    const slot = definition.equipmentSlot;
    const equipment = this.getEquipment();

    // Unequip current item in slot (if any)
    if (equipment[slot]) {
      this.unequipItem(slot);
    }

    // Remove from inventory
    this.removeItem(itemId);

    // Equip
    equipment[slot] = itemId;

    // Recalculate stats
    this.recalculateEquipmentStats();

    return {
      success: true,
      message: `Equipped: ${definition.name}`,
      item: definition
    };
  }

  /**
   * Unequip an item from a slot
   */
  unequipItem(slot) {
    const equipment = this.getEquipment();
    const itemId = equipment[slot];

    if (!itemId) {
      return { success: false, message: 'Nothing equipped in this slot' };
    }

    const definition = this.getDefinition(itemId);

    // Add back to inventory
    this.addItem(itemId);

    // Clear slot
    equipment[slot] = null;

    // Recalculate stats
    this.recalculateEquipmentStats();

    return {
      success: true,
      message: `Unequipped: ${definition ? definition.name : itemId}`,
      item: definition
    };
  }

  /**
   * Check if player meets item requirements
   */
  checkRequirements(definition) {
    const player = this.state.player;

    // Level requirement
    if (definition.levelRequired && player.level < definition.levelRequired) {
      return { met: false, reason: `Requires level ${definition.levelRequired}` };
    }

    // Class requirement
    if (definition.classRequired && player.class !== definition.classRequired) {
      return { met: false, reason: `Requires ${definition.classRequired} class` };
    }

    // Reputation requirement
    if (definition.reputationRequired) {
      const { factionId, rank } = definition.reputationRequired;
      const playerRep = player.reputation[factionId] || 0;
      // Would need to convert rank to reputation value
      // For now, just check if they have any reputation
      if (playerRep < rank * 200) {
        return { met: false, reason: `Requires higher reputation` };
      }
    }

    return { met: true };
  }

  /**
   * Recalculate bonus stats from equipment (including set bonuses)
   */
  recalculateEquipmentStats() {
    const equipment = this.getEquipment();
    const bonusStats = {
      stamina: 0,
      strength: 0,
      agility: 0,
      insight: 0,
      luck: 0,
      devotion: 0,
      knowledge: 0
    };

    // Add base equipment stats
    for (const slot of Object.values(EquipmentSlot)) {
      const itemId = equipment[slot];
      if (itemId) {
        const definition = this.getDefinition(itemId);
        if (definition && definition.stats) {
          for (const [stat, value] of Object.entries(definition.stats)) {
            if (bonusStats[stat] !== undefined) {
              bonusStats[stat] += value;
            }
          }
        }
      }
    }

    // Add set bonuses
    const setBonuses = this.calculateSetBonuses();
    for (const [stat, value] of Object.entries(setBonuses.stats)) {
      if (bonusStats[stat] !== undefined) {
        bonusStats[stat] += value;
      }
    }

    // Update player bonus stats
    this.state.player.bonusStats = bonusStats;

    // Store active set bonuses for UI display
    this.state.player.activeSetBonuses = setBonuses.activeSets;

    // Store active set effects (like XP bonus, damage reduction)
    this.state.player.setEffects = setBonuses.effects;

    return bonusStats;
  }

  /**
   * Calculate set bonuses from equipped items
   * Returns object with stats bonuses and active set info
   */
  calculateSetBonuses() {
    const equipment = this.getEquipment();
    const equippedItems = Object.values(equipment).filter(id => id);

    const result = {
      stats: {
        stamina: 0,
        strength: 0,
        agility: 0,
        insight: 0,
        luck: 0,
        devotion: 0,
        knowledge: 0
      },
      activeSets: [], // Array of { setId, name, piecesEquipped, tierActive, bonusDescription }
      effects: []     // Array of special effects { type, value }
    };

    // Check each defined set
    for (const set of Object.values(EQUIPMENT_SETS)) {
      // Find how many pieces of this set are equipped
      const equippedSetPieces = equippedItems.filter(itemId => {
        const def = this.getDefinition(itemId);
        return def && def.setId === set.id;
      });

      const pieceCount = equippedSetPieces.length;

      if (pieceCount === 0) continue;

      // Find highest tier bonus achieved
      let highestTier = 0;
      let activeTierBonus = null;

      for (const [tier, bonus] of Object.entries(set.bonuses)) {
        const tierNum = parseInt(tier);
        if (pieceCount >= tierNum && tierNum > highestTier) {
          highestTier = tierNum;
          activeTierBonus = bonus;
        }
      }

      // Apply the highest tier bonus
      if (activeTierBonus) {
        // Add stat bonuses
        if (activeTierBonus.stats) {
          for (const [stat, value] of Object.entries(activeTierBonus.stats)) {
            if (result.stats[stat] !== undefined) {
              result.stats[stat] += value;
            }
          }
        }

        // Add special effects
        if (activeTierBonus.effect) {
          result.effects.push(activeTierBonus.effect);
        }

        // Record active set info for UI
        result.activeSets.push({
          setId: set.id,
          name: set.name,
          icon: set.icon,
          piecesEquipped: pieceCount,
          piecesTotal: set.pieces.length,
          tierActive: highestTier,
          bonusDescription: activeTierBonus.description
        });
      }
    }

    return result;
  }

  /**
   * Get active set bonuses for UI display
   */
  getActiveSetBonuses() {
    return this.state.player.activeSetBonuses || [];
  }

  /**
   * Check if player has set effect active
   */
  hasSetEffect(effectType) {
    const effects = this.state.player.setEffects || [];
    return effects.some(e => e.type === effectType);
  }

  /**
   * Get set effect value
   */
  getSetEffectValue(effectType) {
    const effects = this.state.player.setEffects || [];
    const effect = effects.find(e => e.type === effectType);
    return effect ? effect.value : 0;
  }

  // ===================================================
  // Consumable Usage
  // ===================================================

  /**
   * Use a consumable item
   */
  useConsumable(itemId) {
    const definition = this.getDefinition(itemId);
    if (!definition) {
      return { success: false, message: 'Unknown item' };
    }

    if (definition.category !== ItemCategory.CONSUMABLE) {
      return { success: false, message: 'This item cannot be used' };
    }

    if (!this.hasItem(itemId)) {
      return { success: false, message: 'You do not have this item' };
    }

    // Apply effects - items use 'effect' (singular) not 'effects'
    const effect = definition.effect || {};
    const results = [];
    const player = this.state.player;

    // 1. Instant HP healing
    if (effect.heal && effect.heal > 0) {
      const oldHp = player.hp;
      player.hp = Math.min(player.maxHp, player.hp + effect.heal);
      const healed = player.hp - oldHp;
      results.push(`+${healed} HP`);
    }

    // 2. Full heal
    if (effect.fullHeal) {
      const oldHp = player.hp;
      player.hp = player.maxHp;
      results.push(`Fully healed (+${player.hp - oldHp} HP)`);
    }

    // 3. Temporary effects (stored in player.activeEffects.consumables)
    if (effect.xpMultiplier || effect.xpBonus || effect.damageReduction || effect.hintCharges) {
      this._applyTemporaryEffect(itemId, effect, definition, results);
    }

    // Remove item
    this.removeItem(itemId);

    // Update UI to show active effects
    if (typeof updateUI === 'function') {
      updateUI();
    }

    return {
      success: true,
      message: `Used: ${definition.name}`,
      results,
      item: definition
    };
  }

  /**
   * Apply temporary effect from consumable
   * @private
   */
  _applyTemporaryEffect(itemId, effect, definition, results) {
    const player = this.state.player;

    // Initialize activeEffects structure
    if (!player.activeEffects) player.activeEffects = {};
    if (!player.activeEffects.consumables) player.activeEffects.consumables = [];

    // Calculate duration
    let duration = 1; // default 1 lesson
    if (effect.lessonCount) duration = effect.lessonCount;
    else if (effect.duration === 'lesson') duration = 1;

    const activeEffect = {
      id: itemId,
      name: definition.name,
      icon: definition.icon,
      remainingDuration: duration,
      effects: {}
    };

    if (effect.xpMultiplier) {
      activeEffect.effects.xpMultiplier = effect.xpMultiplier;
      results.push(`${effect.xpMultiplier}x XP for ${duration} lesson(s)`);
    }
    if (effect.xpBonus) {
      activeEffect.effects.xpBonus = effect.xpBonus;
      results.push(`+${Math.round(effect.xpBonus * 100)}% XP for ${duration} lesson(s)`);
    }
    if (effect.damageReduction) {
      activeEffect.effects.damageReduction = effect.damageReduction;
      results.push(`${Math.round(effect.damageReduction * 100)}% damage reduction for ${duration} lesson(s)`);
    }
    if (effect.hintCharges) {
      activeEffect.effects.hintCharges = effect.hintCharges;
      results.push(`+${effect.hintCharges} hint charge(s)`);
    }

    // Add to active effects (replace if same item type already active)
    const existingIndex = player.activeEffects.consumables.findIndex(e => e.id === itemId);
    if (existingIndex >= 0) {
      player.activeEffects.consumables[existingIndex] = activeEffect;
    } else {
      player.activeEffects.consumables.push(activeEffect);
    }

    console.log(`[ItemManager] Applied temporary effect from ${definition.name}:`, activeEffect);
  }

  /**
   * Get active consumable bonus by type
   * @param {string} bonusType - 'xpMultiplier', 'xpBonus', 'damageReduction', 'hintCharges'
   * @returns {number} The combined bonus value
   */
  getActiveConsumableBonus(bonusType) {
    const consumables = this.state.player.activeEffects?.consumables || [];
    let total = bonusType === 'xpMultiplier' ? 1 : 0;

    for (const effect of consumables) {
      if (effect.effects && effect.effects[bonusType]) {
        if (bonusType === 'xpMultiplier') {
          total *= effect.effects[bonusType];
        } else {
          total += effect.effects[bonusType];
        }
      }
    }
    return total;
  }

  /**
   * Decrement consumable effect durations (call at end of each lesson)
   */
  decrementConsumableEffects() {
    const consumables = this.state.player.activeEffects?.consumables;
    if (!consumables || consumables.length === 0) return;

    const expired = [];
    this.state.player.activeEffects.consumables = consumables.filter(effect => {
      effect.remainingDuration--;
      if (effect.remainingDuration <= 0) {
        expired.push(effect);
        return false;
      }
      return true;
    });

    // Notify expiration
    for (const effect of expired) {
      if (typeof showNotification === 'function') {
        showNotification(`${effect.icon} ${effect.name} has worn off`, 'info');
      }
      console.log(`[ItemManager] Effect expired: ${effect.name}`);
    }

    // Update UI to remove expired effects
    if (typeof updateUI === 'function') {
      updateUI();
    }
  }

  // ===================================================
  // Inventory Queries
  // ===================================================

  /**
   * Get all items in inventory by category
   */
  getInventoryByCategory(category) {
    return this.getInventory()
      .map(item => ({
        ...item,
        definition: this.getDefinition(item.id)
      }))
      .filter(item => item.definition && item.definition.category === category);
  }

  /**
   * Get all equipment in inventory
   */
  getEquipmentInInventory() {
    return this.getInventoryByCategory(ItemCategory.EQUIPMENT);
  }

  /**
   * Get all consumables in inventory
   */
  getConsumablesInInventory() {
    return this.getInventoryByCategory(ItemCategory.CONSUMABLE);
  }

  /**
   * Get all quest items in inventory
   */
  getQuestItemsInInventory() {
    return this.getInventoryByCategory(ItemCategory.QUEST_ITEM);
  }

  /**
   * Get all collectibles in inventory
   */
  getCollectiblesInInventory() {
    return this.getInventoryByCategory(ItemCategory.COLLECTIBLE);
  }

  /**
   * Get inventory summary (counts by category)
   */
  getInventorySummary() {
    const inventory = this.getInventory();
    const summary = {
      total: inventory.length,
      byCategory: {},
      byRarity: {}
    };

    for (const item of inventory) {
      const definition = this.getDefinition(item.id);
      if (definition) {
        // Count by category
        summary.byCategory[definition.category] = (summary.byCategory[definition.category] || 0) + 1;
        // Count by rarity
        summary.byRarity[definition.rarity] = (summary.byRarity[definition.rarity] || 0) + 1;
      }
    }

    return summary;
  }
}

// =====================================================
// Helper Functions
// =====================================================

/**
 * Get category info
 */
function getItemCategoryInfo(category) {
  return ItemCategoryInfo[category];
}

/**
 * Get equipment slot info
 */
function getEquipmentSlotInfo(slot) {
  return EquipmentSlotInfo[slot];
}

/**
 * Get rarity info
 */
function getItemRarityInfo(rarity) {
  return ItemRarityInfo[rarity];
}

/**
 * Sort items by rarity (highest first)
 */
function sortByRarity(items) {
  return [...items].sort((a, b) => {
    const rarityA = ItemRarityInfo[a.rarity]?.order || 0;
    const rarityB = ItemRarityInfo[b.rarity]?.order || 0;
    return rarityB - rarityA;
  });
}

/**
 * Format item name with rarity color
 */
function formatItemName(item) {
  const rarityInfo = ItemRarityInfo[item.rarity];
  return {
    name: item.name,
    color: rarityInfo ? rarityInfo.color : '#ffffff'
  };
}

// =====================================================
// Base Item Definitions
// =====================================================

const ITEM_DEFINITIONS = {
  // Starting items
  basic_staff: {
    id: 'basic_staff',
    name: 'Wooden Staff',
    icon: '🪄',
    type: 'weapon',
    category: ItemCategory.EQUIPMENT,
    equipmentSlot: EquipmentSlot.WEAPON,
    rarity: ItemRarity.COMMON,
    description: 'A simple staff for beginners',
    stats: { wisdom: 2 }
  },
  healing_potion: {
    id: 'healing_potion',
    name: 'Healing Potion',
    icon: '🧪',
    type: 'consumable',
    category: ItemCategory.CONSUMABLE,
    rarity: ItemRarity.COMMON,
    description: 'Restores 30 HP',
    effect: { heal: 30 }
  },

  // Elder Maren's Shop Items
  scroll_of_insight: {
    id: 'scroll_of_insight',
    name: 'Scroll of Insight',
    icon: '📜',
    type: 'consumable',
    category: ItemCategory.CONSUMABLE,
    rarity: ItemRarity.COMMON,
    description: 'Grants +1 hint charge for your next lesson',
    value: 15,
    effect: { hintCharges: 1 }
  },
  memory_tonic: {
    id: 'memory_tonic',
    name: 'Memory Tonic',
    icon: '🧴',
    type: 'consumable',
    category: ItemCategory.CONSUMABLE,
    rarity: ItemRarity.COMMON,
    description: 'Doubles XP gained in your next lesson',
    value: 12,
    effect: { xpMultiplier: 2, duration: 'lesson' }
  },
  focus_candle: {
    id: 'focus_candle',
    name: 'Focus Candle',
    icon: '🕯️',
    type: 'consumable',
    category: ItemCategory.CONSUMABLE,
    rarity: ItemRarity.COMMON,
    description: 'Reduces HP damage from wrong answers by 50% for one lesson',
    value: 8,
    effect: { damageReduction: 0.5, duration: 'lesson' }
  },
  elder_blessing: {
    id: 'elder_blessing',
    name: "Elder's Blessing",
    icon: '✨',
    type: 'consumable',
    category: ItemCategory.CONSUMABLE,
    rarity: ItemRarity.RARE,
    description: 'Fully restores HP and grants +25% XP for your next 3 lessons',
    value: 50,
    effect: { fullHeal: true, xpBonus: 0.25, lessonCount: 3 }
  },

  // =====================================================
  // Ancient Texts (for Translation Quests)
  // =====================================================
  ancient_text_herbalist: {
    id: 'ancient_text_herbalist',
    name: "Herbalist's Journal",
    icon: '📗',
    type: 'quest_item',
    category: ItemCategory.QUEST_ITEM,
    rarity: ItemRarity.RARE,
    description: 'A weathered journal filled with botanical sketches. Bring to the Memory Shrine to translate.',
    translationQuest: 'herbalists_journal'
  },
  ancient_text_fisherman: {
    id: 'ancient_text_fisherman',
    name: "Fisherman's Log",
    icon: '📘',
    type: 'quest_item',
    category: ItemCategory.QUEST_ITEM,
    rarity: ItemRarity.RARE,
    description: 'A salt-stained logbook detailing prime fishing spots. Bring to the Memory Shrine to translate.',
    translationQuest: 'fishermans_log'
  },
  ancient_text_miner: {
    id: 'ancient_text_miner',
    name: "Miner's Map",
    icon: '📜',
    type: 'quest_item',
    category: ItemCategory.QUEST_ITEM,
    rarity: ItemRarity.RARE,
    description: 'A torn map marking ore veins deep underground. Bring to the Memory Shrine to translate.',
    translationQuest: 'miners_map'
  },
  ancient_text_merchant: {
    id: 'ancient_text_merchant',
    name: "Merchant's Ledger",
    icon: '📕',
    type: 'quest_item',
    category: ItemCategory.QUEST_ITEM,
    rarity: ItemRarity.RARE,
    description: 'An old ledger with trade secrets and contacts. Bring to the Memory Shrine to translate.',
    translationQuest: 'merchants_ledger'
  },
  ancient_text_recipes: {
    id: 'ancient_text_recipes',
    name: 'Old Recipe Book',
    icon: '📙',
    type: 'quest_item',
    category: ItemCategory.QUEST_ITEM,
    rarity: ItemRarity.RARE,
    description: 'A cookbook with forgotten culinary traditions. Bring to the Memory Shrine to translate.',
    translationQuest: 'old_recipe_book'
  },
  ancient_text_crafter: {
    id: 'ancient_text_crafter',
    name: "Crafter's Manual",
    icon: '📓',
    type: 'quest_item',
    category: ItemCategory.QUEST_ITEM,
    rarity: ItemRarity.RARE,
    description: 'Detailed instructions for advanced crafting techniques. Bring to the Memory Shrine to translate.',
    translationQuest: 'crafters_manual'
  },

  // Monument Shards (currency for building monuments)
  monument_shard: {
    id: 'monument_shard',
    name: 'Monument Shard',
    icon: '🔷',
    type: 'crafting_material',
    category: ItemCategory.CRAFTING_MATERIAL,
    rarity: ItemRarity.RARE,
    description: 'A mystical shard used to construct Language Monuments. Earned from translating ancient texts.',
    stackable: true
  }
};

// =====================================================
// Item System Initialization
// =====================================================

/**
 * Initialize item system and register items into GAME_DATA
 */
function initItemSystem() {
  if (typeof GAME_DATA === 'undefined') {
    console.warn('[ItemSystem] GAME_DATA not available');
    return;
  }

  // Ensure GAME_DATA.items exists
  if (!GAME_DATA.items) {
    GAME_DATA.items = {};
  }

  // Register base item definitions
  Object.assign(GAME_DATA.items, ITEM_DEFINITIONS);
  console.log('[ItemSystem] Registered items:', Object.keys(ITEM_DEFINITIONS).join(', '));
}

// Auto-initialize when script loads
initItemSystem();

// Make globally accessible
window.ITEM_DEFINITIONS = ITEM_DEFINITIONS;
window.initItemSystem = initItemSystem;

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ItemCategory,
    ItemCategoryInfo,
    EquipmentSlot,
    EquipmentSlotInfo,
    ItemRarity,
    ItemRarityInfo,
    EQUIPMENT_SETS,
    ITEM_DEFINITIONS,
    createItemTemplate,
    ItemManager,
    getItemCategoryInfo,
    getEquipmentSlotInfo,
    getItemRarityInfo,
    sortByRarity,
    formatItemName,
    initItemSystem
  };
}
