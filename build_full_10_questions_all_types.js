/* eslint-disable */
const fs = require('fs');

// Reads current data2.js and appends extra worksheets for English, Maths, Hindi, GA, Art
// so EVERY subject has AT LEAST 10 questions for EVERY question type!

const extraWorksheets = `
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
`;

const existingData2 = fs.readFileSync('pwa/js/data2.js', 'utf8');
fs.writeFileSync('pwa/js/data2.js', existingData2 + '\n' + extraWorksheets, 'utf8');
console.log('Successfully appended extra mega worksheets to pwa/js/data2.js!');
