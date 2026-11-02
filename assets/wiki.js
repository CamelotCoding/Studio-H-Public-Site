// Studio H wiki script: builds the page list, "On this page" contents, previous/next links and home search from window.WIKI.
// Each game's wiki loads its own pages.js first, which sets window.WIKI = { base, game, gameUrl, pages: [...] }.
(() => {
  const W = window.WIKI;
  if (!W || !Array.isArray(W.pages)) return;
  const base = W.base.replace(/\/?$/, '/');
  const urlOf = (p) => base + (p.slug ? p.slug + '/' : '');
  const clean = (path) => path.replace(/index\.html$/, '').replace(/\/?$/, '/');
  const here = clean(location.pathname);
  const current = W.pages.findIndex((p) => urlOf(p) === here);
  const el = (tag, props = {}, kids = []) => {
    const { label, ...rest } = props;
    const n = Object.assign(document.createElement(tag), rest);
    if (label) n.setAttribute('aria-label', label);
    kids.forEach((k) => n.append(k));
    return n;
  };
  const link = (href, text, cur) => {
    const a = el('a', { href, textContent: text });
    if (cur) a.setAttribute('aria-current', 'page');
    return a;
  };
  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  // ---- sidebar: page list + "On this page" ------------------------------------
  const side = document.querySelector('[data-wiki-side]');
  const boxes = [];
  const box = (label, cls, items) => {
    const d = el('details', { className: 'wiki-box ' + cls }, [el('summary', { textContent: label }), el('ul', {}, items)]);
    boxes.push(d);
    return d;
  };
  if (side) {
    const items = [el('li', { className: 'back' }, [link(W.gameUrl, '← Back to ' + W.game)])];
    W.pages.forEach((p, i) => items.push(el('li', {}, [link(urlOf(p), p.title, i === current)])));
    const nav = el('nav', { label: W.game + ' wiki' }, [box('Wiki pages', 'wiki-nav', items)]);
    side.replaceChildren(nav);

    const article = document.querySelector('.wiki-article');
    const heads = article ? [...article.querySelectorAll('h2, h3')] : [];
    if (heads.filter((h) => h.tagName === 'H2').length >= 3) {
      const tocItems = heads.map((h) => {
        if (!h.id) h.id = slugify(h.textContent);
        return el('li', { className: h.tagName === 'H3' ? 'sub' : '' }, [link('#' + h.id, h.textContent)]);
      });
      side.append(el('nav', { label: 'On this page' }, [box('On this page', 'wiki-toc', tocItems)]));
    }
    // Open on wide screens (sidebar always visible); collapsed on phones.
    const wide = matchMedia('(min-width: 900px)');
    const sync = () => boxes.forEach((d) => { d.open = wide.matches; });
    sync();
    wide.addEventListener('change', sync);
    // On phones, close "On this page" after a jump so the text is visible.
    side.addEventListener('click', (e) => {
      if (!wide.matches && e.target.closest('.wiki-toc a')) e.target.closest('details').open = false;
    });
  }

  // ---- previous / next ----------------------------------------------------------
  const pager = document.querySelector('[data-wiki-pager]');
  if (pager && current >= 0) {
    const prev = W.pages[current - 1];
    const next = W.pages[current + 1];
    if (prev) pager.prepend(link(urlOf(prev), '← ' + prev.title));
    if (next) pager.append(link(urlOf(next), next.title + ' →'));
  }

  // ---- home: topic cards + search ----------------------------------------------
  const list = document.querySelector('[data-wiki-cards]');
  if (!list) return;
  const cards = W.pages.filter((p) => p.slug).map((p) => {
    const li = el('li', {}, [el('a', { href: urlOf(p) }, [el('b', { textContent: p.title }), el('span', { textContent: p.summary })])]);
    li.dataset.text = [p.title, p.summary, p.keywords || ''].join(' ').toLowerCase();
    return li;
  });
  list.replaceChildren(...cards);
  const input = document.querySelector('[data-wiki-search]');
  const count = document.querySelector('[data-wiki-count]');
  if (!input) return;
  const run = () => {
    const terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    cards.forEach((li) => {
      const ok = terms.every((t) => li.dataset.text.includes(t));
      li.hidden = !ok;
      if (ok) shown += 1;
    });
    if (count) {
      count.textContent = !terms.length ? '' : shown ? `${shown} of ${cards.length} pages match.` : 'No pages match. Try a shorter word, such as "job" or "map".';
    }
  };
  input.addEventListener('input', run);
  const q = new URLSearchParams(location.search).get('q');
  if (q) input.value = q;
  run();
})();
