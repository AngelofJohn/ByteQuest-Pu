// ByteQuest - Spellbook System
// Grammar reference UI with unlockable pages
//
// ARCHITECTURE:
// - Page data is language-specific, stored in data/courses/{lang}/spellbook.js
// - LanguageSpellbook helper (languageSpellbook.js) provides dynamic access
// - Content rendering is delegated to language-specific renderers
//   (e.g., FrenchSpellbookRenderer in french/spellbook.js)

console.log('[spellbookSystem.js] Loading spellbook system...');

// =====================================================
// Backward Compatibility Shims
// =====================================================

// These shims allow legacy code to work while transitioning to language-agnostic system
const SPELLBOOK_PAGES = (typeof FRENCH_SPELLBOOK !== 'undefined') ? FRENCH_SPELLBOOK : {};
const SPELLBOOK_CATEGORIES = (typeof FRENCH_SPELLBOOK_CATEGORIES !== 'undefined') ? FRENCH_SPELLBOOK_CATEGORIES : [
  { id: "verbs", label: "Verbs", icon: "⚡" },
  { id: "grammar", label: "Grammar", icon: "📚" },
  { id: "reference", label: "Reference", icon: "📋" },
  { id: "lore", label: "Lore", icon: "📜" },
  { id: "artifacts", label: "Artifacts", icon: "🏺" }
];

// =====================================================
// Artifact Eras for Spellbook UI (display format)
// Note: Different from ARTIFACT_ERAS in artifacts.js (data format)
// =====================================================

const SPELLBOOK_ARTIFACT_ERAS = [
  { id: "ancients", label: "The Ancients", icon: "🏛️", order: 1 },
  { id: "silence", label: "The Silence", icon: "🌑", order: 2 },
  { id: "founding", label: "The Founding", icon: "👑", order: 3 },
  { id: "faith", label: "The Faith", icon: "✝️", order: 4 },
  { id: "golden_age", label: "The Golden Age", icon: "⭐", order: 5 },
  { id: "king_dran", label: "King Dran's Reign", icon: "🏰", order: 6 },
  { id: "the_war", label: "The War", icon: "⚔️", order: 7 },
  { id: "exile", label: "The Exile", icon: "🚪", order: 8 }
];

// =====================================================
// Spellbook Manager Class
// =====================================================

class SpellbookManager {
  constructor(gameState) {
    this.state = gameState;
    this.currentPage = null;
    this.currentView = null; // 'page' or 'artifacts'

    // Initialize spellbook state if not present
    if (!this.state.player.spellbook) {
      this.state.player.spellbook = {
        unlockedPages: ["pronouns"], // Pronouns always available
        unlockedArtifacts: [],       // Artifact IDs the player has found
        lastViewed: null
      };
    }

    // Ensure artifacts array exists for older saves
    if (!this.state.player.spellbook.unlockedArtifacts) {
      this.state.player.spellbook.unlockedArtifacts = [];
    }
  }

  // ===================================================
  // Page Management
  // ===================================================

  getSpellbookPages() {
    if (typeof LanguageSpellbook !== 'undefined') {
      return LanguageSpellbook.getPages();
    }
    return SPELLBOOK_PAGES;
  }

  getSpellbookCategories() {
    if (typeof LanguageSpellbook !== 'undefined') {
      return LanguageSpellbook.getCategories();
    }
    return SPELLBOOK_CATEGORIES;
  }

  isPageUnlocked(pageId) {
    const pages = this.getSpellbookPages();
    const page = pages[pageId];
    if (!page) return false;
    if (page.alwaysUnlocked) return true;
    return this.state.player.spellbook.unlockedPages.includes(pageId);
  }

  unlockPage(pageId) {
    const pages = this.getSpellbookPages();
    if (!pages[pageId]) {
      console.warn(`Unknown spellbook page: ${pageId}`);
      return false;
    }

    if (!this.state.player.spellbook.unlockedPages.includes(pageId)) {
      this.state.player.spellbook.unlockedPages.push(pageId);
      return true;
    }
    return false;
  }

  unlockPages(pageIds) {
    let newUnlocks = [];
    pageIds.forEach(id => {
      if (this.unlockPage(id)) {
        newUnlocks.push(id);
      }
    });
    return newUnlocks;
  }

  getPagesInCategory(categoryId) {
    const pages = this.getSpellbookPages();
    return Object.values(pages).filter(p => p.category === categoryId);
  }

  getUnlockedCount() {
    return this.state.player.spellbook.unlockedPages.length;
  }

  getTotalCount() {
    const pages = this.getSpellbookPages();
    return Object.keys(pages).length;
  }

  // ===================================================
  // Artifact Management
  // ===================================================

  isArtifactUnlocked(artifactId) {
    return this.state.player.spellbook.unlockedArtifacts.includes(artifactId);
  }

  unlockArtifact(artifactId) {
    if (!GAME_DATA.artifacts || !GAME_DATA.artifacts[artifactId]) {
      console.warn(`Unknown artifact: ${artifactId}`);
      return false;
    }

    if (!this.state.player.spellbook.unlockedArtifacts.includes(artifactId)) {
      this.state.player.spellbook.unlockedArtifacts.push(artifactId);
      return true;
    }
    return false;
  }

  getArtifactsForEra(eraId) {
    if (!GAME_DATA.artifacts) return [];
    return Object.values(GAME_DATA.artifacts)
      .filter(a => a.era === eraId)
      .sort((a, b) => a.order - b.order);
  }

  getUnlockedArtifactsForEra(eraId) {
    return this.getArtifactsForEra(eraId)
      .filter(a => this.isArtifactUnlocked(a.id));
  }

  isEraComplete(eraId) {
    const total = this.getArtifactsForEra(eraId).length;
    const unlocked = this.getUnlockedArtifactsForEra(eraId).length;
    return total > 0 && unlocked >= total;
  }

  getTotalArtifactCount() {
    if (!GAME_DATA.artifacts) return 0;
    return Object.keys(GAME_DATA.artifacts).length;
  }

  getUnlockedArtifactCount() {
    return this.state.player.spellbook.unlockedArtifacts.length;
  }

  // ===================================================
  // UI Rendering
  // ===================================================

  show() {
    const modal = document.getElementById('spellbook-modal');
    if (!modal) {
      console.error('[Spellbook] Modal element not found: #spellbook-modal');
      return;
    }

    if (!this.state.player.spellbook) {
      this.state.player.spellbook = {
        unlockedPages: ["pronouns"],
        unlockedArtifacts: [],
        lastViewed: null
      };
    }

    // Ensure unlockedArtifacts exists (for older saves)
    if (!this.state.player.spellbook.unlockedArtifacts) {
      this.state.player.spellbook.unlockedArtifacts = [];
    }

    this.renderTableOfContents();

    const lastViewed = this.state.player.spellbook.lastViewed;
    if (lastViewed && this.isPageUnlocked(lastViewed)) {
      this.showPage(lastViewed);
    } else {
      this.showWelcome();
    }

    modal.classList.add('active');
  }

  hide() {
    const modal = document.getElementById('spellbook-modal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  renderTableOfContents() {
    const toc = document.querySelector('.spellbook-toc');
    if (!toc) return;

    let html = '';
    const categories = this.getSpellbookCategories();

    categories.forEach(category => {
      if (category.id === 'artifacts') {
        html += `<div class="toc-section"><div class="toc-section-title">${category.icon} ${category.label}</div>`;

        SPELLBOOK_ARTIFACT_ERAS.forEach(era => {
          const eraArtifacts = this.getArtifactsForEra(era.id);
          const eraUnlocked = this.getUnlockedArtifactsForEra(era.id);
          const isComplete = this.isEraComplete(era.id);
          const hasAny = eraUnlocked.length > 0;
          const isActive = this.currentView === 'artifacts' && this.currentPage === era.id;

          html += `
            <div class="toc-item ${hasAny ? '' : 'locked'} ${isActive ? 'active' : ''}"
                 data-artifact-era="${era.id}">
              <span class="toc-item-icon">${hasAny ? era.icon : '🔒'}</span>
              <span class="toc-item-label">${hasAny ? era.label : '???'}</span>
              <span class="toc-item-status">${isComplete ? '✓' : `${eraUnlocked.length}/${eraArtifacts.length}`}</span>
            </div>
          `;
        });

        html += '</div>';
        return;
      }

      const pages = this.getPagesInCategory(category.id);
      if (pages.length === 0) return;

      html += `<div class="toc-section"><div class="toc-section-title">${category.icon} ${category.label}</div>`;

      pages.forEach(page => {
        const isUnlocked = this.isPageUnlocked(page.id);
        const isActive = this.currentView === 'page' && this.currentPage === page.id;

        html += `
          <div class="toc-item ${isUnlocked ? '' : 'locked'} ${isActive ? 'active' : ''}"
               data-page="${page.id}">
            <span class="toc-item-icon">${isUnlocked ? page.icon : '🔒'}</span>
            <span class="toc-item-label">${isUnlocked ? page.title : '???'}</span>
            <span class="toc-item-status">${isUnlocked ? '✓' : ''}</span>
          </div>
        `;
      });

      html += '</div>';
    });

    toc.innerHTML = html;

    toc.querySelectorAll('.toc-item[data-page]').forEach(item => {
      item.addEventListener('click', () => {
        const pageId = item.dataset.page;
        if (this.isPageUnlocked(pageId)) {
          this.showPage(pageId);
        } else {
          this.showLockedPage(pageId);
        }
      });
    });

    toc.querySelectorAll('.toc-item[data-artifact-era]').forEach(item => {
      item.addEventListener('click', () => {
        const eraId = item.dataset.artifactEra;
        this.showArtifactEra(eraId);
      });
    });
  }

  showWelcome() {
    const content = document.querySelector('.spellbook-content');
    if (!content) return;

    this.currentPage = null;
    this.updateTocActive();

    const unlocked = this.getUnlockedCount();
    const total = this.getTotalCount();

    content.innerHTML = `
      <div class="spellbook-welcome">
        <div class="welcome-icon">📖</div>
        <div class="page-title">Welcome to Your Spellbook</div>
        <div class="welcome-text">
          <p>This tome contains the grammar knowledge you've acquired on your journey.</p>
          <p style="margin-top: 16px;">Select a topic from the left to review what you've learned.</p>
          <p style="margin-top: 16px; color: var(--accent-gold);">
            Pages Unlocked: ${unlocked} / ${total}
          </p>
        </div>
      </div>
    `;
  }

  showPage(pageId) {
    const pages = this.getSpellbookPages();
    const page = pages[pageId];
    if (!page || !this.isPageUnlocked(pageId)) return;

    this.currentView = 'page';
    this.currentPage = pageId;
    this.state.player.spellbook.lastViewed = pageId;
    this.updateTocActive();

    const content = document.querySelector('.spellbook-content');
    if (!content) return;

    let html = `
      <div class="spellbook-page active">
        <div class="page-title">${page.icon} ${page.title}</div>
        <div class="page-subtitle">${page.subtitle}</div>
    `;

    if (page.description) {
      html += `<div class="page-description">${page.description}</div>`;
    }

    if (page.examples && page.examples.length > 0) {
      html += `<div class="page-examples">`;
      page.examples.forEach(ex => {
        const targetWord = ex.french || ex.greek || '';
        html += `
          <div class="example-item">
            <span class="example-french">${targetWord}</span>
            <span class="example-english">${ex.english}</span>
          </div>
        `;
      });
      html += `</div>`;
    }

    html += this.renderPageContent(page);
    html += '</div>';
    content.innerHTML = html;
  }

  showLockedPage(pageId) {
    const pages = this.getSpellbookPages();
    const page = pages[pageId];
    if (!page) return;

    this.currentView = 'page';
    this.currentPage = null;
    this.updateTocActive();

    const content = document.querySelector('.spellbook-content');
    if (!content) return;

    content.innerHTML = `
      <div class="locked-page">
        <div class="locked-icon">🔒</div>
        <div class="locked-message">This page is locked</div>
        <div class="locked-hint">${page.unlockHint || 'Continue your journey to unlock this page.'}</div>
      </div>
    `;
  }

  showArtifactEra(eraId) {
    const era = SPELLBOOK_ARTIFACT_ERAS.find(e => e.id === eraId);
    if (!era) return;

    this.currentView = 'artifacts';
    this.currentPage = eraId;
    this.updateTocActive();

    const content = document.querySelector('.spellbook-content');
    if (!content) return;

    const artifacts = this.getArtifactsForEra(eraId);
    const unlockedArtifacts = this.getUnlockedArtifactsForEra(eraId);
    const isComplete = this.isEraComplete(eraId);

    let html = `
      <div class="spellbook-page active artifact-page">
        <div class="page-title">${era.icon} ${era.label}</div>
        <div class="page-subtitle">Artifacts Collected: ${unlockedArtifacts.length} / ${artifacts.length}</div>
    `;

    if (isComplete) {
      html += `
        <div class="era-complete-banner">
          <span class="complete-icon">✨</span>
          <span class="complete-text">Era Complete - The truth has been revealed</span>
        </div>
      `;
    }

    html += `<div class="artifact-grid">`;

    artifacts.forEach(artifact => {
      const isUnlocked = this.isArtifactUnlocked(artifact.id);

      if (isUnlocked) {
        html += `
          <div class="artifact-card unlocked" data-artifact="${artifact.id}">
            <div class="artifact-icon">${artifact.icon}</div>
            <div class="artifact-name">${artifact.name}</div>
            <div class="artifact-category">${artifact.category.replace(/_/g, ' ')}</div>
          </div>
        `;
      } else {
        html += `
          <div class="artifact-card locked">
            <div class="artifact-icon">❓</div>
            <div class="artifact-name">???</div>
            <div class="artifact-hint">${artifact.hint}</div>
          </div>
        `;
      }
    });

    html += `</div>`;
    html += `<div class="artifact-detail" id="artifact-detail"></div>`;
    html += '</div>';
    content.innerHTML = html;

    content.querySelectorAll('.artifact-card.unlocked').forEach(card => {
      card.addEventListener('click', () => {
        const artifactId = card.dataset.artifact;
        this.showArtifactDetail(artifactId);
        content.querySelectorAll('.artifact-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    if (unlockedArtifacts.length > 0) {
      this.showArtifactDetail(unlockedArtifacts[0].id);
      content.querySelector(`.artifact-card[data-artifact="${unlockedArtifacts[0].id}"]`)?.classList.add('selected');
    }
  }

  showArtifactDetail(artifactId) {
    const artifact = GAME_DATA.artifacts?.[artifactId];
    if (!artifact || !this.isArtifactUnlocked(artifactId)) return;

    const detailDiv = document.getElementById('artifact-detail');
    if (!detailDiv) return;

    detailDiv.innerHTML = `
      <div class="artifact-detail-content">
        <div class="artifact-detail-header">
          <span class="artifact-detail-icon">${artifact.icon}</span>
          <div class="artifact-detail-info">
            <div class="artifact-detail-name">${artifact.name}</div>
            <div class="artifact-detail-desc">${artifact.description}</div>
          </div>
        </div>
        <div class="artifact-lore-text">
          <div class="lore-quote">"${artifact.loreText}"</div>
        </div>
      </div>
    `;
  }

  updateTocActive() {
    document.querySelectorAll('.toc-item').forEach(item => {
      const isPageMatch = item.dataset.page === this.currentPage && this.currentView === 'page';
      const isEraMatch = item.dataset.artifactEra === this.currentPage && this.currentView === 'artifacts';
      item.classList.toggle('active', isPageMatch || isEraMatch);
    });
  }

  // ===================================================
  // Content Rendering - Delegated to Language Renderers
  // ===================================================

  renderPageContent(page) {
    if (!page.content || !page.content.type) {
      return '<p>No content available.</p>';
    }

    // Try language-specific renderer first
    const renderer = this._getLanguageRenderer();
    if (renderer && typeof renderer.renderContent === 'function') {
      const result = renderer.renderContent(page, this);
      if (result !== null && result !== undefined) {
        return result;
      }
    }

    // Fallback for pages with custom HTML content
    if (page.content.html) {
      return page.content.html;
    }

    return '<p>Content type not supported for this language.</p>';
  }

  _getLanguageRenderer() {
    // Get language-specific renderer (e.g., FrenchSpellbookRenderer)
    if (typeof LanguageSpellbook !== 'undefined') {
      return LanguageSpellbook.getRenderer();
    }

    // Fallback to French renderer
    if (typeof FrenchSpellbookRenderer !== 'undefined') {
      return FrenchSpellbookRenderer;
    }

    return null;
  }

  // Helper method for renderers to access grammar data
  getGrammarData() {
    if (typeof LanguageSpellbook !== 'undefined') {
      return LanguageSpellbook.getGrammar();
    }
    if (typeof GRAMMAR !== 'undefined') {
      return GRAMMAR;
    }
    return null;
  }
}

// =====================================================
// Global Functions
// =====================================================

let spellbookManager = null;

function initSpellbook(gameState) {
  spellbookManager = new SpellbookManager(gameState);
}

function showSpellbook() {
  console.log('[Spellbook] showSpellbook() called');

  if (!spellbookManager) {
    console.warn('[Spellbook] Manager not initialized, attempting to initialize...');
    if (typeof GameState !== 'undefined') {
      initSpellbook(GameState);
      console.log('[Spellbook] Initialized manager');
    } else {
      console.error('[Spellbook] Cannot initialize - GameState not available');
      return;
    }
  }

  if (spellbookManager) {
    console.log('[Spellbook] Calling spellbookManager.show()');
    spellbookManager.show();
  } else {
    console.error('[Spellbook] Failed to show - manager still null after init attempt');
  }
}

function hideSpellbook() {
  if (spellbookManager) {
    spellbookManager.hide();
  }
}

function unlockSpellbookPages(pageIds) {
  if (spellbookManager) {
    const newPages = spellbookManager.unlockPages(pageIds);
    if (newPages.length > 0) {
      const pages = spellbookManager.getSpellbookPages();
      const pageNames = newPages.map(id => pages[id]?.title || id).join(', ');
      if (typeof showNotification === 'function') {
        showNotification(`📖 Spellbook Updated: ${pageNames}`, 'success');
      }
    }
    return newPages;
  }
  return [];
}

function showArtifactDiscoveryModal(artifact) {
  if (!artifact) return;

  const era = SPELLBOOK_ARTIFACT_ERAS.find(e => e.id === artifact.era);
  const eraLabel = era ? era.label : 'Unknown Era';
  const eraIcon = era ? era.icon : '📜';

  const categoryNames = {
    personal_item: 'Personal Item',
    official_document: 'Official Document',
    religious: 'Religious Text',
    correspondence: 'Correspondence',
    relic: 'Ancient Relic'
  };
  const categoryName = categoryNames[artifact.category] || artifact.category;

  const modalHtml = `
    <div class="artifact-discovery-modal">
      <div class="artifact-discovery-header">
        <div class="artifact-discovery-title">🏺 ARTIFACT DISCOVERED</div>
        <div class="artifact-discovery-subtitle">${eraIcon} ${eraLabel}</div>
      </div>

      <div class="artifact-discovery-body">
        <div class="artifact-discovery-icon">${artifact.icon}</div>
        <div class="artifact-discovery-name">${artifact.name}</div>
        <div class="artifact-discovery-category">${categoryName}</div>
        <div class="artifact-discovery-description">${artifact.description}</div>

        <div class="artifact-discovery-lore">
          <div class="artifact-lore-title">Historical Significance</div>
          <div class="artifact-lore-text">"${artifact.loreText}"</div>
        </div>

        <div class="artifact-discovery-added">
          ✨ Added to your Spellbook (Press S to view)
        </div>
      </div>

      <div class="artifact-discovery-footer">
        <button class="pixel-btn" onclick="closeArtifactDiscoveryModal()">Continue</button>
        <button class="pixel-btn pixel-btn-secondary" onclick="closeArtifactDiscoveryModal(); showSpellbook();">View in Spellbook</button>
      </div>
    </div>
  `;

  if (typeof showModal === 'function') {
    showModal('artifact-discovery-modal', modalHtml);
  } else {
    const existingModal = document.getElementById('artifact-discovery-modal');
    if (existingModal) existingModal.remove();

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'artifact-discovery-modal';
    modalOverlay.className = 'modal-overlay active';
    modalOverlay.innerHTML = `<div class="modal-content">${modalHtml}</div>`;
    document.body.appendChild(modalOverlay);
  }

  if (typeof playSound === 'function') {
    playSound('artifact_found');
  }

  setTimeout(() => {
    if (typeof statsManager !== 'undefined' && statsManager.checkAllAchievements) {
      statsManager.checkAllAchievements();
    }
  }, 100);
}

function closeArtifactDiscoveryModal() {
  if (typeof hideModal === 'function') {
    hideModal('artifact-discovery-modal');
  } else {
    const modal = document.getElementById('artifact-discovery-modal');
    if (modal) modal.remove();
  }
}

function unlockArtifact(artifactId) {
  if (spellbookManager) {
    const unlocked = spellbookManager.unlockArtifact(artifactId);
    if (unlocked) {
      const artifact = GAME_DATA.artifacts?.[artifactId];
      if (artifact) {
        showArtifactDiscoveryModal(artifact);

        const era = SPELLBOOK_ARTIFACT_ERAS.find(e => e.id === artifact.era);
        if (era && spellbookManager.isEraComplete(artifact.era)) {
          setTimeout(() => {
            if (typeof showNotification === 'function') {
              showNotification(`✨ Era Complete: ${era.label}`, 'success');
            }
          }, 500);
        }
      }

      if (typeof checkAchievements === 'function') {
        checkAchievements();
      }
    }
    return unlocked;
  }
  return false;
}

function isArtifactUnlocked(artifactId) {
  if (spellbookManager) {
    return spellbookManager.isArtifactUnlocked(artifactId);
  }
  return false;
}

// =====================================================
// Global Exports
// =====================================================

window.initSpellbook = initSpellbook;
window.showSpellbook = showSpellbook;
window.hideSpellbook = hideSpellbook;
window.unlockSpellbookPages = unlockSpellbookPages;
window.unlockArtifact = unlockArtifact;
window.isArtifactUnlocked = isArtifactUnlocked;
window.showArtifactDiscoveryModal = showArtifactDiscoveryModal;
window.closeArtifactDiscoveryModal = closeArtifactDiscoveryModal;
window.getSpellbookManager = () => spellbookManager;
window.SPELLBOOK_ARTIFACT_ERAS = SPELLBOOK_ARTIFACT_ERAS;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SPELLBOOK_PAGES,
    SPELLBOOK_CATEGORIES,
    SPELLBOOK_ARTIFACT_ERAS,
    SpellbookManager,
    initSpellbook,
    showSpellbook,
    hideSpellbook,
    unlockSpellbookPages,
    unlockArtifact,
    isArtifactUnlocked
  };
}

console.log('[spellbookSystem.js] Spellbook system initialized (language-agnostic)');
