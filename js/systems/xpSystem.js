/**
 * ByteQuest - XP System
 * Handles all XP gain, level ups, and progression
 */

const XPSystem = {
  // XP curve configuration
  config: {
    baseXPToLevel: 100,      // XP needed for level 2
    xpScalingFactor: 1.5,    // Each level requires this much more XP
    maxLevel: 50
  },

  /**
   * Calculate XP required to reach a specific level
   */
  getXPForLevel(level) {
    if (level <= 1) return 0;
    return Math.floor(this.config.baseXPToLevel * Math.pow(this.config.xpScalingFactor, level - 2));
  },

  /**
   * Get the XP needed for the next level from current level
   */
  getXPToNextLevel(currentLevel) {
    return this.getXPForLevel(currentLevel + 1);
  },

  /**
   * Award XP to the player and handle level ups
   * @param {number} amount - Amount of XP to award
   * @param {string} source - Source of XP (for logging/display)
   * @returns {object} - Result containing xpGained, levelsGained, newLevel
   */
  awardXP(amount, source = 'unknown') {
    if (!GameState.player) {
      console.error('[XPSystem] No player in GameState');
      return { xpGained: 0, levelsGained: 0, newLevel: 1 };
    }

    const oldXP = GameState.player.xp || 0;
    const oldLevel = GameState.player.level || 1;

    // Add XP
    GameState.player.xp = oldXP + amount;
    console.log(`[XPSystem] XP awarded: +${amount} from ${source} (${oldXP} -> ${GameState.player.xp})`);

    // Check for level ups
    let levelsGained = 0;
    while (this._checkLevelUp()) {
      levelsGained++;
    }

    // Update HUD
    if (typeof renderHUD === 'function') {
      renderHUD();
    }

    const result = {
      xpGained: amount,
      levelsGained: levelsGained,
      oldLevel: oldLevel,
      newLevel: GameState.player.level,
      currentXP: GameState.player.xp,
      xpToNext: GameState.player.xpToNext
    };

    if (levelsGained > 0) {
      console.log(`[XPSystem] LEVEL UP! ${oldLevel} -> ${GameState.player.level}`);
      this._onLevelUp(oldLevel, GameState.player.level);
    }

    return result;
  },

  /**
   * Check if player has enough XP to level up, and process it
   * @returns {boolean} - True if a level up occurred
   */
  _checkLevelUp() {
    const player = GameState.player;
    if (!player) return false;

    // Ensure xpToNext is set
    if (!player.xpToNext) {
      player.xpToNext = this.getXPToNextLevel(player.level || 1);
    }

    // Check if we have enough XP
    if (player.xp >= player.xpToNext) {
      // Can't exceed max level
      if (player.level >= this.config.maxLevel) {
        player.xp = player.xpToNext; // Cap XP at max
        return false;
      }

      // Level up!
      player.xp -= player.xpToNext;  // Carry over excess XP
      player.level = (player.level || 1) + 1;
      player.xpToNext = this.getXPToNextLevel(player.level);

      // Increase max HP on level up
      const hpGain = 10;
      player.maxHp = (player.maxHp || 100) + hpGain;
      player.hp = player.maxHp; // Fully heal on level up

      return true;
    }

    return false;
  },

  /**
   * Called when player levels up
   */
  _onLevelUp(oldLevel, newLevel) {
    // Show level up notification
    if (typeof showNotification === 'function') {
      showNotification(`Level Up! You are now level ${newLevel}!`, 'success');
    }

    // Could trigger other events here (unlock features, etc.)
    // For now, just update the HUD
    if (typeof renderHUD === 'function') {
      renderHUD();
    }

    // Save game
    if (typeof saveGame === 'function') {
      saveGame();
    }
  },

  /**
   * Initialize player XP values if not set
   */
  initializePlayer() {
    if (!GameState.player) return;

    if (typeof GameState.player.xp === 'undefined') {
      GameState.player.xp = 0;
    }
    if (typeof GameState.player.level === 'undefined') {
      GameState.player.level = 1;
    }
    if (typeof GameState.player.xpToNext === 'undefined') {
      GameState.player.xpToNext = this.getXPToNextLevel(GameState.player.level);
    }

    console.log('[XPSystem] Player initialized:', {
      level: GameState.player.level,
      xp: GameState.player.xp,
      xpToNext: GameState.player.xpToNext
    });
  }
};

// Make globally accessible
window.XPSystem = XPSystem;
console.log('[xpSystem.js] XPSystem loaded');
