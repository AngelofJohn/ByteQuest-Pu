// ByteQuest - UI Core (Rendering & Screens)
// Extracted from game.js (lines 831-927, 2564-2755, 2756-2983)

// =====================================================
// UI Rendering Functions
// =====================================================

function renderHUD() {
  const player = GameState.player;

  // Player name and level
  const playerName = document.querySelector('.player-name');
  const playerLevel = document.querySelector('.player-level');
  if (playerName) playerName.textContent = player.name || 'Traveler';
  if (playerLevel) playerLevel.textContent = `Level ${player.level} ${player.class ? player.class.charAt(0).toUpperCase() + player.class.slice(1) : ''}`;
  
  // HP Bar
  const hpPercent = (player.hp / player.maxHp) * 100;
  const hpFill = document.querySelector('.hp-bar .bar-fill');
  const hpValue = document.querySelector('.hp-bar .stat-value');
  if (hpFill) hpFill.style.width = `${hpPercent}%`;
  if (hpValue) hpValue.textContent = `${player.hp}/${player.maxHp}`;
  
  // XP Bar
  const xpPercent = (player.xp / player.xpToNext) * 100;
  const xpFill = document.querySelector('.xp-bar .bar-fill');
  const xpValue = document.querySelector('.xp-bar .stat-value');
  if (xpFill) xpFill.style.width = `${xpPercent}%`;
  if (xpValue) xpValue.textContent = `${player.xp}/${player.xpToNext}`;
  
  // Gold
  const goldValue = document.querySelector('.gold .currency-value');
  if (goldValue) goldValue.textContent = player.gold;

  // Render active effects
  renderActiveEffects();
}

/**
 * Render active potion/buff effects in the HUD
 */
function renderActiveEffects() {
  const container = document.getElementById('active-effects');
  if (!container) return;

  const effects = [];

  // Collect from consumables
  const consumables = GameState.player.activeEffects?.consumables || [];
  effects.push(...consumables.map(e => ({
    icon: e.icon,
    name: e.name,
    duration: e.remainingDuration,
    type: 'consumable',
    details: Object.entries(e.effects || {}).map(([key, val]) => {
      if (key === 'xpMultiplier') return `${val}x XP`;
      if (key === 'xpBonus') return `+${Math.round(val * 100)}% XP`;
      if (key === 'damageReduction') return `-${Math.round(val * 100)}% damage`;
      if (key === 'hintCharges') return `+${val} hints`;
      return `${key}: ${val}`;
    }).join(', ')
  })));

  // Collect from alchemy (cognitivePotions)
  const alchemyEffect = GameState.player.activeEffects?.cognitivePotions;
  if (alchemyEffect?.active) {
    effects.push({
      icon: '⚗️',
      name: alchemyEffect.active,
      duration: alchemyEffect.remainingDuration,
      type: 'alchemy',
      details: 'Alchemy effect'
    });
  }

  // Collect from food buffs
  const foodBuff = GameState.player.activeEffects?.foodBuffs;
  if (foodBuff?.active) {
    effects.push({
      icon: '🍖',
      name: foodBuff.active,
      duration: foodBuff.remainingDuration,
      type: 'food',
      details: 'Food buff'
    });
  }

  if (effects.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = effects.map(e => `
    <div class="active-effect" title="${e.name}: ${e.details} (${e.duration} lesson${e.duration !== 1 ? 's' : ''} remaining)">
      <span class="effect-icon">${e.icon}</span>
      <span class="effect-duration">${e.duration}</span>
    </div>
  `).join('');
}

/**
 * Update visibility of nav buttons based on unlocked features
 */
function updateNavButtonVisibility() {
  const unlockedFeatures = GameState.player.unlockedFeatures || [];

  // Find all nav buttons with data-feature attribute
  document.querySelectorAll('.nav-btn[data-feature]').forEach(btn => {
    const feature = btn.getAttribute('data-feature');
    if (unlockedFeatures.includes(feature)) {
      btn.style.display = '';
      btn.classList.remove('feature-locked');
    } else {
      btn.style.display = 'none';
      btn.classList.add('feature-locked');
    }
  });
}

function renderLocation() {
  // Get current location ID - prioritize locationManager as the source of truth
  let locationId;
  if (typeof locationManager !== 'undefined' && locationManager) {
    locationId = locationManager.getCurrentLocationId();
    // Ensure GameState is synchronized with locationManager
    GameState.currentLocation = locationId;
    if (GameState.player.locations) {
      GameState.player.locations.current = locationId;
    }
  } else if (GameState.player.locations?.current) {
    locationId = GameState.player.locations.current;
  } else {
    locationId = GameState.currentLocation || 'dawnmere';
  }

  // Get location data - try locationManager first, then GAME_DATA
  let location;
  if (typeof locationManager !== 'undefined' && locationManager) {
    location = locationManager.getLocation(locationId);
  }
  if (!location && typeof GAME_DATA !== 'undefined') {
    location = GAME_DATA.locations?.[locationId];
  }
  if (!location && typeof LOCATION_DEFINITIONS !== 'undefined') {
    location = LOCATION_DEFINITIONS?.[locationId];
  }

  if (!location) {
    console.warn('No location found for:', locationId);
    return;
  }

  // Update location header
  const locName = document.querySelector('.location-name');
  const locDesc = document.querySelector('.location-desc');
  if (locName) locName.textContent = location.name;
  if (locDesc) locDesc.textContent = location.description;

  // Render NPCs in scene
  renderNPCs(location);

  // Render hotspots in scene
  renderHotspots(location);
}


// =====================================================
// Rewards Screen
// =====================================================

function showRewardsScreen(rewardData, onClose = null) {
  // Build items HTML
  let itemsHtml = '';
  if (rewardData.items.length > 0) {
    const itemsList = rewardData.items.map(item => {
      const statsText = item.stats
        ? `<span class="reward-item-stats">(${Object.entries(item.stats).map(([k,v]) => `+${v} ${k}`).join(', ')})</span>`
        : '';
      return `
        <div class="reward-item" data-item-tooltip="${item.id}">
          <span class="reward-item-icon">${item.icon}</span>
          <span class="reward-item-name">${item.name}</span>
          ${statsText}
        </div>
      `;
    }).join('');
    
    itemsHtml = `
      <div class="rewards-section">
        <div class="rewards-section-title">📦 ITEMS RECEIVED</div>
        <div class="rewards-items-list">
          ${itemsList}
        </div>
      </div>
    `;
  }
  
  // Build reputation HTML
  let reputationHtml = '';
  if (rewardData.reputation.length > 0) {
    const repList = rewardData.reputation.map(rep => {
      const progress = Math.min(100, (rep.newTotal / rep.maxRank) * 100);
      const nextThreshold = rep.nextRank?.threshold || rep.maxRank;
      const devotionText = rep.devotionBonus > 0 ? ` <span class="devotion-bonus">(+${rep.devotionBonus} Devotion)</span>` : '';
      
      return `
        <div class="reward-reputation">
          <div class="reward-rep-header">
            <span class="reward-rep-name">${rep.factionName}</span>
            <span class="reward-rep-amount">+${rep.amount}${devotionText}</span>
          </div>
          <div class="reward-rep-bar">
            <div class="reward-rep-fill" style="width: ${progress}%"></div>
          </div>
          <div class="reward-rep-progress">${rep.newTotal} / ${nextThreshold}</div>
          ${rep.rankUp ? `<div class="reward-rank-up">🎉 Rank Up: ${rep.newRankTitle}!</div>` : ''}
        </div>
      `;
    }).join('');
    
    reputationHtml = `
      <div class="rewards-section">
        <div class="rewards-section-title">🏛️ REPUTATION</div>
        ${repList}
      </div>
    `;
  }
  
  // Build spellbook HTML
  let spellbookHtml = '';
  if (rewardData.spellbookPages && rewardData.spellbookPages.length > 0) {
    // Get page titles from SPELLBOOK_PAGES if available
    const getPageTitle = (pageId) => {
      if (typeof SPELLBOOK_PAGES !== 'undefined' && SPELLBOOK_PAGES[pageId]) {
        return SPELLBOOK_PAGES[pageId].title;
      }
      // Fallback: format the ID nicely
      return pageId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    };

    spellbookHtml = `
      <div class="rewards-section">
        <div class="rewards-section-title">📖 NEW LORE UNLOCKED</div>
        <div class="rewards-spellbook">
          ${rewardData.spellbookPages.map(p => `<span class="spellbook-page-unlock">${getPageTitle(p)}</span>`).join(', ')}
        </div>
      </div>
    `;
  }

  // Build gathering skills HTML
  let gatheringHtml = '';
  if (rewardData.gatheringSkills && rewardData.gatheringSkills.length > 0) {
    const skillNames = {
      mining: { name: 'Mining', icon: '⛏️' },
      woodcutting: { name: 'Woodcutting', icon: '🪓' },
      herbalism: { name: 'Herbalism', icon: '🌿' },
      fishing: { name: 'Fishing', icon: '🎣' },
      hunting: { name: 'Hunting', icon: '🏹' }
    };

    const skillsList = rewardData.gatheringSkills.map(skill => {
      const info = skillNames[skill] || { name: skill, icon: '✨' };
      return `<span class="gathering-skill-unlock">${info.icon} ${info.name}</span>`;
    }).join(', ');

    gatheringHtml = `
      <div class="rewards-section">
        <div class="rewards-section-title">🛠️ SKILL LEARNED</div>
        <div class="rewards-gathering">
          ${skillsList}
          <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">
            Access from the Gather menu
          </div>
        </div>
      </div>
    `;
  }
  
  // Build level up HTML
  let levelUpHtml = '';
  if (rewardData.leveledUp) {
    levelUpHtml = `
      <div class="rewards-level-up">
        🎊 LEVEL UP! You are now Level ${rewardData.newLevel}!
      </div>
    `;
  }
  
  // Quest type badge
  const typeBadge = {
    main: '⭐ MAIN',
    side: '📋 SIDE',
    daily: '🌅 DAILY',
    weekly: '📅 WEEKLY',
    hidden: '🔍 HIDDEN',
    seasonal: '🌸 SEASONAL',
    chain: '🔗 CHAIN',
    timed: '⏱️ TIMED',
    repeatable: '🔄 REPEATABLE'
  }[rewardData.questType] || '📜 QUEST';
  
  showModal('rewards-modal', `
    <div class="rewards-screen">
      <div class="rewards-header">
        <div class="rewards-badge">${typeBadge}</div>
        <div class="rewards-title">QUEST COMPLETE!</div>
        <div class="rewards-quest-name">"${rewardData.questName}"</div>
      </div>
      
      ${levelUpHtml}
      
      <div class="rewards-main">
        <div class="rewards-xp-gold">
          <div class="reward-xp">
            <span class="reward-icon">⭐</span>
            <span class="reward-value">+${rewardData.xp} XP</span>
          </div>
          <div class="reward-gold">
            <span class="reward-icon">💰</span>
            <span class="reward-value">+${rewardData.gold} Gold</span>
          </div>
        </div>
        
        ${itemsHtml}
        ${reputationHtml}
        ${spellbookHtml}
        ${gatheringHtml}
      </div>
      
      <div class="rewards-footer">
        <button class="pixel-btn pixel-btn-gold" id="rewards-continue-btn">Continue</button>
      </div>
    </div>
  `);

  // Bind continue button
  setTimeout(() => {
    const continueBtn = document.getElementById('rewards-continue-btn');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        hideModal('rewards-modal');
        if (onClose) onClose();
        // Show any pending level ups after rewards screen closes
        setTimeout(() => {
          showPendingLevelUps();
        }, 300);
      });
    }

    // Bind tooltips to reward items
    const modal = document.getElementById('rewards-modal');
    if (modal && typeof TooltipSystem !== 'undefined') {
      TooltipSystem.bindAllInContainer(modal);
    }
  }, 0);
}


// =====================================================
// Lesson Completion Screen
// =====================================================

function showLessonCompletionScreen(data) {
  const {
    lessonType,      // 'regular', 'review', 'exam'
    passed,
    successRate,
    correctAnswers,
    wrongAnswers,
    totalQuestions,
    xpEarned,
    xpBreakdown,     // optional - BonusCalculator result for visible stacking
    hpRecovered,
    hpLost,
    isPerfect,
    questObjective,  // optional - quest this was for
    essenceEarned,   // optional - { type, amount }
    leveledUp,
    newLevel
  } = data;

  const percentage = Math.floor(successRate * 100);

  // Determine header based on lesson type and outcome
  let headerIcon, headerTitle, headerClass;
  if (lessonType === 'exam') {
    headerIcon = passed ? '🏆' : '📝';
    headerTitle = passed ? 'EXAM PASSED!' : 'EXAM FAILED';
    headerClass = passed ? 'success' : 'failed';
  } else if (lessonType === 'review') {
    headerIcon = '💚';
    headerTitle = 'REVIEW COMPLETE';
    headerClass = 'review';
  } else {
    headerIcon = passed ? '📚' : '📖';
    headerTitle = passed ? 'LESSON COMPLETE!' : 'LESSON FAILED';
    headerClass = passed ? 'success' : 'failed';
  }

  // Build score display
  const scoreHtml = `
    <div class="lesson-score ${isPerfect ? 'perfect' : ''}">
      <div class="score-circle ${headerClass}">
        <span class="score-value">${percentage}%</span>
      </div>
      ${isPerfect ? '<div class="perfect-badge">⭐ PERFECT!</div>' : ''}
    </div>
  `;

  // Build stats breakdown
  const statsHtml = `
    <div class="lesson-stats-grid">
      <div class="lesson-stat correct">
        <span class="stat-icon">✓</span>
        <span class="stat-value">${correctAnswers}</span>
        <span class="stat-label">Correct</span>
      </div>
      <div class="lesson-stat wrong">
        <span class="stat-icon">✗</span>
        <span class="stat-value">${wrongAnswers}</span>
        <span class="stat-label">Wrong</span>
      </div>
      <div class="lesson-stat total">
        <span class="stat-icon">📝</span>
        <span class="stat-value">${totalQuestions}</span>
        <span class="stat-label">Questions</span>
      </div>
    </div>
  `;

  // Build rewards section
  let rewardsHtml = '';
  if (passed) {
    let rewardItems = [];

    if (xpEarned > 0) {
      // Use breakdown if available for Idleon-style visible stacking
      if (xpBreakdown && xpBreakdown.breakdown && xpBreakdown.breakdown.length > 1) {
        let breakdownHtml = '<div class="xp-breakdown-container">';
        breakdownHtml += '<div class="xp-breakdown-header"><span class="reward-icon">⭐</span>Experience Gained</div>';
        breakdownHtml += '<div class="xp-breakdown-list">';

        xpBreakdown.breakdown.forEach((item, index) => {
          const rowClass = item.type === 'base' ? 'breakdown-base' :
                          item.type === 'multiplier' ? 'breakdown-multiplier' : 'breakdown-additive';
          breakdownHtml += `<div class="xp-breakdown-row ${rowClass}">`;
          breakdownHtml += `<span class="breakdown-label">${item.source}</span>`;
          breakdownHtml += `<span class="breakdown-value">${item.formatted}</span>`;
          breakdownHtml += '</div>';
        });

        breakdownHtml += '</div>';
        breakdownHtml += `<div class="xp-breakdown-total">`;
        breakdownHtml += `<span class="breakdown-label">Total XP</span>`;
        breakdownHtml += `<span class="breakdown-value total-value">+${xpBreakdown.total}</span>`;
        breakdownHtml += '</div>';
        breakdownHtml += '</div>';

        rewardItems.push(breakdownHtml);
      } else {
        // Fallback to simple display
        rewardItems.push(`<div class="reward-item xp"><span class="reward-icon">⭐</span>+${xpEarned} XP</div>`);
      }
    }

    if (hpRecovered > 0) {
      rewardItems.push(`<div class="reward-item hp"><span class="reward-icon">💚</span>+${hpRecovered} HP Restored</div>`);
    }

    if (essenceEarned && essenceEarned.amount > 0) {
      const essenceIcons = { faded: '🔮', clear: '💎', vivid: '✨', brilliant: '🌟' };
      const icon = essenceIcons[essenceEarned.type] || '🔮';
      rewardItems.push(`<div class="reward-item essence"><span class="reward-icon">${icon}</span>+${essenceEarned.amount} ${essenceEarned.type} essence</div>`);
    }

    if (rewardItems.length > 0) {
      rewardsHtml = `
        <div class="lesson-rewards">
          <div class="rewards-title">Rewards</div>
          ${rewardItems.join('')}
        </div>
      `;
    }
  }

  // Build HP lost warning (for failed lessons)
  let hpWarningHtml = '';
  if (hpLost > 0) {
    hpWarningHtml = `
      <div class="lesson-hp-warning">
        <span class="warning-icon">💔</span>
        <span>Lost ${hpLost} HP from wrong answers</span>
      </div>
    `;
  }

  // Level up celebration
  let levelUpHtml = '';
  if (leveledUp) {
    levelUpHtml = `
      <div class="lesson-level-up">
        🎊 LEVEL UP! You are now Level ${newLevel}!
      </div>
    `;
  }

  // Quest objective progress
  let questHtml = '';
  if (questObjective && passed) {
    questHtml = `
      <div class="lesson-quest-progress">
        <span class="quest-icon">📜</span>
        <span>Quest objective completed!</span>
      </div>
    `;
  }

  // Failure message
  let failureHtml = '';
  if (!passed) {
    const threshold = lessonType === 'exam' ? 70 : 60;
    failureHtml = `
      <div class="lesson-failure-msg">
        <p>You need ${threshold}% to pass.</p>
        <p>Keep practicing - you'll get it!</p>
      </div>
    `;
  }

  showModal('lesson-complete-modal', `
    <div class="lesson-complete-screen ${headerClass}">
      <div class="lesson-complete-header">
        <div class="lesson-complete-icon">${headerIcon}</div>
        <div class="lesson-complete-title">${headerTitle}</div>
      </div>

      ${levelUpHtml}
      ${scoreHtml}
      ${statsHtml}
      ${rewardsHtml}
      ${hpWarningHtml}
      ${questHtml}
      ${failureHtml}

      <div class="lesson-complete-footer">
        <button class="pixel-btn ${passed ? 'pixel-btn-gold' : ''}" onclick="closeLessonComplete()">Continue</button>
      </div>
    </div>
  `);

  // Show quest complete tutorial for first-time players (only on successful completion)
  if (passed && !GameState.tutorial?.shownTips?.includes('questComplete')) {
    setTimeout(() => {
      showTutorialTip('questComplete', '.lesson-complete-screen', () => {});
    }, 300);
  }
}

// Close lesson complete modal and show any pending quest completions/level ups
function closeLessonComplete() {
  hideModal('lesson-complete-modal');
  // Process pending quest completion first, then level ups
  setTimeout(() => {
    // Check if there's a pending quest completion
    const hasQuestPending = pendingQuestCompletion !== null;

    // Show quest completion screen if a quest was completed during this lesson
    processPendingQuestCompletion();

    // Show pending level ups only if no quest screen was shown
    // (quest screen will handle level ups after it closes)
    if (!hasQuestPending) {
      showPendingLevelUps();
    }

    // Show spellbook tutorial after first lesson
    if (GameState.player.lessonsCompleted === 1) {
      setTimeout(() => {
        showTutorialTip('spellbook', '[data-screen="spellbook"]', () => {});
      }, 500);
    }
  }, 300);
}

function unlockDependentQuests(completedQuestId) {
  // Check system quests in GAME_DATA.quests
  if (typeof GAME_DATA !== 'undefined' && GAME_DATA.quests) {
    Object.values(GAME_DATA.quests).forEach(quest => {
      if (quest.prerequisites && quest.prerequisites.includes(completedQuestId)) {
        renderQuestPanel();
      }
    });
  }

  // Check course-specific quests via QuestManager
  if (typeof GameState !== 'undefined' && GameState.questManager && GameState.questManager.quests) {
    Object.values(GameState.questManager.quests).forEach(quest => {
      if (quest && quest.prerequisites && quest.prerequisites.includes(completedQuestId)) {
        renderQuestPanel();
      }
    });
  }
}

// =====================================================
// Modal System
// =====================================================

/**
 * Show a modal with content
 */
function showModal(modalId, content) {
  let modal = document.getElementById(modalId);

  if (!modal) {
    // Create modal dynamically
    modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content pixel-border">
      ${content}
    </div>
  `;

  // Show modal - add active class for CSS transition
  modal.classList.add('active');
}

/**
 * Hide a modal
 */
function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// =====================================================
// Notifications
// =====================================================

/**
 * Show a notification toast
 */
function showNotification(message, type = 'info') {
  const existing = document.querySelector('.notification-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `notification-toast notification-${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// =====================================================
// Settings
// =====================================================

function loadSettings() {
  const stored = localStorage.getItem('bytequest_settings');
  if (stored) {
    try {
      Object.assign(GameState.settings, JSON.parse(stored));
    } catch (e) {
      console.error('Failed to load settings:', e);
    }
  }
}

function saveSettings() {
  localStorage.setItem('bytequest_settings', JSON.stringify(GameState.settings));
}

function applySettings() {
  console.log('[Settings] Applied:', GameState.settings);
}

// =====================================================
// Save/Load
// =====================================================

function saveGame() {
  const courseId = CourseManager.getCurrentCourseId();
  if (!courseId) {
    console.warn('[Save] No current course');
    return;
  }

  const saveData = JSON.stringify(GameState, getGameStateSafeReplacer());
  localStorage.setItem(`bytequest_save_${courseId}`, saveData);
  showNotification('Game saved!', 'success');
}

function autoSave() {
  const courseId = CourseManager.getCurrentCourseId();
  if (!courseId) return;

  localStorage.setItem(`bytequest_save_${courseId}`, JSON.stringify(GameState, getGameStateSafeReplacer()));
}

/**
 * Returns a replacer function for JSON.stringify that excludes
 * circular references and non-serializable manager objects
 */
function getGameStateSafeReplacer() {
  // Keys to exclude from serialization (manager objects with circular refs)
  const excludeKeys = new Set([
    'questManager',
    'statsManager',
    'achievementManager',
    'currencyManager',
    'titleManager',
    'itemManager',
    'shopManager',
    'reputationManager',
    'villageProjectsManager',
    'locationManager'
  ]);

  return (key, value) => {
    if (excludeKeys.has(key)) {
      return undefined; // Skip this property
    }
    return value;
  };
}

/**
 * Migrate old quest IDs to new universal format
 * Old format: greetings_lesson, numbers_lesson, etc.
 * New format: vl_01_greetings, vl_04_numbers, etc.
 */
function migrateQuestIds() {
  // Map of old quest IDs to new universal IDs
  const QUEST_ID_MIGRATION = {
    // French vocabulary lessons (old -> new)
    'greetings_lesson': 'vl_01_greetings',
    'introductions_lesson': 'vl_02_introductions',
    'essentials_lesson': 'vl_03_essentials',
    'numbers_lesson': 'vl_04_numbers',
    'colors_lesson': 'vl_05_colors',
    'days_lesson': 'vl_06_days',
    'cognates_lesson': 'vl_07_cognates',
    // Greek vocabulary lessons (old -> new)
    'greek_lesson_4': 'vl_01_greetings',
    'greek_lesson_5': 'vl_02_introductions',
    'greek_lesson_6': 'vl_03_essentials',
    'greek_numbers_lesson': 'vl_04_numbers',
    'greek_colors_lesson': 'vl_05_colors',
    'greek_days_lesson': 'vl_06_days',
    // Greek alphabet lessons
    'greek_lesson_1': 'al_01_alphabet',
    'greek_lesson_2': 'al_02_vowels',
    'greek_lesson_3': 'al_03_digraphs',
    // Greek grammar lessons
    'greek_grammar_articles': 'gl_01_articles',
    'greek_grammar_present_tense': 'gl_02_present_tense'
  };

  let migratedCount = 0;

  // Migrate completed quests
  if (GameState.player.completedQuests && Array.isArray(GameState.player.completedQuests)) {
    GameState.player.completedQuests = GameState.player.completedQuests.map(questId => {
      if (typeof questId === 'string' && QUEST_ID_MIGRATION[questId]) {
        migratedCount++;
        return QUEST_ID_MIGRATION[questId];
      }
      return questId;
    });
  }

  // Migrate active quests
  if (GameState.player.activeQuests && Array.isArray(GameState.player.activeQuests)) {
    GameState.player.activeQuests = GameState.player.activeQuests.map(questId => {
      if (typeof questId === 'string' && QUEST_ID_MIGRATION[questId]) {
        migratedCount++;
        return QUEST_ID_MIGRATION[questId];
      }
      return questId;
    });
  }

  // Migrate quest progress keys
  if (GameState.player.questProgress && typeof GameState.player.questProgress === 'object') {
    const newProgress = {};
    for (const [questId, progress] of Object.entries(GameState.player.questProgress)) {
      const newId = QUEST_ID_MIGRATION[questId] || questId;
      if (newId !== questId) migratedCount++;
      newProgress[newId] = progress;
    }
    GameState.player.questProgress = newProgress;
  }

  // Migrate course-specific quest data (GameState.courses[lang].quests)
  if (GameState.courses && typeof GameState.courses === 'object') {
    for (const [courseId, courseData] of Object.entries(GameState.courses)) {
      if (!courseData || !courseData.quests) continue;

      // Migrate course completed quests
      if (courseData.quests.completed && Array.isArray(courseData.quests.completed)) {
        courseData.quests.completed = courseData.quests.completed.map(entry => {
          if (typeof entry === 'string') {
            const newId = QUEST_ID_MIGRATION[entry];
            if (newId) {
              migratedCount++;
              return newId;
            }
            return entry;
          }
          if (entry && entry.questId && QUEST_ID_MIGRATION[entry.questId]) {
            migratedCount++;
            return { ...entry, questId: QUEST_ID_MIGRATION[entry.questId] };
          }
          return entry;
        });
      }

      // Migrate course active quests
      if (courseData.quests.active && Array.isArray(courseData.quests.active)) {
        courseData.quests.active = courseData.quests.active.map(entry => {
          if (typeof entry === 'string') {
            const newId = QUEST_ID_MIGRATION[entry];
            if (newId) {
              migratedCount++;
              return newId;
            }
            return entry;
          }
          if (entry && entry.questId && QUEST_ID_MIGRATION[entry.questId]) {
            migratedCount++;
            return { ...entry, questId: QUEST_ID_MIGRATION[entry.questId] };
          }
          return entry;
        });
      }
    }
  }

  if (migratedCount > 0) {
    console.log(`[Migration] Migrated ${migratedCount} quest ID(s) to new universal format`);
  }
}

function loadGame() {
  const courseId = CourseManager.getCurrentCourseId();
  if (!courseId) return false;

  const saveData = localStorage.getItem(`bytequest_save_${courseId}`);
  if (!saveData) return false;

  try {
    Object.assign(GameState, JSON.parse(saveData));

    // Migrate old quest IDs to new universal format
    migrateQuestIds();

    // Initialize CourseDataManager for loaded game
    if (typeof CourseDataManager !== 'undefined' && CourseDataManager.initialize) {
      // Get the language from the courseId (format: language_timestamp)
      const language = courseId.split('_')[0];
      CourseDataManager.initialize(language);
      console.log('[loadGame] CourseDataManager initialized for', language);
    }

    // Initialize QuestManager for loaded game
    if (typeof QuestManager !== 'undefined' && !GameState.questManager) {
      // Get the language from the courseId
      const language = courseId.split('_')[0];
      GameState.questManager = new QuestManager(GameState);
      GameState.questManager.loadCourseQuests(language);
      console.log('[loadGame] QuestManager initialized for', language);
    }

    // Initialize MilestoneManager for loaded game
    if (typeof MilestoneManager !== 'undefined') {
      window.milestoneManager = new MilestoneManager(GameState);
      console.log('[loadGame] MilestoneManager initialized');
    }

    // Initialize StatsManager for loaded game
    if (typeof StatsManager !== 'undefined') {
      window.statsManager = new StatsManager(GameState);
      console.log('[loadGame] StatsManager initialized');
    }

    // Initialize AchievementManager for loaded game
    if (typeof AchievementManager !== 'undefined') {
      window.achievementManager = new AchievementManager(GameState);
      console.log('[loadGame] AchievementManager initialized');
    }

    // Initialize CurrencyManager for loaded game
    if (typeof CurrencyManager !== 'undefined') {
      window.currencyManager = new CurrencyManager(GameState);
      console.log('[loadGame] CurrencyManager initialized');
    }

    // Initialize TitleManager for loaded game
    if (typeof TitleManager !== 'undefined') {
      window.titleManager = new TitleManager(GameState);
      console.log('[loadGame] TitleManager initialized');
    }

    // Initialize ItemManager for loaded game
    if (typeof ItemManager !== 'undefined' && typeof GAME_DATA !== 'undefined') {
      // Merge resource items with game data items
      const allItems = {
        ...GAME_DATA.items,
        ...(typeof RESOURCE_ITEMS !== 'undefined' ? RESOURCE_ITEMS : {})
      };
      window.itemManager = new ItemManager(GameState, allItems);
      console.log('[loadGame] ItemManager initialized with', Object.keys(allItems).length, 'items');
    }

    // Initialize ShopManager for loaded game
    if (typeof ShopManager !== 'undefined') {
      window.shopManager = new ShopManager(GameState, SHOP_DEFINITIONS, window.itemManager);
      console.log('[loadGame] ShopManager initialized');
    }

    // Initialize HintManager for loaded game
    if (typeof HintManager !== 'undefined') {
      window.hintManager = new HintManager(GameState, window.statsManager, window.itemManager);
      console.log('[loadGame] HintManager initialized');
    }

    // Initialize ReputationManager for loaded game
    if (typeof ReputationManager !== 'undefined') {
      window.reputationManager = new ReputationManager(GameState);
      console.log('[loadGame] ReputationManager initialized');
    }

    // Initialize VillageProjectsManager for loaded game
    if (typeof VillageProjectsManager !== 'undefined') {
      window.villageProjectsManager = new VillageProjectsManager(GameState);
      console.log('[loadGame] VillageProjectsManager initialized');
    }

    // Initialize EnhancementManager for loaded game
    if (typeof EnhancementManager !== 'undefined') {
      window.enhancementManager = new EnhancementManager(GameState);
      console.log('[loadGame] EnhancementManager initialized');
    }

    // Initialize LocationManager for loaded game
    if (typeof LocationManager !== 'undefined') {
      window.locationManager = new LocationManager(GameState);
      // Discover connected locations and check level unlocks
      locationManager.checkQuestBasedDiscovery();
      locationManager.checkLevelUnlocks();
      console.log('[loadGame] LocationManager initialized');
    }

    // Initialize TradeNetworkManager for loaded game
    if (typeof initTradeNetwork === 'function') {
      initTradeNetwork(GameState);
      console.log('[loadGame] TradeNetworkManager initialized');
    }

    // Initialize Spellbook for loaded game
    if (typeof initSpellbook === 'function') {
      initSpellbook(GameState);
      console.log('[loadGame] Spellbook initialized');
    }

    return true;
  } catch (e) {
    console.error('[Load] Failed:', e);
    return false;
  }
}

