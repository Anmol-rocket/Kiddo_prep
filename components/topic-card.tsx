"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BookOpen, Play, RotateCcw, ChevronRight } from "lucide-react"
import type { CSSProperties } from "react"

interface TopicCardProps {
  topic: {
    id: string
    name: string
    questions: any[]
  }
  stats?: {
    attempted: number
    correct: number
    incorrect: number
    score: number
  }
  onStartTopicQuiz: () => void
  onAttemptAll?: () => void
  onReviewTopic?: () => void
  style?: CSSProperties
}

export default function TopicCard({ topic, stats, onStartTopicQuiz, onAttemptAll, onReviewTopic, style }: TopicCardProps) {
  const attempted = stats?.attempted || 0
  const correct = stats?.correct || 0
  const incorrect = stats?.incorrect || 0
  const accuracy = attempted > 0 ? ((correct / attempted) * 100).toFixed(0) : null
  const progressPercent = topic.questions.length > 0 ? Math.min((attempted / topic.questions.length) * 100, 100) : 0

  return (
    <Card
      className={cn(
        "group relative overflow-hidden p-5 md:p-6",
        "bg-card/40 backdrop-blur-sm border-border/40",
        "hover:bg-card/60 hover:border-border/60 hover:shadow-lg",
        "transition-all duration-300 animate-fade-in"
      )}
      style={style}
    >
      {/* Progress bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted/30 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-foreground truncate group-hover:text-primary transition-colors">
              {topic.name}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
              {topic.questions.length} Questions
            </p>
          </div>
        </div>
        
        {/* Accuracy badge */}
        {accuracy && (
          <div className={cn(
            "flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium",
            Number(accuracy) >= 70 ? "bg-green-500/10 text-green-500" :
            Number(accuracy) >= 40 ? "bg-yellow-500/10 text-yellow-500" :
            "bg-red-500/10 text-red-500"
          )}>
            {accuracy}%
          </div>
        )}
      </div>

      {/* Stats Row */}
      {attempted > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-muted-foreground">{correct}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-muted-foreground">{incorrect}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
              <span className="text-muted-foreground">{topic.questions.length - attempted} left</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={onStartTopicQuiz} 
          size="sm"
          className="flex-1 gap-1.5 btn-primary"
        >
          <Play className="w-3.5 h-3.5" />
          Topic Quiz
        </Button>
        
        {onAttemptAll && (
          <Button 
            onClick={onAttemptAll} 
            variant="outline" 
            size="sm"
            className="flex-1 gap-1.5 bg-transparent hover:bg-primary/5"
          >
            Attempt All
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        )}
        
        {attempted > 0 && onReviewTopic && (
          <Button 
            onClick={onReviewTopic} 
            variant="ghost" 
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Review
          </Button>
        )}
      </div>
    </Card>
  )
}
