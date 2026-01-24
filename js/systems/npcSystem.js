/**
 * ByteQuest - NPC System
 * Handles NPC interactions, quests, and dialogues
 */

const NPCSystem = {
  /**
   * Get quests for the current course (language-agnostic)
   * Uses CourseDataManager if available, falls back to direct access
   */
  _getQuests() {
    // Use CourseDataManager (preferred)
    if (typeof CourseDataManager !== 'undefined' && CourseDataManager.currentCourse) {
      return CourseDataManager.getQuests();
    }
    // Use QuestManager if available
    if (typeof GameState !== 'undefined' && GameState.questManager) {
      return GameState.questManager.quests || {};
    }
    // Fallback: try common quest variable names
    if (typeof FRENCH_QUESTS !== 'undefined') return FRENCH_QUESTS;
    if (typeof GREEK_QUESTS !== 'undefined') return GREEK_QUESTS;
    return {};
  },

  /**
   * Get a specific quest by ID (language-agnostic)
   */
  _getQuest(questId) {
    // Use CourseDataManager (preferred)
    if (typeof CourseDataManager !== 'undefined' && CourseDataManager.currentCourse) {
      return CourseDataManager.getQuest(questId);
    }
    const quests = this._getQuests();
    return quests[questId] || null;
  },

  /**
   * Check if NPC has available quests
   */
  hasAvailableQuests(npcId) {
    if (typeof QuestManager !== 'undefined' && GameState.questManager) {
      return GameState.questManager.npcHasAvailableQuests(npcId);
    }

    // Fallback: check quests directly (language-agnostic)
    const quests = this._getQuests();
    if (Object.keys(quests).length === 0) return false;

    const playerLevel = GameState.player?.level || 1;
    const completedQuests = GameState.player?.completedQuests || [];
    const activeQuests = GameState.player?.activeQuests || [];
    const readyToTurnIn = GameState.player?.readyToTurnIn || [];

    // Helper to check if quest is in array (handles both string IDs and quest objects)
    const isQuestInArray = (arr, questId) => {
      return arr.some(item => item === questId || item?.id === questId);
    };

    return Object.values(quests).some(quest => {
      if (!quest || !quest.id) return false;
      if (quest._meta) return false;
      if (quest.giver !== npcId) return false;
      if (isQuestInArray(completedQuests, quest.id)) return false;
      if (isQuestInArray(activeQuests, quest.id)) return false;
      if (isQuestInArray(readyToTurnIn, quest.id)) return false;
      if (quest.levelRequired > playerLevel) return false;
      return true;
    });
  },

  /**
   * Check if NPC has quests ready to turn in
   */
  hasQuestsToTurnIn(npcId) {
    if (typeof QuestManager !== 'undefined' && GameState.questManager) {
      return GameState.questManager.npcHasQuestsToTurnIn(npcId);
    }

    // Fallback: check readyToTurnIn array (language-agnostic)
    const readyToTurnIn = GameState.player?.readyToTurnIn || [];
    if (readyToTurnIn.length === 0) return false;

    const quests = this._getQuests();
    return readyToTurnIn.some(questId => {
      const quest = quests[questId];
      return quest && quest.giver === npcId;
    });
  },

  /**
   * Get quests ready to turn in for an NPC
   */
  _getQuestsToTurnIn(npcId) {
    // Check QuestManager first
    if (typeof QuestManager !== 'undefined' && GameState.questManager) {
      const activeQuests = GameState.questManager.getActiveQuests();
      return activeQuests.filter(quest =>
        quest.giver === npcId && quest.state === 'READY_TO_TURN_IN'
      );
    }

    // Fallback: check readyToTurnIn array (language-agnostic)
    const quests = this._getQuests();
    if (Object.keys(quests).length === 0) return [];

    const readyToTurnIn = GameState.player?.readyToTurnIn || [];
    return readyToTurnIn
      .map(questId => quests[questId])
      .filter(quest => quest && quest.giver === npcId);
  },

  /**
   * Talk to an NPC - show their dialogue/quest options
   */
  talkTo(npcId) {
    console.log('[NPCSystem] Talking to:', npcId);

    // Get NPC data
    const npc = this._getNPCData(npcId);
    if (!npc) {
      console.error('[NPCSystem] NPC not found:', npcId);
      return;
    }

    // Check "meet" objectives - player talked to an NPC
    if (typeof GameState !== 'undefined' && GameState.questManager) {
      const meetResult = GameState.questManager.checkMeetObjectives(npcId);
      if (meetResult.completedObjectives?.length > 0) {
        for (const completed of meetResult.completedObjectives) {
          showNotification(`Met a settler! (${completed.objectiveId})`, 'success');
        }
      }
    }

    // Check for quests to turn in FIRST (priority)
    const turnInQuests = this._getQuestsToTurnIn(npcId);
    if (turnInQuests.length > 0) {
      console.log('[NPCSystem] NPC has quests to turn in:', turnInQuests.length);
      if (turnInQuests.length === 1) {
        this._showTurnInDialogue(npc, turnInQuests[0]);
      } else {
        this._showTurnInSelection(npc, turnInQuests);
      }
      return;
    }

    // Check for active quests from this NPC that can be continued
    const activeQuests = this._getActiveQuestsFromNpc(npcId);
    if (activeQuests.length > 0) {
      console.log('[NPCSystem] NPC has active quests:', activeQuests.length);
      if (activeQuests.length === 1) {
        this._showContinueQuestDialogue(npc, activeQuests[0]);
      } else {
        this._showActiveQuestSelection(npc, activeQuests);
      }
      return;
    }

    // Get available quests from this NPC
    const availableQuests = this._getAvailableQuests(npcId);

    if (availableQuests.length === 0) {
      this._showNoQuestsDialogue(npc);
      return;
    }

    // Show quest selection or start first quest
    if (availableQuests.length === 1) {
      this._showQuestDialogue(npc, availableQuests[0]);
    } else {
      this._showQuestSelection(npc, availableQuests);
    }
  },

  /**
   * Get NPC data from gamedata
   */
  _getNPCData(npcId) {
    if (typeof GAME_DATA !== 'undefined' && GAME_DATA.npcs) {
      return GAME_DATA.npcs[npcId];
    }
    return null;
  },

  /**
   * Get available quests for an NPC (language-agnostic)
   */
  _getAvailableQuests(npcId) {
    // Use QuestManager if available (preferred)
    if (typeof GameState !== 'undefined' && GameState.questManager) {
      const availableQuests = GameState.questManager.getAvailableQuests();
      return availableQuests.filter(quest => quest.giver === npcId);
    }

    // Fallback: manual check
    const quests = this._getQuests();
    if (Object.keys(quests).length === 0) return [];

    const playerLevel = GameState.player?.level || 1;
    const completedQuests = GameState.player?.completedQuests || [];
    const activeQuests = GameState.player?.activeQuests || [];
    const readyToTurnIn = GameState.player?.readyToTurnIn || [];

    // Helper to check if quest is in array (handles both string IDs and quest objects)
    const isQuestInArray = (arr, questId) => {
      return arr.some(item => item === questId || item?.id === questId);
    };

    return Object.values(quests).filter(quest => {
      if (!quest || !quest.id) return false;
      if (quest._meta) return false;
      if (quest.giver !== npcId) return false;
      if (isQuestInArray(completedQuests, quest.id)) return false;
      if (isQuestInArray(activeQuests, quest.id)) return false;
      if (isQuestInArray(readyToTurnIn, quest.id)) return false;
      if (quest.levelRequired > playerLevel) return false;

      // Check prerequisites
      if (quest.prerequisites && quest.prerequisites.length > 0) {
        const hasAllPrereqs = quest.prerequisites.every(prereq =>
          isQuestInArray(completedQuests, prereq)
        );
        if (!hasAllPrereqs) return false;
      }

      return true;
    });
  },

  /**
   * Get active quests from an NPC (that can be continued)
   */
  _getActiveQuestsFromNpc(npcId) {
    // Use QuestManager if available
    if (typeof GameState !== 'undefined' && GameState.questManager) {
      const activeQuests = GameState.questManager.getActiveQuests();
      return activeQuests.filter(quest =>
        quest.giver === npcId && quest.state !== 'READY_TO_TURN_IN'
      );
    }

    // Fallback: check old activeQuests array
    const activeQuestIds = GameState.player?.activeQuests || [];
    const quests = this._getQuests();
    return activeQuestIds
      .map(questId => quests[questId])
      .filter(quest => quest && quest.giver === npcId);
  },

  /**
   * Show dialogue for continuing an active quest
   */
  _showContinueQuestDialogue(npc, quest) {
    const content = `
      <div class="npc-dialogue quest-detail">
        <div class="npc-header">
          <span class="npc-name">${npc.name}</span>
        </div>
        <div class="quest-header">
          <span class="quest-icon">${quest.icon || '📜'}</span>
          <span class="quest-name">${quest.name}</span>
        </div>
        <div class="quest-description">
          ${quest.description || ''}
        </div>
        <div class="dialogue-text" style="margin-top: 16px; padding: 12px; background: rgba(0,0,0,0.2); border-radius: 8px; border-left: 3px solid var(--accent-gold);">
          <em>"Ready to continue your lesson?"</em>
        </div>
        <div class="dialogue-actions">
          <button class="art-btn art-btn-gold" onclick="NPCSystem.continueQuest('${quest.id}')">Continue Lesson</button>
          <button class="art-btn" onclick="hideModal('npc-dialogue-modal')">Not Now</button>
        </div>
      </div>
    `;

    if (typeof showModal === 'function') {
      showModal('npc-dialogue-modal', content);
    }
  },

  /**
   * Show selection when multiple active quests
   */
  _showActiveQuestSelection(npc, quests) {
    const questList = quests.map(quest => `
      <div class="quest-option quest-active" onclick="NPCSystem._showContinueQuestDialogue(NPCSystem._getNPCData('${npc.id}'), NPCSystem._getQuest('${quest.id}'))">
        <span class="quest-icon">${quest.icon || '📜'}</span>
        <span class="quest-name">${quest.name}</span>
        <span class="quest-status">In Progress</span>
      </div>
    `).join('');

    const content = `
      <div class="npc-dialogue">
        <div class="npc-header">
          <span class="npc-name">${npc.name}</span>
        </div>
        <div class="dialogue-text">
          "You have lessons in progress. Which would you like to continue?"
        </div>
        <div class="quest-list">
          ${questList}
        </div>
        <div class="dialogue-actions">
          <button class="art-btn" onclick="hideModal('npc-dialogue-modal')">Not Now</button>
        </div>
      </div>
    `;

    if (typeof showModal === 'function') {
      showModal('npc-dialogue-modal', content);
    }
  },

  /**
   * Continue an active quest (restart the lesson)
   */
  continueQuest(questId) {
    console.log('[NPCSystem] Continuing quest:', questId);

    const quest = this._getQuest(questId);
    if (!quest) {
      console.error('[NPCSystem] Quest not found:', questId);
      return;
    }

    // Hide the dialogue modal
    if (typeof hideModal === 'function') {
      hideModal('npc-dialogue-modal');
    }

    // If it's a lesson quest, start/restart the lesson
    if (quest.type === 'lesson' || quest.objectives?.some(obj => obj.type === 'vocabulary_lesson')) {
      console.log('[NPCSystem] Starting lesson for quest:', questId);
      if (typeof LessonSystem !== 'undefined') {
        LessonSystem.startLesson(quest);
      } else {
        console.error('[NPCSystem] LessonSystem not available');
      }
    }
  },

  /**
   * Show dialogue when NPC has no quests (but might have shop)
   */
  _showNoQuestsDialogue(npc) {
    // Check if NPC has a shop
    const hasShop = typeof npcHasAnyShop === 'function' && npcHasAnyShop(npc.id);

    let shopButton = '';
    if (hasShop) {
      shopButton = `<button class="art-btn art-btn-gold" onclick="openShop('${npc.id}')">Browse Shop</button>`;
    }

    const dialogueText = hasShop
      ? (npc.dialogue?.shopGreeting || npc.dialogue?.greeting || "Welcome! Would you like to see what I have?")
      : (npc.dialogue?.noQuest || "I have nothing for you right now. Come back later!");

    const content = `
      <div class="npc-dialogue">
        <div class="npc-header">
          <span class="npc-name">${npc.name}</span>
          <span class="npc-role">${npc.role || ''}</span>
        </div>
        <div class="dialogue-text">
          ${dialogueText}
        </div>
        <div class="dialogue-actions">
          ${shopButton}
          <button class="art-btn" onclick="hideModal('npc-dialogue-modal')">Goodbye</button>
        </div>
      </div>
    `;

    if (typeof showModal === 'function') {
      showModal('npc-dialogue-modal', content);
    }
  },

  /**
   * Show quest dialogue for a single quest
   */
  _showQuestDialogue(npc, quest) {
    // Build rewards display
    let rewardsHtml = '<div class="quest-rewards"><h4>Rewards:</h4><ul>';
    if (quest.rewards) {
      if (quest.rewards.xp) {
        rewardsHtml += `<li>⭐ ${quest.rewards.xp} XP</li>`;
      }
      if (quest.rewards.gold) {
        rewardsHtml += `<li>💰 ${quest.rewards.gold} Gold</li>`;
      }
      if (quest.rewards.spellbookPages && quest.rewards.spellbookPages.length > 0) {
        rewardsHtml += `<li>📖 New Spellbook Page</li>`;
      }
    }
    rewardsHtml += '</ul></div>';

    const content = `
      <div class="npc-dialogue quest-detail">
        <div class="npc-header">
          <span class="npc-name">${npc.name}</span>
          <span class="npc-role">${npc.role || ''}</span>
        </div>
        <div class="quest-offer">
          <h3 class="quest-title">${quest.icon || '📜'} ${quest.name}</h3>
          <p class="quest-description">${quest.description}</p>
          <div class="dialogue-text">
            "${quest.dialogue?.intro || "Will you help me with this?"}"
          </div>
          ${rewardsHtml}
        </div>
        <div class="dialogue-actions">
          <button class="art-btn art-btn-gold" onclick="NPCSystem.acceptQuest('${quest.id}')">Accept Quest</button>
          <button class="art-btn" onclick="NPCSystem.talkTo('${npc.id}')">Back</button>
        </div>
      </div>
    `;

    if (typeof showModal === 'function') {
      showModal('npc-dialogue-modal', content);
    }
  },

  /**
   * Show quest selection when multiple quests available
   */
  _showQuestSelection(npc, quests) {
    // Check if NPC has a shop
    const hasShop = typeof npcHasAnyShop === 'function' && npcHasAnyShop(npc.id);

    const questList = quests.map(quest => `
      <div class="quest-option" onclick="NPCSystem.showQuestDetails('${npc.id}', '${quest.id}')">
        <span class="quest-icon">${quest.icon || '📜'}</span>
        <span class="quest-name">${quest.name}</span>
        <span class="quest-arrow">▶</span>
      </div>
    `).join('');

    let shopButton = '';
    if (hasShop) {
      shopButton = `<button class="art-btn" onclick="openShop('${npc.id}')">Browse Shop</button>`;
    }

    const content = `
      <div class="npc-dialogue">
        <div class="npc-header">
          <span class="npc-name">${npc.name}</span>
          <span class="npc-role">${npc.role || ''}</span>
        </div>
        <div class="dialogue-text">
          ${npc.dialogue?.greeting || "I have several tasks that need attention..."}
        </div>
        <div class="quest-list">
          ${questList}
        </div>
        <div class="dialogue-actions">
          ${shopButton}
          <button class="art-btn" onclick="hideModal('npc-dialogue-modal')">Goodbye</button>
        </div>
      </div>
    `;

    if (typeof showModal === 'function') {
      showModal('npc-dialogue-modal', content);
    }
  },

  /**
   * Show turn-in dialogue for a completed quest
   */
  _showTurnInDialogue(npc, quest) {
    // Build rewards display
    let rewardsHtml = '<div class="quest-rewards rewards-earned"><h4>Your Rewards:</h4><ul>';
    if (quest.rewards) {
      if (quest.rewards.xp) {
        rewardsHtml += `<li>⭐ ${quest.rewards.xp} XP</li>`;
      }
      if (quest.rewards.gold) {
        rewardsHtml += `<li>💰 ${quest.rewards.gold} Gold</li>`;
      }
      if (quest.rewards.spellbookPages && quest.rewards.spellbookPages.length > 0) {
        rewardsHtml += `<li>📖 New Spellbook Page</li>`;
      }
    }
    rewardsHtml += '</ul></div>';

    const content = `
      <div class="npc-dialogue quest-turnin">
        <div class="npc-header">
          <span class="npc-name">${npc.name}</span>
          <span class="npc-role">${npc.role || ''}</span>
        </div>
        <div class="quest-complete-banner">
          <span class="complete-icon">✓</span>
          <span class="complete-text">Quest Complete!</span>
        </div>
        <div class="quest-offer">
          <h3 class="quest-title">${quest.icon || '📜'} ${quest.name}</h3>
          <div class="dialogue-text">
            "${quest.dialogue?.complete || "Excellent work! You have done well."}"
          </div>
          ${rewardsHtml}
        </div>
        <div class="dialogue-actions">
          <button class="art-btn art-btn-gold" onclick="NPCSystem.turnInQuest('${quest.id}')">Claim Rewards</button>
        </div>
      </div>
    `;

    if (typeof showModal === 'function') {
      showModal('npc-dialogue-modal', content);
    }
  },

  /**
   * Show turn-in selection when multiple quests ready
   */
  _showTurnInSelection(npc, quests) {
    const questList = quests.map(quest => `
      <div class="quest-option quest-ready" onclick="NPCSystem._showTurnInDialogue(NPCSystem._getNPCData('${npc.id}'), NPCSystem._getQuest('${quest.id}'))">
        <span class="quest-icon">✓</span>
        <span class="quest-name">${quest.name}</span>
        <span class="quest-status">Ready!</span>
      </div>
    `).join('');

    const content = `
      <div class="npc-dialogue">
        <div class="npc-header">
          <span class="npc-name">${npc.name}</span>
          <span class="npc-role">${npc.role || ''}</span>
        </div>
        <div class="dialogue-text">
          "You've completed some tasks! Let's see what you've accomplished..."
        </div>
        <div class="quest-list">
          ${questList}
        </div>
        <div class="dialogue-actions">
          <button class="art-btn" onclick="hideModal('npc-dialogue-modal')">Goodbye</button>
        </div>
      </div>
    `;

    if (typeof showModal === 'function') {
      showModal('npc-dialogue-modal', content);
    }
  },

  /**
   * Show quest details - public method for onclick
   */
  showQuestDetails(npcId, questId) {
    const npc = this._getNPCData(npcId);
    const quest = this._getQuest(questId);
    if (npc && quest) {
      this._showQuestDialogue(npc, quest);
    }
  },

  /**
   * Accept a quest and start the lesson
   */
  acceptQuest(questId) {
    console.log('[NPCSystem] Accepting quest:', questId);

    const quest = this._getQuest(questId);
    if (!quest) {
      console.error('[NPCSystem] Quest not found:', questId);
      return;
    }

    // Use QuestManager if available
    if (typeof GameState !== 'undefined' && GameState.questManager) {
      const result = GameState.questManager.acceptQuest(questId);
      if (!result.success) {
        console.error('[NPCSystem] Failed to accept quest:', result.error);
        return;
      }
      // Start the quest
      GameState.questManager.startQuest(questId);

      // Auto-complete any "task" type objectives (intro/narrative objectives)
      // and "interact" objectives that target the quest giver (since we're talking to them)
      if (quest.objectives) {
        quest.objectives.forEach(obj => {
          // Auto-complete "task" objectives (narrative/intro tasks like "wake up")
          if (obj.type === 'task') {
            console.log('[NPCSystem] Auto-completing task objective:', obj.id);
            GameState.questManager.completeObjective(questId, obj.id);
          }
          // Complete "interact" objectives if target is the quest giver
          if (obj.type === 'interact' && obj.target === quest.giver) {
            console.log('[NPCSystem] Auto-completing interact objective (quest giver):', obj.id);
            GameState.questManager.completeObjective(questId, obj.id);
          }
        });
      }
    } else {
      // Fallback: Add to active quests
      if (!GameState.player.activeQuests) {
        GameState.player.activeQuests = [];
      }
      if (!GameState.player.activeQuests.includes(questId)) {
        GameState.player.activeQuests.push(questId);
      }
    }

    // Hide the dialogue modal
    if (typeof hideModal === 'function') {
      hideModal('npc-dialogue-modal');
    }

    // If it's a lesson quest, start the lesson
    if (quest.type === 'lesson' || quest.objectives?.some(obj => obj.type === 'vocabulary_lesson')) {
      console.log('[NPCSystem] Starting lesson for quest:', questId);
      if (typeof LessonSystem !== 'undefined') {
        LessonSystem.startLesson(quest);
      } else {
        console.error('[NPCSystem] LessonSystem not available');
      }
    }
  },

  /**
   * Turn in a quest and claim rewards
   */
  turnInQuest(questId) {
    console.log('[NPCSystem] Turning in quest:', questId);

    const quest = this._getQuest(questId);
    if (!quest) {
      console.error('[NPCSystem] Quest not found:', questId);
      return;
    }

    // Use QuestManager if available
    if (typeof GameState !== 'undefined' && GameState.questManager) {
      const result = GameState.questManager.turnInQuest(questId, {});
      if (!result.success) {
        console.error('[NPCSystem] Failed to turn in quest:', result.error);
        // Fall through to manual handling
      } else {
        console.log('[NPCSystem] Quest turned in via QuestManager:', result);
        // Hide modal
        if (typeof hideModal === 'function') {
          hideModal('npc-dialogue-modal');
        }

        // Build rewards notification
        const rewards = result.rewards || {};
        let rewardParts = [];
        if (rewards.xp > 0) rewardParts.push(`+${rewards.xp} XP`);
        if (rewards.gold > 0) rewardParts.push(`+${rewards.gold} Gold`);
        if (rewards.spellbookPages && rewards.spellbookPages.length > 0) {
          rewardParts.push(`📖 New Spellbook Page`);
        }
        if (rewards.title) rewardParts.push(`👑 Title: ${rewards.title}`);

        const rewardText = rewardParts.length > 0
          ? `Rewards: ${rewardParts.join(', ')}`
          : 'Quest completed!';

        if (typeof showNotification === 'function') {
          showNotification(rewardText, 'success');
        }

        if (typeof renderHUD === 'function') {
          renderHUD();
        }
        if (typeof autoSave === 'function') {
          autoSave();
        }
        return;
      }
    }

    // Fallback: manual reward handling
    // Move from readyToTurnIn to completed
    if (GameState.player.readyToTurnIn) {
      GameState.player.readyToTurnIn = GameState.player.readyToTurnIn.filter(q => q !== questId);
    }
    if (!GameState.player.completedQuests) {
      GameState.player.completedQuests = [];
    }
    if (!GameState.player.completedQuests.includes(questId)) {
      GameState.player.completedQuests.push(questId);
    }

    // Apply rewards
    if (quest.rewards) {
      // Award XP through XPSystem
      if (quest.rewards.xp) {
        if (typeof XPSystem !== 'undefined') {
          XPSystem.awardXP(quest.rewards.xp, `quest:${questId}`);
        } else {
          GameState.player.xp = (GameState.player.xp || 0) + quest.rewards.xp;
        }
      }

      // Award gold
      if (quest.rewards.gold) {
        GameState.player.gold = (GameState.player.gold || 0) + quest.rewards.gold;
      }
    }

    // Hide modal and show success
    if (typeof hideModal === 'function') {
      hideModal('npc-dialogue-modal');
    }
    if (typeof showNotification === 'function') {
      showNotification('Quest completed! Rewards claimed.', 'success');
    }
    if (typeof renderHUD === 'function') {
      renderHUD();
    }
    if (typeof saveGame === 'function') {
      saveGame();
    }

    console.log('[NPCSystem] Quest turned in (fallback). Current XP:', GameState.player.xp, 'Level:', GameState.player.level);
  }
};

// =====================================================
// NPC Definitions
// =====================================================

const NPC_DEFINITIONS = {
  elder_maren: {
    id: 'elder_maren',
    name: 'Elder Maren',
    icon: '👴',
    title: 'Keeper of the Order',
    location: 'dawnmere',
    dialogue: {
      greeting: "Greetings, young one. I have watched your progress with great interest.",
      questAvailable: "You have grown strong in your studies. The time has come to choose your path within the Order.",
      questActive: "Have you decided which path calls to you?",
      questComplete: "A wise choice. May your new path bring you wisdom and strength."
    },
    quests: ['orders_call']
  },

  isora: {
    id: 'isora',
    name: 'Isora',
    icon: '👵',
    title: 'Village Elder',
    location: 'dawnmere',
    dialogue: {
      greeting: "Welcome, child. You look tired. Rest here - we'll talk when you're ready.",
      questAvailable: "I have something that needs doing. Are you willing to help?",
      questActive: "How goes your task? Remember, patience builds more than haste.",
      questComplete: "Well done. Dawnmere is stronger for your efforts.",
      noQuests: "Rest a while, child. There will be more to do soon enough."
    },
    quests: [
      // Main story quests - Zone 1 (Isora guides the newcomer)
      'ms_1_01_stranger_arrives',
      'ms_1_02_words_of_welcome',
      'ms_1_04_a_place_to_belong',
      'ms_1_05_trouble_in_the_fields',
      'ms_1_09_darkness_at_the_edge',
      'ms_1_10_the_road_north',
      // Vocabulary lesson quests
      'vl_01_greetings',
      'vl_02_introductions',
      'vl_03_essentials',
      'vl_04_numbers',
      'vl_05_colors',
      'vl_06_days',
      'vl_07_cognates',
      // Side quests
      'sq_1_04_the_old_well'
    ]
  }
};

// =====================================================
// NPC System Initialization
// =====================================================

/**
 * Initialize NPC system and register NPCs into GAME_DATA
 */
function initNPCSystem() {
  if (typeof GAME_DATA === 'undefined') {
    console.warn('[NPCSystem] GAME_DATA not available');
    return;
  }

  // Ensure GAME_DATA.npcs exists
  if (!GAME_DATA.npcs) {
    GAME_DATA.npcs = {};
  }

  // Register NPC definitions
  Object.assign(GAME_DATA.npcs, NPC_DEFINITIONS);
  console.log('[NPCSystem] Registered NPCs:', Object.keys(NPC_DEFINITIONS).join(', '));
}

// Auto-initialize when script loads
initNPCSystem();

// Make globally accessible
window.NPCSystem = NPCSystem;
window.NPC_DEFINITIONS = NPC_DEFINITIONS;
window.initNPCSystem = initNPCSystem;
console.log('[npcSystem.js] NPCSystem loaded');
