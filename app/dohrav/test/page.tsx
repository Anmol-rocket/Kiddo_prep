"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { dohravPapers, DohravQuestion } from "@/lib/dohrav-papers"
import { recordTestResult, TestResult } from "@/lib/dohrav-revision"

const QUESTION_TIME_LIMIT = 60 // 60 seconds per question

function QuizContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paperIdStr = searchParams.get("paper")
  const paperId = paperIdStr ? parseInt(paperIdStr) : 1
  
  const paper = dohravPapers.find(p => p.id === paperId)
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [answers, setAnswers] = useState<TestResult['answers']>([])
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [isFinishing, setIsFinishing] = useState(false)

  // Initialize and load session
  useEffect(() => {
    if (!paper) {
      router.replace("/dohrav")
      return
    }

    const savedSession = localStorage.getItem(`kiddoprep_dohrav_session_${paperId}`)
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession)
        setCurrentIndex(session.currentIndex)
        setAnswers(session.answers)
        // If restoring in middle of question, reset timer for simplicity
        setTimeLeft(QUESTION_TIME_LIMIT)
      } catch (e) {
        console.error("Failed to load session", e)
      }
    }

    // Prevent accidental back navigation
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault()
      setShowExitConfirm(true)
      window.history.pushState(null, "", window.location.href)
    }
    
    window.history.pushState(null, "", window.location.href)
    window.addEventListener("popstate", handlePopState)
    
    return () => window.removeEventListener("popstate", handlePopState)
  }, [paper, paperId, router])

  // Timer logic
  useEffect(() => {
    if (showAnswer || isFinishing || !paper) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [showAnswer, isFinishing, paper])

  // Save session on state change
  useEffect(() => {
    if (!paper || isFinishing) return
    const session = { currentIndex, answers }
    localStorage.setItem(`kiddoprep_dohrav_session_${paperId}`, JSON.stringify(session))
  }, [currentIndex, answers, paperId, paper, isFinishing])

  if (!paper) return null

  const question = paper.questions[currentIndex]

  const handleTimeUp = () => {
    // Auto-submit as incorrect when time runs out
    handleSubmit(null)
  }

  const handleSubmit = (forcedOption: number | null = selectedOption) => {
    if (showAnswer) return
    
    const isCorrect = forcedOption === null ? false : forcedOption === question.correctAnswer
    const timeTaken = QUESTION_TIME_LIMIT - timeLeft
    
    setShowAnswer(true)
    
    setAnswers(prev => {
      const newAnswers = [...prev]
      newAnswers[currentIndex] = {
        questionId: question.id,
        selectedOption: forcedOption,
        isCorrect,
        timeTaken
      }
      return newAnswers
    })
  }

  const handleNext = () => {
    if (currentIndex < paper.questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
      setShowAnswer(false)
      setTimeLeft(QUESTION_TIME_LIMIT)
    } else {
      finishTest()
    }
  }

  const finishTest = () => {
    setIsFinishing(true)
    
    let correct = 0
    let incorrect = 0
    let skipped = 0
    
    // Fill in any skipped questions if they somehow bypassed
    const finalAnswers = paper.questions.map((q, i) => {
      const ans = answers[i]
      if (ans) {
        if (ans.isCorrect) correct++
        else if (ans.selectedOption === null) skipped++
        else incorrect++
        return ans
      } else {
        skipped++
        return {
          questionId: q.id,
          selectedOption: null,
          isCorrect: null,
          timeTaken: 0
        }
      }
    })

    const result: TestResult = {
      paperId: paper.id,
      totalQuestions: paper.questions.length,
      correct,
      incorrect,
      skipped,
      answers: finalAnswers,
      completedAt: Date.now()
    }

    recordTestResult(result)
    localStorage.removeItem(`kiddoprep_dohrav_session_${paperId}`)
    router.replace(`/dohrav/results?paper=${paper.id}`)
  }

  const exitQuiz = () => {
    router.replace("/dohrav")
  }

  const progressPercent = ((currentIndex) / paper.questions.length) * 100

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Navigation & Progress */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 p-4">
        <div className="container max-w-2xl mx-auto flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={() => setShowExitConfirm(true)}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="text-center">
            <h1 className="font-bold text-sm text-zinc-300">{paper.name}</h1>
            <div className="text-xs text-purple-400">
              Question {currentIndex + 1} of {paper.questions.length}
            </div>
          </div>
          <div className="w-10 flex justify-center">
            {/* Small circular timer indicator */}
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-bold",
              timeLeft <= 10 ? "border-red-500 text-red-500 animate-pulse" : 
              timeLeft <= 20 ? "border-yellow-500 text-yellow-500" : 
              "border-purple-500 text-purple-400"
            )}>
              {timeLeft}
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="container max-w-2xl mx-auto h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-300" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </header>

      <main className="flex-1 container max-w-2xl mx-auto px-4 py-6 flex flex-col">
        {/* Question Card */}
        <Card className="bg-zinc-900/80 border-zinc-800 p-6 mb-6">
          <h2 className="text-lg md:text-xl font-medium leading-relaxed">
            {question.question}
          </h2>
        </Card>

        {/* Options */}
        <div className="space-y-3 mb-8 flex-1">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx
            const isCorrectAnswer = idx === question.correctAnswer
            
            let stateClass = "bg-zinc-900 border-zinc-800 hover:border-purple-500/50 hover:bg-zinc-800"
            let icon = null

            if (showAnswer) {
              if (isCorrectAnswer) {
                stateClass = "bg-green-950/40 border-green-500 text-green-50"
                icon = <CheckCircle className="h-5 w-5 text-green-500" />
              } else if (isSelected) {
                stateClass = "bg-red-950/40 border-red-500 text-red-50"
                icon = <XCircle className="h-5 w-5 text-red-500" />
              } else {
                stateClass = "bg-zinc-900/50 border-zinc-800/50 opacity-50"
              }
            } else if (isSelected) {
              stateClass = "bg-purple-900/40 border-purple-500"
            }

            return (
              <button
                key={idx}
                onClick={() => !showAnswer && setSelectedOption(idx)}
                disabled={showAnswer}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between",
                  stateClass
                )}
              >
                <span className="flex-1 text-sm md:text-base">{option}</span>
                {icon && <span className="ml-3 shrink-0 animate-in zoom-in">{icon}</span>}
              </button>
            )
          })}
        </div>

        {/* Explanation (Shows after answering) */}
        {showAnswer && (
          <div className="mb-24 animate-in slide-in-from-bottom-4 duration-300">
            <Card className="bg-gradient-to-br from-violet-900/20 to-purple-900/20 border-purple-500/30 p-5">
              <h3 className="text-sm font-bold text-purple-400 mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4" /> Explanation
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {question.explanation}
              </p>
            </Card>
          </div>
        )}
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 p-4">
        <div className="container max-w-2xl mx-auto flex gap-4">
          {!showAnswer ? (
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-lg"
              onClick={() => handleSubmit()}
              disabled={selectedOption === null}
            >
              Submit Answer
            </Button>
          ) : (
            <Button 
              className="w-full bg-white text-black hover:bg-zinc-200 h-12 text-lg font-bold"
              onClick={handleNext}
            >
              {currentIndex < paper.questions.length - 1 ? "Next Question" : "Finish Test"}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      <Dialog open={showExitConfirm} onOpenChange={setShowExitConfirm}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white w-[90%] max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="text-yellow-500 h-5 w-5" />
              Quit Test?
            </DialogTitle>
            <DialogDescription className="text-zinc-400 pt-2 text-base">
              Your progress has been saved. You can resume this test later from the Dohrav dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button variant="destructive" onClick={exitQuiz} className="w-full">
              Yes, save and quit
            </Button>
            <Button variant="outline" onClick={() => setShowExitConfirm(false)} className="w-full border-zinc-700 bg-zinc-900">
              Cancel, continue test
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function DohravTestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <QuizContent />
    </Suspense>
  )
}
