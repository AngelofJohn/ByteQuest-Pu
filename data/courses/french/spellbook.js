// ByteQuest - French Spellbook Data
// Language-specific grammar reference for French

// =====================================================
// French Spellbook Pages
// =====================================================

const FRENCH_SPELLBOOK = {
  // Verbs
  etre: {
    id: "etre",
    title: "Être",
    subtitle: "to be",
    category: "verbs",
    icon: "✨",
    unlockHint: "Learn from Sage Aldric in Dawnmere",
    description: "The almighty Être—without it, you literally cannot exist in French. Every adventurer must master this spell before they can even claim to BE anything. It's the verbal equivalent of oxygen: completely essential, yet somehow people still mess it up.",
    examples: [
      { french: "Je suis français.", english: "I am French." },
      { french: "Elle est intelligente.", english: "She is intelligent." },
      { french: "Nous sommes à Paris.", english: "We are in Paris." }
    ],
    content: {
      type: "conjugation",
      verb: "etre"
    }
  },
  avoir: {
    id: "avoir",
    title: "Avoir",
    subtitle: "to have",
    category: "verbs",
    icon: "🤲",
    unlockHint: "Continue your studies with Sage Aldric",
    description: "Ah yes, the verb of acquisition. In French, you don't 'be' hungry—you HAVE hunger, like a dragon hoarding emotions. You don't 'be' 20 years old—you HAVE 20 years, like some kind of age collector. The French are possessive people. Deal with it.",
    examples: [
      { french: "J'ai un chien.", english: "I have a dog." },
      { french: "Tu as quel âge?", english: "How old are you? (lit: You have what age?)" },
      { french: "Ils ont faim.", english: "They are hungry. (lit: They have hunger)" }
    ],
    content: {
      type: "conjugation",
      verb: "avoir"
    }
  },
  aller: {
    id: "aller",
    title: "Aller",
    subtitle: "to go",
    category: "verbs",
    icon: "🚶",
    unlockHint: "Advance your training with Sage Aldric",
    description: "The adventurer's best friend! This verb literally gets you places. Also doubles as a time machine—stick any verb after it and BAM, instant future tense. 'Je vais mourir' means both 'I'm going to die' and 'this dungeon is too hard.'",
    examples: [
      { french: "Je vais au marché.", english: "I'm going to the market." },
      { french: "Comment allez-vous?", english: "How are you? (formal)" },
      { french: "Elle va manger.", english: "She is going to eat." }
    ],
    content: {
      type: "conjugation",
      verb: "aller"
    }
  },
  faire: {
    id: "faire",
    title: "Faire",
    subtitle: "to do/make",
    category: "verbs",
    icon: "🔨",
    unlockHint: "Master more verbs with Sage Aldric",
    description: "The Swiss Army knife of French verbs. Make dinner? Faire. Do homework? Faire. Describe the weather? Believe it or not, faire. The French decided one verb should do everything, presumably so they'd have more time for cheese.",
    examples: [
      { french: "Je fais mes devoirs.", english: "I'm doing my homework." },
      { french: "Il fait beau.", english: "The weather is nice. (lit: It makes beautiful)" },
      { french: "Nous faisons du sport.", english: "We play sports." }
    ],
    content: {
      type: "conjugation",
      verb: "faire"
    }
  },
  regular_er_pattern: {
    id: "regular_er_pattern",
    title: "Regular -ER Verbs",
    subtitle: "The most common verb pattern",
    category: "verbs",
    icon: "📝",
    unlockHint: "Complete the -ER verb lesson",
    description: "Congratulations, you've found the cheat code. 80% of French verbs follow this exact pattern. Learn these endings and you can conjugate thousands of verbs. It's like finding a legendary weapon in the tutorial zone.",
    examples: [
      { french: "parler → je parle", english: "to speak → I speak" },
      { french: "manger → nous mangeons", english: "to eat → we eat" },
      { french: "habiter → ils habitent", english: "to live → they live" }
    ],
    content: {
      type: "pattern",
      pattern: "er_verbs"
    }
  },
  regular_ir_pattern: {
    id: "regular_ir_pattern",
    title: "Regular -IR Verbs",
    subtitle: "The second verb group",
    category: "verbs",
    icon: "📗",
    unlockHint: "Advance your studies in Haari Fields",
    description: "The sequel nobody asked for but everyone needs. These verbs sneak an '-iss-' into plural forms because apparently regular endings weren't dramatic enough. Think of it as the verb casting a buff spell on itself: 'finir' becomes 'finissons.' Very theatrical.",
    examples: [
      { french: "finir → je finis", english: "to finish → I finish" },
      { french: "choisir → nous choisissons", english: "to choose → we choose" },
      { french: "réussir → ils réussissent", english: "to succeed → they succeed" }
    ],
    content: {
      type: "pattern",
      pattern: "ir_verbs"
    }
  },
  regular_re_pattern: {
    id: "regular_re_pattern",
    title: "Regular -RE Verbs",
    subtitle: "The third verb group",
    category: "verbs",
    icon: "📘",
    unlockHint: "Continue learning in Lurenium",
    description: "The minimalist cousin of verb families. These verbs are so laid back that in third person singular, they don't even bother with an ending. 'Il attend'—just hanging there, incomplete, like a sentence waiting for—",
    examples: [
      { french: "vendre → je vends", english: "to sell → I sell" },
      { french: "attendre → il attend", english: "to wait → he waits (no ending!)" },
      { french: "répondre → nous répondons", english: "to answer → we answer" }
    ],
    content: {
      type: "pattern",
      pattern: "re_verbs"
    }
  },
  // Additional Common Verbs
  mettre: {
    id: "mettre",
    title: "Mettre",
    subtitle: "to put/place",
    category: "verbs",
    icon: "📦",
    unlockHint: "Learn to put things in their place",
    description: "The verb of placement. Put your hat on? Mettre. Set the table? Mettre. Takes forever to do something? 'Mettre du temps.' This verb gets around more than a traveling merchant.",
    examples: [
      { french: "Je mets mon chapeau.", english: "I put on my hat." },
      { french: "Elle met la table.", english: "She sets the table." },
      { french: "Nous mettons du temps.", english: "We take a long time." }
    ],
    content: { type: "conjugation", verb: "mettre" }
  },
  partir: {
    id: "partir",
    title: "Partir",
    subtitle: "to leave/depart",
    category: "verbs",
    icon: "🚪",
    unlockHint: "Learn to make your exit",
    description: "When you need to leave dramatically. Uses être in passé composé because the French consider leaving a transformative life experience. 'Je suis parti' - I have become one who has left.",
    examples: [
      { french: "Je pars demain.", english: "I'm leaving tomorrow." },
      { french: "Elle est partie hier.", english: "She left yesterday." },
      { french: "Nous partons en vacances.", english: "We're leaving on vacation." }
    ],
    content: { type: "conjugation", verb: "partir" }
  },
  sortir: {
    id: "sortir",
    title: "Sortir",
    subtitle: "to go out/exit",
    category: "verbs",
    icon: "🌙",
    unlockHint: "Learn to go out on the town",
    description: "For going out, taking things out, or dating. Uses être when intransitive (going out), avoir when transitive (taking something out). 'Je sors' could mean you're leaving OR you're on a date. Context is everything.",
    examples: [
      { french: "Je sors ce soir.", english: "I'm going out tonight." },
      { french: "Il sort les poubelles.", english: "He takes out the trash." },
      { french: "Nous sortons ensemble.", english: "We're dating." }
    ],
    content: { type: "conjugation", verb: "sortir" }
  },
  dormir: {
    id: "dormir",
    title: "Dormir",
    subtitle: "to sleep",
    category: "verbs",
    icon: "😴",
    unlockHint: "Learn the art of rest",
    description: "Essential for any adventurer. Irregular -ir that drops letters in singular forms like it's too tired to pronounce them all. 'Je dors' - even the verb is half asleep.",
    examples: [
      { french: "Je dors huit heures.", english: "I sleep eight hours." },
      { french: "Tu dors bien?", english: "Do you sleep well?" },
      { french: "Les enfants dorment.", english: "The children are sleeping." }
    ],
    content: { type: "conjugation", verb: "dormir" }
  },
  lire: {
    id: "lire",
    title: "Lire",
    subtitle: "to read",
    category: "verbs",
    icon: "📖",
    unlockHint: "Discover the joy of reading",
    description: "For all your scholarly pursuits. Irregular but memorable. Every spellbook entry you read? You're using lire. Very meta.",
    examples: [
      { french: "Je lis un livre.", english: "I'm reading a book." },
      { french: "Elle lit le journal.", english: "She reads the newspaper." },
      { french: "Nous lisons ensemble.", english: "We read together." }
    ],
    content: { type: "conjugation", verb: "lire" }
  },
  ecrire: {
    id: "ecrire",
    title: "Écrire",
    subtitle: "to write",
    category: "verbs",
    icon: "✍️",
    unlockHint: "Put pen to parchment",
    description: "The companion to lire. Note the sneaky 'v' that appears in plural forms—'nous écrivons.' Because apparently writing requires more letters when done collectively.",
    examples: [
      { french: "J'écris une lettre.", english: "I'm writing a letter." },
      { french: "Il écrit bien.", english: "He writes well." },
      { french: "Elles écrivent des poèmes.", english: "They write poems." }
    ],
    content: { type: "conjugation", verb: "ecrire" }
  },
  boire: {
    id: "boire",
    title: "Boire",
    subtitle: "to drink",
    category: "verbs",
    icon: "🍷",
    unlockHint: "Learn to quench your thirst",
    description: "Possibly the most irregular verb after être. The stem completely transforms: boi- becomes buv- in plural forms. It's like the verb itself had a few drinks.",
    examples: [
      { french: "Je bois du café.", english: "I drink coffee." },
      { french: "Nous buvons du vin.", english: "We drink wine." },
      { french: "Ils boivent de l'eau.", english: "They drink water." }
    ],
    content: { type: "conjugation", verb: "boire" }
  },
  acheter: {
    id: "acheter",
    title: "Acheter",
    subtitle: "to buy",
    category: "verbs",
    icon: "🛒",
    unlockHint: "Master the art of commerce",
    description: "A stem-changing verb—the 'e' becomes 'è' when stressed. J'achète, but nous achetons. The French economy runs on this verb and proper accent placement.",
    examples: [
      { french: "J'achète du pain.", english: "I buy bread." },
      { french: "Elle achète une robe.", english: "She buys a dress." },
      { french: "Nous achetons des fruits.", english: "We buy fruits." }
    ],
    content: { type: "conjugation", verb: "acheter" }
  },
  donner: {
    id: "donner",
    title: "Donner",
    subtitle: "to give",
    category: "verbs",
    icon: "🎁",
    unlockHint: "Learn the joy of giving",
    description: "Blissfully regular -er verb. Give gifts, give advice, give up—donner does it all. 'Donner sur' means to overlook (a window giving onto the garden).",
    examples: [
      { french: "Je donne un cadeau.", english: "I give a gift." },
      { french: "Elle me donne des conseils.", english: "She gives me advice." },
      { french: "La fenêtre donne sur le jardin.", english: "The window overlooks the garden." }
    ],
    content: { type: "conjugation", verb: "donner" }
  },
  recevoir: {
    id: "recevoir",
    title: "Recevoir",
    subtitle: "to receive",
    category: "verbs",
    icon: "📬",
    unlockHint: "Learn to receive graciously",
    description: "The counterpart to donner. Irregular -oir verb with a cedilla (ç) appearing before 'o' to keep the soft 's' sound. Je reçois, nous recevons. The French love their special characters.",
    examples: [
      { french: "Je reçois une lettre.", english: "I receive a letter." },
      { french: "Il reçoit des invités.", english: "He receives guests." },
      { french: "Nous recevons de bonnes nouvelles.", english: "We receive good news." }
    ],
    content: { type: "conjugation", verb: "recevoir" }
  },
  ouvrir: {
    id: "ouvrir",
    title: "Ouvrir",
    subtitle: "to open",
    category: "verbs",
    icon: "🚪",
    unlockHint: "Open doors to new knowledge",
    description: "The rebel -ir verb that conjugates like an -er verb. J'ouvre, tu ouvres—no -iss- anywhere. It just does its own thing. Also covers 'couvrir' (cover) and 'offrir' (offer).",
    examples: [
      { french: "J'ouvre la porte.", english: "I open the door." },
      { french: "Le magasin ouvre à 9h.", english: "The store opens at 9." },
      { french: "Nous ouvrons les fenêtres.", english: "We open the windows." }
    ],
    content: { type: "conjugation", verb: "ouvrir" }
  },
  fermer: {
    id: "fermer",
    title: "Fermer",
    subtitle: "to close",
    category: "verbs",
    icon: "🔒",
    unlockHint: "Learn to close things properly",
    description: "The opposite of ouvrir, and thankfully regular. Close doors, close shops, close your eyes—fermer handles it all with predictable -er endings.",
    examples: [
      { french: "Je ferme la fenêtre.", english: "I close the window." },
      { french: "Le magasin ferme à 18h.", english: "The store closes at 6pm." },
      { french: "Fermez les yeux!", english: "Close your eyes!" }
    ],
    content: { type: "conjugation", verb: "fermer" }
  },
  croire: {
    id: "croire",
    title: "Croire",
    subtitle: "to believe",
    category: "verbs",
    icon: "🙏",
    unlockHint: "Believe in the power of verbs",
    description: "For matters of faith and trust. 'Croire à' = believe in (something). 'Croire en' = believe in (someone/abstract). The stem changes: croi- / croy-. Very philosophical.",
    examples: [
      { french: "Je crois en toi.", english: "I believe in you." },
      { french: "Tu crois cette histoire?", english: "Do you believe this story?" },
      { french: "Nous croyons au progrès.", english: "We believe in progress." }
    ],
    content: { type: "conjugation", verb: "croire" }
  },
  penser: {
    id: "penser",
    title: "Penser",
    subtitle: "to think",
    category: "verbs",
    icon: "💭",
    unlockHint: "Learn to express your thoughts",
    description: "Regular -er verb for all your thinking needs. 'Penser à' = think about (have in mind). 'Penser de' = think of (have an opinion). 'Je pense, donc je suis' - you know the rest.",
    examples: [
      { french: "Je pense à toi.", english: "I'm thinking about you." },
      { french: "Que pensez-vous de ce livre?", english: "What do you think of this book?" },
      { french: "Elle pense que c'est vrai.", english: "She thinks it's true." }
    ],
    content: { type: "conjugation", verb: "penser" }
  },
  dire: {
    id: "dire",
    title: "Dire",
    subtitle: "to say/tell",
    category: "verbs",
    icon: "💬",
    unlockHint: "Learn to speak your mind",
    description: "Essential for communication. Irregular with a twist: 'vous dites' NOT 'vous disez.' The French decided one form needed to be weird. Also used in 'vouloir dire' (to mean).",
    examples: [
      { french: "Je dis la vérité.", english: "I tell the truth." },
      { french: "Qu'est-ce que tu dis?", english: "What are you saying?" },
      { french: "Vous dites que non.", english: "You say no." }
    ],
    content: { type: "conjugation", verb: "dire" }
  },
  venir: {
    id: "venir",
    title: "Venir",
    subtitle: "to come",
    category: "verbs",
    icon: "🏃",
    unlockHint: "Learn to come and go",
    description: "The opposite of aller. Uses être in passé composé. 'Venir de + infinitive' = just did something (passé récent). 'Je viens de manger' = I just ate. Very useful for excuses.",
    examples: [
      { french: "Je viens de Paris.", english: "I come from Paris." },
      { french: "Elle vient de partir.", english: "She just left." },
      { french: "Nous venons vous voir.", english: "We're coming to see you." }
    ],
    content: { type: "conjugation", verb: "venir" }
  },
  prendre: {
    id: "prendre",
    title: "Prendre",
    subtitle: "to take",
    category: "verbs",
    icon: "✋",
    unlockHint: "Learn to take what you need",
    description: "Take food, take a shower, take a decision—prendre is everywhere. Stem changes: prend- / pren-. Apprendre (learn) and comprendre (understand) follow the same pattern.",
    examples: [
      { french: "Je prends le train.", english: "I take the train." },
      { french: "Tu prends un café?", english: "Will you have a coffee?" },
      { french: "Ils prennent des photos.", english: "They take photos." }
    ],
    content: { type: "conjugation", verb: "prendre" }
  },
  voir: {
    id: "voir",
    title: "Voir",
    subtitle: "to see",
    category: "verbs",
    icon: "👁️",
    unlockHint: "Open your eyes to new sights",
    description: "See things, see people, see the truth. Stem changes: voi- / voy-. 'Voyons!' = Let's see! (also used when exasperated). Don't confuse with regarder (to watch/look at).",
    examples: [
      { french: "Je vois la mer.", english: "I see the sea." },
      { french: "Tu vois ce que je veux dire?", english: "Do you see what I mean?" },
      { french: "Nous voyons nos amis.", english: "We see our friends." }
    ],
    content: { type: "conjugation", verb: "voir" }
  },
  pouvoir: {
    id: "pouvoir",
    title: "Pouvoir",
    subtitle: "can/to be able",
    category: "verbs",
    icon: "💪",
    unlockHint: "Unlock your potential",
    description: "The modal verb of ability and permission. Highly irregular with three stems. 'Je peux' or 'puis-je?' in questions. Very powerful verb—it can do anything.",
    examples: [
      { french: "Je peux t'aider.", english: "I can help you." },
      { french: "Puis-je entrer?", english: "May I enter?" },
      { french: "Nous pouvons essayer.", english: "We can try." }
    ],
    content: { type: "conjugation", verb: "pouvoir" }
  },
  vouloir: {
    id: "vouloir",
    title: "Vouloir",
    subtitle: "to want",
    category: "verbs",
    icon: "🌟",
    unlockHint: "Learn to express your desires",
    description: "The verb of desire. 'Je voudrais' (I would like) is more polite than 'je veux' (I want). 'Vouloir dire' = to mean. Essential for getting what you want, politely or otherwise.",
    examples: [
      { french: "Je veux partir.", english: "I want to leave." },
      { french: "Je voudrais un café.", english: "I would like a coffee." },
      { french: "Que veut dire ce mot?", english: "What does this word mean?" }
    ],
    content: { type: "conjugation", verb: "vouloir" }
  },
  devoir: {
    id: "devoir",
    title: "Devoir",
    subtitle: "must/to have to",
    category: "verbs",
    icon: "⚠️",
    unlockHint: "Learn about obligations",
    description: "The verb of obligation and probability. 'Je dois' = I must. 'Je devais' = I was supposed to. 'Il doit être tard' = It must be late. Also a noun: 'les devoirs' = homework.",
    examples: [
      { french: "Je dois partir.", english: "I must leave." },
      { french: "Tu dois étudier.", english: "You have to study." },
      { french: "Il doit être malade.", english: "He must be sick." }
    ],
    content: { type: "conjugation", verb: "devoir" }
  },
  savoir: {
    id: "savoir",
    title: "Savoir",
    subtitle: "to know (facts/how)",
    category: "verbs",
    icon: "🧠",
    unlockHint: "Know the difference between knowing",
    description: "Know facts, know how to do things. NOT for people/places (use connaître). 'Je sais nager' = I know how to swim. 'Je ne sais pas' = I don't know (the French shrug phrase).",
    examples: [
      { french: "Je sais la réponse.", english: "I know the answer." },
      { french: "Tu sais nager?", english: "Can you swim?" },
      { french: "Nous savons la vérité.", english: "We know the truth." }
    ],
    content: { type: "conjugation", verb: "savoir" }
  },
  connaitre: {
    id: "connaitre",
    title: "Connaître",
    subtitle: "to know (people/places)",
    category: "verbs",
    icon: "🤝",
    unlockHint: "Get to know people and places",
    description: "Know people, know places, be familiar with things. NOT for facts (use savoir). 'Je connais Paris' = I know Paris (been there). The circumflex on 'î' is disappearing in modern French.",
    examples: [
      { french: "Je connais Marie.", english: "I know Marie." },
      { french: "Tu connais ce restaurant?", english: "Do you know this restaurant?" },
      { french: "Nous connaissons la ville.", english: "We know the city." }
    ],
    content: { type: "conjugation", verb: "connaitre" }
  },
  attendre: {
    id: "attendre",
    title: "Attendre",
    subtitle: "to wait (for)",
    category: "verbs",
    icon: "⏳",
    unlockHint: "Patience is a virtue",
    description: "Regular -re verb. Note: NO preposition needed! 'J'attends le bus' NOT 'J'attends pour le bus.' English uses 'wait for,' French just waits. More efficient.",
    examples: [
      { french: "J'attends le bus.", english: "I'm waiting for the bus." },
      { french: "Elle attend son ami.", english: "She's waiting for her friend." },
      { french: "Attendez un moment!", english: "Wait a moment!" }
    ],
    content: { type: "conjugation", verb: "attendre" }
  },

  // Grammar
  articles: {
    id: "articles",
    title: "Articles",
    subtitle: "le, la, les, un, une, des",
    category: "grammar",
    icon: "📰",
    unlockHint: "Learn about gender with Sage Aldric",
    description: "In French, you can't just say 'book'—you must declare allegiance. Is it THE book? A book? Which gender is the book? The French won't let you speak until you've properly introduced every noun like they're entering a royal ball.",
    examples: [
      { french: "le livre / la table", english: "the book / the table" },
      { french: "un ami / une amie", english: "a friend (m) / a friend (f)" },
      { french: "l'école", english: "the school (before vowel)" }
    ],
    content: {
      type: "articles"
    }
  },
  gender: {
    id: "gender",
    title: "Noun Gender",
    subtitle: "Masculine vs Feminine",
    category: "grammar",
    icon: "⚖️",
    unlockHint: "Learn about gender with Sage Aldric",
    description: "Welcome to the most arbitrary system in any language. A table is feminine. A desk is masculine. Logic? Never heard of it. Some patterns exist, but mostly you just memorize and pray. The French didn't choose this chaos—they were born into it.",
    examples: [
      { french: "le soleil (m) / la lune (f)", english: "the sun / the moon" },
      { french: "le problème (m)", english: "the problem (masculine despite -e ending!)" },
      { french: "la liberté (f)", english: "freedom (-té endings are feminine)" }
    ],
    content: {
      type: "gender"
    }
  },
  negation: {
    id: "negation",
    title: "Negation",
    subtitle: "ne...pas and beyond",
    category: "grammar",
    icon: "🚫",
    unlockHint: "Learn to say 'no' in Haari Fields",
    description: "The art of saying 'non' wasn't enough—French demands you sandwich your verb in negativity. 'Ne' before, 'pas' after, verb trapped in the middle like a hero surrounded by enemies. Spoken French often drops the 'ne' because even the French got tired of it.",
    examples: [
      { french: "Je ne parle pas.", english: "I don't speak." },
      { french: "Il n'a jamais vu Paris.", english: "He has never seen Paris." },
      { french: "Elle ne mange rien.", english: "She eats nothing." }
    ],
    content: {
      type: "negation"
    }
  },
  adjectives: {
    id: "adjectives",
    title: "Adjectives",
    subtitle: "Agreement and placement",
    category: "grammar",
    icon: "🎨",
    unlockHint: "Discover descriptions in Lurenium",
    description: "Plot twist: adjectives go AFTER the noun. A 'red apple' becomes 'apple red.' But wait—some special adjectives (remember BANGS: Beauty, Age, Number, Goodness, Size) go before. Also they must match gender and number because French adjectives have commitment issues with just one form.",
    examples: [
      { french: "une maison blanche", english: "a white house (adj after noun)" },
      { french: "un petit garçon", english: "a small boy (BANGS: before noun)" },
      { french: "des fleurs rouges", english: "red flowers (plural agreement)" }
    ],
    content: {
      type: "adjectives"
    }
  },
  possessives: {
    id: "possessives",
    title: "Possessive Adjectives",
    subtitle: "mon, ma, mes, ton, ta...",
    category: "grammar",
    icon: "👐",
    unlockHint: "Learn ownership in Haari Fields",
    description: "Here's where French gets weird(er): possessives agree with what you own, not who you are. A man's house is 'sa maison' (feminine). A woman's book is 'son livre' (masculine). It's not about you—it's about your stuff. How very French.",
    examples: [
      { french: "mon livre / ma maison / mes amis", english: "my book / my house / my friends" },
      { french: "ton père / ta mère / tes parents", english: "your father / your mother / your parents" },
      { french: "mon amie (f)", english: "my friend (f) - mon before vowel!" }
    ],
    content: {
      type: "possessives"
    }
  },
  questions: {
    id: "questions",
    title: "Asking Questions",
    subtitle: "Intonation, est-ce que, inversion",
    category: "grammar",
    icon: "❓",
    unlockHint: "Learn to inquire in Lurenium",
    description: "Why have one way to ask questions when you can have three? Raise your voice (peasant style), add 'est-ce que' (respectable), or flip subject and verb (aristocratic). All valid, all confusing, all French. Choose your difficulty level.",
    examples: [
      { french: "Tu parles français?", english: "You speak French? (intonation)" },
      { french: "Est-ce que tu parles français?", english: "Do you speak French? (est-ce que)" },
      { french: "Parles-tu français?", english: "Do you speak French? (inversion)" }
    ],
    content: {
      type: "questions"
    }
  },
  prepositions: {
    id: "prepositions",
    title: "Prepositions",
    subtitle: "à, de, en, dans, sur...",
    category: "grammar",
    icon: "📍",
    unlockHint: "Navigate the world in Haari Fields",
    description: "Tiny words, massive confusion. 'À' means to, at, or in. 'De' means of, from, or about. Context is everything. Think of prepositions as the mini-bosses of French—individually easy, but they ambush you when you least expect it.",
    examples: [
      { french: "Je vais à Paris.", english: "I'm going to Paris." },
      { french: "Le livre est sur la table.", english: "The book is on the table." },
      { french: "Elle vient de France.", english: "She comes from France." }
    ],
    content: {
      type: "prepositions"
    }
  },
  contractions: {
    id: "contractions",
    title: "Contractions",
    subtitle: "au, aux, du, des",
    category: "grammar",
    icon: "🔗",
    unlockHint: "Master combining words in Dawnmere",
    description: "Some word combinations are forbidden. 'À le'? Illegal. 'De les'? Arrest this person. French forces certain words to merge like reluctant allies: au, aux, du, des. No exceptions. The grammar police are always watching.",
    examples: [
      { french: "Je vais au marché.", english: "I'm going to the market. (à + le)" },
      { french: "Je parle aux enfants.", english: "I'm speaking to the children. (à + les)" },
      { french: "C'est le livre du professeur.", english: "It's the teacher's book. (de + le)" }
    ],
    content: {
      type: "contractions"
    }
  },
  adverbs: {
    id: "adverbs",
    title: "Adverbs",
    subtitle: "How, when, where, how much",
    category: "grammar",
    icon: "⚡",
    unlockHint: "Describe actions in Lurenium",
    description: "Want to describe HOW you're failing at something? Adverbs! Take an adjective, make it feminine, slap '-ment' on the end, and voilà—you're failing lentement (slowly), rapidement (quickly), or complètement (completely). Very flexible, very French.",
    examples: [
      { french: "Elle parle lentement.", english: "She speaks slowly. (lent → lente → lentement)" },
      { french: "Je mange souvent ici.", english: "I often eat here." },
      { french: "Il est très intelligent.", english: "He is very intelligent." }
    ],
    content: {
      type: "adverbs"
    }
  },
  comparatives: {
    id: "comparatives",
    title: "Comparisons",
    subtitle: "plus, moins, aussi...que",
    category: "grammar",
    icon: "⚖️",
    unlockHint: "Compare things in the markets",
    description: "Finally, the ability to judge things! 'Plus grand que' (taller than), 'moins cher que' (cheaper than), 'aussi stupide que' (as stupid as). Warning: never say 'plus bon'—it's 'meilleur.' French has irregular forms because of course it does.",
    examples: [
      { french: "Elle est plus grande que moi.", english: "She is taller than me." },
      { french: "C'est le meilleur restaurant.", english: "It's the best restaurant. (not 'plus bon')" },
      { french: "Il parle aussi bien que toi.", english: "He speaks as well as you." }
    ],
    content: {
      type: "comparatives"
    }
  },
  object_pronouns: {
    id: "object_pronouns",
    title: "Object Pronouns",
    subtitle: "le, la, lui, leur, me, te...",
    category: "grammar",
    icon: "👆",
    unlockHint: "Replace nouns efficiently in advanced studies",
    description: "Tired of repeating 'the sword' seventeen times? Replace it with 'le' and sound like a native. Direct objects, indirect objects, reflexive pronouns—they ALL go BEFORE the verb. English puts them after. French says no. Get used to it, adventurer.",
    examples: [
      { french: "Je le vois.", english: "I see him/it. (direct object)" },
      { french: "Je lui parle.", english: "I speak to him/her. (indirect object)" },
      { french: "Elle me donne le livre.", english: "She gives me the book." }
    ],
    content: {
      type: "object_pronouns"
    }
  },
  reflexive_verbs: {
    id: "reflexive_verbs",
    title: "Reflexive Verbs",
    subtitle: "se lever, s'habiller, se coucher",
    category: "grammar",
    icon: "🪞",
    unlockHint: "Learn daily routines in Dawnmere",
    description: "Actions you do TO YOURSELF get a special pronoun buddy. 'Je lave' means 'I wash (something).' 'Je me lave' means 'I wash myself.' The reflexive pronoun must match the subject, and in passé composé, these verbs use être—with agreement. Self-care has never been so grammatically complex.",
    examples: [
      { french: "Je me lève à sept heures.", english: "I get up at seven o'clock." },
      { french: "Elle s'habille rapidement.", english: "She gets dressed quickly." },
      { french: "Nous nous couchons tard.", english: "We go to bed late." }
    ],
    content: {
      type: "reflexive_verbs"
    }
  },
  imperative: {
    id: "imperative",
    title: "Imperative Mood",
    subtitle: "Commands: Parle! Mangez! Allons-y!",
    category: "grammar",
    icon: "📢",
    unlockHint: "Learn to give commands in Haari Fields",
    description: "Ordering people around in French requires dropping the subject pronoun and sometimes the 's' from tu forms. 'Tu parles' becomes 'Parle!' For reflexives, the pronoun moves AFTER the verb with a hyphen: 'Lève-toi!' But in negative commands, it goes back before. French commands are bossy AND complicated.",
    examples: [
      { french: "Parle plus fort!", english: "Speak louder! (tu form, -s dropped)" },
      { french: "Mangez vos légumes!", english: "Eat your vegetables! (vous form)" },
      { french: "Allons-y!", english: "Let's go! (nous form)" }
    ],
    content: {
      type: "imperative"
    }
  },
  demonstratives: {
    id: "demonstratives",
    title: "Demonstratives",
    subtitle: "ce, cet, cette, ces (this/that)",
    category: "grammar",
    icon: "👉",
    unlockHint: "Point at things in the markets",
    description: "Pointing at stuff requires gender awareness. 'Ce livre' (this book, masc), 'cette table' (this table, fem), 'cet homme' (this man, masc before vowel), 'ces livres' (these books). Want to distinguish THIS from THAT? Add '-ci' or '-là' after the noun. French pointing is precise.",
    examples: [
      { french: "Ce livre est intéressant.", english: "This book is interesting." },
      { french: "Cette maison est grande.", english: "This house is big." },
      { french: "Je préfère ce gâteau-ci, pas celui-là.", english: "I prefer this cake, not that one." }
    ],
    content: {
      type: "demonstratives"
    }
  },
  partitive_articles: {
    id: "partitive_articles",
    title: "Partitive Articles",
    subtitle: "du, de la, de l', des (some/any)",
    category: "grammar",
    icon: "🥧",
    unlockHint: "Talk about food quantities in Haari Fields",
    description: "When you want SOME of something (not all, not a specific one), French demands partitive articles. 'Je mange du pain' (I eat some bread), 'Elle boit de l'eau' (She drinks some water). In negative sentences, they ALL become just 'de'. Some rules have no exceptions. This isn't one of them.",
    examples: [
      { french: "Je voudrais du pain.", english: "I would like some bread." },
      { french: "Elle boit de l'eau.", english: "She drinks (some) water." },
      { french: "Je ne mange pas de viande.", english: "I don't eat (any) meat. (negative = de)" }
    ],
    content: {
      type: "partitive_articles"
    }
  },
  il_y_a: {
    id: "il_y_a",
    title: "Il y a",
    subtitle: "There is/are, ago",
    category: "grammar",
    icon: "📍",
    unlockHint: "Describe locations in Dawnmere",
    description: "Three tiny words, two big meanings. 'Il y a un problème' = There is a problem. 'Il y a trois jours' = Three days ago. Context tells you which. The negative is 'il n'y a pas de...' and the question form 'Y a-t-il...?' exists but 'Est-ce qu'il y a...?' is easier. Locals just say 'Y'a' because efficiency.",
    examples: [
      { french: "Il y a un chat dans le jardin.", english: "There is a cat in the garden." },
      { french: "Il y a beaucoup de gens ici.", english: "There are a lot of people here." },
      { french: "Je l'ai vu il y a deux semaines.", english: "I saw him two weeks ago." }
    ],
    content: {
      type: "il_y_a"
    }
  },
  cest_vs_ilest: {
    id: "cest_vs_ilest",
    title: "C'est vs Il est",
    subtitle: "Two ways to say 'it is'",
    category: "grammar",
    icon: "🎭",
    unlockHint: "Master descriptions in Dawnmere",
    description: "Both mean 'it is' but are NOT interchangeable. Use C'EST before: nouns with articles (c'est un livre), proper nouns (c'est Marie), pronouns (c'est moi), and modified adjectives (c'est très beau). Use IL EST before: adjectives alone (il est grand), professions without article (il est médecin), and time (il est midi). Mixing them up marks you as a foreigner instantly.",
    examples: [
      { french: "C'est un bon restaurant.", english: "It's a good restaurant. (noun with article)" },
      { french: "Il est français.", english: "He is French. (adjective alone)" },
      { french: "C'est intéressant!", english: "That's interesting! (general comment)" }
    ],
    content: {
      type: "cest_vs_ilest"
    }
  },
  time_expressions: {
    id: "time_expressions",
    title: "Depuis / Pendant / Pour",
    subtitle: "Time duration expressions",
    category: "grammar",
    icon: "⏱️",
    unlockHint: "Talk about time in your travels",
    description: "Three words for time duration that English often translates as 'for'—but they're NOT the same. DEPUIS = since/for (ongoing action, still happening). PENDANT = during/for (completed duration). POUR = for (future intended duration). 'J'étudie depuis 2 heures' = I've been studying for 2 hours (still studying). 'J'ai étudié pendant 2 heures' = I studied for 2 hours (done).",
    examples: [
      { french: "J'habite ici depuis cinq ans.", english: "I've lived here for five years. (still living)" },
      { french: "J'ai dormi pendant huit heures.", english: "I slept for eight hours. (completed)" },
      { french: "Je pars pour deux semaines.", english: "I'm leaving for two weeks. (future plan)" }
    ],
    content: {
      type: "time_expressions"
    }
  },
  plus_que_parfait: {
    id: "plus_que_parfait",
    title: "Plus-que-parfait",
    subtitle: "The past before the past",
    category: "grammar",
    icon: "⏪",
    unlockHint: "Discover ancient history in Renque",
    description: "When you need to talk about something that happened BEFORE another past event—the 'had done' tense. Formation: imparfait of avoir/être + past participle. 'J'avais mangé avant qu'il arrive' = I had eaten before he arrived. It's the flashback tense. Very useful for dramatic revelations.",
    examples: [
      { french: "J'avais déjà mangé.", english: "I had already eaten." },
      { french: "Elle était partie quand je suis arrivé.", english: "She had left when I arrived." },
      { french: "Nous avions fini avant midi.", english: "We had finished before noon." }
    ],
    content: {
      type: "plus_que_parfait"
    }
  },
  relative_pronouns: {
    id: "relative_pronouns",
    title: "Relative Pronouns",
    subtitle: "qui, que, dont, où",
    category: "grammar",
    icon: "🔗",
    unlockHint: "Connect ideas in Lurenium",
    description: "These words connect clauses like bridges between ideas. QUI = who/which (subject). QUE = whom/which (object). DONT = whose/of which. OÙ = where/when. The trick: QUI is followed by a verb, QUE is followed by a subject. Mix them up and the French will know.",
    examples: [
      { french: "L'homme qui parle est mon père.", english: "The man who is speaking is my father." },
      { french: "Le livre que j'ai lu était bon.", english: "The book (that) I read was good." },
      { french: "La ville où j'habite est petite.", english: "The city where I live is small." }
    ],
    content: {
      type: "relative_pronouns"
    }
  },
  y_and_en: {
    id: "y_and_en",
    title: "Y and En",
    subtitle: "The mystery pronouns",
    category: "grammar",
    icon: "🎯",
    unlockHint: "Master pronoun shortcuts in advanced studies",
    description: "Two tiny words that replace entire phrases. Y replaces 'à + thing/place' (Je vais à Paris → J'y vais). EN replaces 'de + thing' or quantities (J'ai trois pommes → J'en ai trois). They go before the verb and save you from sounding repetitive. Master these and you're officially intermediate.",
    examples: [
      { french: "Tu vas à Paris? Oui, j'y vais.", english: "Going to Paris? Yes, I'm going (there)." },
      { french: "Tu veux du café? J'en veux.", english: "Want coffee? I want some." },
      { french: "Il y en a trois.", english: "There are three (of them)." }
    ],
    content: {
      type: "y_and_en"
    }
  },
  passive_voice: {
    id: "passive_voice",
    title: "Passive Voice",
    subtitle: "être + past participle",
    category: "grammar",
    icon: "🔀",
    unlockHint: "Learn formal writing in the archives",
    description: "When you want to emphasize WHAT happened rather than WHO did it. Formation: être (conjugated) + past participle (agrees with subject). 'Le livre a été écrit par Victor Hugo.' French uses passive less than English—often preferring 'on' constructions instead. But for formal writing and news, it's essential.",
    examples: [
      { french: "La porte est ouverte.", english: "The door is open(ed)." },
      { french: "Le château a été construit en 1200.", english: "The castle was built in 1200." },
      { french: "Les lettres seront envoyées demain.", english: "The letters will be sent tomorrow." }
    ],
    content: {
      type: "passive_voice"
    }
  },
  indirect_speech: {
    id: "indirect_speech",
    title: "Indirect Speech",
    subtitle: "Il a dit que...",
    category: "grammar",
    icon: "💬",
    unlockHint: "Report conversations accurately",
    description: "Reporting what someone said without quoting them directly. Main verb in past? The reported speech shifts back in time (present→imparfait, passé composé→plus-que-parfait, future→conditional). Questions become 'si' clauses. Commands become 'de + infinitive'. It's like time travel for sentences.",
    examples: [
      { french: "Il dit qu'il est fatigué.", english: "He says (that) he's tired." },
      { french: "Elle a dit qu'elle viendrait.", english: "She said she would come. (future→conditional)" },
      { french: "Il m'a demandé si j'avais faim.", english: "He asked me if I was hungry." }
    ],
    content: {
      type: "indirect_speech"
    }
  },
  si_clauses: {
    id: "si_clauses",
    title: "Si Clauses",
    subtitle: "If/then conditions",
    category: "grammar",
    icon: "🔀",
    unlockHint: "Explore possibilities in your journey",
    description: "Three types of 'if' sentences, each with its own tense combo. Type 1 (real): Si + présent → présent/futur. Type 2 (hypothetical): Si + imparfait → conditionnel. Type 3 (impossible past): Si + plus-que-parfait → conditionnel passé. NEVER put 'si' with futur or conditionnel—it's a cardinal sin of French grammar.",
    examples: [
      { french: "Si tu viens, je serai content.", english: "If you come, I'll be happy. (Type 1)" },
      { french: "Si j'avais de l'argent, j'achèterais une maison.", english: "If I had money, I would buy a house. (Type 2)" },
      { french: "Si j'avais su, je serais venu.", english: "If I had known, I would have come. (Type 3)" }
    ],
    content: {
      type: "si_clauses"
    }
  },
  numbers: {
    id: "numbers",
    title: "Numbers",
    subtitle: "0-100 and beyond",
    category: "reference",
    icon: "🔢",
    unlockHint: "Count your gold in Dawnmere",
    description: "Counting is simple until you hit 70, when French mathematicians apparently got bored. 70 = sixty-ten. 80 = four-twenties. 99 = four-twenties-ten-nine. Who hurt these people? (Belgium and Switzerland use normal numbers because they have standards.)",
    examples: [
      { french: "vingt et un (21)", english: "twenty-one" },
      { french: "soixante-dix (70)", english: "seventy (lit: sixty-ten)" },
      { french: "quatre-vingt-dix-neuf (99)", english: "ninety-nine (lit: 4×20+10+9)" }
    ],
    content: {
      type: "numbers"
    }
  },

  // Advanced Conjugation
  passe_compose: {
    id: "passe_compose",
    title: "Passé Composé",
    subtitle: "Completed past actions",
    category: "verbs",
    icon: "⏮️",
    unlockHint: "Master past tense in Lurenium",
    description: "The past tense that requires a helper verb because French actions can't face their history alone. Avoir helps most verbs; être assists the fancy 'movement and change' verbs. Oh, and with être? The ending changes based on who did it. Because why make anything simple?",
    examples: [
      { french: "J'ai mangé une pomme.", english: "I ate an apple. (avoir + mangé)" },
      { french: "Elle est allée à Paris.", english: "She went to Paris. (être + allée, feminine agreement)" },
      { french: "Nous avons fini le travail.", english: "We finished the work." }
    ],
    content: {
      type: "passe_compose"
    }
  },
  imparfait: {
    id: "imparfait",
    title: "Imparfait",
    subtitle: "Ongoing past, habits, descriptions",
    category: "verbs",
    icon: "🔄",
    unlockHint: "Learn about the past in the capital",
    description: "The nostalgic past tense. For when you were doing something, used to do something, or want to wax poetic about 'the old days.' Take the nous form, chop off -ons, add endings. Almost every verb is regular here—être being the dramatic exception, as usual.",
    examples: [
      { french: "Quand j'étais jeune...", english: "When I was young... (description)" },
      { french: "Il pleuvait tous les jours.", english: "It rained every day. (habit)" },
      { french: "Je mangeais quand tu as appelé.", english: "I was eating when you called. (ongoing)" }
    ],
    content: {
      type: "imparfait"
    }
  },
  futur_proche: {
    id: "futur_proche",
    title: "Futur Proche",
    subtitle: "Going to (near future)",
    category: "verbs",
    icon: "⏭️",
    unlockHint: "Plan ahead in Haari Fields",
    description: "The lazy adventurer's future tense. Just conjugate aller + slap on any infinitive. 'Je vais manger' = I'm going to eat. Done. No special endings, no stem changes, no tears. This is the future tense for people who value their sanity.",
    examples: [
      { french: "Je vais manger.", english: "I'm going to eat." },
      { french: "Elle va partir demain.", english: "She's going to leave tomorrow." },
      { french: "Nous allons étudier ce soir.", english: "We're going to study tonight." }
    ],
    content: {
      type: "futur_proche"
    }
  },
  reflexive_verbs_verb: {
    id: "reflexive_verbs_verb",
    title: "Reflexive Verbs",
    subtitle: "se laver, se lever, s'appeler...",
    category: "verbs",
    icon: "🪞",
    unlockHint: "Discover self-actions in Lurenium",
    description: "For when you do things to yourself. Getting dressed? You dress yourself. Waking up? You wake yourself. Introducing yourself? 'Je m'appelle' literally means 'I call myself.' The French are very self-aware. Probably from all that mirror-gazing.",
    examples: [
      { french: "Je me lève à sept heures.", english: "I get up at seven. (lit: I raise myself)" },
      { french: "Comment vous appelez-vous?", english: "What's your name? (lit: How do you call yourself?)" },
      { french: "Elle s'est habillée.", english: "She got dressed. (passé composé with être)" }
    ],
    content: {
      type: "reflexive_verbs"
    }
  },
  avoir_expressions: {
    id: "avoir_expressions",
    title: "Avoir Expressions",
    subtitle: "Idiomatic uses of avoir",
    category: "verbs",
    icon: "💡",
    unlockHint: "Learn expressions from village elders",
    description: "Remember when I said French uses avoir for everything? I wasn't exaggerating. You HAVE hunger, HAVE thirst, HAVE fear, HAVE reason, HAVE years. It's like French treats emotions and states as collectibles. Gotta have 'em all!",
    examples: [
      { french: "J'ai faim / soif.", english: "I'm hungry / thirsty. (I have hunger/thirst)" },
      { french: "Elle a vingt ans.", english: "She is twenty. (She has twenty years)" },
      { french: "Nous avons raison / tort.", english: "We're right / wrong. (We have right/wrong)" }
    ],
    content: {
      type: "avoir_expressions"
    }
  },
  futur_simple: {
    id: "futur_simple",
    title: "Futur Simple",
    subtitle: "Simple future tense",
    category: "verbs",
    icon: "🔮",
    unlockHint: "See the future in the capital",
    description: "The formal, prophetic future. Use this when making grand declarations, solemn promises, or predicting someone's doom. Add endings to the infinitive—unless it's irregular, then memorize special stems. Very dramatic. Very French.",
    examples: [
      { french: "Je parlerai français.", english: "I will speak French." },
      { french: "Nous serons là demain.", english: "We will be there tomorrow. (être → ser-)" },
      { french: "Tu auras le temps.", english: "You will have time. (avoir → aur-)" }
    ],
    content: {
      type: "futur_simple"
    }
  },
  conditionnel: {
    id: "conditionnel",
    title: "Conditionnel",
    subtitle: "Would, could, should",
    category: "verbs",
    icon: "🤔",
    unlockHint: "Master hypotheticals in advanced studies",
    description: "The 'what if' tense. Useful for daydreaming, being polite, and explaining why you definitely WOULD save the kingdom IF the circumstances were different. Future stems + imparfait endings = the verbal equivalent of shrugging elegantly.",
    examples: [
      { french: "Je voudrais un café.", english: "I would like a coffee. (polite)" },
      { french: "Si j'avais le temps, je voyagerais.", english: "If I had time, I would travel." },
      { french: "Tu pourrais m'aider?", english: "Could you help me?" }
    ],
    content: {
      type: "conditionnel"
    }
  },
  subjonctif: {
    id: "subjonctif",
    title: "Subjonctif",
    subtitle: "Expressing doubt, emotion, necessity",
    category: "verbs",
    icon: "💭",
    unlockHint: "Unlock in the final chapter",
    description: "The final boss of French grammar. It's not a tense—it's a MOOD. Used when things are uncertain, emotional, or demanded. Most verbs look normal, but être and avoir decided to be completely unrecognizable. 'Je doute que tu sois prêt'—and honestly? Same.",
    examples: [
      { french: "Il faut que tu parles.", english: "You must speak. (necessity)" },
      { french: "Je veux que tu sois là.", english: "I want you to be there. (desire)" },
      { french: "Je doute qu'il vienne.", english: "I doubt he'll come. (doubt)" }
    ],
    content: {
      type: "subjonctif"
    }
  },

  // Reference
  pronouns: {
    id: "pronouns",
    title: "Subject Pronouns",
    subtitle: "je, tu, il, elle, nous...",
    category: "reference",
    icon: "👥",
    unlockHint: "Available from the start",
    alwaysUnlocked: true,
    description: "The cast of characters for every French sentence. 'Tu' for friends, 'vous' for strangers and kings. 'On' secretly means 'we' in casual speech. And 'ils' covers any group with at least one male—a billion women and one man? Ils. French is fun like that.",
    examples: [
      { french: "Tu es mon ami.", english: "You are my friend. (informal)" },
      { french: "Vous êtes très gentil.", english: "You are very kind. (formal)" },
      { french: "On va au cinéma.", english: "We're going to the movies. (informal 'we')" }
    ],
    content: {
      type: "pronouns"
    }
  },

  // Lore - Historical Timeline
  lore_ancients: {
    id: "lore_ancients",
    title: "The Ancients",
    subtitle: "1000+ years ago",
    category: "lore",
    icon: "🏛️",
    unlockHint: "Discover ancient ruins in Lurenium",
    description: "Before Verandum, before the kingdoms, before even the language you're learning—there were the Ancients. They built Lurenium not as a city, but as a seal. Against what? Nobody knows. Their civilization vanished, their language forgotten, their warnings unheeded. Sleep well!",
    examples: [
      { french: "Les anciens ont construit Lurenium.", english: "The Ancients built Lurenium." },
      { french: "Leur civilisation a disparu.", english: "Their civilization disappeared." },
      { french: "Ils parlaient une autre langue.", english: "They spoke another language." }
    ],
    content: {
      type: "lore",
      era: "ancients"
    }
  },
  lore_silence: {
    id: "lore_silence",
    title: "The Silence",
    subtitle: "1000-500 years ago",
    category: "lore",
    icon: "🌑",
    unlockHint: "Find records of the dark age",
    description: "Five hundred years of nothing. The Ancients fell, their cities crumbled, their knowledge scattered like seeds in a storm. Tribes wandered. Lurenium stood empty, its purpose forgotten. This is the gap in history that scholars argue about in taverns—usually right before a bar fight.",
    examples: [
      { french: "Le silence a duré cinq siècles.", english: "The silence lasted five centuries." },
      { french: "Les ruines étaient abandonnées.", english: "The ruins were abandoned." },
      { french: "Personne ne se souvenait.", english: "Nobody remembered." }
    ],
    content: {
      type: "lore",
      era: "silence"
    }
  },
  lore_founding: {
    id: "lore_founding",
    title: "The Founding",
    subtitle: "~500 years ago",
    category: "lore",
    icon: "👑",
    unlockHint: "Learn of Verandum's origins",
    description: "Out of the chaos, order emerged. The Kingdom of Verandum united the scattered tribes under one banner, one currency, and one language—French. Lurenium was rediscovered but not understood. The new rulers built their civilization atop the bones of the old. Nothing ominous about that at all.",
    examples: [
      { french: "Le royaume de Verandum est né.", english: "The Kingdom of Verandum was born." },
      { french: "Ils ont redécouvert Lurenium.", english: "They rediscovered Lurenium." },
      { french: "Une nouvelle ère a commencé.", english: "A new era began." }
    ],
    content: {
      type: "lore",
      era: "founding"
    }
  },
  lore_faith: {
    id: "lore_faith",
    title: "The Faith",
    subtitle: "~400 years ago",
    category: "lore",
    icon: "✝️",
    unlockHint: "Study with the Order of Dawn",
    description: "The Order of Dawn rose to prominence, building temples across the land. Their original teachings emphasized humility, service, and truth. Beautiful principles that lasted approximately until someone realized religion could be useful for controlling people. The Order's texts from this era are... different from the current versions.",
    examples: [
      { french: "L'Ordre de l'Aube a été fondé.", english: "The Order of Dawn was founded." },
      { french: "Ils enseignaient la vérité.", english: "They taught the truth." },
      { french: "Les temples ont été construits.", english: "The temples were built." }
    ],
    content: {
      type: "lore",
      era: "faith"
    }
  },
  lore_golden_age: {
    id: "lore_golden_age",
    title: "The Golden Age",
    subtitle: "400-100 years ago",
    category: "lore",
    icon: "⭐",
    unlockHint: "Visit the Royal Archives",
    description: "Three hundred years of prosperity! Trade flourished, scholars debated, harvests were abundant, and nobody was secretly plotting to use dark magic to overthrow their father. The good old days. The royal archives from this period paint a picture of a kingdom at peace. Cherish this chapter—it doesn't last.",
    examples: [
      { french: "C'était une époque de paix.", english: "It was an era of peace." },
      { french: "Le commerce a prospéré.", english: "Trade flourished." },
      { french: "Les récoltes étaient abondantes.", english: "The harvests were abundant." }
    ],
    content: {
      type: "lore",
      era: "golden_age"
    }
  },
  lore_king_dran: {
    id: "lore_king_dran",
    title: "King Dran's Reign",
    subtitle: "100-30 years ago",
    category: "lore",
    icon: "🏰",
    unlockHint: "Hear tales of the old king",
    description: "King Dran maintained stability through seventy years of rule. His two sons, Hermeau and Layne, were raised to share the burden of governance. As children, they were inseparable. As teenagers, cracks appeared. As adults... well, you'll find out. Some families argue over dinner. Others argue over kingdoms.",
    examples: [
      { french: "Le roi Dran a régné longtemps.", english: "King Dran reigned for a long time." },
      { french: "Ses deux fils ont grandi ensemble.", english: "His two sons grew up together." },
      { french: "Ils sont devenus différents.", english: "They became different." }
    ],
    content: {
      type: "lore",
      era: "king_dran"
    }
  },
  lore_the_war: {
    id: "lore_the_war",
    title: "The War",
    subtitle: "~20 years ago",
    category: "lore",
    icon: "⚔️",
    unlockHint: "Uncover what really happened",
    description: "The official story: evil forces attacked, the king was assassinated, Hermeau heroically saved the kingdom. The actual story: [REDACTED BY ORDER OF THE CROWN]. Just kidding—we'll get to that. But survivors who were there tell a different tale. The Corruption didn't come from outside. It was invited.",
    examples: [
      { french: "La guerre a tout changé.", english: "The war changed everything." },
      { french: "Le roi a été assassiné.", english: "The king was assassinated." },
      { french: "La Corruption a détruit les terres.", english: "The Corruption destroyed the lands." }
    ],
    content: {
      type: "lore",
      era: "the_war"
    }
  },
  lore_exile: {
    id: "lore_exile",
    title: "The Exile",
    subtitle: "20 years ago - Present",
    category: "lore",
    icon: "🚪",
    unlockHint: "Find Layne's hidden letters",
    description: "Hermeau took the throne. Layne was exiled—officially for 'weakness in the face of the enemy,' unofficially for knowing too much. History was rewritten, the Order of Dawn compromised, and propaganda became truth. But Layne didn't go quietly. He left breadcrumbs. Letters. Evidence. Somewhere out there, the truth waits to be found.",
    examples: [
      { french: "Layne a été exilé.", english: "Layne was exiled." },
      { french: "L'histoire a été réécrite.", english: "History was rewritten." },
      { french: "La vérité attend d'être découverte.", english: "The truth waits to be discovered." }
    ],
    content: {
      type: "lore",
      era: "exile"
    }
  }
};

// =====================================================
// French Spellbook Categories
// =====================================================

const FRENCH_SPELLBOOK_CATEGORIES = [
  { id: "verbs", label: "Verbs", icon: "⚡" },
  { id: "grammar", label: "Grammar", icon: "📚" },
  { id: "reference", label: "Reference", icon: "📋" },
  { id: "lore", label: "Lore", icon: "📜" },
  { id: "artifacts", label: "Artifacts", icon: "🏺" }
];

// =====================================================
// French Artifact Eras
// =====================================================

const FRENCH_ARTIFACT_ERAS = [
  { id: "ancients", label: "The Ancients", icon: "🏛️", order: 1 },
  { id: "silence", label: "The Silence", icon: "🌑", order: 2 },
  { id: "founding", label: "The Founding", icon: "👑", order: 3 },
  { id: "faith", label: "The Faith", icon: "✝️", order: 4 },
  { id: "golden_age", label: "The Golden Age", icon: "⭐", order: 5 },
  { id: "king_dran", label: "King Dran's Reign", icon: "🏰", order: 6 },
  { id: "the_war", label: "The War", icon: "⚔️", order: 7 },
  { id: "exile", label: "The Exile", icon: "🚪", order: 8 }
];

// =====================================================
// French Spellbook Renderer (optional custom rendering)
// =====================================================

const FrenchSpellbookRenderer = {
  /**
   * Render content for French spellbook pages
   * @param {object} page - The page object with content.type
   * @param {object} manager - The SpellbookManager instance (optional)
   * @returns {string|null} HTML string or null if type not handled
   */
  renderContent(page, manager) {
    const contentType = page.content?.type;
    if (!contentType) return null;

    switch (contentType) {
      case 'conjugation':
        return this.renderConjugation(page.content.verb);
      case 'pattern':
        return this.renderPattern(page.content.pattern);
      case 'articles':
        return this.renderArticles();
      case 'gender':
        return this.renderGender();
      case 'pronouns':
        return this.renderPronouns();
      case 'negation':
        return this.renderNegation();
      case 'adjectives':
        return this.renderAdjectives();
      case 'possessives':
        return this.renderPossessives();
      case 'questions':
        return this.renderQuestions();
      case 'numbers':
        return this.renderNumbers();
      case 'passe_compose':
        return this.renderPasseCompose();
      case 'imparfait':
        return this.renderImparfait();
      case 'futur_proche':
        return this.renderFuturProche();
      case 'reflexive_verbs':
        return this.renderReflexiveVerbs();
      case 'avoir_expressions':
        return this.renderAvoirExpressions();
      case 'futur_simple':
        return this.renderFuturSimple();
      case 'conditionnel':
        return this.renderConditionnel();
      case 'subjonctif':
        return this.renderSubjonctif();
      case 'prepositions':
        return this.renderPrepositions();
      case 'contractions':
        return this.renderContractions();
      case 'adverbs':
        return this.renderAdverbs();
      case 'comparatives':
        return this.renderComparatives();
      case 'object_pronouns':
        return this.renderObjectPronouns();
      case 'imperative':
        return this.renderImperative();
      case 'demonstratives':
        return this.renderDemonstratives();
      case 'partitive_articles':
        return this.renderPartitiveArticles();
      case 'il_y_a':
        return this.renderIlYA();
      case 'cest_vs_ilest':
        return this.renderCestVsIlEst();
      case 'time_expressions':
        return this.renderTimeExpressions();
      case 'plus_que_parfait':
        return this.renderPlusQueParfait();
      case 'relative_pronouns':
        return this.renderRelativePronouns();
      case 'y_and_en':
        return this.renderYAndEn();
      case 'passive_voice':
        return this.renderPassiveVoice();
      case 'indirect_speech':
        return this.renderIndirectSpeech();
      case 'si_clauses':
        return this.renderSiClauses();
      case 'lore':
        return this.renderLore(page.content.era);
      default:
        return null;
    }
  },

  // ===================================================
  // Verb Conjugation Rendering
  // ===================================================

  renderConjugation(verbId) {
    if (typeof FRENCH_GRAMMAR === 'undefined' || !FRENCH_GRAMMAR.verbs || !FRENCH_GRAMMAR.verbs[verbId]) {
      // Fallback to global GRAMMAR
      if (typeof GRAMMAR === 'undefined' || !GRAMMAR.verbs || !GRAMMAR.verbs[verbId]) {
        return '<p>Verb data not found.</p>';
      }
      var verb = GRAMMAR.verbs[verbId];
    } else {
      var verb = FRENCH_GRAMMAR.verbs[verbId];
    }

    let html = `
      <div class="page-section">
        <div class="page-section-title">Present Tense</div>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Pronoun</th>
              <th>Form</th>
            </tr>
          </thead>
          <tbody>
    `;

    const pronounOrder = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
    const pronounDisplay = {
      'je': 'je',
      'tu': 'tu',
      'il': 'il / elle / on',
      'nous': 'nous',
      'vous': 'vous',
      'ils': 'ils / elles'
    };

    pronounOrder.forEach(pronoun => {
      if (verb.present && verb.present[pronoun]) {
        html += `
          <tr>
            <td class="pronoun">${pronounDisplay[pronoun]}</td>
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

  // ===================================================
  // Pattern Rendering
  // ===================================================

  renderPattern(patternId) {
    if (patternId === 'er_verbs') {
      return `
        <div class="page-section">
          <div class="page-section-title">Pattern: Regular -ER Verbs</div>
          <p style="margin-bottom: 16px;">Most French verbs end in -ER and follow this pattern. Remove -ER and add:</p>
          <table class="conjugation-table">
            <thead>
              <tr>
                <th>Pronoun</th>
                <th>Ending</th>
                <th>Example (parler)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="pronoun">je</td><td class="form">-e</td><td>parle</td></tr>
              <tr><td class="pronoun">tu</td><td class="form">-es</td><td>parles</td></tr>
              <tr><td class="pronoun">il/elle</td><td class="form">-e</td><td>parle</td></tr>
              <tr><td class="pronoun">nous</td><td class="form">-ons</td><td>parlons</td></tr>
              <tr><td class="pronoun">vous</td><td class="form">-ez</td><td>parlez</td></tr>
              <tr><td class="pronoun">ils/elles</td><td class="form">-ent</td><td>parlent</td></tr>
            </tbody>
          </table>
        </div>
        <div class="grammar-tip">
          <span class="grammar-tip-icon">💡</span>
          The endings -e, -es, -e, and -ent are all silent! Only -ons and -ez are pronounced.
        </div>
      `;
    }

    if (patternId === 'ir_verbs') {
      return `
        <div class="page-section">
          <div class="page-section-title">Pattern: Regular -IR Verbs</div>
          <p style="margin-bottom: 16px;">Regular -IR verbs add <strong>-iss-</strong> before plural endings. Remove -IR and add:</p>
          <table class="conjugation-table">
            <thead>
              <tr>
                <th>Pronoun</th>
                <th>Ending</th>
                <th>Example (finir)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="pronoun">je</td><td class="form">-is</td><td>finis</td></tr>
              <tr><td class="pronoun">tu</td><td class="form">-is</td><td>finis</td></tr>
              <tr><td class="pronoun">il/elle</td><td class="form">-it</td><td>finit</td></tr>
              <tr><td class="pronoun">nous</td><td class="form">-issons</td><td>finissons</td></tr>
              <tr><td class="pronoun">vous</td><td class="form">-issez</td><td>finissez</td></tr>
              <tr><td class="pronoun">ils/elles</td><td class="form">-issent</td><td>finissent</td></tr>
            </tbody>
          </table>
        </div>
        <div class="page-section">
          <div class="page-section-title">Common -IR Verbs</div>
          <p>finir (finish), choisir (choose), réussir (succeed), grandir (grow), rougir (blush)</p>
        </div>
        <div class="grammar-tip">
          <span class="grammar-tip-icon">💡</span>
          Not all -ir verbs follow this pattern! Verbs like "partir" and "dormir" are irregular.
        </div>
      `;
    }

    if (patternId === 're_verbs') {
      return `
        <div class="page-section">
          <div class="page-section-title">Pattern: Regular -RE Verbs</div>
          <p style="margin-bottom: 16px;">Regular -RE verbs drop the -RE and add endings. Note: <strong>no ending</strong> for il/elle!</p>
          <table class="conjugation-table">
            <thead>
              <tr>
                <th>Pronoun</th>
                <th>Ending</th>
                <th>Example (vendre)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="pronoun">je</td><td class="form">-s</td><td>vends</td></tr>
              <tr><td class="pronoun">tu</td><td class="form">-s</td><td>vends</td></tr>
              <tr><td class="pronoun">il/elle</td><td class="form">—</td><td>vend</td></tr>
              <tr><td class="pronoun">nous</td><td class="form">-ons</td><td>vendons</td></tr>
              <tr><td class="pronoun">vous</td><td class="form">-ez</td><td>vendez</td></tr>
              <tr><td class="pronoun">ils/elles</td><td class="form">-ent</td><td>vendent</td></tr>
            </tbody>
          </table>
        </div>
        <div class="page-section">
          <div class="page-section-title">Common -RE Verbs</div>
          <p>vendre (sell), attendre (wait), répondre (answer), perdre (lose), entendre (hear)</p>
        </div>
        <div class="grammar-tip">
          <span class="grammar-tip-icon">💡</span>
          The third person singular has no ending - just the stem! "Il vend" (he sells), not "il vende."
        </div>
      `;
    }

    return '<p>Pattern not found.</p>';
  },

  // ===================================================
  // Grammar Reference Rendering
  // ===================================================

  renderArticles() {
    return `
      <div class="page-section">
        <div class="page-section-title">Definite Articles (The)</div>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Gender/Number</th>
              <th>Article</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Masculine singular</td><td class="form">le</td><td>le livre (the book)</td></tr>
            <tr><td>Feminine singular</td><td class="form">la</td><td>la maison (the house)</td></tr>
            <tr><td>Before vowel/h</td><td class="form">l'</td><td>l'école (the school)</td></tr>
            <tr><td>All plurals</td><td class="form">les</td><td>les livres (the books)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Indefinite Articles (A/An/Some)</div>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Gender/Number</th>
              <th>Article</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Masculine singular</td><td class="form">un</td><td>un livre (a book)</td></tr>
            <tr><td>Feminine singular</td><td class="form">une</td><td>une maison (a house)</td></tr>
            <tr><td>All plurals</td><td class="form">des</td><td>des livres (some books)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Articles must always agree with the noun's gender. When in doubt, check your spellbook's vocabulary entries for gender markers!
      </div>
    `;
  },

  renderGender() {
    return `
      <div class="page-section">
        <div class="page-section-title">Common Feminine Endings</div>
        <p style="margin-bottom: 12px;">Words ending in these are usually feminine:</p>
        <table class="conjugation-table">
          <tbody>
            <tr><td class="form">-tion / -sion</td><td>la nation, la télévision</td></tr>
            <tr><td class="form">-té</td><td>la liberté, la beauté</td></tr>
            <tr><td class="form">-ence / -ance</td><td>la patience, la distance</td></tr>
            <tr><td class="form">-ie</td><td>la vie, la magie</td></tr>
            <tr><td class="form">-ure</td><td>la nature, l'aventure</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Common Masculine Endings</div>
        <p style="margin-bottom: 12px;">Words ending in these are usually masculine:</p>
        <table class="conjugation-table">
          <tbody>
            <tr><td class="form">-age</td><td>le voyage, le village</td></tr>
            <tr><td class="form">-ment</td><td>le moment, le sentiment</td></tr>
            <tr><td class="form">-eau</td><td>le bateau, le château</td></tr>
            <tr><td class="form">-isme</td><td>le tourisme, l'optimisme</td></tr>
            <tr><td class="form">-eur</td><td>le bonheur, le cœur</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        These are patterns, not rules! There are always exceptions. When learning new vocabulary, always memorize the article with the noun.
      </div>
    `;
  },

  renderPronouns() {
    return `
      <div class="page-section">
        <div class="page-section-title">Subject Pronouns</div>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>French</th>
              <th>English</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="form">je (j')</td><td>I</td><td>First person singular</td></tr>
            <tr><td class="form">tu</td><td>you</td><td>Informal singular</td></tr>
            <tr><td class="form">il / elle / on</td><td>he / she / one</td><td>Third person singular</td></tr>
            <tr><td class="form">nous</td><td>we</td><td>First person plural</td></tr>
            <tr><td class="form">vous</td><td>you</td><td>Formal or plural</td></tr>
            <tr><td class="form">ils / elles</td><td>they</td><td>Masculine/feminine plural</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Tu vs Vous</div>
        <p><strong>Tu:</strong> Use with friends, family, children, pets, and peers your age.</p>
        <p style="margin-top: 8px;"><strong>Vous:</strong> Use with strangers, elders, superiors, and in formal situations. Also used for any group of people.</p>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        "On" is very common in spoken French as a casual way to say "we" instead of "nous". "On va au cinéma?" = "Shall we go to the movies?"
      </div>
    `;
  },

  renderNegation() {
    return `
      <div class="page-section">
        <div class="page-section-title">Basic Negation: ne...pas</div>
        <p style="margin-bottom: 12px;">Wrap the verb with <strong>ne</strong> and <strong>pas</strong>:</p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Positive</th>
              <th>Negative</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Je parle français.</td><td>Je <strong>ne</strong> parle <strong>pas</strong> français.</td></tr>
            <tr><td>Elle est heureuse.</td><td>Elle <strong>n'</strong>est <strong>pas</strong> heureuse.</td></tr>
            <tr><td>Nous avons faim.</td><td>Nous <strong>n'</strong>avons <strong>pas</strong> faim.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Other Negative Forms</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td class="form">ne...jamais</td><td>never</td><td>Je ne mange jamais de viande.</td></tr>
            <tr><td class="form">ne...rien</td><td>nothing</td><td>Il ne dit rien.</td></tr>
            <tr><td class="form">ne...personne</td><td>no one</td><td>Elle ne voit personne.</td></tr>
            <tr><td class="form">ne...plus</td><td>no more/longer</td><td>Nous ne vivons plus là.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        In casual speech, the "ne" is often dropped: "Je sais pas" instead of "Je ne sais pas". But always keep it in writing!
      </div>
    `;
  },

  renderAdjectives() {
    return `
      <div class="page-section">
        <div class="page-section-title">Agreement Rules</div>
        <p style="margin-bottom: 12px;">Adjectives must agree in gender and number with the noun:</p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th></th>
              <th>Masculine</th>
              <th>Feminine</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Singular</td><td class="form">petit</td><td class="form">petit<strong>e</strong></td></tr>
            <tr><td>Plural</td><td class="form">petit<strong>s</strong></td><td class="form">petit<strong>es</strong></td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Position</div>
        <p>Most adjectives come <strong>after</strong> the noun:</p>
        <p style="margin: 8px 0;"><em>une voiture <strong>rouge</strong></em> (a red car)</p>
        <p>But BAGS adjectives come <strong>before</strong>:</p>
        <p style="margin-top: 8px;"><strong>B</strong>eauty: beau, joli</p>
        <p><strong>A</strong>ge: jeune, vieux, nouveau</p>
        <p><strong>G</strong>oodness: bon, mauvais</p>
        <p><strong>S</strong>ize: grand, petit, gros</p>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Some adjectives change meaning based on position! "Un homme grand" (a tall man) vs "un grand homme" (a great man).
      </div>
    `;
  },

  renderPossessives() {
    return `
      <div class="page-section">
        <div class="page-section-title">Possessive Adjectives</div>
        <p style="margin-bottom: 12px;">Must agree with the <strong>possessed noun</strong>, not the owner:</p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Owner</th>
              <th>Masc. Sing.</th>
              <th>Fem. Sing.</th>
              <th>Plural</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>my</td><td class="form">mon</td><td class="form">ma</td><td class="form">mes</td></tr>
            <tr><td>your (tu)</td><td class="form">ton</td><td class="form">ta</td><td class="form">tes</td></tr>
            <tr><td>his/her/its</td><td class="form">son</td><td class="form">sa</td><td class="form">ses</td></tr>
            <tr><td>our</td><td class="form" colspan="2">notre</td><td class="form">nos</td></tr>
            <tr><td>your (vous)</td><td class="form" colspan="2">votre</td><td class="form">vos</td></tr>
            <tr><td>their</td><td class="form" colspan="2">leur</td><td class="form">leurs</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Before feminine nouns starting with a vowel, use mon/ton/son instead of ma/ta/sa: "mon amie" (my friend), not "ma amie".
      </div>
    `;
  },

  renderQuestions() {
    return `
      <div class="page-section">
        <div class="page-section-title">Three Ways to Ask Questions</div>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Example</th>
              <th>Register</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Intonation ↗</td><td>Tu parles français?</td><td>Casual</td></tr>
            <tr><td>Est-ce que...</td><td>Est-ce que tu parles français?</td><td>Standard</td></tr>
            <tr><td>Inversion</td><td>Parles-tu français?</td><td>Formal</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Question Words</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td class="form">Qui?</td><td>Who?</td><td>Qui est là?</td></tr>
            <tr><td class="form">Que/Quoi?</td><td>What?</td><td>Que fais-tu?</td></tr>
            <tr><td class="form">Où?</td><td>Where?</td><td>Où habites-tu?</td></tr>
            <tr><td class="form">Quand?</td><td>When?</td><td>Quand arrives-tu?</td></tr>
            <tr><td class="form">Comment?</td><td>How?</td><td>Comment vas-tu?</td></tr>
            <tr><td class="form">Pourquoi?</td><td>Why?</td><td>Pourquoi pleures-tu?</td></tr>
            <tr><td class="form">Combien?</td><td>How much/many?</td><td>Combien ça coûte?</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        With inversion and third person, add -t- between vowels: "Parle-t-il français?" "A-t-elle faim?"
      </div>
    `;
  },

  renderNumbers() {
    return `
      <div class="page-section">
        <div class="page-section-title">0-20</div>
        <table class="conjugation-table" style="font-size: 13px;">
          <tbody>
            <tr>
              <td>0 zéro</td><td>1 un</td><td>2 deux</td><td>3 trois</td><td>4 quatre</td>
            </tr>
            <tr>
              <td>5 cinq</td><td>6 six</td><td>7 sept</td><td>8 huit</td><td>9 neuf</td>
            </tr>
            <tr>
              <td>10 dix</td><td>11 onze</td><td>12 douze</td><td>13 treize</td><td>14 quatorze</td>
            </tr>
            <tr>
              <td>15 quinze</td><td>16 seize</td><td>17 dix-sept</td><td>18 dix-huit</td><td>19 dix-neuf</td>
            </tr>
            <tr>
              <td colspan="5">20 vingt</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Tens and Beyond</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td>30 trente</td><td>40 quarante</td><td>50 cinquante</td></tr>
            <tr><td>60 soixante</td><td>70 soixante-dix (60+10)</td><td>80 quatre-vingts (4×20)</td></tr>
            <tr><td>90 quatre-vingt-dix</td><td>100 cent</td><td>1000 mille</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        French uses base-20 for 70-99! 71 = soixante-et-onze (60+11), 92 = quatre-vingt-douze (4×20+12). Belgium and Switzerland use "septante" (70) and "nonante" (90) instead.
      </div>
    `;
  },

  renderPasseCompose() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation</div>
        <p style="margin-bottom: 12px;"><strong>avoir/être</strong> (present) + <strong>past participle</strong></p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>With avoir</th>
              <th>With être</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>J'ai parlé</td><td>Je suis allé(e)</td></tr>
            <tr><td>Tu as mangé</td><td>Tu es venu(e)</td></tr>
            <tr><td>Il a fini</td><td>Elle est partie</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Past Participle Formation</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td class="form">-er → -é</td><td>parler → parlé</td></tr>
            <tr><td class="form">-ir → -i</td><td>finir → fini</td></tr>
            <tr><td class="form">-re → -u</td><td>vendre → vendu</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">DR MRS VANDERTRAMP</div>
        <p style="margin-bottom: 8px;">These verbs use <strong>être</strong>:</p>
        <p style="font-size: 13px;">Devenir, Revenir, Monter, Rester, Sortir, Venir, Aller, Naître, Descendre, Entrer, Retourner, Tomber, Rentrer, Arriver, Mourir, Partir</p>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        With être verbs, the past participle agrees with the subject: "Elle est allée" (she went), "Ils sont partis" (they left).
      </div>
    `;
  },

  renderImparfait() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation</div>
        <p style="margin-bottom: 12px;">Take the <strong>nous</strong> form present tense, remove <strong>-ons</strong>, add endings:</p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Pronoun</th>
              <th>Ending</th>
              <th>Example (parler)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="pronoun">je</td><td class="form">-ais</td><td>parlais</td></tr>
            <tr><td class="pronoun">tu</td><td class="form">-ais</td><td>parlais</td></tr>
            <tr><td class="pronoun">il/elle</td><td class="form">-ait</td><td>parlait</td></tr>
            <tr><td class="pronoun">nous</td><td class="form">-ions</td><td>parlions</td></tr>
            <tr><td class="pronoun">vous</td><td class="form">-iez</td><td>parliez</td></tr>
            <tr><td class="pronoun">ils/elles</td><td class="form">-aient</td><td>parlaient</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">When to Use</div>
        <ul style="list-style: disc; padding-left: 20px;">
          <li>Ongoing past actions: <em>Il pleuvait.</em> (It was raining.)</li>
          <li>Habitual past actions: <em>Je jouais tous les jours.</em> (I used to play every day.)</li>
          <li>Descriptions/states: <em>Elle était belle.</em> (She was beautiful.)</li>
          <li>Background for events: <em>Je dormais quand...</em> (I was sleeping when...)</li>
        </ul>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        The only irregular stem is "être" → "ét-" (j'étais, tu étais, etc.). All other verbs follow the nous-form rule!
      </div>
    `;
  },

  renderFuturProche() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation</div>
        <p style="margin-bottom: 12px;"><strong>aller</strong> (present) + <strong>infinitive</strong></p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Aller</th>
              <th>+ Infinitive</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Je</td><td class="form">vais</td><td>manger</td><td>I'm going to eat</td></tr>
            <tr><td>Tu</td><td class="form">vas</td><td>partir</td><td>You're going to leave</td></tr>
            <tr><td>Il/Elle</td><td class="form">va</td><td>dormir</td><td>He/She is going to sleep</td></tr>
            <tr><td>Nous</td><td class="form">allons</td><td>étudier</td><td>We're going to study</td></tr>
            <tr><td>Vous</td><td class="form">allez</td><td>voir</td><td>You're going to see</td></tr>
            <tr><td>Ils/Elles</td><td class="form">vont</td><td>arriver</td><td>They're going to arrive</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        This is by far the most common way to express future in everyday French! "Je vais manger" is more natural than "Je mangerai" in conversation.
      </div>
    `;
  },

  renderReflexiveVerbs() {
    return `
      <div class="page-section">
        <div class="page-section-title">Reflexive Pronouns</div>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Reflexive</th>
              <th>Example (se laver)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>je</td><td class="form">me</td><td>je me lave</td></tr>
            <tr><td>tu</td><td class="form">te</td><td>tu te laves</td></tr>
            <tr><td>il/elle</td><td class="form">se</td><td>il se lave</td></tr>
            <tr><td>nous</td><td class="form">nous</td><td>nous nous lavons</td></tr>
            <tr><td>vous</td><td class="form">vous</td><td>vous vous lavez</td></tr>
            <tr><td>ils/elles</td><td class="form">se</td><td>ils se lavent</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Common Reflexive Verbs</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td class="form">se réveiller</td><td>to wake up</td></tr>
            <tr><td class="form">se lever</td><td>to get up</td></tr>
            <tr><td class="form">se coucher</td><td>to go to bed</td></tr>
            <tr><td class="form">s'habiller</td><td>to get dressed</td></tr>
            <tr><td class="form">se souvenir</td><td>to remember</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        In passé composé, all reflexive verbs use "être": "Je me suis lavé(e)" - and the past participle agrees with the subject!
      </div>
    `;
  },

  renderAvoirExpressions() {
    return `
      <div class="page-section">
        <div class="page-section-title">Physical States</div>
        <p style="margin-bottom: 12px;">French uses "avoir" where English uses "to be":</p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>French</th>
              <th>Literal</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="form">avoir faim</td><td>to have hunger</td><td>to be hungry</td></tr>
            <tr><td class="form">avoir soif</td><td>to have thirst</td><td>to be thirsty</td></tr>
            <tr><td class="form">avoir chaud</td><td>to have hot</td><td>to be hot</td></tr>
            <tr><td class="form">avoir froid</td><td>to have cold</td><td>to be cold</td></tr>
            <tr><td class="form">avoir sommeil</td><td>to have sleepiness</td><td>to be sleepy</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Other Expressions</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td class="form">avoir ... ans</td><td>to be ... years old</td></tr>
            <tr><td class="form">avoir raison</td><td>to be right</td></tr>
            <tr><td class="form">avoir tort</td><td>to be wrong</td></tr>
            <tr><td class="form">avoir peur (de)</td><td>to be afraid (of)</td></tr>
            <tr><td class="form">avoir besoin (de)</td><td>to need</td></tr>
            <tr><td class="form">avoir envie (de)</td><td>to want/feel like</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Don't use "très" with these! Use "très" with adjectives, but "J'ai très faim" works because "faim" acts like an adjective here.
      </div>
    `;
  },

  renderFuturSimple() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation</div>
        <p style="margin-bottom: 12px;"><strong>Infinitive</strong> + avoir endings (for -re verbs, drop the final -e):</p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Pronoun</th>
              <th>Ending</th>
              <th>parler</th>
              <th>finir</th>
              <th>vendre</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>je</td><td class="form">-ai</td><td>parlerai</td><td>finirai</td><td>vendrai</td></tr>
            <tr><td>tu</td><td class="form">-as</td><td>parleras</td><td>finiras</td><td>vendras</td></tr>
            <tr><td>il/elle</td><td class="form">-a</td><td>parlera</td><td>finira</td><td>vendra</td></tr>
            <tr><td>nous</td><td class="form">-ons</td><td>parlerons</td><td>finirons</td><td>vendrons</td></tr>
            <tr><td>vous</td><td class="form">-ez</td><td>parlerez</td><td>finirez</td><td>vendrez</td></tr>
            <tr><td>ils/elles</td><td class="form">-ont</td><td>parleront</td><td>finiront</td><td>vendront</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Irregular Stems</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td>être → ser-</td><td>avoir → aur-</td><td>aller → ir-</td></tr>
            <tr><td>faire → fer-</td><td>venir → viendr-</td><td>voir → verr-</td></tr>
            <tr><td>pouvoir → pourr-</td><td>vouloir → voudr-</td><td>devoir → devr-</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        The future endings are actually the present tense of "avoir"! Je parler-ai = I have to speak (historically).
      </div>
    `;
  },

  renderConditionnel() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation</div>
        <p style="margin-bottom: 12px;"><strong>Future stem</strong> + <strong>imparfait endings</strong>:</p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Pronoun</th>
              <th>Ending</th>
              <th>parler</th>
              <th>avoir</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>je</td><td class="form">-ais</td><td>parlerais</td><td>aurais</td></tr>
            <tr><td>tu</td><td class="form">-ais</td><td>parlerais</td><td>aurais</td></tr>
            <tr><td>il/elle</td><td class="form">-ait</td><td>parlerait</td><td>aurait</td></tr>
            <tr><td>nous</td><td class="form">-ions</td><td>parlerions</td><td>aurions</td></tr>
            <tr><td>vous</td><td class="form">-iez</td><td>parleriez</td><td>auriez</td></tr>
            <tr><td>ils/elles</td><td class="form">-aient</td><td>parleraient</td><td>auraient</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Uses</div>
        <ul style="list-style: disc; padding-left: 20px;">
          <li>Polite requests: <em>Je voudrais un café.</em></li>
          <li>Hypotheticals: <em>Si j'avais de l'argent, j'achèterais une maison.</em></li>
          <li>Future in the past: <em>Il a dit qu'il viendrait.</em></li>
        </ul>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Same irregular stems as future! If you know the future stem, you know the conditional stem.
      </div>
    `;
  },

  renderSubjonctif() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation</div>
        <p style="margin-bottom: 12px;">Take <strong>ils</strong> present stem + endings:</p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Pronoun</th>
              <th>Ending</th>
              <th>parler</th>
              <th>finir</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>que je</td><td class="form">-e</td><td>parle</td><td>finisse</td></tr>
            <tr><td>que tu</td><td class="form">-es</td><td>parles</td><td>finisses</td></tr>
            <tr><td>qu'il/elle</td><td class="form">-e</td><td>parle</td><td>finisse</td></tr>
            <tr><td>que nous</td><td class="form">-ions</td><td>parlions</td><td>finissions</td></tr>
            <tr><td>que vous</td><td class="form">-iez</td><td>parliez</td><td>finissiez</td></tr>
            <tr><td>qu'ils/elles</td><td class="form">-ent</td><td>parlent</td><td>finissent</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Common Triggers</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td class="form">Il faut que...</td><td>It is necessary that...</td></tr>
            <tr><td class="form">Je veux que...</td><td>I want that...</td></tr>
            <tr><td class="form">Il est important que...</td><td>It is important that...</td></tr>
            <tr><td class="form">Je doute que...</td><td>I doubt that...</td></tr>
            <tr><td class="form">Bien que...</td><td>Although...</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        The subjunctive expresses doubt, emotion, necessity, or desire—things that are subjective, not factual!
      </div>
    `;
  },

  renderPrepositions() {
    return `
      <div class="page-section">
        <div class="page-section-title">Location Prepositions</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td class="form">à</td><td>at, to, in</td><td>Je vais à Paris.</td></tr>
            <tr><td class="form">de</td><td>from, of</td><td>Je viens de France.</td></tr>
            <tr><td class="form">dans</td><td>in, inside</td><td>Il est dans la maison.</td></tr>
            <tr><td class="form">sur</td><td>on</td><td>Le livre est sur la table.</td></tr>
            <tr><td class="form">sous</td><td>under</td><td>Le chat est sous le lit.</td></tr>
            <tr><td class="form">devant</td><td>in front of</td><td>Elle est devant l'école.</td></tr>
            <tr><td class="form">derrière</td><td>behind</td><td>Il est derrière moi.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Countries & Cities</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td class="form">en</td><td>feminine countries</td><td>en France, en Italie</td></tr>
            <tr><td class="form">au</td><td>masculine countries</td><td>au Canada, au Japon</td></tr>
            <tr><td class="form">aux</td><td>plural countries</td><td>aux États-Unis</td></tr>
            <tr><td class="form">à</td><td>cities</td><td>à Paris, à Londres</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Most countries ending in -e are feminine (la France, l'Italie), except le Mexique, le Mozambique.
      </div>
    `;
  },

  renderContractions() {
    return `
      <div class="page-section">
        <div class="page-section-title">Mandatory Contractions</div>
        <p style="margin-bottom: 12px;"><strong>à</strong> and <strong>de</strong> contract with <strong>le</strong> and <strong>les</strong>:</p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th></th>
              <th>+ le</th>
              <th>+ les</th>
              <th>+ la / l'</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="form">à</td><td class="form">au</td><td class="form">aux</td><td>à la / à l'</td></tr>
            <tr><td class="form">de</td><td class="form">du</td><td class="form">des</td><td>de la / de l'</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Examples</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td>à + le cinéma</td><td>→</td><td class="form">au cinéma</td></tr>
            <tr><td>à + les États-Unis</td><td>→</td><td class="form">aux États-Unis</td></tr>
            <tr><td>de + le professeur</td><td>→</td><td class="form">du professeur</td></tr>
            <tr><td>de + les enfants</td><td>→</td><td class="form">des enfants</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        These contractions are mandatory! "à le" and "de le" are grammatically incorrect in French.
      </div>
    `;
  },

  renderAdverbs() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation from Adjectives</div>
        <p style="margin-bottom: 12px;">Feminine adjective + <strong>-ment</strong>:</p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Adjective (m/f)</th>
              <th>Adverb</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>lent / lente</td><td class="form">lentement</td><td>slowly</td></tr>
            <tr><td>heureux / heureuse</td><td class="form">heureusement</td><td>fortunately</td></tr>
            <tr><td>doux / douce</td><td class="form">doucement</td><td>gently</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Common Irregular Adverbs</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td class="form">bien</td><td>well</td><td>(from bon)</td></tr>
            <tr><td class="form">mal</td><td>badly</td><td>(from mauvais)</td></tr>
            <tr><td class="form">vite</td><td>quickly</td><td>(no adjective form)</td></tr>
            <tr><td class="form">très</td><td>very</td><td></td></tr>
            <tr><td class="form">trop</td><td>too much</td><td></td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Adverbs usually come after the verb in French: "Elle parle lentement" (She speaks slowly).
      </div>
    `;
  },

  renderComparatives() {
    return `
      <div class="page-section">
        <div class="page-section-title">Comparisons</div>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Structure</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>More than</td><td class="form">plus ... que</td><td>Il est plus grand que moi.</td></tr>
            <tr><td>Less than</td><td class="form">moins ... que</td><td>Elle est moins âgée que lui.</td></tr>
            <tr><td>As ... as</td><td class="form">aussi ... que</td><td>Je suis aussi intelligent que toi.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Superlatives</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td class="form">le/la plus...</td><td>the most</td><td>C'est la plus belle.</td></tr>
            <tr><td class="form">le/la moins...</td><td>the least</td><td>C'est le moins cher.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Irregular Forms</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td>bon (good)</td><td class="form">meilleur</td><td>le meilleur</td></tr>
            <tr><td>bien (well)</td><td class="form">mieux</td><td>le mieux</td></tr>
            <tr><td>mauvais (bad)</td><td class="form">pire / plus mauvais</td><td>le pire</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Never use "plus bon" - always use "meilleur". But "plus mauvais" is acceptable alongside "pire".
      </div>
    `;
  },

  renderObjectPronouns() {
    return `
      <div class="page-section">
        <div class="page-section-title">Direct Object Pronouns</div>
        <p style="margin-bottom: 12px;">Replace nouns receiving the action directly:</p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Pronoun</th>
              <th>Meaning</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="form">me</td><td>me</td><td>Il me voit.</td></tr>
            <tr><td class="form">te</td><td>you</td><td>Je te connais.</td></tr>
            <tr><td class="form">le / la / l'</td><td>him/her/it</td><td>Je le mange.</td></tr>
            <tr><td class="form">nous</td><td>us</td><td>Elle nous aime.</td></tr>
            <tr><td class="form">vous</td><td>you</td><td>Je vous entends.</td></tr>
            <tr><td class="form">les</td><td>them</td><td>Il les prend.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Indirect Object Pronouns</div>
        <p style="margin-bottom: 12px;">Replace nouns with "à" (to/for someone):</p>
        <table class="conjugation-table">
          <tbody>
            <tr><td class="form">me</td><td>to me</td><td>Il me parle.</td></tr>
            <tr><td class="form">te</td><td>to you</td><td>Je te donne le livre.</td></tr>
            <tr><td class="form">lui</td><td>to him/her</td><td>Je lui écris.</td></tr>
            <tr><td class="form">nous</td><td>to us</td><td>Elle nous répond.</td></tr>
            <tr><td class="form">vous</td><td>to you</td><td>Je vous téléphone.</td></tr>
            <tr><td class="form">leur</td><td>to them</td><td>Il leur dit bonjour.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Object pronouns go BEFORE the verb: "Je le vois" (I see him), not "Je vois le".
      </div>
    `;
  },

  renderImperative() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation</div>
        <p style="margin-bottom: 12px;">Use tu, nous, or vous forms without the subject pronoun:</p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th></th>
              <th>parler</th>
              <th>finir</th>
              <th>attendre</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>(tu)</td><td class="form">Parle!</td><td class="form">Finis!</td><td class="form">Attends!</td></tr>
            <tr><td>(nous)</td><td class="form">Parlons!</td><td class="form">Finissons!</td><td class="form">Attendons!</td></tr>
            <tr><td>(vous)</td><td class="form">Parlez!</td><td class="form">Finissez!</td><td class="form">Attendez!</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Irregular Imperatives</div>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Verb</th>
              <th>tu</th>
              <th>nous</th>
              <th>vous</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>être</td><td>Sois!</td><td>Soyons!</td><td>Soyez!</td></tr>
            <tr><td>avoir</td><td>Aie!</td><td>Ayons!</td><td>Ayez!</td></tr>
            <tr><td>savoir</td><td>Sache!</td><td>Sachons!</td><td>Sachez!</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        For -ER verbs, drop the -s from tu form: "Parle!" not "Parles!" But add it back before y/en: "Vas-y!"
      </div>
    `;
  },

  renderDemonstratives() {
    return `
      <div class="page-section">
        <div class="page-section-title">Demonstrative Adjectives</div>
        <p style="margin-bottom: 12px;">Used before nouns to mean "this/that/these/those":</p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Gender/Number</th>
              <th>Form</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Masculine singular</td><td class="form">ce</td><td>ce livre (this book)</td></tr>
            <tr><td>Masc. sing. (before vowel)</td><td class="form">cet</td><td>cet homme (this man)</td></tr>
            <tr><td>Feminine singular</td><td class="form">cette</td><td>cette maison (this house)</td></tr>
            <tr><td>All plurals</td><td class="form">ces</td><td>ces livres (these books)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">This vs That (-ci / -là)</div>
        <p style="margin-bottom: 12px;">Add suffix to noun to distinguish proximity:</p>
        <table class="conjugation-table">
          <tbody>
            <tr><td>ce livre<strong>-ci</strong></td><td>this book (here)</td></tr>
            <tr><td>ce livre<strong>-là</strong></td><td>that book (there)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        "Cet" is only used before masculine singular nouns starting with a vowel or silent h.
      </div>
    `;
  },

  renderPartitiveArticles() {
    return `
      <div class="page-section">
        <div class="page-section-title">Partitive Articles</div>
        <p style="margin-bottom: 12px;">Used for "some" or unspecified quantities:</p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Gender</th>
              <th>Form</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Masculine</td><td class="form">du</td><td>du pain (some bread)</td></tr>
            <tr><td>Feminine</td><td class="form">de la</td><td>de la soupe (some soup)</td></tr>
            <tr><td>Before vowel</td><td class="form">de l'</td><td>de l'eau (some water)</td></tr>
            <tr><td>Plural</td><td class="form">des</td><td>des légumes (some vegetables)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">In Negative Sentences</div>
        <p style="margin-bottom: 12px;">All partitives become <strong>de/d'</strong> after negation:</p>
        <table class="conjugation-table">
          <tbody>
            <tr><td>J'ai du temps.</td><td>Je n'ai pas <strong>de</strong> temps.</td></tr>
            <tr><td>Il boit de l'eau.</td><td>Il ne boit pas <strong>d'</strong>eau.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        After expressions of quantity (beaucoup, peu, assez, trop), always use <strong>de</strong>: "beaucoup de pain".
      </div>
    `;
  },

  renderIlYA() {
    return `
      <div class="page-section">
        <div class="page-section-title">Meaning 1: "There is / There are"</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td>Il y a un problème.</td><td>There is a problem.</td></tr>
            <tr><td>Il y a trois chats.</td><td>There are three cats.</td></tr>
            <tr><td>Il y a beaucoup de monde.</td><td>There are a lot of people.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Meaning 2: "Ago"</div>
        <p style="margin-bottom: 12px;">Placed <strong>after</strong> time expression:</p>
        <table class="conjugation-table">
          <tbody>
            <tr><td>Il y a deux jours...</td><td>Two days ago...</td></tr>
            <tr><td>Il y a une semaine...</td><td>A week ago...</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        In spoken French, "il y a" often becomes "y'a" — "Y'a quelqu'un?" (Is anyone there?)
      </div>
    `;
  },

  renderCestVsIlEst() {
    return `
      <div class="page-section">
        <div class="page-section-title">Use C'EST Before:</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td>Noun with article</td><td>C'est <strong>un livre</strong>.</td></tr>
            <tr><td>Proper noun</td><td>C'est <strong>Marie</strong>.</td></tr>
            <tr><td>Pronoun</td><td>C'est <strong>moi</strong>.</td></tr>
            <tr><td>Modified adjective</td><td>C'est <strong>très beau</strong>.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Use IL EST Before:</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td>Adjective alone</td><td>Il est <strong>grand</strong>.</td></tr>
            <tr><td>Profession (no article)</td><td>Il est <strong>médecin</strong>.</td></tr>
            <tr><td>Nationality (no article)</td><td>Elle est <strong>française</strong>.</td></tr>
            <tr><td>Time</td><td>Il est <strong>midi</strong>.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        For general statements, use "c'est": "C'est vrai" (That's true), "C'est possible" (It's possible).
      </div>
    `;
  },

  renderTimeExpressions() {
    return `
      <div class="page-section">
        <div class="page-section-title">DEPUIS (since/for - ongoing)</div>
        <p style="margin-bottom: 12px;">Action continues to present. Use with <strong>present tense</strong>:</p>
        <table class="conjugation-table">
          <tbody>
            <tr><td>J'habite ici <strong>depuis</strong> 2020.</td><td>I've lived here since 2020.</td></tr>
            <tr><td>Elle travaille <strong>depuis</strong> trois heures.</td><td>She's been working for 3 hours.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">PENDANT (during/for - completed)</div>
        <p style="margin-bottom: 12px;">Defined duration, now finished:</p>
        <table class="conjugation-table">
          <tbody>
            <tr><td>J'ai dormi <strong>pendant</strong> huit heures.</td><td>I slept for 8 hours.</td></tr>
            <tr><td>Il a plu <strong>pendant</strong> trois jours.</td><td>It rained for 3 days.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        "Depuis" triggers present tense in French where English uses past perfect!
      </div>
    `;
  },

  renderPlusQueParfait() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation</div>
        <p style="margin-bottom: 12px;"><strong>Imparfait of avoir/être</strong> + <strong>past participle</strong>:</p>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>with avoir</th>
              <th>with être</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>je</td><td>j'avais mangé</td><td>j'étais allé(e)</td></tr>
            <tr><td>tu</td><td>tu avais mangé</td><td>tu étais allé(e)</td></tr>
            <tr><td>il/elle</td><td>il avait mangé</td><td>elle était allée</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">When to Use</div>
        <p>For actions completed <strong>before</strong> another past action:</p>
        <p style="margin-top: 8px;"><em>Quand je suis arrivé, il <strong>avait déjà mangé</strong>.</em></p>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Same verbs use être as in passé composé (DR MRS VANDERTRAMP + reflexives).
      </div>
    `;
  },

  renderRelativePronouns() {
    return `
      <div class="page-section">
        <div class="page-section-title">The Four Main Relative Pronouns</div>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Pronoun</th>
              <th>Function</th>
              <th>English</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="form">qui</td><td>Subject</td><td>who, which, that</td></tr>
            <tr><td class="form">que</td><td>Direct object</td><td>whom, which, that</td></tr>
            <tr><td class="form">dont</td><td>Replaces de + noun</td><td>whose, of which</td></tr>
            <tr><td class="form">où</td><td>Place or time</td><td>where, when</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">QUI vs QUE</div>
        <p><strong>QUI</strong> = followed by verb (subject)</p>
        <p><strong>QUE</strong> = followed by subject (object)</p>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        "Que" contracts to "qu'" before a vowel. "Qui" never contracts.
      </div>
    `;
  },

  renderYAndEn() {
    return `
      <div class="page-section">
        <div class="page-section-title">Y - Replaces "à + thing/place"</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td>Je vais <strong>à Paris</strong>.</td><td>J'<strong>y</strong> vais.</td></tr>
            <tr><td>Elle pense <strong>à son travail</strong>.</td><td>Elle <strong>y</strong> pense.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">EN - Replaces "de + thing" or quantities</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td>Je veux <strong>du pain</strong>.</td><td>J'<strong>en</strong> veux.</td></tr>
            <tr><td>J'ai <strong>trois pommes</strong>.</td><td>J'<strong>en</strong> ai trois.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Y and EN go before the verb: "J'y vais", "J'en veux".
      </div>
    `;
  },

  renderPassiveVoice() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation</div>
        <p style="margin-bottom: 12px;"><strong>être</strong> + <strong>past participle</strong> (agrees with subject):</p>
        <table class="conjugation-table">
          <tbody>
            <tr><td>Active: On écrit le livre.</td><td>Passive: Le livre <strong>est écrit</strong>.</td></tr>
            <tr><td>Active: On a écrit le livre.</td><td>Passive: Le livre <strong>a été écrit</strong>.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Agent with "par"</div>
        <p>Le livre a été écrit <strong>par Victor Hugo</strong>.</p>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        French often prefers active voice with "on": "On parle français ici" instead of "Le français est parlé ici".
      </div>
    `;
  },

  renderIndirectSpeech() {
    return `
      <div class="page-section">
        <div class="page-section-title">Basic Structure</div>
        <p style="margin-bottom: 12px;">Direct → Indirect with <strong>que</strong>:</p>
        <table class="conjugation-table">
          <tbody>
            <tr><td>Il dit: "Je suis fatigué."</td><td>Il dit <strong>qu'</strong>il est fatigué.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Tense Changes (past reporting)</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td>Présent</td><td>→</td><td>Imparfait</td></tr>
            <tr><td>Passé composé</td><td>→</td><td>Plus-que-parfait</td></tr>
            <tr><td>Futur</td><td>→</td><td>Conditionnel</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Pronouns also change: "mon" → "son", "je" → "il/elle", "ici" → "là".
      </div>
    `;
  },

  renderSiClauses() {
    return `
      <div class="page-section">
        <div class="page-section-title">Si Clause Types</div>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Si clause</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1 (Real)</td><td class="form">Présent</td><td>Présent/Futur/Impératif</td></tr>
            <tr><td>2 (Hypothetical)</td><td class="form">Imparfait</td><td>Conditionnel présent</td></tr>
            <tr><td>3 (Impossible)</td><td class="form">Plus-que-parfait</td><td>Conditionnel passé</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Examples</div>
        <table class="conjugation-table">
          <tbody>
            <tr><td>Si tu <strong>viens</strong>, je <strong>serai</strong> content.</td><td>Type 1</td></tr>
            <tr><td>Si j'<strong>avais</strong> de l'argent, j'<strong>achèterais</strong> une maison.</td><td>Type 2</td></tr>
            <tr><td>Si j'<strong>avais su</strong>, je <strong>serais venu</strong>.</td><td>Type 3</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        NEVER use futur or conditionnel after "si"! "Si j'aurais" is WRONG. Always: "Si j'avais..."
      </div>
    `;
  },

  // ===================================================
  // Lore Rendering
  // ===================================================

  renderLore(era) {
    const loreDetails = {
      ancients: {
        sections: [
          { title: "What We Know", content: "The Ancients predated Verandum by over a thousand years. They constructed Lurenium using techniques that remain beyond modern understanding." },
          { title: "What Remains Unknown", content: "The purpose of Lurenium. The nature of what lies beneath it. The cause of the Ancients' disappearance." }
        ],
        tip: "Ancient relics are written in an archaic form of the language. Advanced grammar knowledge may be required."
      },
      silence: {
        sections: [
          { title: "The Collapse", content: "The Ancient civilization ended within a single generation. Cities that had thrived for centuries were abandoned." },
          { title: "The Wandering Years", content: "For five hundred years, scattered tribes roamed the land without unity." }
        ],
        tip: "Scholars continue to debate the cause of the Silence."
      },
      founding: {
        sections: [
          { title: "Unification", content: "Approximately five hundred years ago, tribal leaders formed a coalition that became the Kingdom of Verandum." },
          { title: "Rediscovery of Lurenium", content: "The founders discovered Lurenium still standing, preserved despite centuries of abandonment." }
        ],
        tip: "The founding documents are preserved in the Royal Archives at Ingregaard."
      },
      faith: {
        sections: [
          { title: "The Order of Dawn", content: "One century after the founding, the Order of Dawn was established." },
          { title: "Original Teachings", content: "The earliest Dawn Prayer Books contain passages emphasizing humility and moral accountability." }
        ],
        tip: "Original Dawn Prayer Books still exist in hidden locations."
      },
      golden_age: {
        sections: [
          { title: "Three Centuries of Prosperity", content: "From the establishment of the Order until the rise of King Dran's lineage, Verandum experienced sustained prosperity." },
          { title: "The Royal Archives", content: "This era produced the most comprehensive historical records in Verandum's history." }
        ],
        tip: "Golden Age records provide the clearest picture of what Verandum once was."
      },
      king_dran: {
        sections: [
          { title: "The Reign of King Dran", content: "King Dran ruled for seventy years. Historical accounts describe him as fair, wise, and respected." },
          { title: "The Two Princes", content: "Hermeau, the elder son, was known for his ambition. Layne, the younger, was characterized by careful observation." }
        ],
        tip: "Castle servants from this period have knowledge of events that occurred in the lower chambers."
      },
      the_war: {
        sections: [
          { title: "The Official Account", content: "According to royal records, external forces attacked Verandum. Prince Hermeau led the kingdom to victory." },
          { title: "Contradicting Evidence", content: "Witness accounts suggest the Corruption originated within Verandum, not beyond its borders." }
        ],
        tip: "War journals contain accounts that differ significantly from official histories."
      },
      exile: {
        sections: [
          { title: "Consolidation of Power", content: "Following his assumption of the throne, Hermeau acted decisively. Layne was exiled on charges of cowardice." },
          { title: "Preserved Evidence", content: "Before his exile, Layne concealed documents throughout the kingdom." }
        ],
        tip: "Layne's hidden letters are scattered across Verandum."
      }
    };

    const details = loreDetails[era];
    if (!details) {
      return '<p>Lore details not available for this era.</p>';
    }

    let html = '';
    details.sections.forEach(section => {
      html += `
        <div class="page-section">
          <div class="page-section-title">${section.title}</div>
          <p style="line-height: 1.6;">${section.content}</p>
        </div>
      `;
    });

    html += `
      <div class="grammar-tip">
        <span class="grammar-tip-icon">📜</span>
        ${details.tip}
      </div>
    `;

    return html;
  }
};

// =====================================================
// Global Exports
// =====================================================

window.FRENCH_SPELLBOOK = FRENCH_SPELLBOOK;
window.FRENCH_SPELLBOOK_CATEGORIES = FRENCH_SPELLBOOK_CATEGORIES;
window.FRENCH_ARTIFACT_ERAS = FRENCH_ARTIFACT_ERAS;
window.FrenchSpellbookRenderer = FrenchSpellbookRenderer;

console.log('[french/spellbook.js] French spellbook data loaded with', Object.keys(FRENCH_SPELLBOOK).length, 'pages');
