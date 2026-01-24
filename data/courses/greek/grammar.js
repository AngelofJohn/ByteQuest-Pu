// ByteQuest - Greek Grammar Data
// Language: Modern Greek (Ελληνικά)
// Pure data file - question generation logic is in js/systems/greekQuestionSystem.js

const GREEK_GRAMMAR = {
  // Meta info
  _meta: {
    language: "greek",
    languageCode: "el",
    nativeName: "Ελληνικά"
  },

  // =====================================================
  // Subject Pronouns
  // =====================================================
  pronouns: {
    singular: [
      { greek: "εγώ", english: "I", romanized: "egó", notes: "First person singular" },
      { greek: "εσύ", english: "you (informal)", romanized: "esí", notes: "Second person singular" },
      { greek: "αυτός", english: "he", romanized: "aftós", notes: "Third person masculine" },
      { greek: "αυτή", english: "she", romanized: "aftí", notes: "Third person feminine" },
      { greek: "αυτό", english: "it", romanized: "aftó", notes: "Third person neuter" }
    ],
    plural: [
      { greek: "εμείς", english: "we", romanized: "emís", notes: "First person plural" },
      { greek: "εσείς", english: "you (formal/plural)", romanized: "esís", notes: "Second person plural or formal" },
      { greek: "αυτοί", english: "they (masc)", romanized: "aftí", notes: "Third person plural masculine" },
      { greek: "αυτές", english: "they (fem)", romanized: "aftés", notes: "Third person plural feminine" },
      { greek: "αυτά", english: "they (neut)", romanized: "aftá", notes: "Third person plural neuter" }
    ]
  },

  // =====================================================
  // Articles (with cases)
  // =====================================================
  articles: {
    definite: {
      masculine: {
        singular: { nominative: "ο", genitive: "του", accusative: "τον", vocative: "-" },
        plural: { nominative: "οι", genitive: "των", accusative: "τους", vocative: "-" }
      },
      feminine: {
        singular: { nominative: "η", genitive: "της", accusative: "την", vocative: "-" },
        plural: { nominative: "οι", genitive: "των", accusative: "τις", vocative: "-" }
      },
      neuter: {
        singular: { nominative: "το", genitive: "του", accusative: "το", vocative: "-" },
        plural: { nominative: "τα", genitive: "των", accusative: "τα", vocative: "-" }
      }
    },
    indefinite: {
      masculine: { nominative: "ένας", genitive: "ενός", accusative: "έναν" },
      feminine: { nominative: "μία/μια", genitive: "μιας", accusative: "μία/μια" },
      neuter: { nominative: "ένα", genitive: "ενός", accusative: "ένα" }
    }
  },

  // =====================================================
  // Verb Conjugations
  // Greek verbs are cited in 1st person singular (not infinitive)
  // =====================================================
  verbs: {
    // "to be" - είμαι
    eime: {
      dictionary: "είμαι",
      english: "to be",
      romanized: "íme",
      type: "irregular",
      hint: "The most important Greek verb",
      present: {
        εγώ: "είμαι",
        εσύ: "είσαι",
        "αυτός/ή/ό": "είναι",
        εμείς: "είμαστε",
        εσείς: "είστε",
        "αυτοί/ές/ά": "είναι"
      },
      past: {
        εγώ: "ήμουν",
        εσύ: "ήσουν",
        "αυτός/ή/ό": "ήταν",
        εμείς: "ήμασταν",
        εσείς: "ήσασταν",
        "αυτοί/ές/ά": "ήταν"
      },
      future: {
        εγώ: "θα είμαι",
        εσύ: "θα είσαι",
        "αυτός/ή/ό": "θα είναι",
        εμείς: "θα είμαστε",
        εσείς: "θα είστε",
        "αυτοί/ές/ά": "θα είναι"
      }
    },

    // "to have" - έχω
    echo: {
      dictionary: "έχω",
      english: "to have",
      romanized: "ého",
      type: "regular-omega",
      hint: "Used for possession and as auxiliary",
      present: {
        εγώ: "έχω",
        εσύ: "έχεις",
        "αυτός/ή/ό": "έχει",
        εμείς: "έχουμε",
        εσείς: "έχετε",
        "αυτοί/ές/ά": "έχουν"
      },
      past: {
        εγώ: "είχα",
        εσύ: "είχες",
        "αυτός/ή/ό": "είχε",
        εμείς: "είχαμε",
        εσείς: "είχατε",
        "αυτοί/ές/ά": "είχαν"
      },
      future: {
        εγώ: "θα έχω",
        εσύ: "θα έχεις",
        "αυτός/ή/ό": "θα έχει",
        εμείς: "θα έχουμε",
        εσείς: "θα έχετε",
        "αυτοί/ές/ά": "θα έχουν"
      }
    },

    // "to want" - θέλω
    thelo: {
      dictionary: "θέλω",
      english: "to want",
      romanized: "thélo",
      type: "regular-omega",
      hint: "Very common verb for expressing desires",
      present: {
        εγώ: "θέλω",
        εσύ: "θέλεις",
        "αυτός/ή/ό": "θέλει",
        εμείς: "θέλουμε",
        εσείς: "θέλετε",
        "αυτοί/ές/ά": "θέλουν"
      },
      past: {
        εγώ: "ήθελα",
        εσύ: "ήθελες",
        "αυτός/ή/ό": "ήθελε",
        εμείς: "θέλαμε",
        εσείς: "θέλατε",
        "αυτοί/ές/ά": "ήθελαν"
      }
    },

    // "to do/make" - κάνω
    kano: {
      dictionary: "κάνω",
      english: "to do/make",
      romanized: "káno",
      type: "regular-omega",
      hint: "Universal 'doing' verb",
      present: {
        εγώ: "κάνω",
        εσύ: "κάνεις",
        "αυτός/ή/ό": "κάνει",
        εμείς: "κάνουμε",
        εσείς: "κάνετε",
        "αυτοί/ές/ά": "κάνουν"
      }
    },

    // "to go" - πηγαίνω
    pigaino: {
      dictionary: "πηγαίνω",
      english: "to go",
      romanized: "pigéno",
      type: "regular-omega",
      hint: "Movement verb",
      present: {
        εγώ: "πηγαίνω",
        εσύ: "πηγαίνεις",
        "αυτός/ή/ό": "πηγαίνει",
        εμείς: "πηγαίνουμε",
        εσείς: "πηγαίνετε",
        "αυτοί/ές/ά": "πηγαίνουν"
      }
    },

    // "to speak" - μιλάω
    milao: {
      dictionary: "μιλάω",
      english: "to speak",
      romanized: "miláo",
      type: "regular-ao",
      hint: "Conjugates with -άω pattern",
      present: {
        εγώ: "μιλάω/μιλώ",
        εσύ: "μιλάς",
        "αυτός/ή/ό": "μιλάει/μιλά",
        εμείς: "μιλάμε",
        εσείς: "μιλάτε",
        "αυτοί/ές/ά": "μιλάνε/μιλούν"
      }
    },

    // "to love" - αγαπάω
    agapao: {
      dictionary: "αγαπάω",
      english: "to love",
      romanized: "agapáo",
      type: "regular-ao",
      hint: "Agape - unconditional love",
      present: {
        εγώ: "αγαπάω/αγαπώ",
        εσύ: "αγαπάς",
        "αυτός/ή/ό": "αγαπάει/αγαπά",
        εμείς: "αγαπάμε",
        εσείς: "αγαπάτε",
        "αυτοί/ές/ά": "αγαπάνε/αγαπούν"
      }
    }
  },

  // =====================================================
  // Noun Declension Patterns
  // =====================================================
  nounPatterns: {
    masculine: {
      // -ος nouns (most common)
      osEnding: {
        singular: { nominative: "-ος", genitive: "-ου", accusative: "-ο", vocative: "-ε" },
        plural: { nominative: "-οι", genitive: "-ων", accusative: "-ους", vocative: "-οι" },
        example: "ο άνθρωπος (the human/person)"
      },
      // -ας nouns
      asEnding: {
        singular: { nominative: "-ας", genitive: "-α", accusative: "-α", vocative: "-α" },
        plural: { nominative: "-ες", genitive: "-ων", accusative: "-ες", vocative: "-ες" },
        example: "ο άντρας (the man)"
      },
      // -ης nouns
      isEnding: {
        singular: { nominative: "-ης", genitive: "-η", accusative: "-η", vocative: "-η" },
        plural: { nominative: "-ες", genitive: "-ων", accusative: "-ες", vocative: "-ες" },
        example: "ο μαθητής (the student)"
      }
    },
    feminine: {
      // -α nouns
      aEnding: {
        singular: { nominative: "-α", genitive: "-ας", accusative: "-α", vocative: "-α" },
        plural: { nominative: "-ες", genitive: "-ων", accusative: "-ες", vocative: "-ες" },
        example: "η γυναίκα (the woman)"
      },
      // -η nouns
      iEnding: {
        singular: { nominative: "-η", genitive: "-ης", accusative: "-η", vocative: "-η" },
        plural: { nominative: "-ες", genitive: "-ων", accusative: "-ες", vocative: "-ες" },
        example: "η αδερφή (the sister)"
      }
    },
    neuter: {
      // -ο nouns
      oEnding: {
        singular: { nominative: "-ο", genitive: "-ου", accusative: "-ο", vocative: "-ο" },
        plural: { nominative: "-α", genitive: "-ων", accusative: "-α", vocative: "-α" },
        example: "το βιβλίο (the book)"
      },
      // -ι nouns
      iEnding: {
        singular: { nominative: "-ι", genitive: "-ιού", accusative: "-ι", vocative: "-ι" },
        plural: { nominative: "-ια", genitive: "-ιών", accusative: "-ια", vocative: "-ια" },
        example: "το παιδί (the child)"
      },
      // -μα nouns
      maEnding: {
        singular: { nominative: "-μα", genitive: "-ματος", accusative: "-μα", vocative: "-μα" },
        plural: { nominative: "-ματα", genitive: "-μάτων", accusative: "-ματα", vocative: "-ματα" },
        example: "το όνομα (the name)"
      }
    }
  },

  // =====================================================
  // Common Expressions & Patterns
  // =====================================================
  expressions: {
    greetingPatterns: [
      {
        pattern: "Καλή + [time of day]",
        examples: ["Καλημέρα", "Καλησπέρα", "Καληνύχτα"],
        english: "Good + morning/evening/night"
      }
    ],
    questions: [
      { greek: "Τι;", english: "What?", romanized: "Ti?" },
      { greek: "Ποιος/Ποια/Ποιο;", english: "Who?/Which?", romanized: "Piós/Piá/Pió?" },
      { greek: "Πού;", english: "Where?", romanized: "Poú?" },
      { greek: "Πότε;", english: "When?", romanized: "Póte?" },
      { greek: "Πώς;", english: "How?", romanized: "Pos?" },
      { greek: "Γιατί;", english: "Why?", romanized: "Yiatí?" },
      { greek: "Πόσο/Πόσα;", english: "How much/many?", romanized: "Póso/Pósa?" }
    ],
    negation: {
      standard: "δεν + verb",
      example: { greek: "Δεν καταλαβαίνω", english: "I don't understand" },
      prohibition: "μην + verb (imperative)",
      exampleProhibition: { greek: "Μην τρέχεις!", english: "Don't run!" }
    }
  },

  // =====================================================
  // Numbers (unique words for Greek)
  // =====================================================
  numbers: {
    cardinal: [
      { greek: "ένα", english: "one", romanized: "éna" },
      { greek: "δύο", english: "two", romanized: "dío" },
      { greek: "τρία", english: "three", romanized: "tría" },
      { greek: "τέσσερα", english: "four", romanized: "tésera" },
      { greek: "πέντε", english: "five", romanized: "pénde" },
      { greek: "έξι", english: "six", romanized: "éxi" },
      { greek: "επτά/εφτά", english: "seven", romanized: "eptá/eftá" },
      { greek: "οκτώ/οχτώ", english: "eight", romanized: "októ/ohtó" },
      { greek: "εννέα/εννιά", english: "nine", romanized: "enéa/eniá" },
      { greek: "δέκα", english: "ten", romanized: "déka" }
    ]
  }
};

// Export for module system (Node.js compatibility)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GREEK_GRAMMAR };
}

// Also make available globally for browser
if (typeof window !== 'undefined') {
  window.GREEK_GRAMMAR = GREEK_GRAMMAR;
}
