// ByteQuest - NPC Quest Markers V2
// Integration between NPCs and QuestManager

// =====================================================
// NPC Quest Marker Functions (V2)
// =====================================================

/**
 * Check if NPC has available quests (using QuestManager)
 * @param {string} npcId - NPC identifier
 * @param {QuestManager} questManager - Quest manager instance
 * @returns {boolean} True if NPC has quests player can accept
 */
function npcHasAvailableQuestsV2(npcId, questManager) {
  if (!questManager || !npcId) return false;

  // Use QuestManager's built-in method
  return questManager.npcHasAvailableQuests(npcId);
}

/**
 * Check if NPC has quests ready to turn in (using QuestManager)
 * @param {string} npcId - NPC identifier
 * @param {QuestManager} questManager - Quest manager instance
 * @returns {boolean} True if NPC has quests ready to complete
 */
function npcHasQuestsToTurnInV2(npcId, questManager) {
  if (!questManager || !npcId) return false;

  // Use QuestManager's built-in method
  return questManager.npcHasQuestsToTurnIn(npcId);
}

/**
 * Get available quests from an NPC (using QuestManager)
 * @param {string} npcId - NPC identifier
 * @param {QuestManager} questManager - Quest manager instance
 * @returns {Array} Array of available quest definitions
 */
function getAvailableQuestsFromNPCV2(npcId, questManager) {
  if (!questManager || !npcId) return [];

  // Get all available quests
  const available = questManager.getAvailableQuests();

  // Filter to quests from this NPC
  return available.filter(quest => quest.giver === npcId);
}

/**
 * Get quests ready to turn in at this NPC (using QuestManager)
 * @param {string} npcId - NPC identifier
 * @param {QuestManager} questManager - Quest manager instance
 * @returns {Array} Array of quest instances ready to complete
 */
function getQuestsToTurnInAtNPCV2(npcId, questManager) {
  if (!questManager || !npcId) return [];

  // Get active quests
  const active = questManager.getActiveQuests();

  // Filter to quests from this NPC that are ready to turn in
  return active.filter(questInstance => {
    if (questInstance.state !== 'READY_TO_TURN_IN') return false;

    // Check if quest giver matches
    const quest = questManager.getQuest(questInstance.questId);
    return quest && quest.giver === npcId;
  });
}

/**
 * Check if NPC has in-progress quests (not ready to turn in)
 * @param {string} npcId - NPC identifier
 * @param {QuestManager} questManager - Quest manager instance
 * @returns {boolean} True if NPC has quests in progress
 */
function npcHasQuestsInProgressV2(npcId, questManager) {
  if (!questManager || !npcId) return false;

  const active = questManager.getActiveQuests();

  return active.some(questInstance => {
    if (questInstance.state === 'READY_TO_TURN_IN') return false;

    const quest = questManager.getQuest(questInstance.questId);
    return quest && quest.giver === npcId;
  });
}

/**
 * Get NPC quest marker icon (for rendering)
 * @param {string} npcId - NPC identifier
 * @param {QuestManager} questManager - Quest manager instance
 * @returns {object|null} Marker info {icon, class, tooltip} or null
 */
function getNPCQuestMarkerV2(npcId, questManager) {
  if (!questManager || !npcId) return null;

  // Priority 1: Quest ready to turn in
  if (npcHasQuestsToTurnInV2(npcId, questManager)) {
    return {
      icon: '?',
      class: 'npc-marker npc-marker-turnin',
      tooltip: 'Quest Complete - Click to turn in'
    };
  }

  // Priority 2: Available quests
  if (npcHasAvailableQuestsV2(npcId, questManager)) {
    return {
      icon: '!',
      class: 'npc-marker npc-marker-quest',
      tooltip: 'New Quest Available'
    };
  }

  // Priority 3: Quest in progress — no marker (per user request, hide when no actionable quests)
  // In-progress quests don't need a marker since player can't do anything at the NPC

  return null;
}

// =====================================================
// Backward Compatibility Functions
// =====================================================

/**
 * Global quest manager instance (set by main game)
 */
let globalQuestManager = null;

/**
 * Set the global quest manager for backward compatibility
 * @param {QuestManager} questManager - Quest manager instance
 */
function setGlobalQuestManager(questManager) {
  globalQuestManager = questManager;
}

/**
 * Backward compatible hasAvailableQuest
 * Falls back to old system if QuestManager not available
 */
function hasAvailableQuest(npcId) {
  // Try V2 first
  if (globalQuestManager) {
    return npcHasAvailableQuestsV2(npcId, globalQuestManager);
  }

  // Fall back to old system (from questUI.js)
  const available = getAvailableQuests();
  return available.some(q => q.giver === npcId);
}

/**
 * Backward compatible hasQuestReadyToTurnIn
 * Falls back to old system if QuestManager not available
 */
function hasQuestReadyToTurnIn(npcId) {
  // Try V2 first
  if (globalQuestManager) {
    return npcHasQuestsToTurnInV2(npcId, globalQuestManager);
  }

  // Fall back to old system (from questUI.js)
  return GameState.player.activeQuests.some(q => {
    const questData = getQuest(q.id);
    if (questData?.giver !== npcId) return false;
    return q.objectives.every(obj => obj.completed);
  });
}

// =====================================================
// NPC Interaction Helpers (V2)
// =====================================================

/**
 * Get NPC dialogue options based on quest state (V2)
 * @param {string} npcId - NPC identifier
 * @param {object} npc - NPC data
 * @param {QuestManager} questManager - Quest manager instance
 * @returns {object} Dialogue options {greeting, options[]}
 */
function getNPCDialogueOptionsV2(npcId, npc, questManager) {
  const options = [];

  // Check for quests to turn in (highest priority)
  const toTurnIn = getQuestsToTurnInAtNPCV2(npcId, questManager);
  if (toTurnIn.length > 0) {
    toTurnIn.forEach(questInstance => {
      const quest = questManager.getQuest(questInstance.questId);
      if (quest) {
        options.push({
          text: `✓ ${quest.dialogue?.turnIn || `Complete "${quest.name}"`}`,
          action: () => turnInQuestV2(quest.id, questManager),
          type: 'quest_turnin',
          questId: quest.id
        });
      }
    });
  }

  // Check for available quests
  const available = getAvailableQuestsFromNPCV2(npcId, questManager);
  if (available.length > 0) {
    if (available.length === 1) {
      // Single quest - show intro dialogue
      const quest = available[0];
      options.push({
        text: quest.dialogue?.intro || quest.description || `Learn about "${quest.name}"`,
        action: () => showQuestIntroV2(quest, questManager),
        type: 'quest_intro',
        questId: quest.id
      });
    } else {
      // Multiple quests - show quest selection
      options.push({
        text: `View Available Quests (${available.length})`,
        action: () => showQuestSelectionMenuV2(npcId, available, questManager),
        type: 'quest_list'
      });
    }
  }

  // Check for in-progress quests
  const inProgress = questManager.getActiveQuests().filter(q => {
    const quest = questManager.getQuest(q.questId);
    return quest && quest.giver === npcId && q.state !== 'READY_TO_TURN_IN';
  });

  if (inProgress.length > 0) {
    inProgress.forEach(questInstance => {
      const quest = questManager.getQuest(questInstance.questId);
      if (quest) {
        options.push({
          text: `❔ ${quest.dialogue?.inProgress || `Ask about "${quest.name}"`}`,
          action: () => showQuestProgressV2(quest, questInstance, questManager),
          type: 'quest_progress',
          questId: quest.id
        });
      }
    });
  }

  // Check if NPC has shop
  if (npc.shop) {
    options.push({
      text: "Browse Wares",
      action: () => openShop(npcId),
      type: 'shop'
    });
  }

  // Idle dialogue option
  if (npc.dialogue?.idle && npc.dialogue.idle.length > 0) {
    const randomIdle = npc.dialogue.idle[Math.floor(Math.random() * npc.dialogue.idle.length)];
    options.push({
      text: "Chat",
      action: () => showDialog(npc.name, randomIdle, [
        { text: "Goodbye", action: hideDialog }
      ]),
      type: 'idle'
    });
  }

  // Always add goodbye option
  if (options.length > 0) {
    options.push({
      text: "Goodbye",
      action: hideDialog,
      type: 'goodbye'
    });
  }

  return {
    greeting: npc.dialogue?.greeting || `Hello, traveler.`,
    options: options
  };
}

// =====================================================
// Quest UI Functions (V2)
// =====================================================

/**
 * Show quest intro dialogue (V2)
 */
function showQuestIntroV2(quest, questManager) {
  const introText = quest.dialogue?.intro || quest.description || `Would you like to help with "${quest.name}"?`;

  showDialog(
    quest.name,
    introText,
    [
      {
        text: quest.dialogue?.accept || "Accept Quest",
        action: () => {
          hideDialog();
          const result = questManager.acceptQuest(quest.id);
          if (result.success) {
            showNotification(`Quest Accepted: ${quest.name}`, 'success');
            if (typeof renderLocation === 'function') renderLocation();
            if (typeof renderQuestPanel === 'function') renderQuestPanel();
            if (typeof autoSave === 'function') autoSave();
          } else {
            showNotification(result.error || 'Failed to accept quest', 'error');
          }
        }
      },
      {
        text: quest.dialogue?.decline || "Not now",
        action: hideDialog
      }
    ]
  );
}

/**
 * Show quest progress dialogue (V2)
 */
function showQuestProgressV2(quest, questInstance, questManager) {
  const progressText = quest.dialogue?.inProgress || `Keep working on your objectives.`;

  // Build objectives summary
  const objectivesHtml = Object.entries(questInstance.objectives)
    .map(([objId, objState]) => {
      const objDef = quest.objectives.find(o => o.id === objId);
      if (!objDef) return '';

      const icon = objState.completed ? '✓' : '○';
      return `${icon} ${objDef.description}`;
    })
    .join('<br>');

  const fullText = `${progressText}<br><br><strong>Objectives:</strong><br>${objectivesHtml}`;

  showDialog(quest.name, fullText, [
    { text: "Continue", action: hideDialog }
  ]);
}

/**
 * Turn in quest (V2)
 */
function turnInQuestV2(questId, questManager) {
  const quest = questManager.getQuest(questId);
  if (!quest) {
    showNotification('Quest not found', 'error');
    return;
  }

  hideDialog();

  // Get performance data (if available from lesson state)
  const performance = {};
  if (typeof GameState !== 'undefined' && GameState.lessonState) {
    const lesson = GameState.lessonState;
    if (lesson.questId === questId) {
      performance.score = lesson.correctAnswers / (lesson.correctAnswers + lesson.wrongAnswers) * 100;
      performance.perfect = lesson.wrongAnswers === 0;
      performance.streak = lesson.streak;
    }
  }

  // Turn in quest
  const result = questManager.turnInQuest(questId, performance);

  if (!result.success) {
    showNotification(result.error || 'Failed to turn in quest', 'error');
    return;
  }

  // Show turn-in dialogue
  const turnInText = quest.dialogue?.turnIn || `Quest complete! Thank you for your help.`;
  showDialog(quest.name, turnInText, [
    {
      text: "Claim Rewards",
      action: () => {
        hideDialog();
        showQuestRewardsV2(quest, result.rewards, result.unlocks);
      }
    }
  ]);
}

/**
 * Show quest rewards screen (V2)
 */
function showQuestRewardsV2(quest, rewards, unlocks) {
  const rewardsHtml = [];

  if (rewards.xp > 0) {
    rewardsHtml.push(`✨ ${rewards.xp} XP`);
  }

  if (rewards.gold > 0) {
    rewardsHtml.push(`💰 ${rewards.gold} Gold`);
  }

  if (rewards.items.length > 0) {
    rewardsHtml.push(`📦 ${rewards.items.length} item(s)`);
  }

  if (Object.keys(rewards.reputation).length > 0) {
    Object.entries(rewards.reputation).forEach(([faction, amount]) => {
      rewardsHtml.push(`⭐ +${amount} ${faction} reputation`);
    });
  }

  if (rewards.spellbookPages.length > 0) {
    rewardsHtml.push(`📖 ${rewards.spellbookPages.length} spellbook page(s)`);
  }

  if (unlocks && unlocks.quests && unlocks.quests.length > 0) {
    rewardsHtml.push(`🔓 ${unlocks.quests.length} new quest(s) unlocked`);
  }

  const rewardText = rewardsHtml.length > 0
    ? `<strong>Rewards:</strong><br>${rewardsHtml.join('<br>')}`
    : 'Quest completed!';

  showModal('quest-rewards-modal', `
    <div class="quest-rewards">
      <h2>🎉 Quest Complete!</h2>
      <h3>${quest.name}</h3>
      <div class="rewards-list">
        ${rewardText}
      </div>
      <button class="pixel-btn pixel-btn-gold" onclick="hideModal('quest-rewards-modal')">
        Continue
      </button>
    </div>
  `);

  // Update UI
  if (typeof renderLocation === 'function') renderLocation();
  if (typeof renderQuestPanel === 'function') renderQuestPanel();
  if (typeof autoSave === 'function') autoSave();
}

/**
 * Show quest selection menu for NPCs with multiple quests (V2)
 */
function showQuestSelectionMenuV2(npcId, quests, questManager) {
  const npc = getNPC(npcId);
  if (!npc) return;

  hideDialog();

  // Create modal with quest list
  const questsHtml = quests.map(quest => {
    const icon = quest.icon || '📜';
    return `
      <div class="quest-selection-item" data-quest-id="${quest.id}">
        <div class="quest-icon">${icon}</div>
        <div class="quest-info">
          <div class="quest-name">${quest.name}</div>
          <div class="quest-description">${quest.description || ''}</div>
        </div>
        <button class="pixel-btn pixel-btn-small" onclick="acceptQuestFromSelectionV2('${quest.id}')">
          Accept
        </button>
      </div>
    `;
  }).join('');

  showModal('quest-selection-modal', `
    <div class="quest-selection">
      <h2>${npc.name}</h2>
      <h3>Available Quests</h3>
      <div class="quest-list">
        ${questsHtml}
      </div>
      <button class="pixel-btn" onclick="hideModal('quest-selection-modal')">
        Close
      </button>
    </div>
  `);
}

/**
 * Accept quest from selection menu (V2)
 */
function acceptQuestFromSelectionV2(questId) {
  if (!globalQuestManager) {
    showNotification('Quest system not initialized', 'error');
    return;
  }

  hideModal('quest-selection-modal');

  const result = globalQuestManager.acceptQuest(questId);
  if (result.success) {
    const quest = globalQuestManager.getQuest(questId);
    showNotification(`Quest Accepted: ${quest.name}`, 'success');
    if (typeof renderLocation === 'function') renderLocation();
    if (typeof renderQuestPanel === 'function') renderQuestPanel();
    if (typeof autoSave === 'function') autoSave();
  } else {
    showNotification(result.error || 'Failed to accept quest', 'error');
  }
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    npcHasAvailableQuestsV2,
    npcHasQuestsToTurnInV2,
    npcHasQuestsInProgressV2,
    getAvailableQuestsFromNPCV2,
    getQuestsToTurnInAtNPCV2,
    getNPCQuestMarkerV2,
    getNPCDialogueOptionsV2,
    setGlobalQuestManager,
    hasAvailableQuest,
    hasQuestReadyToTurnIn,
    showQuestIntroV2,
    showQuestProgressV2,
    turnInQuestV2,
    showQuestRewardsV2,
    showQuestSelectionMenuV2,
    acceptQuestFromSelectionV2
  };
}
