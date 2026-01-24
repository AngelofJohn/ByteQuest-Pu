// ByteQuest - Profile Screens
// Extracted from game.js (lines 7406-7589, 7590-7970)

// =====================================================
// Profile Screen
// =====================================================

function showProfileScreen() {
  const player = GameState.player;
  if (!player) {
    showNotification('Player data not available', 'error');
    return;
  }

  const stats = (typeof statsManager !== 'undefined' && statsManager) ? statsManager.getAllStats() : {};
  const majorStats = (typeof statsManager !== 'undefined' && statsManager) ? statsManager.getMajorStats() : [];
  const minorStats = (typeof statsManager !== 'undefined' && statsManager) ? statsManager.getMinorStats() : [];
  const activeTitle = (typeof statsManager !== 'undefined' && statsManager) ? statsManager.getActiveTitle() : null;

  // Get earned titles for dropdown
  const earnedTitles = (typeof titleManager !== 'undefined' && titleManager) ? titleManager.getEarnedTitles() : [];
  const equippedTitleId = (typeof titleManager !== 'undefined' && titleManager) ? titleManager.getEquippedTitleId() : null;
  
  // Equipment display
  const equipSlots = ['helm', 'armor', 'weapon', 'accessory', 'ring'];
  const equipmentHtml = equipSlots.map(slot => {
    const itemId = player.equipment[slot];
    const item = itemId ? GAME_DATA.items[itemId] : null;
    return `
      <div class="profile-equip-slot">
        <div class="profile-equip-icon">${item ? item.icon : '—'}</div>
        <div class="profile-equip-name">${item ? item.name : slot.charAt(0).toUpperCase() + slot.slice(1)}</div>
      </div>
    `;
  }).join('');
  
  // Major stats display with tooltips
  const majorStatsHtml = majorStats.map(stat => `
    <div class="profile-stat" data-stat-tooltip="${stat.definition.id}">
      <span class="profile-stat-icon">${stat.definition.icon}</span>
      <span class="profile-stat-name">${stat.definition.name}</span>
      <span class="profile-stat-value">${stat.base}${stat.bonus > 0 ? ` <span class="stat-bonus">+${stat.bonus}</span>` : ''}</span>
      <div class="profile-stat-desc">${stat.definition.description || ''}</div>
    </div>
  `).join('');
  
  // Minor stats display with tooltips
  const minorStatsHtml = minorStats.map(stat => `
    <div class="profile-stat minor" data-stat-tooltip="${stat.definition.id}">
      <span class="profile-stat-icon">${stat.definition.icon}</span>
      <span class="profile-stat-name">${stat.definition.name}</span>
      <span class="profile-stat-value">${stat.base}${stat.bonus > 0 ? ` <span class="stat-bonus">+${stat.bonus}</span>` : ''}</span>
      <div class="profile-stat-desc">${stat.definition.description || ''}</div>
    </div>
  `).join('');
  
  // Class icon
  const classIcons = { sage: '📚', protector: '🛡️', pathfinder: '🧭', cleric: '✝️' };
  const classIcon = classIcons[player.class] || '👤';
  
  // Build title dropdown options
  const defaultTitle = player.class?.charAt(0).toUpperCase() + player.class?.slice(1) || 'Adventurer';
  let titleOptionsHtml = `<option value="">< ${defaultTitle} ></option>`;
  earnedTitles.forEach(title => {
    const selected = title.id === equippedTitleId ? 'selected' : '';
    const effectText = title.effects ? ` (${formatTitleEffects(title.effects)})` : '';
    titleOptionsHtml += `<option value="${title.id}" ${selected}>${title.name}${effectText}</option>`;
  });

  const hasTitles = earnedTitles.length > 0;

  showModal('profile-modal', `
    <div class="profile-screen">
      <div class="profile-header">
        <div class="profile-avatar">${classIcon}</div>
        <div class="profile-identity">
          <div class="profile-name">
            ${player.name || 'Traveler'}
            <button class="edit-name-btn" onclick="editPlayerName()" title="Change Name">✏️</button>
          </div>
          <div class="profile-title-container">
            ${hasTitles ? `
              <select class="profile-title-dropdown" id="title-dropdown" onchange="changeActiveTitle(this.value)">
                ${titleOptionsHtml}
              </select>
            ` : `
              <div class="profile-title">${activeTitle || defaultTitle}</div>
            `}
          </div>
          <div class="profile-level">Level ${player.level}</div>
        </div>
      </div>
      
      <div class="profile-sections">
        <div class="profile-section">
          <div class="profile-section-title">MAJOR STATS</div>
          <div class="profile-stats-grid">
            ${majorStatsHtml}
          </div>
        </div>
        
        <div class="profile-section">
          <div class="profile-section-title">MINOR STATS</div>
          <div class="profile-stats-grid minor">
            ${minorStatsHtml}
          </div>
        </div>
        
        <div class="profile-section">
          <div class="profile-section-title">EQUIPMENT</div>
          <div class="profile-equipment">
            ${equipmentHtml}
          </div>
        </div>
      </div>
      
      <div style="text-align: right; margin-top: 16px;">
        <button class="pixel-btn" onclick="showCosmeticsScreen()">Cosmetics</button>
        <button class="pixel-btn" onclick="hideModal('profile-modal')">Close</button>
      </div>
    </div>
  `);

  // Bind tooltips to stats after modal renders
  setTimeout(() => {
    const modal = document.getElementById('profile-modal');
    if (modal && typeof TooltipSystem !== 'undefined') {
      TooltipSystem.bindStats(modal);
    }
  }, 0);

  // Tutorial: First time viewing stats
  if (shouldShowTutorial('viewedStats')) {
    markTutorialComplete('viewedStats');
    setTimeout(() => {
      showTutorialTip('viewStats', '.profile-stats-grid', () => {});
    }, 300);
  }
}

/**
 * Change the player's active title
 */
function changeActiveTitle(titleId) {
  if (!titleManager) {
    showNotification('Title system not available', 'error');
    return;
  }

  const result = titleManager.equipTitle(titleId || null);

  if (result.success) {
    const titleName = titleId ? titleManager.getTitle(titleId)?.name : 'default title';
    showNotification(titleId ? `Equipped: ${titleName}` : 'Title unequipped', 'success');
    renderHUD(); // Update HUD if title is shown there
    autoSave();
  } else {
    showNotification(result.message || 'Failed to change title', 'error');
  }
}

/**
 * Format title effects for display in dropdown
 */
function formatTitleEffects(effects) {
  if (!effects) return '';

  const parts = [];

  if (effects.xpBonus) {
    parts.push(`+${Math.floor(effects.xpBonus * 100)}% XP`);
  }
  if (effects.goldBonus) {
    parts.push(`+${Math.floor(effects.goldBonus * 100)}% Gold`);
  }
  if (effects.reputationBonus) {
    parts.push(`+${Math.floor(effects.reputationBonus * 100)}% Rep`);
  }
  if (effects.hintBonus) {
    parts.push(`+${effects.hintBonus} Hints`);
  }
  if (effects.statBonus) {
    Object.entries(effects.statBonus).forEach(([stat, value]) => {
      parts.push(`+${value} ${stat.charAt(0).toUpperCase() + stat.slice(1)}`);
    });
  }

  return parts.join(', ');
}


// =====================================================
// Progress Screen (Milestones, Achievements, Learning)
// =====================================================

let progressTab = 'milestones';

function showProgressScreen() {
  renderProgressScreen();
}

function renderProgressScreen() {
  if (!GameState.player) {
    showModal('progress-modal', '<p>Player data not available</p>');
    return;
  }
  
  const tabsHtml = `
    <div class="progress-tabs">
      <button class="progress-tab ${progressTab === 'milestones' ? 'active' : ''}" onclick="setProgressTab('milestones')">Milestones</button>
      <button class="progress-tab ${progressTab === 'achievements' ? 'active' : ''}" onclick="setProgressTab('achievements')">Achievements</button>
      <button class="progress-tab ${progressTab === 'reputation' ? 'active' : ''}" onclick="setProgressTab('reputation')">Reputation</button>
      <button class="progress-tab ${progressTab === 'skills' ? 'active' : ''}" onclick="setProgressTab('skills')">Skills</button>
      <button class="progress-tab ${progressTab === 'learning' ? 'active' : ''}" onclick="setProgressTab('learning')">Learning</button>
    </div>
  `;

  let contentHtml = '';

  switch (progressTab) {
    case 'milestones':
      contentHtml = renderMilestonesTab();
      break;
    case 'achievements':
      contentHtml = renderAchievementsTab();
      break;
    case 'reputation':
      contentHtml = renderReputationTab();
      break;
    case 'skills':
      contentHtml = renderSkillsTab();
      break;
    case 'learning':
      contentHtml = renderLearningTab();
      break;
  }
  
  showModal('progress-modal', `
    <div class="progress-screen">
      <h2 style="font-family: var(--font-display); font-size: 14px; color: var(--accent-gold); margin-bottom: 16px; text-align: center;">
        PROGRESS
      </h2>
      ${tabsHtml}
      <div class="progress-content">
        ${contentHtml}
      </div>
      <div style="text-align: right; margin-top: 16px;">
        <button class="pixel-btn" onclick="hideModal('progress-modal')">Close</button>
      </div>
    </div>
  `);
}

function setProgressTab(tab) {
  progressTab = tab;
  renderProgressScreen();

  // Tutorial: First time viewing reputation tab
  if (tab === 'reputation' && shouldShowTutorial('viewedReputation')) {
    markTutorialComplete('viewedReputation');
    setTimeout(() => {
      showTutorialTip('viewReputation', '.reputation-item', () => {});
    }, 300);
  }
}

function renderMilestonesTab() {
  // Prefer milestoneManager directly, fallback to statsManager delegation
  let milestones = [];
  if (typeof milestoneManager !== 'undefined' && milestoneManager) {
    milestones = milestoneManager.getAllMilestoneProgress();
  } else if (typeof statsManager !== 'undefined' && statsManager) {
    milestones = statsManager.getAllMilestoneProgress();
  } else {
    return '<p>Milestone system not initialized.</p>';
  }

  // Filter out null progress entries
  milestones = milestones.filter(p => p !== null);

  if (milestones.length === 0) {
    return '<p class="empty-message">No milestones available.</p>';
  }

  return milestones.map(progress => {
    const milestone = progress.milestone;
    const currentTier = progress.currentTier;
    const nextTier = progress.nextTier;
    
    // Calculate progress bar
    // If there's an unclaimed reward, show progress toward the UNCLAIMED tier (not next tier)
    // This makes the bar fill to 100% when reward is ready
    let progressPercent = 0;
    let progressText = '';
    let claimable = progress.hasUnclaimedReward;

    if (claimable) {
      // Show the completed tier's progress (100% since we reached it)
      const unclaimedTierIndex = progress.claimedTier + 1;
      const unclaimedTier = milestone.tiers[unclaimedTierIndex];
      if (unclaimedTier) {
        progressPercent = 100;
        progressText = `${progress.currentValue} / ${unclaimedTier.threshold} ✓`;
      }
    } else if (progress.isMaxed) {
      progressPercent = 100;
      progressText = 'MAXED';
    } else if (nextTier) {
      progressPercent = Math.min(100, (progress.currentValue / nextTier.threshold) * 100);
      progressText = `${progress.currentValue} / ${nextTier.threshold}`;
    }
    
    return `
      <div class="milestone-item ${claimable ? 'claimable' : ''}">
        <div class="milestone-header">
          <span class="milestone-icon">${milestone.icon}</span>
          <span class="milestone-name">${milestone.name}</span>
          ${currentTier ? `<span class="milestone-tier">${currentTier.label}</span>` : ''}
        </div>
        <div class="milestone-desc">${milestone.description}</div>
        <div class="milestone-progress-bar">
          <div class="milestone-progress-fill" style="width: ${progressPercent}%"></div>
          <span class="milestone-progress-text">${progressText}</span>
        </div>
        ${claimable ? `<button class="pixel-btn pixel-btn-gold milestone-claim-btn" onclick="claimMilestoneReward('${milestone.id}')">Claim Reward</button>` : ''}
      </div>
    `;
  }).join('');
}

function renderAchievementsTab() {
  if (typeof achievementManager === 'undefined' || !achievementManager) {
    return '<p>Achievement system not initialized.</p>';
  }

  const achievements = achievementManager.getVisibleAchievements();
  
  return `
    <div class="achievements-grid">
      ${achievements.map(a => {
        const achievement = a.achievement;
        return `
          <div class="achievement-item ${a.unlocked ? 'unlocked' : 'locked'}">
            <div class="achievement-icon">${a.unlocked ? achievement.icon : '❓'}</div>
            <div class="achievement-info">
              <div class="achievement-name">${a.unlocked ? achievement.name : '???'}</div>
              <div class="achievement-desc">${a.unlocked ? achievement.description : 'Keep playing to discover...'}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderLearningTab() {
  const player = GameState.player;
  const vocabCount = Object.keys(player.vocabulary || {}).length;
  
  // Get mastery breakdown if spaced repetition manager exists
  let masteryBreakdown = '';
  if (typeof srManager !== 'undefined' && srManager && srManager.getMasteryStats) {
    const stats = srManager.getMasteryStats();
    masteryBreakdown = `
      <div class="learning-mastery">
        <div class="mastery-row"><span class="mastery-label">New</span><span class="mastery-value">${stats[0] || 0}</span></div>
        <div class="mastery-row"><span class="mastery-label">Learning</span><span class="mastery-value">${stats[1] || 0}</span></div>
        <div class="mastery-row"><span class="mastery-label">Familiar</span><span class="mastery-value">${stats[2] || 0}</span></div>
        <div class="mastery-row"><span class="mastery-label">Practiced</span><span class="mastery-value">${stats[3] || 0}</span></div>
        <div class="mastery-row"><span class="mastery-label">Known</span><span class="mastery-value">${stats[4] || 0}</span></div>
        <div class="mastery-row"><span class="mastery-label">Mastered</span><span class="mastery-value">${stats[5] || 0}</span></div>
      </div>
    `;
  }
  
  // Calculate accuracy
  const totalAnswers = player.totalCorrectAnswers + player.totalWrongAnswers;
  const accuracy = totalAnswers > 0 ? Math.round((player.totalCorrectAnswers / totalAnswers) * 100) : 0;
  
  return `
    <div class="learning-stats">
      <div class="learning-stat-card">
        <div class="learning-stat-value">${vocabCount}</div>
        <div class="learning-stat-label">Words Learned</div>
      </div>
      <div class="learning-stat-card">
        <div class="learning-stat-value">${player.lessonsCompleted || 0}</div>
        <div class="learning-stat-label">Lessons Completed</div>
      </div>
      <div class="learning-stat-card">
        <div class="learning-stat-value">${accuracy}%</div>
        <div class="learning-stat-label">Accuracy</div>
      </div>
      <div class="learning-stat-card">
        <div class="learning-stat-value">${player.longestStreak || 0}</div>
        <div class="learning-stat-label">Best Streak</div>
      </div>
    </div>
    
    <div class="learning-section-title">MASTERY BREAKDOWN</div>
    ${masteryBreakdown}
  `;
}

function renderSkillsTab() {
  const player = GameState.player;
  const MAX_SKILL_LEVEL = 50;

  // Define all skills with their icons and categories
  const gatheringSkills = [
    { id: 'mining', name: 'Mining', icon: '⛏️' },
    { id: 'woodcutting', name: 'Woodcutting', icon: '🪓' },
    { id: 'herbalism', name: 'Herbalism', icon: '🌿' },
    { id: 'fishing', name: 'Fishing', icon: '🎣' },
    { id: 'hunting', name: 'Hunting', icon: '🏹' }
  ];

  const craftingSkills = [
    { id: 'alchemy', name: 'Alchemy', icon: '⚗️' },
    { id: 'smithing', name: 'Smithing', icon: '🔨' },
    { id: 'enchanting', name: 'Enchanting', icon: '✨' }
  ];

  const renderSkillRow = (skill) => {
    const skillData = player.skills?.[skill.id] || { level: 1, xp: 0 };
    const level = skillData.level || 1;
    const xp = skillData.xp || 0;
    const isMaxed = level >= MAX_SKILL_LEVEL;
    const progressPercent = isMaxed ? 100 : Math.min(100, (xp / getSkillXPForLevel(level)) * 100);

    return `
      <div class="skill-row ${isMaxed ? 'maxed' : ''}">
        <div class="skill-row-icon">${skill.icon}</div>
        <div class="skill-row-info">
          <div class="skill-row-name">${skill.name}</div>
          <div class="skill-row-progress">
            <div class="skill-row-bar">
              <div class="skill-row-fill" style="width: ${progressPercent}%"></div>
            </div>
          </div>
        </div>
        <div class="skill-row-level ${isMaxed ? 'maxed' : ''}">
          ${isMaxed ? '★ ' : ''}${level}
        </div>
      </div>
    `;
  };

  return `
    <div class="skills-section">
      <div class="skills-category-title">⛏️ GATHERING</div>
      <div class="skills-list">
        ${gatheringSkills.map(renderSkillRow).join('')}
      </div>
    </div>

    <div class="skills-section">
      <div class="skills-category-title">🔨 CRAFTING</div>
      <div class="skills-list">
        ${craftingSkills.map(renderSkillRow).join('')}
      </div>
    </div>

    <div class="skills-note">
      Skills increase as you practice. Max level: ${MAX_SKILL_LEVEL}
    </div>
  `;
}

// Helper for skill XP requirements
function getSkillXPForLevel(level) {
  // Same formula as crafting skills: 100 * level
  return 100 * level;
}

function renderReputationTab() {
  if (!reputationManager) return '<p>Reputation system not initialized.</p>';

  const allFactions = reputationManager.getAllFactionsWithDiscoveryStatus();
  const majorFactions = allFactions.filter(s => s.faction.type === 'major');
  const minorFactions = allFactions.filter(s => s.faction.type === 'minor');

  const renderFactionItem = (status) => {
    const faction = status.faction;

    // Undiscovered faction - show mystery entry
    if (!status.discovered) {
      return `
        <div class="reputation-item reputation-undiscovered">
          <div class="reputation-header">
            <span class="reputation-icon" style="background: #444;">❓</span>
            <div class="reputation-info">
              <div class="reputation-name">???</div>
              <div class="reputation-rank">Not Yet Discovered</div>
            </div>
          </div>
          <div class="reputation-bar-container">
            <div class="reputation-bar-fill" style="width: 0%; background: #444;"></div>
            <span class="reputation-bar-text">? / ?</span>
          </div>
        </div>
      `;
    }

    // Discovered faction - show full details
    const maxRep = reputationManager.getMaxRank(faction.id).reputation;

    return `
      <div class="reputation-item">
        <div class="reputation-header">
          <span class="reputation-icon" style="background: ${faction.color};">${faction.icon}</span>
          <div class="reputation-info">
            <div class="reputation-name">${faction.name}</div>
            <div class="reputation-rank">${status.currentRank.name}</div>
          </div>
        </div>
        <div class="reputation-bar-container">
          <div class="reputation-bar-fill" style="width: ${status.isMaxed ? 100 : status.progress}%; background: ${faction.color};"></div>
          <span class="reputation-bar-text">${status.reputation} / ${status.isMaxed ? maxRep : status.nextRank.reputation}</span>
        </div>
        ${status.isMaxed ? '<div class="reputation-maxed">MAX RANK</div>' : ''}
      </div>
    `;
  };

  return `
    <div class="reputation-section">
      <div class="reputation-section-title">MAJOR FACTIONS</div>
      ${majorFactions.length > 0 ? majorFactions.map(renderFactionItem).join('') : '<p class="no-factions">No major factions discovered yet.</p>'}
    </div>

    <div class="reputation-section">
      <div class="reputation-section-title">MINOR FACTIONS</div>
      ${minorFactions.length > 0 ? minorFactions.map(renderFactionItem).join('') : '<p class="no-factions">No minor factions discovered yet.</p>'}
    </div>
  `;
}

function claimMilestoneReward(milestoneId) {
  console.log('claimMilestoneReward called with:', milestoneId);

  // Prefer milestoneManager directly, fallback to statsManager delegation
  const manager = (typeof milestoneManager !== 'undefined' && milestoneManager)
    ? milestoneManager
    : (typeof statsManager !== 'undefined' ? statsManager : null);

  if (!manager) {
    console.error('No milestone/stats manager initialized');
    showNotification('Error: Milestone system not ready', 'error');
    return;
  }

  if (!milestoneId) {
    console.error('No milestoneId provided');
    showNotification('Error: Invalid milestone', 'error');
    return;
  }

  console.log('Before claim - claimedMilestones:', JSON.stringify(GameState.player.claimedMilestones));

  const rewards = manager.claimMilestoneReward(milestoneId);

  console.log('After claim - rewards:', rewards);
  console.log('After claim - claimedMilestones:', JSON.stringify(GameState.player.claimedMilestones));

  // If claim returned null, nothing to do
  if (rewards === null) {
    console.log('Claim returned null - milestone may already be claimed or not ready');
    showNotification('No rewards to claim', 'warning');
    return;
  }

  // Show notifications for each reward
  if (rewards.length > 0) {
    rewards.forEach(reward => {
      if (reward.type === 'stat') {
        showNotification(`+${reward.amount} ${reward.statName}!`, 'success');
      }
      if (reward.type === 'title') {
        const titleDef = typeof TITLE_DEFINITIONS !== 'undefined' ? TITLE_DEFINITIONS[reward.title] : null;
        const titleName = titleDef ? titleDef.name : reward.title;
        showNotification(`Title Unlocked: ${titleName}!`, 'success');
      }
    });
  }

  // Always refresh and save after successful claim (even if rewards array was empty)
  console.log('Refreshing progress screen...');
  renderProgressScreen();
  autoSave();
}

// =====================================================
// Edit Player Name
// =====================================================

function editPlayerName() {
  const currentName = GameState.player.name;

  showModal('edit-name-modal', `
    <h2 style="font-family: var(--font-display); font-size: 16px; color: var(--accent-gold); margin-bottom: 16px; text-align: center;">
      Change Your Name
    </h2>
    <p style="text-align: center; font-size: 11px; color: var(--text-dim); margin-bottom: 16px;">
      This will update your name across all language courses.
    </p>
    <div style="margin-bottom: 24px; text-align: center;">
      <input type="text" class="name-input" id="new-name-input" placeholder="Enter new name..." maxlength="20" value="${currentName}">
      <div id="edit-name-error" class="validation-message" style="display: none;">
        <span class="validation-icon">⚠️</span> Please enter a valid name
      </div>
    </div>
    <div style="text-align: center; display: flex; gap: 12px; justify-content: center;">
      <button class="art-btn" onclick="hideModal('edit-name-modal')">Cancel</button>
      <button class="art-btn art-btn-gold" id="save-name-btn">Save</button>
    </div>
  `);

  const nameInput = document.getElementById('new-name-input');
  const errorDiv = document.getElementById('edit-name-error');
  nameInput.focus();
  nameInput.select();

  document.getElementById('save-name-btn').addEventListener('click', () => {
    const newName = nameInput.value.trim();

    if (!newName) {
      errorDiv.style.display = 'block';
      nameInput.focus();
      return;
    }

    // Update global name
    localStorage.setItem('bytequest_player_name', newName);

    // Update name in current save
    GameState.player.name = newName;
    saveGame();

    // Close modal and refresh profile
    hideModal('edit-name-modal');
    showNotification(`Name changed to ${newName}`, 'success');
    showProfileScreen();
  });
}

// =====================================================
// Window Exports (for onclick handlers)
// =====================================================

window.showProfileScreen = showProfileScreen;
window.showProgressScreen = showProgressScreen;
window.setProgressTab = setProgressTab;
window.claimMilestoneReward = claimMilestoneReward;
window.editPlayerName = editPlayerName;

// equipTitleFromDropdown - handled by titleManager if available
window.equipTitleFromDropdown = function(titleId) {
  if (typeof titleManager !== 'undefined' && titleManager && titleManager.equipTitle) {
    titleManager.equipTitle(titleId);
    showProfileScreen(); // Refresh profile
  }
};

