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

    // Special handling for Memory Shrine
    if (npc.isShrine) {
      this._showShrineInteraction(npc);
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
    const questCards = quests.map(quest => this._renderQuestCard(quest, npc.id, 'active')).join('');

    const content = `
      <div class="npc-dialogue">
        <div class="npc-header">
          <span class="npc-name">${npc.name}</span>
          <span class="npc-role">${npc.role || ''}</span>
        </div>
        <div class="dialogue-text">
          "You have lessons in progress. Which would you like to continue?"
        </div>
        <div class="quest-selection">
          ${questCards}
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
    // Check if NPC has trade network feature
    const hasTradeNetwork = npc.features && npc.features.includes('trade_network');

    let shopButton = '';
    if (hasShop) {
      shopButton = `<button class="art-btn art-btn-gold" onclick="openShop('${npc.id}')">Browse Shop</button>`;
    }

    let tradeButton = '';
    if (hasTradeNetwork) {
      tradeButton = `<button class="art-btn art-btn-gold" onclick="hideModal('npc-dialogue-modal'); openTradeNetwork();">Trade Contracts</button>`;
    }

    let dialogueText;
    if (hasTradeNetwork) {
      dialogueText = npc.dialogue?.tradeWelcome || "Looking for trade contracts? I have orders that need fulfilling.";
    } else if (hasShop) {
      dialogueText = npc.dialogue?.shopGreeting || npc.dialogue?.greeting || "Welcome! Would you like to see what I have?";
    } else {
      dialogueText = npc.dialogue?.noQuest || "I have nothing for you right now. Come back later!";
    }

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
          ${tradeButton}
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

      // Show accept quest tutorial for first-time players
      if (!GameState.tutorial?.shownTips?.includes('acceptQuest')) {
        setTimeout(() => {
          showTutorialTip('acceptQuest', '.art-btn-gold', () => {});
        }, 300);
      }
    }
  },

  /**
   * Show quest selection when multiple quests available
   */
  _showQuestSelection(npc, quests) {
    // Check if NPC has a shop
    const hasShop = typeof npcHasAnyShop === 'function' && npcHasAnyShop(npc.id);
    // Check if NPC has trade network feature
    const hasTradeNetwork = npc.features && npc.features.includes('trade_network');

    const questCards = quests.map(quest => this._renderQuestCard(quest, npc.id)).join('');

    let shopButton = '';
    if (hasShop) {
      shopButton = `<button class="art-btn" onclick="openShop('${npc.id}')">Browse Shop</button>`;
    }

    let tradeButton = '';
    if (hasTradeNetwork) {
      tradeButton = `<button class="art-btn art-btn-gold" onclick="hideModal('npc-dialogue-modal'); openTradeNetwork();">Trade Contracts</button>`;
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
        <div class="quest-selection">
          ${questCards}
        </div>
        <div class="dialogue-actions">
          ${tradeButton}
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
    const questCards = quests.map(quest => this._renderQuestCard(quest, npc.id, 'ready')).join('');

    const content = `
      <div class="npc-dialogue">
        <div class="npc-header">
          <span class="npc-name">${npc.name}</span>
          <span class="npc-role">${npc.role || ''}</span>
        </div>
        <div class="dialogue-text">
          "You've completed some tasks! Let's see what you've accomplished..."
        </div>
        <div class="quest-selection">
          ${questCards}
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
   * Render a quest card for selection lists
   * @param {Object} quest - Quest data
   * @param {string} npcId - NPC ID for click handler
   * @param {string} status - Optional status: 'available', 'active', 'ready'
   */
  _renderQuestCard(quest, npcId, status = 'available') {
    // Determine quest type for badge
    const questType = this._getQuestType(quest);
    const typeBadge = this._getTypeBadge(questType);

    // Build rewards display
    let rewardsHtml = '';
    if (quest.rewards) {
      const rewards = [];
      if (quest.rewards.xp) {
        rewards.push(`<span class="reward reward-xp">+${quest.rewards.xp} XP</span>`);
      }
      if (quest.rewards.gold) {
        rewards.push(`<span class="reward reward-gold">+${quest.rewards.gold} Gold</span>`);
      }
      rewardsHtml = rewards.join('');
    }

    // Status indicator
    let statusHtml = '';
    if (status === 'ready') {
      statusHtml = '<span class="quest-card-status status-ready">Ready!</span>';
    } else if (status === 'active') {
      statusHtml = '<span class="quest-card-status status-active">In Progress</span>';
    }

    // Card class based on status
    const cardClass = status === 'ready' ? 'quest-ready' : status === 'active' ? 'quest-active' : '';

    // Click handler based on status
    let clickHandler = '';
    if (status === 'ready') {
      clickHandler = `NPCSystem._showTurnInDialogue(NPCSystem._getNPCData('${npcId}'), NPCSystem._getQuest('${quest.id}'))`;
    } else if (status === 'active') {
      clickHandler = `NPCSystem._showContinueQuestDialogue(NPCSystem._getNPCData('${npcId}'), NPCSystem._getQuest('${quest.id}'))`;
    } else {
      clickHandler = `NPCSystem.showQuestDetails('${npcId}', '${quest.id}')`;
    }

    return `
      <div class="quest-card ${cardClass}" onclick="${clickHandler}">
        <div class="quest-card-header">
          <span class="quest-card-icon">${quest.icon || '📜'}</span>
          <div class="quest-card-info">
            <div class="quest-card-title">
              ${quest.name}
              ${statusHtml}
            </div>
            <div class="quest-card-desc">${quest.description || ''}</div>
          </div>
          <span class="quest-card-arrow">${status === 'ready' ? '✓' : '▶'}</span>
        </div>
        <div class="quest-card-footer">
          <div class="quest-card-rewards">${rewardsHtml}</div>
          ${typeBadge}
        </div>
      </div>
    `;
  },

  /**
   * Determine quest type from quest data
   */
  _getQuestType(quest) {
    if (quest.type === 'lesson') return 'lesson';
    if (quest.objectives?.some(obj => obj.type === 'vocabulary_lesson')) return 'lesson';
    if (quest.objectives?.some(obj => obj.type === 'gather')) return 'gather';
    if (quest.id?.startsWith('ms_')) return 'story';
    return 'task';
  },

  /**
   * Get badge HTML for quest type
   */
  _getTypeBadge(type) {
    const badges = {
      lesson: '<span class="quest-type-badge type-lesson">Lesson</span>',
      story: '<span class="quest-type-badge type-story">Story</span>',
      gather: '<span class="quest-type-badge type-gather">Gather</span>',
      task: '<span class="quest-type-badge type-task">Task</span>'
    };
    return badges[type] || badges.task;
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
        if (typeof addGoldSilent === 'function') {
          addGoldSilent(quest.rewards.gold);
        } else {
          GameState.player.gold = (GameState.player.gold || 0) + quest.rewards.gold;
        }
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
  },

  // =====================================================
  // Memory Shrine Interaction
  // =====================================================

  /**
   * Show the Memory Shrine interaction UI
   */
  _showShrineInteraction(npc) {
    // Get devotion tier for personalized greeting
    const devotion = GameState.player?.shrineDevotio || { tier: 0 };
    const tierKey = `tier${devotion.tier}`;
    const greeting = npc.dialogue[tierKey] || npc.dialogue.greeting;

    // Get stats for display
    const stats = typeof LeitnerSystem !== 'undefined' ? LeitnerSystem.getStats() : { totalWords: 0, dueForReview: 0 };
    const canPractice = stats.totalWords >= 4;

    const content = `
      <div class="shrine-interaction">
        <div class="shrine-header">
          <div class="shrine-keeper-portrait">
            <span class="keeper-icon">${npc.icon}</span>
          </div>
          <div class="shrine-keeper-info">
            <h2>${npc.name}</h2>
            <p class="keeper-title">${npc.title}</p>
          </div>
        </div>

        <div class="shrine-dialogue">
          <p class="keeper-speech">"${greeting}"</p>
        </div>

        <div class="shrine-stats">
          <div class="shrine-stat">
            <span class="stat-value">${stats.totalWords}</span>
            <span class="stat-label">Words Learned</span>
          </div>
          <div class="shrine-stat">
            <span class="stat-value">${stats.dueForReview}</span>
            <span class="stat-label">Due for Review</span>
          </div>
          <div class="shrine-stat">
            <span class="stat-value">${devotion.totalSessions || 0}</span>
            <span class="stat-label">Sessions</span>
          </div>
        </div>

        <div class="shrine-options">
          <button class="shrine-option-btn" onclick="NPCSystem._openShrineReview()">
            <span class="option-icon">📚</span>
            <span class="option-text">
              <span class="option-name">Spaced Review</span>
              <span class="option-desc">Review words due for practice</span>
            </span>
            ${stats.dueForReview > 0 ? `<span class="option-badge">${stats.dueForReview}</span>` : ''}
          </button>

          <button class="shrine-option-btn ${canPractice ? '' : 'disabled'}" ${canPractice ? 'onclick="NPCSystem._openShrineChallenges()"' : ''}>
            <span class="option-icon">🧘</span>
            <span class="option-text">
              <span class="option-name">Practice Challenges</span>
              <span class="option-desc">Meditation of Persistence & Trial of Swiftness</span>
            </span>
          </button>

          <button class="shrine-option-btn" onclick="NPCSystem._openShrineBlessings()">
            <span class="option-icon">✨</span>
            <span class="option-text">
              <span class="option-name">Blessings</span>
              <span class="option-desc">Receive temporary buffs for your journey</span>
            </span>
          </button>

          <button class="shrine-option-btn" onclick="NPCSystem._openShrineProgress()">
            <span class="option-icon">📊</span>
            <span class="option-text">
              <span class="option-name">Devotion Progress</span>
              <span class="option-desc">View your mastery and milestones</span>
            </span>
          </button>
        </div>

        <div class="shrine-footer">
          <button class="pixel-btn" onclick="hideModal('npc-dialogue-modal')">Leave Shrine</button>
        </div>
      </div>
    `;

    if (typeof showModal === 'function') {
      showModal('npc-dialogue-modal', content);
    } else {
      console.error('[NPCSystem] showModal function not available');
    }
  },

  /**
   * Open the spaced review system
   */
  _openShrineReview() {
    console.log('[NPCSystem] Opening shrine review...');
    if (typeof hideModal === 'function') {
      hideModal('npc-dialogue-modal');
    }
    if (typeof PracticeUI !== 'undefined' && typeof PracticeUI.showPracticeHub === 'function') {
      PracticeUI.showPracticeHub('practice');
    } else {
      console.error('[NPCSystem] PracticeUI not available');
      if (typeof showNotification === 'function') {
        showNotification('Practice system not available', 'error');
      }
    }
  },

  /**
   * Open practice challenges (Meditation & Trial)
   */
  _openShrineChallenges() {
    console.log('[NPCSystem] Opening shrine challenges...');
    if (typeof hideModal === 'function') {
      hideModal('npc-dialogue-modal');
    }
    // Show challenge selection
    const content = `
      <div class="shrine-challenges">
        <div class="challenges-header">
          <h2>🧘 Practice Challenges</h2>
          <p>Train your vocabulary through focused meditation</p>
        </div>

        <div class="challenge-options">
          <button class="challenge-card" onclick="NPCSystem._startShrineChallenge('streak')">
            <span class="challenge-icon">🔥</span>
            <h3>Meditation of Persistence</h3>
            <p>Answer 15 questions. Build streaks for bonus XP!</p>
            <span class="challenge-rewards">Rewards: XP + Streak Bonuses</span>
          </button>

          <button class="challenge-card" onclick="NPCSystem._startShrineChallenge('speed')">
            <span class="challenge-icon">⚡</span>
            <h3>Trial of Swiftness</h3>
            <p>Answer 10 questions as fast as possible!</p>
            <span class="challenge-rewards">Rewards: XP based on speed</span>
          </button>
        </div>

        <div class="challenges-footer">
          <button class="pixel-btn" onclick="NPCSystem.talkTo('shrine_keeper')">Back</button>
        </div>
      </div>
    `;

    if (typeof showModal === 'function') {
      showModal('npc-dialogue-modal', content);
    } else {
      console.error('[NPCSystem] showModal function not available');
    }
  },

  /**
   * Start a shrine practice challenge
   */
  _startShrineChallenge(modeId) {
    console.log('[NPCSystem] Starting shrine challenge:', modeId);
    if (typeof hideModal === 'function') {
      hideModal('npc-dialogue-modal');
    }

    // Initialize practice manager if needed
    if (typeof practiceManager === 'undefined' && typeof initPracticeSystem === 'function') {
      initPracticeSystem();
    }

    if (typeof practiceManager !== 'undefined' && typeof practiceManager.startPractice === 'function') {
      setTimeout(() => {
        practiceManager.startPractice(modeId);
      }, 150);
    } else {
      console.error('[NPCSystem] practiceManager not available');
      if (typeof showNotification === 'function') {
        showNotification('Practice system not available', 'error');
      }
    }
  },

  /**
   * Open blessings menu
   */
  _openShrineBlessings() {
    console.log('[NPCSystem] Opening shrine blessings...');
    if (typeof hideModal === 'function') {
      hideModal('npc-dialogue-modal');
    }
    if (typeof memoryShrineManager !== 'undefined' && typeof memoryShrineManager.showBlessingsUI === 'function') {
      memoryShrineManager.showBlessingsUI();
    } else {
      console.warn('[NPCSystem] memoryShrineManager.showBlessingsUI not available');
      if (typeof showNotification === 'function') {
        showNotification('Blessings system not available yet', 'warning');
      }
    }
  },

  /**
   * Open devotion progress view
   */
  _openShrineProgress() {
    console.log('[NPCSystem] Opening shrine progress...');
    if (typeof hideModal === 'function') {
      hideModal('npc-dialogue-modal');
    }
    if (typeof PracticeUI !== 'undefined' && typeof PracticeUI.showPracticeHub === 'function') {
      PracticeUI.showPracticeHub('practice');
    } else {
      console.error('[NPCSystem] PracticeUI not available');
      if (typeof showNotification === 'function') {
        showNotification('Progress view not available', 'error');
      }
    }
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
  },

  forager_wynn: {
    id: 'forager_wynn',
    name: 'Wynn',
    icon: '🌿',
    title: 'Forager',
    location: 'dawnmere',
    dialogue: {
      greeting: "The forest is generous today. I can smell rain coming — good for the herbs.",
      questAvailable: "You look like someone who could learn a thing or two about living off the land.",
      questActive: "Have you tried your hand at gathering yet? The land provides, but you have to learn to listen.",
      questComplete: "Well done! You're a natural. The land has more to teach you yet.",
      noQuests: "Keep practicing your gathering. There's always something new to find."
    },
    quests: ['sq_1_05_the_gatherers_path']
  },

  // =====================================================
  // Zone 2 - The Haari Fields NPCs
  // =====================================================

  dave: {
    id: 'dave',
    name: 'Dave',
    icon: '🧑‍🌾',
    title: 'Head Horticulturist',
    location: 'haari_fields',
    dialogue: {
      greeting: "Welcome to the Haari Fields! The golden wheat stretches as far as the eye can see.",
      questAvailable: "Ah, you look eager to learn. I can teach you about life here in the fields.",
      questActive: "How goes your studies? The land has much to teach us.",
      questComplete: "Well done! You're becoming a true friend of the fields.",
      noQuests: "The fields are peaceful today. Enjoy the golden view."
    },
    quests: [
      'vl_08_family',
      'sq_2_01_daves_burden'
    ]
  },

  lyra: {
    id: 'lyra',
    name: 'Lyra',
    icon: '🌿',
    title: 'Apprentice Herbalist',
    location: 'haari_fields',
    dialogue: {
      greeting: "Oh! Hello there. I was just tending to my herbs.",
      questAvailable: "Would you like to learn about the plants we grow here? And perhaps... food?",
      questActive: "Have you been practicing the vocabulary?",
      questComplete: "Wonderful! You're learning so quickly!",
      noQuests: "The garden is quiet today. Come back soon!"
    },
    quests: [
      'vl_09_food',
      'sq_2_02_lyras_garden'
    ]
  },

  rask: {
    id: 'rask',
    name: 'Rask',
    icon: '🏹',
    title: 'Field Tracker',
    location: 'haari_fields',
    dialogue: {
      greeting: "Keep your voice low. The fields have ears... and eyes.",
      questAvailable: "A tracker must know the weather and the land. I can teach you.",
      questActive: "Watch the sky. What do you see?",
      questComplete: "Good. You're learning to read the signs.",
      noQuests: "All is quiet on the horizon. For now."
    },
    quests: [
      'vl_10_weather',
      'sq_2_04_rasks_warning'
    ]
  },

  shepherd_marcus: {
    id: 'shepherd_marcus',
    name: 'Marcus',
    icon: '🐑',
    title: 'Shepherd',
    location: 'haari_fields',
    dialogue: {
      greeting: "Fine day for the flock, wouldn't you say?",
      questAvailable: "The animals are my life! Let me teach you their names.",
      questActive: "Have you been learning the animal words?",
      questComplete: "Bravo! You speak the language of the farm now.",
      noQuests: "The flock is content. Thank you again for your help."
    },
    quests: [
      'vl_11_animals',
      'sq_1_02_lost_flock'
    ]
  },

  healer_mira: {
    id: 'healer_mira',
    name: 'Mira',
    icon: '💊',
    title: 'Field Healer',
    location: 'haari_fields',
    dialogue: {
      greeting: "Greetings, traveler. Are you well? I tend to the health of all who work these fields.",
      questAvailable: "A healer's knowledge begins with the body. Let me teach you the words.",
      questActive: "How are your studies progressing? The body has many parts to learn.",
      questComplete: "Excellent! Now you can describe any ailment. This knowledge may save a life.",
      noQuests: "Everyone is healthy today, thank the light. Rest well."
    },
    quests: [
      'vl_12_body'
    ]
  },

  merchant_henri: {
    id: 'merchant_henri',
    name: 'Henri',
    icon: '🛒',
    title: 'Traveling Merchant',
    location: 'haari_fields',
    dialogue: {
      greeting: "Welcome, welcome! Henri has the finest goods from across the land!",
      questAvailable: "Ah, but first - let Henri teach you the words for fine clothing!",
      questActive: "Have you learned the clothing words? A well-dressed customer is the best customer!",
      questComplete: "Magnifique! Now you can shop in any French market with confidence!",
      noQuests: "Browse my wares! Special prices for friends of Henri!"
    },
    quests: [
      'vl_13_clothing'
    ]
  },

  // =====================================================
  // Zone 3 - Lurenium NPCs
  // =====================================================

  merchant_liselle: {
    id: 'merchant_liselle',
    name: 'Merchant Liselle',
    icon: '💰',
    title: 'Trade Master',
    role: 'Trade Network',
    location: 'lurenium',
    dialogue: {
      greeting: "Ah, a new face in the golden city! Trade is the lifeblood of Lurenium.",
      questAvailable: "I have contracts that need fulfilling. Interested in making some gold?",
      questActive: "How goes the gathering? My buyers grow impatient.",
      questComplete: "Excellent work! Payment as promised. Shall we discuss more business?",
      noQuests: "Check back later - new shipments arrive regularly.",
      tradeWelcome: "Welcome to the Trade Network. What can I help you with today?",
      rankUp: "Your reputation grows! More lucrative contracts are now available to you."
    },
    quests: [
      'ms_3_04_coin_and_trade'
    ],
    features: ['trade_network'],
    tradeDialogue: {
      viewContracts: "Let me see what orders have come in...",
      acceptContract: "A wise choice. Bring me the goods when you're ready.",
      fulfillContract: "You have everything? Let me verify... Perfect!",
      abandonContract: "Changed your mind? No penalty - but the offer may not last.",
      noContracts: "No new orders right now. Check back soon."
    }
  },

  captain_varro: {
    id: 'captain_varro',
    name: 'Captain Varro',
    icon: '🛡️',
    title: 'Captain of the Old Guard',
    role: 'City Guard',
    location: 'lurenium',
    dialogue: {
      greeting: "State your business, traveler. The gates of Lurenium don't open for everyone.",
      questAvailable: "I could use someone with your skills. Interested?",
      questActive: "Report when you've completed your task.",
      questComplete: "Well done. You've earned the respect of the Old Guard.",
      noQuests: "The city is secure for now. Be watchful."
    },
    quests: [
      'ms_3_01_the_gates_of_gold',
      'ms_3_06_the_captains_honor'
    ]
  },

  archivist_thelon: {
    id: 'archivist_thelon',
    name: 'Archivist Thelon',
    icon: '📜',
    title: 'Keeper of Records',
    role: 'Archives',
    location: 'lurenium',
    dialogue: {
      greeting: "Shh... the archives demand quiet contemplation.",
      questAvailable: "There is something you could help me with, if you have patience for old papers.",
      questActive: "Have you found what I asked for?",
      questComplete: "Fascinating... this changes everything we thought we knew.",
      noQuests: "The archives hold many secrets, but none that need your attention today."
    },
    quests: [
      'ms_3_02_the_archivists_task',
      'ms_3_07_whispers_in_stone',
      'ms_3_08_the_sealed_archives',
      'ms_3_09_cracks_in_gold'
    ]
  },

  magistrate_corinne: {
    id: 'magistrate_corinne',
    name: 'Magistrate Corinne',
    icon: '⚖️',
    title: 'Voice of the Council',
    role: 'City Government',
    location: 'lurenium',
    dialogue: {
      greeting: "Lurenium welcomes all who respect its laws and traditions.",
      questAvailable: "The council has a matter that requires... discretion.",
      questActive: "Has the matter been resolved to satisfaction?",
      questComplete: "The council is pleased. You have proven yourself a friend to Lurenium.",
      noQuests: "The city runs smoothly. Enjoy your time here."
    },
    quests: [
      'ms_3_03_law_and_order',
      'ms_3_10_the_kings_two_sons'
    ]
  },

  brother_cassius: {
    id: 'brother_cassius',
    name: 'Brother Cassius',
    icon: '🙏',
    title: 'Priest of the Golden Temple',
    role: 'Temple',
    location: 'lurenium',
    dialogue: {
      greeting: "May the light of the ancients guide your path.",
      questAvailable: "The temple could use a helping hand, if you are willing.",
      questActive: "The faithful await your return.",
      questComplete: "Blessings upon you. The temple remembers those who serve.",
      noQuests: "Find peace in contemplation. The temple is always open to you."
    },
    quests: [
      'ms_3_05_the_temples_light'
    ]
  },

  // =====================================================
  // Special NPCs - Memory Shrine
  // =====================================================

  shrine_keeper: {
    id: 'shrine_keeper',
    name: 'Shrine Keeper',
    icon: '🏛️',
    title: 'Guardian of Memory',
    role: 'Memory Shrine',
    location: 'dawnmere',
    isShrine: true, // Special flag for shrine interaction
    dialogue: {
      greeting: "Welcome, seeker of knowledge. The Memory Shrine awaits your devotion.",
      tier0: "You are new to the ways of memory. Let the shrine guide your first steps.",
      tier1: "Your dedication grows. The shrine recognizes your efforts.",
      tier2: "You have become adept in the arts of retention. New challenges await.",
      tier3: "A true scholar stands before me. The shrine's deeper secrets are yours.",
      tier4: "Master of memory, your mind is a fortress of knowledge.",
      tier5: "Sage... few have walked this path. The shrine bows to your wisdom.",
      practiceIntro: "Through focused meditation, you may strengthen what you have learned.",
      noWords: "You must first learn words through your lessons before the shrine can test you.",
      blessingGrant: "May this blessing aid your journey."
    },
    quests: []
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
