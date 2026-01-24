// ByteQuest - Quest UI System
// Extracted from game.js (lines 1642-2563, 3798-3976)

// =====================================================
// Quest System
// =====================================================

/**
 * Get quest definition from all quest sources (includes language-specific quests)
 * @param {string} questId - Quest ID to look up
 * @returns {object|null} Quest definition or null if not found
 */
function getQuest(questId) {
  // PRIMARY: Use GameState.questManager (has course quests loaded)
  if (typeof GameState !== 'undefined' && GameState.questManager && GameState.questManager.getQuest) {
    const quest = GameState.questManager.getQuest(questId);
    if (quest) return quest;
  }

  // SECONDARY: Use CourseDataManager directly
  if (typeof CourseDataManager !== 'undefined' && CourseDataManager.getQuest) {
    const quest = CourseDataManager.getQuest(questId);
    if (quest) return quest;
  }

  // Fallback: Check language-specific quest variables directly
  if (typeof LANGUAGE_CONFIG !== 'undefined' && LANGUAGE_CONFIG.languages) {
    for (const langCode of Object.keys(LANGUAGE_CONFIG.languages)) {
      const questsVar = `${langCode.toUpperCase()}_QUESTS`;
      if (typeof window[questsVar] !== 'undefined' && window[questsVar][questId]) {
        return window[questsVar][questId];
      }
    }
  }

  // Legacy fallback: GAME_DATA.quests
  if (typeof GAME_DATA !== 'undefined' && GAME_DATA.quests && GAME_DATA.quests[questId]) {
    return GAME_DATA.quests[questId];
  }

  // Legacy fallback: GRAMMAR_QUESTS
  if (typeof GRAMMAR_QUESTS !== 'undefined' && GRAMMAR_QUESTS[questId]) {
    return GRAMMAR_QUESTS[questId];
  }

  return null;
}

function getActiveQuests() {
  return GameState.player.activeQuests.map(q => ({
    ...q,
    ...getQuest(q.id)
  }));
}

function getAvailableQuests() {
  const location = GAME_DATA.locations[GameState.currentLocation];
  if (!location) {
    return [];
  }

  const available = [];
  const processedQuestIds = new Set();

  // Helper to check and add a quest if available
  const checkQuest = (questId) => {
    if (processedQuestIds.has(questId)) return;
    processedQuestIds.add(questId);

    const quest = getQuest(questId);
    if (!quest) return;

    // Check if already active or completed
    if (GameState.player.activeQuests.find(q => q.id === questId)) return;
    if (GameState.player.completedQuests.includes(questId)) return;

    // Check prerequisites
    const prereqsMet = !quest.prerequisites || quest.prerequisites.length === 0 ||
      quest.prerequisites.every(prereq => GameState.player.completedQuests.includes(prereq));

    // Check level requirement
    if (quest.levelRequired && GameState.player.level < quest.levelRequired) return;

    if (prereqsMet) {
      available.push({ id: questId, ...quest });
    }
  };

  // NEW: Check questSystemNew for quests in this location
  if (typeof questSystemNew !== 'undefined') {
    const newSystemQuests = questSystemNew.getQuestsForLocation(GameState.currentLocation);
    newSystemQuests.forEach(quest => {
      if (!processedQuestIds.has(quest.id)) {
        processedQuestIds.add(quest.id);
        available.push(quest);
      }
    });
  }

  // Check location-defined quests
  if (location.quests) {
    location.quests.forEach(checkQuest);
  }

  return available;
}

function hasAvailableQuest(npcId) {
  const available = getAvailableQuests();
  return available.some(q => q.giver === npcId);
}

function getAvailableQuestsFromNPC(npcId) {
  // NEW: Try clean quest system first
  if (typeof questSystemNew !== 'undefined') {
    const npc = getNPC(npcId);
    if (npc) {
      const quests = questSystemNew.getQuestsForNPC(npcId, npc);
      console.log(`[questUI] questSystemNew returned ${quests.length} quests for ${npcId}`);
      if (quests.length > 0) {
        return quests;
      }
    }
  }

  // OLD: Use Quest Manager's role-based assignment system
  if (typeof questManager !== 'undefined' && questManager.getQuestsForNPC) {
    return questManager.getQuestsForNPC(npcId);
  }

  // Fallback to old system
  const available = getAvailableQuests();
  return available.filter(q => q.giver === npcId);
}

function hasActiveQuest(npcId) {
  // Check the stored giver in quest progress, not the quest definition
  return GameState.player.activeQuests.some(q => {
    return q.giver === npcId;
  });
}

function hasQuestReadyToTurnIn(npcId) {
  return GameState.player.activeQuests.some(q => {
    const questData = getQuest(q.id);
    if (questData?.giver !== npcId) return false;
    // Check if all objectives are complete
    return q.objectives.every(obj => obj.completed);
  });
}

function selectQuest(questId) {
  GameState.selectedQuest = GameState.selectedQuest === questId ? null : questId;
  renderQuestPanel();
}

function acceptQuest(questId, giverId = null) {
  console.log(`[questUI] acceptQuest called: ${questId}, giver: ${giverId}`);

  // NEW: Try clean quest system first
  if (typeof questSystemNew !== 'undefined') {
    // If we don't have giverId, try to find it from the quest
    if (!giverId) {
      const quest = questSystemNew.getQuest(questId);
      giverId = quest?.giver || 'unknown';
      console.log(`[questUI] Extracted giver from quest: ${giverId}`);
    }

    const result = questSystemNew.acceptQuest(questId, giverId);
    console.log(`[questUI] questSystemNew.acceptQuest result:`, result);
    if (result.success) {
      showNotification(`Quest Accepted: ${result.quest.name}`);
      renderQuestPanel();
      autoSave();
      return;
    } else {
      console.error('[questUI] Failed to accept quest:', result.error);
      showNotification(result.error, 'error');
      return;
    }
  }

  // OLD: Fallback to old system
  const quest = getQuest(questId);
  if (!quest) return;

  const questState = {
    id: questId,
    giver: quest.giver,  // Store who gave this quest so we can return to them
    objectives: quest.objectives.map(obj => ({
      id: obj.id,
      completed: false,
      count: 0
    })),
    startedAt: Date.now()
  };

  GameState.player.activeQuests.push(questState);
  showNotification(`Quest Accepted: ${quest.name}`);

  // Show helpful hint about next step based on first objective
  const firstObj = quest.objectives[0];
  if (firstObj) {
    setTimeout(() => {
      let hint = '';
      if (firstObj.type === 'talk') {
        hint = `Talk to ${firstObj.target || 'the NPC'} to continue`;
      } else if (firstObj.type === 'lesson') {
        hint = 'Check the Quest panel (Q) to start your lesson';
      } else if (firstObj.type === 'travel') {
        hint = 'Open the Map (M) to travel';
      } else if (firstObj.type === 'gather') {
        hint = 'Use the Gather menu to collect resources';
      }
      if (hint) {
        showNotification(hint, 'info');
      }
    }, 1500);
  }

  // Handle onAccept rewards (things unlocked immediately when quest starts)
  if (quest.onAccept) {
    // Unlock gathering skills on accept (needed for quests that require gathering)
    if (quest.onAccept.gatheringUnlock) {
      const skills = Array.isArray(quest.onAccept.gatheringUnlock)
        ? quest.onAccept.gatheringUnlock
        : [quest.onAccept.gatheringUnlock];

      skills.forEach(skill => {
        if (unlockGatheringSkill(skill)) {
          const skillNames = {
            mining: 'Mining',
            woodcutting: 'Woodcutting',
            herbalism: 'Herbalism',
            fishing: 'Fishing',
            hunting: 'Hunting'
          };
          showNotification(`Learned: ${skillNames[skill] || skill}!`, 'success');
        }
      });
    }
  }

  // Discover travel destinations so player can travel to complete objectives
  if (quest.objectives && locationManager) {
    quest.objectives.forEach(obj => {
      if (obj.type === 'travel' && obj.target) {
        if (!locationManager.isDiscovered(obj.target)) {
          locationManager.discoverLocation(obj.target);
        }
        if (!locationManager.isUnlocked(obj.target) && locationManager.meetsLevelRequirement(obj.target)) {
          locationManager.unlockLocation(obj.target);
        }
      }
    });
  }

  // Check gather objectives immediately (in case player already has items)
  checkGatherObjectives();

  renderQuestPanel();
  renderLocation();  // This properly handles location and NPC rendering
}

function updateQuestProgress(questId, objectiveId, increment = 1, deferCompletion = false) {
  console.log(`[questUI] updateQuestProgress: ${questId}, ${objectiveId}`);

  // NEW: Try clean quest system first
  if (typeof questSystemNew !== 'undefined' && questSystemNew.isQuestActive(questId)) {
    const success = questSystemNew.completeObjective(questId, objectiveId);
    if (success) {
      const questDef = questSystemNew.getQuest(questId);
      const objectiveData = questDef?.objectives.find(o => o.id === objectiveId);
      showNotification(`Objective Complete: ${objectiveData.text}`);
      renderQuestPanel();
      return;
    }
  }

  // OLD: Fallback to old system
  const quest = GameState.player.activeQuests.find(q => q.id === questId);
  if (!quest) return;

  const objective = quest.objectives.find(o => o.id === objectiveId);
  const questDef = getQuest(questId);
  const objectiveData = questDef?.objectives.find(o => o.id === objectiveId);

  if (!objective || objective.completed || !objectiveData) return;

  if (objectiveData.target) {
    objective.count += increment;
    if (objective.count >= objectiveData.target) {
      objective.completed = true;
      showNotification(`Objective Complete: ${objectiveData.text}`);
    }
  } else {
    objective.completed = true;
    showNotification(`Objective Complete: ${objectiveData.text}`);
  }

  // Check if all objectives are complete
  checkQuestCompletion(questId, deferCompletion);
  renderQuestPanel();
}

// Track pending quest completions to show after lesson screen
let pendingQuestCompletion = null;

function checkQuestCompletion(questId, defer = false) {
  const quest = GameState.player.activeQuests.find(q => q.id === questId);
  if (!quest) return;

  const allComplete = quest.objectives.every(o => o.completed);
  if (allComplete) {
    if (defer) {
      // Defer completion until after lesson screen closes
      pendingQuestCompletion = questId;
    } else {
      completeQuest(questId);
    }
  }
}

function processPendingQuestCompletion() {
  if (pendingQuestCompletion) {
    const questId = pendingQuestCompletion;
    pendingQuestCompletion = null;
    completeQuest(questId);
  }
}

// Auto-complete task objectives when lesson is completed
// Task objectives are narrative flavor (e.g., "sing along", "find tracks")
function autoCompleteTaskObjectives(questId, deferCompletion = true) {
  if (!questId) return;

  const quest = GameState.player.activeQuests.find(q => q.id === questId);
  if (!quest) return;

  const questDef = getQuest(questId);
  if (!questDef) return;

  for (const obj of quest.objectives) {
    const objDef = questDef.objectives.find(o => o.id === obj.id);
    if (objDef?.type === 'task' && !obj.completed) {
      obj.completed = true;
      showNotification(`Objective Complete: ${objDef.text}`);
    }
  }

  // Defer completion check - quest rewards shown after lesson screen
  checkQuestCompletion(questId, deferCompletion);
}

/**
 * Start an encounter from a quest objective
 * @param {string} questId - Quest ID
 * @param {string} objectiveId - Objective ID with encounter config
 */
function startQuestEncounter(questId, objectiveId) {
  const quest = GameState.player.activeQuests.find(q => q.id === questId);
  const questData = getQuest(questId);

  if (!quest || !questData) {
    console.error('Quest not found for encounter:', questId);
    return;
  }

  const objDef = questData.objectives.find(o => o.id === objectiveId);
  if (!objDef || objDef.type !== 'encounter') {
    console.error('Invalid encounter objective:', objectiveId);
    return;
  }

  if (typeof encounterManager === 'undefined') {
    console.error('Encounter manager not loaded');
    showNotification('Error: Encounter system not available', 'error');
    return;
  }

  // Start the encounter
  encounterManager.startEncounter(
    objDef.encounterType,
    objDef.encounterId,
    (result) => {
      // Encounter completed - update quest progress
      if (result.success) {
        updateQuestProgress(questId, objectiveId);

        // Show summary based on results
        if (result.results) {
          const { correct, wrong } = result.results;
          const total = correct + wrong;
          if (total > 0) {
            const accuracy = Math.round((correct / total) * 100);
            showNotification(`Encounter complete! ${accuracy}% accuracy`, accuracy >= 80 ? 'success' : 'info');
          }
        }
      }

      renderQuestPanel();
    }
  );
}

function completeQuest(questId) {
  const questData = getQuest(questId);
  const questIndex = GameState.player.activeQuests.findIndex(q => q.id === questId);

  if (questIndex === -1) return;

  // Tutorial: First quest complete - track for cutscene
  const isFirstQuestComplete = shouldShowTutorial('completedQuest');
  if (isFirstQuestComplete) {
    markTutorialComplete('completedQuest');
  }

  // Remove from active
  GameState.player.activeQuests.splice(questIndex, 1);

  // Add to completed (avoid duplicates for repeatable quests)
  if (!GameState.player.completedQuests.includes(questId)) {
    GameState.player.completedQuests.push(questId);
  }

  // Track completion timestamp for repeatable/daily/weekly quests
  if (!GameState.player.questCompletions) {
    GameState.player.questCompletions = {};
  }
  if (!GameState.player.questCompletions[questId]) {
    GameState.player.questCompletions[questId] = { count: 0 };
  }
  GameState.player.questCompletions[questId].count++;
  GameState.player.questCompletions[questId].lastCompletedAt = Date.now();

  // Consume items for gather objectives marked with consumeOnComplete
  if (questData.objectives) {
    questData.objectives.forEach(obj => {
      if (obj.type === 'gather' && obj.consumeOnComplete && obj.itemId) {
        const amount = obj.target || 1;
        if (typeof itemManager !== 'undefined' && itemManager) {
          itemManager.removeItem(obj.itemId, amount);
        }
      }
    });
  }

  // Collect reward data for display
  const rewardData = {
    questName: questData.name,
    questType: questData.type,
    xp: 0,
    gold: 0,
    items: [],
    reputation: [],
    spellbookPages: [],
    leveledUp: false,
    newLevel: null,
    rankUps: []
  };
  
  // Give rewards
  if (questData.rewards) {
    // XP
    if (questData.rewards.xp) {
      const oldLevel = GameState.player.level;
      addXPSilent(questData.rewards.xp);
      rewardData.xp = questData.rewards.xp;
      if (GameState.player.level > oldLevel) {
        rewardData.leveledUp = true;
        rewardData.newLevel = GameState.player.level;
      }
    }
    
    // Gold (with account progression multiplier)
    if (questData.rewards.gold) {
      const actualGold = addGoldSilent(questData.rewards.gold);
      rewardData.gold = actualGold;
      rewardData.baseGold = questData.rewards.gold;
    }

    // Items
    if (questData.rewards.items) {
      questData.rewards.items.forEach(itemId => {
        addItemToInventorySilent(itemId);
        const itemData = GAME_DATA.items[itemId];
        if (itemData) {
          rewardData.items.push({
            id: itemId,
            name: itemData.name,
            icon: itemData.icon,
            stats: itemData.stats
          });
        }
      });
    }
    
    // Reputation
    if (questData.rewards.reputation) {
      Object.entries(questData.rewards.reputation).forEach(([factionId, amount]) => {
        const oldRep = GameState.player.reputation[factionId] || 0;
        let finalAmount = amount;
        
        // Apply Devotion bonus
        if (typeof statsManager !== 'undefined' && statsManager) {
          const multiplier = statsManager.calculateReputationMultiplier();
          finalAmount = Math.floor(amount * multiplier);
        }
        
        const newRep = oldRep + finalAmount;
        GameState.player.reputation[factionId] = newRep;
        
        // Get faction info
        const faction = GAME_DATA.factions?.[factionId];
        const factionName = faction?.name || factionId;
        
        // Check for rank up
        let oldRank = null;
        let newRank = null;
        if (faction?.ranks) {
          oldRank = [...faction.ranks].reverse().find(r => oldRep >= r.threshold);
          newRank = [...faction.ranks].reverse().find(r => newRep >= r.threshold);
        }
        
        const rankUp = oldRank && newRank && oldRank.title !== newRank.title;
        
        rewardData.reputation.push({
          factionId,
          factionName,
          amount: finalAmount,
          baseAmount: amount,
          devotionBonus: finalAmount - amount,
          newTotal: newRep,
          rankUp,
          newRankTitle: rankUp ? newRank.title : null,
          nextRank: faction?.ranks?.find(r => r.threshold > newRep),
          maxRank: faction?.ranks?.[faction.ranks.length - 1]?.threshold || 1000
        });
        
        if (rankUp) {
          rewardData.rankUps.push({
            factionName,
            newRank: newRank.title
          });
        }

        // Check for reputation-based artifact unlocks
        checkReputationArtifacts(factionId, newRep);
      });
    }

    // Spellbook pages
    if (questData.rewards.spellbookUnlock && typeof unlockSpellbookPages === 'function') {
      unlockSpellbookPages(questData.rewards.spellbookUnlock);
      rewardData.spellbookPages = questData.rewards.spellbookUnlock;
    }

    // Artifacts
    if (questData.rewards.artifactUnlock && typeof unlockArtifact === 'function') {
      const artifactIds = Array.isArray(questData.rewards.artifactUnlock)
        ? questData.rewards.artifactUnlock
        : [questData.rewards.artifactUnlock];
      artifactIds.forEach(artifactId => {
        unlockArtifact(artifactId);
      });
      rewardData.artifacts = artifactIds;
    }

    // Feature unlocks (e.g., alchemy, smithing)
    if (questData.rewards.unlocks) {
      if (!GameState.player.unlockedFeatures) {
        GameState.player.unlockedFeatures = [];
      }

      // Crafting professions locked until W2
      const craftingProfessions = ['smithing', 'alchemy', 'enchanting', 'cooking', 'leatherworking'];
      const currentWorld = GameState.currentWorld || 1;

      questData.rewards.unlocks.forEach(feature => {
        // Check if this is a crafting profession and world requirement
        if (craftingProfessions.includes(feature) && currentWorld < 2) {
          showNotification(`${feature.charAt(0).toUpperCase() + feature.slice(1)} unlocks in World 2!`, 'warning');
          return; // Skip this unlock
        }

        if (!GameState.player.unlockedFeatures.includes(feature)) {
          GameState.player.unlockedFeatures.push(feature);
          showNotification(`Unlocked: ${feature.charAt(0).toUpperCase() + feature.slice(1)}!`, 'success');
        }
      });
      rewardData.unlocks = questData.rewards.unlocks;
      // Update nav buttons visibility
      updateNavButtonVisibility();
    }

    // Gathering skill unlocks (e.g., mining, herbalism, fishing)
    if (questData.rewards.gatheringUnlock) {
      const skills = Array.isArray(questData.rewards.gatheringUnlock)
        ? questData.rewards.gatheringUnlock
        : [questData.rewards.gatheringUnlock];

      skills.forEach(skill => {
        if (unlockGatheringSkill(skill)) {
          const skillNames = {
            mining: 'Mining',
            woodcutting: 'Woodcutting',
            herbalism: 'Herbalism',
            fishing: 'Fishing',
            hunting: 'Hunting'
          };
          showNotification(`Learned: ${skillNames[skill] || skill}! Check the Gather menu.`, 'success');
        }
      });
      rewardData.gatheringSkills = skills;
    }
  }

  // Show rewards screen
  // Show first quest complete cutscene after rewards modal
  const onRewardsClosed = isFirstQuestComplete
    ? () => triggerCutscene('first_quest_complete')
    : null;

  showRewardsScreen(rewardData, onRewardsClosed);

  // Unlock next quests
  unlockDependentQuests(questId);

  // Re-render location (NPC visibility may have changed)
  renderLocation();

  renderHUD();
  renderQuestPanel();
  autoSave();
}

/**
 * Check and unlock any artifacts that are tied to reputation thresholds
 */
function checkReputationArtifacts(factionId, currentRep) {
  if (!GAME_DATA.artifacts || typeof unlockArtifact !== 'function' || typeof isArtifactUnlocked !== 'function') {
    return;
  }

  // Find all artifacts that unlock via reputation for this faction
  Object.values(GAME_DATA.artifacts).forEach(artifact => {
    if (artifact.discoveryMethod !== 'reputation') return;
    if (artifact.faction !== factionId) return;
    if (isArtifactUnlocked(artifact.id)) return;

    // Check if player has reached the threshold
    if (currentRep >= artifact.threshold) {
      unlockArtifact(artifact.id);
    }
  });
}

// Silent versions that don't show notifications (for rewards screen)
function addXPSilent(amount) {
  // Apply account progression XP multiplier
  let finalAmount = amount;
  if (typeof accountProgression !== 'undefined' && accountProgression) {
    const effects = accountProgression.getActiveEffects();
    if (effects.xpMultiplier && effects.xpMultiplier > 1) {
      finalAmount = Math.floor(amount * effects.xpMultiplier);
    }
  }

  GameState.player.xp += finalAmount;

  while (GameState.player.xp >= GameState.player.xpToNext) {
    levelUpSilent();
  }

  renderHUD();
  return finalAmount; // Return actual amount for display
}

function addGold(amount) {
  // Apply account progression gold multiplier
  let finalAmount = amount;
  if (typeof accountProgression !== 'undefined' && accountProgression) {
    const effects = accountProgression.getActiveEffects();
    if (effects.goldMultiplier && effects.goldMultiplier > 1) {
      finalAmount = Math.floor(amount * effects.goldMultiplier);
    }
  }

  GameState.player.gold += finalAmount;
  GameState.player.totalGoldEarned = (GameState.player.totalGoldEarned || 0) + finalAmount;

  if (finalAmount > amount) {
    showNotification(`+${finalAmount} gold (${amount} + bonus)`, 'success');
  } else {
    showNotification(`+${finalAmount} gold`, 'success');
  }

  renderHUD();
  return finalAmount;
}

function addGoldSilent(amount) {
  // Apply account progression gold multiplier
  let finalAmount = amount;
  if (typeof accountProgression !== 'undefined' && accountProgression) {
    const effects = accountProgression.getActiveEffects();
    if (effects.goldMultiplier && effects.goldMultiplier > 1) {
      finalAmount = Math.floor(amount * effects.goldMultiplier);
    }
  }

  GameState.player.gold += finalAmount;
  GameState.player.totalGoldEarned = (GameState.player.totalGoldEarned || 0) + finalAmount;

  renderHUD();
  return finalAmount;
}

// Store pending level ups to show after lesson/quest completion screens
let pendingLevelUps = [];

function levelUpSilent() {
  GameState.player.xp -= GameState.player.xpToNext;
  GameState.player.level++;

  const nextLevel = GAME_DATA.levelTable.find(l => l.level === GameState.player.level + 1);
  GameState.player.xpToNext = nextLevel ? nextLevel.xpRequired : Math.floor(GameState.player.xpToNext * 1.5);

  // Stat increase from statsManager
  let statResult = null;
  if (statsManager) {
    statResult = statsManager.handleLevelUp(GameState.player.level);
    // Recalculate max HP based on new Stamina
    GameState.player.maxHp = statsManager.calculateMaxHp();
  } else {
    // Fallback if stats manager not ready
    GameState.player.maxHp += 2;
  }

  // Restore HP on level up
  GameState.player.hp = GameState.player.maxHp;

  // Check for newly unlockable locations
  if (locationManager) {
    locationManager.checkQuestBasedDiscovery();
    locationManager.checkLevelUnlocks();
  }

  // Store level up data to show later
  pendingLevelUps.push({
    level: GameState.player.level,
    statResult: statResult
  });

  recalculateStats();
}

// Show any pending level up screens one by one
function showPendingLevelUps() {
  if (pendingLevelUps.length === 0) return;

  // Get the first pending level up
  const levelUpData = pendingLevelUps.shift();

  // Show the full level up screen
  showLevelUpScreen(levelUpData.level, levelUpData.statResult);

  // Check achievements and milestones after showing level up
  checkAchievements();
  checkMilestones();
}

function addItemToInventorySilent(itemId, count = 1) {
  const itemData = GAME_DATA.items[itemId];
  if (!itemData) return;

  if (itemData.stackable) {
    const existing = GameState.player.inventory.find(i => i.id === itemId);
    if (existing) {
      existing.count += count;
    } else {
      GameState.player.inventory.push({ id: itemId, count });
    }
  } else {
    for (let i = 0; i < count; i++) {
      GameState.player.inventory.push({ id: itemId, count: 1 });
    }
  }

  // Check gather objectives after adding item
  checkGatherObjectives(itemId);
}

/**
 * Check and update gather-type quest objectives based on current inventory
 * Called when items are added to inventory
 */
function checkGatherObjectives(itemId = null) {
  if (!GameState.player.activeQuests) return;

  for (const questProgress of GameState.player.activeQuests) {
    const questData = getQuest(questProgress.id);
    if (!questData) continue;

    for (let i = 0; i < questProgress.objectives.length; i++) {
      const objProgress = questProgress.objectives[i];
      const objData = questData.objectives[i];

      // Skip non-gather objectives or already completed ones
      if (!objData || objData.type !== 'gather' || objProgress.completed) continue;

      let currentCount = 0;
      const targetCount = objData.target || 1;

      // Handle category-based gathering (e.g., itemCategory: "ore")
      if (objData.itemCategory) {
        // Count all items in this category
        for (const invItem of GameState.player.inventory) {
          const itemData = GAME_DATA.items[invItem.id];
          if (itemData && itemData.category === objData.itemCategory) {
            currentCount += invItem.count || 1;
          }
        }
      } else if (objData.itemId) {
        // Skip if we're checking a specific item and it doesn't match
        if (itemId && objData.itemId !== itemId) continue;
        currentCount = getItemCount(objData.itemId);
      }

      // Update progress
      objProgress.count = Math.min(currentCount, targetCount);

      // Check if objective is complete
      if (currentCount >= targetCount && !objProgress.completed) {
        objProgress.completed = true;
        showNotification(`Objective complete: ${objData.text}`, 'success');

        // Check if quest is now completable
        const allComplete = questProgress.objectives.every(o => o.completed);
        if (allComplete) {
          showNotification(`Quest "${questData.name}" ready to turn in!`, 'success');
        }
      }
    }
  }

  // Update quest panel to reflect changes
  renderQuestPanel();
}

/**
 * Check quest objectives for equipping items
 */
function checkEquipObjectives(itemId) {
  if (!GameState.player.activeQuests) return;

  for (const questProgress of GameState.player.activeQuests) {
    const questData = getQuest(questProgress.id);
    if (!questData) continue;

    for (let i = 0; i < questProgress.objectives.length; i++) {
      const objProgress = questProgress.objectives[i];
      const objData = questData.objectives[i];

      if (objData.type !== 'equip' || objProgress.completed) continue;

      // Check if specific item required or any item in slot
      if (objData.itemId && objData.itemId !== itemId) continue;
      if (objData.slot) {
        const itemData = GAME_DATA.items[itemId];
        if (!itemData || itemData.type !== objData.slot) continue;
      }

      objProgress.completed = true;
      showNotification(`Objective complete: ${objData.text}`, 'success');

      checkQuestCompletion(questProgress.id);
    }
  }
  renderQuestPanel();
}

/**
 * Check quest objectives for using consumable items
 */
function checkUseItemObjectives(itemId) {
  if (!GameState.player.activeQuests) return;

  for (const questProgress of GameState.player.activeQuests) {
    const questData = getQuest(questProgress.id);
    if (!questData) continue;

    for (let i = 0; i < questProgress.objectives.length; i++) {
      const objProgress = questProgress.objectives[i];
      const objData = questData.objectives[i];

      if (objData.type !== 'use_item' || objProgress.completed) continue;

      // Check if specific item or any consumable
      if (objData.itemId && objData.itemId !== itemId) continue;

      objProgress.completed = true;
      showNotification(`Objective complete: ${objData.text}`, 'success');

      checkQuestCompletion(questProgress.id);
    }
  }
  renderQuestPanel();
}

/**
 * Check quest objectives for crafting items
 */
function checkCraftObjectives(profession, recipeId) {
  if (!GameState.player.activeQuests) return;

  for (const questProgress of GameState.player.activeQuests) {
    const questData = getQuest(questProgress.id);
    if (!questData) continue;

    for (let i = 0; i < questProgress.objectives.length; i++) {
      const objProgress = questProgress.objectives[i];
      const objData = questData.objectives[i];

      if (objData.type !== 'craft' || objProgress.completed) continue;

      // Check profession match
      if (objData.profession && objData.profession !== profession) continue;

      // Check recipe match if specified
      if (objData.recipeId && objData.recipeId !== recipeId) continue;

      objProgress.completed = true;
      showNotification(`Objective complete: ${objData.text}`, 'success');

      checkQuestCompletion(questProgress.id);
    }
  }
  renderQuestPanel();
}

/**
 * Check quest objectives for contributing to village projects
 */
function checkContributeObjectives(projectId, itemId, amount) {
  if (!GameState.player.activeQuests) return;

  for (const questProgress of GameState.player.activeQuests) {
    const questData = getQuest(questProgress.id);
    if (!questData) continue;

    for (let i = 0; i < questProgress.objectives.length; i++) {
      const objProgress = questProgress.objectives[i];
      const objData = questData.objectives[i];

      if (objData.type !== 'contribute' || objProgress.completed) continue;

      // Check project match if specified
      if (objData.projectId && objData.projectId !== projectId) continue;

      // Update count if tracking amount
      if (objData.target) {
        objProgress.count = (objProgress.count || 0) + amount;
        if (objProgress.count >= objData.target) {
          objProgress.completed = true;
          showNotification(`Objective complete: ${objData.text}`, 'success');
        }
      } else {
        objProgress.completed = true;
        showNotification(`Objective complete: ${objData.text}`, 'success');
      }

      checkQuestCompletion(questProgress.id);
    }
  }
  renderQuestPanel();
}

/**
 * Check quest objectives for buying from shops
 */
function checkBuyObjectives(itemId) {
  if (!GameState.player.activeQuests) return;

  for (const questProgress of GameState.player.activeQuests) {
    const questData = getQuest(questProgress.id);
    if (!questData) continue;

    for (let i = 0; i < questProgress.objectives.length; i++) {
      const objProgress = questProgress.objectives[i];
      const objData = questData.objectives[i];

      if (objData.type !== 'buy' || objProgress.completed) continue;

      // Check if specific item required
      if (objData.itemId && objData.itemId !== itemId) continue;

      objProgress.completed = true;
      showNotification(`Objective complete: ${objData.text}`, 'success');

      checkQuestCompletion(questProgress.id);
    }
  }
  renderQuestPanel();
}

/**
 * Get count of an item in player's inventory
 */
function getItemCount(itemId) {
  if (typeof itemManager !== 'undefined' && itemManager) {
    return itemManager.getItemCount(itemId);
  }

  // Fallback to direct inventory check
  const invItem = GameState.player.inventory?.find(i => i.id === itemId);
  return invItem ? invItem.count : 0;
}


// =====================================================
// Quest Selection Menu (Multi-Quest NPCs)
// =====================================================

function showQuestSelectionMenu(npcId, quests) {
  const npc = getNPC(npcId);
  if (!npc) return;

  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'quest-selection-modal';
  modal.id = 'quest-selection-modal';

  // Get locked quests from this NPC (for display)
  const allNpcQuests = getAllQuestsFromNPC(npcId);
  const lockedQuests = allNpcQuests.filter(q =>
    !quests.find(aq => aq.id === q.id) &&
    !GameState.player.activeQuests.find(aq => aq.id === q.id) &&
    !GameState.player.completedQuests.includes(q.id)
  );

  // Get in-progress quests from this NPC
  const inProgressQuests = GameState.player.activeQuests.filter(q => {
    const questData = getQuest(q.id);
    return questData?.giver === npcId;
  });

  modal.innerHTML = `
    <div class="quest-selection-content">
      <div class="quest-selection-header">
        <span class="quest-selection-npc-name">${npc.name}</span>
        <button class="quest-selection-close" onclick="closeQuestSelectionMenu()">×</button>
      </div>
      <div class="quest-selection-body">
        ${inProgressQuests.length > 0 ? `
          <div class="quest-selection-section">
            <div class="quest-section-title">📋 In Progress</div>
            ${inProgressQuests.map(q => {
              const questData = getQuest(q.id);
              const completedCount = q.objectives.filter(o => o.completed).length;
              const totalCount = q.objectives.length;
              return `
                <div class="quest-selection-item quest-in-progress" data-quest-id="${q.id}">
                  <div class="quest-item-icon">📜</div>
                  <div class="quest-item-info">
                    <div class="quest-item-name">${questData?.name || q.id}</div>
                    <div class="quest-item-progress">${completedCount}/${totalCount} objectives</div>
                  </div>
                  <button class="quest-item-btn" onclick="continueQuestFromMenu('${q.id}')">Continue</button>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}

        <div class="quest-selection-section">
          <div class="quest-section-title">⭐ Available Quests</div>
          ${quests.map(q => {
            const typeIcon = getQuestTypeIcon(q.type);
            return `
              <div class="quest-selection-item quest-available" data-quest-id="${q.id}">
                <div class="quest-item-icon">${typeIcon}</div>
                <div class="quest-item-info">
                  <div class="quest-item-name">${q.name}</div>
                  <div class="quest-item-desc">${q.description || ''}</div>
                </div>
                <button class="quest-item-btn quest-accept-btn" onclick="acceptQuestFromMenu('${q.id}')">Accept</button>
              </div>
            `;
          }).join('')}
        </div>

        ${lockedQuests.length > 0 ? `
          <div class="quest-selection-section">
            <div class="quest-section-title">🔒 Locked</div>
            ${lockedQuests.map(q => {
              const lockReason = getQuestLockReason(q);
              return `
                <div class="quest-selection-item quest-locked">
                  <div class="quest-item-icon">🔒</div>
                  <div class="quest-item-info">
                    <div class="quest-item-name">${q.name}</div>
                    <div class="quest-item-lock-reason">${lockReason}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}
      </div>
      <div class="quest-selection-footer">
        <button class="pixel-btn" onclick="closeQuestSelectionMenu()">Close</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

function getAllQuestsFromNPC(npcId) {
  const allQuests = [];
  const processedQuestIds = new Set();

  // NEW: Check questSystemNew first
  if (typeof questSystemNew !== 'undefined') {
    const npc = getNPC(npcId);
    if (npc) {
      // Get ALL quests this NPC can give (including locked ones)
      for (const [questId, quest] of Object.entries(questSystemNew.quests)) {
        // Check if NPC can give this quest (role match)
        const canGive = quest.roles?.some(role => npc.questRoles.includes(role));
        if (canGive) {
          processedQuestIds.add(questId);
          allQuests.push({
            id: questId,
            ...quest,
            giver: npcId
          });
        }
      }
    }
  }

  // OLD: Get all quests from location-based system
  const location = GAME_DATA.locations[GameState.currentLocation];
  if (location && location.quests) {
    location.quests.forEach(qId => {
      if (!processedQuestIds.has(qId)) {
        const quest = getQuest(qId);
        if (quest && quest.giver === npcId) {
          processedQuestIds.add(qId);
          allQuests.push({ id: qId, ...quest });
        }
      }
    });
  }

  return allQuests;
}

function getQuestTypeIcon(type) {
  const icons = {
    main: '⚔️',
    side: '📜',
    daily: '🔄',
    weekly: '📅',
    repeatable: '♻️',
    grammar: '📖',
    vocabulary: '💬'
  };
  return icons[type] || '📜';
}

function getQuestLockReason(quest) {
  // Check level requirement
  if (quest.levelRequired && GameState.player.level < quest.levelRequired) {
    return `Requires Level ${quest.levelRequired}`;
  }
  // Check prerequisites
  if (quest.prerequisites && quest.prerequisites.length > 0) {
    const unmet = quest.prerequisites.filter(p => !GameState.player.completedQuests.includes(p));
    if (unmet.length > 0) {
      const prereqQuest = getQuest(unmet[0]);
      return `Complete "${prereqQuest?.name || unmet[0]}" first`;
    }
  }
  // Check reputation
  if (quest.reputationRequired) {
    return `Requires ${quest.reputationRequired.rank} with ${quest.reputationRequired.faction}`;
  }
  return 'Requirements not met';
}

function acceptQuestFromMenu(questId) {
  // Tutorial: First quest accept
  const isFirstQuest = shouldShowTutorial('acceptedQuest');
  if (isFirstQuest) {
    markTutorialComplete('acceptedQuest');
  }

  acceptQuest(questId);
  closeQuestSelectionMenu();

  // Show quest panel tutorial after accepting first quest
  if (isFirstQuest) {
    setTimeout(() => {
      showTutorialTip('questPanel', '[data-screen="quests"]', () => {});
    }, 500);
  }
}

function continueQuestFromMenu(questId) {
  closeQuestSelectionMenu();

  // Find the quest and its NPC
  const quest = GameState.player.activeQuests.find(q => q.id === questId);
  const questData = getQuest(questId);
  if (!quest || !questData) return;

  // Re-interact with the NPC to trigger normal quest dialog
  interactWithNPC(questData.giver);
}

function closeQuestSelectionMenu() {
  const modal = document.getElementById('quest-selection-modal');
  if (modal) {
    modal.remove();
  }
}

// =====================================================
// Enhanced Quest Information System
// =====================================================

/**
 * Get quest chain information for display
 * @param {object} questData - Quest definition
 * @returns {object|null} Chain info {chainName, order, total, quests, currentIndex}
 */
function getQuestChainInfo(questData) {
  if (!questData || !questData.chainId) return null;

  // Get all quests
  let allQuests = {};
  if (typeof CourseDataManager !== 'undefined' && CourseDataManager.getQuests) {
    allQuests = CourseDataManager.getQuests() || {};
  } else if (typeof GameState !== 'undefined' && GameState.questManager?.quests) {
    allQuests = GameState.questManager.quests;
  }

  // Find all quests in this chain
  const chainQuests = Object.values(allQuests)
    .filter(q => q && q.chainId === questData.chainId && !q._meta)
    .sort((a, b) => (a.chainOrder || 0) - (b.chainOrder || 0));

  if (chainQuests.length === 0) return null;

  // Get chain name
  const chainNames = {
    main_story: 'Main Story',
    grammar_foundations: 'Grammar Foundations',
    side_stories: 'Side Stories'
  };
  const chainName = chainNames[questData.chainId] ||
    questData.chainId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return {
    chainId: questData.chainId,
    chainName: chainName,
    order: questData.chainOrder || 1,
    total: chainQuests.length,
    quests: chainQuests,
    currentIndex: chainQuests.findIndex(q => q.id === questData.id)
  };
}

/**
 * Travel to a quest's location
 * @param {string} locationId - Location to travel to
 */
function travelToQuestLocation(locationId) {
  if (typeof locationManager !== 'undefined' && locationManager) {
    const result = locationManager.travelTo(locationId);
    if (result && result.success) {
      hideModal('quests-modal');
      hideModal('quest-detail-modal');
      if (typeof renderLocation === 'function') renderLocation();
      const locationData = locationManager.getLocation(locationId);
      showNotification(`Traveled to ${locationData?.name || locationId}`, 'success');
    } else {
      showNotification(result?.message || 'Cannot travel there', 'error');
    }
  } else if (typeof travelToLocation === 'function') {
    // Fallback to travelToLocation function
    hideModal('quests-modal');
    hideModal('quest-detail-modal');
    travelToLocation(locationId);
  } else {
    showNotification('Travel system not available', 'error');
  }
}

/**
 * Show detailed quest information modal
 * @param {string} questId - Quest identifier
 */
function showQuestDetailModal(questId) {
  const questData = typeof getQuest === 'function' ? getQuest(questId) : null;
  if (!questData) {
    showNotification('Quest not found', 'error');
    return;
  }

  // Get quest progress (if active)
  let questProgress = null;
  let isActive = false;
  let isCompleted = false;

  if (typeof GameState !== 'undefined' && GameState.questManager) {
    const activeQuests = GameState.questManager.getActiveQuests() || [];
    questProgress = activeQuests.find(q => (q.id || q.questId) === questId);
    isActive = !!questProgress;

    const completedQuests = GameState.questManager.getCompletedQuests() || [];
    isCompleted = completedQuests.some(q => (q.id || q.questId) === questId);
  } else {
    const activeQuests = GameState.player?.activeQuests || [];
    questProgress = activeQuests.find(q => (q.id || q.questId) === questId);
    isActive = !!questProgress;
    isCompleted = (GameState.player?.completedQuests || []).includes(questId);
  }

  // Get NPC info
  const npc = questData.giver && typeof GAME_DATA !== 'undefined' ? GAME_DATA.npcs?.[questData.giver] : null;

  // Get location info
  const questLocation = questData.location || questData.zone;
  let locationData = null;
  if (questLocation) {
    if (typeof locationManager !== 'undefined' && locationManager?.getLocation) {
      locationData = locationManager.getLocation(questLocation);
    } else if (typeof GAME_DATA !== 'undefined') {
      locationData = GAME_DATA.locations?.[questLocation];
    }
  }
  const currentLocation = GameState.player?.currentLocation || 'dawnmere';

  // Get chain info
  const chainInfo = getQuestChainInfo(questData);

  // Type info
  const typeLabels = {
    main: 'Main Quest', side: 'Side Quest', lesson: 'Lesson Quest',
    daily: 'Daily Quest', weekly: 'Weekly Quest'
  };
  const typeIcons = {
    main: '⚔️', side: '📋', lesson: '📚', daily: '🔄', weekly: '📅'
  };

  // Objective type icons with hints
  const objectiveConfig = {
    interact: { icon: '💬', hint: 'Talk to this character' },
    vocabulary_lesson: { icon: '📚', hint: 'Complete vocabulary exercises' },
    lesson: { icon: '📚', hint: 'Complete the lesson' },
    exploration: { icon: '🗺️', hint: 'Explore the area' },
    combat: { icon: '⚔️', hint: 'Defeat enemies' },
    collect: { icon: '📦', hint: 'Gather items' },
    gather: { icon: '📦', hint: 'Gather resources using skills' },
    meet: { icon: '🤝', hint: 'Find and meet people' },
    task: { icon: '✨', hint: 'Complete this story task' },
    travel: { icon: '🚶', hint: 'Travel to the destination' },
    equip: { icon: '🛡️', hint: 'Equip the required item' },
    craft: { icon: '🔨', hint: 'Craft at a workstation' },
    encounter: { icon: '⚔️', hint: 'Survive the encounter' }
  };

  // Build narrative section
  let narrativeHtml = '';
  if (questData.dialogue?.intro || questData.dialogue?.progress) {
    const dialogueText = isActive ?
      (questData.dialogue.progress || questData.dialogue.intro) :
      questData.dialogue.intro;
    if (dialogueText) {
      narrativeHtml = `
        <div class="quest-detail-section">
          <div class="quest-detail-section-title">📖 Story</div>
          <div class="quest-narrative-box">
            ${npc ? `<div class="quest-narrative-speaker">${npc.name} says:</div>` : ''}
            "${dialogueText}"
          </div>
        </div>
      `;
    }
  }

  // Build objectives section
  const objectives = Array.isArray(questData.objectives) ? questData.objectives :
    (questData.objectives ? Object.values(questData.objectives) : []);
  const progressData = questProgress?.objectives || {};
  const isProgressObject = progressData && !Array.isArray(progressData);

  const objectivesHtml = objectives.map((obj, i) => {
    const objProgress = isProgressObject ? progressData[obj.id] : progressData?.[i];
    const isComplete = objProgress?.completed || isCompleted;
    const config = objectiveConfig[obj.type] || { icon: '○', hint: '' };
    const countText = obj.target && typeof obj.target === 'number' ?
      ` (${objProgress?.count || 0}/${obj.target})` : '';

    return `
      <div class="quest-detail-objective ${isComplete ? 'complete' : ''}">
        <div class="quest-detail-obj-icon">${isComplete ? '✓' : config.icon}</div>
        <div class="quest-detail-obj-content">
          <div class="quest-detail-obj-text">${obj.text || obj.description}${countText}</div>
          ${!isComplete && config.hint ? `<div class="quest-detail-obj-hint">${config.hint}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');

  // Build NPC & Location info cards
  let npcLocationHtml = '';
  if (npc || locationData) {
    const npcCard = npc ? `
      <div class="quest-detail-info-card">
        <div class="quest-detail-info-card-header">
          <span class="quest-detail-info-icon">${npc.icon || '👤'}</span>
          <div>
            <div class="quest-detail-info-name">${npc.name}</div>
            ${npc.title ? `<div class="quest-detail-info-subtitle">${npc.title}</div>` : ''}
          </div>
        </div>
        <div class="quest-detail-info-subtitle">
          📍 ${npc.location ? (GAME_DATA.locations?.[npc.location]?.name || npc.location) : 'Unknown'}
        </div>
      </div>
    ` : '';

    const locationCard = locationData ? `
      <div class="quest-detail-info-card">
        <div class="quest-detail-info-card-header">
          <span class="quest-detail-info-icon">${locationData.icon || '📍'}</span>
          <div>
            <div class="quest-detail-info-name">${locationData.name}</div>
            <div class="quest-detail-info-subtitle">
              ${currentLocation === questLocation ? '✓ You are here' : 'Travel required'}
            </div>
          </div>
        </div>
        ${currentLocation !== questLocation ? `
          <button class="pixel-btn pixel-btn-small" style="width: 100%; margin-top: 8px;"
                  onclick="hideModal('quest-detail-modal'); travelToQuestLocation('${questLocation}')">
            🚶 Travel Here
          </button>
        ` : ''}
      </div>
    ` : '';

    npcLocationHtml = `
      <div class="quest-detail-section">
        <div class="quest-detail-section-title">📍 Where to Go</div>
        <div class="quest-detail-npc-location">
          ${npcCard}
          ${locationCard}
        </div>
      </div>
    `;
  }

  // Build chain visualization
  let chainHtml = '';
  if (chainInfo && chainInfo.quests.length > 1) {
    const completedQuests = GameState.player?.completedQuests || [];
    const completedIds = typeof GameState !== 'undefined' && GameState.questManager
      ? (GameState.questManager.getCompletedQuests() || []).map(q => q.id || q.questId)
      : completedQuests;
    const activeQuestIds = typeof GameState !== 'undefined' && GameState.questManager
      ? (GameState.questManager.getActiveQuests() || []).map(q => q.id || q.questId)
      : (GameState.player?.activeQuests || []).map(q => q.id || q.questId || q);

    const nodesHtml = chainInfo.quests.map((quest, i) => {
      const isQuestCompleted = completedIds.includes(quest.id);
      const isCurrent = quest.id === questId;
      const isQuestActive = activeQuestIds.includes(quest.id);

      let statusClass = 'locked';
      if (isQuestCompleted) statusClass = 'completed';
      else if (isCurrent || isQuestActive) statusClass = 'current';

      const connector = i < chainInfo.quests.length - 1 ?
        `<div class="quest-chain-connector ${isQuestCompleted ? 'completed' : ''}"></div>` : '';

      return `
        <div class="quest-chain-node ${statusClass}" title="${quest.name}">
          <div class="quest-chain-node-dot"></div>
          <div class="quest-chain-node-label">${i + 1}</div>
        </div>
        ${connector}
      `;
    }).join('');

    const nextQuest = chainInfo.currentIndex < chainInfo.quests.length - 1
      ? chainInfo.quests[chainInfo.currentIndex + 1]?.name
      : null;

    chainHtml = `
      <div class="quest-detail-section">
        <div class="quest-detail-section-title">🔗 ${chainInfo.chainName}</div>
        <div class="quest-chain-visual">
          ${nodesHtml}
        </div>
        <div style="font-size: 10px; color: var(--text-muted); margin-top: 8px; text-align: center;">
          Part ${chainInfo.order} of ${chainInfo.total}
          ${nextQuest ? ` • Next: ${nextQuest}` : (chainInfo.order === chainInfo.total ? ' • Final Quest' : '')}
        </div>
      </div>
    `;
  }

  // Build rewards section
  const rewards = questData.rewards || {};
  const rewardsHtml = [];
  if (rewards.xp) rewardsHtml.push(`<div class="quest-detail-reward"><span class="quest-detail-reward-icon">⭐</span> ${rewards.xp} XP</div>`);
  if (rewards.gold) rewardsHtml.push(`<div class="quest-detail-reward"><span class="quest-detail-reward-icon">💰</span> ${rewards.gold} Gold</div>`);
  if (rewards.reputation) {
    Object.entries(rewards.reputation).forEach(([faction, amount]) => {
      const factionName = GAME_DATA?.factions?.[faction]?.name || faction;
      rewardsHtml.push(`<div class="quest-detail-reward"><span class="quest-detail-reward-icon">⭐</span> +${amount} ${factionName}</div>`);
    });
  }
  if (rewards.spellbookPages?.length) {
    rewardsHtml.push(`<div class="quest-detail-reward"><span class="quest-detail-reward-icon">📖</span> Spellbook Page</div>`);
  }
  if (rewards.items?.length) {
    rewardsHtml.push(`<div class="quest-detail-reward"><span class="quest-detail-reward-icon">📦</span> ${rewards.items.length} Item(s)</div>`);
  }
  if (rewards.gatheringUnlock) {
    const skills = Array.isArray(rewards.gatheringUnlock) ? rewards.gatheringUnlock : [rewards.gatheringUnlock];
    skills.forEach(skill => {
      rewardsHtml.push(`<div class="quest-detail-reward"><span class="quest-detail-reward-icon">⛏️</span> Unlock ${skill}</div>`);
    });
  }

  // Build prerequisites section
  let prereqHtml = '';
  if ((questData.prerequisites?.length > 0) || (questData.levelRequired && questData.levelRequired > 1)) {
    const prereqItems = [];

    if (questData.levelRequired && questData.levelRequired > 1) {
      const met = GameState.player?.level >= questData.levelRequired;
      prereqItems.push(`
        <div class="quest-prereq-item ${met ? 'met' : 'unmet'}">
          ${met ? '✓' : '✗'} Level ${questData.levelRequired} required
        </div>
      `);
    }

    (questData.prerequisites || []).forEach(prereqId => {
      const prereqQuest = typeof getQuest === 'function' ? getQuest(prereqId) : null;
      const completedIds = typeof GameState !== 'undefined' && GameState.questManager
        ? (GameState.questManager.getCompletedQuests() || []).map(q => q.id || q.questId)
        : (GameState.player?.completedQuests || []);
      const met = completedIds.includes(prereqId);
      prereqItems.push(`
        <div class="quest-prereq-item ${met ? 'met' : 'unmet'}">
          ${met ? '✓' : '✗'} Complete "${prereqQuest?.name || prereqId}"
        </div>
      `);
    });

    if (prereqItems.length > 0) {
      prereqHtml = `
        <div class="quest-detail-section">
          <div class="quest-detail-section-title">📋 Requirements</div>
          <div class="quest-prereq-list">
            ${prereqItems.join('')}
          </div>
        </div>
      `;
    }
  }

  // Build action buttons
  const hasLesson = questData.type === 'lesson' || questData.vocab || questData.lessonContent ||
    objectives.some(obj => obj.type === 'vocabulary_lesson');
  let actionsHtml = '';
  if (isActive) {
    actionsHtml = `
      ${hasLesson ? `<button class="pixel-btn pixel-btn-gold" onclick="hideModal('quest-detail-modal'); continueQuestLesson('${questId}')">Start Lesson</button>` : ''}
      ${npc ? `<button class="pixel-btn" onclick="hideModal('quest-detail-modal'); showQuestGiver('${questId}')">Go to NPC</button>` : ''}
    `;
  } else if (!isCompleted && npc) {
    actionsHtml = `
      <button class="pixel-btn pixel-btn-gold" onclick="hideModal('quest-detail-modal'); hideModal('quests-modal'); NPCSystem.talkTo('${npc.id}')">Accept Quest</button>
    `;
  }

  // Build final modal content
  const modalContent = `
    <div class="quest-detail-modal">
      <div class="quest-detail-header">
        <div class="quest-detail-icon">${typeIcons[questData.type] || '📜'}</div>
        <div class="quest-detail-title-area">
          <div class="quest-detail-name">${questData.name}</div>
          <span class="quest-detail-type-badge">${typeLabels[questData.type] || questData.type}</span>
          ${isCompleted ? '<span class="quest-detail-type-badge" style="background: var(--success); color: white; margin-left: 4px;">Completed</span>' : ''}
          ${isActive ? '<span class="quest-detail-type-badge" style="background: var(--accent-gold); color: var(--bg-dark); margin-left: 4px;">Active</span>' : ''}
        </div>
      </div>

      <div class="quest-card-desc" style="margin-bottom: var(--space-lg);">${questData.description || ''}</div>

      ${narrativeHtml}

      ${chainHtml}

      <div class="quest-detail-section">
        <div class="quest-detail-section-title">📋 Objectives</div>
        <div class="quest-detail-objectives">
          ${objectivesHtml || '<div class="quest-detail-obj-text">No objectives</div>'}
        </div>
      </div>

      ${npcLocationHtml}

      ${prereqHtml}

      <div class="quest-detail-section">
        <div class="quest-detail-section-title">🎁 Rewards</div>
        <div class="quest-detail-rewards">
          ${rewardsHtml.length > 0 ? rewardsHtml.join('') : '<span style="font-size: 11px; color: var(--text-muted);">No rewards listed</span>'}
        </div>
      </div>

      <div class="quest-detail-footer">
        <button class="pixel-btn" onclick="hideModal('quest-detail-modal')">Close</button>
        <div style="display: flex; gap: 8px;">
          ${actionsHtml}
        </div>
      </div>
    </div>
  `;

  showModal('quest-detail-modal', modalContent);
}

// Make globally accessible
window.showQuestDetailModal = showQuestDetailModal;
window.getQuestChainInfo = getQuestChainInfo;
window.travelToQuestLocation = travelToQuestLocation;

