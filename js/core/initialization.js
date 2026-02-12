/**
 * ByteQuest - Initialization
 * Clean version - no legacy/V2/bridge code
 */

// =====================================================
// Character Creation
// =====================================================

function showCharacterCreation(preselectedLanguage = null) {
  document.getElementById('title-screen').style.display = 'none';

  // Check if player already has a global name
  const existingName = localStorage.getItem('bytequest_player_name');
  if (existingName) {
    if (preselectedLanguage) {
      startNewGame(existingName, 'cleric', preselectedLanguage);
    }
    return;
  }

  const clericClass = GAME_DATA.classes.cleric;

  // Get language name for display if preselected
  let languageDisplay = '';
  if (preselectedLanguage && typeof LANGUAGE_CONFIG !== 'undefined') {
    const langInfo = LANGUAGE_CONFIG.languages[preselectedLanguage];
    if (langInfo) {
      languageDisplay = `
        <div style="text-align: center; margin-bottom: 16px; padding: 8px; background: rgba(88, 204, 2, 0.1); border: 1px solid rgba(88, 204, 2, 0.3); border-radius: 8px;">
          <span style="font-size: 11px; color: var(--text-dim);">Learning:</span>
          <span style="font-family: var(--font-display); color: #58cc02; margin-left: 8px;">${CourseManager.getLanguageFlag(preselectedLanguage)} ${langInfo.name}</span>
        </div>
      `;
    }
  }

  showModal('character-creation', `
    <h2 style="font-family: var(--font-display); font-size: 16px; color: var(--accent-gold); margin-bottom: 16px; text-align: center;">
      Create Your Character
    </h2>
    ${languageDisplay}
    <div style="text-align: center; margin-bottom: 20px; padding: 16px; background: rgba(0,0,0,0.2); border-radius: 8px;">
      <div style="font-size: 32px; margin-bottom: 8px;">${clericClass.icon}</div>
      <div style="font-family: var(--font-display); font-size: 14px; color: var(--accent-gold);">${clericClass.name}</div>
      <div style="font-size: 11px; color: var(--text-dim); margin-top: 8px; font-style: italic;">
        ${clericClass.flavor}
      </div>
    </div>
    <div style="margin-bottom: 24px; text-align: center;">
      <label style="display: block; font-family: var(--font-display); font-size: 14px; margin-bottom: 8px;">Your Name</label>
      <input type="text" class="name-input" id="player-name-input" placeholder="Enter name..." maxlength="20">
      <div id="name-error" class="validation-message" style="display: none;">
        <span class="validation-icon">⚠️</span> Please enter a name to continue
      </div>
    </div>
    <div style="text-align: center; margin-top: 24px; display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <button class="art-btn art-btn-large art-btn-gold" id="start-adventure-btn" disabled>
        Begin Adventure
      </button>
      <button class="art-btn art-btn-small" id="back-to-menu-btn">
        Back
      </button>
    </div>
  `);

  // Back button handler
  document.getElementById('back-to-menu-btn').addEventListener('click', () => {
    hideModal('character-creation');
    document.getElementById('title-screen').style.display = 'flex';

    // Always show main menu, with Continue hidden if no courses exist
    updateMainMenuButtons();
  });

  const nameInput = document.getElementById('player-name-input');
  const nameError = document.getElementById('name-error');

  nameInput.addEventListener('input', () => {
    const name = nameInput.value.trim();
    document.getElementById('start-adventure-btn').disabled = !name;
    if (name) nameError.style.display = 'none';
  });

  nameInput.addEventListener('focus', () => {
    nameError.style.display = 'none';
  });

  document.getElementById('start-adventure-btn').addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (!name) {
      nameError.style.display = 'block';
      nameInput.focus();
      return;
    }
    hideModal('character-creation');

    // Save name globally for all courses
    localStorage.setItem('bytequest_player_name', name);

    if (preselectedLanguage) {
      startNewGame(name, 'cleric', preselectedLanguage);
    }
  });
}

// =====================================================
// Start New Game
// =====================================================

async function startNewGame(name, classId, language = 'french') {
  console.log('[startNewGame] Starting with:', { name, classId, language });

  const classData = GAME_DATA.classes[classId];

  // Initialize player
  GameState.player.name = name;
  GameState.player.class = classId;
  GameState.player.language = language;
  GameState.player.createdAt = Date.now();
  GameState.player.maxHp = classData.startingStats.maxHp;
  GameState.player.hp = GameState.player.maxHp;

  // Set current language
  GameState.currentLanguage = language;
  if (typeof LANGUAGE_CONFIG !== 'undefined') {
    LANGUAGE_CONFIG.setCurrent(language);
  }

  // Load course data for this language
  if (typeof CourseLoader !== 'undefined') {
    await CourseLoader.loadCourse(language);
  }

  // Initialize CourseDataManager (centralized course data access)
  if (typeof CourseDataManager !== 'undefined' && CourseDataManager.initialize) {
    CourseDataManager.initialize(language);
    console.log('[startNewGame] CourseDataManager initialized for', language);
  }

  // Initialize QuestManager
  if (typeof QuestManager !== 'undefined') {
    GameState.questManager = new QuestManager(GameState);
    GameState.questManager.loadCourseQuests(language);
    console.log('[startNewGame] QuestManager initialized for', language);
  }

  // Initialize MilestoneManager (global for other systems to access)
  if (typeof MilestoneManager !== 'undefined') {
    window.milestoneManager = new MilestoneManager(GameState);
    console.log('[startNewGame] MilestoneManager initialized');
  }

  // Initialize StatsManager (global for other systems to access)
  if (typeof StatsManager !== 'undefined') {
    window.statsManager = new StatsManager(GameState);
    console.log('[startNewGame] StatsManager initialized');
  }

  // Initialize AchievementManager (global for other systems to access)
  if (typeof AchievementManager !== 'undefined') {
    window.achievementManager = new AchievementManager(GameState);
    console.log('[startNewGame] AchievementManager initialized');
  }

  // Initialize CurrencyManager (global for other systems to access)
  if (typeof CurrencyManager !== 'undefined') {
    window.currencyManager = new CurrencyManager(GameState);
    console.log('[startNewGame] CurrencyManager initialized');
  }

  // Initialize TitleManager (global for other systems to access)
  if (typeof TitleManager !== 'undefined') {
    window.titleManager = new TitleManager(GameState);
    console.log('[startNewGame] TitleManager initialized');
  }

  // Initialize ItemManager (global for shop and crafting systems)
  if (typeof ItemManager !== 'undefined' && typeof GAME_DATA !== 'undefined') {
    // Merge resource items with game data items
    const allItems = {
      ...GAME_DATA.items,
      ...(typeof RESOURCE_ITEMS !== 'undefined' ? RESOURCE_ITEMS : {})
    };
    window.itemManager = new ItemManager(GameState, allItems);
    console.log('[startNewGame] ItemManager initialized with', Object.keys(allItems).length, 'items');
  }

  // Initialize ShopManager (global for shop UI)
  if (typeof ShopManager !== 'undefined') {
    window.shopManager = new ShopManager(GameState, SHOP_DEFINITIONS, window.itemManager);
    console.log('[startNewGame] ShopManager initialized');
  }

  // Initialize HintManager (global for lesson hints)
  if (typeof HintManager !== 'undefined') {
    window.hintManager = new HintManager(GameState, window.statsManager, window.itemManager);
    console.log('[startNewGame] HintManager initialized');
  }

  // Initialize ReputationManager (global for faction systems)
  if (typeof ReputationManager !== 'undefined') {
    window.reputationManager = new ReputationManager(GameState);
    console.log('[startNewGame] ReputationManager initialized');
  }

  // Initialize VillageProjectsManager (global for community projects)
  if (typeof VillageProjectsManager !== 'undefined') {
    window.villageProjectsManager = new VillageProjectsManager(GameState);
    console.log('[startNewGame] VillageProjectsManager initialized');
  }

  // Initialize EnhancementManager (global for Tier 3 permanent upgrades)
  if (typeof EnhancementManager !== 'undefined') {
    window.enhancementManager = new EnhancementManager(GameState);
    console.log('[startNewGame] EnhancementManager initialized');
  }

  // Initialize MemoryShrineManager (for shrine blessings, devotion, ancient texts)
  if (typeof MemoryShrineManager !== 'undefined') {
    window.memoryShrineManager = new MemoryShrineManager(GameState);
    console.log('[startNewGame] MemoryShrineManager initialized');
  }

  // Initialize PracticeManager (for Memory Shrine practice challenges)
  if (typeof PracticeManager !== 'undefined') {
    window.practiceManager = new PracticeManager(GameState);
    console.log('[startNewGame] PracticeManager initialized');
  }

  // Initialize LocationManager (global for location/travel system)
  if (typeof LocationManager !== 'undefined') {
    window.locationManager = new LocationManager(GameState);
    // Discover connected locations and check level unlocks
    locationManager.checkQuestBasedDiscovery();
    locationManager.checkLevelUnlocks();
    console.log('[startNewGame] LocationManager initialized');
  }

  // Initialize TradeNetworkManager (global for Zone 3 trading)
  if (typeof initTradeNetwork === 'function') {
    initTradeNetwork(GameState);
    console.log('[startNewGame] TradeNetworkManager initialized');
  }

  // Initialize Spellbook
  if (typeof initSpellbook === 'function') {
    initSpellbook(GameState);
    console.log('[startNewGame] Spellbook initialized');
  }

  // Add starting items
  if (classData.startingItems) {
    classData.startingItems.forEach(itemId => {
      addItemToInventory(itemId);
    });
  }

  startGame();
  autoSave();
}

// =====================================================
// Start Game (Enter Game View)
// =====================================================

function startGame() {
  GameState.currentScreen = 'game';
  document.getElementById('title-screen').style.display = 'none';
  document.getElementById('game-container').style.display = 'flex';

  renderHUD();
  renderLocation();
  updateNavButtonVisibility();

  // Show welcome tutorial for new players
  if (!GameState.tutorial?.shownTips?.includes('welcomeToDawnmere')) {
    setTimeout(() => {
      showTutorialTip('welcomeToDawnmere', '.npc-button', () => {});
    }, 500);
  }
}

// =====================================================
// Inventory Helpers
// =====================================================

function addItemToInventory(itemId, count = 1) {
  const existing = GameState.player.inventory.find(i => i.id === itemId);
  if (existing) {
    existing.count += count;
  } else {
    GameState.player.inventory.push({ id: itemId, count });
  }
}

// =====================================================
// Stub Functions (to be implemented in their systems)
// =====================================================

function renderQuestPanel() {
  // TODO: Implement in questUI.js
}

function renderNPCs(location) {
  const sceneNpcs = document.getElementById('scene-npcs');
  if (!sceneNpcs) return;

  // Get NPCs at this location
  const npcs = location.npcs || [];
  if (npcs.length === 0) {
    sceneNpcs.innerHTML = '';
    return;
  }

  sceneNpcs.innerHTML = npcs.map(npcId => {
    const npc = GAME_DATA.npcs[npcId];
    if (!npc) return '';

    // Check for quest markers using V2 system (QuestManager) with NPCSystem fallback
    let marker = '';
    if (typeof getNPCQuestMarkerV2 === 'function' && GameState.questManager) {
      const markerData = getNPCQuestMarkerV2(npcId, GameState.questManager);
      if (markerData) {
        marker = `<span class="${markerData.class}">${markerData.icon}</span>`;
      }
    } else if (typeof NPCSystem !== 'undefined') {
      const hasTurnIn = NPCSystem.hasQuestsToTurnIn(npcId);
      const hasQuest = NPCSystem.hasAvailableQuests(npcId);
      if (hasTurnIn) {
        marker = '<span class="npc-marker npc-marker-turnin">?</span>';
      } else if (hasQuest) {
        marker = '<span class="npc-marker npc-marker-quest">!</span>';
      }
    }

    return `
      <button class="npc-button" onclick="NPCSystem.talkTo('${npcId}')">
        <span class="npc-icon">${npc.icon}</span>
        ${marker}
        <span class="npc-name">${npc.name}</span>
      </button>
    `;
  }).join('');
}

function renderHotspots(location) {
  const container = document.getElementById('scene-hotspots');
  if (!container) return;

  // Use HotspotSystem if available
  if (typeof HotspotSystem !== 'undefined' && HotspotSystem.render) {
    container.innerHTML = HotspotSystem.render(location);
  } else {
    container.innerHTML = '';
  }
}

function checkAchievements() {
  // TODO: Implement
}

function levelUp() {
  GameState.player.level++;
  GameState.player.xp -= GameState.player.xpToNext;
  GameState.player.xpToNext = Math.floor(GameState.player.xpToNext * 1.5);
  showNotification(`Level up! You are now level ${GameState.player.level}`, 'success');
  renderHUD();
}

// =====================================================
// Navigation
// =====================================================

function handleNavigation(screen) {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screen);
  });

  switch (screen) {
    case 'profile':
      if (typeof showProfileScreen === 'function') showProfileScreen();
      break;
    case 'inventory':
      if (typeof showInventoryScreen === 'function') showInventoryScreen();
      break;
    case 'quests':
      if (typeof showQuestsScreen === 'function') showQuestsScreen();
      break;
    case 'spellbook':
      console.log('[Nav] Spellbook clicked, showSpellbook exists:', typeof showSpellbook === 'function');
      if (typeof showSpellbook === 'function') showSpellbook();
      break;
    case 'map':
      if (typeof showMapScreen === 'function') showMapScreen();
      break;
    case 'settings':
      if (typeof showSettingsScreen === 'function') showSettingsScreen();
      break;
    case 'save':
      saveGame();
      break;
    case 'gather':
      if (typeof showGatherScreen === 'function') showGatherScreen();
      break;
    case 'projects':
      if (typeof showVillageProjectsScreen === 'function') showVillageProjectsScreen();
      break;
    case 'crafting':
      if (typeof openCrafting === 'function') openCrafting('alchemy');
      break;
    case 'progress':
      if (typeof showProgressScreen === 'function') showProgressScreen();
      break;
    case 'practice':
      if (typeof showPracticeScreen === 'function') showPracticeScreen();
      break;
    case 'upgrades':
      if (typeof showUpgradesScreen === 'function') showUpgradesScreen();
      break;
    default:
      console.log('[Nav] Unknown screen:', screen);
  }
}

// =====================================================
// Initialization
// =====================================================

function initGame() {
  console.log('[initGame] Starting initialization...');

  // Load settings
  loadSettings();
  applySettings();

  // Migrate legacy saves first (may create courses)
  migrateLegacySave();

  // Setup button handlers (always needed)
  setupTitleScreenHandlers();
  setupNavigationHandlers();
  setupKeyboardShortcuts();

  // Check for first-time user
  if (!CourseManager.hasCourses()) {
    // First-time user - show welcome screen, hide main menu
    document.getElementById('main-menu').style.display = 'none';
    showFirstTimeWelcome();
  } else {
    // Returning user - show main menu with appropriate buttons
    updateMainMenuButtons();
  }

  console.log('[initGame] Initialization complete');
}

/**
 * Update main menu button visibility based on existing courses
 */
function updateMainMenuButtons() {
  const newGameBtn = document.getElementById('new-game-btn');
  const continueBtn = document.getElementById('continue-btn');
  const mainMenu = document.getElementById('main-menu');

  if (!mainMenu) return;

  const hasCourses = CourseManager.hasCourses();

  // Always show New Game (for adding courses)
  if (newGameBtn) {
    newGameBtn.style.display = 'block';
  }

  // Only show Continue if courses exist
  if (continueBtn) {
    continueBtn.style.display = hasCourses ? 'block' : 'none';
  }

  // Show main menu
  mainMenu.style.display = 'flex';
}

function setupTitleScreenHandlers() {
  const newGameBtn = document.getElementById('new-game-btn');
  if (newGameBtn) {
    newGameBtn.addEventListener('click', () => showCoursePanel('new'));
  }

  const continueBtn = document.getElementById('continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => showCoursePanel('continue'));
  }

  const backBtn = document.getElementById('back-to-main-menu-btn');
  if (backBtn) {
    backBtn.addEventListener('click', hideCoursePanel);
  }

  const addCourseBtn = document.getElementById('add-course-btn');
  if (addCourseBtn) {
    addCourseBtn.addEventListener('click', showLanguageSelection);
  }
}

function setupNavigationHandlers() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      handleNavigation(btn.dataset.screen);
    });
  });
}

function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (!GameState.player.createdAt) return;

    if (GameState.activeDialog) {
      if (e.key === 'Escape') hideDialog();
      return;
    }

    switch (e.key.toLowerCase()) {
      case 'i': handleNavigation('inventory'); break;
      case 'q': handleNavigation('quests'); break;
      case 'm': handleNavigation('map'); break;
      case 's': handleNavigation('spellbook'); break;
      case 'escape': handleNavigation('game'); break;
    }
  });
}

function hideDialog() {
  GameState.activeDialog = null;
  const dialogBox = document.getElementById('dialog-box');
  if (dialogBox) dialogBox.style.display = 'none';
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', initGame);
