/**
 * ByteQuest - French Vocabulary Data
 * Simple, direct vocabulary definitions for lessons
 */

const FRENCH_VOCAB = {
  // Greetings
  greetings: [
    { french: "Bonjour", english: "Hello / Good day" },
    { french: "Bonsoir", english: "Good evening" },
    { french: "Salut", english: "Hi / Hey" },
    { french: "Au revoir", english: "Goodbye" },
    { french: "À bientôt", english: "See you soon" },
    { french: "Merci", english: "Thank you" },
    { french: "S'il vous plaît", english: "Please" },
    { french: "De rien", english: "You're welcome" }
  ],

  // Introductions
  introductions: [
    { french: "Je m'appelle...", english: "My name is..." },
    { french: "Comment vous appelez-vous?", english: "What is your name?" },
    { french: "Enchanté(e)", english: "Nice to meet you" },
    { french: "Je suis...", english: "I am..." },
    { french: "D'où venez-vous?", english: "Where are you from?" },
    { french: "Je viens de...", english: "I come from..." }
  ],

  // Numbers 0-10
  numbers: [
    { french: "zéro", english: "zero" },
    { french: "un", english: "one" },
    { french: "deux", english: "two" },
    { french: "trois", english: "three" },
    { french: "quatre", english: "four" },
    { french: "cinq", english: "five" },
    { french: "six", english: "six" },
    { french: "sept", english: "seven" },
    { french: "huit", english: "eight" },
    { french: "neuf", english: "nine" },
    { french: "dix", english: "ten" }
  ],

  // Colors
  colors: [
    { french: "rouge", english: "red" },
    { french: "bleu", english: "blue" },
    { french: "vert", english: "green" },
    { french: "jaune", english: "yellow" },
    { french: "orange", english: "orange" },
    { french: "violet", english: "purple" },
    { french: "rose", english: "pink" },
    { french: "noir", english: "black" },
    { french: "blanc", english: "white" },
    { french: "gris", english: "gray" }
  ],

  // Days of the week
  days: [
    { french: "lundi", english: "Monday" },
    { french: "mardi", english: "Tuesday" },
    { french: "mercredi", english: "Wednesday" },
    { french: "jeudi", english: "Thursday" },
    { french: "vendredi", english: "Friday" },
    { french: "samedi", english: "Saturday" },
    { french: "dimanche", english: "Sunday" }
  ],

  // Cognates (words similar to English)
  cognates: [
    { french: "la table", english: "table" },
    { french: "l'animal", english: "animal" },
    { french: "le fruit", english: "fruit" },
    { french: "l'orange", english: "orange" },
    { french: "le train", english: "train" },
    { french: "le taxi", english: "taxi" },
    { french: "l'hôtel", english: "hotel" },
    { french: "le restaurant", english: "restaurant" },
    { french: "le menu", english: "menu" },
    { french: "la rose", english: "rose" },
    { french: "le piano", english: "piano" },
    { french: "la radio", english: "radio" }
  ],

  // Family
  family: [
    { french: "la famille", english: "family" },
    { french: "la mère", english: "mother" },
    { french: "le père", english: "father" },
    { french: "la sœur", english: "sister" },
    { french: "le frère", english: "brother" },
    { french: "la fille", english: "daughter" },
    { french: "le fils", english: "son" },
    { french: "la grand-mère", english: "grandmother" },
    { french: "le grand-père", english: "grandfather" }
  ],

  // Food
  food: [
    { french: "le pain", english: "bread" },
    { french: "le fromage", english: "cheese" },
    { french: "le lait", english: "milk" },
    { french: "l'eau", english: "water" },
    { french: "la pomme", english: "apple" },
    { french: "le gâteau", english: "cake" },
    { french: "le croissant", english: "croissant" },
    { french: "l'œuf", english: "egg" },
    { french: "le beurre", english: "butter" },
    { french: "le sucre", english: "sugar" }
  ],

  // Essential phrases
  essentials: [
    { french: "Oui", english: "Yes" },
    { french: "Non", english: "No" },
    { french: "Excusez-moi", english: "Excuse me" },
    { french: "Pardon", english: "Sorry" },
    { french: "Je ne comprends pas", english: "I don't understand" },
    { french: "Parlez-vous anglais?", english: "Do you speak English?" },
    { french: "Comment dit-on...?", english: "How do you say...?" },
    { french: "Répétez, s'il vous plaît", english: "Please repeat" }
  ],

  // Nature & Plants (for Herbalism mastery)
  nature: [
    { french: "l'herbe", english: "grass/herb" },
    { french: "la plante", english: "plant" },
    { french: "la fleur", english: "flower" },
    { french: "l'arbre", english: "tree" },
    { french: "la feuille", english: "leaf" },
    { french: "la racine", english: "root" },
    { french: "la graine", english: "seed" },
    { french: "le jardin", english: "garden" },
    { french: "la forêt", english: "forest" },
    { french: "le champignon", english: "mushroom" },
    { french: "la mousse", english: "moss" },
    { french: "l'écorce", english: "bark" },
    { french: "la branche", english: "branch" },
    { french: "le buisson", english: "bush" },
    { french: "la lavande", english: "lavender" },
    { french: "le thym", english: "thyme" },
    { french: "la menthe", english: "mint" },
    { french: "le basilic", english: "basil" },
    { french: "le romarin", english: "rosemary" },
    { french: "la sauge", english: "sage" },
    { french: "la camomille", english: "chamomile" },
    { french: "l'ortie", english: "nettle" },
    { french: "le pissenlit", english: "dandelion" },
    { french: "le trèfle", english: "clover" },
    { french: "la fougère", english: "fern" }
  ],

  // Water & Fishing (for Fishing mastery)
  water: [
    { french: "l'eau", english: "water" },
    { french: "la rivière", english: "river" },
    { french: "le lac", english: "lake" },
    { french: "la mer", english: "sea" },
    { french: "le poisson", english: "fish" },
    { french: "la truite", english: "trout" },
    { french: "le saumon", english: "salmon" },
    { french: "la carpe", english: "carp" },
    { french: "l'anguille", english: "eel" },
    { french: "le brochet", english: "pike" },
    { french: "la perche", english: "perch" },
    { french: "le thon", english: "tuna" },
    { french: "la crevette", english: "shrimp" },
    { french: "le crabe", english: "crab" },
    { french: "la moule", english: "mussel" },
    { french: "l'huître", english: "oyster" },
    { french: "le filet", english: "net" },
    { french: "la canne à pêche", english: "fishing rod" },
    { french: "l'appât", english: "bait" },
    { french: "l'hameçon", english: "hook" },
    { french: "la vague", english: "wave" },
    { french: "le courant", english: "current" },
    { french: "la rive", english: "shore/bank" },
    { french: "le pont", english: "bridge" },
    { french: "le bateau", english: "boat" }
  ],

  // Earth & Mining (for Mining mastery)
  earth: [
    { french: "la terre", english: "earth/soil" },
    { french: "la pierre", english: "stone" },
    { french: "le rocher", english: "rock" },
    { french: "le fer", english: "iron" },
    { french: "l'or", english: "gold" },
    { french: "l'argent", english: "silver" },
    { french: "le cuivre", english: "copper" },
    { french: "le bronze", english: "bronze" },
    { french: "l'acier", english: "steel" },
    { french: "le métal", english: "metal" },
    { french: "le cristal", english: "crystal" },
    { french: "le diamant", english: "diamond" },
    { french: "le rubis", english: "ruby" },
    { french: "l'émeraude", english: "emerald" },
    { french: "le saphir", english: "sapphire" },
    { french: "la mine", english: "mine" },
    { french: "le tunnel", english: "tunnel" },
    { french: "la caverne", english: "cave" },
    { french: "le charbon", english: "coal" },
    { french: "le minerai", english: "ore" },
    { french: "la pioche", english: "pickaxe" },
    { french: "la pelle", english: "shovel" },
    { french: "le marteau", english: "hammer" },
    { french: "la montagne", english: "mountain" },
    { french: "la falaise", english: "cliff" }
  ],

  // Commerce & Trading (for Trading mastery)
  commerce: [
    { french: "acheter", english: "to buy" },
    { french: "vendre", english: "to sell" },
    { french: "le prix", english: "price" },
    { french: "l'argent", english: "money" },
    { french: "la pièce", english: "coin" },
    { french: "le marché", english: "market" },
    { french: "la boutique", english: "shop" },
    { french: "le marchand", english: "merchant" },
    { french: "le client", english: "customer" },
    { french: "la réduction", english: "discount" },
    { french: "cher", english: "expensive" },
    { french: "bon marché", english: "cheap" },
    { french: "payer", english: "to pay" },
    { french: "la monnaie", english: "change (money)" },
    { french: "le commerce", english: "trade/commerce" },
    { french: "échanger", english: "to exchange" },
    { french: "la valeur", english: "value" },
    { french: "le bénéfice", english: "profit" },
    { french: "la perte", english: "loss" },
    { french: "négocier", english: "to negotiate" }
  ],

  // Crafting & Tools (for Crafting mastery)
  crafting: [
    { french: "fabriquer", english: "to make/craft" },
    { french: "créer", english: "to create" },
    { french: "l'outil", english: "tool" },
    { french: "le bois", english: "wood" },
    { french: "le cuir", english: "leather" },
    { french: "le tissu", english: "fabric" },
    { french: "le fil", english: "thread" },
    { french: "l'aiguille", english: "needle" },
    { french: "le marteau", english: "hammer" },
    { french: "la scie", english: "saw" },
    { french: "le clou", english: "nail" },
    { french: "la colle", english: "glue" },
    { french: "couper", english: "to cut" },
    { french: "coudre", english: "to sew" },
    { french: "forger", english: "to forge" },
    { french: "l'atelier", english: "workshop" },
    { french: "la recette", english: "recipe" },
    { french: "l'ingrédient", english: "ingredient" },
    { french: "mélanger", english: "to mix" },
    { french: "assembler", english: "to assemble" }
  ]
};

// Make globally accessible
window.FRENCH_VOCAB = FRENCH_VOCAB;
console.log('[vocab.js] Loaded FRENCH_VOCAB with categories:', Object.keys(FRENCH_VOCAB));
