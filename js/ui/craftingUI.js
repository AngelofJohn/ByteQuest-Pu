// ByteQuest - Crafting UI
// Extracted from game.js (lines 6604-6764, 6765-6978, 6979-7405)
// Phase 5 refactoring - January 6, 2026
//
// Contains:
// - Alchemy System UI
// - Unified Crafting UI Screens (Alchemy, Smithing, Enchanting)
//
// Note: Account Upgrade Shop UI moved to accountUpgradeUI.js
//
// Dependencies: gameState.js, worldSystem.js, craftingSystem.js (existing)

// =====================================================
// Alchemy System
// =====================================================

function openAlchemy() {
  if (!alchemyManager) {
    showNotification("Alchemy system not available!", 'error');
    return;
  }

  renderAlchemyScreen();
}

function renderAlchemyScreen(selectedCategory = 'all') {
  if (!alchemyManager) return;

  const level = alchemyManager.getAlchemyLevel();
  const tier = alchemyManager.getSkillTier();
  const xpProgress = alchemyManager.getSkillProgressPercent();
  const essence = alchemyManager.getAllEssence();
  const recipes = selectedCategory === 'all'
    ? alchemyManager.getAvailableRecipes()
    : alchemyManager.getAvailableRecipes().filter(r => r.category === selectedCategory);

  // Essence display
  const essenceHtml = `
    <div class="alchemy-essence">
      <div class="essence-item" title="Faded Essence - Basic reviews">
        <span class="essence-icon">💫</span>
        <span class="essence-count">${essence.faded}</span>
      </div>
      <div class="essence-item" title="Clear Essence - Mixed reviews">
        <span class="essence-icon">✨</span>
        <span class="essence-count">${essence.clear}</span>
      </div>
      <div class="essence-item" title="Vivid Essence - Challenging reviews">
        <span class="essence-icon">🌟</span>
        <span class="essence-count">${essence.vivid}</span>
      </div>
      <div class="essence-item" title="Brilliant Essence - Mastery challenges">
        <span class="essence-icon">💎</span>
        <span class="essence-count">${essence.brilliant}</span>
      </div>
    </div>
  `;

  // Category tabs
  const categories = [
    { id: 'all', name: 'All', icon: '📋' },
    { id: 'healing', name: 'Healing', icon: '❤️' },
    { id: 'cognitive', name: 'Cognitive', icon: '🧠' }
  ];

  const tabsHtml = categories.map(cat => `
    <button class="alchemy-tab ${selectedCategory === cat.id ? 'active' : ''}"
            onclick="renderAlchemyScreen('${cat.id}')">
      ${cat.icon} ${cat.name}
    </button>
  `).join('');

  // Recipe list
  let recipesHtml = '';
  if (recipes.length === 0) {
    recipesHtml = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">No recipes available in this category.</p>';
  } else {
    recipesHtml = recipes.map(recipe => {
      const canCraftResult = alchemyManager.canCraft(recipe.id);
      const canCraft = canCraftResult.canCraft;

      // Format ingredients
      const ingredientsHtml = recipe.ingredients.map(ing => {
        const formatted = alchemyManager.formatIngredient(ing);
        const hasEnough = formatted.have >= ing.amount;
        return `
          <span class="ingredient ${hasEnough ? '' : 'missing'}">
            ${formatted.icon} ${formatted.name} (${formatted.have}/${ing.amount})
          </span>
        `;
      }).join('');

      return `
        <div class="alchemy-recipe ${canCraft ? '' : 'cannot-craft'}">
          <div class="recipe-header">
            <span class="recipe-icon">${recipe.icon}</span>
            <span class="recipe-name">${recipe.name}</span>
            <span class="recipe-level">Lv.${recipe.levelRequired}</span>
          </div>
          <div class="recipe-description">${recipe.description}</div>
          <div class="recipe-ingredients">${ingredientsHtml}</div>
          <div class="recipe-footer">
            <span class="recipe-xp">+${recipe.xpReward} XP</span>
            <button class="pixel-btn craft-btn"
                    onclick="craftRecipe('${recipe.id}')"
                    ${canCraft ? '' : 'disabled'}>
              Craft
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Active cognitive potion display
  let activePotionHtml = '';
  if (alchemyManager.hasActiveCognitivePotion()) {
    const active = alchemyManager.getActiveCognitivePotion();
    const potionData = GAME_DATA.items[active.active];
    if (potionData) {
      activePotionHtml = `
        <div class="active-potion-banner">
          <span class="active-potion-icon">${potionData.icon}</span>
          <span class="active-potion-text">
            <strong>${potionData.name}</strong> active
            <span class="remaining">(${active.remainingDuration} lessons remaining)</span>
          </span>
        </div>
      `;
    }
  }

  showModal('alchemy-modal', `
    <div class="alchemy-screen">
      <div class="alchemy-header">
        <div class="alchemy-title">
          <span class="alchemy-icon">⚗️</span>
          <span>Alchemy Workbench</span>
        </div>
        <button class="close-btn" onclick="hideModal('alchemy-modal')">✕</button>
      </div>

      <div class="alchemy-skill-info">
        <div class="skill-level">
          <span class="skill-tier">${tier.name}</span>
          <span class="skill-number">Level ${level}</span>
        </div>
        <div class="skill-progress-bar">
          <div class="skill-progress-fill" style="width: ${xpProgress}%"></div>
        </div>
      </div>

      ${activePotionHtml}

      <div class="alchemy-essence-section">
        <div class="section-label">Linguistic Essence</div>
        ${essenceHtml}
      </div>

      <div class="alchemy-tabs">
        ${tabsHtml}
      </div>

      <div class="alchemy-recipes">
        ${recipesHtml}
      </div>
    </div>
  `);
}

function craftRecipe(recipeId) {
  if (!alchemyManager) return;

  const result = alchemyManager.craft(recipeId);

  if (result.success) {
    let message = `Crafted ${result.recipe.name}!`;
    if (result.leveledUp) {
      message += ` Alchemy leveled up to ${result.newLevel}!`;
    }
    showNotification(message, 'success');

    // Re-render to update ingredient counts
    renderAlchemyScreen();

    // Auto-save
    if (typeof autoSave === 'function') {
      autoSave();
    }
  } else {
    showNotification(result.reason || 'Cannot craft this recipe', 'error');
  }
}

function useCognitivePotion(itemId) {
  if (!alchemyManager) {
    showNotification("Alchemy system not available!", 'error');
    return;
  }

  // Check if another potion is active
  if (alchemyManager.hasActiveCognitivePotion()) {
    const active = alchemyManager.getActiveCognitivePotion();
    const currentPotion = GAME_DATA.items[active.active];

    // Confirm replacement
    if (!confirm(`You already have ${currentPotion?.name || 'a potion'} active (${active.remainingDuration} uses remaining). Replace it?`)) {
      return;
    }

    // Clear current potion
    GameState.player.activeEffects.cognitivePotions = {
      active: null,
      remainingDuration: 0,
      bonuses: {}
    };
  }

  const result = alchemyManager.useCognitivePotion(itemId);

  if (result.success) {
    showNotification(result.message, 'success');
    if (typeof autoSave === 'function') {
      autoSave();
    }
  } else {
    showNotification(result.message, 'error');
  }
}

// =====================================================
// Unified Crafting System (Alchemy, Smithing, Enchanting)
// =====================================================

function openCrafting(profession = 'alchemy') {
  const validProfessions = ['alchemy', 'smithing', 'enchanting'];
  if (!validProfessions.includes(profession)) {
    profession = 'alchemy';
  }

  renderCraftingScreen(profession);
}

function renderCraftingScreen(profession, selectedCategory = 'all') {
  // Build profession tabs
  const professionTabs = [
    { id: 'alchemy', name: 'Alchemy', icon: '⚗️', manager: alchemyManager },
    { id: 'smithing', name: 'Smithing', icon: '🔨', manager: smithingManager },
    { id: 'enchanting', name: 'Enchanting', icon: '✨', manager: enchantingManager }
  ];

  const profTabsHtml = professionTabs.map(prof => `
    <button class="profession-tab ${profession === prof.id ? 'active' : ''}"
            onclick="renderCraftingScreen('${prof.id}', 'all')"
            ${!prof.manager ? 'disabled title="Coming soon"' : ''}>
      <span class="prof-icon">${prof.icon}</span>
      <span class="prof-name">${prof.name}</span>
    </button>
  `).join('');

  // Render the appropriate profession content
  let contentHtml = '';
  switch (profession) {
    case 'alchemy':
      contentHtml = renderAlchemyContent(selectedCategory);
      break;
    case 'smithing':
      contentHtml = renderSmithingContent(selectedCategory);
      break;
    case 'enchanting':
      contentHtml = renderEnchantingContent(selectedCategory);
      break;
  }

  showModal('crafting-modal', `
    <div class="crafting-screen">
      <div class="crafting-header">
        <div class="crafting-title">Crafting Workshop</div>
        <button class="close-btn" onclick="hideModal('crafting-modal')">✕</button>
      </div>

      <div class="profession-tabs">
        ${profTabsHtml}
      </div>

      <div class="profession-content">
        ${contentHtml}
      </div>
    </div>
  `);
}

function renderAlchemyContent(selectedCategory = 'all') {
  if (!alchemyManager) {
    return '<p class="no-manager">Alchemy system not available.</p>';
  }

  const level = alchemyManager.getAlchemyLevel();
  const tier = alchemyManager.getSkillTier();
  const xpProgress = alchemyManager.getSkillProgressPercent();
  const essence = alchemyManager.getAllEssence();
  const recipes = selectedCategory === 'all'
    ? alchemyManager.getAvailableRecipes()
    : alchemyManager.getAvailableRecipes().filter(r => r.category === selectedCategory);

  const essenceHtml = `
    <div class="crafting-resources">
      <div class="resource-item" title="Faded Essence">
        <span class="resource-icon">💫</span>
        <span class="resource-count">${essence.faded}</span>
      </div>
      <div class="resource-item" title="Clear Essence">
        <span class="resource-icon">✨</span>
        <span class="resource-count">${essence.clear}</span>
      </div>
      <div class="resource-item" title="Vivid Essence">
        <span class="resource-icon">🌟</span>
        <span class="resource-count">${essence.vivid}</span>
      </div>
      <div class="resource-item" title="Brilliant Essence">
        <span class="resource-icon">💎</span>
        <span class="resource-count">${essence.brilliant}</span>
      </div>
    </div>
  `;

  const categories = [
    { id: 'all', name: 'All', icon: '📋' },
    { id: 'healing', name: 'Healing', icon: '❤️' },
    { id: 'cognitive', name: 'Cognitive', icon: '🧠' }
  ];

  const tabsHtml = categories.map(cat => `
    <button class="category-tab ${selectedCategory === cat.id ? 'active' : ''}"
            onclick="renderCraftingScreen('alchemy', '${cat.id}')">
      ${cat.icon} ${cat.name}
    </button>
  `).join('');

  let recipesHtml = buildRecipeList(recipes, 'alchemy');

  return `
    <div class="skill-header">
      <div class="skill-info">
        <span class="skill-icon">⚗️</span>
        <span class="skill-tier">${tier.name}</span>
        <span class="skill-level">Level ${level}</span>
      </div>
      <div class="skill-progress-bar">
        <div class="skill-progress-fill" style="width: ${xpProgress}%"></div>
      </div>
    </div>

    <div class="resources-section">
      <div class="section-label">Linguistic Essence</div>
      ${essenceHtml}
    </div>

    <div class="category-tabs">
      ${tabsHtml}
    </div>

    <div class="recipe-list">
      ${recipesHtml}
    </div>
  `;
}

function renderSmithingContent(selectedCategory = 'all') {
  if (!smithingManager) {
    return '<p class="no-manager">Smithing system not available.</p>';
  }

  const level = smithingManager.getSmithingLevel();
  const tier = smithingManager.getSkillTier();
  const xpProgress = smithingManager.getSkillProgressPercent();
  const recipes = selectedCategory === 'all'
    ? smithingManager.getAvailableRecipes()
    : smithingManager.getAvailableRecipes().filter(r => r.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All', icon: '📋' },
    { id: 'smelting', name: 'Smelting', icon: '🔥' },
    { id: 'weapons', name: 'Weapons', icon: '⚔️' },
    { id: 'armor', name: 'Armor', icon: '🛡️' }
  ];

  const tabsHtml = categories.map(cat => `
    <button class="category-tab ${selectedCategory === cat.id ? 'active' : ''}"
            onclick="renderCraftingScreen('smithing', '${cat.id}')">
      ${cat.icon} ${cat.name}
    </button>
  `).join('');

  let recipesHtml = buildRecipeList(recipes, 'smithing');

  return `
    <div class="skill-header">
      <div class="skill-info">
        <span class="skill-icon">🔨</span>
        <span class="skill-tier">${tier.name}</span>
        <span class="skill-level">Level ${level}</span>
      </div>
      <div class="skill-progress-bar">
        <div class="skill-progress-fill" style="width: ${xpProgress}%"></div>
      </div>
    </div>

    <div class="category-tabs">
      ${tabsHtml}
    </div>

    <div class="recipe-list">
      ${recipesHtml}
    </div>
  `;
}

function renderEnchantingContent(selectedCategory = 'all') {
  if (!enchantingManager) {
    return '<p class="no-manager">Enchanting system not available.</p>';
  }

  const level = enchantingManager.getEnchantingLevel();
  const tier = enchantingManager.getSkillTier();
  const xpProgress = enchantingManager.getSkillProgressPercent();
  const recipes = selectedCategory === 'all'
    ? enchantingManager.getAvailableRecipes()
    : enchantingManager.getAvailableRecipes().filter(r => r.category === selectedCategory);

  const essence = alchemyManager ? alchemyManager.getAllEssence() : { faded: 0, clear: 0, vivid: 0, brilliant: 0 };

  const essenceHtml = `
    <div class="crafting-resources">
      <div class="resource-item" title="Vivid Essence">
        <span class="resource-icon">🌟</span>
        <span class="resource-count">${essence.vivid}</span>
      </div>
      <div class="resource-item" title="Clear Essence">
        <span class="resource-icon">✨</span>
        <span class="resource-count">${essence.clear}</span>
      </div>
    </div>
  `;

  const categories = [
    { id: 'all', name: 'All', icon: '📋' },
    { id: 'weapon_enchants', name: 'Weapons', icon: '⚔️' },
    { id: 'armor_enchants', name: 'Armor', icon: '🛡️' }
  ];

  const tabsHtml = categories.map(cat => `
    <button class="category-tab ${selectedCategory === cat.id ? 'active' : ''}"
            onclick="renderCraftingScreen('enchanting', '${cat.id}')">
      ${cat.icon} ${cat.name}
    </button>
  `).join('');

  let recipesHtml = buildEnchantingRecipeList(recipes);

  return `
    <div class="skill-header">
      <div class="skill-info">
        <span class="skill-icon">✨</span>
        <span class="skill-tier">${tier.name}</span>
        <span class="skill-level">Level ${level}</span>
      </div>
      <div class="skill-progress-bar">
        <div class="skill-progress-fill" style="width: ${xpProgress}%"></div>
      </div>
    </div>

    <div class="resources-section">
      <div class="section-label">Essence (shared with Alchemy)</div>
      ${essenceHtml}
    </div>

    <div class="category-tabs">
      ${tabsHtml}
    </div>

    <div class="recipe-list">
      ${recipesHtml}
    </div>
  `;
}

function buildRecipeList(recipes, profession) {
  if (recipes.length === 0) {
    return '<p class="no-recipes">No recipes available in this category.</p>';
  }

  const manager = profession === 'alchemy' ? alchemyManager : smithingManager;

  return recipes.map(recipe => {
    const canCraftResult = manager.canCraft(recipe.id);
    const canCraft = canCraftResult.canCraft;

    const ingredientsHtml = recipe.ingredients.map(ing => {
      const formatted = manager.formatIngredient(ing);
      const hasEnough = formatted.have >= ing.amount;
      return `
        <span class="ingredient ${hasEnough ? '' : 'missing'}">
          ${formatted.icon} ${formatted.name} (${formatted.have}/${ing.amount})
        </span>
      `;
    }).join('');

    const outputHtml = recipe.output ? `
      <div class="recipe-output">
        Creates: ${GAME_DATA.items[recipe.output.item]?.icon || '?'} ${GAME_DATA.items[recipe.output.item]?.name || recipe.output.item} x${recipe.output.amount}
      </div>
    ` : '';

    return `
      <div class="crafting-recipe ${canCraft ? '' : 'cannot-craft'}">
        <div class="recipe-header">
          <span class="recipe-icon">${recipe.icon}</span>
          <span class="recipe-name">${recipe.name}</span>
          <span class="recipe-level">Lv.${recipe.levelRequired}</span>
        </div>
        <div class="recipe-description">${recipe.description}</div>
        ${outputHtml}
        <div class="recipe-ingredients">${ingredientsHtml}</div>
        <div class="recipe-footer">
          <span class="recipe-xp">+${recipe.xpReward} XP</span>
          <button class="pixel-btn craft-btn"
                  onclick="craftItem('${profession}', '${recipe.id}')"
                  ${canCraft ? '' : 'disabled'}>
            Craft
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function buildEnchantingRecipeList(recipes) {
  if (recipes.length === 0) {
    return '<p class="no-recipes">No enchanting recipes available.</p>';
  }

  return recipes.map(recipe => {
    const enchantableItems = enchantingManager.getEnchantableItems(recipe.id);
    const hasItems = enchantableItems.length > 0;

    const ingredientsHtml = recipe.ingredients.map(ing => {
      const formatted = enchantingManager.formatIngredient(ing);
      const hasEnough = formatted.have >= ing.amount;
      return `
        <span class="ingredient ${hasEnough ? '' : 'missing'}">
          ${formatted.icon} ${formatted.name} (${formatted.have}/${ing.amount})
        </span>
      `;
    }).join('');

    const itemSelectHtml = hasItems ? `
      <div class="enchant-item-select">
        <label>Base Item:</label>
        <select id="enchant-item-${recipe.id}" class="enchant-select">
          ${enchantableItems.map(item => `
            <option value="${item.id}">${item.icon} ${item.name} (x${item.count}) → ${item.outputName}</option>
          `).join('')}
        </select>
      </div>
    ` : '<div class="no-enchantable-items">No enchantable items in inventory</div>';

    const canEnchant = hasItems && recipe.ingredients.every(ing => {
      const formatted = enchantingManager.formatIngredient(ing);
      return formatted.have >= ing.amount;
    });

    return `
      <div class="crafting-recipe enchanting-recipe ${canEnchant ? '' : 'cannot-craft'}">
        <div class="recipe-header">
          <span class="recipe-icon">${recipe.icon}</span>
          <span class="recipe-name">${recipe.name}</span>
          <span class="recipe-level">Lv.${recipe.levelRequired}</span>
        </div>
        <div class="recipe-description">${recipe.description}</div>
        ${itemSelectHtml}
        <div class="recipe-ingredients">${ingredientsHtml}</div>
        <div class="recipe-footer">
          <span class="recipe-xp">+${recipe.xpReward} XP</span>
          <button class="pixel-btn craft-btn"
                  onclick="enchantItem('${recipe.id}')"
                  ${canEnchant ? '' : 'disabled'}>
            Enchant
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function craftItem(profession, recipeId) {
  let manager, result;

  switch (profession) {
    case 'alchemy':
      manager = alchemyManager;
      result = manager.craft(recipeId);
      break;
    case 'smithing':
      manager = smithingManager;
      result = manager.craft(recipeId);
      break;
    default:
      showNotification('Unknown crafting profession', 'error');
      return;
  }

  if (result.success) {
    let message = `Crafted ${result.recipe.name}!`;
    if (result.leveledUp) {
      message += ` ${profession.charAt(0).toUpperCase() + profession.slice(1)} leveled up to ${result.newLevel}!`;
    }
    showNotification(message, 'success');
    renderCraftingScreen(profession);

    // Check quest objectives for crafting
    if (typeof checkCraftObjectives === 'function') {
      checkCraftObjectives(profession, recipeId);
    }

    if (typeof autoSave === 'function') {
      autoSave();
    }
  } else {
    showNotification(result.reason || 'Cannot craft this recipe', 'error');
  }
}

function enchantItem(recipeId) {
  if (!enchantingManager) {
    showNotification('Enchanting system not available', 'error');
    return;
  }

  const selectElement = document.getElementById(`enchant-item-${recipeId}`);
  if (!selectElement) {
    showNotification('Please select an item to enchant', 'error');
    return;
  }

  const baseItemId = selectElement.value;
  const result = enchantingManager.enchant(recipeId, baseItemId);

  if (result.success) {
    let message = `Enchanted ${result.output.name}!`;
    if (result.leveledUp) {
      message += ` Enchanting leveled up to ${result.newLevel}!`;
    }
    showNotification(message, 'success');
    renderCraftingScreen('enchanting');
    if (typeof autoSave === 'function') {
      autoSave();
    }
  } else {
    showNotification(result.reason || 'Cannot enchant this item', 'error');
  }
}

// =====================================================
// Global Exports
// =====================================================

window.openAlchemy = openAlchemy;
window.renderAlchemyScreen = renderAlchemyScreen;
window.craftRecipe = craftRecipe;
window.useCognitivePotion = useCognitivePotion;
window.openCrafting = openCrafting;
window.renderCraftingScreen = renderCraftingScreen;
window.craftItem = craftItem;
window.enchantItem = enchantItem;
