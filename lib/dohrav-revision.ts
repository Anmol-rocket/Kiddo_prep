export interface RevisionBankEntry {
  questionId: string          // "p1_q1" format
  paperId: number
  masteryScore: number        // 0-3 (3 consecutive correct = mastered)
  incorrectCount: number      // Times answered wrong in tests
  revisionAttempts: number
  correctRevisions: number
  lastRevisedAt: number | null
  addedAt: number
  isActive: boolean
  isMastered: boolean
}

export interface TestProgress {
  completedPapers: number[]   // array of paper IDs completed
  currentPaper: number        // next paper to attempt
  gateRequired: boolean       // whether revision gate is needed before next test
  lastTestCompletedAt: number | null
}

export interface TestResult {
  paperId: number
  totalQuestions: number
  correct: number
  incorrect: number
  skipped: number
  answers: Array<{
    questionId: string
    selectedOption: number | null
    isCorrect: boolean | null
    timeTaken: number
  }>
  completedAt: number
}

export interface GateResult {
  passed: boolean
  correct: number
  total: number
  answers: Array<{
    questionId: string
    isCorrect: boolean
  }>
}

const BANK_KEY = "kiddoprep_dohrav_revision_bank"
const PROGRESS_KEY = "kiddoprep_dohrav_test_progress"

export function getRevisionBank(): RevisionBankEntry[] {
  try {
    const data = localStorage.getItem(BANK_KEY)
    return data ? JSON.parse(data) : []
  } catch (e) {
    console.error("Error reading revision bank:", e)
    return []
  }
}

export function saveRevisionBank(bank: RevisionBankEntry[]): void {
  try {
    localStorage.setItem(BANK_KEY, JSON.stringify(bank))
  } catch (e) {
    console.error("Error saving revision bank:", e)
  }
}

export function addToRevisionBank(questionId: string, paperId: number): void {
  const bank = getRevisionBank()
  const existingIndex = bank.findIndex(e => e.questionId === questionId)

  if (existingIndex >= 0) {
    const entry = bank[existingIndex]
    entry.incorrectCount++
    entry.isActive = true
    entry.isMastered = false
    entry.masteryScore = 0 // Reset mastery if they get it wrong again in a test
  } else {
    bank.push({
      questionId,
      paperId,
      masteryScore: 0,
      incorrectCount: 1,
      revisionAttempts: 0,
      correctRevisions: 0,
      lastRevisedAt: null,
      addedAt: Date.now(),
      isActive: true,
      isMastered: false
    })
  }

  saveRevisionBank(bank)
}

export function removeFromRevisionBank(questionId: string): void {
  const bank = getRevisionBank()
  const updatedBank = bank.filter(e => e.questionId !== questionId)
  saveRevisionBank(updatedBank)
}

export function updateMasteryAfterRevision(questionId: string, isCorrect: boolean): void {
  const bank = getRevisionBank()
  const entry = bank.find(e => e.questionId === questionId)
  
  if (entry) {
    entry.revisionAttempts++
    entry.lastRevisedAt = Date.now()
    
    if (isCorrect) {
      entry.correctRevisions++
      entry.masteryScore++
      if (entry.masteryScore >= 3) {
        entry.isMastered = true
        entry.isActive = false
      }
    } else {
      entry.masteryScore = 0 // Reset to 0 on failure
    }
    
    saveRevisionBank(bank)
  }
}

export function getGateQuestions(count: number = 5): string[] {
  const bank = getRevisionBank()
  const activeQuestions = bank.filter(e => e.isActive && !e.isMastered)
  
  if (activeQuestions.length === 0) return []
  
  // Calculate priority score for each
  const now = Date.now()
  const scored = activeQuestions.map(q => {
    // Days since last revision (or since added if never revised)
    const refDate = q.lastRevisedAt || q.addedAt
    const daysSince = Math.min(10, (now - refDate) / (1000 * 60 * 60 * 24))
    
    // Priority formula: (incorrectCount * 3) + ((3 - masteryScore) * 2) + staleness_bonus
    const score = (q.incorrectCount * 3) + ((3 - q.masteryScore) * 2) + daysSince
    
    // Add small random jitter (0-1) to mix up questions with same scores
    const jitter = Math.random()
    
    return { ...q, priorityScore: score + jitter }
  })
  
  // Sort descending by priority score
  scored.sort((a, b) => b.priorityScore - a.priorityScore)
  
  // Return top N question IDs
  return scored.slice(0, count).map(q => q.questionId)
}

export function getTestProgress(): TestProgress {
  try {
    const data = localStorage.getItem(PROGRESS_KEY)
    if (data) return JSON.parse(data)
  } catch (e) {
    console.error("Error reading test progress:", e)
  }
  
  // Default fresh progress
  return {
    completedPapers: [],
    currentPaper: 1,
    gateRequired: false,
    lastTestCompletedAt: null
  }
}

export function saveTestProgress(progress: TestProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  } catch (e) {
    console.error("Error saving test progress:", e)
  }
}

export function isGateRequired(): boolean {
  const progress = getTestProgress()
  const bank = getRevisionBank()
  const activeCount = bank.filter(e => e.isActive && !e.isMastered).length
  
  // Gate is required if it's flagged in progress AND there are active questions
  return progress.gateRequired && activeCount > 0 && progress.completedPapers.length > 0
}

export function recordTestResult(result: TestResult): void {
  // 1. Save result
  try {
    localStorage.setItem(`kiddoprep_dohrav_test_results_${result.paperId}`, JSON.stringify(result))
  } catch (e) {
    console.error("Error saving test result:", e)
  }
  
  // 2. Add incorrect and skipped to bank
  result.answers.forEach(ans => {
    if (ans.isCorrect === false || ans.isCorrect === null) {
      addToRevisionBank(ans.questionId, result.paperId)
    }
  })
  
  // 3. Update progress
  const progress = getTestProgress()
  if (!progress.completedPapers.includes(result.paperId)) {
    progress.completedPapers.push(result.paperId)
  }
  progress.currentPaper = Math.max(progress.currentPaper, result.paperId + 1)
  progress.lastTestCompletedAt = Date.now()
  progress.gateRequired = true // Require gate before next test
  
  saveTestProgress(progress)
}

export function recordGateAttempt(result: GateResult): void {
  // 1. Update mastery for each question
  result.answers.forEach(ans => {
    updateMasteryAfterRevision(ans.questionId, ans.isCorrect)
  })
  
  // 2. If passed, clear gate requirement
  if (result.passed) {
    const progress = getTestProgress()
    progress.gateRequired = false
    saveTestProgress(progress)
  }
}

export function getRevisionStats(): { total: number, active: number, mastered: number, avgMastery: number } {
  const bank = getRevisionBank()
  const total = bank.length
  const active = bank.filter(e => e.isActive && !e.isMastered).length
  const mastered = bank.filter(e => e.isMastered).length
  
  let avgMastery = 0
  if (active > 0) {
    const activeQuestions = bank.filter(e => e.isActive && !e.isMastered)
    const totalMastery = activeQuestions.reduce((sum, e) => sum + e.masteryScore, 0)
    avgMastery = totalMastery / (activeQuestions.length * 3) // % of way to 3 mastery
  }
  
  return { total, active, mastered, avgMastery }
}

export function getTestResult(paperId: number): TestResult | null {
  try {
    const data = localStorage.getItem(`kiddoprep_dohrav_test_results_${paperId}`)
    return data ? JSON.parse(data) : null
  } catch (e) {
    console.error("Error reading test result:", e)
    return null
  }
}

export function getDohravStats() {
  const progress = getTestProgress()
  let totalAttempted = 0, totalCorrect = 0, totalIncorrect = 0
  
  progress.completedPapers.forEach(pid => {
    const res = getTestResult(pid)
    if (res) {
      totalAttempted += res.totalQuestions
      totalCorrect += res.correct
      totalIncorrect += res.incorrect
    }
  })
  
  return {
    totalAttempted,
    totalCorrect,
    totalIncorrect,
    papersCompleted: progress.completedPapers.length
  }
}
