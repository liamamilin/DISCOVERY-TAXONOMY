# DISCOVERY-TAXONOMY

**Break Unknown Unknown** / **打破未知的未知**

A lightweight, bilingual (ZH/EN) static library of high-leverage **exploration spaces, cognitive blindspots, and AI seed prompts** across building, business, content, cognition, career, and life.

Instead of giving you disposable answers, `DISCOVERY-TAXONOMY` gives you **better questions to ask**.

---

## Part of the Personal AI Exploration Trilogy

| Project | Role | Live Site |
| :--- | :--- | :--- |
| **AI-TASKS-TAXONOMY** | What AI can do (*Capability Map*) | [liamamilin.github.io/AI-TASKS-TAXONOMY](https://liamamilin.github.io/AI-TASKS-TAXONOMY/) |
| **Prompt-taxonomy** | How to instruct AI (*Execution Library*) | [liamamilin.github.io/Prompt-taxonomy](https://liamamilin.github.io/Prompt-taxonomy/#library) |
| **DISCOVERY-TAXONOMY** | Where to explore next (*Blindspot Radar*) | [liamamilin.github.io/DISCOVERY-TAXONOMY](https://liamamilin.github.io/DISCOVERY-TAXONOMY/) |

---

## Key Features
- **6 Exploration Arenas × 5 Cognitive Lenses**: Navigate intuitively by domain (`Build`, `Business`, `Content`, `Cognition`, `Career`, `Life`) or slice across domains by cognitive shift (`Cost Collapse`, `Role Inversion`, `Invisible Friction`, `First Principles`, `Cross-Domain`).
- **Old Assumption → New Shift**: Every card compresses a counter-intuitive structural shift into a 15-second contrast.
- **Interactive Seed Prompts**: Fill `[variables]` inline, copy with one click, or launch directly in ChatGPT / Claude / Perplexity.
- **Random Blindspot (`随机破盲`)**: Jump into a random unfamiliar exploration space with one click.
- **Full Bilingual & URL Persistence**: Switch seamlessly between Chinese and English, and share exact filters or individual cards via URL.

---

## Project Structure

```text
DISCOVERY-TAXONOMY/
├── DESIGN.md                        # Architecture & taxonomy specification
├── README.md                        # Project overview
├── docs/
│   └── CARD_GENERATOR_PROMPT.md     # 10-second meta-prompt to turn weak signals into cards
├── schemas/
│   └── card.schema.json             # Strict JSON Schema
├── scripts/
│   └── validate.mjs                 # Zero-dependency Node.js validator
├── .github/workflows/
│   └── validate.yml                 # CI validation on push & PR
├── data/                            # 6 arena JSON files (bilingual)
│   ├── build.json
│   ├── business.json
│   ├── content.json
│   ├── cognition.json
│   ├── career.json
│   └── life.json
├── index.html                       # Static SPA entry
├── css/style.css                    # Responsive light/dark styles
└── js/app.js                        # App logic (filtering, i18n, inline vars, URL state)
```

---

## Local Development & Validation

No build step required. Serve the root directory with any static server:

```bash
# 1. Validate all data files (requires Node.js 18+)
node scripts/validate.mjs

# 2. Preview locally
npx serve .
# or with Python:
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Adding New Cards

1. Copy the meta-prompt in [`docs/CARD_GENERATOR_PROMPT.md`](docs/CARD_GENERATOR_PROMPT.md) and paste your weak signal/link/idea into an LLM.
2. Append the generated JSON object to the matching file under `data/<arena>.json`.
3. Run `node scripts/validate.mjs` to verify schema compliance, unique IDs, and bilingual completeness.
4. Commit and push!
