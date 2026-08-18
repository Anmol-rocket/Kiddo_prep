"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlarmClockOff,
  BookOpen,
  ChevronLeft,
  Clock,
  Home,
  MinusCircle,
  RotateCcw,
  Target,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getDsssbPaper } from "@/lib/dsssb-questions"
import { getResult, getProgress, formatDuration, type DsssbResult } from "@/lib/dsssb-exam"

function ResultContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paperId = Number(searchParams.get("paper") ?? 1)
  const auto = searchParams.get("auto") === "1"

  const paper = useMemo(() => getDsssbPaper(paperId), [paperId])
  const [result, setResult] = useState<DsssbResult | null>(null)
  const [best, setBest] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const r = getResult(paperId)
    setResult(r)
    const p = getProgress().attempts[String(paperId)]
    setBest(p ? p.bestScore : null)
    setMounted(true)
  }, [paperId])

  if (!mounted) return null

  if (!paper || !result) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-zinc-400">No result found for this paper yet.</p>
        <Button onClick={() => router.replace("/dsssb")} className="bg-emerald-600 hover:bg-emerald-700">
          Back to DSSSB Practise
        </Button>
      </div>
    )
  }

  const scorePercent = Math.max(0, (result.score / result.maxScore) * 100)
  const negativeLoss = Math.round(result.incorrect * paper.negativeMark * 100) / 100

  return (
    <div className="min-h-screen bg-black text-white pb-28">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dsssb")}
            className="text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-base">Result — {paper.name}</h1>
            <span className="text-[10px] text-emerald-400/80 uppercase tracking-wider">
              DSSSB Radiographer
            </span>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-3xl space-y-6 animate-fade-in">
        {auto && (
          <div className="flex items-center gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            <AlarmClockOff className="h-5 w-5 shrink-0" />
            Time ran out — the paper was submitted automatically.
          </div>
        )}

        {/* Score hero */}
        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/20 border-emerald-500/40 p-6 text-center">
          <div className="text-xs uppercase tracking-wider text-emerald-300/70 mb-1">Final Score</div>
          <div className="text-5xl font-bold tabular-nums">
            <span className={result.score < 0 ? "text-red-400" : "text-white"}>{result.score}</span>
            <span className="text-2xl text-zinc-500 font-normal"> / {result.maxScore}</span>
          </div>
          <div className="mt-4 h-2.5 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000"
              style={{ width: `${Math.min(100, scorePercent)}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-zinc-500">
            <span>{scorePercent.toFixed(1)}%</span>
            {best !== null && <span>Best so far: {best}</span>}
          </div>
        </Card>

        {/* Key numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatTile value={result.correct} label="Correct" tone="emerald" icon={<Target className="h-4 w-4" />} />
          <StatTile value={result.incorrect} label="Wrong" tone="red" icon={<MinusCircle className="h-4 w-4" />} />
          <StatTile value={result.unattempted} label="Skipped" tone="zinc" icon={<BookOpen className="h-4 w-4" />} />
          <StatTile
            value={`${result.accuracy}%`}
            label="Accuracy"
            tone="teal"
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </div>

        {/* Marking breakdown */}
        <Card className="bg-zinc-900/60 border-zinc-800 p-5">
          <h3 className="text-sm font-bold mb-3">How the score was built</h3>
          <div className="space-y-2 text-sm">
            <Row label={`${result.correct} correct × +${paper.markPerCorrect}`} value={`+${result.correct}`} tone="emerald" />
            <Row
              label={`${result.incorrect} wrong × -${paper.negativeMark}`}
              value={`-${negativeLoss}`}
              tone="red"
            />
            <Row label={`${result.unattempted} unattempted × 0`} value="0" tone="zinc" />
            <div className="border-t border-zinc-800 pt-2 mt-2 flex justify-between font-bold">
              <span>Net score</span>
              <span className={result.score < 0 ? "text-red-400" : "text-emerald-400"}>{result.score}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
            <Clock className="h-3.5 w-3.5" />
            Time taken: {formatDuration(result.timeTakenSeconds)} of {paper.durationMinutes} min
            {result.attempted > 0 && (
              <> · {(result.timeTakenSeconds / result.attempted).toFixed(1)}s per attempted question</>
            )}
          </div>
        </Card>

        {/* Section split */}
        <section>
          <h3 className="text-sm font-bold mb-3">Section-wise performance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {result.sectionScores.map((s) => (
              <Card key={s.section} className="bg-zinc-900/60 border-zinc-800 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">
                    Section {s.section}
                    <span className="text-zinc-500 font-normal ml-2 text-xs">
                      {s.section === "A" ? "General" : "Technical"}
                    </span>
                  </span>
                  <Badge className="bg-emerald-500/15 text-emerald-400 border-none pointer-events-none">
                    {s.score} / 100
                  </Badge>
                </div>
                <div className="flex gap-3 text-xs text-zinc-400">
                  <span className="text-emerald-400">{s.correct} ✔</span>
                  <span className="text-red-400">{s.incorrect} ✘</span>
                  <span>{s.unattempted} skipped</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            {result.subsectionScores.map((s) => {
              const pct = (s.correct / s.total) * 100
              return (
                <div key={s.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3.5">
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <span className="text-sm font-medium truncate">
                      <span className="text-emerald-500/70 text-xs mr-1.5">{s.section}</span>
                      {s.title}
                    </span>
                    <span className="text-xs font-mono shrink-0 text-zinc-400">
                      {s.correct}/{s.total} · {s.score} M
                    </span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden flex">
                    <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
                    <div
                      className="h-full bg-red-500/70"
                      style={{ width: `${(s.incorrect / s.total) * 100}%` }}
                    />
                  </div>
                  {pct < 50 && (
                    <div className="mt-2 text-[11px] text-amber-400/80">
                      Weak area — revise this before your next attempt.
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </main>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 p-3">
        <div className="container mx-auto max-w-3xl flex gap-2">
          <Button
            variant="outline"
            className="flex-1 border-zinc-700 bg-zinc-900 text-zinc-300"
            onClick={() => router.push("/")}
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-zinc-700 bg-zinc-900 text-zinc-300"
            onClick={() => router.push(`/dsssb/exam?paper=${paper.id}&restart=1`)}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake
          </Button>
          <Button
            className="flex-[1.5] bg-emerald-600 hover:bg-emerald-700"
            onClick={() => router.push(`/dsssb/review?paper=${paper.id}`)}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            View Solutions
          </Button>
        </div>
      </div>
    </div>
  )
}

function StatTile({
  value,
  label,
  tone,
  icon,
}: {
  value: number | string
  label: string
  tone: "emerald" | "red" | "zinc" | "teal"
  icon: React.ReactNode
}) {
  const toneClass = {
    emerald: "text-emerald-400",
    red: "text-red-400",
    zinc: "text-zinc-300",
    teal: "text-teal-400",
  }[tone]
  return (
    <Card className="bg-zinc-900/60 border-zinc-800 p-4">
      <div className={cn("flex items-center gap-1.5", toneClass)}>{icon}</div>
      <div className={cn("text-2xl font-bold mt-1 tabular-nums", toneClass)}>{value}</div>
      <div className="text-[11px] text-zinc-500">{label}</div>
    </Card>
  )
}

function Row({ label, value, tone }: { label: string; value: string; tone: "emerald" | "red" | "zinc" }) {
  const toneClass = { emerald: "text-emerald-400", red: "text-red-400", zinc: "text-zinc-400" }[tone]
  return (
    <div className="flex justify-between">
      <span className="text-zinc-400">{label}</span>
      <span className={cn("font-mono", toneClass)}>{value}</span>
    </div>
  )
}

export default function DsssbResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          Loading result…
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}
