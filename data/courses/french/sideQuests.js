// ByteQuest Side Quests
// Optional quests that complement the main story
// Organized by zone

const SIDE_QUESTS = {

  // =====================================================
  // ZONE 1: DAWNMERE SIDE QUESTS
  // Available after completing early main story quests
  // =====================================================

  sq_1_01_regas_recipe: {
    id: "sq_1_01_regas_recipe",
    name: "Rega's Recipe",
    zone: "dawnmere",
    giver: "rega",

    type: "side",
    category: "social",
    status: "locked",

    levelRequired: 2,
    prerequisites: ["ms_1_02_words_of_welcome"],

    description: "Rega the baker wants to recreate her grandmother's famous honey bread, but the old recipe card is written in a script she can't read.",

    objectives: [
      {
        id: "examine_recipe",
        type: "task",
        text: "Examine the old recipe card",
        target: 1
      },
      {
        id: "translate_ingredients",
        type: "vocabulary_challenge",
        text: "Identify the ingredients",
        target: 5,
        vocabCategory: "food"
      },
      {
        id: "gather_ingredients",
        type: "collect",
        text: "Gather the ingredients",
        target: 4
      },
      {
        id: "return_to_rega",
        type: "interact",
        text: "Return to Rega",
        target: "rega"
      }
    ],

    dialogue: {
      intro: "Oh, you can read! My grandmother left me this recipe - her honey bread was famous three villages over. But I can't make sense of these old letters. Could you help?",
      progress: "Any luck with the recipe? I've been dreaming of that bread for years.",
      complete: "You've done it! Miel, farine, oeufs... it all makes sense now. Here, take this - the first loaf is yours. And come back anytime, there's always a warm roll waiting for you."
    },

    rewards: {
      xp: 40,
      gold: 40,
      items: ["honey_bread", "regas_friendship"],
      reputation: { dawnmere: 15 }
    }
  },

  sq_1_02_lost_flock: {
    id: "sq_1_02_lost_flock",
    name: "The Lost Flock",
    zone: "dawnmere",
    giver: "shepherd_marcus",

    type: "side",
    category: "exploration",
    status: "locked",

    levelRequired: 3,
    prerequisites: ["ms_1_04_a_place_to_belong"],

    description: "Marcus the shepherd's flock has scattered toward the forest edge. He's too old to chase them himself.",

    objectives: [
      {
        id: "find_sheep_1",
        type: "exploration",
        text: "Find the sheep near the old oak",
        target: 1
      },
      {
        id: "find_sheep_2",
        type: "exploration",
        text: "Find the sheep by the stream",
        target: 1
      },
      {
        id: "find_sheep_3",
        type: "exploration",
        text: "Find the sheep at the forest edge",
        target: 1
      },
      {
        id: "return_flock",
        type: "interact",
        text: "Return the flock to Marcus",
        target: "shepherd_marcus"
      }
    ],

    dialogue: {
      intro: "Blast these old legs! The sheep got spooked by something and scattered. Three of them ran toward the forest - that's no place for them with the blight creeping closer. Please, can you bring them back?",
      progress: "Still looking? Check near the water - Blanchard always did love the stream.",
      complete: "You found them all! Bless you. These sheep are all I have left from my old life, before I came to Dawnmere. Here, take this wool - finest quality, I promise you that."
    },

    rewards: {
      xp: 50,
      gold: 35,
      items: ["fine_wool", "shepherds_crook"],
      reputation: { dawnmere: 20 }
    }
  },

  sq_1_03_tommens_secret: {
    id: "sq_1_03_tommens_secret",
    name: "Tommen's Secret",
    zone: "dawnmere",
    giver: "tommen",

    type: "side",
    category: "social",
    status: "locked",

    levelRequired: 3,
    prerequisites: ["ms_1_04_a_place_to_belong"],

    description: "You've noticed Tommen sneaking off in the evenings. He seems to be hiding something.",

    objectives: [
      {
        id: "follow_tommen",
        type: "exploration",
        text: "Follow Tommen after sunset",
        target: 1
      },
      {
        id: "discover_secret",
        type: "task",
        text: "Discover what he's doing",
        target: 1
      },
      {
        id: "talk_to_tommen",
        type: "interact",
        text: "Speak with Tommen",
        target: "tommen"
      },
      {
        id: "make_choice",
        type: "choice",
        text: "Decide how to help",
        options: ["train_together", "keep_secret", "tell_family"]
      }
    ],

    dialogue: {
      intro: null, // Quest discovered by observation, not given
      progress: "You... you followed me? Please, don't tell anyone.",
      complete_train: "You'll train with me? Really? I've been teaching myself from an old manual I found, but having a partner... thank you. Maybe one day I'll be good enough to protect this village.",
      complete_secret: "You'll keep my secret? Thank you. I just... I need to be ready. For whatever comes. The blight, the corruption - someone needs to stand guard.",
      complete_tell: "You told them? I... I suppose it's for the best. Mother was angry at first, but Father said he understood. He gave me his old sword. Said it was time I learned properly."
    },

    rewards: {
      xp: 45,
      gold: 30,
      items: ["training_sword"],
      reputation: { dawnmere: 15 },
      // Different outcomes based on choice
      outcomeRewards: {
        train_together: { unlocks: "training_partner_tommen" },
        keep_secret: { reputation: { tommen_personal: 25 } },
        tell_family: { items: ["family_heirloom_blade"] }
      }
    }
  },

  sq_1_04_the_old_well: {
    id: "sq_1_04_the_old_well",
    name: "The Old Well",
    zone: "dawnmere",
    giver: "isora",

    type: "side",
    category: "exploration",
    status: "locked",

    levelRequired: 4,
    prerequisites: ["ms_1_06_first_signs"],

    description: "Strange sounds have been coming from the abandoned well at the village edge. The settlers are worried.",

    objectives: [
      {
        id: "investigate_well",
        type: "exploration",
        text: "Investigate the old well",
        target: 1
      },
      {
        id: "descend_well",
        type: "task",
        text: "Descend into the well",
        target: 1
      },
      {
        id: "discover_source",
        type: "task",
        text: "Find the source of the sounds",
        target: 1
      },
      {
        id: "resolve_situation",
        type: "task",
        text: "Resolve the situation",
        target: 1
      },
      {
        id: "report_isora",
        type: "interact",
        text: "Report back to Isora",
        target: "isora"
      }
    ],

    dialogue: {
      intro: "That old well... it's been sealed for years, but lately there's been sounds. Scratching. Whimpering. The children are scared to go near it, and frankly, so am I. Would you take a look?",
      progress: "Did you find anything? The sounds were worse last night.",
      complete: "A fox and her kits? All this worry over a family of foxes! Though I suppose it's good you checked - could have been something worse. Thank you for putting our minds at ease. And for rescuing the little ones."
    },

    rewards: {
      xp: 55,
      gold: 45,
      items: ["fox_charm"], // Lucky charm made by grateful villagers
      loreUnlock: ["old_well_history"],
      reputation: { dawnmere: 25 }
    },

    // Hidden discovery in the well
    hiddenContent: {
      type: "lore_fragment",
      id: "well_inscription",
      description: "Ancient symbols carved into the well stones - too worn to read fully, but they match symbols you'll see again later..."
    }
  },

  // =====================================================
  // ZONE 2: HAARI FIELDS SIDE QUESTS
  // Available after completing early Zone 2 main story quests
  // =====================================================

  sq_2_01_daves_burden: {
    id: "sq_2_01_daves_burden",
    name: "Dave's Burden",
    zone: "haari_fields",
    giver: "dave",

    type: "side",
    category: "social",
    status: "locked",

    levelRequired: 6,
    prerequisites: ["ms_2_02"],

    description: "Dave's father's plow has broken. The old tool holds deep sentimental value - it's all he has left of his father's memory.",

    objectives: [
      {
        id: "talk_dave_plow",
        type: "interact",
        text: "Talk to Dave about the broken plow",
        target: "dave"
      },
      {
        id: "examine_plow",
        type: "exploration",
        text: "Examine the broken plow in the field",
        target: 1
      },
      {
        id: "find_repair",
        type: "task",
        text: "Find someone who can repair the plow blade",
        target: 1
      },
      {
        id: "return_dave_complete",
        type: "interact",
        text: "Return to Dave with the repaired piece",
        target: "dave"
      }
    ],

    dialogue: {
      intro: "You've been a great help around here, friend. But there's something I haven't told anyone... My father's plow - the one he brought from the old country - the blade finally snapped. I know it's just a tool, but it's... it's all I have left of him.",
      progress: "Any luck? I can't bring myself to replace it. Not yet.",
      complete: "You fixed it? You actually... I don't know what to say. This plow turned the first furrow my father ever planted. And now it'll turn many more. Thank you. You've preserved more than a tool today - you've preserved a memory."
    },

    rewards: {
      xp: 50,
      gold: 25,
      reputation: { haari_fields: 20 },
      unlocks: ["dave_trust"]
    }
  },

  sq_2_02_lyras_garden: {
    id: "sq_2_02_lyras_garden",
    name: "Lyra's Garden Secret",
    zone: "haari_fields",
    giver: "lyra",

    type: "side",
    category: "exploration",
    status: "locked",

    levelRequired: 7,
    prerequisites: ["ms_2_03"],

    description: "Lyra maintains a hidden garden in a secluded grove, but something has been damaging her rarest plants. She needs help investigating.",

    objectives: [
      {
        id: "visit_garden",
        type: "exploration",
        text: "Visit Lyra's hidden garden",
        target: 1
      },
      {
        id: "examine_damage",
        type: "task",
        text: "Examine the damaged plants",
        target: 1
      },
      {
        id: "find_clues",
        type: "exploration",
        text: "Search for tracks or clues",
        target: 1
      },
      {
        id: "report_lyra",
        type: "interact",
        text: "Report your findings to Lyra",
        target: "lyra"
      },
      {
        id: "garden_choice",
        type: "choice",
        text: "Decide how to help protect the garden",
        options: ["build_fence", "relocate_plants"]
      }
    ],

    dialogue: {
      intro: "I don't show many people this place... but I need help. My private garden - where I grow my rarest herbs - something has been destroying them. I've worked years to cultivate these specimens. Please, help me find out what's happening.",
      progress: "Have you found anything? Each day more damage appears.",
      complete_fence: "A fence? Yes, that could work. The deer won't be able to reach them. Thank you for thinking of a solution that doesn't require moving everything. Here - you've earned access to this garden. Come gather here whenever you wish.",
      complete_relocate: "Move them closer to my cottage... It's a lot of work, but you're right - they'd be safer there. Help me transplant them? This garden will become yours to visit whenever you need herbs."
    },

    rewards: {
      xp: 60,
      gold: 30,
      reputation: { haari_fields: 25 },
      unlocks: ["lyras_garden_access"],
      outcomeRewards: {
        build_fence: { items: ["garden_key"] },
        relocate_plants: { items: ["rare_herb_bundle"] }
      }
    }
  },

  sq_2_03_venns_verse: {
    id: "sq_2_03_venns_verse",
    name: "Venn's Lost Verse",
    zone: "haari_fields",
    giver: "venn",

    type: "side",
    category: "lore",
    status: "locked",

    levelRequired: 7,
    prerequisites: ["ms_2_04"],

    description: "The traveling bard Venn knows an ancient ballad about the founding of Haari Fields, but one verse has been lost to time. The Standing Stones may hold the answer.",

    objectives: [
      {
        id: "talk_venn_song",
        type: "interact",
        text: "Ask Venn about the lost song",
        target: "venn"
      },
      {
        id: "visit_stones",
        type: "exploration",
        text: "Visit the Standing Stones",
        target: 1
      },
      {
        id: "examine_inscriptions",
        type: "task",
        text: "Examine the ancient inscriptions",
        target: 1
      },
      {
        id: "return_verse",
        type: "interact",
        text: "Return the lost verse to Venn",
        target: "venn"
      },
      {
        id: "hear_song",
        type: "task",
        text: "Listen to the complete ballad",
        target: 1
      }
    ],

    dialogue: {
      intro: "Ah, you have a curious spirit! I've been trying to piece together the Ballad of the Golden Fields - an old song about when these lands were first settled. But the third verse... it's been lost for generations. The Standing Stones might remember what we've forgotten.",
      progress: "The stones hold secrets, but they're patient. Have you deciphered their message?",
      complete: "You found it! Listen - 'Where shadow met the golden grain, the first folk made their stand. With words of old they blessed the land, and darkness fled their hand.' Beautiful! It speaks of the blight's first defeat. Here, take this - a bard's token of gratitude. When you need courage, remember this song."
    },

    rewards: {
      xp: 55,
      gold: 20,
      reputation: { haari_fields: 20 },
      loreUnlock: ["haari_ballad_complete"],
      unlocks: ["venns_courage_song"]
    },

    hiddenContent: {
      type: "lore_fragment",
      id: "standing_stone_verse",
      description: "The inscription reveals that the Standing Stones were raised not as monuments, but as a barrier against something ancient..."
    }
  },

  // =====================================================
  // DAWNMERE: Gathering Introduction
  // =====================================================

  sq_1_05_the_gatherers_path: {
    id: "sq_1_05_the_gatherers_path",
    name: "The Gatherer's Path",
    zone: "dawnmere",
    giver: "forager_wynn",

    type: "side",
    category: "exploration",
    status: "locked",

    levelRequired: 3,
    prerequisites: ["ms_1_03_choose_your_path"],

    description: "A resourceful forager named Wynn offers to teach you how to gather materials from the land. Every adventurer needs to know how to live off the wilds.",

    onAccept: {
      gatheringUnlock: ["woodcutting", "mining"]
    },

    objectives: [
      {
        id: "talk_wynn",
        type: "interact",
        text: "Speak with Forager Wynn",
        target: "forager_wynn"
      },
      {
        id: "gather_wood",
        type: "gather",
        text: "Gather wood from a tree",
        target: 1,
        skill: "woodcutting"
      },
      {
        id: "mine_stone",
        type: "gather",
        text: "Mine a stone deposit",
        target: 1,
        skill: "mining"
      },
      {
        id: "learn_herbs",
        type: "task",
        text: "Learn about the local herbs",
        target: 1
      },
      {
        id: "return_wynn",
        type: "interact",
        text: "Return to Wynn with your findings",
        target: "forager_wynn"
      }
    ],

    dialogue: {
      intro: "You've chosen your path, have you? Good. But no matter what calling you follow, you'll need to know how to gather from the land. Wood for warmth, stone for shelter, herbs for healing. Let me show you the basics — it's kept me alive longer than any sword ever could.",
      progress: "Have you tried your hand at woodcutting and mining yet? The land provides, but you have to learn to listen to it first.",
      complete: "Well done! You're a natural. Here — take these herbalist's tools. The forests and fields are full of useful plants once you know what to look for. Remember: the land provides for those who treat it with respect."
    },

    rewards: {
      xp: 45,
      gold: 25,
      items: ["wynns_gathering_satchel"],
      gatheringUnlock: "herbalism",
      reputation: { dawnmere: 10 }
    }
  },

  sq_2_04_rasks_warning: {
    id: "sq_2_04_rasks_warning",
    name: "Rask's Warning",
    zone: "haari_fields",
    giver: "rask",

    type: "side",
    category: "exploration",
    status: "locked",

    levelRequired: 8,
    prerequisites: ["ms_2_05"],

    description: "The tracker Rask has spotted unfamiliar tracks at the edge of the fields. Before raising alarm, he wants to know what made them.",

    objectives: [
      {
        id: "meet_rask",
        type: "interact",
        text: "Meet Rask at the field's edge",
        target: "rask"
      },
      {
        id: "follow_tracks",
        type: "exploration",
        text: "Follow the mysterious tracks",
        target: 1
      },
      {
        id: "discover_source",
        type: "task",
        text: "Discover what made the tracks",
        target: 1
      },
      {
        id: "decision",
        type: "choice",
        text: "Decide what to do with your discovery",
        options: ["report_village", "keep_quiet"]
      },
      {
        id: "return_rask",
        type: "interact",
        text: "Return to Rask with your decision",
        target: "rask"
      }
    ],

    dialogue: {
      intro: "I need your eyes, and your discretion. I've found tracks at the eastern edge - not animal, not villager. Something... else. Before I sound the alarm and cause panic, I need to know what we're dealing with. Will you help me track it?",
      progress: "Stay low and quiet. Whatever made these tracks, it doesn't want to be found.",
      complete_report: "Travelers from the west? Refugees, you say. Yes, we should tell the village - they'll need food and shelter. You made the right call. Take this token - you've proven yourself a scout I can trust.",
      complete_quiet: "You're right, no need to alarm everyone over hungry travelers. We'll keep watch quietly. I appreciate your judgment. Take this - among trackers, it marks you as one who can be trusted with secrets."
    },

    rewards: {
      xp: 65,
      gold: 35,
      reputation: { haari_fields: 25 },
      items: ["rasks_token"],
      outcomeRewards: {
        report_village: { reputation: { haari_fields: 10 } },
        keep_quiet: { unlocks: ["rask_trusted_scout"] }
      }
    }
  }

};

// =====================================================
// Side Quest NPCs (Dawnmere additions)
// =====================================================

const SIDE_QUEST_NPCS = {
  forager_wynn: {
    id: "forager_wynn",
    name: "Wynn",
    role: "Forager",
    location: "dawnmere",

    dialogue: {
      greeting: "The forest is generous today. I can smell rain coming — good for the herbs.",
      idle: [
        "Every tree tells a story if you know where to look.",
        "I've foraged these woods since I was knee-high. There's always something new to find.",
        "The best gatherers listen more than they look."
      ],
      noQuest: "Keep practicing your gathering. The land has more to teach you yet."
    },

    quests: ["sq_1_05_the_gatherers_path"]
  },

  shepherd_marcus: {
    id: "shepherd_marcus",
    name: "Marcus",
    role: "Shepherd",
    location: "dawnmere",

    dialogue: {
      greeting: "Fine day for the flock, wouldn't you say?",
      idle: [
        "Blanchard, Colette, Petit-Jean... I name them all, you know.",
        "In my old village, we had a hundred head. Now just these few.",
        "The sheep know when something's wrong. They've been nervous lately."
      ],
      noQuest: "The flock is content. Thank you again for your help."
    },

    quests: ["sq_1_02_lost_flock"]
  }
};

// =====================================================
// Side Quest Items
// =====================================================

const SIDE_QUEST_ITEMS = {
  honey_bread: {
    id: "honey_bread",
    name: "Rega's Honey Bread",
    type: "consumable",
    icon: "bread",
    description: "A warm loaf of honey bread made from a family recipe. Restores energy and boosts mood.",
    rarity: "common",
    stackable: true,
    maxStack: 5,
    value: 8,
    effect: {
      heal: 20,
      buff: "well_fed",
      duration: 300
    }
  },

  regas_friendship: {
    id: "regas_friendship",
    name: "Rega's Favor",
    type: "key_item",
    icon: "heart",
    description: "Rega considers you a friend. Free bread whenever you visit!",
    rarity: "uncommon",
    stackable: false,
    value: 0,
    effect: {
      unlocks: "free_bread_rega"
    }
  },

  fine_wool: {
    id: "fine_wool",
    name: "Fine Wool",
    type: "material",
    icon: "wool",
    description: "High-quality wool from Marcus's prized sheep. Useful for crafting.",
    rarity: "common",
    stackable: true,
    maxStack: 20,
    value: 12
  },

  shepherds_crook: {
    id: "shepherds_crook",
    name: "Shepherd's Crook",
    type: "weapon",
    icon: "staff",
    description: "A sturdy walking staff. Not much of a weapon, but reliable.",
    rarity: "common",
    stackable: false,
    value: 25,
    stats: {
      attack: 3,
      stamina: 5
    }
  },

  training_sword: {
    id: "training_sword",
    name: "Training Sword",
    type: "weapon",
    icon: "sword",
    description: "A wooden practice sword. Tommen made it himself.",
    rarity: "common",
    stackable: false,
    value: 15,
    stats: {
      attack: 2
    }
  },

  family_heirloom_blade: {
    id: "family_heirloom_blade",
    name: "Heirloom Blade",
    type: "weapon",
    icon: "sword",
    description: "Tommen's father's old sword. Well-maintained despite its age.",
    rarity: "uncommon",
    stackable: false,
    value: 75,
    stats: {
      attack: 8,
      insight: 1
    }
  },

  wynns_gathering_satchel: {
    id: "wynns_gathering_satchel",
    name: "Wynn's Gathering Satchel",
    type: "accessory",
    icon: "bag",
    description: "A well-worn leather satchel with many pockets, perfect for storing gathered materials. Increases gathering yield.",
    rarity: "uncommon",
    stackable: false,
    value: 35,
    stats: {
      gatheringBonus: 1
    }
  },

  fox_charm: {
    id: "fox_charm",
    name: "Fox Charm",
    type: "accessory",
    icon: "charm",
    description: "A small carved fox, made by the village children as thanks. Said to bring luck.",
    rarity: "uncommon",
    stackable: false,
    value: 30,
    stats: {
      luck: 2
    }
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SIDE_QUESTS,
    SIDE_QUEST_NPCS,
    SIDE_QUEST_ITEMS
  };
}
