// ByteQuest - Greek Vocabulary Data
// Modern Greek (Ελληνικά)
// Pure data file - question generation logic is in js/systems/QuestionSystem.js

const GREEK_VOCAB = {
  // Meta info
  _meta: {
    language: "greek",
    languageCode: "el",
    nativeName: "Ελληνικά",
    version: "1.1.0"
  },

  // =====================================================
  // ALPHABET - Greek Letters (for lesson quizzes)
  // =====================================================
  alphabet: [
    { greek: "Α α", english: "Alpha", romanized: "A a", hint: "Like 'a' in 'father'" },
    { greek: "Β β", english: "Beta", romanized: "V v", hint: "Like 'v' in 'vote'" },
    { greek: "Γ γ", english: "Gamma", romanized: "G g/Y y", hint: "Like 'y' before e/i, 'g' elsewhere" },
    { greek: "Δ δ", english: "Delta", romanized: "D d/Th th", hint: "Like 'th' in 'this'" },
    { greek: "Ε ε", english: "Epsilon", romanized: "E e", hint: "Like 'e' in 'bed'" },
    { greek: "Ζ ζ", english: "Zeta", romanized: "Z z", hint: "Like 'z' in 'zoo'" },
    { greek: "Η η", english: "Eta", romanized: "I i", hint: "Like 'ee' in 'see'" },
    { greek: "Θ θ", english: "Theta", romanized: "Th th", hint: "Like 'th' in 'think'" },
    { greek: "Ι ι", english: "Iota", romanized: "I i", hint: "Like 'ee' in 'see'" },
    { greek: "Κ κ", english: "Kappa", romanized: "K k", hint: "Like 'k' in 'kite'" },
    { greek: "Λ λ", english: "Lambda", romanized: "L l", hint: "Like 'l' in 'love'" },
    { greek: "Μ μ", english: "Mu", romanized: "M m", hint: "Like 'm' in 'mother'" },
    { greek: "Ν ν", english: "Nu", romanized: "N n", hint: "Like 'n' in 'no'" },
    { greek: "Ξ ξ", english: "Xi", romanized: "X x/Ks ks", hint: "Like 'x' in 'box'" },
    { greek: "Ο ο", english: "Omicron", romanized: "O o", hint: "Like 'o' in 'pot'" },
    { greek: "Π π", english: "Pi", romanized: "P p", hint: "Like 'p' in 'pot'" },
    { greek: "Ρ ρ", english: "Rho", romanized: "R r", hint: "Rolled 'r'" },
    { greek: "Σ σ/ς", english: "Sigma", romanized: "S s", hint: "Like 's' in 'sun' (ς at end of word)" },
    { greek: "Τ τ", english: "Tau", romanized: "T t", hint: "Like 't' in 'top'" },
    { greek: "Υ υ", english: "Upsilon", romanized: "I i/Y y", hint: "Like 'ee' in 'see'" },
    { greek: "Φ φ", english: "Phi", romanized: "F f", hint: "Like 'f' in 'fun'" },
    { greek: "Χ χ", english: "Chi", romanized: "Ch ch/H h", hint: "Like 'ch' in Scottish 'loch'" },
    { greek: "Ψ ψ", english: "Psi", romanized: "Ps ps", hint: "Like 'ps' in 'lips'" },
    { greek: "Ω ω", english: "Omega", romanized: "O o", hint: "Like 'o' in 'pot' (same as omicron)" }
  ],

  // =====================================================
  // VOWELS - Greek Vowel Letters
  // =====================================================
  vowels: [
    { greek: "Α α", english: "Alpha (vowel)", romanized: "A a", hint: "Open vowel, like 'a' in 'father'" },
    { greek: "Ε ε", english: "Epsilon (vowel)", romanized: "E e", hint: "Short 'e', like 'e' in 'bed'" },
    { greek: "Η η", english: "Eta (vowel)", romanized: "I i", hint: "Sounds like 'ee' in modern Greek" },
    { greek: "Ι ι", english: "Iota (vowel)", romanized: "I i", hint: "Like 'ee' in 'see'" },
    { greek: "Ο ο", english: "Omicron (vowel)", romanized: "O o", hint: "Short 'o', like 'o' in 'pot'" },
    { greek: "Υ υ", english: "Upsilon (vowel)", romanized: "I i", hint: "Sounds like 'ee' in modern Greek" },
    { greek: "Ω ω", english: "Omega (vowel)", romanized: "O o", hint: "Same sound as omicron in modern Greek" }
  ],

  // =====================================================
  // DIGRAPHS - Letter Combinations
  // =====================================================
  digraphs: [
    { greek: "αι", english: "ai (sounds like 'e')", romanized: "e", hint: "Like 'e' in 'bed'" },
    { greek: "ει", english: "ei (sounds like 'ee')", romanized: "i", hint: "Like 'ee' in 'see'" },
    { greek: "οι", english: "oi (sounds like 'ee')", romanized: "i", hint: "Like 'ee' in 'see'" },
    { greek: "υι", english: "yi (sounds like 'ee')", romanized: "i", hint: "Like 'ee' in 'see'" },
    { greek: "ου", english: "ou (sounds like 'oo')", romanized: "ou", hint: "Like 'oo' in 'food'" },
    { greek: "αυ", english: "av/af", romanized: "av/af", hint: "'av' before vowels, 'af' before voiceless consonants" },
    { greek: "ευ", english: "ev/ef", romanized: "ev/ef", hint: "'ev' before vowels, 'ef' before voiceless consonants" },
    { greek: "μπ", english: "mp (sounds like 'b')", romanized: "b", hint: "Like 'b' in 'boy' at start of word" },
    { greek: "ντ", english: "nt (sounds like 'd')", romanized: "d/nd", hint: "Like 'd' at start, 'nd' in middle" },
    { greek: "γκ", english: "gk (sounds like 'g')", romanized: "g/ng", hint: "Like 'g' at start, 'ng' in middle" },
    { greek: "γγ", english: "gg (sounds like 'ng')", romanized: "ng", hint: "Like 'ng' in 'sing'" },
    { greek: "τσ", english: "ts", romanized: "ts", hint: "Like 'ts' in 'bits'" },
    { greek: "τζ", english: "tz (sounds like 'dz')", romanized: "dz", hint: "Like 'ds' in 'beds'" }
  ],

  // =====================================================
  // BASICS - Greetings & Essentials
  // =====================================================
  basics: {
    greetings: [
      { greek: "Γεια σου", english: "Hello (informal)", romanized: "Yia sou", hint: "Literally 'health to you'" },
      { greek: "Γεια σας", english: "Hello (formal)", romanized: "Yia sas", hint: "Use with strangers or elders" },
      { greek: "Καλημέρα", english: "Good morning", romanized: "Kaliméra", hint: "Kali (good) + mera (day)" },
      { greek: "Καλησπέρα", english: "Good evening", romanized: "Kalispéra", hint: "Use after noon" },
      { greek: "Καληνύχτα", english: "Good night", romanized: "Kaliníhta", hint: "When leaving or going to bed" },
      { greek: "Αντίο", english: "Goodbye", romanized: "Adío", hint: "More formal farewell" },
      { greek: "Ευχαριστώ", english: "Thank you", romanized: "Efharistó", hint: "Root of 'Eucharist'" },
      { greek: "Παρακαλώ", english: "Please / You're welcome", romanized: "Parakaló", hint: "Double duty word" },
      { greek: "Ναι", english: "Yes", romanized: "Ne", hint: "Sounds like 'no' but means yes!" },
      { greek: "Όχι", english: "No", romanized: "Óhi", hint: "The 'χ' is a rough 'h' sound" },
      { greek: "Συγγνώμη", english: "Sorry / Excuse me", romanized: "Signómi", hint: "For apologies" },
      { greek: "Τίποτα", english: "Nothing / You're welcome", romanized: "Típota", hint: "Like 'de nada'" }
    ],
    introductions: [
      { greek: "Με λένε...", english: "My name is...", romanized: "Me léne...", hint: "Literally 'they call me'" },
      { greek: "Πώς σε λένε;", english: "What's your name? (informal)", romanized: "Pos se léne?", hint: "How do they call you?" },
      { greek: "Πώς σας λένε;", english: "What's your name? (formal)", romanized: "Pos sas léne?", hint: "Formal version" },
      { greek: "Χαίρω πολύ", english: "Nice to meet you", romanized: "Héro polí", hint: "I rejoice much" },
      { greek: "Είμαι...", english: "I am...", romanized: "Íme...", hint: "Basic identity" },
      { greek: "Είμαι από...", english: "I'm from...", romanized: "Íme apó...", hint: "For origin" },
      { greek: "Μιλάω ελληνικά", english: "I speak Greek", romanized: "Miláo elliniká", hint: "Useful phrase!" },
      { greek: "Δεν καταλαβαίνω", english: "I don't understand", romanized: "Den katalavéno", hint: "Very useful!" }
    ],
    essentials: [
      { greek: "Πού είναι...;", english: "Where is...?", romanized: "Pou íne...?", hint: "Location question" },
      { greek: "Τι είναι αυτό;", english: "What is this?", romanized: "Ti íne aftó?", hint: "Pointing at something" },
      { greek: "Πόσο κάνει;", english: "How much is it?", romanized: "Póso káni?", hint: "For shopping" },
      { greek: "Θέλω...", english: "I want...", romanized: "Thélo...", hint: "Basic request" },
      { greek: "Μπορώ να...;", english: "Can I...?", romanized: "Boró na...?", hint: "Asking permission" },
      { greek: "Βοήθεια!", english: "Help!", romanized: "Voíthia!", hint: "Emergency word" }
    ]
  },

  // =====================================================
  // FAMILY - Οικογένεια
  // =====================================================
  family: {
    beginner: [
      { greek: "η οικογένεια", english: "the family", romanized: "i ikoyénia", gender: "f", article: "η", hint: "'Oikos' means house" },
      { greek: "η μητέρα", english: "the mother", romanized: "i mitéra", gender: "f", article: "η", hint: "Root of 'maternal'" },
      { greek: "ο πατέρας", english: "the father", romanized: "o patéras", gender: "m", article: "ο", hint: "Root of 'paternal'" },
      { greek: "η μαμά", english: "mom", romanized: "i mamá", gender: "f", article: "η", hint: "Informal, like English" },
      { greek: "ο μπαμπάς", english: "dad", romanized: "o babás", gender: "m", article: "ο", hint: "Informal" },
      { greek: "η αδερφή", english: "the sister", romanized: "i aderfí", gender: "f", article: "η", hint: "Same root as 'adelphos'" },
      { greek: "ο αδερφός", english: "the brother", romanized: "o aderfós", gender: "m", article: "ο", hint: "'Philadelphia' = brotherly love" },
      { greek: "η κόρη", english: "the daughter", romanized: "i kóri", gender: "f", article: "η", hint: "Also means 'girl'" },
      { greek: "ο γιος", english: "the son", romanized: "o yiós", gender: "m", article: "ο", hint: "Short word" },
      { greek: "το παιδί", english: "the child", romanized: "to pedí", gender: "n", article: "το", hint: "Root of 'pediatric'" },
      { greek: "η γιαγιά", english: "the grandmother", romanized: "i yiayiá", gender: "f", article: "η", hint: "Affectionate term" },
      { greek: "ο παππούς", english: "the grandfather", romanized: "o pappoús", gender: "m", article: "ο", hint: "Like 'papa'" }
    ],
    intermediate: [
      { greek: "οι γονείς", english: "the parents", romanized: "i gonís", gender: "m", article: "οι", hint: "Root of 'genesis'" },
      { greek: "τα παιδιά", english: "the children", romanized: "ta pediá", gender: "n", article: "τα", hint: "Plural of παιδί" },
      { greek: "ο σύζυγος", english: "the husband", romanized: "o sízigos", gender: "m", article: "ο", hint: "Formal term" },
      { greek: "η σύζυγος", english: "the wife", romanized: "i sízigos", gender: "f", article: "η", hint: "Same word, different article" },
      { greek: "ο άντρας", english: "the man/husband", romanized: "o ándras", gender: "m", article: "ο", hint: "Also means 'husband' casually" },
      { greek: "η γυναίκα", english: "the woman/wife", romanized: "i yinéka", gender: "f", article: "η", hint: "Also means 'wife' casually" },
      { greek: "ο θείος", english: "the uncle", romanized: "o thíos", gender: "m", article: "ο", hint: "Theta sound" },
      { greek: "η θεία", english: "the aunt", romanized: "i thía", gender: "f", article: "η", hint: "Feminine of θείος" },
      { greek: "ο ξάδερφος", english: "the cousin (male)", romanized: "o xáderfos", gender: "m", article: "ο", hint: "Starts with ξ" },
      { greek: "η ξαδέρφη", english: "the cousin (female)", romanized: "i xadérfi", gender: "f", article: "η", hint: "Feminine form" },
      { greek: "ο ανιψιός", english: "the nephew", romanized: "o anipsiós", gender: "m", article: "ο", hint: "Related to niece/nephew" },
      { greek: "η ανιψιά", english: "the niece", romanized: "i anipsiá", gender: "f", article: "η", hint: "Feminine form" }
    ],
    phrases: [
      { greek: "Έχω δύο αδέρφια", english: "I have two siblings", romanized: "Ého dío adérfia" },
      { greek: "Πόσα παιδιά έχεις;", english: "How many children do you have?", romanized: "Pósa pediá éhis?" },
      { greek: "Η οικογένειά μου", english: "My family", romanized: "I ikoyéniá mou" },
      { greek: "Μένω με τους γονείς μου", english: "I live with my parents", romanized: "Méno me tous gonís mou" },
      { greek: "Είμαι παντρεμένος/η", english: "I am married", romanized: "Íme pandreménos/i" }
    ]
  },

  // =====================================================
  // FOOD - Φαγητό
  // =====================================================
  food: {
    beginner: [
      { greek: "το ψωμί", english: "the bread", romanized: "to psomí", gender: "n", article: "το", hint: "Starts with ψ (ps)" },
      { greek: "το νερό", english: "the water", romanized: "to neró", gender: "n", article: "το", hint: "Essential word" },
      { greek: "το κρασί", english: "the wine", romanized: "to krasí", gender: "n", article: "το", hint: "Greece loves wine" },
      { greek: "η μπύρα", english: "the beer", romanized: "i bíra", gender: "f", article: "η", hint: "μπ makes 'b' sound" },
      { greek: "ο καφές", english: "the coffee", romanized: "o kafés", gender: "m", article: "ο", hint: "Greek coffee is strong" },
      { greek: "το τσάι", english: "the tea", romanized: "to tsái", gender: "n", article: "το", hint: "τσ makes 'ts' sound" },
      { greek: "το γάλα", english: "the milk", romanized: "to gála", gender: "n", article: "το", hint: "Root of 'galaxy'" },
      { greek: "το τυρί", english: "the cheese", romanized: "to tirí", gender: "n", article: "το", hint: "Feta is famous" },
      { greek: "το κρέας", english: "the meat", romanized: "to kréas", gender: "n", article: "το", hint: "General meat term" },
      { greek: "το ψάρι", english: "the fish", romanized: "to psári", gender: "n", article: "το", hint: "Another ψ word" },
      { greek: "το αυγό", english: "the egg", romanized: "to avgó", gender: "n", article: "το", hint: "αυ sounds like 'av'" },
      { greek: "η σαλάτα", english: "the salad", romanized: "i saláta", gender: "f", article: "η", hint: "Greek salad is famous" }
    ],
    intermediate: [
      { greek: "το λάδι", english: "the oil", romanized: "to ládi", gender: "n", article: "το", hint: "Olive oil is essential" },
      { greek: "η ελιά", english: "the olive", romanized: "i eliá", gender: "f", article: "η", hint: "Greece produces lots" },
      { greek: "η ντομάτα", english: "the tomato", romanized: "i domáta", gender: "f", article: "η", hint: "ντ makes 'd' sound" },
      { greek: "το αγγούρι", english: "the cucumber", romanized: "to angúri", gender: "n", article: "το", hint: "γγ makes 'ng' sound" },
      { greek: "η πατάτα", english: "the potato", romanized: "i patáta", gender: "f", article: "η", hint: "Similar to English" },
      { greek: "το ρύζι", english: "the rice", romanized: "to rízi", gender: "n", article: "το", hint: "Common side dish" },
      { greek: "τα ζυμαρικά", english: "the pasta", romanized: "ta zimariká", gender: "n", article: "τα", hint: "Always plural" },
      { greek: "το κοτόπουλο", english: "the chicken", romanized: "to kotópoulo", gender: "n", article: "το", hint: "Common meat" },
      { greek: "το αρνί", english: "the lamb", romanized: "to arní", gender: "n", article: "το", hint: "Popular in Greece" },
      { greek: "ο μουσακάς", english: "the moussaka", romanized: "o mousakás", gender: "m", article: "ο", hint: "Famous Greek dish" },
      { greek: "η σουβλάκι", english: "the souvlaki", romanized: "i souvláki", gender: "n", article: "το", hint: "Greek street food" },
      { greek: "η φέτα", english: "feta cheese", romanized: "i féta", gender: "f", article: "η", hint: "Greek specialty" }
    ],
    phrases: [
      { greek: "Έχω πείνα", english: "I'm hungry", romanized: "Ého pína", hint: "Literally 'I have hunger'" },
      { greek: "Έχω δίψα", english: "I'm thirsty", romanized: "Ého dípsa", hint: "Literally 'I have thirst'" },
      { greek: "Τι θα πάρετε;", english: "What will you have?", romanized: "Ti tha párete?", hint: "Waiter asking" },
      { greek: "Θα ήθελα...", english: "I would like...", romanized: "Tha íthela...", hint: "Polite request" },
      { greek: "Τον λογαριασμό, παρακαλώ", english: "The bill, please", romanized: "Ton logariasmó, parakaló" },
      { greek: "Είναι νόστιμο!", english: "It's delicious!", romanized: "Íne nóstimo!", hint: "Compliment the food" },
      { greek: "Καλή όρεξη!", english: "Bon appétit!", romanized: "Kalí órexi!", hint: "Said before eating" }
    ]
  },

  // =====================================================
  // NUMBERS - Αριθμοί
  // =====================================================
  numbers: {
    cardinal: [
      { greek: "ένα", english: "one", romanized: "éna", hint: "Neuter form; ένας (m), μία (f)" },
      { greek: "δύο", english: "two", romanized: "dío", hint: "Same for all genders" },
      { greek: "τρία", english: "three", romanized: "tría", hint: "Neuter; τρεις for m/f" },
      { greek: "τέσσερα", english: "four", romanized: "tésera", hint: "Neuter; τέσσερις for m/f" },
      { greek: "πέντε", english: "five", romanized: "pénde", hint: "Same for all" },
      { greek: "έξι", english: "six", romanized: "éxi", hint: "Same for all" },
      { greek: "επτά", english: "seven", romanized: "eptá", hint: "Also εφτά colloquially" },
      { greek: "οκτώ", english: "eight", romanized: "októ", hint: "Also οχτώ colloquially" },
      { greek: "εννέα", english: "nine", romanized: "enéa", hint: "Also εννιά colloquially" },
      { greek: "δέκα", english: "ten", romanized: "déka", hint: "Root of 'decade'" },
      { greek: "είκοσι", english: "twenty", romanized: "íkosi", hint: "No pattern here" },
      { greek: "εκατό", english: "hundred", romanized: "ekató", hint: "Root of 'hectare'" },
      { greek: "χίλια", english: "thousand", romanized: "hília", hint: "Root of 'kilo'" }
    ],
    ordinal: [
      { greek: "πρώτος", english: "first", romanized: "prótos", hint: "Root of 'prototype'" },
      { greek: "δεύτερος", english: "second", romanized: "défteros", hint: "Like 'deuterium'" },
      { greek: "τρίτος", english: "third", romanized: "trítos", hint: "From τρία" },
      { greek: "τέταρτος", english: "fourth", romanized: "tétartos", hint: "From τέσσερα" },
      { greek: "πέμπτος", english: "fifth", romanized: "pémptos", hint: "From πέντε" }
    ]
  },

  // =====================================================
  // COLORS - Χρώματα
  // =====================================================
  colors: {
    beginner: [
      { greek: "άσπρο", english: "white", romanized: "áspro", gender: "n", hint: "Neuter adjective" },
      { greek: "μαύρο", english: "black", romanized: "mávro", gender: "n", hint: "Neuter adjective" },
      { greek: "κόκκινο", english: "red", romanized: "kókino", gender: "n", hint: "Double κ" },
      { greek: "μπλε", english: "blue", romanized: "ble", gender: "n", hint: "Indeclinable" },
      { greek: "πράσινο", english: "green", romanized: "prásino", gender: "n", hint: "Like 'prasino'" },
      { greek: "κίτρινο", english: "yellow", romanized: "kítrino", gender: "n", hint: "Like 'citrus'" },
      { greek: "πορτοκαλί", english: "orange", romanized: "portokalí", gender: "n", hint: "Like the fruit" },
      { greek: "ροζ", english: "pink", romanized: "roz", gender: "n", hint: "Indeclinable" },
      { greek: "γκρι", english: "grey", romanized: "gri", gender: "n", hint: "Indeclinable" },
      { greek: "καφέ", english: "brown", romanized: "kafé", gender: "n", hint: "Like coffee color" }
    ]
  },

  // =====================================================
  // PLACES - Τόποι (for Verandum locations)
  // =====================================================
  places: {
    beginner: [
      { greek: "το σπίτι", english: "the house", romanized: "to spíti", gender: "n", article: "το", hint: "Home" },
      { greek: "το χωριό", english: "the village", romanized: "to horió", gender: "n", article: "το", hint: "Like Dawnmere" },
      { greek: "η πόλη", english: "the city", romanized: "i póli", gender: "f", article: "η", hint: "Root of 'polis'" },
      { greek: "η αγορά", english: "the market", romanized: "i agorá", gender: "f", article: "η", hint: "Root of 'agora'" },
      { greek: "το καταστημα", english: "the shop", romanized: "to katástima", gender: "n", article: "το", hint: "Store" },
      { greek: "η ταβέρνα", english: "the tavern", romanized: "i tavérna", gender: "f", article: "η", hint: "Greek restaurant" },
      { greek: "ο δρόμος", english: "the road", romanized: "o drómos", gender: "m", article: "ο", hint: "Root of 'hippodrome'" },
      { greek: "το δάσος", english: "the forest", romanized: "to dásos", gender: "n", article: "το", hint: "Woods" },
      { greek: "το βουνό", english: "the mountain", romanized: "to vounó", gender: "n", article: "το", hint: "Common in Greece" },
      { greek: "η θάλασσα", english: "the sea", romanized: "i thálasa", gender: "f", article: "η", hint: "Root of 'thalassic'" },
      { greek: "η εκκλησία", english: "the church", romanized: "i eklisía", gender: "f", article: "η", hint: "Root of 'ecclesiastic'" },
      { greek: "ο ναός", english: "the temple", romanized: "o naós", gender: "m", article: "ο", hint: "Ancient Greek temples" }
    ],
    intermediate: [
      { greek: "η φάρμα", english: "the farm", romanized: "i fárma", gender: "f", article: "η", hint: "Like Haari Fields" },
      { greek: "τα χωράφια", english: "the fields", romanized: "ta horáfia", gender: "n", article: "τα", hint: "Farm fields" },
      { greek: "το λιμάνι", english: "the port", romanized: "to limáni", gender: "n", article: "το", hint: "Harbor" },
      { greek: "η βιβλιοθήκη", english: "the library", romanized: "i vivliothíki", gender: "f", article: "η", hint: "Root of 'bibliography'" },
      { greek: "το παλάτι", english: "the palace", romanized: "to paláti", gender: "n", article: "το", hint: "Royal residence" },
      { greek: "το κάστρο", english: "the castle", romanized: "to kástro", gender: "n", article: "το", hint: "Fortification" },
      { greek: "η σπηλιά", english: "the cave", romanized: "i spiliá", gender: "f", article: "η", hint: "Underground" },
      { greek: "τα ερείπια", english: "the ruins", romanized: "ta erípea", gender: "n", article: "τα", hint: "Ancient remains" }
    ]
  },

  // =====================================================
  // CREATURES - Πλάσματα (for game creatures)
  // =====================================================
  creatures: {
    animals: [
      { greek: "ο σκύλος", english: "the dog", romanized: "o skílos", gender: "m", article: "ο", hint: "Common pet" },
      { greek: "η γάτα", english: "the cat", romanized: "i gáta", gender: "f", article: "η", hint: "Common pet" },
      { greek: "το άλογο", english: "the horse", romanized: "to álogo", gender: "n", article: "το", hint: "For riding" },
      { greek: "η αγελάδα", english: "the cow", romanized: "i ageláda", gender: "f", article: "η", hint: "Farm animal" },
      { greek: "το πρόβατο", english: "the sheep", romanized: "to próvato", gender: "n", article: "το", hint: "For wool" },
      { greek: "η κότα", english: "the hen", romanized: "i kóta", gender: "f", article: "η", hint: "Lays eggs" },
      { greek: "ο λύκος", english: "the wolf", romanized: "o líkos", gender: "m", article: "ο", hint: "Root of 'lycanthropy'" },
      { greek: "η αρκούδα", english: "the bear", romanized: "i arkoúda", gender: "f", article: "η", hint: "Large animal" }
    ],
    fantasy: [
      { greek: "το τέρας", english: "the monster", romanized: "to téras", gender: "n", article: "το", hint: "Root of 'teratology'" },
      { greek: "ο δράκος", english: "the dragon", romanized: "o drákos", gender: "m", article: "ο", hint: "Root of 'Dracula'" },
      { greek: "το φάντασμα", english: "the ghost", romanized: "to fándasma", gender: "n", article: "το", hint: "Root of 'phantom'" },
      { greek: "ο γίγαντας", english: "the giant", romanized: "o yígantas", gender: "m", article: "ο", hint: "Root of 'gigantic'" },
      { greek: "η νεράιδα", english: "the fairy", romanized: "i neráida", gender: "f", article: "η", hint: "Also 'nereid' (sea nymph)" },
      { greek: "ο σκελετός", english: "the skeleton", romanized: "o skeletós", gender: "m", article: "ο", hint: "Root of 'skeleton'" }
    ]
  },

  // =====================================================
  // ACTIONS - Ρήματα (Verbs)
  // =====================================================
  actions: {
    common: [
      { greek: "τρώω", english: "to eat", romanized: "tróo", hint: "Type B verb (-ω)" },
      { greek: "πίνω", english: "to drink", romanized: "píno", hint: "Type A verb" },
      { greek: "κοιμάμαι", english: "to sleep", romanized: "kimáme", hint: "Reflexive verb" },
      { greek: "περπατάω", english: "to walk", romanized: "perpatáo", hint: "Type B verb" },
      { greek: "τρέχω", english: "to run", romanized: "trého", hint: "Type A verb" },
      { greek: "βλέπω", english: "to see", romanized: "vlépo", hint: "Type A verb" },
      { greek: "ακούω", english: "to hear", romanized: "akoúo", hint: "Type A verb" },
      { greek: "διαβάζω", english: "to read", romanized: "diavázo", hint: "Type A verb" },
      { greek: "γράφω", english: "to write", romanized: "gráfo", hint: "Root of 'graph'" },
      { greek: "μαθαίνω", english: "to learn", romanized: "mathéno", hint: "Root of 'mathematics'" },
      { greek: "δουλεύω", english: "to work", romanized: "doulévo", hint: "Type A verb" },
      { greek: "αγοράζω", english: "to buy", romanized: "agorázo", hint: "From 'agora'" },
      { greek: "πουλάω", english: "to sell", romanized: "pouláo", hint: "Type B verb" },
      { greek: "ψάχνω", english: "to search", romanized: "psáhno", hint: "Starts with ψ" },
      { greek: "βρίσκω", english: "to find", romanized: "vrísko", hint: "Type A verb" }
    ],
    combat: [
      { greek: "πολεμάω", english: "to fight", romanized: "poleméo", hint: "Root of 'polemic'" },
      { greek: "επιτίθεμαι", english: "to attack", romanized: "epitítheme", hint: "Reflexive verb" },
      { greek: "αμύνομαι", english: "to defend", romanized: "amínome", hint: "Reflexive verb" },
      { greek: "νικάω", english: "to win", romanized: "nikáo", hint: "Root of 'Nike'" },
      { greek: "χάνω", english: "to lose", romanized: "háno", hint: "Type A verb" },
      { greek: "σκοτώνω", english: "to kill", romanized: "skotóno", hint: "Type A verb" },
      { greek: "προστατεύω", english: "to protect", romanized: "prostatévo", hint: "Type A verb" },
      { greek: "σώζω", english: "to save", romanized: "sózo", hint: "Type A verb" }
    ]
  },

  // =====================================================
  // ADJECTIVES - Επίθετα
  // =====================================================
  adjectives: {
    common: [
      { greek: "καλός", english: "good", romanized: "kalós", hint: "Root of many 'calli-' words" },
      { greek: "κακός", english: "bad", romanized: "kakós", hint: "Root of 'cacophony'" },
      { greek: "μεγάλος", english: "big", romanized: "megálos", hint: "Root of 'mega'" },
      { greek: "μικρός", english: "small", romanized: "mikrós", hint: "Root of 'micro'" },
      { greek: "νέος", english: "new/young", romanized: "néos", hint: "Root of 'neo'" },
      { greek: "παλιός", english: "old (thing)", romanized: "paliós", hint: "For objects" },
      { greek: "γέρος", english: "old (person)", romanized: "géros", hint: "For people" },
      { greek: "ωραίος", english: "beautiful/nice", romanized: "oréos", hint: "Common compliment" },
      { greek: "άσχημος", english: "ugly", romanized: "áshimos", hint: "Opposite of ωραίος" },
      { greek: "δυνατός", english: "strong", romanized: "dinatós", hint: "Root of 'dynamic'" },
      { greek: "αδύναμος", english: "weak", romanized: "adínamos", hint: "Without strength" },
      { greek: "γρήγορος", english: "fast", romanized: "grígoros", hint: "Quick" },
      { greek: "αργός", english: "slow", romanized: "argós", hint: "Opposite of fast" },
      { greek: "εύκολος", english: "easy", romanized: "éfkolos", hint: "Simple" },
      { greek: "δύσκολος", english: "difficult", romanized: "dískolos", hint: "Hard" }
    ]
  },

  // =====================================================
  // TIME - Χρόνος
  // =====================================================
  time: {
    beginner: [
      { greek: "σήμερα", english: "today", romanized: "símera", hint: "This day" },
      { greek: "αύριο", english: "tomorrow", romanized: "ávrio", hint: "Next day" },
      { greek: "χθες", english: "yesterday", romanized: "hthes", hint: "Past day" },
      { greek: "τώρα", english: "now", romanized: "tóra", hint: "This moment" },
      { greek: "μετά", english: "after/later", romanized: "metá", hint: "Root of 'meta'" },
      { greek: "πριν", english: "before", romanized: "prin", hint: "Earlier" },
      { greek: "πάντα", english: "always", romanized: "pánda", hint: "Every time" },
      { greek: "ποτέ", english: "never", romanized: "poté", hint: "No time" },
      { greek: "η μέρα", english: "the day", romanized: "i méra", gender: "f", article: "η", hint: "Daytime" },
      { greek: "η νύχτα", english: "the night", romanized: "i níhta", gender: "f", article: "η", hint: "Nighttime" },
      { greek: "η εβδομάδα", english: "the week", romanized: "i evdomáda", gender: "f", article: "η", hint: "Seven days" },
      { greek: "ο μήνας", english: "the month", romanized: "o mínas", gender: "m", article: "ο", hint: "Part of year" },
      { greek: "ο χρόνος", english: "the year", romanized: "o hrónos", gender: "m", article: "ο", hint: "Root of 'chronology'" }
    ],
    days: [
      { greek: "η Δευτέρα", english: "Monday", romanized: "i Deftéra", gender: "f", hint: "Second day" },
      { greek: "η Τρίτη", english: "Tuesday", romanized: "i Tríti", gender: "f", hint: "Third day" },
      { greek: "η Τετάρτη", english: "Wednesday", romanized: "i Tetárti", gender: "f", hint: "Fourth day" },
      { greek: "η Πέμπτη", english: "Thursday", romanized: "i Pémpti", gender: "f", hint: "Fifth day" },
      { greek: "η Παρασκευή", english: "Friday", romanized: "i Paraskevi", gender: "f", hint: "Preparation day" },
      { greek: "το Σάββατο", english: "Saturday", romanized: "to Sávato", gender: "n", hint: "From Sabbath" },
      { greek: "η Κυριακή", english: "Sunday", romanized: "i Kiriakí", gender: "f", hint: "Lord's day" }
    ]
  },

  // =====================================================
  // BODY - Σώμα
  // =====================================================
  body: {
    beginner: [
      { greek: "το κεφάλι", english: "the head", romanized: "to kefáli", gender: "n", article: "το", hint: "Top of body" },
      { greek: "το πρόσωπο", english: "the face", romanized: "to prósopo", gender: "n", article: "το", hint: "Front of head" },
      { greek: "τα μάτια", english: "the eyes", romanized: "ta mátia", gender: "n", article: "τα", hint: "For seeing" },
      { greek: "το μάτι", english: "the eye", romanized: "to máti", gender: "n", article: "το", hint: "Singular" },
      { greek: "η μύτη", english: "the nose", romanized: "i míti", gender: "f", article: "η", hint: "For smelling" },
      { greek: "το στόμα", english: "the mouth", romanized: "to stóma", gender: "n", article: "το", hint: "Root of 'stomach'" },
      { greek: "τα αυτιά", english: "the ears", romanized: "ta aftiá", gender: "n", article: "τα", hint: "For hearing" },
      { greek: "τα χέρια", english: "the hands/arms", romanized: "ta héria", gender: "n", article: "τα", hint: "Upper limbs" },
      { greek: "τα πόδια", english: "the feet/legs", romanized: "ta pódia", gender: "n", article: "τα", hint: "Lower limbs" },
      { greek: "η καρδιά", english: "the heart", romanized: "i kardiá", gender: "f", article: "η", hint: "Root of 'cardiac'" },
      { greek: "η πλάτη", english: "the back", romanized: "i pláti", gender: "f", article: "η", hint: "Behind you" },
      { greek: "τα δάχτυλα", english: "the fingers", romanized: "ta dáhtila", gender: "n", article: "τα", hint: "Root of 'dactyl'" }
    ]
  },

  // =====================================================
  // CLOTHING - Ρούχα
  // =====================================================
  clothing: {
    beginner: [
      { greek: "τα ρούχα", english: "the clothes", romanized: "ta roúha", gender: "n", article: "τα", hint: "What we wear" },
      { greek: "το πουκάμισο", english: "the shirt", romanized: "to poukámiso", gender: "n", article: "το", hint: "Upper body" },
      { greek: "το παντελόνι", english: "the pants", romanized: "to pandelóni", gender: "n", article: "το", hint: "Leg covering" },
      { greek: "η φούστα", english: "the skirt", romanized: "i foústa", gender: "f", article: "η", hint: "Women's garment" },
      { greek: "το φόρεμα", english: "the dress", romanized: "to fórema", gender: "n", article: "το", hint: "One-piece" },
      { greek: "τα παπούτσια", english: "the shoes", romanized: "ta papoútsia", gender: "n", article: "τα", hint: "For feet" },
      { greek: "το καπέλο", english: "the hat", romanized: "to kapélo", gender: "n", article: "το", hint: "Head covering" },
      { greek: "η ζακέτα", english: "the jacket", romanized: "i zakéta", gender: "f", article: "η", hint: "Outer layer" },
      { greek: "το παλτό", english: "the coat", romanized: "to paltó", gender: "n", article: "το", hint: "For cold weather" },
      { greek: "η ζώνη", english: "the belt", romanized: "i zóni", gender: "f", article: "η", hint: "Root of 'zone'" }
    ]
  },

  // =====================================================
  // COMMERCE - Εμπόριο
  // =====================================================
  commerce: {
    beginner: [
      { greek: "το μαγαζί", english: "the shop", romanized: "to magazí", gender: "n", article: "το", hint: "Store" },
      { greek: "η αγορά", english: "the market", romanized: "i agorá", gender: "f", article: "η", hint: "Root of 'agora'" },
      { greek: "τα λεφτά", english: "the money", romanized: "ta leftá", gender: "n", article: "τα", hint: "Currency" },
      { greek: "το ευρώ", english: "the euro", romanized: "to evró", gender: "n", article: "το", hint: "Greek currency" },
      { greek: "η τιμή", english: "the price", romanized: "i timí", gender: "f", article: "η", hint: "Cost" },
      { greek: "η απόδειξη", english: "the receipt", romanized: "i apódiksi", gender: "f", article: "η", hint: "Proof of purchase" },
      { greek: "ο πελάτης", english: "the customer", romanized: "o pelátis", gender: "m", article: "ο", hint: "Buyer" },
      { greek: "ο πωλητής", english: "the seller", romanized: "o politís", gender: "m", article: "ο", hint: "Vendor" },
      { greek: "φτηνός", english: "cheap", romanized: "ftinós", hint: "Low price" },
      { greek: "ακριβός", english: "expensive", romanized: "akrivós", hint: "High price" }
    ],
    phrases: [
      { greek: "Πόσο κάνει;", english: "How much is it?", romanized: "Póso káni?" },
      { greek: "Είναι πολύ ακριβό", english: "It's too expensive", romanized: "Íne polí akrivó" },
      { greek: "Θέλω να αγοράσω...", english: "I want to buy...", romanized: "Thélo na agoráso..." },
      { greek: "Έχετε...;", english: "Do you have...?", romanized: "Éhete...?" },
      { greek: "Πού είναι το ταμείο;", english: "Where is the cash register?", romanized: "Poú íne to tamío?" }
    ]
  },

  // =====================================================
  // TRAVEL - Ταξίδι
  // =====================================================
  travel: {
    beginner: [
      { greek: "το ταξίδι", english: "the trip", romanized: "to taxídi", gender: "n", article: "το", hint: "Journey" },
      { greek: "ο δρόμος", english: "the road", romanized: "o drómos", gender: "m", article: "ο", hint: "Root of 'hippodrome'" },
      { greek: "η γέφυρα", english: "the bridge", romanized: "i yéfira", gender: "f", article: "η", hint: "Crosses water" },
      { greek: "το τρένο", english: "the train", romanized: "to tréno", gender: "n", article: "το", hint: "Rail transport" },
      { greek: "το λεωφορείο", english: "the bus", romanized: "to leoforío", gender: "n", article: "το", hint: "Public transport" },
      { greek: "το αεροπλάνο", english: "the airplane", romanized: "to aeropláno", gender: "n", article: "το", hint: "Air travel" },
      { greek: "το πλοίο", english: "the ship", romanized: "to plío", gender: "n", article: "το", hint: "Sea travel" },
      { greek: "το ξενοδοχείο", english: "the hotel", romanized: "to xenodohío", gender: "n", article: "το", hint: "From 'xenos' (stranger)" },
      { greek: "η βαλίτσα", english: "the suitcase", romanized: "i valítsa", gender: "f", article: "η", hint: "Luggage" },
      { greek: "το διαβατήριο", english: "the passport", romanized: "to diavatírio", gender: "n", article: "το", hint: "Travel document" },
      { greek: "ο χάρτης", english: "the map", romanized: "o hártis", gender: "m", article: "ο", hint: "Root of 'chart'" },
      { greek: "το εισιτήριο", english: "the ticket", romanized: "to isitírio", gender: "n", article: "το", hint: "For transport" }
    ],
    directions: [
      { greek: "αριστερά", english: "left", romanized: "aristerá", hint: "Direction" },
      { greek: "δεξιά", english: "right", romanized: "dexiá", hint: "Direction" },
      { greek: "ευθεία", english: "straight", romanized: "efthía", hint: "Forward" },
      { greek: "πίσω", english: "back/behind", romanized: "píso", hint: "Reverse" },
      { greek: "μπροστά", english: "in front", romanized: "brostá", hint: "Forward" },
      { greek: "κοντά", english: "near", romanized: "kondá", hint: "Close" },
      { greek: "μακριά", english: "far", romanized: "makriá", hint: "Distant" },
      { greek: "πάνω", english: "up/above", romanized: "páno", hint: "Upper" },
      { greek: "κάτω", english: "down/below", romanized: "káto", hint: "Lower" }
    ]
  },

  // =====================================================
  // WEATHER - Καιρός
  // =====================================================
  weather: {
    beginner: [
      { greek: "ο καιρός", english: "the weather", romanized: "o kerós", gender: "m", article: "ο", hint: "Climate" },
      { greek: "ο ήλιος", english: "the sun", romanized: "o ílios", gender: "m", article: "ο", hint: "Root of 'helio'" },
      { greek: "η βροχή", english: "the rain", romanized: "i vrohí", gender: "f", article: "η", hint: "Precipitation" },
      { greek: "το χιόνι", english: "the snow", romanized: "to hióni", gender: "n", article: "το", hint: "Winter weather" },
      { greek: "ο άνεμος", english: "the wind", romanized: "o ánemos", gender: "m", article: "ο", hint: "Root of 'anemometer'" },
      { greek: "το σύννεφο", english: "the cloud", romanized: "to sínefo", gender: "n", article: "το", hint: "In the sky" },
      { greek: "η θερμοκρασία", english: "the temperature", romanized: "i thermokrasía", gender: "f", article: "η", hint: "Root of 'thermo'" },
      { greek: "ζεστός", english: "hot/warm", romanized: "zestós", hint: "High temperature" },
      { greek: "κρύος", english: "cold", romanized: "kríos", hint: "Low temperature" }
    ],
    phrases: [
      { greek: "Τι καιρό κάνει;", english: "How's the weather?", romanized: "Ti keró káni?" },
      { greek: "Κάνει ζέστη", english: "It's hot", romanized: "Káni zésti" },
      { greek: "Κάνει κρύο", english: "It's cold", romanized: "Káni krío" },
      { greek: "Βρέχει", english: "It's raining", romanized: "Vréhi" },
      { greek: "Χιονίζει", english: "It's snowing", romanized: "Hionízi" }
    ]
  },

  // =====================================================
  // EMOTIONS - Συναισθήματα
  // =====================================================
  emotions: {
    beginner: [
      { greek: "χαρούμενος", english: "happy", romanized: "haroúmenos", hint: "Joyful" },
      { greek: "λυπημένος", english: "sad", romanized: "lipiménos", hint: "Sorrowful" },
      { greek: "θυμωμένος", english: "angry", romanized: "thimoménos", hint: "Mad" },
      { greek: "φοβισμένος", english: "scared", romanized: "fovisménos", hint: "Root of 'phobia'" },
      { greek: "κουρασμένος", english: "tired", romanized: "kourasménos", hint: "Exhausted" },
      { greek: "ενθουσιασμένος", english: "excited", romanized: "enthousias­ménos", hint: "Root of 'enthusiasm'" },
      { greek: "νευρικός", english: "nervous", romanized: "nevrikós", hint: "Root of 'nerve'" },
      { greek: "ήρεμος", english: "calm", romanized: "íremos", hint: "Peaceful" },
      { greek: "περήφανος", english: "proud", romanized: "perífanos", hint: "Self-satisfied" },
      { greek: "ντροπιασμένος", english: "embarrassed", romanized: "dropiasménos", hint: "Ashamed" }
    ]
  },

  // =====================================================
  // NATURE - Φύση
  // =====================================================
  nature: {
    beginner: [
      { greek: "το δέντρο", english: "the tree", romanized: "to déndro", gender: "n", article: "το", hint: "Root of 'dendro'" },
      { greek: "το λουλούδι", english: "the flower", romanized: "to louloúdi", gender: "n", article: "το", hint: "Blooms" },
      { greek: "το βουνό", english: "the mountain", romanized: "to vounó", gender: "n", article: "το", hint: "High land" },
      { greek: "η θάλασσα", english: "the sea", romanized: "i thálasa", gender: "f", article: "η", hint: "Root of 'thalasso'" },
      { greek: "ο ποταμός", english: "the river", romanized: "o potamós", gender: "m", article: "ο", hint: "Root of 'hippopotamus'" },
      { greek: "η λίμνη", english: "the lake", romanized: "i límni", gender: "f", article: "η", hint: "Body of water" },
      { greek: "το δάσος", english: "the forest", romanized: "to dásos", gender: "n", article: "το", hint: "Many trees" },
      { greek: "η παραλία", english: "the beach", romanized: "i paralía", gender: "f", article: "η", hint: "By the sea" },
      { greek: "ο ουρανός", english: "the sky", romanized: "o ouranós", gender: "m", article: "ο", hint: "Root of 'Uranus'" },
      { greek: "η γη", english: "the earth", romanized: "i yi", gender: "f", article: "η", hint: "Root of 'geo'" },
      { greek: "το αστέρι", english: "the star", romanized: "to astéri", gender: "n", article: "το", hint: "Root of 'astro'" },
      { greek: "η σελήνη", english: "the moon", romanized: "i selíni", gender: "f", article: "η", hint: "Root of 'selenium'" }
    ]
  }
};

// =====================================================
// FILL-IN-THE-BLANK SENTENCES
// Greek sentence practice with missing words
// =====================================================

const GREEK_FILL_BLANK = {
  // Greetings
  greetings: [
    {
      sentence: "___, τι κάνεις;",
      english: "Hello, how are you?",
      answer: "Γεια σου",
      distractors: ["Αντίο", "Ευχαριστώ", "Συγγνώμη"]
    },
    {
      sentence: "___! Πώς περάσατε;",
      english: "Good evening! How did you do?",
      answer: "Καλησπέρα",
      distractors: ["Καλημέρα", "Καληνύχτα", "Αντίο"]
    },
    {
      sentence: "___ πολύ! — Παρακαλώ!",
      english: "Thank you very much! — You're welcome!",
      answer: "Ευχαριστώ",
      distractors: ["Γεια σου", "Αντίο", "Ναι"]
    },
    {
      sentence: "Πρέπει να φύγω. ___!",
      english: "I have to leave. Goodbye!",
      answer: "Αντίο",
      distractors: ["Γεια σου", "Καλημέρα", "Ευχαριστώ"]
    }
  ],

  // Articles
  articles: [
    {
      sentence: "___ σκύλος τρέχει.",
      english: "The dog runs.",
      answer: "Ο",
      distractors: ["Η", "Το", "Οι"]
    },
    {
      sentence: "___ γυναίκα μιλάει.",
      english: "The woman speaks.",
      answer: "Η",
      distractors: ["Ο", "Το", "Οι"]
    },
    {
      sentence: "___ παιδί παίζει.",
      english: "The child plays.",
      answer: "Το",
      distractors: ["Ο", "Η", "Τα"]
    },
    {
      sentence: "___ θάλασσα είναι μπλε.",
      english: "The sea is blue.",
      answer: "Η",
      distractors: ["Ο", "Το", "Οι"]
    },
    {
      sentence: "___ ήλιος λάμπει.",
      english: "The sun shines.",
      answer: "Ο",
      distractors: ["Η", "Το", "Οι"]
    }
  ],

  // Family
  family: [
    {
      sentence: "Η ___ μου είναι δασκάλα.",
      english: "My mother is a teacher.",
      answer: "μητέρα",
      distractors: ["πατέρας", "αδερφή", "γιαγιά"]
    },
    {
      sentence: "Ο ___ μου δουλεύει στην Αθήνα.",
      english: "My father works in Athens.",
      answer: "πατέρας",
      distractors: ["μητέρα", "αδερφός", "παππούς"]
    },
    {
      sentence: "Έχω δύο ___ και μία αδερφή.",
      english: "I have two brothers and one sister.",
      answer: "αδερφούς",
      distractors: ["αδερφές", "παιδιά", "γονείς"]
    },
    {
      sentence: "Η ___ μου είναι δέκα χρονών.",
      english: "My daughter is ten years old.",
      answer: "κόρη",
      distractors: ["γιος", "μητέρα", "αδερφή"]
    }
  ],

  // Verbs - Είμαι (to be)
  eime: [
    {
      sentence: "Εγώ ___ Έλληνας.",
      english: "I am Greek.",
      answer: "είμαι",
      distractors: ["είσαι", "είναι", "είμαστε"]
    },
    {
      sentence: "Εσύ ___ πολύ καλός.",
      english: "You are very good.",
      answer: "είσαι",
      distractors: ["είμαι", "είναι", "είστε"]
    },
    {
      sentence: "Αυτός ___ ο δάσκαλος.",
      english: "He is the teacher.",
      answer: "είναι",
      distractors: ["είμαι", "είσαι", "είμαστε"]
    },
    {
      sentence: "Εμείς ___ φίλοι.",
      english: "We are friends.",
      answer: "είμαστε",
      distractors: ["είμαι", "είναι", "είστε"]
    },
    {
      sentence: "Αυτοί ___ στο σπίτι.",
      english: "They are at home.",
      answer: "είναι",
      distractors: ["είμαστε", "είστε", "είμαι"]
    }
  ],

  // Verbs - Έχω (to have)
  echo: [
    {
      sentence: "Εγώ ___ ένα σκύλο.",
      english: "I have a dog.",
      answer: "έχω",
      distractors: ["έχεις", "έχει", "έχουμε"]
    },
    {
      sentence: "Εσύ ___ ωραίο σπίτι.",
      english: "You have a nice house.",
      answer: "έχεις",
      distractors: ["έχω", "έχει", "έχετε"]
    },
    {
      sentence: "Αυτή ___ τρία παιδιά.",
      english: "She has three children.",
      answer: "έχει",
      distractors: ["έχω", "έχεις", "έχουν"]
    },
    {
      sentence: "Εμείς ___ πολλούς φίλους.",
      english: "We have many friends.",
      answer: "έχουμε",
      distractors: ["έχω", "έχει", "έχετε"]
    },
    {
      sentence: "Αυτοί ___ δύο αυτοκίνητα.",
      english: "They have two cars.",
      answer: "έχουν",
      distractors: ["έχουμε", "έχετε", "έχει"]
    }
  ],

  // Food
  food: [
    {
      sentence: "Θα ήθελα ένα ___, παρακαλώ.",
      english: "I would like a coffee, please.",
      answer: "καφέ",
      distractors: ["νερό", "κρασί", "ψωμί"]
    },
    {
      sentence: "Η ___ είναι νόστιμη.",
      english: "The soup is delicious.",
      answer: "σούπα",
      distractors: ["σαλάτα", "μπύρα", "τυρί"]
    },
    {
      sentence: "Θέλω ___ με τυρί.",
      english: "I want bread with cheese.",
      answer: "ψωμί",
      distractors: ["νερό", "καφέ", "κρασί"]
    },
    {
      sentence: "Το ___ είναι πολύ καλό στην Ελλάδα.",
      english: "The wine is very good in Greece.",
      answer: "κρασί",
      distractors: ["μπύρα", "νερό", "καφέ"]
    }
  ],

  // Numbers
  numbers: [
    {
      sentence: "Έχω ___ γάτες στο σπίτι.",
      english: "I have three cats at home.",
      answer: "τρεις",
      distractors: ["δύο", "τέσσερις", "πέντε"]
    },
    {
      sentence: "Υπάρχουν ___ άνθρωποι στο δωμάτιο.",
      english: "There are seven people in the room.",
      answer: "επτά",
      distractors: ["έξι", "οκτώ", "εννέα"]
    },
    {
      sentence: "Το τραίνο φεύγει στις ___ η ώρα.",
      english: "The train leaves at five o'clock.",
      answer: "πέντε",
      distractors: ["τέσσερις", "έξι", "επτά"]
    }
  ],

  // Weather
  weather: [
    {
      sentence: "Σήμερα ο ___ λάμπει.",
      english: "Today the sun shines.",
      answer: "ήλιος",
      distractors: ["άνεμος", "ουρανός", "καιρός"]
    },
    {
      sentence: "Πέφτει πολύ ___.",
      english: "A lot of rain is falling.",
      answer: "βροχή",
      distractors: ["χιόνι", "ήλιος", "άνεμος"]
    },
    {
      sentence: "Σήμερα κάνει πολύ ___.",
      english: "Today it's very cold.",
      answer: "κρύο",
      distractors: ["ζέστη", "άνεμο", "βροχή"]
    }
  ],

  // Cases (genitive/accusative)
  cases: [
    {
      sentence: "Το βιβλίο ___ δασκάλου.",
      english: "The teacher's book.",
      answer: "του",
      distractors: ["ο", "τον", "οι"]
    },
    {
      sentence: "Βλέπω ___ σκύλο.",
      english: "I see the dog.",
      answer: "τον",
      distractors: ["ο", "του", "οι"]
    },
    {
      sentence: "Η πόρτα ___ σπιτιού.",
      english: "The door of the house.",
      answer: "του",
      distractors: ["το", "τον", "τα"]
    },
    {
      sentence: "Αγαπάω ___ Ελλάδα.",
      english: "I love Greece.",
      answer: "την",
      distractors: ["η", "της", "οι"]
    }
  ]
};

// =====================================================
// SENTENCE REORDER DATA
// Greek sentences for word ordering practice
// =====================================================

const GREEK_REORDER = {
  greetings: [
    { greek: "Γεια σου, τι κάνεις;", english: "Hello, how are you?", words: ["Γεια", "σου,", "τι", "κάνεις;"] },
    { greek: "Καλημέρα, πώς είστε;", english: "Good morning, how are you?", words: ["Καλημέρα,", "πώς", "είστε;"] },
    { greek: "Με λένε Μαρία", english: "My name is Maria", words: ["Με", "λένε", "Μαρία"] },
    { greek: "Χαίρω πολύ", english: "Nice to meet you", words: ["Χαίρω", "πολύ"] }
  ],

  basics: [
    { greek: "Είμαι από την Ελλάδα", english: "I am from Greece", words: ["Είμαι", "από", "την", "Ελλάδα"] },
    { greek: "Μιλάω λίγο ελληνικά", english: "I speak a little Greek", words: ["Μιλάω", "λίγο", "ελληνικά"] },
    { greek: "Δεν καταλαβαίνω", english: "I don't understand", words: ["Δεν", "καταλαβαίνω"] },
    { greek: "Πού είναι το ξενοδοχείο;", english: "Where is the hotel?", words: ["Πού", "είναι", "το", "ξενοδοχείο;"] }
  ],

  family: [
    { greek: "Αυτή είναι η μητέρα μου", english: "This is my mother", words: ["Αυτή", "είναι", "η", "μητέρα", "μου"] },
    { greek: "Έχω δύο αδέρφια", english: "I have two siblings", words: ["Έχω", "δύο", "αδέρφια"] },
    { greek: "Ο πατέρας μου δουλεύει", english: "My father works", words: ["Ο", "πατέρας", "μου", "δουλεύει"] },
    { greek: "Μένω με τους γονείς μου", english: "I live with my parents", words: ["Μένω", "με", "τους", "γονείς", "μου"] }
  ],

  food: [
    { greek: "Θέλω ένα καφέ", english: "I want a coffee", words: ["Θέλω", "ένα", "καφέ"] },
    { greek: "Το φαγητό είναι νόστιμο", english: "The food is delicious", words: ["Το", "φαγητό", "είναι", "νόστιμο"] },
    { greek: "Πόσο κάνει αυτό;", english: "How much is this?", words: ["Πόσο", "κάνει", "αυτό;"] },
    { greek: "Θα ήθελα το λογαριασμό", english: "I would like the bill", words: ["Θα", "ήθελα", "το", "λογαριασμό"] }
  ],

  locations: [
    { greek: "Πηγαίνω στο σχολείο", english: "I go to school", words: ["Πηγαίνω", "στο", "σχολείο"] },
    { greek: "Το σπίτι είναι μεγάλο", english: "The house is big", words: ["Το", "σπίτι", "είναι", "μεγάλο"] },
    { greek: "Η θάλασσα είναι κοντά", english: "The sea is near", words: ["Η", "θάλασσα", "είναι", "κοντά"] },
    { greek: "Θέλω να πάω στην Αθήνα", english: "I want to go to Athens", words: ["Θέλω", "να", "πάω", "στην", "Αθήνα"] }
  ],

  weather: [
    { greek: "Σήμερα κάνει ζέστη", english: "Today it's hot", words: ["Σήμερα", "κάνει", "ζέστη"] },
    { greek: "Ο καιρός είναι ωραίος", english: "The weather is nice", words: ["Ο", "καιρός", "είναι", "ωραίος"] },
    { greek: "Χθες έβρεχε πολύ", english: "Yesterday it rained a lot", words: ["Χθες", "έβρεχε", "πολύ"] }
  ],

  verbs: [
    { greek: "Εγώ είμαι χαρούμενος", english: "I am happy", words: ["Εγώ", "είμαι", "χαρούμενος"] },
    { greek: "Αυτός έχει ένα σκύλο", english: "He has a dog", words: ["Αυτός", "έχει", "ένα", "σκύλο"] },
    { greek: "Εμείς μιλάμε ελληνικά", english: "We speak Greek", words: ["Εμείς", "μιλάμε", "ελληνικά"] },
    { greek: "Αυτοί τρώνε στο εστιατόριο", english: "They eat at the restaurant", words: ["Αυτοί", "τρώνε", "στο", "εστιατόριο"] }
  ]
};

// Export for module system (Node.js compatibility)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GREEK_VOCAB, GREEK_FILL_BLANK, GREEK_REORDER };
}

// Also make available globally for browser
if (typeof window !== 'undefined') {
  window.GREEK_VOCAB = GREEK_VOCAB;
  window.GREEK_FILL_BLANK = GREEK_FILL_BLANK;
  window.GREEK_REORDER = GREEK_REORDER;
}
