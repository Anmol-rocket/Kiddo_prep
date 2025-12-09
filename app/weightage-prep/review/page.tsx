"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { weightageTopics, WeightageTopic } from "@/lib/weightage-topics"
import { ChevronLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface AttemptStats {
  topicId: string
  totalQuestions: number
  attempted: number
  correct: number
  incorrect: number
  unattempted: number
  answers: Array<{
    questionId: number
    selectedOption: number | null
    isCorrect: boolean | null
    attempted: boolean
  }>
  quizQuestionIds: number[]
  timestamp: string
}

export default function WeightageReviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const topicId = searchParams.get("topic")

  const [topic, setTopic] = useState<WeightageTopic | null>(null)
  const [lastAttempt, setLastAttempt] = useState<AttemptStats | null>(null)

  useEffect(() => {
    if (!topicId) {
      router.push("/weightage-prep")
      return
    }

    const foundTopic = weightageTopics.find((t) => t.id === topicId)
    if (!foundTopic) {
      router.push("/weightage-prep")
      return
    }

    setTopic(foundTopic)

    // Load last attempt
    try {
      const raw = localStorage.getItem("kiddoprep_weightage_stats")
      if (!raw) return
      const statsObj = JSON.parse(raw)
      const topicStats = statsObj[topicId]
      if (!topicStats || !topicStats.attempts || topicStats.attempts.length === 0) return
      const last = topicStats.attempts[topicStats.attempts.length - 1]
      setLastAttempt(last)
    } catch (e) {
      console.error(e)
    }
  }, [topicId, router])

  if (!topic) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground mb-2">Loading...</div>
        </div>
      </div>
    )
  }

  if (!lastAttempt) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/50 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" onClick={() => router.push("/weightage-prep")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-2xl font-bold">Review: {topic.name}</h2>
          </div>
          <Card className="p-6">
            <div className="text-center text-muted-foreground">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No previous attempts found for this topic.</p>
              <Button
                className="mt-4"
                onClick={() => router.push(`/weightage-prep/quiz?topic=${topic.id}`)}
              >
                Start Practice
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // Get questions in the order they were attempted
  const reviewQuestions = lastAttempt.quizQuestionIds
    .map((id) => topic.questions.find((q) => q.id === id))
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-sm py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => router.push("/weightage-prep")}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div>
                <h2 className="text-xl md:text-2xl font-bold">Review: {topic.name}</h2>
                <p className="text-sm text-muted-foreground">
                  Most recent attempt • {new Date(lastAttempt.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="text-center p-2 bg-green-500/10 rounded-lg">
              <div className="text-lg font-bold text-green-500">{lastAttempt.correct}</div>
              <div className="text-xs text-muted-foreground">Correct</div>
            </div>
            <div className="text-center p-2 bg-red-500/10 rounded-lg">
              <div className="text-lg font-bold text-red-500">{lastAttempt.incorrect}</div>
              <div className="text-xs text-muted-foreground">Incorrect</div>
            </div>
            <div className="text-center p-2 bg-yellow-500/10 rounded-lg">
              <div className="text-lg font-bold text-yellow-500">{lastAttempt.unattempted}</div>
              <div className="text-xs text-muted-foreground">Skipped</div>
            </div>
            <div className="text-center p-2 bg-primary/10 rounded-lg">
              <div className="text-lg font-bold text-primary">
                {lastAttempt.attempted > 0
                  ? ((lastAttempt.correct / lastAttempt.attempted) * 100).toFixed(0)
                  : 0}%
              </div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
          </div>
        </div>

        {/* Questions Review */}
        <div className="space-y-4">
          {reviewQuestions.map((q, index) => {
            if (!q) return null
            const ans = lastAttempt.answers.find((a) => a.questionId === q.id)
            const selected = ans?.selectedOption ?? null
            const isCorrect = ans?.isCorrect === true
            const wasSkipped = ans && !ans.attempted

            return (
              <Card key={q.id} className="p-6 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                {/* Question Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    wasSkipped
                      ? "bg-yellow-500/20 text-yellow-500"
                      : isCorrect
                      ? "bg-green-500/20 text-green-500"
                      : "bg-red-500/20 text-red-500"
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{q.question}</h3>
                    {wasSkipped && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-yellow-500/20 text-yellow-500">
                        Skipped
                      </span>
                    )}
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-2 ml-11">
                  {q.options.map((opt, idx) => {
                    const correct = idx === q.correctAnswer
                    const chosen = idx === selected

                    let bgClass = "bg-background/30 border-border/50"
                    let textClass = "text-foreground"

                    if (correct) {
                      bgClass = "bg-green-50 border-green-300 dark:bg-green-500/10 dark:border-green-500/30"
                      textClass = "text-green-900 dark:text-green-400 font-medium"
                    } else if (chosen && !correct) {
                      bgClass = "bg-red-50 border-red-300 dark:bg-red-500/10 dark:border-red-500/30"
                      textClass = "text-red-900 dark:text-red-400"
                    }

                    return (
                      <div key={idx} className={`p-3 rounded-md border ${bgClass}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            correct
                              ? "bg-green-600 border-green-600"
                              : chosen && !correct
                              ? "bg-red-600 border-red-600"
                              : "bg-transparent border-border"
                          }`}>
                            {correct && <CheckCircle className="w-3 h-3 text-white" />}
                            {chosen && !correct && <XCircle className="w-3 h-3 text-white" />}
                          </div>
                          <span className={`flex-1 ${textClass}`}>{opt}</span>
                          {correct && (
                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                              Correct
                            </span>
                          )}
                          {chosen && !correct && (
                            <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                              Your answer
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="mt-4 ml-11 p-3 bg-muted rounded text-sm text-muted-foreground">
                    <span className="font-medium">Explanation:</span> {q.explanation}
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-3">
          <Button
            variant="outline"
            onClick={() => router.push("/weightage-prep")}
            className="flex-1"
          >
            Back to Topics
          </Button>
          <Button
            onClick={() => router.push(`/weightage-prep/quiz?topic=${topic.id}`)}
            className="flex-1"
          >
            Practice Again
          </Button>
        </div>
      </div>
    </div>
  )
}
