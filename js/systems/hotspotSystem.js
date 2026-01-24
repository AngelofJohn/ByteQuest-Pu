/**
 * ByteQuest - Hotspot System
 * Discoverable exploration points that can grant artifacts, items, and lore
 */

const HotspotSystem = {
  /**
   * Initialize the hotspot system
   */
  init() {
    // Ensure player has discoveredHotspots array
    if (!GameState.player.discoveredHotspots) {
      GameState.player.discoveredHotspots = [];
    }
    console.log('[HotspotSystem] Initialized');
  },

  // =====================================================
  // Hotspot Data Management
  // =====================================================

  /**
   * Get all hotspots for a location
   * @param {string} locationId
   * @returns {Array}
   */
  getHotspotsForLocation(locationId) {
    // Check location definitions for hotspots
    const location = this._getLocation(locationId);
    return location?.hotspots || [];
  },

  /**
   * Get a specific hotspot by ID
   * @param {string} hotspotId
   * @returns {Object|null}
   */
  getHotspot(hotspotId) {
    // Search all locations for this hotspot
    const locations = GAME_DATA?.locations || LOCATION_DEFINITIONS || {};
    for (const location of Object.values(locations)) {
      if (location.hotspots) {
        const hotspot = location.hotspots.find(h => h.id === hotspotId);
        if (hotspot) {
          return { ...hotspot, locationId: location.id };
        }
      }
    }
    return null;
  },

  /**
   * Get location data
   * @private
   */
  _getLocation(locationId) {
    if (typeof locationManager !== 'undefined' && locationManager) {
      return locationManager.getLocation(locationId);
    }
    return GAME_DATA?.locations?.[locationId] || LOCATION_DEFINITIONS?.[locationId];
  },

  // =====================================================
  // Availability & Discovery State
  // =====================================================

  /**
   * Check if a hotspot is available (requirements met)
   * @param {Object} hotspot
   * @returns {boolean}
   */
  isAvailable(hotspot) {
    if (!hotspot) return false;

    // Check level requirement
    if (hotspot.requires?.level && GameState.player.level < hotspot.requires.level) {
      return false;
    }

    // Check quest completion requirement
    if (hotspot.requires?.quest) {
      if (typeof questManager !== 'undefined' && questManager) {
        if (!questManager.isQuestComplete(hotspot.requires.quest)) {
          return false;
        }
      } else {
        // Fallback check
        const courseData = GameState.courses?.[GameState.currentCourse];
        if (!courseData?.completedQuests?.includes(hotspot.requires.quest)) {
          return false;
        }
      }
    }

    // Check reputation requirement
    if (hotspot.requires?.reputation) {
      const { faction, amount } = hotspot.requires.reputation;
      if (typeof reputationManager !== 'undefined' && reputationManager) {
        if (reputationManager.getReputation(faction) < amount) {
          return false;
        }
      }
    }

    // Check item requirement
    if (hotspot.requires?.item) {
      if (typeof itemManager !== 'undefined' && itemManager) {
        if (!itemManager.hasItem(hotspot.requires.item)) {
          return false;
        }
      }
    }

    return true;
  },

  /**
   * Check if a hotspot has already been discovered
   * @param {string} hotspotId
   * @returns {boolean}
   */
  isDiscovered(hotspotId) {
    return GameState.player.discoveredHotspots?.includes(hotspotId) || false;
  },

  /**
   * Get visible hotspots for current location (available and not discovered)
   * @param {string} locationId
   * @returns {Array}
   */
  getVisibleHotspots(locationId) {
    const hotspots = this.getHotspotsForLocation(locationId);
    return hotspots.filter(h => this.isAvailable(h) && !this.isDiscovered(h.id));
  },

  // =====================================================
  // Interaction
  // =====================================================

  /**
   * Interact with a hotspot
   * @param {string} hotspotId
   * @returns {boolean} Whether interaction was successful
   */
  interact(hotspotId) {
    const hotspot = this.getHotspot(hotspotId);
    if (!hotspot) {
      console.warn(`[HotspotSystem] Unknown hotspot: ${hotspotId}`);
      return false;
    }

    // Check if already discovered
    if (this.isDiscovered(hotspotId)) {
      console.log(`[HotspotSystem] Hotspot already discovered: ${hotspotId}`);
      return false;
    }

    // Check availability
    if (!this.isAvailable(hotspot)) {
      this._showRequirementsNotMet(hotspot);
      return false;
    }

    // Mark as discovered
    if (!GameState.player.discoveredHotspots) {
      GameState.player.discoveredHotspots = [];
    }
    GameState.player.discoveredHotspots.push(hotspotId);

    // Show discovery interaction
    this._showDiscoveryInteraction(hotspot);

    // Save game
    if (typeof saveGame === 'function') {
      saveGame();
    }

    console.log(`[HotspotSystem] Discovered hotspot: ${hotspot.name}`);
    return true;
  },

  /**
   * Show discovery interaction modal
   * @private
   */
  _showDiscoveryInteraction(hotspot) {
    // Build rewards summary
    let rewardsHtml = '';

    if (hotspot.artifact) {
      const artifact = ArtifactSystem?.getArtifact(hotspot.artifact);
      if (artifact) {
        rewardsHtml += `<div class="hotspot-reward-artifact">${artifact.icon} ${artifact.name}</div>`;
      }
    }

    if (hotspot.items && hotspot.items.length > 0) {
      const itemNames = hotspot.items.map(itemId => {
        const item = GAME_DATA?.items?.[itemId] || ITEM_DEFINITIONS?.[itemId];
        return item ? `${item.icon} ${item.name}` : itemId;
      }).join(', ');
      rewardsHtml += `<div class="hotspot-reward-items">${itemNames}</div>`;
    }

    if (hotspot.xp) {
      rewardsHtml += `<div class="hotspot-reward-xp">+${hotspot.xp} XP</div>`;
    }

    if (hotspot.gold) {
      rewardsHtml += `<div class="hotspot-reward-gold">+${hotspot.gold} Gold</div>`;
    }

    const content = `
      <div class="hotspot-discovery-modal">
        <div class="hotspot-discovery-header">
          <div class="hotspot-discovery-icon">${hotspot.icon}</div>
          <div class="hotspot-discovery-title">${hotspot.name}</div>
        </div>
        <div class="hotspot-discovery-body">
          <div class="hotspot-discovery-text">${hotspot.discoveryText || hotspot.description}</div>
          ${rewardsHtml ? `<div class="hotspot-discovery-rewards">${rewardsHtml}</div>` : ''}
        </div>
        <div class="hotspot-discovery-footer">
          <button class="art-btn art-btn-gold" onclick="HotspotSystem.claimRewards('${hotspot.id}')">Claim</button>
        </div>
      </div>
    `;

    if (typeof showModal === 'function') {
      showModal('hotspot-discovery-modal', content);
    }
  },

  /**
   * Claim rewards from a discovered hotspot
   * @param {string} hotspotId
   */
  claimRewards(hotspotId) {
    const hotspot = this.getHotspot(hotspotId);
    if (!hotspot) return;

    // Grant artifact
    if (hotspot.artifact) {
      if (typeof ArtifactSystem !== 'undefined' && ArtifactSystem.unlockArtifact) {
        ArtifactSystem.unlockArtifact(hotspot.artifact, 'exploration');
      }
    }

    // Grant items
    if (hotspot.items && hotspot.items.length > 0) {
      if (typeof itemManager !== 'undefined' && itemManager) {
        hotspot.items.forEach(itemId => {
          itemManager.addItem(itemId);
        });
      }
    }

    // Grant XP
    if (hotspot.xp) {
      if (typeof XPSystem !== 'undefined' && XPSystem.awardXP) {
        XPSystem.awardXP(hotspot.xp, 'exploration');
      } else {
        GameState.player.xp = (GameState.player.xp || 0) + hotspot.xp;
      }
    }

    // Grant gold
    if (hotspot.gold) {
      GameState.player.gold = (GameState.player.gold || 0) + hotspot.gold;
    }

    // Grant reputation
    if (hotspot.reputation) {
      Object.entries(hotspot.reputation).forEach(([factionId, amount]) => {
        if (typeof reputationManager !== 'undefined' && reputationManager) {
          reputationManager.addReputation(factionId, amount);
        }
      });
    }

    // Hide modal
    if (typeof hideModal === 'function') {
      hideModal('hotspot-discovery-modal');
    }

    // Re-render location to remove the hotspot
    if (typeof renderLocation === 'function') {
      renderLocation();
    }

    // Update HUD
    if (typeof renderHUD === 'function') {
      renderHUD();
    }

    console.log(`[HotspotSystem] Rewards claimed for: ${hotspot.name}`);
  },

  /**
   * Show requirements not met message
   * @private
   */
  _showRequirementsNotMet(hotspot) {
    let message = 'You cannot access this yet.';

    if (hotspot.requires?.level && GameState.player.level < hotspot.requires.level) {
      message = `Requires level ${hotspot.requires.level}`;
    } else if (hotspot.requires?.quest) {
      message = 'Complete the required quest first';
    } else if (hotspot.requires?.item) {
      message = 'You need a specific item';
    }

    if (typeof showNotification === 'function') {
      showNotification(message, 'warning');
    }
  },

  // =====================================================
  // Rendering
  // =====================================================

  /**
   * Render hotspots for a location
   * @param {Object} location - Location object
   * @returns {string} HTML string for hotspots
   */
  render(location) {
    if (!location?.id) return '';

    const visibleHotspots = this.getVisibleHotspots(location.id);
    if (visibleHotspots.length === 0) return '';

    return visibleHotspots.map(hotspot => `
      <button class="hotspot-btn" onclick="HotspotSystem.interact('${hotspot.id}')" title="${hotspot.name}">
        <span class="hotspot-icon">${hotspot.icon}</span>
        <span class="hotspot-name">${hotspot.name}</span>
        ${hotspot.hint ? `<span class="hotspot-hint">${hotspot.hint}</span>` : ''}
      </button>
    `).join('');
  },

  // =====================================================
  // Stats & Progress
  // =====================================================

  /**
   * Get discovery statistics
   * @returns {Object}
   */
  getStats() {
    const discovered = GameState.player.discoveredHotspots?.length || 0;

    // Count total hotspots across all locations
    let total = 0;
    const locations = GAME_DATA?.locations || LOCATION_DEFINITIONS || {};
    for (const location of Object.values(locations)) {
      if (location.hotspots) {
        total += location.hotspots.length;
      }
    }

    return {
      discovered,
      total,
      percentage: total > 0 ? Math.round((discovered / total) * 100) : 0
    };
  }
};

// Initialize on load
if (typeof GameState !== 'undefined') {
  HotspotSystem.init();
}

// Make globally accessible
window.HotspotSystem = HotspotSystem;
