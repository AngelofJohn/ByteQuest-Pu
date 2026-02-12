// ByteQuest - Greek Course Quests
// Quest definitions for the Greek language course
//
// QUEST ID FORMAT:
// - vl_XX_topic = Vocabulary Lessons (universal across languages)
// - gl_XX_topic = Grammar Lessons (universal across languages)
// - al_XX_topic = Alphabet Lessons (language-specific for non-Latin scripts)
//
// This allows courses to share structure while accommodating language-specific needs

const GREEK_QUESTS = {
  // =====================================================
  // ALPHABET LESSONS - Unique to Greek (al_ prefix)
  // These are language-specific prerequisites
  // =====================================================

  al_01_alphabet: {
    id: "al_01_alphabet",
    name: "The Greek Alphabet",
    description: "Learn the 24 letters of the Greek alphabet",
    icon: "🔤",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "alphabet",
    vocabCategory: "alphabet",
    status: "available",
    levelRequired: 1,
    prerequisites: [],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_alphabet",
        type: "lesson",
        text: "Learn the Greek alphabet",
        target: null,
        vocabularySource: {
          category: "basics",
          subcategory: "alphabet"
        }
      }
    ],
    dialogue: {
      intro: "Welcome to Greek! The alphabet is different from English, but don't worry - we'll master it together!",
      accept: "Let's begin! Alpha, Beta, Gamma... these letters will become familiar friends.",
      decline: "Take your time. The alphabet will be here when you're ready.",
      complete: "Excellent! You've learned the Greek alphabet!"
    },
    rewards: {
      xp: 50,
      gold: 20,
      spellbookPages: ["alphabet"],
      unlocks: {
        quests: ["al_02_vowels"]
      }
    }
  },

  al_02_vowels: {
    id: "al_02_vowels",
    name: "Greek Vowels",
    description: "Master the 7 vowel letters and their sounds",
    icon: "🔊",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "alphabet",
    vocabCategory: "vowels",
    status: "locked",
    levelRequired: 1,
    prerequisites: ["al_01_alphabet"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_vowels",
        type: "lesson",
        text: "Learn Greek vowels",
        target: null
      }
    ],
    dialogue: {
      intro: "Now let's focus on the 7 vowel letters and their sounds.",
      accept: "Greek vowels are the heart of pronunciation. Let's master them!",
      decline: "Vowels can wait - but you'll need them for speaking!",
      complete: "Great! You've mastered the Greek vowels!"
    },
    rewards: {
      xp: 40,
      gold: 15,
      spellbookPages: ["alphabet_vowels"],
      unlocks: {
        quests: ["al_03_digraphs"]
      }
    }
  },

  al_03_digraphs: {
    id: "al_03_digraphs",
    name: "Letter Combinations",
    description: "Learn the special letter pairs that make unique sounds",
    icon: "🔗",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "alphabet",
    vocabCategory: "digraphs",
    status: "locked",
    levelRequired: 2,
    prerequisites: ["al_02_vowels"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_digraphs",
        type: "lesson",
        text: "Learn Greek letter combinations",
        target: null
      }
    ],
    dialogue: {
      intro: "Some letter pairs create completely new sounds. Let's learn the digraphs!",
      accept: "These combinations unlock the full range of Greek sounds!",
      decline: "Letter pairs can be tricky - come back when ready.",
      complete: "Perfect! You now understand Greek letter combinations!"
    },
    rewards: {
      xp: 50,
      gold: 20,
      spellbookPages: ["digraphs"],
      unlocks: {
        quests: ["vl_01_greetings"]
      }
    }
  },

  // =====================================================
  // VOCABULARY LESSONS - Universal IDs (vl_ prefix)
  // Same structure as French and other languages
  // =====================================================

  vl_01_greetings: {
    id: "vl_01_greetings",
    name: "Χαιρετισμοί",           // Greek: Greetings
    description: "Essential Greek greetings and farewells",
    icon: "👋",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "basics",
    vocabCategory: "greetings",
    status: "available",
    levelRequired: 1,
    prerequisites: [],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_greetings",
        type: "vocabulary_lesson",
        text: "Learn Greek greetings",
        lesson: "greetings_vocab"
      }
    ],
    dialogue: {
      intro: "Γεια σας! Let's learn the essential Greek greetings!",
      accept: "Greetings are the first step to connecting with people!",
      decline: "Come back when you're ready to say hello!",
      complete: "Excellent! You can now greet people in Greek!"
    },
    rewards: {
      xp: 60,
      gold: 25,
      spellbookPages: ["greetings"],
      gatheringUnlock: "herbalism",
      unlocks: {
        quests: ["vl_02_introductions"]
      }
    }
  },

  vl_02_introductions: {
    id: "vl_02_introductions",
    name: "Συστάσεις",              // Greek: Introductions
    description: "Learn to introduce yourself in Greek",
    icon: "🤝",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "basics",
    vocabCategory: "introductions",
    status: "locked",
    levelRequired: 2,
    prerequisites: ["vl_01_greetings"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_introductions",
        type: "vocabulary_lesson",
        text: "Learn Greek introductions",
        lesson: "introductions_vocab"
      }
    ],
    dialogue: {
      intro: "Let's learn how to introduce yourself in Greek!",
      accept: "Being able to introduce yourself opens many doors!",
      decline: "Introductions can wait - come back when ready.",
      complete: "Great! You can now introduce yourself in Greek!"
    },
    rewards: {
      xp: 70,
      gold: 25,
      spellbookPages: ["pronouns", "introductions"],
      unlocks: {
        quests: ["vl_03_essentials"]
      }
    }
  },

  vl_03_essentials: {
    id: "vl_03_essentials",
    name: "Βασικές Φράσεις",        // Greek: Essential Phrases
    description: "Survival Greek for everyday situations",
    icon: "📖",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "basics",
    vocabCategory: "essentials",
    status: "locked",
    levelRequired: 2,
    prerequisites: ["vl_02_introductions"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_essentials",
        type: "vocabulary_lesson",
        text: "Learn essential Greek phrases",
        lesson: "essentials_vocab"
      }
    ],
    dialogue: {
      intro: "Let's learn essential Greek phrases for everyday use!",
      accept: "These phrases will be your survival kit!",
      decline: "Essentials will be here when you need them.",
      complete: "Perfect! You now know the essential phrases!"
    },
    rewards: {
      xp: 80,
      gold: 30,
      spellbookPages: ["essentials", "courtesy"],
      unlocks: {
        quests: ["vl_04_numbers"]
      }
    }
  },

  vl_04_numbers: {
    id: "vl_04_numbers",
    name: "Αριθμοί",                // Greek: Numbers
    description: "Learn to count in Greek",
    icon: "🔢",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "basics",
    vocabCategory: "numbers",
    status: "locked",
    levelRequired: 1,
    prerequisites: [],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_numbers",
        type: "vocabulary_lesson",
        text: "Learn Greek numbers",
        lesson: "numbers_vocab"
      }
    ],
    dialogue: {
      intro: "Numbers are essential for shopping and directions!",
      accept: "Ένα, δύο, τρία... Let's count in Greek!",
      decline: "Numbers can wait, but you'll need them soon!",
      complete: "Excellent! You can now count in Greek!"
    },
    rewards: {
      xp: 55,
      gold: 20,
      spellbookPages: ["numbers"],
      unlocks: {
        quests: ["vl_05_colors"]
      }
    }
  },

  vl_05_colors: {
    id: "vl_05_colors",
    name: "Χρώματα",                // Greek: Colors
    description: "Learn the colors in Greek",
    icon: "🎨",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "basics",
    vocabCategory: "colors",
    status: "locked",
    levelRequired: 1,
    prerequisites: [],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_colors",
        type: "vocabulary_lesson",
        text: "Learn Greek color words",
        lesson: "colors_vocab"
      }
    ],
    dialogue: {
      intro: "The world is colorful! Let's learn how to describe it!",
      accept: "Colors bring descriptions to life!",
      decline: "Colors will be here when you're ready.",
      complete: "Wonderful! You can now describe colors in Greek!"
    },
    rewards: {
      xp: 55,
      gold: 20,
      spellbookPages: ["colors"],
      unlocks: {
        quests: ["vl_06_days"]
      }
    }
  },

  vl_06_days: {
    id: "vl_06_days",
    name: "Μέρες της Εβδομάδας",    // Greek: Days of the Week
    description: "Learn the days of the week",
    icon: "📅",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "basics",
    vocabCategory: "days",
    status: "locked",
    levelRequired: 1,
    prerequisites: [],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_days",
        type: "vocabulary_lesson",
        text: "Learn the Greek days of the week",
        lesson: "days_vocab"
      }
    ],
    dialogue: {
      intro: "From Δευτέρα to Κυριακή - let's learn the Greek week!",
      accept: "Knowing the days helps you plan and navigate!",
      decline: "The days will keep passing - come back when ready!",
      complete: "Perfect! You now know the days of the week in Greek!"
    },
    rewards: {
      xp: 50,
      gold: 20,
      spellbookPages: ["days"],
      unlocks: {
        quests: ["vl_07_family"]
      }
    }
  },

  vl_07_family: {
    id: "vl_07_family",
    name: "Οικογένεια",             // Greek: Family
    description: "Learn to talk about your family",
    icon: "👨‍👩‍👧‍👦",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "family",
    vocabCategory: "family",
    status: "locked",
    levelRequired: 3,
    prerequisites: ["vl_03_essentials"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_family",
        type: "vocabulary_lesson",
        text: "Learn Greek family vocabulary",
        lesson: "family_vocab"
      }
    ],
    dialogue: {
      intro: "Family is important in Greek culture. Let's learn the words!",
      accept: "Μητέρα, πατέρας, αδερφός... these words connect us!",
      decline: "Family vocabulary can wait.",
      complete: "Perfect! You can now describe your family!"
    },
    rewards: {
      xp: 90,
      gold: 30,
      spellbookPages: ["family"]
    }
  },

  // =====================================================
  // GRAMMAR LESSONS - Universal IDs (gl_ prefix)
  // =====================================================

  gl_01_to_be: {
    id: "gl_01_to_be",
    name: "Είμαι - To Be",
    description: "Conjugate the most essential Greek verb",
    icon: "📝",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "verbs",
    vocabCategory: "verb_to_be",
    status: "locked",
    levelRequired: 3,
    prerequisites: ["vl_03_essentials"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_eime",
        type: "grammar_lesson",
        text: "Learn the verb είμαι (to be)",
        lesson: "verb_to_be"
      }
    ],
    dialogue: {
      intro: "Let's learn the most important Greek verb: είμαι (to be)!",
      accept: "This verb is the foundation of Greek sentences!",
      decline: "Grammar can wait - but you'll need this verb soon!",
      complete: "Excellent! You've mastered the verb 'to be' in Greek!"
    },
    rewards: {
      xp: 100,
      gold: 35,
      spellbookPages: ["verb_eime"],
      unlocks: {
        quests: ["gl_02_to_have"]
      }
    }
  },

  gl_02_to_have: {
    id: "gl_02_to_have",
    name: "Έχω - To Have",
    description: "Learn the verb of possession",
    icon: "📝",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "verbs",
    vocabCategory: "verb_to_have",
    status: "locked",
    levelRequired: 3,
    prerequisites: ["gl_01_to_be"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_echo",
        type: "grammar_lesson",
        text: "Learn the verb έχω (to have)",
        lesson: "verb_to_have"
      }
    ],
    dialogue: {
      intro: "Now let's learn the verb έχω (to have)!",
      accept: "With this verb, you can express possession!",
      decline: "Having can wait - come back when ready!",
      complete: "Great work! You can now express possession in Greek!"
    },
    rewards: {
      xp: 100,
      gold: 35,
      spellbookPages: ["verb_echo"],
      unlocks: {
        quests: ["gl_03_gender"]
      }
    }
  },

  gl_03_gender: {
    id: "gl_03_gender",
    name: "Gender & Articles",
    description: "Master the three genders and their articles",
    icon: "📚",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "grammar",
    vocabCategory: "gender_articles",
    status: "locked",
    levelRequired: 4,
    prerequisites: ["gl_02_to_have"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_gender",
        type: "grammar_lesson",
        text: "Learn Greek genders and articles",
        lesson: "gender_articles"
      }
    ],
    dialogue: {
      intro: "Greek has three genders - let's learn how articles work!",
      accept: "Understanding gender is key to mastering Greek!",
      decline: "Grammar rules can be tricky - take your time.",
      complete: "Excellent! You understand Greek genders and articles!"
    },
    rewards: {
      xp: 120,
      gold: 40,
      spellbookPages: ["gender", "articles"],
      unlocks: {
        quests: ["gl_04_cases"]
      }
    }
  },

  gl_04_cases: {
    id: "gl_04_cases",
    name: "The Four Cases",
    description: "Introduction to Greek grammatical cases",
    icon: "📚",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "grammar",
    vocabCategory: "cases",
    status: "locked",
    levelRequired: 5,
    prerequisites: ["gl_03_gender"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_cases",
        type: "grammar_lesson",
        text: "Learn about Greek grammatical cases",
        lesson: "cases_intro"
      }
    ],
    dialogue: {
      intro: "Greek has four grammatical cases - let's learn them!",
      accept: "Cases change word endings based on their role in the sentence.",
      decline: "Cases are advanced - come back when you're ready.",
      complete: "Wonderful! You now understand Greek cases!"
    },
    rewards: {
      xp: 150,
      gold: 50,
      spellbookPages: ["cases_intro"]
    }
  },

  // =====================================================
  // MORE VOCABULARY LESSONS
  // =====================================================

  vl_08_food: {
    id: "vl_08_food",
    name: "Φαγητό & Ποτά",          // Greek: Food & Drinks
    description: "Essential vocabulary for eating out",
    icon: "🍽️",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "food",
    vocabCategory: "food",
    status: "locked",
    levelRequired: 4,
    prerequisites: ["gl_03_gender"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_food",
        type: "vocabulary_lesson",
        text: "Learn Greek food vocabulary",
        lesson: "food_vocab"
      }
    ],
    dialogue: {
      intro: "Greek cuisine is delicious! Let's learn the vocabulary!",
      accept: "From gyros to moussaka - food brings culture to life!",
      decline: "Food can wait - but don't go hungry!",
      complete: "Great! You can now order food in Greek!"
    },
    rewards: {
      xp: 100,
      gold: 35,
      spellbookPages: ["food"]
    }
  }
};

// Export for module system (Node.js compatibility)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GREEK_QUESTS };
}

// Also make available globally for browser
if (typeof window !== 'undefined') {
  window.GREEK_QUESTS = GREEK_QUESTS;
}
