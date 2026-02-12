/**
 * ByteQuest - Course Manifest
 * Central registry of all available language courses
 * Add new languages here to make them available in the game
 */

const COURSE_MANIFEST = {
  // Available courses
  courses: {
    french: {
      id: 'french',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      available: true,
      scripts: [
        'data/courses/french/vocab.js',
        'data/courses/french/grammar.js',
        'data/courses/french/mainStoryQuests.js',
        'data/courses/french/sideQuests.js',
        'data/courses/french/grammarQuests.js',
        'data/courses/french/quests.js',
        'data/courses/french/spellbook.js'
      ],
      vars: {
        quests: 'FRENCH_QUESTS',
        vocab: 'FRENCH_VOCAB',
        grammar: 'FRENCH_GRAMMAR',
        spellbook: 'FRENCH_SPELLBOOK'
      }
    },

    greek: {
      id: 'greek',
      name: 'Greek',
      nativeName: 'Ελληνικά',
      flag: '🇬🇷',
      available: true,
      scripts: [
        'data/courses/greek/quests.js',
        'data/courses/greek/grammar.js',
        'data/courses/greek/vocabulary.js',
        'data/courses/greek/spellbook.js'
      ],
      vars: {
        quests: 'GREEK_QUESTS',
        vocab: 'GREEK_VOCAB',
        grammar: 'GREEK_GRAMMAR',
        spellbook: 'GREEK_SPELLBOOK'
      }
    },

    dutch: {
      id: 'dutch',
      name: 'Dutch',
      nativeName: 'Nederlands',
      flag: '🇳🇱',
      available: true,
      scripts: [
        'data/courses/dutch/vocabulary.js',
        'data/courses/dutch/quests.js',
        'data/courses/dutch/spellbook.js'
      ],
      vars: {
        quests: 'DUTCH_QUESTS',
        vocab: 'DUTCH_VOCAB',
        grammar: 'DUTCH_GRAMMAR',
        spellbook: 'DUTCH_SPELLBOOK'
      }
    },

    spanish: {
      id: 'spanish',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      available: false, // Coming soon
      scripts: [],
      vars: {
        quests: 'SPANISH_QUESTS',
        vocab: 'SPANISH_VOCAB'
      }
    },

    german: {
      id: 'german',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      available: false, // Coming soon
      scripts: [],
      vars: {
        quests: 'GERMAN_QUESTS',
        vocab: 'GERMAN_VOCAB'
      }
    },

    italian: {
      id: 'italian',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹',
      available: false, // Coming soon
      scripts: [],
      vars: {
        quests: 'ITALIAN_QUESTS',
        vocab: 'ITALIAN_VOCAB'
      }
    }
  },

  /**
   * Get course info by language ID
   */
  getCourse(languageId) {
    return this.courses[languageId] || null;
  },

  /**
   * Get all available courses
   */
  getAvailable() {
    return Object.values(this.courses).filter(c => c.available);
  },

  /**
   * Get all courses (including coming soon)
   */
  getAll() {
    return Object.values(this.courses);
  },

  /**
   * Check if a language is available
   */
  isAvailable(languageId) {
    const course = this.courses[languageId];
    return course ? course.available : false;
  }
};

// Make globally accessible
if (typeof window !== 'undefined') {
  window.COURSE_MANIFEST = COURSE_MANIFEST;
}
