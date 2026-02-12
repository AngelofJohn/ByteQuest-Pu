/**
 * ByteQuest - Question System
 * Language-agnostic question generation and handling
 * Works with any language course data via CourseLoader
 */

const QuestionSystem = {
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
   * Get vocabulary data for current language
   */
  getVocabData() {
    const language = this.getCurrentLanguage();
    if (typeof CourseLoader !== 'undefined') {
      return CourseLoader.getVocab(language);
    }
    return {};
  },

  /**
   * Get grammar data for current language
   */
  getGrammarData() {
    const language = this.getCurrentLanguage();
    if (typeof CourseLoader !== 'undefined') {
      return CourseLoader.getGrammar(language);
    }
    return {};
  },

  /**
   * Get fill-in-blank data for current language
   */
  getFillBlankData() {
    const language = this.getCurrentLanguage();
    const varName = language.toUpperCase() + '_FILL_BLANK';
    return (typeof window[varName] !== 'undefined') ? window[varName] : null;
  },

  /**
   * Get sentence reorder data for current language
   */
  getReorderData() {
    const language = this.getCurrentLanguage();
    const varName = language.toUpperCase() + '_REORDER';
    return (typeof window[varName] !== 'undefined') ? window[varName] : null;
  },

  // =====================================================
  // Translation Questions
  // =====================================================

  /**
   * Generate a translation question (target language to English)
   */
  generateTranslateToEnglish(category = null, subcategory = null) {
    const word = this._getRandomWord(category, subcategory);
    if (!word) return null;

    const targetField = this._getTargetLanguageField();
    const wrongAnswers = this._getWrongEnglishAnswers(word, category);

    return {
      type: 'multiple_choice',
      direction: 'to_english',
      prompt: `What does "${word[targetField]}" mean?`,
      word: word[targetField],
      romanized: word.romanized,
      correctAnswer: word.english,
      options: [word.english, ...wrongAnswers].sort(() => Math.random() - 0.5),
      hint: word.hint || '',
      xpValue: 12
    };
  },

  /**
   * Generate a translation question (English to target language)
   */
  generateTranslateToTarget(category = null, subcategory = null) {
    const word = this._getRandomWord(category, subcategory);
    if (!word) return null;

    const targetField = this._getTargetLanguageField();
    const wrongAnswers = this._getWrongTargetAnswers(word, category);

    return {
      type: 'multiple_choice',
      direction: 'to_target',
      prompt: `How do you say "${word.english}" in ${this._getLanguageName()}?`,
      english: word.english,
      correctAnswer: word[targetField],
      romanized: word.romanized,
      options: [word[targetField], ...wrongAnswers].sort(() => Math.random() - 0.5),
      hint: word.hint || '',
      xpValue: 15
    };
  },

  // =====================================================
  // Gender/Article Questions
  // =====================================================

  /**
   * Generate a gender matching question
   */
  generateGenderQuestion(category = null) {
    const vocab = this.getVocabData();
    if (!vocab) return null;

    let words = this._gatherWordsWithGender(vocab, category);
    if (words.length < 4) return null;

    const word = words[Math.floor(Math.random() * words.length)];
    const language = this.getCurrentLanguage();

    // Language-specific article mappings
    // Note: French l' is handled via word.article since it applies to both m/f before vowels
    // Dutch uses 'de' (common gender) and 'het' (neuter)
    const articleMappings = {
      french: { m: 'le', f: 'la', pl: 'les', elision: "l'" },
      greek: { m: 'ο', f: 'η', n: 'το' },
      german: { m: 'der', f: 'die', n: 'das' },
      spanish: { m: 'el', f: 'la' },
      italian: { m: 'il', f: 'la' },
      dutch: { de: 'de', het: 'het' }
    };

    const articles = articleMappings[language] || articleMappings.french;
    // Use the word's actual article if available (handles l' cases), otherwise map from gender
    const correctArticle = word.article || articles[word.gender];
    const otherArticles = Object.values(articles).filter(a => a !== correctArticle);

    const targetField = this._getTargetLanguageField();

    // For gender questions, show the base word without article
    // Dutch words include "de" or "het" in the dutch field, need to strip it
    let displayWord = word.frenchBase || word.greekBase || word.dutchBase || word[targetField];
    if (language === 'dutch' && displayWord) {
      // Strip "de " or "het " prefix if present
      displayWord = displayWord.replace(/^(de|het)\s+/i, '');
    }

    return {
      type: 'gender_match',
      prompt: 'What is the correct article for this word?',
      word: displayWord,
      romanized: word.romanized,
      english: word.english,
      correctAnswer: correctArticle,
      options: [correctArticle, ...otherArticles].sort(() => Math.random() - 0.5),
      hint: word.hint || 'Think about the word ending',
      xpValue: 12
    };
  },

  // =====================================================
  // Conjugation Questions
  // =====================================================

  /**
   * Generate verb conjugation question
   */
  generateConjugationQuestion(verbKey = null) {
    const grammar = this.getGrammarData();
    if (!grammar.verbs) return null;

    const verbKeys = Object.keys(grammar.verbs);
    if (verbKeys.length === 0) return null;

    const selectedKey = verbKey || verbKeys[Math.floor(Math.random() * verbKeys.length)];
    const verb = grammar.verbs[selectedKey];

    if (!verb || !verb.present) return null;

    const pronouns = Object.keys(verb.present);
    const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
    const correctForm = verb.present[pronoun];

    const wrongAnswers = pronouns
      .filter(p => verb.present[p] !== correctForm)
      .map(p => verb.present[p])
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    // Get verb display name based on language
    const verbDisplay = verb.dictionary || verb.verb || verb.infinitive || selectedKey;
    const verbEnglish = verb.english || '';

    return {
      type: 'conjugation',
      prompt: `Conjugate "${verbDisplay}" (${verbEnglish}) for "${pronoun}"`,
      verb: verbDisplay,
      verbEnglish: verbEnglish,
      pronoun: pronoun,
      correctAnswer: correctForm,
      options: [correctForm, ...wrongAnswers].sort(() => Math.random() - 0.5),
      hint: verb.hint || '',
      xpValue: 15
    };
  },

  // =====================================================
  // Fill-in-the-Blank Questions
  // =====================================================

  /**
   * Generate a fill-in-the-blank question
   */
  generateFillBlankQuestion(category = null) {
    const fillBlank = this.getFillBlankData();
    if (!fillBlank) return null;

    const categories = Object.keys(fillBlank);
    if (categories.length === 0) return null;

    const selectedCategory = category && fillBlank[category] ? category : categories[0];
    const sentences = fillBlank[selectedCategory];

    if (!sentences || sentences.length === 0) return null;

    const item = sentences[Math.floor(Math.random() * sentences.length)];
    const allOptions = [item.answer, ...(item.distractors || item.options || [])].sort(() => Math.random() - 0.5);

    return {
      type: 'fill_blank',
      prompt: item.sentence,
      english: item.english || item.translation,
      correctAnswer: item.answer,
      options: allOptions,
      hint: item.hint || '',
      xpValue: 15
    };
  },

  // =====================================================
  // Sentence Reorder Questions
  // =====================================================

  /**
   * Generate a sentence reorder question
   */
  generateReorderQuestion(category = null) {
    const reorder = this.getReorderData();
    if (!reorder) return null;

    const categories = Object.keys(reorder);
    if (categories.length === 0) return null;

    const selectedCategory = category && reorder[category] ? category : categories[0];
    const sentences = reorder[selectedCategory];

    if (!sentences || sentences.length === 0) return null;

    const sentence = sentences[Math.floor(Math.random() * sentences.length)];
    const shuffledWords = [...sentence.words].sort(() => Math.random() - 0.5);

    // Ensure shuffled order differs from correct order
    if (shuffledWords.join(' ') === sentence.words.join(' ') && sentence.words.length > 2) {
      [shuffledWords[0], shuffledWords[1]] = [shuffledWords[1], shuffledWords[0]];
    }

    const targetField = this._getTargetLanguageField();

    return {
      type: 'sentence_reorder',
      prompt: 'Arrange the words in the correct order:',
      english: sentence.english,
      shuffledWords: shuffledWords,
      correctOrder: sentence.words,
      correctAnswer: sentence[targetField] || sentence.words.join(' '),
      hint: `Start with "${sentence.words[0]}"`,
      xpValue: 18
    };
  },

  // =====================================================
  // Case Selection (Greek-specific but extensible)
  // =====================================================

  /**
   * Generate a case selection question (for languages with grammatical cases)
   */
  generateCaseQuestion() {
    const grammar = this.getGrammarData();

    // Check if language has case data
    if (!grammar.cases && !grammar.caseExamples) {
      return null;
    }

    const caseExamples = grammar.caseExamples || {
      nominative: [
        { sentence: "__ dog runs.", answer: "The", english: "The dog runs.", explanation: "Subject = nominative" }
      ]
    };

    const caseTypes = Object.keys(caseExamples);
    const caseType = caseTypes[Math.floor(Math.random() * caseTypes.length)];
    const examples = caseExamples[caseType];
    const example = examples[Math.floor(Math.random() * examples.length)];

    // Gather all possible answers for wrong options
    const allAnswers = new Set();
    Object.values(caseExamples).forEach(exs => {
      exs.forEach(ex => allAnswers.add(ex.answer));
    });

    const wrongAnswers = Array.from(allAnswers)
      .filter(a => a !== example.answer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return {
      type: 'case_selection',
      subtype: caseType,
      prompt: 'Fill in the blank with the correct form:',
      sentence: example.sentence,
      english: example.english,
      correctAnswer: example.answer,
      options: [example.answer, ...wrongAnswers].sort(() => Math.random() - 0.5),
      hint: example.explanation,
      xpValue: 15
    };
  },

  // =====================================================
  // Mixed Question Generation
  // =====================================================

  /**
   * Generate mixed questions for a lesson
   * @param {object} config - { count, category, subcategory, types }
   */
  generateQuestions(config = {}) {
    const questions = [];
    const count = config.count || 10;
    const category = config.category;
    const subcategory = config.subcategory;
    const types = config.types || ['translate_english', 'translate_target', 'gender', 'fill_blank', 'reorder'];

    for (let i = 0; i < count; i++) {
      let question = null;
      const typeIndex = Math.floor(Math.random() * types.length);
      const type = types[typeIndex];

      switch (type) {
        case 'translate_english':
          question = this.generateTranslateToEnglish(category, subcategory);
          break;
        case 'translate_target':
          question = this.generateTranslateToTarget(category, subcategory);
          break;
        case 'gender':
          question = this.generateGenderQuestion(category);
          break;
        case 'conjugation':
          question = this.generateConjugationQuestion();
          break;
        case 'fill_blank':
          question = this.generateFillBlankQuestion(category);
          break;
        case 'reorder':
          question = this.generateReorderQuestion(category);
          break;
        case 'case':
          question = this.generateCaseQuestion();
          break;
        default:
          question = this.generateTranslateToEnglish(category, subcategory);
      }

      if (question) {
        questions.push(question);
      }
    }

    return questions.sort(() => Math.random() - 0.5);
  },

  // =====================================================
  // Helper Methods
  // =====================================================

  /**
   * Get the field name for the target language in vocabulary
   * French uses 'french', Greek uses 'greek', etc.
   */
  _getTargetLanguageField() {
    const language = this.getCurrentLanguage();
    return language; // 'french', 'greek', 'spanish', etc.
  },

  /**
   * Get display name for current language
   */
  _getLanguageName() {
    const language = this.getCurrentLanguage();
    const names = {
      french: 'French',
      greek: 'Greek',
      spanish: 'Spanish',
      german: 'German',
      italian: 'Italian',
      dutch: 'Dutch'
    };
    return names[language] || language.charAt(0).toUpperCase() + language.slice(1);
  },

  /**
   * Get a random word from vocabulary
   */
  _getRandomWord(category = null, subcategory = null) {
    const vocab = this.getVocabData();
    if (!vocab) return null;

    let words = [];

    if (category && subcategory && vocab[category] && vocab[category][subcategory]) {
      words = vocab[category][subcategory];
    } else if (category && vocab[category]) {
      Object.values(vocab[category]).forEach(sub => {
        if (Array.isArray(sub)) words = words.concat(sub);
      });
    } else {
      Object.entries(vocab).forEach(([key, cat]) => {
        if (key === '_meta') return;
        if (typeof cat === 'object') {
          Object.values(cat).forEach(sub => {
            if (Array.isArray(sub)) words = words.concat(sub);
          });
        }
      });
    }

    if (words.length === 0) return null;
    return words[Math.floor(Math.random() * words.length)];
  },

  /**
   * Gather words that have gender information
   */
  _gatherWordsWithGender(vocab, category = null) {
    let words = [];

    // Filter function: word has gender info (either gender+article or just gender for Dutch)
    const hasGenderInfo = (w) => {
      // Dutch uses gender field directly as the article (de/het)
      if (w.gender === 'de' || w.gender === 'het') return true;
      // Other languages use gender + article
      return w.gender && w.article;
    };

    if (category && vocab[category]) {
      Object.values(vocab[category]).forEach(sub => {
        if (Array.isArray(sub)) {
          words = words.concat(sub.filter(hasGenderInfo));
        }
      });
    } else {
      Object.entries(vocab).forEach(([key, cat]) => {
        if (key === '_meta') return;
        if (typeof cat === 'object') {
          Object.values(cat).forEach(sub => {
            if (Array.isArray(sub)) {
              words = words.concat(sub.filter(hasGenderInfo));
            }
          });
        }
      });
    }

    return words;
  },

  /**
   * Get wrong English answers for translation questions
   */
  _getWrongEnglishAnswers(correctWord, category = null) {
    const vocab = this.getVocabData();
    const allWords = [];

    if (category && vocab[category]) {
      Object.values(vocab[category]).forEach(sub => {
        if (Array.isArray(sub)) allWords.push(...sub);
      });
    }

    if (allWords.length < 4) {
      Object.entries(vocab).forEach(([key, cat]) => {
        if (key === '_meta' || key === category) return;
        if (typeof cat === 'object') {
          Object.values(cat).forEach(sub => {
            if (Array.isArray(sub)) allWords.push(...sub);
          });
        }
      });
    }

    return allWords
      .filter(w => w.english !== correctWord.english)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.english);
  },

  /**
   * Get wrong target language answers for translation questions
   */
  _getWrongTargetAnswers(correctWord, category = null) {
    const vocab = this.getVocabData();
    const targetField = this._getTargetLanguageField();
    const allWords = [];

    if (category && vocab[category]) {
      Object.values(vocab[category]).forEach(sub => {
        if (Array.isArray(sub)) allWords.push(...sub);
      });
    }

    if (allWords.length < 4) {
      Object.entries(vocab).forEach(([key, cat]) => {
        if (key === '_meta' || key === category) return;
        if (typeof cat === 'object') {
          Object.values(cat).forEach(sub => {
            if (Array.isArray(sub)) allWords.push(...sub);
          });
        }
      });
    }

    return allWords
      .filter(w => w[targetField] !== correctWord[targetField])
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w[targetField]);
  }
};

// Make globally accessible
window.QuestionSystem = QuestionSystem;
