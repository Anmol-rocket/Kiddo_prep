"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  Lock, 
  Unlock, 
  CheckCircle, 
  Brain,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  Trophy
} from "lucide-react"
import { cn } from "@/lib/utils"
import { dohravPapers } from "@/lib/dohrav-papers"
import { 
  getTestProgress, 
  getRevisionStats, 
  getTestResult, 
  isGateRequired,
  TestProgress
} from "@/lib/dohrav-revision"

export default function DohravHome() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState<TestProgress | null>(null)
  const [stats, setStats] = useState({ total: 0, active: 0, mastered: 0, avgMastery: 0 })
  const [gateNeeded, setGateNeeded] = useState(false)

  useEffect(() => {
    setProgress(getTestProgress())
    setStats(getRevisionStats())
    setGateNeeded(isGateRequired())
    setMounted(true)
  }, [])

  if (!mounted || !progress) return null

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
            <h1 className="font-bold text-lg bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
              Dohrav (दोहराव)
            </h1>
            <span className="text-[10px] text-purple-400/80 uppercase tracking-wider">Personal Revision</span>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-8 animate-fade-in">
        
        {/* Info Banner */}
        <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 border border-purple-500/30 rounded-xl p-4 flex gap-4">
          <div className="bg-purple-500/20 p-2 rounded-full h-fit">
            <AlertCircle className="h-6 w-6 text-purple-400" />
          </div>
          <div className="text-sm text-purple-100/80">
            <p>Complete test papers in sequence. Wrong answers go to your Personal Revision Bank. Pass a Revision Gate (3/5 correct) to unlock the next test.</p>
          </div>
        </div>

        {/* Revision Gate Prompt */}
        {gateNeeded && (
          <div className="animate-pulse-slow">
            <Card className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border-violet-500 p-6 flex flex-col items-center text-center gap-4">
              <div className="bg-violet-500/30 p-4 rounded-full">
                <Unlock className="h-8 w-8 text-violet-300" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Revision Gate Locked</h3>
                <p className="text-sm text-white/70 mt-1">
                  You must complete a quick revision of {Math.min(5, stats.active)} weak questions to unlock the next test.
                </p>
              </div>
              <Button 
                onClick={() => router.push("/dohrav/revision-gate")}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                size="lg"
              >
                Pass Revision Gate
              </Button>
            </Card>
          </div>
        )}

        {/* Revision Bank Stats */}
        {stats.total > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-400" />
                Personal Revision Bank
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                onClick={() => router.push("/dohrav/bank")}
              >
                View Details
              </Button>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-zinc-900/50 border-zinc-800 p-4">
                <div className="text-sm text-zinc-400">Active Weak</div>
                <div className="text-3xl font-bold text-purple-400">{stats.active}</div>
              </Card>
              <Card className="bg-zinc-900/50 border-zinc-800 p-4">
                <div className="text-sm text-zinc-400">Mastered</div>
                <div className="text-3xl font-bold text-green-500">{stats.mastered}</div>
              </Card>
            </div>
            
            {stats.active > 0 && (
              <div className="mt-4 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400">Avg Mastery Progress</span>
                  <span className="text-purple-400">{Math.round(stats.avgMastery * 100)}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-1000"
                    style={{ width: `${stats.avgMastery * 100}%` }}
                  />
                </div>
              </div>
            )}
          </section>
        )}

        {/* Papers List */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-purple-400" />
            Test Papers
          </h2>
          <div className="space-y-4">
            {dohravPapers.map((paper, index) => {
              const isCompleted = progress.completedPapers.includes(paper.id)
              const isUnlocked = progress.currentPaper === paper.id && !gateNeeded
              const isLocked = paper.id > progress.currentPaper || (paper.id === progress.currentPaper && gateNeeded)
              
              const result = isCompleted ? getTestResult(paper.id) : null
              const accuracy = result ? Math.round((result.correct / result.totalQuestions) * 100) : 0

              return (
                <Card 
                  key={paper.id}
                  className={cn(
                    "p-5 transition-all duration-300 relative overflow-hidden",
                    isCompleted ? "bg-zinc-900/80 border-green-500/30" : 
                    isUnlocked ? "bg-gradient-to-br from-purple-900/40 to-violet-900/20 border-purple-500/50" : 
                    "bg-zinc-900/30 border-zinc-800/50 opacity-60"
                  )}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{paper.name}</h3>
                      <p className="text-sm text-zinc-400 mt-1">{paper.subtitle}</p>
                    </div>
                    {isCompleted ? (
                      <Badge className="bg-green-500/20 text-green-400 border-none pointer-events-none">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    ) : isUnlocked ? (
                      <Badge className="bg-purple-500/20 text-purple-400 border-none pointer-events-none animate-pulse">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Next
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-zinc-500 border-zinc-700 pointer-events-none">
                        <Lock className="h-3 w-3 mr-1" />
                        Locked
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-zinc-400 mb-6">
                    <div className="flex items-center gap-1">
                      <RefreshCw className="h-4 w-4" />
                      {paper.totalQuestions} Qs
                    </div>
                    {isCompleted && result && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">{result.correct} ✔</span>
                        <span className="text-red-400">{result.incorrect} ✘</span>
                      </div>
                    )}
                  </div>

                  {isUnlocked && (
                    <Button 
                      onClick={() => router.push(`/dohrav/test?paper=${paper.id}`)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Start Test
                    </Button>
                  )}
                  
                  {isCompleted && (
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => router.push(`/dohrav/results?paper=${paper.id}`)}
                        variant="secondary"
                        className="w-full bg-zinc-800 hover:bg-zinc-700"
                      >
                        View Results
                      </Button>
                      <Button 
                        onClick={() => router.push(`/dohrav/review?paper=${paper.id}`)}
                        variant="outline"
                        className="w-full border-zinc-700 text-zinc-300"
                      >
                        Review
                      </Button>
                    </div>
                  )}

                  {isLocked && !isCompleted && (
                    <div className="text-xs text-zinc-500 text-center bg-zinc-900/50 py-2 rounded">
                      {gateNeeded && paper.id === progress.currentPaper 
                        ? "Pass Revision Gate to unlock" 
                        : "Complete previous test to unlock"}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </section>

      </main>
    </div>
  )
}
