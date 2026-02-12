// ByteQuest - Dutch Spellbook Data
// Language-specific grammar reference for Dutch (Nederlands)

// =====================================================
// Dutch Spellbook Pages
// =====================================================

const DUTCH_SPELLBOOK = {
  // =====================================================
  // VERBS
  // =====================================================
  zijn: {
    id: "zijn",
    title: "Zijn",
    subtitle: "to be",
    category: "verbs",
    icon: "✨",
    unlockHint: "Learn from Sage Aldric in Dawnmere",
    description: "The existential verb of Dutch. Without it, you cannot BE anything—not happy, not Dutch, not even confused about Dutch grammar. Unlike English's simple 'is', Dutch gives you 'ben', 'bent', and 'is' depending on who's doing the existing. Very egalitarian.",
    examples: [
      { dutch: "Ik ben Nederlands.", english: "I am Dutch." },
      { dutch: "Jij bent aardig.", english: "You are nice." },
      { dutch: "Wij zijn vrienden.", english: "We are friends." }
    ],
    conjugation: {
      present: {
        "ik": "ben",
        "jij/je": "bent",
        "u": "bent",
        "hij/zij/het": "is",
        "wij/we": "zijn",
        "jullie": "zijn",
        "zij/ze": "zijn"
      }
    },
    content: {
      type: "conjugation",
      verb: "zijn"
    }
  },

  hebben: {
    id: "hebben",
    title: "Hebben",
    subtitle: "to have",
    category: "verbs",
    icon: "🤲",
    unlockHint: "Continue your studies with Sage Aldric",
    description: "The Dutch don't 'be' hungry—they HAVE hunger. They don't 'be' cold—they HAVE it cold. Like the French, the Dutch are collectors of states rather than be-ers of them. 'Ik heb honger' literally means you've acquired some hunger. Keep it, it's yours now.",
    examples: [
      { dutch: "Ik heb een hond.", english: "I have a dog." },
      { dutch: "Jij hebt gelijk.", english: "You are right. (lit: You have right)" },
      { dutch: "Wij hebben honger.", english: "We are hungry. (lit: We have hunger)" }
    ],
    conjugation: {
      present: {
        "ik": "heb",
        "jij/je": "hebt",
        "u": "heeft",
        "hij/zij/het": "heeft",
        "wij/we": "hebben",
        "jullie": "hebben",
        "zij/ze": "hebben"
      }
    },
    content: {
      type: "conjugation",
      verb: "hebben"
    }
  },

  gaan: {
    id: "gaan",
    title: "Gaan",
    subtitle: "to go",
    category: "verbs",
    icon: "🚶",
    unlockHint: "Learn to move in Haari Fields",
    description: "The verb of movement and future plans. 'Ik ga' can mean you're going somewhere OR about to do something. 'Ik ga slapen' could mean 'I'm going to sleep' or 'I'm heading to bed.' The Dutch love efficiency—one phrase, two meanings.",
    examples: [
      { dutch: "Ik ga naar huis.", english: "I'm going home." },
      { dutch: "Wij gaan eten.", english: "We're going to eat." },
      { dutch: "Hoe gaat het?", english: "How are you? (How goes it?)" }
    ],
    conjugation: {
      present: {
        "ik": "ga",
        "jij/je": "gaat",
        "u": "gaat",
        "hij/zij/het": "gaat",
        "wij/we": "gaan",
        "jullie": "gaan",
        "zij/ze": "gaan"
      }
    },
    content: {
      type: "conjugation",
      verb: "gaan"
    }
  },

  komen: {
    id: "komen",
    title: "Komen",
    subtitle: "to come",
    category: "verbs",
    icon: "👋",
    unlockHint: "Learn arrivals in Dawnmere",
    description: "The opposite of gaan, but just as essential. Where are you from? 'Ik kom uit...' Coming to a party? 'Ik kom!' The Dutch are very direct about their arrivals and origins. No beating around the bush here.",
    examples: [
      { dutch: "Ik kom uit Nederland.", english: "I come from the Netherlands." },
      { dutch: "Kom je morgen?", english: "Are you coming tomorrow?" },
      { dutch: "Zij komen later.", english: "They're coming later." }
    ],
    conjugation: {
      present: {
        "ik": "kom",
        "jij/je": "komt",
        "u": "komt",
        "hij/zij/het": "komt",
        "wij/we": "komen",
        "jullie": "komen",
        "zij/ze": "komen"
      }
    },
    content: {
      type: "conjugation",
      verb: "komen"
    }
  },

  doen: {
    id: "doen",
    title: "Doen",
    subtitle: "to do",
    category: "verbs",
    icon: "🔨",
    unlockHint: "Learn to take action",
    description: "The Dutch workhorse verb. Doing homework, doing sports, doing nothing—doen handles it all. 'Wat doe je?' is the Dutch equivalent of 'What are you up to?' Expect to use this one constantly.",
    examples: [
      { dutch: "Wat doe je?", english: "What are you doing?" },
      { dutch: "Ik doe mijn best.", english: "I'm doing my best." },
      { dutch: "Zij doet aan sport.", english: "She plays sports." }
    ],
    conjugation: {
      present: {
        "ik": "doe",
        "jij/je": "doet",
        "u": "doet",
        "hij/zij/het": "doet",
        "wij/we": "doen",
        "jullie": "doen",
        "zij/ze": "doen"
      }
    },
    content: {
      type: "conjugation",
      verb: "doen"
    }
  },

  willen: {
    id: "willen",
    title: "Willen",
    subtitle: "to want",
    category: "verbs",
    icon: "🌟",
    unlockHint: "Express your desires",
    description: "The verb of wanting. Dutch is refreshingly direct—'Ik wil koffie' means 'I want coffee.' No need for 'would like' politeness hedging (though 'Ik zou graag...' exists for the extra polite). The Dutch appreciate directness.",
    examples: [
      { dutch: "Ik wil koffie.", english: "I want coffee." },
      { dutch: "Wil je mee?", english: "Do you want to come along?" },
      { dutch: "Zij willen helpen.", english: "They want to help." }
    ],
    conjugation: {
      present: {
        "ik": "wil",
        "jij/je": "wilt",
        "u": "wilt",
        "hij/zij/het": "wil",
        "wij/we": "willen",
        "jullie": "willen",
        "zij/ze": "willen"
      }
    },
    content: {
      type: "conjugation",
      verb: "willen"
    }
  },

  kunnen: {
    id: "kunnen",
    title: "Kunnen",
    subtitle: "can/to be able",
    category: "verbs",
    icon: "💪",
    unlockHint: "Unlock your abilities",
    description: "The modal verb of ability. 'Ik kan' means you CAN do something. Very similar to English 'can' and German 'können.' Note: the singular forms drop the 'n' entirely. 'Ik kan zwemmen' = I can swim. Simple and powerful.",
    examples: [
      { dutch: "Ik kan zwemmen.", english: "I can swim." },
      { dutch: "Kun je helpen?", english: "Can you help?" },
      { dutch: "Wij kunnen het doen.", english: "We can do it." }
    ],
    conjugation: {
      present: {
        "ik": "kan",
        "jij/je": "kunt/kan",
        "u": "kunt",
        "hij/zij/het": "kan",
        "wij/we": "kunnen",
        "jullie": "kunnen",
        "zij/ze": "kunnen"
      }
    },
    content: {
      type: "conjugation",
      verb: "kunnen"
    }
  },

  moeten: {
    id: "moeten",
    title: "Moeten",
    subtitle: "must/have to",
    category: "verbs",
    icon: "⚠️",
    unlockHint: "Learn about obligations",
    description: "The verb of obligation. 'Ik moet' = I must/have to. When the Dutch say you 'moet', they mean business. Less negotiable than 'should', more like 'this is happening.' Commonly heard: 'Ik moet gaan' = I have to go.",
    examples: [
      { dutch: "Ik moet werken.", english: "I have to work." },
      { dutch: "Je moet eten.", english: "You must eat." },
      { dutch: "Wij moeten gaan.", english: "We have to go." }
    ],
    conjugation: {
      present: {
        "ik": "moet",
        "jij/je": "moet",
        "u": "moet",
        "hij/zij/het": "moet",
        "wij/we": "moeten",
        "jullie": "moeten",
        "zij/ze": "moeten"
      }
    },
    content: {
      type: "conjugation",
      verb: "moeten"
    }
  },

  mogen: {
    id: "mogen",
    title: "Mogen",
    subtitle: "may/to be allowed",
    category: "verbs",
    icon: "✅",
    unlockHint: "Learn about permission",
    description: "The polite permission verb. 'Mag ik?' = May I? Very useful for polite requests. 'Je mag niet' = You're not allowed. The Dutch use this a lot with children and rules. Also expresses liking: 'Ik mag hem' = I like him.",
    examples: [
      { dutch: "Mag ik binnenkomen?", english: "May I come in?" },
      { dutch: "Je mag hier niet roken.", english: "You're not allowed to smoke here." },
      { dutch: "Ik mag hem graag.", english: "I like him." }
    ],
    conjugation: {
      present: {
        "ik": "mag",
        "jij/je": "mag",
        "u": "mag",
        "hij/zij/het": "mag",
        "wij/we": "mogen",
        "jullie": "mogen",
        "zij/ze": "mogen"
      }
    },
    content: {
      type: "conjugation",
      verb: "mogen"
    }
  },

  zullen: {
    id: "zullen",
    title: "Zullen",
    subtitle: "shall/will",
    category: "verbs",
    icon: "🔮",
    unlockHint: "Peer into the future",
    description: "The future helper verb. 'Ik zal' = I shall/will. Used for promises, predictions, and offers. 'Zal ik helpen?' = Shall I help? Very polite way to offer assistance. The future tense in Dutch is often just this verb + infinitive.",
    examples: [
      { dutch: "Ik zal het doen.", english: "I will do it." },
      { dutch: "Zal ik je helpen?", english: "Shall I help you?" },
      { dutch: "Het zal wel goed komen.", english: "It will probably be fine." }
    ],
    conjugation: {
      present: {
        "ik": "zal",
        "jij/je": "zult/zal",
        "u": "zult",
        "hij/zij/het": "zal",
        "wij/we": "zullen",
        "jullie": "zullen",
        "zij/ze": "zullen"
      }
    },
    content: {
      type: "conjugation",
      verb: "zullen"
    }
  },

  spreken: {
    id: "spreken",
    title: "Spreken",
    subtitle: "to speak",
    category: "verbs",
    icon: "💬",
    unlockHint: "Find your voice",
    description: "The verb of speaking. 'Spreek je Nederlands?' is THE question you'll hear. Strong verb with vowel change: spreek → sprak → gesproken. Essential for any language learner to master. Literally.",
    examples: [
      { dutch: "Ik spreek Nederlands.", english: "I speak Dutch." },
      { dutch: "Spreek je Engels?", english: "Do you speak English?" },
      { dutch: "Wij spreken over het weer.", english: "We speak about the weather." }
    ],
    conjugation: {
      present: {
        "ik": "spreek",
        "jij/je": "spreekt",
        "u": "spreekt",
        "hij/zij/het": "spreekt",
        "wij/we": "spreken",
        "jullie": "spreken",
        "zij/ze": "spreken"
      }
    },
    content: {
      type: "conjugation",
      verb: "spreken"
    }
  },

  eten: {
    id: "eten",
    title: "Eten",
    subtitle: "to eat",
    category: "verbs",
    icon: "🍽️",
    unlockHint: "Learn to dine",
    description: "The verb of eating. Also a noun meaning 'food' (het eten). Strong verb: eet → at → gegeten. 'Eet smakelijk!' is what the Dutch say before meals—basically 'Enjoy your food!' Very practical people.",
    examples: [
      { dutch: "Ik eet een appel.", english: "I eat an apple." },
      { dutch: "Wat eten we vanavond?", english: "What are we eating tonight?" },
      { dutch: "Eet smakelijk!", english: "Enjoy your meal!" }
    ],
    conjugation: {
      present: {
        "ik": "eet",
        "jij/je": "eet",
        "u": "eet",
        "hij/zij/het": "eet",
        "wij/we": "eten",
        "jullie": "eten",
        "zij/ze": "eten"
      }
    },
    content: {
      type: "conjugation",
      verb: "eten"
    }
  },

  drinken: {
    id: "drinken",
    title: "Drinken",
    subtitle: "to drink",
    category: "verbs",
    icon: "🍺",
    unlockHint: "Quench your thirst",
    description: "The verb of drinking. Strong verb: drink → dronk → gedronken. The Dutch are serious about their coffee ('koffie') and their beer ('bier'). 'Een drankje doen' = have a drink. Essential vocabulary for socializing.",
    examples: [
      { dutch: "Ik drink koffie.", english: "I drink coffee." },
      { dutch: "Wil je iets drinken?", english: "Do you want something to drink?" },
      { dutch: "Zij drinken thee.", english: "They drink tea." }
    ],
    conjugation: {
      present: {
        "ik": "drink",
        "jij/je": "drinkt",
        "u": "drinkt",
        "hij/zij/het": "drinkt",
        "wij/we": "drinken",
        "jullie": "drinken",
        "zij/ze": "drinken"
      }
    },
    content: {
      type: "conjugation",
      verb: "drinken"
    }
  },

  lezen: {
    id: "lezen",
    title: "Lezen",
    subtitle: "to read",
    category: "verbs",
    icon: "📖",
    unlockHint: "Discover the joy of reading",
    description: "The verb for all your reading needs. Strong verb: lees → las → gelezen. Every spellbook page you read? You're doing 'lezen.' The Dutch have high literacy rates—this verb gets a workout.",
    examples: [
      { dutch: "Ik lees een boek.", english: "I read a book." },
      { dutch: "Lees je graag?", english: "Do you like to read?" },
      { dutch: "Wij lezen de krant.", english: "We read the newspaper." }
    ],
    conjugation: {
      present: {
        "ik": "lees",
        "jij/je": "leest",
        "u": "leest",
        "hij/zij/het": "leest",
        "wij/we": "lezen",
        "jullie": "lezen",
        "zij/ze": "lezen"
      }
    },
    content: {
      type: "conjugation",
      verb: "lezen"
    }
  },

  schrijven: {
    id: "schrijven",
    title: "Schrijven",
    subtitle: "to write",
    category: "verbs",
    icon: "✍️",
    unlockHint: "Put pen to paper",
    description: "The companion to lezen. Strong verb: schrijf → schreef → geschreven. Note the 'ij' digraph—very Dutch. 'Een brief schrijven' = write a letter. In the digital age, also covers texting and emailing.",
    examples: [
      { dutch: "Ik schrijf een brief.", english: "I write a letter." },
      { dutch: "Zij schrijft goed.", english: "She writes well." },
      { dutch: "Wij schrijven samen.", english: "We write together." }
    ],
    conjugation: {
      present: {
        "ik": "schrijf",
        "jij/je": "schrijft",
        "u": "schrijft",
        "hij/zij/het": "schrijft",
        "wij/we": "schrijven",
        "jullie": "schrijven",
        "zij/ze": "schrijven"
      }
    },
    content: {
      type: "conjugation",
      verb: "schrijven"
    }
  },

  werken: {
    id: "werken",
    title: "Werken",
    subtitle: "to work",
    category: "verbs",
    icon: "💼",
    unlockHint: "Learn the value of work",
    description: "Regular verb for working. The Dutch are known for their work-life balance—they work hard but also value free time. 'Waar werk je?' = Where do you work? A common conversation starter.",
    examples: [
      { dutch: "Ik werk in Amsterdam.", english: "I work in Amsterdam." },
      { dutch: "Zij werkt hard.", english: "She works hard." },
      { dutch: "Wij werken samen.", english: "We work together." }
    ],
    conjugation: {
      present: {
        "ik": "werk",
        "jij/je": "werkt",
        "u": "werkt",
        "hij/zij/het": "werkt",
        "wij/we": "werken",
        "jullie": "werken",
        "zij/ze": "werken"
      }
    },
    content: {
      type: "conjugation",
      verb: "werken"
    }
  },

  wonen: {
    id: "wonen",
    title: "Wonen",
    subtitle: "to live (reside)",
    category: "verbs",
    icon: "🏠",
    unlockHint: "Find your home",
    description: "For residence, not life itself (that's 'leven'). 'Waar woon je?' = Where do you live? Housing is a big topic in the Netherlands—this verb comes up constantly. Regular verb, thankfully.",
    examples: [
      { dutch: "Ik woon in Den Haag.", english: "I live in The Hague." },
      { dutch: "Waar woon je?", english: "Where do you live?" },
      { dutch: "Zij wonen samen.", english: "They live together." }
    ],
    conjugation: {
      present: {
        "ik": "woon",
        "jij/je": "woont",
        "u": "woont",
        "hij/zij/het": "woont",
        "wij/we": "wonen",
        "jullie": "wonen",
        "zij/ze": "wonen"
      }
    },
    content: {
      type: "conjugation",
      verb: "wonen"
    }
  },

  // =====================================================
  // GRAMMAR
  // =====================================================
  articles: {
    id: "articles",
    title: "De & Het",
    subtitle: "The Dutch articles",
    category: "grammar",
    icon: "📰",
    unlockHint: "Learn with Sage Aldric in Dawnmere",
    description: "Dutch has two definite articles: 'de' (common) and 'het' (neuter). Good news: there's only ONE indefinite article ('een'). Bad news: knowing when to use 'de' vs 'het' requires memorization. About 75% of nouns use 'de', but you'll still guess wrong constantly. Welcome to Dutch.",
    examples: [
      { dutch: "de hond / het huis", english: "the dog / the house" },
      { dutch: "de vrouw / de man", english: "the woman / the man (both 'de')" },
      { dutch: "het kind / het meisje", english: "the child / the girl (diminutives use 'het')" }
    ],
    tips: [
      "Diminutives (-je, -tje, -pje) always use 'het'",
      "Plurals always use 'de' regardless of singular",
      "Most professions and people use 'de'",
      "When in doubt, guess 'de' (75% chance)"
    ],
    content: {
      type: "articles"
    }
  },

  word_order: {
    id: "word_order",
    title: "Word Order",
    subtitle: "V2 and verb placement",
    category: "grammar",
    icon: "📝",
    unlockHint: "Master sentence structure",
    description: "Dutch uses V2 (verb second) word order in main clauses. The verb MUST be the second element. 'Ik eet appels' (I eat apples) but 'Vandaag eet ik appels' (Today eat I apples). Start with anything other than the subject? The subject and verb swap. It's like musical chairs with grammar.",
    examples: [
      { dutch: "Ik lees een boek.", english: "I read a book. (normal order)" },
      { dutch: "Vandaag lees ik een boek.", english: "Today read I a book. (V2 inversion)" },
      { dutch: "In Nederland spreken wij Nederlands.", english: "In Netherlands speak we Dutch." }
    ],
    tips: [
      "The conjugated verb is ALWAYS in position 2",
      "Subject-verb inversion happens when something else starts the sentence",
      "In subclauses, verbs go to the END",
      "Time before manner before place (similar to German)"
    ],
    content: {
      type: "word_order"
    }
  },

  negation: {
    id: "negation",
    title: "Negation",
    subtitle: "niet and geen",
    category: "grammar",
    icon: "🚫",
    unlockHint: "Learn to say no",
    description: "Dutch has two negation words: 'niet' (not) for verbs/adjectives, and 'geen' (no/not a) for nouns with 'een' or no article. 'Ik eet niet' (I don't eat) vs 'Ik heb geen honger' (I have no hunger). Placement matters—'niet' usually goes near the end but before infinitives and adjectives.",
    examples: [
      { dutch: "Ik spreek niet.", english: "I don't speak. (niet with verb)" },
      { dutch: "Ik heb geen geld.", english: "I have no money. (geen with noun)" },
      { dutch: "Hij is niet groot.", english: "He is not tall. (niet with adjective)" }
    ],
    tips: [
      "'Geen' replaces 'een' or zero article before nouns",
      "'Niet' goes before adjectives, adverbs of manner, prepositional phrases",
      "'Niet' goes after direct objects and time expressions",
      "Double negatives are NOT used in Dutch"
    ],
    content: {
      type: "negation"
    }
  },

  diminutives: {
    id: "diminutives",
    title: "Diminutives",
    subtitle: "-je, -tje, -pje endings",
    category: "grammar",
    icon: "🐣",
    unlockHint: "Make everything smaller and cuter",
    description: "The Dutch LOVE diminutives. Add '-je' to almost any noun to make it smaller, cuter, or more endearing. 'Hond' (dog) → 'hondje' (little dog/doggy). They use them for everything: coffee breaks are 'koffietje', a moment is 'momentje.' It's a national obsession.",
    examples: [
      { dutch: "hond → hondje", english: "dog → little dog/doggy" },
      { dutch: "boek → boekje", english: "book → little book/booklet" },
      { dutch: "kopje koffie", english: "cup of coffee (literally 'little cup')" }
    ],
    tips: [
      "All diminutives become neuter (use 'het')",
      "All diminutive plurals add -s: 'boekjes'",
      "The ending changes based on the final sound: -je, -tje, -etje, -pje, -kje",
      "Even abstract concepts can become diminutives: 'probleempje' (little problem)"
    ],
    content: {
      type: "diminutives"
    }
  },

  adjectives: {
    id: "adjectives",
    title: "Adjectives",
    subtitle: "When to add -e",
    category: "grammar",
    icon: "🎨",
    unlockHint: "Color your descriptions",
    description: "Dutch adjectives add '-e' before nouns... usually. The rule: add '-e' unless it's a 'het' word with 'een' or no article AND singular. 'Een groot huis' (a big house) but 'het grote huis' (the big house). Same adjective, different form. The Dutch like to keep you guessing.",
    examples: [
      { dutch: "de grote hond", english: "the big dog (always -e with 'de' words)" },
      { dutch: "een groot huis", english: "a big house (no -e: het word + een)" },
      { dutch: "het grote huis", english: "the big house (with -e: definite article)" }
    ],
    tips: [
      "De-words: ALWAYS add -e",
      "Het-words with 'het' or plural: add -e",
      "Het-words with 'een' or no article (singular): NO -e",
      "Predicative adjectives (after verb): never add -e"
    ],
    content: {
      type: "adjectives"
    }
  },

  possessives: {
    id: "possessives",
    title: "Possessive Pronouns",
    subtitle: "mijn, jouw, zijn, haar...",
    category: "grammar",
    icon: "👐",
    unlockHint: "Learn ownership",
    description: "Dutch possessives are straightforward: mijn (my), jouw (your informal), uw (your formal), zijn (his), haar (her), ons/onze (our), jullie (your plural), hun (their). Unlike French, they match the OWNER, not the owned item. 'Mijn huis, mijn auto, mijn alles' - same possessive, simple.",
    examples: [
      { dutch: "mijn hond", english: "my dog" },
      { dutch: "jouw boek", english: "your book (informal)" },
      { dutch: "ons huis / onze auto", english: "our house / our car (ons for het-words)" }
    ],
    tips: [
      "'Ons' for het-words, 'onze' for de-words and plurals",
      "Informal 'je' can replace 'jouw' in casual speech",
      "Formal 'uw' is used for both singular and plural you",
      "Stressed forms exist: 'dat is van MIJ' (that is mine)"
    ],
    content: {
      type: "possessives"
    }
  },

  questions: {
    id: "questions",
    title: "Asking Questions",
    subtitle: "Inversion and question words",
    category: "grammar",
    icon: "❓",
    unlockHint: "Learn to inquire",
    description: "Dutch questions invert subject and verb: 'Jij spreekt' → 'Spreek jij?' (You speak → Do you speak?). No 'do' auxiliary needed! Question words: wie (who), wat (what), waar (where), wanneer (when), waarom (why), hoe (how). Put them first, then invert.",
    examples: [
      { dutch: "Spreek je Nederlands?", english: "Do you speak Dutch? (yes/no question)" },
      { dutch: "Waar woon je?", english: "Where do you live? (with question word)" },
      { dutch: "Hoe gaat het?", english: "How are you? (How goes it?)" }
    ],
    tips: [
      "Yes/no questions: invert subject and verb",
      "Question words go first, then verb, then subject",
      "'Of' introduces alternative questions: 'Koffie of thee?'",
      "Rising intonation alone can make a statement a question"
    ],
    content: {
      type: "questions"
    }
  },

  separable_verbs: {
    id: "separable_verbs",
    title: "Separable Verbs",
    subtitle: "Verbs that split apart",
    category: "grammar",
    icon: "✂️",
    unlockHint: "Learn verbs that break apart",
    description: "Some Dutch verbs split in two! 'Opstaan' (to get up) becomes 'Ik sta op' (I get up). The prefix flies to the end of the clause. 'Meekomen' → 'Kom je mee?' It's like the verb gets too long and needs to spread out. Watch for these—they're everywhere.",
    examples: [
      { dutch: "opstaan → Ik sta op.", english: "to get up → I get up." },
      { dutch: "meekomen → Kom je mee?", english: "to come along → Are you coming along?" },
      { dutch: "opbellen → Ik bel je op.", english: "to call up → I'll call you." }
    ],
    tips: [
      "In main clauses, prefix goes to the end",
      "In subclauses, verb stays together at the end",
      "Infinitive with 'te': prefix + te + stem: 'op te staan'",
      "Past participle: prefix + ge + stem: 'opgestaan'"
    ],
    content: {
      type: "separable_verbs"
    }
  },

  er: {
    id: "er",
    title: "The Word 'Er'",
    subtitle: "The Swiss Army knife of Dutch",
    category: "grammar",
    icon: "🔧",
    unlockHint: "Master the mysterious 'er'",
    description: "Dutch has a word—'er'—that does about seven different things. It can mean 'there', replace locations, work with numbers, create dummy subjects... Native speakers use it instinctively. You'll need practice. A lot of practice. 'Er zijn veel regels' - there are many rules. Indeed.",
    examples: [
      { dutch: "Er is een probleem.", english: "There is a problem. (existential)" },
      { dutch: "Ik woon er.", english: "I live there. (locative)" },
      { dutch: "Er zijn er drie.", english: "There are three (of them). (quantitative)" }
    ],
    tips: [
      "Existential 'er': introduces existence (like 'there is')",
      "Locative 'er': replaces a location (I live there)",
      "Prepositional 'er': combines with prepositions (erover = about it)",
      "Quantitative 'er': with numbers (er zijn er drie = there are three)"
    ],
    content: {
      type: "er"
    }
  },

  // =====================================================
  // VOCABULARY PAGES
  // =====================================================
  greetings: {
    id: "greetings",
    title: "Begroetingen",
    subtitle: "Greetings",
    category: "vocabulary",
    icon: "👋",
    unlockHint: "Complete the greetings lesson",
    description: "The Dutch are direct but friendly. 'Hallo' works everywhere. 'Goedemorgen/middag/avond' for time-specific greetings. 'Dag' is uniquely Dutch—it means both hello AND goodbye. Efficient! 'Hoe gaat het?' (How goes it?) is the standard 'how are you.'",
    examples: [
      { dutch: "Hallo! Hoe gaat het?", english: "Hello! How are you?" },
      { dutch: "Goedemorgen!", english: "Good morning!" },
      { dutch: "Dag! Tot ziens!", english: "Bye! See you!" }
    ],
    content: {
      type: "vocabulary",
      category: "greetings"
    }
  },

  numbers: {
    id: "numbers",
    title: "Nummers",
    subtitle: "Numbers",
    category: "vocabulary",
    icon: "🔢",
    unlockHint: "Complete the numbers lesson",
    description: "Dutch numbers are similar to English up to 12, then get interesting. 21-99 are said backwards: 'vijfentwintig' = five-and-twenty. Very medieval. 'Eenentwintig' (21), 'tweeëndertig' (32)... You'll adapt. Or use your fingers.",
    examples: [
      { dutch: "een, twee, drie, vier, vijf", english: "one, two, three, four, five" },
      { dutch: "vijfentwintig", english: "twenty-five (five-and-twenty)" },
      { dutch: "honderd, duizend", english: "hundred, thousand" }
    ],
    content: {
      type: "vocabulary",
      category: "numbers"
    }
  },

  colors: {
    id: "colors",
    title: "Kleuren",
    subtitle: "Colors",
    category: "vocabulary",
    icon: "🎨",
    unlockHint: "Complete the colors lesson",
    description: "Orange is the national color—'oranje' commemorates the House of Orange-Nassau. The Dutch wear orange for King's Day, sports events, and basically any excuse. Other colors are straightforward: rood (red), blauw (blue), groen (green), geel (yellow).",
    examples: [
      { dutch: "oranje", english: "orange (the national color!)" },
      { dutch: "rood, blauw, groen, geel", english: "red, blue, green, yellow" },
      { dutch: "wit en zwart", english: "white and black" }
    ],
    content: {
      type: "vocabulary",
      category: "colors"
    }
  },

  family: {
    id: "family",
    title: "Familie",
    subtitle: "Family",
    category: "vocabulary",
    icon: "👨‍👩‍👧‍👦",
    unlockHint: "Complete the family lesson",
    description: "Dutch family terms are similar to English and German. 'Moeder' (mother), 'vader' (father), 'broer' (brother), 'zus' (sister). The Dutch often use diminutives: 'moedertje', 'zusje'. For 'sibling' there's no exact word—you say 'broer of zus.'",
    examples: [
      { dutch: "moeder, vader, ouders", english: "mother, father, parents" },
      { dutch: "broer, zus, kinderen", english: "brother, sister, children" },
      { dutch: "oma, opa", english: "grandma, grandpa" }
    ],
    content: {
      type: "vocabulary",
      category: "family"
    }
  },

  food: {
    id: "food",
    title: "Eten en Drinken",
    subtitle: "Food and Drink",
    category: "vocabulary",
    icon: "🍽️",
    unlockHint: "Complete the food lesson",
    description: "The Dutch are famous for cheese ('kaas'), herring ('haring'), and stroopwafels. Coffee culture is huge—'koffie' breaks are sacred. 'Lekker!' means delicious and is used constantly. 'Eet smakelijk!' = Enjoy your meal. The Dutch are practical eaters.",
    examples: [
      { dutch: "kaas, brood, haring", english: "cheese, bread, herring" },
      { dutch: "koffie, thee, bier", english: "coffee, tea, beer" },
      { dutch: "Lekker! Eet smakelijk!", english: "Delicious! Enjoy your meal!" }
    ],
    content: {
      type: "vocabulary",
      category: "food"
    }
  },

  culture: {
    id: "culture",
    title: "Nederlandse Cultuur",
    subtitle: "Dutch Culture",
    category: "vocabulary",
    icon: "🌷",
    unlockHint: "Complete the culture lesson",
    description: "The Netherlands: land of tulips, windmills, canals, and bicycles. 'Gezellig' is THE untranslatable Dutch word—cozy, convivial, warm atmosphere. The Dutch cycle everywhere ('fietsen'). King's Day ('Koningsdag') turns everything orange. Water management is an art: polders, dijken, grachten.",
    examples: [
      { dutch: "fiets, molen, gracht", english: "bicycle, windmill, canal" },
      { dutch: "gezellig", english: "cozy/convivial (untranslatable!)" },
      { dutch: "tulp, klompen, Koningsdag", english: "tulip, clogs, King's Day" }
    ],
    content: {
      type: "vocabulary",
      category: "culture"
    }
  }
};

// Export for module system (Node.js compatibility)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DUTCH_SPELLBOOK };
}

// Also make available globally for browser
if (typeof window !== 'undefined') {
  window.DUTCH_SPELLBOOK = DUTCH_SPELLBOOK;
}
