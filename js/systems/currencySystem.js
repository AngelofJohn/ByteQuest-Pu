// ByteQuest - Currency System
// Centralized management for all in-game currencies

// =====================================================
// Currency Definitions
// =====================================================

const CurrencyType = {
  GOLD: 'gold',
  GEMS: 'gems',
  TOKENS: 'tokens',           // Reputation/event tokens
  ESSENCE: 'essence',         // Premium/special currency
  DUST: 'dust'                // Crafting currency
};

const CURRENCY_DEFINITIONS = {
  [CurrencyType.GOLD]: {
    id: CurrencyType.GOLD,
    name: 'Gold',
    icon: '💰',
    color: '#ffd700',
    description: 'Standard currency earned from quests and activities.',
    cap: 999999,              // Maximum amount
    decimals: 0,              // No decimal places
    tradeable: true,
    sources: ['quests', 'lessons', 'gathering', 'selling'],
    sinks: ['shop', 'crafting', 'repairs', 'upgrades']
  },
  [CurrencyType.GEMS]: {
    id: CurrencyType.GEMS,
    name: 'Gems',
    icon: '💎',
    color: '#00bfff',
    description: 'Rare currency for special purchases.',
    cap: 99999,
    decimals: 0,
    tradeable: false,
    sources: ['achievements', 'milestones', 'events', 'daily_login'],
    sinks: ['cosmetics', 'boosts', 'premium_items']
  },
  [CurrencyType.TOKENS]: {
    id: CurrencyType.TOKENS,
    name: 'Tokens',
    icon: '🪙',
    color: '#c0c0c0',
    description: 'Faction and event tokens for special rewards.',
    cap: 9999,
    decimals: 0,
    tradeable: false,
    sources: ['reputation', 'events', 'daily_quests'],
    sinks: ['faction_shop', 'event_shop']
  },
  [CurrencyType.ESSENCE]: {
    id: CurrencyType.ESSENCE,
    name: 'Essence',
    icon: '✨',
    color: '#9966ff',
    description: 'Mystical essence for enchanting and special crafting.',
    cap: 9999,
    decimals: 0,
    tradeable: false,
    sources: ['boss_exams', 'perfect_lessons', 'rare_drops'],
    sinks: ['enchanting', 'artifact_upgrades']
  },
  [CurrencyType.DUST]: {
    id: CurrencyType.DUST,
    name: 'Dust',
    icon: '🌫️',
    color: '#a0a0a0',
    description: 'Crafting material from salvaging items.',
    cap: 99999,
    decimals: 0,
    tradeable: false,
    sources: ['salvaging', 'gathering', 'disenchanting'],
    sinks: ['crafting', 'repairs']
  }
};

// =====================================================
// Transaction Types
// =====================================================

const TransactionType = {
  // Gains
  QUEST_REWARD: 'quest_reward',
  LESSON_REWARD: 'lesson_reward',
  ACHIEVEMENT: 'achievement',
  MILESTONE: 'milestone',
  SELL_ITEM: 'sell_item',
  GATHERING: 'gathering',
  DAILY_LOGIN: 'daily_login',
  EVENT_REWARD: 'event_reward',
  BOSS_REWARD: 'boss_reward',
  GIFT: 'gift',

  // Losses
  PURCHASE: 'purchase',
  CRAFT: 'craft',
  REPAIR: 'repair',
  UPGRADE: 'upgrade',
  ENCHANT: 'enchant',
  TRAVEL: 'travel',
  DONATION: 'donation',
  PENALTY: 'penalty'
};

// =====================================================
// Currency Manager Class
// =====================================================

class CurrencyManager {
  constructor(gameState) {
    this.state = gameState;
    this.initialize();
    console.log('[CurrencyManager] Initialized');
  }

  /**
   * Initialize currency tracking in player state
   */
  initialize() {
    if (!this.state.player.currencies) {
      this.state.player.currencies = {};
    }

    // Ensure all currency types exist
    Object.values(CurrencyType).forEach(type => {
      if (this.state.player.currencies[type] === undefined) {
        this.state.player.currencies[type] = 0;
      }
    });

    // Sync gold between legacy player.gold and currencies.gold
    // Use the higher of the two values to prevent data loss on load
    const legacyGold = this.state.player.gold || 0;
    const currenciesGold = this.state.player.currencies.gold || 0;
    const actualGold = Math.max(legacyGold, currenciesGold);

    if (actualGold > 0) {
      this.state.player.currencies.gold = actualGold;
      this.state.player.gold = actualGold;
      if (legacyGold !== currenciesGold) {
        console.log('[CurrencyManager] Synced gold - legacy:', legacyGold, 'currencies:', currenciesGold, '-> using:', actualGold);
      }
    }

    // Initialize transaction history
    if (!this.state.player.currencyHistory) {
      this.state.player.currencyHistory = [];
    }

    // Initialize lifetime stats
    if (!this.state.player.currencyStats) {
      this.state.player.currencyStats = {};
      Object.values(CurrencyType).forEach(type => {
        this.state.player.currencyStats[type] = {
          totalEarned: 0,
          totalSpent: 0
        };
      });
    }
  }

  // ===================================================
  // Core Currency Operations
  // ===================================================

  /**
   * Get current amount of a currency
   * @param {string} currencyType - Currency type from CurrencyType enum
   * @returns {number}
   */
  get(currencyType) {
    return this.state.player.currencies[currencyType] || 0;
  }

  /**
   * Get all currencies
   * @returns {object}
   */
  getAll() {
    const result = {};
    Object.values(CurrencyType).forEach(type => {
      const def = CURRENCY_DEFINITIONS[type];
      result[type] = {
        amount: this.get(type),
        definition: def
      };
    });
    return result;
  }

  /**
   * Check if player can afford an amount
   * @param {string} currencyType
   * @param {number} amount
   * @returns {boolean}
   */
  canAfford(currencyType, amount) {
    return this.get(currencyType) >= amount;
  }

  /**
   * Check if player can afford multiple currencies
   * @param {object} costs - { gold: 100, gems: 5 }
   * @returns {boolean}
   */
  canAffordMultiple(costs) {
    for (const [type, amount] of Object.entries(costs)) {
      if (!this.canAfford(type, amount)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Add currency to player
   * @param {string} currencyType
   * @param {number} amount
   * @param {string} source - TransactionType for tracking
   * @param {object} metadata - Additional info (questId, itemId, etc.)
   * @returns {object} { success, newAmount, overflow }
   */
  add(currencyType, amount, source = TransactionType.GIFT, metadata = {}) {
    if (amount <= 0) {
      return { success: false, error: 'Amount must be positive' };
    }

    const def = CURRENCY_DEFINITIONS[currencyType];
    if (!def) {
      return { success: false, error: 'Invalid currency type' };
    }

    // Apply multipliers from account progression and class bonuses
    let finalAmount = amount;
    if (currencyType === CurrencyType.GOLD) {
      // Class bonus (e.g., Rogue +25%)
      if (this.state.goldMultiplier && this.state.goldMultiplier > 1) {
        finalAmount = Math.floor(finalAmount * this.state.goldMultiplier);
      }
      // Account progression bonus
      if (typeof accountProgression !== 'undefined') {
        const effects = accountProgression.getActiveEffects();
        if (effects.goldMultiplier && effects.goldMultiplier > 1) {
          finalAmount = Math.floor(finalAmount * effects.goldMultiplier);
        }
      }
    }

    const current = this.get(currencyType);
    let newAmount = current + finalAmount;
    let overflow = 0;

    // Apply cap
    if (newAmount > def.cap) {
      overflow = newAmount - def.cap;
      newAmount = def.cap;
    }

    this.state.player.currencies[currencyType] = newAmount;

    // Keep legacy gold in sync
    if (currencyType === CurrencyType.GOLD) {
      this.state.player.gold = newAmount;
    }

    // Update stats
    this.state.player.currencyStats[currencyType].totalEarned += finalAmount - overflow;

    // Log transaction
    this._logTransaction(currencyType, finalAmount - overflow, source, metadata);

    return {
      success: true,
      amount: finalAmount - overflow,
      baseAmount: amount,
      bonusAmount: finalAmount - amount,
      newAmount,
      overflow
    };
  }

  /**
   * Remove currency from player
   * @param {string} currencyType
   * @param {number} amount
   * @param {string} reason - TransactionType for tracking
   * @param {object} metadata - Additional info
   * @returns {object} { success, newAmount }
   */
  remove(currencyType, amount, reason = TransactionType.PURCHASE, metadata = {}) {
    if (amount <= 0) {
      return { success: false, error: 'Amount must be positive' };
    }

    if (!this.canAfford(currencyType, amount)) {
      return { success: false, error: 'Insufficient funds' };
    }

    const current = this.get(currencyType);
    const newAmount = current - amount;

    this.state.player.currencies[currencyType] = newAmount;

    // Keep legacy gold in sync
    if (currencyType === CurrencyType.GOLD) {
      this.state.player.gold = newAmount;
      this.state.player.totalGoldSpent = (this.state.player.totalGoldSpent || 0) + amount;
    }

    // Update stats
    this.state.player.currencyStats[currencyType].totalSpent += amount;

    // Log transaction
    this._logTransaction(currencyType, -amount, reason, metadata);

    return {
      success: true,
      amount,
      newAmount
    };
  }

  /**
   * Spend multiple currencies at once (atomic operation)
   * @param {object} costs - { gold: 100, gems: 5 }
   * @param {string} reason
   * @param {object} metadata
   * @returns {object}
   */
  spendMultiple(costs, reason = TransactionType.PURCHASE, metadata = {}) {
    // First check if all can be afforded
    if (!this.canAffordMultiple(costs)) {
      const missing = {};
      for (const [type, amount] of Object.entries(costs)) {
        const deficit = amount - this.get(type);
        if (deficit > 0) {
          missing[type] = deficit;
        }
      }
      return { success: false, error: 'Insufficient funds', missing };
    }

    // Process all removals
    const results = {};
    for (const [type, amount] of Object.entries(costs)) {
      results[type] = this.remove(type, amount, reason, metadata);
    }

    return { success: true, results };
  }

  /**
   * Transfer currency between two currency types (conversion)
   * @param {string} fromType
   * @param {string} toType
   * @param {number} amount
   * @param {number} rate - How many toType per 1 fromType
   * @returns {object}
   */
  convert(fromType, toType, amount, rate) {
    const removeResult = this.remove(fromType, amount, TransactionType.UPGRADE, { conversion: true });
    if (!removeResult.success) {
      return removeResult;
    }

    const convertedAmount = Math.floor(amount * rate);
    const addResult = this.add(toType, convertedAmount, TransactionType.GIFT, { conversion: true, fromType });

    return {
      success: true,
      spent: amount,
      received: addResult.amount,
      rate
    };
  }

  // ===================================================
  // Convenience Methods (Gold shortcuts)
  // ===================================================

  /**
   * Add gold (convenience method)
   */
  addGold(amount, source = TransactionType.QUEST_REWARD, metadata = {}) {
    const result = this.add(CurrencyType.GOLD, amount, source, metadata);
    if (result.success && typeof showNotification === 'function') {
      if (result.bonusAmount > 0) {
        showNotification(`+${result.amount} gold (${result.baseAmount} + ${result.bonusAmount} bonus)`, 'success');
      } else {
        showNotification(`+${result.amount} gold`, 'success');
      }
    }
    if (typeof renderHUD === 'function') renderHUD();
    return result;
  }

  /**
   * Add gold silently (no notification)
   */
  addGoldSilent(amount, source = TransactionType.QUEST_REWARD, metadata = {}) {
    const result = this.add(CurrencyType.GOLD, amount, source, metadata);
    if (typeof renderHUD === 'function') renderHUD();
    return result;
  }

  /**
   * Spend gold
   */
  spendGold(amount, reason = TransactionType.PURCHASE, metadata = {}) {
    const result = this.remove(CurrencyType.GOLD, amount, reason, metadata);
    if (typeof renderHUD === 'function') renderHUD();
    return result;
  }

  /**
   * Get current gold
   */
  getGold() {
    return this.get(CurrencyType.GOLD);
  }

  /**
   * Check if can afford gold amount
   */
  canAffordGold(amount) {
    return this.canAfford(CurrencyType.GOLD, amount);
  }

  // ===================================================
  // Transaction History
  // ===================================================

  /**
   * Log a transaction to history
   * @private
   */
  _logTransaction(currencyType, amount, type, metadata = {}) {
    const transaction = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      currency: currencyType,
      amount,
      type,
      metadata,
      balance: this.get(currencyType)
    };

    this.state.player.currencyHistory.unshift(transaction);

    // Keep only last 100 transactions
    if (this.state.player.currencyHistory.length > 100) {
      this.state.player.currencyHistory = this.state.player.currencyHistory.slice(0, 100);
    }
  }

  /**
   * Get transaction history
   * @param {object} options - { currency, type, limit }
   * @returns {array}
   */
  getHistory(options = {}) {
    let history = [...this.state.player.currencyHistory];

    if (options.currency) {
      history = history.filter(t => t.currency === options.currency);
    }

    if (options.type) {
      history = history.filter(t => t.type === options.type);
    }

    if (options.limit) {
      history = history.slice(0, options.limit);
    }

    return history;
  }

  /**
   * Get lifetime stats for a currency
   */
  getStats(currencyType) {
    return this.state.player.currencyStats[currencyType] || { totalEarned: 0, totalSpent: 0 };
  }

  /**
   * Get all lifetime stats
   */
  getAllStats() {
    return this.state.player.currencyStats;
  }

  // ===================================================
  // Formatting Helpers
  // ===================================================

  /**
   * Format currency amount with icon
   * @param {string} currencyType
   * @param {number} amount
   * @returns {string}
   */
  format(currencyType, amount = null) {
    const def = CURRENCY_DEFINITIONS[currencyType];
    if (!def) return amount?.toString() || '0';

    const value = amount !== null ? amount : this.get(currencyType);
    return `${def.icon} ${this.formatNumber(value)}`;
  }

  /**
   * Format number with commas
   * @param {number} num
   * @returns {string}
   */
  formatNumber(num) {
    return num.toLocaleString();
  }

  /**
   * Get currency definition
   */
  getDefinition(currencyType) {
    return CURRENCY_DEFINITIONS[currencyType];
  }

  /**
   * Get all currency definitions
   */
  getAllDefinitions() {
    return CURRENCY_DEFINITIONS;
  }
}

// =====================================================
// Global Functions (for backwards compatibility)
// =====================================================

/**
 * Add gold (legacy support)
 */
function addGold(amount) {
  if (typeof currencyManager !== 'undefined' && currencyManager) {
    return currencyManager.addGold(amount, TransactionType.QUEST_REWARD);
  }
  // Fallback
  GameState.player.gold = (GameState.player.gold || 0) + amount;
  if (typeof showNotification === 'function') {
    showNotification(`+${amount} gold`, 'success');
  }
  if (typeof renderHUD === 'function') renderHUD();
  return { success: true, amount };
}

/**
 * Add gold silently (legacy support)
 */
function addGoldSilent(amount) {
  if (typeof currencyManager !== 'undefined' && currencyManager) {
    return currencyManager.addGoldSilent(amount, TransactionType.QUEST_REWARD);
  }
  // Fallback
  GameState.player.gold = (GameState.player.gold || 0) + amount;
  GameState.player.totalGoldEarned = (GameState.player.totalGoldEarned || 0) + amount;
  if (typeof renderHUD === 'function') renderHUD();
  return amount;
}

/**
 * Spend gold (legacy support)
 */
function spendGold(amount) {
  if (typeof currencyManager !== 'undefined' && currencyManager) {
    return currencyManager.spendGold(amount, TransactionType.PURCHASE);
  }
  // Fallback
  if ((GameState.player.gold || 0) < amount) {
    return { success: false, error: 'Insufficient funds' };
  }
  GameState.player.gold -= amount;
  GameState.player.totalGoldSpent = (GameState.player.totalGoldSpent || 0) + amount;
  if (typeof renderHUD === 'function') renderHUD();
  return { success: true, amount };
}

/**
 * Check if can afford (legacy support)
 */
function canAffordGold(amount) {
  if (typeof currencyManager !== 'undefined' && currencyManager) {
    return currencyManager.canAffordGold(amount);
  }
  return (GameState.player.gold || 0) >= amount;
}

/**
 * Show currency wallet screen
 */
function showCurrencyScreen() {
  if (typeof currencyManager === 'undefined' || !currencyManager) {
    showNotification('Currency system not available', 'error');
    return;
  }

  const currencies = currencyManager.getAll();
  const stats = currencyManager.getAllStats();

  const currenciesHtml = Object.entries(currencies).map(([type, data]) => {
    const def = data.definition;
    const typeStats = stats[type] || { totalEarned: 0, totalSpent: 0 };

    return `
      <div class="currency-card" style="border-color: ${def.color}">
        <div class="currency-header">
          <span class="currency-icon" style="color: ${def.color}">${def.icon}</span>
          <span class="currency-name">${def.name}</span>
        </div>
        <div class="currency-amount" style="color: ${def.color}">
          ${currencyManager.formatNumber(data.amount)}
        </div>
        <div class="currency-desc">${def.description}</div>
        <div class="currency-stats">
          <div class="stat-earned">Earned: ${currencyManager.formatNumber(typeStats.totalEarned)}</div>
          <div class="stat-spent">Spent: ${currencyManager.formatNumber(typeStats.totalSpent)}</div>
        </div>
      </div>
    `;
  }).join('');

  // Recent transactions
  const recentHistory = currencyManager.getHistory({ limit: 10 });
  const historyHtml = recentHistory.length > 0
    ? recentHistory.map(t => {
        const def = CURRENCY_DEFINITIONS[t.currency];
        const sign = t.amount > 0 ? '+' : '';
        const color = t.amount > 0 ? '#4ade80' : '#f87171';
        return `
          <div class="transaction-row">
            <span class="transaction-icon">${def.icon}</span>
            <span class="transaction-type">${t.type.replace(/_/g, ' ')}</span>
            <span class="transaction-amount" style="color: ${color}">${sign}${t.amount}</span>
          </div>
        `;
      }).join('')
    : '<div class="no-transactions">No recent transactions</div>';

  showModal('currency-modal', `
    <div class="currency-screen">
      <div class="currency-screen-header">
        <h2>💰 Wallet</h2>
      </div>

      <div class="currency-grid">
        ${currenciesHtml}
      </div>

      <div class="currency-history-section">
        <h3>Recent Transactions</h3>
        <div class="transaction-list">
          ${historyHtml}
        </div>
      </div>

      <div class="currency-footer">
        <button class="pixel-btn" onclick="hideModal('currency-modal')">Close</button>
      </div>
    </div>
  `);
}

// =====================================================
// Exports
// =====================================================

window.CurrencyManager = CurrencyManager;
window.CurrencyType = CurrencyType;
window.CURRENCY_DEFINITIONS = CURRENCY_DEFINITIONS;
window.TransactionType = TransactionType;
window.addGold = addGold;
window.addGoldSilent = addGoldSilent;
window.spendGold = spendGold;
window.canAffordGold = canAffordGold;
window.showCurrencyScreen = showCurrencyScreen;

console.log('[currencySystem.js] Currency system loaded');
