// ByteQuest - Cutscene System
// Simple narrative delivery for major story moments

// =====================================================
// Cutscene Definitions
// =====================================================

const CUTSCENE_DEFINITIONS = {
  first_quest_complete: {
    id: 'first_quest_complete',
    title: 'A Journey Begins',
    scenes: [
      {
        speaker: 'narrator',
        icon: '✨',
        scene: 'The village square',
        text: "You've completed your first task for the people of Dawnmere. Word of your helpfulness spreads quickly in a small settlement like this."
      },
      {
        speaker: 'narrator',
        icon: '🌅',
        scene: null,
        text: "This is just the beginning. The road ahead is long, but every journey starts with a single step... or in your case, a single quest."
      }
    ]
  },

  welcome_to_dawnmere: {
    id: 'welcome_to_dawnmere',
    title: 'Welcome to Dawnmere',
    scenes: [
      {
        speaker: 'narrator',
        icon: '🏘️',
        scene: 'A frontier settlement',
        text: "You arrive at Dawnmere, a small but determined settlement on the edge of the known lands. The villagers eye you with a mix of hope and caution."
      }
    ]
  },

  zone_transition: {
    id: 'zone_transition',
    title: 'New Horizons',
    scenes: [
      {
        speaker: 'narrator',
        icon: '🗺️',
        scene: null,
        text: "You leave familiar territory behind and venture into new lands. What awaits you there, only time will tell."
      }
    ]
  }
};

// =====================================================
// Cutscene Manager
// =====================================================

const CutsceneManager = {
  currentCutscene: null,
  currentSceneIndex: 0,
  overlay: null,
  onComplete: null,

  /**
   * Check if a cutscene has been viewed
   */
  hasViewed(cutsceneId) {
    return GameState.viewedCutscenes?.includes(cutsceneId) || false;
  },

  /**
   * Mark a cutscene as viewed
   */
  markViewed(cutsceneId) {
    if (!GameState.viewedCutscenes) {
      GameState.viewedCutscenes = [];
    }
    if (!GameState.viewedCutscenes.includes(cutsceneId)) {
      GameState.viewedCutscenes.push(cutsceneId);
    }
  },

  /**
   * Trigger a cutscene by ID
   * @param {string} cutsceneId - The cutscene to play
   * @param {Object} options - Optional settings
   * @param {boolean} options.force - Play even if already viewed
   * @param {function} options.onComplete - Callback when cutscene ends
   */
  play(cutsceneId, options = {}) {
    const cutscene = CUTSCENE_DEFINITIONS[cutsceneId];
    if (!cutscene) {
      console.warn('[Cutscene] Unknown cutscene:', cutsceneId);
      if (options.onComplete) options.onComplete();
      return;
    }

    // Skip if already viewed (unless forced)
    if (!options.force && this.hasViewed(cutsceneId)) {
      console.log('[Cutscene] Already viewed:', cutsceneId);
      if (options.onComplete) options.onComplete();
      return;
    }

    this.currentCutscene = cutscene;
    this.currentSceneIndex = 0;
    this.onComplete = options.onComplete || null;

    this.createOverlay();
    this.renderScene();
  },

  /**
   * Create the cutscene overlay
   */
  createOverlay() {
    // Remove existing overlay if any
    this.removeOverlay();

    this.overlay = document.createElement('div');
    this.overlay.className = 'cutscene-overlay';
    this.overlay.innerHTML = `
      <div class="cs-container">
        <h2 class="cs-title">${this.currentCutscene.title}</h2>
        <div class="cs-content">
          <div class="cs-portrait">
            <div class="cs-portrait-icon"></div>
            <div class="cs-portrait-name"></div>
          </div>
          <div class="cs-dialogue-box">
            <div class="cs-scene"></div>
            <div class="cs-text"></div>
          </div>
        </div>
        <div class="cs-controls">
          <div class="cs-progress"></div>
          <div class="cs-buttons">
            <button class="cs-next-btn art-btn art-btn-gold">Continue</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.overlay);

    // Add click handler
    const nextBtn = this.overlay.querySelector('.cs-next-btn');
    nextBtn.addEventListener('click', () => this.nextScene());

    // Also allow clicking anywhere to advance
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay || e.target.classList.contains('cs-container')) {
        this.nextScene();
      }
    });

    // Keyboard support
    this.keyHandler = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        this.nextScene();
      }
    };
    document.addEventListener('keydown', this.keyHandler);
  },

  /**
   * Render the current scene
   */
  renderScene() {
    if (!this.overlay || !this.currentCutscene) return;

    const scene = this.currentCutscene.scenes[this.currentSceneIndex];
    if (!scene) return;

    // Update portrait
    const portraitIcon = this.overlay.querySelector('.cs-portrait-icon');
    const portraitName = this.overlay.querySelector('.cs-portrait-name');

    if (scene.speaker === 'narrator') {
      portraitIcon.textContent = scene.icon || '📜';
      portraitName.textContent = 'Narrator';
    } else {
      // Could be an NPC - look up their info
      const npc = GAME_DATA?.npcs?.[scene.speaker];
      if (npc) {
        portraitIcon.textContent = npc.icon || '👤';
        portraitName.textContent = npc.name || scene.speaker;
      } else {
        portraitIcon.textContent = scene.icon || '👤';
        portraitName.textContent = scene.speaker || 'Unknown';
      }
    }

    // Update scene description (if any)
    const sceneEl = this.overlay.querySelector('.cs-scene');
    if (scene.scene) {
      sceneEl.textContent = scene.scene;
      sceneEl.style.display = 'block';
    } else {
      sceneEl.style.display = 'none';
    }

    // Update dialogue text
    const textEl = this.overlay.querySelector('.cs-text');
    textEl.textContent = scene.text;

    // Update progress
    const progressEl = this.overlay.querySelector('.cs-progress');
    const total = this.currentCutscene.scenes.length;
    progressEl.textContent = total > 1 ? `${this.currentSceneIndex + 1} / ${total}` : '';

    // Update button text
    const nextBtn = this.overlay.querySelector('.cs-next-btn');
    const isLast = this.currentSceneIndex >= this.currentCutscene.scenes.length - 1;
    nextBtn.textContent = isLast ? 'Close' : 'Continue';
  },

  /**
   * Advance to next scene or end cutscene
   */
  nextScene() {
    if (!this.currentCutscene) return;

    this.currentSceneIndex++;

    if (this.currentSceneIndex >= this.currentCutscene.scenes.length) {
      this.end();
    } else {
      this.renderScene();
    }
  },

  /**
   * End the cutscene
   */
  end() {
    // Mark as viewed
    if (this.currentCutscene) {
      this.markViewed(this.currentCutscene.id);
    }

    // Fade out
    if (this.overlay) {
      this.overlay.style.opacity = '0';
      this.overlay.style.pointerEvents = 'none';

      setTimeout(() => {
        this.removeOverlay();
      }, 300);
    }

    // Call completion callback
    const callback = this.onComplete;
    this.currentCutscene = null;
    this.currentSceneIndex = 0;
    this.onComplete = null;

    if (callback) callback();
  },

  /**
   * Remove the overlay from DOM
   */
  removeOverlay() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
      this.keyHandler = null;
    }
  },

  /**
   * Add a custom cutscene definition
   */
  addCutscene(id, definition) {
    CUTSCENE_DEFINITIONS[id] = { id, ...definition };
  },

  /**
   * Get all cutscene IDs
   */
  getAllCutsceneIds() {
    return Object.keys(CUTSCENE_DEFINITIONS);
  }
};

// =====================================================
// Global Helper Function
// =====================================================

/**
 * Trigger a cutscene (convenience function)
 * @param {string} cutsceneId - The cutscene to play
 * @param {Object|function} optionsOrCallback - Options object or onComplete callback
 */
function triggerCutscene(cutsceneId, optionsOrCallback = {}) {
  const options = typeof optionsOrCallback === 'function'
    ? { onComplete: optionsOrCallback }
    : optionsOrCallback;

  CutsceneManager.play(cutsceneId, options);
}

/**
 * Play a simple narrative text (creates a temporary one-scene cutscene)
 * @param {string} title - The cutscene title
 * @param {string} text - The narrative text
 * @param {Object} options - Additional options
 */
function showNarrativeText(title, text, options = {}) {
  const tempId = `temp_${Date.now()}`;

  CutsceneManager.addCutscene(tempId, {
    title: title,
    scenes: [{
      speaker: 'narrator',
      icon: options.icon || '📜',
      scene: options.scene || null,
      text: text
    }]
  });

  CutsceneManager.play(tempId, {
    force: true,
    onComplete: options.onComplete
  });
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CutsceneManager,
    CUTSCENE_DEFINITIONS,
    triggerCutscene,
    showNarrativeText
  };
}
