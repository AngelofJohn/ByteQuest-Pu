// ByteQuest - Quest Manager
// Course-based quest management system

// Quest state constants
const QuestState = {
  LOCKED: 'LOCKED',                    // Prerequisites not met
  AVAILABLE: 'AVAILABLE',              // Can be accepted
  ACCEPTED: 'ACCEPTED',                // Accepted but not started
  IN_PROGRESS: 'IN_PROGRESS',          // Currently active
  READY_TO_TURN_IN: 'READY_TO_TURN_IN', // Objectives complete
  COMPLETED: 'COMPLETED'               // Turned in, rewards claimed
};

class QuestManager {
  constructor(gameState) {
    this.state = gameState;
    this.quests = {}; // Will hold quests for current course
    this.currentCourse = null;

    console.log('[QuestManager] Initialized');
  }

  /**
   * Get or initialize course data structure
   * Ensures the nested courses structure exists for the current course
   * @returns {object} Course data object
   */
  _getCourseData() {
    if (!this.currentCourse) return null;

    // Ensure courses object exists
    if (!this.state.courses) {
      this.state.courses = {};
    }

    // Ensure current course structure exists
    if (!this.state.courses[this.currentCourse]) {
      this.state.courses[this.currentCourse] = {
        quests: {
          active: [],
          completed: [],
          cooldowns: {},
          abandoned: []
        },
        level: this.state.player?.level || 1,
        xp: this.state.player?.xp || 0,
        gold: this.state.player?.gold || 0,
        location: this.state.player?.currentLocation || 'dawnmere',
        inventory: [],
        equipment: [],
        reputation: {},
        spellbook: [],
        unlockedNPCs: [],
        unlockedLocations: this.state.player?.discoveredLocations || ['dawnmere'],
        unlockedFeatures: []
      };
      console.log(`[QuestManager] Initialized course data structure for: ${this.currentCourse}`);
    }

    return this.state.courses[this.currentCourse];
  }

  /**
   * Load quests for a specific course
   * @param {string} courseId - Course identifier (e.g., 'french', 'greek')
   */
  loadCourseQuests(courseId) {
    console.log(`[QuestManager] Loading quests for course: ${courseId}`);

    this.currentCourse = courseId;

    // Initialize course data structure (ensures GameState.courses[courseId] exists)
    this._getCourseData();

    // Use CourseDataManager if available (preferred - language-agnostic)
    if (typeof CourseDataManager !== 'undefined') {
      // Initialize CourseDataManager if not already done
      if (CourseDataManager.currentCourse !== courseId) {
        CourseDataManager.initialize(courseId);
      }
      this.quests = CourseDataManager.getQuests();
      const count = Object.keys(this.quests).filter(k => !k.startsWith('_')).length;
      console.log(`[QuestManager] Loaded ${count} quests via CourseDataManager for ${courseId}`);
      return count;
    }

    // Fallback: Load quests based on course using direct variable access
    const varName = `${courseId.toUpperCase()}_QUESTS`;
    if (typeof window[varName] !== 'undefined') {
      this.quests = window[varName];
      const count = Object.keys(this.quests).filter(k => !k.startsWith('_')).length;
      console.log(`[QuestManager] Loaded ${count} quests for ${courseId}`);
      return count;
    }

    console.warn(`[QuestManager] No quests found for course: ${courseId}`);
    this.quests = {};
    return 0;
  }

  /**
   * Get quest definition by ID
   * @param {string} questId - Quest identifier
   * @returns {object|null} Quest definition or null
   */
  getQuest(questId) {
    return this.quests[questId] || null;
  }

  /**
   * Get all quest IDs for current course
   * @returns {array} Array of quest IDs
   */
  getAllQuestIds() {
    return Object.keys(this.quests);
  }

  /**
   * Get quest state from player save data
   * @param {string} questId - Quest identifier
   * @returns {string} Quest state (LOCKED, AVAILABLE, etc.)
   */
  getQuestState(questId) {
    const courseData = this._getCourseData();
    if (!courseData) {
      return QuestState.LOCKED;
    }
    const quest = this.getQuest(questId);

    if (!quest) {
      return QuestState.LOCKED;
    }

    // Check if quest is in active list
    const activeQuest = courseData.quests.active.find(q => q.questId === questId);
    if (activeQuest) {
      return activeQuest.state; // ACCEPTED, IN_PROGRESS, or READY_TO_TURN_IN
    }

    // Check if quest is completed
    const completedQuest = courseData.quests.completed.find(q => q.questId === questId);
    if (completedQuest) {
      return QuestState.COMPLETED;
    }

    // Check if quest is available
    if (this.isQuestAvailable(questId)) {
      return QuestState.AVAILABLE;
    }

    // Otherwise it's locked
    return QuestState.LOCKED;
  }

  /**
   * Check if quest is available (prerequisites met, level requirement, etc.)
   * @param {string} questId - Quest identifier
   * @returns {boolean} True if quest can be accepted
   */
  isQuestAvailable(questId) {
    const quest = this.getQuest(questId);
    if (!quest) return false;

    const courseData = this._getCourseData();
    if (!courseData) return false;

    // Check if already active or completed
    if (courseData.quests.active.some(q => q.questId === questId)) return false;
    if (courseData.quests.completed.some(q => q.questId === questId)) return false;

    // Check level requirement
    if (quest.levelRequired && courseData.level < quest.levelRequired) {
      return false;
    }

    // Check prerequisites
    if (quest.prerequisites && quest.prerequisites.length > 0) {
      const allPrereqsMet = quest.prerequisites.every(prereqId =>
        courseData.quests.completed.some(q => q.questId === prereqId)
      );
      if (!allPrereqsMet) return false;
    }

    // Check location (if specified) - use player's current location, not cached course data
    const playerLocation = this.state.player?.currentLocation || 'dawnmere';
    if (quest.location && playerLocation !== quest.location) {
      return false;
    }

    // Check cooldown (for repeatable quests)
    if (quest.cooldown && courseData.quests.cooldowns[questId]) {
      const cooldownEnd = courseData.quests.cooldowns[questId];
      if (Date.now() < cooldownEnd) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get all available quests for current course/location
   * @returns {array} Array of quest objects with state info
   */
  getAvailableQuests() {
    return this.getAllQuestIds()
      .filter(questId => this.isQuestAvailable(questId))
      .map(questId => ({
        ...this.getQuest(questId),
        state: QuestState.AVAILABLE
      }));
  }

  /**
   * Get all active quests (accepted, in-progress, ready to turn in)
   * @returns {array} Array of quest objects with state and progress
   */
  getActiveQuests() {
    const courseData = this._getCourseData();
    if (!courseData) return [];

    return courseData.quests.active.map(activeQuest => {
      const quest = this.getQuest(activeQuest.questId);
      return {
        ...quest,
        ...activeQuest
      };
    });
  }

  /**
   * Get all completed quests
   * @returns {array} Array of completed quest records
   */
  getCompletedQuests() {
    const courseData = this._getCourseData();
    if (!courseData) return [];

    return courseData.quests.completed.map(completedQuest => {
      const quest = this.getQuest(completedQuest.questId);
      return {
        ...quest,
        ...completedQuest
      };
    });
  }

  /**
   * Get quests available from a specific NPC
   * @param {string} npcId - NPC identifier
   * @returns {array} Array of quest objects this NPC can give
   */
  getQuestsFromNPC(npcId) {
    return this.getAvailableQuests().filter(quest => quest.giver === npcId);
  }

  /**
   * Check if NPC has available quests (for ! marker)
   * @param {string} npcId - NPC identifier
   * @returns {boolean} True if NPC has quests to give
   */
  npcHasAvailableQuests(npcId) {
    return this.getQuestsFromNPC(npcId).length > 0;
  }

  /**
   * Check if NPC has quests ready to turn in (for ? marker)
   * @param {string} npcId - NPC identifier
   * @returns {boolean} True if NPC has quests to complete
   */
  npcHasQuestsToTurnIn(npcId) {
    const courseData = this._getCourseData();
    if (!courseData) return false;

    return courseData.quests.active.some(activeQuest => {
      const quest = this.getQuest(activeQuest.questId);
      return quest && quest.giver === npcId && activeQuest.state === QuestState.READY_TO_TURN_IN;
    });
  }

  /**
   * Accept a quest
   * @param {string} questId - Quest identifier
   * @returns {object} Result {success, error}
   */
  acceptQuest(questId) {
    const quest = this.getQuest(questId);
    if (!quest) {
      return { success: false, error: 'Quest not found' };
    }

    if (!this.isQuestAvailable(questId)) {
      return { success: false, error: 'Quest not available' };
    }

    const courseData = this._getCourseData();
    if (!courseData) {
      return { success: false, error: 'Course not initialized' };
    }

    // Initialize objectives tracking
    const objectives = {};
    quest.objectives.forEach(obj => {
      objectives[obj.id] = {
        completed: false,
        completedAt: null
      };
    });

    // Add to active quests
    courseData.quests.active.push({
      questId: questId,
      state: QuestState.ACCEPTED,
      acceptedAt: Date.now(),
      objectives: objectives,
      currentObjectiveIndex: 0
    });

    console.log(`[QuestManager] Quest accepted: ${questId}`);
    return { success: true };
  }

  /**
   * Start a quest (mark as IN_PROGRESS)
   * @param {string} questId - Quest identifier
   * @returns {object} Result {success, error}
   */
  startQuest(questId) {
    const courseData = this._getCourseData();
    if (!courseData) {
      return { success: false, error: 'Course not initialized' };
    }
    const activeQuest = courseData.quests.active.find(q => q.questId === questId);

    if (!activeQuest) {
      return { success: false, error: 'Quest not active' };
    }

    if (activeQuest.state !== QuestState.ACCEPTED) {
      return { success: false, error: 'Quest already started or completed' };
    }

    // Check if another quest is already in progress
    const questInProgress = courseData.quests.active.find(q => q.state === QuestState.IN_PROGRESS);
    if (questInProgress) {
      return { success: false, error: 'Another quest is already in progress' };
    }

    activeQuest.state = QuestState.IN_PROGRESS;
    console.log(`[QuestManager] Quest started: ${questId}`);
    return { success: true };
  }

  /**
   * Complete an objective for a quest
   * @param {string} questId - Quest identifier
   * @param {string} objectiveId - Objective identifier
   * @returns {object} Result {success, error, allComplete}
   */
  completeObjective(questId, objectiveId) {
    const courseData = this._getCourseData();
    if (!courseData) {
      return { success: false, error: 'Course not initialized' };
    }
    const activeQuest = courseData.quests.active.find(q => q.questId === questId);

    if (!activeQuest) {
      return { success: false, error: 'Quest not active' };
    }

    if (activeQuest.state !== QuestState.IN_PROGRESS) {
      return { success: false, error: 'Quest not in progress' };
    }

    if (!activeQuest.objectives[objectiveId]) {
      return { success: false, error: 'Objective not found' };
    }

    if (activeQuest.objectives[objectiveId].completed) {
      return { success: false, error: 'Objective already completed' };
    }

    // Mark objective as complete
    activeQuest.objectives[objectiveId].completed = true;
    activeQuest.objectives[objectiveId].completedAt = Date.now();

    console.log(`[QuestManager] Objective completed: ${questId}.${objectiveId}`);

    // Check if all objectives are complete
    const allComplete = Object.values(activeQuest.objectives).every(obj => obj.completed);

    if (allComplete) {
      console.log(`[QuestManager] All objectives complete for ${questId}`);
      // Auto-mark ready to turn in
      const markResult = this.markReadyToTurnIn(questId);
      return { success: true, allComplete: true, markedReady: markResult.success };
    }

    return { success: true, allComplete: false };
  }

  /**
   * Mark quest as ready to turn in
   * @param {string} questId - Quest identifier
   * @returns {object} Result {success, error}
   */
  markReadyToTurnIn(questId) {
    const courseData = this._getCourseData();
    if (!courseData) {
      return { success: false, error: 'Course not initialized' };
    }
    const activeQuest = courseData.quests.active.find(q => q.questId === questId);

    if (!activeQuest) {
      return { success: false, error: 'Quest not active' };
    }

    if (activeQuest.state === QuestState.READY_TO_TURN_IN) {
      return { success: false, error: 'Quest already ready to turn in' };
    }

    // Verify all objectives are complete
    const allComplete = Object.values(activeQuest.objectives).every(obj => obj.completed);
    if (!allComplete) {
      return { success: false, error: 'Not all objectives complete' };
    }

    activeQuest.state = QuestState.READY_TO_TURN_IN;
    activeQuest.readyAt = Date.now();

    console.log(`[QuestManager] Quest ready to turn in: ${questId}`);
    return { success: true };
  }

  /**
   * Turn in a quest and claim rewards
   * @param {string} questId - Quest identifier
   * @param {object} performance - Performance metrics (score, streak, etc.)
   * @returns {object} Result {success, error, rewards, unlocks}
   */
  turnInQuest(questId, performance = {}) {
    const quest = this.getQuest(questId);
    if (!quest) {
      return { success: false, error: 'Quest not found' };
    }

    const courseData = this._getCourseData();
    if (!courseData) {
      return { success: false, error: 'Course not initialized' };
    }
    const activeQuest = courseData.quests.active.find(q => q.questId === questId);

    if (!activeQuest) {
      return { success: false, error: 'Quest not active' };
    }

    if (activeQuest.state !== QuestState.READY_TO_TURN_IN) {
      return { success: false, error: 'Quest not ready to turn in' };
    }

    // Give rewards
    const rewardResult = this.giveRewards(quest, performance);

    // Process unlocks
    const unlockResult = this.processUnlocks(quest);

    // Move quest from active to completed
    const completedQuest = {
      questId: questId,
      completedAt: Date.now(),
      acceptedAt: activeQuest.acceptedAt,
      performance: performance,
      rewards: rewardResult.rewards
    };

    courseData.quests.completed.push(completedQuest);

    // Remove from active
    const activeIndex = courseData.quests.active.findIndex(q => q.questId === questId);
    courseData.quests.active.splice(activeIndex, 1);

    // Set cooldown if quest is repeatable
    if (quest.cooldown) {
      courseData.quests.cooldowns[questId] = Date.now() + quest.cooldown;
    }

    console.log(`[QuestManager] Quest turned in: ${questId}`);

    return {
      success: true,
      rewards: rewardResult.rewards,
      unlocks: unlockResult.unlocks
    };
  }

  /**
   * Give rewards to player
   * @param {object} quest - Quest definition
   * @param {object} performance - Performance metrics
   * @returns {object} Result {rewards}
   */
  giveRewards(quest, performance = {}) {
    const courseData = this._getCourseData();
    const rewards = {
      xp: 0,
      gold: 0,
      items: [],
      equipment: [],
      reputation: {},
      spellbookPages: [],
      artifacts: [],
      title: null
    };

    // Guard check - if no rewards defined, return empty rewards
    if (!quest.rewards) {
      console.log(`[QuestManager] No rewards defined for ${quest.id}`);
      return { rewards };
    }

    // Base rewards
    rewards.xp += quest.rewards.xp || 0;
    rewards.gold += quest.rewards.gold || 0;
    rewards.items = [...(quest.rewards.items || [])];
    rewards.equipment = [...(quest.rewards.equipment || [])];

    // Class loot bonus (Rogue: 20% chance for bonus gold)
    const lootBonus = this.state.player.classLootBonus || 0;
    if (lootBonus > 0 && rewards.gold > 0 && Math.random() < lootBonus) {
      const bonusGold = Math.ceil(rewards.gold * 0.5);
      rewards.gold += bonusGold;
      rewards.lootBonusTriggered = true;
      rewards.lootBonusGold = bonusGold;
    }

    // Reputation rewards
    if (quest.rewards.reputation) {
      Object.entries(quest.rewards.reputation).forEach(([faction, amount]) => {
        rewards.reputation[faction] = amount;
        // Apply to game state (assuming reputation system exists)
        if (!courseData.reputation) courseData.reputation = {};
        courseData.reputation[faction] = (courseData.reputation[faction] || 0) + amount;
      });
    }

    // Spellbook pages
    if (quest.rewards.spellbookPages && quest.rewards.spellbookPages.length > 0) {
      rewards.spellbookPages = [...quest.rewards.spellbookPages];

      // Use global unlockSpellbookPages function (shows notification)
      if (typeof unlockSpellbookPages === 'function') {
        unlockSpellbookPages(quest.rewards.spellbookPages);
      } else if (typeof spellbookManager !== 'undefined' && spellbookManager && spellbookManager.unlockPages) {
        // Fallback to direct manager call
        spellbookManager.unlockPages(quest.rewards.spellbookPages);
      } else {
        // Final fallback: Add directly to player.spellbook.unlockedPages
        if (!this.state.player.spellbook) {
          this.state.player.spellbook = { unlockedPages: [], unlockedArtifacts: [] };
        }
        if (!this.state.player.spellbook.unlockedPages) {
          this.state.player.spellbook.unlockedPages = [];
        }
        quest.rewards.spellbookPages.forEach(page => {
          if (!this.state.player.spellbook.unlockedPages.includes(page)) {
            this.state.player.spellbook.unlockedPages.push(page);
          }
        });
      }

      // Also keep in courseData for course-specific tracking
      if (!courseData.spellbook) courseData.spellbook = [];
      quest.rewards.spellbookPages.forEach(page => {
        if (!courseData.spellbook.includes(page)) {
          courseData.spellbook.push(page);
        }
      });
    }

    // Artifact rewards
    if (quest.rewards.artifacts && quest.rewards.artifacts.length > 0) {
      if (!rewards.artifacts) rewards.artifacts = [];
      rewards.artifacts = [...quest.rewards.artifacts];

      // Use ArtifactSystem if available
      if (typeof ArtifactSystem !== 'undefined' && ArtifactSystem.unlockArtifact) {
        quest.rewards.artifacts.forEach(artifactId => {
          ArtifactSystem.unlockArtifact(artifactId, 'quest');
        });
      } else if (typeof spellbookManager !== 'undefined' && spellbookManager && spellbookManager.unlockArtifact) {
        // Fallback to direct spellbookManager call
        quest.rewards.artifacts.forEach(artifactId => {
          spellbookManager.unlockArtifact(artifactId);
        });
      } else {
        // Final fallback: Add directly to player.spellbook.unlockedArtifacts
        if (!this.state.player.spellbook) {
          this.state.player.spellbook = { unlockedPages: [], unlockedArtifacts: [] };
        }
        if (!this.state.player.spellbook.unlockedArtifacts) {
          this.state.player.spellbook.unlockedArtifacts = [];
        }
        quest.rewards.artifacts.forEach(artifactId => {
          if (!this.state.player.spellbook.unlockedArtifacts.includes(artifactId)) {
            this.state.player.spellbook.unlockedArtifacts.push(artifactId);
          }
        });
      }

      console.log(`[QuestManager] Artifact rewards given: ${quest.rewards.artifacts.join(', ')}`);
    }

    // Title reward
    if (quest.rewards.title) {
      rewards.title = quest.rewards.title;
    }

    // Check for bonus rewards
    if (quest.bonusRewards && performance) {
      let bonusEarned = false;

      switch (quest.bonusRewards.condition) {
        case 'perfect_score':
          if (performance.score === 100 || performance.perfect === true) {
            bonusEarned = true;
          }
          break;
        case 'streak':
          if (performance.streak >= (quest.bonusRewards.streakRequired || 5)) {
            bonusEarned = true;
          }
          break;
        case 'time':
          if (performance.time <= (quest.bonusRewards.timeRequired || 60000)) {
            bonusEarned = true;
          }
          break;
      }

      if (bonusEarned) {
        rewards.xp += quest.bonusRewards.xp || 0;
        rewards.gold += quest.bonusRewards.gold || 0;
        rewards.items = [...rewards.items, ...(quest.bonusRewards.items || [])];
        console.log(`[QuestManager] Bonus rewards earned for ${quest.id}`);
      }
    }

    // Apply XP to player (use XPSystem if available for level-up handling)
    if (rewards.xp > 0) {
      if (typeof XPSystem !== 'undefined' && XPSystem.awardXP) {
        XPSystem.awardXP(rewards.xp, 'quest');
      } else {
        // Fallback: direct add to player
        this.state.player.xp = (this.state.player.xp || 0) + rewards.xp;
        // Check for level up
        while (this.state.player.xp >= this.state.player.xpToNext) {
          this.state.player.xp -= this.state.player.xpToNext;
          this.state.player.level++;
          this.state.player.xpToNext = Math.floor(this.state.player.xpToNext * 1.5);
          if (typeof showNotification === 'function') {
            showNotification(`Level up! You are now level ${this.state.player.level}`, 'success');
          }
        }
      }
    }

    // Apply gold to player
    if (rewards.gold > 0) {
      if (typeof addGoldSilent === 'function') {
        addGoldSilent(rewards.gold);
      } else {
        this.state.player.gold = (this.state.player.gold || 0) + rewards.gold;
      }
    }

    // Also track in courseData for course-specific stats
    courseData.xp = (courseData.xp || 0) + rewards.xp;
    courseData.gold = (courseData.gold || 0) + rewards.gold;

    // Add items to player inventory
    if (rewards.items.length > 0) {
      if (!this.state.player.inventory) this.state.player.inventory = [];
      rewards.items.forEach(itemId => {
        const existing = this.state.player.inventory.find(i => i.id === itemId);
        if (existing) {
          existing.count = (existing.count || 1) + 1;
        } else {
          this.state.player.inventory.push({ id: itemId, count: 1 });
        }
      });
    }

    // Add equipment to player inventory
    if (rewards.equipment.length > 0) {
      if (!this.state.player.inventory) this.state.player.inventory = [];
      rewards.equipment.forEach(equipId => {
        const existing = this.state.player.inventory.find(i => i.id === equipId);
        if (existing) {
          existing.count = (existing.count || 1) + 1;
        } else {
          this.state.player.inventory.push({ id: equipId, count: 1 });
        }
      });
    }

    // Apply reputation rewards through ReputationManager if available
    if (rewards.reputation && Object.keys(rewards.reputation).length > 0) {
      Object.entries(rewards.reputation).forEach(([factionId, amount]) => {
        if (typeof reputationManager !== 'undefined' && reputationManager) {
          reputationManager.addReputation(factionId, amount);
        }
      });
    }

    // Update HUD to reflect new XP/gold
    if (typeof renderHUD === 'function') {
      renderHUD();
    }

    console.log(`[QuestManager] Rewards given for ${quest.id}:`, rewards);
    return { rewards };
  }

  /**
   * Process quest unlocks (quests, NPCs, locations, features)
   * @param {object} quest - Quest definition
   * @returns {object} Result {unlocks}
   */
  processUnlocks(quest) {
    const unlocks = {
      quests: [],
      npcs: [],
      locations: [],
      features: []
    };

    if (!quest.rewards.unlocks) {
      return { unlocks };
    }

    const courseData = this._getCourseData();

    // Unlock quests
    if (quest.rewards.unlocks.quests) {
      unlocks.quests = [...quest.rewards.unlocks.quests];
      console.log(`[QuestManager] Unlocked quests: ${unlocks.quests.join(', ')}`);
    }

    // Unlock NPCs
    if (quest.rewards.unlocks.npcs) {
      unlocks.npcs = [...quest.rewards.unlocks.npcs];
      if (!courseData.unlockedNPCs) courseData.unlockedNPCs = [];
      quest.rewards.unlocks.npcs.forEach(npcId => {
        if (!courseData.unlockedNPCs.includes(npcId)) {
          courseData.unlockedNPCs.push(npcId);
        }
      });
      console.log(`[QuestManager] Unlocked NPCs: ${unlocks.npcs.join(', ')}`);
    }

    // Unlock locations
    if (quest.rewards.unlocks.locations) {
      unlocks.locations = [...quest.rewards.unlocks.locations];
      if (!courseData.unlockedLocations) courseData.unlockedLocations = [];
      quest.rewards.unlocks.locations.forEach(locationId => {
        if (!courseData.unlockedLocations.includes(locationId)) {
          courseData.unlockedLocations.push(locationId);
        }
      });
      console.log(`[QuestManager] Unlocked locations: ${unlocks.locations.join(', ')}`);
    }

    // Unlock features
    if (quest.rewards.unlocks.features) {
      unlocks.features = [...quest.rewards.unlocks.features];
      if (!courseData.unlockedFeatures) courseData.unlockedFeatures = [];
      quest.rewards.unlocks.features.forEach(featureId => {
        if (!courseData.unlockedFeatures.includes(featureId)) {
          courseData.unlockedFeatures.push(featureId);
        }
      });
      console.log(`[QuestManager] Unlocked features: ${unlocks.features.join(', ')}`);
    }

    return { unlocks };
  }

  /**
   * Abandon a quest
   * @param {string} questId - Quest identifier
   * @returns {object} Result {success, error}
   */
  abandonQuest(questId) {
    const courseData = this._getCourseData();
    if (!courseData) {
      return { success: false, error: 'Course not initialized' };
    }
    const activeQuest = courseData.quests.active.find(q => q.questId === questId);

    if (!activeQuest) {
      return { success: false, error: 'Quest not active' };
    }

    // Remove from active
    const activeIndex = courseData.quests.active.findIndex(q => q.questId === questId);
    courseData.quests.active.splice(activeIndex, 1);

    // Add to abandoned list
    if (!courseData.quests.abandoned) {
      courseData.quests.abandoned = [];
    }

    courseData.quests.abandoned.push({
      questId: questId,
      abandonedAt: Date.now(),
      acceptedAt: activeQuest.acceptedAt
    });

    console.log(`[QuestManager] Quest abandoned: ${questId}`);
    return { success: true };
  }

  /**
   * Check and update "meet" objectives when player talks to an NPC
   * @param {string} npcId - The NPC that was talked to
   * @returns {object} Result with any completed objectives
   */
  checkMeetObjectives(npcId) {
    const courseData = this._getCourseData();
    if (!courseData) return { success: false };

    const completedObjectives = [];

    // Check all active quests for "meet" objectives
    for (const activeQuest of courseData.quests.active) {
      if (activeQuest.state !== QuestState.IN_PROGRESS) continue;

      const quest = this.getQuest(activeQuest.questId);
      if (!quest || !quest.objectives) continue;

      for (const obj of quest.objectives) {
        if (obj.type !== 'meet') continue;

        const progress = activeQuest.objectives[obj.id];
        if (!progress || progress.completed) continue;

        // Initialize tracking if needed
        if (!progress.metNpcs) {
          progress.metNpcs = [];
        }

        // Only count each NPC once
        if (!progress.metNpcs.includes(npcId)) {
          progress.metNpcs.push(npcId);
          progress.count = progress.metNpcs.length;

          console.log(`[QuestManager] Meet objective progress: ${obj.id} - ${progress.count}/${obj.target}`);

          // Check if target reached
          if (progress.count >= obj.target) {
            const result = this.completeObjective(activeQuest.questId, obj.id);
            if (result.success) {
              completedObjectives.push({
                questId: activeQuest.questId,
                objectiveId: obj.id,
                allComplete: result.allComplete
              });
            }
          }
        }
      }
    }

    return { success: true, completedObjectives };
  }
}

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QuestManager, QuestState };
}

// Make available globally
if (typeof window !== 'undefined') {
  window.QuestManager = QuestManager;
  window.QuestState = QuestState;
}
