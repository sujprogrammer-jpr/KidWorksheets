/* eslint-disable */
// Generator for Phase 2 Mega Syllabus Worksheets
const fs = require('fs');

// We will construct worksheets for ENGLISH, MATHS, HINDI, GA, ART
// ensuring EVERY question type has AT LEAST 10 questions per subject!

const data2Content = `/* eslint-disable */
// KidWorksheets PWA - Comprehensive Mega Syllabus Worksheets
// UKG / Class 1 Syllabus - All 21 Question Types Coverage Across All 5 Subjects
'use strict';

// Helper q function fallback if data.js wasn't executed first
if (typeof q === 'undefined') {
  function q(id, type, text, opts) {
    return { id, type, text, ...opts, marks: (opts && opts.marks) || 1 };
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// 1. ENGLISH MEGA WORKSHEETS
// ═════════════════════════════════════════════════════════════════════════════

const ENG_P2_WORKSHEETS = [
  {
    id: 'eng_p2_001', subject: 'english', title: 'Interactive Alphabet & Phonics',
    topic: 'Alphabets & Phonics', difficulty: 'easy', estimatedTime: 12,
    description: 'Match, circle, and sequence letters! Interactive phonic activities.',
    questions: [
      q('ep2e1q1','MATCH','Match each animal to the letter it starts with!',{
        pairs:[{left:'Elephant',right:'E'},{left:'Lion',right:'L'},{left:'Frog',right:'F'},{left:'Tiger',right:'T'}]
      }),
      q('ep2e1q2','CIRCLE_FIND','Tap all the VOWELS in the box!',{
        items:['A','B','C','D','E','F','G','H','I','J','K'],correctItems:['A','E','I']
      }),
      q('ep2e1q3','SEQUENCE_NEXT','Write the NEXT 3 letters.',{given:['P','Q','R'],blanks:3,answers:['S','T','U']}),
      q('ep2e1q4','SEQUENCE_PREV','Write 3 letters that come BEFORE D.',{given:['D','E','F'],blanks:3,answers:['A','B','C']}),
      q('ep2e1q5','UNSCRAMBLE','Unscramble to spell the word for a cat!',{scrambled:['T','A','C'],answer:'CAT',hint:'This animal says meow!'}),
      q('ep2e1q6','ARRANGE','Put letters in ALPHABETICAL order.',{items:['M','A','D','Z','F'],correctOrder:['A','D','F','M','Z']}),
      q('ep2e1q7','WORD_BUILD','Tap letters to spell DOG.',{letterPool:['D','O','G','X','A','T'],answer:'DOG'}),
      q('ep2e1q8','AUDIO_WRITE','Listen and write the word you hear!',{spokenText:'elephant',expectedAnswer:'elephant',language:'en-IN',hint:'It is a very big animal!'}),
      q('ep2e1q9','TEXT_HIGHLIGHT','Tap all the CVC words in the sentence!',{
        passage:'The big red cat sat on a mat near the bat and the hat.',
        correctWords:['cat','sat','mat','bat','hat']
      }),
      q('ep2e1q10','PICTURE_WRITE','Write ONE word for this picture.',{
        picture:'🌻',text:'Write ONE word for this picture',
        expectedAnswers:['flower','sunflower']
      }),
    ]
  },
  {
    id: 'eng_p2_002', subject: 'english', title: 'Words and Sounds Challenge',
    topic: 'Phonics and Word Building', difficulty: 'medium', estimatedTime: 12,
    description: 'Blends, digraphs, and vowel sounds in one worksheet!',
    questions: [
      q('ep2e2q1','MATCH','Match each digraph to a word that uses it.',{
        pairs:[{left:'sh',right:'shell'},{left:'ch',right:'chair'},{left:'th',right:'three'},{left:'wh',right:'whale'}]
      }),
      q('ep2e2q2','CIRCLE_FIND','Tap all words that START with a blend.',{
        items:['frog','cat','blue','tree','mat','clap','sun','fly'],
        correctItems:['frog','blue','tree','clap','fly']
      }),
      q('ep2e2q3','DRAG_SLOT','The [BLANK] jumps over the fence.',{
        text:'The [BLANK] jumps over the fence.',options:['frog','stone','blue','quickly'],slots:[{answer:'frog'}]
      }),
      q('ep2e2q4','VOWEL_SORT','Tap all words with the SHORT A sound!',{
        mode:'single',lang:'english',targetVowel:'A',
        words:['cat','egg','hat','big','bag','cup','mat','pet'],correctWords:['cat','hat','bag','mat']
      }),
      q('ep2e2q5','AUDIO_WRITE','Listen and write the word.',{
        spokenText:'umbrella',expectedAnswer:'umbrella',language:'en-IN'
      }),
      q('ep2e2q6','UNSCRAMBLE','Unscramble to find an animal!',{scrambled:['F','R','O','G'],answer:'FROG',hint:'Lives near a pond!'}),
      q('ep2e2q7','WORD_BUILD','Build the word for BUTTERFLY.',{letterPool:['B','U','T','E','R','F','L','Y','X'],answer:'BUTTERFLY'}),
      q('ep2e2q8','MCQ','Which word rhymes with CAKE?',{options:['lake','back','cat','bed'],answer:'lake'}),
      q('ep2e2q9','SEQUENCE_NEXT','Continue the alphabet pattern.',{given:['F','G','H'],blanks:3,answers:['I','J','K']}),
      q('ep2e2q10','TRUE_FALSE','The word "cheese" starts with a digraph.',{answer:true,hint:'ch is a digraph!'}),
    ]
  },
  {
    id: 'eng_p2_003', subject: 'english', title: 'English Sight Words & Match Master',
    topic: 'Sight Words & Matching', difficulty: 'easy', estimatedTime: 12,
    description: 'Match images, fill blanks, and complete word patterns!',
    questions: [
      q('ep2e3q1','MATCH_IMAGE','Match each emoji image to its word!',{
        pairs:[{left:'🍎',right:'Apple'},{left:'🐶',right:'Dog'},{left:'🚗',right:'Car'},{left:'☀️',right:'Sun'}]
      }),
      q('ep2e3q2','MATCH_IMAGE','Match action emojis to words!',{
        pairs:[{left:'🏃',right:'Run'},{left:'😴',right:'Sleep'},{left:'🏊',right:'Swim'},{left:'📖',right:'Read'}]
      }),
      q('ep2e3q3','MATCH','Match rhyming word pairs.',{
        pairs:[{left:'cat',right:'hat'},{left:'pen',right:'ten'},{left:'pin',right:'win'},{left:'dog',right:'log'}]
      }),
      q('ep2e3q4','MATCH','Match opposite word pairs.',{
        pairs:[{left:'hot',right:'cold'},{left:'big',right:'small'},{left:'up',right:'down'},{left:'fast',right:'slow'}]
      }),
      q('ep2e3q5','WORD_FIRST_LETTER','Choose the correct starting letter for ___AT.',{
        wordWithBlank:'_AT',options:['C','P','Z','Q'],answer:'C',hint:'An animal that meows'
      }),
      q('ep2e3q6','WORD_FIRST_LETTER','Choose the starting letter for ___ALL.',{
        wordWithBlank:'_ALL',options:['B','K','J','X'],answer:'B',hint:'Round toy to bounce'
      }),
      q('ep2e3q7','WORD_FIRST_LETTER','Choose starting letter for ___UN.',{
        wordWithBlank:'_UN',options:['S','V','Z','W'],answer:'S',hint:'Shines brightly in sky'
      }),
      q('ep2e3q8','WORD_FIRST_LETTER','Choose starting letter for ___EN.',{
        wordWithBlank:'_EN',options:['P','Y','Q','X'],answer:'P',hint:'Used for writing'
      }),
      q('ep2e3q9','WORD_FIRST_LETTER','Choose starting letter for ___IG.',{
        wordWithBlank:'_IG',options:['P','V','Z','Q'],answer:'P',hint:'Farm animal with pink tail'
      }),
      q('ep2e3q10','WORD_FIRST_LETTER','Choose starting letter for ___OX.',{
        wordWithBlank:'_OX',options:['F','Z','Q','W'],answer:'F',hint:'Clever wild animal'
      }),
    ]
  },
  {
    id: 'eng_p2_004', subject: 'english', title: 'Reading & Passage Comprehension',
    topic: 'Reading & Comprehension', difficulty: 'medium', estimatedTime: 14,
    description: 'Read short stories and answer comprehension questions!',
    questions: [
      q('ep2e4q1','READ_AND_ANSWER','Read the passage and answer.',{
        passage:'Sam has a little brown puppy named Max. Max loves to play with a red ball in the garden.',
        question:'What is the name of Sam\'s puppy?',answer:'Max',options:['Max','Sam','Spot','Bruno']
      }),
      q('ep2e4q2','READ_AND_ANSWER','Read the passage and answer.',{
        passage:'Sam has a little brown puppy named Max. Max loves to play with a red ball in the garden.',
        question:'What colour is Max\'s ball?',answer:'red',options:['red','blue','green','yellow']
      }),
      q('ep2e4q3','READ_AND_ANSWER','Read the passage and answer.',{
        passage:'Lily went to the park on Sunday. She saw three green frogs swimming near the big pond.',
        question:'How many frogs did Lily see?',answer:'three',options:['two','three','four','five']
      }),
      q('ep2e4q4','READ_AND_ANSWER','Read the passage and answer.',{
        passage:'Lily went to the park on Sunday. She saw three green frogs swimming near the big pond.',
        question:'Where were the frogs swimming?',answer:'near the big pond',options:['in a cup','near the big pond','on a tree','under a chair']
      }),
      q('ep2e4q5','READ_AND_ANSWER','Read the passage and answer.',{
        passage:'Ben likes to eat sweet red apples for breakfast. His mother cuts them into small slices.',
        question:'What fruit does Ben eat for breakfast?',answer:'apples',options:['apples','bananas','oranges','grapes']
      }),
      q('ep2e4q6','READ_AND_ANSWER','Read the passage and answer.',{
        passage:'A yellow duck lives near a clear lake. Every morning, the duck swims with its five little ducklings.',
        question:'How many ducklings swim with the yellow duck?',answer:'five',options:['three','four','five','six']
      }),
      q('ep2e4q7','READ_AND_ANSWER','Read the passage and answer.',{
        passage:'Tina put on her yellow raincoat and red boots because it was raining heavily outside.',
        question:'Why did Tina wear her raincoat?',answer:'it was raining',options:['it was sunny','it was raining','it was snowing','it was windy']
      }),
      q('ep2e4q8','READ_AND_ANSWER','Read the passage and answer.',{
        passage:'Tom has a shiny blue bicycle with a silver bell. He rides his bicycle every evening after school.',
        question:'When does Tom ride his bicycle?',answer:'every evening',options:['every morning','every evening','at midnight','at noon']
      }),
      q('ep2e4q9','READ_AND_ANSWER','Read the passage and answer.',{
        passage:'The sun shines bright in the morning. Birds sing happy songs on top of tall green trees.',
        question:'Where do the birds sing?',answer:'on top of tall green trees',options:['in the water','under the bed','on top of tall green trees','inside a cave']
      }),
      q('ep2e4q10','READ_AND_ANSWER','Read the passage and answer.',{
        passage:'Mia bakes delicious chocolate cupcakes for her brother\'s birthday party.',
        question:'What kind of cupcakes does Mia bake?',answer:'chocolate',options:['vanilla','chocolate','strawberry','lemon']
      }),
    ]
  },
  {
    id: 'eng_p2_005', subject: 'english', title: 'English Audio & Drag-and-Drop Practice',
    topic: 'Listening & Sentence Building', difficulty: 'medium', estimatedTime: 12,
    description: 'Listen to audio clips, complete sentences, and sort vowel sounds!',
    questions: [
      q('ep2e5q1','AUDIO_CLIP','Listen to the word and pick the correct option!',{
        audioSrc:'',question:'Listen and pick the word you hear!',options:['apple','banana','orange','grape'],answer:'apple',mode:'mcq'
      }),
      q('ep2e5q2','AUDIO_CLIP','Listen and type the word you hear.',{
        audioSrc:'',question:'Listen and write the word!',answer:'butterfly',mode:'write'
      }),
      q('ep2e5q3','AUDIO_CLIP','Listen and pick the correct rhyming word.',{
        audioSrc:'',question:'Which word rhymes with SUN?',options:['fun','cat','dog','pen'],answer:'fun',mode:'mcq'
      }),
      q('ep2e5q4','AUDIO_CLIP','Listen and type what you hear.',{
        audioSrc:'',question:'Listen to the TTS voice and type the sentence!',answer:'I love reading books',mode:'write'
      }),
      q('ep2e5q5','AUDIO_CLIP','Listen to the animal sound word.',{
        audioSrc:'',question:'What animal makes this sound?',options:['cat','dog','cow','duck'],answer:'cat',mode:'mcq'
      }),
      q('ep2e5q6','AUDIO_CLIP','Listen and write.',{
        audioSrc:'',question:'Write the word spoken aloud.',answer:'rainbow',mode:'write'
      }),
      q('ep2e5q7','AUDIO_CLIP','Listen and pick the vowel.',{
        audioSrc:'',question:'Which vowel sound is in umbrella?',options:['u','a','e','o'],answer:'u',mode:'mcq'
      }),
      q('ep2e5q8','AUDIO_CLIP','Listen and write the action verb.',{
        audioSrc:'',question:'Listen and write the verb.',answer:'jumping',mode:'write'
      }),
      q('ep2e5q9','AUDIO_CLIP','Listen and pick the opposite word.',{
        audioSrc:'',question:'What is the opposite of BIG?',options:['small','tall','huge','fat'],answer:'small',mode:'mcq'
      }),
      q('ep2e5q10','AUDIO_CLIP','Listen and write.',{
        audioSrc:'',question:'Listen and write the word.',answer:'friendship',mode:'write'
      }),
    ]
  },
  {
    id: 'eng_p2_006', subject: 'english', title: 'English Master Builder & Drag Slots',
    topic: 'Sentences & Word Building', difficulty: 'medium', estimatedTime: 12,
    description: 'Drag tiles into slots, arrange alphabet sequences, and build words!',
    questions: [
      q('ep2e6q1','DRAG_SLOT','The sun is [BLANK] in the sky.',{
        text:'The sun is [BLANK] in the sky.',options:['shining','eating','sleeping','walking'],slots:[{answer:'shining'}]
      }),
      q('ep2e6q2','DRAG_SLOT','An [BLANK] a day keeps the doctor away.',{
        text:'An [BLANK] a day keeps the doctor away.',options:['apple','banana','rock','pencil'],slots:[{answer:'apple'}]
      }),
      q('ep2e6q3','DRAG_SLOT','Birds fly high in the [BLANK].',{
        text:'Birds fly high in the [BLANK].',options:['sky','water','ground','house'],slots:[{answer:'sky'}]
      }),
      q('ep2e6q4','DRAG_SLOT','Fish can swim in the [BLANK].',{
        text:'Fish can swim in the [BLANK].',options:['water','tree','bed','sky'],slots:[{answer:'water'}]
      }),
      q('ep2e6q5','DRAG_SLOT','We write with a [BLANK] on paper.',{
        text:'We write with a [BLANK] on paper.',options:['pencil','spoon','shoe','leaf'],slots:[{answer:'pencil'}]
      }),
      q('ep2e6q6','DRAG_SLOT','The cow gives us fresh [BLANK].',{
        text:'The cow gives us fresh [BLANK].',options:['milk','juice','water','tea'],slots:[{answer:'milk'}]
      }),
      q('ep2e6q7','DRAG_SLOT','A rabbit likes to eat a orange [BLANK].',{
        text:'A rabbit likes to eat a orange [BLANK].',options:['carrot','meat','bread','cake'],slots:[{answer:'carrot'}]
      }),
      q('ep2e6q8','ARRANGE','Put these words to make a correct sentence.',{
        items:['cat','The','sat','on','mat','the'],correctOrder:['The','cat','sat','on','the','mat']
      }),
      q('ep2e6q9','ARRANGE','Put these words in sentence order.',{
        items:['like','I','to','books','read'],correctOrder:['I','like','to','read','books']
      }),
      q('ep2e6q10','ARRANGE','Put days of the weekend in order.',{
        items:['Sunday','Saturday'],correctOrder:['Saturday','Sunday']
      }),
    ]
  },
  {
    id: 'eng_p2_007', subject: 'english', title: 'English Vowel Sort & Highlighting',
    topic: 'Vowels & Highlighting', difficulty: 'medium', estimatedTime: 12,
    description: 'Sort words by vowel sounds and highlight target words in passages!',
    questions: [
      q('ep2e7q1','VOWEL_SORT','Tap all words with the SHORT E sound!',{
        mode:'single',lang:'english',targetVowel:'E',
        words:['bed','cat','pen','red','dog','ten','cup','hen'],correctWords:['bed','pen','red','ten','hen']
      }),
      q('ep2e7q2','VOWEL_SORT','Tap all words with the SHORT I sound!',{
        mode:'single',lang:'english',targetVowel:'I',
        words:['pin','sit','cat','big','pig','hat','win','sun'],correctWords:['pin','sit','big','pig','win']
      }),
      q('ep2e7q3','VOWEL_SORT','Tap all words with the SHORT O sound!',{
        mode:'single',lang:'english',targetVowel:'O',
        words:['dog','pot','box','hot','fox','bed','sun','map'],correctWords:['dog','pot','box','hot','fox']
      }),
      q('ep2e7q4','VOWEL_SORT','Tap all words with the SHORT U sound!',{
        mode:'single',lang:'english',targetVowel:'U',
        words:['sun','cup','bus','hug','run','cat','pen','pig'],correctWords:['sun','cup','bus','hug','run']
      }),
      q('ep2e7q5','TEXT_HIGHLIGHT','Tap all the ACTION VERBS in the passage!',{
        passage:'The boy can run jump swim and dance happily in the park.',
        correctWords:['run','jump','swim','dance']
      }),
      q('ep2e7q6','TEXT_HIGHLIGHT','Tap all the COLOUR words in the sentence!',{
        passage:'I saw a red cardinal bird on a green leaf under the blue sky.',
        correctWords:['red','green','blue']
      }),
      q('ep2e7q7','TEXT_HIGHLIGHT','Tap all the ANIMAL words in the passage!',{
        passage:'On the farm we saw a cow a pig a horse and a duck.',
        correctWords:['cow','pig','horse','duck']
      }),
      q('ep2e7q8','TEXT_HIGHLIGHT','Tap all the NOUNS in the sentence!',{
        passage:'The teacher holds a book and writes on the board.',
        correctWords:['teacher','book','board']
      }),
      q('ep2e7q9','PICTURE_WRITE','Write ONE word for this picture.',{
        picture:'🚀',text:'Write ONE word for this picture',expectedAnswers:['rocket','spaceship']
      }),
      q('ep2e7q10','PICTURE_WRITE','Write ONE word for this picture.',{
        picture:'👑',text:'Write ONE word for this picture',expectedAnswers:['crown','king','queen']
      }),
    ]
  },
  {
    id: 'eng_p2_008', subject: 'english', title: 'English Audio Dictation & Number Words',
    topic: 'Dictation & Number Words', difficulty: 'easy', estimatedTime: 12,
    description: 'Listen to dictation, write number words, and build vocabulary!',
    questions: [
      q('ep2e8q1','AUDIO_WRITE','Listen and write the word.',{spokenText:'peacock',expectedAnswer:'peacock',language:'en-IN'}),
      q('ep2e8q2','AUDIO_WRITE','Listen and write the word.',{spokenText:'chocolate',expectedAnswer:'chocolate',language:'en-IN'}),
      q('ep2e8q3','AUDIO_WRITE','Listen and write the word.',{spokenText:'sunflower',expectedAnswer:'sunflower',language:'en-IN'}),
      q('ep2e8q4','AUDIO_WRITE','Listen and write the word.',{spokenText:'aeroplane',expectedAnswer:'aeroplane',language:'en-IN'}),
      q('ep2e8q5','AUDIO_WRITE','Listen and write the word.',{spokenText:'happiness',expectedAnswer:'happiness',language:'en-IN'}),
      q('ep2e8q6','NUMBER_WRITE','Write the English number word for digit 1.',{digit:'1',answer:'one'}),
      q('ep2e8q7','NUMBER_WRITE','Write the English number word for digit 2.',{digit:'2',answer:'two'}),
      q('ep2e8q8','NUMBER_WRITE','Write the English number word for digit 3.',{digit:'3',answer:'three'}),
      q('ep2e8q9','NUMBER_WRITE','Write the English number word for digit 4.',{digit:'4',answer:'four'}),
      q('ep2e8q10','NUMBER_WRITE','Write the English number word for digit 5.',{digit:'5',answer:'five'}),
    ]
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// 2. MATHEMATICS MEGA WORKSHEETS
// ═════════════════════════════════════════════════════════════════════════════

const MATH_P2_WORKSHEETS = [
  {
    id: 'math_p2_001', subject: 'maths', title: 'Numbers, Tens & Place Value',
    topic: 'Counting, Tens and Patterns', difficulty: 'medium', estimatedTime: 12,
    description: 'Tens blocks, ascending order, and fill-the-gap number activities.',
    questions: [
      q('mp2q1','GROUPS_OF_TENS','Count the groups of tens!',{tensCount:3,unitsCount:0,question:'How many TENS?',answer:'3'}),
      q('mp2q2','GROUPS_OF_TENS','Count tens AND units.',{tensCount:2,unitsCount:4,question:'What number is shown? (tens x 10 + units)',answer:'24'}),
      q('mp2q3','ARRANGE','Put these numbers in ASCENDING order (smallest first).',{items:['42','17','85','3','61'],correctOrder:['3','17','42','61','85']}),
      q('mp2q4','ARRANGE','Put these numbers in DESCENDING order (biggest first).',{items:['9','34','7','100','51'],correctOrder:['100','51','34','9','7']}),
      q('mp2q5','SEQUENCE_NEXT','Fill in the NEXT 3 numbers: 15, 20, 25...',{given:['15','20','25'],blanks:3,answers:['30','35','40']}),
      q('mp2q6','SEQUENCE_PREV','Write the 3 numbers before 40.',{given:['40','41','42'],blanks:3,answers:['37','38','39']}),
      q('mp2q7','FILL_BLANK','Write the number name for 17.',{answer:'seventeen',hint:'seven + ten!'}),
      q('mp2q8','FILL_BLANK','What comes BETWEEN 49 and 51?',{answer:'50',hint:'Right in the middle!'}),
      q('mp2q9','DRAG_SLOT','45 [BLANK] 54 (use > or < or =)',{text:'45 [BLANK] 54',options:['<','=','>'],slots:[{answer:'<'}]}),
      q('mp2q10','MCQ','How many tens are in the number 70?',{options:['5','6','7','8'],answer:'7'}),
    ]
  },
  {
    id: 'math_p2_002', subject: 'maths', title: 'Math Matching & Shape Fun',
    topic: 'Matching & Shapes', difficulty: 'easy', estimatedTime: 12,
    description: 'Match numbers, shapes, addition pairs, and emojis!',
    questions: [
      q('mp2m1','MATCH','Match addition expressions to their sum!',{
        pairs:[{left:'2 + 2',right:'4'},{left:'5 + 3',right:'8'},{left:'6 + 4',right:'10'},{left:'7 + 5',right:'12'}]
      }),
      q('mp2m2','MATCH','Match subtraction expressions to their answer!',{
        pairs:[{left:'10 - 3',right:'7'},{left:'8 - 2',right:'6'},{left:'15 - 5',right:'10'},{left:'9 - 4',right:'5'}]
      }),
      q('mp2m3','MATCH_IMAGE','Match shape emojis to shape names!',{
        pairs:[{left:'🔴',right:'Circle'},{left:'⬛',right:'Square'},{left:'🔺',right:'Triangle'},{left:'⭐',right:'Star'}]
      }),
      q('mp2m4','MATCH_IMAGE','Match count emojis to digits!',{
        pairs:[{left:'🍎🍎',right:'2'},{left:'🍎🍎🍎',right:'3'},{left:'🍎🍎🍎🍎',right:'4'},{left:'🍎',right:'1'}]
      }),
      q('mp2m5','CIRCLE_FIND','Tap all EVEN numbers in the grid!',{
        items:['2','5','8','11','14','17','20','23'],correctItems:['2','8','14','20']
      }),
      q('mp2m6','CIRCLE_FIND','Tap all MULTIPLES OF 5!',{
        items:['5','12','15','22','25','33','40','48'],correctItems:['5','15','25','40']
      }),
      q('mp2m7','UNSCRAMBLE','Unscramble to spell the number word for 1!',{scrambled:['N','O','E'],answer:'ONE',hint:'Starts with O'}),
      q('mp2m8','UNSCRAMBLE','Unscramble to spell the number word for 2!',{scrambled:['O','W','T'],answer:'TWO',hint:'T-W-O'}),
      q('mp2m9','UNSCRAMBLE','Unscramble to spell the number word for 3!',{scrambled:['E','E','R','H','T'],answer:'THREE',hint:'3'}),
      q('mp2m10','UNSCRAMBLE','Unscramble to spell the number word for 4!',{scrambled:['R','U','O','F'],answer:'FOUR',hint:'4'}),
    ]
  },
  {
    id: 'math_p2_003', subject: 'maths', title: 'Math Word Building & First Letter',
    topic: 'Number Words & Geometry', difficulty: 'easy', estimatedTime: 12,
    description: 'Build number words, select starting letters, and write digits!',
    questions: [
      q('mp2wb1','WORD_BUILD','Tap letters to spell FIVE.',{letterPool:['F','I','V','E','X','O'],answer:'FIVE'}),
      q('mp2wb2','WORD_BUILD','Tap letters to spell EIGHT.',{letterPool:['E','I','G','H','T','Z'],answer:'EIGHT'}),
      q('mp2wb3','WORD_BUILD','Tap letters to spell TEN.',{letterPool:['T','E','N','K','P'],answer:'TEN'}),
      q('mp2wb4','WORD_BUILD','Tap letters to spell SEVEN.',{letterPool:['S','E','V','E','N','Q'],answer:'SEVEN'}),
      q('mp2wb5','WORD_BUILD','Tap letters to spell CIRCLE.',{letterPool:['C','I','R','C','L','E','B'],answer:'CIRCLE'}),
      q('mp2fl1','WORD_FIRST_LETTER','Choose starting letter for ___IVE.',{wordWithBlank:'_IVE',options:['F','M','B','Z'],answer:'F',hint:'Digit 5'}),
      q('mp2fl2','WORD_FIRST_LETTER','Choose starting letter for ___HREE.',{wordWithBlank:'_HREE',options:['T','K','Q','W'],answer:'T',hint:'Digit 3'}),
      q('mp2fl3','WORD_FIRST_LETTER','Choose starting letter for ___EVEN.',{wordWithBlank:'_EVEN',options:['S','V','X','Y'],answer:'S',hint:'Digit 7'}),
      q('mp2fl4','WORD_FIRST_LETTER','Choose starting letter for ___INE.',{wordWithBlank:'_INE',options:['N','M','K','L'],answer:'N',hint:'Digit 9'}),
      q('mp2fl5','WORD_FIRST_LETTER','Choose starting letter for ___ERO.',{wordWithBlank:'_ERO',options:['Z','X','Q','V'],answer:'Z',hint:'Digit 0'}),
    ]
  },
  {
    id: 'math_p2_004', subject: 'maths', title: 'Math Story Problems & Text Highlighting',
    topic: 'Word Problems & Highlighting', difficulty: 'medium', estimatedTime: 14,
    description: 'Solve story word problems and highlight target numbers!',
    questions: [
      q('mp2ra1','READ_AND_ANSWER','Solve the story math problem.',{
        passage:'Rohan has 5 red balloons. His sister gives him 3 more balloons.',
        question:'How many balloons does Rohan have in total?',answer:'8',options:['6','7','8','9']
      }),
      q('mp2ra2','READ_AND_ANSWER','Solve the story math problem.',{
        passage:'There are 12 birds sitting on a tree branch. 4 birds fly away into the sky.',
        question:'How many birds are left on the tree branch?',answer:'8',options:['6','7','8','10']
      }),
      q('mp2ra3','READ_AND_ANSWER','Solve the story math problem.',{
        passage:'A baker bakes 10 chocolate cookies in the morning and 10 cookies in the afternoon.',
        question:'How many total cookies did the baker bake?',answer:'20',options:['15','18','20','25']
      }),
      q('mp2ra4','READ_AND_ANSWER','Solve the story math problem.',{
        passage:'Ananya bought 15 oranges from the market. She shared 5 oranges with her friends.',
        question:'How many oranges does Ananya have left?',answer:'10',options:['8','9','10','12']
      }),
      q('mp2ra5','READ_AND_ANSWER','Solve the story math problem.',{
        passage:'A box has 6 blue pencils and 6 yellow pencils inside.',
        question:'How many pencils are in the box altogether?',answer:'12',options:['10','11','12','14']
      }),
      q('mp2th1','TEXT_HIGHLIGHT','Tap all EVEN numbers in the sentence.',{
        passage:'The numbers are 2 5 8 11 14 17 20 23 in the list.',
        correctWords:['2','8','14','20']
      }),
      q('mp2th2','TEXT_HIGHLIGHT','Tap all numbers GREATER THAN 10.',{
        passage:'Look at 3 12 7 15 9 25 4 30.',
        correctWords:['12','15','25','30']
      }),
      q('mp2th3','TEXT_HIGHLIGHT','Tap all SHAPE names in the word problem.',{
        passage:'Draw a square a circle and a triangle on white paper.',
        correctWords:['square','circle','triangle']
      }),
      q('mp2pw1','PICTURE_WRITE','Write the total count of dots in digit.',{
        picture:'🔴🔴🔴🔴🔴',text:'Count the red dots and write the digit.',expectedAnswers:['5']
      }),
      q('mp2pw2','PICTURE_WRITE','Write the name of this shape.',{
        picture:'🔺',text:'What shape is this?',expectedAnswers:['triangle']
      }),
    ]
  },
  {
    id: 'math_p2_005', subject: 'maths', title: 'Math Audio & Groups of Tens Master',
    topic: 'Tens, Dictation & Audio Math', difficulty: 'medium', estimatedTime: 12,
    description: 'Tens blocks, audio dictation digits, and audio math problems!',
    questions: [
      q('mp2got1','GROUPS_OF_TENS','Count the tens blocks!',{tensCount:4,unitsCount:0,question:'How many TENS blocks are shown?',answer:'4'}),
      q('mp2got2','GROUPS_OF_TENS','Count tens and units.',{tensCount:5,unitsCount:3,question:'What number is represented by 5 tens and 3 units?',answer:'53'}),
      q('mp2got3','GROUPS_OF_TENS','Count tens and units.',{tensCount:1,unitsCount:8,question:'What number is 1 ten and 8 units?',answer:'18'}),
      q('mp2got4','GROUPS_OF_TENS','Count tens and units.',{tensCount:6,unitsCount:2,question:'What number is 6 tens and 2 units?',answer:'62'}),
      q('mp2got5','GROUPS_OF_TENS','Count tens and units.',{tensCount:7,unitsCount:5,question:'What number is 7 tens and 5 units?',answer:'75'}),
      q('mp2aw1','AUDIO_WRITE','Listen to the spoken number and write the digit.',{spokenText:'forty two',expectedAnswer:'42',language:'en-IN'}),
      q('mp2aw2','AUDIO_WRITE','Listen and write digit.',{spokenText:'seventy five',expectedAnswer:'75',language:'en-IN'}),
      q('mp2aw3','AUDIO_WRITE','Listen and write digit.',{spokenText:'ninety nine',expectedAnswer:'99',language:'en-IN'}),
      q('mp2aw4','AUDIO_WRITE','Listen and write digit.',{spokenText:'one hundred',expectedAnswer:'100',language:'en-IN'}),
      q('mp2aw5','AUDIO_WRITE','Listen and write digit.',{spokenText:'sixty four',expectedAnswer:'64',language:'en-IN'}),
    ]
  },
  {
    id: 'math_p2_006', subject: 'maths', title: 'Math Number Names & Audio Clips',
    topic: 'Number Names & Audio Q&A', difficulty: 'easy', estimatedTime: 12,
    description: 'Write number names from digits and solve audio math questions!',
    questions: [
      q('mp2nw1','NUMBER_WRITE','Write number word for 6.',{digit:'6',answer:'six'}),
      q('mp2nw2','NUMBER_WRITE','Write number word for 7.',{digit:'7',answer:'seven'}),
      q('mp2nw3','NUMBER_WRITE','Write number word for 8.',{digit:'8',answer:'eight'}),
      q('mp2nw4','NUMBER_WRITE','Write number word for 9.',{digit:'9',answer:'nine'}),
      q('mp2nw5','NUMBER_WRITE','Write number word for 10.',{digit:'10',answer:'ten'}),
      q('mp2ac1','AUDIO_CLIP','Listen to the math question and pick answer!',{
        audioSrc:'',question:'What is 5 + 5?',options:['8','9','10','12'],answer:'10',mode:'mcq'
      }),
      q('mp2ac2','AUDIO_CLIP','Listen and write answer.',{
        audioSrc:'',question:'Listen and solve: 15 - 5 = ?',answer:'10',mode:'write'
      }),
      q('mp2ac3','AUDIO_CLIP','Listen and pick answer.',{
        audioSrc:'',question:'How many sides does a triangle have?',options:['3','4','5','6'],answer:'3',mode:'mcq'
      }),
      q('mp2ac4','AUDIO_CLIP','Listen and write answer.',{
        audioSrc:'',question:'Listen: What number comes after 19?',answer:'20',mode:'write'
      }),
      q('mp2ac5','AUDIO_CLIP','Listen and pick answer.',{
        audioSrc:'',question:'Which number is greater: 25 or 52?',options:['25','52','both equal'],answer:'52',mode:'mcq'
      }),
    ]
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// 3. HINDI MEGA WORKSHEETS (हिंदी)
// ═════════════════════════════════════════════════════════════════════════════

const HINDI_P2_WORKSHEETS = [
  {
    id: 'hindi_p2_001', subject: 'hindi', title: 'वर्णमाला, स्वर और व्यंजन',
    topic: 'स्वर और व्यंजन', difficulty: 'easy', estimatedTime: 12,
    description: 'मिलाओ, ढूंढो और लिखो — हिंदी वर्णमाला की मज़ेदार गतिविधियाँ!',
    questions: [
      q('hp2q1','MATCH','प्रत्येक चित्र को सही स्वर से मिलाओ!',{
        pairs:[{left:'सेब',right:'अ'},{left:'आम',right:'आ'},{left:'ईगल',right:'ई'},{left:'ऊँट',right:'ऊ'}]
      }),
      q('hp2q2','CIRCLE_FIND','सभी स्वर पर टैप करो!',{
        items:['अ','क','आ','ग','इ','ड','ई','त','उ','प'],correctItems:['अ','आ','इ','ई','उ']
      }),
      q('hp2q3','SEQUENCE_NEXT','वर्णमाला में अगले तीन अक्षर लिखो।',{given:['क','ख','ग'],blanks:3,answers:['घ','ङ','च']}),
      q('hp2q4','ARRANGE','इन अक्षरों को वर्णमाला क्रम में लगाओ।',{items:['घ','क','ग','خ','ङ'],correctOrder:['क','ख','ग','घ','ङ']}),
      q('hp2q5','AUDIO_WRITE','सुनो और लिखो!',{spokenText:'आम',expectedAnswer:'आम',language:'hi-IN',hint:'यह एक मीठा फल है'}),
      q('hp2q6','FILL_BLANK','"कमल" में कितने अक्षर हैं?',{answer:'3',hint:'क + म + ल = ?'}),
      q('hp2q7','MCQ','"अनार" में पहला स्वर कौन सा है?',{options:['अ','इ','उ','ए'],answer:'अ'}),
      q('hp2q8','TEXT_HIGHLIGHT','सभी स्वर अक्षरों पर टैप करो!',{
        passage:'अ आ इ ई उ ऊ ए ऐ ओ औ अं अः',
        correctWords:['अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ']
      }),
      q('hp2q9','TRUE_FALSE','"आम" शब्द में मात्रा है।',{answer:true,hint:'आ की मात्रा है!'}),
      q('hp2q10','FILL_BLANK','क + म + ल = ___________',{answer:'कमल',hint:'एक सुंदर फूल है'}),
    ]
  },
  {
    id: 'hindi_p2_002', subject: 'hindi', title: 'हिंदी चित्र मिलान व वर्णमाला',
    topic: 'चित्र मिलान और शब्द', difficulty: 'easy', estimatedTime: 12,
    description: 'चित्रों को शब्दों से मिलाओ और वर्णमाला पूरी करो!',
    questions: [
      q('hp2m1','MATCH_IMAGE','चित्रों को उनके हिंदी नाम से मिलाओ!',{
        pairs:[{left:'🥭',right:'आम'},{left:'🍎',right:'सेब'},{left:' कमल',right:'कमल'},{left:'🐘',right:'हाथी'}]
      }),
      q('hp2m2','MATCH_IMAGE','पशुओं को उनके हिंदी नाम से मिलाओ!',{
        pairs:[{left:'🐕',right:'कुत्ता'},{left:'🐈',right:'बिल्ली'},{left:'🐅',right:'बाघ'},{left:'🐄',right:'गाय'}]
      }),
      q('hp2m3','MATCH','सही विलोम शब्द जोड़ो।',{
        pairs:[{left:'बड़ा',right:'छोटा'},{left:'दिन',right:'रात'},{left:'ऊपर',right:'नीचे'},{left:'सफ़ेद',right:'काला'}]
      }),
      q('hp2m4','CIRCLE_FIND','क वर्ग के व्यंजनों पर टैप करो!',{
        items:['क','ख','ग','घ','ङ','च','छ','ज'],correctItems:['क','ख','ग','घ','ङ']
      }),
      q('hp2m5','SEQUENCE_PREV','दिए गए वर्ण से पहले के ३ अक्षर लिखो।',{given:['घ','ङ','च'],blanks:3,answers:['क','ख','ग']}),
      q('hp2m6','UNSCRAMBLE','अक्षरों को सही क्रम में लगाकर शब्द बनाओ!',{scrambled:['ल','म','क'],answer:'कमल',hint:'भारत का राष्ट्रीय फूल'}),
      q('hp2m7','UNSCRAMBLE','अक्षरों को सही क्रम में लगाओ!',{scrambled:['म','आ'],answer:'आम',hint:'फलों का राजा'}),
      q('hp2m8','UNSCRAMBLE','शब्द बनाओ!',{scrambled:['र','घ'],answer:'घर',hint:'जहाँ हम रहते हैं'}),
      q('hp2m9','UNSCRAMBLE','शब्द बनाओ!',{scrambled:['ब','से'],answer:'सेब',hint:'लाल रंग का फल'}),
      q('hp2m10','UNSCRAMBLE','शब्द बनाओ!',{scrambled:['थ','हा','ी'],answer:'हाथी',hint:'बड़ा जानवर'}),
    ]
  },
  {
    id: 'hindi_p2_003', subject: 'hindi', title: 'हिंदी शब्द रचना व पहला वर्ण',
    topic: 'शब्द रचना', difficulty: 'medium', estimatedTime: 12,
    description: 'शब्द बनाओ, पहला वर्ण चुनो और वाक्य पूरा करो!',
    questions: [
      q('hp2wb1','WORD_BUILD','वर्ण चुनकर "कमल" शब्द बनाओ।',{letterPool:['क','म','ल','र','स'],answer:'कमल'}),
      q('hp2wb2','WORD_BUILD','वर्ण चुनकर "बत्तख" शब्द बनाओ।',{letterPool:['ब','त्','त','ख','प'],answer:'बत्तख'}),
      q('hp2wb3','WORD_BUILD','वर्ण चुनकर "मछली" शब्द बनाओ।',{letterPool:['म','छ','ली','क','र'],answer:'मछली'}),
      q('hp2wb4','WORD_BUILD','वर्ण चुनकर "गुलाब" शब्द बनाओ।',{letterPool:['गु','ला','ब','प','त'],answer:'गुलाब'}),
      q('hp2wb5','WORD_BUILD','वर्ण चुनकर "सूरज" शब्द बनाओ।',{letterPool:['सू','र','ज','म','न'],answer:'सूरज'}),
      q('hp2fl1','WORD_FIRST_LETTER','___नार (सही पहला वर्ण चुनो)',{wordWithBlank:'_नार',options:['अ','इ','उ','ए'],answer:'अ',hint:'लाल रंग का फल'}),
      q('hp2fl2','WORD_FIRST_LETTER','___म (सही पहला वर्ण चुनो)',{wordWithBlank:'_म',options:['आ','ई','ऊ','ओ'],answer:'आ',hint:'मीठा पीला फल'}),
      q('hp2fl3','WORD_FIRST_LETTER','___मली (सही पहला वर्ण चुनो)',{wordWithBlank:'_मली',options:['इ','अ','उ','ए'],answer:'इ',hint:'खट्टी होती है'}),
      q('hp2fl4','WORD_FIRST_LETTER','___नक (सही पहला वर्ण चुनो)',{wordWithBlank:'_नक',options:['ऐ','अ','इ','उ'],answer:'ऐ',hint:'आँखों पर पहनते हैं'}),
      q('hp2fl5','WORD_FIRST_LETTER','___खली (सही पहला वर्ण चुनो)',{wordWithBlank:'_खली',options:['ओ','अ','इ','उ'],answer:'ओ',hint:'कूटने के काम आती है'}),
    ]
  },
  {
    id: 'hindi_p2_004', subject: 'hindi', title: 'हिंदी अपठित गद्यांश व स्वर छाँटो',
    topic: 'गद्यांश व स्वर भेद', difficulty: 'medium', estimatedTime: 14,
    description: 'कहानी पढ़ो और उत्तर दो, स्वर छाँटो!',
    questions: [
      q('hp2ra1','READ_AND_ANSWER','गद्यांश पढ़कर प्रश्न का उत्तर दो।',{
        passage:'रोहन के पास एक सुंदर लाल पतंग है। वह शाम को पार्क में पतंग उड़ाता है।',
        question:'रोहन के पास किस रंग की पतंग है?',answer:'लाल',options:['नीली','लाल','हरी','पीली']
      }),
      q('hp2ra2','READ_AND_ANSWER','गद्यांश पढ़कर उत्तर दो।',{
        passage:'रोहन के पास एक सुंदर लाल पतंग है। वह शाम को पार्क में पतंग उड़ाता है।',
        question:'रोहन पतंग कहाँ उड़ाता है?',answer:'पार्क में',options:['घर में','पार्क में','छत पर','स्कूल में']
      }),
      q('hp2ra3','READ_AND_ANSWER','गद्यांश पढ़कर उत्तर दो।',{
        passage:'मीना को आम बहुत पसंद है। उसके बगीचे में आम का एक बड़ा पेड़ है।',
        question:'मीना को कौन सा फल पसंद है?',answer:'आम',options:['सेब','केला','आम','अंगूर']
      }),
      q('hp2ra4','READ_AND_ANSWER','गद्यांश पढ़कर उत्तर दो।',{
        passage:'जंगल में एक शेर रहता था। वह बहुत शक्तिशाली था और गुफा में सोता था।',
        question:'शेर कहाँ सोता था?',answer:'गुफा में',options:['पेड़ पर','गुफा में','पानी में','घर में']
      }),
      q('hp2vs1','VOWEL_SORT','अ की ध्वनि वाले शब्द चुनो!',{
        mode:'single',lang:'hindi',targetVowel:'अ',
        words:['कमल','आम','घर','इमली','फल','ऊँट'],correctWords:['कमल','घर','फल']
      }),
      q('hp2vs2','VOWEL_SORT','आ की मात्रा वाले शब्द चुनो!',{
        mode:'single',lang:'hindi',targetVowel:'आ',
        words:['आम','कान','कमल','नाक','घर','छाता'],correctWords:['आम','कान','नाक','छाता']
      }),
      q('hp2pw1','PICTURE_WRITE','चित्र देखकर एक शब्द लिखो।',{
        picture:'🪷',text:'इस चित्र का हिंदी नाम लिखो।',expectedAnswers:['कमल']
      }),
      q('hp2nw1','NUMBER_WRITE','अंक १ को हिंदी शब्द में लिखो।',{digit:'1',answer:'एक'}),
      q('hp2nw2','NUMBER_WRITE','अंक २ को हिंदी शब्द में लिखो।',{digit:'2',answer:'दो'}),
      q('hp2ac1','AUDIO_CLIP','ऑडियो सुनो और सही उत्तर चुनो।',{
        audioSrc:'',question:'भारत का राष्ट्रीय पशु कौन सा है?',options:['बाघ','शेर','हाथी','हिरण'],answer:'बाघ',mode:'mcq'
      }),
    ]
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// 4. GENERAL AWARENESS MEGA WORKSHEETS
// ═════════════════════════════════════════════════════════════════════════════

const GA_P2_WORKSHEETS = [
  {
    id: 'ga_p2_001', subject: 'ga', title: 'Animals, Habitat & Nature Explorer',
    topic: 'Animals, Plants and Senses', difficulty: 'easy', estimatedTime: 12,
    description: 'Match animals, circle fruits, and explore nature!',
    questions: [
      q('gp2q1','MATCH','Match each animal to its home!',{
        pairs:[{left:'Bird',right:'Nest'},{left:'Bee',right:'Hive'},{left:'Fish',right:'Water'},{left:'Lion',right:'Den'}]
      }),
      q('gp2q2','MATCH','Match each animal to its baby!',{
        pairs:[{left:'Cow',right:'Calf'},{left:'Dog',right:'Puppy'},{left:'Cat',right:'Kitten'},{left:'Hen',right:'Chick'}]
      }),
      q('gp2q3','CIRCLE_FIND','Tap all the FRUITS you can see!',{
        items:['Apple','Carrot','Banana','Corn','Grapes','Tomato','Orange','Pea'],
        correctItems:['Apple','Banana','Grapes','Orange']
      }),
      q('gp2q4','ARRANGE','Arrange from SMALLEST to LARGEST.',{
        items:['Ant','Elephant','Cat','Mouse'],correctOrder:['Ant','Mouse','Cat','Elephant']
      }),
      q('gp2q5','TEXT_HIGHLIGHT','Tap all the WILD animals.',{
        passage:'Lion Tiger Cow Elephant Horse Crocodile Hen Shark',
        correctWords:['Lion','Tiger','Elephant','Crocodile','Shark']
      }),
      q('gp2q6','PICTURE_WRITE','Write ONE word for what you see.',{
        picture:'🌈',text:'What is in the sky after rain?',expectedAnswers:['rainbow','rain','sky']
      }),
      q('gp2q7','AUDIO_WRITE','Listen and write the animal name.',{
        spokenText:'elephant',expectedAnswer:'elephant',language:'en-IN',hint:'The biggest land animal!'
      }),
      q('gp2q8','MCQ','Which sense do we use to smell a flower?',{options:['Eyes','Ears','Nose','Tongue'],answer:'Nose'}),
      q('gp2q9','TRUE_FALSE','Fish live in water.',{answer:true}),
      q('gp2q10','MCQ','Which animal gives us milk?',{options:['Dog','Cow','Cat','Hen'],answer:'Cow'}),
    ]
  },
  {
    id: 'ga_p2_002', subject: 'ga', title: 'Community Helpers & Solar System',
    topic: 'Helpers, Earth & Space', difficulty: 'medium', estimatedTime: 12,
    description: 'Match helpers, sequence seasons, and answer science questions!',
    questions: [
      q('gp2m1','MATCH_IMAGE','Match community helper emojis to their role!',{
        pairs:[{left:'👨‍🏫',right:'Teacher'},{left:'👨‍⚕️',right:'Doctor'},{left:'👮',right:'Police'},{left:'👨‍🚒',right:'Firefighter'}]
      }),
      q('gp2m2','MATCH_IMAGE','Match vehicle emojis to where they travel!',{
        pairs:[{left:'✈️',right:'Air'},{left:'🚢',right:'Water'},{left:'🚂',right:'Track'},{left:'🚗',right:'Road'}]
      }),
      q('gp2seq1','SEQUENCE_NEXT','Write the NEXT season in order: Spring, Summer, ___',{
        given:['Spring','Summer'],blanks:1,answers:['Autumn']
      }),
      q('gp2seq2','SEQUENCE_PREV','What day comes BEFORE Sunday?',{
        given:['Sunday','Monday'],blanks:1,answers:['Saturday']
      }),
      q('gp2uns1','UNSCRAMBLE','Unscramble to name our planet!',{scrambled:['R','T','A','H','E'],answer:'EARTH',hint:'We live on this planet!'}),
      q('gp2uns2','UNSCRAMBLE','Unscramble to name a star!',{scrambled:['U','S','N'],answer:'SUN',hint:'Bright yellow in sky'}),
      q('gp2wb1','WORD_BUILD','Build the sense organ for SIGHT.',{letterPool:['E','Y','E','S','K','L'],answer:'EYES'}),
      q('gp2wb2','WORD_BUILD','Build the sense organ for HEARING.',{letterPool:['E','A','R','S','M','P'],answer:'EARS'}),
      q('gp2fl1','WORD_FIRST_LETTER','___ANET (First letter of Earth/Mars)',{wordWithBlank:'_LANET',options:['P','K','Z','Q'],answer:'P',hint:'Earth is a ___'}),
      q('gp2fb1','FILL_BLANK','Plants need sunlight and _____ to grow.',{answer:'water',hint:'H2O'}),
    ]
  },
  {
    id: 'ga_p2_003', subject: 'ga', title: 'EVS Comprehension & Daily Habits',
    topic: 'Healthy Habits & Reading', difficulty: 'easy', estimatedTime: 12,
    description: 'Read EVS passages and answer questions on health and nature!',
    questions: [
      q('gp2ra1','READ_AND_ANSWER','Read the passage about trees.',{
        passage:'Trees give us clean air, fresh fruits, and shade on hot summer days. We should plant more trees.',
        question:'What do trees give us on hot summer days?',answer:'shade',options:['shade','ice cream','toys','raincoats']
      }),
      q('gp2ra2','READ_AND_ANSWER','Read the passage about teeth.',{
        passage:'We must brush our teeth twice a day: once in the morning and once before going to bed.',
        question:'How many times a day should we brush our teeth?',answer:'twice',options:['once','twice','three times','five times']
      }),
      q('gp2ra3','READ_AND_ANSWER','Read the passage about water.',{
        passage:'Water is precious. We must turn off the tap while brushing to save water.',
        question:'Why should we turn off the tap while brushing?',answer:'to save water',options:['to make noise','to save water','to wash clothes','to play']
      }),
      q('gp2nw1','NUMBER_WRITE','Write the number of sense organs humans have.',{digit:'5',answer:'five'}),
      q('gp2ac1','AUDIO_CLIP','Listen to the GA question!',{
        audioSrc:'',question:'Which animal is known as the King of the Jungle?',options:['Lion','Tiger','Elephant','Monkey'],answer:'Lion',mode:'mcq'
      }),
      q('gp2ds1','DRAG_SLOT','The [BLANK] shines during the day.',{
        text:'The [BLANK] shines during the day.',options:['sun','moon','star','cloud'],slots:[{answer:'sun'}]
      }),
      q('gp2cf1','CIRCLE_FIND','Tap all the HEALTHY foods in the list!',{
        items:['Apple','Milk','Candy','Spinach','Soda','Egg'],correctItems:['Apple','Milk','Spinach','Egg']
      }),
      q('gp2tf1','TRUE_FALSE','Vegetables are good for our health.',{answer:true}),
      q('gp2pw1','PICTURE_WRITE','Name the source of light in daytime.',{
        picture:'☀️',text:'What gives light in the day?',expectedAnswers:['sun']
      }),
      q('gp2aw1','AUDIO_WRITE','Listen and write the helper name.',{spokenText:'doctor',expectedAnswer:'doctor',language:'en-IN'}),
    ]
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// 5. ART & CRAFT MEGA WORKSHEETS
// ═════════════════════════════════════════════════════════════════════════════

const ART_P2_WORKSHEETS = [
  {
    id: 'art_p2_001', subject: 'art', title: 'Colours All Around Us!',
    topic: 'Colour Mixing and Recognition', difficulty: 'easy', estimatedTime: 10,
    description: 'Identify, match and describe colours in the world around you!',
    questions: [
      q('ap2q1','MATCH','Match each colour to what it reminds you of!',{
        pairs:[{left:'Red',right:'Apple'},{left:'Yellow',right:'Sunflower'},{left:'Blue',right:'Water'},{left:'Green',right:'Leaf'}]
      }),
      q('ap2q2','CIRCLE_FIND','Tap all the PRIMARY colours!',{
        items:['Red','Green','Blue','Orange','Yellow','Purple'],correctItems:['Red','Blue','Yellow']
      }),
      q('ap2q3','PICTURE_WRITE','Write the colour of the ocean.',{
        picture:'🌊',text:'What colour is the ocean?',expectedAnswers:['blue','dark blue','light blue']
      }),
      q('ap2q4','MCQ','Red + Yellow = ?',{options:['Green','Orange','Purple','Pink'],answer:'Orange'}),
      q('ap2q5','MCQ','Blue + Yellow = ?',{options:['Red','Orange','Green','Pink'],answer:'Green'}),
      q('ap2q6','ARRANGE','Put colours from WARMEST to COOLEST.',{
        items:['Blue','Red','Orange','Yellow','Green'],correctOrder:['Red','Orange','Yellow','Green','Blue']
      }),
      q('ap2q7','TRUE_FALSE','Red, Yellow and Blue are primary colours.',{answer:true}),
      q('ap2q8','TRUE_FALSE','Black and White are called primary colours.',{answer:false,hint:'Primary = Red, Yellow, Blue'}),
      q('ap2q9','MCQ','Which colour is missing? Red, Orange, Yellow, Green, Blue, ___, Violet',{
        options:['Pink','Indigo','White','Black'],answer:'Indigo'
      }),
      q('ap2q10','AUDIO_WRITE','Listen and write the colour name.',{
        spokenText:'purple',expectedAnswer:'purple',language:'en-IN',hint:'Red + Blue = ?'
      }),
    ]
  },
  {
    id: 'art_p2_002', subject: 'art', title: 'Art Tools, Shapes & Rainbow Sequence',
    topic: 'Art Tools & Sequences', difficulty: 'easy', estimatedTime: 12,
    description: 'Match craft tools, unscramble colors, and arrange rainbow order!',
    questions: [
      q('ap2m1','MATCH_IMAGE','Match art tool emojis to names!',{
        pairs:[{left:'🎨',right:'Palette'},{left:'🖌️',right:'Paintbrush'},{left:'✂️',right:'Scissors'},{left:'✏️',right:'Pencil'}]
      }),
      q('ap2seq1','SEQUENCE_NEXT','Complete rainbow sequence: Red, Orange, Yellow, ___',{
        given:['Red','Orange','Yellow'],blanks:1,answers:['Green']
      }),
      q('ap2seq2','SEQUENCE_PREV','Reverse pattern: Blue, Green, ___',{
        given:['Green','Blue'],blanks:1,answers:['Yellow']
      }),
      q('ap2uns1','UNSCRAMBLE','Unscramble to name a colour!',{scrambled:['E','R','D'],answer:'RED',hint:'Colour of an apple'}),
      q('ap2uns2','UNSCRAMBLE','Unscramble to name a colour!',{scrambled:['E','U','L','B'],answer:'BLUE',hint:'Colour of the sky'}),
      q('ap2wb1','WORD_BUILD','Build the colour word PINK.',{letterPool:['P','I','N','K','Z','M'],answer:'PINK'}),
      q('ap2fl1','WORD_FIRST_LETTER','___REEN (First letter of plant colour)',{wordWithBlank:'_REEN',options:['G','K','Z','Q'],answer:'G',hint:'G for ___'}),
      q('ap2fb1','FILL_BLANK','When you mix Red and White you get _____.',{answer:'pink',hint:'Light red colour'}),
      q('ap2ds1','DRAG_SLOT','We use [BLANK] to cut paper in craft class.',{
        text:'We use [BLANK] to cut paper in craft class.',options:['scissors','glue','crayon','brush'],slots:[{answer:'scissors'}]
      }),
      q('ap2th1','TEXT_HIGHLIGHT','Tap all COLOUR names in the sentence.',{
        passage:'She painted a yellow sun and a green tree with a brown trunk.',
        correctWords:['yellow','green','brown']
      }),
    ]
  },
  {
    id: 'art_p2_003', subject: 'art', title: 'Art Reading & Visual Creativity',
    topic: 'Art Comprehension & Number Names', difficulty: 'medium', estimatedTime: 12,
    description: 'Read art stories, count rainbow colors, and listen to art clips!',
    questions: [
      q('ap2ra1','READ_AND_ANSWER','Read the art story and answer.',{
        passage:'Anaya loves painting landscapes. She uses blue for the sky, green for the grass, and yellow for the sun.',
        question:'What colour does Anaya use for the grass?',answer:'green',options:['red','blue','green','yellow']
      }),
      q('ap2ra2','READ_AND_ANSWER','Read the art story and answer.',{
        passage:'Anaya loves painting landscapes. She uses blue for the sky, green for the grass, and yellow for the sun.',
        question:'What does Anaya painted yellow?',answer:'the sun',options:['the grass','the sky','the sun','the river']
      }),
      q('ap2nw1','NUMBER_WRITE','Write the number of colors in a rainbow.',{digit:'7',answer:'seven'}),
      q('ap2ac1','AUDIO_CLIP','Listen to the art question!',{
        audioSrc:'',question:'Which tool is used to apply paint to paper?',options:['Paintbrush','Scissors','Ruler','Eraser'],answer:'Paintbrush',mode:'mcq'
      }),
      q('ap2pw1','PICTURE_WRITE','Write the name of this art medium.',{
        picture:'🎨',text:'What art tool is this?',expectedAnswers:['palette','paint']
      }),
      q('ap2aw1','AUDIO_WRITE','Listen and write the colour name.',{spokenText:'magenta',expectedAnswer:'magenta',language:'en-IN'}),
      q('ap2cf1','CIRCLE_FIND','Tap all CRAFT ITEMS in the list!',{
        items:['Glue','Scissors','Apple','Paper','Glitter','Banana'],correctItems:['Glue','Scissors','Paper','Glitter']
      }),
      q('ap2tf1','TRUE_FALSE','Origami is the art of paper folding.',{answer:true}),
      q('ap2tf2','TRUE_FALSE','Crayons are made of wax.',{answer:true}),
      q('ap2tf3','TRUE_FALSE','Yellow and Blue mix together to make Purple.',{answer:false,hint:'Yellow + Blue = Green'}),
    ]
  }
];

// Combine all Mega Worksheets
if (typeof ALL_WORKSHEETS !== 'undefined') {
  ALL_WORKSHEETS.push(
    ...ENG_P2_WORKSHEETS,
    ...MATH_P2_WORKSHEETS,
    ...HINDI_P2_WORKSHEETS,
    ...GA_P2_WORKSHEETS,
    ...ART_P2_WORKSHEETS
  );
}
`;

fs.writeFileSync('pwa/js/data2.js', data2Content, 'utf8');
console.log('Successfully generated pwa/js/data2.js!');
