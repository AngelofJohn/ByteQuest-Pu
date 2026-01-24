/**
 * ByteQuest - Artifact System
 * Central management for lore artifacts, legendary equipment, and progression keys
 */

const ArtifactSystem = {
  /**
   * Initialize the artifact system
   */
  init() {
    // Ensure artifacts data is loaded
    if (typeof initArtifactsData === 'function') {
      initArtifactsData();
    }

    console.log('[ArtifactSystem] Initialized');
  },

  // =====================================================
  // Lore Artifact Management
  // =====================================================

  /**
   * Unlock a lore artifact
   * @param {string} artifactId - The artifact ID to unlock
   * @param {string} source - How it was obtained (quest, exploration, reputation, achievement)
   * @returns {boolean} Whether unlock was successful
   */
  unlockArtifact(artifactId, source = 'unknown') {
    const artifact = this.getArtifact(artifactId);
    if (!artifact) {
      console.warn(`[ArtifactSystem] Unknown artifact: ${artifactId}`);
      return false;
    }

    // Check if already unlocked
    if (this.isArtifactUnlocked(artifactId)) {
      console.log(`[ArtifactSystem] Artifact already unlocked: ${artifactId}`);
      return false;
    }

    // Use SpellbookManager to track unlock (existing infrastructure)
    if (typeof spellbookManager !== 'undefined' && spellbookManager.unlockArtifact) {
      spellbookManager.unlockArtifact(artifactId);
    } else {
      // Fallback: store directly in player state
      if (!GameState.player.spellbook) {
        GameState.player.spellbook = {};
      }
      if (!GameState.player.spellbook.unlockedArtifacts) {
        GameState.player.spellbook.unlockedArtifacts = [];
      }
      if (!GameState.player.spellbook.unlockedArtifacts.includes(artifactId)) {
        GameState.player.spellbook.unlockedArtifacts.push(artifactId);
      }
    }

    // Show discovery modal
    this.showDiscoveryModal(artifact);

    // Check for era completion
    this.checkEraCompletion(artifact.era);

    // Check for artifact-related achievements
    this.checkArtifactAchievements();

    // Save game state
    if (typeof saveGame === 'function') {
      saveGame();
    }

    console.log(`[ArtifactSystem] Unlocked: ${artifact.name} via ${source}`);
    return true;
  },

  /**
   * Get artifact definition by ID
   * @param {string} artifactId
   * @returns {Object|null}
   */
  getArtifact(artifactId) {
    if (typeof GAME_DATA !== 'undefined' && GAME_DATA.artifacts) {
      return GAME_DATA.artifacts[artifactId] || null;
    }
    if (typeof LORE_ARTIFACTS !== 'undefined') {
      return LORE_ARTIFACTS[artifactId] || null;
    }
    return null;
  },

  /**
   * Check if artifact is unlocked
   * @param {string} artifactId
   * @returns {boolean}
   */
  isArtifactUnlocked(artifactId) {
    if (typeof spellbookManager !== 'undefined' && spellbookManager.isArtifactUnlocked) {
      return spellbookManager.isArtifactUnlocked(artifactId);
    }
    // Fallback check
    return GameState.player.spellbook?.unlockedArtifacts?.includes(artifactId) || false;
  },

  /**
   * Get all unlocked artifacts
   * @returns {Array}
   */
  getUnlockedArtifacts() {
    const unlockedIds = GameState.player.spellbook?.unlockedArtifacts || [];
    return unlockedIds.map(id => this.getArtifact(id)).filter(a => a !== null);
  },

  /**
   * Get unlocked artifacts for a specific era
   * @param {string} eraId
   * @returns {Array}
   */
  getUnlockedArtifactsForEra(eraId) {
    return this.getUnlockedArtifacts().filter(a => a.era === eraId);
  },

  /**
   * Get all artifacts for an era (unlocked or not)
   * @param {string} eraId
   * @returns {Array}
   */
  getArtifactsForEra(eraId) {
    if (typeof getArtifactsByEra === 'function') {
      return getArtifactsByEra(eraId);
    }
    const artifacts = GAME_DATA?.artifacts || LORE_ARTIFACTS || {};
    return Object.values(artifacts).filter(a => a.era === eraId);
  },

  /**
   * Get total artifact count
   * @returns {number}
   */
  getTotalArtifactCount() {
    const artifacts = GAME_DATA?.artifacts || LORE_ARTIFACTS || {};
    return Object.keys(artifacts).length;
  },

  /**
   * Get unlocked artifact count
   * @returns {number}
   */
  getUnlockedArtifactCount() {
    return GameState.player.spellbook?.unlockedArtifacts?.length || 0;
  },

  // =====================================================
  // Era Completion
  // =====================================================

  /**
   * Check if an era is complete (all artifacts collected)
   * @param {string} eraId
   * @returns {boolean}
   */
  isEraComplete(eraId) {
    const eraArtifacts = this.getArtifactsForEra(eraId);
    const unlockedInEra = this.getUnlockedArtifactsForEra(eraId);
    return eraArtifacts.length > 0 && unlockedInEra.length === eraArtifacts.length;
  },

  /**
   * Check era completion and trigger rewards
   * @param {string} eraId
   */
  checkEraCompletion(eraId) {
    if (this.isEraComplete(eraId)) {
      const era = this.getEra(eraId);
      const eraName = era?.name || eraId;

      if (typeof showNotification === 'function') {
        showNotification(`Era Complete: ${eraName}!`, 'achievement');
      }

      console.log(`[ArtifactSystem] Era complete: ${eraName}`);

      // Achievement system handles era completion rewards
      if (typeof achievementManager !== 'undefined') {
        achievementManager.checkProgress();
      }
    }
  },

  /**
   * Get era metadata
   * @param {string} eraId
   * @returns {Object|null}
   */
  getEra(eraId) {
    if (typeof GAME_DATA !== 'undefined' && GAME_DATA.artifactEras) {
      return GAME_DATA.artifactEras[eraId] || null;
    }
    if (typeof ARTIFACT_ERAS !== 'undefined') {
      return ARTIFACT_ERAS[eraId] || null;
    }
    return null;
  },

  /**
   * Get all eras
   * @returns {Array}
   */
  getAllEras() {
    const eras = GAME_DATA?.artifactEras || ARTIFACT_ERAS || {};
    return Object.values(eras).sort((a, b) => a.order - b.order);
  },

  // =====================================================
  // Achievement Integration
  // =====================================================

  /**
   * Check artifact-related achievements
   */
  checkArtifactAchievements() {
    if (typeof achievementManager === 'undefined') return;

    const unlocked = this.getUnlockedArtifactCount();
    const total = this.getTotalArtifactCount();

    // Check first artifact achievement
    if (unlocked >= 1) {
      achievementManager.checkProgress('truth_seeker');
    }

    // Check era completion achievements
    for (const era of this.getAllEras()) {
      if (this.isEraComplete(era.id)) {
        const achievementId = `${era.id}_historian`;
        achievementManager.checkProgress(achievementId);
      }
    }

    // Check master historian (all artifacts)
    if (unlocked >= total && total > 0) {
      achievementManager.checkProgress('master_historian');
    }
  },

  // =====================================================
  // Discovery Modal
  // =====================================================

  /**
   * Show artifact discovery modal
   * Uses the existing showArtifactDiscoveryModal from spellbookSystem.js if available
   * @param {Object} artifact
   */
  showDiscoveryModal(artifact) {
    // Use existing modal from spellbookSystem if available
    if (typeof showArtifactDiscoveryModal === 'function') {
      showArtifactDiscoveryModal(artifact);
      return;
    }

    // Fallback implementation
    if (typeof showModal !== 'function') {
      console.log(`[ArtifactSystem] Discovered: ${artifact.name}`);
      return;
    }

    const era = this.getEra(artifact.era);
    const eraName = era?.name || era?.label || artifact.era;

    const content = `
      <div class="artifact-discovery-modal">
        <div class="artifact-discovery-header">
          <div class="artifact-discovery-title">ARTIFACT DISCOVERED</div>
          <div class="artifact-discovery-subtitle">${era?.icon || '📜'} ${eraName}</div>
        </div>
        <div class="artifact-discovery-body">
          <div class="artifact-discovery-icon">${artifact.icon}</div>
          <div class="artifact-discovery-name">${artifact.name}</div>
          <div class="artifact-discovery-description">${artifact.discoveryText || artifact.description}</div>
          <div class="artifact-discovery-lore">
            <div class="artifact-lore-title">Historical Significance</div>
            <div class="artifact-lore-text">"${artifact.loreText}"</div>
          </div>
          <div class="artifact-discovery-added">Added to your Spellbook (Press S to view)</div>
        </div>
        <div class="artifact-discovery-footer">
          <button class="art-btn art-btn-gold" onclick="hideModal('artifact-discovery-modal')">Continue</button>
        </div>
      </div>
    `;

    showModal('artifact-discovery-modal', content);
  },

  // =====================================================
  // Quest Reward Integration
  // =====================================================

  /**
   * Process artifact rewards from quest completion
   * @param {Array} artifactIds - Array of artifact IDs to unlock
   * @param {string} questId - Source quest ID
   */
  giveQuestRewards(artifactIds, questId) {
    if (!Array.isArray(artifactIds)) {
      artifactIds = [artifactIds];
    }

    for (const artifactId of artifactIds) {
      this.unlockArtifact(artifactId, 'quest');
    }
  },

  // =====================================================
  // Exploration/Hotspot Integration
  // =====================================================

  /**
   * Unlock artifact from exploration hotspot
   * @param {string} artifactId
   * @param {string} hotspotId
   */
  discoverFromHotspot(artifactId, hotspotId) {
    this.unlockArtifact(artifactId, 'exploration');
  },

  // =====================================================
  // Reputation Integration
  // =====================================================

  /**
   * Check if any artifacts should be unlocked based on reputation
   * @param {string} factionId
   * @param {number} newReputation
   */
  checkReputationUnlocks(factionId, newReputation) {
    // This will be implemented when we add reputation artifact mappings
    // For now, just a placeholder
    console.log(`[ArtifactSystem] Checking reputation unlocks for ${factionId} at ${newReputation}`);
  }
};

// Initialize on load
if (typeof GAME_DATA !== 'undefined') {
  ArtifactSystem.init();
}

// Make globally accessible
window.ArtifactSystem = ArtifactSystem;
