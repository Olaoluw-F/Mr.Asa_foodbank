# Mr. ASA Food Hub: Project Context

> **Read this first.** This file is the shared memory for everyone who works on this project, people and AI tools alike.
> When you finish a piece of work, update **Status**, tick the **Roadmap**, add a line to the **Accomplishments log**, and add any decision you made to the **Decisions log**.

## What this is

Mr. ASA Food Hub is a student-run website about food security in Prince George's County, Maryland, with a section for University of Maryland (UMD) students. It has six pages:

| Page | Path | What it does |
|---|---|---|
| Home | `/` | Search box, "open today" list, stats, links into the other pages |
| Find Food | `/food` | Finder with filters for 41 county food sites, plus regional services |
| Volunteer | `/volunteer` | Table of volunteer opportunities (sample rows for now) |
| Donate | `/donate` | What to give locally; vetted charities for Burkina Faso and Nigeria at `/donate#africa` |
| UMD Students | `/umd` | Campus food help, benefits, student organizations |
| About | `/about` | Mission, data sources, FAQ at `/about#faq` |

It is not an official website of Prince George's County, PGCPS, or UMD.

## Status

- **Last updated:** 2026-11-08
- **Current work:** The React refactor is finished (Phases 0–3) and was checked again on 2026-11-08. The same day, the owner asked for a new visual design and several follow-up changes, all done (see Decisions log). All of it is committed on the **`Development`** branch and pushed to GitHub. `main` still holds v1, which is what the live site shows.
- **Live site:** v1 (the single-file `index.html`) is live. URL and host: _not recorded yet, please fill in_. GitHub Pages is not turned on for the repo, so the site is hosted somewhere else. On 2026-11-08 GitHub showed no deployments, environments, or status checks for the repo, so the host probably doesn't build from `main` automatically. Confirm this before you push. Read "Hosting requirements" before the React version replaces it.
- **Repo:** https://github.com/Francis-A67/Mr.Asa_foodbank

## Goals

**Product**
- Anyone in the county can find free food quickly on a phone, with hours, rules, and directions up front.
- Volunteers, donors, and UMD students each get a clear page that sends them somewhere useful.
- Listings can be trusted: each one links to an official source, and the site says when the data was last checked.
- The site is accessible: it works with a keyboard and screen readers, in light and dark mode, and with reduced motion. Its wording is plain.

**Technical**
- A React app that looks and behaves like v1 first. New features come after that.
- Data lives in `src/data/`, so people who aren't developers can edit it.
- The build is plain static files that run on any host. Tests cover the filters and navigation.

## Roadmap

### React refactor (done, on the `Development` branch)
- [x] Plan agreed on 2026-10-01 (see Decisions log)
- [x] Phase 0: this file, `CLAUDE.md`, `AGENTS.md`; Vite scaffold; move the data files (2026-10-02)
- [x] Phase 1: foundations: global styles, data modules, `src/lib` with unit tests, UI parts, layout, routes, old-link redirect (2026-10-02)
- [x] Phase 2: all six pages, each checked against v1, plus tests for flows across pages (2026-10-02)
- [x] Phase 3: cleanup, README, final check of this file (2026-10-02)
- [x] Review the changes and commit them (committed to the `Development` branch and pushed, 2026-11-08)
- [ ] Choose a host and switch the live site to the React build (see Hosting requirements), then merge `Development` into `main`

### Next, after the refactor
- [ ] Replace the sample volunteer rows with the PGCPS volunteering database (`src/data/volunteer.js`).
- [ ] Fill in each UMD org's mission statement, meeting times, and Instagram, GroupMe, and TerpLink links (`src/data/umdOrgs.js`). Collect them with `data-sources/umd-student-orgs-template.csv`.
- [ ] Check the UMD campus resources (`src/data/foodResources.js`).
- [ ] Add a contact email or form to the About page.
- [ ] Fix the problems listed under Known issues.
- [ ] Think about prerendering pages, so search engines see each page's content without running JavaScript.

## How it's built

React 19 + Vite 8 + React Router 8, written in JavaScript (not TypeScript). Tests use Vitest 5 and Testing Library. Linting uses Oxlint. Node 22.22 or newer is required.

### Commands
```
npm install       # once, after cloning
npm run dev       # local dev server with live reload
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
npm run lint      # Oxlint (the linter in Vite's current React template)
npm test          # Vitest, runs once (npx vitest for watch mode)
```

### Folder map
```
index.html              Vite entry: <head> tags + <div id="root">
src/main.jsx            redirects old #hash links, then renders <App/>
src/App.jsx             routes: Layout → 6 pages; unknown paths → /. AppRoutes is exported for tests
src/styles/             tokens.css (colors, fonts, dark mode), global.css (base element styles)
src/data/               all site data (see Data below)
src/lib/                plain logic: filters, stats, days, page titles, URL params, old-link redirect (+ tests)
src/components/ui/      small shared parts (Button, Chip, Pill, Card, PageTitle, …), each with its own .module.css
src/components/layout/  Layout, Header, Footer, CrisisBar
src/components/ResourceCard.jsx   card for FOOD entries (used on Find Food and UMD)
src/pages/<page>/       one folder per page: the page, its sections, their .module.css files
src/App.test.jsx        tests for flows across pages; src/test/setup.js sets up the tests
data-sources/           raw inputs (pantry map spreadsheet, org template); not part of the site
```

### Routing
- React Router with clean URLs (see the page table above). Menu links are `NavLink`s, which add `aria-current="page"` on the current page.
- Jump links: `/donate#africa` and `/about#faq`. When the page or `#hash` changes, Layout sets the page title and then jumps to the `#id` (or to the top). On a fresh load it jumps again once web fonts arrive, because the fonts can move the section. Changes to the `?query` (Find Food filters) don't scroll.
- Find Food filters live in the URL: `/food?q=laurel&type=Food+Pantry&town=Laurel&day=Mon&anyone=1`. Unknown values are ignored. Typing in the search box replaces the current history entry. Menus and chips add a new entry, so Back undoes them. Home links into Find Food from the search box, the type tiles, and "See all open today".
- Old v1 links (`/#food`, `/#africa`, `/index.html#umd`, …) are redirected by `src/lib/legacyRedirect.js`. `main.jsx` uses it on a fresh page load, and Layout uses it when an old link is pasted while the site is already open.
- Unknown paths go to Home, as in v1.

### Styling
- Global CSS: `src/styles/tokens.css` (CSS variables for colors, fonts, shadows, and dark mode) and `src/styles/global.css` (base element styles).
- Everything else uses CSS Modules: `Thing.module.css` sits next to `Thing.jsx`. Class names are kebab-case in the CSS and camelCase in JSX (`.today-head` → `styles.todayHead`), set by `css.modules.localsConvention` in `vite.config.js`.
- Look (since 2026-11-08): soft neutral background `#F9F9FB`, slate text `#1E293B`, electric blue accent `#2563EB`, one sans-serif font for everything (Universal Sans Display, falling back to Geist; see Decisions log), and **square corners** everywhere (no `border-radius` on buttons, fields, cards, or tags). The only round shapes are the decorative spheres on Home.
- Layout (owner's choices, 2026-11-08): no logo or site name in the top bar. The menu tabs sit in the exact center, with "Find food now" on the right. No logo anywhere. Only Home has a hero: a frosted-glass "Open today" card over two CSS spheres, with "How can we help?" as a bento grid below it. The inner pages start right at their content. Each one still has an `<h1>` for screen readers, through `PageTitle`, which hides it on screen. The footer ends with "© <year> Mr. ASA Food Hub".
- Parts that are always used together share one module. For example, `Band`, `Section`, and `SectionHead` share `Section.module.css`, so `.section .head` works.
- Variants are props on the component (`<Pill tone="warn">`). They are single classes that come after the base class in the same file. For a parent to adjust a child, pass `className` and use a two-class selector in the parent's module (`.today .today-all`). That way it wins no matter which CSS loads first.
- Type scale (Tesla-style, tokens in `tokens.css`): `--fs-hero` 40px for the hero and section headlines and big numbers; `--fs-sub` 22px for promo titles, card titles (`h3`), and sub-headlines; `--fs-body` 14px for body text, buttons, fields, and navigation; `--fs-caption` 12px for tags, small uppercase labels, and fine print. Use these tokens for every `font-size`. Don't add new sizes.
- CSS formatting: one declaration per line, a blank line between rules (Prettier's CSS style). Never put a whole rule on one line. To reformat: `npx prettier@3.3.3 --write "src/**/*.css"`.
- Use the color tokens (`var(--accent)`, `var(--muted)`, `var(--line)`, …), not raw colors, so dark mode keeps working. Each token is listed in `tokens.css`. Raw colors are used only where a color never changes: the flags, social brand icons, the blue "I need food" tile, and the spheres.

### Data
| File | Export | What | Source / last checked |
|---|---|---|---|
| `src/data/pg-county-food-sites.json` | (JSON) | 41 county food sites | County pantry map, verified 2026-05-29 (`data-sources/Pantry Map - as of May 29 2026.xlsx`) |
| `src/data/sites.js` | `PG`, `TOWNS`, `SITE_TYPES` | The JSON above, plus the town and type lists made from it | |
| `src/data/foodResources.js` | `FOOD`, `CAT_LABEL` | UMD campus help, benefits, and regional services | |
| `src/data/volunteer.js` | `VOL` | Volunteer opportunities. **Sample rows** | To be replaced with the PGCPS database |
| `src/data/umdOrgs.js` | `ORGS` | UMD student orgs and campus programs | Missions, meeting times, and social links are still empty |
| `src/data/charities.js` | `AFRICA`, `CN` | Vetted charities for Burkina Faso and Nigeria | Ratings checked 2026-09-26 |

A food site record looks like `{type, name, addr, town, zip, host, sponsor, hours: {Sun…Sat: "text"}, model, elig, format, reg, limits, url}`; the `Site` typedef in `src/lib/sites.js` explains each field. An empty string means "not known", and the site hides that field. A site with an empty `elig` counts as "open to anyone". Each JS data file describes its own fields at the top.

### Tests
- `src/lib/*.test.js` are unit tests for the filters, stats, Find Food URL params, and old-link redirect. Expected numbers were counted separately from v1's rules.
- `src/App.test.jsx` renders the real routes in a `MemoryRouter`, with "today" pinned to Monday, Oct 5 2026. It covers the Home links into Find Food, the filters, Back, "Show all", the empty states, jump links, titles, the mobile menu, and old links.
- Tests find things by role and text, not by class name, because CSS Modules rename classes.

## Conventions and guardrails
- Keep v1's behavior unless the Decisions log says otherwise. The look changed on purpose on 2026-11-08; follow the Styling notes above.
- Accessibility: keep `aria-pressed` on toggle chips, `aria-label`s on filters, `aria-current` on the nav, visible focus outlines, and reduced-motion support.
- Only add links you've confirmed with the organization. Leave a field empty to hide it.
- When data changes, update its "verified" or "checked" date, both on the page and in the Data table above.
- External links open in a new tab with `rel="noopener"`. `Button` and `CardLink` do this for `href`.
- Site text: plain language, short sentences, no jargon.
- Don't present the site as an official county, PGCPS, or UMD site.

## Hosting requirements (host not chosen yet)
Any static host works if it:
1. runs `npm run build` and publishes the `dist/` folder, and
2. sends every unknown path to `/index.html` (an "SPA fallback"), so `/food` doesn't 404 when someone refreshes the page.

How to set this up on common hosts:
- **Netlify:** `public/_redirects` containing `/*  /index.html  200`.
- **Vercel:** a rewrite from `/(.*)` to `/index.html` in `vercel.json`.
- **Cloudflare Pages:** automatic when there is no `404.html`.
- **GitHub Pages:** has no rewrites. It needs a copy of `index.html` saved as `404.html`. For a project site, Vite's `base` and React Router's `basename` must also be `/Mr.Asa_foodbank/`, and the old-link redirect would need the same base.

**Warning:** if the current live host serves files straight from `main` without a build step, merging the React code will break the live site. Change the host's build settings first.

## Decisions log
| Date | Decision | Why |
|---|---|---|
| 2026-10-01 | Rebuild v1 in React with Vite | One 889-line HTML file is hard to extend (volunteer database, org details, contact form). |
| 2026-10-01 | JavaScript, not TypeScript | Easier for student contributors. Record shapes are documented in comments instead. |
| 2026-10-01 | React Router with clean URLs | Better for sharing and search than `#food`. Needs a host fallback (see Hosting requirements). |
| 2026-10-01 | CSS Modules per component | Styles stay scoped as the site grows. Color tokens stay global. |
| 2026-10-01 | Find Food filters in the URL | Filtered results can be bookmarked and shared, and Back undoes a filter change. |
| 2026-10-01 | Same site, nothing new, during the refactor | Makes it easy to check against v1. Fixes and features wait in the Roadmap. |
| 2026-10-01 | Redirect old `#hash` links | v1 is live, so links people already have must keep working. |
| 2026-10-01 | Choose hosting later | The build works on any host. Requirements are listed above. |
| 2026-10-01 | Tests with Vitest and Testing Library | To show the React version behaves like v1. |
| 2026-10-02 | Lint with Oxlint, not ESLint | It's what Vite's current React template ships (create-vite 9). Config: `.oxlintrc.json`. |
| 2026-10-02 | Keep v1's CSS quirks for now | Matching v1 pixel for pixel made the port easy to check. The quirks are listed under Known issues. |
| 2026-11-08 | New visual design, replacing v1's green, tomato, and gold look | The owner felt the site looked "too AI" and asked for square buttons, no icon in the header, and a premium, minimal look: `#F9F9FB` background, `#1E293B` text, `#2563EB` accent, subtle gradients, glassmorphism, and a bento grid. Behavior, text, and links didn't change. |
| 2026-11-08 | One sans-serif font: Geist only, no Geist Mono | Owner asked for sans-serif. The small labels (eyebrows, breadcrumbs, hours, table heads) had used the monospace font. |
| 2026-11-08 | Top bar: no site name or logo; tabs centered | Owner's request. A three-column grid keeps the tabs at the true page center, whatever the button's width. |
| 2026-11-08 | No logo anywhere; © line in the footer | Owner's request. Deleted `BrandMark` and the icons nothing used (bowl, hand, gift). The year comes from the visitor's clock. |
| 2026-11-08 | No hero on inner pages; keep a hidden `<h1>` | Owner's request. Screen readers still need a heading that names each page, so `PageTitle` renders one that's hidden on screen. Find Food keeps its "verified May 29, 2026" line next to the result count, because showing when the data was checked is a project goal. The Donate banner's "Give to Burkina Faso & Nigeria" button went with the banner; the footer link still jumps there. |
| 2026-11-08 | Font: Universal Sans Display, with Geist as the fallback | Owner asked for Tesla's font. It's a commercial font from Family Type, not on Google Fonts, and no licensed files are in the repo. So it's first in the font list (it shows where it's installed) and visitors see Geist for now. To use it everywhere: add the licensed `.woff2` files to `public/fonts/` and an `@font-face` rule in `global.css`. |
| 2026-11-08 | Tesla-style type scale: 40 / 22 / 14px, plus 12px | Owner's request: hero and main headlines 40px, promo and sub-headlines 22px, body, UI, and navigation 14px. 12px was added for tags, small uppercase labels, and fine print, which would look heavier than the body text at 14px. The tight letter-spacing that suited the old oversized headlines is now -0.02em. |
| 2026-11-08 | Home headline is all one color, with no period | Owner's own edit to `Hero.jsx`: removed the blue "all in one place." styling. |
| 2026-11-08 | Work lives on a `Development` branch, not `main` | Owner's request. `main` keeps v1, so the live site can't break if its host serves `main` directly. Merge only after the host builds the React app. |
| 2026-11-08 | CSS files use one declaration per line | Owner's request, for readability. Formatted with Prettier 3.3.3 (run with npx, not installed). |
| 2026-11-08 | Find Food search box keeps its own text | React Router updates the URL as a low-priority transition, so a box tied straight to the URL dropped letters when typing fast (seen in headless Chrome at 50 keys/second). The box now holds its text and takes the URL's value again only after Back, the menu, or a link. |
| 2026-11-08 | Run `npm audit fix` before the first commit | `npm audit` found 2 high-severity issues, in vite (dev server) and undici (used by jsdom in tests). Neither ships in `dist/`. The fix was patch versions only (vite 8.3.2 → 8.3.6, undici 7.30.0 → 7.30.2), changed only `package-lock.json`, and kept lint, tests, and build passing. |

## Known issues (left as-is on purpose for now)
- **Data:** "Capital Heights" and "Capitol Heights" are the same town, spelled two ways in the pantry data. The town filter lists both, and the stat says 22 towns when there are really 21.
- **Data:** 4 sites have no address and 3 have no hours. The site shows "Location varies" or "Hours not listed" for them.
- **Data:** the volunteer rows are samples, and the UMD orgs have no mission statements, meeting times, or social links yet.
- **No favicon (same as v1):** browsers log a 404 for `/favicon.ico`. Adding an icon to `public/` would fix it.

## Differences from v1
1. Pages use paths (`/food`) instead of hashes (`#food`). Old links redirect.
2. Find Food filters live in the URL. Opening Find Food from the menu starts with no filters. "See all open today" clears the other filters; v1 left "Open to anyone" on. "Show all" resets when any filter changes; v1 kept it for the day and chip filters.
3. Filters on Volunteer, UMD, and Donate, and the Home search box, reset when you leave the page. v1 kept every page loaded and only hid it.
4. The Home type tiles are links instead of buttons.
5. The visual design is new (2026-11-08). See Styling and the Decisions log.
6. Inner pages have no hero band, so their intro text and the Donate page's jump button are gone (2026-11-08).

## Accomplishments log (newest first)
- **2026-11-08:** Created the `Development` branch, committed all the work above in one commit, and pushed it to GitHub. `main` is unchanged (v1).
- **2026-11-08:** Font and type scale.
  - Font list now starts with Universal Sans Display (licensed files still needed; Geist shows until then).
  - Replaced all 66 font sizes with four tokens. In headless Chrome, every visible text on all six pages measures 40, 22, 14, or 12px.
  - The owner removed the blue color and period from the Home headline. Saving that file in the editor also brought back the old hero font sizes, which were then set to the scale again.
  - Lint, 49 tests, build, and the 249-check headless Chrome test pass.
- **2026-11-08:** Follow-up design changes, at the owner's request.
  - Font: everything is Geist (sans-serif). Geist Mono is no longer loaded. Buttons and form fields inherit the page font.
  - Top bar: removed the site name; the tabs are centered at every desktop width (checked at 960, 1024, 1280, and 1440px).
  - Removed the logo everywhere (`BrandMark` deleted, plus the unused bowl, hand, and gift icons). Added "© <year> Mr. ASA Food Hub" to the footer.
  - Removed the hero band (`Banner`) from Find Food, Volunteer, Donate, UMD Students, and About. Each page keeps a hidden `<h1>` through the new `PageTitle`.
  - Reformatted every CSS file: one declaration per line, a blank line between rules.
  - Fixed dropped letters in the Find Food search box when typing fast. In headless Chrome it now keeps every letter even at instant typing speed (before: "capitol heights" ended up as "s").
  - Lint, 49 tests, build, and the 249-check headless Chrome test all pass.
- **2026-11-08:** New visual design, at the owner's request.
  - New tokens in `tokens.css` (light and dark), Geist and Geist Mono fonts, square corners on every button, chip, field, card, and tag. Dropdowns draw their own square chevron.
  - Removed the bowl icon from the header. Rebuilt the Home hero (light gradient, faint grid, glass "Open today" card over two spheres) and made "How can we help?" a bento grid without icon tiles. Promos use the new `soft` and `deep` tones.
  - Fixed two old CSS quirks: the small labels above headings now show in blue small caps everywhere, and the breadcrumb shows at its intended small size. The section and banner styles now target only paragraphs after the heading.
  - Lint, 49 tests, and build pass. The 249-check headless Chrome test passes on the new build, with no horizontal scroll at phone width in light or dark mode.
- **2026-11-08:** Checked the whole project before the first commit.
  - `npm run lint`, `npm test` (49 tests), and `npm run build` pass, both in this folder and in a fresh copy installed with `npm ci`.
  - The moved data files (`src/data/pg-county-food-sites.json` and both files in `data-sources/`) are byte-identical to the committed v1 copies.
  - Data check: list keys are unique, all 41 site records have every field, and all 52 external links use https.
  - `npm audit fix` patched vite and undici (see Decisions log). `npm audit` now reports 0 vulnerabilities.
  - Headless Chrome against `npm run preview`: 249 checks passed. They covered all 6 pages loaded directly at desktop and phone widths in light and dark mode (title, heading, current menu item, no horizontal scroll, no console errors or failed requests), 13 old-link redirects on a fresh load plus 2 while the site was open, the `#africa` and `#faq` jump links, Home search to Find Food, Find Food filters with Back, "Show all", the empty state, unknown URL values, the mobile menu, the filters on Donate, UMD, and Volunteer, and keyboard focus outlines. The only console error was the known `/favicon.ico` 404.
- **2026-10-02:** Phases 1–3 done. All six pages, the header, and the footer are React components with CSS Modules. The old filtering code is now pure functions in `src/lib`, and the data is in `src/data` as a single copy. Old `#hash` links redirect. 49 tests pass, and lint and build are clean.
  - Checked against v1 in headless Chrome: 74 screenshot comparisons (6 pages × 3 widths × light/dark, 17 interactions, 4 jump-link scroll positions) were pixel-identical to v1 in two full runs. Both versions got the same cached copy of the Google Fonts files; downloading the fonts separately for each screenshot causes small random differences in text rendering.
  - Checked all 20 old-link cases in a real browser, both on a fresh load and pasted while the site was open.
  - README rewritten.
- **2026-10-02:** Phase 0 done. Created Context.md, CLAUDE.md, and AGENTS.md. Scaffolded Vite 8 + React 19 (JavaScript) with React Router 8 and Vitest 5. Replaced `index.html` with the Vite entry, moved the food-site JSON to `src/data/`, and moved the spreadsheet and CSV to `data-sources/`.
- **2026-10-01:** Planned the React refactor and recorded the decisions above.
- **2026-09-27:** Shipped v1, a single-file `index.html` with six hash-routed pages. It included a finder for 41 county food sites (verified 2026-05-29), a sample volunteer table, a donation guide with vetted Burkina Faso and Nigeria charities, UMD resources and orgs, and an About page with an FAQ.

## Handoff checklist
1. Read this file and `README.md`.
2. Run `npm install`, then `npm run dev`.
3. Pick the first unchecked Roadmap item.
4. Before you finish, make sure `npm run lint`, `npm test`, and `npm run build` all pass.
5. Update Status, the Roadmap, the Accomplishments log, and the Decisions log.

## Reference
- v1 source: `git show 1aa812b:index.html`. It is a single file that opens in a browser, which is handy for side-by-side comparisons.
