# Studio H website (studiohgames.com)

The public website of Studio H and its games, hosted on GitHub Pages from
[CamelotCoding/Studio-H-Public-Site](https://github.com/CamelotCoding/studio-h-public-site).

Plain HTML and CSS with a few lines of vanilla JavaScript: there is no build step, no framework and no
external script. Edit a file, commit, push to `main`, and GitHub Pages publishes it within a minute or two.

## Layout

| Path | What it is |
|---|---|
| `index.html` | Studio H home page (tagline, featured game, contact) |
| `hollowmere/index.html` | Hollowmere game page: hero, features, screenshots, FAQ, Support (this is the App Store **Support URL**) |
| `hollowmere/privacy/index.html` | Hollowmere Privacy Policy (`https://studiohgames.com/hollowmere/privacy/`) |
| `hollowmere/terms/index.html` | Hollowmere Terms of Use (`https://studiohgames.com/hollowmere/terms/`) |
| `hollowmere/shots/*.webp` | Screenshots taken from the game (phone shots 780×1688, `farm-wide.webp` 1600×900) |
| `hollowmere/og.png` | Share image for link previews (1200×630) |
| `assets/site.css` | The one shared stylesheet (colours, fonts, light and dark mode) |
| `assets/site.js` | Tiny optional script: the App Store link constant and the footer year |
| `favicon.svg` | Site icon (also the Studio H mark) |
| `404.html` | "Page not found" page (GitHub Pages serves it automatically) |
| `app-ads.txt` | AdMob authorised sellers file (must stay at the site root) |
| `CNAME` | Custom domain for GitHub Pages (`studiohgames.com`) |
| `robots.txt`, `sitemap.xml` | For search engines |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

Every page repeats the same header and footer (there is no build step to include them), so a change to the
navigation or footer has to be made in each HTML file.

Fonts are Fredoka (text) and Grenze Gotisch (titles) from Google Fonts, the same as in the game. Colours
are CSS variables at the top of `assets/site.css`; dark mode follows the visitor's system setting.

## When Hollowmere goes live on the App Store

Open `assets/site.js` and set the constant at the top:

```js
const APP_STORE_URL = 'https://apps.apple.com/app/idXXXXXXXXXX';
```

The "Coming soon to the App Store" badge on the game page then becomes a working
"Download on the App Store" link. If you'd rather use Apple's official badge artwork, download it from
<https://developer.apple.com/app-store/marketing/guidelines/>, save it as `hollowmere/app-store-badge.svg`,
and replace the `<svg>` and text inside the `<a class="store-badge">` element with
`<img src="/hollowmere/app-store-badge.svg" alt="Download on the App Store" width="160" height="54">`.

## The legal pages

The text of the privacy policy and terms is copied word for word from the game repo
(`Witch-Idle/docs/legal/privacy.html` and `terms.html`). When a policy changes, update the source first,
then replace everything between `<main id="main" class="legal">` … `</main>` (after the breadcrumb line)
with the content of the source file's `<main>` element. Keep the wording identical.

## Adding a new game page

1. Copy the `hollowmere/` folder to a new folder named after the game, e.g. `newgame/`.
2. In `newgame/index.html`, change the `<title>`, description, canonical URL, Open Graph and Twitter tags,
   the hero text, features, screenshots, FAQ and support details.
3. Replace the images in `newgame/shots/` and `newgame/og.png` (1200×630). Keep each image under about 400 KB
   (WebP works well).
4. Update or replace the game's `privacy/` and `terms/` pages.
5. Add the game to the home page (`index.html`): copy the `<article class="card featured">` block.
6. Add the new URLs to `sitemap.xml` and links to the header/footer navigation where useful.
7. If the game needs its own App Store link, add a second constant in `assets/site.js`, or set the link
   directly in that page's `href`.

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Links start with `/`, so open the site from its root as above (not by double-clicking a file).

## Pointing studiohgames.com at GitHub Pages (GoDaddy)

### 1. GoDaddy DNS

1. Sign in at <https://dcc.godaddy.com>, open **My Products → Domains → studiohgames.com → DNS** (Manage DNS).
2. **Remove what GoDaddy added by default:**
   - Delete the existing **A** record for `@` that points to GoDaddy's "Parked" page or website builder
     (often labelled *Parked*, or an IP that isn't one of GitHub's below).
   - Under **Forwarding** (on the same DNS page, or *Domain Settings → Forwarding*), delete any domain or
     subdomain forwarding.
   - If GoDaddy Website Builder / Websites + Marketing is connected to the domain, disconnect it.
3. **Add four A records** for the root domain:

   | Type | Name | Value | TTL |
   |---|---|---|---|
   | A | @ | 185.199.108.153 | 1 hour |
   | A | @ | 185.199.109.153 | 1 hour |
   | A | @ | 185.199.110.153 | 1 hour |
   | A | @ | 185.199.111.153 | 1 hour |

4. **Add (or edit) the CNAME** for `www`. GoDaddy usually already has a `www` CNAME pointing to `@`;
   edit it instead of adding a second one:

   | Type | Name | Value | TTL |
   |---|---|---|---|
   | CNAME | www | camelotcoding.github.io | 1 hour |

5. Save. DNS changes usually take a few minutes, sometimes up to 48 hours. You can check with
   `dig studiohgames.com +short` (it should list the four GitHub IPs).

### 2. GitHub Pages

1. On GitHub open the repository **CamelotCoding/Studio-H-Public-Site → Settings → Pages**.
2. **Build and deployment → Source:** *Deploy from a branch*. **Branch:** `main`, folder **`/ (root)`** → Save.
3. **Custom domain:** enter `studiohgames.com` → Save. (The `CNAME` file in this repo already contains it.)
   Wait until the DNS check shows a green tick.
4. Tick **Enforce HTTPS** once it becomes available (GitHub issues the certificate after the DNS check
   passes; this can take up to an hour).
5. Optional but recommended: in your GitHub account **Settings → Pages → Add a domain**, verify
   `studiohgames.com` (GitHub gives you a TXT record to add in GoDaddy). This stops anyone else from using
   the domain with their own Pages site.

Afterwards these should all work:

- <https://studiohgames.com/> and <https://www.studiohgames.com/> (redirects to the root domain)
- <https://studiohgames.com/hollowmere/> (App Store Support URL and Marketing URL)
- <https://studiohgames.com/hollowmere/privacy/> (App Store Privacy Policy URL)
- <https://studiohgames.com/app-ads.txt> (then in AdMob: *Apps → app-ads.txt* to re-check)
