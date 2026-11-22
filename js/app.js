const ARENA_META = [
  { key: 'all', zh: '全部', en: 'All', color: 'var(--text)' },
  { key: 'build', zh: '工具与建造', en: 'Build', color: 'var(--arena-build)' },
  { key: 'business', zh: '商业与变现', en: 'Business', color: 'var(--arena-business)' },
  { key: 'content', zh: '内容与传播', en: 'Content', color: 'var(--arena-content)' },
  { key: 'cognition', zh: '认知与决策', en: 'Cognition', color: 'var(--arena-cognition)' },
  { key: 'career', zh: '职业与成长', en: 'Career', color: 'var(--arena-career)' },
  { key: 'life', zh: '生活与实验', en: 'Life', color: 'var(--arena-life)' },
];

const LENS_META = [
  { key: 'cost-collapse', zh: '成本坍塌', en: '100x Cheaper' },
  { key: 'role-inversion', zh: '角色反转', en: 'Role Inversion' },
  { key: 'invisible-friction', zh: '隐形摩擦', en: 'Invisible Friction' },
  { key: 'first-principles', zh: '第一性重写', en: 'First Principles' },
  { key: 'cross-domain', zh: '跨界迁移', en: 'Cross-Domain' },
];

const I18N = {
  zh: {
    slogan: '打破未知的未知',
    randomBtn: '随机破盲',
    heroTitle: '答案已经廉价，稀缺的是好题目',
    heroSub: '不提供廉价点子列表，只策展高杠杆探索空间、认知盲区与可直接丢给 AI 挖矿的破冰母题。',
    searchPlaceholder: '搜索母题、盲区、中英文标签...',
    resetFilters: '重置',
    lensPrefix: '认知透镜',
    emptyText: '没有找到匹配的破盲卡片，试试放宽筛选条件或来一次随机破盲。',
    trilogyLabel: '个人 AI 探索三部曲',
    trilogyTasks: 'AI 能做什么',
    trilogyPrompt: '怎么让 AI 做',
    trilogyDiscovery: '该去探索什么',
    contributeLink: '提交新破盲卡 ↗',
    shareCard: '分享',
    modalRandom: '再随机',
    kbdSearch: '搜索',
    kbdRandom: '随机破盲',
    kbdNav: '翻卡',
    oldTag: '旧共识',
    shiftTag: '新现实',
    promptsHeading: '破冰母题 · 点击高亮变量可就地填空',
    signalsHeading: '现实弱信号与锚点',
    tagsHeading: '检索标签',
    copyPrompt: '复制提问',
    launchIn: '直达:',
    openChatGPT: 'ChatGPT ↗',
    openClaude: 'Claude ↗',
    openGemini: 'Gemini ↗',
    openPerplexity: 'Perplexity ↗',
    metaFooter: (p, s) => `${p} 条母题 · ${s} 个信号`,
    exploreCta: '展开挖矿 →',
    showingCount: (shown, total) => `${shown} / ${total} 张`,
    copiedToast: '已复制到剪贴板',
    geminiToast: '已复制提问，正在打开 Gemini（直接粘贴即可）',
    linkCopiedToast: '卡片链接已复制',
    varTooltip: '点击替换为你的具体场景',
    loadError: '数据加载失败：请通过本地静态服务器（如 python3 -m http.server）或 GitHub Pages 打开。',
  },
  en: {
    slogan: 'Break Unknown Unknown',
    randomBtn: 'Random Blindspot',
    heroTitle: 'Answers Are Cheap. Good Questions Are Scarce.',
    heroSub: 'Skip disposable idea lists. Explore curated problem spaces, cognitive blindspots, and ready-to-use AI seed prompts.',
    searchPlaceholder: 'Search topics, blindspots, ZH/EN tags...',
    resetFilters: 'Reset',
    lensPrefix: 'Lenses',
    emptyText: 'No matching discovery cards. Try clearing filters or hit Random Blindspot.',
    trilogyLabel: 'Personal AI Exploration Trilogy',
    trilogyTasks: 'What AI can do',
    trilogyPrompt: 'How to instruct AI',
    trilogyDiscovery: 'Where to explore next',
    contributeLink: 'Add a Card ↗',
    shareCard: 'Share',
    modalRandom: 'Shuffle',
    kbdSearch: 'Search',
    kbdRandom: 'Random',
    kbdNav: 'Prev/Next',
    oldTag: 'Old Assumption',
    shiftTag: 'New Shift',
    promptsHeading: 'Seed Prompts · Click highlighted variables to fill inline',
    signalsHeading: 'Live Signals & Anchors',
    tagsHeading: 'Tags',
    copyPrompt: 'Copy Prompt',
    launchIn: 'Open in:',
    openChatGPT: 'ChatGPT ↗',
    openClaude: 'Claude ↗',
    openGemini: 'Gemini ↗',
    openPerplexity: 'Perplexity ↗',
    metaFooter: (p, s) => `${p} prompts · ${s} signals`,
    exploreCta: 'Explore →',
    showingCount: (shown, total) => `${shown} / ${total}`,
    copiedToast: 'Copied to clipboard',
    geminiToast: 'Prompt copied — paste directly in Gemini',
    linkCopiedToast: 'Share link copied',
    varTooltip: 'Click to customize for your context',
    loadError: 'Failed to load data files. Please serve via GitHub Pages or a local static server (e.g. python3 -m http.server).',
  },
};

const state = {
  lang: 'zh',
  arena: 'all',
  lenses: new Set(),
  query: '',
  activeCardId: null,
  cards: [],
};

const el = {
  langToggle: document.getElementById('langToggle'),
  themeToggle: document.getElementById('themeToggle'),
  randomBtn: document.getElementById('randomBtn'),
  searchInput: document.getElementById('searchInput'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),
  arenaTabs: document.getElementById('arenaTabs'),
  lensChips: document.getElementById('lensChips'),
  resultCount: document.getElementById('resultCount'),
  cardGrid: document.getElementById('cardGrid'),
  emptyState: document.getElementById('emptyState'),
  emptyResetBtn: document.getElementById('emptyResetBtn'),
  emptyRandomBtn: document.getElementById('emptyRandomBtn'),
  modalBackdrop: document.getElementById('modalBackdrop'),
  modalBadges: document.getElementById('modalBadges'),
  modalBody: document.getElementById('modalBody'),
  modalPrevBtn: document.getElementById('modalPrevBtn'),
  modalNextBtn: document.getElementById('modalNextBtn'),
  modalRandomBtn: document.getElementById('modalRandomBtn'),
  modalShareBtn: document.getElementById('modalShareBtn'),
  modalCloseBtn: document.getElementById('modalCloseBtn'),
  toast: document.getElementById('toast'),
};

function t(key) {
  return I18N[state.lang][key];
}

function getArenaMeta(key) {
  return ARENA_META.find((a) => a.key === key) || ARENA_META[0];
}

function getLensLabel(key) {
  const item = LENS_META.find((l) => l.key === key);
  return item ? item[state.lang] : key;
}

function showToast(message) {
  el.toast.textContent = message;
  el.toast.classList.remove('hidden');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    el.toast.classList.add('hidden');
  }, 2200);
}

function initTheme() {
  const saved = localStorage.getItem('dt-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('dt-theme', next);
}

function parseUrlState() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  if (lang === 'zh' || lang === 'en') state.lang = lang;

  const arena = params.get('arena');
  if (arena && ARENA_META.some((a) => a.key === arena)) state.arena = arena;

  const lenses = params.get('lens');
  if (lenses) {
    lenses.split(',').forEach((l) => {
      if (LENS_META.some((m) => m.key === l)) state.lenses.add(l);
    });
  }

  const q = params.get('q');
  if (q) {
    state.query = q;
    el.searchInput.value = q;
  }

  const card = params.get('card');
  if (card) state.activeCardId = card;
}

function syncUrlState() {
  const params = new URLSearchParams();
  params.set('lang', state.lang);
  if (state.arena !== 'all') params.set('arena', state.arena);
  if (state.lenses.size > 0) params.set('lens', Array.from(state.lenses).join(','));
  if (state.query.trim()) params.set('q', state.query.trim());
  if (state.activeCardId) params.set('card', state.activeCardId);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, '', newUrl);
}

function applyStaticI18n() {
  document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
  el.langToggle.textContent = state.lang === 'zh' ? 'EN' : '中文';
  el.searchInput.placeholder = t('searchPlaceholder');

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (typeof I18N[state.lang][key] === 'string') {
      node.textContent = I18N[state.lang][key];
    }
  });
}

function getFilteredCards() {
  const q = state.query.trim().toLowerCase();
  return state.cards.filter((card) => {
    if (state.arena !== 'all' && card.arena !== state.arena) return false;
    if (state.lenses.size > 0) {
      for (const lens of state.lenses) {
        if (!card.lenses.includes(lens)) return false;
      }
    }
    if (q) {
      const haystack = [
        card.id,
        card.title.zh,
        card.title.en,
        card.old_assumption.zh,
        card.old_assumption.en,
        card.new_shift.zh,
        card.new_shift.en,
        ...card.tags,
        ...card.seed_prompts.zh,
        ...card.seed_prompts.en,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

function renderFilters() {
  el.arenaTabs.innerHTML = '';
  ARENA_META.forEach((arena) => {
    const count =
      arena.key === 'all'
        ? state.cards.length
        : state.cards.filter((c) => c.arena === arena.key).length;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `arena-tab${state.arena === arena.key ? ' active' : ''}`;
    btn.style.setProperty('--tab-color', arena.color);
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', String(state.arena === arena.key));

    const dotHtml =
      arena.key === 'all'
        ? ''
        : `<span class="arena-dot" style="--dot-color:${arena.color}"></span>`;

    btn.innerHTML = `${dotHtml}<span>${arena[state.lang]}</span><span class="tab-count mono">${count}</span>`;
    btn.addEventListener('click', () => {
      state.arena = arena.key;
      syncUrlState();
      renderAll();
    });
    el.arenaTabs.appendChild(btn);
  });

  el.lensChips.innerHTML = '';
  LENS_META.forEach((lens) => {
    const active = state.lenses.has(lens.key);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `lens-chip${active ? ' active' : ''}`;
    btn.setAttribute('aria-pressed', String(active));
    btn.textContent = lens[state.lang];
    btn.addEventListener('click', () => {
      if (state.lenses.has(lens.key)) {
        state.lenses.delete(lens.key);
      } else {
        state.lenses.add(lens.key);
      }
      syncUrlState();
      renderAll();
    });
    el.lensChips.appendChild(btn);
  });

  const hasFilter =
    state.arena !== 'all' || state.lenses.size > 0 || state.query.trim().length > 0;
  el.resetFiltersBtn.classList.toggle('hidden', !hasFilter);
}

function escapeHtml(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderCards() {
  const filtered = getFilteredCards();
  el.resultCount.textContent = t('showingCount')(filtered.length, state.cards.length);
  el.cardGrid.innerHTML = '';

  if (filtered.length === 0) {
    el.emptyState.classList.remove('hidden');
    return;
  }
  el.emptyState.classList.add('hidden');

  const lang = state.lang;
  filtered.forEach((card, idx) => {
    const arenaMeta = getArenaMeta(card.arena);
    const article = document.createElement('article');
    article.className = 'card';
    article.style.setProperty('--card-arena-color', arenaMeta.color);
    article.tabIndex = 0;

    const lensesText = card.lenses.map((l) => getLensLabel(l)).join(' · ');
    const numStr = String(idx + 1).padStart(2, '0');

    article.innerHTML = `
      <div class="card-meta">
        <span class="arena-pill">
          <span class="arena-dot" style="--dot-color:${arenaMeta.color}"></span>
          ${escapeHtml(arenaMeta[lang])}
        </span>
        <div class="card-right-meta">
          <span class="card-lenses-inline">${escapeHtml(lensesText)}</span>
          <span class="card-index mono">${numStr}</span>
        </div>
      </div>

      <h2 class="card-title">${escapeHtml(card.title[lang])}</h2>

      <div class="contrast-editorial">
        <div class="contrast-row old">
          <span class="contrast-label">✕ ${escapeHtml(t('oldTag'))}</span>
          <span>${escapeHtml(card.old_assumption[lang])}</span>
        </div>
        <div class="contrast-row shift">
          <span class="contrast-label">→ ${escapeHtml(t('shiftTag'))}</span>
          <span>${escapeHtml(card.new_shift[lang])}</span>
        </div>
      </div>

      <div class="card-footer">
        <span class="mono">${escapeHtml(t('metaFooter')(card.seed_prompts[lang].length, card.signals.length))}</span>
        <span class="card-cta">${escapeHtml(t('exploreCta'))}</span>
      </div>
    `;

    article.addEventListener('click', () => openCardModal(card.id));
    article.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCardModal(card.id);
      }
    });

    el.cardGrid.appendChild(article);
  });
}

function buildInteractivePrompt(template) {
  const container = document.createElement('div');
  container.className = 'prompt-card';

  const textWrap = document.createElement('div');
  textWrap.className = 'prompt-text';

  const parts = [];
  const regex = /\[([^\]]+)\]/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(template)) !== null) {
    if (match.index > lastIndex) {
      const staticText = template.slice(lastIndex, match.index);
      textWrap.appendChild(document.createTextNode(staticText));
      parts.push({ type: 'text', value: staticText });
    }

    const placeholder = match[0];
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'var-input';
    input.placeholder = placeholder;
    input.title = t('varTooltip');
    input.setAttribute('aria-label', match[1]);
    input.size = Math.max(8, Math.min(30, placeholder.length + 2));

    input.addEventListener('input', () => {
      const len = (input.value || input.placeholder).length;
      input.size = Math.max(8, Math.min(38, len + 2));
    });

    textWrap.appendChild(input);
    parts.push({ type: 'input', node: input, fallback: placeholder });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < template.length) {
    const tail = template.slice(lastIndex);
    textWrap.appendChild(document.createTextNode(tail));
    parts.push({ type: 'text', value: tail });
  }

  function getResolvedPrompt() {
    return parts
      .map((p) => (p.type === 'text' ? p.value : p.node.value.trim() || p.fallback))
      .join('');
  }

  const actions = document.createElement('div');
  actions.className = 'prompt-actions';

  const copyBtn = document.createElement('button');
  copyBtn.type = 'button';
  copyBtn.className = 'btn btn-accent btn-sm';
  copyBtn.textContent = t('copyPrompt');
  copyBtn.addEventListener('click', async () => {
    await copyText(getResolvedPrompt(), t('copiedToast'));
  });
  actions.appendChild(copyBtn);

  const launchLabel = document.createElement('span');
  launchLabel.className = 'prompt-launch-label';
  launchLabel.textContent = t('launchIn');
  actions.appendChild(launchLabel);

  const launchers = [
    {
      label: t('openChatGPT'),
      run: (q) => window.open(`https://chatgpt.com/?q=${encodeURIComponent(q)}`, '_blank', 'noopener,noreferrer'),
    },
    {
      label: t('openClaude'),
      run: (q) => window.open(`https://claude.ai/new?q=${encodeURIComponent(q)}`, '_blank', 'noopener,noreferrer'),
    },
    {
      label: t('openGemini'),
      run: async (q) => {
        await copyText(q, t('geminiToast'));
        window.open('https://gemini.google.com/app', '_blank', 'noopener,noreferrer');
      },
    },
    {
      label: t('openPerplexity'),
      run: (q) => window.open(`https://www.perplexity.ai/?q=${encodeURIComponent(q)}`, '_blank', 'noopener,noreferrer'),
    },
  ];

  launchers.forEach((launcher) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-ghost btn-sm';
    btn.textContent = launcher.label;
    btn.addEventListener('click', () => launcher.run(getResolvedPrompt()));
    actions.appendChild(btn);
  });

  container.appendChild(textWrap);
  container.appendChild(actions);
  return container;
}

async function copyText(text, toastMsg) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(toastMsg);
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
    showToast(toastMsg);
  }
}

function openCardModal(cardId) {
  const card = state.cards.find((c) => c.id === cardId);
  if (!card) return;

  state.activeCardId = cardId;
  syncUrlState();

  const lang = state.lang;
  const altLang = lang === 'zh' ? 'en' : 'zh';
  const arenaMeta = getArenaMeta(card.arena);

  el.modalBackdrop.style.setProperty('--modal-arena-color', arenaMeta.color);

  el.modalBadges.innerHTML = `
    <span class="arena-pill">
      <span class="arena-dot" style="--dot-color:${arenaMeta.color}"></span>
      ${escapeHtml(arenaMeta[lang])}
    </span>
    ${card.lenses.map((l) => `<span class="badge-lens">${escapeHtml(getLensLabel(l))}</span>`).join('')}
  `;

  el.modalBody.innerHTML = '';

  const titleBlock = document.createElement('div');
  titleBlock.innerHTML = `
    <h2 id="modalTitle" class="modal-title">${escapeHtml(card.title[lang])}</h2>
    <p class="modal-subtitle-alt">${escapeHtml(card.title[altLang])}</p>
  `;
  el.modalBody.appendChild(titleBlock);

  const contrastGrid = document.createElement('div');
  contrastGrid.className = 'modal-contrast-grid';
  contrastGrid.innerHTML = `
    <div class="modal-contrast-card old">
      <div class="contrast-label">✕ ${escapeHtml(t('oldTag'))}</div>
      <div>${escapeHtml(card.old_assumption[lang])}</div>
    </div>
    <div class="modal-contrast-arrow" aria-hidden="true">→</div>
    <div class="modal-contrast-card shift">
      <div class="contrast-label" style="color:${arenaMeta.color}">→ ${escapeHtml(t('shiftTag'))}</div>
      <div>${escapeHtml(card.new_shift[lang])}</div>
    </div>
  `;
  el.modalBody.appendChild(contrastGrid);

  const promptsSection = document.createElement('div');
  const promptsHeading = document.createElement('h3');
  promptsHeading.className = 'section-heading';
  promptsHeading.textContent = t('promptsHeading');
  promptsSection.appendChild(promptsHeading);

  const promptsStack = document.createElement('div');
  promptsStack.className = 'prompts-stack';
  card.seed_prompts[lang].forEach((promptText) => {
    promptsStack.appendChild(buildInteractivePrompt(promptText));
  });
  promptsSection.appendChild(promptsStack);
  el.modalBody.appendChild(promptsSection);

  const signalsSection = document.createElement('div');
  signalsSection.innerHTML = `<h3 class="section-heading">${escapeHtml(t('signalsHeading'))}</h3>`;
  const sigList = document.createElement('div');
  sigList.className = 'signal-list';
  card.signals.forEach((sig) => {
    const a = document.createElement('a');
    a.className = 'signal-item';
    a.href = sig.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    const noteText = sig.note ? sig.note[lang] : '';
    a.innerHTML = `
      <span class="signal-name">${escapeHtml(sig.name)} ↗</span>
      ${noteText ? `<span class="signal-note">${escapeHtml(noteText)}</span>` : ''}
    `;
    sigList.appendChild(a);
  });
  signalsSection.appendChild(sigList);
  el.modalBody.appendChild(signalsSection);

  const tagsSection = document.createElement('div');
  tagsSection.innerHTML = `
    <h3 class="section-heading">${escapeHtml(t('tagsHeading'))}</h3>
    <div class="tag-row">
      ${card.tags.map((tag) => `<span class="tag-pill mono">#${escapeHtml(tag)}</span>`).join('')}
    </div>
  `;
  el.modalBody.appendChild(tagsSection);

  el.modalBackdrop.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCardModal() {
  el.modalBackdrop.classList.add('hidden');
  document.body.style.overflow = '';
  state.activeCardId = null;
  syncUrlState();
}

function navigateModal(delta) {
  if (!state.activeCardId) return;
  const list = getFilteredCards();
  const pool = list.length > 0 ? list : state.cards;
  const idx = pool.findIndex((c) => c.id === state.activeCardId);
  const nextIdx = idx === -1 ? 0 : (idx + delta + pool.length) % pool.length;
  openCardModal(pool[nextIdx].id);
}

function triggerRandomBlindspot() {
  if (state.cards.length === 0) return;
  const pool = state.cards.filter((c) => c.id !== state.activeCardId);
  const pick = (pool.length > 0 ? pool : state.cards)[
    Math.floor(Math.random() * (pool.length > 0 ? pool.length : state.cards.length))
  ];
  openCardModal(pick.id);
}

function resetFilters() {
  state.arena = 'all';
  state.lenses.clear();
  state.query = '';
  el.searchInput.value = '';
  syncUrlState();
  renderAll();
}

function renderAll() {
  applyStaticI18n();
  renderFilters();
  renderCards();
  if (state.activeCardId) {
    openCardModal(state.activeCardId);
  }
}

async function loadData() {
  const arenaKeys = ['build', 'business', 'content', 'cognition', 'career', 'life'];
  const results = await Promise.all(
    arenaKeys.map(async (arena) => {
      const res = await fetch(`./data/${arena}.json`);
      if (!res.ok) throw new Error(`Failed to load data/${arena}.json`);
      return res.json();
    })
  );
  state.cards = results.flat();
}

function isTypingTarget(target) {
  if (!target) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
}

function bindEvents() {
  el.langToggle.addEventListener('click', () => {
    state.lang = state.lang === 'zh' ? 'en' : 'zh';
    syncUrlState();
    renderAll();
  });

  el.themeToggle.addEventListener('click', toggleTheme);
  el.randomBtn.addEventListener('click', triggerRandomBlindspot);
  el.emptyRandomBtn.addEventListener('click', triggerRandomBlindspot);
  el.modalRandomBtn.addEventListener('click', triggerRandomBlindspot);
  el.resetFiltersBtn.addEventListener('click', resetFilters);
  el.emptyResetBtn.addEventListener('click', resetFilters);

  el.searchInput.addEventListener('input', (e) => {
    state.query = e.target.value;
    syncUrlState();
    renderFilters();
    renderCards();
  });

  el.modalPrevBtn.addEventListener('click', () => navigateModal(-1));
  el.modalNextBtn.addEventListener('click', () => navigateModal(1));
  el.modalCloseBtn.addEventListener('click', closeCardModal);
  el.modalBackdrop.addEventListener('click', (e) => {
    if (e.target === el.modalBackdrop) closeCardModal();
  });

  el.modalShareBtn.addEventListener('click', () => {
    copyText(window.location.href, t('linkCopiedToast'));
  });

  // Keyboard-first shortcuts
  document.addEventListener('keydown', (e) => {
    const modalOpen = !el.modalBackdrop.classList.contains('hidden');

    if (e.key === 'Escape') {
      if (modalOpen) {
        closeCardModal();
      } else if (document.activeElement === el.searchInput) {
        el.searchInput.blur();
      }
      return;
    }

    if (isTypingTarget(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === '/' && !modalOpen) {
      e.preventDefault();
      el.searchInput.focus();
      el.searchInput.select();
    } else if (e.key.toLowerCase() === 'r') {
      e.preventDefault();
      triggerRandomBlindspot();
    } else if (modalOpen && e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateModal(-1);
    } else if (modalOpen && e.key === 'ArrowRight') {
      e.preventDefault();
      navigateModal(1);
    }
  });
}

async function bootstrap() {
  initTheme();
  parseUrlState();
  bindEvents();
  applyStaticI18n();

  try {
    await loadData();
    renderAll();
  } catch (err) {
    console.error(err);
    el.cardGrid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">${escapeHtml(t('loadError'))}</div>`;
  }
}

bootstrap();
