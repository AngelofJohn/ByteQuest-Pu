// ByteQuest - Tutorial System
// Extracted from game.js (lines 5833-6603)

// =====================================================
// Tutorial System
// =====================================================

const TutorialTips = {
  // === CORE TUTORIAL FLOW (shown in order) ===
  welcomeToDawnmere: {
    icon: '👋',
    title: 'Welcome to Dawnmere',
    content: 'Click on characters with names to talk to them. Start by speaking with Isora, the village elder!',
    position: 'bottom'
  },
  acceptQuest: {
    icon: '📜',
    title: 'Quests',
    content: 'Quests give you goals and rewards. Click "Accept" to take on this quest!',
    position: 'left'
  },
  lessonBasics: {
    icon: '📚',
    title: 'Vocabulary Lessons',
    content: 'Select the correct translation. Wrong answers cost HP! Use number keys 1-4 for quick answers.',
    position: 'top'
  },
  wrongAnswer: {
    icon: '❤️',
    title: 'Watch Your Health!',
    content: 'Wrong answers cost HP. If you run out, you\'ll need to recover before continuing.',
    position: 'top'
  },
  questComplete: {
    icon: '🎉',
    title: 'Quest Complete!',
    content: 'You earned XP, gold, and reputation! Keep completing quests to level up and unlock new areas.',
    position: 'bottom'
  },
  useHint: {
    icon: '💡',
    title: 'Need Help?',
    content: 'Click the hint button to reveal part of the answer. Your Insight stat gives more hint charges!',
    position: 'top'
  },
  practiceReview: {
    icon: '🔄',
    title: 'Practice Makes Perfect',
    content: 'Review words you\'ve learned to keep them fresh. Spaced repetition helps you remember long-term!',
    position: 'bottom'
  },

  // === SECONDARY TUTORIALS (UI features) ===
  questPanel: {
    icon: '📋',
    title: 'Quest Log',
    content: 'Click the Quests button to view your active quests and objectives.',
    position: 'right'
  },
  viewStats: {
    icon: '📊',
    title: 'Your Stats',
    content: 'Stats affect your gameplay! Stamina adds HP, Strength reduces damage, Agility protects streaks, Insight grants hints, Luck gives shop discounts, Devotion boosts reputation, Knowledge retains mastery.',
    position: 'bottom'
  },
  viewReputation: {
    icon: '🏛️',
    title: 'Reputation',
    content: 'Build reputation with factions by completing quests. Higher standing unlocks shop discounts, special quests, unique items, and titles!',
    position: 'bottom'
  },
  gathering: {
    icon: '⛏️',
    title: 'Gathering Resources',
    content: 'Gathering minigames use French vocabulary! The better you know the words, the more resources you collect. Use these resources for crafting and village projects.',
    position: 'bottom'
  },
  spellbook: {
    icon: '📖',
    title: 'Your Spellbook',
    content: 'The Spellbook contains grammar references and lore pages you unlock through quests. Press S or click the Spellbook button in the sidebar to review what you\'ve learned!',
    position: 'right'
  },

  // === FUTURE TUTORIALS (not currently triggered) ===
  mapTravel: {
    icon: '🗺️',
    title: 'World Map',
    content: 'Click on unlocked locations to travel. New areas unlock as you complete quests and build reputation.',
    position: 'bottom'
  },
  villageProjects: {
    icon: '🏗️',
    title: 'Village Projects',
    content: 'Contribute resources to village projects to unlock permanent bonuses for everyone!',
    position: 'bottom'
  }
};

function showTutorialTip(tipId, targetSelector, onComplete) {
  // Ensure tutorial state exists
  if (!GameState.tutorial) {
    GameState.tutorial = { skipAll: false, shownTips: [], currentTip: null, completed: {} };
  }
  if (!GameState.tutorial.shownTips) {
    GameState.tutorial.shownTips = [];
  }

  // Skip if tutorials disabled
  if (GameState.tutorial.skipAll) return;

  // Skip if this tip was already shown (shownTips now persisted in GameState)
  if (GameState.tutorial.shownTips.includes(tipId)) return;

  const tip = TutorialTips[tipId];
  if (!tip) return;

  // Mark tip as shown
  GameState.tutorial.shownTips.push(tipId);

  // Remove any existing tip
  hideTutorialTip();

  GameState.tutorial.currentTip = tipId;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'tutorial-overlay';
  overlay.id = 'tutorial-overlay';
  document.body.appendChild(overlay);

  // Find and highlight target
  const target = targetSelector ? document.querySelector(targetSelector) : null;
  if (target) {
    target.classList.add('tutorial-highlight');
  }

  // Create tip popup
  const tipEl = document.createElement('div');
  tipEl.className = 'tutorial-tip';
  tipEl.id = 'tutorial-tip';
  tipEl.setAttribute('data-position', tip.position);
  tipEl.innerHTML = `
    <div class="tutorial-tip-header">
      <span class="tutorial-tip-icon">${tip.icon}</span>
      <span class="tutorial-tip-title">${tip.title}</span>
    </div>
    <div class="tutorial-tip-content">${tip.content}</div>
    <div class="tutorial-tip-footer">
      <button class="tutorial-tip-skip" onclick="skipAllTutorials()">Skip tutorials</button>
      <button class="tutorial-tip-btn" onclick="dismissTutorialTip()">Got it!</button>
    </div>
  `;
  document.body.appendChild(tipEl);

  // Position the tip near target
  if (target) {
    positionTutorialTip(tipEl, target, tip.position);
  } else {
    // Center on screen
    tipEl.style.left = '50%';
    tipEl.style.top = '50%';
    tipEl.style.transform = 'translate(-50%, -50%)';
  }

  // Store callback
  tipEl._onComplete = onComplete;
}

function positionTutorialTip(tipEl, target, position) {
  const targetRect = target.getBoundingClientRect();
  const tipRect = tipEl.getBoundingClientRect();
  const padding = 16;

  let left, top;

  switch (position) {
    case 'bottom':
      left = targetRect.left + (targetRect.width / 2) - (tipRect.width / 2);
      top = targetRect.bottom + padding;
      break;
    case 'top':
      left = targetRect.left + (targetRect.width / 2) - (tipRect.width / 2);
      top = targetRect.top - tipRect.height - padding;
      break;
    case 'left':
      left = targetRect.left - tipRect.width - padding;
      top = targetRect.top + (targetRect.height / 2) - (tipRect.height / 2);
      break;
    case 'right':
      left = targetRect.right + padding;
      top = targetRect.top + (targetRect.height / 2) - (tipRect.height / 2);
      break;
    default:
      left = targetRect.left;
      top = targetRect.bottom + padding;
  }

  // Keep on screen
  left = Math.max(10, Math.min(left, window.innerWidth - tipRect.width - 10));
  top = Math.max(10, Math.min(top, window.innerHeight - tipRect.height - 10));

  tipEl.style.left = `${left}px`;
  tipEl.style.top = `${top}px`;
}

function hideTutorialTip() {
  const tip = document.getElementById('tutorial-tip');
  const overlay = document.getElementById('tutorial-overlay');

  // Remove highlight from any elements
  document.querySelectorAll('.tutorial-highlight').forEach(el => {
    el.classList.remove('tutorial-highlight');
  });

  if (tip) {
    if (tip._onComplete) tip._onComplete();
    tip.remove();
  }
  if (overlay) overlay.remove();

  if (GameState.tutorial) {
    GameState.tutorial.currentTip = null;
  }
}

function dismissTutorialTip() {
  hideTutorialTip();
}

function skipAllTutorials() {
  if (!GameState.tutorial) {
    GameState.tutorial = { skipAll: false, shownTips: [], currentTip: null, completed: {} };
  }
  GameState.tutorial.skipAll = true;
  hideTutorialTip();
  if (typeof showNotification === 'function') {
    showNotification('Tutorials disabled. You can re-enable them in Settings.', 'info');
  }
}

function markTutorialComplete(step) {
  if (!GameState.tutorial) {
    GameState.tutorial = { skipAll: false, shownTips: [], currentTip: null, completed: {} };
  }
  if (!GameState.tutorial.completed) {
    GameState.tutorial.completed = {};
  }
  GameState.tutorial.completed[step] = true;
}

function shouldShowTutorial(step) {
  if (!GameState.tutorial) {
    GameState.tutorial = { skipAll: false, shownTips: [], currentTip: null, completed: {} };
  }
  if (!GameState.tutorial.completed) {
    GameState.tutorial.completed = {};
  }
  return !GameState.tutorial.skipAll &&
         GameState.tutorial.completed[step] !== undefined &&
         !GameState.tutorial.completed[step];
}

function showTutorialHighlight(selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.classList.add('tutorial-highlight');
  }
}

function removeTutorialHighlight(selector) {
  if (selector) {
    const el = document.querySelector(selector);
    if (el) el.classList.remove('tutorial-highlight');
  } else {
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
      el.classList.remove('tutorial-highlight');
    });
  }
}

// =====================================================
// Reputation Tutorial System
// =====================================================

/**
 * Show the reputation tutorial modal when player gains reputation for the first time
 * @param {Object} reputationResult - Result object from ReputationManager.addReputation()
 */
function showReputationTutorial(reputationResult) {
  // Ensure tutorial state exists
  if (!GameState.tutorial) {
    GameState.tutorial = { skipAll: false, shownTips: [], currentTip: null, completed: {} };
  }
  // Skip if tutorials disabled
  if (GameState.tutorial.skipAll) return;

  // Mark tutorial as complete immediately to prevent re-triggering
  markTutorialComplete('gainedReputation');

  const { factionName, change, newRep, newRank } = reputationResult;

  // Step 1: Initial reputation gain notification
  showReputationTutorialStep1(factionName, change);
}

function showReputationTutorialStep1(factionName, amount) {
  const content = `
    <div class="tutorial-modal-header">
      <span class="tutorial-modal-icon">&#127969;</span>
      <span class="tutorial-modal-title">Reputation Gained</span>
    </div>
    <div class="tutorial-modal-body">
      <p class="reputation-gain-text">+${amount} Reputation with ${escapeHtml(factionName)}</p>
      <p>The people are starting to trust you!</p>
    </div>
    <div class="tutorial-modal-footer">
      <button class="btn btn-secondary" onclick="showReputationTutorialStep2()">What is Reputation?</button>
      <button class="btn btn-primary" onclick="hideModal('reputation-tutorial-modal')">OK</button>
    </div>
  `;
  showModal('reputation-tutorial-modal', content);
}

function showReputationTutorialStep2() {
  const content = `
    <div class="tutorial-modal-header">
      <span class="tutorial-modal-icon">&#129309;</span>
      <span class="tutorial-modal-title">Reputation</span>
    </div>
    <div class="tutorial-modal-body">
      <p>As you help people and complete quests, you build <strong>REPUTATION</strong> with different factions.</p>
      <p style="margin-top: 12px;">Higher reputation unlocks:</p>
      <ul class="reputation-benefits-list">
        <li><span class="benefit-icon">&#128722;</span> Shop discounts</li>
        <li><span class="benefit-icon">&#128220;</span> Special quests</li>
        <li><span class="benefit-icon">&#127873;</span> Unique items</li>
        <li><span class="benefit-icon">&#127942;</span> Titles and rewards</li>
      </ul>
    </div>
    <div class="tutorial-modal-footer">
      <button class="btn btn-secondary" onclick="showReputationTutorialStep3()">Show Me More</button>
      <button class="btn btn-primary" onclick="hideModal('reputation-tutorial-modal')">Got It</button>
    </div>
  `;
  showModal('reputation-tutorial-modal', content);
}

function showReputationTutorialStep3() {
  // Get current faction status for Dawnmere Settlers (typically first faction)
  let factionHtml = '';
  if (typeof reputationManager !== 'undefined' && reputationManager) {
    const status = reputationManager.getFactionStatus('dawnmere_settlers');
    if (status) {
      const ranks = MINOR_FACTION_RANKS;
      factionHtml = `
        <p style="margin-bottom: 8px;"><strong>${escapeHtml(status.faction.name)}</strong> - Ranks:</p>
        <div class="rank-list">
          ${ranks.map(r => {
            const isCurrent = status.currentRank.rank === r.rank;
            return `<div class="rank-item ${isCurrent ? 'current' : ''}">
              <span class="rank-marker">${isCurrent ? '&#9679;' : '&#9675;'}</span>
              <span class="rank-name">${escapeHtml(r.name)}</span>
              <span class="rank-threshold">(${r.reputation})</span>
            </div>`;
          }).join('')}
        </div>
        <div class="reputation-progress">
          <p>Your standing: ${escapeHtml(status.currentRank.name)} (${status.reputation}${status.nextRank ? '/' + status.nextRank.reputation : ''})</p>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${status.progress}%"></div>
          </div>
          <span class="progress-text">${status.progress}%</span>
        </div>
      `;
    }
  }

  const content = `
    <div class="tutorial-modal-header">
      <span class="tutorial-modal-icon">&#128202;</span>
      <span class="tutorial-modal-title">Faction Ranks</span>
    </div>
    <div class="tutorial-modal-body">
      ${factionHtml || '<p>Help the community to build your standing!</p>'}
    </div>
    <div class="tutorial-modal-footer">
      <button class="btn btn-secondary" onclick="showReputationTutorialStep4()">View All Factions</button>
      <button class="btn btn-primary" onclick="hideModal('reputation-tutorial-modal')">Close</button>
    </div>
  `;
  showModal('reputation-tutorial-modal', content);
}

function showReputationTutorialStep4() {
  // Build faction preview list
  let factionsHtml = '';
  if (typeof FACTION_DEFINITIONS !== 'undefined') {
    const majorFactions = Object.values(FACTION_DEFINITIONS).filter(f => f.type === 'major').slice(0, 5);
    const minorFactions = Object.values(FACTION_DEFINITIONS).filter(f => f.type === 'minor').slice(0, 2);
    const allFactions = [...minorFactions.slice(0, 1), ...majorFactions.slice(0, 4)];

    factionsHtml = allFactions.map(f => `
      <div class="faction-preview-item">
        <span class="faction-icon">${f.icon}</span>
        <span class="faction-name">${escapeHtml(f.name)}</span>
        <span class="faction-desc">- ${escapeHtml(f.description.split('.')[0])}</span>
      </div>
    `).join('');
  }

  const content = `
    <div class="tutorial-modal-header">
      <span class="tutorial-modal-icon">&#127759;</span>
      <span class="tutorial-modal-title">Factions of Orveth</span>
    </div>
    <div class="tutorial-modal-body">
      <p>You will encounter many groups on your journey:</p>
      <div class="faction-preview-list">
        ${factionsHtml}
        <div class="faction-preview-item">
          <span class="faction-icon">...</span>
          <span class="faction-name">and more to discover</span>
        </div>
      </div>
      <p class="faction-warning"><span class="warning-icon">&#128161;</span> Some factions have conflicting goals. Choose wisely!</p>
    </div>
    <div class="tutorial-modal-footer">
      <button class="btn btn-primary" onclick="hideModal('reputation-tutorial-modal')">Close</button>
    </div>
  `;
  showModal('reputation-tutorial-modal', content);
}

function showModal(id, content) {
  let modal = document.getElementById(id);
  if (!modal) {
    modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal-overlay';
    modal.innerHTML = `<div class="modal-content pixel-border">${content}</div>`;
    document.body.appendChild(modal);

    // Click outside to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideModal(id);
      }
    });
  } else if (content !== undefined) {
    // Only update content if explicitly provided
    modal.querySelector('.modal-content').innerHTML = content;
  }

  setTimeout(() => modal.classList.add('active'), 10);
}

function hideModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Make tutorial functions globally accessible
window.showTutorialTip = showTutorialTip;
window.hideTutorialTip = hideTutorialTip;
window.dismissTutorialTip = dismissTutorialTip;
window.skipAllTutorials = skipAllTutorials;
window.showReputationTutorial = showReputationTutorial;
window.markTutorialComplete = markTutorialComplete;
window.shouldShowTutorial = shouldShowTutorial;
window.showTutorialHighlight = showTutorialHighlight;
window.removeTutorialHighlight = removeTutorialHighlight;
window.showReputationTutorialStep1 = showReputationTutorialStep1;
window.showReputationTutorialStep2 = showReputationTutorialStep2;
window.showReputationTutorialStep3 = showReputationTutorialStep3;
window.showReputationTutorialStep4 = showReputationTutorialStep4;

// Modal functions (used by tutorials and other systems)
window.showModal = showModal;
window.hideModal = hideModal;

// Export TutorialTips for reference
window.TutorialTips = TutorialTips;

