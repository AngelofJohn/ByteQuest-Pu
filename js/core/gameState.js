/**
 * ByteQuest Core Game State
 * Minimal stub for title screen flow
 */

const GameState = {
  // Current screen
  currentScreen: 'title',
  currentLanguage: 'french',

  // Player data
  player: {
    name: '',
    class: 'cleric',
    language: 'french',
    level: 1,
    xp: 0,
    xpToNext: 100,
    hp: 100,
    maxHp: 100,
    gold: 0,
    createdAt: null,
    freeReviveUsed: false,
    inventory: [],
    equipment: {
      helm: null,
      armor: null,
      weapon: null,
      accessory: null,
      ring: null
    },
    activeQuests: [],
    completedQuests: [],
    discoveredLocations: ['dawnmere'],
    currentLocation: 'dawnmere',
    titles: {
      earned: [],
      equipped: null
    },
    reputation: {},
    discoveredFactions: [],
    villageProjects: {
      completed: [],
      contributions: {},
      turnins: {}
    },
    unlockedFeatures: [],
    vocabulary: {},  // Leitner SR word tracking

    // Enhancement System (Tier 3 permanent upgrades)
    enhancements: {
      statLevels: {
        stamina: 0,
        strength: 0,
        agility: 0,
        insight: 0,
        luck: 0,
        devotion: 0,
        knowledge: 0
      }
    },
    enhancementStats: {
      stamina: 0,
      strength: 0,
      agility: 0,
      insight: 0,
      luck: 0,
      devotion: 0,
      knowledge: 0
    }
  },

  // Settings
  settings: {
    soundEnabled: true,
    musicEnabled: true,
    keyboardShortcuts: true,
    difficulty: 'normal'
  },

  // UI state
  selectedQuest: null,
  questFilter: 'all',
  activeDialog: null,
  lessonState: null,
  viewedCutscenes: [],

  // Tutorial state
  tutorial: {
    skipAll: false,
    shownTips: [],
    currentTip: null,
    completed: {
      gainedReputation: false
    }
  },

  // Multipliers (can be modified by account progression)
  xpMultiplier: 1.0,
  goldMultiplier: 1.0
};

/**
 * Reset player to defaults (for new game)
 */
function resetPlayerState() {
  GameState.player = {
    name: '',
    class: 'cleric',
    language: 'french',
    level: 1,
    xp: 0,
    xpToNext: 100,
    hp: 100,
    maxHp: 100,
    gold: 0,
    createdAt: null,
    freeReviveUsed: false,
    inventory: [],
    equipment: {
      helm: null,
      armor: null,
      weapon: null,
      accessory: null,
      ring: null
    },
    activeQuests: [],
    completedQuests: [],
    discoveredLocations: ['dawnmere'],
    currentLocation: 'dawnmere',
    titles: {
      earned: [],
      equipped: null
    },
    reputation: {},
    discoveredFactions: [],
    villageProjects: {
      completed: [],
      contributions: {},
      turnins: {}
    },
    unlockedFeatures: [],
    vocabulary: {},  // Leitner SR word tracking

    // Enhancement System (Tier 3 permanent upgrades)
    enhancements: {
      statLevels: {
        stamina: 0,
        strength: 0,
        agility: 0,
        insight: 0,
        luck: 0,
        devotion: 0,
        knowledge: 0
      }
    },
    enhancementStats: {
      stamina: 0,
      strength: 0,
      agility: 0,
      insight: 0,
      luck: 0,
      devotion: 0,
      knowledge: 0
    }
  };

  // Reset tutorial state for new game
  GameState.tutorial = {
    skipAll: false,
    shownTips: [],
    currentTip: null,
    completed: {
      gainedReputation: false
    }
  };
}
