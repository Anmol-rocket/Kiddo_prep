"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCircle2, ChevronLeft, Lightbulb, MinusCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { getDsssbPaper } from "@/lib/dsssb-questions"
import { getResult, type DsssbResult } from "@/lib/dsssb-exam"

const OPTION_LABELS = ["A", "B", "C", "D"]
type Filter = "all" | "wrong" | "skipped" | "correct" | "marked"

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All questions" },
  { value: "wrong", label: "Wrong answers" },
  { value: "skipped", label: "Skipped" },
  { value: "correct", label: "Correct" },
  { value: "marked", label: "Marked for review" },
]

function ReviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paperId = Number(searchParams.get("paper") ?? 1)

  const paper = useMemo(() => getDsssbPaper(paperId), [paperId])
  const [result, setResult] = useState<DsssbResult | null>(null)
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState<Filter>("wrong")
  const [subsection, setSubsection] = useState<string>("all")

  useEffect(() => {
    setResult(getResult(paperId))
    setMounted(true)
  }, [paperId])

  if (!mounted) return null

  if (!paper) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Button onClick={() => router.replace("/dsssb")}>Back</Button>
      </div>
    )
  }

  const answers = result?.answers ?? []
  const marked = result?.marked ?? []

  const items = paper.questions
    .map((q, i) => ({ q, i, given: answers[i] ?? null, isMarked: !!marked[i] }))
    .filter(({ q }) => subsection === "all" || q.subsectionId === subsection)
    .filter(({ q, given, isMarked }) => {
      switch (filter) {
        case "wrong":
          return given !== null && given !== q.correctAnswer
        case "skipped":
          return given === null
        case "correct":
          return given === q.correctAnswer
        case "marked":
          return isMarked
        default:
          return true
      }
    })

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-3xl">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/dsssb/result?paper=${paper.id}`)}
            className="text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-base">Solutions — {paper.name}</h1>
            <span className="text-[10px] text-emerald-400/80 uppercase tracking-wider">
              {items.length} question{items.length === 1 ? "" : "s"} shown
            </span>
          </div>
          <div className="w-10" />
        </div>

        <div className="container mx-auto px-4 pb-3 max-w-3xl flex gap-2">
          <Select value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <SelectTrigger className="flex-1 bg-zinc-900 border-zinc-800 text-sm h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
              {FILTERS.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={subsection} onValueChange={setSubsection}>
            <SelectTrigger className="flex-1 bg-zinc-900 border-zinc-800 text-sm h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
              <SelectItem value="all">All sections</SelectItem>
              {paper.subsections.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.section} · {s.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <main className="container mx-auto px-4 py-5 max-w-3xl space-y-4">
        {!result && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            You have not submitted this paper yet — showing the answer key without your responses.
          </div>
        )}

        {items.length === 0 && (
          <Card className="bg-zinc-900/60 border-zinc-800 p-8 text-center">
            <p className="text-zinc-400 text-sm">
              Nothing here with this filter. Try “All questions”.
            </p>
          </Card>
        )}

        {items.map(({ q, i, given, isMarked }) => {
          const isCorrect = given !== null && given === q.correctAnswer
          const isSkipped = given === null
          return (
            <Card key={q.id} className="bg-zinc-900/60 border-zinc-800 p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="shrink-0 h-7 w-7 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold flex items-center justify-center">
                    {q.no}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm md:text-base leading-relaxed text-zinc-50">{q.question}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] text-zinc-600">{q.subject}</span>
                      {isMarked && (
                        <Badge className="bg-violet-500/15 text-violet-400 border-none pointer-events-none text-[10px] px-1.5 py-0">
                          Marked
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <span className="shrink-0">
                  {isSkipped ? (
                    <MinusCircle className="h-5 w-5 text-zinc-500" />
                  ) : isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {q.options.map((option, idx) => {
                  const isKey = idx === q.correctAnswer
                  const isGiven = given === idx
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "flex items-start gap-3 rounded-lg border px-3 py-2.5 text-sm",
                        isKey
                          ? "bg-emerald-950/40 border-emerald-600/60 text-emerald-50"
                          : isGiven
                            ? "bg-red-950/40 border-red-600/60 text-red-50"
                            : "bg-zinc-950/40 border-zinc-800 text-zinc-400"
                      )}
                    >
                      <span
                        className={cn(
                          "shrink-0 h-5 w-5 rounded-full border text-[10px] font-bold flex items-center justify-center mt-0.5",
                          isKey
                            ? "bg-emerald-500 border-emerald-500 text-black"
                            : isGiven
                              ? "bg-red-500 border-red-500 text-black"
                              : "border-zinc-700"
                        )}
                      >
                        {OPTION_LABELS[idx]}
                      </span>
                      <span className="leading-relaxed">{option}</span>
                      {isGiven && !isKey && (
                        <span className="ml-auto shrink-0 text-[10px] text-red-400 uppercase tracking-wide">
                          your answer
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="rounded-lg bg-gradient-to-br from-emerald-950/40 to-teal-950/20 border border-emerald-600/25 p-4">
                <h4 className="text-xs font-bold text-emerald-400 mb-1.5 flex items-center gap-1.5">
                  <Lightbulb className="h-3.5 w-3.5" />
                  Explanation
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed">{q.explanation}</p>
              </div>
            </Card>
          )
        })}
      </main>
    </div>
  )
}

export default function DsssbReviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          Loading solutions…
        </div>
      }
    >
      <ReviewContent />
    </Suspense>
  )
}
