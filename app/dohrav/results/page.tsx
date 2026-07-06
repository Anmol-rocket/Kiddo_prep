"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, 
  XCircle, 
  Trophy, 
  ChevronRight, 
  ListFilter,
  Brain,
  AlertCircle
} from "lucide-react"
import { dohravPapers } from "@/lib/dohrav-papers"
import { getTestResult, getRevisionStats, isGateRequired, TestResult } from "@/lib/dohrav-revision"

function ResultsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paperIdStr = searchParams.get("paper")
  const paperId = paperIdStr ? parseInt(paperIdStr) : null

  const [result, setResult] = useState<TestResult | null>(null)
  const [stats, setStats] = useState({ total: 0, active: 0, mastered: 0, avgMastery: 0 })
  const [gateNeeded, setGateNeeded] = useState(false)
  const [mounted, setMounted] = useState(false)

  const paper = paperId ? dohravPapers.find(p => p.id === paperId) : null

  useEffect(() => {
    if (paperId) {
      setResult(getTestResult(paperId))
      setStats(getRevisionStats())
      setGateNeeded(isGateRequired())
    }
    setMounted(true)
  }, [paperId])

  if (!mounted) return null
  if (!paper || !result) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Results Not Found</h2>
        <p className="text-zinc-400 mb-6 text-center">We couldn't find the results for this test paper.</p>
        <Button onClick={() => router.push("/dohrav")}>Back to Dohrav</Button>
      </div>
    )
  }

  const accuracy = Math.round((result.correct / result.totalQuestions) * 100)
  const addedToBank = result.incorrect + result.skipped

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 p-4">
        <div className="container mx-auto flex items-center justify-center">
          <h1 className="font-bold text-lg bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
            Test Results
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-md space-y-6 animate-fade-in">
        
        {/* Main Score Card */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
            <div className="relative bg-zinc-900 border border-purple-500/30 w-24 h-24 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
              <Trophy className="h-10 w-10 text-purple-400" />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold">{paper.name} Completed!</h2>
            <p className="text-zinc-400 text-sm mt-1">{paper.subtitle}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-zinc-900/50 border-zinc-800 p-4 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-green-500">{result.correct}</span>
            <span className="text-xs text-zinc-400 mt-1 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> Correct
            </span>
          </Card>
          
          <Card className="bg-zinc-900/50 border-zinc-800 p-4 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-red-500">{result.incorrect}</span>
            <span className="text-xs text-zinc-400 mt-1 uppercase tracking-wider flex items-center gap-1">
              <XCircle className="h-3 w-3" /> Incorrect
            </span>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800 p-4 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-yellow-500">{result.skipped}</span>
            <span className="text-xs text-zinc-400 mt-1 uppercase tracking-wider flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> Skipped
            </span>
          </Card>
          
          <Card className="bg-purple-900/20 border-purple-500/30 p-4 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-purple-400">{accuracy}%</span>
            <span className="text-xs text-purple-400/70 mt-1 uppercase tracking-wider">
              Accuracy
            </span>
          </Card>
        </div>

        {/* Revision Bank Update */}
        {addedToBank > 0 && (
          <Card className="bg-gradient-to-r from-red-950/30 to-purple-950/30 border-red-500/30 p-4 mt-6 animate-in slide-in-from-bottom-4 delay-150 fill-mode-both">
            <div className="flex items-start gap-3">
              <div className="bg-red-500/20 p-2 rounded-full mt-1">
                <Brain className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-bold text-red-400">Added to Revision Bank</h3>
                <p className="text-sm text-zinc-300 mt-1">
                  {addedToBank} weak questions have been added to your personal bank for future revision.
                </p>
                <div className="mt-3 flex gap-4 text-sm font-medium">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    Total Active: {stats.active}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Gate Warning */}
        {gateNeeded && (
          <div className="bg-violet-900/30 border border-violet-500/50 rounded-xl p-4 flex items-center gap-3 animate-pulse">
            <AlertCircle className="h-6 w-6 text-violet-400 shrink-0" />
            <p className="text-sm text-violet-200">
              You must pass a Revision Gate (3/5 correct) to unlock the next test paper.
            </p>
          </div>
        )}

      </main>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-md border-t border-white/10">
        <div className="container mx-auto max-w-md flex flex-col gap-3">
          <Button 
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white h-12"
            onClick={() => router.push(`/dohrav/review?paper=${paper.id}`)}
          >
            <ListFilter className="mr-2 h-5 w-5" />
            Review All Answers
          </Button>
          <Button 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12"
            onClick={() => router.push("/dohrav")}
          >
            Back to Dohrav Dashboard
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function DohravResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ResultsContent />
    </Suspense>
  )
}
