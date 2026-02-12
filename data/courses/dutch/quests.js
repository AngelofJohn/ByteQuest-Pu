// ByteQuest - Dutch Course Quests
// Quest definitions for the Dutch language course
//
// QUEST ID FORMAT:
// - vl_XX_topic = Vocabulary Lessons (universal across languages)
// - gl_XX_topic = Grammar Lessons (universal across languages)
//
// Dutch uses the Latin alphabet, so no alphabet lessons needed

const DUTCH_QUESTS = {
  // =====================================================
  // VOCABULARY LESSONS - Universal IDs (vl_ prefix)
  // =====================================================

  vl_01_greetings: {
    id: "vl_01_greetings",
    name: "Begroetingen",
    description: "Essential Dutch greetings and farewells",
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
        text: "Learn Dutch greetings",
        lesson: "greetings_vocab",
        vocabularySource: {
          category: "basics",
          subcategory: "greetings"
        }
      }
    ],
    dialogue: {
      intro: "Hallo! Let's learn the essential Dutch greetings!",
      accept: "Dutch greetings will help you connect with native speakers!",
      decline: "Come back when you're ready to say hallo!",
      complete: "Uitstekend! You can now greet people in Dutch!"
    },
    rewards: {
      xp: 60,
      gold: 0,
      spellbookPages: ["greetings"],
      gatheringUnlock: "herbalism",
      unlocks: {
        quests: ["vl_02_introductions"]
      }
    }
  },

  vl_02_introductions: {
    id: "vl_02_introductions",
    name: "Kennismaken",
    description: "Learn to introduce yourself in Dutch",
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
        text: "Learn Dutch introductions",
        lesson: "introductions_vocab",
        vocabularySource: {
          category: "basics",
          subcategory: "introductions"
        }
      }
    ],
    dialogue: {
      intro: "Time to learn how to introduce yourself!",
      accept: "Introducing yourself is key to making new friends!",
      decline: "No rush - come back when you're ready!",
      complete: "Geweldig! You can now introduce yourself in Dutch!"
    },
    rewards: {
      xp: 50,
      gold: 5,
      spellbookPages: ["introductions"],
      unlocks: {
        quests: ["vl_03_essentials"]
      }
    }
  },

  vl_03_essentials: {
    id: "vl_03_essentials",
    name: "Essentieel",
    description: "Master essential Dutch phrases",
    icon: "💬",
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
        text: "Learn essential Dutch phrases",
        lesson: "essentials_vocab",
        vocabularySource: {
          category: "basics",
          subcategory: "essentials"
        }
      }
    ],
    dialogue: {
      intro: "These essential phrases will help you in everyday situations!",
      accept: "Let's learn the phrases you'll use most often!",
      decline: "Take your time - these phrases will be here!",
      complete: "Prima! You've mastered the essential phrases!"
    },
    rewards: {
      xp: 55,
      gold: 5,
      spellbookPages: ["essentials"],
      unlocks: {
        quests: ["vl_04_numbers"]
      }
    }
  },

  vl_04_numbers: {
    id: "vl_04_numbers",
    name: "Nummers",
    description: "Learn to count in Dutch",
    icon: "🔢",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "numbers",
    vocabCategory: "numbers",
    status: "locked",
    levelRequired: 3,
    prerequisites: ["vl_03_essentials"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_numbers",
        type: "vocabulary_lesson",
        text: "Learn Dutch numbers",
        lesson: "numbers_vocab",
        vocabularySource: {
          category: "numbers",
          subcategory: "cardinal"
        }
      }
    ],
    dialogue: {
      intro: "Numbers are essential for shopping, time, and more!",
      accept: "Een, twee, drie... Let's count together!",
      decline: "Numbers can wait - but they're very useful!",
      complete: "Heel goed! You can now count in Dutch!"
    },
    rewards: {
      xp: 60,
      gold: 10,
      spellbookPages: ["numbers"],
      gatheringUnlock: "fishing",
      unlocks: {
        quests: ["vl_05_colors"]
      }
    }
  },

  vl_05_colors: {
    id: "vl_05_colors",
    name: "Kleuren",
    description: "Learn the colors in Dutch",
    icon: "🎨",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "colors",
    vocabCategory: "colors",
    status: "locked",
    levelRequired: 3,
    prerequisites: ["vl_04_numbers"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_colors",
        type: "vocabulary_lesson",
        text: "Learn Dutch colors",
        lesson: "colors_vocab",
        vocabularySource: {
          category: "colors",
          subcategory: "beginner"
        }
      }
    ],
    dialogue: {
      intro: "Oranje is the national color of the Netherlands!",
      accept: "Let's paint with words - learn all the colors!",
      decline: "The world is colorful - come back when ready!",
      complete: "Prachtig! You know all the Dutch colors!"
    },
    rewards: {
      xp: 55,
      gold: 10,
      spellbookPages: ["colors"],
      unlocks: {
        quests: ["vl_06_family"]
      }
    }
  },

  vl_06_family: {
    id: "vl_06_family",
    name: "Familie",
    description: "Learn family vocabulary in Dutch",
    icon: "👨‍👩‍👧‍👦",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "family",
    vocabCategory: "family",
    status: "locked",
    levelRequired: 4,
    prerequisites: ["vl_05_colors"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_family",
        type: "vocabulary_lesson",
        text: "Learn Dutch family words",
        lesson: "family_vocab",
        vocabularySource: {
          category: "family",
          subcategory: "beginner"
        }
      }
    ],
    dialogue: {
      intro: "Family is important in Dutch culture. Let's learn these words!",
      accept: "Moeder, vader, broer, zus... Let's learn about family!",
      decline: "Family words can wait - but they're very personal!",
      complete: "Fantastisch! You can now talk about family in Dutch!"
    },
    rewards: {
      xp: 65,
      gold: 15,
      spellbookPages: ["family"],
      unlocks: {
        quests: ["vl_07_food"]
      }
    }
  },

  vl_07_food: {
    id: "vl_07_food",
    name: "Eten en Drinken",
    description: "Learn food and drink vocabulary",
    icon: "🍽️",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "food",
    vocabCategory: "food",
    status: "locked",
    levelRequired: 4,
    prerequisites: ["vl_06_family"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_food",
        type: "vocabulary_lesson",
        text: "Learn Dutch food vocabulary",
        lesson: "food_vocab",
        vocabularySource: {
          category: "food",
          subcategory: "beginner"
        }
      }
    ],
    dialogue: {
      intro: "The Dutch love their kaas and stroopwafels!",
      accept: "Let's learn about Dutch cuisine and drinks!",
      decline: "The kitchen can wait - but food is delicious!",
      complete: "Heerlijk! You can now order food in Dutch!"
    },
    rewards: {
      xp: 70,
      gold: 15,
      spellbookPages: ["food"],
      gatheringUnlock: "mining",
      unlocks: {
        quests: ["vl_08_time"]
      }
    }
  },

  vl_08_time: {
    id: "vl_08_time",
    name: "Tijd",
    description: "Learn time expressions in Dutch",
    icon: "⏰",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "time",
    vocabCategory: "time",
    status: "locked",
    levelRequired: 5,
    prerequisites: ["vl_07_food"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_time",
        type: "vocabulary_lesson",
        text: "Learn Dutch time expressions",
        lesson: "time_vocab",
        vocabularySource: {
          category: "time",
          subcategory: "beginner"
        }
      }
    ],
    dialogue: {
      intro: "Time is important - let's learn how to express it in Dutch!",
      accept: "Vandaag, morgen, gisteren... Let's master time!",
      decline: "Time can wait... well, it never really does!",
      complete: "Perfect! You can now discuss time in Dutch!"
    },
    rewards: {
      xp: 65,
      gold: 20,
      spellbookPages: ["time"],
      unlocks: {
        quests: ["vl_09_days"]
      }
    }
  },

  vl_09_days: {
    id: "vl_09_days",
    name: "Dagen van de Week",
    description: "Learn the days of the week",
    icon: "📅",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "time",
    vocabCategory: "days",
    status: "locked",
    levelRequired: 5,
    prerequisites: ["vl_08_time"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_days",
        type: "vocabulary_lesson",
        text: "Learn Dutch days of the week",
        lesson: "days_vocab",
        vocabularySource: {
          category: "time",
          subcategory: "days"
        }
      }
    ],
    dialogue: {
      intro: "The Dutch days are similar to English - you'll find patterns!",
      accept: "Maandag, dinsdag... Let's learn all seven days!",
      decline: "The week will still be here when you return!",
      complete: "Goed gedaan! You know all the days of the week!"
    },
    rewards: {
      xp: 50,
      gold: 15,
      spellbookPages: ["days"],
      unlocks: {
        quests: ["vl_10_places"]
      }
    }
  },

  vl_10_places: {
    id: "vl_10_places",
    name: "Plaatsen",
    description: "Learn place vocabulary in Dutch",
    icon: "🏠",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "places",
    vocabCategory: "places",
    status: "locked",
    levelRequired: 6,
    prerequisites: ["vl_09_days"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_places",
        type: "vocabulary_lesson",
        text: "Learn Dutch place vocabulary",
        lesson: "places_vocab",
        vocabularySource: {
          category: "places",
          subcategory: "beginner"
        }
      }
    ],
    dialogue: {
      intro: "From cities to villages, let's explore Dutch places!",
      accept: "Het huis, de stad, de markt... Places await!",
      decline: "The world of places will be here when you're ready!",
      complete: "Uitstekend! You can now describe places in Dutch!"
    },
    rewards: {
      xp: 70,
      gold: 20,
      spellbookPages: ["places"],
      gatheringUnlock: "woodcutting",
      unlocks: {
        quests: ["vl_11_animals"]
      }
    }
  },

  vl_11_animals: {
    id: "vl_11_animals",
    name: "Dieren",
    description: "Learn animal vocabulary in Dutch",
    icon: "🐕",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "creatures",
    vocabCategory: "animals",
    status: "locked",
    levelRequired: 6,
    prerequisites: ["vl_10_places"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_animals",
        type: "vocabulary_lesson",
        text: "Learn Dutch animal words",
        lesson: "animals_vocab",
        vocabularySource: {
          category: "creatures",
          subcategory: "animals"
        }
      }
    ],
    dialogue: {
      intro: "The Dutch countryside is full of animals!",
      accept: "De hond, de kat, het paard... Let's meet the animals!",
      decline: "The animals will wait for you patiently!",
      complete: "Fantastisch! You know Dutch animal vocabulary!"
    },
    rewards: {
      xp: 65,
      gold: 20,
      spellbookPages: ["animals"],
      unlocks: {
        quests: ["vl_12_actions"]
      }
    }
  },

  vl_12_actions: {
    id: "vl_12_actions",
    name: "Werkwoorden",
    description: "Learn common Dutch verbs",
    icon: "🏃",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "actions",
    vocabCategory: "actions",
    status: "locked",
    levelRequired: 7,
    prerequisites: ["vl_11_animals"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_actions",
        type: "vocabulary_lesson",
        text: "Learn Dutch action verbs",
        lesson: "actions_vocab",
        vocabularySource: {
          category: "actions",
          subcategory: "common"
        }
      }
    ],
    dialogue: {
      intro: "Verbs bring language to life! Let's learn to act in Dutch!",
      accept: "Eten, drinken, lopen... Time for action!",
      decline: "Action verbs will energize your Dutch later!",
      complete: "Prima! You can now express actions in Dutch!"
    },
    rewards: {
      xp: 75,
      gold: 25,
      spellbookPages: ["verbs"],
      unlocks: {
        quests: ["vl_13_adjectives"]
      }
    }
  },

  vl_13_adjectives: {
    id: "vl_13_adjectives",
    name: "Bijvoeglijke Naamwoorden",
    description: "Learn Dutch adjectives",
    icon: "✨",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "adjectives",
    vocabCategory: "adjectives",
    status: "locked",
    levelRequired: 7,
    prerequisites: ["vl_12_actions"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_adjectives",
        type: "vocabulary_lesson",
        text: "Learn Dutch adjectives",
        lesson: "adjectives_vocab",
        vocabularySource: {
          category: "adjectives",
          subcategory: "common"
        }
      }
    ],
    dialogue: {
      intro: "Adjectives add color to your descriptions!",
      accept: "Groot, klein, mooi... Let's describe the world!",
      decline: "Descriptive words will enhance your Dutch later!",
      complete: "Heel goed! You can now describe things in Dutch!"
    },
    rewards: {
      xp: 70,
      gold: 25,
      spellbookPages: ["adjectives"],
      unlocks: {
        quests: ["vl_14_weather"]
      }
    }
  },

  vl_14_weather: {
    id: "vl_14_weather",
    name: "Het Weer",
    description: "Learn weather vocabulary in Dutch",
    icon: "🌤️",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "weather",
    vocabCategory: "weather",
    status: "locked",
    levelRequired: 8,
    prerequisites: ["vl_13_adjectives"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_weather",
        type: "vocabulary_lesson",
        text: "Learn Dutch weather words",
        lesson: "weather_vocab",
        vocabularySource: {
          category: "weather",
          subcategory: "beginner"
        }
      }
    ],
    dialogue: {
      intro: "The Dutch talk about weather a lot - it changes often!",
      accept: "De zon, de regen, de wind... Let's discuss the weather!",
      decline: "The weather will still be changing when you return!",
      complete: "Geweldig! You can now discuss the weather in Dutch!"
    },
    rewards: {
      xp: 65,
      gold: 25,
      spellbookPages: ["weather"],
      unlocks: {
        quests: ["vl_15_body"]
      }
    }
  },

  vl_15_body: {
    id: "vl_15_body",
    name: "Het Lichaam",
    description: "Learn body part vocabulary",
    icon: "🦶",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "body",
    vocabCategory: "body",
    status: "locked",
    levelRequired: 8,
    prerequisites: ["vl_14_weather"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_body",
        type: "vocabulary_lesson",
        text: "Learn Dutch body vocabulary",
        lesson: "body_vocab",
        vocabularySource: {
          category: "body",
          subcategory: "beginner"
        }
      }
    ],
    dialogue: {
      intro: "Knowing body parts is essential for health and descriptions!",
      accept: "Het hoofd, de handen, de voeten... Let's learn!",
      decline: "Body vocabulary will be here when you're ready!",
      complete: "Uitstekend! You know Dutch body vocabulary!"
    },
    rewards: {
      xp: 60,
      gold: 25,
      spellbookPages: ["body"],
      unlocks: {
        quests: ["vl_16_clothing"]
      }
    }
  },

  vl_16_clothing: {
    id: "vl_16_clothing",
    name: "Kleding",
    description: "Learn clothing vocabulary in Dutch",
    icon: "👕",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "clothing",
    vocabCategory: "clothing",
    status: "locked",
    levelRequired: 9,
    prerequisites: ["vl_15_body"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_clothing",
        type: "vocabulary_lesson",
        text: "Learn Dutch clothing words",
        lesson: "clothing_vocab",
        vocabularySource: {
          category: "clothing",
          subcategory: "beginner"
        }
      }
    ],
    dialogue: {
      intro: "From shirts to shoes, let's dress up your vocabulary!",
      accept: "Het shirt, de broek, de schoenen... Fashion time!",
      decline: "Clothing words will be in style when you return!",
      complete: "Prachtig! You can now discuss clothing in Dutch!"
    },
    rewards: {
      xp: 60,
      gold: 30,
      spellbookPages: ["clothing"],
      unlocks: {
        quests: ["vl_17_commerce"]
      }
    }
  },

  vl_17_commerce: {
    id: "vl_17_commerce",
    name: "Winkelen",
    description: "Learn shopping and commerce vocabulary",
    icon: "🛒",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "commerce",
    vocabCategory: "commerce",
    status: "locked",
    levelRequired: 9,
    prerequisites: ["vl_16_clothing"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_commerce",
        type: "vocabulary_lesson",
        text: "Learn Dutch shopping vocabulary",
        lesson: "commerce_vocab",
        vocabularySource: {
          category: "commerce",
          subcategory: "beginner"
        }
      }
    ],
    dialogue: {
      intro: "Time to learn how to shop and bargain in Dutch!",
      accept: "Hoeveel kost het? Let's go shopping!",
      decline: "The market will still be open when you return!",
      complete: "Fantastisch! You can now shop in Dutch!"
    },
    rewards: {
      xp: 70,
      gold: 30,
      spellbookPages: ["commerce"],
      unlocks: {
        quests: ["vl_18_travel"]
      }
    }
  },

  vl_18_travel: {
    id: "vl_18_travel",
    name: "Reizen",
    description: "Learn travel vocabulary in Dutch",
    icon: "✈️",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "travel",
    vocabCategory: "travel",
    status: "locked",
    levelRequired: 10,
    prerequisites: ["vl_17_commerce"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_travel",
        type: "vocabulary_lesson",
        text: "Learn Dutch travel vocabulary",
        lesson: "travel_vocab",
        vocabularySource: {
          category: "travel",
          subcategory: "beginner"
        }
      }
    ],
    dialogue: {
      intro: "The Dutch love to travel! Let's learn how to get around!",
      accept: "De fiets, de trein, het vliegtuig... Let's travel!",
      decline: "The journey awaits when you're ready!",
      complete: "Geweldig! You can now navigate travel in Dutch!"
    },
    rewards: {
      xp: 75,
      gold: 35,
      spellbookPages: ["travel"],
      unlocks: {
        quests: ["vl_19_nature"]
      }
    }
  },

  vl_19_nature: {
    id: "vl_19_nature",
    name: "De Natuur",
    description: "Learn nature vocabulary in Dutch",
    icon: "🌳",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "nature",
    vocabCategory: "nature",
    status: "locked",
    levelRequired: 10,
    prerequisites: ["vl_18_travel"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_nature",
        type: "vocabulary_lesson",
        text: "Learn Dutch nature vocabulary",
        lesson: "nature_vocab",
        vocabularySource: {
          category: "nature",
          subcategory: "beginner"
        }
      }
    ],
    dialogue: {
      intro: "The Netherlands may be flat, but nature is beautiful!",
      accept: "De zee, het bos, de tulpen... Let's explore nature!",
      decline: "Nature will be waiting when you're ready!",
      complete: "Prachtig! You can now describe nature in Dutch!"
    },
    rewards: {
      xp: 70,
      gold: 35,
      spellbookPages: ["nature"],
      unlocks: {
        quests: ["vl_20_emotions"]
      }
    }
  },

  vl_20_emotions: {
    id: "vl_20_emotions",
    name: "Emoties",
    description: "Learn emotions vocabulary in Dutch",
    icon: "😊",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "emotions",
    vocabCategory: "emotions",
    status: "locked",
    levelRequired: 11,
    prerequisites: ["vl_19_nature"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_emotions",
        type: "vocabulary_lesson",
        text: "Learn Dutch emotion words",
        lesson: "emotions_vocab",
        vocabularySource: {
          category: "emotions",
          subcategory: "beginner"
        }
      }
    ],
    dialogue: {
      intro: "Expressing feelings is essential for connection!",
      accept: "Blij, verdrietig, boos... Let's feel in Dutch!",
      decline: "Emotions will be here when you're ready to express them!",
      complete: "Heel goed! You can now express emotions in Dutch!"
    },
    rewards: {
      xp: 65,
      gold: 35,
      spellbookPages: ["emotions"],
      unlocks: {
        quests: ["vl_21_culture"]
      }
    }
  },

  vl_21_culture: {
    id: "vl_21_culture",
    name: "Nederlandse Cultuur",
    description: "Learn Dutch cultural vocabulary",
    icon: "🌷",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "culture",
    vocabCategory: "culture",
    status: "locked",
    levelRequired: 12,
    prerequisites: ["vl_20_emotions"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_culture",
        type: "vocabulary_lesson",
        text: "Learn Dutch cultural vocabulary",
        lesson: "culture_vocab",
        vocabularySource: {
          category: "culture",
          subcategory: "unique"
        }
      }
    ],
    dialogue: {
      intro: "The Netherlands has a rich culture - windmills, tulips, and more!",
      accept: "De molen, de gracht, gezellig... Let's explore Dutch culture!",
      decline: "Dutch culture awaits your discovery!",
      complete: "Fantastisch! You understand Dutch cultural vocabulary!"
    },
    rewards: {
      xp: 80,
      gold: 40,
      spellbookPages: ["culture"],
      unlocks: {
        quests: ["gl_01_articles"]
      }
    }
  },

  // =====================================================
  // GRAMMAR LESSONS - Universal IDs (gl_ prefix)
  // =====================================================

  gl_01_articles: {
    id: "gl_01_articles",
    name: "De en Het",
    description: "Learn when to use 'de' and 'het' articles",
    icon: "📝",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "grammar",
    vocabCategory: "articles",
    status: "locked",
    levelRequired: 5,
    prerequisites: ["vl_04_numbers"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_articles",
        type: "grammar_lesson",
        text: "Learn Dutch article usage",
        lesson: "articles_grammar"
      }
    ],
    dialogue: {
      intro: "Dutch has two articles: 'de' for common gender and 'het' for neuter.",
      accept: "De hond, het huis... Let's master the articles!",
      decline: "Articles are tricky - come back when ready!",
      complete: "Uitstekend! You understand Dutch articles!"
    },
    rewards: {
      xp: 75,
      gold: 20,
      spellbookPages: ["grammar_articles"],
      unlocks: {
        quests: ["gl_02_zijn"]
      }
    }
  },

  gl_02_zijn: {
    id: "gl_02_zijn",
    name: "Zijn (To Be)",
    description: "Learn to conjugate the verb 'zijn'",
    icon: "📖",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "grammar",
    vocabCategory: "verbs",
    status: "locked",
    levelRequired: 8,
    prerequisites: ["vl_12_actions"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_zijn",
        type: "grammar_lesson",
        text: "Learn to conjugate 'zijn'",
        lesson: "zijn_grammar"
      }
    ],
    dialogue: {
      intro: "The verb 'zijn' (to be) is one of the most important verbs!",
      accept: "Ik ben, jij bent, hij is... Let's conjugate!",
      decline: "Being can wait... but not for long!",
      complete: "Perfect! You've mastered 'zijn'!"
    },
    rewards: {
      xp: 80,
      gold: 25,
      spellbookPages: ["grammar_zijn"],
      unlocks: {
        quests: ["gl_03_hebben"]
      }
    }
  },

  gl_03_hebben: {
    id: "gl_03_hebben",
    name: "Hebben (To Have)",
    description: "Learn to conjugate the verb 'hebben'",
    icon: "📖",
    giver: "isora",
    location: "dawnmere",
    type: "lesson",
    category: "grammar",
    vocabCategory: "verbs",
    status: "locked",
    levelRequired: 9,
    prerequisites: ["gl_02_zijn"],
    roles: ["quest_giver"],
    objectives: [
      {
        id: "learn_hebben",
        type: "grammar_lesson",
        text: "Learn to conjugate 'hebben'",
        lesson: "hebben_grammar"
      }
    ],
    dialogue: {
      intro: "The verb 'hebben' (to have) is essential for possession!",
      accept: "Ik heb, jij hebt, hij heeft... Let's learn!",
      decline: "Having verbs can wait a bit longer!",
      complete: "Geweldig! You've mastered 'hebben'!"
    },
    rewards: {
      xp: 80,
      gold: 25,
      spellbookPages: ["grammar_hebben"],
      unlocks: {}
    }
  }
};

// Export for module system (Node.js compatibility)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DUTCH_QUESTS };
}

// Also make available globally for browser
if (typeof window !== 'undefined') {
  window.DUTCH_QUESTS = DUTCH_QUESTS;
}
