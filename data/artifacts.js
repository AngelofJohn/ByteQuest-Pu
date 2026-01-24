/**
 * ByteQuest - Lore Artifacts Data
 * 26 collectible artifacts across 8 historical eras
 *
 * Eras: ancients, silence, founding, faith, golden_age, dran, war, exile
 */

const LORE_ARTIFACTS = {
  // =====================================================
  // THE ANCIENTS (2 artifacts)
  // Before recorded history, when great powers were sealed
  // =====================================================

  ancient_seal_fragment: {
    id: 'ancient_seal_fragment',
    name: 'Ancient Seal Fragment',
    icon: '🔷',
    era: 'ancients',
    rarity: 'rare',
    description: 'A broken piece of an ancient seal, covered in unreadable glyphs.',
    loreText: 'Before the kingdoms, before the faith, there were those who sealed away great powers. This fragment is all that remains of their work. The glyphs speak of warnings—and of promises broken.',
    discoveryText: 'You brush away centuries of dust to reveal markings that predate any known civilization...',
    acquisition: 'quest'
  },

  ancient_warning_stone: {
    id: 'ancient_warning_stone',
    name: 'Warning Stone',
    icon: '⚠️',
    era: 'ancients',
    rarity: 'rare',
    description: 'A small stone tablet inscribed with a single word in an ancient tongue.',
    loreText: 'Scholars have debated its meaning for generations. Some say it reads "REMEMBER." Others claim it says "BEWARE." Perhaps both are correct.',
    discoveryText: 'The stone feels warm in your hands, as if responding to your touch...',
    acquisition: 'exploration'
  },

  // =====================================================
  // THE SILENCE (2 artifacts)
  // The dark age when language itself seemed to fail
  // =====================================================

  silence_bone_carving: {
    id: 'silence_bone_carving',
    name: 'Bone Carving',
    icon: '🦴',
    era: 'silence',
    rarity: 'rare',
    description: 'A delicate carving made from bone, depicting a figure with no face.',
    loreText: 'During the Silence, when words themselves seemed to fail, people turned to other forms of expression. This carving speaks of loss—not of a person, but of something fundamental to humanity.',
    discoveryText: 'The carving is lighter than it should be, as if some part of it is missing...',
    acquisition: 'exploration'
  },

  silence_empty_shrine: {
    id: 'silence_empty_shrine',
    name: 'Empty Shrine Fragment',
    icon: '🏛️',
    era: 'silence',
    rarity: 'rare',
    description: 'A piece of stone from a shrine that was never completed.',
    loreText: 'They began building shrines to forgotten gods, hoping worship would restore what was lost. The shrines remained empty. The gods never answered.',
    discoveryText: 'The stone bears the marks of tools that suddenly stopped working...',
    acquisition: 'quest'
  },

  // =====================================================
  // THE FOUNDING (3 artifacts)
  // When the first kingdom rose from the ashes
  // =====================================================

  founding_charter_fragment: {
    id: 'founding_charter_fragment',
    name: 'Charter Fragment',
    icon: '📜',
    era: 'founding',
    rarity: 'rare',
    description: 'A torn piece of the original founding charter of the realm.',
    loreText: 'The founders wrote their laws in a language they barely understood, piecing together fragments of knowledge from before the Silence. This charter established not just a kingdom, but a desperate hope for preservation.',
    discoveryText: 'The parchment is remarkably preserved, the ink still dark after all these centuries...',
    acquisition: 'reputation'
  },

  founding_builders_journal: {
    id: 'founding_builders_journal',
    name: "Builder's Journal",
    icon: '📕',
    era: 'founding',
    rarity: 'rare',
    description: 'The personal journal of one of the first builders.',
    loreText: 'Day by day, stone by stone, they rebuilt. This journal records not just construction techniques, but the rediscovery of words themselves. "Today we remembered the word for hope," reads one entry.',
    discoveryText: 'The pages are filled with sketches and half-formed words, as if the writer was learning to write as they went...',
    acquisition: 'quest'
  },

  founding_first_kings_decree: {
    id: 'founding_first_kings_decree',
    name: "First King's Decree",
    icon: '👑',
    era: 'founding',
    rarity: 'legendary',
    description: 'The first official decree of the first king.',
    loreText: 'In broken but determined script, the first king declared: "We shall remember. We shall speak. We shall never again fall silent." These words became the foundation of all that followed.',
    discoveryText: 'The royal seal still gleams with faint magic, preserving this promise across the ages...',
    acquisition: 'quest'
  },

  // =====================================================
  // THE FAITH (3 artifacts)
  // When religion rose to preserve language through worship
  // =====================================================

  faith_original_prayer: {
    id: 'faith_original_prayer',
    name: 'Original Prayer',
    icon: '🙏',
    era: 'faith',
    rarity: 'rare',
    description: 'The first prayer ever written down in the new tongue.',
    loreText: 'The faithful believed that language was a gift from the divine, and its loss during the Silence was punishment for forgetting the gods. This prayer marked a covenant: words would be sacred, never to be forgotten again.',
    discoveryText: 'The words seem to shimmer as you read them, each syllable resonating with ancient power...',
    acquisition: 'reputation'
  },

  faith_schism_letter: {
    id: 'faith_schism_letter',
    name: 'Schism Letter',
    icon: '✉️',
    era: 'faith',
    rarity: 'rare',
    description: 'A letter that sparked the great religious divide.',
    loreText: 'Some believed words should be preserved exactly as recovered. Others argued language must grow and change to survive. This letter, arguing for change, was declared heresy. Its author was exiled, but their ideas never died.',
    discoveryText: 'The seal has been broken and resealed many times, as if passed secretly from hand to hand...',
    acquisition: 'quest'
  },

  faith_forbidden_text: {
    id: 'faith_forbidden_text',
    name: 'Forbidden Text',
    icon: '📖',
    era: 'faith',
    rarity: 'legendary',
    description: 'A text banned by the religious authorities.',
    loreText: 'This text suggested that the Silence was not divine punishment, but something deliberate—an attempt to erase certain knowledge. The church banned it not for heresy, but because they feared it might be true.',
    discoveryText: 'The pages are hidden within an innocent-looking prayer book, a secret within a secret...',
    acquisition: 'exploration'
  },

  // =====================================================
  // THE GOLDEN AGE (3 artifacts)
  // When prosperity and learning flourished
  // =====================================================

  golden_trade_manifest: {
    id: 'golden_trade_manifest',
    name: 'Trade Manifest',
    icon: '📋',
    era: 'golden_age',
    rarity: 'rare',
    description: 'A record of goods traded during the height of prosperity.',
    loreText: 'Languages mixed freely in the markets. This manifest, written in three tongues, shows how words themselves became trade goods—new expressions exchanged alongside silk and spices.',
    discoveryText: 'The columns of numbers and words paint a picture of unprecedented abundance...',
    acquisition: 'reputation'
  },

  golden_royal_diary: {
    id: 'golden_royal_diary',
    name: 'Royal Diary',
    icon: '📓',
    era: 'golden_age',
    rarity: 'rare',
    description: 'Personal diary of a monarch during the golden years.',
    loreText: 'Behind the prosperity, the monarch worried. "We build our towers ever higher," they wrote, "but have we truly learned why the last ones fell?" The concerns were dismissed as royal melancholy.',
    discoveryText: 'The entries grow increasingly troubled as the pages progress...',
    acquisition: 'quest'
  },

  golden_architects_note: {
    id: 'golden_architects_note',
    name: "Architect's Note",
    icon: '📐',
    era: 'golden_age',
    rarity: 'rare',
    description: 'Notes from the designer of the great library.',
    loreText: 'The architect designed hidden vaults beneath the library—places to preserve knowledge in case the Silence returned. Most thought it paranoia. The vaults were built anyway.',
    discoveryText: 'Hidden within the architectural drawings is a map of chambers that appear on no official plan...',
    acquisition: 'exploration'
  },

  // =====================================================
  // KING DRAN'S REIGN (4 artifacts) - era: king_dran
  // The controversial rule that ended the golden age
  // =====================================================

  dran_private_letter: {
    id: 'dran_private_letter',
    name: "Dran's Private Letter",
    icon: '💌',
    era: 'king_dran',
    rarity: 'rare',
    description: 'A personal letter from King Dran, never meant to be seen.',
    loreText: '"They call me tyrant," Dran wrote, "but I have seen what lurks in the old texts. Some knowledge must be controlled, lest we repeat the mistakes that brought the Silence." Was he protector or oppressor?',
    discoveryText: 'The letter was hidden in a secret compartment, waiting centuries to be found...',
    acquisition: 'quest'
  },

  dran_inspection_report: {
    id: 'dran_inspection_report',
    name: 'Inspection Report',
    icon: '🔍',
    era: 'king_dran',
    rarity: 'rare',
    description: 'An official report from the language inspectors.',
    loreText: 'Dran established inspectors to ensure "proper" use of language. This report details violations—new words, foreign phrases, creative expressions. Each violation was punished. Language became a cage.',
    discoveryText: 'The cold, bureaucratic language cannot hide the cruelty of its purpose...',
    acquisition: 'reputation'
  },

  dran_hermeau_journal: {
    id: 'dran_hermeau_journal',
    name: "Hermeau's Journal",
    icon: '📔',
    era: 'king_dran',
    rarity: 'legendary',
    description: 'The secret journal of the court historian Hermeau.',
    loreText: 'Hermeau recorded what Dran wanted hidden—the true reasons for his policies. "He found something in the archives," Hermeau wrote. "Something that terrified him. He believes strict control is the only way to prevent its return."',
    discoveryText: 'The journal was buried with its author, preserved by their final wish...',
    acquisition: 'quest'
  },

  dran_layne_confession: {
    id: 'dran_layne_confession',
    name: "Layne's Confession",
    icon: '⚖️',
    era: 'king_dran',
    rarity: 'legendary',
    description: 'The confession of Captain Layne before her execution.',
    loreText: '"I killed the king to free words from his prison," Layne wrote. "But I have learned too late what he was trying to contain. I fear my act of liberation may have opened a door that should have stayed closed."',
    discoveryText: 'The confession was never meant to survive, yet here it is...',
    acquisition: 'quest'
  },

  // =====================================================
  // THE WAR (5 artifacts) - era: the_war
  // The conflict that tore the kingdom apart
  // =====================================================

  war_soldiers_letter: {
    id: 'war_soldiers_letter',
    name: "Soldier's Letter",
    icon: '⚔️',
    era: 'the_war',
    rarity: 'rare',
    description: 'A letter home from a soldier in the language wars.',
    loreText: '"We fight over words," the soldier wrote, "but I no longer remember which side is right. Both claim to protect language. Both burn books. I just want to go home and speak freely again."',
    discoveryText: 'The letter never reached its destination, lost among the countless casualties of war...',
    acquisition: 'exploration'
  },

  war_commanders_confession: {
    id: 'war_commanders_confession',
    name: "Commander's Confession",
    icon: '🎖️',
    era: 'the_war',
    rarity: 'rare',
    description: 'Private writings of a military commander.',
    loreText: 'The commander obeyed orders to destroy a village library, then secretly saved what books he could. "Future generations must know we were not all monsters," he wrote. "Some of us tried to remember our humanity."',
    discoveryText: 'Hidden with the confession is a list of texts he preserved, smuggled to safety...',
    acquisition: 'quest'
  },

  war_healers_record: {
    id: 'war_healers_record',
    name: "Healer's Record",
    icon: '💚',
    era: 'the_war',
    rarity: 'rare',
    description: 'Medical records from a war hospital.',
    loreText: 'The healers treated soldiers from both sides, asking no questions. Their records show that in suffering, the artificial divisions of language fell away. Pain and healing speak the same tongue.',
    discoveryText: 'The records are stained but legible, a testament to compassion amid chaos...',
    acquisition: 'quest'
  },

  war_assassination_truth: {
    id: 'war_assassination_truth',
    name: 'Assassination Truth',
    icon: '🗡️',
    era: 'the_war',
    rarity: 'legendary',
    description: 'The true account of the assassination that ended the war.',
    loreText: 'History says the war ended when peace was negotiated. This document reveals the truth: a secret alliance of scholars from both sides arranged the assassination of the warmongers. Language scholars ended the language war.',
    discoveryText: 'The document is sealed with symbols from both warring factions—unity hidden in plain sight...',
    acquisition: 'quest'
  },

  war_laynes_evidence: {
    id: 'war_laynes_evidence',
    name: "Layne's Evidence",
    icon: '🔐',
    era: 'the_war',
    rarity: 'legendary',
    description: 'Evidence collected by Captain Layne before her death.',
    loreText: 'Before Layne killed King Dran, she gathered evidence of what he had found in the archives. The war was fought over words, but beneath it all was something older—a truth about the Silence that both sides wanted to either reveal or hide.',
    discoveryText: 'The evidence was scattered, but you have pieced it together at last...',
    acquisition: 'achievement'
  },

  // =====================================================
  // THE EXILE (4 artifacts)
  // The aftermath, when survivors rebuilt in secret
  // =====================================================

  exile_rewritten_history: {
    id: 'exile_rewritten_history',
    name: 'Rewritten History',
    icon: '📚',
    era: 'exile',
    rarity: 'rare',
    description: 'A history book with corrections written in the margins.',
    loreText: 'After the war, history was rewritten by the victors. This book shows the original text alongside angry corrections: "LIES," "This never happened," "They want us to forget." Someone refused to let the truth die.',
    discoveryText: 'The margin notes are in a desperate hand, fighting erasure word by word...',
    acquisition: 'quest'
  },

  exile_resistance_code: {
    id: 'exile_resistance_code',
    name: 'Resistance Code',
    icon: '🔣',
    era: 'exile',
    rarity: 'rare',
    description: 'A coded message system used by language preservers.',
    loreText: 'Under the new order, certain words were forbidden. The resistance developed this code to hide banned expressions in plain sight. Every innocent-seeming phrase contained secrets.',
    discoveryText: 'Once you know the key, hidden messages appear everywhere in the texts of this era...',
    acquisition: 'exploration'
  },

  exile_spread_of_corruption: {
    id: 'exile_spread_of_corruption',
    name: 'Spread of Corruption',
    icon: '🦠',
    era: 'exile',
    rarity: 'legendary',
    description: 'A map tracking the spread of a mysterious phenomenon.',
    loreText: 'After the war, something began spreading—a corruption of language itself. Words lost meaning, sentences became confused. This map tracks its spread. The origin point is marked with a single word: "UNSEALED."',
    discoveryText: 'The map shows the corruption spreading outward from an unmarked location...',
    acquisition: 'quest'
  },

  exile_sealed_letter_layne: {
    id: 'exile_sealed_letter_layne',
    name: "Layne's Sealed Letter",
    icon: '💀',
    era: 'exile',
    rarity: 'legendary',
    description: 'A letter Layne wrote to be opened after her death.',
    loreText: '"If you are reading this, I am dead and the seal is broken. What Dran feared has come to pass. The Silence was not natural—it was created to contain something. And in killing Dran, I have set it free. I am sorry. I did not know. Find the original seal. It is our only hope."',
    discoveryText: 'The final piece of the puzzle. Now you understand what must be done...',
    acquisition: 'achievement'
  }
};

// Era metadata for display
// NOTE: Era IDs must match those in spellbookSystem.js ARTIFACT_ERAS
const ARTIFACT_ERAS = {
  ancients: {
    id: 'ancients',
    name: 'The Ancients',
    label: 'The Ancients',
    description: 'Before recorded history, when great powers were sealed away.',
    icon: '🏛️',
    order: 1,
    artifactCount: 2
  },
  silence: {
    id: 'silence',
    name: 'The Silence',
    label: 'The Silence',
    description: 'The dark age when language itself seemed to fail.',
    icon: '🌑',
    order: 2,
    artifactCount: 2
  },
  founding: {
    id: 'founding',
    name: 'The Founding',
    label: 'The Founding',
    description: 'When the first kingdom rose from the ashes.',
    icon: '👑',
    order: 3,
    artifactCount: 3
  },
  faith: {
    id: 'faith',
    name: 'The Faith',
    label: 'The Faith',
    description: 'When religion rose to preserve language through worship.',
    icon: '✝️',
    order: 4,
    artifactCount: 3
  },
  golden_age: {
    id: 'golden_age',
    name: 'The Golden Age',
    label: 'The Golden Age',
    description: 'When prosperity and learning flourished.',
    icon: '⭐',
    order: 5,
    artifactCount: 3
  },
  king_dran: {
    id: 'king_dran',
    name: "King Dran's Reign",
    label: "King Dran's Reign",
    description: 'The controversial rule that ended the golden age.',
    icon: '🏰',
    order: 6,
    artifactCount: 4
  },
  the_war: {
    id: 'the_war',
    name: 'The War',
    label: 'The War',
    description: 'The conflict that tore the kingdom apart.',
    icon: '⚔️',
    order: 7,
    artifactCount: 5
  },
  exile: {
    id: 'exile',
    name: 'The Exile',
    label: 'The Exile',
    description: 'The aftermath, when survivors rebuilt in secret.',
    icon: '🚪',
    order: 8,
    artifactCount: 4
  }
};

// Helper function to get artifacts by era
function getArtifactsByEra(eraId) {
  return Object.values(LORE_ARTIFACTS).filter(a => a.era === eraId);
}

// Helper function to get artifact count per era
function getArtifactCountByEra() {
  const counts = {};
  for (const artifact of Object.values(LORE_ARTIFACTS)) {
    counts[artifact.era] = (counts[artifact.era] || 0) + 1;
  }
  return counts;
}

// Initialize artifacts data
function initArtifactsData() {
  if (typeof GAME_DATA === 'undefined') {
    console.warn('[ArtifactsData] GAME_DATA not available');
    return;
  }

  // Register artifacts
  GAME_DATA.artifacts = LORE_ARTIFACTS;
  GAME_DATA.artifactEras = ARTIFACT_ERAS;

  console.log('[ArtifactsData] Registered', Object.keys(LORE_ARTIFACTS).length, 'artifacts across', Object.keys(ARTIFACT_ERAS).length, 'eras');
}

// Auto-initialize when script loads
if (typeof GAME_DATA !== 'undefined') {
  initArtifactsData();
}

// Make globally accessible
window.LORE_ARTIFACTS = LORE_ARTIFACTS;
window.ARTIFACT_ERAS = ARTIFACT_ERAS;
window.getArtifactsByEra = getArtifactsByEra;
window.initArtifactsData = initArtifactsData;
