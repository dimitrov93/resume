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

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
