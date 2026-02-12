// ByteQuest - Dutch Vocabulary Data
// Nederlands (Dutch)
// Pure data file - question generation logic is in js/systems/QuestionSystem.js

const DUTCH_VOCAB = {
  // Meta info
  _meta: {
    language: "dutch",
    languageCode: "nl",
    nativeName: "Nederlands",
    version: "1.0.0"
  },

  // =====================================================
  // BASICS - Greetings & Essentials
  // =====================================================
  basics: {
    greetings: [
      { dutch: "Hallo", english: "Hello", hint: "Same as English" },
      { dutch: "Goedemorgen", english: "Good morning", hint: "Goede (good) + morgen (morning)" },
      { dutch: "Goedemiddag", english: "Good afternoon", hint: "Goede + middag (midday)" },
      { dutch: "Goedenavond", english: "Good evening", hint: "Goede + avond (evening)" },
      { dutch: "Goedenacht", english: "Good night", hint: "When going to bed" },
      { dutch: "Dag", english: "Bye / Hello", hint: "Casual, works both ways" },
      { dutch: "Tot ziens", english: "Goodbye", hint: "Until seeing (you again)" },
      { dutch: "Dank je wel", english: "Thank you", hint: "Informal; 'Dank u wel' is formal" },
      { dutch: "Alsjeblieft", english: "Please / Here you go", hint: "Informal; 'Alstublieft' is formal" },
      { dutch: "Graag gedaan", english: "You're welcome", hint: "Gladly done" },
      { dutch: "Ja", english: "Yes", hint: "Like German 'ja'" },
      { dutch: "Nee", english: "No", hint: "Like German 'nein'" },
      { dutch: "Sorry", english: "Sorry", hint: "Same as English" },
      { dutch: "Pardon", english: "Excuse me", hint: "French loanword" }
    ],
    introductions: [
      { dutch: "Ik heet...", english: "My name is...", hint: "Literally 'I am called'" },
      { dutch: "Hoe heet je?", english: "What's your name? (informal)", hint: "How are you called?" },
      { dutch: "Hoe heet u?", english: "What's your name? (formal)", hint: "Formal version" },
      { dutch: "Aangenaam", english: "Nice to meet you", hint: "Pleasant" },
      { dutch: "Ik ben...", english: "I am...", hint: "Basic identity" },
      { dutch: "Ik kom uit...", english: "I come from...", hint: "For origin" },
      { dutch: "Ik spreek Nederlands", english: "I speak Dutch", hint: "Useful phrase!" },
      { dutch: "Ik begrijp het niet", english: "I don't understand", hint: "Very useful!" }
    ],
    essentials: [
      { dutch: "Waar is...?", english: "Where is...?", hint: "Location question" },
      { dutch: "Wat is dit?", english: "What is this?", hint: "Pointing at something" },
      { dutch: "Hoeveel kost het?", english: "How much does it cost?", hint: "For shopping" },
      { dutch: "Ik wil...", english: "I want...", hint: "Basic request" },
      { dutch: "Mag ik...?", english: "May I...?", hint: "Asking permission" },
      { dutch: "Help!", english: "Help!", hint: "Emergency word" }
    ]
  },

  // =====================================================
  // FAMILY - Familie
  // =====================================================
  family: {
    beginner: [
      { dutch: "de familie", english: "the family", gender: "de", hint: "'De' is common gender article" },
      { dutch: "de moeder", english: "the mother", gender: "de", hint: "Like German 'Mutter'" },
      { dutch: "de vader", english: "the father", gender: "de", hint: "Like German 'Vater'" },
      { dutch: "de mama", english: "mom", gender: "de", hint: "Informal" },
      { dutch: "de papa", english: "dad", gender: "de", hint: "Informal" },
      { dutch: "de zus", english: "the sister", gender: "de", hint: "Short form" },
      { dutch: "de broer", english: "the brother", gender: "de", hint: "Like English 'brother'" },
      { dutch: "de dochter", english: "the daughter", gender: "de", hint: "Like English 'daughter'" },
      { dutch: "de zoon", english: "the son", gender: "de", hint: "Like English 'son'" },
      { dutch: "het kind", english: "the child", gender: "het", hint: "'Het' is neuter article" },
      { dutch: "de oma", english: "the grandmother", gender: "de", hint: "Affectionate term" },
      { dutch: "de opa", english: "the grandfather", gender: "de", hint: "Affectionate term" }
    ],
    intermediate: [
      { dutch: "de ouders", english: "the parents", gender: "de", hint: "Plural" },
      { dutch: "de kinderen", english: "the children", gender: "de", hint: "Plural of kind" },
      { dutch: "de man", english: "the husband/man", gender: "de", hint: "Context-dependent" },
      { dutch: "de vrouw", english: "the wife/woman", gender: "de", hint: "Context-dependent" },
      { dutch: "de echtgenoot", english: "the husband (formal)", gender: "de", hint: "Formal term" },
      { dutch: "de echtgenote", english: "the wife (formal)", gender: "de", hint: "Formal term" },
      { dutch: "de oom", english: "the uncle", gender: "de", hint: "Like English 'uncle'" },
      { dutch: "de tante", english: "the aunt", gender: "de", hint: "Like English 'aunt'" },
      { dutch: "de neef", english: "the nephew/cousin (male)", gender: "de", hint: "Can mean both" },
      { dutch: "de nicht", english: "the niece/cousin (female)", gender: "de", hint: "Can mean both" }
    ],
    phrases: [
      { dutch: "Ik heb twee broers", english: "I have two brothers" },
      { dutch: "Hoeveel kinderen heb je?", english: "How many children do you have?" },
      { dutch: "Mijn familie", english: "My family" },
      { dutch: "Ik woon bij mijn ouders", english: "I live with my parents" },
      { dutch: "Ik ben getrouwd", english: "I am married" }
    ]
  },

  // =====================================================
  // FOOD - Eten
  // =====================================================
  food: {
    beginner: [
      { dutch: "het brood", english: "the bread", gender: "het", hint: "Like English 'bread'" },
      { dutch: "het water", english: "the water", gender: "het", hint: "Like English 'water'" },
      { dutch: "de wijn", english: "the wine", gender: "de", hint: "Like English 'wine'" },
      { dutch: "het bier", english: "the beer", gender: "het", hint: "Netherlands loves beer" },
      { dutch: "de koffie", english: "the coffee", gender: "de", hint: "Dutch love coffee" },
      { dutch: "de thee", english: "the tea", gender: "de", hint: "Like English 'tea'" },
      { dutch: "de melk", english: "the milk", gender: "de", hint: "Like English 'milk'" },
      { dutch: "de kaas", english: "the cheese", gender: "de", hint: "Dutch are famous for cheese" },
      { dutch: "het vlees", english: "the meat", gender: "het", hint: "General meat term" },
      { dutch: "de vis", english: "the fish", gender: "de", hint: "Like English 'fish'" },
      { dutch: "het ei", english: "the egg", gender: "het", hint: "Like English 'egg'" },
      { dutch: "de salade", english: "the salad", gender: "de", hint: "French loanword" }
    ],
    intermediate: [
      { dutch: "de olie", english: "the oil", gender: "de", hint: "Like English 'oil'" },
      { dutch: "de olijf", english: "the olive", gender: "de", hint: "Like English 'olive'" },
      { dutch: "de tomaat", english: "the tomato", gender: "de", hint: "Like English 'tomato'" },
      { dutch: "de komkommer", english: "the cucumber", gender: "de", hint: "Like English 'cucumber'" },
      { dutch: "de aardappel", english: "the potato", gender: "de", hint: "Earth apple" },
      { dutch: "de rijst", english: "the rice", gender: "de", hint: "Like English 'rice'" },
      { dutch: "de pasta", english: "the pasta", gender: "de", hint: "Italian loanword" },
      { dutch: "de kip", english: "the chicken", gender: "de", hint: "Common meat" },
      { dutch: "het varkensvlees", english: "the pork", gender: "het", hint: "Pig meat" },
      { dutch: "de friet", english: "the fries", gender: "de", hint: "Dutch love fries" },
      { dutch: "de stroopwafel", english: "the stroopwafel", gender: "de", hint: "Famous Dutch treat" },
      { dutch: "de haring", english: "the herring", gender: "de", hint: "Traditional Dutch fish" }
    ],
    phrases: [
      { dutch: "Ik heb honger", english: "I'm hungry", hint: "I have hunger" },
      { dutch: "Ik heb dorst", english: "I'm thirsty", hint: "I have thirst" },
      { dutch: "Wat wilt u?", english: "What would you like?", hint: "Waiter asking" },
      { dutch: "Ik wil graag...", english: "I would like...", hint: "Polite request" },
      { dutch: "De rekening, alstublieft", english: "The bill, please" },
      { dutch: "Het is lekker!", english: "It's delicious!", hint: "Compliment the food" },
      { dutch: "Eet smakelijk!", english: "Enjoy your meal!", hint: "Said before eating" }
    ]
  },

  // =====================================================
  // NUMBERS - Nummers
  // =====================================================
  numbers: {
    cardinal: [
      { dutch: "nul", english: "zero", hint: "Like 'null'" },
      { dutch: "een", english: "one", hint: "Like English 'one'" },
      { dutch: "twee", english: "two", hint: "Like English 'two'" },
      { dutch: "drie", english: "three", hint: "Like English 'three'" },
      { dutch: "vier", english: "four", hint: "Like English 'four'" },
      { dutch: "vijf", english: "five", hint: "Like English 'five'" },
      { dutch: "zes", english: "six", hint: "Like English 'six'" },
      { dutch: "zeven", english: "seven", hint: "Like English 'seven'" },
      { dutch: "acht", english: "eight", hint: "Like English 'eight'" },
      { dutch: "negen", english: "nine", hint: "Like English 'nine'" },
      { dutch: "tien", english: "ten", hint: "Like English 'ten'" },
      { dutch: "twintig", english: "twenty", hint: "Like English 'twenty'" },
      { dutch: "honderd", english: "hundred", hint: "Like English 'hundred'" },
      { dutch: "duizend", english: "thousand", hint: "Like English 'thousand'" }
    ],
    ordinal: [
      { dutch: "eerste", english: "first", hint: "From 'een'" },
      { dutch: "tweede", english: "second", hint: "From 'twee'" },
      { dutch: "derde", english: "third", hint: "From 'drie'" },
      { dutch: "vierde", english: "fourth", hint: "From 'vier'" },
      { dutch: "vijfde", english: "fifth", hint: "From 'vijf'" }
    ]
  },

  // =====================================================
  // COLORS - Kleuren
  // =====================================================
  colors: {
    beginner: [
      { dutch: "wit", english: "white", hint: "Like English 'white'" },
      { dutch: "zwart", english: "black", hint: "Related to 'swart'" },
      { dutch: "rood", english: "red", hint: "Like English 'red'" },
      { dutch: "blauw", english: "blue", hint: "Like English 'blue'" },
      { dutch: "groen", english: "green", hint: "Like English 'green'" },
      { dutch: "geel", english: "yellow", hint: "Like English 'yellow'" },
      { dutch: "oranje", english: "orange", hint: "National color of Netherlands" },
      { dutch: "roze", english: "pink", hint: "Like 'rose'" },
      { dutch: "grijs", english: "grey", hint: "Like English 'grey'" },
      { dutch: "bruin", english: "brown", hint: "Like English 'brown'" },
      { dutch: "paars", english: "purple", hint: "Purple color" }
    ]
  },

  // =====================================================
  // PLACES - Plaatsen
  // =====================================================
  places: {
    beginner: [
      { dutch: "het huis", english: "the house", gender: "het", hint: "Like English 'house'" },
      { dutch: "het dorp", english: "the village", gender: "het", hint: "Small town" },
      { dutch: "de stad", english: "the city", gender: "de", hint: "Like English 'stead'" },
      { dutch: "de markt", english: "the market", gender: "de", hint: "Like English 'market'" },
      { dutch: "de winkel", english: "the shop", gender: "de", hint: "Store" },
      { dutch: "het restaurant", english: "the restaurant", gender: "het", hint: "French loanword" },
      { dutch: "de straat", english: "the street", gender: "de", hint: "Like English 'street'" },
      { dutch: "het bos", english: "the forest", gender: "het", hint: "Woods" },
      { dutch: "de berg", english: "the mountain", gender: "de", hint: "Like German 'Berg'" },
      { dutch: "de zee", english: "the sea", gender: "de", hint: "Like English 'sea'" },
      { dutch: "de kerk", english: "the church", gender: "de", hint: "Like English 'church'" },
      { dutch: "het kasteel", english: "the castle", gender: "het", hint: "Like English 'castle'" }
    ],
    intermediate: [
      { dutch: "de boerderij", english: "the farm", gender: "de", hint: "Farmer's place" },
      { dutch: "het veld", english: "the field", gender: "het", hint: "Like English 'field'" },
      { dutch: "de haven", english: "the port", gender: "de", hint: "Like English 'haven'" },
      { dutch: "de bibliotheek", english: "the library", gender: "de", hint: "Greek root" },
      { dutch: "het paleis", english: "the palace", gender: "het", hint: "Royal residence" },
      { dutch: "de gracht", english: "the canal", gender: "de", hint: "Famous in Amsterdam" },
      { dutch: "de molen", english: "the windmill", gender: "de", hint: "Dutch icon" },
      { dutch: "de brug", english: "the bridge", gender: "de", hint: "Like English 'bridge'" }
    ]
  },

  // =====================================================
  // CREATURES - Dieren
  // =====================================================
  creatures: {
    animals: [
      { dutch: "de hond", english: "the dog", gender: "de", hint: "Like English 'hound'" },
      { dutch: "de kat", english: "the cat", gender: "de", hint: "Like English 'cat'" },
      { dutch: "het paard", english: "the horse", gender: "het", hint: "For riding" },
      { dutch: "de koe", english: "the cow", gender: "de", hint: "Like English 'cow'" },
      { dutch: "het schaap", english: "the sheep", gender: "het", hint: "Like English 'sheep'" },
      { dutch: "de kip", english: "the chicken", gender: "de", hint: "Farm bird" },
      { dutch: "de wolf", english: "the wolf", gender: "de", hint: "Like English 'wolf'" },
      { dutch: "de beer", english: "the bear", gender: "de", hint: "Like English 'bear'" },
      { dutch: "de vogel", english: "the bird", gender: "de", hint: "Like English 'fowl'" },
      { dutch: "de vis", english: "the fish", gender: "de", hint: "Like English 'fish'" },
      { dutch: "het varken", english: "the pig", gender: "het", hint: "Farm animal" },
      { dutch: "het konijn", english: "the rabbit", gender: "het", hint: "Like English 'coney'" }
    ],
    fantasy: [
      { dutch: "het monster", english: "the monster", gender: "het", hint: "Like English" },
      { dutch: "de draak", english: "the dragon", gender: "de", hint: "Like English 'dragon'" },
      { dutch: "de geest", english: "the ghost", gender: "de", hint: "Like English 'ghost'" },
      { dutch: "de reus", english: "the giant", gender: "de", hint: "Large being" },
      { dutch: "de fee", english: "the fairy", gender: "de", hint: "Magical creature" },
      { dutch: "het skelet", english: "the skeleton", gender: "het", hint: "Like English" }
    ]
  },

  // =====================================================
  // ACTIONS - Werkwoorden (Verbs)
  // =====================================================
  actions: {
    common: [
      { dutch: "eten", english: "to eat", hint: "Like English 'eat'" },
      { dutch: "drinken", english: "to drink", hint: "Like English 'drink'" },
      { dutch: "slapen", english: "to sleep", hint: "Like English 'sleep'" },
      { dutch: "lopen", english: "to walk", hint: "Like English 'lope'" },
      { dutch: "rennen", english: "to run", hint: "Like English 'run'" },
      { dutch: "zien", english: "to see", hint: "Like English 'see'" },
      { dutch: "horen", english: "to hear", hint: "Like English 'hear'" },
      { dutch: "lezen", english: "to read", hint: "Related to 'lesson'" },
      { dutch: "schrijven", english: "to write", hint: "Like English 'scribe'" },
      { dutch: "leren", english: "to learn", hint: "Like English 'learn'" },
      { dutch: "werken", english: "to work", hint: "Like English 'work'" },
      { dutch: "kopen", english: "to buy", hint: "Related to 'cheap'" },
      { dutch: "verkopen", english: "to sell", hint: "Ver + kopen" },
      { dutch: "zoeken", english: "to search", hint: "Like English 'seek'" },
      { dutch: "vinden", english: "to find", hint: "Like English 'find'" }
    ],
    helping: [
      { dutch: "zijn", english: "to be", hint: "Irregular verb" },
      { dutch: "hebben", english: "to have", hint: "Like English 'have'" },
      { dutch: "kunnen", english: "can/to be able", hint: "Like English 'can'" },
      { dutch: "willen", english: "to want", hint: "Like English 'will'" },
      { dutch: "moeten", english: "must/to have to", hint: "Like English 'must'" },
      { dutch: "mogen", english: "may/to be allowed", hint: "Like English 'may'" }
    ]
  },

  // =====================================================
  // ADJECTIVES - Bijvoeglijke naamwoorden
  // =====================================================
  adjectives: {
    common: [
      { dutch: "goed", english: "good", hint: "Like English 'good'" },
      { dutch: "slecht", english: "bad", hint: "Related to 'slight'" },
      { dutch: "groot", english: "big/great", hint: "Like English 'great'" },
      { dutch: "klein", english: "small", hint: "Related to 'clean'" },
      { dutch: "nieuw", english: "new", hint: "Like English 'new'" },
      { dutch: "oud", english: "old", hint: "Like English 'old'" },
      { dutch: "jong", english: "young", hint: "Like English 'young'" },
      { dutch: "mooi", english: "beautiful", hint: "Common compliment" },
      { dutch: "lelijk", english: "ugly", hint: "Opposite of mooi" },
      { dutch: "sterk", english: "strong", hint: "Like English 'stark'" },
      { dutch: "zwak", english: "weak", hint: "Opposite of sterk" },
      { dutch: "snel", english: "fast", hint: "Quick" },
      { dutch: "langzaam", english: "slow", hint: "Long + time" },
      { dutch: "makkelijk", english: "easy", hint: "Simple" },
      { dutch: "moeilijk", english: "difficult", hint: "Hard" },
      { dutch: "duur", english: "expensive", hint: "High price" },
      { dutch: "goedkoop", english: "cheap", hint: "Good + buy" }
    ]
  },

  // =====================================================
  // TIME - Tijd
  // =====================================================
  time: {
    beginner: [
      { dutch: "vandaag", english: "today", hint: "Van + daag (day)" },
      { dutch: "morgen", english: "tomorrow", hint: "Also means 'morning'" },
      { dutch: "gisteren", english: "yesterday", hint: "Past day" },
      { dutch: "nu", english: "now", hint: "Like English 'now'" },
      { dutch: "later", english: "later", hint: "Like English" },
      { dutch: "vroeger", english: "before/earlier", hint: "In the past" },
      { dutch: "altijd", english: "always", hint: "All + time" },
      { dutch: "nooit", english: "never", hint: "No time" },
      { dutch: "de dag", english: "the day", gender: "de", hint: "Like English 'day'" },
      { dutch: "de nacht", english: "the night", gender: "de", hint: "Like English 'night'" },
      { dutch: "de week", english: "the week", gender: "de", hint: "Like English 'week'" },
      { dutch: "de maand", english: "the month", gender: "de", hint: "Like English 'month'" },
      { dutch: "het jaar", english: "the year", gender: "het", hint: "Like English 'year'" }
    ],
    days: [
      { dutch: "maandag", english: "Monday", hint: "Moon day" },
      { dutch: "dinsdag", english: "Tuesday", hint: "Thing's day (god Tyr)" },
      { dutch: "woensdag", english: "Wednesday", hint: "Woden's day" },
      { dutch: "donderdag", english: "Thursday", hint: "Thunder day (Thor)" },
      { dutch: "vrijdag", english: "Friday", hint: "Freya's day" },
      { dutch: "zaterdag", english: "Saturday", hint: "Saturn's day" },
      { dutch: "zondag", english: "Sunday", hint: "Sun day" }
    ]
  },

  // =====================================================
  // BODY - Lichaam
  // =====================================================
  body: {
    beginner: [
      { dutch: "het hoofd", english: "the head", gender: "het", hint: "Top of body" },
      { dutch: "het gezicht", english: "the face", gender: "het", hint: "Front of head" },
      { dutch: "de ogen", english: "the eyes", gender: "de", hint: "For seeing (plural)" },
      { dutch: "het oog", english: "the eye", gender: "het", hint: "Singular" },
      { dutch: "de neus", english: "the nose", gender: "de", hint: "Like English 'nose'" },
      { dutch: "de mond", english: "the mouth", gender: "de", hint: "Like English 'mouth'" },
      { dutch: "de oren", english: "the ears", gender: "de", hint: "For hearing (plural)" },
      { dutch: "de handen", english: "the hands", gender: "de", hint: "Like English 'hands'" },
      { dutch: "de voeten", english: "the feet", gender: "de", hint: "Like English 'feet'" },
      { dutch: "het hart", english: "the heart", gender: "het", hint: "Like English 'heart'" },
      { dutch: "de rug", english: "the back", gender: "de", hint: "Behind you" },
      { dutch: "de vingers", english: "the fingers", gender: "de", hint: "Like English 'fingers'" }
    ]
  },

  // =====================================================
  // CLOTHING - Kleding
  // =====================================================
  clothing: {
    beginner: [
      { dutch: "de kleren", english: "the clothes", gender: "de", hint: "What we wear" },
      { dutch: "het shirt", english: "the shirt", gender: "het", hint: "Like English" },
      { dutch: "de broek", english: "the pants", gender: "de", hint: "Leg covering" },
      { dutch: "de rok", english: "the skirt", gender: "de", hint: "Like English 'frock'" },
      { dutch: "de jurk", english: "the dress", gender: "de", hint: "One-piece" },
      { dutch: "de schoenen", english: "the shoes", gender: "de", hint: "Like English 'shoes'" },
      { dutch: "de hoed", english: "the hat", gender: "de", hint: "Like English 'hood'" },
      { dutch: "de jas", english: "the jacket/coat", gender: "de", hint: "Outer layer" },
      { dutch: "de riem", english: "the belt", gender: "de", hint: "Around waist" },
      { dutch: "de sokken", english: "the socks", gender: "de", hint: "Like English 'socks'" }
    ]
  },

  // =====================================================
  // COMMERCE - Handel
  // =====================================================
  commerce: {
    beginner: [
      { dutch: "de winkel", english: "the shop", gender: "de", hint: "Store" },
      { dutch: "de markt", english: "the market", gender: "de", hint: "Like English 'market'" },
      { dutch: "het geld", english: "the money", gender: "het", hint: "Like 'gold'" },
      { dutch: "de euro", english: "the euro", gender: "de", hint: "Dutch currency" },
      { dutch: "de prijs", english: "the price", gender: "de", hint: "Like English 'price'" },
      { dutch: "de rekening", english: "the bill", gender: "de", hint: "Like 'reckoning'" },
      { dutch: "de klant", english: "the customer", gender: "de", hint: "Buyer" },
      { dutch: "de verkoper", english: "the seller", gender: "de", hint: "Vendor" },
      { dutch: "goedkoop", english: "cheap", hint: "Good + buy" },
      { dutch: "duur", english: "expensive", hint: "High price" }
    ],
    phrases: [
      { dutch: "Hoeveel kost dit?", english: "How much does this cost?" },
      { dutch: "Het is te duur", english: "It's too expensive" },
      { dutch: "Ik wil dit kopen", english: "I want to buy this" },
      { dutch: "Heeft u...?", english: "Do you have...?" },
      { dutch: "Waar is de kassa?", english: "Where is the cash register?" }
    ]
  },

  // =====================================================
  // TRAVEL - Reizen
  // =====================================================
  travel: {
    beginner: [
      { dutch: "de reis", english: "the trip", gender: "de", hint: "Journey" },
      { dutch: "de weg", english: "the road/way", gender: "de", hint: "Like English 'way'" },
      { dutch: "de brug", english: "the bridge", gender: "de", hint: "Like English 'bridge'" },
      { dutch: "de trein", english: "the train", gender: "de", hint: "Like English 'train'" },
      { dutch: "de bus", english: "the bus", gender: "de", hint: "Like English 'bus'" },
      { dutch: "het vliegtuig", english: "the airplane", gender: "het", hint: "Fly + thing" },
      { dutch: "de boot", english: "the boat", gender: "de", hint: "Like English 'boat'" },
      { dutch: "de fiets", english: "the bicycle", gender: "de", hint: "Dutch love cycling!" },
      { dutch: "het hotel", english: "the hotel", gender: "het", hint: "Like English" },
      { dutch: "de koffer", english: "the suitcase", gender: "de", hint: "Luggage" },
      { dutch: "het paspoort", english: "the passport", gender: "het", hint: "Travel document" },
      { dutch: "de kaart", english: "the map/card", gender: "de", hint: "Like English 'card'" },
      { dutch: "het kaartje", english: "the ticket", gender: "het", hint: "Small card" }
    ],
    directions: [
      { dutch: "links", english: "left", hint: "Direction" },
      { dutch: "rechts", english: "right", hint: "Direction" },
      { dutch: "rechtdoor", english: "straight ahead", hint: "Right through" },
      { dutch: "terug", english: "back", hint: "Return" },
      { dutch: "voor", english: "in front", hint: "Forward" },
      { dutch: "dichtbij", english: "near", hint: "Close by" },
      { dutch: "ver", english: "far", hint: "Distant" },
      { dutch: "boven", english: "above/upstairs", hint: "Upper" },
      { dutch: "beneden", english: "below/downstairs", hint: "Lower" }
    ]
  },

  // =====================================================
  // WEATHER - Weer
  // =====================================================
  weather: {
    beginner: [
      { dutch: "het weer", english: "the weather", gender: "het", hint: "Like English 'weather'" },
      { dutch: "de zon", english: "the sun", gender: "de", hint: "Like English 'sun'" },
      { dutch: "de regen", english: "the rain", gender: "de", hint: "Like English 'rain'" },
      { dutch: "de sneeuw", english: "the snow", gender: "de", hint: "Like English 'snow'" },
      { dutch: "de wind", english: "the wind", gender: "de", hint: "Like English 'wind'" },
      { dutch: "de wolk", english: "the cloud", gender: "de", hint: "In the sky" },
      { dutch: "de temperatuur", english: "the temperature", gender: "de", hint: "Like English" },
      { dutch: "warm", english: "warm", hint: "Like English 'warm'" },
      { dutch: "koud", english: "cold", hint: "Like English 'cold'" }
    ],
    phrases: [
      { dutch: "Hoe is het weer?", english: "How's the weather?" },
      { dutch: "Het is warm", english: "It's warm" },
      { dutch: "Het is koud", english: "It's cold" },
      { dutch: "Het regent", english: "It's raining" },
      { dutch: "Het sneeuwt", english: "It's snowing" }
    ]
  },

  // =====================================================
  // EMOTIONS - Emoties
  // =====================================================
  emotions: {
    beginner: [
      { dutch: "blij", english: "happy", hint: "Joyful" },
      { dutch: "verdrietig", english: "sad", hint: "Sorrowful" },
      { dutch: "boos", english: "angry", hint: "Mad" },
      { dutch: "bang", english: "scared", hint: "Afraid" },
      { dutch: "moe", english: "tired", hint: "Exhausted" },
      { dutch: "opgewonden", english: "excited", hint: "Stirred up" },
      { dutch: "zenuwachtig", english: "nervous", hint: "Like 'nervous'" },
      { dutch: "rustig", english: "calm", hint: "Like 'rest'" },
      { dutch: "trots", english: "proud", hint: "Self-satisfied" },
      { dutch: "verlegen", english: "shy/embarrassed", hint: "Bashful" }
    ]
  },

  // =====================================================
  // NATURE - Natuur
  // =====================================================
  nature: {
    beginner: [
      { dutch: "de boom", english: "the tree", gender: "de", hint: "Like English 'beam'" },
      { dutch: "de bloem", english: "the flower", gender: "de", hint: "Like English 'bloom'" },
      { dutch: "de berg", english: "the mountain", gender: "de", hint: "Like German 'Berg'" },
      { dutch: "de zee", english: "the sea", gender: "de", hint: "Like English 'sea'" },
      { dutch: "de rivier", english: "the river", gender: "de", hint: "Like English 'river'" },
      { dutch: "het meer", english: "the lake", gender: "het", hint: "Like English 'mere'" },
      { dutch: "het bos", english: "the forest", gender: "het", hint: "Woods" },
      { dutch: "het strand", english: "the beach", gender: "het", hint: "Like English 'strand'" },
      { dutch: "de lucht", english: "the sky/air", gender: "de", hint: "Related to 'light'" },
      { dutch: "de aarde", english: "the earth", gender: "de", hint: "Like English 'earth'" },
      { dutch: "de ster", english: "the star", gender: "de", hint: "Like English 'star'" },
      { dutch: "de maan", english: "the moon", gender: "de", hint: "Like English 'moon'" }
    ],
    plants: [
      { dutch: "het gras", english: "the grass", gender: "het", hint: "Like English 'grass'" },
      { dutch: "de plant", english: "the plant", gender: "de", hint: "Like English 'plant'" },
      { dutch: "het blad", english: "the leaf", gender: "het", hint: "Like English 'blade'" },
      { dutch: "de wortel", english: "the root", gender: "de", hint: "Like 'wort'" },
      { dutch: "het zaad", english: "the seed", gender: "het", hint: "Like English 'seed'" },
      { dutch: "de tulp", english: "the tulip", gender: "de", hint: "Famous Dutch flower" }
    ]
  },

  // =====================================================
  // DUTCH CULTURE - Nederlandse Cultuur
  // =====================================================
  culture: {
    unique: [
      { dutch: "de fiets", english: "the bicycle", gender: "de", hint: "Dutch transport" },
      { dutch: "de gracht", english: "the canal", gender: "de", hint: "Amsterdam famous" },
      { dutch: "de molen", english: "the windmill", gender: "de", hint: "Dutch icon" },
      { dutch: "de tulp", english: "the tulip", gender: "de", hint: "National flower" },
      { dutch: "de klompen", english: "the clogs", gender: "de", hint: "Traditional shoes" },
      { dutch: "de polder", english: "the polder", gender: "de", hint: "Reclaimed land" },
      { dutch: "de dijk", english: "the dike", gender: "de", hint: "Like English 'dike'" },
      { dutch: "gezellig", english: "cozy/convivial", hint: "Untranslatable Dutch concept" },
      { dutch: "de Koningsdag", english: "King's Day", gender: "de", hint: "National holiday" },
      { dutch: "de stroopwafel", english: "the stroopwafel", gender: "de", hint: "Syrup waffle" }
    ]
  }
};

// =====================================================
// FILL-IN-THE-BLANK SENTENCES
// Dutch sentence practice with missing words
// =====================================================

const DUTCH_FILL_BLANK = {
  // Greetings
  greetings: [
    {
      sentence: "___, hoe gaat het?",
      english: "Hello, how are you?",
      answer: "Hallo",
      distractors: ["Tot ziens", "Dank je", "Sorry"]
    },
    {
      sentence: "___! Hoe gaat het met u?",
      english: "Good morning! How are you?",
      answer: "Goedemorgen",
      distractors: ["Goedenavond", "Goedenacht", "Tot ziens"]
    },
    {
      sentence: "___ wel! - Graag gedaan!",
      english: "Thank you! - You're welcome!",
      answer: "Dank je",
      distractors: ["Hallo", "Tot ziens", "Ja"]
    },
    {
      sentence: "Ik moet gaan. ___!",
      english: "I have to go. Goodbye!",
      answer: "Tot ziens",
      distractors: ["Hallo", "Goedemorgen", "Dank je"]
    }
  ],

  // Articles
  articles: [
    {
      sentence: "___ hond rent.",
      english: "The dog runs.",
      answer: "De",
      distractors: ["Het", "Een", "Die"]
    },
    {
      sentence: "___ kind speelt.",
      english: "The child plays.",
      answer: "Het",
      distractors: ["De", "Een", "Die"]
    },
    {
      sentence: "___ huis is groot.",
      english: "The house is big.",
      answer: "Het",
      distractors: ["De", "Een", "Die"]
    },
    {
      sentence: "___ zee is blauw.",
      english: "The sea is blue.",
      answer: "De",
      distractors: ["Het", "Een", "Die"]
    }
  ],

  // Family
  family: [
    {
      sentence: "Mijn ___ is lerares.",
      english: "My mother is a teacher.",
      answer: "moeder",
      distractors: ["vader", "zus", "oma"]
    },
    {
      sentence: "Mijn ___ werkt in Amsterdam.",
      english: "My father works in Amsterdam.",
      answer: "vader",
      distractors: ["moeder", "broer", "opa"]
    },
    {
      sentence: "Ik heb twee ___ en een zus.",
      english: "I have two brothers and a sister.",
      answer: "broers",
      distractors: ["zussen", "kinderen", "ouders"]
    }
  ],

  // Verbs - Zijn (to be)
  zijn: [
    {
      sentence: "Ik ___ Nederlands.",
      english: "I am Dutch.",
      answer: "ben",
      distractors: ["bent", "is", "zijn"]
    },
    {
      sentence: "Jij ___ heel aardig.",
      english: "You are very nice.",
      answer: "bent",
      distractors: ["ben", "is", "zijn"]
    },
    {
      sentence: "Hij ___ de leraar.",
      english: "He is the teacher.",
      answer: "is",
      distractors: ["ben", "bent", "zijn"]
    },
    {
      sentence: "Wij ___ vrienden.",
      english: "We are friends.",
      answer: "zijn",
      distractors: ["ben", "is", "bent"]
    }
  ],

  // Verbs - Hebben (to have)
  hebben: [
    {
      sentence: "Ik ___ een hond.",
      english: "I have a dog.",
      answer: "heb",
      distractors: ["hebt", "heeft", "hebben"]
    },
    {
      sentence: "Jij ___ een mooi huis.",
      english: "You have a nice house.",
      answer: "hebt",
      distractors: ["heb", "heeft", "hebben"]
    },
    {
      sentence: "Zij ___ drie kinderen.",
      english: "She has three children.",
      answer: "heeft",
      distractors: ["heb", "hebt", "hebben"]
    },
    {
      sentence: "Wij ___ veel vrienden.",
      english: "We have many friends.",
      answer: "hebben",
      distractors: ["heb", "heeft", "hebt"]
    }
  ],

  // Food
  food: [
    {
      sentence: "Ik wil graag een ___, alstublieft.",
      english: "I would like a coffee, please.",
      answer: "koffie",
      distractors: ["water", "wijn", "brood"]
    },
    {
      sentence: "De ___ is lekker.",
      english: "The cheese is delicious.",
      answer: "kaas",
      distractors: ["salade", "bier", "vis"]
    },
    {
      sentence: "Ik wil ___ met kaas.",
      english: "I want bread with cheese.",
      answer: "brood",
      distractors: ["water", "koffie", "wijn"]
    }
  ],

  // Numbers
  numbers: [
    {
      sentence: "Ik heb ___ katten thuis.",
      english: "I have three cats at home.",
      answer: "drie",
      distractors: ["twee", "vier", "vijf"]
    },
    {
      sentence: "Er zijn ___ mensen in de kamer.",
      english: "There are seven people in the room.",
      answer: "zeven",
      distractors: ["zes", "acht", "negen"]
    }
  ],

  // Weather
  weather: [
    {
      sentence: "Vandaag schijnt de ___.",
      english: "Today the sun shines.",
      answer: "zon",
      distractors: ["wind", "lucht", "weer"]
    },
    {
      sentence: "Er valt veel ___.",
      english: "A lot of rain is falling.",
      answer: "regen",
      distractors: ["sneeuw", "zon", "wind"]
    },
    {
      sentence: "Vandaag is het erg ___.",
      english: "Today it's very cold.",
      answer: "koud",
      distractors: ["warm", "wind", "regen"]
    }
  ]
};

// =====================================================
// SENTENCE REORDER DATA
// Dutch sentences for word ordering practice
// =====================================================

const DUTCH_REORDER = {
  greetings: [
    { dutch: "Hallo, hoe gaat het?", english: "Hello, how are you?", words: ["Hallo,", "hoe", "gaat", "het?"] },
    { dutch: "Goedemorgen, hoe gaat het met u?", english: "Good morning, how are you?", words: ["Goedemorgen,", "hoe", "gaat", "het", "met", "u?"] },
    { dutch: "Ik heet Jan", english: "My name is Jan", words: ["Ik", "heet", "Jan"] },
    { dutch: "Aangenaam kennis te maken", english: "Nice to meet you", words: ["Aangenaam", "kennis", "te", "maken"] }
  ],

  basics: [
    { dutch: "Ik kom uit Nederland", english: "I come from the Netherlands", words: ["Ik", "kom", "uit", "Nederland"] },
    { dutch: "Ik spreek een beetje Nederlands", english: "I speak a little Dutch", words: ["Ik", "spreek", "een", "beetje", "Nederlands"] },
    { dutch: "Ik begrijp het niet", english: "I don't understand", words: ["Ik", "begrijp", "het", "niet"] },
    { dutch: "Waar is het hotel?", english: "Where is the hotel?", words: ["Waar", "is", "het", "hotel?"] }
  ],

  family: [
    { dutch: "Dit is mijn moeder", english: "This is my mother", words: ["Dit", "is", "mijn", "moeder"] },
    { dutch: "Ik heb twee broers", english: "I have two brothers", words: ["Ik", "heb", "twee", "broers"] },
    { dutch: "Mijn vader werkt", english: "My father works", words: ["Mijn", "vader", "werkt"] },
    { dutch: "Ik woon bij mijn ouders", english: "I live with my parents", words: ["Ik", "woon", "bij", "mijn", "ouders"] }
  ],

  food: [
    { dutch: "Ik wil een koffie", english: "I want a coffee", words: ["Ik", "wil", "een", "koffie"] },
    { dutch: "Het eten is lekker", english: "The food is delicious", words: ["Het", "eten", "is", "lekker"] },
    { dutch: "Hoeveel kost dit?", english: "How much does this cost?", words: ["Hoeveel", "kost", "dit?"] },
    { dutch: "Ik wil graag de rekening", english: "I would like the bill", words: ["Ik", "wil", "graag", "de", "rekening"] }
  ],

  locations: [
    { dutch: "Ik ga naar school", english: "I go to school", words: ["Ik", "ga", "naar", "school"] },
    { dutch: "Het huis is groot", english: "The house is big", words: ["Het", "huis", "is", "groot"] },
    { dutch: "De zee is dichtbij", english: "The sea is nearby", words: ["De", "zee", "is", "dichtbij"] },
    { dutch: "Ik wil naar Amsterdam gaan", english: "I want to go to Amsterdam", words: ["Ik", "wil", "naar", "Amsterdam", "gaan"] }
  ],

  weather: [
    { dutch: "Vandaag is het warm", english: "Today it's warm", words: ["Vandaag", "is", "het", "warm"] },
    { dutch: "Het weer is mooi", english: "The weather is nice", words: ["Het", "weer", "is", "mooi"] },
    { dutch: "Gisteren regende het veel", english: "Yesterday it rained a lot", words: ["Gisteren", "regende", "het", "veel"] }
  ],

  verbs: [
    { dutch: "Ik ben blij", english: "I am happy", words: ["Ik", "ben", "blij"] },
    { dutch: "Hij heeft een hond", english: "He has a dog", words: ["Hij", "heeft", "een", "hond"] },
    { dutch: "Wij spreken Nederlands", english: "We speak Dutch", words: ["Wij", "spreken", "Nederlands"] },
    { dutch: "Zij eten in het restaurant", english: "They eat at the restaurant", words: ["Zij", "eten", "in", "het", "restaurant"] }
  ]
};

// Export for module system (Node.js compatibility)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DUTCH_VOCAB, DUTCH_FILL_BLANK, DUTCH_REORDER };
}

// Also make available globally for browser
if (typeof window !== 'undefined') {
  window.DUTCH_VOCAB = DUTCH_VOCAB;
  window.DUTCH_FILL_BLANK = DUTCH_FILL_BLANK;
  window.DUTCH_REORDER = DUTCH_REORDER;
}
