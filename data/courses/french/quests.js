// ByteQuest - French Course Quests
// Quest definitions for the French language course
// Version 2.0 - New Quest System
//
// This file combines all quest types into FRENCH_QUESTS:
// - MAIN_STORY_QUESTS (from mainStoryQuests.js)
// - SIDE_QUESTS (from sideQuests.js)
// - GRAMMAR_QUESTS (from grammarQuests.js)
// - Vocabulary lesson quests (defined below)
//
// VOCABULARY QUEST IDs use universal format: vl_XX_topic
// This allows all languages to share the same quest structure

const VOCABULARY_QUESTS = {
  // =====================================================
  // BEGINNER LESSONS - First Steps (Zone 1)
  // Universal IDs: vl_01 through vl_08
  // =====================================================

  vl_01_greetings: {
    // === Identity ===
    id: "vl_01_greetings",
    name: "Les Salutations",           // Language-specific display name
    description: "Apprendre les salutations essentielles en français",
    icon: "👋",

    // === Classification ===
    type: "lesson",
    category: "basics",
    vocabCategory: "greetings",        // Maps to vocabulary data

    // === Requirements ===
    levelRequired: 1,
    prerequisites: [],
    location: "dawnmere",

    // === Quest Giver ===
    giver: "isora",

    // === Objectives ===
    objectives: [
      {
        id: "learn_greetings",
        type: "vocabulary_lesson",
        description: "Complete the greetings lesson",
        lesson: "greetings_vocab"
      }
    ],
    objectiveOrder: "any",

    // === Rewards ===
    rewards: {
      xp: 60,
      gold: 25,
      items: [],
      equipment: [],
      unlocks: {
        quests: ["vl_02_introductions"],
        npcs: [],
        locations: [],
        features: []
      },
      reputation: {
        dawnmere: 10
      },
      spellbookPages: ["greetings"],
      title: null,
      // Unlock herbalism gathering skill as reward for first lesson
      gatheringUnlock: "herbalism"
    },

    // === Bonus Rewards ===
    bonusRewards: {
      condition: "perfect_score",
      xp: 20,
      gold: 15,
      items: []
    },

    // === Repeatable Settings ===
    cooldown: null,

    // === Dialogue ===
    dialogue: {
      intro: "Bonjour! Welcome to your French journey! Let's start with the essential greetings every traveler should know.",
      accept: "Excellent choice! Practice these greetings well - they'll serve you throughout your travels in French-speaking lands.",
      decline: "No worries, take your time. I'll be here when you're ready to begin.",
      turnIn: "Magnifique! You've mastered the French greetings! Now you can properly greet anyone you meet on your journey.",
      inProgress: "Still practicing those greetings? Take your time - proper pronunciation takes practice!"
    },

    // === Metadata ===
    tags: ["beginner", "essential", "social"],
    hidden: false
  },

  vl_02_introductions: {
    // === Identity ===
    id: "vl_02_introductions",
    name: "Les Présentations",
    description: "Apprendre à se présenter en français",
    icon: "🤝",

    // === Classification ===
    type: "lesson",
    category: "basics",
    vocabCategory: "introductions",

    // === Requirements ===
    levelRequired: 2,
    prerequisites: ["vl_01_greetings"],
    location: "dawnmere",

    // === Quest Giver ===
    giver: "isora",

    // === Objectives ===
    objectives: [
      {
        id: "learn_introductions",
        type: "vocabulary_lesson",
        description: "Complete the introductions lesson",
        lesson: "introductions_vocab"
      }
    ],
    objectiveOrder: "any",

    // === Rewards ===
    rewards: {
      xp: 70,
      gold: 30,
      items: [],
      equipment: [],
      unlocks: {
        quests: ["vl_03_essentials"],
        npcs: [],
        locations: [],
        features: []
      },
      reputation: {
        dawnmere: 15
      },
      spellbookPages: ["pronouns", "introductions"],
      title: null
    },

    // === Bonus Rewards ===
    bonusRewards: {
      condition: "perfect_score",
      xp: 25,
      gold: 20,
      items: []
    },

    // === Repeatable Settings ===
    cooldown: null,

    // === Dialogue ===
    dialogue: {
      intro: "Now that you know how to greet people, it's time to learn how to introduce yourself properly in French!",
      accept: "Wonderful! Being able to introduce yourself will open many doors on your journey.",
      decline: "That's fine. Come back when you're ready to learn introductions.",
      turnIn: "Très bien! You can now introduce yourself with confidence. The people of France will appreciate your effort!",
      inProgress: "How's your practice going? Remember, introducing yourself is one of the most important skills!"
    },

    // === Metadata ===
    tags: ["beginner", "essential", "social"],
    hidden: false
  },

  vl_03_essentials: {
    // === Identity ===
    id: "vl_03_essentials",
    name: "Phrases Essentielles",
    description: "Phrases de survie pour les situations quotidiennes",
    icon: "📖",

    // === Classification ===
    type: "lesson",
    category: "basics",
    vocabCategory: "essentials",

    // === Requirements ===
    levelRequired: 2,
    prerequisites: ["vl_02_introductions"],
    location: "dawnmere",

    // === Quest Giver ===
    giver: "isora",

    // === Objectives ===
    objectives: [
      {
        id: "learn_essentials",
        type: "vocabulary_lesson",
        description: "Complete the essential phrases lesson",
        lesson: "essentials_vocab"
      }
    ],
    objectiveOrder: "any",

    // === Rewards ===
    rewards: {
      xp: 80,
      gold: 35,
      items: [],
      equipment: [],
      unlocks: {
        quests: ["vl_04_numbers"],
        npcs: [],
        locations: [],
        features: []
      },
      reputation: {
        dawnmere: 20
      },
      spellbookPages: ["essentials", "courtesy"],
      title: null
    },

    // === Bonus Rewards ===
    bonusRewards: {
      condition: "perfect_score",
      xp: 30,
      gold: 25,
      items: []
    },

    // === Repeatable Settings ===
    cooldown: null,

    // === Dialogue ===
    dialogue: {
      intro: "You've learned greetings and introductions - excellent! Now let's cover the essential phrases you'll need for everyday situations.",
      accept: "Perfect! These phrases are your survival kit for French-speaking lands. Master them well!",
      decline: "No problem. These essentials will be here whenever you're ready.",
      turnIn: "Fantastique! With these essential phrases, you're well-equipped to handle most common situations. You're making great progress!",
      inProgress: "Practicing the essentials? Keep at it - these will be some of your most-used phrases!"
    },

    // === Metadata ===
    tags: ["beginner", "essential", "practical"],
    hidden: false
  },

  vl_04_numbers: {
    // === Identity ===
    id: "vl_04_numbers",
    name: "Les Nombres",
    description: "Apprendre à compter de zéro à dix",
    icon: "🔢",

    // === Classification ===
    type: "lesson",
    category: "basics",
    vocabCategory: "numbers",

    // === Requirements ===
    levelRequired: 1,
    prerequisites: [],
    location: "dawnmere",

    // === Quest Giver ===
    giver: "isora",

    // === Objectives ===
    objectives: [
      {
        id: "learn_numbers",
        type: "vocabulary_lesson",
        description: "Learn numbers 0-10",
        lesson: "numbers_vocab"
      }
    ],
    objectiveOrder: "any",

    // === Rewards ===
    rewards: {
      xp: 55,
      gold: 25,
      items: [],
      equipment: [],
      unlocks: {
        quests: ["vl_05_colors"],
        npcs: [],
        locations: [],
        features: []
      },
      reputation: {
        dawnmere: 10
      },
      spellbookPages: ["numbers"],
      title: null
    },

    // === Bonus Rewards ===
    bonusRewards: {
      condition: "perfect_score",
      xp: 15,
      gold: 15,
      items: []
    },

    // === Repeatable Settings ===
    cooldown: null,

    // === Dialogue ===
    dialogue: {
      intro: "Numbers are the foundation of trade and daily life! Let me teach you to count from zero to ten in French.",
      accept: "Excellent! Counting may seem simple, but it's essential for bargaining at the market and understanding directions.",
      decline: "Numbers can wait, but you'll need them sooner than you think!",
      turnIn: "Parfait! You can count like a native now. From zéro to dix - you've mastered the basics!",
      inProgress: "How's the counting coming along? Remember: un, deux, trois..."
    },

    // === Metadata ===
    tags: ["beginner", "essential", "numbers"],
    hidden: false
  },

  vl_05_colors: {
    // === Identity ===
    id: "vl_05_colors",
    name: "Les Couleurs",
    description: "Apprendre les couleurs de base",
    icon: "🎨",

    // === Classification ===
    type: "lesson",
    category: "basics",
    vocabCategory: "colors",

    // === Requirements ===
    levelRequired: 1,
    prerequisites: [],
    location: "dawnmere",

    // === Quest Giver ===
    giver: "isora",

    // === Objectives ===
    objectives: [
      {
        id: "learn_colors",
        type: "vocabulary_lesson",
        description: "Learn basic color words",
        lesson: "colors_vocab"
      }
    ],
    objectiveOrder: "any",

    // === Rewards ===
    rewards: {
      xp: 55,
      gold: 25,
      items: [],
      equipment: [],
      unlocks: {
        quests: ["vl_06_days"],
        npcs: [],
        locations: [],
        features: []
      },
      reputation: {
        dawnmere: 10
      },
      spellbookPages: ["colors"],
      title: null
    },

    // === Bonus Rewards ===
    bonusRewards: {
      condition: "perfect_score",
      xp: 15,
      gold: 15,
      items: []
    },

    // === Repeatable Settings ===
    cooldown: null,

    // === Dialogue ===
    dialogue: {
      intro: "The world is full of beautiful colors! Let me teach you to describe them in French.",
      accept: "Wonderful! Colors help you describe everything around you - from the blue sky to the green fields.",
      decline: "The colors will be here when you're ready to see them!",
      turnIn: "Magnifique! Now you can paint the world with French words. Rouge, bleu, vert - you know them all!",
      inProgress: "Can you name the colors you see? Look around - what color is the sky?"
    },

    // === Metadata ===
    tags: ["beginner", "essential", "descriptive"],
    hidden: false
  },

  vl_06_days: {
    // === Identity ===
    id: "vl_06_days",
    name: "Les Jours de la Semaine",
    description: "Apprendre les jours de la semaine",
    icon: "📅",

    // === Classification ===
    type: "lesson",
    category: "basics",
    vocabCategory: "days",

    // === Requirements ===
    levelRequired: 1,
    prerequisites: [],
    location: "dawnmere",

    // === Quest Giver ===
    giver: "isora",

    // === Objectives ===
    objectives: [
      {
        id: "learn_days",
        type: "vocabulary_lesson",
        description: "Learn the days of the week",
        lesson: "days_vocab"
      }
    ],
    objectiveOrder: "any",

    // === Rewards ===
    rewards: {
      xp: 50,
      gold: 25,
      items: [],
      equipment: [],
      unlocks: {
        quests: ["vl_07_cognates"],
        npcs: [],
        locations: [],
        features: []
      },
      reputation: {
        dawnmere: 10
      },
      spellbookPages: ["days"],
      title: null
    },

    // === Bonus Rewards ===
    bonusRewards: {
      condition: "perfect_score",
      xp: 15,
      gold: 15,
      items: []
    },

    // === Repeatable Settings ===
    cooldown: null,

    // === Dialogue ===
    dialogue: {
      intro: "To plan your adventures, you'll need to know the days of the week! Let me teach you from lundi to dimanche.",
      accept: "Perfect! Knowing the days helps you make plans and understand when shops are open or closed.",
      decline: "The days will keep passing whether you learn them or not! Come back when ready.",
      turnIn: "Excellent! From lundi through dimanche, you now command the French week. Time itself speaks to you in French!",
      inProgress: "What day is it today? Can you say it in French?"
    },

    // === Metadata ===
    tags: ["beginner", "essential", "time"],
    hidden: false
  },

  vl_07_cognates: {
    // === Identity ===
    id: "vl_07_cognates",
    name: "Mots Familiers",
    description: "Découvrir des mots français similaires à l'anglais",
    icon: "🔗",

    // === Classification ===
    type: "lesson",
    category: "basics",
    vocabCategory: "cognates",

    // === Requirements ===
    levelRequired: 1,
    prerequisites: [],
    location: "dawnmere",

    // === Quest Giver ===
    giver: "isora",

    // === Objectives ===
    objectives: [
      {
        id: "learn_cognates",
        type: "vocabulary_lesson",
        description: "Learn French-English cognates",
        lesson: "cognates_vocab"
      }
    ],
    objectiveOrder: "any",

    // === Rewards ===
    rewards: {
      xp: 50,
      gold: 30,
      items: [],
      equipment: [],
      unlocks: {
        quests: [],
        npcs: [],
        locations: [],
        features: []
      },
      reputation: {
        dawnmere: 10
      },
      spellbookPages: ["cognates"],
      title: null
    },

    // === Bonus Rewards ===
    bonusRewards: {
      condition: "perfect_score",
      xp: 15,
      gold: 20,
      items: []
    },

    // === Repeatable Settings ===
    cooldown: null,

    // === Dialogue ===
    dialogue: {
      intro: "Here's a secret - you already know more French than you think! Many words are the same or very similar to English.",
      accept: "That's the spirit! These cognates will boost your confidence. You'll see how much French you already understand!",
      decline: "Take your time. But trust me, this lesson will surprise you!",
      turnIn: "You see? Table, animal, restaurant, hotel - you knew these words all along! French isn't as foreign as it seems.",
      inProgress: "Finding the similarities? It's like discovering old friends in a new language!"
    },

    // === Metadata ===
    tags: ["beginner", "confidence", "cognates"],
    hidden: false
  },

  // =====================================================
  // ZONE 2 LESSONS - The Haari Fields (Levels 5-10)
  // Universal IDs: vl_08 through vl_13
  // =====================================================

  vl_08_family: {
    // === Identity ===
    id: "vl_08_family",
    name: "La Famille",
    description: "Apprendre les membres de la famille en français",
    icon: "👨‍👩‍👧‍👦",

    // === Classification ===
    type: "lesson",
    category: "people",
    vocabCategory: "family",

    // === Requirements ===
    levelRequired: 6,
    prerequisites: ["vl_07_cognates"],
    location: "haari_fields",

    // === Quest Giver ===
    giver: "dave",

    // === Objectives ===
    objectives: [
      {
        id: "learn_family",
        type: "vocabulary_lesson",
        description: "Complete the family vocabulary lesson",
        lesson: "family_vocab"
      }
    ],
    objectiveOrder: "any",

    // === Rewards ===
    rewards: {
      xp: 65,
      gold: 30,
      items: [],
      equipment: [],
      unlocks: {
        quests: ["vl_09_food"],
        npcs: [],
        locations: [],
        features: []
      },
      reputation: {
        haari_fields: 15
      },
      spellbookPages: ["family"],
      title: null
    },

    // === Bonus Rewards ===
    bonusRewards: {
      condition: "perfect_score",
      xp: 20,
      gold: 15,
      items: []
    },

    // === Repeatable Settings ===
    cooldown: null,

    // === Dialogue ===
    dialogue: {
      intro: "Ah, you've come from Dawnmere! Here in the Haari Fields, family is everything. Let me teach you how we speak of our loved ones.",
      accept: "Wonderful! Knowing family words will help you understand the bonds that hold our farming community together.",
      decline: "No worries, come back when you're ready. Family will always be waiting.",
      turnIn: "Très bien! Now you can speak of la mère, le père, and all the family. You understand what binds us together!",
      inProgress: "How goes the learning? Remember, every family member has their own word in French."
    },

    // === Metadata ===
    tags: ["beginner", "essential", "people"],
    hidden: false
  },

  vl_09_food: {
    // === Identity ===
    id: "vl_09_food",
    name: "La Nourriture",
    description: "Apprendre le vocabulaire de la nourriture et des repas",
    icon: "🍞",

    // === Classification ===
    type: "lesson",
    category: "daily_life",
    vocabCategory: "food",

    // === Requirements ===
    levelRequired: 7,
    prerequisites: ["vl_08_family"],
    location: "haari_fields",

    // === Quest Giver ===
    giver: "lyra",

    // === Objectives ===
    objectives: [
      {
        id: "learn_food",
        type: "vocabulary_lesson",
        description: "Complete the food vocabulary lesson",
        lesson: "food_vocab"
      }
    ],
    objectiveOrder: "any",

    // === Rewards ===
    rewards: {
      xp: 70,
      gold: 35,
      items: [],
      equipment: [],
      unlocks: {
        quests: ["vl_10_weather"],
        npcs: [],
        locations: [],
        features: []
      },
      reputation: {
        haari_fields: 15
      },
      spellbookPages: ["food"],
      title: null
    },

    // === Bonus Rewards ===
    bonusRewards: {
      condition: "perfect_score",
      xp: 20,
      gold: 20,
      items: []
    },

    // === Repeatable Settings ===
    cooldown: null,

    // === Dialogue ===
    dialogue: {
      intro: "The fields provide so much bounty! Let me teach you the words for the food we grow and eat here.",
      accept: "Excellent! Knowing food vocabulary is essential - whether you're ordering at a tavern or trading at the market.",
      decline: "The harvest will be here when you're hungry for knowledge!",
      turnIn: "Magnifique! From le pain to la viande, you now know how to speak of food. You'll never go hungry in French lands!",
      inProgress: "Getting hungry for more words? Food vocabulary is delicious to learn!"
    },

    // === Metadata ===
    tags: ["beginner", "essential", "practical"],
    hidden: false
  },

  vl_10_weather: {
    // === Identity ===
    id: "vl_10_weather",
    name: "Le Temps",
    description: "Apprendre à parler du temps qu'il fait",
    icon: "☀️",

    // === Classification ===
    type: "lesson",
    category: "daily_life",
    vocabCategory: "weather",

    // === Requirements ===
    levelRequired: 7,
    prerequisites: ["vl_09_food"],
    location: "haari_fields",

    // === Quest Giver ===
    giver: "rask",

    // === Objectives ===
    objectives: [
      {
        id: "learn_weather",
        type: "vocabulary_lesson",
        description: "Complete the weather vocabulary lesson",
        lesson: "weather_vocab"
      }
    ],
    objectiveOrder: "any",

    // === Rewards ===
    rewards: {
      xp: 65,
      gold: 30,
      items: [],
      equipment: [],
      unlocks: {
        quests: ["vl_11_animals"],
        npcs: [],
        locations: [],
        features: []
      },
      reputation: {
        haari_fields: 15
      },
      spellbookPages: ["weather"],
      title: null
    },

    // === Bonus Rewards ===
    bonusRewards: {
      condition: "perfect_score",
      xp: 20,
      gold: 15,
      items: []
    },

    // === Repeatable Settings ===
    cooldown: null,

    // === Dialogue ===
    dialogue: {
      intro: "A tracker must know the weather. Out here in the fields, we watch the sky constantly. Let me teach you the words.",
      accept: "Good thinking! Weather affects everything - travel, farming, hunting. These words will serve you well.",
      decline: "Fair enough. The weather will change whether you have words for it or not!",
      turnIn: "Excellent! Now you can discuss le soleil, la pluie, and everything in between. The sky speaks to you in French!",
      inProgress: "What's the weather like today? Can you describe it in French?"
    },

    // === Metadata ===
    tags: ["beginner", "practical", "nature"],
    hidden: false
  },

  vl_11_animals: {
    // === Identity ===
    id: "vl_11_animals",
    name: "Les Animaux",
    description: "Apprendre les noms des animaux de la ferme",
    icon: "🐄",

    // === Classification ===
    type: "lesson",
    category: "nature",
    vocabCategory: "animals",

    // === Requirements ===
    levelRequired: 8,
    prerequisites: ["vl_10_weather"],
    location: "haari_fields",

    // === Quest Giver ===
    giver: "shepherd_marcus",

    // === Objectives ===
    objectives: [
      {
        id: "learn_animals",
        type: "vocabulary_lesson",
        description: "Complete the farm animals vocabulary lesson",
        lesson: "animals_vocab"
      }
    ],
    objectiveOrder: "any",

    // === Rewards ===
    rewards: {
      xp: 70,
      gold: 35,
      items: [],
      equipment: [],
      unlocks: {
        quests: ["vl_12_body"],
        npcs: [],
        locations: [],
        features: []
      },
      reputation: {
        haari_fields: 15
      },
      spellbookPages: ["animals"],
      title: null
    },

    // === Bonus Rewards ===
    bonusRewards: {
      condition: "perfect_score",
      xp: 25,
      gold: 20,
      items: []
    },

    // === Repeatable Settings ===
    cooldown: null,

    // === Dialogue ===
    dialogue: {
      intro: "The animals are my life! Each one has a name, and each one has a French word. Come, let me introduce you.",
      accept: "Wonderful! Learning animal names will help you understand farm life here in the Haari Fields.",
      decline: "The animals will wait. They're patient creatures.",
      turnIn: "Bravo! From la vache to le mouton, you now speak the language of the farm. The animals appreciate it!",
      inProgress: "Have you been practicing? Try pointing at an animal and naming it in French!"
    },

    // === Metadata ===
    tags: ["beginner", "nature", "practical"],
    hidden: false
  },

  vl_12_body: {
    // === Identity ===
    id: "vl_12_body",
    name: "Le Corps Humain",
    description: "Apprendre les parties du corps humain",
    icon: "🫀",

    // === Classification ===
    type: "lesson",
    category: "people",
    vocabCategory: "body",

    // === Requirements ===
    levelRequired: 9,
    prerequisites: ["vl_11_animals"],
    location: "haari_fields",

    // === Quest Giver ===
    giver: "healer_mira",

    // === Objectives ===
    objectives: [
      {
        id: "learn_body",
        type: "vocabulary_lesson",
        description: "Complete the body parts vocabulary lesson",
        lesson: "body_vocab"
      }
    ],
    objectiveOrder: "any",

    // === Rewards ===
    rewards: {
      xp: 75,
      gold: 40,
      items: [],
      equipment: [],
      unlocks: {
        quests: ["vl_13_clothing"],
        npcs: [],
        locations: [],
        features: []
      },
      reputation: {
        haari_fields: 20
      },
      spellbookPages: ["body"],
      title: null
    },

    // === Bonus Rewards ===
    bonusRewards: {
      condition: "perfect_score",
      xp: 25,
      gold: 20,
      items: []
    },

    // === Repeatable Settings ===
    cooldown: null,

    // === Dialogue ===
    dialogue: {
      intro: "As a healer, I must know every part of the body. If you can describe your ailment in French, any healer can help you.",
      accept: "Smart thinking! Body vocabulary is essential - for health, for description, for so many things.",
      decline: "Take care of yourself. Come back when you're ready to learn.",
      turnIn: "Parfait! From la tête to les pieds, you know the body in French. This knowledge may save your life one day!",
      inProgress: "How's the studying? Touch your nose and say it in French - le nez!"
    },

    // === Metadata ===
    tags: ["intermediate", "essential", "health"],
    hidden: false
  },

  vl_13_clothing: {
    // === Identity ===
    id: "vl_13_clothing",
    name: "Les Vêtements",
    description: "Apprendre les noms des vêtements",
    icon: "👕",

    // === Classification ===
    type: "lesson",
    category: "daily_life",
    vocabCategory: "clothing",

    // === Requirements ===
    levelRequired: 10,
    prerequisites: ["vl_12_body"],
    location: "haari_fields",

    // === Quest Giver ===
    giver: "merchant_henri",

    // === Objectives ===
    objectives: [
      {
        id: "learn_clothing",
        type: "vocabulary_lesson",
        description: "Complete the clothing vocabulary lesson",
        lesson: "clothing_vocab"
      }
    ],
    objectiveOrder: "any",

    // === Rewards ===
    rewards: {
      xp: 80,
      gold: 45,
      items: [],
      equipment: [],
      unlocks: {
        quests: [],
        npcs: [],
        locations: [],
        features: []
      },
      reputation: {
        haari_fields: 20
      },
      spellbookPages: ["clothing"],
      title: null
    },

    // === Bonus Rewards ===
    bonusRewards: {
      condition: "perfect_score",
      xp: 30,
      gold: 25,
      items: []
    },

    // === Repeatable Settings ===
    cooldown: null,

    // === Dialogue ===
    dialogue: {
      intro: "Welcome to my humble cart! A traveler needs proper clothing. Let me teach you the words, then perhaps you'll buy something?",
      accept: "Excellent! Knowing clothing vocabulary helps with shopping, descriptions, and staying warm in any weather.",
      decline: "The clothes will still be here when you return. Though the best items go quickly!",
      turnIn: "Très bien! From la chemise to les bottes, you speak the language of fashion. You'll be well-dressed in any French city!",
      inProgress: "What are you wearing right now? Can you describe it in French?"
    },

    // === Metadata ===
    tags: ["intermediate", "practical", "shopping"],
    hidden: false
  }
};

// =====================================================
// FRENCH_QUESTS - Combined quest registry
// Merges all quest types for CourseLoader compatibility
// =====================================================

const FRENCH_QUESTS = {
  // Spread in all quest types
  ...(typeof MAIN_STORY_QUESTS !== 'undefined' ? MAIN_STORY_QUESTS : {}),
  ...(typeof SIDE_QUESTS !== 'undefined' ? SIDE_QUESTS : {}),
  ...(typeof GRAMMAR_QUESTS !== 'undefined' ? GRAMMAR_QUESTS : {}),
  ...VOCABULARY_QUESTS,

  // Meta info for quest system
  _meta: {
    language: "french",
    questTypes: {
      main: "MAIN_STORY_QUESTS",
      side: "SIDE_QUESTS",
      grammar: "GRAMMAR_QUESTS",
      vocabulary: "VOCABULARY_QUESTS"
    }
  }
};

// Export for module system (Node.js compatibility)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FRENCH_QUESTS, VOCABULARY_QUESTS };
}

// Also make available globally for browser
if (typeof window !== 'undefined') {
  window.FRENCH_QUESTS = FRENCH_QUESTS;
  window.VOCABULARY_QUESTS = VOCABULARY_QUESTS;
}
