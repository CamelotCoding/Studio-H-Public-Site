// Studio H site script (tiny, optional: every page works without it).

// ---- App Store links --------------------------------------------------------
// One entry per game, keyed by the badge's data-app-store value.
// Paste the App Store URL into `url` once the game is live, for example
//   'https://apps.apple.com/app/hollowmere-cozy-witch-farm/id0000000000'
// Badges then become "Download on the App Store" links.
// Leave `url` empty ('') while the game is "Coming soon".
const GAMES = {
  hollowmere: { name: 'Hollowmere', url: '', note: 'Free to play on iPhone and iPad.' },
  sevenfold: { name: 'Sevenfold', url: '', note: 'Available on iPhone and iPad.' },
  camelot: { name: 'Camelot Tea Legends', url: '', note: 'Free to play on iPhone and iPad.' },
  'ararat-acres': { name: 'Ararat Acres', url: '', note: 'Free to play on iPhone, iPad and Android.' },
  leafy: { name: 'Leafy Tycoon', url: '', note: 'Free to play on iPhone and iPad.' },
  aegis: { name: 'Aegis of the Ancients', url: '', note: 'Free to play on iPhone and iPad.' },
};

document.querySelectorAll('[data-app-store]').forEach((a) => {
  const game = GAMES[a.dataset.appStore || 'hollowmere'];
  if (!game || !game.url) {
    // Coming soon: the badge is not a link yet.
    a.addEventListener('click', (e) => e.preventDefault());
    return;
  }
  a.href = game.url;
  a.removeAttribute('aria-disabled');
  a.setAttribute('aria-label', `Download ${game.name} on the App Store`);
  const top = a.querySelector('small');
  const main = a.querySelector('b');
  if (top) top.textContent = 'Download on the';
  if (main) main.textContent = 'App Store';
  const note = document.querySelector(`[data-store-note="${a.dataset.appStore || ''}"]`) || document.querySelector('[data-store-note]');
  if (note) note.textContent = game.note;
});

// ---- footer year ------------------------------------------------------------
document.querySelectorAll('[data-year]').forEach((n) => { n.textContent = String(new Date().getFullYear()); });
