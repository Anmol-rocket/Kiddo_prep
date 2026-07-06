"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  Brain, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  AlertCircle
} from "lucide-react"
import { dohravPapers, DohravQuestion } from "@/lib/dohrav-papers"
import { 
  getRevisionBank, 
  removeFromRevisionBank, 
  RevisionBankEntry 
} from "@/lib/dohrav-revision"
import { cn } from "@/lib/utils"

export default function RevisionBankPage() {
  const router = useRouter()
  const [bank, setBank] = useState<RevisionBankEntry[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setBank(getRevisionBank())
    setMounted(true)
  }, [])

  const handleRemove = (questionId: string) => {
    removeFromRevisionBank(questionId)
    setBank(prev => prev.filter(q => q.questionId !== questionId))
  }

  const findQuestion = (questionId: string): DohravQuestion | null => {
    for (const paper of dohravPapers) {
      const q = paper.questions.find(q => q.id === questionId)
      if (q) return q
    }
    return null
  }

  if (!mounted) return null

  const activeQuestions = bank.filter(q => !q.isMastered)
  const masteredQuestions = bank.filter(q => q.isMastered)

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 p-4">
        <div className="container max-w-3xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push("/dohrav")}
            className="text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-lg text-purple-400 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Revision Bank
            </h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
        {bank.length === 0 ? (
          <div className="text-center py-12 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Your Bank is Empty!</h2>
            <p className="text-zinc-400">Take some tests. Any questions you get wrong will appear here for revision.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card className="bg-zinc-900/50 border-purple-500/30 p-4 text-center">
                <div className="text-sm text-zinc-400">Active Weak</div>
                <div className="text-3xl font-bold text-purple-400">{activeQuestions.length}</div>
              </Card>
              <Card className="bg-zinc-900/50 border-green-500/30 p-4 text-center">
                <div className="text-sm text-zinc-400">Mastered</div>
                <div className="text-3xl font-bold text-green-500">{masteredQuestions.length}</div>
              </Card>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2 border-b border-zinc-800 pb-2">
                <AlertCircle className="h-5 w-5 text-purple-400" />
                Active Questions ({activeQuestions.length})
              </h2>
              
              {activeQuestions.length === 0 && (
                <p className="text-zinc-500 italic">No active weak questions.</p>
              )}

              {activeQuestions.map(entry => {
                const q = findQuestion(entry.questionId)
                if (!q) return null

                return (
                  <Card key={entry.questionId} className="bg-zinc-900/80 border-zinc-800 p-4 overflow-hidden relative group">
                    <div className="pr-12">
                      <p className="font-medium text-zinc-200 mb-3 text-sm">{q.question}</p>
                      
                      <div className="flex flex-wrap gap-2 text-xs">
                        <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                          Wrong in Test: {entry.incorrectCount}x
                        </Badge>
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                          Gate Appearances: {entry.revisionAttempts}
                        </Badge>
                        <Badge variant="outline" className={cn(
                          "border-zinc-700",
                          entry.masteryScore > 0 ? "text-green-400 bg-green-500/10 border-green-500/20" : "text-zinc-400"
                        )}>
                          Mastery: {entry.masteryScore}/3
                        </Badge>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(entry.questionId)}
                      className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
                      title="Remove from bank"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </Card>
                )
              })}
            </div>

            {masteredQuestions.length > 0 && (
              <div className="space-y-4 mt-8 opacity-70">
                <h2 className="text-lg font-bold flex items-center gap-2 border-b border-zinc-800 pb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Mastered Questions ({masteredQuestions.length})
                </h2>
                
                {masteredQuestions.map(entry => {
                  const q = findQuestion(entry.questionId)
                  if (!q) return null

                  return (
                    <Card key={entry.questionId} className="bg-zinc-900/40 border-green-500/20 p-4 relative">
                      <div className="pr-12">
                        <p className="text-zinc-400 text-sm line-clamp-2">{q.question}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(entry.questionId)}
                        className="absolute top-2 right-2 text-zinc-600 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </Card>
                  )
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
