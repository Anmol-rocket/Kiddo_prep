"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { weightageTopics, WeightageTopic, WeightageQuestion } from "@/lib/weightage-topics"
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, AlertCircle } from "lucide-react"

function WeightageQuizContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const topicId = searchParams.get("topic")

  const [topic, setTopic] = useState<WeightageTopic | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [answers, setAnswers] = useState<Array<{
    questionId: number
    selectedOption: number | null
    isCorrect: boolean | null
    attempted: boolean
  }>>([])
  const [showQuitConfirm, setShowQuitConfirm] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

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

    if (foundTopic.questions.length === 0) {
      router.push("/weightage-prep")
      return
    }

    setTopic(foundTopic)

    // Try to restore session
    try {
      const sessionKey = `kiddoprep_weightage_session_${topicId}`
      const raw = localStorage.getItem(sessionKey)
      if (raw) {
        const session = JSON.parse(raw)
        if (session.currentQuestionIndex !== undefined) {
          setCurrentQuestionIndex(session.currentQuestionIndex)
          setAnswers(session.answers || [])
          setSelectedOption(session.selectedOption ?? null)
          setSubmitted(session.submitted ?? false)
        }
      }
    } catch {
      // Ignore
    }
  }, [topicId, router])

  // Save session
  useEffect(() => {
    if (!topicId) return
    try {
      const sessionKey = `kiddoprep_weightage_session_${topicId}`
      localStorage.setItem(sessionKey, JSON.stringify({
        currentQuestionIndex,
        answers,
        selectedOption,
        submitted,
        ts: Date.now()
      }))
    } catch {
      // Ignore
    }
  }, [topicId, currentQuestionIndex, answers, selectedOption, submitted])

  if (!topic) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground mb-2">Loading...</div>
        </div>
      </div>
    )
  }

  const currentQuestion = topic.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / topic.questions.length) * 100

  const handleSelectOption = (optionIndex: number) => {
    if (submitted) return
    setSelectedOption(optionIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return

    const isCorrect = selectedOption === currentQuestion.correctAnswer
    const answer = {
      questionId: currentQuestion.id,
      selectedOption,
      isCorrect,
      attempted: true,
    }

    setAnswers((prev) => [...prev, answer])
    setSubmitted(true)
  }

  const handleSkipQuestion = () => {
    const answer = {
      questionId: currentQuestion.id,
      selectedOption: null,
      isCorrect: null,
      attempted: false,
    }

    setAnswers((prev) => [...prev, answer])
    setSubmitted(true)
  }

  const moveToNext = () => {
    if (currentQuestionIndex + 1 >= topic.questions.length) {
      finishQuiz()
    } else {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedOption(null)
      setSubmitted(false)
    }
  }

  const moveToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      // Find the answer for the previous question
      const prevAnswer = answers.find(
        (a) => a.questionId === topic.questions[currentQuestionIndex - 1].id
      )
      setSelectedOption(prevAnswer?.selectedOption ?? null)
      setSubmitted(!!prevAnswer)
    }
  }

  const finishQuiz = () => {
    // Save stats
    const stats = {
      topicId: topic.id,
      totalQuestions: topic.questions.length,
      attempted: answers.filter((a) => a.attempted).length,
      correct: answers.filter((a) => a.isCorrect === true).length,
      incorrect: answers.filter((a) => a.isCorrect === false).length,
      unattempted: answers.filter((a) => !a.attempted).length,
      answers,
      quizQuestionIds: topic.questions.map((q) => q.id),
      timestamp: new Date().toISOString(),
    }

    try {
      const existingStats = localStorage.getItem("kiddoprep_weightage_stats")
      const statsObj = existingStats ? JSON.parse(existingStats) : {}

      const topicStats = statsObj[topic.id] || {
        attempted: 0,
        correct: 0,
        incorrect: 0,
        unattempted: 0,
        attempts: [],
      }

      topicStats.attempted += stats.attempted
      topicStats.correct += stats.correct
      topicStats.incorrect += stats.incorrect
      topicStats.unattempted += stats.unattempted

      if (!topicStats.attempts) topicStats.attempts = []
      topicStats.attempts.push(stats)

      statsObj[topic.id] = topicStats
      localStorage.setItem("kiddoprep_weightage_stats", JSON.stringify(statsObj))

      // Clear session
      const sessionKey = `kiddoprep_weightage_session_${topic.id}`
      localStorage.removeItem(sessionKey)
    } catch (e) {
      console.error("Error saving stats:", e)
    }

    setQuizCompleted(true)
  }

  const getOptionStyle = (optionIndex: number) => {
    if (!submitted) {
      return selectedOption === optionIndex
        ? "border-primary bg-primary/10"
        : "border-border/50 bg-background/30 hover:bg-background/50"
    }

    const isCorrect = optionIndex === currentQuestion.correctAnswer
    const isSelected = optionIndex === selectedOption

    if (isCorrect) {
      return "border-green-500 bg-green-500/20"
    }
    if (isSelected && !isCorrect) {
      return "border-red-500 bg-red-500/20"
    }
    return "border-border/50 bg-background/30 opacity-50"
  }

  if (quizCompleted) {
    const correct = answers.filter((a) => a.isCorrect === true).length
    const incorrect = answers.filter((a) => a.isCorrect === false).length
    const unattempted = answers.filter((a) => !a.attempted).length
    const accuracy = answers.length > 0 ? ((correct / answers.length) * 100).toFixed(1) : "0"

    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/50 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 md:p-8">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Quiz Completed!
              </h1>
              <p className="text-muted-foreground">{topic.name}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-green-500/10 rounded-lg">
                <div className="text-2xl font-bold text-green-500">{correct}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="text-center p-4 bg-red-500/10 rounded-lg">
                <div className="text-2xl font-bold text-red-500">{incorrect}</div>
                <div className="text-sm text-muted-foreground">Incorrect</div>
              </div>
              <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                <div className="text-2xl font-bold text-yellow-500">{unattempted}</div>
                <div className="text-sm text-muted-foreground">Skipped</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">{accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={() => router.push(`/weightage-prep/review?topic=${topic.id}`)}>
                Review Answers
              </Button>
              <Button variant="outline" onClick={() => router.push("/weightage-prep")}>
                Back to Topics
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setShowQuitConfirm(true)}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div>
              <h2 className="text-lg font-bold text-foreground">{topic.name}</h2>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {topic.questions.length}
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            No Timer - Practice Mode
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

      {/* Question Card */}
      <div className="max-w-2xl mx-auto mb-6 animate-slide-in">
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">
              {currentQuestion.question}
            </h3>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={submitted}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${getOptionStyle(idx)}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    submitted && idx === currentQuestion.correctAnswer
                      ? "bg-green-500 border-green-500"
                      : submitted && idx === selectedOption && idx !== currentQuestion.correctAnswer
                      ? "bg-red-500 border-red-500"
                      : selectedOption === idx
                      ? "bg-primary border-primary"
                      : "border-border"
                  }`}>
                    {submitted && idx === currentQuestion.correctAnswer && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                    {submitted && idx === selectedOption && idx !== currentQuestion.correctAnswer && (
                      <XCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {submitted && currentQuestion.explanation && (
            <div className="mt-6 p-4 bg-muted rounded-lg animate-fade-in">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <div className="font-medium text-sm mb-1">Explanation</div>
                  <div className="text-sm text-muted-foreground">
                    {currentQuestion.explanation}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="max-w-2xl mx-auto flex gap-3">
        <Button
          variant="outline"
          onClick={moveToPrevious}
          disabled={currentQuestionIndex === 0}
          className="flex-1"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {!submitted ? (
          <>
            <Button variant="outline" onClick={handleSkipQuestion} className="flex-1">
              Skip
            </Button>
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className="flex-1"
            >
              Submit
            </Button>
          </>
        ) : (
          <Button onClick={moveToNext} className="flex-1">
            {currentQuestionIndex + 1 >= topic.questions.length ? "Finish" : "Next"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      {/* Quit Confirmation Dialog */}
      <Dialog open={showQuitConfirm} onOpenChange={setShowQuitConfirm}>
        <DialogContent>
          <DialogTitle>Leave Quiz?</DialogTitle>
          <DialogDescription>
            Your progress will be saved. You can continue from where you left off later.
          </DialogDescription>
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowQuitConfirm(false)}>
              Continue Quiz
            </Button>
            <Button onClick={() => router.push("/weightage-prep")}>
              Leave
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-foreground mb-2">Loading...</div>
      </div>
    </div>
  )
}

export default function WeightageQuizPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <WeightageQuizContent />
    </Suspense>
  )
}
