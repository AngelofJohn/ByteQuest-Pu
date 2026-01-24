// ByteQuest - Account Upgrade Shop UI
// Separated from craftingUI.js for better organization
// Handles permanent upgrade purchases that persist across saves

// =====================================================
// Account Upgrade Shop
// =====================================================

function renderAccountUpgradeShop(shopId) {
  const shop = shopManager.getShop(shopId);
  if (!shop) return;

  const upgrades = shopManager.getAccountUpgradeInventory(shopId);
  const playerGold = shopManager.getPlayerGold();

  // Group upgrades by category
  const categories = {};
  upgrades.forEach(entry => {
    const cat = entry.upgrade.category || 'other';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(entry);
  });

  const categoryNames = {
    starter: 'Starter Blessings',
    learning: 'Learning',
    resources: 'Resources',
    gameplay: 'Gameplay',
    language: 'Language',
    qol: 'Quality of Life',
    other: 'Other'
  };

  let upgradesHtml = '';

  for (const [category, items] of Object.entries(categories)) {
    upgradesHtml += `<div class="upgrade-category">
      <div class="upgrade-category-title">${categoryNames[category] || category}</div>`;

    upgradesHtml += items.map(entry => {
      const upgrade = entry.upgrade;
      const isPurchasable = entry.canPurchase;
      const isOwned = entry.owned && upgrade.oneTime;
      const stackInfo = upgrade.maxStacks ? ` (${entry.ownedCount}/${upgrade.maxStacks})` : '';

      let statusClass = '';
      let statusText = '';
      if (isOwned) {
        statusClass = 'owned';
        statusText = 'OWNED';
      } else if (!isPurchasable && entry.reason) {
        statusClass = 'locked';
        statusText = entry.reason;
      }

      // Build price display (gold and/or items)
      let priceHtml = '';
      const hasGoldCost = entry.price > 0;
      const hasItemCosts = upgrade.cost?.items && Object.keys(upgrade.cost.items).length > 0;

      if (hasGoldCost) {
        priceHtml += `<div class="upgrade-gold-cost">
          <span class="price-value">${entry.price}</span>
          <span class="price-icon">💰</span>
        </div>`;
      }

      if (hasItemCosts) {
        const itemCostsHtml = Object.entries(upgrade.cost.items).map(([itemId, amount]) => {
          const itemDef = GAME_DATA.items?.[itemId] || { name: itemId, icon: '📦' };
          const playerHas = typeof itemManager !== 'undefined' ? itemManager.getItemCount(itemId) : 0;
          const canAffordItem = playerHas >= amount;
          return `<div class="item-cost ${canAffordItem ? 'affordable' : 'unaffordable'}">
            <span class="item-icon">${itemDef.icon || '📦'}</span>
            <span class="item-amount">${amount}x ${itemDef.name || itemId}</span>
            <span class="item-have">(${playerHas})</span>
          </div>`;
        }).join('');
        priceHtml += `<div class="upgrade-item-costs">${itemCostsHtml}</div>`;
      }

      if (!hasGoldCost && !hasItemCosts) {
        priceHtml = '<div class="upgrade-gold-cost"><span class="price-value">Free</span></div>';
      }

      return `
        <div class="upgrade-item ${statusClass} ${isPurchasable ? '' : 'cannot-afford'}">
          <div class="upgrade-info">
            <div class="upgrade-name">${upgrade.name}${stackInfo}</div>
            <div class="upgrade-desc">${upgrade.description}</div>
            ${statusText ? `<div class="upgrade-status">${statusText}</div>` : ''}
          </div>
          <div class="upgrade-price">
            ${priceHtml}
          </div>
          <button class="pixel-btn shop-buy-btn"
                  onclick="buyAccountUpgrade('${shopId}', '${entry.upgradeId}')"
                  ${isPurchasable ? '' : 'disabled'}>
            ${isOwned ? '✓' : 'Buy'}
          </button>
        </div>
      `;
    }).join('');

    upgradesHtml += '</div>';
  }

  if (upgrades.length === 0) {
    upgradesHtml = '<p style="color: var(--text-muted); text-align: center;">No upgrades available.</p>';
  }

  showModal('shop-modal', `
    <div class="shop-screen account-upgrade-shop">
      <div class="shop-header">
        <div class="shop-icon">${shop.icon || '⭐'}</div>
        <div class="shop-title">
          <h2>${shop.name}</h2>
          <p>${shop.description || 'Permanent upgrades that persist across all saves.'}</p>
        </div>
        <div class="shop-gold">
          <span class="gold-icon">💰</span>
          <span class="gold-value">${playerGold}</span>
        </div>
      </div>

      <div class="account-upgrade-notice">
        <span class="notice-icon">⭐</span>
        <span>These upgrades are <strong>permanent</strong> and apply to all your save files!</span>
      </div>

      <div class="shop-inventory upgrade-list">
        ${upgradesHtml}
      </div>

      <div class="shop-footer">
        <button class="pixel-btn" onclick="closeShopScreen()">Close</button>
      </div>
    </div>
  `);
}

async function buyAccountUpgrade(shopId, upgradeId) {
  if (!shopManager) return;

  const result = await shopManager.purchaseAccountUpgrade(shopId, upgradeId);

  if (result.success) {
    showNotification(`Purchased: ${result.upgrade.name}`, 'success');

    // Check achievements
    if (typeof checkAchievements === 'function') {
      checkAchievements();
    }

    // Refresh shop UI
    renderAccountUpgradeShop(shopId);

    // Update HUD (gold changed)
    if (typeof renderHUD === 'function') {
      renderHUD();
    }

    // Save game
    if (typeof autoSave === 'function') {
      autoSave();
    }
  } else {
    showNotification(result.message, 'error');
  }
}

// =====================================================
// Global Exports
// =====================================================

window.renderAccountUpgradeShop = renderAccountUpgradeShop;
window.buyAccountUpgrade = buyAccountUpgrade;
