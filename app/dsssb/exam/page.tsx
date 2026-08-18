"use client"

import { useState, useEffect, useRef, useMemo, useCallback, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eraser,
  Flag,
  Grid3x3,
  LogOut,
  Send,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getDsssbPaper } from "@/lib/dsssb-questions"
import type { DsssbPaper } from "@/lib/dsssb-papers"
import {
  createSession,
  getSession,
  saveSession,
  clearSession,
  saveResult,
  scoreAttempt,
  questionState,
  formatClock,
  type DsssbSession,
  type QuestionState,
} from "@/lib/dsssb-exam"

const OPTION_LABELS = ["A", "B", "C", "D"]

const PALETTE_STYLE: Record<QuestionState, string> = {
  notVisited: "bg-zinc-800 text-zinc-400 border-zinc-700",
  notAnswered: "bg-red-600/80 text-white border-red-500",
  answered: "bg-emerald-600 text-white border-emerald-500",
  marked: "bg-violet-600 text-white border-violet-500",
  answeredMarked: "bg-violet-600 text-white border-violet-500 ring-2 ring-emerald-400 ring-offset-1 ring-offset-black",
}

const LEGEND: { state: QuestionState; label: string }[] = [
  { state: "answered", label: "Answered" },
  { state: "notAnswered", label: "Not answered" },
  { state: "notVisited", label: "Not visited" },
  { state: "marked", label: "Marked for review" },
  { state: "answeredMarked", label: "Answered & marked" },
]

function ExamContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paperId = Number(searchParams.get("paper") ?? 1)
  const restart = searchParams.get("restart") === "1"

  const paper = useMemo<DsssbPaper | undefined>(() => getDsssbPaper(paperId), [paperId])

  const [session, setSession] = useState<DsssbSession | null>(null)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const [showExit, setShowExit] = useState(false)
  const [autoSubmitted, setAutoSubmitted] = useState(false)
  const submittedRef = useRef(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  /* ------------------------------ initialisation ----------------------------- */
  useEffect(() => {
    if (!paper) {
      router.replace("/dsssb")
      return
    }
    let s = restart ? null : getSession(paper.id)
    if (!s || s.answers.length !== paper.totalQuestions) {
      s = createSession(paper)
      clearSession(paper.id)
    }
    s.visited[s.currentIndex] = true
    setSession({ ...s })
    if (restart) {
      // drop the ?restart=1 so a refresh does not wipe the fresh attempt
      router.replace(`/dsssb/exam?paper=${paper.id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paper, paperId])

  /* --------------------------------- persist -------------------------------- */
  // The ticking clock changes `session` every second; only flush to localStorage
  // when something meaningful changed, or every 5 seconds, to avoid jank.
  const lastPersistRef = useRef(0)
  useEffect(() => {
    if (!session || submittedRef.current) return
    const now = Date.now()
    if (now - lastPersistRef.current < 5000 && session.remainingSeconds > 0) return
    lastPersistRef.current = now
    saveSession(session)
  }, [session])

  useEffect(() => {
    if (!session || submittedRef.current) return
    saveSession(session)
    lastPersistRef.current = Date.now()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.answers, session?.marked, session?.currentIndex])

  /* ---------------------------------- timer --------------------------------- */
  const clockRunning = !!session && session.remainingSeconds > 0 && !submittedRef.current
  useEffect(() => {
    if (!clockRunning) return
    const t = setInterval(() => {
      setSession((prev) => {
        if (!prev || submittedRef.current) return prev
        return { ...prev, remainingSeconds: Math.max(0, prev.remainingSeconds - 1) }
      })
    }, 1000)
    return () => clearInterval(t)
  }, [clockRunning])

  const finish = useCallback(
    (auto: boolean) => {
      if (!paper || !session || submittedRef.current) return
      submittedRef.current = true
      const timeTaken = paper.durationMinutes * 60 - session.remainingSeconds
      const result = scoreAttempt(
        paper,
        session.answers,
        session.marked,
        timeTaken,
        session.startedAt
      )
      saveResult(result)
      clearSession(paper.id)
      router.replace(`/dsssb/result?paper=${paper.id}${auto ? "&auto=1" : ""}`)
    },
    [paper, session, router]
  )

  useEffect(() => {
    if (!session || submittedRef.current) return
    if (session.remainingSeconds <= 0 && !autoSubmitted) {
      setAutoSubmitted(true)
      finish(true)
    }
  }, [session, autoSubmitted, finish])

  /* ------------------------------ back handling ----------------------------- */
  useEffect(() => {
    const onPop = () => {
      if (submittedRef.current) return
      setShowExit(true)
      window.history.pushState(null, "", window.location.href)
    }
    window.history.pushState(null, "", window.location.href)
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  if (!paper || !session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading exam…
      </div>
    )
  }

  const index = session.currentIndex
  const question = paper.questions[index]
  const subsection = paper.subsections.find((s) => s.id === question.subsectionId)!

  const answeredCount = session.answers.filter((a) => a !== null).length
  const markedCount = session.marked.filter(Boolean).length
  const notAnsweredCount = session.visited.filter(
    (v, i) => v && session.answers[i] === null
  ).length
  const notVisitedCount = paper.totalQuestions - session.visited.filter(Boolean).length

  const goTo = (target: number) => {
    if (target < 0 || target >= paper.totalQuestions) return
    setSession((prev) => {
      if (!prev) return prev
      const visited = [...prev.visited]
      visited[target] = true
      return { ...prev, currentIndex: target, visited }
    })
    setPaletteOpen(false)
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" })
    window.scrollTo({ top: 0, behavior: "auto" })
  }

  const selectOption = (optIndex: number) => {
    setSession((prev) => {
      if (!prev) return prev
      const answers = [...prev.answers]
      answers[prev.currentIndex] = optIndex
      return { ...prev, answers }
    })
  }

  const clearResponse = () => {
    setSession((prev) => {
      if (!prev) return prev
      const answers = [...prev.answers]
      answers[prev.currentIndex] = null
      return { ...prev, answers }
    })
  }

  const toggleMark = () => {
    setSession((prev) => {
      if (!prev) return prev
      const marked = [...prev.marked]
      marked[prev.currentIndex] = !marked[prev.currentIndex]
      return { ...prev, marked }
    })
  }

  const markAndNext = () => {
    setSession((prev) => {
      if (!prev) return prev
      const marked = [...prev.marked]
      marked[prev.currentIndex] = true
      return { ...prev, marked }
    })
    goTo(index + 1)
  }

  const timeLow = session.remainingSeconds <= 300
  const timeCritical = session.remainingSeconds <= 60

  const paletteButton = (i: number) => {
    const state = questionState(i, session.answers, session.marked, session.visited)
    return (
      <button
        key={i}
        onClick={() => goTo(i)}
        className={cn(
          "h-9 w-9 rounded-md border text-xs font-semibold transition-transform active:scale-95",
          PALETTE_STYLE[state],
          i === index && "outline outline-2 outline-white"
        )}
      >
        {i + 1}
      </button>
    )
  }

  const PaletteBody = (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        {LEGEND.map((l) => (
          <div key={l.state} className="flex items-center gap-2 text-zinc-400">
            <span className={cn("h-4 w-4 rounded border shrink-0", PALETTE_STYLE[l.state])} />
            {l.label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
        <SummaryChip value={answeredCount} label="Answered" className="text-emerald-400" />
        <SummaryChip value={notAnsweredCount} label="Not ans." className="text-red-400" />
        <SummaryChip value={markedCount} label="Marked" className="text-violet-400" />
        <SummaryChip value={notVisitedCount} label="Unseen" className="text-zinc-400" />
      </div>

      {paper.subsections.map((s) => (
        <div key={s.id}>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-300">
              <span className="text-emerald-400 mr-1">{s.section}</span>
              {s.title}
            </span>
            <span className="text-[10px] text-zinc-600 font-mono">
              {s.start}-{s.end}
            </span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(2.25rem,1fr))] gap-1.5">
            {Array.from({ length: s.count }, (_, k) => paletteButton(s.start - 1 + k))}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="container max-w-6xl mx-auto px-3 h-14 flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-zinc-400 hover:text-white"
            onClick={() => setShowExit(true)}
          >
            <LogOut className="h-5 w-5" />
          </Button>

          <div className="min-w-0 text-center">
            <div className="text-sm font-semibold truncate">{paper.name}</div>
            <div className="text-[10px] text-zinc-500 truncate">{paper.code}</div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-sm font-bold tabular-nums",
                timeCritical
                  ? "border-red-500 bg-red-500/10 text-red-400 animate-pulse"
                  : timeLow
                    ? "border-amber-500 bg-amber-500/10 text-amber-400"
                    : "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
              )}
            >
              <Clock className="h-3.5 w-3.5" />
              {formatClock(session.remainingSeconds)}
            </div>

            <Sheet open={paletteOpen} onOpenChange={setPaletteOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden border-zinc-700 bg-zinc-900 text-zinc-300"
                >
                  <Grid3x3 className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-zinc-950 border-zinc-800 text-white w-[88%] sm:w-[420px] overflow-y-auto"
              >
                <SheetTitle className="text-white mb-4">Question Palette</SheetTitle>
                {PaletteBody}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* progress bar */}
        <div className="h-1 bg-zinc-900">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
            style={{ width: `${(answeredCount / paper.totalQuestions) * 100}%` }}
          />
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-3 py-4 flex gap-6 flex-1 w-full">
        {/* Main question column */}
        <main ref={scrollRef} className="flex-1 min-w-0 pb-40 lg:pb-8">
          {/* Section context */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-emerald-500/15 text-emerald-400 border-none pointer-events-none">
              Section {question.section}
            </Badge>
            <span className="text-xs text-zinc-400">{subsection.title}</span>
            <span className="text-[10px] text-zinc-600 ml-auto font-mono">
              Q {question.no} / {paper.totalQuestions}
            </span>
          </div>

          <Card className="bg-zinc-900/70 border-zinc-800 p-5 mb-4">
            <div className="flex gap-3">
              <span className="shrink-0 h-7 w-7 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold flex items-center justify-center">
                {question.no}
              </span>
              <h2 className="text-base md:text-lg leading-relaxed text-zinc-50 whitespace-pre-wrap">
                {question.question}
              </h2>
            </div>
            <div className="mt-3 pl-10 text-[11px] text-zinc-600">{question.subject}</div>
          </Card>

          <div className="space-y-2.5">
            {question.options.map((option, idx) => {
              const selected = session.answers[index] === idx
              return (
                <button
                  key={idx}
                  onClick={() => selectOption(idx)}
                  className={cn(
                    "w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-start gap-3",
                    selected
                      ? "bg-emerald-900/40 border-emerald-500 text-white"
                      : "bg-zinc-900 border-zinc-800 hover:border-emerald-500/40 hover:bg-zinc-800/70"
                  )}
                >
                  <span
                    className={cn(
                      "shrink-0 h-6 w-6 rounded-full border text-xs font-bold flex items-center justify-center mt-0.5",
                      selected
                        ? "bg-emerald-500 border-emerald-500 text-black"
                        : "border-zinc-600 text-zinc-400"
                    )}
                  >
                    {OPTION_LABELS[idx]}
                  </span>
                  <span className="text-sm md:text-base leading-relaxed">{option}</span>
                </button>
              )
            })}
          </div>

          {/* Desktop action row */}
          <div className="hidden lg:flex items-center gap-2 mt-6">
            <Button
              variant="outline"
              className="border-zinc-700 bg-zinc-900 text-zinc-300"
              onClick={clearResponse}
              disabled={session.answers[index] === null}
            >
              <Eraser className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <Button
              variant="outline"
              className={cn(
                "border-violet-600/60 bg-violet-950/30 text-violet-300 hover:bg-violet-900/40",
                session.marked[index] && "bg-violet-600 text-white border-violet-500"
              )}
              onClick={toggleMark}
            >
              <Flag className="h-4 w-4 mr-2" />
              {session.marked[index] ? "Unmark" : "Mark for review"}
            </Button>
            <div className="flex-1" />
            <Button
              variant="ghost"
              className="text-zinc-400"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            {index < paper.totalQuestions - 1 ? (
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => goTo(index + 1)}>
                Save & Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button className="bg-white text-black hover:bg-zinc-200 font-bold" onClick={() => setShowSubmit(true)}>
                <Send className="h-4 w-4 mr-2" />
                Submit Exam
              </Button>
            )}
          </div>
        </main>

        {/* Desktop palette sidebar */}
        <aside className="hidden lg:block w-[320px] shrink-0">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950/80 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold">Question Palette</h3>
              <Button
                size="sm"
                className="bg-white text-black hover:bg-zinc-200 h-7 text-xs font-bold"
                onClick={() => setShowSubmit(true)}
              >
                Submit
              </Button>
            </div>
            {PaletteBody}
          </div>
        </aside>
      </div>

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-white/10">
        <div className="container max-w-6xl mx-auto px-3 py-2.5 space-y-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-zinc-700 bg-zinc-900 text-zinc-300 text-xs"
              onClick={clearResponse}
              disabled={session.answers[index] === null}
            >
              <Eraser className="h-3.5 w-3.5 mr-1.5" />
              Clear
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "flex-1 border-violet-600/60 bg-violet-950/30 text-violet-300 text-xs",
                session.marked[index] && "bg-violet-600 text-white border-violet-500"
              )}
              onClick={markAndNext}
            >
              <Flag className="h-3.5 w-3.5 mr-1.5" />
              Mark & Next
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white text-xs"
              onClick={() => setShowSubmit(true)}
            >
              <Send className="h-3.5 w-3.5 mr-1.5" />
              Submit
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="flex-1 h-11 text-zinc-300 bg-zinc-900/70"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Prev
            </Button>
            <Button
              className="flex-[2] h-11 bg-emerald-600 hover:bg-emerald-700 font-semibold"
              onClick={() =>
                index < paper.totalQuestions - 1 ? goTo(index + 1) : setShowSubmit(true)
              }
            >
              {index < paper.totalQuestions - 1 ? "Save & Next" : "Finish"}
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Submit dialog */}
      <Dialog open={showSubmit} onOpenChange={setShowSubmit}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white w-[92%] max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-emerald-400" />
              Submit the exam?
            </DialogTitle>
            <DialogDescription className="text-zinc-400 pt-1">
              Once submitted you cannot change your answers. Negative marking of{" "}
              {paper.negativeMark} applies to every wrong answer.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 my-2">
            <SummaryBox value={answeredCount} label="Answered" tone="emerald" />
            <SummaryBox value={paper.totalQuestions - answeredCount} label="Unanswered" tone="red" />
            <SummaryBox value={markedCount} label="Marked for review" tone="violet" />
            <SummaryBox value={formatClock(session.remainingSeconds)} label="Time left" tone="zinc" />
          </div>

          <div className="flex flex-col gap-2 mt-1">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => finish(false)}>
              Yes, submit and see my score
            </Button>
            <Button
              variant="outline"
              className="w-full border-zinc-700 bg-zinc-900"
              onClick={() => setShowSubmit(false)}
            >
              Go back to the paper
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Exit dialog */}
      <Dialog open={showExit} onOpenChange={setShowExit}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white w-[92%] max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-400" />
              Leave the exam?
            </DialogTitle>
            <DialogDescription className="text-zinc-400 pt-1">
              Your answers and the remaining time are saved. The clock pauses while you are away and
              you can resume this attempt from the DSSSB Practise page.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-2">
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => {
                if (session) saveSession(session)
                router.replace("/dsssb")
              }}
            >
              Save and exit
            </Button>
            <Button
              variant="outline"
              className="w-full border-zinc-700 bg-zinc-900"
              onClick={() => setShowExit(false)}
            >
              Stay in the exam
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function SummaryChip({
  value,
  label,
  className,
}: {
  value: number
  label: string
  className?: string
}) {
  return (
    <div className="rounded-md bg-zinc-900 border border-zinc-800 py-1.5">
      <div className={cn("font-bold text-sm", className)}>{value}</div>
      <div className="text-zinc-600 text-[10px]">{label}</div>
    </div>
  )
}

function SummaryBox({
  value,
  label,
  tone,
}: {
  value: number | string
  label: string
  tone: "emerald" | "red" | "violet" | "zinc"
}) {
  const toneClass = {
    emerald: "text-emerald-400",
    red: "text-red-400",
    violet: "text-violet-400",
    zinc: "text-zinc-300",
  }[tone]
  return (
    <div className="rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2.5">
      <div className={cn("text-xl font-bold tabular-nums", toneClass)}>{value}</div>
      <div className="text-[11px] text-zinc-500 mt-0.5">{label}</div>
    </div>
  )
}

export default function DsssbExamPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          Loading exam…
        </div>
      }
    >
      <ExamContent />
    </Suspense>
  )
}
