# Enil Otman · Computer Engineer

A responsive portfolio for Enil Otman, a computer engineer based in Tangier. It pairs a custom Three.js visual system with a small interactive portfolio CLI.

## Run locally

```sh
npm install
npm run dev
```

Production build:

```sh
npm run build
```

## Portfolio CLI

The terminal is a browser-side, read-only profile explorer. Supported commands: `help`, `whoami`, `skills`, `experience`, `contact`, and `clear`. It does not execute operating-system commands.

## Profile photo

Place a background-removed transparent PNG at `public/enil-otman.png`; the hero prefers that cutout and falls back to `public/enil-otman.jpg`. The old Mohammed portrait and CV have been removed so the site cannot accidentally display the wrong person.

## Structure

```text
src/
├── components/       Three.js scenes
├── data/             Profile, skills, experience, and education
├── layout/           Navigation and footer
├── sections/         Hero, terminal, about, experience, education, contact
├── App.jsx           Page composition
├── index.css         Site styles and responsive layout
└── main.jsx          React entry point
public/
└── enil-otman-cv.html  Print-ready résumé
```
