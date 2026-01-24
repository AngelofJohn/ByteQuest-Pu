/**
 * ByteQuest - Grammar System
 * Handles grammar question generation and quiz logic
 * Works with language-specific grammar data (FRENCH_GRAMMAR, GREEK_GRAMMAR, etc.)
 */

const GrammarSystem = {
  // Question types
  QuestionTypes: {
    FILL_IN_BLANK: 'fill_in_blank',
    CONJUGATION: 'conjugation',
    GENDER_MATCH: 'gender_match'
  },

  /**
   * Get grammar data for the current language
   * @returns {object} Grammar data or empty object
   */
  getGrammarData() {
    const language = this.getCurrentLanguage();

    // Use CourseLoader if available
    if (typeof CourseLoader !== 'undefined') {
      return CourseLoader.getGrammar(language);
    }

    // Fallback to direct variable check
    if (typeof COURSE_MANIFEST !== 'undefined') {
      const course = COURSE_MANIFEST.getCourse(language);
      if (course && course.vars.grammar) {
        const varName = course.vars.grammar;
        return (typeof window[varName] !== 'undefined') ? window[varName] : {};
      }
    }

    return {};
  },

  /**
   * Get current language from GameState
   */
  getCurrentLanguage() {
    if (typeof GameState !== 'undefined') {
      return GameState.currentLanguage || GameState.player?.language || 'french';
    }
    return 'french';
  },

  /**
   * Generate fill-in-the-blank questions
   * @param {string} topic - Topic key from grammar.fillInBlank
   * @param {number} count - Number of questions to generate
   * @returns {Array} Array of question objects
   */
  generateFillInBlankQuestions(topic, count = 8) {
    const grammar = this.getGrammarData();
    if (!grammar.fillInBlank) return [];

    const topicData = grammar.fillInBlank[topic];
    if (!topicData) {
      console.error('[GrammarSystem] Topic not found:', topic);
      return [];
    }

    const questions = [];
    const shuffled = [...topicData.questions].sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
      const q = shuffled[i];
      questions.push({
        type: this.QuestionTypes.FILL_IN_BLANK,
        prompt: 'Complete the sentence:',
        word: q.sentence,
        correctAnswer: q.answer,
        options: [...q.options].sort(() => Math.random() - 0.5),
        hint: q.hint,
        translation: q.translation,
        spellbookRef: topicData.spellbookRef
      });
    }

    return questions;
  },

  /**
   * Generate conjugation questions
   * @param {string} verb - Verb key from grammar.conjugation
   * @param {number} count - Number of questions to generate
   * @returns {Array} Array of question objects
   */
  generateConjugationQuestions(verb, count = 8) {
    const grammar = this.getGrammarData();
    if (!grammar.conjugation) return [];

    const verbData = grammar.conjugation[verb];
    if (!verbData) {
      console.error('[GrammarSystem] Verb not found:', verb);
      return [];
    }

    const questions = [];
    const shuffled = [...verbData.questions].sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
      const q = shuffled[i];
      questions.push({
        type: this.QuestionTypes.CONJUGATION,
        prompt: `Conjugate "${verbData.verb}" (${verbData.english}):`,
        word: q.pronoun,
        correctAnswer: q.answer,
        options: [...q.options].sort(() => Math.random() - 0.5),
        hint: `${q.pronoun} + ${verbData.verb}`,
        verb: verbData.verb,
        spellbookRef: verb
      });
    }

    return questions;
  },

  /**
   * Generate gender match questions
   * @param {string} articleType - 'definite' or 'indefinite'
   * @param {number} count - Number of questions to generate
   * @returns {Array} Array of question objects
   */
  generateGenderMatchQuestions(articleType = 'definite', count = 8) {
    const grammar = this.getGrammarData();
    if (!grammar.genderMatch) return [];

    const typeData = grammar.genderMatch[articleType];
    if (!typeData) {
      console.error('[GrammarSystem] Article type not found:', articleType);
      return [];
    }

    const questions = [];
    const shuffled = [...typeData.questions].sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
      const q = shuffled[i];
      questions.push({
        type: this.QuestionTypes.GENDER_MATCH,
        prompt: 'Choose the correct article:',
        word: `___ ${q.noun}`,
        correctAnswer: q.answer,
        options: [...q.options].sort(() => Math.random() - 0.5),
        hint: q.hint,
        english: q.english,
        noun: q.noun,
        spellbookRef: 'articles'
      });
    }

    return questions;
  },

  /**
   * Generate mixed grammar questions for a quest
   * @param {Array} topics - Array of topic configs [{type, topic, count}]
   * @returns {Array} Array of question objects
   */
  generateQuestions(topics) {
    let allQuestions = [];

    topics.forEach(config => {
      let questions = [];

      switch (config.type) {
        case 'fill_in_blank':
          questions = this.generateFillInBlankQuestions(config.topic, config.count || 4);
          break;
        case 'conjugation':
          questions = this.generateConjugationQuestions(config.topic, config.count || 4);
          break;
        case 'gender_match':
          questions = this.generateGenderMatchQuestions(config.topic, config.count || 4);
          break;
      }

      allQuestions = allQuestions.concat(questions);
    });

    // Shuffle all questions together
    return allQuestions.sort(() => Math.random() - 0.5);
  },

  /**
   * Get verb conjugation reference data
   * @param {string} verbKey - Verb key from grammar data (e.g., 'etre', 'einai')
   * @returns {object|null} Verb data or null
   */
  getVerbData(verbKey) {
    const grammar = this.getGrammarData();
    return grammar.verbs?.[verbKey] || null;
  },

  /**
   * Get pronoun reference data
   * @returns {object} Pronoun data
   */
  getPronouns() {
    const grammar = this.getGrammarData();
    return grammar.pronouns || { singular: [], plural: [] };
  }
};

// Make globally accessible
window.GrammarSystem = GrammarSystem;
