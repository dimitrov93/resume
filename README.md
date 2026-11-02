# Tsvetomir Dimitrov — Portfolio

Live: https://dimitrov93.eu

## CV builder (themes / colors)

The CV PDFs are generated from a hidden page with a theme picker (Classic, Noir, Executive, Crimson, Ocean, …):

- Live: https://dimitrov93.eu/build-cv-hidden
- Local: http://localhost:3000/build-cv-hidden (`npm run dev`)

Source: `src/pages/cv/CvPage.tsx`, themes in `src/pages/cv/cvHelpers.ts` (`THEMES`).

To regenerate the downloadable CVs after changing the content:

1. Open `/build-cv-hidden`, pick **🎨 Theme → Classic**, click **🖨 Print / PDF** (A4, margins none, background graphics on) and save as `public/cv-classic.pdf`.
2. Repeat with **Noir** → `public/cv-noir.pdf`.

The site serves `cv-classic.pdf` in light mode and `cv-noir.pdf` in dark mode (`src/hooks/useCvPdf.ts`).

Edits made in **✏️ Edit Mode** are saved only in the browser's `localStorage`. Click **↺ Reset** before printing so the PDF matches the source code.

## Development

React 19 + TypeScript + Vite, Tailwind CSS v4, Framer Motion, React Router. EN/BG translations in `src/data/translations.ts`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

The contact form uses EmailJS: copy `.env.example` to `.env` and fill in the `VITE_EMAILJS_*` keys.

## Deploy

Vercel (Git integration): `main` → production, every other branch → a preview deployment. Rewrites, cache and security headers live in `vercel.json`. GitHub Actions (`.github/workflows/ci.yml`) runs lint, type-check and build on every PR.
