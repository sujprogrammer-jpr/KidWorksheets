/* eslint-disable */
// KidWorksheets PWA — Worksheet Data
// UKG-C Term 1 Examination Syllabus 2026-27
// Vardhman Srikalyan International School
// 30 Worksheets | 300 Questions

'use strict';

// ── Subject Configuration ────────────────────────────────────────────────────
const SUBJECTS = {
  english: {
    id: 'english', name: 'English', emoji: '📚',
    color: '#4ECDC4', light: '#E0F7F6',
    description: 'Alphabets, Words & Grammar',
    worksheetCount: 9
  },
  maths: {
    id: 'maths', name: 'Mathematics', emoji: '🔢',
    color: '#FF6B6B', light: '#FFE8E8',
    description: 'Numbers, Counting & Concepts',
    worksheetCount: 10
  },
  hindi: {
    id: 'hindi', name: 'Hindi', emoji: '🇮🇳',
    color: '#FFD93D', light: '#FFF8CC',
    description: 'वर्णमाला, मात्राएँ और वाक्य',
    worksheetCount: 5
  },
  ga: {
    id: 'ga', name: 'General Awareness', emoji: '🌍',
    color: '#C4B5FD', light: '#F0EBFF',
    description: 'Me, Family, Nature & Animals',
    worksheetCount: 5
  },
  art: {
    id: 'art', name: 'Art & Craft', emoji: '🎨',
    color: '#F9A8D4', light: '#FFF0F7',
    description: 'Colours & Creative Activities',
    worksheetCount: 1
  },
  tuition: {
    id: 'tuition', name: 'Written Test', emoji: '📝',
    color: '#8B5CF6', light: '#F3E8FF',
    description: 'Custom Sheet Generator (4-Line, 3-Line, 2-Line, 1-Line, Grid & Blank)',
    worksheetCount: 4
  }
};

// ── Question Helper ──────────────────────────────────────────────────────────
function q(id, type, text, opts) {
  return { id, type, text, ...opts, marks: opts.marks || 1 };
}
// Expose globally so data2.js (loaded separately) can also use it
if (typeof window !== 'undefined') window.q = q;

// ── ENGLISH WORKSHEETS (9) ───────────────────────────────────────────────────

const ENG_WORKSHEETS = [

  // ── ENG 1: Capital & Small Letters ──────────────────────────────────────
  {
    id: 'eng_001', subject: 'english', title: 'Capital & Small Letters',
    topic: 'Alphabets', difficulty: 'easy', estimatedTime: 10,
    description: 'Identify capital and small letters. Know the vowels.',
    questions: [
      q('e1q1', 'MCQ', 'Which is the CAPITAL letter?', { options: ['a', 'B', 'c', 'd'], answer: 'B' }),
      q('e1q2', 'MCQ', 'The small letter for "G" is?', { options: ['h', 'j', 'g', 'k'], answer: 'g' }),
      q('e1q3', 'MCQ', 'The capital letter for "z" is?', { options: ['X', 'Y', 'Z', 'W'], answer: 'Z' }),
      q('e1q4', 'TRUE_FALSE', '"E" is a vowel.', { answer: true }),
      q('e1q5', 'TRUE_FALSE', '"M" is a vowel.', { answer: false }),
      q('e1q6', 'MCQ', 'Which are all VOWELS?', { options: ['a, e, i, o, u', 'b, c, d, f, g', 'a, b, c, d, e', 'x, y, z'], answer: 'a, e, i, o, u' }),
      q('e1q7', 'MCQ', 'How many letters are in the alphabet?', { options: ['24', '25', '26', '27'], answer: '26' }),
      q('e1q8', 'FILL_BLANK', 'The small letter of "A" is _____.', { answer: 'a', hint: 'Think of lowercase a' }),
      q('e1q9', 'FILL_BLANK', 'The capital of "m" is _____.', { answer: 'M', hint: 'Capital M' }),
      q('e1q10', 'MCQ', 'Which letter comes AFTER "R" in the alphabet?', { options: ['P', 'Q', 'S', 'T'], answer: 'S' }),
    ]
  },

  // ── ENG 2: CVC Sound Words ───────────────────────────────────────────────
  {
    id: 'eng_002', subject: 'english', title: 'CVC Sound Words',
    topic: 'CVC Words', difficulty: 'easy', estimatedTime: 10,
    description: 'Short vowel sounds in consonant-vowel-consonant words.',
    questions: [
      q('e2q1', 'MCQ', 'Which vowel fills the blank in "c_t"?', { options: ['a', 'e', 'i', 'o'], answer: 'a', hint: 'Think of an animal that meows' }),
      q('e2q2', 'MCQ', 'Which vowel fills the blank in "b_d"?', { options: ['a', 'e', 'i', 'u'], answer: 'e', hint: 'You sleep in this' }),
      q('e2q3', 'MCQ', 'Which vowel fills the blank in "p_g"?', { options: ['a', 'e', 'i', 'o'], answer: 'i', hint: 'A pink farm animal' }),
      q('e2q4', 'MCQ', 'Which vowel fills the blank in "d_g"?', { options: ['a', 'e', 'i', 'o'], answer: 'o', hint: 'A pet that barks' }),
      q('e2q5', 'MCQ', 'Which vowel fills the blank in "c_p"?', { options: ['a', 'e', 'i', 'u'], answer: 'u', hint: 'You drink tea in this' }),
      q('e2q6', 'TRUE_FALSE', '"cat" is a CVC word (consonant-vowel-consonant).', { answer: true }),
      q('e2q7', 'MCQ', 'Which is a CVC word?', { options: ['rain', 'tree', 'cat', 'boat'], answer: 'cat' }),
      q('e2q8', 'FILL_BLANK', 'Fill in: "h_n" (a bird that lays eggs).', { answer: 'e', hint: 'The vowel e makes hen' }),
      q('e2q9', 'MCQ', '"sun" has which short vowel sound?', { options: ['a', 'e', 'i', 'u'], answer: 'u' }),
      q('e2q10', 'MCQ', 'Which word has a short "i" sound?', { options: ['cat', 'bit', 'hop', 'sun'], answer: 'bit' }),
    ]
  },

  // ── ENG 3: Starting Blends (l, s, r) ────────────────────────────────────
  {
    id: 'eng_003', subject: 'english', title: 'Starting Blends — l, s, r',
    topic: 'Blending', difficulty: 'medium', estimatedTime: 12,
    description: 'Consonant blends at the beginning of words: bl, cl, fl, sl, sc, sk, sp, st, br, cr, dr, gr, tr.',
    questions: [
      q('e3q1', 'MCQ', 'Which word starts with "bl" blend?', { options: ['black', 'cat', 'dog', 'run'], answer: 'black' }),
      q('e3q2', 'MCQ', 'Which word starts with "sl" blend?', { options: ['slim', 'big', 'top', 'fun'], answer: 'slim' }),
      q('e3q3', 'MCQ', 'Which word starts with "cl" blend?', { options: ['clap', 'bat', 'sit', 'run'], answer: 'clap' }),
      q('e3q4', 'TRUE_FALSE', '"flag" starts with the "fl" blend.', { answer: true }),
      q('e3q5', 'MCQ', 'Which word starts with "gr" blend?', { options: ['green', 'yellow', 'blue', 'pink'], answer: 'green' }),
      q('e3q6', 'MCQ', 'Which word starts with "tr" blend?', { options: ['train', 'boat', 'car', 'bus'], answer: 'train' }),
      q('e3q7', 'FILL_BLANK', 'The starting blend in "___ack" (the colour) is bl or ___ack = black.', { answer: 'bl', hint: 'bl as in black' }),
      q('e3q8', 'MCQ', 'Which word starts with "pl" blend?', { options: ['play', 'run', 'jump', 'swim'], answer: 'play' }),
      q('e3q9', 'TRUE_FALSE', '"flat" starts with the "fl" blend.', { answer: true }),
      q('e3q10', 'MCQ', 'Which word starts with "st" blend?', { options: ['stop', 'hop', 'top', 'pop'], answer: 'stop' }),
    ]
  },

  // ── ENG 4: Ending Blends ─────────────────────────────────────────────────
  {
    id: 'eng_004', subject: 'english', title: 'Ending Blends',
    topic: 'Blending', difficulty: 'medium', estimatedTime: 12,
    description: 'Consonant blends at the end: mp, lt, ft, sk, st, ng, nd.',
    questions: [
      q('e4q1', 'MCQ', 'Which word ends with "-mp" blend?', { options: ['lamp', 'sit', 'run', 'big'], answer: 'lamp' }),
      q('e4q2', 'MCQ', 'Which word ends with "-lt" blend?', { options: ['bolt', 'cat', 'dog', 'hen'], answer: 'bolt' }),
      q('e4q3', 'MCQ', 'Which word ends with "-ft" blend?', { options: ['gift', 'hat', 'pen', 'cup'], answer: 'gift' }),
      q('e4q4', 'MCQ', 'Which word ends with "-sk" blend?', { options: ['desk', 'run', 'play', 'jump'], answer: 'desk' }),
      q('e4q5', 'MCQ', 'Which word ends with "-st" blend?', { options: ['best', 'cat', 'dog', 'hen'], answer: 'best' }),
      q('e4q6', 'MCQ', 'Which word ends with "-ng" blend?', { options: ['song', 'cup', 'bat', 'map'], answer: 'song' }),
      q('e4q7', 'MCQ', 'Which word ends with "-nd" blend?', { options: ['hand', 'foot', 'eye', 'lip'], answer: 'hand' }),
      q('e4q8', 'TRUE_FALSE', '"lamp" ends with the "-mp" blend.', { answer: true }),
      q('e4q9', 'FILL_BLANK', 'The ending blend in "ring" is ___.', { answer: 'ng', hint: 'ng as in ring, sing, king' }),
      q('e4q10', 'MCQ', 'Which word ends with "-nd"?', { options: ['sand', 'rain', 'sun', 'moon'], answer: 'sand' }),
    ]
  },

  // ── ENG 5: Magic 'e' Words ───────────────────────────────────────────────
  {
    id: 'eng_005', subject: 'english', title: "Magic 'e' Words",
    topic: "Magic 'e'", difficulty: 'medium', estimatedTime: 10,
    description: "Silent 'e' at the end makes the vowel say its name!",
    questions: [
      q('e5q1', 'MCQ', 'Adding "e" to "cap" makes?', { options: ['cape', 'cap', 'cup', 'cop'], answer: 'cape' }),
      q('e5q2', 'MCQ', 'Adding "e" to "pin" makes?', { options: ['pine', 'pane', 'pen', 'pan'], answer: 'pine' }),
      q('e5q3', 'MCQ', 'Adding "e" to "hop" makes?', { options: ['hope', 'hip', 'heap', 'hap'], answer: 'hope' }),
      q('e5q4', 'MCQ', 'Adding "e" to "cut" makes?', { options: ['cute', 'coat', 'cot', 'cat'], answer: 'cute' }),
      q('e5q5', 'MCQ', 'Adding "e" to "mad" makes?', { options: ['made', 'mode', 'mud', 'mid'], answer: 'made' }),
      q('e5q6', 'TRUE_FALSE', "Magic 'e' makes the vowel say its name.", { answer: true }),
      q('e5q7', 'TRUE_FALSE', "The 'e' in magic 'e' words is silent.", { answer: true }),
      q('e5q8', 'MCQ', 'Which is a magic "e" word?', { options: ['cake', 'cat', 'cup', 'cap'], answer: 'cake' }),
      q('e5q9', 'MCQ', 'Which is NOT a magic "e" word?', { options: ['bike', 'bite', 'bit', 'bake'], answer: 'bit' }),
      q('e5q10', 'FILL_BLANK', 'c_ke — fill the vowel that works with magic e.', { answer: 'a', hint: 'Cake! You eat it at a birthday party.' }),
    ]
  },

  // ── ENG 6: Sound Words ───────────────────────────────────────────────────
  {
    id: 'eng_006', subject: 'english', title: 'Sound Words — ee, ea, ai, ay, oi, oy, ou, ow',
    topic: 'Sound Words', difficulty: 'hard', estimatedTime: 14,
    description: 'Vowel teams that make long sounds together.',
    questions: [
      q('e6q1', 'MCQ', 'Which word uses "ee" sound?', { options: ['feet', 'fat', 'fit', 'fog'], answer: 'feet' }),
      q('e6q2', 'MCQ', 'Which word uses "ea" sound?', { options: ['seat', 'set', 'sit', 'sot'], answer: 'seat' }),
      q('e6q3', 'MCQ', 'Which word uses "ai" sound?', { options: ['rain', 'run', 'rin', 'ron'], answer: 'rain' }),
      q('e6q4', 'MCQ', 'Which word uses "ay" sound?', { options: ['day', 'dig', 'dog', 'dug'], answer: 'day' }),
      q('e6q5', 'MCQ', 'Which word uses "oi" sound?', { options: ['coin', 'can', 'con', 'cun'], answer: 'coin' }),
      q('e6q6', 'MCQ', 'Which word uses "oy" sound?', { options: ['toy', 'top', 'tip', 'tap'], answer: 'toy' }),
      q('e6q7', 'MCQ', 'Which word uses "ou" sound?', { options: ['loud', 'led', 'lid', 'lad'], answer: 'loud' }),
      q('e6q8', 'MCQ', 'Which word uses "ow" sound?', { options: ['cow', 'caw', 'coo', 'cue'], answer: 'cow' }),
      q('e6q9', 'TRUE_FALSE', '"tea" and "sea" have the same "ea" sound.', { answer: true }),
      q('e6q10', 'MCQ', 'Which pair has the SAME vowel sound?', { options: ['feet / feat', 'cat / kit', 'dog / dig', 'sun / sin'], answer: 'feet / feat' }),
    ]
  },

  // ── ENG 7: Digraphs ──────────────────────────────────────────────────────
  {
    id: 'eng_007', subject: 'english', title: 'Digraphs — ch, sh, th, wh',
    topic: 'Digraphs', difficulty: 'medium', estimatedTime: 10,
    description: 'Two letters that make one special sound together.',
    questions: [
      q('e7q1', 'MCQ', 'Which word starts with "ch"?', { options: ['chair', 'train', 'plane', 'boat'], answer: 'chair' }),
      q('e7q2', 'MCQ', 'Which word starts with "sh"?', { options: ['ship', 'chip', 'rip', 'tip'], answer: 'ship' }),
      q('e7q3', 'MCQ', 'Which word starts with "th"?', { options: ['three', 'free', 'tree', 'bee'], answer: 'three' }),
      q('e7q4', 'MCQ', 'Which word starts with "wh"?', { options: ['wheel', 'feel', 'heel', 'peel'], answer: 'wheel' }),
      q('e7q5', 'MCQ', 'Which word ENDS with "ch"?', { options: ['each', 'ear', 'eat', 'eel'], answer: 'each' }),
      q('e7q6', 'MCQ', 'Which word ENDS with "sh"?', { options: ['dish', 'dig', 'dim', 'dip'], answer: 'dish' }),
      q('e7q7', 'MCQ', 'Which word ENDS with "th"?', { options: ['bath', 'bat', 'bag', 'ban'], answer: 'bath' }),
      q('e7q8', 'TRUE_FALSE', 'In "ch", both letters together make ONE sound.', { answer: true }),
      q('e7q9', 'FILL_BLANK', 'The digraph in "sheep" is ___.', { answer: 'sh', hint: 'sh as in sheep, ship, shop' }),
      q('e7q10', 'MCQ', 'Which word has the "wh" digraph?', { options: ['what', 'cat', 'hat', 'bat'], answer: 'what' }),
    ]
  },

  // ── ENG 8: Articles ──────────────────────────────────────────────────────
  {
    id: 'eng_008', subject: 'english', title: 'Articles — a and an',
    topic: 'Articles', difficulty: 'easy', estimatedTime: 8,
    description: 'Use "a" before consonant sounds and "an" before vowel sounds.',
    questions: [
      q('e8q1', 'MCQ', '___ apple', { options: ['a', 'an'], answer: 'an', hint: 'apple starts with a vowel' }),
      q('e8q2', 'MCQ', '___ cat', { options: ['a', 'an'], answer: 'a', hint: 'cat starts with c, a consonant' }),
      q('e8q3', 'MCQ', '___ umbrella', { options: ['a', 'an'], answer: 'an', hint: 'umbrella starts with u, a vowel' }),
      q('e8q4', 'MCQ', '___ elephant', { options: ['a', 'an'], answer: 'an', hint: 'elephant starts with e, a vowel' }),
      q('e8q5', 'MCQ', '___ ball', { options: ['a', 'an'], answer: 'a', hint: 'ball starts with b, a consonant' }),
      q('e8q6', 'TRUE_FALSE', 'We use "an" before words starting with a vowel sound.', { answer: true }),
      q('e8q7', 'TRUE_FALSE', 'We use "a" before words starting with a consonant sound.', { answer: true }),
      q('e8q8', 'FILL_BLANK', 'I ate ___ orange.', { answer: 'an', hint: 'orange starts with o, a vowel' }),
      q('e8q9', 'MCQ', '___ egg', { options: ['a', 'an'], answer: 'an' }),
      q('e8q10', 'MCQ', '___ house', { options: ['a', 'an'], answer: 'a' }),
    ]
  },

  // ── ENG 9: Pronouns & Conjunctions ───────────────────────────────────────
  {
    id: 'eng_009', subject: 'english', title: 'Pronouns (He, She, It) and "and"',
    topic: 'Pronouns', difficulty: 'easy', estimatedTime: 8,
    description: 'Use He for boys, She for girls, It for things. Use "and" to join.',
    questions: [
      q('e9q1', 'MCQ', 'We use ___ for a boy.', { options: ['He', 'She', 'It', 'They'], answer: 'He' }),
      q('e9q2', 'MCQ', 'We use ___ for a girl.', { options: ['He', 'She', 'It', 'They'], answer: 'She' }),
      q('e9q3', 'MCQ', 'We use ___ for a thing.', { options: ['He', 'She', 'It', 'They'], answer: 'It' }),
      q('e9q4', 'MCQ', 'The ball is red. ___ is round.', { options: ['He', 'She', 'It'], answer: 'It' }),
      q('e9q5', 'MCQ', 'My mother cooks food. ___ is kind.', { options: ['He', 'She', 'It'], answer: 'She' }),
      q('e9q6', 'MCQ', '"and" is used to ___.', { options: ['join two words', 'end a sentence', 'start a question', 'make a wish'], answer: 'join two words' }),
      q('e9q7', 'FILL_BLANK', 'I have a cat ___ a dog.', { answer: 'and', hint: 'and joins two things' }),
      q('e9q8', 'MCQ', 'My father is tall. ___ is strong.', { options: ['He', 'She', 'It'], answer: 'He' }),
      q('e9q9', 'TRUE_FALSE', 'We use "He" for both boys and girls.', { answer: false }),
      q('e9q10', 'MCQ', 'I like mango ___ banana.', { options: ['and', 'but', 'or', 'so'], answer: 'and' }),
    ]
  },

]; // end ENG_WORKSHEETS

// ── MATHS WORKSHEETS (10) ────────────────────────────────────────────────────

const MATHS_WORKSHEETS = [

  // ── MATH 1: Concepts ─────────────────────────────────────────────────────
  {
    id: 'math_001', subject: 'maths', title: 'Big, Small, Long, Short, Tall, Heavy, Light',
    topic: 'Concepts', difficulty: 'easy', estimatedTime: 8,
    description: 'Compare sizes, lengths, heights and weights of objects.',
    questions: [
      q('m1q1', 'MCQ', 'An elephant is ___ than a mouse.', { options: ['bigger', 'smaller', 'taller', 'lighter'], answer: 'bigger' }),
      q('m1q2', 'MCQ', 'A pencil is ___ than a ruler.', { options: ['longer', 'shorter', 'heavier', 'bigger'], answer: 'shorter' }),
      q('m1q3', 'MCQ', 'A giraffe is ___ than a dog.', { options: ['taller', 'shorter', 'lighter', 'smaller'], answer: 'taller' }),
      q('m1q4', 'MCQ', 'A feather is ___ than a stone.', { options: ['lighter', 'heavier', 'taller', 'bigger'], answer: 'lighter' }),
      q('m1q5', 'MCQ', 'Which is the BIGGEST?', { options: ['ant', 'cat', 'elephant', 'dog'], answer: 'elephant' }),
      q('m1q6', 'MCQ', 'Which is the SMALLEST?', { options: ['lion', 'mouse', 'horse', 'cow'], answer: 'mouse' }),
      q('m1q7', 'TRUE_FALSE', 'A truck is heavier than a bicycle.', { answer: true }),
      q('m1q8', 'TRUE_FALSE', 'A river is longer than a pond.', { answer: true }),
      q('m1q9', 'MCQ', 'A needle is ___.', { options: ['thin', 'thick', 'long', 'heavy'], answer: 'thin' }),
      q('m1q10', 'MCQ', 'Which is SHORTER?', { options: ['mountain', 'hill', 'sky', 'ocean'], answer: 'hill' }),
    ]
  },

  // ── MATH 2: Tables 0–5 ───────────────────────────────────────────────────
  {
    id: 'math_002', subject: 'maths', title: 'Tables — 0 to 5',
    topic: 'Tables', difficulty: 'medium', estimatedTime: 12,
    description: 'Multiplication tables from 0 to 5.',
    questions: [
      q('m2q1', 'MCQ', '2 × 3 = ?', { options: ['5', '6', '7', '8'], answer: '6' }),
      q('m2q2', 'MCQ', '3 × 4 = ?', { options: ['9', '10', '11', '12'], answer: '12' }),
      q('m2q3', 'MCQ', '4 × 2 = ?', { options: ['6', '7', '8', '9'], answer: '8' }),
      q('m2q4', 'MCQ', '5 × 3 = ?', { options: ['10', '12', '15', '18'], answer: '15' }),
      q('m2q5', 'MCQ', '0 × 7 = ?', { options: ['0', '7', '14', '70'], answer: '0' }),
      q('m2q6', 'MCQ', '2 × 5 = ?', { options: ['7', '8', '9', '10'], answer: '10' }),
      q('m2q7', 'MCQ', '3 × 3 = ?', { options: ['6', '8', '9', '12'], answer: '9' }),
      q('m2q8', 'FILL_BLANK', '4 × 4 = ___', { answer: '16', hint: 'Four fours is sixteen' }),
      q('m2q9', 'MCQ', '5 × 5 = ?', { options: ['20', '22', '25', '30'], answer: '25' }),
      q('m2q10', 'TRUE_FALSE', '3 × 4 = 12', { answer: true }),
    ]
  },

  // ── MATH 3: Counting 1–100 ───────────────────────────────────────────────
  {
    id: 'math_003', subject: 'maths', title: 'Counting — 1 to 100 (Forward)',
    topic: 'Counting', difficulty: 'easy', estimatedTime: 10,
    description: 'Count forward from 1 to 100. What comes next?',
    questions: [
      q('m3q1', 'MCQ', 'What comes AFTER 29?', { options: ['28', '30', '31', '32'], answer: '30' }),
      q('m3q2', 'MCQ', 'What comes AFTER 49?', { options: ['48', '50', '51', '52'], answer: '50' }),
      q('m3q3', 'MCQ', 'What comes AFTER 99?', { options: ['100', '98', '97', '101'], answer: '100' }),
      q('m3q4', 'MCQ', 'What comes AFTER 79?', { options: ['78', '80', '81', '82'], answer: '80' }),
      q('m3q5', 'MCQ', 'Count by 10s: 10, 20, 30, ___', { options: ['35', '40', '45', '50'], answer: '40' }),
      q('m3q6', 'TRUE_FALSE', '51 comes after 50.', { answer: true }),
      q('m3q7', 'MCQ', 'Which number is between 44 and 46?', { options: ['43', '45', '47', '48'], answer: '45' }),
      q('m3q8', 'FILL_BLANK', 'What comes after 69? ___', { answer: '70', hint: 'Six-nine, seven-zero!' }),
      q('m3q9', 'MCQ', 'Count by 10s: 40, 50, 60, ___', { options: ['65', '70', '75', '80'], answer: '70' }),
      q('m3q10', 'TRUE_FALSE', '100 is the last number when counting 1 to 100.', { answer: true }),
    ]
  },

  // ── MATH 4: Backward Counting ────────────────────────────────────────────
  {
    id: 'math_004', subject: 'maths', title: 'Backward Counting — 100 to 1',
    topic: 'Counting', difficulty: 'easy', estimatedTime: 10,
    description: 'Count backward from 100 to 1. Numbers get smaller!',
    questions: [
      q('m4q1', 'MCQ', 'What comes BEFORE 30?', { options: ['31', '29', '28', '27'], answer: '29' }),
      q('m4q2', 'MCQ', 'What comes BEFORE 80?', { options: ['79', '81', '78', '77'], answer: '79' }),
      q('m4q3', 'MCQ', 'What comes BEFORE 100?', { options: ['101', '99', '98', '97'], answer: '99' }),
      q('m4q4', 'MCQ', 'Count backward: 50, 49, 48, ___', { options: ['47', '46', '45', '51'], answer: '47' }),
      q('m4q5', 'MCQ', 'Count backward: 20, 19, 18, ___', { options: ['15', '16', '17', '21'], answer: '17' }),
      q('m4q6', 'TRUE_FALSE', 'In backward counting, numbers get SMALLER.', { answer: true }),
      q('m4q7', 'FILL_BLANK', 'What comes before 11? ___', { answer: '10', hint: 'Ten comes before eleven' }),
      q('m4q8', 'MCQ', 'Count backward by 10s: 100, 90, 80, ___', { options: ['70', '75', '60', '65'], answer: '70' }),
      q('m4q9', 'TRUE_FALSE', '29 comes before 30 in backward counting.', { answer: true }),
      q('m4q10', 'MCQ', 'Backward: 65, 64, 63, ___', { options: ['62', '60', '61', '66'], answer: '62' }),
    ]
  },

  // ── MATH 5: After / Before / Between ─────────────────────────────────────
  {
    id: 'math_005', subject: 'maths', title: 'After, Before and Between Numbers',
    topic: 'Number Sequence', difficulty: 'easy', estimatedTime: 10,
    description: 'Find what comes after, before, and between numbers up to 100.',
    questions: [
      q('m5q1', 'MCQ', 'What comes BETWEEN 14 and 16?', { options: ['13', '15', '17', '18'], answer: '15' }),
      q('m5q2', 'MCQ', 'What comes BEFORE 25?', { options: ['26', '24', '23', '22'], answer: '24' }),
      q('m5q3', 'MCQ', 'What comes AFTER 38?', { options: ['37', '39', '40', '41'], answer: '39' }),
      q('m5q4', 'MCQ', 'What comes BETWEEN 49 and 51?', { options: ['48', '52', '50', '53'], answer: '50' }),
      q('m5q5', 'MCQ', 'What comes BEFORE 10?', { options: ['11', '9', '8', '7'], answer: '9' }),
      q('m5q6', 'TRUE_FALSE', '15 comes between 14 and 16.', { answer: true }),
      q('m5q7', 'FILL_BLANK', 'What comes between 19 and 21? ___', { answer: '20', hint: 'Nineteen, ___, twenty-one' }),
      q('m5q8', 'MCQ', 'What comes AFTER 55?', { options: ['54', '56', '57', '58'], answer: '56' }),
      q('m5q9', 'MCQ', 'What comes BEFORE 1?', { options: ['2', '0', '-1', '3'], answer: '0' }),
      q('m5q10', 'TRUE_FALSE', '50 comes between 45 and 55.', { answer: true }),
    ]
  },

  // ── MATH 6: Missing Numbers ───────────────────────────────────────────────
  {
    id: 'math_006', subject: 'maths', title: 'Missing Numbers — 1 to 100',
    topic: 'Missing Numbers', difficulty: 'medium', estimatedTime: 10,
    description: 'Find the missing number in the sequence.',
    questions: [
      q('m6q1', 'MCQ', '5, ___, 7', { options: ['4', '6', '8', '9'], answer: '6' }),
      q('m6q2', 'MCQ', '10, ___, 12', { options: ['9', '11', '13', '14'], answer: '11' }),
      q('m6q3', 'MCQ', '___, 20, 21', { options: ['22', '18', '17', '19'], answer: '19' }),
      q('m6q4', 'MCQ', '48, 49, ___, 51', { options: ['50', '47', '52', '53'], answer: '50' }),
      q('m6q5', 'MCQ', '___, 30, 31', { options: ['28', '29', '31', '32'], answer: '29' }),
      q('m6q6', 'FILL_BLANK', '95, 96, ___, 98', { answer: '97', hint: 'Between 96 and 98' }),
      q('m6q7', 'MCQ', '70, ___, 72', { options: ['69', '71', '73', '74'], answer: '71' }),
      q('m6q8', 'TRUE_FALSE', 'In 8, ?, 10 — the missing number is 9.', { answer: true }),
      q('m6q9', 'MCQ', '___, 16, 17, 18', { options: ['13', '14', '15', '19'], answer: '15' }),
      q('m6q10', 'FILL_BLANK', '59, ___, 61', { answer: '60', hint: 'Between 59 and 61' }),
    ]
  },

  // ── MATH 7: Biggest & Smallest ────────────────────────────────────────────
  {
    id: 'math_007', subject: 'maths', title: 'Biggest and Smallest Numbers',
    topic: 'Comparison', difficulty: 'medium', estimatedTime: 10,
    description: 'Identify the biggest and smallest numbers in a group.',
    questions: [
      q('m7q1', 'MCQ', 'Which is BIGGEST? 45, 67, 23, 89', { options: ['45', '67', '23', '89'], answer: '89' }),
      q('m7q2', 'MCQ', 'Which is SMALLEST? 34, 12, 56, 78', { options: ['34', '12', '56', '78'], answer: '12' }),
      q('m7q3', 'MCQ', 'Which is BIGGEST? 100, 99, 98, 97', { options: ['100', '99', '98', '97'], answer: '100' }),
      q('m7q4', 'MCQ', 'Which is SMALLEST? 21, 13, 7, 45', { options: ['21', '13', '7', '45'], answer: '7' }),
      q('m7q5', 'MCQ', 'The BIGGEST 2-digit number is?', { options: ['99', '100', '98', '90'], answer: '99' }),
      q('m7q6', 'MCQ', 'The SMALLEST 2-digit number is?', { options: ['10', '11', '9', '12'], answer: '10' }),
      q('m7q7', 'TRUE_FALSE', '56 is bigger than 65.', { answer: false }),
      q('m7q8', 'TRUE_FALSE', '1 is the smallest counting number.', { answer: true }),
      q('m7q9', 'MCQ', 'Which is BIGGEST? 55, 44, 33, 22', { options: ['55', '44', '33', '22'], answer: '55' }),
      q('m7q10', 'FILL_BLANK', 'The smallest number in: 15, 28, 6, 43 is ___.', { answer: '6', hint: 'Which is the least?' }),
    ]
  },

  // ── MATH 8: Greater / Less / Equal ────────────────────────────────────────
  {
    id: 'math_008', subject: 'maths', title: 'Greater Than, Less Than and Equal To',
    topic: 'Comparison', difficulty: 'medium', estimatedTime: 10,
    description: 'Use >, < and = to compare numbers.',
    questions: [
      q('m8q1', 'MCQ', '25 ___ 30', { options: ['>', '<', '='], answer: '<' }),
      q('m8q2', 'MCQ', '45 ___ 40', { options: ['>', '<', '='], answer: '>' }),
      q('m8q3', 'MCQ', '15 ___ 15', { options: ['>', '<', '='], answer: '=' }),
      q('m8q4', 'MCQ', '99 ___ 100', { options: ['>', '<', '='], answer: '<' }),
      q('m8q5', 'MCQ', '50 ___ 50', { options: ['>', '<', '='], answer: '=' }),
      q('m8q6', 'TRUE_FALSE', '30 > 20 means 30 is greater than 20.', { answer: true }),
      q('m8q7', 'TRUE_FALSE', '5 > 10 means 5 is greater than 10.', { answer: false }),
      q('m8q8', 'MCQ', '70 ___ 7', { options: ['>', '<', '='], answer: '>' }),
      q('m8q9', 'FILL_BLANK', '20 ___ 21 (use <, >, or =)', { answer: '<', hint: '20 is less than 21' }),
      q('m8q10', 'MCQ', 'Which sign goes in: 15 ___ 51?', { options: ['>', '<', '='], answer: '<' }),
    ]
  },

  // ── MATH 9: Ascending & Descending ────────────────────────────────────────
  {
    id: 'math_009', subject: 'maths', title: 'Ascending and Descending Order',
    topic: 'Ordering', difficulty: 'hard', estimatedTime: 12,
    description: 'Ascending = smallest to biggest. Descending = biggest to smallest.',
    questions: [
      q('m9q1', 'MCQ', 'Arrange in ASCENDING order: 5, 2, 8, 1', { options: ['1, 2, 5, 8', '8, 5, 2, 1', '5, 1, 8, 2', '2, 5, 1, 8'], answer: '1, 2, 5, 8' }),
      q('m9q2', 'MCQ', 'Arrange in DESCENDING order: 3, 7, 1, 5', { options: ['7, 5, 3, 1', '1, 3, 5, 7', '3, 7, 1, 5', '5, 1, 7, 3'], answer: '7, 5, 3, 1' }),
      q('m9q3', 'TRUE_FALSE', 'Ascending means from smallest to biggest.', { answer: true }),
      q('m9q4', 'TRUE_FALSE', 'Descending means from smallest to biggest.', { answer: false }),
      q('m9q5', 'MCQ', 'Which is in ASCENDING order?', { options: ['1, 3, 5, 7', '7, 5, 3, 1', '5, 1, 3, 7', '3, 7, 1, 5'], answer: '1, 3, 5, 7' }),
      q('m9q6', 'MCQ', 'Which is in DESCENDING order?', { options: ['10, 8, 6, 4', '4, 6, 8, 10', '6, 10, 4, 8', '8, 4, 10, 6'], answer: '10, 8, 6, 4' }),
      q('m9q7', 'FILL_BLANK', 'Ascending: 12, 15, 18, ___', { answer: '21', hint: 'Add 3 each time' }),
      q('m9q8', 'MCQ', 'Ascending: 20, 40, ___, 80', { options: ['50', '60', '70', '55'], answer: '60' }),
      q('m9q9', 'TRUE_FALSE', 'In ascending order: 5, 10, 15, 20 is correct.', { answer: true }),
      q('m9q10', 'MCQ', 'Descending: 100, 90, 80, ___', { options: ['70', '60', '75', '85'], answer: '70' }),
    ]
  },

  // ── MATH 10: Number Names & Groups of Tens ────────────────────────────────
  {
    id: 'math_010', subject: 'maths', title: 'Number Names and Groups of Tens',
    topic: 'Number Names', difficulty: 'medium', estimatedTime: 12,
    description: 'Write number names from 1-20. Understand tens and units.',
    questions: [
      q('m10q1', 'MCQ', 'What is the number name for 5?', { options: ['three', 'four', 'five', 'six'], answer: 'five' }),
      q('m10q2', 'MCQ', 'What is the number name for 12?', { options: ['eleven', 'twelve', 'thirteen', 'fourteen'], answer: 'twelve' }),
      q('m10q3', 'MCQ', 'What is the number for "seventeen"?', { options: ['15', '16', '17', '18'], answer: '17' }),
      q('m10q4', 'MCQ', 'What is the number for "twenty"?', { options: ['19', '20', '21', '22'], answer: '20' }),
      q('m10q5', 'MCQ', 'How many TENS in 30?', { options: ['1', '2', '3', '4'], answer: '3' }),
      q('m10q6', 'MCQ', 'How many TENS in 70?', { options: ['5', '6', '7', '8'], answer: '7' }),
      q('m10q7', 'TRUE_FALSE', '10 is one group of ten.', { answer: true }),
      q('m10q8', 'MCQ', 'What is the number name for 18?', { options: ['sixteen', 'seventeen', 'eighteen', 'nineteen'], answer: 'eighteen' }),
      q('m10q9', 'FILL_BLANK', 'The number name for 15 is ___.', { answer: 'fifteen', hint: 'fif-teen' }),
      q('m10q10', 'MCQ', '40 has ___ groups of tens.', { options: ['3', '4', '5', '6'], answer: '4' }),
    ]
  },

]; // end MATHS_WORKSHEETS

// ── GENERAL AWARENESS WORKSHEETS (5) ────────────────────────────────────────

const GA_WORKSHEETS = [

  // ── GA 1: All About Me + Family + School ──────────────────────────────────
  {
    id: 'ga_001', subject: 'ga', title: 'All About Me, My Family and My School',
    topic: 'Me & Family', difficulty: 'easy', estimatedTime: 10,
    description: 'Learn about yourself, your family members and school.',
    questions: [
      q('g1q1', 'MCQ', 'How many eyes do we have?', { options: ['1', '2', '3', '4'], answer: '2' }),
      q('g1q2', 'MCQ', 'Who is the head of the family?', { options: ['brother', 'father', 'sister', 'uncle'], answer: 'father' }),
      q('g1q3', 'MCQ', 'Who teaches us at school?', { options: ['doctor', 'teacher', 'driver', 'chef'], answer: 'teacher' }),
      q('g1q4', 'MCQ', 'My mother\'s son is my ___.', { options: ['sister', 'cousin', 'brother', 'uncle'], answer: 'brother' }),
      q('g1q5', 'TRUE_FALSE', 'We go to school to learn.', { answer: true }),
      q('g1q6', 'MCQ', 'Which is a family member?', { options: ['teacher', 'doctor', 'grandmother', 'police'], answer: 'grandmother' }),
      q('g1q7', 'MCQ', 'My father\'s father is my ___.', { options: ['uncle', 'grandfather', 'brother', 'cousin'], answer: 'grandfather' }),
      q('g1q8', 'TRUE_FALSE', 'A school has classrooms.', { answer: true }),
      q('g1q9', 'MCQ', 'We write with a ___.', { options: ['fork', 'spoon', 'pencil', 'knife'], answer: 'pencil' }),
      q('g1q10', 'MCQ', 'My mother\'s sister is my ___.', { options: ['aunt', 'cousin', 'niece', 'grandmother'], answer: 'aunt' }),
    ]
  },

  // ── GA 2: Body + Senses + Hobbies ─────────────────────────────────────────
  {
    id: 'ga_002', subject: 'ga', title: 'My Body, My Senses and My Hobbies',
    topic: 'Body & Senses', difficulty: 'easy', estimatedTime: 10,
    description: 'Our five senses and body parts. What are hobbies?',
    questions: [
      q('g2q1', 'MCQ', 'How many senses do we have?', { options: ['3', '4', '5', '6'], answer: '5' }),
      q('g2q2', 'MCQ', 'We use our eyes to ___.', { options: ['smell', 'hear', 'see', 'taste'], answer: 'see' }),
      q('g2q3', 'MCQ', 'We use our ears to ___.', { options: ['smell', 'hear', 'see', 'taste'], answer: 'hear' }),
      q('g2q4', 'MCQ', 'We use our nose to ___.', { options: ['smell', 'hear', 'see', 'touch'], answer: 'smell' }),
      q('g2q5', 'MCQ', 'We use our tongue to ___.', { options: ['smell', 'hear', 'see', 'taste'], answer: 'taste' }),
      q('g2q6', 'MCQ', 'We use our skin to ___.', { options: ['smell', 'hear', 'touch', 'taste'], answer: 'touch' }),
      q('g2q7', 'TRUE_FALSE', 'Reading is a hobby.', { answer: true }),
      q('g2q8', 'MCQ', 'How many fingers are on one hand?', { options: ['4', '5', '6', '7'], answer: '5' }),
      q('g2q9', 'MCQ', 'Which is NOT a body part?', { options: ['nose', 'ear', 'cloud', 'knee'], answer: 'cloud' }),
      q('g2q10', 'MCQ', 'Which is a hobby?', { options: ['eating', 'sleeping', 'painting', 'crying'], answer: 'painting' }),
    ]
  },

  // ── GA 3: Colours + Fruits + Food ─────────────────────────────────────────
  {
    id: 'ga_003', subject: 'ga', title: 'Colours, Fruits, Vegetables and Food',
    topic: 'Food & Colours', difficulty: 'easy', estimatedTime: 10,
    description: 'Learn about colours, fruits, vegetables and healthy eating.',
    questions: [
      q('g3q1', 'MCQ', 'What colour is the sky?', { options: ['red', 'blue', 'green', 'yellow'], answer: 'blue' }),
      q('g3q2', 'MCQ', 'What colour is grass?', { options: ['blue', 'red', 'green', 'pink'], answer: 'green' }),
      q('g3q3', 'MCQ', 'Which is a FRUIT?', { options: ['carrot', 'apple', 'potato', 'onion'], answer: 'apple' }),
      q('g3q4', 'MCQ', 'Which is a VEGETABLE?', { options: ['mango', 'orange', 'banana', 'spinach'], answer: 'spinach' }),
      q('g3q5', 'MCQ', 'Which is HEALTHY food?', { options: ['chips', 'milk', 'candy', 'burger'], answer: 'milk' }),
      q('g3q6', 'MCQ', 'Which is UNHEALTHY food?', { options: ['salad', 'fruits', 'chocolate', 'vegetables'], answer: 'chocolate' }),
      q('g3q7', 'TRUE_FALSE', 'Eating fruits and vegetables is healthy.', { answer: true }),
      q('g3q8', 'MCQ', 'What colour is a banana?', { options: ['red', 'green', 'yellow', 'blue'], answer: 'yellow' }),
      q('g3q9', 'MCQ', 'Which is a FRUIT?', { options: ['peas', 'potato', 'mango', 'broccoli'], answer: 'mango' }),
      q('g3q10', 'TRUE_FALSE', 'Junk food is good for our health.', { answer: false }),
    ]
  },

  // ── GA 4: Flowers + Plants ────────────────────────────────────────────────
  {
    id: 'ga_004', subject: 'ga', title: 'Flowers and Uses of Plants',
    topic: 'Plants', difficulty: 'easy', estimatedTime: 10,
    description: 'Learn about flowers and how plants help us.',
    questions: [
      q('g4q1', 'MCQ', 'Which is a FLOWER?', { options: ['rose', 'carrot', 'apple', 'grass'], answer: 'rose' }),
      q('g4q2', 'MCQ', 'Plants give us ___.', { options: ['water only', 'air only', 'food only', 'air, food and wood'], answer: 'air, food and wood' }),
      q('g4q3', 'MCQ', 'Which part of the plant makes food?', { options: ['root', 'stem', 'leaf', 'flower'], answer: 'leaf' }),
      q('g4q4', 'MCQ', 'We get medicine from ___.', { options: ['stones', 'plants', 'water', 'clouds'], answer: 'plants' }),
      q('g4q5', 'MCQ', 'Which is NOT a flower?', { options: ['lotus', 'daisy', 'sunflower', 'mango'], answer: 'mango' }),
      q('g4q6', 'TRUE_FALSE', 'Trees give us oxygen to breathe.', { answer: true }),
      q('g4q7', 'MCQ', 'Wood comes from ___.', { options: ['plants and trees', 'rivers', 'sky', 'stones'], answer: 'plants and trees' }),
      q('g4q8', 'MCQ', 'Which part of the plant takes in water?', { options: ['root', 'leaf', 'flower', 'stem'], answer: 'root' }),
      q('g4q9', 'TRUE_FALSE', 'Plants need sunlight to grow.', { answer: true }),
      q('g4q10', 'MCQ', 'Which is the national flower of India?', { options: ['rose', 'lotus', 'daisy', 'sunflower'], answer: 'lotus' }),
    ]
  },

  // ── GA 5: Animals ─────────────────────────────────────────────────────────
  {
    id: 'ga_005', subject: 'ga', title: 'Farm, Wild and Water Animals',
    topic: 'Animals', difficulty: 'medium', estimatedTime: 12,
    description: 'Animals and their young ones, homes, and sounds.',
    questions: [
      q('g5q1', 'MCQ', 'Which is a FARM animal?', { options: ['lion', 'cow', 'tiger', 'wolf'], answer: 'cow' }),
      q('g5q2', 'MCQ', 'Which is a WILD animal?', { options: ['dog', 'cat', 'tiger', 'horse'], answer: 'tiger' }),
      q('g5q3', 'MCQ', 'Which is a WATER animal?', { options: ['fish', 'cat', 'dog', 'hen'], answer: 'fish' }),
      q('g5q4', 'MCQ', 'A baby cat is called a ___.', { options: ['cub', 'kitten', 'puppy', 'calf'], answer: 'kitten' }),
      q('g5q5', 'MCQ', 'A baby dog is called a ___.', { options: ['cub', 'kitten', 'puppy', 'calf'], answer: 'puppy' }),
      q('g5q6', 'MCQ', 'A lion lives in a ___.', { options: ['den', 'stable', 'kennel', 'nest'], answer: 'den' }),
      q('g5q7', 'MCQ', 'A dog lives in a ___.', { options: ['den', 'stable', 'kennel', 'nest'], answer: 'kennel' }),
      q('g5q8', 'MCQ', 'A cow says ___.', { options: ['moo', 'baa', 'oink', 'cluck'], answer: 'moo' }),
      q('g5q9', 'MCQ', 'A sheep says ___.', { options: ['moo', 'baa', 'oink', 'cluck'], answer: 'baa' }),
      q('g5q10', 'TRUE_FALSE', 'A frog can live in water and on land.', { answer: true }),
    ]
  },

]; // end GA_WORKSHEETS

// ── HINDI WORKSHEETS (5) ─────────────────────────────────────────────────────

const HINDI_WORKSHEETS = [

  // ── HINDI 1: Swar (Vowels) ────────────────────────────────────────────────
  {
    id: 'hindi_001', subject: 'hindi', title: 'स्वर — अ से अः तक',
    topic: 'Swar', difficulty: 'easy', estimatedTime: 10,
    description: 'हिंदी के स्वर पहचानो और याद करो।',
    questions: [
      q('h1q1', 'MCQ', 'इनमें से कौन सा स्वर है?', { options: ['क', 'ख', 'अ', 'ग'], answer: 'अ' }),
      q('h1q2', 'MCQ', 'इनमें से कौन सा स्वर है?', { options: ['उ', 'ट', 'ग', 'ज'], answer: 'उ' }),
      q('h1q3', 'TRUE_FALSE', '"आ" एक स्वर है।', { answer: true }),
      q('h1q4', 'MCQ', 'पहला स्वर कौन सा है?', { options: ['आ', 'अ', 'इ', 'ई'], answer: 'अ' }),
      q('h1q5', 'MCQ', 'इनमें से कौन सा स्वर नहीं है?', { options: ['इ', 'ई', 'उ', 'क'], answer: 'क' }),
      q('h1q6', 'MCQ', 'स्वर "ए" के बाद कौन सा स्वर आता है?', { options: ['ऐ', 'ओ', 'औ', 'अं'], answer: 'ऐ' }),
      q('h1q7', 'TRUE_FALSE', '"उ" एक स्वर है।', { answer: true }),
      q('h1q8', 'FILL_BLANK', 'अ, आ, इ, ई, ___, ऊ', { answer: 'उ', hint: 'उ comes after ई' }),
      q('h1q9', 'TRUE_FALSE', '"ओ" एक स्वर है।', { answer: true }),
      q('h1q10', 'MCQ', 'आ, इ, ई, उ — इनमें से क्या है?', { options: ['व्यंजन', 'स्वर', 'मात्रा', 'शब्द'], answer: 'स्वर' }),
    ]
  },

  // ── HINDI 2: Vyanjan (Consonants) ────────────────────────────────────────
  {
    id: 'hindi_002', subject: 'hindi', title: 'व्यंजन — क से श्र तक',
    topic: 'Vyanjan', difficulty: 'easy', estimatedTime: 10,
    description: 'हिंदी के व्यंजन पहचानो।',
    questions: [
      q('h2q1', 'MCQ', 'इनमें से कौन सा व्यंजन है?', { options: ['अ', 'आ', 'क', 'इ'], answer: 'क' }),
      q('h2q2', 'MCQ', 'इनमें से कौन सा व्यंजन है?', { options: ['उ', 'ए', 'ग', 'ऐ'], answer: 'ग' }),
      q('h2q3', 'TRUE_FALSE', '"क" एक व्यंजन है।', { answer: true }),
      q('h2q4', 'MCQ', 'क वर्ग का दूसरा अक्षर कौन सा है?', { options: ['क', 'ख', 'ग', 'घ'], answer: 'ख' }),
      q('h2q5', 'MCQ', 'च वर्ग का पहला अक्षर कौन सा है?', { options: ['त', 'ट', 'च', 'प'], answer: 'च' }),
      q('h2q6', 'TRUE_FALSE', '"ट" एक व्यंजन है।', { answer: true }),
      q('h2q7', 'MCQ', 'इनमें से कौन व्यंजन नहीं है?', { options: ['आ', 'क', 'ग', 'ज'], answer: 'आ' }),
      q('h2q8', 'FILL_BLANK', 'क, ख, ___, घ', { answer: 'ग', hint: 'ग comes after ख' }),
      q('h2q9', 'MCQ', 'प वर्ग में कौन-कौन आते हैं?', { options: ['प', 'फ', 'ब, भ', 'ये सभी'], answer: 'ये सभी' }),
      q('h2q10', 'TRUE_FALSE', '"ब" एक व्यंजन है।', { answer: true }),
    ]
  },

  // ── HINDI 3: Maatras ──────────────────────────────────────────────────────
  {
    id: 'hindi_003', subject: 'hindi', title: 'मात्राएँ — आ, ए, ई, ऐ, ओ, औ, ऋ',
    topic: 'Maatras', difficulty: 'medium', estimatedTime: 12,
    description: 'मात्राएँ सीखो और सही मात्रा पहचानो।',
    questions: [
      q('h3q1', 'MCQ', '"का" में कौन सी मात्रा है?', { options: ['आ की', 'इ की', 'उ की', 'ए की'], answer: 'आ की' }),
      q('h3q2', 'MCQ', '"कि" में कौन सी मात्रा है?', { options: ['आ की', 'इ की', 'उ की', 'ए की'], answer: 'इ की' }),
      q('h3q3', 'MCQ', '"कु" में कौन सी मात्रा है?', { options: ['आ की', 'इ की', 'उ की', 'ए की'], answer: 'उ की' }),
      q('h3q4', 'MCQ', '"के" में कौन सी मात्रा है?', { options: ['आ की', 'इ की', 'उ की', 'ए की'], answer: 'ए की' }),
      q('h3q5', 'TRUE_FALSE', '"दिन" में इ की मात्रा है।', { answer: true }),
      q('h3q6', 'MCQ', '"गाय" में कौन सी मात्रा है?', { options: ['आ की', 'इ की', 'उ की', 'ए की'], answer: 'आ की' }),
      q('h3q7', 'MCQ', '"फूल" में कौन सी मात्रा है?', { options: ['आ', 'इ', 'ऊ', 'ए'], answer: 'ऊ' }),
      q('h3q8', 'TRUE_FALSE', '"के" में ए की मात्रा है।', { answer: true }),
      q('h3q9', 'FILL_BLANK', '"क" + आ की मात्रा = ___', { answer: 'का', hint: 'क + ा = का' }),
      q('h3q10', 'MCQ', '"को" में कौन सी मात्रा है?', { options: ['आ की', 'ओ की', 'उ की', 'ए की'], answer: 'ओ की' }),
    ]
  },

  // ── HINDI 4: Fill Correct Matra ───────────────────────────────────────────
  {
    id: 'hindi_004', subject: 'hindi', title: 'सही मात्रा भरो',
    topic: 'Maatras', difficulty: 'hard', estimatedTime: 14,
    description: 'खाली जगह में सही मात्रा भरो।',
    questions: [
      q('h4q1', 'MCQ', '"क" + आ की मात्रा = ?', { options: ['का', 'कि', 'कु', 'के'], answer: 'का' }),
      q('h4q2', 'MCQ', '"म" + इ की मात्रा = ?', { options: ['मा', 'मि', 'मु', 'मे'], answer: 'मि' }),
      q('h4q3', 'MCQ', '"ग" + ए की मात्रा = ?', { options: ['गा', 'गि', 'गु', 'गे'], answer: 'गे' }),
      q('h4q4', 'MCQ', '"आम" में कौन सी मात्रा है?', { options: ['आ की', 'इ की', 'उ की', 'ए की'], answer: 'आ की' }),
      q('h4q5', 'MCQ', '"किताब" में कौन सी मात्रा है?', { options: ['आ की', 'इ की', 'उ की', 'ए की'], answer: 'इ की' }),
      q('h4q6', 'TRUE_FALSE', '"गाय" में आ की मात्रा है।', { answer: true }),
      q('h4q7', 'MCQ', '"कमल" में कितनी मात्राएँ हैं?', { options: ['0', '1', '2', '3'], answer: '0', hint: 'कमल has inherent a sounds, no matra marks' }),
      q('h4q8', 'FILL_BLANK', '"क" + ई की मात्रा = ___', { answer: 'की', hint: 'क + ी = की' }),
      q('h4q9', 'MCQ', '"दूध" में कौन सी मात्रा है?', { options: ['आ', 'इ', 'ऊ', 'ए'], answer: 'ऊ' }),
      q('h4q10', 'TRUE_FALSE', '"की" में ई की मात्रा है।', { answer: true }),
    ]
  },

  // ── HINDI 5: Picture Word + Sentences ────────────────────────────────────
  {
    id: 'hindi_005', subject: 'hindi', title: 'चित्र देखकर शब्द लिखो और वाक्य पूरे करो',
    topic: 'Vocabulary', difficulty: 'medium', estimatedTime: 12,
    description: 'चित्र देखकर सही शब्द चुनो। वाक्य पूरे करो।',
    questions: [
      q('h5q1', 'MCQ', '🍎 यह क्या है?', { options: ['सेब', 'केला', 'आम', 'संतरा'], answer: 'सेब' }),
      q('h5q2', 'MCQ', '🐄 यह क्या है?', { options: ['शेर', 'गाय', 'बकरी', 'घोड़ा'], answer: 'गाय' }),
      q('h5q3', 'MCQ', '🌺 यह क्या है?', { options: ['पत्ता', 'फूल', 'फल', 'जड़'], answer: 'फूल' }),
      q('h5q4', 'MCQ', '🌞 यह क्या है?', { options: ['सूरज', 'चाँद', 'तारा', 'बादल'], answer: 'सूरज' }),
      q('h5q5', 'MCQ', '🏠 यह क्या है?', { options: ['स्कूल', 'घर', 'दुकान', 'मंदिर'], answer: 'घर' }),
      q('h5q6', 'TRUE_FALSE', 'हाथी एक जानवर है।', { answer: true }),
      q('h5q7', 'MCQ', '✏️ यह क्या है?', { options: ['किताब', 'कलम', 'पेंसिल', 'कॉपी'], answer: 'पेंसिल' }),
      q('h5q8', 'MCQ', 'वाक्य पूरा करो: "मैं ___ हूँ।"', { options: ['अच्छा', 'गाय', 'फूल', 'सेब'], answer: 'अच्छा' }),
      q('h5q9', 'MCQ', '🐟 यह क्या है?', { options: ['मछली', 'पक्षी', 'कुत्ता', 'बिल्ली'], answer: 'मछली' }),
      q('h5q10', 'TRUE_FALSE', '"यह एक किताब है।" — यह सही वाक्य है।', { answer: true }),
    ]
  },

]; // end HINDI_WORKSHEETS

// ── ART & CRAFT WORKSHEETS (1) ───────────────────────────────────────────────

const ART_WORKSHEETS = [

  // ── ART 1: Colour Identification ──────────────────────────────────────────
  {
    id: 'art_001', subject: 'art', title: 'Colour Identification and Theory',
    topic: 'Colours', difficulty: 'easy', estimatedTime: 10,
    description: 'Learn about colours, primary colours, and mixing colours.',
    questions: [
      q('a1q1', 'MCQ', 'Grass is ___ in colour.', { options: ['red', 'yellow', 'green', 'blue'], answer: 'green' }),
      q('a1q2', 'MCQ', 'The sun is ___ in colour.', { options: ['blue', 'green', 'yellow', 'pink'], answer: 'yellow' }),
      q('a1q3', 'MCQ', 'What colour do you get when you mix blue and yellow?', { options: ['green', 'purple', 'orange', 'red'], answer: 'green' }),
      q('a1q4', 'MCQ', 'What colour do you get when you mix red and blue?', { options: ['orange', 'purple', 'green', 'yellow'], answer: 'purple' }),
      q('a1q5', 'MCQ', 'What colour do you get when you mix red and yellow?', { options: ['orange', 'purple', 'green', 'blue'], answer: 'orange' }),
      q('a1q6', 'MCQ', 'The three PRIMARY colours are?', { options: ['red, blue, green', 'red, yellow, blue', 'red, green, yellow', 'blue, yellow, green'], answer: 'red, yellow, blue' }),
      q('a1q7', 'TRUE_FALSE', 'Black and white are primary colours.', { answer: false }),
      q('a1q8', 'MCQ', 'A strawberry is ___ in colour.', { options: ['blue', 'red', 'green', 'yellow'], answer: 'red' }),
      q('a1q9', 'MCQ', 'The sky is ___ in colour.', { options: ['red', 'yellow', 'blue', 'green'], answer: 'blue' }),
      q('a1q10', 'TRUE_FALSE', 'There are 7 colours in a rainbow.', { answer: true }),
    ]
  },

]; // end ART_WORKSHEETS

// ── Combine all worksheets ───────────────────────────────────────────────────
// ── ✨ INTERACTIVE WORKSHEETS — Phase 1 (New Question Types) ─────────────────
// These showcase all 10 new interactive question types across all subjects.

const INTERACTIVE_WORKSHEETS = [

  // ── ENGLISH: Match & Circle ─────────────────────────────────────────────────
  {
    id: 'int_eng_001', subject: 'english', title: '✨ Match & Circle — English',
    topic: 'Interactive', difficulty: 'easy', estimatedTime: 12,
    description: 'Match animals to their sounds, circle vowels, find word endings!',
    questions: [
      // MATCH
      q('ie1q1', 'MATCH', 'Match each animal to the sound it makes.', {
        pairs: [
          { left: '🐄 Cow', right: 'Moo' },
          { left: '🐑 Sheep', right: 'Baa' },
          { left: '🐸 Frog', right: 'Croak' },
          { left: '🦁 Lion', right: 'Roar' },
        ]
      }),
      // CIRCLE_FIND — vowels
      q('ie1q2', 'CIRCLE_FIND', 'Tap (circle) all the VOWELS!', {
        items: ['A', 'B', 'E', 'C', 'I', 'D', 'O', 'F', 'U', 'G'],
        correctItems: ['A', 'E', 'I', 'O', 'U']
      }),
      // CIRCLE_FIND — CVC words
      q('ie1q3', 'CIRCLE_FIND', 'Tap all the CVC words (3-letter short vowel words)!', {
        items: ['cat', 'bread', 'dog', 'street', 'hat', 'blue', 'pig', 'train', 'cup', 'bus'],
        correctItems: ['cat', 'dog', 'hat', 'pig', 'cup', 'bus']
      }),
      // DRAG_SLOT — articles
      q('ie1q4', 'DRAG_SLOT', 'Fill in the correct article: [BLANK] apple is on the table.', {
        text: '[BLANK] apple is on the table.',
        slots: [{ answer: 'An' }],
        options: ['A', 'An', 'The', 'Some']
      }),
      q('ie1q5', 'DRAG_SLOT', 'Fill in the correct article: [BLANK] dog is barking.', {
        text: '[BLANK] dog is barking.',
        slots: [{ answer: 'A' }],
        options: ['A', 'An', 'Some', 'Many']
      }),
      // SEQUENCE_NEXT — alphabet
      q('ie1q6', 'SEQUENCE_NEXT', 'Write the NEXT letters in the alphabet.', {
        given: ['P', 'Q', 'R'],
        answers: ['S', 'T'],
        options: ['S', 'T', 'U'],
        distractors: ['X', 'M']
      }),
      // SEQUENCE_PREV — alphabet
      q('ie1q7', 'SEQUENCE_PREV', 'Write the PREVIOUS letters in the alphabet.', {
        given: ['F', 'G', 'H'],
        answers: ['D', 'E'],
        options: ['D', 'E'],
        distractors: ['A', 'K']
      }),
      // UNSCRAMBLE
      q('ie1q8', 'UNSCRAMBLE', 'Unscramble the letters to make a word! 🐕', {
        scrambled: ['O', 'D', 'G'],
        answer: 'DOG',
        hint: 'A pet that barks'
      }),
      // WORD_FIRST_LETTER
      q('ie1q9', 'WORD_FIRST_LETTER', 'Tap the correct FIRST letter to complete: ___AT', {
        wordWithBlank: '___AT',
        options: ['C', 'B', 'F', 'D', 'H'],
        answer: 'C',
        completeWord: 'CAT'
      }),
      // WORD_LAST_LETTER
      q('ie1q10', 'WORD_LAST_LETTER', 'Tap the correct LAST letter to complete: CA___', {
        wordWithBlank: 'CA___',
        options: ['T', 'N', 'R', 'P', 'S'],
        answer: 'T',
        completeWord: 'CAT'
      }),
    ]
  },

  // ── ENGLISH: Word Build ─────────────────────────────────────────────────────
  {
    id: 'int_eng_002', subject: 'english', title: '✨ Spell the Word!',
    topic: 'Interactive', difficulty: 'easy', estimatedTime: 10,
    description: 'Build words by tapping the correct letters in order!',
    questions: [
      q('ie2q1', 'WORD_BUILD', 'Tap the letters to spell the word for this picture! 🐕', {
        picture: '🐕', letterPool: ['D', 'O', 'X', 'G', 'A'], answer: 'DOG'
      }),
      q('ie2q2', 'WORD_BUILD', 'Tap the letters to spell the word for this picture! 🐱', {
        picture: '🐱', letterPool: ['C', 'A', 'T', 'E', 'B'], answer: 'CAT'
      }),
      q('ie2q3', 'WORD_BUILD', 'Tap the letters to spell the word for this picture! 🐘', {
        picture: '🐘', letterPool: ['E', 'L', 'A', 'P', 'H', 'N', 'T', 'O'], answer: 'ELEPHANT'
      }),
      q('ie2q4', 'WORD_BUILD', 'Tap the letters to spell the word for this picture! 🦁', {
        picture: '🦁', letterPool: ['L', 'I', 'O', 'N', 'A', 'E'], answer: 'LION'
      }),
      q('ie2q5', 'UNSCRAMBLE', 'Unscramble the letters to spell a fruit! 🍎', {
        scrambled: ['P', 'P', 'A', 'L', 'E'], answer: 'APPLE', hint: 'A red fruit'
      }),
      q('ie2q6', 'UNSCRAMBLE', 'Unscramble to make an animal! 🐸', {
        scrambled: ['R', 'F', 'O', 'G'], answer: 'FROG', hint: 'It jumps and says croak!'
      }),
      q('ie2q7', 'WORD_FIRST_LETTER', 'Tap the correct FIRST letter: ___OG', {
        wordWithBlank: '___OG', options: ['D', 'B', 'L', 'H', 'F'], answer: 'D', completeWord: 'DOG'
      }),
      q('ie2q8', 'WORD_LAST_LETTER', 'Tap the correct LAST letter: PI___', {
        wordWithBlank: 'PI___', options: ['G', 'N', 'T', 'M', 'S'], answer: 'G', completeWord: 'PIG'
      }),
      q('ie2q9', 'WORD_FIRST_LETTER', 'Tap the correct FIRST letter: ___UN', {
        wordWithBlank: '___UN', options: ['S', 'R', 'B', 'G', 'T'], answer: 'S', completeWord: 'SUN'
      }),
      q('ie2q10', 'WORD_LAST_LETTER', 'Tap the correct LAST letter: FRO___', {
        wordWithBlank: 'FRO___', options: ['G', 'N', 'T', 'B', 'K'], answer: 'G', completeWord: 'FROG'
      }),
    ]
  },

  // ── MATHS: Arrange & Sequence ───────────────────────────────────────────────
  {
    id: 'int_maths_001', subject: 'maths', title: '✨ Order & Sequence Numbers',
    topic: 'Interactive', difficulty: 'medium', estimatedTime: 12,
    description: 'Arrange numbers in order, fill in the missing numbers!',
    questions: [
      // ARRANGE — ascending
      q('im1q1', 'ARRANGE', 'Arrange these numbers in ASCENDING order (smallest to biggest).', {
        items: ['8', '3', '15', '1', '22'],
        correctOrder: ['1', '3', '8', '15', '22']
      }),
      // ARRANGE — descending
      q('im1q2', 'ARRANGE', 'Arrange these numbers in DESCENDING order (biggest to smallest).', {
        items: ['5', '12', '3', '20', '7'],
        correctOrder: ['20', '12', '7', '5', '3']
      }),
      // SEQUENCE_NEXT
      q('im1q3', 'SEQUENCE_NEXT', 'Write the NEXT numbers.', {
        given: ['15', '16', '17'],
        answers: ['18', '19'],
        options: ['18', '19', '20'],
        distractors: ['14', '21']
      }),
      q('im1q4', 'SEQUENCE_NEXT', 'Write the NEXT numbers.', {
        given: ['45', '46', '47'],
        answers: ['48', '49'],
        options: ['48', '49', '50'],
        distractors: ['44', '47']
      }),
      // SEQUENCE_PREV
      q('im1q5', 'SEQUENCE_PREV', 'Write the PREVIOUS numbers.', {
        given: ['23', '24', '25'],
        answers: ['21', '22'],
        options: ['21', '22'],
        distractors: ['26', '27']
      }),
      // DRAG_SLOT — greater/less/equal
      q('im1q6', 'DRAG_SLOT', '15 [BLANK] 8 (Use >, < or =)', {
        text: '15 [BLANK] 8',
        slots: [{ answer: '>' }],
        options: ['>', '<', '=']
      }),
      q('im1q7', 'DRAG_SLOT', '7 [BLANK] 7 (Use >, < or =)', {
        text: '7 [BLANK] 7',
        slots: [{ answer: '=' }],
        options: ['>', '<', '=']
      }),
      q('im1q8', 'DRAG_SLOT', '4 [BLANK] 12 (Use >, < or =)', {
        text: '4 [BLANK] 12',
        slots: [{ answer: '<' }],
        options: ['>', '<', '=']
      }),
      // ARRANGE — numbers
      q('im1q9', 'ARRANGE', 'Arrange in ASCENDING order.', {
        items: ['30', '10', '50', '20', '40'],
        correctOrder: ['10', '20', '30', '40', '50']
      }),
      q('im1q10', 'SEQUENCE_NEXT', 'Fill the missing numbers: 96, 97, 98, ___, ___', {
        given: ['96', '97', '98'],
        answers: ['99', '100'],
        options: ['99', '100'],
        distractors: ['101', '95']
      }),
    ]
  },
  //test
  // ── GENERAL AWARENESS: Match Animals ────────────────────────────────────────
  {
    id: 'int_ga_001', subject: 'ga', title: '✨ Animal Matching & Sorting',
    topic: 'Interactive', difficulty: 'easy', estimatedTime: 12,
    description: 'Match animals to their homes, sounds, and young ones!',
    questions: [
      // MATCH — animals → sounds
      q('ig1q1', 'MATCH', 'Match each animal to the sound it makes.', {
        pairs: [
          { left: '🐄 Cow', right: 'Moo' },
          { left: '🐕 Dog', right: 'Woof' },
          { left: '🐱 Cat', right: 'Meow' },
          { left: '🐄 Frog', right: 'Croak' },
        ]
      }),
      // MATCH — animals → homes
      q('ig1q2', 'MATCH', 'Match each animal to its home.', {
        pairs: [
          { left: '🐝 Bee', right: 'Hive' },
          { left: '🐦 Bird', right: 'Nest' },
          { left: '🐟 Fish', right: 'Water' },
          { left: '🦁 Lion', right: 'Den' },
        ]
      }),
      // CIRCLE_FIND — farm animals
      q('ig1q3', 'CIRCLE_FIND', 'Tap all the FARM animals!', {
        items: ['🐄 Cow', '🦁 Lion', '🐑 Sheep', '🐯 Tiger', '🐔 Hen', '🐘 Elephant', '🐎 Horse', '🦒 Giraffe', '🐖 Pig', '🐬 Dolphin'],
        correctItems: ['🐄 Cow', '🐑 Sheep', '🐔 Hen', '🐎 Horse', '🐖 Pig']
      }),
      // CIRCLE_FIND — wild animals
      q('ig1q4', 'CIRCLE_FIND', 'Tap all the WILD animals!', {
        items: ['🐄 Cow', '🦁 Lion', '🐑 Sheep', '🐯 Tiger', '🐔 Hen', '🐘 Elephant', '🦒 Giraffe', '🐖 Pig'],
        correctItems: ['🦁 Lion', '🐯 Tiger', '🐘 Elephant', '🦒 Giraffe']
      }),
      // MATCH — young ones
      q('ig1q5', 'MATCH', 'Match each animal to its young one.', {
        pairs: [
          { left: '🐄 Cow', right: 'Calf' },
          { left: '🐕 Dog', right: 'Puppy' },
          { left: '🐱 Cat', right: 'Kitten' },
          { left: '🐑 Sheep', right: 'Lamb' },
        ]
      }),
      // ARRANGE — alphabetical order of animals
      q('ig1q6', 'ARRANGE', 'Arrange these animals in ALPHABETICAL order.', {
        items: ['Lion', 'Frog', 'Ant', 'Dog', 'Bear'],
        correctOrder: ['Ant', 'Bear', 'Dog', 'Frog', 'Lion']
      }),
      // DRAG_SLOT
      q('ig1q7', 'DRAG_SLOT', 'A group of fish is called a [BLANK].', {
        text: 'A group of fish is called a [BLANK].',
        slots: [{ answer: 'school' }],
        options: ['school', 'flock', 'pride', 'herd']
      }),
      q('ig1q8', 'DRAG_SLOT', 'A group of lions is called a [BLANK].', {
        text: 'A group of lions is called a [BLANK].',
        slots: [{ answer: 'pride' }],
        options: ['school', 'flock', 'pride', 'herd']
      }),
      q('ig1q9', 'CIRCLE_FIND', 'Tap all the WATER animals!', {
        items: ['🐬 Dolphin', '🦁 Lion', '🐟 Fish', '🐄 Cow', '🦈 Shark', '🐔 Hen', '🐙 Octopus', '🐎 Horse'],
        correctItems: ['🐬 Dolphin', '🐟 Fish', '🦈 Shark', '🐙 Octopus']
      }),
      q('ig1q10', 'MATCH', 'Match each animal to its food.', {
        pairs: [
          { left: '🐄 Cow', right: 'Grass' },
          { left: '🐱 Cat', right: 'Fish' },
          { left: '🐦 Bird', right: 'Seeds' },
          { left: '🐕 Dog', right: 'Bones' },
        ]
      }),
    ]
  },

  // ── HINDI: Match & Sequence ──────────────────────────────────────────────────
  {
    id: 'int_hindi_001', subject: 'hindi', title: '✨ हिंदी — मिलान और क्रम',
    topic: 'Interactive', difficulty: 'easy', estimatedTime: 12,
    description: 'स्वर और व्यंजन — मिलाओ, पहचानो और क्रम लगाओ!',
    questions: [
      // MATCH — swar to their category
      q('ih1q1', 'MATCH', 'स्वरों को मिलाओ।', {
        pairs: [
          { left: 'अ', right: 'पहला स्वर' },
          { left: 'आ', right: 'दूसरा स्वर' },
          { left: 'इ', right: 'तीसरा स्वर' },
          { left: 'ई', right: 'चौथा स्वर' },
        ]
      }),
      // CIRCLE_FIND — swar
      q('ih1q2', 'CIRCLE_FIND', 'सभी स्वर (vowels) पर टैप करो!', {
        items: ['अ', 'क', 'आ', 'ख', 'इ', 'ग', 'ई', 'घ', 'उ', 'ङ'],
        correctItems: ['अ', 'आ', 'इ', 'ई', 'उ']
      }),
      // ARRANGE — vyanjan order
      q('ih1q3', 'ARRANGE', 'इन व्यंजनों को सही क्रम में लगाओ।', {
        items: ['ग', 'क', 'घ', 'ख', 'ङ'],
        correctOrder: ['क', 'ख', 'ग', 'घ', 'ङ']
      }),
      // SEQUENCE_NEXT
      q('ih1q4', 'SEQUENCE_NEXT', 'अगले स्वर लिखो।', {
        given: ['अ', 'आ', 'इ'],
        answers: ['ई', 'उ'],
        options: ['ई', 'उ', 'ऊ'],
        distractors: ['ए', 'क']
      }),
      // CIRCLE_FIND — long vowels (deergh swar)
      q('ih1q5', 'CIRCLE_FIND', 'दीर्घ स्वर (long vowels) पर टैप करो!', {
        items: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ'],
        correctItems: ['आ', 'ई', 'ऊ', 'ऐ']
      }),
      // MATCH — matra to word
      q('ih1q6', 'MATCH', 'मात्रा और शब्द मिलाओ।', {
        pairs: [
          { left: 'ा (aa)', right: 'माला' },
          { left: 'ि (i)', right: 'किताब' },
          { left: 'ी (ee)', right: 'नदी' },
          { left: 'ु (u)', right: 'गुड़िया' },
        ]
      }),
      // UNSCRAMBLE — Hindi
      q('ih1q7', 'UNSCRAMBLE', 'अक्षरों को सही क्रम में लगाकर शब्द बनाओ। (Hint: fruit)', {
        scrambled: ['म', 'ल', 'आ'],
        answer: 'आम',
        hint: 'एक मीठा फल 🥭'
      }),
      // DRAG_SLOT
      q('ih1q8', 'DRAG_SLOT', 'रिक्त स्थान भरो: मेरा नाम [BLANK] है।', {
        text: 'मेरा नाम [BLANK] है।',
        slots: [{ answer: 'राम' }],
        options: ['राम', 'खाना', 'स्कूल', 'पानी']
      }),
      q('ih1q9', 'DRAG_SLOT', 'रिक्त स्थान भरो: यह एक [BLANK] है।', {
        text: 'यह एक [BLANK] है।',
        slots: [{ answer: 'किताब' }],
        options: ['किताब', 'खाना', 'पानी', 'स्कूल']
      }),
      q('ih1q10', 'CIRCLE_FIND', 'इन में से व्यंजन (consonants) पर टैप करो!', {
        items: ['अ', 'क', 'ई', 'ख', 'उ', 'ग', 'ए', 'घ', 'ओ', 'ङ'],
        correctItems: ['क', 'ख', 'ग', 'घ', 'ङ']
      }),
    ]
  },
];

// ── TUITION TEST WORKSHEETS (4) ─────────────────────────────────────────────
const TUITION_WORKSHEETS = [
  {
    id: 'tt_001',
    subject: 'tuition',
    title: 'English Test (4-Line Sheet)',
    topic: 'Alphabet & Writing',
    difficulty: 'easy',
    estimatedTime: 15,
    description: 'Write capital and small letters in 4-line notebook pattern.',
    isTuitionSheet: true,
    sheetType: '4-line',
    instruction: 'Write letters A to Z in capital letters',
    comments: 'Capital letters must sit on the blue baseline and touch the top red headline.',
    sampleText: '',
    questions: [
      q('tt1q1', 'TUITION_CANVAS', 'Write letters A to Z in capital letters', {
        sheetType: '4-line',
        instruction: 'Write letters A to Z in capital letters',
        comments: 'Capital letters must sit on the blue baseline and touch the top red headline.',
        sampleText: ''
      })
    ]
  },
  {
    id: 'tt_002',
    subject: 'tuition',
    title: 'Hindi Copy Work (3-Line Sheet)',
    topic: 'शब्द रचना',
    difficulty: 'easy',
    estimatedTime: 15,
    description: 'दो अक्षर वाले शब्द सुंदर अक्षरों में लिखिए।',
    isTuitionSheet: true,
    sheetType: '3-line',
    instruction: 'चल नल पर जल भर — दो अक्षर वाले शब्द लिखिए।',
    comments: 'शिरोरेखा सीधी खींचिए और अक्षरों की बनावट सुंदर रखिए।',
    sampleText: '',
    questions: [
      q('tt2q1', 'TUITION_CANVAS', 'चल नल पर जल भर — दो अक्षर वाले शब्द लिखिए।', {
        sheetType: '3-line',
        instruction: 'चल नल पर जल भर — दो अक्षर वाले शब्द लिखिए।',
        comments: 'शिरोरेखा सीधी खींचिए और अक्षरों की बनावट सुंदर रखिए।',
        sampleText: ''
      })
    ]
  },
  {
    id: 'tt_003',
    subject: 'tuition',
    title: 'Maths Numbers Test (Grid Box Sheet)',
    topic: 'Number Writing',
    difficulty: 'easy',
    estimatedTime: 15,
    description: 'Write numbers 1 to 50 inside math square boxes.',
    isTuitionSheet: true,
    sheetType: 'grid',
    instruction: 'Write numbers 1 to 50 inside the math boxes',
    comments: 'Each number must fit neatly inside a single square grid box.',
    sampleText: '',
    questions: [
      q('tt3q1', 'TUITION_CANVAS', 'Write numbers 1 to 50 inside the math boxes', {
        sheetType: 'grid',
        instruction: 'Write numbers 1 to 50 inside the math boxes',
        comments: 'Each number must fit neatly inside a single square grid box.',
        sampleText: ''
      })
    ]
  },
  {
    id: 'tt_004',
    subject: 'tuition',
    title: 'Creative Writing & Drawing (Blank Sheet)',
    topic: 'Freehand Writing',
    difficulty: 'easy',
    estimatedTime: 15,
    description: 'Draw or write anything creative on the blank canvas.',
    isTuitionSheet: true,
    sheetType: 'blank',
    instruction: 'Draw your favourite fruit or write a sentence about your school',
    comments: 'Express your creativity using pen colors.',
    sampleText: '',
    questions: [
      q('tt4q1', 'TUITION_CANVAS', 'Draw your favourite fruit or write a sentence about your school', {
        sheetType: 'blank',
        instruction: 'Draw your favourite fruit or write a sentence about your school',
        comments: 'Express your creativity using pen colors.',
        sampleText: ''
      })
    ]
  }
];

const ALL_WORKSHEETS = [

  ...ENG_WORKSHEETS,
  ...MATHS_WORKSHEETS,
  ...GA_WORKSHEETS,
  ...HINDI_WORKSHEETS,
  ...ART_WORKSHEETS,
  ...INTERACTIVE_WORKSHEETS,
  ...TUITION_WORKSHEETS,
];


// ── Helpers ──────────────────────────────────────────────────────────────────
function getWorksheetsBySubject(subjectId) {
  return ALL_WORKSHEETS.filter(ws => ws.subject === subjectId);
}

function getWorksheetById(id) {
  return ALL_WORKSHEETS.find(ws => ws.id === id) || null;
}

function getTotalQuestionsForSubject(subjectId) {
  return getWorksheetsBySubject(subjectId).reduce((acc, ws) => acc + ws.questions.length, 0);
}
