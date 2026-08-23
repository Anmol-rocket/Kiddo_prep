// DSSSB Practise — Delhi Subordinate Services Selection Board (Radiographer)
// Tier-1 objective paper: 200 MCQs / 200 marks / 120 minutes / -0.25 negative marking.
// Types + exam blueprint metadata. Question data lives in lib/dsssb-questions.ts
// so the landing page never has to pull in the full question bank.

export type DsssbSectionId = "A" | "B"

export interface DsssbQuestion {
  id: string // "p1_q1"
  no: number // 1..200
  section: DsssbSectionId
  subsectionId: string // "a1".."b5"
  subject: string
  question: string
  options: string[] // exactly 4
  correctAnswer: number // 0-indexed
  explanation: string
}

export interface DsssbSubsection {
  id: string
  section: DsssbSectionId
  title: string
  start: number // first question no (1-indexed, inclusive)
  end: number // last question no (inclusive)
  count: number
}

export interface DsssbPaper {
  id: number
  name: string
  subtitle: string
  code: string
  totalQuestions: number
  durationMinutes: number
  markPerCorrect: number
  negativeMark: number
  subsections: DsssbSubsection[]
  questions: DsssbQuestion[]
}

export const DSSSB_EXAM = {
  board: "Delhi Subordinate Services Selection Board",
  post: "Radiographer",
  stage: "Single-stage Tier-1 (Objective / MCQ)",
  durationMinutes: 120,
  totalQuestions: 200,
  totalMarks: 200,
  markPerCorrect: 1,
  negativeMark: 0.25,
  medium: "Bilingual (Hindi & English)",
} as const

export interface BlueprintRow {
  subsectionId: string
  name: string
  questions: number
  marks: number
  topics: string
}

export interface BlueprintSection {
  section: DsssbSectionId
  title: string
  caption: string
  marks: number
  rows: BlueprintRow[]
}

export const DSSSB_BLUEPRINT: BlueprintSection[] = [
  {
    section: "A",
    title: "Section A — General / Non-Technical",
    caption: "5 subjects × 20 questions",
    marks: 100,
    rows: [
      {
        subsectionId: "a1",
        name: "General Intelligence & Reasoning",
        questions: 20,
        marks: 20,
        topics:
          "Series, Analogy, Classification, Coding-Decoding, Blood Relations, Seating Arrangement, Direction Sense, Mathematical Operations",
      },
      {
        subsectionId: "a2",
        name: "General Awareness",
        questions: 20,
        marks: 20,
        topics:
          "General Science (Biology-weighted), Polity & Constitution, History, Geography, Delhi GK, Sports, Art & Culture",
      },
      {
        subsectionId: "a3",
        name: "Arithmetical & Numerical Ability",
        questions: 20,
        marks: 20,
        topics:
          "Averages, Percentages, Profit & Loss, Ratio & Proportion, SI & CI, Time-Work-Distance, HCF & LCM, Simplification",
      },
      {
        subsectionId: "a4",
        name: "English Language & Comprehension",
        questions: 20,
        marks: 20,
        topics:
          "Synonyms, Antonyms, Idioms & Phrases, One-word Substitution, Spotting Errors, Fill in the Blanks, Sentence Improvement",
      },
      {
        subsectionId: "a5",
        name: "Hindi Language & Comprehension",
        questions: 20,
        marks: 20,
        topics:
          "पर्यायवाची, विलोम, मुहावरे-लोकोक्तियाँ, वाक्यांश के लिए एक शब्द, वाक्य शुद्धि, संधि-समास, तत्सम-तद्भव, व्याकरण",
      },
    ],
  },
  {
    section: "B",
    title: "Section B — Radiography Technical Domain",
    caption: "5 sub-disciplines × 20 questions",
    marks: 100,
    rows: [
      {
        subsectionId: "b1",
        name: "Human Anatomy & Physiology",
        questions: 20,
        marks: 20,
        topics:
          "Skeletal system & positioning landmarks, cross-sectional thorax/abdomen, neuro-anatomy, cardiovascular system, applied physiology",
      },
      {
        subsectionId: "b2",
        name: "Pathology & Patient Care",
        questions: 20,
        marks: 20,
        topics:
          "Inflammation, necrosis, neoplasia, clinical terminology, disease appearances on imaging • Consent, confidentiality, infection control, BMW rules, emergencies",
      },
      {
        subsectionId: "b3",
        name: "MRI & CT Imaging",
        questions: 20,
        marks: 20,
        topics:
          "Larmor frequency, T1/T2, pulse sequences, gadolinium, MR artifacts & safety zones • CT generations, Hounsfield units, windowing, pitch, CTDIvol & DLP",
      },
      {
        subsectionId: "b4",
        name: "Radiation Physics & Safety",
        questions: 20,
        marks: 20,
        topics:
          "ALARA, Gy/Sv/Bq, TLD & OSL monitoring, AERB dose limits, HVL & shielding, radiobiology • X-ray production, tube rating, kVp/mAs, grids, CR/DR",
      },
      {
        subsectionId: "b5",
        name: "USG, Mammography & Special Procedures",
        questions: 20,
        marks: 20,
        topics:
          "Ultrasound physics, transducers, Doppler • Mammography equipment, CC/MLO, BI-RADS • Barium studies, IVU, angiography, contrast media & reactions • Gamma camera, SPECT/PET, radiotherapy basics",
      },
    ],
  },
]

export interface DsssbPaperMeta {
  id: number
  name: string
  subtitle: string
  code: string
  totalQuestions: number
  durationMinutes: number
}

export const dsssbPaperList: DsssbPaperMeta[] = [
  {
    id: 1,
    name: "Practice Paper 1",
    subtitle: "DSSSB Radiographer — Full Mock (Tier-1)",
    code: "DSSSB/RAD/PP-01",
    totalQuestions: 200,
    durationMinutes: 120,
  },
  {
    id: 2,
    name: "Practice Paper 2",
    subtitle: "DSSSB Radiographer — Full Mock (Tier-1)",
    code: "DSSSB/RAD/PP-02",
    totalQuestions: 200,
    durationMinutes: 120,
  },
  {
    id: 3,
    name: "Practice Paper 3",
    subtitle: "DSSSB Radiographer — Full Mock (Tier-1)",
    code: "DSSSB/RAD/PP-03",
    totalQuestions: 200,
    durationMinutes: 120,
  },
  {
    id: 4,
    name: "Practice Paper 4",
    subtitle: "DSSSB Radiographer — Full Mock (Tier-1)",
    code: "DSSSB/RAD/PP-04",
    totalQuestions: 200,
    durationMinutes: 120,
  },
]

export const DSSSB_STRATEGY: string[] = [
  "120 minutes for 200 questions — under 36 seconds per question. Never let one question eat your clock.",
  "Section B is half the paper. Anatomy, MRI, Radiation Safety and Pathology alone cover ~50% of the technical domain.",
  "In Section A, Series/Analogy in Reasoning, Averages/Percentage/Profit-Loss in Maths and Biology in GA give the fastest marks.",
  "Negative marking is -0.25. A blind guess between 4 options is break-even at best — eliminate at least one option before guessing.",
]
