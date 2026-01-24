/**
 * ByteQuest - Course Loader
 * Dynamically loads course data based on the manifest
 * Keeps index.html clean by loading only needed course files
 */

const CourseLoader = {
  // Track loaded courses
  loaded: {},

  /**
   * Load a course by language ID
   * @param {string} languageId - Language code (e.g., 'french', 'greek')
   * @returns {Promise<boolean>} - Success status
   */
  async loadCourse(languageId) {
    // Already loaded
    if (this.loaded[languageId]) {
      console.log(`[CourseLoader] Course already loaded: ${languageId}`);
      // Still set global GRAMMAR in case it was cleared or not set
      const grammarData = this.getGrammar(languageId);
      if (grammarData && Object.keys(grammarData).length > 0) {
        window.GRAMMAR = grammarData;
      }
      return true;
    }

    // Check manifest
    if (typeof COURSE_MANIFEST === 'undefined') {
      console.error('[CourseLoader] COURSE_MANIFEST not found');
      return false;
    }

    const course = COURSE_MANIFEST.getCourse(languageId);
    if (!course) {
      console.warn(`[CourseLoader] Unknown language: ${languageId}`);
      return false;
    }

    if (!course.available) {
      console.warn(`[CourseLoader] Course not available: ${languageId}`);
      return false;
    }

    console.log(`[CourseLoader] Loading course: ${languageId}`);

    try {
      // Load all scripts for this course
      for (const src of course.scripts) {
        await this.loadScript(src);
      }

      this.loaded[languageId] = true;
      console.log(`[CourseLoader] Successfully loaded: ${languageId}`);

      // Set global GRAMMAR reference to this language's grammar data
      // This allows systems like Spellbook to use GRAMMAR without language checks
      const grammarData = this.getGrammar(languageId);
      if (grammarData && Object.keys(grammarData).length > 0) {
        window.GRAMMAR = grammarData;
        console.log(`[CourseLoader] Set global GRAMMAR for ${languageId}`);
      }

      return true;
    } catch (error) {
      console.error(`[CourseLoader] Failed to load ${languageId}:`, error);
      return false;
    }
  },

  /**
   * Load a script dynamically
   * @param {string} src - Script source path
   * @returns {Promise}
   */
  loadScript(src) {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.head.appendChild(script);
    });
  },

  /**
   * Get quests for a language
   * @param {string} languageId - Language code
   * @returns {object} - Quest definitions or empty object
   */
  getQuests(languageId) {
    if (typeof COURSE_MANIFEST === 'undefined') return {};

    const course = COURSE_MANIFEST.getCourse(languageId);
    if (!course || !course.vars.quests) return {};

    const varName = course.vars.quests;
    return (typeof window[varName] !== 'undefined') ? window[varName] : {};
  },

  /**
   * Get vocabulary for a language
   * @param {string} languageId - Language code
   * @returns {object} - Vocabulary data or empty object
   */
  getVocab(languageId) {
    if (typeof COURSE_MANIFEST === 'undefined') return {};

    const course = COURSE_MANIFEST.getCourse(languageId);
    if (!course || !course.vars.vocab) return {};

    const varName = course.vars.vocab;
    return (typeof window[varName] !== 'undefined') ? window[varName] : {};
  },

  /**
   * Get grammar data for a language
   * @param {string} languageId - Language code
   * @returns {object} - Grammar data or empty object
   */
  getGrammar(languageId) {
    if (typeof COURSE_MANIFEST === 'undefined') return {};

    const course = COURSE_MANIFEST.getCourse(languageId);
    if (!course || !course.vars.grammar) return {};

    const varName = course.vars.grammar;
    return (typeof window[varName] !== 'undefined') ? window[varName] : {};
  },

  /**
   * Check if a course is loaded
   * @param {string} languageId - Language code
   * @returns {boolean}
   */
  isLoaded(languageId) {
    return this.loaded[languageId] === true;
  }
};

// Make globally accessible
window.CourseLoader = CourseLoader;
