// ByteQuest - Greek Spellbook Data
// Language-specific grammar reference for Modern Greek
// Pure data file - rendering logic should be in js/systems/

const GREEK_SPELLBOOK = {
  // =====================================================
  // ALPHABET SECTION
  // =====================================================
  greek_alphabet: {
    id: "greek_alphabet",
    title: "Το Αλφάβητο",
    subtitle: "The Greek Alphabet",
    category: "alphabet",
    icon: "🔤",
    unlockHint: "Available from the start",
    alwaysUnlocked: true,
    description: "Twenty-four letters stand between you and Greek literacy. The good news? You already know some—Alpha, Beta, Gamma, Delta. The bad news? Some look like Latin letters but sound completely different. That 'P' is actually an 'R.' That 'H' is an 'I.' Welcome to Greek!",
    examples: [
      { greek: "Α Β Γ Δ Ε", english: "A V G D E (first five letters)" },
      { greek: "Ελλάδα", english: "Greece (Elláda)" },
      { greek: "αλφάβητο", english: "alphabet (alfávito)" }
    ],
    content: {
      type: "greek_alphabet"
    }
  },

  greek_alphabet_vowels: {
    id: "greek_alphabet_vowels",
    title: "Φωνήεντα",
    subtitle: "Greek Vowels",
    category: "alphabet",
    icon: "🗣️",
    unlockHint: "Master the basic sounds",
    description: "Greek has 7 vowel letters but only 5 vowel sounds. Η, Ι, Υ, ΕΙ, and ΟΙ all sound like 'ee.' Yes, really. Five ways to write the same sound. The ancient Greeks were clearly trolling future language learners.",
    examples: [
      { greek: "α = a, ε = e, ι/η/υ = i", english: "Three letters for 'ee' sound" },
      { greek: "ο/ω = o", english: "Two letters for 'o' sound" },
      { greek: "είμαι (íme)", english: "'I am' - ει sounds like 'ee'" }
    ],
    content: {
      type: "greek_vowels"
    }
  },

  greek_digraphs: {
    id: "greek_digraphs",
    title: "Δίψηφα",
    subtitle: "Letter Combinations",
    category: "alphabet",
    icon: "🔗",
    unlockHint: "Learn advanced sounds",
    description: "Some letter pairs create completely new sounds. ΜΠ makes a 'B' sound. ΝΤ makes a 'D' sound. ΓΚ makes a 'G' sound. Yes, Greek invented 'B,' 'D,' and 'G' but then borrowed them back as combinations. It's complicated. Just memorize these and move on.",
    examples: [
      { greek: "μπίρα (bíra)", english: "beer - μπ = b" },
      { greek: "ντομάτα (domáta)", english: "tomato - ντ = d" },
      { greek: "γκολ (gol)", english: "goal - γκ = g" }
    ],
    content: {
      type: "greek_digraphs"
    }
  },

  greek_accents: {
    id: "greek_accents",
    title: "Τόνος",
    subtitle: "The Accent Mark",
    category: "alphabet",
    icon: "´",
    unlockHint: "Stress the right syllable",
    description: "Every Greek word over one syllable needs an accent mark (τόνος). It tells you which syllable to stress. Forget it, and you might say something embarrassing. Or just confusing. The accent is ALWAYS on one of the last three syllables—Greek syllables are democratic that way.",
    examples: [
      { greek: "μαμά (mamá) vs μάμα (máma)", english: "mom vs grandma - accent changes meaning!" },
      { greek: "νερό (neró)", english: "water - stress on last syllable" },
      { greek: "άνθρωπος (ánthropos)", english: "human - stress on first syllable" }
    ],
    content: {
      type: "greek_accents"
    }
  },

  // =====================================================
  // CASES SECTION
  // =====================================================
  greek_cases_intro: {
    id: "greek_cases_intro",
    title: "Οι Πτώσεις",
    subtitle: "The Four Cases",
    category: "grammar",
    icon: "📦",
    unlockHint: "Understand noun functions",
    description: "Greek nouns change their endings based on their role in a sentence. Subject? Nominative. Possession? Genitive. Object? Accusative. Calling someone? Vocative. It's like giving every noun a costume change for each scene. German has four cases too, so if you've survived that, you'll be fine.",
    examples: [
      { greek: "Ο άνθρωπος (nominative)", english: "The man (subject)" },
      { greek: "Του ανθρώπου (genitive)", english: "Of the man (possession)" },
      { greek: "Τον άνθρωπο (accusative)", english: "The man (object)" }
    ],
    content: {
      type: "greek_cases"
    }
  },

  greek_nominative: {
    id: "greek_nominative",
    title: "Ονομαστική",
    subtitle: "The Nominative Case",
    category: "grammar",
    icon: "👤",
    unlockHint: "Master the subject case",
    description: "The nominative is for subjects—the thing DOING the action. 'The cat sleeps.' Cat is nominative. This is the dictionary form, the one you'll memorize first. Consider it the noun's default outfit before the grammar party starts.",
    examples: [
      { greek: "Ο σκύλος τρέχει.", english: "The dog runs. (dog = subject)" },
      { greek: "Η γάτα κοιμάται.", english: "The cat sleeps. (cat = subject)" },
      { greek: "Το παιδί παίζει.", english: "The child plays. (child = subject)" }
    ],
    content: {
      type: "greek_nominative"
    }
  },

  greek_genitive: {
    id: "greek_genitive",
    title: "Γενική",
    subtitle: "The Genitive Case",
    category: "grammar",
    icon: "🔑",
    unlockHint: "Express possession",
    description: "The genitive shows possession, like 'of' in English. 'The book OF the teacher' = 'Το βιβλίο του δασκάλου.' It also appears after certain prepositions. Articles change, noun endings change, chaos ensues. But you'll get used to it.",
    examples: [
      { greek: "Το σπίτι του Γιάννη", english: "Yannis's house (of Yannis)" },
      { greek: "Η πόρτα της κουζίνας", english: "The door of the kitchen" },
      { greek: "Τα παιχνίδια των παιδιών", english: "The toys of the children" }
    ],
    content: {
      type: "greek_genitive"
    }
  },

  greek_accusative: {
    id: "greek_accusative",
    title: "Αιτιατική",
    subtitle: "The Accusative Case",
    category: "grammar",
    icon: "🎯",
    unlockHint: "Mark direct objects",
    description: "The accusative marks direct objects—the thing receiving the action. 'I see THE DOG.' Dog is accusative because it's being seen. Also used with many prepositions indicating motion or direction. Think of it as the 'target' case.",
    examples: [
      { greek: "Βλέπω τον σκύλο.", english: "I see the dog. (dog = object)" },
      { greek: "Αγαπάω την Ελλάδα.", english: "I love Greece. (Greece = object)" },
      { greek: "Πηγαίνω στο σπίτι.", english: "I go to the house. (house = destination)" }
    ],
    content: {
      type: "greek_accusative"
    }
  },

  greek_vocative: {
    id: "greek_vocative",
    title: "Κλητική",
    subtitle: "The Vocative Case",
    category: "grammar",
    icon: "📢",
    unlockHint: "Call out to others",
    description: "The vocative is for calling someone directly. 'Hey, MARIA!' That 'Maria' is vocative. It's often the same as nominative, but sometimes drops an ending. Greek is polite enough to give direct address its own grammatical form. How civilized.",
    examples: [
      { greek: "Γιάννη, έλα εδώ!", english: "Yannis, come here! (Γιάννης → Γιάννη)" },
      { greek: "Μαρία, τι κάνεις;", english: "Maria, how are you? (same as nominative)" },
      { greek: "Παιδιά, ησυχία!", english: "Children, quiet!" }
    ],
    content: {
      type: "greek_vocative"
    }
  },

  // =====================================================
  // ARTICLES
  // =====================================================
  greek_articles: {
    id: "greek_articles",
    title: "Τα Άρθρα",
    subtitle: "Definite & Indefinite Articles",
    category: "grammar",
    icon: "📰",
    unlockHint: "Learn the Greek articles",
    description: "Greek articles are shape-shifters. They change for gender (3), number (2), AND case (4). That's potentially 24 forms for 'the' alone. Indefinite articles ('a/an') only exist in singular. Take a deep breath. You've got this.",
    examples: [
      { greek: "ο, η, το (nominative)", english: "the (masc, fem, neuter)" },
      { greek: "του, της, του (genitive)", english: "of the" },
      { greek: "ένας, μία, ένα", english: "a/an (masc, fem, neuter)" }
    ],
    content: {
      type: "greek_articles"
    }
  },

  greek_gender: {
    id: "greek_gender",
    title: "Γένη",
    subtitle: "Grammatical Gender",
    category: "grammar",
    icon: "⚖️",
    unlockHint: "Master the three genders",
    description: "Greek has THREE genders: masculine, feminine, and neuter. Unlike French's chaos, Greek has some logic—most nouns ending in -ος are masculine, -α/-η are feminine, -ο/-ι/-μα are neuter. But exceptions exist because grammar must have its entertainment.",
    examples: [
      { greek: "ο ήλιος (m)", english: "the sun" },
      { greek: "η σελήνη (f)", english: "the moon" },
      { greek: "το παιδί (n)", english: "the child" }
    ],
    content: {
      type: "greek_gender"
    }
  },

  // =====================================================
  // PRONOUNS
  // =====================================================
  greek_pronouns: {
    id: "greek_pronouns",
    title: "Αντωνυμίες",
    subtitle: "Subject Pronouns",
    category: "reference",
    icon: "👥",
    unlockHint: "Available from the start",
    alwaysUnlocked: true,
    description: "Meet your pronoun friends: εγώ (I), εσύ (you), αυτός/αυτή/αυτό (he/she/it), and their plural forms. Good news: you can often DROP them because verb endings already show the person. Greeks are efficient like that. 'Μιλάω' already means 'I speak.'",
    examples: [
      { greek: "Εγώ μιλάω / Μιλάω", english: "I speak (pronoun optional)" },
      { greek: "Αυτός είναι ο Γιάννης.", english: "He is Yannis. (pronoun needed)" },
      { greek: "Εμείς είμαστε φίλοι.", english: "We are friends." }
    ],
    content: {
      type: "greek_pronouns"
    }
  },

  // =====================================================
  // VERBS
  // =====================================================
  greek_eime: {
    id: "greek_eime",
    title: "Είμαι",
    subtitle: "to be",
    category: "verbs",
    icon: "✨",
    unlockHint: "Learn the essential verb",
    description: "The verb of existence. Without είμαι, you literally cannot BE anything in Greek. It's irregular (of course it is—every language's 'to be' is irregular, as if existence itself refuses to follow rules). Memorize it. Tattoo it on your arm. You'll use it constantly.",
    examples: [
      { greek: "Είμαι Έλληνας.", english: "I am Greek." },
      { greek: "Είσαι καλά;", english: "Are you well?" },
      { greek: "Είναι ωραία μέρα.", english: "It's a beautiful day." }
    ],
    content: {
      type: "greek_conjugation",
      verb: "eime"
    }
  },

  greek_echo: {
    id: "greek_echo",
    title: "Έχω",
    subtitle: "to have",
    category: "verbs",
    icon: "🤲",
    unlockHint: "Express possession",
    description: "The verb of having. Like French, Greek uses this for expressions that English uses 'to be' for. Not 'I'm hungry' but 'I have hunger'—'Έχω πείνα.' It's also essential for forming the perfect tense. Two verbs down, hundreds to go.",
    examples: [
      { greek: "Έχω δύο αδερφές.", english: "I have two sisters." },
      { greek: "Έχεις δίκιο.", english: "You're right. (lit: You have right)" },
      { greek: "Έχει κρύο σήμερα.", english: "It's cold today. (lit: It has cold)" }
    ],
    content: {
      type: "greek_conjugation",
      verb: "echo"
    }
  },

  greek_thelo: {
    id: "greek_thelo",
    title: "Θέλω",
    subtitle: "to want",
    category: "verbs",
    icon: "💫",
    unlockHint: "Express your desires",
    description: "The verb of wanting. Critical for basic survival: 'Θέλω νερό' (I want water), 'Θέλω να φύγω' (I want to leave). When followed by 'να' plus another verb, you're expressing desire for an action. Very useful for polite requests—and demanding cookies.",
    examples: [
      { greek: "Θέλω καφέ.", english: "I want coffee." },
      { greek: "Θέλεις να έρθεις;", english: "Do you want to come?" },
      { greek: "Δεν θέλω!", english: "I don't want to!" }
    ],
    content: {
      type: "greek_conjugation",
      verb: "thelo"
    }
  },

  greek_kano: {
    id: "greek_kano",
    title: "Κάνω",
    subtitle: "to do/make",
    category: "verbs",
    icon: "🔨",
    unlockHint: "The versatile action verb",
    description: "The Greek Swiss Army knife. Make dinner? Κάνω. Do homework? Κάνω. Ask 'how are you?' You'll use 'Τι κάνεις;' (What are you doing?) as the standard greeting. It does everything. Learn it. Love it. Use it when you forget the specific verb.",
    examples: [
      { greek: "Τι κάνεις;", english: "How are you? (What are you doing?)" },
      { greek: "Κάνω μπάνιο.", english: "I'm taking a bath." },
      { greek: "Κάνει κρύο.", english: "It's cold. (weather)" }
    ],
    content: {
      type: "greek_conjugation",
      verb: "kano"
    }
  },

  greek_pao: {
    id: "greek_pao",
    title: "Πάω",
    subtitle: "to go",
    category: "verbs",
    icon: "🚶",
    unlockHint: "Movement and direction",
    description: "The verb of going. 'Πού πας;' (Where are you going?) is something you'll hear constantly. Often contracted in speech—'Πηγαίνω' becomes just 'Πάω.' Greeks are in a hurry to get places, even grammatically.",
    examples: [
      { greek: "Πάω σπίτι.", english: "I'm going home." },
      { greek: "Πού πας;", english: "Where are you going?" },
      { greek: "Πάμε!", english: "Let's go!" }
    ],
    content: {
      type: "greek_conjugation",
      verb: "pao"
    }
  },

  greek_milao: {
    id: "greek_milao",
    title: "Μιλάω",
    subtitle: "to speak",
    category: "verbs",
    icon: "💬",
    unlockHint: "Communication is key",
    description: "The verb of speaking. Essential for 'Μιλάτε αγγλικά;' (Do you speak English?)—your survival phrase in Greece. This is a Type B verb (ends in -άω), which means slightly different conjugation patterns. The -άω verbs have their own rhythm.",
    examples: [
      { greek: "Μιλάω ελληνικά.", english: "I speak Greek." },
      { greek: "Μιλάτε αγγλικά;", english: "Do you speak English?" },
      { greek: "Δεν μιλάμε τώρα.", english: "We're not talking now." }
    ],
    content: {
      type: "greek_conjugation",
      verb: "milao"
    }
  },

  greek_verb_types: {
    id: "greek_verb_types",
    title: "Verb Types",
    subtitle: "-ω vs -άω verbs",
    category: "verbs",
    icon: "📝",
    unlockHint: "Understand verb patterns",
    description: "Greek verbs come in two main flavors: Type A (-ω endings like γράφω, κάνω) and Type B (-άω/-ώ endings like μιλάω, αγαπάω). They conjugate slightly differently. Type A is more common, Type B is used for many action verbs. Learn both patterns and you'll conjugate thousands of verbs.",
    examples: [
      { greek: "γράφω, γράφεις, γράφει... (Type A)", english: "to write" },
      { greek: "μιλάω, μιλάς, μιλάει... (Type B)", english: "to speak" },
      { greek: "Same endings, different vowels!", english: "" }
    ],
    content: {
      type: "greek_verb_types"
    }
  },

  // =====================================================
  // COMMON PATTERNS
  // =====================================================
  greek_negation: {
    id: "greek_negation",
    title: "Άρνηση",
    subtitle: "Negation with δεν and μην",
    category: "grammar",
    icon: "🚫",
    unlockHint: "Learn to say no",
    description: "Greek negation is refreshingly simple: slap 'δεν' before the verb. Done. 'I speak' → 'Δεν μιλάω' (I don't speak). Use 'μην' for commands ('Don't do that!') and subjunctive. Two words handle all your negativity needs. Very efficient.",
    examples: [
      { greek: "Δεν καταλαβαίνω.", english: "I don't understand." },
      { greek: "Δεν θέλω.", english: "I don't want to." },
      { greek: "Μην τρέχεις!", english: "Don't run!" }
    ],
    content: {
      type: "greek_negation"
    }
  },

  greek_questions: {
    id: "greek_questions",
    title: "Ερωτήσεις",
    subtitle: "Asking Questions",
    category: "grammar",
    icon: "❓",
    unlockHint: "Learn to inquire",
    description: "Asking questions in Greek is beautifully simple: just raise your voice at the end. No word order changes, no special constructions. 'Μιλάς ελληνικά' (You speak Greek) becomes 'Μιλάς ελληνικά;' (Do you speak Greek?) with just intonation. Magic!",
    examples: [
      { greek: "Τι;", english: "What?" },
      { greek: "Πού είναι η τουαλέτα;", english: "Where is the toilet?" },
      { greek: "Πώς σε λένε;", english: "What's your name?" }
    ],
    content: {
      type: "greek_questions"
    }
  },

  greek_numbers: {
    id: "greek_numbers",
    title: "Αριθμοί",
    subtitle: "Numbers 1-20",
    category: "reference",
    icon: "🔢",
    unlockHint: "Count in Greek",
    alwaysUnlocked: true,
    description: "Greek numbers 1-4 change based on gender. 'Ένας/μία/ένα' (one), 'δύο' (two—gender-neutral, thankfully), 'τρεις/τρία' (three), 'τέσσερις/τέσσερα' (four). After four, numbers become blissfully invariable. Why four? Ask the ancient Greeks. They're not talking.",
    examples: [
      { greek: "ένας, δύο, τρεις, τέσσερις, πέντε", english: "1, 2, 3, 4, 5" },
      { greek: "τρεις άντρες / τρία παιδιά", english: "three men / three children" },
      { greek: "Πόσο κάνει; Δέκα ευρώ.", english: "How much? Ten euros." }
    ],
    content: {
      type: "greek_numbers"
    }
  },

  greek_greetings: {
    id: "greek_greetings",
    title: "Χαιρετισμοί",
    subtitle: "Greetings & Politeness",
    category: "reference",
    icon: "👋",
    unlockHint: "Social basics",
    alwaysUnlocked: true,
    description: "'Γεια σου' literally means 'health to you'—Greeks wish you well just by saying hello. 'Καλημέρα' (good morning), 'Καλησπέρα' (good evening), 'Καληνύχτα' (good night) all start with 'καλή' (good). 'Ευχαριστώ' (thank you) comes from the same root as 'Eucharist'—gratitude runs deep in Greek.",
    examples: [
      { greek: "Γεια σου! / Γεια σας!", english: "Hello! (informal / formal)" },
      { greek: "Καλημέρα, τι κάνεις;", english: "Good morning, how are you?" },
      { greek: "Ευχαριστώ πολύ!", english: "Thank you very much!" }
    ],
    content: {
      type: "greek_greetings"
    }
  }
};

// Greek-specific category additions
const GREEK_SPELLBOOK_CATEGORIES = [
  { id: "alphabet", label: "Alphabet", icon: "🔤" },
  { id: "verbs", label: "Verbs", icon: "⚡" },
  { id: "grammar", label: "Grammar", icon: "📚" },
  { id: "reference", label: "Reference", icon: "📋" }
];

// Greek verb conjugation data
const GREEK_VERBS = {
  eime: {
    dictionary: "είμαι",
    english: "to be",
    romanized: "íme",
    type: "irregular",
    hint: "The most important Greek verb—without it, you cannot BE!",
    present: {
      "εγώ": "είμαι",
      "εσύ": "είσαι",
      "αυτός/ή/ό": "είναι",
      "εμείς": "είμαστε",
      "εσείς": "είστε",
      "αυτοί/ές/ά": "είναι"
    },
    past: {
      "εγώ": "ήμουν",
      "εσύ": "ήσουν",
      "αυτός/ή/ό": "ήταν",
      "εμείς": "ήμασταν",
      "εσείς": "ήσασταν",
      "αυτοί/ές/ά": "ήταν"
    }
  },
  echo: {
    dictionary: "έχω",
    english: "to have",
    romanized: "ého",
    type: "regular-A",
    hint: "Used for possession and many expressions—'έχω πείνα' = I'm hungry",
    present: {
      "εγώ": "έχω",
      "εσύ": "έχεις",
      "αυτός/ή/ό": "έχει",
      "εμείς": "έχουμε",
      "εσείς": "έχετε",
      "αυτοί/ές/ά": "έχουν"
    },
    past: {
      "εγώ": "είχα",
      "εσύ": "είχες",
      "αυτός/ή/ό": "είχε",
      "εμείς": "είχαμε",
      "εσείς": "είχατε",
      "αυτοί/ές/ά": "είχαν"
    }
  },
  thelo: {
    dictionary: "θέλω",
    english: "to want",
    romanized: "thélo",
    type: "regular-A",
    hint: "Follow with 'να' + verb to express wanting to do something",
    present: {
      "εγώ": "θέλω",
      "εσύ": "θέλεις",
      "αυτός/ή/ό": "θέλει",
      "εμείς": "θέλουμε",
      "εσείς": "θέλετε",
      "αυτοί/ές/ά": "θέλουν"
    },
    past: {
      "εγώ": "ήθελα",
      "εσύ": "ήθελες",
      "αυτός/ή/ό": "ήθελε",
      "εμείς": "θέλαμε",
      "εσείς": "θέλατε",
      "αυτοί/ές/ά": "ήθελαν"
    }
  },
  kano: {
    dictionary: "κάνω",
    english: "to do/make",
    romanized: "káno",
    type: "regular-A",
    hint: "The Swiss Army knife—'Τι κάνεις;' = How are you?",
    present: {
      "εγώ": "κάνω",
      "εσύ": "κάνεις",
      "αυτός/ή/ό": "κάνει",
      "εμείς": "κάνουμε",
      "εσείς": "κάνετε",
      "αυτοί/ές/ά": "κάνουν"
    },
    past: {
      "εγώ": "έκανα",
      "εσύ": "έκανες",
      "αυτός/ή/ό": "έκανε",
      "εμείς": "κάναμε",
      "εσείς": "κάνατε",
      "αυτοί/ές/ά": "έκαναν"
    }
  },
  pao: {
    dictionary: "πάω",
    english: "to go",
    romanized: "páo",
    type: "irregular",
    hint: "Also 'πηγαίνω' in formal speech. 'Πάμε!' = Let's go!",
    present: {
      "εγώ": "πάω",
      "εσύ": "πας",
      "αυτός/ή/ό": "πάει",
      "εμείς": "πάμε",
      "εσείς": "πάτε",
      "αυτοί/ές/ά": "πάνε"
    },
    past: {
      "εγώ": "πήγα",
      "εσύ": "πήγες",
      "αυτός/ή/ό": "πήγε",
      "εμείς": "πήγαμε",
      "εσείς": "πήγατε",
      "αυτοί/ές/ά": "πήγαν"
    }
  },
  milao: {
    dictionary: "μιλάω",
    english: "to speak",
    romanized: "miláo",
    type: "regular-B",
    hint: "Type B verb (ends in -άω). 'Μιλάτε αγγλικά;' = Do you speak English?",
    present: {
      "εγώ": "μιλάω / μιλώ",
      "εσύ": "μιλάς",
      "αυτός/ή/ό": "μιλάει / μιλά",
      "εμείς": "μιλάμε",
      "εσείς": "μιλάτε",
      "αυτοί/ές/ά": "μιλάνε / μιλούν"
    },
    past: {
      "εγώ": "μίλησα",
      "εσύ": "μίλησες",
      "αυτός/ή/ό": "μίλησε",
      "εμείς": "μιλήσαμε",
      "εσείς": "μιλήσατε",
      "αυτοί/ές/ά": "μίλησαν"
    }
  }
};

// Greek alphabet data for reference pages
const GREEK_ALPHABET = {
  letters: [
    { upper: "Α", lower: "α", name: "άλφα", romanized: "a", sound: "ah", english: "alpha" },
    { upper: "Β", lower: "β", name: "βήτα", romanized: "v", sound: "v", english: "beta" },
    { upper: "Γ", lower: "γ", name: "γάμμα", romanized: "g/y", sound: "g or y", english: "gamma" },
    { upper: "Δ", lower: "δ", name: "δέλτα", romanized: "d", sound: "th (as in 'this')", english: "delta" },
    { upper: "Ε", lower: "ε", name: "έψιλον", romanized: "e", sound: "eh", english: "epsilon" },
    { upper: "Ζ", lower: "ζ", name: "ζήτα", romanized: "z", sound: "z", english: "zeta" },
    { upper: "Η", lower: "η", name: "ήτα", romanized: "i", sound: "ee", english: "eta" },
    { upper: "Θ", lower: "θ", name: "θήτα", romanized: "th", sound: "th (as in 'think')", english: "theta" },
    { upper: "Ι", lower: "ι", name: "ιώτα", romanized: "i", sound: "ee", english: "iota" },
    { upper: "Κ", lower: "κ", name: "κάππα", romanized: "k", sound: "k", english: "kappa" },
    { upper: "Λ", lower: "λ", name: "λάμδα", romanized: "l", sound: "l", english: "lambda" },
    { upper: "Μ", lower: "μ", name: "μι", romanized: "m", sound: "m", english: "mu" },
    { upper: "Ν", lower: "ν", name: "νι", romanized: "n", sound: "n", english: "nu" },
    { upper: "Ξ", lower: "ξ", name: "ξι", romanized: "x/ks", sound: "ks", english: "xi" },
    { upper: "Ο", lower: "ο", name: "όμικρον", romanized: "o", sound: "oh", english: "omicron" },
    { upper: "Π", lower: "π", name: "πι", romanized: "p", sound: "p", english: "pi" },
    { upper: "Ρ", lower: "ρ", name: "ρο", romanized: "r", sound: "r (rolled)", english: "rho" },
    { upper: "Σ", lower: "σ/ς", name: "σίγμα", romanized: "s", sound: "s", english: "sigma", note: "ς at word end" },
    { upper: "Τ", lower: "τ", name: "ταυ", romanized: "t", sound: "t", english: "tau" },
    { upper: "Υ", lower: "υ", name: "ύψιλον", romanized: "y/i", sound: "ee", english: "upsilon" },
    { upper: "Φ", lower: "φ", name: "φι", romanized: "f", sound: "f", english: "phi" },
    { upper: "Χ", lower: "χ", name: "χι", romanized: "ch/h", sound: "h (guttural)", english: "chi" },
    { upper: "Ψ", lower: "ψ", name: "ψι", romanized: "ps", sound: "ps", english: "psi" },
    { upper: "Ω", lower: "ω", name: "ωμέγα", romanized: "o", sound: "oh", english: "omega" }
  ],
  vowels: ["Α", "Ε", "Η", "Ι", "Ο", "Υ", "Ω"],
  digraphs: [
    { greek: "αι", romanized: "e", sound: "eh", example: "και (ke) = and" },
    { greek: "ει", romanized: "i", sound: "ee", example: "είμαι (íme) = I am" },
    { greek: "οι", romanized: "i", sound: "ee", example: "οικογένεια = family" },
    { greek: "ου", romanized: "ou", sound: "oo", example: "ούτε (oúte) = neither" },
    { greek: "αυ", romanized: "av/af", sound: "av before vowels, af before voiceless", example: "αυτός (aftós) = he" },
    { greek: "ευ", romanized: "ev/ef", sound: "ev before vowels, ef before voiceless", example: "ευχαριστώ (efharistó)" },
    { greek: "μπ", romanized: "b/mb", sound: "b at start, mb in middle", example: "μπίρα (bíra) = beer" },
    { greek: "ντ", romanized: "d/nd", sound: "d at start, nd in middle", example: "ντομάτα (domáta) = tomato" },
    { greek: "γκ", romanized: "g/ng", sound: "g at start, ng in middle", example: "γκολ (gol) = goal" },
    { greek: "γγ", romanized: "ng", sound: "ng", example: "άγγελος (ángelos) = angel" },
    { greek: "τσ", romanized: "ts", sound: "ts", example: "τσάι (tsái) = tea" },
    { greek: "τζ", romanized: "dz", sound: "dz", example: "τζάμι (dzámi) = glass" }
  ]
};

// Greek articles table
const GREEK_ARTICLES = {
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
};

// Greek numbers 1-20
const GREEK_NUMBERS = [
  { number: 1, greek: "ένα", romanized: "éna", note: "ένας (m), μία (f), ένα (n)" },
  { number: 2, greek: "δύο", romanized: "dío", note: "invariable" },
  { number: 3, greek: "τρία", romanized: "tría", note: "τρεις (m/f), τρία (n)" },
  { number: 4, greek: "τέσσερα", romanized: "tésera", note: "τέσσερις (m/f), τέσσερα (n)" },
  { number: 5, greek: "πέντε", romanized: "pénde" },
  { number: 6, greek: "έξι", romanized: "éxi" },
  { number: 7, greek: "επτά/εφτά", romanized: "eptá/eftá" },
  { number: 8, greek: "οκτώ/οχτώ", romanized: "októ/ohtó" },
  { number: 9, greek: "εννέα/εννιά", romanized: "enéa/eniá" },
  { number: 10, greek: "δέκα", romanized: "déka" },
  { number: 11, greek: "έντεκα", romanized: "éndeka" },
  { number: 12, greek: "δώδεκα", romanized: "dódeka" },
  { number: 13, greek: "δεκατρία", romanized: "dekatría" },
  { number: 14, greek: "δεκατέσσερα", romanized: "dekatésera" },
  { number: 15, greek: "δεκαπέντε", romanized: "dekapénde" },
  { number: 16, greek: "δεκαέξι", romanized: "dekaéxi" },
  { number: 17, greek: "δεκαεπτά", romanized: "dekaeptá" },
  { number: 18, greek: "δεκαοκτώ", romanized: "dekaoktó" },
  { number: 19, greek: "δεκαεννέα", romanized: "dekaenéa" },
  { number: 20, greek: "είκοσι", romanized: "íkosi" }
];

// Greek question words
const GREEK_QUESTION_WORDS = [
  { greek: "Τι;", english: "What?", romanized: "Ti?" },
  { greek: "Ποιος/Ποια/Ποιο;", english: "Who?/Which?", romanized: "Piós/Piá/Pió?" },
  { greek: "Πού;", english: "Where?", romanized: "Poú?" },
  { greek: "Πότε;", english: "When?", romanized: "Póte?" },
  { greek: "Πώς;", english: "How?", romanized: "Pos?" },
  { greek: "Γιατί;", english: "Why?", romanized: "Yiatí?" },
  { greek: "Πόσο;", english: "How much?", romanized: "Póso?" },
  { greek: "Πόσα;", english: "How many?", romanized: "Pósa?" }
];

// =====================================================
// Greek Spellbook Render Functions
// These render the content for Greek-specific page types
// =====================================================

const GreekSpellbookRenderer = {
  /**
   * Render Greek alphabet page
   */
  renderGreekAlphabet() {
    let html = `
      <div class="page-section">
        <div class="page-section-title">The 24 Letters</div>
        <table class="conjugation-table alphabet-table">
          <thead>
            <tr>
              <th>Upper</th>
              <th>Lower</th>
              <th>Name</th>
              <th>Sound</th>
              <th>English</th>
            </tr>
          </thead>
          <tbody>
    `;

    GREEK_ALPHABET.letters.forEach(letter => {
      const note = letter.note ? ` <span class="letter-note">(${letter.note})</span>` : '';
      html += `
        <tr>
          <td class="letter-cell">${letter.upper}</td>
          <td class="letter-cell">${letter.lower}${note}</td>
          <td>${letter.name}</td>
          <td class="sound-cell">${letter.sound}</td>
          <td class="english-name">${letter.english}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
      <div class="grammar-tip">
        <span class="grammar-tip-icon">⚠️</span>
        Watch out for false friends: Ρ = R (not P), Η = ee (not H), Χ = ch/h (not X)!
      </div>
    `;

    return html;
  },

  /**
   * Render Greek vowels page
   */
  renderGreekVowels() {
    return `
      <div class="page-section">
        <div class="page-section-title">7 Vowel Letters, 5 Sounds</div>
        <div class="vowel-grid">
          <div class="vowel-group">
            <div class="vowel-sound">Sound: "ah"</div>
            <div class="vowel-letters">Α α</div>
          </div>
          <div class="vowel-group">
            <div class="vowel-sound">Sound: "eh"</div>
            <div class="vowel-letters">Ε ε</div>
          </div>
          <div class="vowel-group highlight">
            <div class="vowel-sound">Sound: "ee" (all the same!)</div>
            <div class="vowel-letters">Η η, Ι ι, Υ υ</div>
          </div>
          <div class="vowel-group">
            <div class="vowel-sound">Sound: "oh"</div>
            <div class="vowel-letters">Ο ο, Ω ω</div>
          </div>
        </div>
      </div>
      <div class="page-section">
        <div class="page-section-title">Vowel Combinations (Diphthongs)</div>
        <table class="conjugation-table">
          <thead>
            <tr><th>Combo</th><th>Sound</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr><td>αι</td><td>"eh"</td><td>και (ke) = and</td></tr>
            <tr><td>ει, οι</td><td>"ee"</td><td>είμαι, οικογένεια</td></tr>
            <tr><td>ου</td><td>"oo"</td><td>ούτε (oúte) = neither</td></tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Η, Ι, Υ, ΕΙ, and ΟΙ all make the "ee" sound. Context tells you which to write!
      </div>
    `;
  },

  /**
   * Render Greek digraphs page
   */
  renderGreekDigraphs() {
    let html = `
      <div class="page-section">
        <div class="page-section-title">Consonant Combinations</div>
        <p style="margin-bottom: 12px;">These create sounds that don't have their own letters:</p>
        <table class="conjugation-table">
          <thead>
            <tr><th>Letters</th><th>Sound</th><th>Example</th></tr>
          </thead>
          <tbody>
    `;

    GREEK_ALPHABET.digraphs.forEach(d => {
      html += `
        <tr>
          <td class="letter-cell">${d.greek}</td>
          <td>${d.sound}</td>
          <td class="example-cell">${d.example}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        ΜΠ, ΝΤ, ΓΚ borrowed their sounds back! Greeks invented B, D, G but gave them away.
      </div>
    `;

    return html;
  },

  /**
   * Render Greek accents page
   */
  renderGreekAccents() {
    return `
      <div class="page-section">
        <div class="page-section-title">The Tonos (΄)</div>
        <p>Every Greek word of 2+ syllables needs an accent mark showing stress:</p>
        <div class="accent-examples">
          <div class="accent-example">
            <span class="accented">ά</span> <span class="accented">έ</span>
            <span class="accented">ή</span> <span class="accented">ί</span>
            <span class="accented">ό</span> <span class="accented">ύ</span>
            <span class="accented">ώ</span>
          </div>
        </div>
      </div>
      <div class="page-section">
        <div class="page-section-title">Accent Rules</div>
        <ul class="grammar-list">
          <li>Accent is always on one of the <strong>last 3 syllables</strong></li>
          <li>One-syllable words usually don't need accents</li>
          <li>Some words change meaning with different accent placement!</li>
        </ul>
        <div class="meaning-change">
          <div class="meaning-pair">
            <span class="word">μαμά</span> = mom
            <span class="vs">vs</span>
            <span class="word">μάμα</span> = grandma
          </div>
        </div>
      </div>
      <div class="grammar-tip">
        <span class="grammar-tip-icon">⚠️</span>
        Wrong accent = wrong word! Always pay attention to where the stress falls.
      </div>
    `;
  },

  /**
   * Render Greek cases overview
   */
  renderGreekCases() {
    return `
      <div class="page-section">
        <div class="page-section-title">The Four Cases</div>
        <div class="cases-grid">
          <div class="case-card nominative">
            <div class="case-name">Ονομαστική</div>
            <div class="case-english">Nominative</div>
            <div class="case-use">Subject of sentence</div>
            <div class="case-example">Ο σκύλος τρέχει.</div>
            <div class="case-translation">The dog runs.</div>
          </div>
          <div class="case-card genitive">
            <div class="case-name">Γενική</div>
            <div class="case-english">Genitive</div>
            <div class="case-use">Possession, "of"</div>
            <div class="case-example">Το βιβλίο του Γιάννη.</div>
            <div class="case-translation">Yannis's book.</div>
          </div>
          <div class="case-card accusative">
            <div class="case-name">Αιτιατική</div>
            <div class="case-english">Accusative</div>
            <div class="case-use">Direct object</div>
            <div class="case-example">Βλέπω τον σκύλο.</div>
            <div class="case-translation">I see the dog.</div>
          </div>
          <div class="case-card vocative">
            <div class="case-name">Κλητική</div>
            <div class="case-english">Vocative</div>
            <div class="case-use">Direct address</div>
            <div class="case-example">Γιάννη, έλα!</div>
            <div class="case-translation">Yannis, come!</div>
          </div>
        </div>
      </div>
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Articles AND noun endings change with case. It's a package deal!
      </div>
    `;
  },

  /**
   * Render Greek articles with full declension
   */
  renderGreekArticles() {
    return `
      <div class="page-section">
        <div class="page-section-title">Definite Articles (the)</div>
        <table class="conjugation-table articles-table">
          <thead>
            <tr>
              <th>Case</th>
              <th>Masc (sg/pl)</th>
              <th>Fem (sg/pl)</th>
              <th>Neut (sg/pl)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="case-label">Nominative</td>
              <td>ο / οι</td>
              <td>η / οι</td>
              <td>το / τα</td>
            </tr>
            <tr>
              <td class="case-label">Genitive</td>
              <td>του / των</td>
              <td>της / των</td>
              <td>του / των</td>
            </tr>
            <tr>
              <td class="case-label">Accusative</td>
              <td>τον / τους</td>
              <td>την / τις</td>
              <td>το / τα</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="page-section">
        <div class="page-section-title">Indefinite Articles (a/an)</div>
        <table class="conjugation-table">
          <thead>
            <tr><th>Case</th><th>Masculine</th><th>Feminine</th><th>Neuter</th></tr>
          </thead>
          <tbody>
            <tr><td class="case-label">Nominative</td><td>ένας</td><td>μία/μια</td><td>ένα</td></tr>
            <tr><td class="case-label">Genitive</td><td>ενός</td><td>μιας</td><td>ενός</td></tr>
            <tr><td class="case-label">Accusative</td><td>έναν</td><td>μία/μια</td><td>ένα</td></tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        No indefinite plural! For "some books" just use the noun without article.
      </div>
    `;
  },

  /**
   * Render Greek gender page
   */
  renderGreekGender() {
    return `
      <div class="page-section">
        <div class="page-section-title">Three Genders</div>
        <div class="gender-grid-greek">
          <div class="gender-card masculine">
            <div class="gender-title">Αρσενικό (Masculine)</div>
            <div class="gender-article">ο</div>
            <div class="gender-examples">
              <div>ο ήλιος (sun)</div>
              <div>ο άνθρωπος (human)</div>
              <div>ο δάσκαλος (teacher)</div>
            </div>
            <div class="gender-hint">Often ends in: -ος, -ας, -ης</div>
          </div>
          <div class="gender-card feminine">
            <div class="gender-title">Θηλυκό (Feminine)</div>
            <div class="gender-article">η</div>
            <div class="gender-examples">
              <div>η σελήνη (moon)</div>
              <div>η γυναίκα (woman)</div>
              <div>η αγάπη (love)</div>
            </div>
            <div class="gender-hint">Often ends in: -α, -η</div>
          </div>
          <div class="gender-card neuter">
            <div class="gender-title">Ουδέτερο (Neuter)</div>
            <div class="gender-article">το</div>
            <div class="gender-examples">
              <div>το παιδί (child)</div>
              <div>το βιβλίο (book)</div>
              <div>το όνομα (name)</div>
            </div>
            <div class="gender-hint">Often ends in: -ο, -ι, -μα</div>
          </div>
        </div>
      </div>
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Endings are good hints but not rules. Learn each noun with its article!
      </div>
    `;
  },

  /**
   * Render Greek pronouns
   */
  renderGreekPronouns() {
    return `
      <div class="page-section">
        <div class="page-section-title">Subject Pronouns</div>
        <table class="conjugation-table">
          <thead>
            <tr><th>Person</th><th>Greek</th><th>Romanized</th><th>English</th></tr>
          </thead>
          <tbody>
            <tr><td>1st sing.</td><td class="greek-text">εγώ</td><td>egó</td><td>I</td></tr>
            <tr><td>2nd sing.</td><td class="greek-text">εσύ</td><td>esí</td><td>you</td></tr>
            <tr><td>3rd sing.</td><td class="greek-text">αυτός/αυτή/αυτό</td><td>aftós/aftí/aftó</td><td>he/she/it</td></tr>
            <tr><td>1st pl.</td><td class="greek-text">εμείς</td><td>emís</td><td>we</td></tr>
            <tr><td>2nd pl.</td><td class="greek-text">εσείς</td><td>esís</td><td>you (pl/formal)</td></tr>
            <tr><td>3rd pl.</td><td class="greek-text">αυτοί/αυτές/αυτά</td><td>aftí/aftés/aftá</td><td>they (m/f/n)</td></tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Pronouns are often dropped! Verb endings show the person. "Μιλάω" = "I speak."
      </div>
    `;
  },

  /**
   * Render Greek verb conjugation
   */
  renderGreekConjugation(verbId) {
    const verb = GREEK_VERBS[verbId];
    if (!verb) return '<p>Verb not found.</p>';

    let html = `
      <div class="page-section">
        <div class="page-section-title">Present Tense (Ενεστώτας)</div>
        <table class="conjugation-table">
          <thead>
            <tr><th>Pronoun</th><th>Form</th></tr>
          </thead>
          <tbody>
    `;

    const pronounOrder = ["εγώ", "εσύ", "αυτός/ή/ό", "εμείς", "εσείς", "αυτοί/ές/ά"];
    pronounOrder.forEach(pronoun => {
      if (verb.present[pronoun]) {
        html += `
          <tr>
            <td class="pronoun">${pronoun}</td>
            <td class="form">${verb.present[pronoun]}</td>
          </tr>
        `;
      }
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    // Add past tense if available
    if (verb.past) {
      html += `
        <div class="page-section">
          <div class="page-section-title">Past Tense (Αόριστος/Παρατατικός)</div>
          <table class="conjugation-table">
            <thead>
              <tr><th>Pronoun</th><th>Form</th></tr>
            </thead>
            <tbody>
      `;

      pronounOrder.forEach(pronoun => {
        if (verb.past[pronoun]) {
          html += `
            <tr>
              <td class="pronoun">${pronoun}</td>
              <td class="form">${verb.past[pronoun]}</td>
            </tr>
          `;
        }
      });

      html += `
            </tbody>
          </table>
        </div>
      `;
    }

    // Add tip
    if (verb.hint) {
      html += `
        <div class="grammar-tip">
          <span class="grammar-tip-icon">💡</span>
          ${verb.hint}
        </div>
      `;
    }

    return html;
  },

  /**
   * Render Greek verb types explanation
   */
  renderGreekVerbTypes() {
    return `
      <div class="page-section">
        <div class="page-section-title">Type A Verbs (-ω)</div>
        <p>Most common pattern. Remove -ω and add endings:</p>
        <table class="conjugation-table">
          <thead>
            <tr><th>Person</th><th>Ending</th><th>γράφω (write)</th></tr>
          </thead>
          <tbody>
            <tr><td>εγώ</td><td>-ω</td><td>γράφω</td></tr>
            <tr><td>εσύ</td><td>-εις</td><td>γράφεις</td></tr>
            <tr><td>αυτός</td><td>-ει</td><td>γράφει</td></tr>
            <tr><td>εμείς</td><td>-ουμε</td><td>γράφουμε</td></tr>
            <tr><td>εσείς</td><td>-ετε</td><td>γράφετε</td></tr>
            <tr><td>αυτοί</td><td>-ουν</td><td>γράφουν</td></tr>
          </tbody>
        </table>
      </div>
      <div class="page-section">
        <div class="page-section-title">Type B Verbs (-άω/-ώ)</div>
        <p>Action verbs often use this pattern:</p>
        <table class="conjugation-table">
          <thead>
            <tr><th>Person</th><th>Ending</th><th>μιλάω (speak)</th></tr>
          </thead>
          <tbody>
            <tr><td>εγώ</td><td>-άω/-ώ</td><td>μιλάω/μιλώ</td></tr>
            <tr><td>εσύ</td><td>-άς</td><td>μιλάς</td></tr>
            <tr><td>αυτός</td><td>-άει/-ά</td><td>μιλάει/μιλά</td></tr>
            <tr><td>εμείς</td><td>-άμε</td><td>μιλάμε</td></tr>
            <tr><td>εσείς</td><td>-άτε</td><td>μιλάτε</td></tr>
            <tr><td>αυτοί</td><td>-άνε/-ούν</td><td>μιλάνε/μιλούν</td></tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Type B verbs often have contracted forms (μιλώ instead of μιλάω). Both are correct!
      </div>
    `;
  },

  /**
   * Render Greek negation
   */
  renderGreekNegation() {
    return `
      <div class="page-section">
        <div class="page-section-title">Δεν - Standard Negation</div>
        <p>Just put <strong>δεν</strong> before the verb:</p>
        <div class="negation-examples">
          <div class="negation-example">
            <span class="positive">Μιλάω</span> → <span class="negative">Δεν μιλάω</span>
            <span class="translation">I speak → I don't speak</span>
          </div>
          <div class="negation-example">
            <span class="positive">Καταλαβαίνω</span> → <span class="negative">Δεν καταλαβαίνω</span>
            <span class="translation">I understand → I don't understand</span>
          </div>
        </div>
      </div>
      <div class="page-section">
        <div class="page-section-title">Μην - For Commands & Subjunctive</div>
        <p>Use <strong>μην</strong> for negative commands:</p>
        <div class="negation-examples">
          <div class="negation-example">
            <span class="negative">Μην τρέχεις!</span>
            <span class="translation">Don't run!</span>
          </div>
          <div class="negation-example">
            <span class="negative">Μην ανησυχείς.</span>
            <span class="translation">Don't worry.</span>
          </div>
        </div>
      </div>
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Unlike French, no sandwich needed! Just δεν + verb. Simple!
      </div>
    `;
  },

  /**
   * Render Greek questions
   */
  renderGreekQuestions() {
    let html = `
      <div class="page-section">
        <div class="page-section-title">Yes/No Questions</div>
        <p>Just raise your voice at the end. No word order change needed!</p>
        <div class="question-example">
          <span class="statement">Μιλάς ελληνικά.</span>
          <span class="arrow">→</span>
          <span class="question">Μιλάς ελληνικά;</span>
        </div>
      </div>
      <div class="page-section">
        <div class="page-section-title">Question Words</div>
        <table class="conjugation-table">
          <thead>
            <tr><th>Greek</th><th>Romanized</th><th>English</th></tr>
          </thead>
          <tbody>
    `;

    GREEK_QUESTION_WORDS.forEach(q => {
      html += `<tr><td class="greek-text">${q.greek}</td><td>${q.romanized}</td><td>${q.english}</td></tr>`;
    });

    html += `
          </tbody>
        </table>
      </div>
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Πού (where) has an accent. Που (that/which) doesn't. Big difference!
      </div>
    `;

    return html;
  },

  /**
   * Render Greek numbers
   */
  renderGreekNumbers() {
    let html = `
      <div class="page-section">
        <div class="page-section-title">Numbers 1-20</div>
        <table class="conjugation-table numbers-table">
          <thead>
            <tr><th>#</th><th>Greek</th><th>Romanized</th><th>Note</th></tr>
          </thead>
          <tbody>
    `;

    GREEK_NUMBERS.forEach(n => {
      html += `
        <tr>
          <td>${n.number}</td>
          <td class="greek-text">${n.greek}</td>
          <td>${n.romanized}</td>
          <td class="note">${n.note || ''}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Only 1-4 change for gender. After that, numbers are invariable. Small mercy!
      </div>
    `;

    return html;
  },

  /**
   * Render Greek greetings
   */
  renderGreekGreetings() {
    return `
      <div class="page-section">
        <div class="page-section-title">Common Greetings</div>
        <table class="conjugation-table">
          <thead>
            <tr><th>Greek</th><th>Romanized</th><th>When to Use</th></tr>
          </thead>
          <tbody>
            <tr><td class="greek-text">Γεια σου / Γεια σας</td><td>Yia sou / Yia sas</td><td>Hello/Bye (informal/formal)</td></tr>
            <tr><td class="greek-text">Καλημέρα</td><td>Kaliméra</td><td>Good morning (until noon)</td></tr>
            <tr><td class="greek-text">Καλησπέρα</td><td>Kalispéra</td><td>Good evening (afternoon on)</td></tr>
            <tr><td class="greek-text">Καληνύχτα</td><td>Kaliníhta</td><td>Good night (leaving/sleeping)</td></tr>
            <tr><td class="greek-text">Αντίο</td><td>Adío</td><td>Goodbye (more formal)</td></tr>
          </tbody>
        </table>
      </div>
      <div class="page-section">
        <div class="page-section-title">Polite Phrases</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td class="greek-text">Ευχαριστώ (πολύ)</td><td>Efharistó (polí)</td><td>Thank you (very much)</td></tr>
            <tr><td class="greek-text">Παρακαλώ</td><td>Parakaló</td><td>Please / You're welcome</td></tr>
            <tr><td class="greek-text">Συγγνώμη</td><td>Signómi</td><td>Excuse me / Sorry</td></tr>
            <tr><td class="greek-text">Τι κάνεις;</td><td>Ti kánis?</td><td>How are you?</td></tr>
            <tr><td class="greek-text">Καλά, ευχαριστώ!</td><td>Kalá, efharistó!</td><td>Fine, thank you!</td></tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        "Γεια" literally means "health" - Greeks wish you well just by saying hello!
      </div>
    `;
  },

  /**
   * Main dispatch function for Greek content types
   */
  renderContent(page) {
    switch (page.content.type) {
      case 'greek_alphabet':
        return this.renderGreekAlphabet();
      case 'greek_vowels':
        return this.renderGreekVowels();
      case 'greek_digraphs':
        return this.renderGreekDigraphs();
      case 'greek_accents':
        return this.renderGreekAccents();
      case 'greek_cases':
        return this.renderGreekCases();
      case 'greek_nominative':
      case 'greek_genitive':
      case 'greek_accusative':
      case 'greek_vocative':
        return this.renderGreekCases(); // Reuse cases overview for now
      case 'greek_articles':
        return this.renderGreekArticles();
      case 'greek_gender':
        return this.renderGreekGender();
      case 'greek_pronouns':
        return this.renderGreekPronouns();
      case 'greek_conjugation':
        return this.renderGreekConjugation(page.content.verb);
      case 'greek_verb_types':
        return this.renderGreekVerbTypes();
      case 'greek_negation':
        return this.renderGreekNegation();
      case 'greek_questions':
        return this.renderGreekQuestions();
      case 'greek_numbers':
        return this.renderGreekNumbers();
      case 'greek_greetings':
        return this.renderGreekGreetings();
      default:
        return '<p>Content not available for this page type.</p>';
    }
  }
};

// Export for module system (Node.js compatibility)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GREEK_SPELLBOOK,
    GREEK_SPELLBOOK_CATEGORIES,
    GREEK_VERBS,
    GREEK_ALPHABET,
    GREEK_ARTICLES,
    GREEK_NUMBERS,
    GREEK_QUESTION_WORDS
  };
}

// Also make available globally for browser
if (typeof window !== 'undefined') {
  window.GREEK_SPELLBOOK = GREEK_SPELLBOOK;
  window.GREEK_SPELLBOOK_CATEGORIES = GREEK_SPELLBOOK_CATEGORIES;
  window.GREEK_VERBS = GREEK_VERBS;
  window.GREEK_ALPHABET = GREEK_ALPHABET;
  window.GREEK_ARTICLES = GREEK_ARTICLES;
  window.GREEK_NUMBERS = GREEK_NUMBERS;
  window.GREEK_QUESTION_WORDS = GREEK_QUESTION_WORDS;
}
