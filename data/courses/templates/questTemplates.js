/**
 * ByteQuest - Language-Agnostic Quest Templates
 *
 * These templates define the STRUCTURE of quests that every language course should have.
 * Each language creates their own quests.js that follows these patterns.
 *
 * Usage:
 * 1. Copy the appropriate template
 * 2. Fill in language-specific content (dialogue, names, vocab references)
 * 3. Adjust XP/rewards as needed for balance
 */

const QUEST_TEMPLATES = {
  // =====================================================
  // VOCABULARY LESSON TEMPLATE
  // For teaching new words in categories
  // =====================================================
  vocabulary_lesson: {
    // === Identity (CUSTOMIZE) ===
    id: "{language}_lesson_{topic}",        // e.g., "french_lesson_greetings"
    name: "{Native Name}",                   // e.g., "Les Salutations"
    description: "{Native description}",     // In target language
    icon: "{emoji}",                         // Visual indicator

    // === Classification (STANDARD) ===
    type: "lesson",
    category: "vocabulary",

    // === Requirements (CUSTOMIZE) ===
    levelRequired: 1,                        // Adjust per difficulty
    prerequisites: [],                       // Quest IDs that must be complete
    location: "dawnmere",                    // Starting area for all languages

    // === Quest Giver (STANDARD) ===
    giver: "isora",                          // Village elder NPC

    // === Objectives (CUSTOMIZE) ===
    objectives: [
      {
        id: "learn_{topic}",
        type: "vocabulary_lesson",
        description: "Learn {topic} vocabulary",
        lesson: "{topic}_vocab"              // Maps to VOCAB category
      }
    ],
    objectiveOrder: "any",

    // === Rewards (USE STANDARD VALUES) ===
    rewards: {
      xp: 50,                                // Base: 50-80 for vocab lessons
      gold: 0,
      items: [],
      equipment: [],
      unlocks: {
        quests: [],                          // Next quest in chain
        npcs: [],
        locations: [],
        features: []
      },
      reputation: {
        dawnmere: 10                         // Base reputation gain
      },
      spellbookPages: ["{language}_{topic}"], // Grammar reference page
      title: null
    },

    // === Bonus Rewards (STANDARD) ===
    bonusRewards: {
      condition: "perfect_score",
      xp: 15,
      gold: 5,
      items: []
    },

    // === Repeatable (STANDARD) ===
    cooldown: null,                          // null = not repeatable

    // === Dialogue (CUSTOMIZE - REQUIRED) ===
    dialogue: {
      intro: "{Welcoming introduction to the topic}",
      accept: "{Encouragement when accepting}",
      decline: "{Friendly response when declining}",
      turnIn: "{Congratulations with target language examples}",
      inProgress: "{Helpful hint or encouragement}"
    },

    // === Metadata (CUSTOMIZE) ===
    tags: ["beginner", "essential"],
    hidden: false
  },

  // =====================================================
  // GRAMMAR LESSON TEMPLATE
  // For teaching verb conjugations, cases, etc.
  // =====================================================
  grammar_lesson: {
    // === Identity (CUSTOMIZE) ===
    id: "{language}_grammar_{topic}",
    name: "{Native Name}",
    description: "{Native description}",
    icon: "{emoji}",

    // === Classification (STANDARD) ===
    type: "lesson",
    category: "grammar",

    // === Requirements (CUSTOMIZE) ===
    levelRequired: 2,                        // Grammar typically starts level 2+
    prerequisites: [],
    location: "dawnmere",

    // === Quest Giver (STANDARD) ===
    giver: "sage_aldric",                    // Grammar teacher NPC

    // === Objectives (CUSTOMIZE) ===
    objectives: [
      {
        id: "learn_{topic}",
        type: "grammar_lesson",
        description: "Learn {grammar concept}",
        exercises: {
          conjugation: 6,                    // Number of conjugation exercises
          fillBlank: 4,                      // Number of fill-in-blank
          matching: 0                        // Number of matching exercises
        }
      }
    ],
    objectiveOrder: "sequential",

    // === Rewards (USE STANDARD VALUES) ===
    rewards: {
      xp: 100,                               // Base: 80-150 for grammar
      gold: 10,
      items: [],
      equipment: [],
      unlocks: {
        quests: [],
        npcs: [],
        locations: [],
        features: []
      },
      reputation: {
        dawnmere: 15
      },
      spellbookPages: ["{language}_{grammar_topic}"],
      title: null
    },

    // === Bonus Rewards (STANDARD) ===
    bonusRewards: {
      condition: "perfect_score",
      xp: 25,
      gold: 10,
      items: []
    },

    // === Dialogue (CUSTOMIZE - REQUIRED) ===
    dialogue: {
      intro: "{Introduction to grammar concept}",
      accept: "{Encouragement}",
      decline: "{Friendly decline response}",
      turnIn: "{Congratulations with examples}",
      inProgress: "{Helpful grammar tip}"
    },

    tags: ["grammar", "intermediate"],
    hidden: false
  },

  // =====================================================
  // MAIN STORY QUEST TEMPLATE
  // For narrative-driven progression
  // =====================================================
  main_story: {
    // === Identity (CUSTOMIZE) ===
    id: "ms_{zone}_{order}_{slug}",          // e.g., "ms_1_01_stranger_arrives"
    name: "{Quest Name}",
    zone: "{zone_id}",
    zoneOrder: 1,                            // Order within zone

    // === Classification (STANDARD) ===
    type: "main",
    category: "story",
    status: "locked",                        // "available" for first quest only

    // === Requirements (CUSTOMIZE) ===
    levelRequired: 1,
    prerequisites: [],

    // === Chain Info (CUSTOMIZE) ===
    chainId: "main_story",
    chainOrder: 1,
    chainNext: "{next_quest_id}",            // null for final quest

    // === Description (CUSTOMIZE) ===
    description: "{Brief story description}",

    // === Objectives (CUSTOMIZE) ===
    objectives: [
      {
        id: "{objective_id}",
        type: "interact",                    // interact, task, meet, collect, explore
        text: "{Objective description}",
        target: "{npc_id or count}"
      }
    ],

    // === Dialogue (CUSTOMIZE - REQUIRED) ===
    dialogue: {
      intro: "{Quest introduction}",
      progress: "{Progress reminder}",
      complete: "{Completion dialogue}"
    },

    // === Rewards (CUSTOMIZE) ===
    rewards: {
      xp: 50,                                // Base: 25-100 for story
      gold: 10,
      lessonsUnlocked: [],                   // Lesson IDs to unlock
      items: [],
      reputation: { dawnmere: 10 }
    }
  },

  // =====================================================
  // SIDE QUEST TEMPLATE
  // For optional content with world-building
  // =====================================================
  side_quest: {
    // === Identity (CUSTOMIZE) ===
    id: "sq_{zone}_{slug}",
    name: "{Quest Name}",
    zone: "{zone_id}",

    // === Classification (STANDARD) ===
    type: "side",
    category: "social",                      // social, exploration, collection
    status: "available",

    // === Requirements (CUSTOMIZE) ===
    levelRequired: 1,
    prerequisites: [],

    // === Description (CUSTOMIZE) ===
    description: "{Quest description with personality}",

    // === Quest Giver (CUSTOMIZE) ===
    giver: "{npc_id}",

    // === Objectives (CUSTOMIZE) ===
    objectives: [
      {
        id: "{objective_id}",
        type: "collect",                     // collect, deliver, interact, explore
        text: "{Objective description}",
        target: 3,
        item: "{item_id}"
      }
    ],

    // === Dialogue (CUSTOMIZE - REQUIRED) ===
    dialogue: {
      intro: "{NPC personality-driven intro}",
      accept: "{Grateful response}",
      decline: "{Understanding response}",
      progress: "{Progress check}",
      complete: "{Reward and thanks}"
    },

    // === Rewards (CUSTOMIZE) ===
    rewards: {
      xp: 40,
      gold: 15,
      items: ["{reward_item}"],
      reputation: { dawnmere: 10 }
    }
  }
};

// =====================================================
// STANDARD REWARD SCALES
// Use these values for consistency across languages
// =====================================================

const QUEST_REWARD_SCALES = {
  // Vocabulary lessons
  vocabulary: {
    beginner: { xp: 50, gold: 0, reputation: 10, bonusXP: 15, bonusGold: 5 },
    intermediate: { xp: 70, gold: 5, reputation: 15, bonusXP: 20, bonusGold: 10 },
    advanced: { xp: 100, gold: 10, reputation: 20, bonusXP: 30, bonusGold: 15 }
  },

  // Grammar lessons
  grammar: {
    beginner: { xp: 80, gold: 5, reputation: 15, bonusXP: 20, bonusGold: 10 },
    intermediate: { xp: 120, gold: 15, reputation: 20, bonusXP: 35, bonusGold: 15 },
    advanced: { xp: 180, gold: 25, reputation: 30, bonusXP: 50, bonusGold: 25 }
  },

  // Main story
  mainStory: {
    intro: { xp: 25, gold: 0, reputation: 10 },
    standard: { xp: 50, gold: 10, reputation: 15 },
    milestone: { xp: 100, gold: 25, reputation: 25 },
    zoneBoss: { xp: 200, gold: 50, reputation: 50 }
  },

  // Side quests
  sideQuest: {
    simple: { xp: 30, gold: 10, reputation: 5 },
    standard: { xp: 50, gold: 20, reputation: 10 },
    complex: { xp: 80, gold: 35, reputation: 15 }
  }
};

// =====================================================
// QUEST CATEGORY DEFINITIONS
// Standard categories every language should have
// =====================================================

const QUEST_CATEGORIES = {
  // Vocabulary categories (every language needs these)
  vocabulary: {
    basics: {
      id: "basics",
      name: "Basics",
      description: "Essential vocabulary for beginners",
      subcategories: ["greetings", "introductions", "essentials", "numbers", "colors"]
    },
    daily_life: {
      id: "daily_life",
      name: "Daily Life",
      description: "Words for everyday situations",
      subcategories: ["food", "family", "time", "weather", "clothing"]
    },
    world: {
      id: "world",
      name: "The World",
      description: "Vocabulary for exploring",
      subcategories: ["places", "travel", "nature", "commerce"]
    },
    people: {
      id: "people",
      name: "People & Emotions",
      description: "Describing people and feelings",
      subcategories: ["body", "emotions", "adjectives", "actions"]
    }
  },

  // Grammar categories (language-specific implementations)
  grammar: {
    verbs: {
      id: "verbs",
      name: "Verbs",
      description: "Verb conjugations and tenses",
      // Each language defines their specific verbs
      required: ["to_be", "to_have"]
    },
    nouns: {
      id: "nouns",
      name: "Nouns",
      description: "Noun grammar rules",
      required: ["gender", "articles"]
    },
    structure: {
      id: "structure",
      name: "Sentence Structure",
      description: "How to build sentences",
      required: ["word_order", "questions", "negation"]
    }
  }
};

// =====================================================
// HELPER: Create a vocabulary quest from template
// =====================================================

function createVocabQuest(config) {
  const {
    language,
    topic,
    nativeName,
    nativeDescription,
    icon,
    levelRequired = 1,
    prerequisites = [],
    giver = "isora",
    difficulty = "beginner",
    dialogue,
    tags = [],
    unlocks = {},
    gatheringUnlock = null  // e.g., 'herbalism', 'mining', or ['herbalism', 'mining']
  } = config;

  const rewards = QUEST_REWARD_SCALES.vocabulary[difficulty];

  // Build rewards object
  const rewardsObj = {
    xp: rewards.xp,
    gold: rewards.gold,
    items: [],
    equipment: [],
    unlocks: {
      quests: unlocks.quests || [],
      npcs: unlocks.npcs || [],
      locations: unlocks.locations || [],
      features: unlocks.features || []
    },
    reputation: { dawnmere: rewards.reputation },
    spellbookPages: [`${language}_${topic}`],
    title: null
  };

  // Add gathering skill unlock if specified
  if (gatheringUnlock) {
    rewardsObj.gatheringUnlock = gatheringUnlock;
  }

  return {
    id: `${language}_${topic}_lesson`,
    name: nativeName,
    description: nativeDescription,
    icon: icon,
    type: "lesson",
    category: "vocabulary",
    levelRequired,
    prerequisites,
    location: "dawnmere",
    giver,
    objectives: [{
      id: `learn_${topic}`,
      type: "vocabulary_lesson",
      description: `Learn ${topic} vocabulary`,
      lesson: `${topic}_vocab`
    }],
    objectiveOrder: "any",
    rewards: rewardsObj,
    bonusRewards: {
      condition: "perfect_score",
      xp: rewards.bonusXP,
      gold: rewards.bonusGold,
      items: []
    },
    cooldown: null,
    dialogue,
    tags: ["vocabulary", difficulty, ...tags],
    hidden: false
  };
}

// =====================================================
// HELPER: Create a grammar quest from template
// =====================================================

function createGrammarQuest(config) {
  const {
    language,
    topic,
    nativeName,
    nativeDescription,
    icon,
    levelRequired = 2,
    prerequisites = [],
    giver = "sage_aldric",
    difficulty = "beginner",
    exercises = { conjugation: 6, fillBlank: 4, matching: 0 },
    dialogue,
    tags = [],
    unlocks = {}
  } = config;

  const rewards = QUEST_REWARD_SCALES.grammar[difficulty];

  return {
    id: `${language}_grammar_${topic}`,
    name: nativeName,
    description: nativeDescription,
    icon: icon,
    type: "lesson",
    category: "grammar",
    levelRequired,
    prerequisites,
    location: "dawnmere",
    giver,
    objectives: [{
      id: `learn_${topic}`,
      type: "grammar_lesson",
      description: `Learn ${topic}`,
      exercises
    }],
    objectiveOrder: "sequential",
    rewards: {
      xp: rewards.xp,
      gold: rewards.gold,
      items: [],
      equipment: [],
      unlocks: {
        quests: unlocks.quests || [],
        npcs: unlocks.npcs || [],
        locations: unlocks.locations || [],
        features: unlocks.features || []
      },
      reputation: { dawnmere: rewards.reputation },
      spellbookPages: [`${language}_${topic}`],
      title: null
    },
    bonusRewards: {
      condition: "perfect_score",
      xp: rewards.bonusXP,
      gold: rewards.bonusGold,
      items: []
    },
    cooldown: null,
    dialogue,
    tags: ["grammar", difficulty, ...tags],
    hidden: false
  };
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    QUEST_TEMPLATES,
    QUEST_REWARD_SCALES,
    QUEST_CATEGORIES,
    createVocabQuest,
    createGrammarQuest
  };
}

if (typeof window !== 'undefined') {
  window.QUEST_TEMPLATES = QUEST_TEMPLATES;
  window.QUEST_REWARD_SCALES = QUEST_REWARD_SCALES;
  window.QUEST_CATEGORIES = QUEST_CATEGORIES;
  window.createVocabQuest = createVocabQuest;
  window.createGrammarQuest = createGrammarQuest;
}
