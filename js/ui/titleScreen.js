/**
 * ByteQuest Title Screen & Course Management
 * Minimal implementation for New Game / Continue flow
 */

// ============================================
// Course Manager
// ============================================

const CourseManager = {
  STORAGE_KEY: 'bytequest_courses',
  CURRENT_KEY: 'bytequest_current_course',

  /**
   * Get all courses
   */
  getCourses() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  },

  /**
   * Save courses to storage
   */
  saveCourses(courses) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(courses));
  },

  /**
   * Get current course ID
   */
  getCurrentCourseId() {
    return localStorage.getItem(this.CURRENT_KEY);
  },

  /**
   * Set current course
   */
  setCurrentCourse(courseId) {
    localStorage.setItem(this.CURRENT_KEY, courseId);
  },

  /**
   * Create a new course
   */
  createCourse(language) {
    const courses = this.getCourses();
    const courseId = `${language}_${Date.now()}`;

    courses[courseId] = {
      id: courseId,
      language: language,
      createdAt: Date.now(),
      lastPlayed: Date.now()
    };

    this.saveCourses(courses);
    this.setCurrentCourse(courseId);
    return courseId;
  },

  /**
   * Get language flag emoji
   */
  getLanguageFlag(language) {
    const flags = {
      french: '🇫🇷',
      spanish: '🇪🇸',
      german: '🇩🇪',
      italian: '🇮🇹',
      greek: '🇬🇷'
    };
    return flags[language] || '🌐';
  },

  /**
   * Get language display name
   */
  getLanguageName(language) {
    const names = {
      french: 'French',
      spanish: 'Spanish',
      german: 'German',
      italian: 'Italian',
      greek: 'Greek'
    };
    return names[language] || language;
  },

  /**
   * Delete a course and its save data
   */
  deleteCourse(courseId) {
    const courses = this.getCourses();

    if (!courses[courseId]) {
      console.error('Course not found:', courseId);
      return false;
    }

    // Delete the course
    delete courses[courseId];
    this.saveCourses(courses);

    // Delete associated save data
    localStorage.removeItem(`bytequest_save_${courseId}`);

    // If this was the current course, clear it
    if (this.getCurrentCourseId() === courseId) {
      localStorage.removeItem(this.CURRENT_KEY);
    }

    // If no courses remain, also clear the player name
    // This ensures first-time flow shows character creation again
    if (Object.keys(courses).length === 0) {
      localStorage.removeItem('bytequest_player_name');
      console.log('[CourseManager] All courses deleted, cleared player name');
    }

    console.log('[CourseManager] Deleted course:', courseId);
    return true;
  },

  /**
   * Check if any courses exist
   */
  hasCourses() {
    return Object.keys(this.getCourses()).length > 0;
  }
};

// ============================================
// Course Panel UI
// ============================================

let coursePanelMode = 'new'; // 'new' or 'continue'

/**
 * Show the course selection panel
 */
function showCoursePanel(mode) {
  coursePanelMode = mode;

  document.getElementById('main-menu').style.display = 'none';
  document.getElementById('course-panel').style.display = 'block';

  // Update subtitle based on mode
  const subtitle = document.getElementById('title-subtitle');
  if (subtitle) {
    subtitle.textContent = mode === 'new' ? 'Start a New Adventure' : 'Continue Your Journey';
  }

  renderCoursePanel();
}

/**
 * Hide course panel, return to main menu
 */
function hideCoursePanel() {
  document.getElementById('course-panel').style.display = 'none';
  document.getElementById('main-menu').style.display = 'flex';

  const subtitle = document.getElementById('title-subtitle');
  if (subtitle) {
    subtitle.textContent = 'Learn Languages Through Adventure';
  }
}

/**
 * Render the course list
 */
function renderCoursePanel() {
  const courseList = document.getElementById('course-list');
  if (!courseList) return;

  const courses = CourseManager.getCourses();
  const courseArray = Object.values(courses).sort((a, b) => b.lastPlayed - a.lastPlayed);

  if (courseArray.length === 0) {
    courseList.innerHTML = `
      <div class="course-empty">
        <p>No courses yet. Add a new course to begin!</p>
      </div>
    `;
    return;
  }

  courseList.innerHTML = courseArray.map(course => {
    const flag = CourseManager.getLanguageFlag(course.language);
    const name = CourseManager.getLanguageName(course.language);
    const lastPlayed = new Date(course.lastPlayed).toLocaleDateString();

    return `
      <div class="course-item" data-course-id="${course.id}">
        <span class="course-flag">${flag}</span>
        <div class="course-info">
          <div class="course-name">${name}</div>
          <div class="course-meta">Last played: ${lastPlayed}</div>
        </div>
        <button class="course-play-btn" onclick="selectCourse('${course.id}')">
          Play
        </button>
        <button class="course-delete-btn" onclick="event.stopPropagation(); confirmDeleteCourse('${course.id}')" title="Delete Course">
          🗑️
        </button>
      </div>
    `;
  }).join('');
}

/**
 * Show confirmation dialog for course deletion
 */
function confirmDeleteCourse(courseId) {
  console.log('[confirmDeleteCourse] Called with:', courseId);

  const courses = CourseManager.getCourses();
  const course = courses[courseId];

  if (!course) {
    console.error('[confirmDeleteCourse] Course not found:', courseId);
    return;
  }

  const flag = CourseManager.getLanguageFlag(course.language);
  const name = CourseManager.getLanguageName(course.language);

  showModal('confirm-delete-modal', `
    <div style="text-align: center;">
      <h2 style="font-family: var(--font-display); font-size: 16px; color: var(--accent-gold); margin-bottom: 16px;">
        Delete Course?
      </h2>
      <div style="font-size: 32px; margin-bottom: 8px;">${flag}</div>
      <p style="margin-bottom: 16px; color: var(--text-muted);">
        Are you sure you want to delete your <strong>${name}</strong> course?
      </p>
      <p style="margin-bottom: 24px; color: var(--accent-red); font-size: 12px;">
        This will permanently delete all progress and cannot be undone.
      </p>
      <div style="display: flex; gap: 12px; justify-content: center;">
        <button class="art-btn" onclick="hideModal('confirm-delete-modal')">
          Cancel
        </button>
        <button class="art-btn art-btn-danger" onclick="deleteCourse('${courseId}')" style="background: var(--accent-red);">
          Delete
        </button>
      </div>
    </div>
  `);
}

/**
 * Delete a course after confirmation
 */
function deleteCourse(courseId) {
  console.log('[deleteCourse] Called with:', courseId);
  hideModal('confirm-delete-modal');

  if (CourseManager.deleteCourse(courseId)) {
    showNotification('Course deleted', 'info');

    // Check if all courses are now deleted
    if (!CourseManager.hasCourses()) {
      // Hide course panel, show welcome screen for first-time flow
      document.getElementById('course-panel').style.display = 'none';
      document.getElementById('main-menu').style.display = 'none';
      showFirstTimeWelcome();
    } else {
      renderCoursePanel();
    }
  } else {
    showNotification('Failed to delete course', 'error');
  }
}

// Make functions globally accessible
window.confirmDeleteCourse = confirmDeleteCourse;
window.deleteCourse = deleteCourse;
window.selectCourse = selectCourse;

/**
 * Select and load a course
 */
function selectCourse(courseId) {
  const courses = CourseManager.getCourses();
  const course = courses[courseId];

  if (!course) {
    console.error('Course not found:', courseId);
    return;
  }

  // Update last played
  course.lastPlayed = Date.now();
  CourseManager.saveCourses(courses);
  CourseManager.setCurrentCourse(courseId);

  // Start the game with this course
  if (coursePanelMode === 'new') {
    showCharacterCreation(course.language);
  } else {
    // Continue - load existing save and start game
    loadCourseAndStart(courseId);
  }
}

/**
 * Load a course save and start game
 */
async function loadCourseAndStart(courseId) {
  // Load the save for this course if it exists
  const saveKey = `bytequest_save_${courseId}`;
  const savedData = localStorage.getItem(saveKey);

  let language = 'french'; // default

  if (savedData && typeof GameState !== 'undefined') {
    try {
      const parsed = JSON.parse(savedData);
      Object.assign(GameState, parsed);
      language = parsed.currentLanguage || parsed.player?.language || 'french';
    } catch (e) {
      console.error('Failed to load save:', e);
    }
  }

  // Load the course data for this language
  if (typeof CourseLoader !== 'undefined') {
    await CourseLoader.loadCourse(language);
  }

  // Initialize managers for loaded game
  if (typeof MilestoneManager !== 'undefined') {
    window.milestoneManager = new MilestoneManager(GameState);
    console.log('[loadCourseAndStart] MilestoneManager initialized');
  }
  if (typeof StatsManager !== 'undefined') {
    window.statsManager = new StatsManager(GameState);
    console.log('[loadCourseAndStart] StatsManager initialized');
  }
  if (typeof AchievementManager !== 'undefined') {
    window.achievementManager = new AchievementManager(GameState);
    console.log('[loadCourseAndStart] AchievementManager initialized');
  }
  if (typeof CurrencyManager !== 'undefined') {
    window.currencyManager = new CurrencyManager(GameState);
    console.log('[loadCourseAndStart] CurrencyManager initialized');
  }
  if (typeof TitleManager !== 'undefined') {
    window.titleManager = new TitleManager(GameState);
    console.log('[loadCourseAndStart] TitleManager initialized');
  }
  if (typeof ItemManager !== 'undefined' && typeof GAME_DATA !== 'undefined') {
    window.itemManager = new ItemManager(GameState, GAME_DATA.items);
    console.log('[loadCourseAndStart] ItemManager initialized');
  }
  if (typeof ShopManager !== 'undefined' && typeof SHOP_DEFINITIONS !== 'undefined') {
    window.shopManager = new ShopManager(GameState, SHOP_DEFINITIONS, window.itemManager);
    console.log('[loadCourseAndStart] ShopManager initialized');
  }
  if (typeof ReputationManager !== 'undefined') {
    window.reputationManager = new ReputationManager(GameState);
    console.log('[loadCourseAndStart] ReputationManager initialized');
  }
  if (typeof VillageProjectsManager !== 'undefined') {
    window.villageProjectsManager = new VillageProjectsManager(GameState);
    console.log('[loadCourseAndStart] VillageProjectsManager initialized');
  }
  if (typeof LocationManager !== 'undefined') {
    window.locationManager = new LocationManager(GameState);
    locationManager.checkQuestBasedDiscovery();
    locationManager.checkLevelUnlocks();
    console.log('[loadCourseAndStart] LocationManager initialized');
  }
  if (typeof QuestManager !== 'undefined') {
    GameState.questManager = new QuestManager(GameState);
    GameState.questManager.loadCourseQuests(language);
    console.log('[loadCourseAndStart] QuestManager initialized');
  }
  if (typeof initSpellbook === 'function') {
    initSpellbook(GameState);
    console.log('[loadCourseAndStart] Spellbook initialized');
  }

  // Start the game
  if (typeof startGame === 'function') {
    startGame();
  }
}

/**
 * Show language selection for new course
 */
function showLanguageSelection() {
  // Get languages from manifest if available
  let languages;
  if (typeof COURSE_MANIFEST !== 'undefined') {
    languages = COURSE_MANIFEST.getAll().map(course => ({
      id: course.id,
      name: course.name,
      flag: course.flag,
      available: course.available
    }));
  } else {
    // Fallback
    languages = [
      { id: 'french', name: 'French', flag: '🇫🇷', available: true },
      { id: 'greek', name: 'Greek', flag: '🇬🇷', available: true }
    ];
  }

  const content = `
    <h2 style="font-family: var(--font-display); font-size: 16px; color: var(--accent-gold); margin-bottom: 16px; text-align: center;">
      Choose a Language
    </h2>
    <div class="language-grid">
      ${languages.map(lang => `
        <button class="language-option ${lang.available ? '' : 'locked'}"
                ${lang.available ? `onclick="createNewCourse('${lang.id}')"` : 'disabled'}>
          <span class="lang-flag">${lang.flag}</span>
          <span class="lang-name">${lang.name}</span>
          ${!lang.available ? '<span class="lang-locked">Coming Soon</span>' : ''}
        </button>
      `).join('')}
    </div>
    <button class="art-btn art-btn-small" onclick="hideModal('language-select-modal')" style="margin-top: 16px; width: 100%;">
      Cancel
    </button>
  `;

  if (typeof showModal === 'function') {
    showModal('language-select-modal', content);
  } else {
    // Fallback - use the existing modal in HTML
    const modal = document.getElementById('language-select-modal');
    const optionsDiv = document.getElementById('language-options');
    if (modal && optionsDiv) {
      optionsDiv.innerHTML = languages.map(lang => `
        <button class="language-option ${lang.available ? '' : 'locked'}"
                ${lang.available ? `onclick="createNewCourse('${lang.id}')"` : 'disabled'}>
          <span class="lang-flag">${lang.flag}</span>
          <span class="lang-name">${lang.name}</span>
          ${!lang.available ? '<span class="lang-locked">Coming Soon</span>' : ''}
        </button>
      `).join('');
      modal.style.display = 'flex';
    }
  }
}

/**
 * Create a new course and start character creation (or skip if name exists)
 */
function createNewCourse(language) {
  // Hide language modal
  if (typeof hideModal === 'function') {
    hideModal('language-select-modal');
  } else {
    const modal = document.getElementById('language-select-modal');
    if (modal) modal.style.display = 'none';
  }

  // Create the course
  const courseId = CourseManager.createCourse(language);
  console.log('[CourseManager] Created course:', courseId);

  // Refresh course panel to show new course
  renderCoursePanel();

  // Check if player already has a name (adding course to existing account)
  const existingName = localStorage.getItem('bytequest_player_name');
  if (existingName) {
    // Skip character creation, start game directly
    console.log('[createNewCourse] Existing account, starting game for:', existingName);
    startNewGame(existingName, 'cleric', language);
  } else {
    // First-time user, show character creation
    if (typeof showCharacterCreation === 'function') {
      showCharacterCreation(language);
    } else {
      console.error('showCharacterCreation not defined');
    }
  }
}

// ============================================
// Legacy Save Migration
// ============================================

/**
 * Migrate old saves to course system
 */
function migrateLegacySave() {
  // Check for old save format
  const oldSave = localStorage.getItem('bytequest_save');
  if (!oldSave) return;

  // Don't migrate if courses already exist
  if (CourseManager.hasCourses()) return;

  try {
    const parsed = JSON.parse(oldSave);
    const language = parsed.currentLanguage || parsed.player?.language || 'french';

    // Create a course for this save
    const courseId = CourseManager.createCourse(language);

    // Move save to new location
    localStorage.setItem(`bytequest_save_${courseId}`, oldSave);

    console.log('[Migration] Migrated legacy save to course:', courseId);
  } catch (e) {
    console.error('[Migration] Failed to migrate legacy save:', e);
  }
}

// ============================================
// First Time User Welcome
// ============================================

/**
 * Show welcome screen for first-time users
 */
function showFirstTimeWelcome() {
  console.log('[Welcome] First time user detected');

  // Hide main menu, show welcome
  const mainMenu = document.getElementById('main-menu');
  if (mainMenu) mainMenu.style.display = 'none';

  const coursePanel = document.getElementById('course-panel');
  if (coursePanel) coursePanel.style.display = 'none';

  // Update subtitle
  const subtitle = document.getElementById('title-subtitle');
  if (subtitle) {
    subtitle.textContent = 'Learn Languages Through Adventure';
  }

  // Create welcome content
  const titleScreen = document.getElementById('title-screen');
  let welcomeDiv = document.getElementById('welcome-screen');

  if (!welcomeDiv) {
    welcomeDiv = document.createElement('div');
    welcomeDiv.id = 'welcome-screen';
    welcomeDiv.className = 'welcome-screen';
    titleScreen.appendChild(welcomeDiv);
  }

  // Get languages from manifest if available
  let languages;
  if (typeof COURSE_MANIFEST !== 'undefined') {
    languages = COURSE_MANIFEST.getAll().map(course => ({
      id: course.id,
      name: course.name,
      flag: course.flag,
      available: course.available
    }));
  } else {
    languages = [
      { id: 'french', name: 'French', flag: '🇫🇷', available: true },
      { id: 'greek', name: 'Greek', flag: '🇬🇷', available: true }
    ];
  }

  welcomeDiv.innerHTML = `
    <div class="welcome-content">
      <h2 class="welcome-title">Welcome, Adventurer!</h2>
      <p class="welcome-text">
        Begin your journey by choosing a language to learn.
        You'll explore a magical world while mastering vocabulary and grammar.
      </p>

      <div class="welcome-languages">
        <h3 class="welcome-subtitle">Choose Your Language</h3>
        <div class="language-grid">
          ${languages.map(lang => `
            <button class="language-card ${lang.available ? '' : 'locked'}"
                    ${lang.available ? `onclick="startFirstCourse('${lang.id}')"` : 'disabled'}>
              <span class="language-flag">${lang.flag}</span>
              <span class="language-name">${lang.name}</span>
              ${!lang.available ? '<span class="language-coming">Coming Soon</span>' : ''}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  welcomeDiv.style.display = 'flex';
}

/**
 * Start first course from welcome screen
 */
function startFirstCourse(language) {
  console.log('[Welcome] Starting first course:', language);

  // Hide welcome screen
  const welcomeDiv = document.getElementById('welcome-screen');
  if (welcomeDiv) welcomeDiv.style.display = 'none';

  // Create the course
  const courseId = CourseManager.createCourse(language);
  console.log('[Welcome] Created course:', courseId);

  // Go to character creation
  showCharacterCreation(language);
}

// Make globally accessible
window.startFirstCourse = startFirstCourse;
window.showFirstTimeWelcome = showFirstTimeWelcome;
