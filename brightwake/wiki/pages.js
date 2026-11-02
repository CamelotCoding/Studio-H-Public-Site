// Brightwake wiki page list: the sidebar, previous/next links, home cards and search all read from here.
// Order matters (it is the reading order). slug '' is the wiki home. keywords are extra search words.
window.WIKI = {
  game: 'Brightwake',
  gameUrl: '/brightwake/',
  base: '/brightwake/wiki/',
  pages: [
    { slug: '', title: 'Wiki home', summary: 'Every page in the Brightwake player wiki.' },
    {
      slug: 'getting-started', title: 'Getting started and controls',
      summary: 'Make an account, create your first hero, and learn the keyboard and controller controls.',
      keywords: 'new player beginner account login world channel character creation race human elf dwarf sereni keyboard gamepad controller xbox playstation keys buttons death rested exp level cap',
    },
    {
      slug: 'world-and-cities', title: 'World and cities',
      summary: 'Lumora, Saint Oriel, and the three cities of Vitrea, Brasswind and Solstara.',
      keywords: 'lumora vitrea brasswind solstara queen isolde tobin vask court of four seasons oriel story acts lore npc map island',
    },
    {
      slug: 'the-hush', title: 'The Hush',
      summary: 'The living fog that swallowed the old world, and how exploring pushes it back.',
      keywords: 'fog clouds map exploration silence music sereni lantern climbs story',
    },
    {
      slug: 'jobs', title: 'Jobs and branches',
      summary: 'Squire, Priest, Witch, Archer and Thief, their guilds, and the ten branches at level 30.',
      keywords: 'class classes tank healer caster ranged stealth knight berserker cleric shadow priest sorcerer hexblade bard sharpshooter assassin ninja guild resource',
    },
    {
      slug: 'skills', title: 'Skill lists',
      summary: 'Every beginner, job and branch skill up to level 50, with the guild quest skills marked.',
      keywords: 'skills abilities actives passives quest skills sp shield heal revive teleport blink spells arrows songs poison stars clones squire knight berserker priest cleric shadow witch sorcerer hexblade archer bard sharpshooter thief assassin ninja',
    },
    {
      slug: 'combat-and-skills', title: 'Combat, gear and monsters',
      summary: 'How fighting feels, skill points and the skill bar, bosses, the monster journal, gear and enchanting.',
      keywords: 'skills skill bar sp skill points resolve grace mana focus energy combo monsters journal boss gear item level enchant enchanting rarity',
    },
    {
      slug: 'activities', title: 'Activities',
      summary: 'Parties, dungeons, the Free Market, mounts, housing, and minigames like the Flicker card game.',
      keywords: 'party guild dungeon raid group finder market trading mounts flying housing ward flicker cards minigames lantern climbs gear races puzzles arena',
    },
    {
      slug: 'crafting', title: 'Crafting and gathering',
      summary: 'Seven crafting jobs and three gathering jobs, all levelled on the same character.',
      keywords: 'craft blacksmith leatherworker weaver carpenter jeweler cook enchanter miner herbalist fishing materials quality',
    },
    {
      slug: 'beta-faq', title: 'Closed beta FAQ',
      summary: 'Invites, wipes, age rating, what it costs, the cash shop, and how to get help.',
      keywords: 'beta invite code wipe reset free price cost cash shop supporter pay to win age 13 support email bug report',
    },
  ],
};
