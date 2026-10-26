// Studio H site script (tiny, optional: every page works without it).

// ---- App Store link ---------------------------------------------------------
// Paste the game's App Store URL here once it is live, for example
//   'https://apps.apple.com/app/hollowmere-cozy-witch-farm/id0000000000'
// Every element with data-app-store then becomes a "Download on the App Store" link.
// Leave it empty ('') while the game is "Coming soon".
const APP_STORE_URL = '';

if (APP_STORE_URL) {
  document.querySelectorAll('[data-app-store]').forEach((a) => {
    a.href = APP_STORE_URL;
    a.removeAttribute('aria-disabled');
    a.setAttribute('aria-label', 'Download Hollowmere on the App Store');
    const top = a.querySelector('small');
    const main = a.querySelector('b');
    if (top) top.textContent = 'Download on the';
    if (main) main.textContent = 'App Store';
  });
  document.querySelectorAll('[data-store-note]').forEach((n) => { n.textContent = 'Free to play on iPhone and iPad.'; });
} else {
  // Coming soon: the badge is not a link yet.
  document.querySelectorAll('[data-app-store]').forEach((a) => {
    a.addEventListener('click', (e) => e.preventDefault());
  });
}

// ---- footer year ------------------------------------------------------------
document.querySelectorAll('[data-year]').forEach((n) => { n.textContent = String(new Date().getFullYear()); });
