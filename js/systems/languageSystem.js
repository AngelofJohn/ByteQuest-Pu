// ByteQuest - Language Manager
// Handles language switching and coordinates reload of language-dependent systems

class LanguageManager {
  constructor() {
    this.current = 'french';  // Default language
    this.languages = {
      french: {
        name: 'Français',
        englishName: 'French',
        flag: '🇫🇷'
      },
      greek: {
        name: 'Ελληνικά',
        englishName: 'Greek',
        flag: '🇬🇷'
      }
    };
  }

  /**
   * Set current language and reload systems
   * @param {string} languageCode - Language code (e.g., 'greek', 'french')
   * @returns {boolean} Success
   */
  setLanguage(languageCode) {
    if (!this.languages[languageCode]) {
      console.error(`[LanguageManager] Unknown language: ${languageCode}`);
      return false;
    }

    const previousLanguage = this.current;
    this.current = languageCode;

    console.log(`[LanguageManager] Language changed: ${previousLanguage} -> ${languageCode}`);

    // Reload all language-dependent systems
    this.reloadSystems();

    return true;
  }

  /**
   * Reload all systems with new language data
   */
  reloadSystems() {
    console.log(`[LanguageManager] Reloading systems for language: ${this.current}`);

    // Reload quests
    if (typeof questSystemNew !== 'undefined') {
      questSystemNew.loadQuests(this.current);
    }

    // Reload vocabulary (if we create VocabularySystem later)
    // if (typeof vocabularySystem !== 'undefined') {
    //   vocabularySystem.loadVocabulary(this.current);
    // }

    // Update UI
    if (typeof renderLocation === 'function') {
      renderLocation();
    }

    if (typeof renderQuestPanel === 'function') {
      renderQuestPanel();
    }
  }

  /**
   * Get current language code
   * @returns {string} Current language code
   */
  getCurrent() {
    return this.current;
  }

  /**
   * Get language display name
   * @param {string} languageCode - Optional language code, uses current if not specified
   * @returns {string} Display name
   */
  getDisplayName(languageCode = null) {
    const lang = languageCode || this.current;
    return this.languages[lang]?.name || lang;
  }

  /**
   * Get English name of language
   * @param {string} languageCode - Optional language code, uses current if not specified
   * @returns {string} English name
   */
  getEnglishName(languageCode = null) {
    const lang = languageCode || this.current;
    return this.languages[lang]?.englishName || lang;
  }

  /**
   * Get all available languages
   * @returns {object} Language definitions
   */
  getAllLanguages() {
    return this.languages;
  }

  /**
   * Check if language exists
   * @param {string} languageCode - Language code to check
   * @returns {boolean}
   */
  hasLanguage(languageCode) {
    return !!this.languages[languageCode];
  }
}

// Create global instance
const languageManager = new LanguageManager();

// Create LANGUAGE_CONFIG for backward compatibility
// This object mirrors the languageManager but uses the legacy interface
const LANGUAGE_CONFIG = {
  get current() {
    return languageManager.current;
  },
  set current(value) {
    languageManager.current = value;
  },
  get languages() {
    return languageManager.languages;
  },
  setCurrent(lang) {
    return languageManager.setLanguage(lang);
  }
};

// Make globally accessible
window.languageManager = languageManager;
window.LANGUAGE_CONFIG = LANGUAGE_CONFIG;
