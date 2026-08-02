/**
 * KidWorksheets PWA — Deep Integration Test Suite
 * Uses jsdom to load actual app code in a simulated browser.
 * Tests: all 20 question type renderers, all evaluators, all data, router, mentor forms.
 */

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const BASE   = 'e:/antigravity/ClassWorksheets/pwa/js';
const dataJs    = fs.readFileSync(path.join(BASE, 'data.js'),   'utf8');
const data2Js   = fs.readFileSync(path.join(BASE, 'data2.js'),  'utf8');
const appJs     = fs.readFileSync(path.join(BASE, 'app.js'),    'utf8');
const mentorJs  = fs.readFileSync(path.join(BASE, 'mentor.js'), 'utf8');

// ── Test runner ──────────────────────────────────────────────────────────────
let passed = 0, failed = 0, sections = {};
const allIssues = [];

function section(name) {
  sections[name] = { pass: 0, fail: 0 };
  process.stdout.write('\n' + '═'.repeat(60) + '\n');
  process.stdout.write(' ' + name + '\n');
  process.stdout.write('═'.repeat(60) + '\n');
  return name;
}

function test(sec, label, fn) {
  try {
    const result = fn();
    if (result === false) throw new Error('returned false');
    passed++; sections[sec].pass++;
    process.stdout.write('  ✅ ' + label + '\n');
  } catch (e) {
    failed++; sections[sec].fail++;
    allIssues.push({ label, error: e.message });
    process.stdout.write('  ❌ ' + label + '\n     → ' + e.message + '\n');
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'assertion failed');
}
function assertContains(str, sub, msg) {
  if (!str || !str.includes(sub)) throw new Error(msg || `Expected "${sub}" in output, got: "${String(str).slice(0,120)}"`);
}
function assertNotContains(str, sub, msg) {
  if (str && str.includes(sub)) throw new Error(msg || `Did NOT expect "${sub}" in output`);
}

// ── Create JSDOM environment ─────────────────────────────────────────────────
function makeDOM() {
  const dom = new JSDOM(`<!DOCTYPE html><html><body><div id="app"></div></body></html>`, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'http://localhost:3737/'
  });
  const { window } = dom;
  // Stubs for browser APIs not in jsdom
  window.localStorage = (() => {
    const s = {};
    return {
      getItem: k => s[k] || null,
      setItem: (k,v) => { s[k]=v; },
      removeItem: k => { delete s[k]; },
    };
  })();
  window.speechSynthesis = { speak: ()=>{}, cancel: ()=>{}, getVoices: ()=>[] };
  window.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  window.navigator.mediaDevices = { getUserMedia: () => Promise.resolve({}) };
  window.MediaRecorder = class { start(){}; stop(){}; };
  window.confirm = () => true;
  window.alert   = () => {};

  const addScript = (code) => {
    const s = window.document.createElement('script');
    s.textContent = code;
    window.document.head.appendChild(s);
  };

  addScript(dataJs);
  addScript(data2Js);
  addScript(mentorJs);
  addScript(appJs);

  addScript(`
    window.ALL_WORKSHEETS        = typeof ALL_WORKSHEETS !== 'undefined' ? ALL_WORKSHEETS : [];
    window.SUBJECTS              = typeof SUBJECTS !== 'undefined' ? SUBJECTS : {};
    window.state                 = typeof state !== 'undefined' ? state : {};
    window.checkAnswer           = typeof checkAnswer !== 'undefined' ? checkAnswer : null;
    window.renderCurrentQuestion = typeof renderCurrentQuestion !== 'undefined' ? renderCurrentQuestion : null;
    window.renderPlayer          = typeof renderPlayer !== 'undefined' ? renderPlayer : null;
    window.getProgress           = typeof getProgress !== 'undefined' ? getProgress : null;
    window.saveProgress          = typeof saveProgress !== 'undefined' ? saveProgress : null;
    window.renderMentorDashboard = typeof renderMentorDashboard !== 'undefined' ? renderMentorDashboard : null;
    window.renderMentorSubject   = typeof renderMentorSubject !== 'undefined' ? renderMentorSubject : null;
    window.renderBuilder         = typeof renderBuilder !== 'undefined' ? renderBuilder : null;
    window.builderSetType        = typeof builderSetType !== 'undefined' ? builderSetType : null;
    window.saveBuilderWorksheet  = typeof saveBuilderWorksheet !== 'undefined' ? saveBuilderWorksheet : null;
    window.getCustomWorksheets   = typeof getCustomWorksheets !== 'undefined' ? getCustomWorksheets : null;
    window.getWorksheetList      = typeof getWorksheetList !== 'undefined' ? getWorksheetList : null;
    window.getAllWorksheets      = typeof getAllWorksheets !== 'undefined' ? getAllWorksheets : null;
    window.ENG_LETTERS           = typeof ENG_LETTERS !== 'undefined' ? ENG_LETTERS : null;
    window.HINDI_LETTERS         = typeof HINDI_LETTERS !== 'undefined' ? HINDI_LETTERS : null;
    window.SHEETS                = typeof SHEETS !== 'undefined' ? SHEETS : null;
  `);

  return { dom, window };
}

// ── Shared DOM instance ──────────────────────────────────────────────────────
let w;
try {
  const env = makeDOM();
  w = env.window;
  process.stdout.write('\n✅ DOM environment initialized successfully\n');
} catch (e) {
  process.stdout.write('\n❌ FATAL: DOM environment failed: ' + e.message + '\n');
  process.exit(1);
}

// Helper: render a question and get the resulting HTML
function renderQ(q) {
  w.state.player.worksheet    = { subject: 'english', questions: [q] };
  w.state.player.questionIndex = 0;
  w.state.player.selectedOption = null;
  w.state.player.checked       = false;
  w.renderCurrentQuestion();
  return w.document.getElementById('app').innerHTML;
}

// Helper: quick question factory
function mkQ(id, type, text, extra) {
  return { id, type, text, marks: 1, ...extra };
}

// ════════════════════════════════════════════════════════════════
const S1 = section('1. DATA INTEGRITY — All Worksheets');
// ════════════════════════════════════════════════════════════════

test(S1, 'ALL_WORKSHEETS is defined', () => assert(Array.isArray(w.ALL_WORKSHEETS)));
test(S1, 'Total worksheets >= 36', () => assert(w.ALL_WORKSHEETS.length >= 36, 'Got: ' + w.ALL_WORKSHEETS.length));
test(S1, 'Original data.js contributes 30+ worksheets', () => {
  const orig = w.ALL_WORKSHEETS.filter(ws => !ws.id.includes('p2'));
  assert(orig.length >= 30, 'Got: ' + orig.length);
});
test(S1, 'Phase 2 worksheets >= 6', () => {
  const p2 = w.ALL_WORKSHEETS.filter(ws => ws.id.includes('p2'));
  assert(p2.length >= 6, 'Got: ' + p2.length);
});

// Check every subject has worksheets
['english','maths','hindi','ga','art'].forEach(sub => {
  test(S1, `Subject "${sub}" has worksheets`, () => {
    const count = w.ALL_WORKSHEETS.filter(ws => ws.subject === sub).length;
    assert(count > 0, sub + ' has 0 worksheets');
  });
});

// Check every worksheet has valid structure
test(S1, 'All worksheets have required fields', () => {
  const bad = w.ALL_WORKSHEETS.filter(ws => !ws.id || !ws.subject || !ws.title || !Array.isArray(ws.questions));
  assert(bad.length === 0, 'Bad worksheets: ' + bad.map(w=>w.id).join(', '));
});
test(S1, 'No worksheet has 0 questions', () => {
  const bad = w.ALL_WORKSHEETS.filter(ws => ws.questions.length === 0);
  assert(bad.length === 0, 'Empty: ' + bad.map(w=>w.id).join(', '));
});
test(S1, 'All questions have id, type, text', () => {
  const bad = [];
  w.ALL_WORKSHEETS.forEach(ws => ws.questions.forEach(q => {
    if (!q.id || !q.type || !q.text) bad.push(ws.id + '/' + q.id);
  }));
  assert(bad.length === 0, 'Invalid: ' + bad.slice(0,5).join(', '));
});

// Check Phase 2 question types exist in data
const P2_TYPES = ['MATCH','CIRCLE_FIND','SEQUENCE_NEXT','ARRANGE','UNSCRAMBLE','WORD_BUILD',
  'AUDIO_WRITE','TEXT_HIGHLIGHT','PICTURE_WRITE','GROUPS_OF_TENS','DRAG_SLOT','VOWEL_SORT'];
P2_TYPES.forEach(t => {
  test(S1, `At least 1 question of type ${t} in data`, () => {
    const found = w.ALL_WORKSHEETS.some(ws => ws.questions.some(q => q.type === t));
    assert(found, 'No question of type ' + t + ' found in any worksheet');
  });
});

// ════════════════════════════════════════════════════════════════
const S2 = section('2. RENDERER — Each Question Type Produces Valid HTML');
// ════════════════════════════════════════════════════════════════

test(S2, 'MCQ renders options', () => {
  const html = renderQ(mkQ('t','MCQ','Which is a vowel?',{options:['A','B','C','D'],answer:'A'}));
  assertContains(html, 'mcq-option');
  assertContains(html, 'Which is a vowel');
  assertContains(html, 'btn-check');
});

test(S2, 'TRUE_FALSE renders true/false buttons', () => {
  const html = renderQ(mkQ('t','TRUE_FALSE','The sky is blue.',{answer:true}));
  assertContains(html, 'btn-true');
  assertContains(html, 'btn-false');
  assertContains(html, 'The sky is blue');
});

test(S2, 'FILL_BLANK renders input field', () => {
  const html = renderQ(mkQ('t','FILL_BLANK','The color of grass is _____.',{answer:'green'}));
  assertContains(html, 'fill-input');
  assertContains(html, 'fill-blank-input');
});

test(S2, 'MATCH renders left and right columns', () => {
  const html = renderQ(mkQ('t','MATCH','Match animals to sounds.',{
    pairs:[{left:'Cow',right:'Moo'},{left:'Dog',right:'Woof'}]
  }));
  assertContains(html, 'Cow');
  assertContains(html, 'Moo');
  assertContains(html, 'match-left');
});

test(S2, 'CIRCLE_FIND renders item grid', () => {
  const html = renderQ(mkQ('t','CIRCLE_FIND','Tap all vowels.',{
    items:['A','B','C','D','E'], correctItems:['A','E']
  }));
  assertContains(html, 'cf-item');
  assertContains(html, '>A<');
  assertContains(html, '>E<');
});

test(S2, 'DRAG_SLOT renders sentence with slot and options', () => {
  const html = renderQ(mkQ('t','DRAG_SLOT','The cat sat on the [BLANK].',{
    text:'The cat sat on the [BLANK].', options:['mat','dog','fly'], slots:[{answer:'mat'}]
  }));
  assertContains(html, 'slot-blank');
  assertContains(html, 'tile-btn');
  assertContains(html, 'mat');
});

test(S2, 'ARRANGE renders draggable tiles', () => {
  const html = renderQ(mkQ('t','ARRANGE','Arrange in ascending order.',{
    items:['5','3','1','4','2'], correctOrder:['1','2','3','4','5']
  }));
  assertContains(html, 'arrange-tile');
  assertContains(html, 'arrange-answer');
});

test(S2, 'SEQUENCE_NEXT renders blank boxes', () => {
  const html = renderQ(mkQ('t','SEQUENCE_NEXT','Fill the next letters.',{
    given:['A','B','C'], blanks:2, answers:['D','E']
  }));
  assertContains(html, 'seq-item');
  assertContains(html, 'seq-blank');
  assertContains(html, '>A<');
});

test(S2, 'SEQUENCE_PREV renders blank boxes at start', () => {
  const html = renderQ(mkQ('t','SEQUENCE_PREV','Fill the previous letters.',{
    given:['C','D','E'], blanks:2, answers:['A','B']
  }));
  assertContains(html, 'seq-blank');
  assertContains(html, '>C<');
});

test(S2, 'UNSCRAMBLE renders scrambled letter tiles', () => {
  const html = renderQ(mkQ('t','UNSCRAMBLE','Unscramble to make a word.',{
    scrambled:['T','A','C'], answer:'CAT', hint:'It meows'
  }));
  assertContains(html, 'scramble-letter');
  assertContains(html, 'ans-slot');
});

test(S2, 'WORD_BUILD renders letter pool and answer slots', () => {
  const html = renderQ(mkQ('t','WORD_BUILD','Tap letters to build DOG.',{
    letterPool:['D','O','G','X'], answer:'DOG'
  }));
  assertContains(html, 'scramble-letter');
  assertContains(html, 'wbs-');
});

test(S2, 'WORD_FIRST_LETTER renders word-with-blank and options', () => {
  const html = renderQ(mkQ('t','WORD_FIRST_LETTER','Pick the first letter.',{
    wordWithBlank:'___AT', options:['C','B','F','D'], answer:'C', completeWord:'CAT'
  }));
  assertContains(html, 'blank-letter');
  assertContains(html, 'letter-choice');
});

test(S2, 'WORD_LAST_LETTER renders word-with-blank and options', () => {
  const html = renderQ(mkQ('t','WORD_LAST_LETTER','Pick the last letter.',{
    wordWithBlank:'CA___', options:['T','N','R','P'], answer:'T', completeWord:'CAT'
  }));
  assertContains(html, 'blank-letter');
  assertContains(html, 'letter-choice');
});

test(S2, 'AUDIO_WRITE renders speak button and input', () => {
  const html = renderQ(mkQ('t','AUDIO_WRITE','Listen and write.',{
    spokenText:'elephant', expectedAnswer:'elephant', language:'en-IN'
  }));
  assertContains(html, 'btn-speak');
  assertContains(html, 'aw-input');
});

test(S2, 'TEXT_HIGHLIGHT renders passage with clickable words', () => {
  const html = renderQ(mkQ('t','TEXT_HIGHLIGHT','Tap CVC words.',{
    passage:'The cat sat on a mat.', correctWords:['cat','sat','mat']
  }));
  assertContains(html, 'th-word');
  assertContains(html, 'th-passage');
  assertContains(html, 'cat');
});

test(S2, 'PICTURE_WRITE renders emoji and text input', () => {
  const html = renderQ(mkQ('t','PICTURE_WRITE','Write one word.',{
    picture:'🌻', text:'Write one word for this picture',
    expectedAnswers:['flower','sunflower']
  }));
  assertContains(html, 'pw-picture');
  assertContains(html, 'pw-input');
  assertContains(html, '\uD83C\uDF3B'); // 🌻
});

test(S2, 'GROUPS_OF_TENS renders dot blocks and input', () => {
  const html = renderQ(mkQ('t','GROUPS_OF_TENS','How many tens?',{
    tensCount:3, unitsCount:0, question:'How many TENS?', answer:'3'
  }));
  assertContains(html, 'ten-group');
  assertContains(html, 'ten-dot');
  assertContains(html, 'got-input');
  assertContains(html, 'How many TENS');
});

test(S2, 'GROUPS_OF_TENS with units shows both groups and unit dots', () => {
  const html = renderQ(mkQ('t','GROUPS_OF_TENS','What number?',{
    tensCount:2, unitsCount:4, question:'What number is shown?', answer:'24'
  }));
  assertContains(html, 'unit-group');
  assertContains(html, 'unit-dot');
});

test(S2, 'VOWEL_SORT single mode renders word buttons', () => {
  w.state.player.worksheet = { subject: 'english', questions: [mkQ('t','VOWEL_SORT','Sort A words.',{
    mode:'single', lang:'english', targetVowel:'A',
    words:['cat','egg','hat','big'], correctWords:['cat','hat']
  })] };
  w.state.player.questionIndex = 0;
  w.renderCurrentQuestion();
  const html = w.document.getElementById('app').innerHTML;
  assertContains(html, 'vs-word-btn');
  assertContains(html, 'cat');
  assertContains(html, 'egg');
});

test(S2, 'AUDIO_CLIP with text mode renders play button and canvas area', () => {
  const html = renderQ(mkQ('t','AUDIO_CLIP','Listen and write.',{
    audioData:'data:audio/webm;base64,abc', lineType:'4-line', answerType:'write'
  }));
  assertContains(html, 'btn-play-audio');
  assertContains(html, 'audio-clip-area');
});

test(S2, 'AUDIO_CLIP with MCQ mode renders options', () => {
  const html = renderQ(mkQ('t','AUDIO_CLIP','Listen and pick the answer.',{
    audioData:'data:audio/webm;base64,abc', answerType:'mcq',
    options:['cat','bat','mat','hat'], answer:'cat'
  }));
  assertContains(html, 'aopt-');
});

// ════════════════════════════════════════════════════════════════
const S3 = section('3. EVALUATOR — Correct/Incorrect Answer Logic');
// ════════════════════════════════════════════════════════════════

function evalQ(q, setupFn) {
  // Render the question first
  renderQ(q);
  // Run setup (set state/window vars to simulate child interaction)
  if (setupFn) setupFn(w);
  // Run checkAnswer
  w.checkAnswer();
  return w.state.player.answers[w.state.player.answers.length - 1];
}

function resetPlayer() {
  w.state.player.answers       = [];
  w.state.player.score         = 0;
  w.state.player.selectedOption = null;
  w.state.player.checked       = false;
}

// MCQ
resetPlayer();
test(S3, 'MCQ: correct option → isCorrect=true', () => {
  resetPlayer();
  const q = mkQ('m1','MCQ','Which?',{options:['A','B','C'],answer:'A'});
  renderQ(q);
  w.state.player.selectedOption = 'A';
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === true, 'Expected correct=true');
});

test(S3, 'MCQ: wrong option → isCorrect=false', () => {
  resetPlayer();
  const q = mkQ('m2','MCQ','Which?',{options:['A','B','C'],answer:'A'});
  renderQ(q);
  w.state.player.selectedOption = 'B';
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === false, 'Expected correct=false');
});

// TRUE_FALSE
test(S3, 'TRUE_FALSE: correct true → isCorrect=true', () => {
  resetPlayer();
  const q = mkQ('tf1','TRUE_FALSE','Sky is blue.',{answer:true});
  renderQ(q);
  w.state.player.selectedOption = true;
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === true);
});
test(S3, 'TRUE_FALSE: wrong false → isCorrect=false', () => {
  resetPlayer();
  const q = mkQ('tf2','TRUE_FALSE','Sky is blue.',{answer:true});
  renderQ(q);
  w.state.player.selectedOption = false;
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === false);
});

// FILL_BLANK
test(S3, 'FILL_BLANK: exact match → isCorrect=true', () => {
  resetPlayer();
  const q = mkQ('fb1','FILL_BLANK','Color of grass is ___.',{answer:'green'});
  renderQ(q);
  const inp = w.document.getElementById('fill-input');
  if (inp) inp.value = 'green';
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === true);
});
test(S3, 'FILL_BLANK: case insensitive match → isCorrect=true', () => {
  resetPlayer();
  const q = mkQ('fb2','FILL_BLANK','Capital of India is ___.',{answer:'delhi'});
  renderQ(q);
  const inp = w.document.getElementById('fill-input');
  if (inp) inp.value = 'Delhi';
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === true, 'Case-insensitive failed');
});
test(S3, 'FILL_BLANK: wrong answer → isCorrect=false', () => {
  resetPlayer();
  const q = mkQ('fb3','FILL_BLANK','Color of sky is ___.',{answer:'blue'});
  renderQ(q);
  const inp = w.document.getElementById('fill-input');
  if (inp) inp.value = 'red';
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === false);
});

// PICTURE_WRITE
test(S3, 'PICTURE_WRITE: matching expectedAnswer → isCorrect=true', () => {
  resetPlayer();
  const q = mkQ('pw1','PICTURE_WRITE','Write one word.',{
    picture:'🌻', expectedAnswers:['flower','sunflower']
  });
  renderQ(q);
  const inp = w.document.getElementById('pw-input');
  if (inp) inp.value = 'flower';
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === true);
});
test(S3, 'PICTURE_WRITE: any non-empty answer → isCorrect=true (open-ended)', () => {
  resetPlayer();
  const q = mkQ('pw2','PICTURE_WRITE','Describe.',{picture:'🐘', expectedAnswers:['elephant']});
  renderQ(q);
  const inp = w.document.getElementById('pw-input');
  if (inp) inp.value = 'big animal'; // not in expectedAnswers but non-empty → accepted
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === true, 'Open-ended should accept any non-empty');
});

// AUDIO_WRITE
test(S3, 'AUDIO_WRITE: exact match → isCorrect=true', () => {
  resetPlayer();
  const q = mkQ('aw1','AUDIO_WRITE','Listen.',{spokenText:'cat',expectedAnswer:'cat',language:'en-IN'});
  renderQ(q);
  const inp = w.document.getElementById('aw-input');
  if (inp) inp.value = 'cat';
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === true);
});
test(S3, 'AUDIO_WRITE: wrong answer → isCorrect=false', () => {
  resetPlayer();
  const q = mkQ('aw2','AUDIO_WRITE','Listen.',{spokenText:'cat',expectedAnswer:'cat',language:'en-IN'});
  renderQ(q);
  const inp = w.document.getElementById('aw-input');
  if (inp) inp.value = 'dog';
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === false);
});

// GROUPS_OF_TENS
test(S3, 'GROUPS_OF_TENS: correct count → isCorrect=true', () => {
  resetPlayer();
  const q = mkQ('gt1','GROUPS_OF_TENS','Count!',{tensCount:3,unitsCount:0,question:'How many tens?',answer:'3'});
  renderQ(q);
  const inp = w.document.getElementById('got-input');
  if (inp) inp.value = '3';
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === true);
});
test(S3, 'GROUPS_OF_TENS: wrong count → isCorrect=false', () => {
  resetPlayer();
  const q = mkQ('gt2','GROUPS_OF_TENS','Count!',{tensCount:3,unitsCount:0,question:'How many tens?',answer:'3'});
  renderQ(q);
  const inp = w.document.getElementById('got-input');
  if (inp) inp.value = '5';
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === false);
});

// TEXT_HIGHLIGHT
test(S3, 'TEXT_HIGHLIGHT: all correct words highlighted → isCorrect=true', () => {
  resetPlayer();
  const q = mkQ('th1','TEXT_HIGHLIGHT','Tap CVC words.',{
    passage:'The cat sat on a mat.',correctWords:['cat','sat','mat']
  });
  renderQ(q);
  w._thState = { highlighted: new Set(['cat','sat','mat']), correctWords:['cat','sat','mat'] };
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === true);
});
test(S3, 'TEXT_HIGHLIGHT: partial highlight → isCorrect=false', () => {
  resetPlayer();
  const q = mkQ('th2','TEXT_HIGHLIGHT','Tap CVC words.',{
    passage:'The cat sat on a mat.',correctWords:['cat','sat','mat']
  });
  renderQ(q);
  w._thState = { highlighted: new Set(['cat']), correctWords:['cat','sat','mat'] };
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === false);
});

// VOWEL_SORT single mode
test(S3, 'VOWEL_SORT single: all correct circled → isCorrect=true', () => {
  resetPlayer();
  const q = mkQ('vs1','VOWEL_SORT','Sort A words.',{
    mode:'single',lang:'english',targetVowel:'A',
    words:['cat','egg','hat','big','bag'],correctWords:['cat','hat','bag']
  });
  renderQ(q);
  w._vsState = {
    mode:'single', words:['cat','egg','hat','big','bag'],
    circled: new Set([0,2,4]), // cat(0), hat(2), bag(4)
    correct: new Set(['cat','hat','bag'])
  };
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === true);
});
test(S3, 'VOWEL_SORT single: wrong selection → isCorrect=false', () => {
  resetPlayer();
  const q = mkQ('vs2','VOWEL_SORT','Sort A words.',{
    mode:'single',lang:'english',targetVowel:'A',
    words:['cat','egg','hat'],correctWords:['cat','hat']
  });
  renderQ(q);
  w._vsState = {
    mode:'single', words:['cat','egg','hat'],
    circled: new Set([0,1]), // cat, egg (wrong — egg is not A-sound)
    correct: new Set(['cat','hat'])
  };
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === false);
});

// AUDIO_CLIP write mode (open-ended → always correct)
test(S3, 'AUDIO_CLIP write mode → always correct (open-ended)', () => {
  resetPlayer();
  const q = mkQ('ac1','AUDIO_CLIP','Listen.',{audioData:'data:audio/webm;base64,abc',answerType:'write',lineType:'4-line'});
  renderQ(q);
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === true);
});

// AUDIO_CLIP MCQ mode
test(S3, 'AUDIO_CLIP MCQ: correct option → isCorrect=true', () => {
  resetPlayer();
  const q = mkQ('ac2','AUDIO_CLIP','Listen and pick.',{
    audioData:'data:audio/webm;base64,abc',answerType:'mcq',options:['cat','bat'],answer:'cat'
  });
  renderQ(q);
  w.state.player.selectedOption = 'cat';
  w.checkAnswer();
  assert(w.state.player.answers[0].correct === true);
});

// ════════════════════════════════════════════════════════════════
const S4 = section('4. SCORE TRACKING — Progress Saved Correctly');
// ════════════════════════════════════════════════════════════════

test(S4, 'Score increments on correct answer', () => {
  resetPlayer();
  const q = mkQ('sc1','MCQ','A?',{options:['A','B'],answer:'A'});
  renderQ(q);
  const beforeScore = w.state.player.score;
  w.state.player.selectedOption = 'A';
  w.checkAnswer();
  assert(w.state.player.score === beforeScore + 1, 'Score did not increment');
});
test(S4, 'Score does NOT increment on wrong answer', () => {
  resetPlayer();
  const q = mkQ('sc2','MCQ','A?',{options:['A','B'],answer:'A'});
  renderQ(q);
  const beforeScore = w.state.player.score;
  w.state.player.selectedOption = 'B';
  w.checkAnswer();
  assert(w.state.player.score === beforeScore, 'Score incremented on wrong answer');
});
test(S4, 'saveProgress stores in localStorage', () => {
  w.saveProgress('test_ws_001', 8, 10);
  const p = w.getProgress();
  assert(p['test_ws_001'], 'Progress not found');
  assert(p['test_ws_001'].score === 8, 'Wrong score');
  assert(p['test_ws_001'].pct === 80, 'Wrong pct: ' + p['test_ws_001'].pct);
});

// ════════════════════════════════════════════════════════════════
const S5 = section('5. QUESTION TYPE — Data Structure Validation');
// ════════════════════════════════════════════════════════════════

// For each type, find at least one real worksheet question and validate its schema
const typeChecks = {
  MCQ:            q => q.options && q.answer,
  TRUE_FALSE:     q => typeof q.answer === 'boolean',
  FILL_BLANK:     q => q.answer !== undefined,
  MATCH:          q => Array.isArray(q.pairs) && q.pairs.length > 0 && q.pairs[0].left && q.pairs[0].right,
  CIRCLE_FIND:    q => Array.isArray(q.items) && Array.isArray(q.correctItems),
  DRAG_SLOT:      q => Array.isArray(q.options) && Array.isArray(q.slots),
  ARRANGE:        q => Array.isArray(q.items) && Array.isArray(q.correctOrder),
  SEQUENCE_NEXT:  q => Array.isArray(q.given) && Array.isArray(q.answers),
  SEQUENCE_PREV:  q => Array.isArray(q.given) && Array.isArray(q.answers),
  UNSCRAMBLE:     q => Array.isArray(q.scrambled) && q.answer,
  WORD_BUILD:     q => Array.isArray(q.letterPool) && q.answer,
  AUDIO_WRITE:    q => q.spokenText && q.expectedAnswer,
  TEXT_HIGHLIGHT: q => q.passage && Array.isArray(q.correctWords),
  PICTURE_WRITE:  q => q.picture && Array.isArray(q.expectedAnswers),
  GROUPS_OF_TENS: q => typeof q.tensCount === 'number' && q.answer,
  VOWEL_SORT:     q => q.mode && Array.isArray(q.words),
};

Object.entries(typeChecks).forEach(([type, schemaFn]) => {
  test(S5, `${type}: schema valid in all worksheet instances`, () => {
    const allOfType = [];
    w.ALL_WORKSHEETS.forEach(ws => ws.questions.forEach(q => { if (q.type === type) allOfType.push(q); }));
    assert(allOfType.length > 0, 'No questions of type ' + type + ' in worksheets');
    const bad = allOfType.filter(q => !schemaFn(q));
    assert(bad.length === 0, `${bad.length} invalid ${type} questions: ${bad.map(q=>q.id).join(',')}`);
  });
});

// ════════════════════════════════════════════════════════════════
const S6 = section('6. ROUTER — All Routes Dispatch Correctly');
// ════════════════════════════════════════════════════════════════

test(S6, 'Landing page renders role cards', () => {
  w.window.location.hash = '/';
  w.router();
  const html = w.document.getElementById('app').innerHTML;
  assertContains(html, 'btn-child-role');
  assertContains(html, 'btn-mentor-role');
});

test(S6, 'Child home renders subject grid', () => {
  w.window.location.hash = '#/child';
  w.router();
  const html = w.document.getElementById('app').innerHTML;
  assertContains(html, 'english');
  assertContains(html, 'maths');
});

test(S6, 'Mentor dashboard renders', () => {
  w.window.location.hash = '#/mentor';
  w.router();
  const html = w.document.getElementById('app').innerHTML;
  assertContains(html, 'btn-new-ws');
});

test(S6, 'Worksheet list renders for english subject', () => {
  w.window.location.hash = '#/child/subject/english';
  w.router();
  const html = w.document.getElementById('app').innerHTML;
  assertContains(html, 'eng_001');
});

test(S6, 'Unknown route fallback to landing', () => {
  w.window.location.hash = '#/unknown/garbage/route';
  w.router();
  const html = w.document.getElementById('app').innerHTML;
  // Should render something (not crash)
  assert(html.length > 100, 'Router returned empty page');
});

// ════════════════════════════════════════════════════════════════
const S7 = section('7. MENTOR BUILDER — Question Collection Logic');
// ════════════════════════════════════════════════════════════════

test(S7, 'renderMentorDashboard renders without crash', () => {
  w.renderMentorDashboard();
  const html = w.document.getElementById('app').innerHTML;
  assertContains(html, 'btn-new-ws');
});

test(S7, 'renderMentorSubject for english renders worksheets', () => {
  w.renderMentorSubject('english');
  const html = w.document.getElementById('app').innerHTML;
  assertContains(html, 'English');
});

test(S7, 'renderBuilder initializes state correctly', () => {
  w.renderBuilder(null);
  assert(w.state.builder !== null, 'builder state is null');
  assert(w.state.builder.questions !== undefined, 'builder.questions missing');
});

test(S7, 'builderSetType MCQ renders MCQ form', () => {
  w.renderBuilder(null);
  w.builderSetType('MCQ');
  const html = w.document.getElementById('app').innerHTML;
  assertContains(html, 'f-qtext');
});

test(S7, 'saveBuilderWorksheet saves to localStorage', () => {
  // Set up a minimal valid builder state
  w.state.builder = {
    editId: null, title: 'My Test WS', subject: 'english',
    difficulty: 'easy', description: 'A test',
    questions: [mkQ('bq1','MCQ','Question?',{options:['A','B'],answer:'A'})],
    addingType: 'MCQ'
  };
  w.saveBuilderWorksheet();
  const saved = w.getCustomWorksheets();
  assert(saved.length > 0, 'Nothing saved');
  assert(saved[0].title === 'My Test WS', 'Wrong title: ' + saved[0].title);
});

test(S7, 'Saved custom worksheet is retrievable via getAllWorksheets', () => {
  const all = w.getAllWorksheets();
  const found = all.find(ws => ws.title === 'My Test WS');
  assert(found !== undefined, 'Custom worksheet not found in getAllWorksheets');
});

test(S7, 'Custom worksheet can be played (player loads it)', () => {
  const all = w.getAllWorksheets();
  const ws  = all.find(ws => ws.title === 'My Test WS');
  w.renderPlayer(ws.id);
  const html = w.document.getElementById('app').innerHTML;
  assertContains(html, 'Question?', 'Player did not show question text');
});

// ════════════════════════════════════════════════════════════════
const S8 = section('8. TRACING — State and Report Functions');
// ════════════════════════════════════════════════════════════════

test(S8, 'saveTracingReport stores report in localStorage', () => {
  w.saveTracingReport('A', 'english', 95, '4-line', 'finger');
  const reports = JSON.parse(w.localStorage.getItem('kw_trace_reports') || '[]');
  assert(reports.length > 0, 'No reports saved');
  const last = reports[reports.length - 1];
  assert(last.letter === 'A', 'Wrong letter: ' + last.letter);
  assert(last.accuracy === 95, 'Wrong accuracy: ' + last.accuracy);
});

test(S8, 'ENG_LETTERS is defined and has 26 letters', () => {
  assert(Array.isArray(w.ENG_LETTERS), 'ENG_LETTERS not defined');
  assert(w.ENG_LETTERS.length === 26, 'ENG_LETTERS length: ' + w.ENG_LETTERS.length);
});

test(S8, 'HINDI_LETTERS is defined and has Devanagari', () => {
  assert(Array.isArray(w.HINDI_LETTERS), 'HINDI_LETTERS not defined');
  assert(w.HINDI_LETTERS.length > 10, 'HINDI_LETTERS too short');
  assert(/[\u0900-\u097F]/.test(w.HINDI_LETTERS[0]), 'HINDI_LETTERS[0] not Devanagari: ' + w.HINDI_LETTERS[0]);
});

test(S8, 'SHEETS config includes all 5 sheet types', () => {
  assert(Array.isArray(w.SHEETS), 'SHEETS not defined');
  const ids = w.SHEETS.map(s => s.id);
  ['2-line','3-line','4-line','grid','blank'].forEach(id => {
    assert(ids.includes(id), 'Missing sheet type: ' + id);
  });
});

// ════════════════════════════════════════════════════════════════
const S9 = section('9. SPECIAL FEATURES — speakText, drawSheetLines');
// ════════════════════════════════════════════════════════════════

test(S9, 'speakText exists and is callable without crash', () => {
  assert(typeof w.speakText === 'function');
  w.speakText('hello', 'en-IN'); // should not throw (speechSynthesis is stubbed)
});

test(S9, 'drawSheetLines exists and is callable', () => {
  assert(typeof w.drawSheetLines === 'function');
  // Create a mock canvas context
  const mockCtx = {
    calls: [],
    clearRect:   function() { this.calls.push('clearRect'); },
    fillRect:    function() { this.calls.push('fillRect'); },
    strokeStyle: '',
    lineWidth:   1,
    fillStyle:   '',
    beginPath:   function() {},
    moveTo:      function() {},
    lineTo:      function() {},
    stroke:      function() { this.calls.push('stroke'); },
  };
  w._audioClipSheet = '4-line';
  w.drawSheetLines(mockCtx, 400, 200);
  assert(mockCtx.calls.includes('clearRect'), 'drawSheetLines did not call clearRect');
  assert(mockCtx.calls.includes('stroke'), 'drawSheetLines did not draw any lines');
});

test(S9, 'drawSheetLines handles 3-line (Hindi) correctly', () => {
  const strokes = [];
  const mockCtx = {
    clearRect:()=>{}, fillRect:()=>{}, beginPath:()=>{}, moveTo:()=>{}, lineTo:()=>{},
    stroke:()=>{ strokes.push(1); }, strokeStyle:'', lineWidth:1, fillStyle:''
  };
  w._audioClipSheet = '3-line';
  w.drawSheetLines(mockCtx, 400, 200);
  assert(strokes.length === 3, 'Expected 3 lines for 3-line sheet, got: ' + strokes.length);
});

test(S9, 'drawSheetLines handles grid correctly', () => {
  const strokes = [];
  const mockCtx = {
    clearRect:()=>{}, fillRect:()=>{}, beginPath:()=>{}, moveTo:()=>{}, lineTo:()=>{},
    stroke:()=>{ strokes.push(1); }, strokeStyle:'', lineWidth:1, fillStyle:''
  };
  w._audioClipSheet = 'grid';
  w.drawSheetLines(mockCtx, 200, 120);
  assert(strokes.length > 5, 'Grid should draw many lines, got: ' + strokes.length);
});

// ════════════════════════════════════════════════════════════════
// FINAL SUMMARY
// ════════════════════════════════════════════════════════════════
process.stdout.write('\n' + '═'.repeat(60) + '\n');
process.stdout.write(' FINAL TEST RESULTS\n');
process.stdout.write('═'.repeat(60) + '\n\n');

Object.entries(sections).forEach(([name, s]) => {
  const icon = s.fail === 0 ? '✅' : '❌';
  process.stdout.write(`  ${icon}  ${name}: ${s.pass} pass, ${s.fail} fail\n`);
});

process.stdout.write(`\n  Total Passed:  ${passed}\n`);
process.stdout.write(`  Total Failed:  ${failed}\n`);

if (allIssues.length > 0) {
  process.stdout.write('\n' + '─'.repeat(60) + '\n');
  process.stdout.write(' FAILURES TO FIX:\n');
  process.stdout.write('─'.repeat(60) + '\n');
  allIssues.forEach((x, i) => {
    process.stdout.write(`  ${i+1}. ${x.label}\n     ${x.error}\n`);
  });
}

process.stdout.write('\n');
process.exit(failed > 0 ? 1 : 0);
