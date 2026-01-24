/**
 * ByteQuest - Course Data Manager
 * Centralized manager for active course DATA access
 *
 * This is the SINGLE SOURCE OF TRUTH for accessing course data.
 * All systems should use CourseDataManager instead of directly referencing
 * FRENCH_VOCAB, GREEK_QUESTS, etc.
 *
 * Architecture:
 * - CourseLoader: Loads script files into memory (one-time operation)
 * - CourseManager (titleScreen.js): Manages user course metadata (localStorage)
 * - CourseDataManager (this file): Provides unified API to access loaded course data
 * - QuestManager: Uses CourseDataManager to get quests, manages quest state
 * - LessonSystem: Uses CourseDataManager to get vocabulary
 */

const CourseDataManager = {
  // Current active course
  currentCourse: null,

  // Cached references to current course data
  _vocab: null,
  _quests: null,
  _grammar: null,
  _npcs: null,

  /**
   * Initialize with a course
   * @param {string} courseId - Course identifier (e.g., 'french', 'greek')
   * @returns {boolean} Success status
   */
  initialize(courseId) {
    if (!courseId) {
      console.error('[CourseManager] No courseId provided');
      return false;
    }

    // Check if course is loaded via CourseLoader
    if (typeof CourseLoader !== 'undefined' && !CourseLoader.isLoaded(courseId)) {
      console.warn(`[CourseManager] Course not loaded: ${courseId}. Call CourseLoader.loadCourse() first.`);
    }

    this.currentCourse = courseId;
    this._clearCache();

    console.log(`[CourseManager] Initialized for course: ${courseId}`);
    return true;
  },

  /**
   * Clear cached references (called when switching courses)
   */
  _clearCache() {
    this._vocab = null;
    this._quests = null;
    this._grammar = null;
    this._npcs = null;
  },

  /**
   * Get the current course ID
   * @returns {string|null}
   */
  getCurrentCourseId() {
    return this.currentCourse;
  },

  /**
   * Get course info from manifest
   * @returns {object|null}
   */
  getCourseInfo() {
    if (!this.currentCourse) return null;
    if (typeof COURSE_MANIFEST === 'undefined') return null;
    return COURSE_MANIFEST.getCourse(this.currentCourse);
  },

  // =====================================================
  // VOCABULARY ACCESS
  // =====================================================

  /**
   * Get vocabulary for current course
   * @returns {object} Vocabulary data
   */
  getVocab() {
    if (this._vocab) return this._vocab;

    if (!this.currentCourse) {
      console.warn('[CourseManager] No course initialized');
      return {};
    }

    // Use CourseLoader if available
    if (typeof CourseLoader !== 'undefined') {
      this._vocab = CourseLoader.getVocab(this.currentCourse);
      return this._vocab;
    }

    // Fallback: direct window access
    const varName = this._getVarName('vocab');
    this._vocab = (typeof window[varName] !== 'undefined') ? window[varName] : {};
    return this._vocab;
  },

  /**
   * Get vocabulary for a specific category
   * @param {string} category - Category name (e.g., 'greetings', 'numbers')
   * @returns {array} Array of vocabulary items
   */
  getVocabCategory(category) {
    const vocab = this.getVocab();

    // Handle nested structure (e.g., Greek: vocab.basics.greetings)
    if (vocab[category]) {
      // Direct category match
      if (Array.isArray(vocab[category])) {
        return vocab[category];
      }
      // Category has subcategories - flatten them
      if (typeof vocab[category] === 'object') {
        let words = [];
        Object.values(vocab[category]).forEach(sub => {
          if (Array.isArray(sub)) {
            words = words.concat(sub);
          }
        });
        return words;
      }
    }

    // Check if it's a subcategory (e.g., 'basics.greetings')
    if (category.includes('.')) {
      const [cat, subcat] = category.split('.');
      if (vocab[cat] && vocab[cat][subcat]) {
        return Array.isArray(vocab[cat][subcat]) ? vocab[cat][subcat] : [];
      }
    }

    // Search all categories for this subcategory
    for (const cat of Object.values(vocab)) {
      if (typeof cat === 'object' && !Array.isArray(cat)) {
        if (cat[category] && Array.isArray(cat[category])) {
          return cat[category];
        }
      }
    }

    return [];
  },

  /**
   * Get all vocabulary as flat array
   * @returns {array} All vocabulary items
   */
  getAllVocab() {
    const vocab = this.getVocab();
    let allWords = [];

    const flatten = (obj) => {
      if (Array.isArray(obj)) {
        allWords = allWords.concat(obj);
      } else if (typeof obj === 'object' && obj !== null) {
        Object.values(obj).forEach(flatten);
      }
    };

    flatten(vocab);
    return allWords;
  },

  // =====================================================
  // QUEST ACCESS
  // =====================================================

  /**
   * Get quests for current course
   * @returns {object} Quest definitions
   */
  getQuests() {
    if (this._quests) return this._quests;

    if (!this.currentCourse) {
      console.warn('[CourseManager] No course initialized');
      return {};
    }

    // Use CourseLoader if available
    if (typeof CourseLoader !== 'undefined') {
      this._quests = CourseLoader.getQuests(this.currentCourse);
      return this._quests;
    }

    // Fallback: direct window access
    const varName = this._getVarName('quests');
    this._quests = (typeof window[varName] !== 'undefined') ? window[varName] : {};
    return this._quests;
  },

  /**
   * Get a specific quest by ID
   * @param {string} questId - Quest identifier
   * @returns {object|null} Quest definition
   */
  getQuest(questId) {
    const quests = this.getQuests();
    return quests[questId] || null;
  },

  /**
   * Get quests by type
   * @param {string} type - Quest type (e.g., 'lesson', 'main', 'side')
   * @returns {array} Array of quests
   */
  getQuestsByType(type) {
    const quests = this.getQuests();
    return Object.values(quests).filter(q => q.type === type && q.id);
  },

  /**
   * Get quests by category
   * @param {string} category - Quest category
   * @returns {array} Array of quests
   */
  getQuestsByCategory(category) {
    const quests = this.getQuests();
    return Object.values(quests).filter(q => q.category === category && q.id);
  },

  /**
   * Get quests for a specific NPC
   * @param {string} npcId - NPC identifier
   * @returns {array} Array of quests given by this NPC
   */
  getQuestsForNPC(npcId) {
    const quests = this.getQuests();
    return Object.values(quests).filter(q => q.giver === npcId && q.id);
  },

  // =====================================================
  // GRAMMAR ACCESS
  // =====================================================

  /**
   * Get grammar data for current course
   * @returns {object} Grammar data
   */
  getGrammar() {
    if (this._grammar) return this._grammar;

    if (!this.currentCourse) {
      console.warn('[CourseManager] No course initialized');
      return {};
    }

    // Use CourseLoader if available
    if (typeof CourseLoader !== 'undefined') {
      this._grammar = CourseLoader.getGrammar(this.currentCourse);
      return this._grammar;
    }

    // Fallback: direct window access
    const varName = this._getVarName('grammar');
    this._grammar = (typeof window[varName] !== 'undefined') ? window[varName] : {};
    return this._grammar;
  },

  /**
   * Get verb conjugations
   * @param {string} verbId - Verb identifier (e.g., 'etre', 'eime')
   * @returns {object|null} Verb conjugation data
   */
  getVerbConjugation(verbId) {
    const grammar = this.getGrammar();

    // Check common structures
    if (grammar.verbs && grammar.verbs[verbId]) {
      return grammar.verbs[verbId];
    }
    if (grammar.conjugations && grammar.conjugations[verbId]) {
      return grammar.conjugations[verbId];
    }

    return null;
  },

  /**
   * Get articles
   * @returns {object} Article definitions
   */
  getArticles() {
    const grammar = this.getGrammar();
    return grammar.articles || {};
  },

  /**
   * Get pronouns
   * @returns {object} Pronoun definitions
   */
  getPronouns() {
    const grammar = this.getGrammar();
    return grammar.pronouns || {};
  },

  // =====================================================
  // NPC ACCESS
  // =====================================================

  /**
   * Get NPCs for current course
   * @returns {object} NPC definitions
   */
  getNPCs() {
    if (this._npcs) return this._npcs;

    if (!this.currentCourse) {
      console.warn('[CourseManager] No course initialized');
      return {};
    }

    // Check for course-specific NPCs
    const varName = `${this.currentCourse.toUpperCase()}_NPCS`;
    if (typeof window[varName] !== 'undefined') {
      this._npcs = window[varName];
      return this._npcs;
    }

    // Fallback to shared NPCs
    if (typeof SHARED_NPCS !== 'undefined') {
      this._npcs = SHARED_NPCS;
      return this._npcs;
    }

    return {};
  },

  /**
   * Get a specific NPC
   * @param {string} npcId - NPC identifier
   * @returns {object|null} NPC definition
   */
  getNPC(npcId) {
    const npcs = this.getNPCs();
    return npcs[npcId] || null;
  },

  // =====================================================
  // LESSON MAPPING (for cross-language compatibility)
  // =====================================================

  /**
   * Map a generic lesson ID to course-specific lesson
   * Useful when quests reference lessons by generic names
   * @param {string} lessonId - Generic lesson ID
   * @returns {string} Course-specific lesson ID
   */
  mapLessonId(lessonId) {
    // Check for course-specific mapping
    const mappingVar = `${this.currentCourse.toUpperCase()}_LESSON_MAPPING`;
    if (typeof window[mappingVar] !== 'undefined') {
      const mapping = window[mappingVar];
      if (mapping[lessonId]) {
        return mapping[lessonId];
      }
    }

    // Return as-is if no mapping found
    return lessonId;
  },

  /**
   * Get the vocabulary category for a lesson
   * Maps lesson IDs like 'greetings_vocab' to vocab categories
   * @param {string} lessonId - Lesson identifier
   * @returns {string|null} Vocabulary category
   */
  getLessonVocabCategory(lessonId) {
    // Standard mapping pattern: {category}_vocab -> {category}
    if (lessonId.endsWith('_vocab')) {
      return lessonId.replace('_vocab', '');
    }

    // Check quest objectives for vocabularySource
    const quest = this.getQuest(lessonId);
    if (quest && quest.objectives) {
      for (const obj of quest.objectives) {
        if (obj.vocabularySource) {
          const { category, subcategory } = obj.vocabularySource;
          return subcategory ? `${category}.${subcategory}` : category;
        }
        if (obj.lesson) {
          // Recursive lookup
          return this.getLessonVocabCategory(obj.lesson);
        }
      }
    }

    return null;
  },

  // =====================================================
  // HELPERS
  // =====================================================

  /**
   * Get the global variable name for a data type
   * @param {string} type - Data type ('vocab', 'quests', 'grammar')
   * @returns {string} Variable name
   */
  _getVarName(type) {
    if (!this.currentCourse) return '';

    // Check manifest first
    if (typeof COURSE_MANIFEST !== 'undefined') {
      const course = COURSE_MANIFEST.getCourse(this.currentCourse);
      if (course && course.vars && course.vars[type]) {
        return course.vars[type];
      }
    }

    // Fallback naming convention: {LANGUAGE}_{TYPE}
    return `${this.currentCourse.toUpperCase()}_${type.toUpperCase()}`;
  },

  /**
   * Check if course has a specific feature
   * @param {string} feature - Feature name
   * @returns {boolean}
   */
  hasFeature(feature) {
    const info = this.getCourseInfo();
    if (!info) return false;
    return info.features && info.features.includes(feature);
  },

  /**
   * Get course display name
   * @returns {string}
   */
  getCourseName() {
    const info = this.getCourseInfo();
    return info ? info.name : this.currentCourse || 'Unknown';
  },

  /**
   * Get course native name
   * @returns {string}
   */
  getCourseNativeName() {
    const info = this.getCourseInfo();
    return info ? info.nativeName : this.currentCourse || 'Unknown';
  },

  /**
   * Get course flag emoji
   * @returns {string}
   */
  getCourseFlag() {
    const info = this.getCourseInfo();
    return info ? info.flag : '';
  }
};

// Make globally accessible
if (typeof window !== 'undefined') {
  window.CourseDataManager = CourseDataManager;
}

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CourseDataManager };
}

console.log('[courseManager.js] CourseDataManager loaded');
