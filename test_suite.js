// KidWorksheets — Static Analysis & Logic Test Suite
// Tests: JS syntax, function existence, data integrity, question type coverage
const fs = require('fs');
const path = require('path');

const BASE = 'e:/antigravity/ClassWorksheets/pwa/js';
let passed = 0, failed = 0, warnings = 0;
const issues = [];

function ok(label) { passed++; console.log('  ✅', label); }
function fail(label, detail) { failed++; issues.push({label, detail}); console.log('  ❌', label, detail||''); }
function warn(label, detail) { warnings++; console.log('  ⚠️', label, detail||''); }

// ── Load file contents ──────────────────────────────────────────────
const appJs     = fs.readFileSync(path.join(BASE,'app.js'),'utf8');
const mentorJs  = fs.readFileSync(path.join(BASE,'mentor.js'),'utf8');
const dataJs    = fs.readFileSync(path.join(BASE,'data.js'),'utf8');
const data2Js   = fs.readFileSync(path.join(BASE,'data2.js'),'utf8');
const indexHtml = fs.readFileSync('e:/antigravity/ClassWorksheets/pwa/index.html','utf8');
const swJs      = fs.readFileSync('e:/antigravity/ClassWorksheets/pwa/sw.js','utf8');
const appCss    = fs.readFileSync('e:/antigravity/ClassWorksheets/pwa/css/app.css','utf8');

console.log('\n=== 1. FILE EXISTENCE ===');
['app.js','mentor.js','data.js','data2.js'].forEach(f => {
  fs.existsSync(path.join(BASE,f)) ? ok(f+' exists') : fail(f+' MISSING');
});

console.log('\n=== 2. HTML SCRIPT LOADING ORDER ===');
['data.js','data2.js','mentor.js','app.js'].forEach(f => {
  indexHtml.includes(f) ? ok('index.html loads '+f) : fail('index.html MISSING '+f);
});
const d2pos = indexHtml.indexOf('data2.js');
const menPos = indexHtml.indexOf('mentor.js');
const appPos = indexHtml.indexOf('app.js"');
if (d2pos < menPos && menPos < appPos) ok('Script load order: data2 < mentor < app');
else fail('Script load order WRONG: data2 < mentor < app expected');

console.log('\n=== 3. SERVICE WORKER ===');
(swJs.includes('kidworksheets-v2') || swJs.includes('kidworksheets-v3')) ? ok('SW cache version is current') : fail('SW still on old cache');
['data2.js','mentor.js','app.js','data.js'].forEach(f => {
  swJs.includes(f) ? ok('SW caches /js/'+f) : fail('SW NOT caching /js/'+f);
});

console.log('\n=== 4. CORE FUNCTIONS — app.js ===');
const APP_FUNS = [
  'function renderCurrentQuestion',
  'function prevQuestion',
  'function checkAnswer',
  'function renderMCQ',
  'function renderTrueFalse',
  'function renderFillBlank',
  'function renderCategorize',
  'function renderMatch',
  'function renderCircleFind',
  'function renderDragSlot',
  'function renderArrange',
  'function renderSequenceNext',
  'function renderSequencePrev',
  'function renderUnscramble',
  'function renderWordBuild',
  'function renderWordFirstLetter',
  'function renderWordLastLetter',
  'function renderAudioClip',
  'function renderVowelSort',
  'function renderTextHighlight',
  'function renderPictureWrite',
  'function renderAudioWrite',
  'function renderGroupsOfTens',
  'function drawSheetLines',
  'function renderTracingPractice',
  'function initTraceCanvas',
  'function saveTracingReport',
  'function doneTracing',
  'function spawnPerfectionBlast',
  'function speakText',
  'function thToggleWord',
  'function vsToggleWord',
  'function vsPlaceInBin',
  'function toggleAudioPlay',
  'function initAudioWriteCanvas',
  'function renderWorksheetVideos',
  'function parseVideoEmbedUrl',
];
APP_FUNS.forEach(fn => {
  appJs.includes(fn) ? ok(fn) : fail('MISSING in app.js: '+fn);
});

console.log('\n=== 5. QUESTION TYPE DISPATCH — app.js ===');
const TYPES = ['MCQ','TRUE_FALSE','FILL_BLANK','CATEGORIZE','MATCH','CIRCLE_FIND',
  'DRAG_SLOT','ARRANGE','SEQUENCE_NEXT','SEQUENCE_PREV','UNSCRAMBLE','WORD_BUILD',
  'WORD_FIRST_LETTER','WORD_LAST_LETTER','AUDIO_CLIP','VOWEL_SORT',
  'TEXT_HIGHLIGHT','PICTURE_WRITE','AUDIO_WRITE','GROUPS_OF_TENS'];
TYPES.forEach(t => {
  appJs.includes("question.type === '"+t+"'") ? ok('Dispatch: '+t)
    : fail('MISSING dispatch: '+t);
});

console.log('\n=== 6. CHECKANSWER EVALUATION — app.js ===');
const EVAL_TYPES = ['AUDIO_CLIP','VOWEL_SORT','TEXT_HIGHLIGHT','PICTURE_WRITE','AUDIO_WRITE','GROUPS_OF_TENS'];
EVAL_TYPES.forEach(t => {
  appJs.includes("question.type === '"+t+"'") ? ok('Eval: '+t)
    : fail('MISSING eval: '+t);
});

console.log('\n=== 7. MENTOR FUNCTIONS — mentor.js ===');
const MENTOR_FUNS = [
  'function renderMentorDashboard',
  'function renderMentorSubject',
  'function renderMentorBuilder',
  'function builderSetType',
  'function builderAddQuestion',
  'function builderSave',
  'function startMicRecording',
  'function stopMicRecording',
  'function selectBuilderSheet',
  'function handleAudioUpload',
  'function setVowelMode',
  'function renderPrint',
  '_formMCQ',
  '_formTrueFalse',
  '_formFillBlank',
  '_formMatch',
  '_formCircleFind',
  '_formDragSlot',
  '_formArrange',
  '_formSequenceNext',
  '_formWordBuild',
  '_formUnscramble',
  '_formAudioClip',
  '_formVowelSort',
];
MENTOR_FUNS.forEach(fn => {
  mentorJs.includes(fn) ? ok(fn) : fail('MISSING in mentor.js: '+fn);
});

console.log('\n=== 8. DATA INTEGRITY — data.js + data2.js ===');
// Count worksheets
const wsMatches = (dataJs.match(/id: 'eng_\d|id: 'math_\d|id: 'hindi_\d|id: 'ga_\d|id: 'art_\d/g)||[]);
ok('data.js has '+wsMatches.length+' worksheets referenced');
const ws2Matches = (data2Js.match(/id: '(eng|math|hindi|ga|art)_p2/g)||[]);
ok('data2.js has '+ws2Matches.length+' Phase 2 worksheets');

// Check q() helper is used
dataJs.includes("function q(") ? ok('q() helper defined in data.js') : fail('q() helper MISSING in data.js');
data2Js.includes("ALL_WORKSHEETS.push") ? ok('data2.js pushes to ALL_WORKSHEETS') : fail('data2.js does NOT push to ALL_WORKSHEETS');

// Check all Phase 2 types are seeded
const P2_TYPES_IN_DATA2 = ['MATCH','CIRCLE_FIND','SEQUENCE_NEXT','ARRANGE','UNSCRAMBLE','WORD_BUILD',
  'AUDIO_WRITE','TEXT_HIGHLIGHT','PICTURE_WRITE','GROUPS_OF_TENS','DRAG_SLOT','VOWEL_SORT'];
P2_TYPES_IN_DATA2.forEach(t => {
  data2Js.includes("'"+t+"'") ? ok('data2.js seeds: '+t) : warn('data2.js missing: '+t);
});

console.log('\n=== 9. CSS CLASSES ===');
const CSS_CLASSES = [
  '.vowel-sort-area','.vs-bin','.vsb-label','.vs-word-btn',
  '.audio-clip-area','.btn-play-audio','.audio-write-area',
  '.text-highlight-area','.th-passage','.th-word',
  '.picture-write-area','.pw-picture',
  '.groups-of-tens-area','.ten-group','.ten-dot',
  '.got-question',
  '.mic-record-row','.btn-mic','.mic-dot',
  '.sheet-pill','.btn-speak-tts',
  '.qtype-grid','.qtype-card',
  '.builder-q-list','.builder-q-row',
  '.print-doc','.print-q','.print-match-cols',
];
CSS_CLASSES.forEach(cls => {
  appCss.includes(cls) ? ok('CSS: '+cls) : fail('MISSING CSS: '+cls);
});

console.log('\n=== 10. DUPLICATE FUNCTION CHECK ===');
const tracingCount = (appJs.match(/function renderTracingPractice/g)||[]).length;
tracingCount === 1 ? ok('renderTracingPractice: 1 copy (clean)')
  : fail('renderTracingPractice DUPLICATE: '+tracingCount+' copies found — remove one!');

console.log('\n=== 11. ROUTER ROUTES ===');
const ROUTES = ['/child','/child/subject/','/child/worksheet/','/child/results',
  '/trace','/mentor','/mentor/subject/','/mentor/builder','/mentor/print/'];
ROUTES.forEach(r => {
  appJs.includes(r) || appJs.includes(r.replace('/','')) ? ok('Route: '+r) : warn('Route may be missing: '+r);
});

console.log('\n=== SUMMARY ===');
console.log('  Passed:   '+passed);
console.log('  Failed:   '+failed);
console.log('  Warnings: '+warnings);
if (issues.length) {
  console.log('\n=== ISSUES TO FIX ===');
  issues.forEach((i,n) => console.log('  '+(n+1)+'. ❌ '+i.label+' '+(i.detail||'')));
}
