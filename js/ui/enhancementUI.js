// ByteQuest - Enhancement UI
// UI for Tier 3 permanent upgrades (Transmutation + Stat Investment)

// =====================================================
// Enhancement Workshop Modal
// =====================================================

function openEnhancementWorkshop() {
  if (!enhancementManager) {
    showNotification("Enhancement system not available!", 'error');
    return;
  }

  renderEnhancementScreen('invest');
}

function renderEnhancementScreen(activeTab = 'invest') {
  if (!enhancementManager) return;

  // Tab navigation
  const tabs = [
    { id: 'invest', name: 'Invest', icon: '📈' },
    { id: 'transmute', name: 'Transmute', icon: '🔄' }
  ];

  const tabsHtml = tabs.map(tab => `
    <button class="enhancement-tab ${activeTab === tab.id ? 'active' : ''}"
            onclick="renderEnhancementScreen('${tab.id}')">
      <span class="tab-icon">${tab.icon}</span>
      <span class="tab-name">${tab.name}</span>
    </button>
  `).join('');

  // Render content based on active tab
  let contentHtml = '';
  if (activeTab === 'invest') {
    contentHtml = renderInvestContent();
  } else {
    contentHtml = renderTransmuteContent();
  }

  showModal('enhancement-modal', `
    <div class="enhancement-screen">
      <div class="enhancement-header">
        <div class="enhancement-title">
          <span class="enhancement-icon">⚡</span>
          <span>Enhancement Workshop</span>
        </div>
        <button class="close-btn" onclick="hideModal('enhancement-modal')">✕</button>
      </div>

      <div class="enhancement-tabs">
        ${tabsHtml}
      </div>

      <div class="enhancement-content">
        ${contentHtml}
      </div>
    </div>
  `);
}

// =====================================================
// Invest Tab (Stat Upgrades)
// =====================================================

function renderInvestContent() {
  const allProgress = enhancementManager.getAllStatProgress();

  // Separate major and minor stats
  const majorStats = allProgress.filter(s => ['stamina', 'strength', 'agility', 'insight'].includes(s.statId));
  const minorStats = allProgress.filter(s => ['luck', 'devotion', 'knowledge'].includes(s.statId));

  const majorHtml = majorStats.map(stat => renderStatCard(stat)).join('');
  const minorHtml = minorStats.map(stat => renderStatCard(stat)).join('');

  return `
    <div class="invest-content">
      <div class="invest-header">
        <p class="invest-description">
          Invest resources to permanently increase your stats. Each level costs more than the last.
        </p>
      </div>

      <div class="stat-section">
        <div class="section-label">Major Stats</div>
        <div class="stat-grid">
          ${majorHtml}
        </div>
      </div>

      <div class="stat-section">
        <div class="section-label">Minor Stats</div>
        <div class="stat-grid">
          ${minorHtml}
        </div>
      </div>
    </div>
  `;
}

function renderStatCard(stat) {
  const progressPercent = stat.progressPercent;
  const costItems = stat.cost ? enhancementManager.formatCost(stat.cost) : [];

  const costHtml = costItems.length > 0 ? costItems.map(item => `
    <span class="cost-item ${item.sufficient ? '' : 'insufficient'}">
      ${item.icon} ${item.amount}
    </span>
  `).join(' ') : '<span class="maxed-text">MAXED</span>';

  const buttonHtml = stat.isMaxed
    ? '<button class="pixel-btn invest-btn maxed" disabled>MAX</button>'
    : `<button class="pixel-btn invest-btn ${stat.canUpgrade ? '' : 'disabled'}"
               onclick="investInStat('${stat.statId}')"
               ${stat.canUpgrade ? '' : 'disabled'}>
         Invest
       </button>`;

  return `
    <div class="stat-card ${stat.isMaxed ? 'maxed' : ''}">
      <div class="stat-header">
        <span class="stat-icon">${stat.icon}</span>
        <span class="stat-name">${stat.name}</span>
        <span class="stat-level">${stat.level}/${stat.maxLevel}</span>
      </div>

      <div class="stat-progress">
        <div class="stat-progress-bar">
          <div class="stat-progress-fill" style="width: ${progressPercent}%"></div>
        </div>
      </div>

      <div class="stat-bonus">
        <span class="bonus-current">+${stat.bonus.toFixed(1)}</span>
        <span class="bonus-per-level">(+${stat.perLevel}/level)</span>
      </div>

      <div class="stat-description">${stat.description}</div>

      <div class="stat-footer">
        <div class="stat-cost">
          ${costHtml}
        </div>
        ${buttonHtml}
      </div>
    </div>
  `;
}

function investInStat(statId) {
  if (!enhancementManager) return;

  const result = enhancementManager.upgradeStat(statId);

  if (result.success) {
    const message = `${result.statName} enhanced to level ${result.newLevel}! (+${result.totalBonus.toFixed(1)} total)`;
    showNotification(message, 'success');

    // Re-render UI
    renderEnhancementScreen('invest');

    // Auto-save
    if (typeof autoSave === 'function') {
      autoSave();
    }
  } else {
    showNotification(result.reason || 'Cannot upgrade this stat', 'error');
  }
}

// =====================================================
// Transmute Tab (Material Conversion)
// =====================================================

function renderTransmuteContent() {
  const transmutations = enhancementManager.getAllTransmutationInfo();
  const categories = enhancementManager.getTransmutationsByCategory();

  // Group by tier (T1->T2 first, then T2->T3)
  const tier1To2 = transmutations.filter(t => {
    const inputData = RESOURCE_ITEMS?.[t.input];
    return inputData?.craftingTier === 1;
  });

  const tier2To3 = transmutations.filter(t => {
    const inputData = RESOURCE_ITEMS?.[t.input];
    return inputData?.craftingTier === 2;
  });

  const tier1Html = tier1To2.map(t => renderTransmuteCard(t)).join('');
  const tier2Html = tier2To3.map(t => renderTransmuteCard(t)).join('');

  return `
    <div class="transmute-content">
      <div class="transmute-header">
        <p class="transmute-description">
          Convert lower-tier materials into higher-tier resources at a 10:1 ratio.
        </p>
      </div>

      <div class="transmute-section">
        <div class="section-label">Tier 1 → Tier 2</div>
        <div class="transmute-grid">
          ${tier1Html || '<p class="no-transmutes">No recipes available</p>'}
        </div>
      </div>

      <div class="transmute-section">
        <div class="section-label">Tier 2 → Tier 3</div>
        <div class="transmute-grid">
          ${tier2Html || '<p class="no-transmutes">No recipes available</p>'}
        </div>
      </div>
    </div>
  `;
}

function renderTransmuteCard(transmute) {
  const categoryInfo = enhancementManager.getCategoryInfo(transmute.category);

  return `
    <div class="transmute-card ${transmute.canTransmute ? '' : 'cannot-transmute'}">
      <div class="transmute-header">
        <span class="category-icon">${categoryInfo.icon}</span>
        <span class="category-name">${categoryInfo.name}</span>
      </div>

      <div class="transmute-flow">
        <div class="transmute-input">
          <span class="item-icon">${transmute.inputIcon}</span>
          <span class="item-name">${transmute.inputName}</span>
          <span class="item-count">(${transmute.inputCount})</span>
        </div>

        <div class="transmute-arrow">
          <span class="ratio">${transmute.ratio}:1</span>
          <span class="arrow">→</span>
        </div>

        <div class="transmute-output">
          <span class="item-icon">${transmute.outputIcon}</span>
          <span class="item-name">${transmute.outputName}</span>
          <span class="item-count">(${transmute.outputCount})</span>
        </div>
      </div>

      <div class="transmute-info">
        <span class="can-make">Can make: ${transmute.maxTransmutes}</span>
      </div>

      <div class="transmute-actions">
        <button class="pixel-btn transmute-btn"
                onclick="doTransmute('${transmute.id}', 1)"
                ${transmute.canTransmute ? '' : 'disabled'}>
          ×1
        </button>
        <button class="pixel-btn transmute-btn transmute-all"
                onclick="doTransmuteAll('${transmute.id}')"
                ${transmute.maxTransmutes > 1 ? '' : 'disabled'}>
          All (${transmute.maxTransmutes})
        </button>
      </div>
    </div>
  `;
}

function doTransmute(recipeId, amount = 1) {
  if (!enhancementManager) return;

  const result = enhancementManager.transmute(recipeId, amount);

  if (result.success) {
    const message = `Transmuted ${result.inputUsed} ${result.recipe.inputName} → ${result.outputGained} ${result.recipe.outputName}`;
    showNotification(message, 'success');

    // Re-render UI
    renderEnhancementScreen('transmute');

    // Auto-save
    if (typeof autoSave === 'function') {
      autoSave();
    }
  } else {
    showNotification(result.reason || 'Cannot transmute', 'error');
  }
}

function doTransmuteAll(recipeId) {
  if (!enhancementManager) return;

  const result = enhancementManager.transmuteAll(recipeId);

  if (result.success) {
    const message = `Transmuted ${result.inputUsed} ${result.recipe.inputName} → ${result.outputGained} ${result.recipe.outputName}`;
    showNotification(message, 'success');

    // Re-render UI
    renderEnhancementScreen('transmute');

    // Auto-save
    if (typeof autoSave === 'function') {
      autoSave();
    }
  } else {
    showNotification(result.reason || 'Cannot transmute', 'error');
  }
}

// =====================================================
// Global Exports
// =====================================================

window.openEnhancementWorkshop = openEnhancementWorkshop;
window.renderEnhancementScreen = renderEnhancementScreen;
window.investInStat = investInStat;
window.doTransmute = doTransmute;
window.doTransmuteAll = doTransmuteAll;

console.log('[enhancementUI.js] Enhancement UI loaded');
