// ByteQuest - Core Utilities
// Extracted from game.js (lines 5667-5832, 7971-8001)

// =====================================================
// Utility Functions
// =====================================================

function showNotification(message, type = 'info') {
  // Get or create notification container for proper stacking
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    container.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 3000;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  // Type-specific styling
  const typeStyles = {
    success: {
      bg: 'linear-gradient(135deg, rgba(42, 157, 143, 0.95), rgba(32, 127, 113, 0.95))',
      border: 'var(--accent-green)',
      glow: '0 0 20px rgba(42, 157, 143, 0.4)',
      icon: '✓'
    },
    error: {
      bg: 'linear-gradient(135deg, rgba(230, 57, 70, 0.95), rgba(180, 47, 60, 0.95))',
      border: 'var(--accent-red)',
      glow: '0 0 20px rgba(230, 57, 70, 0.4)',
      icon: '✗'
    },
    info: {
      bg: 'linear-gradient(135deg, rgba(15, 52, 96, 0.95), rgba(22, 33, 62, 0.95))',
      border: 'var(--accent-blue)',
      glow: '0 0 15px rgba(67, 97, 238, 0.3)',
      icon: 'ℹ'
    }
  };

  const style = typeStyles[type] || typeStyles.info;

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.cssText = `
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    background: ${style.bg};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 2px solid ${style.border};
    border-radius: 8px;
    font-family: var(--font-display);
    font-size: 14px;
    color: var(--text-light);
    box-shadow: ${style.glow}, 0 4px 20px rgba(0, 0, 0, 0.3);
    pointer-events: auto;
    min-width: 220px;
    max-width: 400px;
    animation: slideInRight 0.3s ease-out;
    cursor: pointer;
  `;

  notification.innerHTML = `
    <span style="font-size: 18px; flex-shrink: 0;">${style.icon}</span>
    <span style="flex: 1;">${message}</span>
  `;

  // Click to dismiss
  notification.addEventListener('click', () => {
    notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
    setTimeout(() => notification.remove(), 300);
  });

  container.appendChild(notification);

  // Auto-dismiss after 8 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
      setTimeout(() => notification.remove(), 300);
    }
  }, 8000);
}

/**
 * WoW-style Achievement Toast - Special dramatic notification for achievements
 */
function showAchievementToast(achievement, rewards = []) {
  // Remove any existing achievement toast
  const existing = document.getElementById('achievement-toast');
  if (existing) existing.remove();

  // Format rewards text
  let rewardsHtml = '';
  if (rewards.length > 0) {
    const rewardTexts = rewards.map(r => {
      if (r.type === 'stat') return `+${r.amount} ${r.statName}`;
      if (r.type === 'title') return `Title: ${r.title}`;
      if (r.type === 'gold') return `+${r.amount} Gold`;
      return '';
    }).filter(Boolean);
    if (rewardTexts.length > 0) {
      rewardsHtml = `<div class="achievement-toast-rewards">${rewardTexts.join(' • ')}</div>`;
    }
  }

  const toast = document.createElement('div');
  toast.id = 'achievement-toast';
  toast.className = 'achievement-toast';
  toast.innerHTML = `
    <div class="achievement-toast-glow"></div>
    <div class="achievement-toast-frame">
      <div class="achievement-toast-header">
        <span class="achievement-toast-label">Achievement Unlocked</span>
      </div>
      <div class="achievement-toast-content">
        <div class="achievement-toast-icon">${achievement.icon || '🏆'}</div>
        <div class="achievement-toast-info">
          <div class="achievement-toast-name">${achievement.name}</div>
          <div class="achievement-toast-desc">${achievement.description || ''}</div>
          ${rewardsHtml}
        </div>
      </div>
      <div class="achievement-toast-shine"></div>
    </div>
  `;

  document.body.appendChild(toast);

  // Play sound if available
  if (typeof AudioManager !== 'undefined' && AudioManager.playSFX) {
    AudioManager.playSFX('achievement');
  }

  // Auto-remove after animation
  setTimeout(() => {
    toast.classList.add('achievement-toast-exit');
    setTimeout(() => toast.remove(), 500);
  }, 5000);

  // Click to dismiss
  toast.addEventListener('click', () => {
    toast.classList.add('achievement-toast-exit');
    setTimeout(() => toast.remove(), 500);
  });
}

/**
 * Show title unlock toast - similar to achievement but for titles
 */
function showTitleUnlockToast(titleName, effects = null) {
  showAchievementToast({
    icon: '👑',
    name: titleName,
    description: effects ? `${formatTitleEffects(effects)}` : 'New title available!'
  }, []);
}

// =====================================================
// Reputation Helpers
// =====================================================

function addReputationWithNotification(factionId, amount) {
  if (!reputationManager) return null;

  const result = reputationManager.addReputation(factionId, amount);

  if (result) {
    // Show reputation gain notification
    showNotification(`+${result.change} ${result.factionName} reputation`, 'info');

    // Show rank up notification if applicable
    if (result.rankIncreased) {
      setTimeout(() => {
        showNotification(`🎉 ${result.factionName}: ${result.newRank.name}!`, 'success');
      }, 500);

      // Check if this triggers any achievements or milestones
      checkAchievements();
      checkMilestones();
    }

    // Check for reputation-based artifact unlocks
    checkReputationArtifacts(factionId, result.newTotal);
  }

  return result;
}

// =====================================================
// Common Helper Functions
// =====================================================

/**
 * Escape HTML special characters to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text safe for HTML insertion
 */
function escapeHtml(text) {
  if (typeof text !== 'string') return text;
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Get NPC data by ID
 * @param {string} npcId - NPC identifier
 * @returns {object|null} NPC definition or null if not found
 */
function getNPC(npcId) {
  if (!npcId) return null;
  return GAME_DATA?.npcs?.[npcId] || null;
}

// Make helpers globally accessible
window.escapeHtml = escapeHtml;
window.getNPC = getNPC;
