/* eslint-disable */
// KidWorksheets PWA - Phase 2 Enriched Worksheets
'use strict';

const ENG_P2_WORKSHEETS = [
  {
    id: 'eng_p2_001', subject: 'english', title: 'Interactive Alphabet Fun',
    topic: 'Alphabets & Phonics', difficulty: 'easy', estimatedTime: 12,
    description: 'Match, circle, and sequence letters! Fun interactive activities.',
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
        picture:'sunflower emoji',text:'Write ONE word for this picture',
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
];

const MATH_P2_WORKSHEETS = [
  {
    id: 'math_p2_001', subject: 'maths', title: 'Numbers in Action!',
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
];

const HINDI_P2_WORKSHEETS = [
  {
    id: 'hindi_p2_001', subject: 'hindi', title: 'वर्णमाला अभ्यास',
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
];

const GA_P2_WORKSHEETS = [
  {
    id: 'ga_p2_001', subject: 'ga', title: 'Animals and Nature Fun!',
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
        picture:'(rainbow)',text:'What is in the sky after rain?',expectedAnswers:['rainbow','rain','sky']
      }),
      q('gp2q7','AUDIO_WRITE','Listen and write the animal name.',{
        spokenText:'elephant',expectedAnswer:'elephant',language:'en-IN',hint:'The biggest land animal!'
      }),
      q('gp2q8','MCQ','Which sense do we use to smell a flower?',{options:['Eyes','Ears','Nose','Tongue'],answer:'Nose'}),
      q('gp2q9','TRUE_FALSE','Fish live in water.',{answer:true}),
      q('gp2q10','MCQ','Which animal gives us milk?',{options:['Dog','Cow','Cat','Hen'],answer:'Cow'}),
    ]
  },
];

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
        picture:'(ocean waves)',text:'What colour is the ocean?',expectedAnswers:['blue','dark blue','light blue']
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
];

// Append to ALL_WORKSHEETS
if (typeof ALL_WORKSHEETS !== 'undefined') {
  ALL_WORKSHEETS.push(
    ...ENG_P2_WORKSHEETS,
    ...MATH_P2_WORKSHEETS,
    ...HINDI_P2_WORKSHEETS,
    ...GA_P2_WORKSHEETS,
    ...ART_P2_WORKSHEETS
  );
}
