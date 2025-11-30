"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { questions } from "@/lib/questions"

interface ReviewProps {
  topicId: string
  onBack: () => void
}

export default function Review({ topicId, onBack }: ReviewProps) {
  const [lastAttempt, setLastAttempt] = useState<any | null>(null)
  const [topic, setTopic] = useState<any | null>(null)

  useEffect(() => {
    const t = questions.topics.find((x) => x.id === topicId)
    setTopic(t || null)

    try {
      const raw = localStorage.getItem("kiddoprep_stats")
      if (!raw) return
      const statsObj = JSON.parse(raw)
      const topicStats = statsObj[topicId]
      if (!topicStats || !topicStats.attempts || topicStats.attempts.length === 0) return
      const lastAttempt = topicStats.attempts[topicStats.attempts.length - 1]
      setLastAttempt(lastAttempt || null)
    } catch (e) {
      console.error(e)
    }
  }, [topicId])

  if (!topic) {
    return (
      <div className="p-8">
        <Button onClick={onBack} variant="ghost">
          Back
        </Button>
        <div className="text-center mt-8">Topic not found.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-sm py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Review: {topic.name}</h2>
              <p className="text-sm text-muted-foreground">Previous attempt review (most recent)</p>
            </div>
            <Button onClick={onBack} variant="outline">
              Back
            </Button>
          </div>
        </div>

        {!lastAttempt && (
          <Card className="p-6">No previous attempts found for this topic.</Card>
        )}

        {lastAttempt && (() => {
          // determine review questions (either the saved ids or all topic questions)
          const reviewQuestions = Array.isArray(lastAttempt.quizQuestionIds) && lastAttempt.quizQuestionIds.length > 0
            ? lastAttempt.quizQuestionIds.map((id: number) => topic.questions.find((q) => q.id === id)).filter(Boolean)
            : topic.questions

          return (
            <div className="space-y-4">
              {reviewQuestions.map((q: any) => {
                const ans = (lastAttempt.answers || []).find((a: any) => a.questionId === q.id)
                const selected = ans?.selectedOption ?? null
                const isCorrect = ans?.isCorrect === true
                const wasSkipped = ans && ans.attempted === false && ans.selectedOption === null

                return (
                  <Card key={q.id} className="p-6">
                    <div className="mb-3">
                      <h3 className="font-semibold text-lg">{q.question}</h3>
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt: string, idx: number) => {
                        const correct = idx === q.correctAnswer
                        const chosen = idx === selected
                        const wasSkippedOpt = ans && ans.attempted === false && ans.selectedOption === null
                        const bg = wasSkippedOpt
                          ? "bg-slate-700 border-slate-600"
                          : correct
                          ? "bg-green-50 border-green-300"
                          : chosen && !correct
                          ? "bg-red-50 border-red-300"
                          : "bg-background/30 border-border/50"
                        const textClass = wasSkippedOpt ? "text-slate-200 font-medium" : correct ? "text-green-900 font-medium" : chosen && !correct ? "text-red-900 font-medium" : "text-foreground"

                        return (
                          <div key={idx} className={`p-3 rounded-md border ${bg}`}>
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${chosen ? (isCorrect ? "bg-green-600 border-green-600" : "bg-red-600 border-red-600") : "bg-transparent"}`} />
                              <div className={`flex-1 ${textClass}`}>{opt}</div>
                              {correct && <div className="text-sm text-green-900 font-medium">Correct</div>}
                              {chosen && !correct && <div className="text-sm text-red-900 font-medium">Your answer</div>}
                              {wasSkippedOpt && (
                                <div className="flex items-center gap-2">
                                  <div className="text-sm px-2 py-1 rounded-full bg-yellow-100 text-yellow-900 font-medium border border-yellow-200">Skipped</div>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {q.explanation && (
                      <div className="mt-4">
                        {ans && ans.selectedOption !== null && (
                          <div className="text-sm text-muted-foreground mb-2">You answered: {q.options[ans.selectedOption]}</div>
                        )}
                        <div className="p-3 bg-muted rounded text-sm text-muted-foreground">{q.explanation}</div>
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          )
        })()}
      </div>
    </div>
  )
}
