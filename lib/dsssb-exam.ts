// DSSSB Practise — attempt session persistence + scoring.
// All state is localStorage only, matching the rest of KiddoPrep.

import type { DsssbPaper, DsssbSectionId } from "./dsssb-papers"

const SESSION_KEY = (paperId: number) => `kiddoprep_dsssb_session_${paperId}`
const RESULT_KEY = (paperId: number) => `kiddoprep_dsssb_result_${paperId}`
const PROGRESS_KEY = "kiddoprep_dsssb_progress"

export type QuestionState =
  | "notVisited"
  | "notAnswered"
  | "answered"
  | "marked"
  | "answeredMarked"

export interface DsssbSession {
  paperId: number
  answers: (number | null)[] // length 200
  marked: boolean[]
  visited: boolean[]
  currentIndex: number
  remainingSeconds: number
  startedAt: number
  updatedAt: number
}

export interface SubsectionScore {
  id: string
  title: string
  section: DsssbSectionId
  total: number
  correct: number
  incorrect: number
  unattempted: number
  score: number
}

export interface DsssbResult {
  paperId: number
  answers: (number | null)[]
  marked: boolean[]
  correct: number
  incorrect: number
  unattempted: number
  attempted: number
  score: number
  maxScore: number
  accuracy: number // % of attempted that were correct
  timeTakenSeconds: number
  startedAt: number
  completedAt: number
  sectionScores: { section: DsssbSectionId; correct: number; incorrect: number; unattempted: number; score: number }[]
  subsectionScores: SubsectionScore[]
}

export interface DsssbProgress {
  attempts: Record<
    string,
    { count: number; bestScore: number; lastScore: number; lastAt: number }
  >
}

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

/* ---------------------------------- session --------------------------------- */

export function createSession(paper: DsssbPaper): DsssbSession {
  return {
    paperId: paper.id,
    answers: new Array(paper.totalQuestions).fill(null),
    marked: new Array(paper.totalQuestions).fill(false),
    visited: new Array(paper.totalQuestions).fill(false),
    currentIndex: 0,
    remainingSeconds: paper.durationMinutes * 60,
    startedAt: Date.now(),
    updatedAt: Date.now(),
  }
}

export function getSession(paperId: number): DsssbSession | null {
  if (typeof window === "undefined") return null
  const s = safeParse<DsssbSession>(localStorage.getItem(SESSION_KEY(paperId)))
  if (!s || !Array.isArray(s.answers)) return null
  return s
}

export function saveSession(session: DsssbSession) {
  if (typeof window === "undefined") return
  session.updatedAt = Date.now()
  try {
    localStorage.setItem(SESSION_KEY(session.paperId), JSON.stringify(session))
  } catch {
    /* quota — ignore */
  }
}

export function clearSession(paperId: number) {
  if (typeof window === "undefined") return
  localStorage.removeItem(SESSION_KEY(paperId))
}

/* ---------------------------------- scoring --------------------------------- */

export function scoreAttempt(
  paper: DsssbPaper,
  answers: (number | null)[],
  marked: boolean[],
  timeTakenSeconds: number,
  startedAt: number
): DsssbResult {
  let correct = 0
  let incorrect = 0
  let unattempted = 0

  const bySub = new Map<string, SubsectionScore>()
  paper.subsections.forEach((s) =>
    bySub.set(s.id, {
      id: s.id,
      title: s.title,
      section: s.section,
      total: s.count,
      correct: 0,
      incorrect: 0,
      unattempted: 0,
      score: 0,
    })
  )

  paper.questions.forEach((q, i) => {
    const bucket = bySub.get(q.subsectionId)!
    const given = answers[i]
    if (given === null || given === undefined) {
      unattempted++
      bucket.unattempted++
    } else if (given === q.correctAnswer) {
      correct++
      bucket.correct++
    } else {
      incorrect++
      bucket.incorrect++
    }
  })

  const subsectionScores = Array.from(bySub.values()).map((s) => ({
    ...s,
    score: round2(s.correct * paper.markPerCorrect - s.incorrect * paper.negativeMark),
  }))

  const sectionScores = (["A", "B"] as DsssbSectionId[]).map((sec) => {
    const rows = subsectionScores.filter((s) => s.section === sec)
    return {
      section: sec,
      correct: rows.reduce((a, r) => a + r.correct, 0),
      incorrect: rows.reduce((a, r) => a + r.incorrect, 0),
      unattempted: rows.reduce((a, r) => a + r.unattempted, 0),
      score: round2(rows.reduce((a, r) => a + r.score, 0)),
    }
  })

  const attempted = correct + incorrect

  return {
    paperId: paper.id,
    answers,
    marked,
    correct,
    incorrect,
    unattempted,
    attempted,
    score: round2(correct * paper.markPerCorrect - incorrect * paper.negativeMark),
    maxScore: paper.totalQuestions * paper.markPerCorrect,
    accuracy: attempted > 0 ? round2((correct / attempted) * 100) : 0,
    timeTakenSeconds,
    startedAt,
    completedAt: Date.now(),
    sectionScores,
    subsectionScores,
  }
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

/* ---------------------------------- results --------------------------------- */

export function saveResult(result: DsssbResult) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(RESULT_KEY(result.paperId), JSON.stringify(result))
  } catch {
    /* ignore */
  }

  const progress = getProgress()
  const key = String(result.paperId)
  const prev = progress.attempts[key]
  progress.attempts[key] = {
    count: (prev?.count ?? 0) + 1,
    bestScore: prev ? Math.max(prev.bestScore, result.score) : result.score,
    lastScore: result.score,
    lastAt: result.completedAt,
  }
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  } catch {
    /* ignore */
  }
}

export function getResult(paperId: number): DsssbResult | null {
  if (typeof window === "undefined") return null
  return safeParse<DsssbResult>(localStorage.getItem(RESULT_KEY(paperId)))
}

export function getProgress(): DsssbProgress {
  if (typeof window === "undefined") return { attempts: {} }
  const p = safeParse<DsssbProgress>(localStorage.getItem(PROGRESS_KEY))
  if (!p || typeof p.attempts !== "object" || p.attempts === null) return { attempts: {} }
  return p
}

/* ---------------------------------- helpers --------------------------------- */

export function questionState(
  index: number,
  answers: (number | null)[],
  marked: boolean[],
  visited: boolean[]
): QuestionState {
  const answered = answers[index] !== null && answers[index] !== undefined
  const isMarked = !!marked[index]
  if (isMarked && answered) return "answeredMarked"
  if (isMarked) return "marked"
  if (answered) return "answered"
  if (visited[index]) return "notAnswered"
  return "notVisited"
}

export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n: number) => String(n).padStart(2, "0")
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`
}

export function formatDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  const sec = s % 60
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`
}
