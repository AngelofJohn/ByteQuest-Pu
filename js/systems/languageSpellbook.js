// ByteQuest - Language Spellbook Loader
// Provides language-agnostic access to spellbook pages
// Follows naming convention: {LANG}_SPELLBOOK (e.g., FRENCH_SPELLBOOK, GREEK_SPELLBOOK)

const LanguageSpellbook = {
  /**
   * Get spellbook pages for current language
   * Uses naming convention: {LANG}_SPELLBOOK (e.g., FRENCH_SPELLBOOK, GREEK_SPELLBOOK)
   * @returns {object} Spellbook pages object
   */
  getPages() {
    const lang = this._getCurrentLanguage();

    // Try standard naming: {LANG}_SPELLBOOK
    const pagesVar = `${lang.toUpperCase()}_SPELLBOOK`;
    if (typeof window[pagesVar] !== 'undefined') {
      return window[pagesVar];
    }

    // Fallback: Try legacy SPELLBOOK_PAGES (for backward compatibility)
    if (typeof SPELLBOOK_PAGES !== 'undefined') {
      return SPELLBOOK_PAGES;
    }

    console.warn(`[LanguageSpellbook] No spellbook found for ${lang}`);
    return {};
  },

  /**
   * Get a specific spellbook page by ID
   * @param {string} pageId - The page ID to retrieve
   * @returns {object|null} The page object or null if not found
   */
  getPage(pageId) {
    const pages = this.getPages();
    return pages[pageId] || null;
  },

  /**
   * Get spellbook categories for current language
   * @returns {array} Array of category objects
   */
  getCategories() {
    const lang = this._getCurrentLanguage();

    // Try standard naming: {LANG}_SPELLBOOK_CATEGORIES
    const catVar = `${lang.toUpperCase()}_SPELLBOOK_CATEGORIES`;
    if (typeof window[catVar] !== 'undefined') {
      return window[catVar];
    }

    // Fallback to default categories
    if (typeof SPELLBOOK_CATEGORIES !== 'undefined') {
      return SPELLBOOK_CATEGORIES;
    }

    // Default categories if nothing else is available
    return [
      { id: "verbs", label: "Verbs", icon: "⚡" },
      { id: "grammar", label: "Grammar", icon: "📚" },
      { id: "reference", label: "Reference", icon: "📋" },
      { id: "culture", label: "Culture", icon: "🎭" },
      { id: "artifacts", label: "Artifacts", icon: "📜" }
    ];
  },

  /**
   * Get language-specific renderer if available
   * @returns {object|null} Renderer object with renderContent method, or null
   */
  getRenderer() {
    const lang = this._getCurrentLanguage();
    // Convert 'french' to 'French', 'greek' to 'Greek'
    const capitalizedLang = lang.charAt(0).toUpperCase() + lang.slice(1);
    const rendererName = `${capitalizedLang}SpellbookRenderer`;

    if (typeof window[rendererName] !== 'undefined') {
      return window[rendererName];
    }
    return null;
  },

  /**
   * Get grammar data for current language
   * Used for verb conjugations and other grammar-dependent rendering
   * @returns {object|null} Grammar data object or null
   */
  getGrammar() {
    const lang = this._getCurrentLanguage();

    // Try CourseDataManager first (preferred)
    if (typeof CourseDataManager !== 'undefined' && CourseDataManager.getGrammar) {
      const grammar = CourseDataManager.getGrammar();
      if (grammar) return grammar;
    }

    // Try language-specific grammar variable
    const grammarVar = `${lang.toUpperCase()}_GRAMMAR`;
    if (typeof window[grammarVar] !== 'undefined') {
      return window[grammarVar];
    }

    // Fallback to global GRAMMAR
    if (typeof GRAMMAR !== 'undefined') {
      return GRAMMAR;
    }

    return null;
  },

  /**
   * Get pronouns for current language
   * Used for verb conjugation tables
   * @returns {object} Pronoun display map
   */
  getPronouns() {
    const grammar = this.getGrammar();
    if (grammar && grammar.pronouns) {
      return grammar.pronouns;
    }

    // Default to French pronouns for backward compatibility
    return {
      'je': 'je',
      'tu': 'tu',
      'il': 'il / elle / on',
      'nous': 'nous',
      'vous': 'vous',
      'ils': 'ils / elles'
    };
  },

  /**
   * Get verb data for current language
   * @returns {object|null} Verbs object or null
   */
  getVerbs() {
    const lang = this._getCurrentLanguage();

    // Try language-specific verbs variable
    const verbsVar = `${lang.toUpperCase()}_VERBS`;
    if (typeof window[verbsVar] !== 'undefined') {
      return window[verbsVar];
    }

    // Try grammar.verbs
    const grammar = this.getGrammar();
    if (grammar && grammar.verbs) {
      return grammar.verbs;
    }

    return null;
  },

  /**
   * Get a specific verb by ID
   * @param {string} verbId - The verb ID to retrieve
   * @returns {object|null} Verb data or null
   */
  getVerb(verbId) {
    const verbs = this.getVerbs();
    return verbs ? verbs[verbId] : null;
  },

  /**
   * Check if spellbook data is loaded for current language
   * @returns {boolean}
   */
  isLoaded() {
    const pages = this.getPages();
    return pages && Object.keys(pages).length > 0;
  },

  /**
   * Get all page IDs for current language
   * @returns {array} Array of page IDs
   */
  getAllPageIds() {
    const pages = this.getPages();
    return Object.keys(pages);
  },

  /**
   * Get pages by category
   * @param {string} categoryId - The category to filter by
   * @returns {array} Array of page objects in that category
   */
  getPagesByCategory(categoryId) {
    const pages = this.getPages();
    return Object.values(pages).filter(page => page.category === categoryId);
  },

  /**
   * Get current language from various sources
   * @returns {string} Current language code (e.g., 'french', 'greek')
   * @private
   */
  _getCurrentLanguage() {
    // Try GameState first
    if (typeof GameState !== 'undefined' && GameState.currentLanguage) {
      return GameState.currentLanguage;
    }

    // Try LANGUAGE_CONFIG
    if (typeof LANGUAGE_CONFIG !== 'undefined' && LANGUAGE_CONFIG.current) {
      return LANGUAGE_CONFIG.current;
    }

    // Try player state in GameState
    if (typeof GameState !== 'undefined' && GameState.player && GameState.player.language) {
      return GameState.player.language;
    }

    // Default to French
    return 'french';
  }
};

// Global export
window.LanguageSpellbook = LanguageSpellbook;

console.log('[languageSpellbook.js] Language Spellbook loader initialized');
