# Project Rules

## Architecture
- React + TypeScript + Vite portfolio site
- Tailwind CSS v4 for styling (use canonical class syntax, e.g. `py-2.5!` not `!py-2.5`)
- Framer Motion for animations
- React Router (`BrowserRouter`) for routing — relies on the SPA fallback in `public/.htaccess` (Apache rewrite to `index.html`). Don't switch to `HashRouter` without a reason.
- Deployed to jump.bg shared hosting via FTP through `.github/workflows/deploy-main.yml`. Anything in `public/` (including `.htaccess`) is copied to `dist/` and uploaded.

## File Structure
- `src/App.tsx` — router shell only. Maps URLs to pages. Touch this when adding/removing routes.
- `src/main.tsx` — providers (`LanguageProvider`, `ThemeProvider`) + render `<App />`. No routing here.
- `src/pages/` — top-level views, one per URL. Each page owns a route and composes from `components/` + `data/` + `hooks/`.
  - Flat files (`Home.tsx`) for simple pages.
  - Subfolder (`pages/cv/`) when a page has its own private files (component + styles + helpers + types). Promote to a subfolder the moment a page accumulates 3+ private files that nothing else imports.
- `src/components/sections/` — sections of `Home.tsx` (About, Skills, Portfolio, Certifications, Contact). NOT full pages — those live in `pages/`.
- `src/components/ui/` — small, reusable UI primitives (cards, modals, icons, etc.)
- `src/components/` — layout components shared across pages (Sidebar, etc.)
- `src/data/` — static data constants (profile info, resume data, contacts, etc.). No components here.
- `src/hooks/` — shared custom hooks.

## Routing
- Add a new page: create `src/pages/MyPage.tsx` (or `src/pages/myPage/MyPage.tsx` if it has private files), then add a `<Route>` line to `App.tsx`.
- Routes use clean URLs (no `#`). The `.htaccess` rewrite handles direct visits and refreshes by falling back to `index.html`.
- Real files in `public/` (e.g. `cv.pdf`, `hero.png`) are NOT rewritten — they continue to serve directly.
- "Hidden" routes (like `/cv-private-x7k2`) are obscure-by-URL only — the path is in the JS bundle. Don't treat them as private; use host-level auth if real protection is needed.

## When to use feature folders
- Default to type-based organization (`components/`, `hooks/`, `data/`).
- Promote a page to a folder (`pages/<feature>/`) when it has 3+ private files: component + styles, helpers, types, sub-components.
- Only consider a top-level `features/` folder if you have multiple independent feature graphs that share nothing private. The portfolio doesn't need this today.

## Code Style
- Keep section and page components lean — they should compose data + UI components, not define large data arrays or complex sub-components inline.
- Extract data constants to `src/data/` when they have more than ~3 entries.
- Extract reusable UI into `src/components/ui/` — modals, cards, timeline entries, etc.
- Use named exports for data, default exports for components.
- Prefer Tailwind utility classes over custom CSS.
- Use `framer-motion` variants pattern for stagger/animation consistency.
- Page-specific CSS that doesn't fit Tailwind (e.g. `pages/cv/cv.css` for the print-formatted CV) should be scoped under a parent class (`.cv-root .x`) so it can't leak into the rest of the site.

## i18n
- The site ships in two languages: **English** and **Bulgarian**. Both are first-class — every visitor-facing string must exist in both.
- All translations live in `src/data/translations.ts` as a strict keyed object. `TranslationKey` is a type derived from the `en` keys; missing keys in `bg` are a type error.
- Any new UI copy — labels, headings, paragraphs, button text, aria-labels, alt text — must be added as a translation key and rendered via `const { t } = useLanguage(); t('my.key')`. Never hardcode user-facing strings.
- Data files that contain visitor-facing copy (e.g. `src/data/projects.ts`) should store **translation keys**, not raw strings. The consuming component calls `t(project.titleKey)` at render time so both languages work.
- Sorting/searching on translated fields must use the resolved string, not the key — pass `t` into the sort comparator and compare on `t(a.key).localeCompare(t(b.key))`.
- Proper nouns (brand names, frameworks like "React" / "Next.js", product names like "Lupy Games") can stay unchanged in both locales — but still add a key if you want consistency across the table.
- When adding a new page or section, write BOTH `en` and `bg` copy in the same commit. Don't ship half-translated features.

## Don't break what's working
- This is a live deployed site. Before touching shared files (`App.tsx`, `main.tsx`, layout components, hooks, providers), confirm the change doesn't affect existing routes or behaviors.
- Run `npm run build` after structural changes (file moves, router edits, new dependencies) to catch broken imports before commit.
