// ByteQuest - Trade Network System
// Zone 3 (Lurenium) exclusive trading feature
// Accept contracts from Merchant Liselle, deliver goods for rewards

// =====================================================
// Constants
// =====================================================

const TradeRank = {
  NEWCOMER: 'newcomer',
  TRADER: 'trader',
  MERCHANT: 'merchant',
  PARTNER: 'partner'
};

const TRADE_RANK_THRESHOLDS = {
  [TradeRank.NEWCOMER]: { contracts: 0, name: 'Newcomer', icon: '📦' },
  [TradeRank.TRADER]: { contracts: 5, name: 'Trader', icon: '🏪' },
  [TradeRank.MERCHANT]: { contracts: 15, name: 'Merchant', icon: '💰' },
  [TradeRank.PARTNER]: { contracts: 30, name: 'Trade Partner', icon: '🤝' }
};

// =====================================================
// Contract Definitions
// =====================================================

const TRADE_CONTRACTS = {
  // ===================================================
  // Tier 1 - Newcomer Contracts (Basic materials)
  // ===================================================

  timber_shipment: {
    id: 'timber_shipment',
    name: 'Timber Shipment',
    description: 'The carpenters guild needs lumber for repairs.',
    icon: '🪵',
    tier: 1,
    rankRequired: TradeRank.NEWCOMER,
    requirements: [
      { itemId: 'pine_log', amount: 10 }
    ],
    rewards: {
      gold: 75,
      merchantRep: 10
    },
    dialogue: {
      offer: "The carpenters need timber. Bring me 10 pine logs and I'll pay well.",
      turnIn: "Excellent quality lumber. Here's your payment."
    }
  },

  ore_delivery: {
    id: 'ore_delivery',
    name: 'Ore Delivery',
    description: 'The smiths are running low on copper.',
    icon: '🪨',
    tier: 1,
    rankRequired: TradeRank.NEWCOMER,
    requirements: [
      { itemId: 'copper_chunk', amount: 8 }
    ],
    rewards: {
      gold: 60,
      merchantRep: 10
    },
    dialogue: {
      offer: "The smithing quarter needs copper ore. 8 chunks should do.",
      turnIn: "The smiths will be pleased. Payment as promised."
    }
  },

  herb_collection: {
    id: 'herb_collection',
    name: 'Herb Collection',
    description: 'Apothecaries require fresh herbs.',
    icon: '🌿',
    tier: 1,
    rankRequired: TradeRank.NEWCOMER,
    requirements: [
      { itemId: 'meadow_leaf', amount: 15 }
    ],
    rewards: {
      gold: 50,
      merchantRep: 10
    },
    dialogue: {
      offer: "The apothecaries are always in need of meadow leaves. 15 should suffice.",
      turnIn: "Fresh and fragrant. Perfect for their remedies."
    }
  },

  fish_market: {
    id: 'fish_market',
    name: 'Fish for Market',
    description: 'The morning market needs fresh fish.',
    icon: '🐟',
    tier: 1,
    rankRequired: TradeRank.NEWCOMER,
    requirements: [
      { itemId: 'river_perch', amount: 5 }
    ],
    rewards: {
      gold: 40,
      merchantRep: 8
    },
    dialogue: {
      offer: "Fresh fish sells quickly at market. Bring me 5 river perch.",
      turnIn: "These will sell before noon. Well done."
    }
  },

  // ===================================================
  // Tier 2 - Trader Contracts (Mixed/Crafted goods)
  // ===================================================

  provisions_order: {
    id: 'provisions_order',
    name: 'Provisions Order',
    description: 'A caravan needs prepared food for their journey.',
    icon: '🍲',
    tier: 2,
    rankRequired: TradeRank.TRADER,
    requirements: [
      { itemId: 'grilled_perch', amount: 3 },
      { itemId: 'herb_salad', amount: 3 }
    ],
    rewards: {
      gold: 120,
      merchantRep: 15
    },
    dialogue: {
      offer: "A caravan departs tomorrow. They need 3 grilled perch and 3 herb salads.",
      turnIn: "The caravan master sends his thanks. Here's your payment plus a bonus."
    }
  },

  leather_goods: {
    id: 'leather_goods',
    name: 'Leather Goods',
    description: 'The guards need new equipment.',
    icon: '🥾',
    tier: 2,
    rankRequired: TradeRank.TRADER,
    requirements: [
      { itemId: 'boar_hide', amount: 8 }
    ],
    rewards: {
      gold: 100,
      merchantRep: 15
    },
    dialogue: {
      offer: "Captain Varro's men need new boots. 8 boar hides should cover it.",
      turnIn: "Quality leather. The guards will march in comfort."
    }
  },

  bulk_timber: {
    id: 'bulk_timber',
    name: 'Bulk Timber Order',
    description: 'A major construction project requires materials.',
    icon: '🏗️',
    tier: 2,
    rankRequired: TradeRank.TRADER,
    requirements: [
      { itemId: 'pine_log', amount: 25 },
      { itemId: 'oak_timber', amount: 10 }
    ],
    rewards: {
      gold: 200,
      merchantRep: 20
    },
    dialogue: {
      offer: "The archives are expanding. I need 25 pine logs and 10 oak timber.",
      turnIn: "Archivist Thelon will be most pleased. Generous payment for you."
    }
  },

  potion_supplies: {
    id: 'potion_supplies',
    name: 'Potion Supplies',
    description: 'The temple needs healing supplies.',
    icon: '🧪',
    tier: 2,
    rankRequired: TradeRank.TRADER,
    requirements: [
      { itemId: 'health_potion', amount: 5 }
    ],
    rewards: {
      gold: 90,
      merchantRep: 15
    },
    dialogue: {
      offer: "Brother Cassius requested healing potions for the temple. 5 should help.",
      turnIn: "The temple thanks you for your generosity."
    }
  },

  // ===================================================
  // Tier 3 - Merchant Contracts (Larger orders)
  // ===================================================

  feast_preparation: {
    id: 'feast_preparation',
    name: 'Feast Preparation',
    description: 'The Magistrate is hosting a banquet.',
    icon: '🍽️',
    tier: 3,
    rankRequired: TradeRank.MERCHANT,
    requirements: [
      { itemId: 'grilled_perch', amount: 5 },
      { itemId: 'fishermans_stew', amount: 3 },
      { itemId: 'herb_salad', amount: 5 }
    ],
    rewards: {
      gold: 300,
      merchantRep: 30
    },
    dialogue: {
      offer: "Magistrate Corinne hosts foreign dignitaries. I need quite the spread.",
      turnIn: "Magnificent! The Magistrate will remember this service."
    }
  },

  military_contract: {
    id: 'military_contract',
    name: 'Military Contract',
    description: 'The city guard needs equipment.',
    icon: '⚔️',
    tier: 3,
    rankRequired: TradeRank.MERCHANT,
    requirements: [
      { itemId: 'copper_chunk', amount: 20 },
      { itemId: 'iron_ore', amount: 10 },
      { itemId: 'wolf_pelt', amount: 5 }
    ],
    rewards: {
      gold: 350,
      merchantRep: 35
    },
    dialogue: {
      offer: "Captain Varro is re-equipping his men. This is a substantial order.",
      turnIn: "The Old Guard will be well-equipped. Here's your substantial payment."
    }
  },

  archive_restoration: {
    id: 'archive_restoration',
    name: 'Archive Restoration',
    description: 'The sealed archives need preservation materials.',
    icon: '📚',
    tier: 3,
    rankRequired: TradeRank.MERCHANT,
    requirements: [
      { itemId: 'oak_timber', amount: 15 },
      { itemId: 'meadow_leaf', amount: 20 },
      { itemId: 'sunpetal', amount: 5 }
    ],
    rewards: {
      gold: 280,
      merchantRep: 30,
      items: [{ itemId: 'archive_access_token', amount: 1 }]
    },
    dialogue: {
      offer: "Thelon needs materials to preserve ancient documents. Delicate work.",
      turnIn: "The Archivist sends this token of appreciation. You may find it... useful."
    }
  },

  // ===================================================
  // Tier 4 - Partner Contracts (Premium/Exclusive)
  // ===================================================

  golden_shipment: {
    id: 'golden_shipment',
    name: 'Golden Shipment',
    description: 'A valuable trade agreement with a distant city.',
    icon: '✨',
    tier: 4,
    rankRequired: TradeRank.PARTNER,
    requirements: [
      { itemId: 'silver_bar', amount: 5 },
      { itemId: 'bear_fur', amount: 3 },
      { itemId: 'ironwood', amount: 5 }
    ],
    rewards: {
      gold: 500,
      merchantRep: 50
    },
    dialogue: {
      offer: "I have contacts in the northern cities. This shipment could make us both wealthy.",
      turnIn: "A successful venture! Our partnership grows stronger."
    }
  },

  rare_ingredients: {
    id: 'rare_ingredients',
    name: 'Rare Ingredients',
    description: 'Exotic materials for the Magistrate\'s private collection.',
    icon: '💎',
    tier: 4,
    rankRequired: TradeRank.PARTNER,
    requirements: [
      { itemId: 'moonblossom', amount: 8 },
      { itemId: 'silver_vein', amount: 5 },
      { itemId: 'sea_bass', amount: 5 }
    ],
    rewards: {
      gold: 600,
      merchantRep: 50,
      items: [{ itemId: 'lurenium_trade_seal', amount: 1 }]
    },
    dialogue: {
      offer: "The Magistrate collects rare materials. This contract is... discreet.",
      turnIn: "You've proven yourself a true partner. This seal grants you special privileges."
    }
  }
};

// =====================================================
// Trade Network Manager
// =====================================================

class TradeNetworkManager {
  constructor(gameState) {
    this.state = gameState;
    this.initialize();
  }

  // ===================================================
  // Initialization
  // ===================================================

  initialize() {
    if (!this.state.player.tradeNetwork) {
      this.state.player.tradeNetwork = {
        merchantRep: 0,
        contractsCompleted: 0,
        activeContracts: [],  // Array of contract IDs
        completedContracts: [], // History of completed contracts
        unlockedRewards: []
      };
    }
    console.log('[TradeNetwork] Initialized. Contracts completed:', this.state.player.tradeNetwork.contractsCompleted);
  }

  // ===================================================
  // Access Control
  // ===================================================

  /**
   * Check if trade network is available (must be in Lurenium)
   */
  isAvailable() {
    if (typeof locationManager !== 'undefined') {
      const currentLocation = locationManager.getCurrentLocation();
      return currentLocation === 'lurenium';
    }
    return false;
  }

  /**
   * Check if player can access the trade network at all
   */
  hasUnlocked() {
    // Must have visited Lurenium at least once
    if (typeof locationManager !== 'undefined') {
      const discovered = this.state.player.locations?.discovered || [];
      return discovered.includes('lurenium');
    }
    return false;
  }

  // ===================================================
  // Rank System
  // ===================================================

  /**
   * Get current merchant rank
   */
  getCurrentRank() {
    const completed = this.state.player.tradeNetwork?.contractsCompleted || 0;

    if (completed >= TRADE_RANK_THRESHOLDS[TradeRank.PARTNER].contracts) {
      return TradeRank.PARTNER;
    } else if (completed >= TRADE_RANK_THRESHOLDS[TradeRank.MERCHANT].contracts) {
      return TradeRank.MERCHANT;
    } else if (completed >= TRADE_RANK_THRESHOLDS[TradeRank.TRADER].contracts) {
      return TradeRank.TRADER;
    }
    return TradeRank.NEWCOMER;
  }

  /**
   * Get rank info for display
   */
  getRankInfo() {
    const rank = this.getCurrentRank();
    const rankData = TRADE_RANK_THRESHOLDS[rank];
    const completed = this.state.player.tradeNetwork?.contractsCompleted || 0;

    // Find next rank
    const ranks = [TradeRank.NEWCOMER, TradeRank.TRADER, TradeRank.MERCHANT, TradeRank.PARTNER];
    const currentIndex = ranks.indexOf(rank);
    const nextRank = currentIndex < ranks.length - 1 ? ranks[currentIndex + 1] : null;
    const nextRankData = nextRank ? TRADE_RANK_THRESHOLDS[nextRank] : null;

    return {
      rank,
      name: rankData.name,
      icon: rankData.icon,
      contractsCompleted: completed,
      nextRank: nextRank,
      nextRankName: nextRankData?.name,
      contractsToNext: nextRankData ? nextRankData.contracts - completed : 0,
      isMaxRank: !nextRank
    };
  }

  // ===================================================
  // Contract Management
  // ===================================================

  /**
   * Get all contracts available to player based on rank
   */
  getAvailableContracts() {
    const rank = this.getCurrentRank();
    const activeIds = this.state.player.tradeNetwork?.activeContracts || [];

    return Object.values(TRADE_CONTRACTS).filter(contract => {
      // Check rank requirement
      const rankOrder = [TradeRank.NEWCOMER, TradeRank.TRADER, TradeRank.MERCHANT, TradeRank.PARTNER];
      const playerRankIndex = rankOrder.indexOf(rank);
      const requiredRankIndex = rankOrder.indexOf(contract.rankRequired);

      if (requiredRankIndex > playerRankIndex) return false;

      // Check if already active
      if (activeIds.includes(contract.id)) return false;

      return true;
    });
  }

  /**
   * Get player's active contracts
   */
  getActiveContracts() {
    const activeIds = this.state.player.tradeNetwork?.activeContracts || [];
    return activeIds.map(id => TRADE_CONTRACTS[id]).filter(c => c);
  }

  /**
   * Accept a contract
   */
  acceptContract(contractId) {
    const contract = TRADE_CONTRACTS[contractId];
    if (!contract) {
      console.error('[TradeNetwork] Contract not found:', contractId);
      return { success: false, error: 'Contract not found' };
    }

    // Check if already active
    if (this.state.player.tradeNetwork.activeContracts.includes(contractId)) {
      return { success: false, error: 'Contract already active' };
    }

    // Check rank
    const rankOrder = [TradeRank.NEWCOMER, TradeRank.TRADER, TradeRank.MERCHANT, TradeRank.PARTNER];
    const playerRankIndex = rankOrder.indexOf(this.getCurrentRank());
    const requiredRankIndex = rankOrder.indexOf(contract.rankRequired);

    if (requiredRankIndex > playerRankIndex) {
      return { success: false, error: 'Rank too low' };
    }

    this.state.player.tradeNetwork.activeContracts.push(contractId);
    console.log('[TradeNetwork] Accepted contract:', contractId);

    return { success: true, contract };
  }

  /**
   * Check if player can fulfill a contract
   */
  canFulfillContract(contractId) {
    const contract = TRADE_CONTRACTS[contractId];
    if (!contract) return { canFulfill: false, missing: [] };

    const missing = [];

    for (const req of contract.requirements) {
      const owned = this._getItemCount(req.itemId);
      if (owned < req.amount) {
        missing.push({
          itemId: req.itemId,
          required: req.amount,
          owned: owned,
          need: req.amount - owned
        });
      }
    }

    return {
      canFulfill: missing.length === 0,
      missing
    };
  }

  /**
   * Get contract progress for display
   */
  getContractProgress(contractId) {
    const contract = TRADE_CONTRACTS[contractId];
    if (!contract) return null;

    const progress = contract.requirements.map(req => ({
      itemId: req.itemId,
      itemName: this._getItemName(req.itemId),
      required: req.amount,
      owned: this._getItemCount(req.itemId)
    }));

    return {
      contract,
      progress,
      isComplete: progress.every(p => p.owned >= p.required)
    };
  }

  /**
   * Fulfill/complete a contract
   */
  fulfillContract(contractId) {
    const contract = TRADE_CONTRACTS[contractId];
    if (!contract) {
      return { success: false, error: 'Contract not found' };
    }

    // Check if active
    if (!this.state.player.tradeNetwork.activeContracts.includes(contractId)) {
      return { success: false, error: 'Contract not active' };
    }

    // Check if can fulfill
    const { canFulfill, missing } = this.canFulfillContract(contractId);
    if (!canFulfill) {
      return { success: false, error: 'Missing items', missing };
    }

    // Remove items from inventory
    for (const req of contract.requirements) {
      this._removeItems(req.itemId, req.amount);
    }

    // Grant rewards
    const rewards = this._grantRewards(contract.rewards);

    // Update tracking
    this.state.player.tradeNetwork.activeContracts =
      this.state.player.tradeNetwork.activeContracts.filter(id => id !== contractId);
    this.state.player.tradeNetwork.contractsCompleted++;
    this.state.player.tradeNetwork.completedContracts.push({
      contractId,
      completedAt: Date.now()
    });

    // Check for rank up
    const oldRank = this.getCurrentRank();
    const rankInfo = this.getRankInfo();
    const rankedUp = oldRank !== this.getCurrentRank();

    console.log('[TradeNetwork] Contract fulfilled:', contractId, 'Total:', this.state.player.tradeNetwork.contractsCompleted);

    return {
      success: true,
      contract,
      rewards,
      rankedUp,
      newRank: rankedUp ? rankInfo : null
    };
  }

  /**
   * Abandon a contract (no penalty)
   */
  abandonContract(contractId) {
    if (!this.state.player.tradeNetwork.activeContracts.includes(contractId)) {
      return { success: false, error: 'Contract not active' };
    }

    this.state.player.tradeNetwork.activeContracts =
      this.state.player.tradeNetwork.activeContracts.filter(id => id !== contractId);

    console.log('[TradeNetwork] Contract abandoned:', contractId);
    return { success: true };
  }

  // ===================================================
  // Helper Methods
  // ===================================================

  _getItemCount(itemId) {
    if (typeof inventoryManager !== 'undefined' && inventoryManager.getItemCount) {
      return inventoryManager.getItemCount(itemId);
    }
    // Fallback to direct state check
    const inventory = this.state.player.inventory || [];
    const item = inventory.find(i => i.id === itemId || i.itemId === itemId);
    return item?.quantity || item?.amount || 0;
  }

  _getItemName(itemId) {
    if (typeof ITEM_DEFINITIONS !== 'undefined' && ITEM_DEFINITIONS[itemId]) {
      return ITEM_DEFINITIONS[itemId].name;
    }
    // Format item ID as readable name
    return itemId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  _removeItems(itemId, amount) {
    if (typeof inventoryManager !== 'undefined' && inventoryManager.removeItem) {
      inventoryManager.removeItem(itemId, amount);
    } else {
      // Fallback
      const inventory = this.state.player.inventory || [];
      const item = inventory.find(i => i.id === itemId || i.itemId === itemId);
      if (item) {
        item.quantity = (item.quantity || item.amount || 0) - amount;
        if (item.quantity <= 0) {
          const index = inventory.indexOf(item);
          if (index > -1) inventory.splice(index, 1);
        }
      }
    }
  }

  _grantRewards(rewards) {
    const granted = {
      gold: 0,
      merchantRep: 0,
      items: []
    };

    // Gold
    if (rewards.gold) {
      if (typeof addGold === 'function') {
        addGold(rewards.gold);
      } else {
        this.state.player.gold = (this.state.player.gold || 0) + rewards.gold;
      }
      granted.gold = rewards.gold;
    }

    // Merchant rep
    if (rewards.merchantRep) {
      this.state.player.tradeNetwork.merchantRep += rewards.merchantRep;
      granted.merchantRep = rewards.merchantRep;
    }

    // Items
    if (rewards.items) {
      for (const item of rewards.items) {
        if (typeof inventoryManager !== 'undefined' && inventoryManager.addItem) {
          inventoryManager.addItem(item.itemId, item.amount);
        }
        granted.items.push(item);
      }
    }

    return granted;
  }

  // ===================================================
  // Stats for UI
  // ===================================================

  getTradeStats() {
    const data = this.state.player.tradeNetwork || {};
    return {
      merchantRep: data.merchantRep || 0,
      contractsCompleted: data.contractsCompleted || 0,
      activeContracts: (data.activeContracts || []).length,
      rank: this.getRankInfo()
    };
  }
}

// =====================================================
// Global Instance & Exports
// =====================================================

let tradeNetworkManager = null;

function initTradeNetwork(gameState) {
  tradeNetworkManager = new TradeNetworkManager(gameState);
  window.tradeNetworkManager = tradeNetworkManager;
  return tradeNetworkManager;
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TradeRank,
    TRADE_RANK_THRESHOLDS,
    TRADE_CONTRACTS,
    TradeNetworkManager,
    initTradeNetwork
  };
}

// Global exports
window.TradeRank = TradeRank;
window.TRADE_RANK_THRESHOLDS = TRADE_RANK_THRESHOLDS;
window.TRADE_CONTRACTS = TRADE_CONTRACTS;
window.TradeNetworkManager = TradeNetworkManager;
window.initTradeNetwork = initTradeNetwork;

console.log('[tradeNetworkSystem.js] Trade Network system loaded');
