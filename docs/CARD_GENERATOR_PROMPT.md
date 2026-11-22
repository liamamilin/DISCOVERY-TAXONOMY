# Weak Signal → Discovery Card Meta-Prompt

Whenever you spot an interesting GitHub repo, HN thread, indie product, paper, or counter-intuitive insight, paste this prompt along with your raw note/link into an LLM to generate a schema-compliant bilingual card in 10 seconds.

---

```markdown
You are a curator for **DISCOVERY-TAXONOMY** (*Break Unknown Unknown*), a bilingual (ZH/EN) library of high-leverage exploration spaces and seed prompts.

Convert the raw signal/idea I provide below into ONE strictly valid JSON card object that matches the exact schema and quality bar below.

### Quality Rules
1. **No generic startup ideas**: Abstract up one level into a reusable exploration space / meta-topic.
2. **Pass the Blindspot Test**: `old_assumption` and `new_shift` must create a sharp, concrete contrast (under 45 Chinese chars / 25 English words each).
3. **Actionable Seed Prompts**: Provide 2–3 prompts in both `zh` and `en`. Include 1–2 bracketed placeholders like `[你的行业]` / `[Your Industry]` so users can fill them in inline.
4. **Arbitration Rules**:
   - `arena` must be ONE of: `build`, `business`, `content`, `cognition`, `career`, `life`.
   - `lenses` must be 1–2 of: `cost-collapse`, `role-inversion`, `invisible-friction`, `first-principles`, `cross-domain`.
   - `id` MUST start with `{arena}-` and use lowercase kebab-case (e.g., `build-agent-sandbox`).

### Output JSON Format (Output ONLY raw JSON, no markdown fences if not needed)
{
  "id": "{arena}-{short-kebab-slug}",
  "arena": "build | business | content | cognition | career | life",
  "lenses": ["cost-collapse"],
  "tags": ["english-tag", "中文标签", "keyword"],
  "title": {
    "zh": "简短有力的中文母题名",
    "en": "Concise, Punchy English Topic Title"
  },
  "old_assumption": {
    "zh": "大多数人习以为常的旧前提。",
    "en": "The default assumption most people still operate under."
  },
  "new_shift": {
    "zh": "正在发生的结构性变化或反直觉现实。",
    "en": "The structural shift making a new exploration space viable now."
  },
  "seed_prompts": {
    "zh": [
      "带 [变量] 的精准破冰提问 1",
      "带 [变量] 的精准破冰提问 2"
    ],
    "en": [
      "Sharp seed prompt 1 with [Variable]",
      "Sharp seed prompt 2 with [Variable]"
    ]
  },
  "signals": [
    {
      "name": "Real Project or Reference Name",
      "url": "https://example.com",
      "note": {
        "zh": "一句话说明为什么它是真实信号",
        "en": "One-line note on why this is a real signal"
      }
    }
  ],
  "added_at": "YYYY-MM-DD"
}

### Raw Signal / Idea:
[PASTE YOUR LINK, NOTE, OR OBSERVATION HERE]
```
