/**
 * ByteQuest - Specialization System
 * Handles class specialization at level 3
 */

// Base class definition - everyone starts here
const BASE_CLASS = {
  cleric: {
    id: 'cleric',
    name: 'Cleric',
    icon: '⚕️',
    description: 'A healer devoted to the Light',
    flavor: 'Your faith guides you on this journey of learning.',
    isBaseClass: true,
    startingStats: {
      maxHp: 100,
      wisdom: 10,
      intelligence: 8
    },
    startingItems: ['basic_staff', 'healing_potion'],
    bonus: '+10% XP from lessons'
  }
};

// Specialization class definitions - unlocked at level 5
// These are registered into GAME_DATA.classes on initialization
const SPECIALIZATION_CLASSES = {
  sage: {
    id: 'sage',
    name: 'Sage',
    icon: '📚',
    description: 'A scholar who seeks knowledge above all',
    flavor: 'Words are your weapon, wisdom your shield.',
    isBaseClass: false,
    specializationOf: 'cleric',
    unlockLevel: 3,
    stats: {
      maxHp: 90,
      wisdom: 15,
      intelligence: 12
    },
    bonuses: {
      xpMultiplier: 1.2,
      vocabularyHints: true
    },
    bonus: '+20% XP from lessons, vocabulary hints during challenges'
  },

  protector: {
    id: 'protector',
    name: 'Protector',
    icon: '🛡️',
    description: 'A guardian who shields the innocent',
    flavor: 'Your resolve is unbreakable, your defense absolute.',
    isBaseClass: false,
    specializationOf: 'cleric',
    unlockLevel: 3,
    stats: {
      maxHp: 130,
      wisdom: 10,
      intelligence: 8
    },
    bonuses: {
      maxHpMultiplier: 1.3,
      damageReduction: 0.1
    },
    bonus: '+30% max HP, 10% damage reduction'
  },

  rogue: {
    id: 'rogue',
    name: 'Rogue',
    icon: '🗡️',
    description: 'A cunning trickster who profits from every opportunity',
    flavor: 'Fortune favors the bold — and the clever.',
    isBaseClass: false,
    specializationOf: 'cleric',
    unlockLevel: 3,
    stats: {
      maxHp: 90,
      wisdom: 8,
      intelligence: 14
    },
    bonuses: {
      goldMultiplier: 1.25,
      shopDiscount: 0.15,
      lootBonus: 0.2
    },
    bonus: '+25% gold earned, 15% shop discount, 20% bonus loot chance'
  }
};

const SpecializationSystem = {
  QUEST_ID: 'orders_call',
  UNLOCK_LEVEL: 3,

  /**
   * Check if specialization quest should be available
   */
  isQuestAvailable() {
    if (!GameState.player.createdAt) return false;
    if (GameState.player.level < this.UNLOCK_LEVEL) return false;
    if (this.hasSpecialized()) return false;

    // Check if quest is already active or completed
    const isActive = GameState.player.activeQuests.includes(this.QUEST_ID);
    const isCompleted = GameState.player.completedQuests.includes(this.QUEST_ID);

    return !isActive && !isCompleted;
  },

  /**
   * Check if player has already specialized
   */
  hasSpecialized() {
    const playerClass = GAME_DATA.classes[GameState.player.class];
    return playerClass && !playerClass.isBaseClass;
  },

  /**
   * Get available specializations
   */
  getSpecializations() {
    return Object.values(GAME_DATA.classes)
      .filter(c => !c.isBaseClass && c.specializationOf === 'cleric');
  },

  /**
   * Start the specialization quest
   */
  startQuest() {
    if (!this.isQuestAvailable()) {
      console.warn('[Specialization] Quest not available');
      return false;
    }

    GameState.player.activeQuests.push(this.QUEST_ID);
    console.log('[Specialization] Quest started');

    if (typeof showNotification === 'function') {
      showNotification("New Quest: The Order's Call", 'quest');
    }

    return true;
  },

  /**
   * Show the specialization selection UI
   */
  showSelectionUI() {
    const specializations = this.getSpecializations();

    const content = `
      <h2 style="font-family: var(--font-display); font-size: 16px; color: var(--accent-gold); margin-bottom: 8px; text-align: center;">
        Choose Your Path
      </h2>
      <p style="text-align: center; color: var(--text-dim); font-size: 12px; margin-bottom: 16px;">
        This choice is permanent and will shape your journey.
      </p>
      <div class="specialization-grid">
        ${specializations.map(spec => `
          <button class="specialization-card" onclick="SpecializationSystem.selectSpecialization('${spec.id}')">
            <div class="spec-icon">${spec.icon}</div>
            <div class="spec-name">${spec.name}</div>
            <div class="spec-desc">${spec.description}</div>
            <div class="spec-bonus">${spec.bonus}</div>
          </button>
        `).join('')}
      </div>
      <button class="art-btn art-btn-small" onclick="hideModal('specialization-modal')" style="margin-top: 16px; width: 100%;">
        I need more time to decide
      </button>
    `;

    if (typeof showModal === 'function') {
      showModal('specialization-modal', content);
    }
  },

  /**
   * Apply a specialization to the player
   */
  selectSpecialization(specId) {
    const spec = GAME_DATA.classes[specId];
    if (!spec || spec.isBaseClass) {
      console.error('[Specialization] Invalid specialization:', specId);
      return false;
    }

    // Confirm the choice
    this.confirmSpecialization(specId);
  },

  /**
   * Show confirmation dialog
   */
  confirmSpecialization(specId) {
    const spec = GAME_DATA.classes[specId];

    const content = `
      <div style="text-align: center;">
        <h2 style="font-family: var(--font-display); font-size: 16px; color: var(--accent-gold); margin-bottom: 16px;">
          Become a ${spec.name}?
        </h2>
        <div style="font-size: 48px; margin-bottom: 8px;">${spec.icon}</div>
        <p style="color: var(--text-dim); font-size: 12px; font-style: italic; margin-bottom: 16px;">
          "${spec.flavor}"
        </p>
        <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; margin-bottom: 16px;">
          <div style="color: var(--accent-green); font-size: 12px;">${spec.bonus}</div>
        </div>
        <p style="color: var(--accent-red); font-size: 11px; margin-bottom: 16px;">
          This choice is permanent and cannot be undone.
        </p>
        <div style="display: flex; gap: 12px; justify-content: center;">
          <button class="art-btn" onclick="hideModal('confirm-spec-modal'); SpecializationSystem.showSelectionUI();">
            Go Back
          </button>
          <button class="art-btn art-btn-gold" onclick="SpecializationSystem.applySpecialization('${specId}')">
            Confirm
          </button>
        </div>
      </div>
    `;

    if (typeof hideModal === 'function') {
      hideModal('specialization-modal');
    }

    if (typeof showModal === 'function') {
      showModal('confirm-spec-modal', content);
    }
  },

  /**
   * Apply the specialization permanently
   */
  applySpecialization(specId) {
    const spec = GAME_DATA.classes[specId];
    if (!spec) return false;

    // Change player class
    GameState.player.class = specId;

    // Apply stat changes
    if (spec.stats) {
      if (spec.stats.maxHp) {
        const hpRatio = GameState.player.hp / GameState.player.maxHp;
        GameState.player.maxHp = spec.stats.maxHp;
        GameState.player.hp = Math.floor(spec.stats.maxHp * hpRatio);
      }
    }

    // Apply bonuses
    if (spec.bonuses) {
      if (spec.bonuses.xpMultiplier) {
        GameState.xpMultiplier = (GameState.xpMultiplier || 1.0) * spec.bonuses.xpMultiplier;
      }
      if (spec.bonuses.maxHpMultiplier) {
        GameState.player.maxHp = Math.floor(GameState.player.maxHp * spec.bonuses.maxHpMultiplier);
        GameState.player.hp = GameState.player.maxHp;
      }
      if (spec.bonuses.goldMultiplier) {
        GameState.goldMultiplier = (GameState.goldMultiplier || 1.0) * spec.bonuses.goldMultiplier;
      }
      if (spec.bonuses.shopDiscount) {
        GameState.player.classShopDiscount = spec.bonuses.shopDiscount;
      }
      if (spec.bonuses.lootBonus) {
        GameState.player.classLootBonus = spec.bonuses.lootBonus;
      }
    }

    // Complete the quest
    const questIndex = GameState.player.activeQuests.indexOf(this.QUEST_ID);
    if (questIndex > -1) {
      GameState.player.activeQuests.splice(questIndex, 1);
    }
    GameState.player.completedQuests.push(this.QUEST_ID);

    // Give quest rewards
    const quest = GAME_DATA.quests[this.QUEST_ID];
    if (quest && quest.rewards && quest.rewards.xp) {
      GameState.player.xp += quest.rewards.xp;
    }

    // Hide modal and show success
    if (typeof hideModal === 'function') {
      hideModal('confirm-spec-modal');
    }

    // Show success notification
    if (typeof showNotification === 'function') {
      showNotification(`You are now a ${spec.name}!`, 'success');
    }

    // Update UI
    if (typeof renderHUD === 'function') {
      renderHUD();
    }

    // Auto save
    if (typeof autoSave === 'function') {
      autoSave();
    }

    console.log('[Specialization] Player specialized as:', specId);
    return true;
  },

  /**
   * Get player's current class info
   */
  getPlayerClass() {
    return GAME_DATA.classes[GameState.player.class] || GAME_DATA.classes.cleric;
  },

  /**
   * Check if player leveled up and should see quest notification
   */
  checkLevelUp() {
    if (GameState.player.level === this.UNLOCK_LEVEL && !this.hasSpecialized()) {
      if (this.isQuestAvailable()) {
        // Auto-start the quest when hitting level 5
        this.startQuest();
      }
    }
  },

  /**
   * Initialize the specialization system
   * Registers classes and quest into GAME_DATA
   */
  init() {
    if (typeof GAME_DATA === 'undefined') {
      console.warn('[SpecializationSystem] GAME_DATA not available');
      return;
    }

    // Ensure GAME_DATA.classes exists
    if (!GAME_DATA.classes) {
      GAME_DATA.classes = {};
    }

    // Register base class and specialization classes
    Object.assign(GAME_DATA.classes, BASE_CLASS, SPECIALIZATION_CLASSES);
    console.log('[SpecializationSystem] Registered classes:', Object.keys(GAME_DATA.classes).join(', '));

    // Ensure GAME_DATA.quests exists
    if (!GAME_DATA.quests) {
      GAME_DATA.quests = {};
    }

    // Register the specialization quest
    GAME_DATA.quests[this.QUEST_ID] = SPECIALIZATION_QUEST;
    console.log('[SpecializationSystem] Registered quest:', this.QUEST_ID);
  }
};

// Specialization quest definition
const SPECIALIZATION_QUEST = {
  id: 'orders_call',
  name: "The Order's Call",
  description: 'The time has come to choose your path. Speak with Elder Maren in Dawnmere to discover your true calling.',
  type: 'specialization',
  unlockLevel: 5,
  location: 'dawnmere',
  npcId: 'elder_maren',
  objectives: [
    {
      id: 'choose_path',
      description: 'Choose your specialization',
      type: 'choice',
      choices: ['sage', 'protector', 'rogue']
    }
  ],
  rewards: {
    xp: 100,
    specializationUnlock: true
  }
};

// Auto-initialize when script loads
SpecializationSystem.init();

// Make globally accessible
window.SpecializationSystem = SpecializationSystem;
window.BASE_CLASS = BASE_CLASS;
window.SPECIALIZATION_CLASSES = SPECIALIZATION_CLASSES;
window.SPECIALIZATION_QUEST = SPECIALIZATION_QUEST;
