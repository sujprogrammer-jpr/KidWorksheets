/* eslint-disable */
// KidWorksheets PWA - Comprehensive Mega Syllabus Worksheets
// UKG / Class 1 Syllabus - Full Coverage of All 21 Question Types
'use strict';

// Helper q function fallback if data.js wasn't executed first
if (typeof q === 'undefined') {
  function q(id, type, text, opts) {
    return { id, type, text, ...opts, marks: (opts && opts.marks) || 1 };
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// 1. ENGLISH MEGA WORKSHEETS (ALL QUESTION TYPES COVERED)
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
        question:'What is the name of Sam puppy?',answer:'Max',options:['Max','Sam','Spot','Bruno']
      }),
      q('ep2e4q2','READ_AND_ANSWER','Read the passage and answer.',{
        passage:'Sam has a little brown puppy named Max. Max loves to play with a red ball in the garden.',
        question:'What colour is Max ball?',answer:'red',options:['red','blue','green','yellow']
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
        passage:'Mia bakes delicious chocolate cupcakes for her brother party.',
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
// 2. MATHEMATICS MEGA WORKSHEETS (ALL QUESTION TYPES COVERED)
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
// 3. HINDI MEGA WORKSHEETS (हिंदी - ALL QUESTION TYPES COVERED)
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
      q('hp2q4','ARRANGE','इन अक्षरों को वर्णमाला क्रम में लगाओ।',{items:['घ','क','ग','ख','ङ'],correctOrder:['क','ख','ग','घ','ङ']}),
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
        pairs:[{left:'🥭',right:'आम'},{left:'🍎',right:'सेब'},{left:'🪷',right:'कमल'},{left:'🐘',right:'हाथी'}]
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
// 4. GENERAL AWARENESS MEGA WORKSHEETS (ALL QUESTION TYPES COVERED)
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
// 5. ART & CRAFT MEGA WORKSHEETS (ALL QUESTION TYPES COVERED)
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


// ═════════════════════════════════════════════════════════════════════════════
// EXTRA MEGA WORKSHEETS FOR 100% COVERAGE (≥10 QUESTIONS PER TYPE PER SUBJECT)
// ═════════════════════════════════════════════════════════════════════════════

const EXTRA_ENG_WORKSHEETS = [
  {
    id: 'eng_p2_009', subject: 'english', title: 'English Matching & Visual Sequences',
    topic: 'Matching & Sequencing', difficulty: 'easy', estimatedTime: 12,
    description: 'Match images, sequence letters, and circle vowels.',
    questions: [
      q('ex_e_m1','MATCH','Match uppercase to lowercase letters.',{
        pairs:[{left:'A',right:'a'},{left:'B',right:'b'},{left:'C',right:'c'},{left:'D',right:'d'}]
      }),
      q('ex_e_m2','MATCH','Match rhyming word pairs.',{
        pairs:[{left:'fan',right:'man'},{left:'box',right:'fox'},{left:'bed',right:'red'},{left:'zip',right:'lip'}]
      }),
      q('ex_e_mi1','MATCH_IMAGE','Match animal emojis to their sound!',{
        pairs:[{left:'🐶',right:'Woof'},{left:'🐱',right:'Meow'},{left:'🐮',right:'Moo'},{left:'🦆',right:'Quack'}]
      }),
      q('ex_e_mi2','MATCH_IMAGE','Match fruit emojis to names!',{
        pairs:[{left:'🍌',right:'Banana'},{left:'🍇',right:'Grapes'},{left:'🍓',right:'Strawberry'},{left:'🍊',right:'Orange'}]
      }),
      q('ex_e_mi3','MATCH_IMAGE','Match vehicle emojis to names!',{
        pairs:[{left:'✈️',right:'Airplane'},{left:'⛵',right:'Boat'},{left:'🚂',right:'Train'},{left:'🚲',right:'Bicycle'}]
      }),
      q('ex_e_cf1','CIRCLE_FIND','Tap all CONSONANTS in the grid!',{
        items:['A','B','C','E','F','I','G','O','H'],correctItems:['B','C','F','G','H']
      }),
      q('ex_e_cf2','CIRCLE_FIND','Tap all WORDS THAT RHYME WITH CAT!',{
        items:['bat','hat','dog','mat','sun','rat','pen','fat'],correctItems:['bat','hat','mat','rat','fat']
      }),
      q('ex_e_arr1','ARRANGE','Put these words in alphabetical order.',{
        items:['Zebra','Apple','Cat','Monkey'],correctOrder:['Apple','Cat','Monkey','Zebra']
      }),
      q('ex_e_arr2','ARRANGE','Arrange steps of reading a book.',{
        items:['Open book','Turn page','Read words','Close book'],correctOrder:['Open book','Read words','Turn page','Close book']
      }),
      q('ex_e_arr3','ARRANGE','Arrange letters in correct order.',{
        items:['K','H','I','J'],correctOrder:['H','I','J','K']
      }),
    ]
  },
  {
    id: 'eng_p2_010', subject: 'english', title: 'English Sequences & Word Building',
    topic: 'Alphabet & Words', difficulty: 'medium', estimatedTime: 12,
    description: 'Alphabet sequences, unscramble, word building, and dictation.',
    questions: [
      q('ex_e_sn1','SEQUENCE_NEXT','Write the NEXT 3 letters.',{given:['J','K','L'],blanks:3,answers:['M','N','O']}),
      q('ex_e_sn2','SEQUENCE_NEXT','Write the NEXT 3 letters.',{given:['S','T','U'],blanks:3,answers:['V','W','X']}),
      q('ex_e_sp1','SEQUENCE_PREV','Write 3 letters BEFORE M.',{given:['M','N','O'],blanks:3,answers:['J','K','L']}),
      q('ex_e_sp2','SEQUENCE_PREV','Write 3 letters BEFORE S.',{given:['S','T','U'],blanks:3,answers:['P','Q','R']}),
      q('ex_e_uns1','UNSCRAMBLE','Unscramble to name a bird!',{scrambled:['U','C','D','K'],answer:'DUCK',hint:'Quack quack!'}),
      q('ex_e_uns2','UNSCRAMBLE','Unscramble to name a fruit!',{scrambled:['E','M','L','O','N'],answer:'MELON',hint:'Juicy summer fruit'}),
      q('ex_e_wb1','WORD_BUILD','Build the word TIGER.',{letterPool:['T','I','G','E','R','S'],answer:'TIGER'}),
      q('ex_e_wb2','WORD_BUILD','Build the word MONKEY.',{letterPool:['M','O','N','K','E','Y','Z'],answer:'MONKEY'}),
      q('ex_e_fl1','WORD_FIRST_LETTER','___ION (First letter of King of Jungle)',{wordWithBlank:'_ION',options:['L','M','Z','K'],answer:'L',hint:'L for ___'}),
      q('ex_e_th1','TEXT_HIGHLIGHT','Tap all SHORT I words in the sentence!',{
        passage:'Tim hid a big pin in a tin bin near the hill.',
        correctWords:['Tim','hid','big','pin','tin','bin']
      }),
    ]
  },
  {
    id: 'eng_p2_011', subject: 'english', title: 'English Pictures, Audio & Groups of 10',
    topic: 'Visual & Audio Skills', difficulty: 'medium', estimatedTime: 12,
    description: 'Picture writing, audio dictation, vowel sort, and 10-counting.',
    questions: [
      q('ex_e_pw1','PICTURE_WRITE','Write ONE word for this picture.',{picture:'🐘',text:'What animal is this?',expectedAnswers:['elephant']}),
      q('ex_e_pw2','PICTURE_WRITE','Write ONE word for this picture.',{picture:'🦁',text:'What animal is this?',expectedAnswers:['lion']}),
      q('ex_e_pw3','PICTURE_WRITE','Write ONE word for this picture.',{picture:'🍕',text:'What food is this?',expectedAnswers:['pizza']}),
      q('ex_e_pw4','PICTURE_WRITE','Write ONE word for this picture.',{picture:'🎸',text:'What instrument is this?',expectedAnswers:['guitar']}),
      q('ex_e_aw1','AUDIO_WRITE','Listen and write the word.',{spokenText:'beautiful',expectedAnswer:'beautiful',language:'en-IN'}),
      q('ex_e_aw2','AUDIO_WRITE','Listen and write the word.',{spokenText:'starfish',expectedAnswer:'starfish',language:'en-IN'}),
      q('ex_e_nw1','NUMBER_WRITE','Write English word for 6.',{digit:'6',answer:'six'}),
      q('ex_e_got1','GROUPS_OF_TENS','Count total letters in 2 groups of 10 vowels.',{tensCount:2,unitsCount:5,question:'What is 2 tens + 5 units?',answer:'25'}),
      q('ex_e_vs1','VOWEL_SORT','Tap all SHORT O words!',{mode:'single',lang:'english',targetVowel:'O',words:['top','cat','hop','mop','leg','pop'],correctWords:['top','hop','mop','pop']}),
      q('ex_e_vs2','VOWEL_SORT','Tap all SHORT U words!',{mode:'single',lang:'english',targetVowel:'U',words:['tub','rub','bed','sub','cub','pig'],correctWords:['tub','rub','sub','cub']}),
    ]
  }
];

const EXTRA_MATH_WORKSHEETS = [
  {
    id: 'math_p2_007', subject: 'maths', title: 'Math Matching & Circle Grid',
    topic: 'Matching & Number Search', difficulty: 'easy', estimatedTime: 12,
    description: 'Match number pairs, shape emojis, and circle target numbers!',
    questions: [
      q('ex_m_m1','MATCH','Match numbers to their word names!',{
        pairs:[{left:'1',right:'One'},{left:'2',right:'Two'},{left:'3',right:'Three'},{left:'4',right:'Four'}]
      }),
      q('ex_m_m2','MATCH','Match double addition pairs!',{
        pairs:[{left:'1 + 1',right:'2'},{left:'2 + 2',right:'4'},{left:'3 + 3',right:'6'},{left:'4 + 4',right:'8'}]
      }),
      q('ex_m_m3','MATCH','Match numbers to 10-complements!',{
        pairs:[{left:'1 + 9',right:'10'},{left:'2 + 8',right:'10'},{left:'3 + 7',right:'10'},{left:'4 + 6',right:'10'}]
      }),
      q('ex_m_mi1','MATCH_IMAGE','Match coin emojis to value!',{
        pairs:[{left:'🪙 1',right:'1 Rupee'},{left:'🪙 2',right:'2 Rupees'},{left:'🪙 5',right:'5 Rupees'},{left:'🪙 10',right:'10 Rupees'}]
      }),
      q('ex_m_mi2','MATCH_IMAGE','Match block emojis to count!',{
        pairs:[{left:'🟦',right:'1'},{left:'🟦🟦',right:'2'},{left:'🟦🟦🟦',right:'3'},{left:'🟦🟦🟦🟦',right:'4'}]
      }),
      q('ex_m_cf1','CIRCLE_FIND','Tap all ODD numbers in the grid!',{
        items:['1','4','7','10','13','16','19','22'],correctItems:['1','7','13','19']
      }),
      q('ex_m_cf2','CIRCLE_FIND','Tap all numbers GREATER THAN 20!',{
        items:['15','22','18','29','12','35','8','40'],correctItems:['22','29','35','40']
      }),
      q('ex_m_ds1','DRAG_SLOT','10 + 5 = [BLANK]',{text:'10 + 5 = [BLANK]',options:['15','12','10','20'],slots:[{answer:'15'}]}),
      q('ex_m_ds2','DRAG_SLOT','20 - 4 = [BLANK]',{text:'20 - 4 = [BLANK]',options:['16','14','18','12'],slots:[{answer:'16'}]}),
      q('ex_m_ds3','DRAG_SLOT','Half of 10 is [BLANK].',{text:'Half of 10 is [BLANK].',options:['5','4','6','2'],slots:[{answer:'5'}]}),
    ]
  },
  {
    id: 'math_p2_008', subject: 'maths', title: 'Math Sequences & Word Building',
    topic: 'Patterns & Number Words', difficulty: 'medium', estimatedTime: 12,
    description: 'Ascending order, skip counting, and number word building.',
    questions: [
      q('ex_m_arr1','ARRANGE','Put numbers in order from smallest to largest.',{items:['88','12','45','3','99'],correctOrder:['3','12','45','88','99']}),
      q('ex_m_arr2','ARRANGE','Put numbers in order from largest to smallest.',{items:['5','50','25','100','75'],correctOrder:['100','75','50','25','5']}),
      q('ex_m_sn1','SEQUENCE_NEXT','Skip count by 2s: 2, 4, 6, ___',{given:['2','4','6'],blanks:3,answers:['8','10','12']}),
      q('ex_m_sn2','SEQUENCE_NEXT','Skip count by 10s: 10, 20, 30, ___',{given:['10','20','30'],blanks:3,answers:['40','50','60']}),
      q('ex_m_sp1','SEQUENCE_PREV','Count backwards: 10, 9, 8, ___',{given:['8','9','10'],blanks:3,answers:['5','6','7']}),
      q('ex_m_sp2','SEQUENCE_PREV','Count backwards: 50, 40, 30, ___',{given:['30','40','50'],blanks:3,answers:['0','10','20']}),
      q('ex_m_uns1','UNSCRAMBLE','Unscramble number word for 6!',{scrambled:['X','I','S'],answer:'SIX',hint:'6'}),
      q('ex_m_uns2','UNSCRAMBLE','Unscramble number word for 7!',{scrambled:['N','E','V','E','S'],answer:'SEVEN',hint:'7'}),
      q('ex_m_wb1','WORD_BUILD','Build the number word NINE.',{letterPool:['N','I','N','E','X','K'],answer:'NINE'}),
      q('ex_m_fl1','WORD_FIRST_LETTER','___SIX (First letter of digit 6)',{wordWithBlank:'_IX',options:['S','M','K','Z'],answer:'S',hint:'6'}),
    ]
  },
  {
    id: 'math_p2_009', subject: 'maths', title: 'Math Visuals, Stories & Audio',
    topic: 'Story Math & Audio Skills', difficulty: 'medium', estimatedTime: 12,
    description: 'Story word problems, picture counting, dictation, and audio clips.',
    questions: [
      q('ex_m_th1','TEXT_HIGHLIGHT','Tap all MULTIPLES OF 10 in the story.',{passage:'Look at 10 25 30 42 50 67 70.',correctWords:['10','30','50','70']}),
      q('ex_m_pw1','PICTURE_WRITE','Write digit for total count of stars.',{picture:'⭐⭐⭐⭐⭐⭐',text:'Count the stars.',expectedAnswers:['6']}),
      q('ex_m_pw2','PICTURE_WRITE','Write digit for total count of apples.',{picture:'🍎🍎🍎🍎',text:'Count the apples.',expectedAnswers:['4']}),
      q('ex_m_aw1','AUDIO_WRITE','Listen and write digit.',{spokenText:'eighty eight',expectedAnswer:'88',language:'en-IN'}),
      q('ex_m_aw2','AUDIO_WRITE','Listen and write digit.',{spokenText:'thirty three',expectedAnswer:'33',language:'en-IN'}),
      q('ex_m_nw1','NUMBER_WRITE','Write number word for 11.',{digit:'11',answer:'eleven'}),
      q('ex_m_nw2','NUMBER_WRITE','Write number word for 12.',{digit:'12',answer:'twelve'}),
      q('ex_m_got1','GROUPS_OF_TENS','Count 8 tens and 4 units.',{tensCount:8,unitsCount:4,question:'What number is 8 tens + 4 units?',answer:'84'}),
      q('ex_m_ra1','READ_AND_ANSWER','Solve math word problem.',{passage:'A hen laid 4 eggs on Monday and 4 eggs on Tuesday.',question:'How many eggs in total?',answer:'8',options:['6','7','8','9']}),
      q('ex_m_ac1','AUDIO_CLIP','Listen and pick answer!',{audioSrc:'',question:'What is 10 + 10?',options:['15','20','25','30'],answer:'20',mode:'mcq'}),
    ]
  }
];

const EXTRA_HINDI_WORKSHEETS = [
  {
    id: 'hindi_p2_005', subject: 'hindi', title: 'हिंदी मिलान व वर्णमाला ज्ञान',
    topic: 'मिलान व वर्ण अभ्यास', difficulty: 'easy', estimatedTime: 12,
    description: 'चित्र मिलान, विलोम शब्द, और वर्णमाला की गतिविधियाँ।',
    questions: [
      q('ex_h_m1','MATCH','वर्णों को उनके शब्दों से मिलाओ।',{pairs:[{left:'अ',right:'अनार'},{left:'इ',right:'इमली'},{left:'उ',right:'उल्लू'},{left:'ऋ',right:'ऋषि'}]}),
      q('ex_h_m2','MATCH','समान अर्थ वाले शब्द जोड़ो।',{pairs:[{left:'जल',right:'पानी'},{left:'सूर्य',right:'सूरज'},{left:'वृक्ष',right:'पेड़'},{left:'गृह',right:'घर'}]}),
      q('ex_h_mi1','MATCH_IMAGE','इमोजी चित्रों को उनके हिंदी नाम से मिलाओ!',{pairs:[{left:'☀️',right:'सूरज'},{left:'🌙',right:'चाँद'},{left:'🌧️',right:'बारिश'},{left:'🌺',right:'फूल'}]}),
      q('ex_h_mi2','MATCH_IMAGE','पक्षियों को उनके हिंदी नाम से मिलाओ!',{pairs:[{left:'🦜',right:'तोता'},{left:'🦚',right:'मोर'},{left:'🦅',right:'चील'},{left:'🕊️',right:'कबूतर'}]}),
      q('ex_h_cf1','CIRCLE_FIND','च वर्ग के व्यंजनों पर टैप करो!',{items:['च','छ','ज','झ','ञ','ट','ठ','ड'],correctItems:['च','छ','ज','झ','ञ']}),
      q('ex_h_cf2','CIRCLE_FIND','आ की मात्रा वाले शब्दों पर टैप करो!',{items:['आम','कमल','कान','घर','नाक','जल','छाता'],correctItems:['आम','कान','नाक','छाता']}),
      q('ex_h_ds1','DRAG_SLOT','भारत का राष्ट्रीय फूल [BLANK] है।',{text:'भारत का राष्ट्रीय फूल [BLANK] है।',options:['कमल','गुलाब','सूरजमुखी','चमेली'],slots:[{answer:'कमल'}]}),
      q('ex_h_ds2','DRAG_SLOT','सूरज [BLANK] में उगता है।',{text:'सूरज [BLANK] में उगता है।',options:['पूर्व','पश्चिम','उत्तर','दक्षिण'],slots:[{answer:'पूर्व'}]}),
      q('ex_h_arr1','ARRANGE','इन अक्षरों को वर्णमाला क्रम में लगाओ।',{items:['ङ','क','ग','ख','घ'],correctOrder:['क','ख','ग','घ','ङ']}),
      q('ex_h_arr2','ARRANGE','इन वर्णों को सही क्रम में लगाओ।',{items:['इ','अ','आ','ई'],correctOrder:['अ','आ','इ','ई']}),
    ]
  },
  {
    id: 'hindi_p2_006', subject: 'hindi', title: 'हिंदी अनुक्रम व शब्द निर्माण',
    topic: 'वर्ण अनुक्रम व शब्द रचना', difficulty: 'medium', estimatedTime: 12,
    description: 'वर्णमाला अनुक्रम, शब्द निर्माण और पहला वर्ण चुनो।',
    questions: [
      q('ex_h_sn1','SEQUENCE_NEXT','वर्णमाला के अगले ३ वर्ण लिखो: च, छ, ज, ___',{given:['च','छ','ज'],blanks:3,answers:['झ','ञ','ट']}),
      q('ex_h_sn2','SEQUENCE_NEXT','वर्णमाला के अगले ३ वर्ण लिखो: त, थ, द, ___',{given:['त','थ','द'],blanks:3,answers:['ध','न','प']}),
      q('ex_h_sp1','SEQUENCE_PREV','दिए गए वर्ण से पहले के ३ वर्ण लिखो: घ, ङ, च',{given:['घ','ङ','च'],blanks:3,answers:['क','ख','ग']}),
      q('ex_h_sp2','SEQUENCE_PREV','दिए गए वर्ण से पहले के ३ वर्ण लिखो: झ, ञ, ट',{given:['झ','ञ','ट'],blanks:3,answers:['च','छ','ज']}),
      q('ex_h_uns1','UNSCRAMBLE','अक्षरों को सही क्रम में लगाओ!',{scrambled:['र','श','ज','बा'],answer:'बाजार',hint:'जहाँ से सामान खरीदते हैं'}),
      q('ex_h_wb1','WORD_BUILD','वर्ण चुनकर "किताब" शब्द बनाओ।',{letterPool:['कि','ता','ब','म','र'],answer:'किताब'}),
      q('ex_h_wb2','WORD_BUILD','वर्ण चुनकर "बगीचा" शब्द बनाओ।',{letterPool:['ब','गी','चा','स','न'],answer:'बगीचा'}),
      q('ex_h_fl1','WORD_FIRST_LETTER','___तंग (पहला वर्ण चुनो)',{wordWithBlank:'_तंग',options:['प','क','म','र'],answer:'प',hint:'हवा में उड़ती है'}),
      q('ex_h_fl2','WORD_FIRST_LETTER','___तख (पहला वर्ण चुनो)',{wordWithBlank:'_तख',options:['ब','क','म','स'],answer:'ब',hint:'पानी में तैरती पक्षी'}),
      q('ex_h_th1','TEXT_HIGHLIGHT','सभी आ की मात्रा वाले शब्दों पर टैप करो!',{passage:'राधा का मामा आज लाल टमाटर लाया।',correctWords:['राधा','मामा','लाया']}),
    ]
  },
  {
    id: 'hindi_p2_007', subject: 'hindi', title: 'हिंदी पठन, चित्र व श्रुतलेख',
    topic: 'गद्यांश व श्रुतलेख', difficulty: 'medium', estimatedTime: 12,
    description: 'गद्यांश पठन, चित्र लेखन, श्रुतलेख और गिनती शब्द।',
    questions: [
      q('ex_h_pw1','PICTURE_WRITE','चित्र देखकर हिंदी नाम लिखो।',{picture:'🥭',text:'यह कौन सा फल है?',expectedAnswers:['आम']}),
      q('ex_h_pw2','PICTURE_WRITE','चित्र देखकर हिंदी नाम लिखो।',{picture:'🍎',text:'यह कौन सा फल है?',expectedAnswers:['सेब']}),
      q('ex_h_aw1','AUDIO_WRITE','सुनो और लिखो!',{spokenText:'भारत',expectedAnswer:'भारत',language:'hi-IN'}),
      q('ex_h_aw2','AUDIO_WRITE','सुनो और लिखो!',{spokenText:'नमस्ते',expectedAnswer:'नमस्ते',language:'hi-IN'}),
      q('ex_h_nw1','NUMBER_WRITE','अंक ३ को हिंदी शब्द में लिखो।',{digit:'3',answer:'तीन'}),
      q('ex_h_nw2','NUMBER_WRITE','अंक ४ को हिंदी शब्द में लिखो।',{digit:'4',answer:'चार'}),
      q('ex_h_ra1','READ_AND_ANSWER','गद्यांश पढ़कर उत्तर दो।',{passage:'अमन रोज़ सुबह दूध पीता है। दूध पीने से शरीर शक्तिशाली बनता है।',question:'अमन सुबह क्या पीता है?',answer:'दूध',options:['पानी','दूध','चाय','रस']}),
      q('ex_h_vs1','VOWEL_SORT','इ की मात्रा वाले शब्द चुनो!',{mode:'single',lang:'hindi',targetVowel:'इ',words:['दिन','किताब','आम','सिर','घर','पिन'],correctWords:['दिन','किताब','सिर','पिन']}),
      q('ex_h_ac1','AUDIO_CLIP','ऑडियो सुनो और उत्तर चुनो।',{audioSrc:'',question:'गाय हमें क्या देती है?',options:['दूध','अंडा','ऊनी कपडे','फल'],answer:'दूध',mode:'mcq'}),
      q('ex_h_fb1','FILL_BLANK','सूरज _____ दिशा में उगता है।',{answer:'पूर्व',hint:'East दिशा'}),
    ]
  }
];

const EXTRA_GA_WORKSHEETS = [
  {
    id: 'ga_p2_004', subject: 'ga', title: 'GA Nature, Seasons & Matching Master',
    topic: 'Nature & Seasons', difficulty: 'easy', estimatedTime: 12,
    description: 'Match habitats, circle healthy foods, and complete season sequences.',
    questions: [
      q('ex_g_m1','MATCH','Match body parts to their function!',{pairs:[{left:'Eyes',right:'See'},{left:'Ears',right:'Hear'},{left:'Nose',right:'Smell'},{left:'Tongue',right:'Taste'}]}),
      q('ex_g_m2','MATCH','Match food to its source!',{pairs:[{left:'Milk',right:'Cow'},{left:'Egg',right:'Hen'},{left:'Honey',right:'Bee'},{left:'Apple',right:'Tree'}]}),
      q('ex_g_mi1','MATCH_IMAGE','Match animal emojis to their baby names!',{pairs:[{left:'🐶',right:'Puppy'},{left:'🐱',right:'Kitten'},{left:'🐮',right:'Calf'},{left:'🐔',right:'Chick'}]}),
      q('ex_g_mi2','MATCH_IMAGE','Match weather emojis to names!',{pairs:[{left:'☀️',right:'Sunny'},{left:'🌧️',right:'Rainy'},{left:'❄️',right:'Snowy'},{left:'💨',right:'Windy'}]}),
      q('ex_g_cf1','CIRCLE_FIND','Tap all VEGETABLES in the list!',{items:['Potato','Apple','Carrot','Banana','Onion','Orange'],correctItems:['Potato','Carrot','Onion']}),
      q('ex_g_cf2','CIRCLE_FIND','Tap all DOMESTIC ANIMALS!',{items:['Dog','Lion','Cat','Tiger','Cow','Crocodile'],correctItems:['Dog','Cat','Cow']}),
      q('ex_g_ds1','DRAG_SLOT','We smell with our [BLANK].',{text:'We smell with our [BLANK].',options:['nose','eyes','ears','hands'],slots:[{answer:'nose'}]}),
      q('ex_g_ds2','DRAG_SLOT','The [BLANK] gives us wool.',{text:'The [BLANK] gives us wool.',options:['sheep','dog','cat','horse'],slots:[{answer:'sheep'}]}),
      q('ex_g_arr1','ARRANGE','Arrange plant growth stages in correct order.',{items:['Plant','Seed','Flower','Sprout'],correctOrder:['Seed','Sprout','Plant','Flower']}),
      q('ex_g_arr2','ARRANGE','Arrange meal times in order of day.',{items:['Dinner','Breakfast','Lunch'],correctOrder:['Breakfast','Lunch','Dinner']}),
    ]
  },
  {
    id: 'ga_p2_005', subject: 'ga', title: 'GA Sequences, Words & Highlighting',
    topic: 'Science & Environment', difficulty: 'medium', estimatedTime: 12,
    description: 'Day sequences, unscramble, word building, and text highlighting.',
    questions: [
      q('ex_g_sn1','SEQUENCE_NEXT','Days of week sequence: Monday, Tuesday, Wednesday, ___',{given:['Monday','Tuesday','Wednesday'],blanks:1,answers:['Thursday']}),
      q('ex_g_sn2','SEQUENCE_NEXT','Write the NEXT day: Friday, Saturday, ___',{given:['Friday','Saturday'],blanks:1,answers:['Sunday']}),
      q('ex_g_sp1','SEQUENCE_PREV','What comes BEFORE Wednesday?',{given:['Wednesday','Thursday'],blanks:1,answers:['Tuesday']}),
      q('ex_g_sp2','SEQUENCE_PREV','What month comes BEFORE February?',{given:['February','March'],blanks:1,answers:['January']}),
      q('ex_g_uns1','UNSCRAMBLE','Unscramble to name a body part!',{scrambled:['D','A','N','H'],answer:'HAND',hint:'Used for holding things'}),
      q('ex_g_uns2','UNSCRAMBLE','Unscramble to name a planet!',{scrambled:['S','R','A','M'],answer:'MARS',hint:'The Red Planet'}),
      q('ex_g_wb1','WORD_BUILD','Build the word TIGER.',{letterPool:['T','I','G','E','R','Z'],answer:'TIGER'}),
      q('ex_g_fl1','WORD_FIRST_LETTER','___ATER (Essential liquid for life)',{wordWithBlank:'_ATER',options:['W','K','Z','Q'],answer:'W',hint:'H2O'}),
      q('ex_g_th1','TEXT_HIGHLIGHT','Tap all SENSE ORGANS in the passage.',{passage:'Use your eyes ears nose and tongue to explore.',correctWords:['eyes','ears','nose','tongue']}),
      q('ex_g_fb1','FILL_BLANK','The earth revolves around the _____.',{answer:'sun',hint:'Solar system center'}),
    ]
  },
  {
    id: 'ga_p2_006', subject: 'ga', title: 'GA Pictures, Audio & Reading Comprehension',
    topic: 'EVS Comprehension & Media', difficulty: 'medium', estimatedTime: 12,
    description: 'Picture writing, audio dictation, number writing, and story comprehension.',
    questions: [
      q('ex_g_pw1','PICTURE_WRITE','Write name of this animal.',{picture:'🐘',text:'Name this animal.',expectedAnswers:['elephant']}),
      q('ex_g_pw2','PICTURE_WRITE','Write name of this fruit.',{picture:'🍎',text:'Name this fruit.',expectedAnswers:['apple']}),
      q('ex_g_aw1','AUDIO_WRITE','Listen and write helper name.',{spokenText:'firefighter',expectedAnswer:'firefighter',language:'en-IN'}),
      q('ex_g_aw2','AUDIO_WRITE','Listen and write planet name.',{spokenText:'jupiter',expectedAnswer:'jupiter',language:'en-IN'}),
      q('ex_g_nw1','NUMBER_WRITE','Write number of legs a spider has.',{digit:'8',answer:'eight'}),
      q('ex_g_nw2','NUMBER_WRITE','Write number of days in a week.',{digit:'7',answer:'seven'}),
      q('ex_g_ra1','READ_AND_ANSWER','Read the passage and answer.',{passage:'Honeybees collect nectar from colorful flowers to make sweet honey in their hives.',question:'Where do honeybees store honey?',answer:'hives',options:['in trees','hives','underground','in houses']}),
      q('ex_g_ac1','AUDIO_CLIP','Listen and answer GA question!',{audioSrc:'',question:'Which animal lays eggs?',options:['Hen','Cow','Dog','Cat'],answer:'Hen',mode:'mcq'}),
      q('ex_g_tf1','TRUE_FALSE','Trees give us oxygen to breathe.',{answer:true}),
      q('ex_g_tf2','TRUE_FALSE','Plastic decomposes very quickly in soil.',{answer:false,hint:'Plastic harms environment'}),
    ]
  }
];

const EXTRA_ART_WORKSHEETS = [
  {
    id: 'art_p2_004', subject: 'art', title: 'Art & Craft Complete Master',
    topic: 'Colors, Craft & Creativity', difficulty: 'easy', estimatedTime: 12,
    description: 'Comprehensive Art & Craft activities covering all question types.',
    questions: [
      q('ex_a_m1','MATCH','Match colors to objects!',{pairs:[{left:'Red',right:'Apple'},{left:'Yellow',right:'Banana'},{left:'Green',right:'Grass'},{left:'Blue',right:'Sky'}]}),
      q('ex_a_m2','MATCH','Match art tools to their uses!',{pairs:[{left:'Brush',right:'Paint'},{left:'Scissors',right:'Cut'},{left:'Glue',right:'Stick'},{left:'Pencil',right:'Draw'}]}),
      q('ex_a_mi1','MATCH_IMAGE','Match color emojis to names!',{pairs:[{left:'🔴',right:'Red'},{left:'🟦',right:'Blue'},{left:'🟨',right:'Yellow'},{left:'🟩',right:'Green'}]}),
      q('ex_a_cf1','CIRCLE_FIND','Tap all SECONDARY colors in the list!',{items:['Orange','Red','Green','Purple','Blue','Yellow'],correctItems:['Orange','Green','Purple']}),
      q('ex_a_ds1','DRAG_SLOT','Mixing Red and Blue gives [BLANK].',{text:'Mixing Red and Blue gives [BLANK].',options:['purple','green','orange','black'],slots:[{answer:'purple'}]}),
      q('ex_a_arr1','ARRANGE','Put rainbow colors in VIBGYOR order.',{items:['Red','Violet','Green','Yellow'],correctOrder:['Violet','Green','Yellow','Red']}),
      q('ex_a_sn1','SEQUENCE_NEXT','Color pattern: Red, Blue, Red, Blue, ___',{given:['Red','Blue','Red','Blue'],blanks:1,answers:['Red']}),
      q('ex_a_sp1','SEQUENCE_PREV','What comes before Green in VIBGYOR?',{given:['Green','Blue'],blanks:1,answers:['Yellow']}),
      q('ex_a_uns1','UNSCRAMBLE','Unscramble to name a color!',{scrambled:['N','I','P','K'],answer:'PINK',hint:'Light red'}),
      q('ex_a_wb1','WORD_BUILD','Build the color word GREEN.',{letterPool:['G','R','E','E','N','Z'],answer:'GREEN'}),
    ]
  },
  {
    id: 'art_p2_005', subject: 'art', title: 'Art Literacy, Dictation & Reading',
    topic: 'Art Words & Dictation', difficulty: 'medium', estimatedTime: 12,
    description: 'First letters, fill-in-blanks, reading comprehension, and audio clips.',
    questions: [
      q('ex_a_fl1','WORD_FIRST_LETTER','___ELLOW (First letter of sun color)',{wordWithBlank:'_ELLOW',options:['Y','K','Z','Q'],answer:'Y',hint:'Yellow'}),
      q('ex_a_fb1','FILL_BLANK','A rainbow has _____ colors.',{answer:'seven',hint:'Number 7'}),
      q('ex_a_th1','TEXT_HIGHLIGHT','Tap all SHAPE names in the passage.',{passage:'Draw a square a circle and a triangle on white paper.',correctWords:['square','circle','triangle']}),
      q('ex_a_pw1','PICTURE_WRITE','Write the shape of a wheel.',{picture:'⭕',text:'What shape is a wheel?',expectedAnswers:['circle','round']}),
      q('ex_a_aw1','AUDIO_WRITE','Listen and write the color name.',{spokenText:'turquoise',expectedAnswer:'turquoise',language:'en-IN'}),
      q('ex_a_nw1','NUMBER_WRITE','Write the number of sides in a triangle.',{digit:'3',answer:'three'}),
      q('ex_a_ra1','READ_AND_ANSWER','Read the art passage and answer.',{passage:'Leo loves drawing castles with grey clay and adding colorful flags on top.',question:'What material does Leo use to draw castles?',answer:'grey clay',options:['grey clay','watercolors','crayons','paper']}),
      q('ex_a_ac1','AUDIO_CLIP','Listen and answer art question!',{audioSrc:'',question:'What color do you get by mixing Blue and Yellow?',options:['Green','Orange','Purple','Red'],answer:'Green',mode:'mcq'}),
      q('ex_a_tf1','TRUE_FALSE','Mixing white to any color makes it lighter.',{answer:true}),
      q('ex_a_tf2','TRUE_FALSE','Pencils are used for shading and sketching.',{answer:true}),
    ]
  }
];

if (typeof ALL_WORKSHEETS !== 'undefined') {
  ALL_WORKSHEETS.push(
    ...EXTRA_ENG_WORKSHEETS,
    ...EXTRA_MATH_WORKSHEETS,
    ...EXTRA_HINDI_WORKSHEETS,
    ...EXTRA_GA_WORKSHEETS,
    ...EXTRA_ART_WORKSHEETS
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// FINAL EXPANSION: GUARANTEEING ≥ 10 QUESTIONS PER TYPE PER SUBJECT
// ═════════════════════════════════════════════════════════════════════════════

const FINAL_ENG_WORKSHEETS = [
  {
    id: 'eng_p2_012', subject: 'english', title: 'English Master 10-Question Pack A',
    topic: 'English Skills', difficulty: 'easy', estimatedTime: 12,
    description: 'Completing 10+ target coverage for all English question types.',
    questions: [
      q('fe_m1','MATCH','Match singular to plural.',{pairs:[{left:'cat',right:'cats'},{left:'dog',right:'dogs'},{left:'boy',right:'boys'}]}),
      q('fe_mi1','MATCH_IMAGE','Match nature emojis to words.',{pairs:[{left:'🌳',right:'Tree'},{left:'🌸',right:'Flower'},{left:'🌊',right:'Water'},{left:'⭐',right:'Star'},{left:'🌙',right:'Moon'}]}),
      q('fe_cf1','CIRCLE_FIND','Tap all Naming Words (Nouns) in the grid!',{items:['book','run','pencil','fast','school','blue','desk'],correctItems:['book','pencil','school','desk']}),
      q('fe_arr1','ARRANGE','Put words to make a sentence.',{items:['loves','She','singing'],correctOrder:['She','loves','singing']}),
      q('fe_arr2','ARRANGE','Put words to make a sentence.',{items:['is','The','blue','sky'],correctOrder:['The','sky','is','blue']}),
      q('fe_sn1','SEQUENCE_NEXT','Write the NEXT 3 letters.',{given:['A','B','C'],blanks:3,answers:['D','E','F']}),
      q('fe_sn2','SEQUENCE_NEXT','Write the NEXT 3 letters.',{given:['X','Y','Z'],blanks:3,answers:['A','B','C']}),
      q('fe_sp1','SEQUENCE_PREV','Write 3 letters BEFORE G.',{given:['G','H','I'],blanks:3,answers:['D','E','F']}),
      q('fe_sp2','SEQUENCE_PREV','Write 3 letters BEFORE J.',{given:['J','K','L'],blanks:3,answers:['G','H','I']}),
      q('fe_sp3','SEQUENCE_PREV','Write 3 letters BEFORE P.',{given:['P','Q','R'],blanks:3,answers:['M','N','O']}),
    ]
  },
  {
    id: 'eng_p2_013', subject: 'english', title: 'English Master 10-Question Pack B',
    topic: 'English Skills', difficulty: 'easy', estimatedTime: 12,
    description: 'Word building, dictation, highlight, picture write and vowel sort.',
    questions: [
      q('fe_uns1','UNSCRAMBLE','Unscramble to spell BIRD.',{scrambled:['R','I','B','D'],answer:'BIRD',hint:'Flies in sky'}),
      q('fe_uns2','UNSCRAMBLE','Unscramble to spell FISH.',{scrambled:['H','S','I','F'],answer:'FISH',hint:'Swims in water'}),
      q('fe_uns3','UNSCRAMBLE','Unscramble to spell LION.',{scrambled:['O','I','L','N'],answer:'LION',hint:'King of jungle'}),
      q('fe_wb1','WORD_BUILD','Build the word SCHOOL.',{letterPool:['S','C','H','O','O','L','Z'],answer:'SCHOOL'}),
      q('fe_wb2','WORD_BUILD','Build the word FLOWER.',{letterPool:['F','L','O','W','E','R','P'],answer:'FLOWER'}),
      q('fe_th1','TEXT_HIGHLIGHT','Tap all ADJECTIVES in the sentence.',{passage:'The small boy wore a bright yellow shirt.',correctWords:['small','bright','yellow']}),
      q('fe_th2','TEXT_HIGHLIGHT','Tap all VERBS in the sentence.',{passage:'Birds fly fish swim and frogs hop in nature.',correctWords:['fly','swim','hop']}),
      q('fe_th3','TEXT_HIGHLIGHT','Tap all CVC words.',{passage:'The cat sat on a mat with a hat.',correctWords:['cat','sat','mat','hat']}),
      q('fe_th4','TEXT_HIGHLIGHT','Tap all PRONOUNS.',{passage:'He and she went to school together.',correctWords:['He','she']}),
      q('fe_pw1','PICTURE_WRITE','Write ONE word for this picture.',{picture:'🎈',text:'What item is this?',expectedAnswers:['balloon']}),
    ]
  },
  {
    id: 'eng_p2_014', subject: 'english', title: 'English Master 10-Question Pack C',
    topic: 'English Media & Dictation', difficulty: 'easy', estimatedTime: 12,
    description: 'Pictures, dictation, number words, and groups of tens.',
    questions: [
      q('fe_pw2','PICTURE_WRITE','Write ONE word for this picture.',{picture:'🎸',text:'What instrument is this?',expectedAnswers:['guitar']}),
      q('fe_pw3','PICTURE_WRITE','Write ONE word for this picture.',{picture:'⛵',text:'What vehicle is this?',expectedAnswers:['boat','sailboat']}),
      q('fe_aw1','AUDIO_WRITE','Listen and write.',{spokenText:'rainbow',expectedAnswer:'rainbow',language:'en-IN'}),
      q('fe_nw1','NUMBER_WRITE','Write English word for digit 7.',{digit:'7',answer:'seven'}),
      q('fe_nw2','NUMBER_WRITE','Write English word for digit 8.',{digit:'8',answer:'eight'}),
      q('fe_nw3','NUMBER_WRITE','Write English word for digit 9.',{digit:'9',answer:'nine'}),
      q('fe_nw4','NUMBER_WRITE','Write English word for digit 10.',{digit:'10',answer:'ten'}),
      q('fe_got1','GROUPS_OF_TENS','Count total letters in 3 groups of 10 letters.',{tensCount:3,unitsCount:0,question:'What is 3 tens?',answer:'30'}),
      q('fe_vs1','VOWEL_SORT','Tap all LONG A words.',{mode:'single',lang:'english',targetVowel:'A',words:['cake','lake','make','cat','take','hat'],correctWords:['cake','lake','make','take']}),
      q('fe_vs2','VOWEL_SORT','Tap all LONG I words.',{mode:'single',lang:'english',targetVowel:'I',words:['kite','bite','pin','ride','hide','pig'],correctWords:['kite','bite','ride','hide']}),
    ]
  }
];

const FINAL_MATH_WORKSHEETS = [
  {
    id: 'math_p2_010', subject: 'maths', title: 'Math Master 10-Question Pack A',
    topic: 'Math Skills', difficulty: 'easy', estimatedTime: 12,
    description: 'Matching, circle grid, drag slots and sequences.',
    questions: [
      q('fm_m1','MATCH','Match addition pairs.',{pairs:[{left:'3 + 3',right:'6'},{left:'4 + 4',right:'8'},{left:'5 + 5',right:'10'},{left:'6 + 6',right:'12'},{left:'7 + 7',right:'14'}]}),
      q('fm_mi1','MATCH_IMAGE','Match die emojis to count!',{pairs:[{left:'⚀',right:'1'},{left:'⚁',right:'2'},{left:'⚂',right:'3'},{left:'⚃',right:'4'},{left:'⚄',right:'5'},{left:'⚅',right:'6'}]}),
      q('fm_cf1','CIRCLE_FIND','Tap all MULTIPLES OF 10 in the grid!',{items:['10','15','20','25','30','35','40','45'],correctItems:['10','20','30','40']}),
      q('fm_cf2','CIRCLE_FIND','Tap all numbers LESS THAN 15!',{items:['5','18','9','22','12','30','3','40'],correctItems:['5','9','12','3']}),
      q('fm_ds1','DRAG_SLOT','15 + [BLANK] = 20',{text:'15 + [BLANK] = 20',options:['5','10','15','0'],slots:[{answer:'5'}]}),
      q('fm_ds2','DRAG_SLOT','30 - [BLANK] = 25',{text:'30 - [BLANK] = 25',options:['5','10','15','20'],slots:[{answer:'5'}]}),
      q('fm_ds3','DRAG_SLOT','10 x 2 = [BLANK]',{text:'10 x 2 = [BLANK]',options:['20','12','10','30'],slots:[{answer:'20'}]}),
      q('fm_arr1','ARRANGE','Put these lengths in order from shortest to longest.',{items:['100 cm','5 cm','50 cm','10 cm'],correctOrder:['5 cm','10 cm','50 cm','100 cm']}),
      q('fm_sn1','SEQUENCE_NEXT','Skip count by 5s: 5, 10, 15, ___',{given:['5','10','15'],blanks:3,answers:['20','25','30']}),
      q('fm_sn2','SEQUENCE_NEXT','Skip count by 10s: 50, 60, 70, ___',{given:['50','60','70'],blanks:3,answers:['80','90','100']}),
    ]
  },
  {
    id: 'math_p2_011', subject: 'maths', title: 'Math Master 10-Question Pack B',
    topic: 'Math Skills', difficulty: 'easy', estimatedTime: 12,
    description: 'Sequences, unscramble, word building, first letter, highlighting.',
    questions: [
      q('fm_sp1','SEQUENCE_PREV','Count backwards: 100, 90, 80, ___',{given:['80','90','100'],blanks:3,answers:['50','60','70']}),
      q('fm_sp2','SEQUENCE_PREV','Count backwards: 20, 19, 18, ___',{given:['18','19','20'],blanks:3,answers:['15','16','17']}),
      q('fm_uns1','UNSCRAMBLE','Unscramble number word for 8!',{scrambled:['T','H','G','I','E'],answer:'EIGHT',hint:'8'}),
      q('fm_uns2','UNSCRAMBLE','Unscramble number word for 10!',{scrambled:['N','E','T'],answer:'TEN',hint:'10'}),
      q('fm_uns3','UNSCRAMBLE','Unscramble number word for 0!',{scrambled:['O','R','E','Z'],answer:'ZERO',hint:'0'}),
      q('fm_uns4','UNSCRAMBLE','Unscramble shape name for ⬜!',{scrambled:['E','R','A','U','Q','S'],answer:'SQUARE',hint:'4 equal sides'}),
      q('fm_wb1','WORD_BUILD','Build the number word SEVENTEEN.',{letterPool:['S','E','V','E','N','T','E','E','N'],answer:'SEVENTEEN'}),
      q('fm_fl1','WORD_FIRST_LETTER','___EN (First letter of digit 10)',{wordWithBlank:'_EN',options:['T','M','Z','Q'],answer:'T',hint:'10'}),
      q('fm_fl2','WORD_FIRST_LETTER','___IGHT (First letter of digit 8)',{wordWithBlank:'_IGHT',options:['E','M','K','Z'],answer:'E',hint:'8'}),
      q('fm_th1','TEXT_HIGHLIGHT','Tap all ODD numbers in the passage.',{passage:'Look at 1 4 7 10 13 16 19 22.',correctWords:['1','7','13','19']}),
    ]
  },
  {
    id: 'math_p2_012', subject: 'maths', title: 'Math Master 10-Question Pack C',
    topic: 'Math Skills & Audio', difficulty: 'easy', estimatedTime: 12,
    description: 'Highlighting, pictures, dictation, groups of tens, story math, audio.',
    questions: [
      q('fm_th2','TEXT_HIGHLIGHT','Tap all MULTIPLES OF 5.',{passage:'Count 5 12 15 22 25 33 35.',correctWords:['5','15','25','35']}),
      q('fm_pw1','PICTURE_WRITE','Write digit for count of hearts.',{picture:'❤️❤️❤️❤️❤️❤️❤️',text:'Count the hearts.',expectedAnswers:['7']}),
      q('fm_pw2','PICTURE_WRITE','Write digit for count of diamonds.',{picture:'💎💎💎',text:'Count the diamonds.',expectedAnswers:['3']}),
      q('fm_aw1','AUDIO_WRITE','Listen and write digit.',{spokenText:'fifty',expectedAnswer:'50',language:'en-IN'}),
      q('fm_nw1','NUMBER_WRITE','Write number word for 15.',{digit:'15',answer:'fifteen'}),
      q('fm_got1','GROUPS_OF_TENS','Count 9 tens and 9 units.',{tensCount:9,unitsCount:9,question:'What number is 9 tens + 9 units?',answer:'99'}),
      q('fm_ra1','READ_AND_ANSWER','Solve math word problem.',{passage:'Sara has 10 balloons. 2 balloons pop in the air.',question:'How many balloons remain?',answer:'8',options:['6','7','8','9']}),
      q('fm_ra2','READ_AND_ANSWER','Solve math word problem.',{passage:'A tree has 8 apples. A boy picks 3 apples.',question:'How many apples remain on the tree?',answer:'5',options:['4','5','6','7']}),
      q('fm_ac1','AUDIO_CLIP','Listen and answer math question!',{audioSrc:'',question:'What is 5 x 2?',options:['8','10','12','14'],answer:'10',mode:'mcq'}),
      q('fm_ac2','AUDIO_CLIP','Listen and write answer!',{audioSrc:'',question:'Listen and solve: 20 - 10 = ?',answer:'10',mode:'write'}),
    ]
  }
];

const FINAL_HINDI_WORKSHEETS = [
  {
    id: 'hindi_p2_008', subject: 'hindi', title: 'हिंदी मास्टर १०-प्रश्न पैक A',
    topic: 'हिंदी अभ्यास', difficulty: 'easy', estimatedTime: 12,
    description: 'खाली स्थान, मिलान, चित्र मिलान, गोला लगाओ और अनुक्रम।',
    questions: [
      q('fh_fb1','FILL_BLANK','हम आँखों से _____ करते हैं।',{answer:'देखते',hint:'देखना'}),
      q('fh_fb2','FILL_BLANK','हम कानों से _____ हैं।',{answer:'सुनते',hint:'सुनना'}),
      q('fh_fb3','FILL_BLANK','हम पैरों से _____ हैं।',{answer:'चलते',hint:'चलना'}),
      q('fh_m1','MATCH','वर्णों को उनके सही वर्ग से मिलाओ।',{pairs:[{left:'क',right:'क वर्ग'},{left:'च',right:'च वर्ग'},{left:'त',right:'त वर्ग'},{left:'प',right:'प वर्ग'}]}),
      q('fh_mi1','MATCH_IMAGE','चित्रों को सही नाम से मिलाओ!',{pairs:[{left:'🚗',right:'कार'},{left:'✈️',right:'हवाई जहाज'},{left:'🚂',right:'रेलगाड़ी'},{left:'🚲',right:'साइकिल'}]}),
      q('fh_cf1','CIRCLE_FIND','प वर्ग के व्यंजनों पर टैप करो!',{items:['प','फ','ब','भ','म','त','थ','द'],correctItems:['प','फ','ब','भ','म']}),
      q('fh_ds1','DRAG_SLOT','भारत की राजधानी [BLANK] है।',{text:'भारत की राजधानी [BLANK] है।',options:['दिल्ली','मुंबई','कोलकाता','चेन्नई'],slots:[{answer:'दिल्ली'}]}),
      q('fh_arr1','ARRANGE','वर्णमाला क्रम में लगाओ।',{items:['घ','क','ख','ग'],correctOrder:['क','ख','ग','घ']}),
      q('fh_sn1','SEQUENCE_NEXT','अगले ३ वर्ण लिखो: ट, ठ, ड, ___',{given:['ट','ठ','ड'],blanks:3,answers:['ढ','ण','त']}),
      q('fh_sp1','SEQUENCE_PREV','दिए गए वर्ण से पहले के ३ वर्ण लिखो: ढ, ण, त',{given:['ढ','ण','त'],blanks:3,answers:['ट','ठ','ड']}),
    ]
  },
  {
    id: 'hindi_p2_009', subject: 'hindi', title: 'हिंदी मास्टर १०-प्रश्न पैक B',
    topic: 'हिंदी अभ्यास', difficulty: 'easy', estimatedTime: 12,
    description: 'अक्षरों को क्रम में लगाओ, शब्द बनाओ, पहला वर्ण और गद्यांश।',
    questions: [
      q('fh_uns1','UNSCRAMBLE','शब्द बनाओ!',{scrambled:['र','म','म','ट','ा'],answer:'टमाटर',hint:'लाल रंग की सब्जी'}),
      q('fh_wb1','WORD_BUILD','वर्ण चुनकर "बिल्ली" शब्द बनाओ।',{letterPool:['बि','ल्','ली','क','म'],answer:'बिल्ली'}),
      q('fh_fl1','WORD_FIRST_LETTER','___पड़ा (पहला वर्ण चुनो)',{wordWithBlank:'_पड़ा',options:['कपड़ा','म','र','स'],answer:'कपड़ा',hint:'पहना जाने वाला कपड़ा'}),
      q('fh_th1','TEXT_HIGHLIGHT','सभी व्यंजनों पर टैप करो!',{passage:'क ख ग घ ङ अ आ इ ई',correctWords:['क','ख','ग','घ','ङ']}),
      q('fh_pw1','PICTURE_WRITE','चित्र देखकर हिंदी नाम लिखो।',{picture:'🚗',text:'यह क्या है?',expectedAnswers:['कार','गाड़ी']}),
      q('fh_aw1','AUDIO_WRITE','सुनो और लिखो!',{spokenText:'किताब',expectedAnswer:'किताब',language:'hi-IN'}),
      q('fh_nw1','NUMBER_WRITE','अंक ५ को हिंदी शब्द में लिखो।',{digit:'5',answer:'पाँच'}),
      q('fh_ra1','READ_AND_ANSWER','गद्यांश पढ़कर उत्तर दो।',{passage:'सूरज पूरब में उगता है और पश्चिम में छिपता है। सूरज हमें रोशनी और गर्मी देता है।',question:'सूरज किस दिशा में उगता है?',answer:'पूरब',options:['पूरब','पश्चिम','उत्तर','दक्षिण']}),
      q('fh_vs1','VOWEL_SORT','उ की मात्रा वाले शब्द चुनो!',{mode:'single',lang:'hindi',targetVowel:'उ',words:['गुलाब','सुनार','आम','पुल','घर','दुकान'],correctWords:['गुलाब','सुनार','पुल','दुकान']}),
      q('fh_ac1','AUDIO_CLIP','ऑडियो सुनो और उत्तर दो।',{audioSrc:'',question:'हमारे राष्ट्रपिता कौन हैं?',options:['महात्मा गांधी','नेहरू जी','सुभाष चंद्र बोस','भगत सिंह'],answer:'महात्मा गांधी',mode:'mcq'}),
    ]
  }
];

const FINAL_GA_WORKSHEETS = [
  {
    id: 'ga_p2_007', subject: 'ga', title: 'GA Master 10-Question Pack A',
    topic: 'GA Skills', difficulty: 'easy', estimatedTime: 12,
    description: 'Fill blanks, matching, circle find, drag slot, and sequence.',
    questions: [
      q('fg_fb1','FILL_BLANK','The Earth has _____ continent and oceans.',{answer:'seven',hint:'Number of continents'}),
      q('fg_m1','MATCH','Match animals to their sounds!',{pairs:[{left:'Cow',right:'Moo'},{left:'Duck',right:'Quack'},{left:'Dog',right:'Bark'},{left:'Cat',right:'Meow'}]}),
      q('fg_mi1','MATCH_IMAGE','Match planet emojis to names!',{pairs:[{left:'🌍',right:'Earth'},{left:'☀️',right:'Sun'},{left:'🌙',right:'Moon'},{left:'🪐',right:'Saturn'}]}),
      q('fg_cf1','CIRCLE_FIND','Tap all BIRDS in the list!',{items:['Peacock','Tiger','Sparrow','Parrot','Cow','Pigeon'],correctItems:['Peacock','Sparrow','Parrot','Pigeon']}),
      q('fg_ds1','DRAG_SLOT','The [BLANK] is the national bird of India.',{text:'The [BLANK] is the national bird of India.',options:['peacock','crow','sparrow','eagle'],slots:[{answer:'peacock'}]}),
      q('fg_arr1','ARRANGE','Arrange water cycle steps.',{items:['Rain','Evaporation','Clouds','Collection'],correctOrder:['Evaporation','Clouds','Rain','Collection']}),
      q('fg_sn1','SEQUENCE_NEXT','Seasons: Summer, Monsoon, Autumn, ___',{given:['Summer','Monsoon','Autumn'],blanks:1,answers:['Winter']}),
      q('fg_sp1','SEQUENCE_PREV','What comes BEFORE Summer?',{given:['Summer','Monsoon'],blanks:1,answers:['Spring']}),
      q('fg_uns1','UNSCRAMBLE','Unscramble to name our country!',{scrambled:['D','I','N','I','A'],answer:'INDIA',hint:'Our nation'}),
      q('fg_wb1','WORD_BUILD','Build the word FLOWER.',{letterPool:['F','L','O','W','E','R','Z'],answer:'FLOWER'}),
    ]
  },
  {
    id: 'ga_p2_008', subject: 'ga', title: 'GA Master 10-Question Pack B',
    topic: 'GA Skills', difficulty: 'easy', estimatedTime: 12,
    description: 'First letter, highlight, pictures, audio, dictation, comprehension.',
    questions: [
      q('fg_fl1','WORD_FIRST_LETTER','___UN (Source of light in daytime)',{wordWithBlank:'_UN',options:['S','M','Z','Q'],answer:'S',hint:'Sun'}),
      q('fg_th1','TEXT_HIGHLIGHT','Tap all VEGETABLES in the passage.',{passage:'Eat carrot spinach potato and broccoli every day.',correctWords:['carrot','spinach','potato','broccoli']}),
      q('fg_pw1','PICTURE_WRITE','Write name of this animal.',{picture:'🐅',text:'Name this animal.',expectedAnswers:['tiger']}),
      q('fg_aw1','AUDIO_WRITE','Listen and write helper name.',{spokenText:'teacher',expectedAnswer:'teacher',language:'en-IN'}),
      q('fg_nw1','NUMBER_WRITE','Write the number of colors in Indian national flag.',{digit:'3',answer:'three'}),
      q('fg_ra1','READ_AND_ANSWER','Read the passage and answer.',{passage:'Plants need soil water air and sunlight to make their food.',question:'What do plants use to make food?',answer:'sunlight',options:['toys','sunlight','milk','juice']}),
      q('fg_ac1','AUDIO_CLIP','Listen and answer GA question!',{audioSrc:'',question:'What is the capital of India?',options:['New Delhi','Mumbai','Kolkata','Chennai'],answer:'New Delhi',mode:'mcq'}),
      q('fg_tf1','TRUE_FALSE','The sun rises in the East.',{answer:true}),
      q('fg_tf2','TRUE_FALSE','We should waste water while brushing.',{answer:false,hint:'Save water!'}),
      q('fg_fb2','FILL_BLANK','We use our _____ to hear sounds.',{answer:'ears',hint:'Sense organ'}),
    ]
  }
];

const FINAL_ART_WORKSHEETS = [
  {
    id: 'art_p2_006', subject: 'art', title: 'Art Master 10-Question Pack A',
    topic: 'Art & Craft Skills', difficulty: 'easy', estimatedTime: 12,
    description: 'Complete coverage pack A for Art & Craft.',
    questions: [
      q('fa_tf1','TRUE_FALSE','Blue and Red make Purple.',{answer:true}),
      q('fa_fb1','FILL_BLANK','A triangle has _____ sides.',{answer:'three',hint:'3'}),
      q('fa_m1','MATCH','Match shape to number of sides!',{pairs:[{left:'Triangle',right:'3'},{left:'Square',right:'4'},{left:'Pentagon',right:'5'},{left:'Hexagon',right:'6'}]}),
      q('fa_mi1','MATCH_IMAGE','Match craft material emojis to names!',{pairs:[{left:'📄',right:'Paper'},{left:'✂️',right:'Scissors'},{left:'🖌️',right:'Brush'},{left:'✏️',right:'Pencil'}]}),
      q('fa_cf1','CIRCLE_FIND','Tap all WARM COLORS in the list!',{items:['Red','Orange','Yellow','Blue','Green','Purple'],correctItems:['Red','Orange','Yellow']}),
      q('fa_ds1','DRAG_SLOT','Mixing Yellow and Blue creates [BLANK].',{text:'Mixing Yellow and Blue creates [BLANK].',options:['green','purple','orange','red'],slots:[{answer:'green'}]}),
      q('fa_arr1','ARRANGE','Order secondary colors alphabetically.',{items:['Purple','Orange','Green'],correctOrder:['Green','Orange','Purple']}),
      q('fa_sn1','SEQUENCE_NEXT','Pattern: Circle, Square, Circle, Square, ___',{given:['Circle','Square','Circle','Square'],blanks:1,answers:['Circle']}),
      q('fa_sp1','SEQUENCE_PREV','Pattern: ___ Yellow, Red, Yellow',{given:['Yellow','Red','Yellow'],blanks:1,answers:['Red']}),
      q('fa_uns1','UNSCRAMBLE','Unscramble color name for 🟢!',{scrambled:['E','E','G','R','N'],answer:'GREEN',hint:'Color of grass'}),
    ]
  },
  {
    id: 'art_p2_007', subject: 'art', title: 'Art Master 10-Question Pack B',
    topic: 'Art & Craft Skills', difficulty: 'easy', estimatedTime: 12,
    description: 'Complete coverage pack B for Art & Craft.',
    questions: [
      q('fa_wb1','WORD_BUILD','Build the word ORANGE.',{letterPool:['O','R','A','N','G','E','Z'],answer:'ORANGE'}),
      q('fa_fl1','WORD_FIRST_LETTER','___LUE (First letter of sky color)',{wordWithBlank:'_LUE',options:['B','M','Z','Q'],answer:'B',hint:'Blue'}),
      q('fa_th1','TEXT_HIGHLIGHT','Tap all WARM COLORS in the passage.',{passage:'Paint with red orange and yellow for sunset.',correctWords:['red','orange','yellow']}),
      q('fa_pw1','PICTURE_WRITE','Write the shape name.',{picture:'⬛',text:'What shape is this?',expectedAnswers:['square']}),
      q('fa_aw1','AUDIO_WRITE','Listen and write color name.',{spokenText:'violet',expectedAnswer:'violet',language:'en-IN'}),
      q('fa_nw1','NUMBER_WRITE','Write number of sides in a square.',{digit:'4',answer:'four'}),
      q('fa_ra1','READ_AND_ANSWER','Read the art passage and answer.',{passage:'Artists paint portraits of people and landscapes of nature.',question:'What do artists paint of people?',answer:'portraits',options:['portraits','cartoons','sculptures','photos']}),
      q('fa_ac1','AUDIO_CLIP','Listen and answer art question!',{audioSrc:'',question:'What tool is used to cut paper in craft?',options:['Scissors','Brush','Pencil','Ruler'],answer:'Scissors',mode:'mcq'}),
      q('fa_tf2','TRUE_FALSE','Clay can be molded into 3D shapes.',{answer:true}),
      q('fa_fb2','FILL_BLANK','A circle has _____ straight sides.',{answer:'zero',hint:'0 sides'}),
    ]
  }
];

if (typeof ALL_WORKSHEETS !== 'undefined') {
  ALL_WORKSHEETS.push(
    ...FINAL_ENG_WORKSHEETS,
    ...FINAL_MATH_WORKSHEETS,
    ...FINAL_HINDI_WORKSHEETS,
    ...FINAL_GA_WORKSHEETS,
    ...FINAL_ART_WORKSHEETS
  );
}
