import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'data');

const ARENAS = ['build', 'business', 'content', 'cognition', 'career', 'life'];
const LENSES = new Set([
  'cost-collapse',
  'role-inversion',
  'invisible-friction',
  'first-principles',
  'cross-domain',
]);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const URL_RE = /^https?:\/\/.+/;

const errors = [];
const seenIds = new Set();
let totalCards = 0;

function checkBilingual(obj, fieldPath) {
  if (!obj || typeof obj !== 'object') {
    errors.push(`${fieldPath}: must be an object with { zh, en }`);
    return;
  }
  for (const lang of ['zh', 'en']) {
    if (typeof obj[lang] !== 'string' || obj[lang].trim().length < 2) {
      errors.push(`${fieldPath}.${lang}: must be a non-empty string`);
    }
  }
}

for (const arena of ARENAS) {
  const filePath = path.join(dataDir, `${arena}.json`);
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing data file: data/${arena}.json`);
    continue;
  }

  let cards;
  try {
    cards = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    errors.push(`data/${arena}.json: invalid JSON (${err.message})`);
    continue;
  }

  if (!Array.isArray(cards)) {
    errors.push(`data/${arena}.json: root must be a JSON array`);
    continue;
  }

  cards.forEach((card, idx) => {
    totalCards += 1;
    const prefix = `data/${arena}.json[${idx}] (${card?.id || 'no-id'})`;

    if (!card || typeof card !== 'object') {
      errors.push(`${prefix}: card must be an object`);
      return;
    }

    // ID check
    const idRe = new RegExp(`^${arena}-[a-z0-9]+(?:-[a-z0-9]+)*$`);
    if (typeof card.id !== 'string' || !idRe.test(card.id)) {
      errors.push(`${prefix}: id must match "${arena}-{kebab-case}"`);
    } else if (seenIds.has(card.id)) {
      errors.push(`${prefix}: duplicate id "${card.id}"`);
    } else {
      seenIds.add(card.id);
    }

    // Arena match
    if (card.arena !== arena) {
      errors.push(`${prefix}: arena "${card.arena}" does not match filename "${arena}.json"`);
    }

    // Lenses
    if (!Array.isArray(card.lenses) || card.lenses.length < 1 || card.lenses.length > 3) {
      errors.push(`${prefix}: lenses must be an array of 1 to 3 valid lens keys`);
    } else {
      const unique = new Set(card.lenses);
      if (unique.size !== card.lenses.length) {
        errors.push(`${prefix}: duplicate values in lenses`);
      }
      for (const l of card.lenses) {
        if (!LENSES.has(l)) {
          errors.push(`${prefix}: invalid lens "${l}"`);
        }
      }
    }

    // Tags
    if (!Array.isArray(card.tags) || card.tags.length < 2) {
      errors.push(`${prefix}: tags must have at least 2 strings`);
    }

    // Bilingual text fields
    checkBilingual(card.title, `${prefix}.title`);
    checkBilingual(card.old_assumption, `${prefix}.old_assumption`);
    checkBilingual(card.new_shift, `${prefix}.new_shift`);

    // Seed prompts
    if (!card.seed_prompts || typeof card.seed_prompts !== 'object') {
      errors.push(`${prefix}.seed_prompts: must be an object with { zh, en }`);
    } else {
      for (const lang of ['zh', 'en']) {
        const list = card.seed_prompts[lang];
        if (!Array.isArray(list) || list.length < 2) {
          errors.push(`${prefix}.seed_prompts.${lang}: must contain at least 2 prompts`);
        } else {
          list.forEach((p, pIdx) => {
            if (typeof p !== 'string' || p.trim().length < 10) {
              errors.push(`${prefix}.seed_prompts.${lang}[${pIdx}]: prompt too short or invalid`);
            }
          });
        }
      }
    }

    // Signals
    if (!Array.isArray(card.signals) || card.signals.length < 1) {
      errors.push(`${prefix}.signals: must contain at least 1 signal`);
    } else {
      card.signals.forEach((sig, sIdx) => {
        if (!sig.name || typeof sig.name !== 'string') {
          errors.push(`${prefix}.signals[${sIdx}].name: required string`);
        }
        if (!sig.url || !URL_RE.test(sig.url)) {
          errors.push(`${prefix}.signals[${sIdx}].url: must be a valid http(s) URL`);
        }
        if (sig.note !== undefined) {
          checkBilingual(sig.note, `${prefix}.signals[${sIdx}].note`);
        }
      });
    }

    // Date
    if (typeof card.added_at !== 'string' || !DATE_RE.test(card.added_at)) {
      errors.push(`${prefix}.added_at: must match YYYY-MM-DD`);
    }
  });
}

if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} error(s):\n`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.log(`Validation passed! ${totalCards} cards across ${ARENAS.length} arenas verified.`);
