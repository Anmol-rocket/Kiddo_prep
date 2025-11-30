"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  const accuracy = attempted > 0 ? ((correct / attempted) * 100).toFixed(0) : "-"

  return (
    <Card
      className="p-6 bg-card/50 border-border/50 hover:bg-card/70 transition-all duration-300 animate-fade-in"
      style={style}
    >
      <div className="mb-4">
        <h3 className="text-lg md:text-xl font-bold text-primary mb-2">{topic.name}</h3>
        <p className="text-sm text-muted-foreground">{topic.questions.length} Questions</p>
      </div>

      {attempted > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="bg-background/50 rounded p-2">
            <div className="text-sm font-bold text-accent">{correct}</div>
            <div className="text-xs text-muted-foreground">Correct</div>
          </div>
          <div className="bg-background/50 rounded p-2">
            <div className="text-sm font-bold text-red-500">{attempted - correct}</div>
            <div className="text-xs text-muted-foreground">Wrong</div>
          </div>
          <div className="bg-background/50 rounded p-2">
            <div className="text-sm font-bold text-secondary">{accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={onStartTopicQuiz} className="flex-1 btn-primary text-sm md:text-base">
          Topic Quiz
        </Button>
        {onAttemptAll && (
          <Button onClick={onAttemptAll} variant="outline" className="flex-1 text-sm md:text-base bg-transparent">
            Attempt All
          </Button>
        )}
        {attempted > 0 && onReviewTopic && (
          <Button onClick={onReviewTopic} variant="ghost" className="text-sm md:text-base">
            Review
          </Button>
        )}
      </div>
    </Card>
  )
}
