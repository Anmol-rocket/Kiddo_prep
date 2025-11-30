"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Timer from "./timer"
import QuestionCard from "./question-card"
import { questions } from "@/lib/questions"

interface QuizProps {
  topicId: string
  timePerQuestion: number
  mode: "topic" | "random" | "all"
  onComplete: (results: any) => void
}

interface Answer {
  questionId: number
  topicId: string
  selectedOption: number | null
  isCorrect: boolean | null
  timeTaken: number
  attempted: boolean
}

export default function Quiz({ topicId, timePerQuestion, mode, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [timeLeft, setTimeLeft] = useState(timePerQuestion)
  const [isAnswering, setIsAnswering] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [locked, setLocked] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  const [showQuitConfirm, setShowQuitConfirm] = useState(false)

  // Helper: seed-based RNG (xmur3 -> mulberry32)
  const xmur3 = (str: string) => {
    let h = 1779033703 ^ str.length
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
      h = (h << 13) | (h >>> 19)
    }
    return () => {
      h = Math.imul(h ^ (h >>> 16), 2246822507)
      h = Math.imul(h ^ (h >>> 13), 3266489909)
      return (h ^= h >>> 16) >>> 0
    }
  }

  const mulberry32 = (a: number) => {
    return () => {
      let t = (a += 0x6d2b79f5)
      t = Math.imul(t ^ (t >>> 15), t | 1)
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
  }

  const seededShuffle = <T,>(arr: T[], seedStr: string) => {
    const seed = xmur3(seedStr)()
    const rand = mulberry32(seed)
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  // quizQuestions will be initialized on the client inside useEffect to avoid
  // any server/client randomness causing hydration mismatches.
  const [quizQuestions, setQuizQuestions] = useState<any[]>([])

  // current question reference
  const currentQuestion = quizQuestions[currentQuestionIndex]

  // When topic/mode changes, or on mount, ensure we have a reproducible selection stored for this topic attempt
  useEffect(() => {
    const topicData = questions.topics.find((t) => t.id === topicId)
    if (!topicData) {
      setQuizQuestions([])
      return
    }

    const storageKey = `kiddoprep_selection_${topicId}`
    const sessionKey = `kiddoprep_session_${topicId}`

    try {
      // Attempt to restore an in-progress session first
      const rawSession = localStorage.getItem(sessionKey)
      if (rawSession) {
        try {
          const session = JSON.parse(rawSession)
          if (session && session.mode === mode && Array.isArray(session.quizQuestionIds) && session.quizQuestionIds.length > 0) {
            const restored = session.quizQuestionIds
              .map((id: number) => topicData.questions.find((q) => q.id === id))
              .filter(Boolean)
            if (restored.length > 0) {
              setQuizQuestions(restored as any)
              setCurrentQuestionIndex(session.currentQuestionIndex ?? 0)
              setTimeLeft(session.timeLeft ?? timePerQuestion)
              setSelectedOption(session.selectedOption ?? null)
              setAnswers(session.answers ?? [])
              setLocked(session.locked ?? false)
              setSubmitted(session.submitted ?? false)
              setSkipped(session.skipped ?? false)
              setIsAnswering(session.isAnswering ?? false)
              return
            }
          }
        } catch (e) {
          console.warn("Failed to parse saved session:", e)
        }
      }

      // No session — build quizQuestions based on mode
      if (mode === "topic") {
        // default topic mode: if more than 10 questions, pick a reproducible random 10-question subset
        if (topicData.questions.length > 10) {
          const raw = localStorage.getItem(storageKey)
          if (raw) {
            const parsed = JSON.parse(raw)
            if (parsed?.ids && Array.isArray(parsed.ids)) {
              const selected = parsed.ids
                .map((id: number) => topicData.questions.find((q) => q.id === id))
                .filter(Boolean)
              if (selected.length > 0) {
                setQuizQuestions(selected as any)
                return
              }
            }
          }

          // No valid stored selection: generate seeded selection and persist it
          const seed = String(Date.now())
          const shuffled = seededShuffle(topicData.questions, seed)
          const selected = shuffled.slice(0, 10)
          const ids = selected.map((q) => q.id)
          localStorage.setItem(storageKey, JSON.stringify({ ids, seed, ts: Date.now() }))
          setQuizQuestions(selected)
          return
        }

        // <= 10 questions: use them all
        setQuizQuestions(topicData.questions)
        return
      }

      if (mode === "all") {
        // Attempt all questions available in the topic (no limiting)
        setQuizQuestions(topicData.questions)
        return
      }

      // random mode: shuffle all questions (no persist)
      setQuizQuestions([...topicData.questions].sort(() => Math.random() - 0.5))
    } catch (e) {
      console.error("Error building quiz questions:", e)
      setQuizQuestions(topicData.questions)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, mode])

  // Persist session to localStorage so page refresh can restore quiz state
  useEffect(() => {
    try {
      const sessionKey = `kiddoprep_session_${topicId}`
      const payload = {
        mode,
        quizQuestionIds: quizQuestions.map((q: any) => q.id),
        currentQuestionIndex,
        timeLeft,
        selectedOption,
        answers,
        locked,
        submitted,
        skipped,
        isAnswering,
        timePerQuestion,
        ts: Date.now(),
      }
      localStorage.setItem(sessionKey, JSON.stringify(payload))
    } catch (e) {
      // ignore
    }
  }, [topicId, mode, quizQuestions, currentQuestionIndex, timeLeft, selectedOption, answers, locked, submitted, skipped, isAnswering, timePerQuestion])

  // Timer effect
  useEffect(() => {
    // pause timer while user has selected/answered/submitted/skipped
    if (isAnswering || submitted || skipped) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // auto-skip when timer runs out
          handleAutoSkip()
          return timePerQuestion
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isAnswering, timePerQuestion, submitted, skipped])

  // Touch handlers for swipe navigation (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
    setTouchEndX(null)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX
    setTouchEndX(endX)
    if (touchStartX === null) return
    const delta = touchStartX - endX
    const threshold = 50 // px
    if (delta > threshold) {
      // swipe left -> next
      moveToNext()
    } else if (delta < -threshold) {
      // swipe right -> previous
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
        setTimeLeft(timePerQuestion)
        setSelectedOption(null)
        setIsAnswering(false)
        setLocked(false)
        setSubmitted(false)
        setSkipped(false)
      }
    }
  }

  const handleSelectOption = (optionIndex: number) => {
    // Allow changing selection freely until the question is submitted, skipped or time expires
    if (locked || skipped) return
    setSelectedOption(optionIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return

    const isCorrect = selectedOption === currentQuestion.correctAnswer
    const answer: Answer = {
      questionId: currentQuestion.id,
      topicId,
      selectedOption,
      isCorrect,
      timeTaken: timePerQuestion - timeLeft,
      attempted: true,
    }

    setAnswers([...answers, answer])
    // mark as locked (submitted) but DO NOT reveal correctness/explanation now.
    setSubmitted(true)
    setIsAnswering(true) // stop the timer
    setLocked(true)
  }

  const handleSkipQuestion = () => {
    // user-initiated skip: record skipped answer (use full question time), don't advance - allow explanation view
    const answer: Answer = {
      questionId: currentQuestion.id,
      topicId,
      selectedOption: null,
      isCorrect: null,
      timeTaken: timePerQuestion,
      attempted: false,
    }

    setAnswers([...answers, answer])
    setSkipped(true)
    setIsAnswering(true) // stop timer
  }

  const handleAutoSkip = () => {
    // auto skip invoked by timer expiry; behave like user skip but mark full time taken
    const answer: Answer = {
      questionId: currentQuestion.id,
      topicId,
      selectedOption: null,
      isCorrect: null,
      timeTaken: timePerQuestion,
      attempted: false,
    }

    setAnswers([...answers, answer])
    setSkipped(true)
    setIsAnswering(true)
  }

  const handleUndoSkip = () => {
    // remove last saved skipped answer for current question
    setAnswers((prev) => {
      const copy = [...prev]
      // find last index matching current question id
      for (let i = copy.length - 1; i >= 0; i--) {
        if (copy[i].questionId === currentQuestion.id && copy[i].attempted === false && copy[i].selectedOption === null) {
          copy.splice(i, 1)
          break
        }
      }
      return copy
    })

    setSkipped(false)
    setSubmitted(false)
    setSelectedOption(null)
    setIsAnswering(false)
    setTimeLeft(timePerQuestion)
  }

  const moveToNext = () => {
    if (currentQuestionIndex + 1 >= quizQuestions.length) {
      finishQuiz()
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTimeLeft(timePerQuestion)
      setSelectedOption(null)
      setIsAnswering(false)
      setLocked(false)
      setSubmitted(false)
      setSkipped(false)
    }
  }

  const finishQuiz = () => {
    const stats = calculateStats()
    saveStats(stats)
    // clear any persisted selection for this topic so next quiz gets a fresh selection
    try {
      const storageKey = `kiddoprep_selection_${topicId}`
      localStorage.removeItem(storageKey)
    } catch (e) {
      /* ignore */
    }
    // clear persisted session
    try {
      const sessionKey = `kiddoprep_session_${topicId}`
      localStorage.removeItem(sessionKey)
    } catch (e) {
      /* ignore */
    }
    onComplete(stats)
  }

  const calculateStats = () => {
    let score = 0
    let correct = 0
    let incorrect = 0
    let unattempted = 0
    let totalTime = 0

    answers.forEach((answer) => {
      if (!answer.attempted) {
        unattempted++
      } else if (answer.isCorrect) {
        score += 4
        correct++
      } else {
        score -= 1
        incorrect++
      }
      totalTime += answer.timeTaken
    })

    return {
      topicId,
      totalQuestions: quizQuestions.length,
      attempted: answers.filter((a) => a.attempted).length,
      correct,
      incorrect,
      unattempted,
      score,
      avgTime: answers.length > 0 ? totalTime / answers.length : 0,
      answers,
      quizQuestionIds: quizQuestions.map((q: any) => q.id),
      timestamp: new Date().toISOString(),
    }
  }

  const saveStats = (stats: any) => {
    try {
      const existingStats = localStorage.getItem("kiddoprep_stats")
      const statsObj = existingStats ? JSON.parse(existingStats) : {}

      const topicStats = statsObj[topicId] || {
        attempted: 0,
        correct: 0,
        incorrect: 0,
        unattempted: 0,
        score: 0,
        avgTime: 0,
        attempts: [],
      }

      topicStats.attempted += stats.attempted
      topicStats.correct += stats.correct
      topicStats.incorrect += stats.incorrect
      topicStats.unattempted += stats.unattempted
      topicStats.score += stats.score

      const prevAvgTime = topicStats.avgTime * (topicStats.attempts?.length || 0)
      topicStats.avgTime = (prevAvgTime + stats.avgTime) / ((topicStats.attempts?.length || 0) + 1)

      if (!topicStats.attempts) topicStats.attempts = []
      topicStats.attempts.push(stats)

      statsObj[topicId] = topicStats
      localStorage.setItem("kiddoprep_stats", JSON.stringify(statsObj))
    } catch (e) {
      console.error("Error saving stats:", e)
    }
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground mb-2">Loading...</div>
        </div>
      </div>
    )
  }

  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 p-4 md:p-8 quiz-container-mobile">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </div>
          <div className="flex items-center gap-3">
            <Timer timeLeft={timeLeft} totalTime={timePerQuestion} isAnswering={isAnswering} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-card/50 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto mb-6 animate-slide-in" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <QuestionCard
          question={currentQuestion}
          selectedOption={selectedOption}
          onSelectOption={handleSelectOption}
          isAnswering={isAnswering}
          explanationAvailable={false}
          skipped={skipped}
          openExplanation={false}
          wasCorrect={null}
        />
      </div>

      {/* Action Buttons */}
      <div className="max-w-2xl mx-auto stack-on-mobile">
        {/* Quit button for Attempt All mode */}
        {mode === "all" && (
          <div className="mb-3 flex justify-end">
            <Button variant="destructive" onClick={() => setShowQuitConfirm(true)} className="touch-target">
              Quit Quiz
            </Button>
          </div>
        )}
        {!locked && !skipped ? (
          selectedOption === null ? (
            <Button onClick={handleSkipQuestion} variant="outline" className="flex-1 bg-transparent w-full touch-target">
              Skip Question
            </Button>
          ) : (
            <>
              <Button onClick={handleSkipQuestion} variant="outline" className="flex-1 bg-transparent w-full touch-target">
                Skip
              </Button>
              <Button onClick={handleSubmitAnswer} disabled={selectedOption === null} className="flex-1 btn-primary w-full touch-target">
                Submit Answer
              </Button>
            </>
          )
        ) : (
          // when skipped or submitted show Next; if skipped allow undo
          <>
            {skipped && (
              <Button onClick={handleUndoSkip} variant="outline" className="flex-1 bg-transparent w-full touch-target">
                Undo Skip
              </Button>
            )}
            <Button onClick={moveToNext} className="flex-1 btn-primary w-full touch-target">
              Next Question
            </Button>
          </>
        )}
      </div>

        {/* Quit confirmation dialog (visible when user attempts to quit Attempt All) */}
        <Dialog open={showQuitConfirm} onOpenChange={setShowQuitConfirm}>
          <DialogContent>
            <DialogTitle>Quit Quiz</DialogTitle>
            <DialogDescription>
              Progress up to this point will be evaluated and your score will be calculated from the questions you have attempted so far. Are you sure you want to quit?
            </DialogDescription>
            <div className="mt-4 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowQuitConfirm(false)}>
                Stay
              </Button>
              <Button
                className="btn-primary"
                onClick={() => {
                  // finishQuiz will calculate stats based on recorded answers only
                  setShowQuitConfirm(false)
                  finishQuiz()
                }}
              >
                Quit and Evaluate
              </Button>
            </div>
          </DialogContent>
        </Dialog>
    </div>
  )
}
