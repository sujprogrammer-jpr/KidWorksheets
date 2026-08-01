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
  if (question.type === 'MCQ')        qBody = renderMCQ(question);
  else if (question.type === 'TRUE_FALSE') qBody = renderTrueFalse(question);
  else if (question.type === 'FILL_BLANK') qBody = renderFillBlank(question);
  else if (question.type === 'CATEGORIZE') qBody = renderCategorize(question);
  else qBody = renderMCQ(question);

  const checkDisabled = (question.type !== 'FILL_BLANK' && state.player.selectedOption === null);

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
const ENG_LETTERS  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const HINDI_LETTERS = ['अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ','क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह'];

let _tLang = 'english', _tLetters = ENG_LETTERS, _tIdx = 0;

function renderTracingPractice(lang) {
  const letters   = lang === 'hindi' ? HINDI_LETTERS : ENG_LETTERS;
  const langLabel = lang === 'hindi' ? 'Hindi' : 'English';
  const fontFam   = lang === 'hindi' ? 'Hind' : 'Nunito';

  setApp(`
    <div class="child-screen screen">
      <div class="child-header">
        <button class="back-btn" onclick="navigate('/child')" id="btn-back-trace">◀</button>
        <h1>✏️ ${langLabel} Letter Tracing</h1>
      </div>
      <div style="padding:16px;font-family:Nunito,sans-serif">
        <div style="font-size:14px;color:#7A7A8A;margin-bottom:12px">Tap a letter to trace it!</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px">
          ${letters.map((l, i) => `
            <button onclick="loadLetter('${lang}',${i})" id="lb-${i}"
              style="width:44px;height:44px;border-radius:10px;border:2px solid #E8DFC8;background:white;
              font-family:${fontFam},sans-serif;font-size:${lang==='hindi'?'16':'20'}px;font-weight:700;
              cursor:pointer;color:#2D2D3A;transition:all 150ms">${l}</button>`).join('')}
        </div>
        <div id="canvas-area" style="display:none">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <div id="trace-label" style="font-size:22px;font-weight:800;color:#6C63FF;font-family:Nunito,sans-serif"></div>
            <div style="display:flex;gap:8px">
              <button onclick="clearCanvas()" id="btn-clear-trace"
                style="padding:8px 16px;border-radius:999px;border:1.5px solid #E8DFC8;background:white;font-family:Nunito,sans-serif;font-size:13px;font-weight:600;cursor:pointer">🗑 Clear</button>
              <button onclick="nextTraceLetter()" id="btn-next-trace"
                style="padding:8px 16px;border-radius:999px;background:#6C63FF;color:white;border:none;font-family:Nunito,sans-serif;font-size:13px;font-weight:600;cursor:pointer">Next →</button>
            </div>
          </div>
          <div style="border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(108,99,255,0.12);background:white;max-width:480px">
            <canvas id="trace-canvas" style="display:block;touch-action:none;width:100%;height:280px"></canvas>
          </div>
          <div style="font-size:12px;color:#7A7A8A;text-align:center;margin-top:8px">✏️ Use your finger or mouse to trace the letter</div>
        </div>
      </div>
    </div>
  `);
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
