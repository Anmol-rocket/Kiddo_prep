"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeftRight,
  BookOpen,
  ChevronLeft,
  Flame,
  Home,
  MessageSquareQuote,
  RotateCcw,
  Target,
  Timer as TimerIcon,
  Trophy,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { generateRapidQuiz, type RapidCategory, type RapidQuestion } from "@/lib/dsssb-vocab"

const QUESTION_SECONDS = 12
const LENGTH_OPTIONS = [10, 20, 30]
const BEST_KEY = "kiddoprep_dsssb_rapidquiz_best"

interface RapidBest {
  bestScore: number
  bestTotal: number
  bestStreak: number
  attempts: number
}

function getBest(): RapidBest | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(BEST_KEY)
    return raw ? (JSON.parse(raw) as RapidBest) : null
  } catch {
    return null
  }
}

function saveBest(score: number, total: number, streak: number): RapidBest {
  const prev = getBest()
  const next: RapidBest = {
    bestScore: prev ? Math.max(prev.bestScore, score) : score,
    bestTotal: total,
    bestStreak: prev ? Math.max(prev.bestStreak, streak) : streak,
    attempts: (prev?.attempts ?? 0) + 1,
  }
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(BEST_KEY, JSON.stringify(next))
    } catch {
      /* quota — ignore */
    }
  }
  return next
}

const CATEGORY_META: Record<RapidCategory, { label: string; icon: React.ReactNode; className: string }> = {
  vilom: {
    label: "विलोम",
    icon: <ArrowLeftRight className="h-3 w-3" />,
    className: "text-sky-400 bg-sky-500/10 border-sky-500/30",
  },
  paryayvachi: {
    label: "पर्यायवाची",
    icon: <BookOpen className="h-3 w-3" />,
    className: "text-violet-400 bg-violet-500/10 border-violet-500/30",
  },
  muhavara: {
    label: "मुहावरा",
    icon: <MessageSquareQuote className="h-3 w-3" />,
    className: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  },
}

type Phase = "setup" | "playing" | "finished"

export default function RapidQuizPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<Phase>("setup")
  const [length, setLength] = useState(20)
  const [best, setBest] = useState<RapidBest | null>(null)

  const [questions, setQuestions] = useState<RapidQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [locked, setLocked] = useState(false)
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS)

  // Live counters — mirrored into state (for render) and refs (source of truth for
  // the summary screen, so the final tally is never read from a stale closure).
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreakRun, setBestStreakRun] = useState(0)
  const scoreRef = useRef(0)
  const streakRef = useRef(0)
  const bestStreakRef = useRef(0)

  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setBest(getBest())
    setMounted(true)
    return () => {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current)
    }
  }, [])

  const startQuiz = (n: number) => {
    setQuestions(generateRapidQuiz(n))
    setIndex(0)
    setSelected(null)
    setLocked(false)
    setTimeLeft(QUESTION_SECONDS)
    setScore(0)
    setStreak(0)
    setBestStreakRun(0)
    scoreRef.current = 0
    streakRef.current = 0
    bestStreakRef.current = 0
    setPhase("playing")
  }

  const currentQuestion = questions[index]

  const goNext = () => {
    if (index + 1 >= questions.length) {
      const updated = saveBest(scoreRef.current, questions.length, bestStreakRef.current)
      setBest(updated)
      setPhase("finished")
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setLocked(false)
    setTimeLeft(QUESTION_SECONDS)
  }

  const handleAnswer = (optIndex: number | null) => {
    if (locked || !currentQuestion) return
    setLocked(true)
    setSelected(optIndex)

    const isCorrect = optIndex !== null && optIndex === currentQuestion.correctAnswer
    if (isCorrect) {
      scoreRef.current += 1
      streakRef.current += 1
      bestStreakRef.current = Math.max(bestStreakRef.current, streakRef.current)
      setScore(scoreRef.current)
      setStreak(streakRef.current)
      setBestStreakRun(bestStreakRef.current)
    } else {
      streakRef.current = 0
      setStreak(0)
    }

    advanceTimeoutRef.current = setTimeout(goNext, 1100)
  }

  // Countdown — one tick per second while this question is live and unanswered.
  useEffect(() => {
    if (phase !== "playing" || locked) return
    const t = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(t)
  }, [phase, locked, index])

  // Auto-submit as unanswered once the clock hits zero.
  useEffect(() => {
    if (phase !== "playing" || locked) return
    if (timeLeft === 0) handleAnswer(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft])

  if (!mounted) return null

  /* --------------------------------- setup --------------------------------- */
  if (phase === "setup") {
    return (
      <div className="min-h-screen bg-black text-white pb-24">
        <Header title="Rapid Quiz" subtitle="विलोम · पर्यायवाची · मुहावरे" onBack={() => router.push("/dsssb")} />
        <main className="container mx-auto px-4 py-6 max-w-3xl space-y-6 animate-fade-in">
          <Card className="bg-gradient-to-br from-teal-900/30 to-emerald-900/20 border-teal-500/30 p-5">
            <div className="flex items-start gap-3">
              <div className="bg-teal-500/20 p-2 rounded-full h-fit">
                <Zap className="h-5 w-5 text-teal-400" />
              </div>
              <div>
                <h2 className="font-bold text-white leading-tight">Quick-fire Hindi vocabulary</h2>
                <p className="text-xs text-teal-100/60 mt-1 leading-relaxed">
                  {QUESTION_SECONDS} seconds per question, instant feedback, no negative marking. Drawn
                  live from the Practice Material vocabulary — a fresh mix every round.
                </p>
              </div>
            </div>
          </Card>

          {best && (
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-zinc-900/50 border-zinc-800 p-4 text-center">
                <div className="text-xs text-zinc-400">Best Score</div>
                <div className="text-xl font-bold text-emerald-400">
                  {best.bestScore}
                  <span className="text-sm text-zinc-500 font-normal">/{best.bestTotal}</span>
                </div>
              </Card>
              <Card className="bg-zinc-900/50 border-zinc-800 p-4 text-center">
                <div className="text-xs text-zinc-400">Best Streak</div>
                <div className="text-xl font-bold text-amber-400">{best.bestStreak}</div>
              </Card>
              <Card className="bg-zinc-900/50 border-zinc-800 p-4 text-center">
                <div className="text-xs text-zinc-400">Rounds</div>
                <div className="text-xl font-bold text-white">{best.attempts}</div>
              </Card>
            </div>
          )}

          <div>
            <h3 className="text-sm font-bold mb-3">How many questions?</h3>
            <div className="grid grid-cols-3 gap-2">
              {LENGTH_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => setLength(n)}
                  className={cn(
                    "rounded-xl border py-3 text-sm font-semibold transition-all",
                    length === n
                      ? "bg-teal-600/20 border-teal-500 text-teal-300"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  )}
                >
                  {n} Qs
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => startQuiz(length)}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-base font-bold"
          >
            <Zap className="h-4 w-4 mr-2" />
            Start Rapid Quiz
          </Button>

          <Button
            variant="outline"
            className="w-full border-zinc-700 bg-zinc-900 text-zinc-300"
            onClick={() => router.push("/dsssb/practice-material")}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Review Practice Material first
          </Button>
        </main>
      </div>
    )
  }

  /* -------------------------------- finished -------------------------------- */
  if (phase === "finished") {
    const total = questions.length
    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0
    return (
      <div className="min-h-screen bg-black text-white pb-24">
        <Header title="Rapid Quiz — Result" subtitle="DSSSB Practise" onBack={() => router.push("/dsssb")} />
        <main className="container mx-auto px-4 py-6 max-w-3xl space-y-6 animate-fade-in">
          <Card className="bg-gradient-to-br from-teal-900/40 to-emerald-900/20 border-teal-500/40 p-6 text-center">
            <div className="text-xs uppercase tracking-wider text-teal-300/70 mb-1">Your Score</div>
            <div className="text-5xl font-bold tabular-nums">
              {score}
              <span className="text-2xl text-zinc-500 font-normal"> / {total}</span>
            </div>
            <div className="mt-4 h-2.5 bg-black/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-1000"
                style={{ width: `${accuracy}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] text-zinc-500">{accuracy}% accuracy</div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-zinc-900/60 border-zinc-800 p-4">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Flame className="h-4 w-4" />
              </div>
              <div className="text-2xl font-bold mt-1 text-amber-400">{bestStreakRun}</div>
              <div className="text-[11px] text-zinc-500">Best streak this round</div>
            </Card>
            <Card className="bg-zinc-900/60 border-zinc-800 p-4">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Trophy className="h-4 w-4" />
              </div>
              <div className="text-2xl font-bold mt-1 text-emerald-400">
                {best?.bestScore ?? score}
                <span className="text-sm text-zinc-500 font-normal">/{best?.bestTotal ?? total}</span>
              </div>
              <div className="text-[11px] text-zinc-500">All-time best score</div>
            </Card>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => startQuiz(length)}
              className="w-full bg-teal-600 hover:bg-teal-700 h-12 text-base font-bold"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Play Again
            </Button>
            <Button
              variant="outline"
              className="w-full border-zinc-700 bg-zinc-900 text-zinc-300"
              onClick={() => router.push("/dsssb/practice-material")}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Review Practice Material
            </Button>
            <Button variant="ghost" className="w-full text-zinc-400" onClick={() => router.push("/dsssb")}>
              <Home className="h-4 w-4 mr-2" />
              Back to DSSSB Practise
            </Button>
          </div>
        </main>
      </div>
    )
  }

  /* --------------------------------- playing -------------------------------- */
  if (!currentQuestion) return null
  const meta = CATEGORY_META[currentQuestion.category]
  const timeLow = timeLeft <= 4

  return (
    <div className="min-h-screen bg-black text-white pb-10">
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="container max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-zinc-300">
            Q {index + 1} <span className="text-zinc-600">/ {questions.length}</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
              <Flame className="h-3.5 w-3.5" />
              {streak}
            </span>
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
              <Target className="h-3.5 w-3.5" />
              {score}
            </span>
            <div
              className={cn(
                "flex items-center gap-1 rounded-lg border px-2 py-1 font-mono text-xs font-bold tabular-nums",
                timeLow
                  ? "border-red-500 bg-red-500/10 text-red-400 animate-pulse"
                  : "border-teal-500/50 bg-teal-500/10 text-teal-400"
              )}
            >
              <TimerIcon className="h-3 w-3" />
              {timeLeft}s
            </div>
          </div>
        </div>
        <div className="h-1 bg-zinc-900">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-5 animate-fade-in">
        <Badge
          variant="outline"
          className={cn("pointer-events-none inline-flex items-center gap-1 font-normal", meta.className)}
        >
          {meta.icon}
          {meta.label}
        </Badge>

        <Card className="bg-zinc-900/70 border-zinc-800 p-5">
          <h2 className="text-lg leading-relaxed text-zinc-50">{currentQuestion.prompt}</h2>
        </Card>

        <div className="space-y-2.5">
          {currentQuestion.options.map((option, idx) => {
            const isCorrectOption = idx === currentQuestion.correctAnswer
            const isSelected = idx === selected
            let stateClass = "bg-zinc-900 border-zinc-800 hover:border-teal-500/40 hover:bg-zinc-800/70"
            if (locked) {
              if (isCorrectOption) {
                stateClass = "bg-emerald-900/50 border-emerald-500 text-white"
              } else if (isSelected) {
                stateClass = "bg-red-900/40 border-red-500 text-white"
              } else {
                stateClass = "bg-zinc-900 border-zinc-800 opacity-50"
              }
            } else if (isSelected) {
              stateClass = "bg-teal-900/40 border-teal-500 text-white"
            }
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={locked}
                className={cn(
                  "w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-start gap-3 disabled:cursor-default",
                  stateClass
                )}
              >
                <span
                  className={cn(
                    "shrink-0 h-6 w-6 rounded-full border text-xs font-bold flex items-center justify-center mt-0.5",
                    locked && isCorrectOption
                      ? "bg-emerald-500 border-emerald-500 text-black"
                      : locked && isSelected
                        ? "bg-red-500 border-red-500 text-white"
                        : "border-zinc-600 text-zinc-400"
                  )}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm md:text-base leading-relaxed">{option}</span>
              </button>
            )
          })}
        </div>

        {locked && (
          <div className="text-center text-xs text-zinc-500">
            {selected === currentQuestion.correctAnswer ? "सही जवाब! अगला सवाल…" : "अगला सवाल…"}
          </div>
        )}
      </main>
    </div>
  )
}

function Header({ title, subtitle, onBack }: { title: string; subtitle: string; onBack: () => void }) {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/10">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-lg bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
            {title}
          </h1>
          <span className="text-[10px] text-teal-400/80 uppercase tracking-wider">{subtitle}</span>
        </div>
        <div className="w-10" />
      </div>
    </header>
  )
}
