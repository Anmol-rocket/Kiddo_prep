"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Play,
  RotateCcw,
  Timer,
  TrendingUp,
  Trophy,
  Lightbulb,
  ListChecks,
  Languages,
  MinusCircle,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DSSSB_BLUEPRINT,
  DSSSB_EXAM,
  DSSSB_STRATEGY,
  dsssbPaperList,
} from "@/lib/dsssb-papers"
import {
  getProgress,
  getResult,
  getSession,
  formatDuration,
  type DsssbProgress,
  type DsssbResult,
  type DsssbSession,
} from "@/lib/dsssb-exam"

export default function DsssbHome() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState<DsssbProgress>({ attempts: {} })
  const [sessions, setSessions] = useState<Record<number, DsssbSession | null>>({})
  const [results, setResults] = useState<Record<number, DsssbResult | null>>({})

  useEffect(() => {
    setProgress(getProgress())
    const s: Record<number, DsssbSession | null> = {}
    const r: Record<number, DsssbResult | null> = {}
    dsssbPaperList.forEach((p) => {
      s[p.id] = getSession(p.id)
      r[p.id] = getResult(p.id)
    })
    setSessions(s)
    setResults(r)
    setMounted(true)
  }, [])

  const startPaper = (paperId: number, restart: boolean) => {
    router.push(`/dsssb/exam?paper=${paperId}${restart ? "&restart=1" : ""}`)
  }

  if (!mounted) return null

  const totalAttempts = Object.values(progress.attempts).reduce((a, x) => a + x.count, 0)
  const bestOverall = Object.values(progress.attempts).reduce(
    (a, x) => Math.max(a, x.bestScore),
    Number.NEGATIVE_INFINITY
  )

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              DSSSB Practise
            </h1>
            <span className="text-[10px] text-emerald-400/80 uppercase tracking-wider">
              Radiographer · Tier-1
            </span>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-3xl space-y-8 animate-fade-in">
        {/* Exam pattern strip */}
        <section>
          <Card className="bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border-emerald-500/30 p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-emerald-500/20 p-2 rounded-full h-fit">
                <FileText className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="font-bold text-white leading-tight">{DSSSB_EXAM.post} — Exam Pattern</h2>
                <p className="text-xs text-emerald-100/60 mt-0.5">
                  {DSSSB_EXAM.board} · {DSSSB_EXAM.stage}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <PatternStat icon={<ListChecks className="h-4 w-4" />} value="200" label="Questions" />
              <PatternStat icon={<Trophy className="h-4 w-4" />} value="200" label="Total Marks" />
              <PatternStat icon={<Clock className="h-4 w-4" />} value="120 min" label="Duration" />
              <PatternStat
                icon={<MinusCircle className="h-4 w-4" />}
                value="-0.25"
                label="Per Wrong"
                danger
              />
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-100/70">
              <Languages className="h-3.5 w-3.5 shrink-0" />
              <span>
                Medium: {DSSSB_EXAM.medium}. In this practise set the Hindi Language section is in
                Devanagari; all other sections are in English.
              </span>
            </div>
          </Card>
        </section>

        {/* Overall stats */}
        {totalAttempts > 0 && (
          <section className="grid grid-cols-3 gap-3">
            <Card className="bg-zinc-900/50 border-zinc-800 p-4">
              <div className="text-xs text-zinc-400">Attempts</div>
              <div className="text-2xl font-bold text-emerald-400">{totalAttempts}</div>
            </Card>
            <Card className="bg-zinc-900/50 border-zinc-800 p-4">
              <div className="text-xs text-zinc-400">Best Score</div>
              <div className="text-2xl font-bold text-white">
                {Number.isFinite(bestOverall) ? bestOverall : 0}
                <span className="text-sm text-zinc-500 font-normal">/200</span>
              </div>
            </Card>
            <Card className="bg-zinc-900/50 border-zinc-800 p-4">
              <div className="text-xs text-zinc-400">Papers</div>
              <div className="text-2xl font-bold text-white">
                {Object.keys(progress.attempts).length}
                <span className="text-sm text-zinc-500 font-normal">/{dsssbPaperList.length}</span>
              </div>
            </Card>
          </section>
        )}

        {/* Practice Material + Rapid Quiz */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Languages className="h-5 w-5 text-emerald-400" />
            Hindi Vocabulary — Quick Revision
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card
              className="p-5 bg-gradient-to-br from-emerald-900/30 to-teal-900/10 border-emerald-500/40 cursor-pointer hover:border-emerald-500/70 transition-colors"
              onClick={() => router.push("/dsssb/practice-material")}
            >
              <div className="flex items-start gap-3">
                <div className="bg-emerald-500/20 p-2 rounded-full h-fit shrink-0">
                  <BookOpen className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm">Practice Material</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    विलोम, पर्यायवाची &amp; मुहावरे — a searchable reference of the most-asked Hindi
                    vocabulary.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-400 mt-3 font-semibold">
                Open reference
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </Card>

            <Card
              className="p-5 bg-gradient-to-br from-teal-900/30 to-emerald-900/10 border-teal-500/40 cursor-pointer hover:border-teal-500/70 transition-colors"
              onClick={() => router.push("/dsssb/rapid-quiz")}
            >
              <div className="flex items-start gap-3">
                <div className="bg-teal-500/20 p-2 rounded-full h-fit shrink-0">
                  <Zap className="h-5 w-5 text-teal-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm">Rapid Quiz</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Quick-fire MCQs from the material above — timed, instant feedback, no negative
                    marking.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-teal-400 mt-3 font-semibold">
                Start quiz
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </Card>
          </div>
        </section>

        {/* Papers */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-emerald-400" />
            Full Mock Papers
          </h2>
          <div className="space-y-4">
            {dsssbPaperList.map((paper) => {
              const stat = progress.attempts[String(paper.id)]
              const session = sessions[paper.id]
              const result = results[paper.id]
              const inProgress =
                !!session &&
                session.remainingSeconds > 0 &&
                session.answers.some((a) => a !== null || false)
              const answeredCount = session ? session.answers.filter((a) => a !== null).length : 0

              return (
                <Card
                  key={paper.id}
                  className={cn(
                    "p-5 transition-all duration-300",
                    stat
                      ? "bg-zinc-900/80 border-emerald-500/30"
                      : "bg-gradient-to-br from-emerald-900/30 to-teal-900/10 border-emerald-500/40"
                  )}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-lg">{paper.name}</h3>
                      <p className="text-sm text-zinc-400 mt-0.5">{paper.subtitle}</p>
                      <p className="text-[10px] text-zinc-600 mt-1 font-mono">{paper.code}</p>
                    </div>
                    {inProgress ? (
                      <Badge className="bg-amber-500/20 text-amber-400 border-none pointer-events-none shrink-0">
                        <Timer className="h-3 w-3 mr-1" />
                        In progress
                      </Badge>
                    ) : stat ? (
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-none pointer-events-none shrink-0">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Best {stat.bestScore}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-zinc-400 border-zinc-700 pointer-events-none shrink-0">
                        Not attempted
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400 mb-4">
                    <span className="flex items-center gap-1">
                      <ListChecks className="h-4 w-4" />
                      {paper.totalQuestions} Qs
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {paper.durationMinutes} min
                    </span>
                    {result && (
                      <span className="flex items-center gap-2">
                        <span className="text-emerald-400">{result.correct} ✔</span>
                        <span className="text-red-400">{result.incorrect} ✘</span>
                        <span className="text-zinc-500">{formatDuration(result.timeTakenSeconds)}</span>
                      </span>
                    )}
                  </div>

                  {inProgress && (
                    <div className="mb-4 text-xs bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2 text-amber-200/80">
                      Saved attempt: {answeredCount}/200 answered, {Math.ceil(session!.remainingSeconds / 60)} min
                      left on the clock.
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={() => startPaper(paper.id, false)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {inProgress ? "Resume Exam" : "Start Exam"}
                    </Button>

                    {(stat || inProgress) && (
                      <Button
                        onClick={() => startPaper(paper.id, true)}
                        variant="outline"
                        className="flex-1 border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Restart
                      </Button>
                    )}
                  </div>

                  {result && (
                    <div className="flex gap-2 mt-2">
                      <Button
                        onClick={() => router.push(`/dsssb/result?paper=${paper.id}`)}
                        variant="secondary"
                        className="flex-1 bg-zinc-800 hover:bg-zinc-700"
                      >
                        Last Result
                      </Button>
                      <Button
                        onClick={() => router.push(`/dsssb/review?paper=${paper.id}`)}
                        variant="outline"
                        className="flex-1 border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                      >
                        Solutions
                      </Button>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </section>

        {/* Blueprint */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-emerald-400" />
            Syllabus & Weightage
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {DSSSB_BLUEPRINT.map((sec) => (
              <AccordionItem
                key={sec.section}
                value={sec.section}
                className="border border-zinc-800 rounded-xl bg-zinc-900/50 px-4"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center justify-between w-full pr-3">
                    <div className="text-left">
                      <div className="font-semibold text-sm text-white">{sec.title}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{sec.caption}</div>
                    </div>
                    <Badge className="bg-emerald-500/15 text-emerald-400 border-none pointer-events-none shrink-0">
                      {sec.marks} marks
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="space-y-3">
                    {sec.rows.map((row) => (
                      <div
                        key={row.subsectionId}
                        className="border-l-2 border-emerald-500/40 pl-3 py-0.5"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-sm font-medium text-zinc-100">{row.name}</span>
                          <span className="text-xs text-zinc-500 shrink-0 font-mono">
                            {row.questions} Q · {row.marks} M
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{row.topics}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Strategy */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-emerald-400" />
            Exam Strategy
          </h2>
          <Card className="bg-zinc-900/50 border-zinc-800 p-5">
            <ul className="space-y-3">
              {DSSSB_STRATEGY.map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </main>
    </div>
  )
}

function PatternStat({
  icon,
  value,
  label,
  danger,
}: {
  icon: React.ReactNode
  value: string
  label: string
  danger?: boolean
}) {
  return (
    <div className="bg-black/30 border border-white/5 rounded-lg px-3 py-2.5">
      <div className={cn("flex items-center gap-1.5", danger ? "text-red-400" : "text-emerald-400")}>
        {icon}
        <span className="font-bold text-base">{value}</span>
      </div>
      <div className="text-[11px] text-zinc-500 mt-0.5">{label}</div>
    </div>
  )
}
