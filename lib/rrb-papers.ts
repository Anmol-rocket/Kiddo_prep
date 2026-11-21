// RRB Practise — Railway Recruitment Board Paramedical CBT (Radiographer / X-Ray Technician)
// Single-stage CBT: 100 MCQs / 100 marks / 90 minutes / -1/3 negative marking.
// Types + exam blueprint metadata. Question data lives in lib/rrb-questions.ts
// so the landing page never has to pull in the full question bank.

export type RrbSectionId = "A" | "B"

export interface RrbQuestion {
  id: string // "p1_q1"
  no: number // 1..100
  section: RrbSectionId
  subsectionId: string // "a1".."b3"
  subject: string
  question: string
  options: string[] // exactly 4
  correctAnswer: number // 0-indexed
  explanation: string
}

export interface RrbSubsection {
  id: string
  section: RrbSectionId
  title: string
  start: number
  end: number
  count: number
}

export interface RrbPaper {
  id: number
  name: string
  subtitle: string
  code: string
  totalQuestions: number
  durationMinutes: number
  markPerCorrect: number
  negativeMark: number
  subsections: RrbSubsection[]
  questions: RrbQuestion[]
}

export const RRB_EXAM = {
  board: "Railway Recruitment Board (Paramedical Categories)",
  post: "Radiographer / X-Ray Technician",
  stage: "Single-stage CBT (Objective / MCQ) + Document Verification",
  durationMinutes: 90,
  totalQuestions: 100,
  totalMarks: 100,
  markPerCorrect: 1,
  negativeMark: 1 / 3,
  medium: "15 languages incl. Hindi & English",
} as const

export interface BlueprintRow {
  subsectionId: string
  name: string
  questions: number
  marks: number
  topics: string
}

export interface BlueprintSection {
  section: RrbSectionId
  title: string
  caption: string
  marks: number
  rows: BlueprintRow[]
}

export const RRB_SUBSECTIONS: RrbSubsection[] = [
  { id: "a1", section: "A", title: "Human Anatomy & Physiology", start: 1, end: 12, count: 12 },
  { id: "a2", section: "A", title: "Radiation Physics & X-ray Equipment", start: 13, end: 28, count: 16 },
  { id: "a3", section: "A", title: "Clinical Radiography — Positioning", start: 29, end: 44, count: 16 },
  { id: "a4", section: "A", title: "Image Processing, Darkroom & Image Quality", start: 45, end: 52, count: 8 },
  { id: "a5", section: "A", title: "Radiation Protection, Contrast & Special Procedures", start: 53, end: 62, count: 10 },
  { id: "a6", section: "A", title: "CT, MRI, USG, Nuclear Medicine & Patient Care", start: 63, end: 70, count: 8 },
  { id: "b1", section: "B", title: "General Awareness", start: 71, end: 80, count: 10 },
  { id: "b2", section: "B", title: "General Arithmetic, Intelligence & Reasoning", start: 81, end: 90, count: 10 },
  { id: "b3", section: "B", title: "General Science", start: 91, end: 100, count: 10 },
]

export const RRB_BLUEPRINT: BlueprintSection[] = [
  {
    section: "A",
    title: "Professional Ability — Radiographer",
    caption: "70 questions · the deciding section",
    marks: 70,
    rows: [
      { subsectionId: "a1", name: "Human Anatomy & Physiology", questions: 12, marks: 12,
        topics: "Skeleton & surface landmarks, joints, skull & sinuses, thorax, abdomen, GI/urinary tract, cardiovascular & nervous system basics" },
      { subsectionId: "a2", name: "Radiation Physics & X-ray Equipment", questions: 16, marks: 16,
        topics: "Atomic structure, EM spectrum, X-ray production (Bremsstrahlung/characteristic), tube & anode, heel effect, kVp/mA/mAs, inverse square law, HVL, filtration, interactions, rectification, grids, AEC, units" },
      { subsectionId: "a3", name: "Clinical Radiography — Positioning", questions: 16, marks: 16,
        topics: "Standard & special views: chest, skull (Caldwell, Waters, Towne, SMV), spine, upper & lower limb, pelvis/hip, abdomen, centring points and baselines" },
      { subsectionId: "a4", name: "Image Processing, Darkroom & Image Quality", questions: 8, marks: 8,
        topics: "Film structure, intensifying screens, developer/fixer chemistry, safelight, artefacts, density/contrast/sharpness, CR/DR, PACS/DICOM" },
      { subsectionId: "a5", name: "Radiation Protection, Contrast & Special Procedures", questions: 10, marks: 10,
        topics: "ALARA, AERB dose limits, TLD, lead aprons, 10-day rule, contrast media & reactions, barium studies, IVU, HSG, MCU, angiography" },
      { subsectionId: "a6", name: "CT, MRI, USG, Nuclear Medicine & Patient Care", questions: 8, marks: 8,
        topics: "Hounsfield units, CT generations, MRI basics & safety, ultrasound physics, Tc-99m, mammography, medical ethics, first aid & emergencies, infection control" },
    ],
  },
  {
    section: "B",
    title: "General Sections",
    caption: "30 questions · 10 each",
    marks: 30,
    rows: [
      { subsectionId: "b1", name: "General Awareness", questions: 10, marks: 10,
        topics: "Indian polity, history, geography, economy, Indian Railways, sports, awards, important days, static GK" },
      { subsectionId: "b2", name: "General Arithmetic, Intelligence & Reasoning", questions: 10, marks: 10,
        topics: "Percentage, ratio, profit & loss, SI/CI, time & work, speed, average • series, coding-decoding, analogy, blood relations, direction" },
      { subsectionId: "b3", name: "General Science", questions: 10, marks: 10,
        topics: "Physics, Chemistry & Life Sciences up to Class 10 (CBSE) level" },
    ],
  },
]

export interface RrbPaperMeta {
  id: number
  name: string
  subtitle: string
  code: string
  totalQuestions: number
  durationMinutes: number
}

export const rrbPaperList: RrbPaperMeta[] = [
  { id: 1, name: "Practice Paper 1", subtitle: "RRB Radiographer / X-Ray Technician — Full CBT Mock", code: "RRB/PARAMED/RAD/PP-01", totalQuestions: 100, durationMinutes: 90 },
  { id: 2, name: "Practice Paper 2", subtitle: "RRB Radiographer / X-Ray Technician — Full CBT Mock", code: "RRB/PARAMED/RAD/PP-02", totalQuestions: 100, durationMinutes: 90 },
  { id: 3, name: "Practice Paper 3", subtitle: "RRB Radiographer / X-Ray Technician — Full CBT Mock (Moderate–Tough)", code: "RRB/PARAMED/RAD/PP-03", totalQuestions: 100, durationMinutes: 90 },
]

export const RRB_STRATEGY: string[] = [
  "90 minutes for 100 questions — 54 seconds per question. Clear the 30 general questions in ~20 minutes and keep 70 for Professional Ability.",
  "Professional Ability is 70% of the paper and decides the merit list. Positioning, X-ray physics and darkroom/processing are the highest-yield areas.",
  "Negative marking is -1/3. A pure 4-option guess has negative expected value — attempt only when you can eliminate at least two options.",
  "The RRB CBT has no sectional timing or cut-off; you can jump between any questions using the palette. Use Mark for Review on doubtful ones and revisit at the end.",
  "Qualifying marks: UR/EWS 40%, OBC/SC 30%, ST 25% (can be relaxed by 2% for PwBD). Merit is on normalised CBT score.",
]
