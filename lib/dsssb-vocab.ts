// Hindi vocabulary reference + rapid-quiz data for DSSSB Practise.
// Covers the three high-yield rote-memory areas of the Hindi Language &
// Comprehension subsection: विलोम शब्द (antonyms), पर्यायवाची शब्द (synonyms)
// and मुहावरे (idioms). Kept separate from the full mock-paper question banks
// so it can also power the "Practice Material" reference page and the
// "Rapid Quiz" mini-quiz mode.

export interface VilomItem {
  word: string
  vilom: string
}

export interface ParyayvachiItem {
  word: string
  synonyms: string[]
}

export interface MuhavaraItem {
  muhavara: string
  meaning: string
}

/* --------------------------- विलोम शब्द (Antonyms) -------------------------- */

export const VILOM_LIST: VilomItem[] = [
  { word: "आदि", vilom: "अनादि" },
  { word: "आस्तिक", vilom: "नास्तिक" },
  { word: "उत्कर्ष", vilom: "अपकर्ष" },
  { word: "उदय", vilom: "अस्त" },
  { word: "उन्नति", vilom: "अवनति" },
  { word: "एकता", vilom: "अनेकता" },
  { word: "कटु", vilom: "मधुर" },
  { word: "कायर", vilom: "निडर" },
  { word: "कृत्रिम", vilom: "प्राकृतिक" },
  { word: "क्रूर", vilom: "दयालु" },
  { word: "गुण", vilom: "अवगुण" },
  { word: "गुरु", vilom: "लघु" },
  { word: "चर", vilom: "अचर" },
  { word: "जड़", vilom: "चेतन" },
  { word: "अंधकार", vilom: "प्रकाश" },
  { word: "निर्दयी", vilom: "दयालु" },
  { word: "निर्माण", vilom: "विनाश" },
  { word: "न्याय", vilom: "अन्याय" },
  { word: "पाप", vilom: "पुण्य" },
  { word: "प्रत्यक्ष", vilom: "परोक्ष" },
  { word: "बंधन", vilom: "मुक्ति" },
  { word: "भूत", vilom: "भविष्य" },
  { word: "मितव्ययी", vilom: "अपव्ययी" },
  { word: "यश", vilom: "अपयश" },
  { word: "राग", vilom: "द्वेष" },
  { word: "लौकिक", vilom: "अलौकिक" },
  { word: "विजय", vilom: "पराजय" },
  { word: "विस्तार", vilom: "संक्षेप" },
  { word: "शत्रु", vilom: "मित्र" },
  { word: "संधि", vilom: "विग्रह" },
  { word: "साक्षर", vilom: "निरक्षर" },
  { word: "स्वतंत्र", vilom: "पराधीन" },
  { word: "हर्ष", vilom: "विषाद" },
  { word: "आय", vilom: "व्यय" },
  { word: "आदर", vilom: "अनादर" },
  { word: "आरंभ", vilom: "अंत" },
  { word: "इष्ट", vilom: "अनिष्ट" },
  { word: "उचित", vilom: "अनुचित" },
  { word: "उत्तम", vilom: "अधम" },
  { word: "ऋजु", vilom: "वक्र" },
  { word: "कोमल", vilom: "कठोर" },
  { word: "गंभीर", vilom: "चंचल" },
  { word: "घात", vilom: "प्रतिघात" },
  { word: "जीवन", vilom: "मरण" },
  { word: "तरल", vilom: "ठोस" },
  { word: "देव", vilom: "दानव" },
  { word: "धनी", vilom: "निर्धन" },
  { word: "निंदा", vilom: "प्रशंसा" },
  { word: "पूर्व", vilom: "पश्चिम" },
  { word: "प्रकट", vilom: "गुप्त" },
  { word: "बाढ़", vilom: "सूखा" },
  { word: "भला", vilom: "बुरा" },
  { word: "मूक", vilom: "वाचाल" },
  { word: "यथार्थ", vilom: "कल्पित" },
  { word: "लाभ", vilom: "हानि" },
  { word: "वृद्धि", vilom: "ह्रास" },
  { word: "शिष्ट", vilom: "अशिष्ट" },
  { word: "संयोग", vilom: "वियोग" },
  { word: "सुगम", vilom: "दुर्गम" },
  { word: "हित", vilom: "अहित" },
]

/* -------------------------- पर्यायवाची शब्द (Synonyms) ------------------------ */

export const PARYAYVACHI_LIST: ParyayvachiItem[] = [
  { word: "सूर्य", synonyms: ["दिनकर", "भास्कर", "आदित्य", "रवि"] },
  { word: "चंद्रमा", synonyms: ["शशि", "इंदु", "सोम", "निशाकर"] },
  { word: "पवन", synonyms: ["समीर", "वायु", "अनिल", "मरुत"] },
  { word: "अग्नि", synonyms: ["पावक", "वह्नि", "अनल", "ज्वाला"] },
  { word: "जल", synonyms: ["नीर", "वारि", "सलिल", "तोय"] },
  { word: "पृथ्वी", synonyms: ["धरा", "वसुधा", "अवनि", "धरती"] },
  { word: "आकाश", synonyms: ["गगन", "नभ", "अंबर", "व्योम"] },
  { word: "समुद्र", synonyms: ["सागर", "सिंधु", "रत्नाकर", "जलधि"] },
  { word: "पर्वत", synonyms: ["गिरि", "नग", "अचल", "शैल"] },
  { word: "नदी", synonyms: ["सरिता", "तटिनी", "तरंगिणी", "निर्झरिणी"] },
  { word: "राजा", synonyms: ["नृप", "भूपति", "नरेश", "राजन"] },
  { word: "स्त्री", synonyms: ["नारी", "महिला", "वनिता", "रमणी"] },
  { word: "पुत्र", synonyms: ["सुत", "तनय", "आत्मज", "लड़का"] },
  { word: "पुत्री", synonyms: ["सुता", "तनया", "आत्मजा", "बेटी"] },
  { word: "पुष्प", synonyms: ["कुसुम", "सुमन", "प्रसून", "फूल"] },
  { word: "पक्षी", synonyms: ["विहग", "खग", "नभचर", "पखेरू"] },
  { word: "वृक्ष", synonyms: ["तरु", "पादप", "द्रुम", "विटप"] },
  { word: "सिंह", synonyms: ["केसरी", "मृगराज", "वनराज", "शेर"] },
  { word: "हाथी", synonyms: ["गज", "हस्ती", "करी", "द्विप"] },
  { word: "सर्प", synonyms: ["साँप", "नाग", "अहि", "भुजंग"] },
  { word: "रात्रि", synonyms: ["निशा", "रजनी", "यामिनी", "रात"] },
  { word: "दिन", synonyms: ["दिवस", "वासर", "अह्न", "दिनमान"] },
  { word: "आँख", synonyms: ["नेत्र", "नयन", "लोचन", "चक्षु"] },
  { word: "मुख", synonyms: ["चेहरा", "आनन", "वदन", "मुखड़ा"] },
  { word: "घर", synonyms: ["गृह", "आवास", "निवास", "सदन"] },
  { word: "मित्र", synonyms: ["सखा", "दोस्त", "सुहृद", "बंधु"] },
  { word: "गुरु", synonyms: ["शिक्षक", "आचार्य", "उस्ताद", "अध्यापक"] },
  { word: "विद्या", synonyms: ["ज्ञान", "शिक्षा", "बोध", "इल्म"] },
  { word: "धन", synonyms: ["दौलत", "संपत्ति", "वित्त", "अर्थ"] },
  { word: "आम", synonyms: ["रसाल", "अमृतफल", "सहकार", "आम्र"] },
  { word: "कमल", synonyms: ["पंकज", "जलज", "नीरज", "राजीव"] },
  { word: "बादल", synonyms: ["मेघ", "जलद", "घन", "नीरद"] },
  { word: "बिजली", synonyms: ["विद्युत", "चपला", "दामिनी", "तड़ित"] },
  { word: "बंदर", synonyms: ["वानर", "कपि", "मर्कट", "शाखामृग"] },
  { word: "गाय", synonyms: ["गौ", "धेनु", "सुरभि", "गैया"] },
  { word: "घोड़ा", synonyms: ["अश्व", "तुरंग", "हय", "घोटक"] },
  { word: "गंगा", synonyms: ["भागीरथी", "देवनदी", "सुरसरि", "जाह्नवी"] },
  { word: "दूध", synonyms: ["दुग्ध", "पय", "क्षीर", "दुधिया"] },
  { word: "सोना", synonyms: ["स्वर्ण", "कंचन", "कनक", "हेम"] },
  { word: "समय", synonyms: ["काल", "वक्त", "बेला", "अवसर"] },
  { word: "संसार", synonyms: ["जगत", "विश्व", "दुनिया", "लोक"] },
  { word: "विष", synonyms: ["जहर", "गरल", "हलाहल", "कालकूट"] },
  { word: "अमृत", synonyms: ["सुधा", "पीयूष", "अमिय", "अमी"] },
  { word: "दास", synonyms: ["सेवक", "नौकर", "अनुचर", "किंकर"] },
  { word: "पिता", synonyms: ["जनक", "तात", "बाप", "पितृ"] },
  { word: "माता", synonyms: ["जननी", "माँ", "अंबा", "मातृ"] },
]

/* -------------------------------- मुहावरे (Idioms) ------------------------------- */

export const MUHAVARE_LIST: MuhavaraItem[] = [
  { muhavara: "आँखों में धूल झोंकना", meaning: "धोखा देना" },
  { muhavara: "नौ दो ग्यारह होना", meaning: "भाग जाना" },
  { muhavara: "आग बबूला होना", meaning: "बहुत क्रोधित होना" },
  { muhavara: "ईद का चाँद होना", meaning: "बहुत कम दिखाई देना" },
  { muhavara: "उंगली पर नचाना", meaning: "अपने वश में करना" },
  { muhavara: "कान भरना", meaning: "किसी के विरुद्ध चुगली करना/भड़काना" },
  { muhavara: "कलेजा मुँह को आना", meaning: "बहुत भयभीत होना" },
  { muhavara: "खून पसीना एक करना", meaning: "कड़ी मेहनत करना" },
  { muhavara: "गागर में सागर भरना", meaning: "थोड़े शब्दों में बड़ी बात कहना" },
  { muhavara: "घी के दीये जलाना", meaning: "बहुत खुश होना" },
  { muhavara: "चादर देखकर पैर फैलाना", meaning: "अपनी आय के अनुसार खर्च करना" },
  { muhavara: "छक्के छुड़ाना", meaning: "हराना/पराजित करना" },
  { muhavara: "जान हथेली पर रखना", meaning: "जान जोखिम में डालना" },
  { muhavara: "टका सा जवाब देना", meaning: "साफ इनकार कर देना" },
  { muhavara: "दाँतों तले उंगली दबाना", meaning: "बहुत आश्चर्यचकित होना" },
  { muhavara: "दूध का दूध पानी का पानी करना", meaning: "सही-गलत का स्पष्ट निर्णय करना" },
  { muhavara: "नाक कटना", meaning: "अपमानित होना/प्रतिष्ठा जाना" },
  { muhavara: "पानी-पानी होना", meaning: "बहुत शर्मिंदा होना" },
  { muhavara: "पेट में चूहे कूदना", meaning: "बहुत तेज़ भूख लगना" },
  { muhavara: "बाल की खाल निकालना", meaning: "छोटी-छोटी बातों पर बहुत बारीकी से विचार करना" },
  { muhavara: "भीगी बिल्ली बनना", meaning: "डर के कारण चुप हो जाना" },
  { muhavara: "मुँह में पानी आना", meaning: "कुछ पाने की तीव्र लालसा होना" },
  { muhavara: "रंग में भंग डालना", meaning: "खुशी के अवसर में विघ्न डालना" },
  { muhavara: "लोहा लेना", meaning: "मुकाबला करना" },
  { muhavara: "सिर आँखों पर बिठाना", meaning: "बहुत आदर-सम्मान देना" },
  { muhavara: "हाथ-पैर फूलना", meaning: "घबरा जाना" },
  { muhavara: "आँखों का तारा होना", meaning: "बहुत प्रिय होना" },
  { muhavara: "एक पंथ दो काज", meaning: "एक ही कार्य से दो लाभ प्राप्त होना" },
  { muhavara: "कमर कसना", meaning: "किसी कार्य के लिए पूरी तरह तैयार हो जाना" },
  { muhavara: "गड़े मुर्दे उखाड़ना", meaning: "भुला दी गई पुरानी बातें फिर से उठाना" },
  { muhavara: "घर का भेदी लंका ढाए", meaning: "अपनों की गुप्त सूचना देने से हानि होना" },
  { muhavara: "चिराग तले अंधेरा", meaning: "पास की स्पष्ट बात का ही ज्ञान न होना" },
  { muhavara: "टेढ़ी खीर होना", meaning: "बहुत कठिन कार्य होना" },
  { muhavara: "डंका बजाना", meaning: "चारों ओर प्रसिद्ध हो जाना" },
  { muhavara: "तिल का ताड़ बनाना", meaning: "छोटी बात को बहुत बढ़ा-चढ़ाकर कहना" },
  { muhavara: "दिन में तारे दिखाई देना", meaning: "बहुत अधिक कष्ट या पीड़ा होना" },
  { muhavara: "नाक रगड़ना", meaning: "बहुत विनती/याचना करना" },
  { muhavara: "पापड़ बेलना", meaning: "कठिन परिश्रम करना" },
  { muhavara: "बगलें झाँकना", meaning: "उत्तर न सूझने पर इधर-उधर देखना" },
  { muhavara: "मक्खी पर मक्खी मारना", meaning: "बिना सोचे-समझे दूसरों की नकल करना" },
]

/* ------------------------------ rapid-quiz helpers ----------------------------- */

export type RapidCategory = "vilom" | "paryayvachi" | "muhavara"

export interface RapidQuestion {
  id: string
  category: RapidCategory
  prompt: string
  options: string[]
  correctAnswer: number
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function sample<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n)
}

function buildOptions(correct: string, pool: string[]): { options: string[]; correctAnswer: number } {
  // De-duplicate first — a handful of words legitimately share the same antonym
  // (e.g. दयालु is the vilom of both क्रूर and निर्दयी), and without this a
  // question could otherwise end up with the same distractor text twice.
  const uniquePool = [...new Set(pool)]
  const distractors = shuffle(uniquePool.filter((v) => v !== correct)).slice(0, 3)
  const options = shuffle([correct, ...distractors])
  return { options, correctAnswer: options.indexOf(correct) }
}

function vilomQuestion(item: VilomItem, all: VilomItem[]): RapidQuestion {
  const pool = all.map((v) => v.vilom)
  const { options, correctAnswer } = buildOptions(item.vilom, pool)
  return {
    id: `vilom-${item.word}`,
    category: "vilom",
    prompt: `'${item.word}' का विलोम शब्द है:`,
    options,
    correctAnswer,
  }
}

function paryayvachiQuestion(item: ParyayvachiItem, all: ParyayvachiItem[]): RapidQuestion {
  const correct = item.synonyms[Math.floor(Math.random() * item.synonyms.length)]
  const otherPool = all.filter((p) => p.word !== item.word).flatMap((p) => p.synonyms)
  const { options, correctAnswer } = buildOptions(correct, otherPool)
  return {
    id: `paryayvachi-${item.word}`,
    category: "paryayvachi",
    prompt: `'${item.word}' का पर्यायवाची शब्द है:`,
    options,
    correctAnswer,
  }
}

function muhavaraQuestion(item: MuhavaraItem, all: MuhavaraItem[]): RapidQuestion {
  const pool = all.map((m) => m.meaning)
  const { options, correctAnswer } = buildOptions(item.meaning, pool)
  return {
    id: `muhavara-${item.muhavara}`,
    category: "muhavara",
    prompt: `मुहावरा '${item.muhavara}' का सही अर्थ है:`,
    options,
    correctAnswer,
  }
}

/** Builds a shuffled, roughly even mix of vilom / paryayvachi / muhavara questions. */
export function generateRapidQuiz(count: number): RapidQuestion[] {
  const perCategory = Math.ceil(count / 3)

  const vilomQs = sample(VILOM_LIST, Math.min(perCategory, VILOM_LIST.length)).map((item) =>
    vilomQuestion(item, VILOM_LIST)
  )
  const paryayQs = sample(PARYAYVACHI_LIST, Math.min(perCategory, PARYAYVACHI_LIST.length)).map(
    (item) => paryayvachiQuestion(item, PARYAYVACHI_LIST)
  )
  const muhavaraQs = sample(MUHAVARE_LIST, Math.min(perCategory, MUHAVARE_LIST.length)).map((item) =>
    muhavaraQuestion(item, MUHAVARE_LIST)
  )

  return shuffle([...vilomQs, ...paryayQs, ...muhavaraQs]).slice(0, count)
}
