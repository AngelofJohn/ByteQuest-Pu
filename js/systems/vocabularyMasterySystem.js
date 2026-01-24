/**
 * ByteQuest - Vocabulary Mastery System
 * Permanent upgrades unlocked by mastering vocabulary categories
 *
 * Learning French = Getting Stronger
 * Master nature words → Better herbalism
 * Master water words → Better fishing
 * Master earth words → Better mining
 * Master commerce words → Better trading
 * Master crafting words → Better crafting
 *
 * Also includes:
 * - Global milestones (total words mastered)
 * - Translation quest requirements
 * - Monument unlock gates
 */

const VocabularyMasterySystem = {
  // Global milestones based on total words mastered (Box 4+)
  milestones: {
    novice_speaker: {
      id: 'novice_speaker',
      name: 'Novice Speaker',
      threshold: 10,
      icon: '📖',
      description: 'Master 10 words',
      rewards: {
        unlock: 'translation_quests',
        xpBonus: 50
      }
    },
    apprentice_speaker: {
      id: 'apprentice_speaker',
      name: 'Apprentice Speaker',
      threshold: 25,
      icon: '📚',
      description: 'Master 25 words',
      rewards: {
        unlock: 'monuments',
        xpBonus: 100
      }
    },
    journeyman_speaker: {
      id: 'journeyman_speaker',
      name: 'Journeyman Speaker',
      threshold: 50,
      icon: '🎓',
      description: 'Master 50 words',
      rewards: {
        unlock: 'zone_2',
        xpBonus: 200
      }
    },
    adept_speaker: {
      id: 'adept_speaker',
      name: 'Adept Speaker',
      threshold: 100,
      icon: '🏛️',
      description: 'Master 100 words',
      rewards: {
        unlock: 'advanced_translations',
        xpBonus: 500
      }
    },
    expert_speaker: {
      id: 'expert_speaker',
      name: 'Expert Speaker',
      threshold: 150,
      icon: '👑',
      description: 'Master 150 words',
      rewards: {
        unlock: 'zone_3',
        xpBonus: 750
      }
    },
    master_speaker: {
      id: 'master_speaker',
      name: 'Master Speaker',
      threshold: 200,
      icon: '⭐',
      description: 'Master 200 words',
      rewards: {
        unlock: 'prestige',
        xpBonus: 1000
      }
    }
  },

  // Translation quest definitions
  translationQuests: {
    herbalists_journal: {
      id: 'herbalists_journal',
      name: "Herbalist's Journal",
      itemId: 'ancient_text_herbalist',
      category: 'nature',
      wordsRequired: 8,
      description: 'A weathered journal filled with botanical sketches',
      rewards: {
        monumentShards: 1,
        recipe: 'rare_herb_potion',
        xp: 75
      }
    },
    fishermans_log: {
      id: 'fishermans_log',
      name: "Fisherman's Log",
      itemId: 'ancient_text_fisherman',
      category: 'water',
      wordsRequired: 8,
      description: 'A salt-stained logbook detailing prime fishing spots',
      rewards: {
        monumentShards: 1,
        unlock: 'secret_fishing_spot',
        xp: 75
      }
    },
    miners_map: {
      id: 'miners_map',
      name: "Miner's Map",
      itemId: 'ancient_text_miner',
      category: 'earth',
      wordsRequired: 8,
      description: 'A torn map marking ore veins deep underground',
      rewards: {
        monumentShards: 1,
        unlock: 'rich_ore_vein',
        xp: 75
      }
    },
    merchants_ledger: {
      id: 'merchants_ledger',
      name: "Merchant's Ledger",
      itemId: 'ancient_text_merchant',
      category: 'commerce',
      wordsRequired: 8,
      description: 'An old ledger with trade secrets and contacts',
      rewards: {
        monumentShards: 1,
        shopDiscount: 0.05,
        xp: 75
      }
    },
    old_recipe_book: {
      id: 'old_recipe_book',
      name: "Old Recipe Book",
      itemId: 'ancient_text_recipes',
      category: 'food',
      wordsRequired: 8,
      description: 'A cookbook with forgotten culinary traditions',
      rewards: {
        monumentShards: 1,
        recipe: 'gourmet_meal',
        xp: 75
      }
    },
    crafters_manual: {
      id: 'crafters_manual',
      name: "Crafter's Manual",
      itemId: 'ancient_text_crafter',
      category: 'crafting',
      wordsRequired: 8,
      description: 'Detailed instructions for advanced crafting techniques',
      rewards: {
        monumentShards: 2,
        recipe: 'masterwork_tool',
        xp: 100
      }
    }
  },

  // Monument definitions (special village projects)
  monuments: {
    shrine_of_words: {
      id: 'shrine_of_words',
      name: 'Shrine of Words',
      icon: '🏛️',
      description: 'A monument to the power of language',
      requirements: {
        monumentShards: 3,
        resources: { wood: 100, stone: 50 },
        totalMastered: 25
      },
      bonus: {
        lessonXpBonus: 0.1,
        description: '+10% XP from lessons'
      }
    },
    pillar_of_nature: {
      id: 'pillar_of_nature',
      name: 'Pillar of Nature',
      icon: '🌿',
      description: 'A living monument that attracts rare plants',
      requirements: {
        monumentShards: 3,
        resources: { herb: 150, wood: 50 },
        categoryMastered: { nature: 15 }
      },
      bonus: {
        rareHerbChance: 0.15,
        description: '+15% rare herb chance'
      }
    },
    fountain_of_wisdom: {
      id: 'fountain_of_wisdom',
      name: 'Fountain of Wisdom',
      icon: '⛲',
      description: 'Waters that refresh the mind',
      requirements: {
        monumentShards: 5,
        resources: { stone: 200 },
        gold: 100,
        totalMastered: 50
      },
      bonus: {
        reviewCooldownReduction: 0.1,
        description: '-10% review cooldown'
      }
    },
    obelisk_of_trade: {
      id: 'obelisk_of_trade',
      name: 'Obelisk of Trade',
      icon: '🗿',
      description: 'Attracts merchants from distant lands',
      requirements: {
        monumentShards: 5,
        gold: 500,
        categoryMastered: { commerce: 15 }
      },
      bonus: {
        shopDiscount: 0.1,
        description: '10% shop discount'
      }
    },
    gateway_stone: {
      id: 'gateway_stone',
      name: 'Gateway Stone',
      icon: '🚪',
      description: 'Opens the path to new lands',
      requirements: {
        monumentShards: 10,
        resources: { stone: 300, ore: 200 },
        totalMastered: 100
      },
      bonus: {
        unlock: 'zone_2_access',
        description: 'Unlocks Zone 2'
      }
    }
  },


  // Upgrade definitions: category → skill bonuses
  // threshold = words needed at Box 4+ to unlock
  upgrades: {
    // Herbalism upgrades (nature category)
    herbalism_1: {
      id: 'herbalism_1',
      name: 'Apprentice Herbalist',
      category: 'nature',
      threshold: 5,
      skill: 'herbalism',
      bonus: { gatherAmount: 1 },
      description: '+1 herb per gather',
      icon: '🌿'
    },
    herbalism_2: {
      id: 'herbalism_2',
      name: 'Journeyman Herbalist',
      category: 'nature',
      threshold: 12,
      skill: 'herbalism',
      bonus: { rareChance: 0.1 },
      description: '10% chance for rare herbs',
      icon: '🌸'
    },
    herbalism_3: {
      id: 'herbalism_3',
      name: 'Expert Herbalist',
      category: 'nature',
      threshold: 20,
      skill: 'herbalism',
      bonus: { gatherAmount: 2 },
      description: '+2 herbs per gather',
      icon: '🌺'
    },

    // Fishing upgrades (water category)
    fishing_1: {
      id: 'fishing_1',
      name: 'Apprentice Angler',
      category: 'water',
      threshold: 5,
      skill: 'fishing',
      bonus: { gatherAmount: 1 },
      description: '+1 fish per catch',
      icon: '🐟'
    },
    fishing_2: {
      id: 'fishing_2',
      name: 'Journeyman Angler',
      category: 'water',
      threshold: 12,
      skill: 'fishing',
      bonus: { rareChance: 0.1 },
      description: '10% chance for rare fish',
      icon: '🐠'
    },
    fishing_3: {
      id: 'fishing_3',
      name: 'Expert Angler',
      category: 'water',
      threshold: 20,
      skill: 'fishing',
      bonus: { gatherAmount: 2 },
      description: '+2 fish per catch',
      icon: '🎣'
    },

    // Mining upgrades (earth category)
    mining_1: {
      id: 'mining_1',
      name: 'Apprentice Miner',
      category: 'earth',
      threshold: 5,
      skill: 'mining',
      bonus: { gatherAmount: 1 },
      description: '+1 ore per mine',
      icon: '🪨'
    },
    mining_2: {
      id: 'mining_2',
      name: 'Journeyman Miner',
      category: 'earth',
      threshold: 12,
      skill: 'mining',
      bonus: { rareChance: 0.1 },
      description: '10% chance for gems',
      icon: '💎'
    },
    mining_3: {
      id: 'mining_3',
      name: 'Expert Miner',
      category: 'earth',
      threshold: 20,
      skill: 'mining',
      bonus: { gatherAmount: 2 },
      description: '+2 ore per mine',
      icon: '⛏️'
    },

    // Trading upgrades (commerce category)
    trading_1: {
      id: 'trading_1',
      name: 'Apprentice Merchant',
      category: 'commerce',
      threshold: 5,
      skill: 'trading',
      bonus: { priceDiscount: 0.05 },
      description: '5% shop discount',
      icon: '🪙'
    },
    trading_2: {
      id: 'trading_2',
      name: 'Journeyman Merchant',
      category: 'commerce',
      threshold: 12,
      skill: 'trading',
      bonus: { sellBonus: 0.1 },
      description: '+10% sell price',
      icon: '💰'
    },
    trading_3: {
      id: 'trading_3',
      name: 'Expert Merchant',
      category: 'commerce',
      threshold: 20,
      skill: 'trading',
      bonus: { priceDiscount: 0.1 },
      description: '10% shop discount',
      icon: '🏪'
    },

    // Crafting upgrades (crafting category)
    crafting_1: {
      id: 'crafting_1',
      name: 'Apprentice Crafter',
      category: 'crafting',
      threshold: 5,
      skill: 'crafting',
      bonus: { craftBonus: 1 },
      description: '+1 item per craft',
      icon: '🔨'
    },
    crafting_2: {
      id: 'crafting_2',
      name: 'Journeyman Crafter',
      category: 'crafting',
      threshold: 12,
      skill: 'crafting',
      bonus: { materialSave: 0.1 },
      description: '10% chance to save materials',
      icon: '⚒️'
    },
    crafting_3: {
      id: 'crafting_3',
      name: 'Expert Crafter',
      category: 'crafting',
      threshold: 20,
      skill: 'crafting',
      bonus: { qualityBoost: 0.15 },
      description: '15% quality boost',
      icon: '🛠️'
    }
  },

  /**
   * Get all unlocked upgrades for the player
   */
  getUnlockedUpgrades() {
    const unlocked = [];

    for (const upgrade of Object.values(this.upgrades)) {
      if (this.isUpgradeUnlocked(upgrade.id)) {
        unlocked.push(upgrade);
      }
    }

    return unlocked;
  },

  /**
   * Check if a specific upgrade is unlocked
   */
  isUpgradeUnlocked(upgradeId) {
    const upgrade = this.upgrades[upgradeId];
    if (!upgrade) return false;

    const { mastered } = LeitnerSystem.getMasteredCountByCategory(upgrade.category);
    return mastered >= upgrade.threshold;
  },

  /**
   * Get all upgrades for a skill (e.g., 'herbalism')
   * Returns array of { upgrade, unlocked, progress }
   */
  getUpgradesForSkill(skill) {
    const skillUpgrades = [];

    for (const upgrade of Object.values(this.upgrades)) {
      if (upgrade.skill !== skill) continue;

      const { mastered, total } = LeitnerSystem.getMasteredCountByCategory(upgrade.category);
      const unlocked = mastered >= upgrade.threshold;

      skillUpgrades.push({
        ...upgrade,
        unlocked,
        progress: mastered,
        needed: upgrade.threshold
      });
    }

    // Sort by threshold
    skillUpgrades.sort((a, b) => a.threshold - b.threshold);

    return skillUpgrades;
  },

  /**
   * Get total bonuses for a skill from all unlocked upgrades
   * Returns combined bonus object
   */
  getBonusesForSkill(skill) {
    const bonuses = {
      gatherAmount: 0,
      rareChance: 0,
      priceDiscount: 0,
      sellBonus: 0,
      craftBonus: 0,
      materialSave: 0,
      qualityBoost: 0
    };

    for (const upgrade of Object.values(this.upgrades)) {
      if (upgrade.skill !== skill) continue;
      if (!this.isUpgradeUnlocked(upgrade.id)) continue;

      // Add each bonus type
      for (const [key, value] of Object.entries(upgrade.bonus)) {
        if (bonuses.hasOwnProperty(key)) {
          bonuses[key] += value;
        }
      }
    }

    return bonuses;
  },

  /**
   * Get progress summary for all skills
   */
  getAllSkillProgress() {
    const skills = ['herbalism', 'fishing', 'mining', 'trading', 'crafting'];
    const progress = {};

    for (const skill of skills) {
      const upgrades = this.getUpgradesForSkill(skill);
      const unlockedCount = upgrades.filter(u => u.unlocked).length;
      const nextUpgrade = upgrades.find(u => !u.unlocked);

      progress[skill] = {
        unlockedCount,
        totalUpgrades: upgrades.length,
        nextUpgrade: nextUpgrade || null,
        bonuses: this.getBonusesForSkill(skill)
      };
    }

    return progress;
  },

  /**
   * Check for newly unlocked upgrades and return them
   * Call this after vocabulary updates to notify player
   */
  checkForNewUnlocks() {
    // Get previously unlocked (stored in player data)
    const previouslyUnlocked = GameState.player.unlockedMasteryUpgrades || [];
    const currentlyUnlocked = this.getUnlockedUpgrades().map(u => u.id);

    // Find new unlocks
    const newUnlocks = currentlyUnlocked.filter(id => !previouslyUnlocked.includes(id));

    // Update stored unlocks
    GameState.player.unlockedMasteryUpgrades = currentlyUnlocked;

    return newUnlocks.map(id => this.upgrades[id]);
  },

  // ==========================================
  // MILESTONE METHODS
  // ==========================================

  /**
   * Get total mastered words count (Box 4+)
   */
  getTotalMasteredCount() {
    if (typeof LeitnerSystem === 'undefined') return 0;
    const stats = LeitnerSystem.getMasteryStats();
    // Box 4 (known) + Box 5 (mastered)
    return (stats[4] || 0) + (stats[5] || 0);
  },

  /**
   * Check if a milestone is unlocked
   */
  isMilestoneUnlocked(milestoneId) {
    const milestone = this.milestones[milestoneId];
    if (!milestone) return false;
    return this.getTotalMasteredCount() >= milestone.threshold;
  },

  /**
   * Get all milestones with their status
   */
  getAllMilestones() {
    const totalMastered = this.getTotalMasteredCount();
    const results = [];

    for (const milestone of Object.values(this.milestones)) {
      results.push({
        ...milestone,
        unlocked: totalMastered >= milestone.threshold,
        progress: totalMastered,
        needed: milestone.threshold
      });
    }

    // Sort by threshold
    results.sort((a, b) => a.threshold - b.threshold);
    return results;
  },

  /**
   * Get the next milestone to achieve
   */
  getNextMilestone() {
    const milestones = this.getAllMilestones();
    return milestones.find(m => !m.unlocked) || null;
  },

  /**
   * Check for newly unlocked milestones
   */
  checkForNewMilestones() {
    const previouslyUnlocked = GameState.player.unlockedMilestones || [];
    const currentlyUnlocked = Object.values(this.milestones)
      .filter(m => this.isMilestoneUnlocked(m.id))
      .map(m => m.id);

    const newUnlocks = currentlyUnlocked.filter(id => !previouslyUnlocked.includes(id));
    GameState.player.unlockedMilestones = currentlyUnlocked;

    return newUnlocks.map(id => this.milestones[id]);
  },

  /**
   * Check if a feature is unlocked via milestones
   */
  hasFeatureUnlock(featureName) {
    for (const milestone of Object.values(this.milestones)) {
      if (milestone.rewards.unlock === featureName && this.isMilestoneUnlocked(milestone.id)) {
        return true;
      }
    }
    return false;
  },

  // ==========================================
  // TRANSLATION QUEST METHODS
  // ==========================================

  /**
   * Check if player can translate a specific text
   */
  canTranslate(questId) {
    const quest = this.translationQuests[questId];
    if (!quest) return { canTranslate: false, reason: 'Quest not found' };

    // Check if player has the item
    if (typeof itemManager !== 'undefined') {
      const hasItem = itemManager.hasItem(quest.itemId);
      if (!hasItem) {
        return { canTranslate: false, reason: 'You need the ancient text item' };
      }
    }

    // Check vocabulary mastery for category
    const { mastered } = LeitnerSystem.getMasteredCountByCategory(quest.category);
    if (mastered < quest.wordsRequired) {
      return {
        canTranslate: false,
        reason: `Need ${quest.wordsRequired} ${quest.category} words mastered (have ${mastered})`,
        progress: mastered,
        needed: quest.wordsRequired
      };
    }

    return { canTranslate: true };
  },

  /**
   * Attempt to translate an ancient text
   */
  translateText(questId) {
    const check = this.canTranslate(questId);
    if (!check.canTranslate) {
      return { success: false, reason: check.reason };
    }

    const quest = this.translationQuests[questId];

    // Remove the item
    if (typeof itemManager !== 'undefined') {
      itemManager.removeItem(quest.itemId, 1);
    }

    // Grant rewards
    const rewards = { ...quest.rewards };

    // Add monument shards to player
    if (!GameState.player.monumentShards) {
      GameState.player.monumentShards = 0;
    }
    GameState.player.monumentShards += rewards.monumentShards || 0;

    // Grant XP
    if (rewards.xp && typeof XPSystem !== 'undefined') {
      XPSystem.awardXP(rewards.xp, 'translation');
    }

    // Mark as completed
    if (!GameState.player.completedTranslations) {
      GameState.player.completedTranslations = [];
    }
    if (!GameState.player.completedTranslations.includes(questId)) {
      GameState.player.completedTranslations.push(questId);
    }

    console.log(`[VocabularyMasterySystem] Translated: ${quest.name}, rewards:`, rewards);

    return { success: true, quest, rewards };
  },

  /**
   * Get all translation quests with status
   */
  getAllTranslationQuests() {
    const results = [];

    for (const quest of Object.values(this.translationQuests)) {
      const check = this.canTranslate(quest.id);
      const completed = GameState.player.completedTranslations?.includes(quest.id) || false;
      const { mastered } = LeitnerSystem.getMasteredCountByCategory(quest.category);

      results.push({
        ...quest,
        completed,
        canTranslate: check.canTranslate && !completed,
        progress: mastered,
        needed: quest.wordsRequired
      });
    }

    return results;
  },

  // ==========================================
  // MONUMENT METHODS
  // ==========================================

  /**
   * Check if player can build a monument
   */
  canBuildMonument(monumentId) {
    const monument = this.monuments[monumentId];
    if (!monument) return { canBuild: false, reason: 'Monument not found' };

    // Check if already built
    if (GameState.player.builtMonuments?.includes(monumentId)) {
      return { canBuild: false, reason: 'Already built' };
    }

    // Check milestone unlock (monuments feature)
    if (!this.hasFeatureUnlock('monuments')) {
      return { canBuild: false, reason: 'Reach Apprentice Speaker milestone first' };
    }

    const req = monument.requirements;
    const missing = [];

    // Check monument shards
    const shards = GameState.player.monumentShards || 0;
    if (shards < req.monumentShards) {
      missing.push(`${req.monumentShards - shards} more Monument Shards`);
    }

    // Check gold
    if (req.gold) {
      const gold = GameState.player.gold || 0;
      if (gold < req.gold) {
        missing.push(`${req.gold - gold} more gold`);
      }
    }

    // Check resources
    if (req.resources && typeof itemManager !== 'undefined') {
      for (const [resource, amount] of Object.entries(req.resources)) {
        const has = itemManager.getItemCount(resource) || 0;
        if (has < amount) {
          missing.push(`${amount - has} more ${resource}`);
        }
      }
    }

    // Check total mastered
    if (req.totalMastered) {
      const total = this.getTotalMasteredCount();
      if (total < req.totalMastered) {
        missing.push(`Master ${req.totalMastered - total} more words`);
      }
    }

    // Check category mastered
    if (req.categoryMastered) {
      for (const [category, needed] of Object.entries(req.categoryMastered)) {
        const { mastered } = LeitnerSystem.getMasteredCountByCategory(category);
        if (mastered < needed) {
          missing.push(`Master ${needed - mastered} more ${category} words`);
        }
      }
    }

    if (missing.length > 0) {
      return { canBuild: false, reason: 'Missing: ' + missing.join(', '), missing };
    }

    return { canBuild: true };
  },

  /**
   * Build a monument
   */
  buildMonument(monumentId) {
    const check = this.canBuildMonument(monumentId);
    if (!check.canBuild) {
      return { success: false, reason: check.reason };
    }

    const monument = this.monuments[monumentId];
    const req = monument.requirements;

    // Consume resources
    GameState.player.monumentShards -= req.monumentShards;

    if (req.gold) {
      GameState.player.gold -= req.gold;
    }

    if (req.resources && typeof itemManager !== 'undefined') {
      for (const [resource, amount] of Object.entries(req.resources)) {
        itemManager.removeItem(resource, amount);
      }
    }

    // Mark as built
    if (!GameState.player.builtMonuments) {
      GameState.player.builtMonuments = [];
    }
    GameState.player.builtMonuments.push(monumentId);

    console.log(`[VocabularyMasterySystem] Built monument: ${monument.name}`);

    return { success: true, monument };
  },

  /**
   * Get all monuments with status
   */
  getAllMonuments() {
    const results = [];

    for (const monument of Object.values(this.monuments)) {
      const check = this.canBuildMonument(monument.id);
      const built = GameState.player.builtMonuments?.includes(monument.id) || false;

      results.push({
        ...monument,
        built,
        canBuild: check.canBuild,
        reason: check.reason,
        missing: check.missing || []
      });
    }

    return results;
  },

  /**
   * Get active monument bonuses
   */
  getMonumentBonuses() {
    const bonuses = {
      lessonXpBonus: 0,
      rareHerbChance: 0,
      reviewCooldownReduction: 0,
      shopDiscount: 0,
      unlocks: []
    };

    const built = GameState.player.builtMonuments || [];

    for (const monumentId of built) {
      const monument = this.monuments[monumentId];
      if (!monument) continue;

      for (const [key, value] of Object.entries(monument.bonus)) {
        if (key === 'unlock') {
          bonuses.unlocks.push(value);
        } else if (bonuses.hasOwnProperty(key)) {
          bonuses[key] += value;
        }
      }
    }

    return bonuses;
  }
};

// Make available globally
if (typeof window !== 'undefined') {
  window.VocabularyMasterySystem = VocabularyMasterySystem;
}

console.log('[VocabularyMasterySystem] Loaded with',
  Object.keys(VocabularyMasterySystem.upgrades).length, 'upgrades,',
  Object.keys(VocabularyMasterySystem.milestones).length, 'milestones,',
  Object.keys(VocabularyMasterySystem.translationQuests).length, 'translation quests,',
  Object.keys(VocabularyMasterySystem.monuments).length, 'monuments'
);
