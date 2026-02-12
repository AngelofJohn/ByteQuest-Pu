// ByteQuest - Achievement System
// Handles achievement tracking, unlocking, and rewards

// =====================================================
// Achievement Definitions
// =====================================================

const ACHIEVEMENT_DEFINITIONS = {
  // Getting Started
  first_steps: {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first quest',
    icon: '👣',
    category: 'progress',
    hidden: false,
    reward: { stat: 'insight', amount: 1, title: 'Apprentice' },
    check: (state) => (state.player.completedQuests?.length || 0) >= 1
  },
  word_collector: {
    id: 'word_collector',
    name: 'Word Collector',
    description: 'Learn 10 words',
    icon: '📚',
    category: 'learning',
    hidden: false,
    reward: { stat: 'knowledge', amount: 1 },
    check: (state) => Object.keys(state.player.vocabulary || {}).length >= 10
  },
  perfectionist: {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Get 100% on a lesson',
    icon: '💯',
    category: 'learning',
    hidden: false,
    reward: { stat: 'insight', amount: 1 },
    check: (state) => state.player.perfectLessons >= 1
  },
  comeback_kid: {
    id: 'comeback_kid',
    name: 'Comeback Kid',
    description: 'Recover from 0 HP via review',
    icon: '💪',
    category: 'progress',
    hidden: false,
    reward: { stat: 'stamina', amount: 1 },
    check: (state) => state.player.reviewRecoveries >= 1
  },
  streak_starter: {
    id: 'streak_starter',
    name: 'Streak Starter',
    description: 'Reach a 5 answer streak',
    icon: '⚡',
    category: 'learning',
    hidden: false,
    reward: { stat: 'agility', amount: 1 },
    check: (state) => (state.player.longestStreak || 0) >= 5
  },
  big_spender: {
    id: 'big_spender',
    name: 'Big Spender',
    description: 'Spend 100 gold',
    icon: '🛒',
    category: 'progress',
    hidden: false,
    reward: { stat: 'luck', amount: 1 },
    check: (state) => (state.player.totalGoldSpent || 0) >= 100
  },
  friendly_face: {
    id: 'friendly_face',
    name: 'Friendly Face',
    description: 'Meet all NPCs in Dawnmere',
    icon: '🤝',
    category: 'exploration',
    hidden: false,
    reward: { stat: 'insight', amount: 1 },
    check: (state) => {
      const dawnmereNpcs = [
        'isora', 'rega', 'merchant', 'baker', 'sage_aldric',
        'yris', 'brother_varek', 'tommen', 'widow_senna', 'old_jorel'
      ];
      return dawnmereNpcs.every(npc => state.player.metNpcs?.includes(npc));
    }
  },
  secret_finder: {
    id: 'secret_finder',
    name: 'Secret Finder',
    description: 'Discover a hidden quest',
    icon: '🔍',
    category: 'exploration',
    hidden: true,
    reward: { stat: 'insight', amount: 1, title: 'Seeker' },
    check: (state) => (state.player.hiddenQuestsFound || 0) >= 1
  },
  devoted: {
    id: 'devoted',
    name: 'Devoted',
    description: 'Complete a seasonal quest',
    icon: '🌟',
    category: 'progress',
    hidden: false,
    reward: { stat: 'devotion', amount: 1 },
    check: (state) => (state.player.seasonalQuestsCompleted || 0) >= 1
  },

  // Class Achievements
  sages_path: {
    id: 'sages_path',
    name: "Sage's Path",
    description: 'Begin your journey as a Sage',
    icon: '📚',
    category: 'class',
    hidden: false,
    reward: { title: 'Sage' },
    check: (state) => state.player.class === 'sage'
  },
  protectors_path: {
    id: 'protectors_path',
    name: "Protector's Path",
    description: 'Begin your journey as a Protector',
    icon: '🛡️',
    category: 'class',
    hidden: false,
    reward: { title: 'Protector' },
    check: (state) => state.player.class === 'protector'
  },
  rogues_gambit: {
    id: 'rogues_gambit',
    name: "Rogue's Gambit",
    description: 'Begin your journey as a Rogue',
    icon: '🗡️',
    category: 'class',
    hidden: false,
    reward: { title: 'Rogue' },
    check: (state) => state.player.class === 'rogue'
  },

  // Hidden Achievements
  night_owl: {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Study after midnight',
    icon: '🦉',
    category: 'hidden',
    hidden: true,
    reward: { stat: 'knowledge', amount: 1 },
    check: (state) => state.player.studiedAfterMidnight || false
  },
  early_bird: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Study before 6 AM',
    icon: '🐦',
    category: 'hidden',
    hidden: true,
    reward: { stat: 'agility', amount: 1 },
    check: (state) => state.player.studiedBeforeSix || false
  },
  the_struggle: {
    id: 'the_struggle',
    name: 'The Struggle',
    description: 'Get 15 wrong answers',
    icon: '😅',
    category: 'hidden',
    hidden: true,
    reward: { stat: 'stamina', amount: 1 },
    check: (state) => (state.player.totalWrongAnswers || 0) >= 15
  },

  // Artifact Achievements
  truth_seeker: {
    id: 'truth_seeker',
    name: 'Truth Seeker',
    description: 'Find your first artifact',
    icon: '🏺',
    category: 'artifacts',
    hidden: false,
    reward: { stat: 'insight', amount: 1 },
    check: (state) => (state.player.spellbook?.unlockedArtifacts?.length || 0) >= 1
  },
  ancient_historian: {
    id: 'ancient_historian',
    name: 'Ancient Historian',
    description: 'Complete "The Ancients" artifact collection',
    icon: '🏛️',
    category: 'artifacts',
    hidden: false,
    reward: { stat: 'knowledge', amount: 2, title: 'Historian' },
    check: (state) => {
      const artifacts = state.player.spellbook?.unlockedArtifacts || [];
      const ancientArtifacts = ['ancient_seal_fragment', 'ancient_warning_stone'];
      return ancientArtifacts.every(id => artifacts.includes(id));
    }
  },
  silence_breaker: {
    id: 'silence_breaker',
    name: 'Silence Breaker',
    description: 'Complete "The Silence" artifact collection',
    icon: '🌑',
    category: 'artifacts',
    hidden: false,
    reward: { stat: 'insight', amount: 2 },
    check: (state) => {
      const artifacts = state.player.spellbook?.unlockedArtifacts || [];
      const silenceArtifacts = ['silence_bone_carving', 'silence_empty_shrine'];
      return silenceArtifacts.every(id => artifacts.includes(id));
    }
  },
  founding_scholar: {
    id: 'founding_scholar',
    name: 'Founding Scholar',
    description: 'Complete "The Founding" artifact collection',
    icon: '👑',
    category: 'artifacts',
    hidden: false,
    reward: { stat: 'knowledge', amount: 2 },
    check: (state) => {
      const artifacts = state.player.spellbook?.unlockedArtifacts || [];
      const foundingArtifacts = ['founding_charter_fragment', 'founding_builders_journal', 'founding_first_kings_decree'];
      return foundingArtifacts.every(id => artifacts.includes(id));
    }
  },
  keeper_of_faith: {
    id: 'keeper_of_faith',
    name: 'Keeper of Faith',
    description: 'Complete "The Faith" artifact collection',
    icon: '✝️',
    category: 'artifacts',
    hidden: false,
    reward: { stat: 'devotion', amount: 2 },
    check: (state) => {
      const artifacts = state.player.spellbook?.unlockedArtifacts || [];
      const faithArtifacts = ['faith_original_prayer', 'faith_schism_letter', 'faith_forbidden_text'];
      return faithArtifacts.every(id => artifacts.includes(id));
    }
  },
  golden_archivist: {
    id: 'golden_archivist',
    name: 'Golden Archivist',
    description: 'Complete "The Golden Age" artifact collection',
    icon: '⭐',
    category: 'artifacts',
    hidden: false,
    reward: { stat: 'luck', amount: 2 },
    check: (state) => {
      const artifacts = state.player.spellbook?.unlockedArtifacts || [];
      const goldenArtifacts = ['golden_trade_manifest', 'golden_royal_diary', 'golden_architects_note'];
      return goldenArtifacts.every(id => artifacts.includes(id));
    }
  },
  drans_legacy: {
    id: 'drans_legacy',
    name: "Dran's Legacy",
    description: 'Complete "King Dran\'s Reign" artifact collection',
    icon: '🏰',
    category: 'artifacts',
    hidden: false,
    reward: { stat: 'insight', amount: 2, title: 'Rememberer' },
    check: (state) => {
      const artifacts = state.player.spellbook?.unlockedArtifacts || [];
      const dranArtifacts = ['dran_private_letter', 'dran_inspection_report', 'dran_hermeau_journal', 'dran_layne_confession'];
      return dranArtifacts.every(id => artifacts.includes(id));
    }
  },
  war_chronicler: {
    id: 'war_chronicler',
    name: 'War Chronicler',
    description: 'Complete "The War" artifact collection',
    icon: '⚔️',
    category: 'artifacts',
    hidden: false,
    reward: { stat: 'stamina', amount: 2, title: 'Chronicler' },
    check: (state) => {
      const artifacts = state.player.spellbook?.unlockedArtifacts || [];
      const warArtifacts = ['war_soldiers_letter', 'war_commanders_confession', 'war_healers_record', 'war_assassination_truth', 'war_laynes_evidence'];
      return warArtifacts.every(id => artifacts.includes(id));
    }
  },
  exiles_ally: {
    id: 'exiles_ally',
    name: "Exile's Ally",
    description: 'Complete "The Exile" artifact collection',
    icon: '🚪',
    category: 'artifacts',
    hidden: false,
    reward: { stat: 'agility', amount: 2, title: "Layne's Friend" },
    check: (state) => {
      const artifacts = state.player.spellbook?.unlockedArtifacts || [];
      const exileArtifacts = ['exile_rewritten_history', 'exile_resistance_code', 'exile_spread_of_corruption', 'exile_sealed_letter_layne'];
      return exileArtifacts.every(id => artifacts.includes(id));
    }
  },
  master_historian: {
    id: 'master_historian',
    name: 'Master Historian',
    description: 'Collect all 26 artifacts',
    icon: '📜',
    category: 'artifacts',
    hidden: true,
    reward: { stat: 'knowledge', amount: 5, stat2: 'insight', amount2: 5, title: 'Master Historian' },
    check: (state) => (state.player.spellbook?.unlockedArtifacts?.length || 0) >= 26
  },

  // Learning Milestones
  vocabulary_apprentice: {
    id: 'vocabulary_apprentice',
    name: 'Vocabulary Apprentice',
    description: 'Learn 25 words',
    icon: '📖',
    category: 'learning',
    hidden: false,
    reward: { stat: 'knowledge', amount: 1 },
    check: (state) => Object.keys(state.player.vocabulary || {}).length >= 25
  },
  vocabulary_journeyman: {
    id: 'vocabulary_journeyman',
    name: 'Vocabulary Journeyman',
    description: 'Learn 50 words',
    icon: '📗',
    category: 'learning',
    hidden: false,
    reward: { stat: 'knowledge', amount: 2 },
    check: (state) => Object.keys(state.player.vocabulary || {}).length >= 50
  },
  vocabulary_master: {
    id: 'vocabulary_master',
    name: 'Vocabulary Master',
    description: 'Learn 100 words',
    icon: '📕',
    category: 'learning',
    hidden: false,
    reward: { stat: 'knowledge', amount: 3, title: 'Wordsmith' },
    check: (state) => Object.keys(state.player.vocabulary || {}).length >= 100
  },
  lesson_dedicated: {
    id: 'lesson_dedicated',
    name: 'Dedicated Student',
    description: 'Complete 10 lessons',
    icon: '🎓',
    category: 'learning',
    hidden: false,
    reward: { stat: 'insight', amount: 1 },
    check: (state) => (state.player.lessonsCompleted || 0) >= 10
  },
  lesson_scholar: {
    id: 'lesson_scholar',
    name: 'Scholar',
    description: 'Complete 25 lessons',
    icon: '🏆',
    category: 'learning',
    hidden: false,
    reward: { stat: 'insight', amount: 2, title: 'Scholar' },
    check: (state) => (state.player.lessonsCompleted || 0) >= 25
  },

  // Streak Achievements
  streak_warrior: {
    id: 'streak_warrior',
    name: 'Streak Warrior',
    description: 'Reach a 10 answer streak',
    icon: '🔥',
    category: 'learning',
    hidden: false,
    reward: { stat: 'agility', amount: 2 },
    check: (state) => (state.player.longestStreak || 0) >= 10
  },
  streak_master: {
    id: 'streak_master',
    name: 'Streak Master',
    description: 'Reach a 20 answer streak',
    icon: '💥',
    category: 'learning',
    hidden: false,
    reward: { stat: 'agility', amount: 3, title: 'Unstoppable' },
    check: (state) => (state.player.longestStreak || 0) >= 20
  },

  // Quest Achievements
  quest_hunter: {
    id: 'quest_hunter',
    name: 'Quest Hunter',
    description: 'Complete 10 quests',
    icon: '📜',
    category: 'progress',
    hidden: false,
    reward: { stat: 'stamina', amount: 1 },
    check: (state) => (state.player.completedQuests?.length || 0) >= 10
  },
  quest_champion: {
    id: 'quest_champion',
    name: 'Quest Champion',
    description: 'Complete 25 quests',
    icon: '🏅',
    category: 'progress',
    hidden: false,
    reward: { stat: 'stamina', amount: 2, title: 'Champion' },
    check: (state) => (state.player.completedQuests?.length || 0) >= 25
  },

  // Level Achievements
  level_5: {
    id: 'level_5',
    name: 'Rising Star',
    description: 'Reach level 5',
    icon: '⭐',
    category: 'progress',
    hidden: false,
    reward: { stat: 'stamina', amount: 1 },
    check: (state) => (state.player.level || 1) >= 5
  },
  level_10: {
    id: 'level_10',
    name: 'Veteran',
    description: 'Reach level 10',
    icon: '🌟',
    category: 'progress',
    hidden: false,
    reward: { stat: 'stamina', amount: 2, title: 'Veteran' },
    check: (state) => (state.player.level || 1) >= 10
  },

  // Gathering Achievements
  first_harvest: {
    id: 'first_harvest',
    name: 'First Harvest',
    description: 'Gather your first resource',
    icon: '⛏️',
    category: 'gathering',
    hidden: false,
    reward: { stat: 'stamina', amount: 1 },
    check: (state) => (state.player.totalResourcesGathered || 0) >= 1
  },
  resourceful: {
    id: 'resourceful',
    name: 'Resourceful',
    description: 'Gather 50 resources',
    icon: '📦',
    category: 'gathering',
    hidden: false,
    reward: { stat: 'stamina', amount: 1 },
    check: (state) => (state.player.totalResourcesGathered || 0) >= 50
  },
  master_gatherer: {
    id: 'master_gatherer',
    name: 'Master Gatherer',
    description: 'Gather 250 resources',
    icon: '🎒',
    category: 'gathering',
    hidden: false,
    reward: { stat: 'stamina', amount: 2, title: 'Gatherer' },
    check: (state) => (state.player.totalResourcesGathered || 0) >= 250
  },
  mining_apprentice: {
    id: 'mining_apprentice',
    name: 'Mining Apprentice',
    description: 'Reach Mining level 5',
    icon: '⛏️',
    category: 'gathering',
    hidden: false,
    reward: { stat: 'strength', amount: 1 },
    check: (state) => (state.player.skillLevels?.mining || 0) >= 5
  },
  lumberjack: {
    id: 'lumberjack',
    name: 'Lumberjack',
    description: 'Reach Woodcutting level 5',
    icon: '🪓',
    category: 'gathering',
    hidden: false,
    reward: { stat: 'stamina', amount: 1 },
    check: (state) => (state.player.skillLevels?.woodcutting || 0) >= 5
  },
  herbalist: {
    id: 'herbalist',
    name: 'Herbalist',
    description: 'Reach Herbalism level 5',
    icon: '🌿',
    category: 'gathering',
    hidden: false,
    reward: { stat: 'knowledge', amount: 1 },
    check: (state) => (state.player.skillLevels?.herbalism || 0) >= 5
  },
  angler: {
    id: 'angler',
    name: 'Angler',
    description: 'Reach Fishing level 5',
    icon: '🎣',
    category: 'gathering',
    hidden: false,
    reward: { stat: 'agility', amount: 1 },
    check: (state) => (state.player.skillLevels?.fishing || 0) >= 5
  },
  hunter: {
    id: 'hunter',
    name: 'Hunter',
    description: 'Reach Hunting level 5',
    icon: '🏹',
    category: 'gathering',
    hidden: false,
    reward: { stat: 'agility', amount: 1 },
    check: (state) => (state.player.skillLevels?.hunting || 0) >= 5
  },
  jack_of_all_trades: {
    id: 'jack_of_all_trades',
    name: 'Jack of All Trades',
    description: 'Unlock all 5 gathering skills',
    icon: '🔧',
    category: 'gathering',
    hidden: false,
    reward: { stat: 'insight', amount: 2, title: 'Jack of All Trades' },
    check: (state) => {
      const skills = state.player.gatheringSkills || [];
      return skills.length >= 5;
    }
  },
  minigame_master: {
    id: 'minigame_master',
    name: 'Minigame Master',
    description: 'Complete 100 gathering minigames',
    icon: '🎮',
    category: 'gathering',
    hidden: false,
    reward: { stat: 'insight', amount: 2 },
    check: (state) => (state.player.minigamesCompleted || 0) >= 100
  },
  perfect_gatherer: {
    id: 'perfect_gatherer',
    name: 'Perfect Gatherer',
    description: 'Complete a gathering minigame with 100% accuracy',
    icon: '💯',
    category: 'gathering',
    hidden: true,
    reward: { stat: 'luck', amount: 1 },
    check: (state) => state.player.perfectMinigames >= 1
  }
};

// =====================================================
// Achievement Manager Class
// =====================================================

class AchievementManager {
  constructor(gameState) {
    this.state = gameState;
    this.initialize();
    console.log('[AchievementManager] Initialized');
  }

  /**
   * Initialize achievement tracking in player state
   */
  initialize() {
    if (!this.state.player.unlockedAchievements) {
      this.state.player.unlockedAchievements = [];
    }
  }

  /**
   * Check if a specific achievement condition is met
   * @param {string} achievementId
   * @returns {boolean}
   */
  checkAchievement(achievementId) {
    const achievement = ACHIEVEMENT_DEFINITIONS[achievementId];
    if (!achievement) return false;

    // Already unlocked?
    if (this.state.player.unlockedAchievements.includes(achievementId)) {
      return false;
    }

    // Check condition
    return achievement.check(this.state);
  }

  /**
   * Unlock an achievement and grant rewards
   * @param {string} achievementId
   * @returns {object|null} Unlock result or null if already unlocked
   */
  unlockAchievement(achievementId) {
    const achievement = ACHIEVEMENT_DEFINITIONS[achievementId];
    if (!achievement) return null;

    if (this.state.player.unlockedAchievements.includes(achievementId)) {
      return null; // Already unlocked
    }

    this.state.player.unlockedAchievements.push(achievementId);
    console.log(`[AchievementManager] Unlocked: ${achievement.name}`);

    const rewards = [];

    // Grant rewards
    if (achievement.reward) {
      // Stat rewards - use statsManager if available
      if (achievement.reward.stat) {
        if (typeof statsManager !== 'undefined' && statsManager) {
          statsManager.addBaseStat(achievement.reward.stat, achievement.reward.amount);
        }
        rewards.push({
          type: 'stat',
          stat: achievement.reward.stat,
          amount: achievement.reward.amount
        });
      }

      // Second stat reward (for achievements that give multiple stats)
      if (achievement.reward.stat2) {
        if (typeof statsManager !== 'undefined' && statsManager) {
          statsManager.addBaseStat(achievement.reward.stat2, achievement.reward.amount2);
        }
        rewards.push({
          type: 'stat',
          stat: achievement.reward.stat2,
          amount: achievement.reward.amount2
        });
      }

      // Title reward
      if (achievement.reward.title) {
        if (typeof titleManager !== 'undefined' && titleManager) {
          titleManager.awardTitle(achievement.reward.title);
        } else if (typeof statsManager !== 'undefined' && statsManager) {
          statsManager.unlockTitle(achievement.reward.title);
        }
        rewards.push({
          type: 'title',
          title: achievement.reward.title
        });
      }
    }

    return {
      achievement,
      rewards
    };
  }

  /**
   * Check all achievements and unlock any that are newly completed
   * @returns {array} Array of newly unlocked achievements
   */
  checkAllAchievements() {
    const newlyUnlocked = [];

    for (const achievementId of Object.keys(ACHIEVEMENT_DEFINITIONS)) {
      if (this.checkAchievement(achievementId)) {
        const result = this.unlockAchievement(achievementId);
        if (result) {
          newlyUnlocked.push(result);

          // Show notification
          if (typeof showNotification === 'function') {
            showNotification(`🏆 Achievement: ${result.achievement.name}`, 'success');
          }
        }
      }
    }

    return newlyUnlocked;
  }

  /**
   * Get status of a specific achievement
   * @param {string} achievementId
   * @returns {object|null}
   */
  getAchievementStatus(achievementId) {
    const achievement = ACHIEVEMENT_DEFINITIONS[achievementId];
    if (!achievement) return null;

    const unlocked = this.state.player.unlockedAchievements.includes(achievementId);

    return {
      id: achievementId,
      achievement,
      unlocked,
      visible: unlocked || !achievement.hidden
    };
  }

  /**
   * Get all achievements
   * @returns {array}
   */
  getAllAchievements() {
    return Object.keys(ACHIEVEMENT_DEFINITIONS).map(id => this.getAchievementStatus(id));
  }

  /**
   * Get visible achievements (non-hidden or unlocked)
   * @returns {array}
   */
  getVisibleAchievements() {
    return this.getAllAchievements().filter(a => a.visible);
  }

  /**
   * Get unlocked achievements
   * @returns {array}
   */
  getUnlockedAchievements() {
    return this.getAllAchievements().filter(a => a.unlocked);
  }

  /**
   * Get achievements by category
   * @param {string} category
   * @returns {array}
   */
  getAchievementsByCategory(category) {
    return this.getVisibleAchievements().filter(a => a.achievement.category === category);
  }

  /**
   * Get achievement progress summary
   * @returns {object}
   */
  getProgressSummary() {
    const all = this.getAllAchievements();
    const unlocked = this.getUnlockedAchievements();
    const visible = this.getVisibleAchievements();

    return {
      total: all.length,
      unlocked: unlocked.length,
      visible: visible.length,
      percentage: Math.floor((unlocked.length / all.length) * 100)
    };
  }

  /**
   * Get categories with counts
   * @returns {array}
   */
  getCategories() {
    const categories = {};

    this.getVisibleAchievements().forEach(a => {
      const cat = a.achievement.category || 'misc';
      if (!categories[cat]) {
        categories[cat] = { total: 0, unlocked: 0 };
      }
      categories[cat].total++;
      if (a.unlocked) categories[cat].unlocked++;
    });

    return Object.entries(categories).map(([name, counts]) => ({
      name,
      ...counts
    }));
  }
}

// =====================================================
// Global Functions
// =====================================================

/**
 * Check all achievements (called from various places)
 */
function checkAchievements() {
  if (typeof achievementManager !== 'undefined' && achievementManager) {
    return achievementManager.checkAllAchievements();
  }
  return [];
}

/**
 * Get achievement definition by ID
 */
function getAchievementDefinition(achievementId) {
  return ACHIEVEMENT_DEFINITIONS[achievementId];
}

/**
 * Show achievements screen
 */
function showAchievementsScreen() {
  if (typeof achievementManager === 'undefined' || !achievementManager) {
    showNotification('Achievements not available', 'error');
    return;
  }

  const summary = achievementManager.getProgressSummary();
  const categories = achievementManager.getCategories();

  const categoryNames = {
    progress: '📈 Progress',
    learning: '📚 Learning',
    exploration: '🗺️ Exploration',
    class: '⚔️ Class',
    artifacts: '🏺 Artifacts',
    hidden: '🔮 Hidden'
  };

  // Build categories HTML
  let categoriesHtml = categories.map(cat => {
    const achievements = achievementManager.getAchievementsByCategory(cat.name);
    const displayName = categoryNames[cat.name] || cat.name;

    const achievementsHtml = achievements.map(a => {
      const ach = a.achievement;
      return `
        <div class="achievement-item ${a.unlocked ? 'unlocked' : 'locked'}">
          <div class="achievement-icon">${a.unlocked ? ach.icon : '🔒'}</div>
          <div class="achievement-info">
            <div class="achievement-name">${a.unlocked || !ach.hidden ? ach.name : '???'}</div>
            <div class="achievement-desc">${a.unlocked || !ach.hidden ? ach.description : 'Hidden achievement'}</div>
          </div>
          ${a.unlocked ? '<div class="achievement-check">✓</div>' : ''}
        </div>
      `;
    }).join('');

    return `
      <div class="achievement-category">
        <div class="achievement-category-header">
          <span class="category-name">${displayName}</span>
          <span class="category-progress">${cat.unlocked}/${cat.total}</span>
        </div>
        <div class="achievement-list">
          ${achievementsHtml}
        </div>
      </div>
    `;
  }).join('');

  showModal('achievements-modal', `
    <div class="achievements-screen">
      <div class="achievements-header">
        <h2>🏆 Achievements</h2>
        <div class="achievements-summary">
          <div class="summary-progress">${summary.unlocked}/${summary.total}</div>
          <div class="summary-percentage">${summary.percentage}% Complete</div>
        </div>
      </div>

      <div class="achievements-content">
        ${categoriesHtml}
      </div>

      <div class="achievements-footer">
        <button class="pixel-btn" onclick="hideModal('achievements-modal')">Close</button>
      </div>
    </div>
  `);
}

// =====================================================
// Exports
// =====================================================

// Make available globally
window.AchievementManager = AchievementManager;
window.ACHIEVEMENT_DEFINITIONS = ACHIEVEMENT_DEFINITIONS;
window.checkAchievements = checkAchievements;
window.getAchievementDefinition = getAchievementDefinition;
window.showAchievementsScreen = showAchievementsScreen;

console.log('[achievementSystem.js] Achievement system loaded');
