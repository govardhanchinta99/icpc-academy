# ICPC Academy — Competitive Programming Mastery Platform

A full-stack interactive training system that guides a student from beginner to ICPC World Finals level.

## Features

- **Tiered roadmap:** Foundation → Intermediate → Advanced → ICPC-Level → World Finals.
- **Reusable topic system:** each topic includes concept, pattern recognition, complexity, mistakes, C++ template, practice set, “when not to use”, and ICPC variations.
- **Interactive training tools:**
  - Constraint Analyzer
  - Pattern Finder quiz
  - Daily practice generator
  - Timed mock contest generator
  - ICPC-style scoreboard simulation
  - C++ template generator
- **Progress tracking:** mark topics mastered with `localStorage` persistence.
- **ICPC prep module:** format breakdowns, team strategy, psychology, debugging checklist, and stamina plan.

## Tech stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Data:** Structured JSON (`server/data/topics.json`)

## Project structure

```text
icpc-academy/
├─ client/
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ ICPCPrep.jsx
│  │  │  ├─ Scoreboard.jsx
│  │  │  ├─ SectionCard.jsx
│  │  │  ├─ TierRoadmap.jsx
│  │  │  ├─ ToolsPanel.jsx
│  │  │  └─ TopicDetail.jsx
│  │  ├─ styles/app.css
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ index.html
│  ├─ package.json
│  └─ vite.config.js
├─ server/
│  ├─ data/topics.json
│  ├─ src/index.js
│  └─ package.json
├─ package.json
└─ README.md
```

## Run locally

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

Production-like run:

```bash
npm run build
npm run start
```

## Sample implemented topic

The platform includes a detailed sample topic implementation for **Binary Search on Answer** with:
- full concept notes,
- monotonic pattern cues,
- complexity model,
- mistake checklist,
- contest-ready C++ template,
- curated practice links with difficulty labels,
- anti-pattern guidance,
- ICPC-grade variations.

## Extending topics

Edit `server/data/topics.json` and add a topic object under the appropriate tier using the same schema:

```json
{
  "id": "unique-id",
  "title": "Topic Name",
  "concept": "...",
  "patternRecognition": "...",
  "timeComplexity": "...",
  "commonMistakes": ["..."],
  "template": "...",
  "practiceProblems": [{"name":"...","difficulty":"Easy|Medium|Hard","url":"..."}],
  "whenNotToUse": "...",
  "icpcVariations": "..."
}
```

This design keeps the platform modular and easy to scale into a long-term ICPC curriculum system.
