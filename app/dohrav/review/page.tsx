"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Brain,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { dohravPapers } from "@/lib/dohrav-papers"
import { getTestResult, TestResult } from "@/lib/dohrav-revision"

function ReviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paperIdStr = searchParams.get("paper")
  const paperId = paperIdStr ? parseInt(paperIdStr) : null

  const [result, setResult] = useState<TestResult | null>(null)
  const [mounted, setMounted] = useState(false)

  const paper = paperId ? dohravPapers.find(p => p.id === paperId) : null

  useEffect(() => {
    if (paperId) {
      setResult(getTestResult(paperId))
    }
    setMounted(true)
  }, [paperId])

  if (!mounted) return null
  if (!paper || !result) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Results Not Found</h2>
        <Button onClick={() => router.push("/dohrav")}>Back to Dohrav</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 p-4">
        <div className="container max-w-2xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push(`/dohrav/results?paper=${paper.id}`)}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="text-center">
            <h1 className="font-bold text-sm text-zinc-100">Review Answers</h1>
            <p className="text-xs text-purple-400">{paper.name}</p>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-8">
        {paper.questions.map((question, index) => {
          const answer = result.answers[index]
          const isCorrect = answer?.isCorrect
          const isSkipped = answer?.selectedOption === null || answer === undefined
          
          return (
            <div key={question.id} className="space-y-4 pt-6 border-t border-zinc-800 first:border-0 first:pt-0">
              
              <div className="flex items-start justify-between gap-4">
                <Badge variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-400 whitespace-nowrap">
                  Q {index + 1}
                </Badge>
                
                <div className="flex gap-2">
                  {isSkipped ? (
                    <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20">Skipped</Badge>
                  ) : isCorrect ? (
                    <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/20">Correct</Badge>
                  ) : (
                    <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/20">Incorrect</Badge>
                  )}
                  {answer && answer.timeTaken > 0 && (
                    <Badge variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {answer.timeTaken}s
                    </Badge>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-medium leading-relaxed">{question.question}</h3>

              <div className="space-y-2">
                {question.options.map((option, optIdx) => {
                  const isUserSelection = answer?.selectedOption === optIdx
                  const isActualCorrect = question.correctAnswer === optIdx
                  
                  let stateClass = "bg-zinc-900/50 border-zinc-800 opacity-50"
                  let icon = null

                  if (isActualCorrect) {
                    stateClass = "bg-green-950/40 border-green-500 text-green-50 opacity-100"
                    icon = <CheckCircle className="h-5 w-5 text-green-500" />
                  } else if (isUserSelection) {
                    stateClass = "bg-red-950/40 border-red-500 text-red-50 opacity-100"
                    icon = <XCircle className="h-5 w-5 text-red-500" />
                  }

                  return (
                    <div
                      key={optIdx}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border flex items-center justify-between",
                        stateClass
                      )}
                    >
                      <span className="text-sm md:text-base">{option}</span>
                      {icon && <span className="ml-3 shrink-0">{icon}</span>}
                    </div>
                  )
                })}
              </div>

              <Card className="bg-purple-900/10 border-purple-500/20 p-4 mt-2">
                <h4 className="text-xs font-bold text-purple-400 flex items-center gap-1.5 mb-1.5 uppercase tracking-wider">
                  <Brain className="h-3.5 w-3.5" /> Explanation
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {question.explanation}
                </p>
              </Card>
              
            </div>
          )
        })}
      </main>
      
      <div className="container max-w-2xl mx-auto px-4 mt-8 pb-8">
        <Button 
          onClick={() => router.push("/dohrav")}
          className="w-full bg-zinc-800 hover:bg-zinc-700 h-12"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}

export default function DohravReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ReviewContent />
    </Suspense>
  )
}
