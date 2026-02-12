// ByteQuest - Resource Item Definitions
// Defines all gatherable resources from minigames (mining, woodcutting, hunting, herbalism, fishing)

const RESOURCE_ITEMS = {
  // ===== MINING =====
  copper_chunk: {
    id: 'copper_chunk',
    name: 'Copper Chunk',
    icon: '🪨',
    type: 'material',
    category: 'crafting_material',
    description: 'A rough chunk of copper ore. Used in smithing.',
    stackable: true,
    maxStack: 99,
    sellPrice: 3,
    craftingTier: 1
  },
  iron_ore: {
    id: 'iron_ore',
    name: 'Iron Ore',
    icon: '�ite',
    type: 'material',
    category: 'crafting_material',
    description: 'Dense iron ore. Essential for quality metalwork.',
    stackable: true,
    maxStack: 99,
    sellPrice: 8,
    craftingTier: 2
  },
  silver_vein: {
    id: 'silver_vein',
    name: 'Silver Vein',
    icon: '💎',
    type: 'material',
    category: 'crafting_material',
    description: 'Precious silver ore. Prized by jewelers.',
    stackable: true,
    maxStack: 99,
    sellPrice: 20,
    craftingTier: 3
  },

  // ===== WOODCUTTING =====
  pine_log: {
    id: 'pine_log',
    name: 'Pine Log',
    icon: '🪵',
    type: 'material',
    category: 'crafting_material',
    description: 'Common softwood. Good for basic construction.',
    stackable: true,
    maxStack: 99,
    sellPrice: 2,
    craftingTier: 1
  },
  oak_timber: {
    id: 'oak_timber',
    name: 'Oak Timber',
    icon: '🪵',
    type: 'material',
    category: 'crafting_material',
    description: 'Sturdy hardwood. Valued for furniture and weapons.',
    stackable: true,
    maxStack: 99,
    sellPrice: 7,
    craftingTier: 2
  },
  ironwood: {
    id: 'ironwood',
    name: 'Ironwood',
    icon: '🪵',
    type: 'material',
    category: 'crafting_material',
    description: 'Extremely dense wood, nearly as hard as metal.',
    stackable: true,
    maxStack: 99,
    sellPrice: 18,
    craftingTier: 3
  },

  // ===== HUNTING =====
  boar_hide: {
    id: 'boar_hide',
    name: 'Boar Hide',
    icon: '🐗',
    type: 'material',
    category: 'crafting_material',
    description: 'Tough hide from a wild boar. Used in leatherworking.',
    stackable: true,
    maxStack: 99,
    sellPrice: 4,
    craftingTier: 1
  },
  wolf_pelt: {
    id: 'wolf_pelt',
    name: 'Wolf Pelt',
    icon: '🐺',
    type: 'material',
    category: 'crafting_material',
    description: 'Thick wolf fur. Makes warm and durable clothing.',
    stackable: true,
    maxStack: 99,
    sellPrice: 10,
    craftingTier: 2
  },
  bear_fur: {
    id: 'bear_fur',
    name: 'Bear Fur',
    icon: '🐻',
    type: 'material',
    category: 'crafting_material',
    description: 'Luxurious bear pelt. The finest material for cloaks.',
    stackable: true,
    maxStack: 99,
    sellPrice: 25,
    craftingTier: 3
  },

  // ===== HERBALISM =====
  meadow_leaf: {
    id: 'meadow_leaf',
    name: 'Meadow Leaf',
    icon: '🌿',
    type: 'material',
    category: 'crafting_material',
    description: 'Common herb with mild healing properties.',
    stackable: true,
    maxStack: 99,
    sellPrice: 2,
    craftingTier: 1
  },
  sunpetal: {
    id: 'sunpetal',
    name: 'Sunpetal',
    icon: '🌻',
    type: 'material',
    category: 'crafting_material',
    description: 'Bright flower that blooms at midday. Used in potions.',
    stackable: true,
    maxStack: 99,
    sellPrice: 6,
    craftingTier: 2
  },
  moonblossom: {
    id: 'moonblossom',
    name: 'Moonblossom',
    icon: '🌸',
    type: 'material',
    category: 'crafting_material',
    description: 'Rare flower that only blooms under moonlight.',
    stackable: true,
    maxStack: 99,
    sellPrice: 15,
    craftingTier: 3
  },

  // ===== FISHING =====
  river_perch: {
    id: 'river_perch',
    name: 'River Perch',
    icon: '🐟',
    type: 'material',
    category: 'crafting_material',
    description: 'Common freshwater fish. Staple for cooking.',
    stackable: true,
    maxStack: 99,
    sellPrice: 3,
    craftingTier: 1
  },
  lake_trout: {
    id: 'lake_trout',
    name: 'Lake Trout',
    icon: '🐟',
    type: 'material',
    category: 'crafting_material',
    description: 'Delicious lake fish. Makes excellent meals.',
    stackable: true,
    maxStack: 99,
    sellPrice: 8,
    craftingTier: 2
  },
  sea_bass: {
    id: 'sea_bass',
    name: 'Sea Bass',
    icon: '🐠',
    type: 'material',
    category: 'crafting_material',
    description: 'Prized saltwater fish. A delicacy.',
    stackable: true,
    maxStack: 99,
    sellPrice: 18,
    craftingTier: 3
  },

  // ===== CRAFTING SUPPLIES =====
  empty_bottle: {
    id: 'empty_bottle',
    name: 'Empty Bottle',
    icon: '🧴',
    type: 'material',
    category: 'crafting_supply',
    description: 'A glass bottle for holding potions.',
    stackable: true,
    maxStack: 99,
    sellPrice: 2,
    craftingTier: 1
  }
};

// =====================================================
// Global Export
// =====================================================

window.RESOURCE_ITEMS = RESOURCE_ITEMS;

console.log('[resourceDefinitions.js] Resource items loaded:', Object.keys(RESOURCE_ITEMS).length, 'items');
