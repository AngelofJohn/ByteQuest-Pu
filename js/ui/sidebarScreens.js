// ByteQuest - Sidebar Screen Functions
// Implements missing navigation screen functions

// =====================================================
// Inventory Screen
// =====================================================

// Track current inventory tab
let currentInventoryTab = 'items';

function showInventoryScreen(tab = null) {
  const player = GameState.player;
  if (!player) {
    showNotification('Player data not available', 'error');
    return;
  }

  // Use provided tab or keep current
  if (tab) currentInventoryTab = tab;

  const inventory = player.inventory || [];

  // Get all item definitions (including resources)
  const allItemDefs = {
    ...(typeof GAME_DATA !== 'undefined' ? GAME_DATA.items : {}),
    ...(typeof RESOURCE_ITEMS !== 'undefined' ? RESOURCE_ITEMS : {})
  };

  // Separate materials from regular items
  const materials = [];
  const regularItems = [];

  inventory.forEach(invItem => {
    const itemData = allItemDefs[invItem.id] || null;
    const itemWithData = { ...invItem, data: itemData };

    // Check if it's a crafting material
    if (itemData?.category === 'crafting_material' || itemData?.type === 'material') {
      materials.push(itemWithData);
    } else {
      regularItems.push(itemWithData);
    }
  });

  // Count totals for tab badges
  const itemCount = regularItems.reduce((sum, i) => sum + (i.count || 1), 0);
  const materialCount = materials.reduce((sum, i) => sum + (i.count || 1), 0);

  // Build items content
  const itemsContent = buildInventoryItemsHtml(regularItems);

  // Build materials content
  const materialsContent = buildMaterialsHtml(materials);

  // Equipment section
  const equipSlots = ['helm', 'armor', 'accessory', 'ring'];
  const equipmentHtml = equipSlots.map(slot => {
    const itemId = player.equipment?.[slot];
    const item = itemId ? allItemDefs[itemId] : null;
    const slotNames = { helm: 'Helm', armor: 'Armor', accessory: 'Accessory', ring: 'Ring' };

    return `
      <div class="equipment-slot ${item ? 'equipped' : 'empty'}" data-slot="${slot}">
        <div class="slot-icon">${item ? item.icon : '—'}</div>
        <div class="slot-name">${item ? item.name : slotNames[slot]}</div>
      </div>
    `;
  }).join('');

  showModal('inventory-modal', `
    <div class="inventory-screen">
      <div class="inventory-header">
        <h2>🎒 Inventory</h2>
        <div class="gold-display">
          <span class="gold-icon">💰</span>
          <span class="gold-amount">${player.gold || 0}</span>
        </div>
      </div>

      <div class="inventory-layout">
        <div class="equipment-panel">
          <div class="panel-title">Equipment</div>
          <div class="equipment-slots">
            ${equipmentHtml}
          </div>
        </div>

        <div class="inventory-panel">
          <div class="inventory-tabs">
            <button class="inventory-tab ${currentInventoryTab === 'items' ? 'active' : ''}"
                    onclick="showInventoryScreen('items')">
              🎒 Items ${itemCount > 0 ? `<span class="tab-badge">${itemCount}</span>` : ''}
            </button>
            <button class="inventory-tab ${currentInventoryTab === 'materials' ? 'active' : ''}"
                    onclick="showInventoryScreen('materials')">
              ⛏️ Materials ${materialCount > 0 ? `<span class="tab-badge">${materialCount}</span>` : ''}
            </button>
          </div>
          <div class="inventory-list">
            ${currentInventoryTab === 'items' ? itemsContent : materialsContent}
          </div>
        </div>
      </div>

      <div class="inventory-footer">
        <button class="pixel-btn" onclick="hideModal('inventory-modal')">Close</button>
      </div>
    </div>
  `);
}

/**
 * Build HTML for regular inventory items (grouped by type)
 */
function buildInventoryItemsHtml(items) {
  if (items.length === 0) {
    return `
      <div class="inventory-empty">
        <div class="empty-icon">🎒</div>
        <div class="empty-text">No items</div>
        <div class="empty-hint">Complete quests to find equipment and consumables!</div>
      </div>
    `;
  }

  // Group items by type
  const itemsByType = {};
  items.forEach(item => {
    const type = item.data?.type || 'misc';
    if (!itemsByType[type]) itemsByType[type] = [];
    itemsByType[type].push(item);
  });

  const typeOrder = ['armor', 'helm', 'accessory', 'ring', 'consumable', 'misc'];
  const typeNames = {
    armor: '🛡️ Armor',
    helm: '🪖 Helms',
    accessory: '📿 Accessories',
    ring: '💍 Rings',
    consumable: '🧪 Consumables',
    misc: '📋 Misc'
  };

  let html = '';
  typeOrder.forEach(type => {
    const typeItems = itemsByType[type];
    if (!typeItems || typeItems.length === 0) return;

    const itemsHtml = typeItems.map(item => buildItemHtml(item)).join('');
    html += `
      <div class="inventory-section">
        <div class="inventory-section-title">${typeNames[type] || type}</div>
        <div class="inventory-items">${itemsHtml}</div>
      </div>
    `;
  });

  return html;
}

/**
 * Build HTML for materials (grouped by resource type)
 */
function buildMaterialsHtml(materials) {
  if (materials.length === 0) {
    return `
      <div class="inventory-empty">
        <div class="empty-icon">⛏️</div>
        <div class="empty-text">No materials</div>
        <div class="empty-hint">Gather resources from mining, herbalism, and fishing!</div>
      </div>
    `;
  }

  // Group materials by crafting tier or source
  const materialGroups = {
    ore: { name: '⛏️ Ores & Metals', items: [] },
    wood: { name: '🪵 Wood', items: [] },
    hide: { name: '🦴 Hides & Pelts', items: [] },
    herb: { name: '🌿 Herbs & Plants', items: [] },
    fish: { name: '🐟 Fish', items: [] },
    other: { name: '📦 Other', items: [] }
  };

  materials.forEach(item => {
    const id = item.id.toLowerCase();
    if (id.includes('ore') || id.includes('chunk') || id.includes('vein') || id.includes('iron') || id.includes('copper') || id.includes('silver') || id.includes('gold')) {
      materialGroups.ore.items.push(item);
    } else if (id.includes('log') || id.includes('timber') || id.includes('wood')) {
      materialGroups.wood.items.push(item);
    } else if (id.includes('hide') || id.includes('pelt') || id.includes('fur') || id.includes('leather')) {
      materialGroups.hide.items.push(item);
    } else if (id.includes('leaf') || id.includes('petal') || id.includes('herb') || id.includes('blossom') || id.includes('root') || id.includes('flower')) {
      materialGroups.herb.items.push(item);
    } else if (id.includes('fish') || id.includes('trout') || id.includes('salmon') || id.includes('bass') || id.includes('carp')) {
      materialGroups.fish.items.push(item);
    } else {
      materialGroups.other.items.push(item);
    }
  });

  let html = '';
  Object.values(materialGroups).forEach(group => {
    if (group.items.length === 0) return;

    const itemsHtml = group.items.map(item => buildMaterialItemHtml(item)).join('');
    html += `
      <div class="inventory-section">
        <div class="inventory-section-title">${group.name}</div>
        <div class="inventory-items material-grid">${itemsHtml}</div>
      </div>
    `;
  });

  return html;
}

/**
 * Build HTML for a single inventory item
 */
function buildItemHtml(item) {
  const data = item.data;
  const icon = data?.icon || '❓';
  const name = data?.name || item.id;
  const count = item.count > 1 ? ` x${item.count}` : '';
  const equipped = isItemEquipped(item.id) ? '<span class="equipped-badge">E</span>' : '';

  let statsText = '';
  if (data?.stats) {
    const statParts = Object.entries(data.stats).map(([k, v]) => `+${v} ${k}`);
    statsText = `<div class="item-stats">${statParts.join(', ')}</div>`;
  }

  return `
    <div class="inventory-item" data-item-id="${item.id}" onclick="showItemDetails('${item.id}')">
      <div class="item-icon">${icon}${equipped}</div>
      <div class="item-info">
        <div class="item-name">${name}${count}</div>
        ${statsText}
      </div>
    </div>
  `;
}

/**
 * Build HTML for a single material item (compact grid view)
 */
function buildMaterialItemHtml(item) {
  const data = item.data;
  const icon = data?.icon || '❓';
  const name = data?.name || item.id;
  const count = item.count || 1;

  return `
    <div class="material-item" data-item-id="${item.id}" onclick="showMaterialDetails('${item.id}')" title="${name}">
      <div class="material-icon">${icon}</div>
      <div class="material-count">x${count}</div>
    </div>
  `;
}

/**
 * Show material details popup
 */
function showMaterialDetails(itemId) {
  const allItemDefs = {
    ...(typeof GAME_DATA !== 'undefined' ? GAME_DATA.items : {}),
    ...(typeof RESOURCE_ITEMS !== 'undefined' ? RESOURCE_ITEMS : {})
  };

  const item = allItemDefs[itemId];
  if (!item) {
    showNotification('Unknown material', 'error');
    return;
  }

  const invItem = GameState.player.inventory?.find(i => i.id === itemId);
  const count = invItem?.count || 0;

  showModal('material-details-modal', `
    <div class="item-details-popup">
      <div class="item-details-header">
        <span class="item-icon-large">${item.icon || '❓'}</span>
        <div class="item-title">
          <h3>${item.name}</h3>
          <div class="item-count">You have: ${count}</div>
        </div>
      </div>
      <div class="item-description">${item.description || 'A crafting material.'}</div>
      <div class="item-details-info">
        <div class="detail-row">
          <span class="detail-label">Sell Price:</span>
          <span class="detail-value">💰 ${item.sellPrice || 0}</span>
        </div>
        ${item.craftingTier ? `
        <div class="detail-row">
          <span class="detail-label">Crafting Tier:</span>
          <span class="detail-value">Tier ${item.craftingTier}</span>
        </div>
        ` : ''}
      </div>
      <div class="item-details-actions">
        <button class="pixel-btn secondary" onclick="hideModal('material-details-modal')">Close</button>
      </div>
    </div>
  `);
}

/**
 * Check if an item is currently equipped
 */
function isItemEquipped(itemId) {
  const equipment = GameState.player?.equipment;
  if (!equipment) return false;
  return Object.values(equipment).includes(itemId);
}

/**
 * Show item details popup
 */
function showItemDetails(itemId) {
  const itemData = typeof GAME_DATA !== 'undefined' ? GAME_DATA.items?.[itemId] : null;
  if (!itemData) {
    showNotification('Item not found', 'error');
    return;
  }

  const invItem = GameState.player.inventory?.find(i => i.id === itemId);
  const count = invItem?.count || 1;
  const isEquipped = isItemEquipped(itemId);

  // Build stats display
  let statsHtml = '';
  if (itemData.stats) {
    const statsList = Object.entries(itemData.stats).map(([stat, value]) =>
      `<div class="detail-stat">+${value} ${stat}</div>`
    ).join('');
    statsHtml = `<div class="item-detail-stats">${statsList}</div>`;
  }

  // Action buttons based on item type
  let actionsHtml = '';
  const isEquipable = ['weapon', 'armor', 'helm', 'accessory', 'ring'].includes(itemData.type);
  const isConsumable = itemData.type === 'consumable';

  if (isEquipable) {
    if (isEquipped) {
      actionsHtml = `<button class="pixel-btn" onclick="unequipItem('${itemId}')">Unequip</button>`;
    } else {
      actionsHtml = `<button class="pixel-btn pixel-btn-gold" onclick="equipItem('${itemId}')">Equip</button>`;
    }
  } else if (isConsumable) {
    actionsHtml = `<button class="pixel-btn pixel-btn-gold" onclick="useItem('${itemId}')">Use</button>`;
  }

  showModal('item-detail-modal', `
    <div class="item-detail-screen">
      <div class="item-detail-header">
        <div class="item-detail-icon">${itemData.icon}</div>
        <div class="item-detail-name">${itemData.name}${count > 1 ? ` x${count}` : ''}</div>
        ${isEquipped ? '<div class="equipped-label">Equipped</div>' : ''}
      </div>
      <div class="item-detail-desc">${itemData.description || 'No description available.'}</div>
      ${statsHtml}
      <div class="item-detail-actions">
        ${actionsHtml}
        <button class="pixel-btn" onclick="hideModal('item-detail-modal')">Close</button>
      </div>
    </div>
  `);
}

/**
 * Equip an item
 */
function equipItem(itemId) {
  const itemData = typeof GAME_DATA !== 'undefined' ? GAME_DATA.items?.[itemId] : null;
  if (!itemData) return;

  const slot = itemData.type;
  if (!['weapon', 'armor', 'helm', 'accessory', 'ring'].includes(slot)) {
    showNotification('This item cannot be equipped', 'error');
    return;
  }

  // Unequip current item in slot if any
  const currentItem = GameState.player.equipment?.[slot];

  // Equip new item
  if (!GameState.player.equipment) {
    GameState.player.equipment = {};
  }
  GameState.player.equipment[slot] = itemId;

  showNotification(`Equipped ${itemData.name}`, 'success');

  // Recalculate stats if statsManager available
  if (typeof recalculateStats === 'function') {
    recalculateStats();
  }

  // Check equip objectives
  if (typeof checkEquipObjectives === 'function') {
    checkEquipObjectives(itemId);
  }

  hideModal('item-detail-modal');
  showInventoryScreen(); // Refresh inventory display
}

/**
 * Unequip an item
 */
function unequipItem(itemId) {
  const itemData = typeof GAME_DATA !== 'undefined' ? GAME_DATA.items?.[itemId] : null;
  if (!itemData) return;

  const slot = itemData.type;
  if (GameState.player.equipment?.[slot] === itemId) {
    GameState.player.equipment[slot] = null;
    showNotification(`Unequipped ${itemData.name}`, 'info');

    if (typeof recalculateStats === 'function') {
      recalculateStats();
    }
  }

  hideModal('item-detail-modal');
  showInventoryScreen();
}

/**
 * Use a consumable item
 */
function useItem(itemId) {
  const itemData = typeof GAME_DATA !== 'undefined' ? GAME_DATA.items?.[itemId] : null;
  if (!itemData || itemData.type !== 'consumable') {
    showNotification('Cannot use this item', 'error');
    return;
  }

  // Apply item effects
  if (itemData.effects) {
    if (itemData.effects.hp) {
      GameState.player.hp = Math.min(GameState.player.maxHp, GameState.player.hp + itemData.effects.hp);
      showNotification(`Restored ${itemData.effects.hp} HP`, 'success');
    }
    // Add more effect types as needed
  }

  // Remove item from inventory
  const invItem = GameState.player.inventory?.find(i => i.id === itemId);
  if (invItem) {
    invItem.count--;
    if (invItem.count <= 0) {
      GameState.player.inventory = GameState.player.inventory.filter(i => i.id !== itemId);
    }
  }

  // Check use item objectives
  if (typeof checkUseItemObjectives === 'function') {
    checkUseItemObjectives(itemId);
  }

  if (typeof renderHUD === 'function') {
    renderHUD();
  }

  hideModal('item-detail-modal');
  showInventoryScreen();
}

// =====================================================
// Quests Screen
// =====================================================

function showQuestsScreen() {
  const player = GameState.player;
  if (!player) {
    showNotification('Player data not available', 'error');
    return;
  }

  // Get active quests - check QuestManager first, then fallback to player state
  let activeQuests = [];
  if (typeof GameState !== 'undefined' && GameState.questManager && GameState.questManager.getActiveQuests) {
    activeQuests = GameState.questManager.getActiveQuests();
  } else {
    activeQuests = player.activeQuests || [];
  }

  // Get completed quests - check QuestManager first, then fallback to player state
  let completedQuests = [];
  if (typeof GameState !== 'undefined' && GameState.questManager && GameState.questManager.getCompletedQuests) {
    completedQuests = GameState.questManager.getCompletedQuests();
  } else {
    completedQuests = player.completedQuests || [];
  }

  // Get available quests from QuestManager or fallback
  let availableQuests = [];
  if (typeof GameState !== 'undefined' && GameState.questManager && GameState.questManager.getAvailableQuests) {
    availableQuests = GameState.questManager.getAvailableQuests();
  } else if (typeof getAvailableQuests === 'function') {
    availableQuests = getAvailableQuests();
  }

  // Build active quests HTML
  let activeHtml = '';
  if (activeQuests.length === 0) {
    activeHtml = `
      <div class="quests-empty">
        <div class="empty-icon">📜</div>
        <div class="empty-text">No active quests</div>
        <div class="empty-hint">Talk to NPCs to find quests!</div>
      </div>
    `;
  } else {
    activeHtml = activeQuests.map(questProgress => {
      // Handle multiple formats: string "questId", {id, objectives}, or {questId, state} from QuestManager
      const questId = typeof questProgress === 'string' ? questProgress : (questProgress.id || questProgress.questId);
      // QuestManager returns full quest data merged, so use questProgress directly if it has 'name'
      const questData = questProgress.name ? questProgress : (typeof getQuest === 'function' ? getQuest(questId) : null);

      // Fallback display if quest data not found
      if (!questData) {
        return `
          <div class="quest-card">
            <div class="quest-card-header">
              <span class="quest-type-icon">📜</span>
              <span class="quest-name">${questId}</span>
            </div>
            <div class="quest-card-desc">Quest data not found</div>
            <div class="quest-card-actions">
              <button class="pixel-btn pixel-btn-small" onclick="continueQuestLesson('${questId}')">Try Lesson</button>
            </div>
          </div>
        `;
      }

      // Get NPC info
      const npc = questData.giver && typeof GAME_DATA !== 'undefined' ? GAME_DATA.npcs?.[questData.giver] : null;

      // Get location info
      const questLocation = questData.location || questData.zone;
      let locationData = null;
      if (questLocation && typeof GAME_DATA !== 'undefined') {
        locationData = GAME_DATA.locations?.[questLocation];
      }
      const currentLocation = GameState.player?.currentLocation || 'dawnmere';
      const isSameLocation = currentLocation === questLocation;

      // Get chain info
      const chainInfo = typeof getQuestChainInfo === 'function' ? getQuestChainInfo(questData) : null;

      // Handle objectives - can be array [{completed}] or object {objId: {completed}} from QuestManager
      const objectivesData = typeof questProgress === 'object' ? questProgress.objectives : [];
      const isObjectivesObject = objectivesData && !Array.isArray(objectivesData);

      // Calculate completion counts
      let completedObjCount = 0;
      let totalCount = questData.objectives?.length || 0;
      if (isObjectivesObject) {
        completedObjCount = Object.values(objectivesData).filter(o => o.completed).length;
      } else if (Array.isArray(objectivesData)) {
        completedObjCount = objectivesData.filter(o => o.completed).length;
        totalCount = objectivesData.length || totalCount;
      }
      const progress = totalCount > 0 ? Math.floor((completedObjCount / totalCount) * 100) : 0;

      const typeIcons = {
        main: '⚔️',
        side: '📋',
        lesson: '📚',
        daily: '🔄',
        weekly: '📅'
      };
      const typeIcon = typeIcons[questData.type] || '📜';

      // Objective type icons
      const objectiveIcons = {
        interact: '💬', vocabulary_lesson: '📚', lesson: '📚', exploration: '🗺️',
        combat: '⚔️', collect: '📦', gather: '📦', meet: '🤝', task: '✨',
        travel: '🚶', equip: '🛡️', craft: '🔨', encounter: '⚔️'
      };

      // Build objectives list - ensure objectives is an array
      const objectivesArray = Array.isArray(questData.objectives)
        ? questData.objectives
        : (questData.objectives ? Object.values(questData.objectives) : []);

      const objectivesHtml = objectivesArray.map((obj, i) => {
        // Support both array and object formats for objectives progress
        const objProgress = isObjectivesObject ? objectivesData[obj.id] : objectivesData?.[i];
        const isComplete = objProgress?.completed || false;
        const countText = obj.target && typeof obj.target === 'number' ? ` (${objProgress?.count || 0}/${obj.target})` : '';
        const objIcon = objectiveIcons[obj.type] || '○';

        return `
          <div class="quest-objective ${isComplete ? 'complete' : ''}">
            <span class="quest-objective-icon">${isComplete ? '✓' : objIcon}</span>
            <span class="objective-text">${obj.text || obj.description}${countText}</span>
          </div>
        `;
      }).join('');

      // Check if quest has lesson content (lesson type or has vocab)
      const hasLesson = questData.type === 'lesson' || questData.vocab || questData.lessonContent ||
        objectivesArray.some(obj => obj.type === 'vocabulary_lesson');

      // Build chain indicator HTML
      const chainHtml = chainInfo ? `
        <div class="quest-chain-indicator">
          <span class="quest-chain-icon">🔗</span>
          <span class="quest-chain-text">${chainInfo.chainName}</span>
          <span class="quest-chain-progress">Part ${chainInfo.order} of ${chainInfo.total}</span>
        </div>
      ` : '';

      // Build NPC info HTML
      const npcHtml = npc ? `
        <div class="quest-npc-info">
          <div class="quest-npc-icon">${npc.icon || '👤'}</div>
          <div class="quest-npc-details">
            <div class="quest-npc-name">${npc.name}</div>
            ${npc.title ? `<div class="quest-npc-title">${npc.title}</div>` : ''}
          </div>
        </div>
      ` : '';

      // Build location indicator HTML
      const locationHtml = questLocation ? `
        <div class="quest-location-indicator ${isSameLocation ? 'same-location' : 'different-location'}">
          <span class="quest-location-icon">${locationData?.icon || '📍'}</span>
          <span class="quest-location-name">${isSameLocation ? 'You are here' : (locationData?.name || questLocation)}</span>
          ${!isSameLocation ? `
            <button class="quest-location-btn" onclick="travelToQuestLocation('${questLocation}')">
              Travel
            </button>
          ` : ''}
        </div>
      ` : '';

      // Time estimate for lessons
      const timeEstimate = questData.type === 'lesson' ?
        `<span class="quest-time-estimate">⏱️ ~5 min</span>` : '';

      return `
        <div class="quest-card" data-quest-id="${questId}">
          ${chainHtml}
          <div class="quest-card-header">
            <span class="quest-type-icon">${typeIcon}</span>
            <span class="quest-name">${questData.name}</span>
            ${timeEstimate}
          </div>
          ${npcHtml}
          ${locationHtml}
          <div class="quest-card-desc">${questData.description || ''}</div>
          <div class="quest-objectives">
            ${objectivesHtml}
          </div>
          <div class="quest-progress-bar">
            <div class="quest-progress-fill" style="width: ${progress}%"></div>
          </div>
          <div class="quest-rewards-preview">
            ${questData.rewards?.xp ? `<span class="reward-preview">⭐ ${questData.rewards.xp} XP</span>` : ''}
            ${questData.rewards?.gold ? `<span class="reward-preview">💰 ${questData.rewards.gold}</span>` : ''}
          </div>
          <div class="quest-card-actions">
            ${hasLesson ? `<button class="pixel-btn pixel-btn-small" onclick="continueQuestLesson('${questId}')">Start Lesson</button>` : ''}
            ${npc ? `<button class="pixel-btn pixel-btn-small pixel-btn-secondary" onclick="showQuestGiver('${questId}')">Go to NPC</button>` : ''}
            <button class="pixel-btn pixel-btn-small pixel-btn-secondary" onclick="showQuestDetailModal('${questId}')">Details</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Completed quests count and list
  const completedCount = completedQuests.length;

  // Build completed quests HTML
  let completedHtml = '';
  if (completedCount === 0) {
    completedHtml = `
      <div class="quests-empty">
        <div class="empty-icon">📜</div>
        <div class="empty-text">No completed quests yet</div>
        <div class="empty-hint">Complete quests to see them here!</div>
      </div>
    `;
  } else {
    // completedQuests can be array of IDs, objects {id}, or objects {questId, name, ...} from QuestManager
    completedHtml = completedQuests.map(questEntry => {
      const questId = typeof questEntry === 'string' ? questEntry : (questEntry.id || questEntry.questId);
      // QuestManager returns full quest data merged, so use questEntry directly if it has 'name'
      const questData = questEntry.name ? questEntry : (typeof getQuest === 'function' ? getQuest(questId) : null);

      if (!questData) {
        return `
          <div class="quest-card completed">
            <div class="quest-card-header">
              <span class="quest-type-icon">✓</span>
              <span class="quest-name">${questId}</span>
            </div>
          </div>
        `;
      }

      const typeIcons = {
        main: '⚔️',
        side: '📋',
        lesson: '📚',
        daily: '🔄',
        weekly: '📅'
      };
      const typeIcon = typeIcons[questData.type] || '📜';

      return `
        <div class="quest-card completed" data-quest-id="${questId}">
          <div class="quest-card-header">
            <span class="quest-complete-check">✓</span>
            <span class="quest-type-icon">${typeIcon}</span>
            <span class="quest-name">${questData.name}</span>
          </div>
          <div class="quest-card-desc">${questData.description || ''}</div>
          <div class="quest-rewards-earned">
            ${questData.rewards?.xp ? `<span class="reward-earned">⭐ ${questData.rewards.xp} XP</span>` : ''}
            ${questData.rewards?.gold ? `<span class="reward-earned">💰 ${questData.rewards.gold}</span>` : ''}
          </div>
          <div class="quest-card-actions">
            <button class="pixel-btn pixel-btn-small pixel-btn-secondary" onclick="showQuestDetailModal('${questId}')">Details</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Build available quests HTML
  let availableHtml = '';
  if (availableQuests.length === 0) {
    availableHtml = `
      <div class="quests-empty">
        <div class="empty-icon">⭐</div>
        <div class="empty-text">No available quests</div>
        <div class="empty-hint">Check back after completing more quests or leveling up!</div>
      </div>
    `;
  } else {
    // Filter out invalid quests (missing name means quest data wasn't found)
    const validQuests = availableQuests.filter(q => q && q.name);

    availableHtml = validQuests.map(quest => {
      const typeIcons = {
        main: '⚔️',
        side: '📋',
        lesson: '📚',
        daily: '🔄',
        weekly: '📅'
      };
      const typeIcon = typeIcons[quest.type] || '📜';

      // Get NPC info
      const npc = quest.giver && typeof GAME_DATA !== 'undefined' ? GAME_DATA.npcs?.[quest.giver] : null;
      const giverName = npc?.name || quest.giver || '';

      // Get location info
      const questLocation = quest.location || quest.zone;
      let locationData = null;
      if (questLocation && typeof GAME_DATA !== 'undefined') {
        locationData = GAME_DATA.locations?.[questLocation];
      }
      const currentLocation = GameState.player?.currentLocation || 'dawnmere';
      const isSameLocation = currentLocation === questLocation;

      // Get chain info
      const chainInfo = typeof getQuestChainInfo === 'function' ? getQuestChainInfo(quest) : null;

      // Build chain indicator HTML
      const chainHtml = chainInfo ? `
        <div class="quest-chain-indicator">
          <span class="quest-chain-icon">🔗</span>
          <span class="quest-chain-text">${chainInfo.chainName}</span>
          <span class="quest-chain-progress">Part ${chainInfo.order} of ${chainInfo.total}</span>
        </div>
      ` : '';

      // Build NPC info HTML
      const npcHtml = npc ? `
        <div class="quest-npc-info">
          <div class="quest-npc-icon">${npc.icon || '👤'}</div>
          <div class="quest-npc-details">
            <div class="quest-npc-name">${npc.name}</div>
            ${npc.title ? `<div class="quest-npc-title">${npc.title}</div>` : ''}
          </div>
        </div>
      ` : '';

      // Build location indicator HTML
      const locationHtml = questLocation ? `
        <div class="quest-location-indicator ${isSameLocation ? 'same-location' : 'different-location'}">
          <span class="quest-location-icon">${locationData?.icon || '📍'}</span>
          <span class="quest-location-name">${isSameLocation ? 'You are here' : (locationData?.name || questLocation)}</span>
          ${!isSameLocation ? `
            <button class="quest-location-btn" onclick="travelToQuestLocation('${questLocation}')">
              Travel
            </button>
          ` : ''}
        </div>
      ` : '';

      return `
        <div class="quest-card available" data-quest-id="${quest.id}">
          ${chainHtml}
          <div class="quest-card-header">
            <span class="quest-type-icon">${typeIcon}</span>
            <span class="quest-name">${quest.name}</span>
          </div>
          ${npcHtml}
          ${locationHtml}
          <div class="quest-card-desc">${quest.description || ''}</div>
          <div class="quest-rewards-preview">
            ${quest.rewards?.xp ? `<span class="reward-preview">⭐ ${quest.rewards.xp} XP</span>` : ''}
            ${quest.rewards?.gold ? `<span class="reward-preview">💰 ${quest.rewards.gold}</span>` : ''}
          </div>
          <div class="quest-card-actions">
            ${npc ? `<button class="pixel-btn pixel-btn-small" onclick="hideModal('quests-modal'); NPCSystem.talkTo('${quest.giver}')">Talk to ${giverName}</button>` : ''}
            <button class="pixel-btn pixel-btn-small pixel-btn-secondary" onclick="showQuestDetailModal('${quest.id}')">Details</button>
          </div>
        </div>
      `;
    }).join('');
  }

  showModal('quests-modal', `
    <div class="quests-screen">
      <div class="quests-header">
        <h2>📜 Quest Log</h2>
        <div class="quests-tabs">
          <button class="quest-tab active" data-tab="active">Active (${activeQuests.length})</button>
          <button class="quest-tab" data-tab="available">Available (${availableQuests.filter(q => q && q.name).length})</button>
          <button class="quest-tab" data-tab="completed">Completed (${completedCount})</button>
        </div>
      </div>

      <div class="quests-content" id="quests-content">
        <div class="quest-tab-content active" data-tab="active">
          ${activeHtml}
        </div>
        <div class="quest-tab-content" data-tab="available">
          ${availableHtml}
        </div>
        <div class="quest-tab-content" data-tab="completed">
          <div class="completed-quests-list">
            ${completedHtml}
          </div>
        </div>
      </div>

      <div class="quests-footer">
        <button class="pixel-btn" onclick="hideModal('quests-modal')">Close</button>
      </div>
    </div>
  `);

  // Setup tab switching
  setTimeout(() => {
    document.querySelectorAll('.quest-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        document.querySelectorAll('.quest-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.quest-tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.querySelector(`.quest-tab-content[data-tab="${tabName}"]`)?.classList.add('active');
      });
    });
  }, 0);
}

/**
 * Continue a quest lesson from the quest log
 */
function continueQuestLesson(questId) {
  hideModal('quests-modal');

  const questData = typeof getQuest === 'function' ? getQuest(questId) : null;
  if (!questData) {
    showNotification('Quest not found', 'error');
    return;
  }

  // Start the lesson directly
  if (typeof LessonSystem !== 'undefined' && LessonSystem.startLesson) {
    LessonSystem.startLesson(questId, questData.name);
  } else {
    showNotification('Lesson system not available', 'error');
  }
}

/**
 * Navigate to the quest giver NPC
 */
function showQuestGiver(questId) {
  hideModal('quests-modal');

  const questData = typeof getQuest === 'function' ? getQuest(questId) : null;
  if (!questData || !questData.giver) {
    showNotification('Quest giver not found', 'error');
    return;
  }

  // Find the NPC's location
  const npcId = questData.giver;
  const npcs = typeof GAME_DATA !== 'undefined' ? GAME_DATA.npcs : {};
  const npc = npcs[npcId];

  if (npc && npc.location) {
    // Travel to the location if different
    if (GameState.player.currentLocation !== npc.location) {
      if (typeof travelToLocation === 'function') {
        travelToLocation(npc.location);
        showNotification(`Traveling to find ${npc.name}...`, 'info');
      }
    }
    // Interact with the NPC
    setTimeout(() => {
      if (typeof interactWithNPC === 'function') {
        interactWithNPC(npcId);
      }
    }, 300);
  } else {
    showNotification('NPC location unknown', 'error');
  }
}

// =====================================================
// Map Screen
// =====================================================

function showMapScreen() {
  const player = GameState.player;
  if (!player) {
    showNotification('Player data not available', 'error');
    return;
  }

  // Use LocationManager if available, with fallbacks for compatibility
  let currentLocation = 'dawnmere';
  let locations = {};

  if (typeof locationManager !== 'undefined' && locationManager) {
    currentLocation = locationManager.getCurrentLocationId();
    console.log('[showMapScreen] Using LocationManager, current:', currentLocation);

    // Auto-discover connected locations from current location
    locationManager.checkQuestBasedDiscovery();
    locationManager.checkLevelUnlocks();

    // Get all locations from LocationManager
    const allLocations = locationManager.getAllLocations();
    console.log('[showMapScreen] All locations:', allLocations.map(l => l.id));
    console.log('[showMapScreen] Discovered:', GameState.player.locations?.discovered);
    console.log('[showMapScreen] Unlocked:', GameState.player.locations?.unlocked);
    allLocations.forEach(loc => {
      locations[loc.id] = loc;
    });
  } else {
    console.warn('[showMapScreen] LocationManager NOT available! Falling back...');
    // Fallback to old data sources
    currentLocation = player.currentLocation || player.locations?.current || 'dawnmere';
    locations = typeof GAME_DATA !== 'undefined' && GAME_DATA.locations ? GAME_DATA.locations : {};
    if (typeof LOCATION_DEFINITIONS !== 'undefined') {
      locations = { ...locations, ...LOCATION_DEFINITIONS };
    }
  }

  // Build locations list
  let locationsHtml = '';
  Object.entries(locations).forEach(([locId, locData]) => {
    // Skip meta entries
    if (locId.startsWith('_')) return;

    const isCurrent = currentLocation === locId;

    // Check discovery and unlock status via LocationManager
    let isDiscovered = false;
    let isUnlocked = false;
    let lockedReason = null;

    if (typeof locationManager !== 'undefined' && locationManager) {
      isDiscovered = locationManager.isDiscovered(locId);
      isUnlocked = locationManager.isUnlocked(locId);
      lockedReason = locationManager.getLockedReason(locId);
    } else {
      // Fallback
      const discoveredLocations = player.discoveredLocations || player.locations?.discovered || ['dawnmere'];
      isDiscovered = discoveredLocations.includes(locId);
      isUnlocked = isDiscovered;
    }

    const canTravel = isUnlocked && !isCurrent;

    if (!isDiscovered) {
      locationsHtml += `
        <div class="map-location locked">
          <div class="location-icon">❓</div>
          <div class="location-info">
            <div class="location-name">???</div>
            <div class="location-status">Undiscovered</div>
          </div>
        </div>
      `;
    } else {
      const levelReq = locData.levelRequired || 1;
      const meetsLevel = player.level >= levelReq;

      locationsHtml += `
        <div class="map-location ${isCurrent ? 'current' : ''} ${canTravel ? 'available' : ''} ${!isUnlocked ? 'locked-level' : ''}">
          <div class="location-icon">${locData.icon || '🏠'}</div>
          <div class="location-info">
            <div class="location-name">${locData.name}</div>
            <div class="location-desc">${locData.description || ''}</div>
            ${isCurrent ? '<div class="location-status current-status">You are here</div>' : ''}
            ${!isUnlocked && lockedReason ? `<div class="location-status locked-status">🔒 ${lockedReason}</div>` : ''}
          </div>
          ${canTravel ? `
            <button class="travel-btn pixel-btn" onclick="travelToLocation('${locId}')">
              Travel
            </button>
          ` : ''}
        </div>
      `;
    }
  });

  showModal('map-modal', `
    <div class="map-screen">
      <div class="map-header">
        <h2>🗺️ World Map</h2>
      </div>

      <div class="map-content">
        <div class="current-location-banner">
          <span class="current-label">Current Location:</span>
          <span class="current-name">${locations[currentLocation]?.name || currentLocation}</span>
        </div>

        <div class="locations-list">
          ${locationsHtml}
        </div>
      </div>

      <div class="map-footer">
        <button class="pixel-btn" onclick="hideModal('map-modal')">Close</button>
      </div>
    </div>
  `);
}

/**
 * Travel to a location
 */
function travelToLocation(locationId) {
  // Use locationManager if available
  if (typeof locationManager !== 'undefined' && locationManager) {
    const result = locationManager.travelTo(locationId);
    if (!result.success) {
      showNotification(result.message || 'Cannot travel there', 'error');
      return;
    }
  } else {
    // Fallback direct travel
    GameState.player.currentLocation = locationId;
    GameState.currentLocation = locationId;
  }

  hideModal('map-modal');

  // Render the new location
  if (typeof renderLocation === 'function') {
    renderLocation();
  }

  showNotification(`Traveled to ${typeof GAME_DATA !== 'undefined' ? GAME_DATA.locations?.[locationId]?.name : locationId}`, 'success');
}

// =====================================================
// Settings Screen
// =====================================================

function showSettingsScreen() {
  const settings = GameState.settings || {};

  showModal('settings-modal', `
    <div class="settings-screen">
      <div class="settings-header">
        <h2>⚙️ Settings</h2>
      </div>

      <div class="settings-content">
        <div class="settings-section">
          <div class="settings-section-title">Audio</div>

          <div class="setting-row">
            <label class="setting-label">
              <span class="setting-name">🔊 Sound Effects</span>
              <input type="checkbox" id="setting-sound" ${settings.soundEnabled !== false ? 'checked' : ''}>
              <span class="setting-toggle"></span>
            </label>
          </div>

          <div class="setting-row">
            <label class="setting-label">
              <span class="setting-name">🎵 Music</span>
              <input type="checkbox" id="setting-music" ${settings.musicEnabled !== false ? 'checked' : ''}>
              <span class="setting-toggle"></span>
            </label>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-section-title">Gameplay</div>

          <div class="setting-row">
            <label class="setting-label">
              <span class="setting-name">⌨️ Keyboard Shortcuts</span>
              <input type="checkbox" id="setting-keyboard" ${settings.keyboardShortcuts !== false ? 'checked' : ''}>
              <span class="setting-toggle"></span>
            </label>
          </div>

          <div class="setting-row">
            <div class="setting-name">Difficulty</div>
            <select id="setting-difficulty" class="setting-select">
              <option value="easy" ${settings.difficulty === 'easy' ? 'selected' : ''}>Easy</option>
              <option value="normal" ${settings.difficulty === 'normal' || !settings.difficulty ? 'selected' : ''}>Normal</option>
              <option value="hard" ${settings.difficulty === 'hard' ? 'selected' : ''}>Hard</option>
            </select>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-section-title">Data</div>

          <div class="setting-row">
            <button class="pixel-btn" onclick="exportSaveData()">📤 Export Save</button>
            <button class="pixel-btn" onclick="importSaveData()">📥 Import Save</button>
          </div>

          <div class="setting-row danger-zone">
            <button class="pixel-btn pixel-btn-danger" onclick="confirmResetProgress()">🗑️ Reset Progress</button>
          </div>
        </div>
      </div>

      <div class="settings-footer">
        <button class="pixel-btn" onclick="saveSettingsAndClose()">Save & Close</button>
      </div>
    </div>
  `);

  // Bind change handlers
  setTimeout(() => {
    document.getElementById('setting-sound')?.addEventListener('change', (e) => {
      GameState.settings.soundEnabled = e.target.checked;
    });
    document.getElementById('setting-music')?.addEventListener('change', (e) => {
      GameState.settings.musicEnabled = e.target.checked;
    });
    document.getElementById('setting-keyboard')?.addEventListener('change', (e) => {
      GameState.settings.keyboardShortcuts = e.target.checked;
    });
    document.getElementById('setting-difficulty')?.addEventListener('change', (e) => {
      GameState.settings.difficulty = e.target.value;
    });
  }, 0);
}

function saveSettingsAndClose() {
  if (typeof saveSettings === 'function') {
    saveSettings();
  }
  hideModal('settings-modal');
  showNotification('Settings saved', 'success');
}

function exportSaveData() {
  const saveData = JSON.stringify(GameState, null, 2);
  const blob = new Blob([saveData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bytequest_save_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showNotification('Save exported!', 'success');
}

function importSaveData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        Object.assign(GameState, data);
        if (typeof renderHUD === 'function') renderHUD();
        if (typeof renderLocation === 'function') renderLocation();
        hideModal('settings-modal');
        showNotification('Save imported successfully!', 'success');
      } catch (err) {
        showNotification('Failed to import save file', 'error');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function confirmResetProgress() {
  if (confirm('Are you sure you want to reset ALL progress? This cannot be undone!')) {
    if (confirm('This will delete all your saves and progress. Are you REALLY sure?')) {
      // Clear all localStorage
      const keys = Object.keys(localStorage).filter(k => k.startsWith('bytequest'));
      keys.forEach(k => localStorage.removeItem(k));

      // Reload page
      location.reload();
    }
  }
}

// =====================================================
// Progress Overview Screen (Simple version - use profileScreens.js for tabbed version)
// =====================================================

function showProgressOverview() {
  const player = GameState.player;
  if (!player) {
    showNotification('Player data not available', 'error');
    return;
  }

  // Calculate various progress stats
  const completedQuests = (player.completedQuests || []).length;
  const totalXPEarned = player.xp + ((player.level - 1) * 100); // Rough estimate
  const wordsLearned = player.wordsLearned || 0;
  const lessonsCompleted = player.lessonsCompleted || 0;
  const perfectScores = player.perfectScores || 0;
  const currentStreak = player.streak?.current || 0;
  const longestStreak = player.streak?.longest || 0;

  // Get language info
  let languageInfo = '';
  if (typeof CourseDataManager !== 'undefined' && CourseDataManager.currentCourse) {
    const langName = CourseDataManager.getCourseName();
    languageInfo = `<div class="progress-language">Learning: ${langName}</div>`;
  }

  showModal('progress-modal', `
    <div class="progress-screen">
      <div class="progress-header">
        <h2>📊 Progress</h2>
        ${languageInfo}
      </div>

      <div class="progress-content">
        <div class="progress-overview">
          <div class="progress-stat-card main">
            <div class="stat-value">${player.level}</div>
            <div class="stat-label">Level</div>
          </div>
          <div class="progress-stat-card">
            <div class="stat-value">${player.xp}/${player.xpToNext}</div>
            <div class="stat-label">XP to Next Level</div>
          </div>
        </div>

        <div class="progress-section">
          <div class="progress-section-title">Learning Stats</div>
          <div class="progress-stats-grid">
            <div class="progress-stat">
              <span class="stat-icon">📚</span>
              <span class="stat-value">${lessonsCompleted}</span>
              <span class="stat-label">Lessons Completed</span>
            </div>
            <div class="progress-stat">
              <span class="stat-icon">💯</span>
              <span class="stat-value">${perfectScores}</span>
              <span class="stat-label">Perfect Scores</span>
            </div>
            <div class="progress-stat">
              <span class="stat-icon">📜</span>
              <span class="stat-value">${completedQuests}</span>
              <span class="stat-label">Quests Completed</span>
            </div>
            <div class="progress-stat">
              <span class="stat-icon">💰</span>
              <span class="stat-value">${player.gold || 0}</span>
              <span class="stat-label">Gold Earned</span>
            </div>
          </div>
        </div>

        <div class="progress-section">
          <div class="progress-section-title">Streaks</div>
          <div class="progress-streaks">
            <div class="streak-card current">
              <div class="streak-icon">🔥</div>
              <div class="streak-value">${currentStreak}</div>
              <div class="streak-label">Current Streak</div>
            </div>
            <div class="streak-card best">
              <div class="streak-icon">🏆</div>
              <div class="streak-value">${longestStreak}</div>
              <div class="streak-label">Longest Streak</div>
            </div>
          </div>
        </div>
      </div>

      <div class="progress-footer">
        <button class="pixel-btn" onclick="hideModal('progress-modal')">Close</button>
      </div>
    </div>
  `);
}

// =====================================================
// Gather Screen
// =====================================================

const GATHERING_SKILL_DATA = {
  mining: {
    icon: '⛏️',
    name: 'Mining',
    description: 'Extract ores and minerals from rock deposits.',
    color: '#c0c0c0',
    tiers: [
      { name: 'Copper Deposits', level: 1, resources: 'Copper Chunks' },
      { name: 'Iron Veins', level: 5, resources: 'Iron Ore' },
      { name: 'Silver Lodes', level: 10, resources: 'Silver Ore' }
    ]
  },
  herbalism: {
    icon: '🌿',
    name: 'Herbalism',
    description: 'Gather herbs and plants for alchemy.',
    color: '#228b22',
    tiers: [
      { name: 'Meadow Fields', level: 1, resources: 'Meadow Leaves' },
      { name: 'Sunlit Glade', level: 5, resources: 'Sunpetals' },
      { name: 'Moonlit Garden', level: 10, resources: 'Moonblossoms' }
    ]
  },
  fishing: {
    icon: '🎣',
    name: 'Fishing',
    description: 'Catch fish from rivers, lakes, and seas.',
    color: '#4169e1',
    tiers: [
      { name: 'River Fishing', level: 1, resources: 'River Perch' },
      { name: 'Lake Fishing', level: 5, resources: 'Lake Trout' },
      { name: 'Deep Sea', level: 10, resources: 'Sea Bass' }
    ]
  }
};

function showGatherScreen() {
  const unlockedSkills = GameState.player?.gatheringSkills || [];

  // If no skills unlocked, show unlock message
  if (unlockedSkills.length === 0) {
    showModal('gather-modal', `
      <div class="gather-screen">
        <div class="gather-header">
          <h2>⛏️ Gathering</h2>
        </div>
        <div class="gather-empty">
          <div class="empty-icon">🔒</div>
          <div class="empty-text">No gathering skills unlocked</div>
          <div class="empty-hint">Complete quests to learn gathering skills!</div>
          <button class="pixel-btn pixel-btn-small" onclick="unlockAllGatheringSkills()" style="margin-top: 15px;">
            [DEV] Unlock All Skills
          </button>
        </div>
        <div class="gather-footer">
          <button class="pixel-btn" onclick="hideModal('gather-modal')">Close</button>
        </div>
      </div>
    `);
    return;
  }

  // Get skill levels
  const skillLevels = GameState.player?.skillLevels || {};

  // Build skills HTML
  const skillsHtml = unlockedSkills.map(skillId => {
    const skill = GATHERING_SKILL_DATA[skillId];
    if (!skill) return '';

    const level = skillLevels[skillId] || 1;
    const xp = GameState.player?.skillXP?.[skillId] || 0;
    const xpToNext = level * 100;
    const xpPercent = Math.min(100, Math.floor((xp / xpToNext) * 100));

    return `
      <div class="gather-skill-card" style="border-color: ${skill.color}">
        <div class="skill-card-header">
          <span class="skill-card-icon" style="color: ${skill.color}">${skill.icon}</span>
          <div class="skill-card-info">
            <div class="skill-card-name">${skill.name}</div>
            <div class="skill-card-level">Level ${level}</div>
          </div>
        </div>
        <div class="skill-card-xp">
          <div class="skill-xp-bar">
            <div class="skill-xp-fill" style="width: ${xpPercent}%; background: ${skill.color}"></div>
          </div>
          <div class="skill-xp-text">${xp}/${xpToNext} XP</div>
        </div>
        <div class="skill-card-desc">${skill.description}</div>
        <div class="skill-tier-buttons">
          ${skill.tiers.map((tier, i) => {
            const tierNum = i + 1;
            const isLocked = level < tier.level;
            return `
              <button class="tier-btn ${isLocked ? 'locked' : ''}"
                      onclick="${isLocked ? '' : `startGathering('${skillId}', ${tierNum})`}"
                      ${isLocked ? 'disabled' : ''}>
                <span class="tier-name">${tier.name}</span>
                ${isLocked ? `<span class="tier-lock">🔒 Lvl ${tier.level}</span>` : `<span class="tier-reward">${tier.resources}</span>`}
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');

  showModal('gather-modal', `
    <div class="gather-screen">
      <div class="gather-header">
        <h2>⛏️ Gathering</h2>
        <div class="gather-subtitle">Complete minigames to gather resources!</div>
      </div>
      <div class="gather-skills-grid">
        ${skillsHtml}
      </div>
      <div class="gather-footer">
        <button class="pixel-btn" onclick="hideModal('gather-modal')">Close</button>
      </div>
    </div>
  `);
}

/**
 * Start a gathering minigame
 * @param {string} skillType - mining, woodcutting, herbalism, fishing, hunting
 * @param {number} tier - 1, 2, or 3
 */
function startGathering(skillType, tier = 1) {
  // Check if minigame manager exists
  if (typeof resourceMinigameManager === 'undefined' || !resourceMinigameManager) {
    showNotification('Minigame system not available', 'error');
    return;
  }

  // Validate skill is unlocked
  const unlockedSkills = GameState.player?.gatheringSkills || [];
  if (!unlockedSkills.includes(skillType)) {
    showNotification(`${skillType} skill not unlocked!`, 'error');
    return;
  }

  // Check tier level requirements
  const skillLevel = GameState.player?.skillLevels?.[skillType] || 1;
  const tierLevelReq = [1, 5, 10];
  if (skillLevel < tierLevelReq[tier - 1]) {
    showNotification(`Requires ${skillType} level ${tierLevelReq[tier - 1]}`, 'error');
    return;
  }

  // Close the gather modal
  hideModal('gather-modal');

  // Start the minigame - pass skillType directly as the minigame type
  // resourceMinigameManager.startMinigame() uses the skill type (mining, woodcutting, etc.)
  // to determine which minigame variant to launch
  console.log(`[Gathering] Starting ${skillType} minigame, tier ${tier}`);
  resourceMinigameManager.startMinigame(skillType, skillType, tier);
}

/**
 * Dev function to unlock all gathering skills
 */
function unlockAllGatheringSkills() {
  if (!GameState.player.gatheringSkills) {
    GameState.player.gatheringSkills = [];
  }

  const allSkills = ['mining', 'herbalism', 'fishing'];
  allSkills.forEach(skill => {
    if (!GameState.player.gatheringSkills.includes(skill)) {
      GameState.player.gatheringSkills.push(skill);
    }
  });

  // Initialize skill levels
  if (!GameState.player.skillLevels) {
    GameState.player.skillLevels = {};
  }
  if (!GameState.player.skillXP) {
    GameState.player.skillXP = {};
  }

  allSkills.forEach(skill => {
    if (!GameState.player.skillLevels[skill]) {
      GameState.player.skillLevels[skill] = 1;
    }
    if (!GameState.player.skillXP[skill]) {
      GameState.player.skillXP[skill] = 0;
    }
  });

  showNotification('All gathering skills unlocked!', 'success');
  hideModal('gather-modal');
  showGatherScreen();
}

/**
 * Unlock a specific gathering skill
 */
function unlockGatheringSkill(skillType) {
  if (!GameState.player.gatheringSkills) {
    GameState.player.gatheringSkills = [];
  }

  if (GameState.player.gatheringSkills.includes(skillType)) {
    return false; // Already unlocked
  }

  GameState.player.gatheringSkills.push(skillType);

  // Initialize skill level and XP
  if (!GameState.player.skillLevels) {
    GameState.player.skillLevels = {};
  }
  if (!GameState.player.skillXP) {
    GameState.player.skillXP = {};
  }

  GameState.player.skillLevels[skillType] = 1;
  GameState.player.skillXP[skillType] = 0;

  console.log(`[Gathering] Unlocked skill: ${skillType}`);
  return true;
}

// =====================================================
// Village Projects Screen
// =====================================================

function showVillageProjectsScreen() {
  // Check if VillageProjectsManager is available
  if (typeof villageProjectsManager === 'undefined' || !villageProjectsManager) {
    showModal('projects-modal', `
      <div class="projects-screen">
        <div class="projects-header">
          <h2>🏘️ Village Projects</h2>
        </div>
        <div class="projects-empty">
          <div class="empty-icon">🏗️</div>
          <div class="empty-text">Projects system not available</div>
          <div class="empty-hint">Start a new game to access village projects!</div>
        </div>
        <div class="projects-footer">
          <button class="pixel-btn" onclick="hideModal('projects-modal')">Close</button>
        </div>
      </div>
    `);
    return;
  }

  const currentLocation = GameState.player.currentLocation || 'dawnmere';
  const projects = villageProjectsManager.getProjectsForLocation(currentLocation);
  const turnins = villageProjectsManager.getTurninsForLocation(currentLocation);

  // Build projects HTML
  let projectsHtml = '';
  if (projects.length === 0) {
    projectsHtml = `
      <div class="projects-empty-section">
        <div class="empty-text">No projects in this area</div>
      </div>
    `;
  } else {
    projectsHtml = projects.map(project => {
      const status = villageProjectsManager.getProjectStatus(project.id);
      const progress = villageProjectsManager.getProjectProgress(project.id);

      // Status styling
      let statusBadge = '';
      let statusClass = '';
      if (status === 'completed') {
        statusBadge = '<span class="project-status completed">✓ Complete</span>';
        statusClass = 'completed';
      } else if (status === 'locked') {
        statusBadge = '<span class="project-status locked">🔒 Locked</span>';
        statusClass = 'locked';
      } else {
        statusBadge = `<span class="project-status available">${progress.percentage}%</span>`;
        statusClass = 'available';
      }

      // Requirements display
      const reqHtml = progress.requirements.map(req => {
        const playerHas = villageProjectsManager.getPlayerItemCount(req.item);
        const canContribute = status === 'available' && !req.complete && playerHas > 0;
        return `
          <div class="project-requirement ${req.complete ? 'complete' : ''}">
            <span class="req-label">${req.label}</span>
            <span class="req-progress">${req.contributed}/${req.required}</span>
            ${canContribute ? `<button class="pixel-btn pixel-btn-tiny" onclick="contributeToProject('${project.id}', '${req.item}')">+</button>` : ''}
          </div>
        `;
      }).join('');

      // Rewards preview
      const rewardsHtml = [];
      if (project.rewards.reputation) {
        for (const [factionId, amount] of Object.entries(project.rewards.reputation)) {
          rewardsHtml.push(`<span class="reward-preview">⭐ +${amount} rep</span>`);
        }
      }
      if (project.rewards.gold) {
        rewardsHtml.push(`<span class="reward-preview">💰 ${project.rewards.gold}</span>`);
      }
      if (project.rewards.unlocks?.length) {
        rewardsHtml.push(`<span class="reward-preview">🔓 Unlock</span>`);
      }

      return `
        <div class="project-card ${statusClass}">
          <div class="project-header">
            <span class="project-icon">${project.icon}</span>
            <div class="project-title">
              <span class="project-name">${project.name}</span>
              ${statusBadge}
            </div>
          </div>
          <div class="project-desc">${project.description}</div>
          ${status !== 'completed' ? `
            <div class="project-requirements">
              ${reqHtml}
            </div>
            <div class="project-progress-bar">
              <div class="project-progress-fill" style="width: ${progress.percentage}%"></div>
            </div>
          ` : ''}
          <div class="project-rewards">${rewardsHtml.join('')}</div>
        </div>
      `;
    }).join('');
  }

  // Build turn-ins HTML
  let turninsHtml = '';
  if (turnins && turnins.turnins.length > 0) {
    turninsHtml = `
      <div class="turnins-section">
        <div class="section-title">Resource Donations</div>
        ${turnins.turnins.map(turnin => {
          const statusText = turnin.maxedOut
            ? '<span class="turnin-maxed">Maxed</span>'
            : `<span class="turnin-remaining">${turnin.remaining} left</span>`;
          return `
            <div class="turnin-item ${turnin.maxedOut ? 'maxed' : ''} ${turnin.canUse ? 'available' : ''}">
              <span class="turnin-icon">${turnin.icon}</span>
              <div class="turnin-info">
                <div class="turnin-name">${turnin.amountPer}x ${turnin.resourceName}</div>
                <div class="turnin-reward">+${turnin.reputationPer} rep • ${turnin.npcName}</div>
              </div>
              ${statusText}
              ${turnin.canUse ? `<button class="pixel-btn pixel-btn-tiny" onclick="performResourceTurnin('${turnin.id}')">Give</button>` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  showModal('projects-modal', `
    <div class="projects-screen">
      <div class="projects-header">
        <h2>🏘️ Village Projects</h2>
        <div class="projects-location">📍 ${currentLocation.charAt(0).toUpperCase() + currentLocation.slice(1)}</div>
      </div>
      <div class="projects-content">
        <div class="projects-section">
          <div class="section-title">Community Projects</div>
          ${projectsHtml}
        </div>
        ${turninsHtml}
      </div>
      <div class="projects-footer">
        <button class="pixel-btn" onclick="hideModal('projects-modal')">Close</button>
      </div>
    </div>
  `);
}

/**
 * Contribute items to a village project
 */
function contributeToProject(projectId, itemId) {
  if (!villageProjectsManager) return;

  const result = villageProjectsManager.contribute(projectId, itemId, 1);

  if (result.success) {
    if (result.completed) {
      showNotification(`🎉 ${result.projectName} completed!`, 'success');
      // Show completion message
      setTimeout(() => {
        showNotification(result.message, 'info');
      }, 500);
    } else {
      showNotification(result.message, 'success');
    }
    // Refresh the screen
    showVillageProjectsScreen();
  } else {
    showNotification(result.message, 'error');
  }
}

/**
 * Perform a resource turn-in for reputation
 */
function performResourceTurnin(turninId) {
  if (!villageProjectsManager) return;

  const result = villageProjectsManager.performTurnin(turninId);

  if (result.success) {
    showNotification(`"${result.message}" +${result.reputation} reputation`, 'success');
    if (result.maxedOut) {
      showNotification(`${result.npc} doesn't need any more of this resource.`, 'info');
    }
    // Refresh the screen
    showVillageProjectsScreen();
  } else {
    showNotification(result.message, 'error');
  }
}

// =====================================================
// Cosmetics Screen (Stub)
// =====================================================

function showCosmeticsScreen() {
  showModal('cosmetics-modal', `
    <div class="cosmetics-screen">
      <div class="cosmetics-header">
        <h2>🎨 Cosmetics</h2>
      </div>
      <div class="cosmetics-content">
        <div class="cosmetics-empty">
          <div class="empty-icon">✨</div>
          <div class="empty-text">Cosmetics coming soon!</div>
          <div class="empty-hint">Unlock frames, backgrounds, and badges as you progress.</div>
        </div>
      </div>
      <div class="cosmetics-footer">
        <button class="pixel-btn" onclick="hideModal('cosmetics-modal')">Close</button>
      </div>
    </div>
  `);
}

// Make functions globally accessible
window.showInventoryScreen = showInventoryScreen;
window.showQuestsScreen = showQuestsScreen;
window.showMapScreen = showMapScreen;
window.showSettingsScreen = showSettingsScreen;
window.showProgressOverview = showProgressOverview;
window.showGatherScreen = showGatherScreen;
window.showVillageProjectsScreen = showVillageProjectsScreen;
window.showCosmeticsScreen = showCosmeticsScreen;
window.travelToLocation = travelToLocation;
window.showItemDetails = showItemDetails;
window.equipItem = equipItem;
window.unequipItem = unequipItem;
window.useItem = useItem;
window.saveSettingsAndClose = saveSettingsAndClose;
window.exportSaveData = exportSaveData;
window.importSaveData = importSaveData;
window.confirmResetProgress = confirmResetProgress;
window.startGathering = startGathering;
window.unlockGatheringSkill = unlockGatheringSkill;
window.unlockAllGatheringSkills = unlockAllGatheringSkills;
window.GATHERING_SKILL_DATA = GATHERING_SKILL_DATA;
window.continueQuestLesson = continueQuestLesson;
window.showQuestGiver = showQuestGiver;
window.contributeToProject = contributeToProject;
window.performResourceTurnin = performResourceTurnin;
