"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Lock, 
  Unlock,
  Brain,
  RefreshCw,
  PartyPopper
} from "lucide-react"
import { cn } from "@/lib/utils"
import { dohravPapers, DohravQuestion } from "@/lib/dohrav-papers"
import { 
  getGateQuestions,
  recordGateAttempt, 
  getTestProgress,
  GateResult
} from "@/lib/dohrav-revision"

const GATE_QUESTION_COUNT = 5
const PASS_THRESHOLD = 3
const QUESTION_TIME_LIMIT = 60

function findQuestionById(questionId: string): DohravQuestion | null {
  for (const paper of dohravPapers) {
    const q = paper.questions.find(q => q.id === questionId)
    if (q) return q
  }
  return null
}

export default function RevisionGatePage() {
  const router = useRouter()
  
  const [questions, setQuestions] = useState<DohravQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [answers, setAnswers] = useState<GateResult['answers']>([])
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT)
  
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [isFinishing, setIsFinishing] = useState(false)
  const [gateResult, setGateResult] = useState<GateResult | null>(null)

  // Initialize gate session
  useEffect(() => {
    // 1. Check if we have a saved session
    const savedSession = localStorage.getItem(`kiddoprep_dohrav_gate_session`)
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession)
        // Re-hydrate questions
        const loadedQuestions = session.questionIds.map(findQuestionById).filter(Boolean) as DohravQuestion[]
        if (loadedQuestions.length === GATE_QUESTION_COUNT) {
          setQuestions(loadedQuestions)
          setCurrentIndex(session.currentIndex)
          setAnswers(session.answers)
          return
        }
      } catch (e) {
        console.error("Failed to load gate session", e)
      }
    }

    // 2. No session or invalid, get fresh questions
    const qIds = getGateQuestions(GATE_QUESTION_COUNT)
    if (qIds.length === 0) {
      // No questions in bank! Gate shouldn't be here.
      router.replace("/dohrav")
      return
    }

    const loadedQuestions = qIds.map(findQuestionById).filter(Boolean) as DohravQuestion[]
    setQuestions(loadedQuestions)
    
    // Prevent accidental back navigation
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault()
      setShowExitConfirm(true)
      window.history.pushState(null, "", window.location.href)
    }
    
    window.history.pushState(null, "", window.location.href)
    window.addEventListener("popstate", handlePopState)
    
    return () => window.removeEventListener("popstate", handlePopState)
  }, [router])

  // Timer logic
  useEffect(() => {
    if (showAnswer || isFinishing || questions.length === 0 || gateResult) return

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
  }, [showAnswer, isFinishing, questions.length, gateResult])

  // Save session on state change
  useEffect(() => {
    if (questions.length === 0 || isFinishing || gateResult) return
    const session = { 
      questionIds: questions.map(q => q.id),
      currentIndex, 
      answers 
    }
    localStorage.setItem(`kiddoprep_dohrav_gate_session`, JSON.stringify(session))
  }, [currentIndex, answers, questions, isFinishing, gateResult])

  if (questions.length === 0) return null

  // If gate is finished, show result screen
  if (gateResult) {
    const isPassed = gateResult.passed
    const progress = getTestProgress()
    
    return (
      <div className="min-h-screen bg-black text-white p-4 pb-24 flex flex-col items-center justify-center">
        {isPassed && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Simple CSS particle effect or glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/20 blur-[100px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/20 blur-[80px] rounded-full" />
          </div>
        )}
        
        <Card className="relative z-10 w-full max-w-md bg-zinc-900/80 border-zinc-800 p-8 flex flex-col items-center text-center animate-in zoom-in duration-500">
          <div className={cn(
            "p-4 rounded-full mb-6",
            isPassed ? "bg-green-500/20" : "bg-red-500/20"
          )}>
            {isPassed ? (
              <Unlock className="h-12 w-12 text-green-400" />
            ) : (
              <Lock className="h-12 w-12 text-red-400" />
            )}
          </div>
          
          <h2 className="text-3xl font-bold mb-2">
            {isPassed ? "Gate Passed!" : "Gate Not Passed"}
          </h2>
          <p className="text-zinc-400 mb-8">
            You got <span className={isPassed ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{gateResult.correct}</span> out of {gateResult.total} correct.
            <br/>
            {isPassed 
              ? "The next test paper is now unlocked!" 
              : `You need ${PASS_THRESHOLD} correct to unlock the next test.`}
          </p>

          <div className="flex justify-center gap-2 mb-8">
            {gateResult.answers.map((ans, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                  ans.isCorrect ? "bg-green-500/20 text-green-500 border border-green-500/50" : 
                  "bg-red-500/20 text-red-500 border border-red-500/50"
                )}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="w-full space-y-3">
            {isPassed ? (
              <>
                <Button 
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white h-12"
                  onClick={() => router.replace(`/dohrav/test?paper=${progress.currentPaper}`)}
                >
                  <PartyPopper className="w-5 h-5 mr-2" />
                  Start Next Test
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-zinc-700 bg-transparent text-zinc-300 h-12"
                  onClick={() => router.replace("/dohrav")}
                >
                  Back to Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white h-12"
                  onClick={() => {
                    localStorage.removeItem(`kiddoprep_dohrav_gate_session`)
                    window.location.reload()
                  }}
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Try Again with New Questions
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-zinc-700 bg-transparent text-zinc-300 h-12"
                  onClick={() => router.replace("/dohrav")}
                >
                  Back to Dashboard
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    )
  }

  const question = questions[currentIndex]

  const handleTimeUp = () => {
    handleSubmit(null)
  }

  const handleSubmit = (forcedOption: number | null = selectedOption) => {
    if (showAnswer) return
    
    const isCorrect = forcedOption === null ? false : forcedOption === question.correctAnswer
    
    setShowAnswer(true)
    
    setAnswers(prev => {
      const newAnswers = [...prev]
      newAnswers[currentIndex] = {
        questionId: question.id,
        isCorrect
      }
      return newAnswers
    })
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
      setShowAnswer(false)
      setTimeLeft(QUESTION_TIME_LIMIT)
    } else {
      finishGate()
    }
  }

  const finishGate = () => {
    setIsFinishing(true)
    
    // Fill skipped
    const finalAnswers = questions.map((q, i) => {
      const ans = answers[i]
      if (ans) return ans
      return { questionId: q.id, isCorrect: false }
    })
    
    const correctCount = finalAnswers.filter(a => a.isCorrect).length
    const passed = correctCount >= PASS_THRESHOLD
    
    const result: GateResult = {
      passed,
      correct: correctCount,
      total: questions.length,
      answers: finalAnswers
    }
    
    recordGateAttempt(result)
    localStorage.removeItem(`kiddoprep_dohrav_gate_session`)
    setGateResult(result)
  }

  const exitGate = () => {
    router.replace("/dohrav")
  }

  const progressPercent = ((currentIndex) / questions.length) * 100

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Navigation & Progress */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 p-4">
        <div className="container max-w-2xl mx-auto flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={() => setShowExitConfirm(true)}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="text-center">
            <h1 className="font-bold text-sm text-violet-400 flex items-center justify-center gap-1">
              <Lock className="w-4 h-4" /> Revision Gate
            </h1>
            <div className="text-xs text-zinc-400 mt-1">
              Question {currentIndex + 1} of {questions.length}
            </div>
          </div>
          <div className="w-10 flex justify-center">
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-bold",
              timeLeft <= 10 ? "border-red-500 text-red-500 animate-pulse" : 
              timeLeft <= 20 ? "border-yellow-500 text-yellow-500" : 
              "border-violet-500 text-violet-400"
            )}>
              {timeLeft}
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="container max-w-2xl mx-auto h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-violet-500 transition-all duration-300" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </header>

      <main className="flex-1 container max-w-2xl mx-auto px-4 py-6 flex flex-col">
        {/* Requirement Banner */}
        <div className="mb-6 bg-violet-900/20 border border-violet-500/30 rounded-lg p-3 text-center text-xs text-violet-300">
          Get {PASS_THRESHOLD} out of {GATE_QUESTION_COUNT} correct to unlock the next test.
        </div>

        {/* Question Card */}
        <Card className="bg-zinc-900/80 border-zinc-800 p-6 mb-6 shadow-xl shadow-black/50">
          <h2 className="text-lg md:text-xl font-medium leading-relaxed">
            {question.question}
          </h2>
        </Card>

        {/* Options */}
        <div className="space-y-3 mb-8 flex-1">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx
            const isCorrectAnswer = idx === question.correctAnswer
            
            let stateClass = "bg-zinc-900 border-zinc-800 hover:border-violet-500/50 hover:bg-zinc-800"
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
              stateClass = "bg-violet-900/40 border-violet-500"
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

        {/* Explanation */}
        {showAnswer && (
          <div className="mb-24 animate-in slide-in-from-bottom-4 duration-300">
            <Card className="bg-violet-900/20 border-violet-500/30 p-5">
              <h3 className="text-sm font-bold text-violet-400 mb-2 flex items-center gap-2">
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
              className="w-full bg-violet-600 hover:bg-violet-700 h-12 text-lg"
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
              {currentIndex < questions.length - 1 ? "Next Question" : "Finish Revision Gate"}
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
              Quit Revision Gate?
            </DialogTitle>
            <DialogDescription className="text-zinc-400 pt-2 text-base">
              If you quit now, your progress in this revision session will be saved.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button variant="destructive" onClick={exitGate} className="w-full">
              Yes, save and quit
            </Button>
            <Button variant="outline" onClick={() => setShowExitConfirm(false)} className="w-full border-zinc-700 bg-zinc-900">
              Cancel, continue revision
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
