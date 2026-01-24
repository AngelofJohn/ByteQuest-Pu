// ByteQuest - Shop UI
// Shop rendering and interaction functions

// =====================================================
// Shop Detection
// =====================================================

/**
 * Check if NPC has any shop (either in NPC definition or in shopManager)
 */
function npcHasAnyShop(npcId) {
  const npc = getNPC(npcId);

  // Check old-style NPC-defined shop
  if (npc?.shop) {
    return true;
  }

  // Check shopManager for shops associated with this NPC
  if (typeof shopManager !== 'undefined' && shopManager) {
    const shops = shopManager.getShopsByNpc(npcId);
    if (shops && shops.length > 0) {
      return true;
    }
  }

  return false;
}

// =====================================================
// Shop Opening
// =====================================================

function openShop(npcId, shopType = null) {
  if (typeof hideDialog === 'function') {
    hideDialog();
  }

  if (!shopManager) {
    showNotification("Shop system not initialized!", 'error');
    return;
  }

  // Get all shops for this NPC
  const shops = shopManager.getShopsByNpc(npcId);
  if (shops.length === 0) {
    showNotification("This person doesn't have a shop.", 'info');
    return;
  }

  // If shopType specified, find that specific shop
  if (shopType) {
    const shop = shops.find(s => s.type === shopType);
    if (shop) {
      shopManager.openShop(shop.id);
      if (shop.type === ShopType.ACCOUNT_UPGRADES) {
        renderAccountUpgradeShop(shop.id);
      } else {
        renderShopScreen(shop.id);
      }
      return;
    }
  }

  // If NPC has only one shop, open it directly
  if (shops.length === 1) {
    const shop = shops[0];
    shopManager.openShop(shop.id);
    if (shop.type === ShopType.ACCOUNT_UPGRADES) {
      renderAccountUpgradeShop(shop.id);
    } else {
      renderShopScreen(shop.id);
    }
    return;
  }

  // NPC has multiple shops - show shop selection
  renderShopSelection(npcId, shops);
}

// =====================================================
// Shop Selection (Multiple Shops)
// =====================================================

function renderShopSelection(npcId, shops) {
  const npc = getNPC(npcId);
  const npcName = npc?.name || 'Merchant';

  const shopButtons = shops.map(shop => {
    const typeInfo = ShopTypeInfo[shop.type] || { icon: '🏪', name: 'Shop' };
    return `
      <button class="pixel-btn shop-select-btn" onclick="openShop('${npcId}', '${shop.type}')">
        <span class="shop-select-icon">${shop.icon || typeInfo.icon}</span>
        <span class="shop-select-name">${shop.name}</span>
      </button>
    `;
  }).join('');

  showModal('shop-modal', `
    <div class="shop-screen">
      <div class="shop-header">
        <div class="shop-title">
          <h2>${escapeHtml(npcName)}'s Services</h2>
          <p>What would you like to browse?</p>
        </div>
      </div>

      <div class="shop-selection">
        ${shopButtons}
      </div>

      <div class="shop-footer">
        <button class="pixel-btn" onclick="closeShopScreen()">Close</button>
      </div>
    </div>
  `);
}

// =====================================================
// Shop Screen Rendering
// =====================================================

// Track current shop tab (buy or sell)
let currentShopTab = 'buy';

function renderShopScreen(shopId, tab = 'buy') {
  const shop = shopManager.getShop(shopId);
  if (!shop) return;

  currentShopTab = tab;
  const playerGold = shopManager.getPlayerGold();

  // Calculate discount from Luck stat
  let discount = 0;
  if (typeof statsManager !== 'undefined' && statsManager) {
    discount = statsManager.calculateShopDiscount();
  }

  // Build tab buttons
  const tabsHtml = `
    <div class="shop-tabs">
      <button class="shop-tab ${tab === 'buy' ? 'active' : ''}" onclick="renderShopScreen('${shopId}', 'buy')">
        🛒 Buy
      </button>
      <button class="shop-tab ${tab === 'sell' ? 'active' : ''}" onclick="renderShopScreen('${shopId}', 'sell')">
        💰 Sell
      </button>
    </div>
  `;

  let contentHtml = '';

  if (tab === 'buy') {
    // BUY TAB - existing shop inventory
    const inventory = shopManager.getShopInventory(shopId);

    if (inventory.length === 0) {
      contentHtml = '<p style="color: var(--text-muted); text-align: center;">No items available.</p>';
    } else {
      contentHtml = inventory.map(entry => {
        const item = entry.item;
        const discountedPrice = Math.floor(entry.price * (1 - discount));
        const canAfford = playerGold >= discountedPrice;
        const meetsRep = entry.meetsRepRequirement;
        const canBuy = canAfford && meetsRep;
        const rarityInfo = ItemRarityInfo[item.rarity] || { color: '#ffffff', name: 'Common' };
        const hasDiscount = discount > 0;

        // Reputation requirement display
        const repDisplay = entry.repRequired > 0
          ? `<div class="shop-item-rep ${meetsRep ? 'met' : 'unmet'}">
               ${meetsRep ? '✓' : '🔒'} Rep: ${entry.playerRep}/${entry.repRequired}
             </div>`
          : '';

        return `
          <div class="shop-item ${canBuy ? '' : 'cannot-afford'}">
            <div class="shop-item-icon">${item.icon || '❓'}</div>
            <div class="shop-item-info">
              <div class="shop-item-name" style="color: ${rarityInfo.color};">${escapeHtml(item.name)}</div>
              <div class="shop-item-desc">${escapeHtml(item.description || '')}</div>
              ${repDisplay}
            </div>
            <div class="shop-item-price">
              ${hasDiscount ? `<span class="price-original" style="text-decoration: line-through; color: var(--text-muted); font-size: 10px;">${entry.price}</span> ` : ''}
              <span class="price-value">${discountedPrice}</span>
              <span class="price-icon">💰</span>
            </div>
            <button class="pixel-btn shop-buy-btn"
                    onclick="buyFromShop('${shopId}', '${entry.itemId}')"
                    ${canBuy ? '' : 'disabled'}>
              ${meetsRep ? 'Buy' : '🔒'}
            </button>
          </div>
        `;
      }).join('');
    }
  } else {
    // SELL TAB - player's sellable items
    const sellableItems = getSellableItems();

    if (sellableItems.length === 0) {
      contentHtml = '<p style="color: var(--text-muted); text-align: center;">You have no items to sell.</p>';
    } else {
      contentHtml = sellableItems.map(entry => {
        const sellPrice = Math.floor(entry.value * 0.5); // Sell at 50% of value
        const rarityInfo = ItemRarityInfo[entry.item.rarity] || { color: '#ffffff', name: 'Common' };

        return `
          <div class="shop-item sellable">
            <div class="shop-item-icon">${entry.item.icon || '❓'}</div>
            <div class="shop-item-info">
              <div class="shop-item-name" style="color: ${rarityInfo.color};">${escapeHtml(entry.item.name)}</div>
              <div class="shop-item-desc">${escapeHtml(entry.item.description || '')}</div>
              <div class="shop-item-count">Owned: ${entry.count}</div>
            </div>
            <div class="shop-item-price sell-price">
              <span class="price-value">+${sellPrice}</span>
              <span class="price-icon">💰</span>
            </div>
            <button class="pixel-btn shop-sell-btn"
                    onclick="sellItem('${shopId}', '${entry.itemId}')">
              Sell
            </button>
          </div>
        `;
      }).join('');
    }
  }

  showModal('shop-modal', `
    <div class="shop-screen">
      <div class="shop-header">
        <div class="shop-icon">${shop.icon || '🏪'}</div>
        <div class="shop-title">
          <h2>${escapeHtml(shop.name)}</h2>
          <p>${escapeHtml(shop.description || '')}</p>
        </div>
        <div class="shop-gold">
          <span class="gold-icon">💰</span>
          <span class="gold-value">${playerGold}</span>
        </div>
      </div>

      ${tabsHtml}

      <div class="shop-inventory">
        ${contentHtml}
      </div>

      <div class="shop-footer">
        <button class="pixel-btn" onclick="closeShopScreen()">Close</button>
      </div>
    </div>
  `);
}

// =====================================================
// Selling Items
// =====================================================

// Get items player can sell (resources and consumables with value)
function getSellableItems() {
  const sellable = [];

  if (!GameState.player.inventory) return sellable;

  GameState.player.inventory.forEach(invItem => {
    const item = GAME_DATA.items[invItem.id];
    if (!item) return;

    // Can sell resources and consumables that have a value
    if ((item.type === 'resource' || item.type === 'consumable') && item.value > 0) {
      sellable.push({
        itemId: invItem.id,
        item: item,
        count: invItem.count || 1,
        value: item.value
      });
    }
  });

  return sellable;
}

// Sell an item for gold
function sellItem(shopId, itemId) {
  const item = GAME_DATA.items[itemId];
  if (!item || !item.value) {
    showNotification('Cannot sell this item', 'error');
    return;
  }

  // Find item in inventory
  const invItem = GameState.player.inventory.find(i => i.id === itemId);
  if (!invItem || invItem.count < 1) {
    showNotification('Item not in inventory', 'error');
    return;
  }

  // Calculate sell price (50% of value)
  const sellPrice = Math.floor(item.value * 0.5);

  // Remove item from inventory
  if (invItem.count > 1) {
    invItem.count--;
  } else {
    const index = GameState.player.inventory.indexOf(invItem);
    GameState.player.inventory.splice(index, 1);
  }

  // Add gold via currencyManager for proper transaction logging
  if (typeof currencyManager !== 'undefined' && currencyManager) {
    currencyManager.addGold(sellPrice, 'sell_item');
  } else {
    GameState.player.gold += sellPrice;
  }

  showNotification(`Sold ${item.name} for ${sellPrice} gold`, 'success');

  // Refresh shop UI
  renderShopScreen(shopId, 'sell');

  // Update HUD
  if (typeof renderHUD === 'function') renderHUD();

  // Auto-save
  if (typeof autoSave === 'function') autoSave();
}

// =====================================================
// Buying Items
// =====================================================

function buyFromShop(shopId, itemId) {
  if (!shopManager) return;

  const result = shopManager.purchaseItem(shopId, itemId, 1);

  if (result.success) {
    showNotification(`Purchased: ${result.item.name}`, 'success');

    // Check quest objectives for buying items
    if (typeof checkBuyObjectives === 'function') {
      checkBuyObjectives(itemId);
    }

    // Check achievements (for spending gold)
    if (typeof checkAchievements === 'function') {
      checkAchievements();
    }

    // Refresh shop UI
    renderShopScreen(shopId);

    // Update HUD (gold changed)
    if (typeof renderHUD === 'function') renderHUD();

    // Save game
    if (typeof autoSave === 'function') autoSave();
  } else {
    showNotification(result.message, 'error');
  }
}

// =====================================================
// Close Shop
// =====================================================

function closeShopScreen() {
  if (shopManager) {
    shopManager.closeShop();
  }
  hideModal('shop-modal');
}

// =====================================================
// Upgrades Screen (Permanent Upgrades)
// =====================================================

/**
 * Show the permanent upgrades screen from the sidebar
 * Opens Elder Maren's upgrades shop directly
 */
function showUpgradesScreen() {
  if (!shopManager) {
    showNotification("Shop system not initialized!", 'error');
    return;
  }

  const shop = shopManager.getShop('elder_maren_upgrades');
  if (!shop) {
    showNotification("Upgrades not available yet.", 'info');
    return;
  }

  shopManager.openShop('elder_maren_upgrades');

  // Use the account upgrade shop renderer
  if (typeof renderAccountUpgradeShop === 'function') {
    renderAccountUpgradeShop('elder_maren_upgrades');
  } else {
    showNotification("Upgrade shop UI not available.", 'error');
  }
}

// =====================================================
// Global Exports
// =====================================================

window.openShop = openShop;
window.renderShopScreen = renderShopScreen;
window.renderShopSelection = renderShopSelection;
window.buyFromShop = buyFromShop;
window.sellItem = sellItem;
window.closeShopScreen = closeShopScreen;
window.getSellableItems = getSellableItems;
window.npcHasAnyShop = npcHasAnyShop;
window.showUpgradesScreen = showUpgradesScreen;
