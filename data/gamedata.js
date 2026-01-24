/**
 * ByteQuest Game Data
 *
 * This file provides the GAME_DATA object as a central registry.
 * Individual systems register their data here during initialization:
 *
 * - classes:      specializationSystem.js (BASE_CLASS, SPECIALIZATION_CLASSES)
 * - items:        itemSystem.js (ITEM_DEFINITIONS)
 * - npcs:         npcSystem.js (NPC_DEFINITIONS)
 * - locations:    locationSystem.js (LOCATION_DEFINITIONS)
 * - quests:       specializationSystem.js (SPECIALIZATION_QUEST)
 * - artifacts:    artifacts.js (LORE_ARTIFACTS)
 * - artifactEras: artifacts.js (ARTIFACT_ERAS)
 *
 * LANGUAGE_CONFIG is provided by languageSystem.js
 */

const GAME_DATA = {
  // Populated by specializationSystem.js
  classes: {},

  // Populated by itemSystem.js
  items: {},

  // Populated by npcSystem.js
  npcs: {},

  // Populated by locationSystem.js
  locations: {},

  // Populated by specializationSystem.js and language course quests
  quests: {},

  // Populated by artifacts.js
  artifacts: {},

  // Populated by artifacts.js
  artifactEras: {}
};

// Make globally accessible
if (typeof window !== 'undefined') {
  window.GAME_DATA = GAME_DATA;
}
