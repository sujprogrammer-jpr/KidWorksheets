/* eslint-disable */
const fs = require('fs');

const finalExtraWorksheets = `
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
`;

const currentData2 = fs.readFileSync('pwa/js/data2.js', 'utf8');
fs.writeFileSync('pwa/js/data2.js', currentData2 + '\n' + finalExtraWorksheets, 'utf8');
console.log('Successfully appended FINAL EXTRA MEGA WORKSHEETS to pwa/js/data2.js!');
