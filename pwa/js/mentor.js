// KidWorksheets PWA — Mentor Module
// Provides: renderMentorDashboard, renderMentorSubject, renderBuilder, renderPrint
'use strict';

// ── Question type catalogue ───────────────────────────────────
const QUESTION_TYPES = [
  { type:'MCQ',               emoji:'🔵', label:'Choice Question',       desc:'4 options, one correct answer' },
  { type:'TRUE_FALSE',        emoji:'✅', label:'True / False',          desc:'Is the statement true or false?' },
  { type:'FILL_BLANK',        emoji:'✏️', label:'Fill in the Blank',     desc:'Type the missing word or number' },
  { type:'MATCH',             emoji:'🔗', label:'Match the Following',   desc:'Connect text pairs in two columns' },
  { type:'MATCH_IMAGE',       emoji:'🖼️', label:'Match Image & Word',    desc:'Connect images/emojis to matching words' },
  { type:'CIRCLE_FIND',       emoji:'⭕', label:'Circle / Tick',         desc:'Tap all correct items in a group' },
  { type:'DRAG_SLOT',         emoji:'🎯', label:'Drag to Fill Slot',     desc:'Pick a tile and fill the blank' },
  { type:'ARRANGE',           emoji:'🔢', label:'Arrange in Order',      desc:'Put items in correct sequence' },
  { type:'SEQUENCE_NEXT',     emoji:'➡️', label:'Write Next',            desc:'What comes NEXT in the series?' },
  { type:'SEQUENCE_PREV',     emoji:'⬅️', label:'Write Previous',        desc:'What comes BEFORE in the series?' },
  { type:'WORD_BUILD',        emoji:'🔤', label:'Build the Word',        desc:'Tap letters to spell a word' },
  { type:'WORD_FIRST_LETTER', emoji:'🔤', label:'First Letter',          desc:'Choose correct starting letter' },
  { type:'UNSCRAMBLE',        emoji:'🔀', label:'Unscramble Letters',    desc:'Rearrange scrambled letters' },
  { type:'AUDIO_CLIP',        emoji:'🔊', label:'Audio Clip Q&A',        desc:'Listen to audio clip and answer' },
  { type:'VOWEL_SORT',        emoji:'🔤', label:'Vowel Sound Sort',      desc:'Circle or sort words by vowel sound', subjectOnly:['english','hindi'] },
  { type:'TEXT_HIGHLIGHT',    emoji:'🖍️', label:'Highlight Text',        desc:'Read passage and tap target words' },
  { type:'PICTURE_WRITE',     emoji:'🖼️', label:'Picture Writing',      desc:'See emoji/picture and write answer' },
  { type:'AUDIO_WRITE',       emoji:'🗣️', label:'Listen & Write (TTS)',  desc:'Browser speaks word, child types it' },
  { type:'NUMBER_WRITE',      emoji:'🔢', label:'Number Name Write',     desc:'Digit shown, write number name word' },
  { type:'GROUPS_OF_TENS',    emoji:'🎲', label:'Groups of Tens',        desc:'Count 10-blocks and units' },
  { type:'READ_AND_ANSWER',   emoji:'📖', label:'Read & Answer',         desc:'Read short passage then answer' },
];


let _audioDataUrl    = null;
let _matchPairCount  = 4;
let _micRecorder     = null;
let _micChunks       = [];
let _micRecording    = false;


// ══════════════════════════════════════════════════════════════
// MENTOR DASHBOARD
// ══════════════════════════════════════════════════════════════
function renderMentorDashboard() {
  state.mode = 'mentor';
  const custom   = getCustomWorksheets();
  const allTotal = ALL_WORKSHEETS.length + custom.length;
  const progress = Object.keys(getProgress()).length;

  const subCards = Object.values(SUBJECTS).map(sub => {
    const count = getWorksheetList(sub.id).length;
    const done  = Object.keys(getProgress()).filter(id => {
      const ws = getWorksheet(id);
      return ws && ws.subject === sub.id;
    }).length;
    return `
      <button class="mentor-sub-card" onclick="navigate('/mentor/subject/${sub.id}')" id="msub-${sub.id}">
        <div class="msc-icon" style="background:${sub.light}">${sub.emoji}</div>
        <div class="msc-info">
          <div class="msc-name">${sub.name}</div>
          <div class="msc-count">${count} worksheets · ${done} done</div>
        </div>
        <div class="msc-arrow">›</div>
      </button>`;
  }).join('');

  const customCards = custom.length === 0
    ? `<div class="mentor-empty">No custom worksheets yet.<br>Tap <strong>+ Create</strong> to make your first one!</div>`
    : custom.map(ws => `
        <div class="mentor-custom-card">
          <div class="mcc-info">
            <div class="mcc-title">${esc(ws.title)}</div>
            <div class="mcc-meta">${SUBJECTS[ws.subject]?.emoji || '📄'} ${ws.questions.length} Q · ${ws.difficulty || 'easy'}</div>
          </div>
          <div class="mcc-actions">
            <button onclick="navigate('/mentor/builder/${ws.id}')" id="medit-${ws.id}">✏️ Edit</button>
            <button onclick="navigate('/child/play/${ws.id}')" id="mplay-${ws.id}">▶ Play</button>
            <button onclick="navigate('/mentor/print/${ws.id}')" id="mprint-${ws.id}">🖨 Print</button>
            <button onclick="mentorDeleteWs('${ws.id}')" id="mdel-${ws.id}" class="mcc-del">🗑</button>
          </div>
        </div>`).join('');

  setApp(`
    <div class="mentor-screen screen">
      <div class="mentor-header">
        <button class="back-btn" onclick="navigate('/')" id="btn-back-mentor">◀</button>
        <div>
          <div class="mentor-header-title">👩‍🏫 Mentor Dashboard</div>
          <div class="mentor-header-sub">${allTotal} worksheets · ${progress} sessions completed</div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-secondary btn-sm" onclick="navigate('/mentor/trace-report')" id="btn-trace-rep">📈 Reports</button>
          <button class="btn btn-primary btn-sm" onclick="navigate('/mentor/builder')" id="btn-new-ws">+ New Worksheet</button>
        </div>
      </div>

      <div class="mentor-body">
        <div class="mentor-stats-row">
          <div class="mentor-stat"><div class="ms-val">${allTotal}</div><div class="ms-lbl">Total Sheets</div></div>
          <div class="mentor-stat"><div class="ms-val">${custom.length}</div><div class="ms-lbl">Custom Created</div></div>
          <div class="mentor-stat"><div class="ms-val">${progress}</div><div class="ms-lbl">Sessions Done</div></div>
        </div>

        <div class="mentor-section-label">📚 Browse by Subject</div>
        <div class="mentor-sub-list">${subCards}</div>

        <div class="mentor-section-label" style="margin-top:20px">
          ✨ My Custom Worksheets
          <button onclick="navigate('/mentor/builder')" class="btn btn-sm btn-primary" id="btn-add-custom" style="float:right">+ Create</button>
        </div>
        <div class="mentor-custom-list">${customCards}</div>
      </div>
    </div>
  `);
}

function mentorDeleteWs(id) {
  if (confirm('Delete this worksheet? This cannot be undone.')) {
    deleteCustomWorksheet(id);
    renderMentorDashboard();
  }
}

// ══════════════════════════════════════════════════════════════
// MENTOR SUBJECT VIEW
// ══════════════════════════════════════════════════════════════
function renderMentorSubject(subjectId) {
  const sub  = SUBJECTS[subjectId] || {};
  const list = getWorksheetList(subjectId);
  const prog = getProgress();

  const tracingCardMap = {
    english: { title: '✏️ English Alphabet Tracing Worksheet (4-Lines)', desc: '4-Line English Notebook Tracing Module', sheet: '4-Line Notebook' },
    hindi:   { title: '✏️ Hindi Swar & Vyanjan Tracing Worksheet (3-Lines / 2-Lines)', desc: '3-Line / 2-Line Hindi Notebook Tracing Module', sheet: '3-Line Notebook' },
    maths:   { title: '✏️ Number & Digit Tracing Worksheet (Math Boxes / Grid)', desc: 'Math Grid Box Tracing Module', sheet: 'Math Grid Notebook' },
    ga:      { title: '✏️ Letter & Number Tracing Practice', desc: 'Interactive Lined Paper Tracing Module', sheet: 'Interactive Canvas' },
    art:     { title: '✏️ Freehand Drawing & Tracing Canvas', desc: 'Blank Canvas Drawing & Tracing Module', sheet: 'Blank Canvas' }
  };
  const tInfo = tracingCardMap[subjectId] || tracingCardMap.english;

  const tracingRow = `
    <div class="mentor-ws-row" style="border:2px solid var(--primary);background:var(--dark-surface-2)">
      <div class="mwr-info">
        <div class="mwr-title" style="color:var(--primary-light);font-weight:800">${esc(tInfo.title)}</div>
        <div class="mwr-meta">${esc(tInfo.desc)} · <span class="badge badge-easy" style="background:var(--primary);color:white">${tInfo.sheet}</span></div>
      </div>
      <div class="mwr-actions">
        <button onclick="navigate('/child/trace/${subjectId}')" id="mtr-${subjectId}">✏️ Open Practice</button>
      </div>
    </div>`;

  const rows = list.map(ws => {
    const p   = prog[ws.id];
    const pct = p ? p.pct : null;
    return `
      <div class="mentor-ws-row">
        <div class="mwr-info">
          <div class="mwr-title">${esc(ws.title)}</div>
          <div class="mwr-meta">${ws.questions.length} Q · ${ws.difficulty || 'easy'}
            ${pct !== null ? ` · <span style="color:var(--accent);font-weight:700">${pct}% ✓</span>` : ''}
          </div>
        </div>
        <div class="mwr-actions">
          <button onclick="navigate('/mentor/builder/${ws.id}')" id="mwe-${ws.id}">✏️ Edit</button>
          <button onclick="navigate('/child/play/${ws.id}')" id="mwp-${ws.id}">▶ Play</button>
          <button onclick="navigate('/mentor/print/${ws.id}')" id="mwpr-${ws.id}">🖨 Print</button>
        </div>
      </div>`;
  }).join('');

  setApp(`
    <div class="mentor-screen screen">
      <div class="mentor-header">
        <button class="back-btn" onclick="navigate('/mentor')" id="btn-back-msub">◀</button>
        <div>
          <div class="mentor-header-title">${sub.emoji} ${sub.name}</div>
          <div class="mentor-header-sub">${list.length} worksheets</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="navigate('/mentor/builder')" id="btn-add-msub">+ New</button>
      </div>
      <div class="mentor-body">
        <div class="mentor-ws-list">
          ${tracingRow}
          ${rows}
        </div>
      </div>
    </div>
  `);
}

// ══════════════════════════════════════════════════════════════
// WORKSHEET BUILDER
// ══════════════════════════════════════════════════════════════
function renderBuilder(editId) {
  if (editId) {
    const existing = getWorksheet(editId);
    if (existing) {
      const qs = JSON.parse(JSON.stringify(existing.questions || []));
      const activeSheetType = existing.sheetType || (qs[0] ? qs[0].sheetType : '4-line');
      const activeComments  = existing.comments  || (qs[0] ? qs[0].comments  : '');
      const activeSample    = existing.sampleText|| (qs[0] ? qs[0].sampleText: '');

      if (existing.subject === 'tuition' && qs[0]) {
        qs[0].sheetType  = activeSheetType;
        qs[0].comments   = activeComments;
        qs[0].sampleText = activeSample;
      }

      state.builder = {
        editId,
        title:       existing.title || '',
        subject:     existing.subject || 'english',
        difficulty:  existing.difficulty || 'easy',
        description: existing.description || '',
        sheetType:   activeSheetType,
        comments:    activeComments,
        sampleText:  activeSample,
        questions:   qs,
        addingType:  'MCQ',
        editingIndex: null,
      };
    }
  } else if (!state.builder || state.builder.editId !== null) {
    state.builder = {
      editId: null, title: '', subject: 'english',
      difficulty: 'easy', description: '', sheetType: '4-line', comments: '', sampleText: '', questions: [], addingType: 'MCQ',
      editingIndex: null,
    };
  }
  _audioDataUrl   = null;
  _matchPairCount = 4;
  _renderBuilderUI();
}

function _renderBuilderUI() {
  const b  = state.builder;
  const qs = b.questions;

  const subjectOpts = Object.values(SUBJECTS).map(s =>
    `<option value="${s.id}" ${b.subject===s.id?'selected':''}>${s.emoji} ${s.name}</option>`
  ).join('');
  const diffOpts = ['easy','medium','hard'].map(d =>
    `<option value="${d}" ${b.difficulty===d?'selected':''}>${d.charAt(0).toUpperCase()+d.slice(1)}</option>`
  ).join('');

  const currSheetType = b.sheetType || b.questions[0]?.sheetType || '4-line';
  const currComments  = b.comments  || b.questions[0]?.comments  || '';
  const currSample    = b.sampleText|| b.questions[0]?.sampleText|| '';

  const sheetTypeOpts = [
    { val: '4-line', label: '📝 4-Line Notebook Sheet (English Pattern)' },
    { val: '3-line', label: '🇮🇳 3-Line Notebook Sheet (Hindi Pattern with Shiro-rekha)' },
    { val: '2-line', label: '✍️ 2-Line Notebook Sheet (Hindi Pattern)' },
    { val: '1-line', label: '📄 Single Line Notebook Sheet' },
    { val: 'grid',   label: '🔢 Math Grid Square Boxes (Maths Pattern)' },
    { val: 'blank',  label: '🎨 Blank Writing & Drawing Canvas' }
  ].map(opt => `<option value="${opt.val}" ${currSheetType === opt.val ? 'selected' : ''}>${opt.label}</option>`).join('');

  const qList = qs.map((q, i) => `
    <div class="builder-q-row" id="bqr-${i}">
      <div class="bqr-num">${i+1}</div>
      <div class="bqr-info">
        <div class="bqr-type">${_qtEmoji(q.type)} ${_qtLabel(q.type)}</div>
        <div class="bqr-text">${esc((q.text||'').slice(0,70))}${(q.text||'').length>70?'…':''}</div>
      </div>
      <div class="bqr-actions">
        <button onclick="builderMoveUp(${i})"   title="Move Up"   id="bqu-${i}" ${i===0?'disabled':''}>↑</button>
        <button onclick="builderMoveDown(${i})" title="Move Down" id="bqd-${i}" ${i===qs.length-1?'disabled':''}>↓</button>
        <button onclick="builderEditQuestion(${i})" title="Edit Question" id="bqedit-${i}" class="bq-edit-btn">✏️ Edit</button>
        <button onclick="builderDeleteQ(${i})"  title="Delete"    id="bqdel-${i}" class="bq-del-btn">🗑</button>
      </div>
    </div>`).join('');

  setApp(`
    <div class="mentor-screen screen">
      <div class="mentor-header">
        <button class="back-btn" onclick="navigate('/mentor')" id="btn-back-builder">◀</button>
        <div class="mentor-header-title">${b.editId ? '✏️ Edit Worksheet' : '✨ Create Worksheet'}</div>
        <button class="btn btn-accent btn-sm" onclick="saveBuilderWorksheet()" id="btn-save-ws">💾 Save Worksheet</button>
      </div>

      <div class="mentor-body">
        <!-- ── Worksheet metadata ──────────────────────── -->
        <div class="builder-meta-card">
          <div class="builder-field">
            <label for="ws-title">Worksheet Title *</label>
            <input id="ws-title" class="builder-input" placeholder="e.g. Vowels Practice"
              value="${esc(b.title)}" oninput="state.builder.title=this.value">
          </div>
          <div class="builder-row-2">
            <div class="builder-field">
              <label for="ws-subject">Subject</label>
              <select id="ws-subject" class="builder-select" onchange="state.builder.subject=this.value; _renderBuilderUI();">${subjectOpts}</select>
            </div>
            <div class="builder-field">
              <label for="ws-diff">Difficulty</label>
              <select id="ws-diff" class="builder-select" onchange="state.builder.difficulty=this.value">${diffOpts}</select>
            </div>
          </div>
          <div class="builder-field">
            <label for="ws-desc">Description / Instructions (optional)</label>
            <input id="ws-desc" class="builder-input" placeholder="e.g. Write letters A to Z in capital letters"
              value="${esc(b.description)}" oninput="state.builder.description=this.value">
          </div>
        </div>

        ${b.subject === 'tuition' ? `
          <div class="builder-meta-card" style="margin-top:14px;border:2px solid var(--primary);background:var(--dark-surface-2)">
            <div style="font-size:15px;font-weight:800;color:var(--primary-light);margin-bottom:10px">📝 Written Test Sheet Configuration</div>
            <div class="builder-field">
              <label for="ws-sheet-type">Sheet Pattern Type *</label>
              <select id="ws-sheet-type" class="builder-select" onchange="
                state.builder.sheetType = this.value;
                if(!state.builder.questions[0]) state.builder.questions.push({type:'TUITION_CANVAS',marks:1});
                state.builder.questions[0].sheetType = this.value;
              ">
                ${sheetTypeOpts}
              </select>
            </div>
            <div class="builder-field">
              <label for="ws-comments">Comments / Teacher Notes (optional)</label>
              <input id="ws-comments" class="builder-input" placeholder="e.g. Capital letters must sit on blue baseline" value="${esc(currComments)}" oninput="
                state.builder.comments = this.value;
                if(!state.builder.questions[0]) state.builder.questions.push({type:'TUITION_CANVAS',marks:1});
                state.builder.questions[0].comments = this.value;
              ">
            </div>
            <div class="builder-field">
              <label for="ws-sample">Sample Guide Text (optional — printed faintly on top line)</label>
              <input id="ws-sample" class="builder-input" placeholder="e.g. चल नल पर जल भर" value="${esc(currSample)}" oninput="
                state.builder.sampleText = this.value;
                if(!state.builder.questions[0]) state.builder.questions.push({type:'TUITION_CANVAS',marks:1});
                state.builder.questions[0].sampleText = this.value;
              ">
            </div>
          </div>
        ` : ''}

        <!-- ── Question list section ───────────────────── -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <div class="builder-section-label" style="margin:0">
            Worksheet Questions <span class="builder-q-badge">${qs.length}</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="openQuestionEditor(null)" id="btn-open-add-q">
            ➕ Add Question
          </button>
        </div>

        ${qs.length === 0
          ? `<div class="mentor-empty">No questions in this worksheet yet.<br><br><button class="btn btn-primary" onclick="openQuestionEditor(null)">➕ Add First Question</button></div>`
          : `<div class="builder-q-list">${qList}</div>
             <div style="margin-top:16px;text-align:center">
               <button class="btn btn-primary" onclick="openQuestionEditor(null)" id="btn-add-more-q" style="padding:12px 28px">➕ Add Another Question</button>
             </div>`}
      </div>
    </div>
  `);
}

// ══════════════════════════════════════════════════════════════
// QUESTION EDITOR (DEDICATED PAGE: CREATE / EDIT SINGLE QUESTION)
// ══════════════════════════════════════════════════════════════
function openQuestionEditor(qIndex) {
  state.builder.editingIndex = qIndex;
  if (qIndex !== null && qIndex !== undefined) {
    const q = state.builder.questions[qIndex];
    if (q) state.builder.addingType = q.type;
  }
  renderQuestionEditor();
  if (qIndex !== null && qIndex !== undefined) {
    const q = state.builder.questions[qIndex];
    if (q) _populateQuestionForm(q);
  }
}

function renderQuestionEditor() {
  const b = state.builder;
  const isEdit = b.editingIndex !== null && b.editingIndex !== undefined;

  const typePicker = QUESTION_TYPES.filter(t => !t.subjectOnly || t.subjectOnly.includes(b.subject)).map(t => `
    <button class="qtype-card ${b.addingType===t.type?'active':''}"
      onclick="builderSetType('${t.type}')" id="qt-${t.type}" title="${t.desc}">
      <div class="qtc-emoji">${t.emoji}</div>
      <div class="qtc-label">${t.label}</div>
    </button>`).join('');

  setApp(`
    <div class="mentor-screen screen">
      <div class="mentor-header">
        <button class="back-btn" onclick="builderCancelEdit()" id="btn-back-qedit">◀ Back to Worksheet</button>
        <div class="mentor-header-title">${isEdit ? `✏️ Edit Question #${b.editingIndex + 1}` : '➕ Add Question'}</div>
        <button class="btn btn-accent btn-sm" onclick="builderAddQuestion()" id="btn-save-q">💾 Save Question</button>
      </div>

      <div class="mentor-body">
        <div class="builder-add-panel" id="builder-add-panel">
          <div class="builder-section-sub">1. Select Question Type</div>
          <div class="qtype-grid">${typePicker}</div>

          <div class="qtype-form-wrap">
            <div class="builder-section-sub" style="margin-top:18px">
              2. ${_qtEmoji(b.addingType)} ${_qtLabel(b.addingType)} Details
            </div>
            <div class="qtype-form" id="qtype-form">
              ${_renderQTypeForm(b.addingType)}
            </div>
          </div>

          <div style="display:flex;gap:12px;margin-top:24px">
            <button class="btn btn-primary" onclick="builderAddQuestion()" id="btn-add-q" style="flex:1;padding:14px">
              ${isEdit ? `💾 Update Question #${b.editingIndex + 1}` : '➕ Save Question to Worksheet'}
            </button>
            <button class="btn btn-secondary" onclick="builderCancelEdit()" id="btn-cancel-edit">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `);
}

function _qtLabel(type) { return QUESTION_TYPES.find(t => t.type === type)?.label || type; }
function _qtEmoji(type) { return QUESTION_TYPES.find(t => t.type === type)?.emoji || '📄'; }

// Switch type in builder (without re-rendering the whole screen)
function builderSetType(type) {
  state.builder.addingType = type;
  _matchPairCount = 4;
  _audioDataUrl   = null;
  const form = document.getElementById('qtype-form');
  if (form) {
    document.querySelectorAll('.qtype-card').forEach(b => b.classList.toggle('active', b.id === `qt-${type}`));
    form.innerHTML = _renderQTypeForm(type);
    const sub = document.querySelector('.qtype-form-wrap .builder-section-sub');
    if (sub) sub.innerHTML = `2. ${_qtEmoji(type)} ${_qtLabel(type)} Details`;
  } else {
    renderQuestionEditor();
  }
}

// ── Form HTML per type ────────────────────────────────────────
function _renderQTypeForm(type) {
  switch (type) {
    case 'MCQ':               return _formMCQ();
    case 'TRUE_FALSE':        return _formTF();
    case 'FILL_BLANK':        return _formFillBlank();
    case 'MATCH':             return _formMatch();
    case 'MATCH_IMAGE':       return _formMatchImage();
    case 'CIRCLE_FIND':       return _formCircleFind();
    case 'DRAG_SLOT':         return _formDragSlot();
    case 'ARRANGE':           return _formArrange();
    case 'SEQUENCE_NEXT':     return _formSequence('next');
    case 'SEQUENCE_PREV':     return _formSequence('prev');
    case 'WORD_BUILD':        return _formWordBuild();
    case 'WORD_FIRST_LETTER': return _formWordFirstLetter();
    case 'UNSCRAMBLE':        return _formUnscramble();
    case 'AUDIO_CLIP':        return _formAudioClip();
    case 'VOWEL_SORT':        return _formVowelSort();
    case 'TEXT_HIGHLIGHT':    return _formTextHighlight();
    case 'PICTURE_WRITE':     return _formPictureWrite();
    case 'AUDIO_WRITE':       return _formAudioWrite();
    case 'NUMBER_WRITE':      return _formNumberWrite();
    case 'GROUPS_OF_TENS':    return _formGroupsOfTens();
    case 'READ_AND_ANSWER':   return _formReadAndAnswer();
    case 'TUITION_CANVAS':    return _formTuitionCanvas();
    default:                  return _formMCQ();
  }
}

function _fld(id, label, ph, type='text') {
  return `<div class="builder-field"><label for="${id}">${label}</label>
    <input id="${id}" class="builder-input" type="${type}" placeholder="${ph}"></div>`;
}
function _get(id)  { return (document.getElementById(id)?.value||'').trim(); }
function _req(id, name) {
  const v = _get(id);
  if (!v) throw new Error(`"${name}" is required`);
  return v;
}
function _csv(id)  { return _get(id).split(',').map(s=>s.trim()).filter(Boolean); }

function _formMCQ() { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Question Text *','e.g. Which letter is a vowel?')}
    <div class="builder-field">
      <label>Options (tap ✓ to mark correct)</label>
      <div class="mcq-builder-opts" id="mcq-opts">
        ${['A','B','C','D'].map(l => `
          <div class="mcq-opt-row">
            <span class="mcq-opt-lbl">${l}</span>
            <input class="builder-input" id="f-opt${l}" placeholder="Option ${l}">
            <button class="mcq-correct-btn" onclick="setMcqCorrect('${l}')" id="mcq-correct-${l}">✓</button>
          </div>`).join('')}
      </div>
      <input type="hidden" id="f-mcq-correct" value="">
    </div>
    ${_fld('f-hint','Hint (optional)','e.g. Think of the word apple')}
  </div>`; }

let _mcqCorrectLetter = '';
function setMcqCorrect(letter) {
  _mcqCorrectLetter = letter;
  ['A','B','C','D'].forEach(l => {
    const b = document.getElementById(`mcq-correct-${l}`);
    if (b) b.classList.toggle('active', l === letter);
  });
  const h = document.getElementById('f-mcq-correct'); if (h) h.value = letter;
}

function _formTF() { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Statement *','e.g. "A" is a vowel.')}
    <div class="builder-field">
      <label>Correct Answer</label>
      <div style="display:flex;gap:10px;margin-top:6px">
        <button class="tf-opt-btn active" id="tf-true"  onclick="setTfAnswer(true)">✅ TRUE</button>
        <button class="tf-opt-btn"        id="tf-false" onclick="setTfAnswer(false)">❌ FALSE</button>
      </div>
      <input type="hidden" id="f-tf-answer" value="true">
    </div>
    ${_fld('f-hint','Hint (optional)','')}
  </div>`; }

function setTfAnswer(val) {
  document.getElementById('tf-true')?.classList.toggle('active', val === true);
  document.getElementById('tf-false')?.classList.toggle('active', val === false);
  const h = document.getElementById('f-tf-answer'); if (h) h.value = String(val);
}

function _formFillBlank() { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Question Text *','e.g. The colour of the sky is ___.')}
    ${_fld('f-answer','Correct Answer *','e.g. blue')}
    ${_fld('f-hint','Hint (optional)','')}
  </div>`; }

function _formMatch() { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Question Text *','e.g. Match each animal to its sound.')}
    <div class="builder-field">
      <label>Pairs — Left → Right</label>
      <div id="match-pairs-container">
        ${[1,2,3,4].map(i => `
          <div class="match-pair-row">
            <input class="builder-input" id="mp-left-${i}"  placeholder="Left ${i}" style="flex:1">
            <span class="mp-arrow">→</span>
            <input class="builder-input" id="mp-right-${i}" placeholder="Right ${i}" style="flex:1">
          </div>`).join('')}
      </div>
      <button class="btn-add-pair" onclick="addMatchPair()" id="btn-add-pair">+ Add Pair</button>
    </div>
  </div>`; }

function addMatchPair() {
  _matchPairCount++;
  const c = document.getElementById('match-pairs-container'); if (!c) return;
  const row = document.createElement('div');
  row.className = 'match-pair-row';
  row.innerHTML = `
    <input class="builder-input" id="mp-left-${_matchPairCount}"  placeholder="Left ${_matchPairCount}" style="flex:1">
    <span class="mp-arrow">→</span>
    <input class="builder-input" id="mp-right-${_matchPairCount}" placeholder="Right ${_matchPairCount}" style="flex:1">`;
  c.appendChild(row);
}

function _formMatchImage() { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Instruction Text *','e.g. Match the emoji to the word.')}
    <div class="builder-field">
      <label>Pairs — Image / Emoji → Word</label>
      <div id="match-pairs-container">
        ${[1,2,3,4].map(i => `
          <div class="match-pair-row">
            <input class="builder-input" id="mp-left-${i}"  placeholder="Emoji/Image ${i} (e.g. 🍎)" style="flex:1">
            <span class="mp-arrow">→</span>
            <input class="builder-input" id="mp-right-${i}" placeholder="Word ${i} (e.g. Apple)" style="flex:1">
          </div>`).join('')}
      </div>
      <button class="btn-add-pair" onclick="addMatchPair()" id="btn-add-pair">+ Add Pair</button>
    </div>
  </div>`; }

function _formWordFirstLetter() { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Instruction *','e.g. Choose the correct first letter')}
    ${_fld('f-wfl-word','Word with Blank *','e.g. ___AT')}
    ${_fld('f-wfl-options','Letter Options (comma separated) *','e.g. C, B, H, M')}
    ${_fld('f-wfl-answer','Correct First Letter *','e.g. C')}
    ${_fld('f-hint','Hint (optional)','e.g. Meow!')}
  </div>`; }

function _formTextHighlight() { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Instruction Text *','e.g. Read the passage and tap all CVC words!')}
    <div class="builder-field">
      <label>Passage Text *</label>
      <textarea id="f-th-passage" class="builder-textarea" rows="3" placeholder="e.g. The fat cat sat on a red mat."></textarea>
    </div>
    <div class="builder-field">
      <label>Target Words to Highlight (comma separated) *</label>
      <input class="builder-input" id="f-th-correct" placeholder="e.g. cat, sat, mat, red, fat">
    </div>
  </div>`; }

function _formPictureWrite() { return `
  <div class="builder-form-section">
    ${_fld('f-pw-picture','Picture Emoji / Graphic *','e.g. 🐘')}
    ${_fld('f-qtext','Question Prompt','e.g. What animal is this?')}
    ${_fld('f-answer','Expected Answer *','e.g. elephant')}
    ${_fld('f-hint','Hint (optional)','')}
  </div>`; }

function _formAudioWrite() { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Instruction','e.g. Listen carefully and type the word you hear.')}
    ${_fld('f-aw-spoken','Spoken Text (TTS) *','e.g. Elephant')}
    <div class="builder-field">
      <label>Voice Language</label>
      <select class="builder-select" id="f-aw-lang">
        <option value="en-IN">English (India)</option>
        <option value="hi-IN">Hindi</option>
      </select>
    </div>
    ${_fld('f-answer','Expected Answer *','e.g. Elephant')}
  </div>`; }

function _formNumberWrite() { return `
  <div class="builder-form-section">
    ${_fld('f-nw-digit','Digit / Number *','e.g. 5')}
    ${_fld('f-qtext','Instruction Text','e.g. Write the number name for the digit shown.')}
    ${_fld('f-answer','Number Word Answer *','e.g. five')}
    ${_fld('f-hint','Hint (optional)','')}
  </div>`; }

function _formGroupsOfTens() { return `
  <div class="builder-form-section">
    ${_fld('f-got-tens','Number of Ten-Dot Blocks (0-10) *','e.g. 3','number')}
    ${_fld('f-got-units','Number of Extra Units (0-9) *','e.g. 4','number')}
    ${_fld('f-qtext','Question Text *','e.g. How many tens and units in total?')}
    ${_fld('f-answer','Expected Total Count *','e.g. 34','number')}
  </div>`; }

function _formReadAndAnswer() { return `
  <div class="builder-form-section">
    <div class="builder-field">
      <label>Passage Text *</label>
      <textarea id="f-raa-passage" class="builder-textarea" rows="3" placeholder="e.g. Sam has a red ball. He plays in the park."></textarea>
    </div>
    ${_fld('f-qtext','Question Text *','e.g. What color is Sam\'s ball?')}
    ${_fld('f-answer','Correct Answer *','e.g. red')}
    ${_fld('f-hint','Hint (optional)','')}
  </div>`; }

function _formTuitionCanvas() { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Question Instruction *','e.g. Write letters A to Z in capital letters')}
    <div class="builder-field">
      <label>Sheet Type *</label>
      <select id="f-tc-sheet" class="builder-select">
        <option value="4-line">📝 4-Line Notebook Sheet (English Pattern)</option>
        <option value="3-line">🇮🇳 3-Line Notebook Sheet (Hindi Pattern with Shiro-rekha)</option>
        <option value="2-line">✍️ 2-Line Notebook Sheet (Hindi Pattern)</option>
        <option value="1-line">📄 Single Line Notebook Sheet</option>
        <option value="grid">🔢 Math Grid Square Boxes (Maths Pattern)</option>
        <option value="blank">🎨 Blank Writing & Drawing Canvas</option>
      </select>
    </div>
    ${_fld('f-tc-comments','Comments / Teacher Notes (optional)','e.g. Capital letters must sit on blue baseline')}
    ${_fld('f-tc-sample','Sample Guide Text (optional — printed faintly on top line)','e.g. चल नल पर जल भर')}
  </div>`; }

function _formCircleFind() { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Instruction Text *','e.g. Tap all the VOWELS!')}
    <div class="builder-field">
      <label>All Items (comma separated)</label>
      <textarea id="f-items" class="builder-textarea" placeholder="A, B, E, C, I, D, O, F, U, G" rows="2"></textarea>
    </div>
    <div class="builder-field">
      <label>Correct Items to Circle (comma separated)</label>
      <textarea id="f-correct-items" class="builder-textarea" placeholder="A, E, I, O, U" rows="2"></textarea>
    </div>
  </div>`; }

function _formDragSlot() { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Instruction *','e.g. Fill in the blank')}
    <div class="builder-field">
      <label>Sentence — write [BLANK] where the word goes</label>
      <textarea id="f-slot-text" class="builder-textarea" placeholder="e.g. [BLANK] apple is on the table." rows="2"></textarea>
    </div>
    <div class="builder-field">
      <label>Correct Answer(s) for blank(s) (comma separated)</label>
      <input class="builder-input" id="f-slot-answers" placeholder="e.g. An">
    </div>
    <div class="builder-field">
      <label>All Word Tile Options (comma separated, include the answer)</label>
      <input class="builder-input" id="f-slot-options" placeholder="e.g. A, An, The, Some">
    </div>
  </div>`; }

function _formArrange() { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Question Text *','e.g. Arrange in ASCENDING order.')}
    <div class="builder-field">
      <label>Items in CORRECT order (comma separated)</label>
      <textarea id="f-arrange-items" class="builder-textarea" placeholder="e.g. 1, 2, 3, 4, 5&#10;or: Ant, Bear, Cat, Dog" rows="2"></textarea>
      <div class="builder-hint">💡 Items will be shuffled automatically for the child.</div>
    </div>
  </div>`; }

function _formSequence(dir) { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Instruction Text *',
      dir==='next' ? 'e.g. Write the NEXT numbers.' : 'e.g. Write the PREVIOUS letters.')}
    <div class="builder-field">
      <label>Given items (comma separated)</label>
      <input class="builder-input" id="f-seq-given" placeholder="e.g. P, Q, R">
    </div>
    <div class="builder-field">
      <label>Correct Answers (in order, comma separated)</label>
      <input class="builder-input" id="f-seq-answers" placeholder="e.g. S, T">
    </div>
    <div class="builder-field">
      <label>Distractor Options (wrong choices to add, comma separated)</label>
      <input class="builder-input" id="f-seq-distractors" placeholder="e.g. X, M">
    </div>
  </div>`; }

function _formWordBuild() { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Instruction Text *','e.g. Tap letters to spell the word!')}
    ${_fld('f-wb-picture','Picture Emoji (optional)','e.g. 🐕')}
    ${_fld('f-wb-answer','Target Word * (UPPERCASE)','e.g. DOG')}
    <div class="builder-field">
      <label>Extra Distractor Letters (comma separated)</label>
      <input class="builder-input" id="f-wb-extra" placeholder="e.g. A, X, B">
      <div class="builder-hint">💡 Letters in the target word are added automatically.</div>
    </div>
  </div>`; }

function _formUnscramble() { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Instruction Text *','e.g. Unscramble to make a word!')}
    ${_fld('f-unsc-answer','Target Word * (UPPERCASE)','e.g. DOG')}
    ${_fld('f-hint','Hint (optional)','e.g. A pet that barks')}
    <div class="builder-hint">💡 Letters will be scrambled automatically.</div>
  </div>`; }

function _formAudioClip() { return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Question Text *','e.g. Listen and write what you hear.')}
    <div class="builder-field">
      <label>Upload Audio File</label>
      <div class="audio-upload-zone" id="audio-upload-zone" onclick="document.getElementById('f-audio-file').click()">
        <div id="audio-upload-icon" style="font-size:32px">🎵</div>
        <div id="audio-upload-text" style="font-size:13px;font-weight:600;margin-top:4px">Tap to upload audio file</div>
        <div style="font-size:11px;color:#9090B0;margin-top:2px">MP3, WAV, M4A, OGG accepted</div>
        <input type="file" id="f-audio-file" accept="audio/*" style="display:none" onchange="handleAudioUpload(this)">
      </div>
      <audio id="audio-preview" style="width:100%;margin-top:8px;display:none" controls></audio>
    </div>
    <!-- OR record with microphone -->
    <div class="builder-field">
      <label>— OR Record with Microphone</label>
      <div class="mic-record-row">
        <button class="btn-mic" onclick="startMicRecording()" id="btn-mic-start">🎙 Record</button>
        <button class="btn-mic btn-mic-stop" onclick="stopMicRecording()" id="btn-mic-stop" style="display:none">⏹ Stop</button>
        <div class="mic-indicator" id="mic-indicator"><div class="mic-dot"></div> Recording…</div>
      </div>
    </div>
    <div class="builder-field">
      <label>Writing Sheet Type (child writes answer on this)</label>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px">
        ${['4-line','3-line','2-line','blank'].map(s=>`
          <button class="sheet-pill" id="bsp-${s}" onclick="selectBuilderSheet('${s}')">${s}</button>`
        ).join('')}
      </div>
      <input type="hidden" id="f-line-type" value="4-line">
    </div>
    <div class="builder-field">
      <label>Answer Type</label>
      <select class="builder-select" id="f-audio-answer-type" onchange="updateAudioAnswerForm()">
        <option value="text">Type the answer (text input)</option>
        <option value="mcq">Choose from options (MCQ)</option>
      </select>
    </div>
    <div id="f-audio-answer-area">
      ${_fld('f-audio-answer','Correct Answer *','e.g. cat')}
    </div>
    ${_fld('f-hint','Hint (optional)','')}
  </div>`; }

function _formVowelSort() {
  return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Instruction Text *','e.g. Circle all words with the short "a" vowel sound!')}
    <div class="builder-field">
      <label>Mode</label>
      <select class="builder-select" id="f-vs-mode">
        <option value="single">Single Target (Circle matching words)</option>
        <option value="bins">Multi-Bin Drag & Sort (a, e, i, o, u)</option>
      </select>
    </div>
    <div class="builder-field">
      <label>Target Vowel (for single mode)</label>
      <input class="builder-input" id="f-vs-vowel" placeholder="e.g. a">
    </div>
    <div class="builder-field">
      <label>All Word Options (comma separated) *</label>
      <textarea id="f-vs-words" class="builder-textarea" rows="2" placeholder="e.g. cat, bed, pig, dog, cup, hat, pin"></textarea>
    </div>
    <div class="builder-field">
      <label>Correct Words (for single target mode, comma separated)</label>
      <textarea id="f-vs-correct" class="builder-textarea" rows="2" placeholder="e.g. cat, hat"></textarea>
    </div>
  </div>`;
}

function handleAudioUpload(input) {
  const file = input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    _audioDataUrl = e.target.result;
    const prev = document.getElementById('audio-preview');
    if (prev) { prev.src = _audioDataUrl; prev.style.display = 'block'; }
    const icon = document.getElementById('audio-upload-icon'); if (icon) icon.textContent = '✅';
    const txt  = document.getElementById('audio-upload-text');
    if (txt) txt.textContent = file.name.length > 28 ? file.name.slice(0,28)+'…' : file.name;
    showToast(`Audio loaded! 🎵`, '');
  };
  reader.readAsDataURL(file);
}

// ── Microphone Recording ──────────────────────────────────────
function startMicRecording() {
  if (!navigator.mediaDevices?.getUserMedia) {
    showToast('Microphone not supported on this browser 😔', ''); return;
  }
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      _micChunks = [];
      _micRecorder = new MediaRecorder(stream);
      _micRecorder.ondataavailable = e => { if (e.data.size > 0) _micChunks.push(e.data); };
      _micRecorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        const blob   = new Blob(_micChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = ev => {
          _audioDataUrl = ev.target.result;
          const prev = document.getElementById('audio-preview');
          if (prev) { prev.src = _audioDataUrl; prev.style.display = 'block'; }
          const icon = document.getElementById('audio-upload-icon'); if (icon) icon.textContent = '🎙✅';
          const txt  = document.getElementById('audio-upload-text'); if (txt) txt.textContent = 'Recorded audio ready';
          showToast('Recording saved! 🎙', '');
        };
        reader.readAsDataURL(blob);
        const ind = document.getElementById('mic-indicator');
        if (ind) ind.classList.remove('active');
      };
      _micRecorder.start(250);
      _micRecording = true;
      const startBtn = document.getElementById('btn-mic-start');
      const stopBtn  = document.getElementById('btn-mic-stop');
      const ind      = document.getElementById('mic-indicator');
      if (startBtn) startBtn.style.display = 'none';
      if (stopBtn)  stopBtn.style.display  = '';
      if (ind)      ind.classList.add('active');
    })
    .catch(() => showToast('Could not access microphone 😔', ''));
}

function stopMicRecording() {
  if (_micRecorder && _micRecording) {
    _micRecorder.stop();
    _micRecording = false;
    const startBtn = document.getElementById('btn-mic-start');
    const stopBtn  = document.getElementById('btn-mic-stop');
    if (startBtn) startBtn.style.display = '';
    if (stopBtn)  stopBtn.style.display  = 'none';
  }
}

function selectBuilderSheet(sheet) {
  const h = document.getElementById('f-line-type'); if (h) h.value = sheet;
  document.querySelectorAll('[id^="bsp-"]').forEach(b =>
    b.classList.toggle('active', b.id === `bsp-${sheet}`)
  );
}


function updateAudioAnswerForm() {
  const type = document.getElementById('f-audio-answer-type')?.value || 'text';
  const area = document.getElementById('f-audio-answer-area'); if (!area) return;
  if (type === 'mcq') {
    area.innerHTML = `
      <div class="builder-field"><label>Options (comma separated)</label>
        <input class="builder-input" id="f-audio-options" placeholder="cat, bat, hat, mat"></div>
      <div class="builder-field"><label>Correct Answer *</label>
        <input class="builder-input" id="f-audio-answer" placeholder="cat"></div>`;
  } else {
    area.innerHTML = `<div class="builder-field"><label>Correct Answer *</label>
      <input class="builder-input" id="f-audio-answer" placeholder="e.g. cat"></div>`;
  }
}

// ── Collect question from form & Edit support ─────────────────
function builderEditQuestion(index) {
  openQuestionEditor(index);
}

function builderCancelEdit() {
  state.builder.editingIndex = null;
  _renderBuilderUI();
}

function _populateQuestionForm(q) {
  try {
    const setV = (id, v) => { const el = document.getElementById(id); if (el) el.value = v ?? ''; };
    setV('f-qtext', q.text || q.question || '');
    setV('f-hint', q.hint || '');

    switch (q.type) {
      case 'MCQ': {
        if (Array.isArray(q.options)) {
          ['A','B','C','D'].forEach((l, i) => setV(`f-opt${l}`, q.options[i] || ''));
          const idx = q.options.indexOf(q.answer);
          const correctLetter = ['A','B','C','D'][idx >= 0 ? idx : 0] || 'A';
          setMcqCorrect(correctLetter);
        }
        break;
      }
      case 'TRUE_FALSE': {
        setTfAnswer(q.answer === true);
        break;
      }
      case 'FILL_BLANK':
      case 'PICTURE_WRITE':
      case 'AUDIO_WRITE':
      case 'NUMBER_WRITE':
      case 'READ_AND_ANSWER': {
        setV('f-answer', q.answer || '');
        if (q.type === 'PICTURE_WRITE') setV('f-pw-picture', q.picture || '');
        if (q.type === 'AUDIO_WRITE') { setV('f-aw-spoken', q.spokenText || ''); setV('f-aw-lang', q.language || 'en-IN'); }
        if (q.type === 'NUMBER_WRITE') setV('f-nw-digit', q.digit || '');
        if (q.type === 'READ_AND_ANSWER') setV('f-raa-passage', q.passage || '');
        break;
      }
      case 'MATCH':
      case 'MATCH_IMAGE': {
        if (Array.isArray(q.pairs)) {
          q.pairs.forEach((p, i) => {
            setV(`mp-left-${i+1}`, p.left);
            setV(`mp-right-${i+1}`, p.right);
          });
        }
        break;
      }
      case 'WORD_FIRST_LETTER': {
        setV('f-wfl-word', q.wordWithBlank || '');
        setV('f-wfl-options', (q.options || []).join(', '));
        setV('f-wfl-answer', q.answer || '');
        break;
      }
      case 'TEXT_HIGHLIGHT': {
        setV('f-th-passage', q.passage || '');
        setV('f-th-correct', (q.correctWords || []).join(', '));
        break;
      }
      case 'GROUPS_OF_TENS': {
        setV('f-got-tens', q.tensCount || 0);
        setV('f-got-units', q.unitsCount || 0);
        setV('f-answer', q.answer || 0);
        break;
      }
      case 'CIRCLE_FIND': {
        setV('f-items', (q.items || []).join(', '));
        setV('f-correct-items', (q.correctItems || []).join(', '));
        break;
      }
      case 'DRAG_SLOT': {
        setV('f-slot-text', q.text || '');
        setV('f-slot-answers', (q.slots || []).map(s => s.answer).join(', '));
        setV('f-slot-options', (q.options || []).join(', '));
        break;
      }
      case 'ARRANGE': {
        setV('f-arrange-items', (q.correctOrder || q.items || []).join(', '));
        break;
      }
      case 'SEQUENCE_NEXT':
      case 'SEQUENCE_PREV': {
        setV('f-seq-given', (q.given || []).join(', '));
        setV('f-seq-answers', (q.answers || []).join(', '));
        setV('f-seq-distractors', (q.distractors || []).join(', '));
        break;
      }
      case 'WORD_BUILD': {
        setV('f-wb-picture', q.picture || '');
        setV('f-wb-answer', q.answer || '');
        const extras = (q.letterPool || []).filter(l => !(q.answer || '').includes(l));
        setV('f-wb-extra', extras.join(', '));
        break;
      }
      case 'UNSCRAMBLE': {
        setV('f-unsc-answer', q.answer || '');
        break;
      }
      case 'VOWEL_SORT': {
        setV('f-vs-mode', q.mode || 'single');
        setV('f-vs-vowel', q.targetVowel || '');
        setV('f-vs-words', (q.words || []).join(', '));
        setV('f-vs-correct', (q.correctWords || []).join(', '));
        break;
      }
      case 'AUDIO_CLIP': {
        setV('f-audio-answer', q.answer || '');
        if (q.audioSrc) _audioDataUrl = q.audioSrc;
        break;
      }
      case 'TUITION_CANVAS': {
        setV('f-qtext', q.text || q.instruction || '');
        setV('f-tc-sheet', q.sheetType || '4-line');
        setV('f-tc-comments', q.comments || '');
        setV('f-tc-sample', q.sampleText || '');
        break;
      }
    }
  } catch (_) {}
}

function builderAddQuestion() {
  let q;
  try { q = _collectQuestion(state.builder.addingType); }
  catch (err) { showToast(`⚠️ ${err.message}`, ''); return; }
  if (!q) return;

  if (state.builder.editingIndex !== null && state.builder.editingIndex !== undefined) {
    const idx = state.builder.editingIndex;
    q.id = state.builder.questions[idx]?.id || `custom_q_${Date.now()}`;
    q.marks = 1;
    state.builder.questions[idx] = q;
    state.builder.editingIndex = null;
    showToast('Question updated! ✏️', 'success');
  } else {
    q.id    = `custom_q_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
    q.marks = 1;
    state.builder.questions.push(q);
    showToast('Question added! ➕', 'success');
  }

  _matchPairCount = 4;
  _audioDataUrl   = null;
  _renderBuilderUI();
}

function _collectQuestion(type) {
  switch (type) {
    case 'MCQ': {
      const text   = _req('f-qtext','Question Text');
      const opts   = ['A','B','C','D'].map(l=>_get(`f-opt${l}`)).filter(Boolean);
      const letter = _get('f-mcq-correct');
      if (opts.length < 2)   throw new Error('Add at least 2 options');
      if (!letter)           throw new Error('Tap ✓ to mark the correct answer');
      const idx = ['A','B','C','D'].indexOf(letter);
      const correctVal = opts[idx] || opts[0];
      return { type, text, options:opts, answer:correctVal, hint:_get('f-hint') };
    }
    case 'TRUE_FALSE': {
      const text   = _req('f-qtext','Statement');
      const answer = _get('f-tf-answer') === 'false' ? false : true;
      return { type, text, answer, hint:_get('f-hint') };
    }
    case 'FILL_BLANK': {
      return { type, text:_req('f-qtext','Question Text'), answer:_req('f-answer','Correct Answer'), hint:_get('f-hint') };
    }
    case 'MATCH':
    case 'MATCH_IMAGE': {
      const text  = _req('f-qtext','Question Text');
      const pairs = [];
      for (let i = 1; i <= _matchPairCount; i++) {
        const l = _get(`mp-left-${i}`), r = _get(`mp-right-${i}`);
        if (l && r) pairs.push({ left:l, right:r });
      }
      if (pairs.length < 2) throw new Error('Add at least 2 complete pairs');
      return { type, text, pairs };
    }
    case 'WORD_FIRST_LETTER': {
      const text = _req('f-qtext','Instruction');
      const wordWithBlank = _req('f-wfl-word','Word with blank');
      const options = _csv('f-wfl-options');
      const answer = _req('f-wfl-answer','Correct answer');
      if (options.length < 2) throw new Error('Add at least 2 letter options');
      return { type, text, wordWithBlank, options, answer, hint:_get('f-hint') };
    }
    case 'TEXT_HIGHLIGHT': {
      const text = _req('f-qtext','Instruction');
      const passage = _req('f-th-passage','Passage text');
      const correctWords = _csv('f-th-correct');
      if (!correctWords.length) throw new Error('Specify at least 1 correct word to highlight');
      return { type, text, passage, correctWords };
    }
    case 'PICTURE_WRITE': {
      const picture = _req('f-pw-picture','Picture Emoji/Graphic');
      const text = _get('f-qtext') || 'What is in the picture?';
      const answer = _req('f-answer','Expected answer');
      return { type, picture, text, answer, hint:_get('f-hint') };
    }
    case 'AUDIO_WRITE': {
      const text = _get('f-qtext') || 'Listen and write what you hear.';
      const spokenText = _req('f-aw-spoken','Spoken text');
      const language = _get('f-aw-lang') || 'en-IN';
      const answer = _req('f-answer','Expected answer');
      return { type, text, spokenText, language, answer };
    }
    case 'NUMBER_WRITE': {
      const digit = _req('f-nw-digit','Digit / Number');
      const text = _get('f-qtext') || `Write the number name for ${digit}`;
      const answer = _req('f-answer','Number Word Answer');
      return { type, text, digit, answer, hint:_get('f-hint') };
    }
    case 'GROUPS_OF_TENS': {
      const tensCount = parseInt(_req('f-got-tens','Tens blocks count'), 10) || 0;
      const unitsCount = parseInt(_get('f-got-units') || '0', 10) || 0;
      const question = _req('f-qtext','Question text');
      const answer = parseInt(_req('f-answer','Expected total answer'), 10) || ((tensCount * 10) + unitsCount);
      return { type, text: question, tensCount, unitsCount, question, answer };
    }
    case 'READ_AND_ANSWER': {
      const passage = _req('f-raa-passage','Passage text');
      const text = _req('f-qtext','Question text');
      const answer = _req('f-answer','Correct answer');
      return { type, text, passage, answer, hint:_get('f-hint') };
    }
    case 'TUITION_CANVAS': {
      const text = _req('f-qtext','Question Instruction');
      const sheetType = _get('f-tc-sheet') || '4-line';
      const comments = _get('f-tc-comments') || '';
      const sampleText = _get('f-tc-sample') || '';
      return { type, text, sheetType, instruction: text, comments, sampleText };
    }
    case 'CIRCLE_FIND': {
      const text         = _req('f-qtext','Instruction Text');
      const items        = _csv('f-items');
      const correctItems = _csv('f-correct-items');
      if (items.length < 2)    throw new Error('Add at least 2 items');
      if (!correctItems.length) throw new Error('Specify at least 1 correct item');
      return { type, text, items, correctItems };
    }
    case 'DRAG_SLOT': {
      const slotTxt = _req('f-slot-text','Sentence with [BLANK]');
      const answers = _csv('f-slot-answers');
      const options = _csv('f-slot-options');
      if (!answers.length)    throw new Error('Add at least one correct answer');
      if (options.length < 2) throw new Error('Add at least 2 tile options');
      return { type, text:_get('f-qtext')||slotTxt, text:slotTxt, slots:answers.map(a=>({answer:a})), options };
    }
    case 'ARRANGE': {
      const text  = _req('f-qtext','Question Text');
      const order = _csv('f-arrange-items');
      if (order.length < 2) throw new Error('Add at least 2 items');
      return { type, text, items:[...order], correctOrder:order };
    }
    case 'SEQUENCE_NEXT':
    case 'SEQUENCE_PREV': {
      const text        = _req('f-qtext','Instruction Text');
      const given       = _csv('f-seq-given');
      const answers     = _csv('f-seq-answers');
      const distractors = _csv('f-seq-distractors');
      if (!given.length)   throw new Error('Add the given items');
      if (!answers.length) throw new Error('Add the correct answers');
      return { type, text, given, answers, options:answers, distractors };
    }
    case 'WORD_BUILD': {
      const text    = _req('f-qtext','Instruction Text');
      const answer  = _req('f-wb-answer','Target Word').toUpperCase();
      const picture = _get('f-wb-picture');
      const extras  = _csv('f-wb-extra').map(l=>l.toUpperCase());
      const pool    = [...answer.split(''),...extras].sort(()=>Math.random()-0.5);
      return { type, text, answer, picture, letterPool:pool };
    }
    case 'UNSCRAMBLE': {
      const text      = _req('f-qtext','Instruction Text');
      const answer    = _req('f-unsc-answer','Target Word').toUpperCase();
      const hint      = _get('f-hint');
      const scrambled = answer.split('').sort(()=>Math.random()-0.5);
      return { type, text, answer, scrambled, hint };
    }
    case 'AUDIO_CLIP': {
      const text       = _req('f-qtext','Question Text');
      const answer     = _req('f-audio-answer','Correct Answer');
      const answerType = _get('f-audio-answer-type') || 'text';
      const lineType   = _get('f-line-type') || '4-line';
      if (!_audioDataUrl) throw new Error('Please upload or record an audio clip first 🎵');
      const q = { type, text, answer, hint:_get('f-hint'), audioSrc:_audioDataUrl, answerType, lineType };
      if (answerType === 'mcq') {
        const opts = _csv('f-audio-options');
        if (opts.length < 2) throw new Error('Add at least 2 MCQ options for audio question');
        q.options = opts;
      }
      _audioDataUrl = null;
      return q;
    }
    case 'VOWEL_SORT': {
      const text    = _req('f-qtext','Question Text');
      const mode    = _get('f-vs-mode') || 'single';
      const lang    = state.builder.subject === 'hindi' ? 'hindi' : 'english';
      const words   = _csv('f-vs-words');
      if (words.length < 2) throw new Error('Add at least 2 words');
      if (mode === 'single') {
        const targetVowel  = _req('f-vs-vowel','Target Vowel');
        const correctWords = _csv('f-vs-correct');
        if (!correctWords.length) throw new Error('Mark at least 1 correct word');
        return { type, text, mode, lang, targetVowel, words, correctWords };
      } else {
        // multi: build binMap from per-word selects
        const binMap = {};
        words.forEach(w => {
          const el = document.getElementById(`vsm-${w.replace(/\W/g,'_')}`);
          if (el?.value) binMap[w] = el.value;
        });
        if (!Object.keys(binMap).length) throw new Error('Assign at least 1 word to a vowel bin');
        return { type, text, mode, lang, words, binMap };
      }
    }
    default: throw new Error(`Unknown type: ${type}`);
  }
}

// ── Reorder / delete questions ────────────────────────────────
function builderMoveUp(idx) {
  if (idx === 0) return;
  const qs = state.builder.questions;
  [qs[idx-1], qs[idx]] = [qs[idx], qs[idx-1]];
  _renderBuilderUI();
}
function builderMoveDown(idx) {
  const qs = state.builder.questions;
  if (idx >= qs.length-1) return;
  [qs[idx], qs[idx+1]] = [qs[idx+1], qs[idx]];
  _renderBuilderUI();
}
function builderDeleteQ(idx) {
  if (confirm('Remove this question?')) {
    state.builder.questions.splice(idx, 1);
    _renderBuilderUI();
  }
}

// ── Save worksheet to localStorage ───────────────────────────
function saveBuilderWorksheet() {
  const b = state.builder;
  if (!b.title.trim()) { showToast('Please enter a worksheet title', ''); return; }

  if (b.subject === 'tuition') {
    const selSheetType  = document.getElementById('ws-sheet-type')?.value || b.sheetType || '4-line';
    const selComments   = document.getElementById('ws-comments')?.value ?? b.comments ?? '';
    const selSampleText = document.getElementById('ws-sample')?.value ?? b.sampleText ?? '';

    b.sheetType  = selSheetType;
    b.comments   = selComments;
    b.sampleText = selSampleText;

    if (b.questions.length === 0) {
      b.questions.push({
        id: `custom_q_${Date.now()}`,
        type: 'TUITION_CANVAS',
        text: b.description || b.title,
        instruction: b.description || b.title,
        sheetType: selSheetType,
        comments: selComments,
        sampleText: selSampleText,
        marks: 1
      });
    } else {
      b.questions.forEach(q => {
        if (q.type === 'TUITION_CANVAS' || b.subject === 'tuition') {
          q.sheetType  = selSheetType;
          q.comments   = selComments;
          q.sampleText = selSampleText;
        }
      });
    }
  }

  if (b.questions.length < 1) { showToast('Add at least 1 question', ''); return; }

  const ws = {
    id:           b.editId || `custom_${Date.now()}`,
    subject:      b.subject,
    title:        b.title.trim(),
    topic:        'Custom',
    difficulty:   b.difficulty,
    description:  b.description.trim(),
    estimatedTime: Math.max(5, b.questions.length * 2),
    questions:    b.questions,
    isTuitionSheet: b.subject === 'tuition',
    sheetType:    b.subject === 'tuition' ? (b.sheetType || b.questions[0]?.sheetType || '4-line') : undefined,
    instruction:  b.subject === 'tuition' ? (b.questions[0]?.instruction || b.description || b.title) : undefined,
    comments:     b.subject === 'tuition' ? (b.comments || b.questions[0]?.comments || '') : undefined,
    sampleText:   b.subject === 'tuition' ? (b.sampleText || b.questions[0]?.sampleText || '') : undefined,
    isCustom:     true,
    createdAt:    new Date().toISOString(),
  };
  saveCustomWorksheet(ws);
  showToast(`✅ "${ws.title}" saved!`, 'success');
  setTimeout(() => navigate('/mentor'), 800);
}

// ══════════════════════════════════════════════════════════════
// PRINT / PREVIEW SCREEN
// ══════════════════════════════════════════════════════════════
function renderPrint(worksheetId) {
  const ws = getWorksheet(worksheetId);
  if (!ws) return navigate('/mentor');
  const sub = SUBJECTS[ws.subject] || {};

  const qHtml = ws.questions.map((q, i) => `
    <div class="print-q">
      <div class="print-q-header">
        <span class="print-q-num">Q${i+1}</span>
        <span class="print-q-type">${_qtEmoji(q.type)} ${_qtLabel(q.type)}</span>
      </div>
      <div class="print-q-text">${esc(q.text)}</div>
      ${q.hint ? `<div class="print-hint">💡 ${esc(q.hint)}</div>` : ''}
      ${_renderPrintBody(q)}
    </div>`).join('');

  setApp(`
    <div class="mentor-screen screen">
      <div class="print-toolbar">
        <button class="back-btn" onclick="navigate('/mentor')" id="btn-back-print">◀</button>
        <div class="mentor-header-title">${esc(ws.title)}</div>
        <div style="display:flex;gap:8px;margin-left:auto">
          <button class="btn btn-sm" onclick="navigate('/child/play/${ws.id}')"
            id="btn-play-print" style="background:#43D9A2;color:#1B6B52;border:none;border-radius:999px;font-weight:700">▶ Play</button>
          <button class="btn btn-primary btn-sm" onclick="window.print()" id="btn-print">🖨 Print</button>
        </div>
      </div>

      <div class="print-doc" id="print-doc">
        <div class="print-header">
          <div class="print-school">Vardhman Srikalyan International School — UKG-C</div>
          <div class="print-ws-title">${esc(ws.title)}</div>
          <div class="print-meta-line">
            ${sub.emoji} ${sub.name} &nbsp;·&nbsp; ${ws.questions.length} Questions
            &nbsp;·&nbsp; Date: _______________ &nbsp;·&nbsp; Name: _______________________________
          </div>
        </div>

        <div class="print-questions">${qHtml}</div>

        <div class="print-footer">
          <span>Total Marks: ${ws.questions.length}</span>
          <span>Score: ___ / ${ws.questions.length}</span>
          <span>Checked by: ___________</span>
        </div>
      </div>
    </div>
  `);
}

function _renderPrintBody(q) {
  switch (q.type) {
    case 'MCQ':
      return `<div class="print-opts">${(q.options||[]).map((o,i)=>
        `<span class="print-opt">☐ ${String.fromCharCode(65+i)}. ${esc(o)}</span>`).join('')}</div>`;
    case 'TRUE_FALSE':
      return `<div class="print-opts"><span class="print-opt">☐ True</span><span class="print-opt">☐ False</span></div>`;
    case 'FILL_BLANK':
      return `<div class="print-answer-line">Answer: _______________________________</div>`;
    case 'MATCH': {
      const lefts  = (q.pairs||[]).map(p => `<div class="pmc-left-item">${esc(p.left)}</div>`).join('');
      const rights = [...(q.pairs||[])].sort(()=>Math.random()-0.5).map(p =>
        `<div class="pmc-right-item">${esc(p.right)}</div>`).join('');
      const lines = (q.pairs||[]).map(()=>`<div class="pmc-line-item"></div>`).join('');
      return `<div class="print-match-cols">
        <div class="pmc-col">${lefts}</div>
        <div class="pmc-lines-col">${lines}</div>
        <div class="pmc-col">${rights}</div>
      </div>`;
    }
    case 'CIRCLE_FIND':
      return `<div class="print-opts">${(q.items||[]).map(item=>
        `<span class="print-circle-item">${esc(item)}</span>`).join('')}</div>`;
    case 'DRAG_SLOT': {
      const display = (q.text||'').replace(/\[BLANK\]/g, '___________');
      return `<div class="print-slot-sentence">${esc(display)}</div>
        <div class="print-opts">${(q.options||[]).map(o=>`<span class="print-opt">${esc(o)}</span>`).join('')}</div>`;
    }
    case 'ARRANGE':
      return `<div class="print-opts">${([...(q.items||[])]).sort(()=>Math.random()-0.5).map(item=>
        `<span class="print-opt">${esc(item)}</span>`).join('')}</div>
        <div class="print-answer-line">Order: ___ ___ ___ ___ ___</div>`;
    case 'SEQUENCE_NEXT': {
      const s = (q.given||[]).join(' → ')+' → ___ → ___';
      return `<div class="print-seq-row">${esc(s)}</div>`;
    }
    case 'SEQUENCE_PREV': {
      const s = '___ → ___ → '+(q.given||[]).join(' → ');
      return `<div class="print-seq-row">${esc(s)}</div>`;
    }
    case 'WORD_BUILD':
      return `<div class="print-opts">${(q.letterPool||[]).map(l=>
        `<span class="print-letter-box">${esc(l)}</span>`).join('')}</div>
        <div class="print-answer-line">Word: ___ ___ ___ ___ ___</div>`;
    case 'UNSCRAMBLE':
      return `<div class="print-opts">${(q.scrambled||[]).map(l=>
        `<span class="print-letter-box">${esc(l)}</span>`).join('')}</div>
        <div class="print-answer-line">Word: ___________________________</div>`;
    case 'AUDIO_CLIP':
      return `<div class="print-audio-note">🔊 [Listen to the audio clip on the device]</div>
        <div class="print-answer-line">Answer: ___________________________</div>`;
    case 'VOWEL_SORT':
      return `<div class="print-opts">${(q.words||[]).map(w=>`<span class="print-circle-item">${esc(w)}</span>`).join('')}</div>
        <div class="print-answer-line">${q.mode==='multi'?'Sort into vowel bins above.':'Circle the matching words.'}</div>`;
    default:
      return `<div class="print-answer-line">Answer: ___________________________</div>`;
  }
}

// ── Vowel Sort Form ───────────────────────────────────────────
function _formVowelSort() {
  const lang   = state.builder.subject === 'hindi' ? 'hindi' : 'english';
  const vowels = lang === 'hindi'
    ? ['अ/आ','इ/ई','उ/ऊ','ए/ऐ','ओ/औ']
    : ['A','E','I','O','U'];
  const vowelOpts = vowels.map(v=>`<option value="${esc(v)}">${esc(v)}</option>`).join('');

  return `
  <div class="builder-form-section">
    ${_fld('f-qtext','Question Text *',
      lang==='hindi' ? 'e.g. अ/आ वाले शब्द पर टैप करो!' : 'e.g. Tap all words with the A sound!')}
    <div class="builder-field">
      <label>Mode</label>
      <div style="display:flex;gap:10px;margin-top:6px">
        <button class="tf-opt-btn active" id="vsm-single" onclick="setVowelMode('single')">
          🔵 Single Vowel (default)
        </button>
        <button class="tf-opt-btn" id="vsm-multi" onclick="setVowelMode('multi')">
          🗂 All Vowels (5 bins)
        </button>
      </div>
      <input type="hidden" id="f-vs-mode" value="single">
    </div>
    <div id="vs-single-fields">
      <div class="builder-field">
        <label>Target Vowel</label>
        <select class="builder-select" id="f-vs-vowel">${vowelOpts}</select>
      </div>
      <div class="builder-field">
        <label>All Words to Show (comma separated)</label>
        <textarea id="f-vs-words" class="builder-textarea" rows="2"
          placeholder="${lang==='hindi' ? 'e.g. आम, इल्म, उड़ान, एक, ऊन, कमल' : 'e.g. apple, egg, ice, owl, umbrella, cat, dog, hat'}"></textarea>
      </div>
      <div class="builder-field">
        <label>Correct Words for that vowel (comma separated — subset of above)</label>
        <input id="f-vs-correct" class="builder-input"
          placeholder="${lang==='hindi' ? 'e.g. आम, आदर' : 'e.g. apple, ant, age'}">
      </div>
    </div>
    <div id="vs-multi-fields" style="display:none">
      <div class="builder-field">
        <label>All Words to Sort (comma separated — assign to bins below after adding)</label>
        <textarea id="f-vs-words" class="builder-textarea" rows="2"
          placeholder="${lang==='hindi' ? 'e.g. आम, इल्म, उड़ान, एक, ऊन' : 'e.g. apple, egg, ice, owl, umbrella'}"></textarea>
      </div>
      <div class="builder-hint">💡 After saving, the child will sort these words into the correct vowel bins interactively.</div>
    </div>
  </div>`;
}

function setVowelMode(mode) {
  document.getElementById('vsm-single')?.classList.toggle('active', mode==='single');
  document.getElementById('vsm-multi')?.classList.toggle('active', mode==='multi');
  const h = document.getElementById('f-vs-mode'); if (h) h.value = mode;
  document.getElementById('vs-single-fields').style.display = mode==='single' ? '' : 'none';
  document.getElementById('vs-multi-fields').style.display  = mode==='multi'  ? '' : 'none';
}

// ══════════════════════════════════════════════════════════════
// TRACING REPORT SCREEN
// ══════════════════════════════════════════════════════════════
function renderTracingReport() {
  state.mode = 'mentor';
  const list = JSON.parse(localStorage.getItem('kw_trace_reports') || '[]');

  const totalTraces = list.length;
  const avgAccuracy = totalTraces > 0
    ? Math.round(list.reduce((sum, r) => sum + (r.accuracy || 0), 0) / totalTraces)
    : 0;

  const rows = totalTraces === 0
    ? `<div class="mentor-empty">No tracing reports recorded yet.<br>Have students practice letter tracing in the child section!</div>`
    : list.map((r, i) => `
      <div class="mentor-custom-card" style="align-items:center">
        <div style="font-size:32px;font-weight:800;width:50px;text-align:center;color:var(--primary)">${esc(r.letter)}</div>
        <div class="mcc-info">
          <div class="mcc-title">${r.lang === 'hindi' ? 'Hindi Swar/Vyanjan' : 'English Letter'} — ${esc(r.letter)}</div>
          <div class="mcc-meta">${r.date || ''} · Sheet: ${esc(r.sheet || '4-line')}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:20px;font-weight:800;color:${r.accuracy>=80?'#43D9A2':r.accuracy>=50?'#FF8C42':'#FF5C5C'}">${r.accuracy}%</div>
          <div style="font-size:11px;color:#7A7A8A">Accuracy</div>
        </div>
      </div>
    `).join('');

  setApp(`
    <div class="mentor-screen screen">
      <div class="mentor-header">
        <button class="back-btn" onclick="navigate('/mentor')" id="btn-back-trace-rep">◀</button>
        <div>
          <div class="mentor-header-title">📈 Tracing Practice History</div>
          <div class="mentor-header-sub">${totalTraces} sessions recorded</div>
        </div>
        ${totalTraces > 0 ? `<button class="btn btn-sm" onclick="clearTracingReports()" style="background:#FF5C5C;color:white;border:none;border-radius:999px">🗑 Clear History</button>` : ''}
      </div>

      <div class="mentor-body">
        <div class="mentor-stats-row">
          <div class="mentor-stat"><div class="ms-val">${totalTraces}</div><div class="ms-lbl">Total Attempts</div></div>
          <div class="mentor-stat"><div class="ms-val">${avgAccuracy}%</div><div class="ms-lbl">Avg Accuracy</div></div>
        </div>

        <div class="mentor-section-label">📜 Recent Tracing Reports</div>
        <div class="mentor-custom-list">${rows}</div>
      </div>
    </div>
  `);
}

function clearTracingReports() {
  if (confirm('Clear all tracing accuracy reports?')) {
    localStorage.removeItem('kw_trace_reports');
    renderTracingReport();
  }
}

// ── Function Aliases ──────────────────────────────────────────
function renderMentorBuilder(editId) { return renderBuilder(editId); }
function builderSave() { return saveBuilderWorksheet(); }
function _formTrueFalse() { return _formTF(); }
function _formSequenceNext() { return _formSequence('next'); }


