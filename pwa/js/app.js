// KidWorksheets PWA — Main Application
// ============================================================
// Fully offline, single-page application
// Depends on: js/data.js (must be loaded first)
// ============================================================
'use strict';

// ══════════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════════
const state = {
  mode: null,
  player: {
    worksheetId: null, worksheet: null,
    questionIndex: 0, answers: [], selectedOption: null,
    checked: false, score: 0, total: 0, startTime: null,
  },
  builder: {
    editId: null, title: '', subject: 'english',
    difficulty: 'easy', description: '', questions: [], addingType: 'MCQ',
  },
};

// ══════════════════════════════════════════════════════════════
// STORAGE
// ══════════════════════════════════════════════════════════════
function getCustomWorksheets() {
  try { return JSON.parse(localStorage.getItem('kw_custom') || '[]'); } catch { return []; }
}
function saveCustomWorksheet(ws) {
  const list = getCustomWorksheets().filter(w => w.id !== ws.id);
  list.unshift(ws);
  localStorage.setItem('kw_custom', JSON.stringify(list));
}
function deleteCustomWorksheet(id) {
  localStorage.setItem('kw_custom', JSON.stringify(getCustomWorksheets().filter(w => w.id !== id)));
}
function getProgress() {
  try { return JSON.parse(localStorage.getItem('kw_progress') || '{}'); } catch { return {}; }
}
function saveProgress(worksheetId, score, total) {
  const p = getProgress();
  p[worksheetId] = { score, total, pct: Math.round((score / total) * 100),
    date: new Date().toISOString(),
    stars: score / total >= 0.8 ? 3 : score / total >= 0.4 ? 2 : 1 };
  localStorage.setItem('kw_progress', JSON.stringify(p));
}
function getWorksheetProgress(id) { return getProgress()[id] || null; }

// ══════════════════════════════════════════════════════════════
// UTILITIES
// ══════════════════════════════════════════════════════════════
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
function setApp(html) {
  document.getElementById('app').innerHTML = html;
  window.scrollTo(0, 0);
}
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function getAllWorksheets() { return [...ALL_WORKSHEETS, ...getCustomWorksheets()]; }
function getWorksheet(id) { return getAllWorksheets().find(w => w.id === id) || null; }
function getWorksheetList(subjectId) { return getAllWorksheets().filter(w => w.subject === subjectId); }
function badge(d) { return `<span class="badge badge-${d}">${d}</span>`; }
function formatTime(s) { const m = Math.floor(s/60); return m > 0 ? `${m}m ${s%60}s` : `${s}s`; }

// ══════════════════════════════════════════════════════════════
// ROUTER
// ══════════════════════════════════════════════════════════════
function navigate(path) { window.location.hash = path; }

function router() {
  const hash = window.location.hash.replace('#','') || '/';
  const seg = hash.split('/').filter(Boolean);
  if (!seg.length) return renderLanding();
  if (seg[0] === 'child') {
    if (!seg[1]) return renderChildHome();
    if (seg[1] === 'subject' && seg[2]) return renderSubjectWorksheets(seg[2]);
    if (seg[1] === 'play' && seg[2]) return renderPlayer(seg[2]);
    if (seg[1] === 'results') return renderResults();
    if (seg[1] === 'trace') return renderTracingPractice(seg[2] || 'english');
    return renderChildHome();
  }
  if (seg[0] === 'mentor') {
    if (!seg[1]) return renderMentorDashboard();
    if (seg[1] === 'subject' && seg[2]) return renderMentorSubject(seg[2]);
    if (seg[1] === 'builder') return renderBuilder(seg[2] || null);
    if (seg[1] === 'print' && seg[2]) return renderPrint(seg[2]);
    return renderMentorDashboard();
  }
  renderLanding();
}

// ══════════════════════════════════════════════════════════════
// SCREEN: LANDING
// ══════════════════════════════════════════════════════════════
function renderLanding() {
  state.mode = null;
  setApp(`
    <div class="landing screen">
      <div class="landing-logo">
        <div class="logo-icon">✏️</div>
        <h1>KidWorksheets</h1>
        <p>"Learning made fun, one worksheet at a time."</p>
      </div>
      <div class="landing-roles">
        <button class="role-card child" onclick="navigate('/child')" id="btn-child-role">
          <span class="role-emoji">🎒</span>
          <h2>I'm a Child</h2>
          <p>Practice worksheets and have fun learning!</p>
          <span class="role-badge child-badge">UKG-C · Term 1</span>
        </button>
        <button class="role-card mentor" onclick="navigate('/mentor')" id="btn-mentor-role">
          <span class="role-emoji">👩‍🏫</span>
          <h2>I'm a Mentor</h2>
          <p>Create worksheets and track progress.</p>
          <span class="role-badge mentor-badge">Mentor Mode</span>
        </button>
      </div>
      <div class="landing-school">
        📍 Vardhman Srikalyan International School &nbsp;·&nbsp; UKG-C &nbsp;·&nbsp; Term 1 &nbsp;·&nbsp; 2026–27
      </div>
    </div>
  `);
}

// ══════════════════════════════════════════════════════════════
// SCREEN: CHILD HOME
// ══════════════════════════════════════════════════════════════
function renderChildHome() {
  state.mode = 'child';
  const progress = getProgress();
  const completed = Object.keys(progress).length;
  const totalSheets = getAllWorksheets().length;
  const totalStars = Object.values(progress).reduce((a, p) => a + (p.stars || 0), 0);

  const subjectCards = Object.values(SUBJECTS).map(sub => {
    const wsList = getWorksheetList(sub.id);
    const doneCount = wsList.filter(ws => progress[ws.id]).length;
    return `
      <button class="subject-card" style="--subject-color:${sub.color};${doneCount===wsList.length && wsList.length>0 ? `border-color:${sub.color}` : ''}"
        onclick="navigate('/child/subject/${sub.id}')" id="sub-${sub.id}">
        <span class="subject-badge" style="background:${sub.color}"></span>
        <span class="subject-emoji">${sub.emoji}</span>
        <div class="subject-name">${sub.name}</div>
        <div class="subject-count">${wsList.length} worksheets${doneCount > 0 ? ` · ${doneCount} done` : ''}</div>
      </button>`;
  }).join('');

  setApp(`
    <div class="child-home child-screen screen">
      <div class="child-home-hero">
        <div class="hero-greeting">Hello, Scholar! 🌟</div>
        <div class="hero-subtitle">Let's get ready for your Term 1 exam!</div>
        <div class="hero-stats">
          <div class="hero-stat"><div class="stat-val">${completed}</div><div class="stat-label">Done</div></div>
          <div class="hero-stat"><div class="stat-val">${totalSheets - completed}</div><div class="stat-label">Left</div></div>
          <div class="hero-stat"><div class="stat-val">⭐ ${totalStars}</div><div class="stat-label">Stars</div></div>
        </div>
      </div>
      <div class="child-home-body">
        <div class="section-title">📖 Choose a Subject</div>
        <div class="subject-grid">${subjectCards}</div>
        <div class="section-title" style="margin-top:28px">✏️ Letter Tracing Practice</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <button class="btn btn-secondary" onclick="navigate('/child/trace/english')" id="btn-trace-eng">📝 English A-Z</button>
          <button class="btn btn-secondary" onclick="navigate('/child/trace/hindi')" id="btn-trace-hindi">📝 Hindi अ-ह</button>
        </div>
      </div>
      <div style="height:24px"></div>
      <button style="position:fixed;top:16px;right:16px;width:44px;height:44px;border-radius:50%;background:rgba(108,99,255,0.15);border:1px solid rgba(108,99,255,0.3);color:#8B84FF;font-size:20px;cursor:pointer;z-index:50" onclick="navigate('/')" id="btn-home-child" title="Home">🏠</button>
    </div>
  `);
}

// ══════════════════════════════════════════════════════════════
// SCREEN: WORKSHEET LIST
// ══════════════════════════════════════════════════════════════
function renderSubjectWorksheets(subjectId) {
  const sub = SUBJECTS[subjectId];
  if (!sub) return navigate('/child');
  const wsList = getWorksheetList(subjectId);
  const progress = getProgress();

  const cards = wsList.map((ws, idx) => {
    const p = progress[ws.id];
    const pct = p ? p.pct : 0;
    const starsHtml = p ? '⭐'.repeat(p.stars) + '<span style="opacity:0.3">⭐</span>'.repeat(3 - p.stars) : '';
    return `
      <button class="worksheet-card${p ? ' completed' : ''}" onclick="startWorksheet('${ws.id}')" id="wsc-${ws.id}">
        <div class="card-num" style="background:${sub.color}">${idx + 1}</div>
        <div class="card-info">
          <div class="card-title">${esc(ws.title)}</div>
          <div class="card-meta">
            ${badge(ws.difficulty)}
            <span>${ws.questions.length} Q</span>
            <span>~${ws.estimatedTime} min</span>
            ${starsHtml ? `<span>${starsHtml}</span>` : ''}
          </div>
        </div>
        <div class="card-arrow">${p ? '✓' : '▶'}</div>
        ${p ? `<div class="progress-indicator" style="width:${pct}%"></div>` : ''}
      </button>`;
  }).join('');

  setApp(`
    <div class="child-screen screen">
      <div class="child-header">
        <button class="back-btn" onclick="navigate('/child')" id="btn-back-sub">◀</button>
        <h1>${sub.emoji} ${sub.name}</h1>
        <div class="subject-dot" style="background:${sub.color}"></div>
      </div>
      <div style="background:${sub.light};padding:10px 16px;font-family:Nunito,sans-serif;font-size:13px;color:#7A7A8A">
        ${esc(sub.description)} &nbsp;·&nbsp; ${wsList.length} worksheets
      </div>
      <div class="worksheet-list-body">
        ${cards || `<div class="empty-state" style="color:var(--light-text-secondary)"><div class="empty-icon">📭</div><h3>No worksheets yet</h3><p>Ask your mentor to add worksheets!</p></div>`}
      </div>
    </div>
  `);
}

// ══════════════════════════════════════════════════════════════
// PLAYER ENGINE
// ══════════════════════════════════════════════════════════════
function startWorksheet(worksheetId) {
  const ws = getWorksheet(worksheetId);
  if (!ws) return;
  state.player = { worksheetId, worksheet: ws, questionIndex: 0, answers: [],
    selectedOption: null, checked: false, score: 0, total: ws.questions.length, startTime: Date.now() };
  navigate(`/child/play/${worksheetId}`);
}

function renderPlayer(worksheetId) {
  if (!state.player.worksheet || state.player.worksheetId !== worksheetId) {
    const ws = getWorksheet(worksheetId);
    if (!ws) return navigate('/child');
    state.player = { worksheetId, worksheet: ws, questionIndex: 0, answers: [],
      selectedOption: null, checked: false, score: 0, total: ws.questions.length, startTime: Date.now() };
  }
  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  const { worksheet, questionIndex, total } = state.player;
  const sub = SUBJECTS[worksheet.subject] || {};
  const question = worksheet.questions[questionIndex];
  const pct = Math.round((questionIndex / total) * 100);
  const isHindi = worksheet.subject === 'hindi';

  let qBody = '';
  const NEW_TYPES = ['MATCH','CIRCLE_FIND','DRAG_SLOT','ARRANGE','SEQUENCE_NEXT','SEQUENCE_PREV','UNSCRAMBLE','WORD_BUILD','WORD_FIRST_LETTER','WORD_LAST_LETTER','AUDIO_CLIP','VOWEL_SORT','TEXT_HIGHLIGHT','PICTURE_WRITE','AUDIO_WRITE','GROUPS_OF_TENS'];
  if (question.type === 'MCQ')                   qBody = renderMCQ(question);
  else if (question.type === 'TRUE_FALSE')        qBody = renderTrueFalse(question);
  else if (question.type === 'FILL_BLANK')        qBody = renderFillBlank(question);
  else if (question.type === 'CATEGORIZE')        qBody = renderCategorize(question);
  else if (question.type === 'MATCH')             qBody = renderMatch(question);
  else if (question.type === 'CIRCLE_FIND')       qBody = renderCircleFind(question);
  else if (question.type === 'DRAG_SLOT')         qBody = renderDragSlot(question);
  else if (question.type === 'ARRANGE')           qBody = renderArrange(question);
  else if (question.type === 'SEQUENCE_NEXT')     qBody = renderSequenceNext(question);
  else if (question.type === 'SEQUENCE_PREV')     qBody = renderSequencePrev(question);
  else if (question.type === 'UNSCRAMBLE')        qBody = renderUnscramble(question);
  else if (question.type === 'WORD_BUILD')        qBody = renderWordBuild(question);
  else if (question.type === 'WORD_FIRST_LETTER') qBody = renderWordFirstLetter(question);
  else if (question.type === 'WORD_LAST_LETTER')  qBody = renderWordLastLetter(question);
  else if (question.type === 'AUDIO_CLIP')        qBody = renderAudioClip(question);
  else if (question.type === 'VOWEL_SORT')        qBody = renderVowelSort(question);
  else if (question.type === 'TEXT_HIGHLIGHT')    qBody = renderTextHighlight(question);
  else if (question.type === 'PICTURE_WRITE')     qBody = renderPictureWrite(question);
  else if (question.type === 'AUDIO_WRITE')       qBody = renderAudioWrite(question);
  else if (question.type === 'GROUPS_OF_TENS')    qBody = renderGroupsOfTens(question);
  else qBody = renderMCQ(question);

  // New types: button starts disabled
  const isNewType = NEW_TYPES.includes(question.type);

  // AUDIO_CLIP text mode + PICTURE_WRITE + AUDIO_WRITE: check always enabled
  const alwaysEnabled = ['PICTURE_WRITE','AUDIO_WRITE','TEXT_HIGHLIGHT','GROUPS_OF_TENS'].includes(question.type)
    || (question.type === 'AUDIO_CLIP' && question.answerType !== 'mcq');
  const checkDisabled = alwaysEnabled ? false
    : isNewType ? true : (question.type !== 'FILL_BLANK' && state.player.selectedOption === null);
  _seqNextBlank = 0;

  setApp(`
    <div class="player-screen${isHindi ? ' hindi-subject' : ''} screen">
      <div class="player-top-bar">
        <div class="player-top-row">
          <div class="player-q-label">Question ${questionIndex + 1} of ${total}</div>
          <button class="player-quit-btn" onclick="confirmQuit()" id="btn-quit">✕</button>
        </div>
        <div class="player-progress-bar">
          <div class="player-progress-fill" style="width:${pct}%"></div>
        </div>
      </div>

      <div class="player-body">
        <div class="question-card" id="q-card">
          <div class="question-type-badge">${question.type.replace('_',' ')}</div>
          <div class="question-text${isHindi ? ' hindi' : ''}">${esc(question.text)}</div>
          ${question.hint ? `<div style="font-size:12px;color:#7A7A8A;margin-top:6px;font-style:italic">💡 ${esc(question.hint)}</div>` : ''}
        </div>

        ${qBody}
        <div id="feedback-area"></div>
      </div>

      <div class="player-actions">
        <button class="btn btn-primary btn-child btn-full" id="btn-check"
          onclick="checkAnswer()" ${checkDisabled ? 'disabled' : ''}>
          Check Answer ✓
        </button>
      </div>
    </div>
  `);

  // Fill blank: wire up input
  if (question.type === 'FILL_BLANK') {
    const inp = $('#fill-input');
    if (inp) {
      inp.addEventListener('input', () => {
        const btn = $('#btn-check');
        if (btn) btn.disabled = !inp.value.trim();
      });
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });
      inp.focus();
      const btn = $('#btn-check');
      if (btn) btn.disabled = true;
    }
  }

  // Categorize: init state
  if (question.type === 'CATEGORIZE') {
    window._catState = {
      items: question.items || [],
      categories: question.categories || [],
      placements: {},
      selectedItem: null,
    };
  }
}

// ── Render MCQ ────────────────────────────────────────────────
function renderMCQ(q) {
  const letters = ['A','B','C','D'];
  return `<div class="mcq-options" id="mcq-options">
    ${q.options.map((opt, i) => `
      <button class="mcq-option" onclick="selectMCQ(this,'${esc(opt)}')" id="opt-${i}" data-val="${esc(opt)}">
        <span class="opt-letter">${letters[i]}</span>${esc(opt)}
      </button>`).join('')}
  </div>`;
}

// ── Render True/False ─────────────────────────────────────────
function renderTrueFalse(q) {
  return `<div class="tf-options" id="tf-options">
    <button class="tf-btn true-btn" onclick="selectTF(this,true)" id="btn-true">
      <span class="tf-btn-icon">✅</span>TRUE
    </button>
    <button class="tf-btn false-btn" onclick="selectTF(this,false)" id="btn-false">
      <span class="tf-btn-icon">❌</span>FALSE
    </button>
  </div>`;
}

// ── Render Fill Blank ─────────────────────────────────────────
function renderFillBlank(q) {
  return `<div class="fill-blank-input-wrap">
    <input type="text" class="fill-blank-input" id="fill-input"
      placeholder="Type your answer here…"
      autocomplete="off" autocorrect="off" spellcheck="false">
    <div class="fill-blank-hint">Type your answer and tap "Check Answer"</div>
  </div>`;
}

// ── Render Categorize ─────────────────────────────────────────
function renderCategorize(q) {
  const items = q.items || [];
  const cats  = q.categories || [];
  const cols  = Math.min(cats.length, 2);
  return `
    <div id="categorize-area">
      <div style="font-size:13px;color:#7A7A8A;margin-bottom:12px;font-family:Nunito,sans-serif">
        Tap an item, then tap a category to place it!
      </div>
      <div id="cat-items" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">
        ${items.map((item, i) => `
          <button class="cat-item-pill" id="cat-item-${i}" onclick="selectCatItem(${i})"
            style="padding:8px 16px;border-radius:999px;border:2px solid #E8DFC8;background:white;
            font-family:Nunito,sans-serif;font-size:15px;font-weight:600;cursor:pointer;transition:all 150ms">
            ${esc(item.label)}
          </button>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:12px">
        ${cats.map((cat, i) => `
          <div id="cat-zone-${i}" onclick="placeToCat(${i})"
            style="min-height:80px;border-radius:16px;border:2px dashed #C4B5FD;
            background:#F0EBFF;padding:12px;cursor:pointer;transition:border-color 150ms">
            <div style="font-size:12px;font-weight:700;color:#6C63FF;text-transform:uppercase;margin-bottom:8px">${esc(cat.label)}</div>
            <div id="cat-zone-items-${i}" style="display:flex;flex-wrap:wrap;gap:4px"></div>
          </div>`).join('')}
      </div>
    </div>`;
}

// ── Categorize interactions ───────────────────────────────────
function selectCatItem(idx) {
  if (!window._catState) return;
  window._catState.selectedItem = idx;
  $$('.cat-item-pill').forEach((b, i) => {
    b.style.borderColor = i === idx ? '#6C63FF' : '#E8DFC8';
    b.style.background  = i === idx ? '#EEF0FF' : 'white';
  });
}

function placeToCat(catIdx) {
  const cs = window._catState;
  if (!cs || cs.selectedItem === null) return;
  const itemIdx = cs.selectedItem;
  cs.placements[itemIdx] = catIdx;
  cs.selectedItem = null;

  const btn = document.getElementById(`cat-item-${itemIdx}`);
  const zone = document.getElementById(`cat-zone-items-${catIdx}`);
  if (btn && zone) {
    const tag = document.createElement('span');
    tag.textContent = cs.items[itemIdx].label;
    tag.style.cssText = 'background:#6C63FF;color:white;padding:4px 10px;border-radius:999px;font-size:13px;font-weight:600';
    zone.appendChild(tag);
    btn.style.display = 'none';
  }
  const allPlaced = cs.items.every((_, i) => cs.placements[i] !== undefined);
  const checkBtn = $('#btn-check');
  if (checkBtn) checkBtn.disabled = !allPlaced;
  if (allPlaced) state.player.selectedOption = 'categorize';
}

// ── Select MCQ ────────────────────────────────────────────────
function selectMCQ(el, value) {
  if (state.player.checked) return;
  state.player.selectedOption = value;
  $$('.mcq-option').forEach(b => b.classList.toggle('selected', b.getAttribute('data-val') === value));
  const btn = $('#btn-check');
  if (btn) btn.disabled = false;
}

// ── Select TF ─────────────────────────────────────────────────
function selectTF(el, value) {
  if (state.player.checked) return;
  state.player.selectedOption = value;
  const tBtn = $('#btn-true'), fBtn = $('#btn-false');
  if (tBtn) tBtn.classList.toggle('selected', value === true);
  if (fBtn) fBtn.classList.toggle('selected', value === false);
  const btn = $('#btn-check');
  if (btn) btn.disabled = false;
}

// ── Check Answer ──────────────────────────────────────────────
function checkAnswer() {
  if (state.player.checked) { nextQuestion(); return; }

  const { worksheet, questionIndex } = state.player;
  const question = worksheet.questions[questionIndex];
  state.player.checked = true;

  let isCorrect = false;
  let givenAnswer = state.player.selectedOption;

  if (question.type === 'FILL_BLANK') {
    const inp = $('#fill-input');
    givenAnswer = inp ? inp.value.trim() : '';
    isCorrect = givenAnswer.toLowerCase() === String(question.answer).toLowerCase();
    if (inp) { inp.disabled = true; inp.className = `fill-blank-input ${isCorrect ? 'correct' : 'wrong'}`; }
  } else if (question.type === 'TRUE_FALSE') {
    isCorrect = givenAnswer === question.answer;
    const tBtn = $('#btn-true'), fBtn = $('#btn-false');
    [tBtn, fBtn].forEach(b => { if (b) b.classList.add('disabled'); });
    if (question.answer === true  && tBtn) tBtn.classList.add('correct');
    if (question.answer === false && fBtn) fBtn.classList.add('correct');
    if (!isCorrect) {
      if (givenAnswer === true  && tBtn) tBtn.classList.add('wrong');
      if (givenAnswer === false && fBtn) fBtn.classList.add('wrong');
    }
  } else if (question.type === 'CATEGORIZE') {
    const cs = window._catState;
    isCorrect = cs ? cs.items.every((item, i) => cs.placements[i] === item.correctCategory) : false;
  } else if (['MATCH','CIRCLE_FIND','DRAG_SLOT','ARRANGE','SEQUENCE_NEXT','SEQUENCE_PREV','UNSCRAMBLE','WORD_BUILD','WORD_FIRST_LETTER','WORD_LAST_LETTER'].includes(question.type)) {
    const result = evaluateNewType(question);
    isCorrect   = result.isCorrect;
    givenAnswer = result.givenAnswer;
  } else if (question.type === 'AUDIO_CLIP') {
    if (question.answerType === 'mcq') {
      isCorrect   = givenAnswer?.toLowerCase() === String(question.answer).toLowerCase();
      document.querySelectorAll('[id^="aopt-"]').forEach(b => {
        const v = b.getAttribute('data-val') || '';
        b.classList.add('disabled');
        if (v.toLowerCase() === question.answer?.toLowerCase()) b.classList.add('reveal-correct');
        if (v === givenAnswer && !isCorrect) b.classList.add('wrong');
      });
    } else {
      // Written canvas — always mark as attempted/correct (open-ended)
      isCorrect   = true; givenAnswer = 'written';
    }
  } else if (question.type === 'VOWEL_SORT') {
    const vs = window._vsState;
    if (vs?.mode === 'single') {
      const circled = [...(vs.circled || new Set())].map(i => vs.words[i]);
      const correct = vs.correct || new Set();
      const correctArr = [...correct];
      isCorrect = circled.length === correctArr.length &&
        circled.every(w => correct.has(w));
      givenAnswer = circled.join(', ');
      document.querySelectorAll('.vs-word-btn').forEach((b,i) => {
        const w = vs.words[i]; b.classList.add('disabled');
        if (correct.has(w)) b.classList.add('matched-correct');
        else if (vs.circled.has(i)) b.classList.add('matched-wrong');
      });
    } else {
      const placed = vs?.placed || {};
      const binMap = vs?.binMap || {};
      const allCorrect = Object.entries(placed).every(([w,v]) => binMap[w] === v);
      isCorrect   = allCorrect && Object.keys(placed).length === (vs?.words||[]).length;
      givenAnswer = JSON.stringify(placed);
    }
  } else if (question.type === 'TEXT_HIGHLIGHT') {
    const ths = window._thState;
    if (ths) {
      const highlighted = [...ths.highlighted];
      const correct     = ths.correctWords.map(w => w.toLowerCase());
      isCorrect = highlighted.length === correct.length &&
        highlighted.every(w => correct.includes(w.toLowerCase()));
      givenAnswer = highlighted.join(', ');
      document.querySelectorAll('.th-word').forEach(b => {
        b.classList.add('disabled');
        const w = b.textContent.toLowerCase().replace(/[^a-z\u0900-\u097f]/g,'');
        if (correct.includes(w)) b.classList.add('matched-correct');
        else if (b.classList.contains('highlighted')) b.classList.add('matched-wrong');
      });
    }
  } else if (question.type === 'PICTURE_WRITE') {
    const inp = document.getElementById('pw-input');
    givenAnswer = inp ? inp.value.trim() : '';
    const expected = (question.expectedAnswers || [String(question.answer||'')]).map(a => a.toLowerCase());
    isCorrect = expected.includes(givenAnswer.toLowerCase()) || givenAnswer.length > 0;
    if (inp) { inp.disabled = true; }
  } else if (question.type === 'AUDIO_WRITE') {
    const inp = document.getElementById('aw-input');
    givenAnswer = inp ? inp.value.trim() : '';
    isCorrect = givenAnswer.toLowerCase() === String(question.expectedAnswer || question.answer || '').toLowerCase();
    if (inp) { inp.disabled = true; inp.className = `fill-blank-input ${isCorrect?'correct':'wrong'}`; }
  } else if (question.type === 'GROUPS_OF_TENS') {
    const inp = document.getElementById('got-input');
    givenAnswer = inp ? inp.value.trim() : '';
    isCorrect = givenAnswer === String(question.answer);
    if (inp) { inp.disabled = true; inp.className = `fill-blank-input ${isCorrect?'correct':'wrong'}`; }
  } else {
    // MCQ
    isCorrect = givenAnswer === question.answer;
    $$('.mcq-option').forEach(b => {
      const v = b.getAttribute('data-val');
      b.classList.add('disabled');
      if (v === question.answer) b.classList.add('reveal-correct');
      if (v === givenAnswer && !isCorrect) b.classList.add('wrong');
      if (v === givenAnswer && isCorrect)  b.classList.add('correct');
    });
  }

  state.player.answers.push({ questionId: question.id, given: givenAnswer, correct: isCorrect });
  if (isCorrect) state.player.score++;

  // Feedback banner
  const fa = $('#feedback-area');
  if (fa) {
    fa.innerHTML = `
      <div class="feedback-banner ${isCorrect ? 'correct' : 'wrong'}">
        <span class="feedback-icon">${isCorrect ? '🎉' : '💡'}</span>
        ${isCorrect
          ? `<span>Excellent! That's correct!</span>`
          : `<span>Correct answer: <strong>${esc(String(question.answer))}</strong></span>`}
      </div>`;
  }

  // Update button
  const checkBtn = $('#btn-check');
  if (checkBtn) {
    const isLast = questionIndex >= state.player.total - 1;
    checkBtn.textContent = isLast ? 'See Results 🎉' : 'Next Question →';
    checkBtn.disabled = false;
    checkBtn.className = `btn ${isCorrect ? 'btn-accent' : 'btn-primary'} btn-child btn-full`;
  }
}

function nextQuestion() {
  const { questionIndex, total } = state.player;
  if (questionIndex >= total - 1) { endWorksheet(); return; }
  state.player.questionIndex++;
  state.player.selectedOption = null;
  state.player.checked = false;
  renderCurrentQuestion();
}

function endWorksheet() {
  saveProgress(state.player.worksheetId, state.player.score, state.player.total);
  navigate('/child/results');
}

function confirmQuit() {
  if (confirm('Quit this worksheet? Your progress will not be saved.')) navigate('/child');
}

// ══════════════════════════════════════════════════════════════
// SCREEN: RESULTS
// ══════════════════════════════════════════════════════════════
function renderResults() {
  const { worksheet, score, total, startTime } = state.player;
  if (!worksheet) return navigate('/child');
  const pct   = Math.round((score / total) * 100);
  const stars  = pct >= 80 ? 3 : pct >= 40 ? 2 : 1;
  const wrong  = total - score;
  const taken  = Math.round((Date.now() - startTime) / 1000);
  const sub    = SUBJECTS[worksheet.subject] || {};
  const msgs   = { 3:'🌟 Outstanding!', 2:'👍 Good Job!', 1:'💪 Keep Trying!' };

  setApp(`
    <div class="results-screen screen">
      <div id="confetti-wrap" class="confetti-container"></div>
      <div class="results-card">
        <div class="results-stars" id="r-stars">
          ${[1,2,3].map(i => `<span class="result-star" id="rs-${i}">⭐</span>`).join('')}
        </div>
        <div class="results-score">${score}<span> / ${total}</span></div>
        <div class="results-pct">${pct}%</div>
        <div class="results-title">${msgs[stars]}</div>
        <div class="results-breakdown">
          <div class="breakdown-item"><div class="breakdown-val" style="color:#43D9A2">${score}</div><div class="breakdown-label">Correct</div></div>
          <div class="breakdown-item"><div class="breakdown-val" style="color:#FF5C5C">${wrong}</div><div class="breakdown-label">Wrong</div></div>
          <div class="breakdown-item"><div class="breakdown-val" style="color:#FFB74D">${formatTime(taken)}</div><div class="breakdown-label">Time</div></div>
        </div>
        <div class="results-actions">
          <button class="btn btn-results-primary btn-child btn-full" onclick="startWorksheet('${worksheet.id}')" id="btn-retry">🔄 Try Again</button>
          <button class="btn btn-results-secondary btn-child btn-full" onclick="navigate('/child/subject/${worksheet.subject}')" id="btn-more">← More ${esc(sub.name)}</button>
          <button class="btn btn-results-secondary btn-child btn-full" onclick="navigate('/child')" id="btn-home-r">🏠 Home</button>
        </div>
      </div>
    </div>
  `);

  // Animate stars
  [1,2,3].forEach(i => setTimeout(() => {
    const s = document.getElementById(`rs-${i}`);
    if (s) s.classList.add(i <= stars ? 'earned' : 'unearned');
  }, i * 300));

  if (stars >= 2) setTimeout(spawnConfetti, 400);
}

// ── Confetti ──────────────────────────────────────────────────
function spawnConfetti() {
  const wrap = document.getElementById('confetti-wrap');
  if (!wrap) return;
  const cols = ['#6C63FF','#FF8C42','#43D9A2','#FFD93D','#FF6B6B','#4ECDC4','#F9A8D4'];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.cssText = `left:${Math.random()*100}%;width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;
        background:${cols[Math.floor(Math.random()*cols.length)]};border-radius:${Math.random()>.5?'50%':'2px'};
        animation-duration:${1.5+Math.random()*2}s;animation-delay:${Math.random()*.5}s`;
      wrap.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }, i * 20);
  }
}

// ══════════════════════════════════════════════════════════════
// SCREEN: LETTER TRACING PRACTICE
// ══════════════════════════════════════════════════════════════
const ENG_LETTERS   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const HINDI_LETTERS = ['अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ','क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह'];

// ── Tracing state ─────────────────────────────────────────────
let _tLang      = 'english';
let _tLetters   = ENG_LETTERS;
let _tIdx       = 0;
let _tSheet     = '4-line';   // '4-line' | '3-line' | '2-line' | 'grid' | 'blank'
let _tMode      = 'finger';   // 'finger' | 'pen'
let _tColor     = '#6C63FF';
let _tStrokeW   = 5;
let _tErasing   = false;
let _tTolMap    = null;       // Uint8Array tolerance zone
let _tTolW      = 0;
let _tTolH      = 0;
let _tTotal     = 0;
let _tInBound   = 0;
let _tLastWarn  = 0;
let _mediaRecorder = null;
let _recordedChunks = [];
let _isRecording   = false;

// ── Sheet configs ─────────────────────────────────────────────
const SHEETS = [
  { id:'4-line', label:'📄 4-Line', title:'4-Line (English)' },
  { id:'3-line', label:'📄 3-Line', title:'3-Line (Hindi)' },
  { id:'2-line', label:'📄 2-Line', title:'2-Line (Mātrā)' },
  { id:'grid',   label:'🔲 Grid',   title:'Grid (Maths)' },
  { id:'blank',  label:'🎨 Blank',  title:'Blank Canvas' },
];
const DRAW_COLORS = ['#6C63FF','#FF5C5C','#43D9A2','#FF8C42','#FFD93D','#2D2D3A'];

// ── Render tracing practice screen ───────────────────────────
function renderTracingPractice(lang) {
  _tLang    = lang;
  _tLetters = lang === 'hindi' ? HINDI_LETTERS : ENG_LETTERS;
  _tIdx     = 0;
  _tTotal   = 0; _tInBound = 0;
  const fontFam = lang === 'hindi' ? 'Hind' : 'Nunito';
  const fs      = lang === 'hindi' ? '16' : '19';

  const letterBtns = _tLetters.map((l, i) => `
    <button class="letter-tile-btn" onclick="loadLetter(${i})" id="lb-${i}"
      style="font-family:${fontFam},sans-serif;font-size:${fs}px">${l}</button>`).join('');

  const sheetPills = SHEETS.map(s => `
    <button class="sheet-pill ${_tSheet === s.id ? 'active' : ''}"
      onclick="setSheetType('${s.id}')" id="sp-${s.id}">${s.label}</button>`).join('');

  const colorSwatches = DRAW_COLORS.map((c, i) => `
    <div class="color-swatch ${c === _tColor ? 'active' : ''}"
      style="background:${c}" onclick="setDrawColor('${c}')" id="sw-${i}" title="${c}"></div>`).join('');

  setApp(`
    <div class="tracing-screen screen">

      <!-- Top bar -->
      <div class="tracing-top-bar">
        <button class="back-btn" onclick="navigate('/child')" id="btn-back-trace">◀</button>
        <h1>✏️ Letter Tracing — ${lang === 'hindi' ? 'Hindi' : 'English'}</h1>
      </div>

      <!-- Controls panel -->
      <div class="tracing-controls-panel">
        <div class="trace-ctrl-row">
          <span class="trace-ctrl-label">Sheet</span>
          <div class="sheet-type-pills">${sheetPills}</div>
        </div>
        <div class="trace-ctrl-row">
          <span class="trace-ctrl-label">Input</span>
          <div class="input-mode-toggle">
            <button class="mode-btn ${_tMode==='finger'?'active':''}" onclick="setInputMode('finger')" id="mode-finger">🖐 Finger</button>
            <button class="mode-btn ${_tMode==='pen'?'active':''}"    onclick="setInputMode('pen')"    id="mode-pen">🖊 Pen</button>
          </div>
        </div>
      </div>

      <!-- Letter grid -->
      <div class="letter-grid-wrap">
        <label>Tap a Letter to Trace</label>
        <div class="letter-tile-grid">${letterBtns}</div>
      </div>

      <!-- Canvas area (hidden until letter selected) -->
      <div id="trace-canvas-wrap" class="trace-canvas-wrap" style="display:none">
        <div class="canvas-top-row">
          <div class="canvas-left-row">
            <div class="canvas-letter-label" id="trace-label"></div>
            <div class="recording-indicator" id="recording-indicator">
              <div class="rec-dot"></div> REC
            </div>
          </div>
          <div class="canvas-actions">
            <button class="btn-record" onclick="toggleRecording()" id="btn-record">🎥 Record</button>
            <button class="btn-clear-trace" onclick="clearCanvas()" id="btn-clear">🗑 Clear</button>
            <button class="btn-done-trace"  onclick="doneTracing()" id="btn-done">✓ Done</button>
            <button class="btn-next-trace"  onclick="nextTraceLetter()" id="btn-next">Next →</button>
          </div>
        </div>

        <div class="canvas-box" id="canvas-box">
          <canvas id="trace-canvas" style="height:260px"></canvas>
        </div>
        <div class="canvas-hint" id="canvas-hint">✏️ Use your finger or stylus to trace the dotted letter</div>

        <!-- Blank canvas tools (only shown in blank mode) -->
        <div id="blank-tools" style="display:none">
          <div class="canvas-tools">
            ${colorSwatches}
            <div class="tool-divider"></div>
            <button class="stroke-btn active" onclick="setStrokeWidth(3,'thin')"   id="sw-thin">Thin</button>
            <button class="stroke-btn"        onclick="setStrokeWidth(6,'med')"    id="sw-med">Med</button>
            <button class="stroke-btn"        onclick="setStrokeWidth(12,'thick')" id="sw-thick">Thick</button>
            <div class="tool-divider"></div>
            <button class="eraser-btn" onclick="toggleEraser()" id="btn-eraser">⬜ Eraser</button>
          </div>
        </div>

        <!-- Accuracy bar -->
        <div class="accuracy-bar-wrap" id="accuracy-wrap">
          <div class="accuracy-label">
            <span>Tracing Accuracy</span>
            <span class="accuracy-pct" id="accuracy-pct">—</span>
          </div>
          <div class="accuracy-bar">
            <div class="accuracy-bar-fill" id="accuracy-fill" style="width:0%"></div>
          </div>
        </div>
      </div>

      <!-- Stylus toast -->
      <div class="stylus-toast" id="stylus-toast">✏️ Stylus detected! Switched to Pen mode</div>
    </div>
  `);
}

function setSheetType(type) {
  _tSheet = type;
  document.querySelectorAll('.sheet-pill').forEach(b => b.classList.toggle('active', b.id === `sp-${type}`));
  const blank = document.getElementById('blank-tools');
  if (blank) blank.style.display = type === 'blank' ? 'block' : 'none';
  if (_tLetters[_tIdx]) initTraceCanvas();
}

function setInputMode(mode) {
  _tMode = mode;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b.id === `mode-${mode}`));
  _tStrokeW = mode === 'pen' ? 3 : 5;
  if (_tLetters[_tIdx]) initTraceCanvas();
}

function setDrawColor(color) {
  _tColor   = color;
  _tErasing = false;
  const eb = document.getElementById('btn-eraser'); if (eb) eb.classList.remove('active');
  document.querySelectorAll('.color-swatch').forEach(el => el.classList.toggle('active', el.style.background === color || el.getAttribute('style') === `background:${color}`));
}

function setStrokeWidth(w, id) {
  _tStrokeW = w;
  document.querySelectorAll('.stroke-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`sw-${id}`); if (btn) btn.classList.add('active');
}

function toggleEraser() {
  _tErasing = !_tErasing;
  const btn = document.getElementById('btn-eraser');
  if (btn) btn.classList.toggle('active', _tErasing);
}

function loadLetter(idx) {
  _tIdx   = idx;
  _tTotal = 0; _tInBound = 0;
  const wrap = document.getElementById('trace-canvas-wrap');
  if (wrap) wrap.style.display = 'block';
  const label = document.getElementById('trace-label');
  if (label) label.textContent = `Tracing: "${_tLetters[_tIdx]}"`;
  // Highlight selected letter tile
  document.querySelectorAll('.letter-tile-btn').forEach((b, i) => b.classList.toggle('selected', i === idx));
  // Blank canvas tools
  const blank = document.getElementById('blank-tools');
  if (blank) blank.style.display = _tSheet === 'blank' ? 'block' : 'none';
  initTraceCanvas();
}

function nextTraceLetter() {
  _tIdx   = (_tIdx + 1) % _tLetters.length;
  _tTotal = 0; _tInBound = 0;
  const label = document.getElementById('trace-label');
  if (label) label.textContent = `Tracing: "${_tLetters[_tIdx]}"`;
  document.querySelectorAll('.letter-tile-btn').forEach((b, i) => b.classList.toggle('selected', i === _tIdx));
  initTraceCanvas();
}

// ── Draw sheet lines ──────────────────────────────────────────
function drawSheetLines(ctx, W, H) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#FEFCF7';
  ctx.fillRect(0, 0, W, H);

  if (_tSheet === '4-line') {
    // headline 20%, waistline 50%, baseline 75%, footline 95%
    const lines = [
      { y: H * 0.20, solid: true,  color: '#6CB4F5', width: 1.5 },
      { y: H * 0.50, solid: false, color: '#6CB4F5', width: 1 },
      { y: H * 0.75, solid: true,  color: '#6CB4F5', width: 1.5 },
      { y: H * 0.95, solid: false, color: '#6CB4F5', width: 1 },
    ];
    lines.forEach(l => {
      ctx.strokeStyle = l.color; ctx.lineWidth = l.width;
      ctx.setLineDash(l.solid ? [] : [5, 4]);
      ctx.beginPath(); ctx.moveTo(0, l.y); ctx.lineTo(W, l.y); ctx.stroke();
    });
    ctx.setLineDash([]);
  } else if (_tSheet === '3-line') {
    // headline (shirorékha) 15%, middle guide dashed 55%, base 80%
    const lines = [
      { y: H * 0.15, solid: true,  color: '#D32F2F', width: 2 },   // शिरोरेखा — red
      { y: H * 0.55, solid: false, color: '#BDBDBD', width: 1 },   // middle guide — gray dash
      { y: H * 0.80, solid: true,  color: '#D32F2F', width: 1.5 }, // baseline — red
    ];
    lines.forEach(l => {
      ctx.strokeStyle = l.color; ctx.lineWidth = l.width;
      ctx.setLineDash(l.solid ? [] : [4, 5]);
      ctx.beginPath(); ctx.moveTo(0, l.y); ctx.lineTo(W, l.y); ctx.stroke();
    });
    ctx.setLineDash([]);
  } else if (_tSheet === '2-line') {
    // Two red solid lines
    [H * 0.25, H * 0.78].forEach(y => {
      ctx.strokeStyle = '#D32F2F'; ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    });
  } else if (_tSheet === 'grid') {
    const cell = 40;
    ctx.strokeStyle = '#B0BEC5'; ctx.lineWidth = 0.75; ctx.setLineDash([]);
    for (let x = 0; x <= W; x += cell) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y <= H; y += cell) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  } else {
    // blank — clean white, already filled
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, W, H);
  }
}

// ── Draw letter guide at correct position for sheet ───────────
function drawLetterGuide(ctx, letter, W, H) {
  if (_tSheet === 'blank') return; // no guide on blank canvas
  const isHindi = _tLang === 'hindi';
  const fontFam = isHindi ? 'Hind' : 'Nunito';

  // Determine vertical center for each sheet type
  let cy;
  if (_tSheet === '4-line')      cy = H * 0.475; // between waistline and baseline
  else if (_tSheet === '3-line') cy = H * 0.475; // between shirorékha and base
  else if (_tSheet === '2-line') cy = H * 0.52;
  else if (_tSheet === 'grid')   cy = H * 0.5;
  else                           cy = H * 0.5;

  // Font size scales to fit writing zone height
  let zoneH;
  if (_tSheet === '4-line')      zoneH = H * 0.55;
  else if (_tSheet === '3-line') zoneH = H * 0.65;
  else if (_tSheet === '2-line') zoneH = H * 0.53;
  else if (_tSheet === 'grid')   zoneH = Math.min(H * 0.6, 80);
  else                           zoneH = H * 0.7;

  const fs = Math.min(W * 0.45, zoneH * 1.1, 160);

  ctx.font = `bold ${fs}px '${fontFam}', sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

  // Dotted guide stroke
  ctx.save();
  ctx.setLineDash([5, 7]);
  ctx.strokeStyle = '#C4B5FD'; ctx.lineWidth = 5;
  ctx.strokeText(letter, W / 2, cy);
  ctx.restore();

  // Faint fill
  ctx.fillStyle = 'rgba(196,181,253,0.2)';
  ctx.fillText(letter, W / 2, cy);

  // Start-here hint
  ctx.fillStyle = '#FF8C42';
  ctx.font = 'bold 12px Nunito, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('▶ Start here', 10, 18);
}

// ── Build BFS tolerance map ───────────────────────────────────
// Returns null for blank canvas (no boundary checking)
function buildToleranceMap(letter, W, H) {
  if (_tSheet === 'blank') { _tTolMap = null; return; }

  const isHindi  = _tLang === 'hindi';
  const fontFam  = isHindi ? 'Hind' : 'Nunito';
  const tolerance = _tMode === 'pen' ? 20 : 28;

  // Offscreen canvas — draw letter solid black, no background
  const oc  = document.createElement('canvas');
  oc.width  = W; oc.height = H;
  const oct = oc.getContext('2d');

  // Determine cy (same logic as drawLetterGuide)
  let cy;
  if (_tSheet === '4-line')      cy = H * 0.475;
  else if (_tSheet === '3-line') cy = H * 0.475;
  else if (_tSheet === '2-line') cy = H * 0.52;
  else if (_tSheet === 'grid')   cy = H * 0.5;
  else                           cy = H * 0.5;

  let zoneH;
  if (_tSheet === '4-line')      zoneH = H * 0.55;
  else if (_tSheet === '3-line') zoneH = H * 0.65;
  else if (_tSheet === '2-line') zoneH = H * 0.53;
  else if (_tSheet === 'grid')   zoneH = Math.min(H * 0.6, 80);
  else                           zoneH = H * 0.7;

  const fs = Math.min(W * 0.45, zoneH * 1.1, 160);

  oct.font = `bold ${fs}px '${fontFam}', sans-serif`;
  oct.textAlign = 'center'; oct.textBaseline = 'middle';
  oct.fillStyle = '#000000';
  oct.fillText(letter, W / 2, cy);
  // Stroke too — gives extra thickness for tracing zone
  oct.strokeStyle = '#000000'; oct.lineWidth = tolerance * 0.4; oct.setLineDash([]);
  oct.strokeText(letter, W / 2, cy);

  const imgData = oct.getImageData(0, 0, W, H).data;

  // Mark letter pixels
  const src = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) {
    if (imgData[i * 4 + 3] > 20) src[i] = 1;
  }

  // BFS dilation from all letter pixels
  const dist = new Int16Array(W * H).fill(32767);
  const queue = [];
  for (let i = 0; i < W * H; i++) {
    if (src[i]) { dist[i] = 0; queue.push(i); }
  }

  let head = 0;
  const dirs = [-W, W, -1, 1];
  while (head < queue.length) {
    const idx = queue[head++];
    const d   = dist[idx] + 1;
    if (d > tolerance) continue;
    const y   = Math.floor(idx / W);
    const x   = idx % W;
    if (y > 0       && dist[idx - W] > d) { dist[idx - W] = d; queue.push(idx - W); }
    if (y < H - 1   && dist[idx + W] > d) { dist[idx + W] = d; queue.push(idx + W); }
    if (x > 0       && dist[idx - 1] > d) { dist[idx - 1] = d; queue.push(idx - 1); }
    if (x < W - 1   && dist[idx + 1] > d) { dist[idx + 1] = d; queue.push(idx + 1); }
  }

  const map = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) map[i] = dist[i] <= tolerance ? 1 : 0;

  _tTolMap = map; _tTolW = W; _tTolH = H;
}

function isInTolerance(x, y) {
  if (!_tTolMap) return true; // blank canvas = always ok
  const xi = Math.round(Math.max(0, Math.min(_tTolW - 1, x)));
  const yi = Math.round(Math.max(0, Math.min(_tTolH - 1, y)));
  return _tTolMap[yi * _tTolW + xi] === 1;
}

// ── Main canvas init ─────────────────────────────────────────
function initTraceCanvas() {
  const canvas = document.getElementById('trace-canvas');
  if (!canvas) return;

  const letter  = _tLetters[_tIdx] || 'A';
  const W       = Math.max(canvas.clientWidth || 480, 200);
  const H       = 260;
  canvas.width  = W; canvas.height = H;
  canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d');

  // Draw sheet + guide
  drawSheetLines(ctx, W, H);
  drawLetterGuide(ctx, letter, W, H);

  // Build tolerance map (async-ish — uses DOM offscreen canvas)
  setTimeout(() => buildToleranceMap(letter, W, H), 0);

  // Reset accuracy
  _tTotal = 0; _tInBound = 0;
  const aw = document.getElementById('accuracy-wrap');
  if (aw) aw.classList.remove('visible');
  updateAccuracyDisplay();

  // Replace canvas to clear listeners
  const fresh = canvas.cloneNode(false);
  fresh.id = 'trace-canvas'; fresh.width = W; fresh.height = H;
  fresh.style.cssText = canvas.style.cssText;
  canvas.parentNode.replaceChild(fresh, canvas);
  const fc  = fresh;
  const fct = fc.getContext('2d');
  drawSheetLines(fct, W, H);
  drawLetterGuide(fct, letter, W, H);

  // ── Drawing state ────────────────────────────────────────────
  let drawing = false, lx = 0, ly = 0;
  let lastStylusCheck = false;

  function getPos(e) {
    const r  = fc.getBoundingClientRect();
    const sx = W / r.width, sy = H / r.height;
    if (e.touches) {
      return { x:(e.touches[0].clientX-r.left)*sx, y:(e.touches[0].clientY-r.top)*sy, pressure:1 };
    }
    return { x:(e.clientX-r.left)*sx, y:(e.clientY-r.top)*sy, pressure: e.pressure || 1 };
  }

  function drawStroke(x, y, pressure) {
    const inBounds = _tSheet === 'blank' || isInTolerance(x, y);
    _tTotal++;
    if (inBounds) _tInBound++;

    if (!inBounds && !_tErasing) {
      // HARD BLOCK — do NOT draw outside the letter boundary
      const now = Date.now();
      if (now - _tLastWarn > 800) {
        _tLastWarn = now;
        showToast("Stay inside the letter! 😊", '');
        const box = document.getElementById('canvas-box');
        if (box) {
          box.classList.remove('flash-boundary');
          void box.offsetWidth;
          box.classList.add('flash-boundary');
        }
      }
      lx = x; ly = y; // advance position so no jump when re-entering
      return; // ← hard stop, nothing drawn
    }

    // Inside boundary (or eraser) — draw with green to show progress
    let strokeColor, strokeW;
    if (_tErasing) {
      strokeColor = '#FEFCF7';
      strokeW     = 24;
    } else {
      strokeColor = '#22C55E'; // always green inside boundary
      strokeW     = _tMode === 'pen' ? Math.max(2, _tStrokeW * pressure) : _tStrokeW;
    }

    fct.beginPath(); fct.moveTo(lx, ly); fct.lineTo(x, y);
    fct.strokeStyle = strokeColor; fct.lineWidth = strokeW;
    fct.lineCap = 'round'; fct.lineJoin = 'round'; fct.stroke();
    lx = x; ly = y;

    if (_tTotal > 10) updateAccuracyDisplay();
  }

  // ── Pointer Events (handles mouse, touch, stylus uniformly) ──
  fc.addEventListener('pointerdown', e => {
    e.preventDefault();
    fc.setPointerCapture(e.pointerId);
    drawing = true;
    const p = getPos(e); lx = p.x; ly = p.y;
    // Auto-detect stylus
    if (e.pointerType === 'pen' && !lastStylusCheck) {
      lastStylusCheck = true;
      _tMode = 'pen'; _tStrokeW = 3;
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b.id === 'mode-pen'));
      const toast = document.getElementById('stylus-toast');
      if (toast) { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2500); }
    }
  }, { passive: false });

  fc.addEventListener('pointermove', e => {
    if (!drawing) return; e.preventDefault();
    const p = getPos(e); drawStroke(p.x, p.y, e.pressure || 1);
  }, { passive: false });

  fc.addEventListener('pointerup',    () => drawing = false);
  fc.addEventListener('pointercancel',() => drawing = false);
  fc.addEventListener('pointerleave', () => drawing = false);
}

// ── Accuracy display ─────────────────────────────────────────
function updateAccuracyDisplay() {
  const pct    = _tTotal > 0 ? Math.round((_tInBound / _tTotal) * 100) : 0;
  const fill   = document.getElementById('accuracy-fill');
  const pctEl  = document.getElementById('accuracy-pct');
  const wrap   = document.getElementById('accuracy-wrap');
  if (fill)  fill.style.width  = pct + '%';
  if (pctEl) pctEl.textContent = _tTotal > 0 ? `${pct}% ${ pct >= 80 ? '⭐' : pct >= 50 ? '👍' : '💪'}` : '—';
  if (wrap && _tTotal > 0) wrap.classList.add('visible');
}

function clearCanvas() {
  closePerfectionOverlay();
  _tTotal = 0; _tInBound = 0;
  updateAccuracyDisplay();
  initTraceCanvas();
}

// ── Done — evaluate tracing and celebrate! ────────────────────
function doneTracing() {
  if (_tTotal < 5) {
    showToast('Trace the letter first! ✏️', '');
    return;
  }
  // Stop any live recording
  if (_isRecording) stopRecording();

  const pct = Math.round((_tInBound / _tTotal) * 100);

  // Save per-step report
  saveTracingReport(_tLetters[_tIdx] || '?', _tLang, _tSheet, pct);

  if (pct >= 95)      spawnPerfectionBlast('perfect', pct);
  else if (pct >= 80) spawnPerfectionBlast('great',   pct);
  else if (pct >= 50) spawnPerfectionBlast('good',    pct);
  else                spawnPerfectionBlast('tryagain', pct);
}

// ── Save tracing step report ──────────────────────────────────
function saveTracingReport(letter, lang, sheet, accuracy) {
  try {
    const key = 'kw_trace_reports';
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.unshift({
      letter, lang, sheet, accuracy,
      mode:      _tMode,
      timestamp: new Date().toISOString(),
      date:      new Date().toLocaleDateString('en-IN'),
    });
    if (list.length > 500) list.splice(500); // cap at 500 records
    localStorage.setItem(key, JSON.stringify(list));
  } catch (_) { /* storage full — silently ignore */ }
}

// ── Perfection Blast ──────────────────────────────────────────
function spawnPerfectionBlast(level, pct) {
  const box = document.getElementById('canvas-box');
  if (!box) return;

  // Remove any existing overlay first
  closePerfectionOverlay();

  const cfg = {
    perfect:  { emoji:'🌟', text:'PERFECT TRACING!',  sub:`${pct}% accuracy! You're amazing! 🎊`,   stars:3, color:'#FFD700' },
    great:    { emoji:'🎉', text:'GREAT JOB!',         sub:`${pct}% accuracy! Excellent work!`,       stars:3, color:'#43D9A2' },
    good:     { emoji:'👍', text:'GOOD EFFORT!',       sub:`${pct}% — Keep practising, you can do it!`, stars:2, color:'#FF8C42' },
    tryagain: { emoji:'💪', text:'TRY AGAIN!',         sub:`${pct}% — Stay inside the letter next time!`, stars:1, color:'#FF5C5C' },
  };
  const c = cfg[level];

  // Golden glow on canvas box for perfect/great
  if (level === 'perfect') {
    box.classList.add('perfect-glow');
    setTimeout(() => box.classList.remove('perfect-glow'), 4000);
  }

  // Create overlay div
  const overlay = document.createElement('div');
  overlay.id = 'perf-overlay';
  overlay.className = `perfection-overlay level-${level}`;
  overlay.innerHTML = `
    <div class="perf-stars">${'⭐'.repeat(c.stars)}</div>
    <div class="perf-emoji">${c.emoji}</div>
    <div class="perf-text">${c.text}</div>
    <div class="perf-sub">${c.sub}</div>
    <button class="perf-close" onclick="closePerfectionOverlay()">
      ${level === 'tryagain' ? '↩ Try Again' : '✏️ Keep Tracing'}
    </button>
  `;

  box.style.position = 'relative';
  box.appendChild(overlay);

  // Trigger entrance animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add('show'));
  });

  // Confetti burst for perfect and great
  if (level === 'perfect' || level === 'great') {
    spawnTracingConfetti(box, level === 'perfect' ? 80 : 50);
  }

  // Voice celebration (Web Speech API)
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const praise = {
      perfect:  'Wow! Perfect tracing! You are absolutely amazing! Keep it up!',
      great:    'Great job! Excellent tracing! You did so well!',
      good:     'Good effort! Keep practising and you will be perfect soon!',
      tryagain: 'Good try! Stay inside the dotted letter and try again!',
    }[level];
    const utter = new SpeechSynthesisUtterance(praise);
    utter.lang = _tLang === 'hindi' ? 'hi-IN' : 'en-IN';
    utter.rate = 0.88; utter.pitch = 1.15; utter.volume = 1;
    window.speechSynthesis.speak(utter);
  }
}

// Spawn confetti particles inside the canvas box
function spawnTracingConfetti(container, count) {
  const cols = ['#FFD700','#FF8C42','#6C63FF','#43D9A2','#FF5C5C','#FFD93D','#F9A8D4','#FFFFFF'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'trace-confetti';
      const size = 5 + Math.random() * 9;
      el.style.cssText = `
        left:${5 + Math.random() * 90}%;
        top:${Math.random() * 60}%;
        width:${size}px; height:${size}px;
        background:${cols[Math.floor(Math.random() * cols.length)]};
        border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
        animation-duration:${0.7 + Math.random() * 1}s;
        animation-delay:${Math.random() * 0.3}s;
      `;
      container.appendChild(el);
      setTimeout(() => el.remove(), 2200);
    }, i * 18);
  }
}

function closePerfectionOverlay() {
  const ov = document.getElementById('perf-overlay');
  if (!ov) return;
  ov.classList.remove('show');
  setTimeout(() => ov.remove(), 350);
  const box = document.getElementById('canvas-box');
  if (box) box.classList.remove('perfect-glow');
}

// ── Canvas Video Recording ────────────────────────────────────
function toggleRecording() {
  if (_isRecording) stopRecording();
  else startRecording();
}

function startRecording() {
  const canvas = document.getElementById('trace-canvas');
  if (!canvas) { showToast('Tap a letter to start tracing first!', ''); return; }
  if (!canvas.captureStream) {
    showToast('Recording not supported on this browser 😔', ''); return;
  }

  try {
    const stream = canvas.captureStream(25);
    _recordedChunks = [];

    // Pick best supported MIME type
    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp8')
      ? 'video/webm;codecs=vp8'
      : MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : '';

    _mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : {});

    _mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) _recordedChunks.push(e.data);
    };

    _mediaRecorder.onstop = () => {
      const blob = new Blob(_recordedChunks, { type: 'video/webm' });
      const letter = _tLetters[_tIdx] || 'letter';
      const filename = `tracing-${letter}-${new Date().toISOString().slice(0,19).replace(/:/g,'-')}.webm`;

      // Try native share (mobile) first, fall back to download
      if (navigator.canShare && navigator.canShare({ files: [new File([blob], filename, { type: 'video/webm' })] })) {
        navigator.share({
          files: [new File([blob], filename, { type: 'video/webm' })],
          title: `Tracing "${letter}" — KidWorksheets`,
        }).catch(() => _downloadBlob(blob, filename));
      } else {
        _downloadBlob(blob, filename);
      }
    };

    _mediaRecorder.start(250); // collect data every 250ms
    _isRecording = true;

    // Update UI
    const btn = document.getElementById('btn-record');
    if (btn) { btn.textContent = '⏹ Stop'; btn.classList.add('recording'); }
    const ind = document.getElementById('recording-indicator');
    if (ind) ind.classList.add('visible');

    showToast('🔴 Recording started!', '');
  } catch (err) {
    console.warn('Recording error:', err);
    showToast('Could not start recording 😔', '');
  }
}

function stopRecording() {
  if (_mediaRecorder && _isRecording) {
    _mediaRecorder.stop();
    _isRecording = false;
    const btn = document.getElementById('btn-record');
    if (btn) { btn.textContent = '🎥 Record'; btn.classList.remove('recording'); }
    const ind = document.getElementById('recording-indicator');
    if (ind) ind.classList.remove('visible');
    showToast('📥 Saving video…', '');
  }
}

function _downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
  showToast(`✅ Video saved: ${filename}`, '');
}


// ══════════════════════════════════════════════════════════════
// PHASE 1 — NEW QUESTION TYPE RENDERERS
// ══════════════════════════════════════════════════════════════

// ── MATCH ─────────────────────────────────────────────────────
// State: { selectedLeft, selectedRight, pairs:[{left,right}], matched:[] }
function renderMatch(q) {
  const pairs = q.pairs || [];
  const lefts  = pairs.map(p => p.left);
  const rights = [...pairs.map(p => p.right)].sort(() => Math.random() - 0.5);

  window._matchState = { selectedLeft:null, selectedRight:null, matched:{}, pairs, lefts, rights };

  return `
    <div class="match-area">
      <div class="match-hint">Tap one from each column to make a match!</div>
      <div class="match-columns">
        <div class="match-col" id="match-left">
          ${lefts.map((l, i) => `
            <button class="match-item" id="ml-${i}" onclick="matchSelect('left',${i},'${esc(l)}')">${esc(l)}</button>`).join('')}
        </div>
        <div class="match-col" id="match-right">
          ${rights.map((r, i) => `
            <button class="match-item" id="mr-${i}" onclick="matchSelect('right',${i},'${esc(r)}')">${esc(r)}</button>`).join('')}
        </div>
      </div>
    </div>`;
}

function matchSelect(side, idx, value) {
  const ms = window._matchState;
  if (!ms) return;
  if (side === 'left') {
    ms.selectedLeft = { idx, value };
    $$('.match-item[id^="ml-"]').forEach(b => b.classList.remove('selected'));
    document.getElementById(`ml-${idx}`).classList.add('selected');
  } else {
    ms.selectedRight = { idx, value };
    $$('.match-item[id^="mr-"]').forEach(b => b.classList.remove('selected'));
    document.getElementById(`mr-${idx}`).classList.add('selected');
  }
  // Auto-check when both selected
  if (ms.selectedLeft && ms.selectedRight) {
    const lv = ms.selectedLeft.value, rv = ms.selectedRight.value;
    const pair = ms.pairs.find(p => p.left === lv);
    const isCorrect = pair && pair.right === rv;
    ms.matched[lv] = { right: rv, correct: isCorrect };
    const lBtn = document.getElementById(`ml-${ms.selectedLeft.idx}`);
    const rBtn = document.getElementById(`mr-${ms.selectedRight.idx}`);
    if (lBtn) lBtn.classList.add(isCorrect ? 'matched-correct' : 'matched-wrong');
    if (rBtn) rBtn.classList.add(isCorrect ? 'matched-correct' : 'matched-wrong');
    ms.selectedLeft = null; ms.selectedRight = null;
    const allDone = Object.keys(ms.matched).length === ms.pairs.length;
    const checkBtn = $('#btn-check');
    if (checkBtn && allDone) { checkBtn.disabled = false; state.player.selectedOption = 'match'; }
  }
}

// ── CIRCLE FIND ───────────────────────────────────────────────
function renderCircleFind(q) {
  const items = q.items || [];
  window._cfState = { items, correctItems: q.correctItems || [], circled: new Set() };
  return `
    <div class="circle-find-area">
      <div style="font-size:13px;color:#7A7A8A;margin-bottom:10px;font-family:Nunito,sans-serif">
        Tap to circle the correct items!
      </div>
      <div class="circle-find-grid" id="cf-grid">
        ${items.map((item, i) => `
          <button class="cf-item" id="cf-${i}" onclick="toggleCircle(${i})">${esc(item)}</button>`).join('')}
      </div>
    </div>`;
}

function toggleCircle(idx) {
  const cs = window._cfState;
  if (!cs) return;
  if (cs.circled.has(idx)) cs.circled.delete(idx);
  else cs.circled.add(idx);
  document.getElementById(`cf-${idx}`)?.classList.toggle('circled', cs.circled.has(idx));
  state.player.selectedOption = cs.circled.size > 0 ? 'circle' : null;
  const btn = $('#btn-check'); if (btn) btn.disabled = cs.circled.size === 0;
}

// ── DRAG SLOT ─────────────────────────────────────────────────
function renderDragSlot(q) {
  const options = q.options || [];
  const slots   = q.slots || [];
  // Replace [BLANK] tokens with span slots in text
  let sentenceHtml = esc(q.text || '');
  slots.forEach((_, i) => {
    sentenceHtml = sentenceHtml.replace('[BLANK]', `<span class="slot-blank" id="slot-${i}" onclick="fillSlot(${i})">____</span>`);
  });
  window._slotState = { slots: slots.map(s => ({ ...s, filled: null })), selectedTile: null, options };
  return `
    <div class="drag-slot-area">
      <div class="slot-sentence" id="slot-sentence">${sentenceHtml}</div>
      <div style="font-size:13px;color:#7A7A8A;margin-bottom:10px;font-family:Nunito,sans-serif">
        Tap a word tile, then tap the blank to fill it!
      </div>
      <div class="tile-pool">
        ${options.map((o, i) => `
          <button class="tile-btn" id="tile-${i}" onclick="selectTile(${i},'${esc(o)}')">${esc(o)}</button>`).join('')}
      </div>
    </div>`;
}

function selectTile(idx, value) {
  const ss = window._slotState;
  if (!ss) return;
  ss.selectedTile = { idx, value };
  $$('.tile-btn').forEach((b, i) => b.classList.toggle('selected', i === idx));
}

function fillSlot(slotIdx) {
  const ss = window._slotState;
  if (!ss || !ss.selectedTile) return;
  const { idx: tileIdx, value } = ss.selectedTile;
  ss.slots[slotIdx].filled = value;
  // Visual update
  const slotEl = document.getElementById(`slot-${slotIdx}`);
  if (slotEl) { slotEl.textContent = value; slotEl.classList.add('filled'); }
  document.getElementById(`tile-${tileIdx}`)?.classList.add('used');
  ss.selectedTile = null;
  $$('.tile-btn').forEach(b => b.classList.remove('selected'));
  const allFilled = ss.slots.every(s => s.filled !== null);
  const btn = $('#btn-check'); if (btn) btn.disabled = !allFilled;
  if (allFilled) state.player.selectedOption = 'slot';
}

// ── ARRANGE ───────────────────────────────────────────────────
function renderArrange(q) {
  const items = [...(q.items || [])].sort(() => Math.random() - 0.5);
  window._arrangeState = { items, correctOrder: q.correctOrder || [], answer: [], usedIdx: new Set() };
  return `
    <div class="arrange-area">
      <div class="arrange-hint">Tap items in the CORRECT order!</div>
      <div class="arrange-source" id="arrange-source">
        ${items.map((item, i) => `
          <button class="arrange-tile" id="at-${i}" onclick="arrangePick(${i},'${esc(item)}')">${esc(item)}</button>`).join('')}
      </div>
      <div class="arrange-label">Your Answer:</div>
      <div class="arrange-answer-row" id="arrange-answer"></div>
    </div>`;
}

function arrangePick(idx, value) {
  const as = window._arrangeState;
  if (!as || as.usedIdx.has(idx)) return;
  as.usedIdx.add(idx);
  as.answer.push(value);
  document.getElementById(`at-${idx}`)?.classList.add('used');
  const row = document.getElementById('arrange-answer');
  if (row) {
    const tile = document.createElement('button');
    tile.className = 'arrange-answer-tile';
    tile.textContent = value;
    tile.onclick = () => { // allow undo by clicking answer tile
      as.answer.splice(as.answer.indexOf(value), 1);
      as.usedIdx.delete(idx);
      document.getElementById(`at-${idx}`)?.classList.remove('used');
      tile.remove();
      state.player.selectedOption = as.answer.length === as.items.length ? 'arrange' : null;
      const btn = $('#btn-check'); if (btn) btn.disabled = as.answer.length < as.items.length;
    };
    row.appendChild(tile);
  }
  const done = as.answer.length === as.items.length;
  const btn = $('#btn-check'); if (btn) btn.disabled = !done;
  if (done) state.player.selectedOption = 'arrange';
}

// ── SEQUENCE (next/prev) ──────────────────────────────────────
function renderSequenceNext(q) { return _renderSequence(q, 'next'); }
function renderSequencePrev(q) { return _renderSequence(q, 'prev'); }

function _renderSequence(q, dir) {
  const given   = q.given   || [];
  const answers = q.answers || [];
  const blanks  = answers.length;
  window._seqState = { answers, filled: new Array(blanks).fill(null), options: q.options || answers };

  const seqItems = dir === 'next'
    ? [...given.map(g => `<div class="seq-item">${esc(g)}</div><div class="seq-arrow">→</div>`),
       ...Array.from({ length: blanks }, (_, i) => `<div class="seq-arrow">→</div><div class="seq-blank" id="seq-blank-${i}">?</div>`)]
    : [...Array.from({ length: blanks }, (_, i) => `<div class="seq-blank" id="seq-blank-${i}">?</div><div class="seq-arrow">→</div>`),
       ...given.map(g => `<div class="seq-item">${esc(g)}</div><div class="seq-arrow">→</div>`)];

  // Build option tiles (shuffled)
  const opts = [...(q.options || answers), ...(q.distractors || [])].sort(() => Math.random() - 0.5);
  return `
    <div class="sequence-area">
      <div class="sequence-row">${seqItems.join('')}</div>
      <div style="font-size:13px;color:#7A7A8A;margin-bottom:10px;font-family:Nunito,sans-serif">Tap to fill the blanks!</div>
      <div class="sequence-options">
        ${opts.map((o, i) => `<button class="tile-btn" id="seq-opt-${i}" onclick="seqFill('${esc(o)}')">${esc(o)}</button>`).join('')}
      </div>
    </div>`;
}

let _seqNextBlank = 0;
function seqFill(value) {
  const ss = window._seqState;
  if (!ss) return;
  const blankEl = document.getElementById(`seq-blank-${_seqNextBlank}`);
  if (!blankEl) return;
  ss.filled[_seqNextBlank] = value;
  blankEl.textContent = value; blankEl.classList.add('filled');
  _seqNextBlank++;
  const done = ss.filled.every(f => f !== null);
  const btn = $('#btn-check'); if (btn) btn.disabled = !done;
  if (done) state.player.selectedOption = 'sequence';
}

// ── UNSCRAMBLE ────────────────────────────────────────────────
function renderUnscramble(q) {
  const letters = q.scrambled || [];
  window._unscState = { answer: q.answer || '', picked: [], pool: [...letters] };
  return `
    <div class="unscramble-area">
      ${q.hint ? `<div class="unscramble-hint">💡 ${esc(q.hint)}</div>` : ''}
      <div class="answer-letter-row" id="unsc-answer">
        ${q.answer.split('').map((_, i) => `<div class="answer-letter-slot" id="ans-slot-${i}" onclick="unscUndo(${i})">_</div>`).join('')}
      </div>
      <div class="scramble-pool">
        ${letters.map((l, i) => `<button class="scramble-letter" id="scl-${i}" onclick="unscPick(${i},'${esc(l)}')">${esc(l)}</button>`).join('')}
      </div>
    </div>`;
}

function unscPick(idx, letter) {
  const us = window._unscState;
  if (!us) return;
  const pos = us.picked.length;
  if (pos >= us.answer.length) return;
  us.picked.push({ idx, letter });
  document.getElementById(`scl-${idx}`)?.classList.add('used');
  const slot = document.getElementById(`ans-slot-${pos}`);
  if (slot) slot.textContent = letter;
  const done = us.picked.length === us.answer.length;
  const btn = $('#btn-check'); if (btn) btn.disabled = !done;
  if (done) state.player.selectedOption = 'unscramble';
}

function unscUndo(slotIdx) {
  const us = window._unscState;
  if (!us || us.picked.length === 0) return;
  // Remove from the end (simplest UX)
  const last = us.picked.pop();
  document.getElementById(`scl-${last.idx}`)?.classList.remove('used');
  for (let i = us.picked.length; i < us.answer.length; i++) {
    const slot = document.getElementById(`ans-slot-${i}`);
    if (slot) slot.textContent = '_';
  }
  state.player.selectedOption = null;
  const btn = $('#btn-check'); if (btn) btn.disabled = true;
}

// ── WORD BUILD ────────────────────────────────────────────────
function renderWordBuild(q) {
  const pool = [...(q.letterPool || [])].sort(() => Math.random() - 0.5);
  window._wbState = { answer: q.answer || '', picked: [] };
  return `
    <div class="word-build-area">
      ${q.picture ? `<div class="word-picture-display">${esc(q.picture)}</div>` : ''}
      <div class="word-build-slots" id="wb-slots">
        ${q.answer.split('').map((_, i) => `<div class="word-build-slot" id="wbs-${i}">_</div>`).join('')}
      </div>
      <div class="letter-pool">
        ${pool.map((l, i) => `<button class="scramble-letter" id="wbl-${i}" onclick="wbPick(${i},'${esc(l)}')">${esc(l)}</button>`).join('')}
      </div>
    </div>`;
}

function wbPick(idx, letter) {
  const wb = window._wbState;
  if (!wb) return;
  const pos = wb.picked.length;
  if (pos >= wb.answer.length) return;
  wb.picked.push({ idx, letter });
  document.getElementById(`wbl-${idx}`)?.classList.add('used');
  const slot = document.getElementById(`wbs-${pos}`);
  if (slot) { slot.textContent = letter; slot.classList.add('filled'); }
  const done = wb.picked.length === wb.answer.length;
  const btn = $('#btn-check'); if (btn) btn.disabled = !done;
  if (done) state.player.selectedOption = 'wordbuild';
}

// ── WORD FIRST / LAST LETTER ──────────────────────────────────
function renderWordFirstLetter(q) {
  const display = `<span class="blank-letter">___</span>${esc(q.wordWithBlank.replace(/^___/, ''))}`;
  return _renderWordComplete(q, display);
}
function renderWordLastLetter(q) {
  const display = `${esc(q.wordWithBlank.replace(/___$/, ''))}<span class="blank-letter">___</span>`;
  return _renderWordComplete(q, display);
}
function _renderWordComplete(q, display) {
  return `
    <div class="word-complete-area">
      <div class="word-display">${display}</div>
      <div style="font-size:13px;color:#7A7A8A;margin-bottom:12px;font-family:Nunito,sans-serif">
        Tap the correct letter!
      </div>
      <div class="letter-choices">
        ${(q.options || []).map((o, i) => `
          <button class="letter-choice" id="lc-${i}" onclick="selectLetterChoice('${esc(o)}')">${esc(o)}</button>`).join('')}
      </div>
    </div>`;
}

function selectLetterChoice(value) {
  state.player.selectedOption = value;
  $$('.letter-choice').forEach(b => b.classList.toggle('selected', b.textContent === value));
  const btn = $('#btn-check'); if (btn) btn.disabled = false;
}

// ── Evaluation shim — wire new types into checkAnswer ─────────
// These return {isCorrect, givenAnswer}
function evaluateNewType(question) {
  const type = question.type;
  if (type === 'MATCH') {
    const ms = window._matchState;
    if (!ms) return { isCorrect: false, givenAnswer: '—' };
    const allCorrect = ms.pairs.every(p => ms.matched[p.left]?.correct);
    return { isCorrect: allCorrect, givenAnswer: allCorrect ? 'All matched ✓' : 'Some wrong ✗' };
  }
  if (type === 'CIRCLE_FIND') {
    const cs = window._cfState;
    if (!cs) return { isCorrect: false, givenAnswer: '—' };
    const correct = cs.items.every((item, i) => {
      const shouldCircle = cs.correctItems.includes(item);
      return shouldCircle === cs.circled.has(i);
    });
    // Show correct items
    cs.items.forEach((item, i) => {
      const el = document.getElementById(`cf-${i}`);
      if (!el) return;
      el.classList.add('disabled');
      if (cs.correctItems.includes(item)) el.classList.add('show-correct');
      else if (cs.circled.has(i)) el.classList.add('show-wrong');
    });
    return { isCorrect: correct, givenAnswer: correct ? 'Correct!' : 'Some wrong' };
  }
  if (type === 'DRAG_SLOT') {
    const ss = window._slotState;
    if (!ss) return { isCorrect: false, givenAnswer: '—' };
    const correct = ss.slots.every(s => s.filled?.toLowerCase() === s.answer?.toLowerCase());
    return { isCorrect: correct, givenAnswer: ss.slots.map(s => s.filled).join(', ') };
  }
  if (type === 'ARRANGE') {
    const as = window._arrangeState;
    if (!as) return { isCorrect: false, givenAnswer: '—' };
    const correct = JSON.stringify(as.answer) === JSON.stringify(as.correctOrder);
    document.querySelectorAll('.arrange-answer-tile').forEach((tile, i) => {
      tile.classList.add(as.answer[i] === as.correctOrder[i] ? 'correct' : 'wrong');
    });
    return { isCorrect: correct, givenAnswer: as.answer.join(', ') };
  }
  if (type === 'SEQUENCE_NEXT' || type === 'SEQUENCE_PREV') {
    const ss = window._seqState;
    if (!ss) return { isCorrect: false, givenAnswer: '—' };
    const correct = ss.filled.every((f, i) => f?.toString().toLowerCase() === ss.answers[i]?.toString().toLowerCase());
    ss.filled.forEach((f, i) => {
      const el = document.getElementById(`seq-blank-${i}`);
      if (el) el.classList.add(f?.toString().toLowerCase() === ss.answers[i]?.toString().toLowerCase() ? 'correct' : 'wrong');
    });
    return { isCorrect: correct, givenAnswer: ss.filled.join(', ') };
  }
  if (type === 'UNSCRAMBLE') {
    const us = window._unscState;
    if (!us) return { isCorrect: false, givenAnswer: '—' };
    const formed = us.picked.map(p => p.letter).join('');
    const correct = formed.toUpperCase() === us.answer.toUpperCase();
    us.picked.forEach((p, i) => {
      const el = document.getElementById(`ans-slot-${i}`);
      if (el) el.classList.add(correct ? 'correct' : 'wrong');
    });
    return { isCorrect: correct, givenAnswer: formed };
  }
  if (type === 'WORD_BUILD') {
    const wb = window._wbState;
    if (!wb) return { isCorrect: false, givenAnswer: '—' };
    const formed = wb.picked.map(p => p.letter).join('');
    const correct = formed.toUpperCase() === wb.answer.toUpperCase();
    return { isCorrect: correct, givenAnswer: formed };
  }
  if (type === 'WORD_FIRST_LETTER' || type === 'WORD_LAST_LETTER') {
    const correct = state.player.selectedOption === question.answer;
    $$('.letter-choice').forEach(b => {
      b.classList.add('disabled');
      if (b.textContent === question.answer) b.classList.add('correct');
      else if (b.classList.contains('selected') && !correct) b.classList.add('wrong');
    });
    return { isCorrect: correct, givenAnswer: state.player.selectedOption || '—' };
  }
  return { isCorrect: false, givenAnswer: '—' };
}

// ══════════════════════════════════════════════════════════════
// AUDIO CLIP — Listen & Answer
// ══════════════════════════════════════════════════════════════
function renderAudioClip(q) {
  const sheet     = q.lineType || '4-line';
  const sheetOpts = ['4-line','3-line','2-line','blank'].map(s =>
    `<button class="sheet-pill ${sheet===s?'active':''}" onclick="setAudioSheet('${s}')" id="asp-${s}">${s}</button>`
  ).join('');
  const answerArea = (q.answerType === 'mcq' && q.options?.length)
    ? `<div class="mcq-options-grid" id="audio-mcq-opts">
        ${q.options.map((o,i)=>`
          <button class="mcq-option" data-val="${esc(o)}" id="aopt-${i}"
            onclick="selectAudioMCQ('${esc(o)}')">
            <span class="mcq-letter">${String.fromCharCode(65+i)}</span>${esc(o)}
          </button>`).join('')}
       </div>`
    : `<div class="audio-write-area">
        <canvas id="audio-write-canvas" style="height:180px;width:100%;touch-action:none"></canvas>
      </div>`;

  window._audioClipSheet = sheet;
  setTimeout(() => {
    if (q.answerType !== 'mcq') initAudioWriteCanvas(sheet);
  }, 50);

  return `
    <div class="audio-clip-area">
      <div class="audio-clip-player-row">
        <audio id="aq-player" src="${q.audioSrc || ''}" preload="auto"
          style="width:100%;border-radius:12px;accent-color:var(--primary)"></audio>
        <button class="btn-play-audio" onclick="toggleAudioPlay()" id="btn-play-audio">
          ▶ Play Audio
        </button>
      </div>
      ${q.audioSrc ? '' : '<div style="color:#FF5C5C;font-size:12px;text-align:center">⚠ No audio attached</div>'}
      ${q.answerType !== 'mcq' ? `
        <div class="audio-sheet-picker">
          <span style="font-size:12px;color:#7A7A8A">Write your answer on:</span>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px">${sheetOpts}</div>
        </div>` : '<div style="font-size:13px;color:#7A7A8A;text-align:center;margin:8px 0">Choose the correct answer below:</div>'}
      ${answerArea}
    </div>`;
}

function toggleAudioPlay() {
  const player = document.getElementById('aq-player');
  const btn    = document.getElementById('btn-play-audio');
  if (!player) return;
  if (player.paused) {
    player.play().catch(()=>{});
    if (btn) btn.textContent = '⏸ Pause';
  } else {
    player.pause();
    if (btn) btn.textContent = '▶ Play Audio';
  }
}

function setAudioSheet(sheet) {
  window._audioClipSheet = sheet;
  document.querySelectorAll('[id^="asp-"]').forEach(b =>
    b.classList.toggle('active', b.id === `asp-${sheet}`)
  );
  initAudioWriteCanvas(sheet);
}

function initAudioWriteCanvas(sheet) {
  const canvas = document.getElementById('audio-write-canvas');
  if (!canvas) return;
  const W = canvas.clientWidth || 380;
  const H = 180;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FEFCF7';
  ctx.fillRect(0, 0, W, H);
  // Draw lines for the selected sheet type
  drawSheetLines(ctx, W, H); // reuse existing function
  // Simple freehand drawing on this canvas
  let drawing = false, lx = 0, ly = 0;
  const getP = e => {
    const r = canvas.getBoundingClientRect();
    const sx = W/r.width, sy = H/r.height;
    return e.touches
      ? {x:(e.touches[0].clientX-r.left)*sx,y:(e.touches[0].clientY-r.top)*sy}
      : {x:(e.clientX-r.left)*sx,y:(e.clientY-r.top)*sy};
  };
  canvas.addEventListener('pointerdown', e=>{e.preventDefault();canvas.setPointerCapture(e.pointerId);drawing=true;const p=getP(e);lx=p.x;ly=p.y;},{passive:false});
  canvas.addEventListener('pointermove', e=>{if(!drawing)return;e.preventDefault();const p=getP(e);ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(p.x,p.y);ctx.strokeStyle='#1A1A2E';ctx.lineWidth=2;ctx.lineCap='round';ctx.stroke();lx=p.x;ly=p.y;},{passive:false});
  canvas.addEventListener('pointerup',()=>drawing=false);
  canvas.addEventListener('pointercancel',()=>drawing=false);
  state.player.selectedOption = 'audio_written'; // always allow submit
}

function selectAudioMCQ(value) {
  if (state.player.checked) return;
  state.player.selectedOption = value;
  document.querySelectorAll('[id^="aopt-"]').forEach(b =>
    b.classList.toggle('selected', b.getAttribute('data-val') === value)
  );
  const btn = document.getElementById('btn-check');
  if (btn) btn.disabled = false;
}

// ══════════════════════════════════════════════════════════════
// VOWEL SORT — Circle/Sort vowel-sound words
// ══════════════════════════════════════════════════════════════
function renderVowelSort(q) {
  const mode    = q.mode || 'single'; // 'single' | 'multi'
  const lang    = q.lang || 'english';
  const vowels  = lang === 'hindi'
    ? ['अ/आ','इ/ई','उ/ऊ','ए/ऐ','ओ/औ']
    : ['A','E','I','O','U'];

  if (mode === 'single') {
    // One vowel at a time: highlight the target vowel, child circles matching words
    const targetVowel = q.targetVowel || vowels[0];
    const words       = q.words || [];
    const correct     = new Set(q.correctWords || []);
    window._vsState   = { mode:'single', words, correct, circled: new Set() };

    return `
      <div class="vowel-sort-area">
        <div class="vowel-target-badge">
          Vowel: <span class="vowel-highlight">${esc(targetVowel)}</span>
        </div>
        <div class="vs-instruction">Tap all words that have the <strong>${esc(targetVowel)}</strong> sound!</div>
        <div class="vs-word-grid" id="vs-grid">
          ${words.map((w,i)=>`
            <button class="vs-word-btn" id="vsw-${i}" onclick="vsToggleWord(${i},'${esc(w)}')">${esc(w)}</button>
          `).join('')}
        </div>
      </div>`;
  } else {
    // Multi-bin: 5 vowel bins, drag/tap words into correct bin
    const words     = q.words || [];
    const binMap    = q.binMap || {}; // word → vowel
    window._vsState = { mode:'multi', words, binMap, placed:{} };

    const bins = vowels.map((v,vi) => `
      <div class="vs-bin" id="vsbin-${vi}" onclick="vsPlaceInBin(${vi},'${esc(v)}')">
        <div class="vsb-label">${esc(v)}</div>
        <div class="vsb-words" id="vsb-words-${vi}"></div>
      </div>`).join('');

    return `
      <div class="vowel-sort-area">
        <div class="vs-instruction">Tap a word, then tap the correct vowel bin!</div>
        <div class="vs-word-pool" id="vs-pool">
          ${words.map((w,i)=>`
            <button class="vs-word-btn" id="vsw-${i}" onclick="vsSelectWord(${i},'${esc(w)}')">${esc(w)}</button>
          `).join('')}
        </div>
        <div class="vs-bins">${bins}</div>
      </div>`;
  }
}

function vsToggleWord(idx, word) {
  const vs = window._vsState; if (!vs) return;
  if (vs.circled.has(idx)) vs.circled.delete(idx);
  else vs.circled.add(idx);
  document.getElementById(`vsw-${idx}`)?.classList.toggle('circled', vs.circled.has(idx));
  state.player.selectedOption = vs.circled.size > 0 ? 'vs' : null;
  const btn = document.getElementById('btn-check');
  if (btn) btn.disabled = vs.circled.size === 0;
}

let _vsSelectedWord = null;
function vsSelectWord(idx, word) {
  _vsSelectedWord = { idx, word };
  document.querySelectorAll('.vs-word-btn').forEach((b,i) => b.classList.toggle('selected', i===idx));
}
function vsPlaceInBin(binIdx, vowel) {
  if (!_vsSelectedWord) return;
  const { idx, word } = _vsSelectedWord;
  window._vsState.placed[word] = vowel;
  const btn = document.getElementById(`vsw-${idx}`);
  if (btn) { btn.style.display = 'none'; }
  const bw = document.getElementById(`vsb-words-${binIdx}`);
  if (bw) {
    const tag = document.createElement('span');
    tag.className = 'vsb-word-tag'; tag.textContent = word;
    bw.appendChild(tag);
  }
  _vsSelectedWord = null;
  document.querySelectorAll('.vs-word-btn').forEach(b => b.classList.remove('selected'));
  const allPlaced = Object.keys(window._vsState.placed).length === window._vsState.words.length;
  if (allPlaced) { state.player.selectedOption = 'vs_placed'; const btn=document.getElementById('btn-check'); if(btn) btn.disabled=false; }
}

// ══════════════════════════════════════════════════════════════
// GLOBAL HELPER — Draw ruled/grid lines on a canvas
// Used by: tracing canvas, audio write canvas
// ══════════════════════════════════════════════════════════════
function drawSheetLines(ctx, W, H) {
  const sheet = window._audioClipSheet || window._tSheet || '4-line';
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#FEFCF7';
  ctx.fillRect(0, 0, W, H);

  if (sheet === '4-line') {
    // Blue English 4-line: headline, waistline, baseline, footline
    const lh = H / 4;
    const colors = ['#B0C4DE','#B0C4DE','#4169E1','#B0C4DE'];
    const widths = [1, 1, 1.5, 1];
    [0,1,2,3].forEach(i => {
      ctx.strokeStyle = colors[i]; ctx.lineWidth = widths[i];
      ctx.beginPath(); ctx.moveTo(0, lh*i + lh*0.2); ctx.lineTo(W, lh*i + lh*0.2); ctx.stroke();
    });
    // last bottom line
    ctx.strokeStyle = '#B0C4DE'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, H-4); ctx.lineTo(W, H-4); ctx.stroke();
  } else if (sheet === '3-line') {
    // Red Devanagari 3-line: shirorekha, middle, baseline
    const t = H * 0.15, m = H * 0.5, b = H * 0.85;
    [[t,'#CC0000',2],[m,'#CC0000',1],[b,'#CC0000',2]].forEach(([y,c,w]) => {
      ctx.strokeStyle = c; ctx.lineWidth = w;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    });
  } else if (sheet === '2-line') {
    // 2-line matra sheet (red)
    const t = H * 0.2, b = H * 0.8;
    ctx.strokeStyle = '#CC0000'; ctx.lineWidth = 2;
    [t,b].forEach(y => { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); });
  } else if (sheet === 'grid') {
    // Math grid 40px cells
    const cell = Math.max(30, Math.min(50, H / 4));
    ctx.strokeStyle = '#D0D8E8'; ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += cell) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y <= H; y += cell) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
  }
  // blank = just the background fill above
}

// ══════════════════════════════════════════════════════════════
// TEXT_HIGHLIGHT — Read passage, tap words to circle them
// ══════════════════════════════════════════════════════════════
function renderTextHighlight(q) {
  const passage = q.passage || '';
  const correct = (q.correctWords || []).map(w => w.toLowerCase());
  window._thState = { highlighted: new Set(), correctWords: q.correctWords || [] };

  const words = passage.split(/(\s+)/).map((token, i) => {
    const clean = token.trim().toLowerCase().replace(/[^a-z\u0900-\u097f]/g, '');
    if (!token.trim()) return `<span>${token}</span>`; // whitespace passthrough
    const isTarget = correct.includes(clean);
    return `<span class="th-word${isTarget ? ' th-hintable' : ''}"
      id="thw-${i}" onclick="thToggleWord(this,'${token.trim()}')">${esc(token)}</span>`;
  }).join('');

  return `
    <div class="text-highlight-area">
      <div class="th-instruction">👆 Tap the correct words to circle them</div>
      <div class="th-passage" id="th-passage">${words}</div>
      <div class="th-hint" style="font-size:12px;color:#7A7A8A;margin-top:8px">
        Looking for: <strong>${correct.length}</strong> word${correct.length!==1?'s':''}
      </div>
    </div>`;
}

function thToggleWord(el, word) {
  const ths = window._thState; if (!ths) return;
  const clean = word.toLowerCase().replace(/[^a-z\u0900-\u097f]/g,'');
  el.classList.toggle('highlighted');
  if (el.classList.contains('highlighted')) ths.highlighted.add(clean);
  else ths.highlighted.delete(clean);
  state.player.selectedOption = ths.highlighted.size > 0 ? 'th' : null;
  const btn = document.getElementById('btn-check');
  if (btn) btn.disabled = ths.highlighted.size === 0;
}

// ══════════════════════════════════════════════════════════════
// PICTURE_WRITE — See picture, write / type about it
// ══════════════════════════════════════════════════════════════
function renderPictureWrite(q) {
  const picture = q.picture || '🖼️';
  return `
    <div class="picture-write-area">
      <div class="pw-picture">${esc(picture)}</div>
      ${q.text ? `<div class="pw-prompt">${esc(q.text)}</div>` : ''}
      <input id="pw-input" class="fill-blank-input" type="text"
        placeholder="Write your answer…" autocomplete="off" autocorrect="off"
        style="width:100%;font-size:18px;text-align:center;margin-top:8px">
    </div>`;
}

// ══════════════════════════════════════════════════════════════
// AUDIO_WRITE — TTS speaks, child writes what they heard
// ══════════════════════════════════════════════════════════════
function renderAudioWrite(q) {
  const lang = q.language || 'en-IN';
  setTimeout(() => {
    const btn = document.getElementById('btn-speak');
    if (btn) btn.addEventListener('click', () => speakText(q.spokenText, lang));
  }, 50);

  return `
    <div class="audio-write-area-outer">
      <button id="btn-speak" class="btn-speak-tts" onclick="speakText('${esc(q.spokenText||'')}','${lang}')">
        🔊 Tap to Listen
      </button>
      <div style="font-size:12px;color:#7A7A8A;text-align:center;margin:8px 0">
        Then write what you heard:
      </div>
      <input id="aw-input" class="fill-blank-input" type="text"
        placeholder="Type what you heard…" autocomplete="off" autocorrect="off"
        style="width:100%;font-size:18px;text-align:center">
    </div>`;
}

function speakText(text, lang) {
  if (!window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = lang || 'en-IN'; utt.rate = 0.85; utt.pitch = 1.1;
  // Try to find a matching voice (especially for hi-IN)
  const voices = window.speechSynthesis.getVoices();
  const match = voices.find(v => v.lang === lang) || voices.find(v => v.lang.startsWith(lang.split('-')[0]));
  if (match) utt.voice = match;
  window.speechSynthesis.speak(utt);
  const btn = document.getElementById('btn-speak');
  if (btn) {
    btn.textContent = '🔊 Playing…';
    utt.onend = () => { btn.textContent = '🔊 Tap to Listen'; };
  }
}

// ══════════════════════════════════════════════════════════════
// GROUPS_OF_TENS — Count visual tens blocks
// ══════════════════════════════════════════════════════════════
function renderGroupsOfTens(q) {
  const tens  = q.tensCount  || 0;
  const units = q.unitsCount || 0;
  const question = q.question || 'How many tens?';

  const tenBlocks = Array.from({ length: tens }, (_, gi) => {
    const dots = Array.from({ length: 10 }, () => `<span class="ten-dot">●</span>`).join('');
    return `<div class="ten-group">${dots}</div>`;
  }).join('');

  const unitDots = units > 0
    ? `<div class="ten-group unit-group">${Array.from({length:units},()=>`<span class="ten-dot unit-dot">●</span>`).join('')}</div>`
    : '';

  return `
    <div class="groups-of-tens-area">
      <div class="got-blocks">${tenBlocks}${unitDots}</div>
      <div class="got-labels">
        ${tens  > 0 ? `<span class="got-lbl">${tens} group${tens!==1?'s':''} of ten</span>` : ''}
        ${units > 0 ? `<span class="got-lbl unit-lbl">${units} unit${units!==1?'s':''}</span>` : ''}
      </div>
      <div class="got-question">${esc(question)}</div>
      <input id="got-input" class="fill-blank-input" type="number" inputmode="numeric"
        placeholder="?" style="width:100px;font-size:28px;text-align:center;font-weight:800">
    </div>`;
}


function loadLetter(lang, idx) {
  _tLang = lang;
  _tLetters = lang === 'hindi' ? HINDI_LETTERS : ENG_LETTERS;
  _tIdx = idx;

  const canvasArea = document.getElementById('canvas-area');
  const label = document.getElementById('trace-label');
  if (canvasArea) canvasArea.style.display = 'block';
  if (label) label.textContent = `Tracing: "${_tLetters[_tIdx]}"`;

  initTraceCanvas();
}

function nextTraceLetter() {
  _tIdx = (_tIdx + 1) % _tLetters.length;
  const label = document.getElementById('trace-label');
  if (label) label.textContent = `Tracing: "${_tLetters[_tIdx]}"`;
  initTraceCanvas();
}

function initTraceCanvas() {
  const canvas = document.getElementById('trace-canvas');
  if (!canvas) return;
  const letter = _tLetters[_tIdx];
  const isHindi = _tLang === 'hindi';

  const W = canvas.clientWidth || 480;
  const H = 280;
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.height = H + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  function drawGuide() {
    ctx.clearRect(0, 0, W, H);
    // Lined paper bg
    ctx.fillStyle = '#FEFCF7';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#E8DFC8'; ctx.lineWidth = 1;
    for (let y = 40; y < H; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    // Letter guide — dotted
    const fs = Math.min(W * 0.48, 170);
    ctx.font = `bold ${fs}px '${isHindi ? 'Hind' : 'Nunito'}', sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.save();
    ctx.setLineDash([5, 7]);
    ctx.strokeStyle = '#C4B5FD'; ctx.lineWidth = 5;
    ctx.strokeText(letter, W / 2, H / 2 + 8);
    ctx.restore();
    ctx.fillStyle = 'rgba(196,181,253,0.18)';
    ctx.fillText(letter, W / 2, H / 2 + 8);
    // Hint arrow
    ctx.fillStyle = '#FF8C42';
    ctx.font = 'bold 13px Nunito, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('▶ Start here', 12, 22);
  }

  drawGuide();

  // Replace canvas node to remove stale listeners
  const fresh = canvas.cloneNode(false);
  fresh.id = 'trace-canvas';
  fresh.width = canvas.width; fresh.height = canvas.height;
  fresh.style.cssText = canvas.style.cssText;
  canvas.parentNode.replaceChild(fresh, canvas);

  const fc = fresh;
  const fctx = fc.getContext('2d');
  fctx.scale(dpr, dpr);
  fctx.clearRect(0, 0, W, H);
  drawGuide.call({ _c: fc, _ctx: fctx });
  // Re-draw guide on fresh canvas
  fctx.clearRect(0, 0, W, H);
  fctx.fillStyle = '#FEFCF7'; fctx.fillRect(0, 0, W, H);
  fctx.strokeStyle = '#E8DFC8'; fctx.lineWidth = 1;
  for (let y = 40; y < H; y += 40) {
    fctx.beginPath(); fctx.moveTo(0, y); fctx.lineTo(W, y); fctx.stroke();
  }
  const fs2 = Math.min(W * 0.48, 170);
  fctx.font = `bold ${fs2}px '${isHindi ? 'Hind' : 'Nunito'}', sans-serif`;
  fctx.textAlign = 'center'; fctx.textBaseline = 'middle';
  fctx.save(); fctx.setLineDash([5, 7]);
  fctx.strokeStyle = '#C4B5FD'; fctx.lineWidth = 5;
  fctx.strokeText(letter, W / 2, H / 2 + 8); fctx.restore();
  fctx.fillStyle = 'rgba(196,181,253,0.18)'; fctx.fillText(letter, W / 2, H / 2 + 8);
  fctx.fillStyle = '#FF8C42'; fctx.font = 'bold 13px Nunito,sans-serif';
  fctx.textAlign = 'left'; fctx.fillText('▶ Start here', 12, 22);

  // Drawing mechanics
  let drawing = false, lx = 0, ly = 0;
  function pos(e) {
    const r = fc.getBoundingClientRect();
    const sx = W / r.width, sy = H / r.height;
    if (e.touches) return { x:(e.touches[0].clientX - r.left)*sx, y:(e.touches[0].clientY - r.top)*sy };
    return { x:(e.clientX - r.left)*sx, y:(e.clientY - r.top)*sy };
  }
  function stroke(x, y) {
    fctx.beginPath(); fctx.moveTo(lx, ly); fctx.lineTo(x, y);
    fctx.strokeStyle = '#6C63FF'; fctx.lineWidth = 5;
    fctx.lineCap = 'round'; fctx.lineJoin = 'round'; fctx.stroke();
    lx = x; ly = y;
  }

  fc.addEventListener('mousedown', e => { e.preventDefault(); drawing=true; const p=pos(e); lx=p.x; ly=p.y; });
  fc.addEventListener('mousemove', e => { if(!drawing)return; const p=pos(e); stroke(p.x,p.y); });
  fc.addEventListener('mouseup', () => drawing=false);
  fc.addEventListener('mouseleave', () => drawing=false);
  fc.addEventListener('touchstart', e => { e.preventDefault(); drawing=true; const p=pos(e); lx=p.x; ly=p.y; }, {passive:false});
  fc.addEventListener('touchmove',  e => { if(!drawing)return; e.preventDefault(); const p=pos(e); stroke(p.x,p.y); }, {passive:false});
  fc.addEventListener('touchend', () => drawing=false);

  // Store ctx for clear
  window._traceCtx = { ctx: fctx, W, H, letter, isHindi, dpr };
}

function clearCanvas() {
  const fc = document.getElementById('trace-canvas');
  if (!fc) return;
  initTraceCanvas(); // re-init redraws the guide
}

// ══════════════════════════════════════════════════════════════
// SCREEN: MENTOR DASHBOARD
// ══════════════════════════════════════════════════════════════
function renderMentorDashboard() {
  state.mode = 'mentor';
  const custom = getCustomWorksheets().length;
  const total  = ALL_WORKSHEETS.length + custom;

  const subCards = Object.values(SUBJECTS).map(sub => {
    const count = getWorksheetList(sub.id).length;
    return `
      <button class="mentor-subject-card" onclick="navigate('/mentor/subject/${sub.id}')" id="msub-${sub.id}">
        <div class="sub-icon" style="background:${sub.light}"><span style="font-size:24px">${sub.emoji}</span></div>
        <div class="sub-info">
          <div class="sub-name">${sub.name}</div>
          <div class="sub-count">${count} worksheets</div>
        </div>
      </button>`;
  }).join('');

  setApp(`
    <div class="mentor-screen screen">
      <div class="mentor-dashboard-hero">
        <div class="dashboard-greeting">Welcome, <span>Mentor!</span> 👋</div>
        <div class="dashboard-subtitle">UKG-C · Term 1 Examination Preparation</div>
        <div class="dashboard-stats">
          <div class="dashboard-stat"><div class="stat-number">${total}</div><div class="stat-label">Total Sheets</div></div>
          <div class="dashboard-stat"><div class="stat-number">${custom}</div><div class="stat-label">My Sheets</div></div>
          <div class="dashboard-stat"><div class="stat-number">5</div><div class="stat-label">Subjects</div></div>
        </div>
      </div>
      <div class="mentor-body">
        <div class="mentor-section-header">
          <div class="mentor-section-title">📚 Subjects</div>
        </div>
        <div class="mentor-subject-grid">${subCards}</div>
        <div style="margin-top:24px">
          <div class="mentor-section-title" style="margin-bottom:12px">⚡ Quick Actions</div>
          <div style="display:flex;flex-wrap:wrap;gap:12px">
            <button class="btn btn-primary" onclick="navigate('/mentor/builder')" id="btn-create-ws">+ Create Worksheet</button>
            <button class="btn btn-dark" onclick="navigate('/')" id="btn-switch-child">👶 Switch to Child</button>
          </div>
        </div>
      </div>
    </div>
  `);
}

// ══════════════════════════════════════════════════════════════
// SCREEN: MENTOR SUBJECT VIEW
// ══════════════════════════════════════════════════════════════
function renderMentorSubject(subjectId) {
  const sub = SUBJECTS[subjectId];
  if (!sub) return navigate('/mentor');
  const wsList   = getWorksheetList(subjectId);
  const progress = getProgress();
  const customIds = getCustomWorksheets().map(w => w.id);

  const cards = wsList.map((ws, idx) => {
    const p = progress[ws.id];
    const isCustom = customIds.includes(ws.id);
    return `
      <div class="mentor-worksheet-card" id="mwc-${ws.id}">
        <div class="mwc-num" style="background:${sub.color}">${idx + 1}</div>
        <div class="mwc-info">
          <div class="mwc-title">${esc(ws.title)}</div>
          <div class="mwc-meta">
            ${badge(ws.difficulty)}
            <span>${ws.questions.length} Q</span>
            ${p ? `<span style="color:#43D9A2">✓ ${p.pct}%</span>` : ''}
            ${isCustom ? '<span style="color:#FF8C42">Custom</span>' : ''}
          </div>
        </div>
        <div class="mwc-actions">
          <button class="icon-btn print" onclick="navigate('/mentor/print/${ws.id}')" title="Print" id="print-${ws.id}">🖨</button>
          ${isCustom ? `
            <button class="icon-btn" onclick="navigate('/mentor/builder/${ws.id}')" title="Edit" id="edit-${ws.id}">✏️</button>
            <button class="icon-btn danger" onclick="confirmDeleteWS('${ws.id}')" title="Delete" id="del-${ws.id}">🗑</button>
          ` : ''}
        </div>
      </div>`;
  }).join('');

  setApp(`
    <div class="mentor-screen screen">
      <div class="mentor-header">
        <button class="back-btn" onclick="navigate('/mentor')" id="btn-back-msub">←</button>
        <h1>${sub.emoji} ${sub.name}</h1>
      </div>
      <div class="mentor-worksheet-list">
        ${cards || `<div class="empty-state" style="color:var(--dark-text-secondary)"><div class="empty-icon">📭</div><h3>No worksheets yet</h3><p>Create the first worksheet for this subject!</p></div>`}
      </div>
      <button class="fab" onclick="navigate('/mentor/builder')" id="btn-fab" title="Create">+</button>
    </div>
  `);
}

function confirmDeleteWS(id) {
  if (confirm('Delete this worksheet? This cannot be undone.')) {
    deleteCustomWorksheet(id);
    showToast('Worksheet deleted', 'success');
    const segs = window.location.hash.replace('#/','').split('/');
    if (segs[1] === 'subject') renderMentorSubject(segs[2]);
    else navigate('/mentor');
  }
}

// ══════════════════════════════════════════════════════════════
// SCREEN: MENTOR BUILDER
// ══════════════════════════════════════════════════════════════
function renderBuilder(editId) {
  if (editId) {
    const existing = getCustomWorksheets().find(w => w.id === editId);
    if (existing) {
      state.builder = { editId, title: existing.title, subject: existing.subject,
        difficulty: existing.difficulty, description: existing.description || '',
        questions: [...existing.questions], addingType: 'MCQ' };
    }
  } else {
    state.builder = { editId: null, title: '', subject: 'english', difficulty: 'easy',
      description: '', questions: [], addingType: 'MCQ' };
  }
  _renderBuilderUI();
}

function _renderBuilderUI() {
  const b = state.builder;
  const qList = b.questions.map((q, i) => `
    <div class="built-q-card" id="bq-${i}">
      <div class="built-q-idx">${i + 1}</div>
      <div class="built-q-text">${esc(q.text)}</div>
      <div class="built-q-type">${q.type}</div>
      <button class="icon-btn danger" onclick="removeBuilderQ(${i})" id="rm-${i}">✕</button>
    </div>`).join('');

  const qFormHtml = _renderQForm(b.addingType);

  setApp(`
    <div class="builder-screen mentor-screen screen">
      <div class="mentor-header">
        <button class="back-btn" onclick="navigate('/mentor')" id="btn-back-builder">←</button>
        <h1>${b.editId ? '✏️ Edit Worksheet' : '+ New Worksheet'}</h1>
      </div>
      <div class="builder-body">
        <div class="builder-section-header">Worksheet Details</div>
        <div class="form-group">
          <label class="form-label">Title *</label>
          <input class="form-input" id="b-title" type="text" placeholder="e.g., Addition Practice" value="${esc(b.title)}" oninput="state.builder.title=this.value">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div class="form-group">
            <label class="form-label">Subject</label>
            <select class="form-select" id="b-subject" onchange="state.builder.subject=this.value">
              ${Object.values(SUBJECTS).map(s => `<option value="${s.id}" ${b.subject===s.id?'selected':''}>${s.emoji} ${s.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Difficulty</label>
            <select class="form-select" id="b-difficulty" onchange="state.builder.difficulty=this.value">
              <option value="easy"   ${b.difficulty==='easy'?'selected':''}>🟢 Easy</option>
              <option value="medium" ${b.difficulty==='medium'?'selected':''}>🟡 Medium</option>
              <option value="hard"   ${b.difficulty==='hard'?'selected':''}>🔴 Hard</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Description (optional)</label>
          <input class="form-input" id="b-desc" type="text" placeholder="Brief description" value="${esc(b.description)}" oninput="state.builder.description=this.value">
        </div>

        <div class="builder-section-header">Add Questions (${b.questions.length} added)</div>
        <div class="q-type-grid">
          ${[{t:'MCQ',i:'🔘',l:'MCQ'},{t:'TRUE_FALSE',i:'✅',l:'True/False'},{t:'FILL_BLANK',i:'___',l:'Fill Blank'}].map(x => `
            <button class="q-type-btn ${b.addingType===x.t?'active':''}" onclick="setBuilderQType('${x.t}')" id="qt-${x.t}">
              <span class="q-icon">${x.i}</span>${x.l}
            </button>`).join('')}
        </div>

        ${qFormHtml}

        ${b.questions.length > 0 ? `
          <div class="builder-section-header">Questions Added</div>
          <div class="questions-in-builder">${qList}</div>` : ''}

        <button class="btn btn-primary btn-full" style="margin-top:16px" onclick="saveBuilderWS()" id="btn-save-ws">
          💾 ${b.editId ? 'Update Worksheet' : 'Save Worksheet'}
        </button>
      </div>
    </div>
  `);
}

function _renderQForm(type) {
  if (type === 'MCQ') return `
    <div class="q-builder-card">
      <div class="q-builder-header"><span class="q-num-badge">MCQ Question</span></div>
      <div class="form-group">
        <label class="form-label">Question Text *</label>
        <input class="form-input" id="qf-q" type="text" placeholder="Type the question…">
      </div>
      <div class="form-group">
        <label class="form-label">Options (select the correct one)</label>
        ${['A','B','C','D'].map((l,i) => `
          <div class="mcq-option-row">
            <input type="radio" name="correct-opt" class="correct-radio" value="${l}" id="co-${l}">
            <span class="opt-label">${l}</span>
            <input class="form-input" style="height:40px;flex:1" id="qf-opt-${l}" type="text" placeholder="Option ${l}…">
          </div>`).join('')}
      </div>
      <div class="form-group">
        <label class="form-label">Hint (optional)</label>
        <input class="form-input" id="qf-hint" type="text" placeholder="A helpful hint…">
      </div>
      <button class="btn btn-secondary btn-sm" onclick="addBuilderQ('MCQ')" id="btn-add-mcq">+ Add This Question</button>
    </div>`;

  if (type === 'TRUE_FALSE') return `
    <div class="q-builder-card">
      <div class="q-builder-header"><span class="q-num-badge">True / False</span></div>
      <div class="form-group">
        <label class="form-label">Statement *</label>
        <input class="form-input" id="qf-q" type="text" placeholder="Type a True or False statement…">
      </div>
      <div class="form-group">
        <label class="form-label">Correct Answer</label>
        <div style="display:flex;gap:16px">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;color:var(--dark-text-primary)">
            <input type="radio" name="tf-ans" value="true" id="tf-t" style="accent-color:var(--accent)"> True
          </label>
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;color:var(--dark-text-primary)">
            <input type="radio" name="tf-ans" value="false" id="tf-f" style="accent-color:var(--danger)"> False
          </label>
        </div>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="addBuilderQ('TRUE_FALSE')" id="btn-add-tf">+ Add This Question</button>
    </div>`;

  if (type === 'FILL_BLANK') return `
    <div class="q-builder-card">
      <div class="q-builder-header"><span class="q-num-badge">Fill in the Blank</span></div>
      <div class="form-group">
        <label class="form-label">Question / Sentence *</label>
        <input class="form-input" id="qf-q" type="text" placeholder='e.g., "The cat sat on the ___."'>
      </div>
      <div class="form-group">
        <label class="form-label">Correct Answer *</label>
        <input class="form-input" id="qf-ans" type="text" placeholder="The word that fills the blank…">
      </div>
      <div class="form-group">
        <label class="form-label">Hint (optional)</label>
        <input class="form-input" id="qf-hint" type="text" placeholder="A helpful hint…">
      </div>
      <button class="btn btn-secondary btn-sm" onclick="addBuilderQ('FILL_BLANK')" id="btn-add-fb">+ Add This Question</button>
    </div>`;
  return '';
}

function setBuilderQType(type) { state.builder.addingType = type; _renderBuilderUI(); }

function addBuilderQ(type) {
  const qtxt = ($('#qf-q') || {}).value || '';
  if (!qtxt.trim()) { showToast('Please enter the question text', 'error'); return; }
  const q = { id: `cq_${Date.now()}`, type, text: qtxt.trim(), marks: 1 };

  if (type === 'MCQ') {
    const opts = ['A','B','C','D'].map(l => ($(`#qf-opt-${l}`) || {}).value || '').filter(Boolean);
    if (opts.length < 2) { showToast('Please add at least 2 options', 'error'); return; }
    const chk = document.querySelector('input[name="correct-opt"]:checked');
    if (!chk) { showToast('Please mark the correct option', 'error'); return; }
    q.options = opts;
    q.answer = opts[['A','B','C','D'].indexOf(chk.value)];
    const hint = ($('#qf-hint') || {}).value;
    if (hint) q.hint = hint.trim();
  } else if (type === 'TRUE_FALSE') {
    const chk = document.querySelector('input[name="tf-ans"]:checked');
    if (!chk) { showToast('Please select True or False', 'error'); return; }
    q.answer = chk.value === 'true';
  } else if (type === 'FILL_BLANK') {
    const ans = ($('#qf-ans') || {}).value || '';
    if (!ans.trim()) { showToast('Please enter the correct answer', 'error'); return; }
    q.answer = ans.trim();
    const hint = ($('#qf-hint') || {}).value;
    if (hint) q.hint = hint.trim();
  }

  state.builder.questions.push(q);
  showToast(`Question ${state.builder.questions.length} added!`, 'success');
  _renderBuilderUI();
}

function removeBuilderQ(idx) {
  state.builder.questions.splice(idx, 1);
  _renderBuilderUI();
}

function saveBuilderWS() {
  const b = state.builder;
  const title = ($('#b-title') || {}).value || b.title;
  const subject = ($('#b-subject') || {}).value || b.subject;
  const difficulty = ($('#b-difficulty') || {}).value || b.difficulty;
  const description = ($('#b-desc') || {}).value || b.description;

  if (!title.trim()) { showToast('Please enter a worksheet title', 'error'); return; }
  if (b.questions.length === 0) { showToast('Please add at least 1 question', 'error'); return; }

  const ws = {
    id: b.editId || `custom_${Date.now()}`,
    subject, difficulty, topic: 'Custom',
    title: title.trim(),
    description: description.trim(),
    estimatedTime: Math.max(5, Math.floor(b.questions.length * 1.5)),
    questions: b.questions,
    isCustom: true,
    createdAt: new Date().toISOString(),
  };
  saveCustomWorksheet(ws);
  showToast('Worksheet saved! 🎉', 'success');
  setTimeout(() => navigate(`/mentor/subject/${subject}`), 1000);
}

// ══════════════════════════════════════════════════════════════
// SCREEN: PRINT VIEW
// ══════════════════════════════════════════════════════════════
let _ansKeyVisible = false;

function renderPrint(worksheetId) {
  const ws  = getWorksheet(worksheetId);
  if (!ws) return navigate('/mentor');
  const sub = SUBJECTS[ws.subject] || {};
  _ansKeyVisible = false;

  const questionsHtml = ws.questions.map((q, i) => {
    let ansArea = '';
    if (q.type === 'MCQ') {
      ansArea = `<div class="print-options">${q.options.map((o, oi) =>
        `<div class="print-option">○ ${String.fromCharCode(97+oi)}) ${esc(o)}</div>`).join('')}</div>`;
    } else if (q.type === 'TRUE_FALSE') {
      ansArea = `<div class="print-tf-row"><span class="print-circle">True</span><span class="print-circle">False</span></div>`;
    } else {
      ansArea = `<div class="print-answer-line"></div><div class="print-answer-line"></div>`;
    }
    return `
      <div class="print-question">
        <span class="print-q-num">Q${i+1}.</span>
        <div class="print-q-text">${esc(q.text)}</div>
        ${ansArea}
        <div id="ak-${i}" class="print-answer-key" style="display:none;font-size:12px;color:#43D9A2;margin-top:4px">
          ✓ Answer: ${esc(String(q.answer))}
        </div>
      </div>`;
  }).join('');

  setApp(`
    <div class="print-view">
      <div class="no-print" style="position:fixed;top:0;left:0;right:0;background:var(--dark-surface-1);
        border-bottom:1px solid var(--dark-border);padding:12px 16px;display:flex;align-items:center;gap:12px;z-index:200">
        <button class="btn btn-dark btn-sm" onclick="navigate('/mentor/subject/${ws.subject}')" id="btn-back-print">← Back</button>
        <span style="flex:1;color:var(--dark-text-primary);font-size:14px;font-weight:600">Print Preview: ${esc(ws.title)}</span>
        <button class="btn btn-dark btn-sm" onclick="toggleAnswerKey()" id="btn-tog-key">👁 Show Answer Key</button>
        <button class="btn btn-primary btn-sm" onclick="window.print()" id="btn-print">🖨 Print</button>
      </div>
      <div style="height:60px" class="no-print"></div>

      <div class="print-header">
        <div class="print-school-name">Vardhman Srikalyan International School</div>
        <div class="print-ws-title">${esc(ws.title)}</div>
        <div class="print-ws-meta">Class: UKG-C &nbsp;·&nbsp; Subject: ${esc(sub.name||'')} &nbsp;·&nbsp; Difficulty: ${esc(ws.difficulty)} &nbsp;·&nbsp; Total Questions: ${ws.questions.length}</div>
      </div>
      <div class="print-student-row">
        <div><div class="print-field-label">Name</div><div class="print-field"></div></div>
        <div><div class="print-field-label">Date</div><div class="print-field"></div></div>
      </div>
      ${questionsHtml}
      <div class="print-footer">
        Generated by KidWorksheets &nbsp;·&nbsp; Vardhman Srikalyan International School &nbsp;·&nbsp; UKG-C Term 1 · 2026–27
      </div>
    </div>
  `);
}

function toggleAnswerKey() {
  _ansKeyVisible = !_ansKeyVisible;
  $$('.print-answer-key').forEach(el => { el.style.display = _ansKeyVisible ? 'block' : 'none'; });
  const btn = $('#btn-tog-key');
  if (btn) btn.textContent = _ansKeyVisible ? '🙈 Hide Answer Key' : '👁 Show Answer Key';
}

// ══════════════════════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════════════════════
let _toastT = null;
function showToast(msg, type='') {
  let t = document.getElementById('kw-toast');
  if (!t) { t = document.createElement('div'); t.id='kw-toast'; t.className='toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = `toast ${type}`;
  setTimeout(() => t.classList.add('show'), 10);
  if (_toastT) clearTimeout(_toastT);
  _toastT = setTimeout(() => t.classList.remove('show'), 2800);
}

// ══════════════════════════════════════════════════════════════
// PWA INSTALL PROMPT
// ══════════════════════════════════════════════════════════════
let _deferredInstall = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); _deferredInstall = e;
  setTimeout(showInstallBanner, 3000);
});
function showInstallBanner() {
  if (document.getElementById('kw-install')) return;
  const b = document.createElement('div');
  b.id = 'kw-install'; b.className = 'install-banner';
  b.innerHTML = `
    <span class="install-icon">📲</span>
    <div class="install-info">
      <div class="install-title">Install KidWorksheets</div>
      <div class="install-sub">Add to home screen for offline use</div>
    </div>
    <button class="btn btn-primary btn-sm" onclick="installPWA()" id="btn-install">Install</button>
    <button style="background:none;border:none;color:var(--dark-text-muted);font-size:18px;cursor:pointer;padding:0 8px" onclick="this.parentNode.remove()" id="btn-dismiss-install">✕</button>`;
  document.body.appendChild(b);
  setTimeout(() => b.classList.add('show'), 100);
}
function installPWA() {
  if (!_deferredInstall) return;
  _deferredInstall.prompt();
  _deferredInstall.userChoice.then(r => {
    if (r.outcome === 'accepted') showToast('KidWorksheets installed! 🎉', 'success');
    _deferredInstall = null;
    const b = document.getElementById('kw-install');
    if (b) b.remove();
  });
}
window.addEventListener('appinstalled', () => {
  const b = document.getElementById('kw-install'); if (b) b.remove();
  showToast('App installed successfully!', 'success');
});

// ══════════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════════
function init() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(r => console.log('[KW] SW registered:', r.scope))
      .catch(e => console.warn('[KW] SW registration failed:', e));
  }
  window.addEventListener('hashchange', router);
  router();
}

window.addEventListener('DOMContentLoaded', init);
