# Project Rules

## Architecture
- React + TypeScript + Vite portfolio site
- Tailwind CSS v4 for styling (use canonical class syntax, e.g. `py-2.5!` not `!py-2.5`)
- Framer Motion for animations

## File Structure
- `src/data/` — static data constants (profile info, resume data, contacts, etc.). No components here.
- `src/components/ui/` — small, reusable UI components (cards, modals, icons, etc.)
- `src/components/sections/` — page-level section components (About, Skills, Portfolio, etc.). These compose from `ui/` and `data/`.
- `src/components/` — layout components (Sidebar, etc.)

## Code Style
- Keep section components lean — they should compose data + UI components, not define large data arrays or complex sub-components inline.
- Extract data constants to `src/data/` when they have more than ~3 entries.
- Extract reusable UI into `src/components/ui/` — modals, cards, timeline entries, etc.
- Use named exports for data, default exports for components.
- Prefer Tailwind utility classes over custom CSS.
- Use `framer-motion` variants pattern for stagger/animation consistency.
