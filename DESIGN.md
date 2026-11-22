# DISCOVERY-TAXONOMY — Design Specification (v1.1)

> **Slogan**: *Break Unknown Unknown* / 打破未知的未知

## 1. Core Positioning
In an era where AI makes answers nearly free, **good questions and high-leverage exploration spaces** are the real scarcity.
`DISCOVERY-TAXONOMY` is a bilingual static library of curated **discovery topics**, not generic startup ideas. It completes a three-part personal AI workflow:

1. **AI-TASKS-TAXONOMY** — What AI can do (*Capability Map*)
2. **Prompt-taxonomy** — How to instruct AI (*Execution Library*)
3. **DISCOVERY-TAXONOMY** — Where to explore next (*Problem Space & Blindspot Radar*)

### Anti-Goals (Content Guardrails)
- **No generic idea lists** (e.g., "Build an AI expense tracker"). Every card must expose a structural exploration space that can spawn many concrete projects.
- **No lagging consensus**. Every card must pass the *Blindspot Test*: *"If I hadn't seen this card, would I have even thought to ask AI in this direction?"*
- **Built for real use**: Every card ends with `[variable]`-ready **Seed Prompts** that can be filled inline and sent straight to an AI.

---

## 2. Two-Axis Taxonomy

### Axis 1: Exploration Arenas (Single-select primary category)
Covers all high-leverage domains of a modern individual:

| Key | Chinese | English | Scope |
| :--- | :--- | :--- | :--- |
| `build` | 工具与建造 | Build & Tools | AI workflows, indie dev, automation, software infra |
| `business` | 商业与变现 | Business & Leverage | Micro-niches, pricing, B2B glue, cashflow models |
| `content` | 内容与传播 | Content & Distribution | Content ecosystems, distribution, personal IP, viral mechanics |
| `cognition` | 认知与决策 | Cognition & Decisions | Mental models, signal-to-noise, decision frameworks |
| `career` | 职业与成长 | Career & Mastery | Skill transfer, AI-era positioning, learning & energy |
| `life` | 生活与实验 | Life & Play | Lifestyle design, geek toys, unconventional living |

#### Arbitration Rules (Preventing Category Overlap)
- **`build` vs `business`**: Look at where the counter-intuitive insight lives. If it is about *architecture, tooling, or technical workflow*, put it in `build`. If it is about *niche selection, pricing, or monetization*, put it in `business`.
- **`cognition` vs `career`**: General thinking frameworks and information hygiene go to `cognition`. Insights tied directly to job competitiveness, skill portfolios, or career paths go to `career`.

### Axis 2: Cognitive Lenses (Multi-select cross-domain filters)
Explains *why* most people miss this opportunity:

- `cost-collapse` — 成本坍塌 (*100x Cheaper*): Something formerly expensive/hard is now nearly free.
- `role-inversion` — 角色反转 (*Role Inversion*): Subject and object flip (e.g., software for machines instead of humans).
- `invisible-friction` — 隐形摩擦 (*Invisible Friction*): Boring, fragmented pain points giants ignore.
- `first-principles` — 第一性重写 (*Rewritten from Scratch*): Stripping away bloated legacy conventions.
- `cross-domain` — 跨界迁移 (*Cross-Domain Transfer*): Transplanting a proven pattern from Domain A into Domain B.

---

## 3. Data Schema & Validation
- Data is split by arena into 6 JSON files under `data/`.
- Each card uses inline bilingual objects (`{ "zh": "...", "en": "..." }`) to guarantee 1:1 parity.
- Card IDs strictly follow `{arena}-{slug}` (e.g., `build-agent-native-infra`).
- `scripts/validate.mjs` runs locally and via `.github/workflows/validate.yml` on every push/PR.

---

## 4. Core UX Features
- **Bilingual Switch** (`中文 / EN`) persisted in URL (`?lang=zh`).
- **Dual-Axis Filtering** (Arena tabs + multi-select Lens chips + real-time bilingual search).
- **Random Blindspot (`随机破盲`)**: Surfaces a random card outside your usual search habits.
- **Inline Variable Filling**: Click `[variables]` inside Seed Prompts to fill in your own context before copying or launching in AI.
- **URL State Persistence**: Shareable deep links (`?lang=zh&arena=business&lens=invisible-friction&card=business-micro-glue`).
