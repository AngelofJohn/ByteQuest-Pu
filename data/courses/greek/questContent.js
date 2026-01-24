// ByteQuest - Greek Quest Content
// Language-specific names, descriptions, and dialogue for quest templates

const GREEK_QUEST_CONTENT = {
  // =====================================================
  // BEGINNER LESSONS
  // =====================================================

  greetings_lesson: {
    name: "Χαιρετισμοί (Greetings)",
    description: "Essential Greek greetings and farewells",
    vocabularySource: { category: "basics", subcategory: "greetings" },
    dialogue: {
      intro: "Γεια σου! Let's learn the essential Greek greetings!",
      complete: "Excellent! You can now greet people in Greek!",
      quest_intro: "Would you like to learn Greek greetings?",
      quest_complete: "You've mastered Greek greetings!"
    },
    spellbookPages: ["greek_greetings"]
  },

  introductions_lesson: {
    name: "Συστάσεις (Introductions)",
    description: "Learn to introduce yourself in Greek",
    vocabularySource: { category: "basics", subcategory: "introductions" },
    dialogue: {
      intro: "Let's learn how to introduce yourself in Greek!",
      complete: "Great! You can now introduce yourself in Greek!",
      quest_intro: "Ready to learn Greek introductions?",
      quest_complete: "You've mastered Greek introductions!"
    },
    spellbookPages: ["greek_pronouns"]
  },

  essentials_lesson: {
    name: "Βασικές Φράσεις (Essential Phrases)",
    description: "Survival Greek for everyday situations",
    vocabularySource: { category: "basics", subcategory: "essentials" },
    dialogue: {
      intro: "Let's learn essential Greek phrases for everyday use!",
      complete: "Perfect! You now know the essential phrases!",
      quest_intro: "Want to learn essential Greek phrases?",
      quest_complete: "You've mastered essential Greek!"
    }
  },

  // =====================================================
  // VERBS
  // =====================================================

  verb_to_be: {
    name: "Είμαι (To Be)",
    description: "Conjugate the most essential Greek verb",
    vocabularySource: { category: "verbs", subcategory: "essential" },
    dialogue: {
      intro: "Let's learn the most important Greek verb: είμαι (to be)!",
      complete: "Excellent! You've mastered the verb 'to be' in Greek!",
      quest_intro: "Ready to learn είμαι?",
      quest_complete: "You've mastered είμαι!"
    },
    spellbookPages: ["greek_eime"]
  },

  verb_to_have: {
    name: "Έχω (To Have)",
    description: "Learn the verb of possession",
    vocabularySource: { category: "verbs", subcategory: "essential" },
    dialogue: {
      intro: "Now let's learn the verb έχω (to have)!",
      complete: "Great work! You can now express possession in Greek!",
      quest_intro: "Ready to learn έχω?",
      quest_complete: "You've mastered έχω!"
    },
    spellbookPages: ["greek_echo"]
  },

  // =====================================================
  // FAMILY
  // =====================================================

  family_basics: {
    name: "Οικογένεια (Family)",
    description: "Learn to talk about your family",
    vocabularySource: { category: "family", subcategory: "beginner" },
    dialogue: {
      intro: "Let's learn how to talk about your family in Greek!",
      complete: "Perfect! You can now describe your family!",
      quest_intro: "Want to learn family vocabulary?",
      quest_complete: "You've mastered family vocabulary!"
    }
  },

  // =====================================================
  // FOOD
  // =====================================================

  food_basics: {
    name: "Φαγητό (Food & Drink)",
    description: "Essential vocabulary for eating out",
    vocabularySource: { category: "food", subcategory: "beginner" },
    dialogue: {
      intro: "Let's learn essential Greek food and drink vocabulary!",
      complete: "Great! You can now order food in Greek!",
      quest_intro: "Hungry? Let's learn food vocabulary!",
      quest_complete: "You've mastered food vocabulary!"
    }
  },

  // =====================================================
  // GRAMMAR
  // =====================================================

  gender_articles: {
    name: "Γένος και Άρθρα (Gender & Articles)",
    description: "Master the three genders and their articles",
    vocabularySource: { category: "grammar", subcategory: "articles" },
    dialogue: {
      intro: "Greek has three genders - let's learn how articles work!",
      complete: "Excellent! You understand Greek genders and articles!",
      quest_intro: "Ready to tackle Greek gender?",
      quest_complete: "You've mastered Greek articles!"
    },
    spellbookPages: ["greek_gender", "greek_articles"]
  },

  // =====================================================
  // SIDE QUESTS
  // =====================================================

  daily_practice: {
    name: "Καθημερινή Εξάσκηση (Daily Practice)",
    description: "Practice your Greek skills every day",
    dialogue: {
      intro: "Daily practice makes perfect! Complete a lesson today.",
      complete: "Well done! Come back tomorrow for more practice!",
      quest_intro: "Ready for your daily practice?",
      quest_complete: "Daily practice completed!"
    }
  },

  weekly_challenge: {
    name: "Εβδομαδιαία Πρόκληση (Weekly Challenge)",
    description: "Complete the village's weekly challenge",
    dialogue: {
      intro: "This week's challenge: complete 5 lessons! Think you can do it?",
      complete: "Incredible! You've completed the weekly challenge!",
      quest_intro: "Ready for this week's challenge?",
      quest_complete: "Weekly challenge completed!"
    }
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GREEK_QUEST_CONTENT };
}
