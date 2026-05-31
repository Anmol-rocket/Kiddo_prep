"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { weightageTopics, getWeightageColor, getPriorityBadgeColor, WeightageTopic } from "@/lib/weightage-topics"
import { ChevronLeft, BookOpen, Target, AlertCircle } from "lucide-react"

export default function WeightagePrepPage() {
  const router = useRouter()
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)

  const handleStartQuiz = (topicId: string) => {
    router.push(`/weightage-prep/quiz?topic=${topicId}`)
  }

  const handleReviewTopic = (topicId: string) => {
    router.push(`/weightage-prep/review?topic=${topicId}`)
  }

  const getTopicStats = (topicId: string) => {
    try {
      const raw = localStorage.getItem("kiddoprep_weightage_stats")
      if (!raw) return null
      const stats = JSON.parse(raw)
      return stats[topicId] || null
    } catch {
      return null
    }
  }

  const toggleExpand = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 animate-slide-in">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" onClick={() => router.push("/")} className="p-2">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Weightage-wise Prep</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Study topics based on AIIMS CRE exam weightage
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="p-4 bg-accent/10 border-accent/30 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-accent mb-1">🔥 Recommended Study Order</p>
              <p className="text-muted-foreground">
                Topics are arranged by priority. Focus on VERY HIGH and HIGH weightage topics first 
                for maximum marks in AIIMS CRE exam.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Topics List */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {weightageTopics.map((topic, index) => {
          const stats = getTopicStats(topic.id)
          const hasQuestions = topic.questions.length > 0
          const isExpanded = expandedTopic === topic.id

          return (
            <Card
              key={topic.id}
              className={`p-4 md:p-6 border-2 transition-all duration-300 animate-fade-in ${getWeightageColor(topic.weightage)}`}
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <div className="flex flex-col gap-4">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {/* Priority Badge */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getPriorityBadgeColor(topic.priority)}`}>
                      {topic.priority}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                        {topic.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="outline" className={getWeightageColor(topic.weightage)}>
                          {topic.weightage}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Expect {topic.expectedQuestions}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats if available */}
                  {stats && (
                    <div className="text-right text-sm">
                      <div className="text-green-500 font-medium">{stats.correct} correct</div>
                      <div className="text-muted-foreground">{stats.attempted} attempted</div>
                    </div>
                  )}
                </div>

                {/* Must Study Topics - Expandable */}
                <div>
                  <button
                    onClick={() => toggleExpand(topic.id)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Must-Study Topics ({topic.mustStudy.length})</span>
                    <span className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  
                  {isExpanded && (
                    <ul className="mt-2 ml-6 space-y-1 text-sm text-muted-foreground animate-fade-in">
                      {topic.mustStudy.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  {hasQuestions ? (
                    <>
                      <Button
                        onClick={() => handleStartQuiz(topic.id)}
                        className="flex-1 whitespace-nowrap"
                      >
                        <Target className="w-4 h-4 mr-2 shrink-0" />
                        <span className="truncate">Practice ({topic.questions.length})</span>
                      </Button>
                      {stats && stats.attempted > 0 && (
                        <Button
                          variant="outline"
                          onClick={() => handleReviewTopic(topic.id)}
                          className="flex-1 whitespace-nowrap"
                        >
                          Review
                        </Button>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
                      <AlertCircle className="w-4 h-4" />
                      Questions coming soon...
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 max-w-4xl mx-auto">
        <Card className="p-4 bg-card/50">
          <h4 className="text-sm font-medium mb-3">Weightage Legend</h4>
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="text-red-500 bg-red-500/10 border-red-500/30">
              VERY HIGH (15-20 Qs)
            </Badge>
            <Badge variant="outline" className="text-orange-500 bg-orange-500/10 border-orange-500/30">
              HIGH (10-15 Qs)
            </Badge>
            <Badge variant="outline" className="text-yellow-500 bg-yellow-500/10 border-yellow-500/30">
              MEDIUM-HIGH (8-12 Qs)
            </Badge>
            <Badge variant="outline" className="text-blue-500 bg-blue-500/10 border-blue-500/30">
              MEDIUM (5-10 Qs)
            </Badge>
            <Badge variant="outline" className="text-green-500 bg-green-500/10 border-green-500/30">
              LOW-MEDIUM (4-6 Qs)
            </Badge>
          </div>
        </Card>
      </div>
    </div>
  )
}
