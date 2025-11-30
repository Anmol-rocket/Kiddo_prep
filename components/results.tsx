"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { questions } from "@/lib/questions"

interface ResultsProps {
  results: any
  onBackToDashboard: () => void
}

export default function Results({ results, onBackToDashboard }: ResultsProps) {
  if (!results) {
    return null
  }

  const accuracyPercentage = (results.correct / results.attempted) * 100
  const topicName = questions.topics.find((t) => t.id === results.topicId)?.name

  const getSalutation = () => {
    const accuracy = accuracyPercentage
    if (accuracy >= 80) return "Excellent! You're on fire!"
    if (accuracy >= 60) return "Great! Keep it up!"
    if (accuracy >= 40) return "Good effort! Practice more."
    return "Keep practicing! You'll improve soon."
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8 text-center animate-slide-in">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Quiz Complete!</h1>
        <p className="text-muted-foreground">{topicName}</p>
      </div>

      {/* Score Card */}
      <div className="max-w-2xl mx-auto mb-6">
        <Card className="p-8 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/50 text-center animate-fade-in">
          <div className="mb-4">
            <h2 className="text-sm text-muted-foreground mb-2">YOUR SCORE</h2>
            <div className="text-5xl md:text-6xl font-bold text-primary">{results.score}</div>
            <div className="text-sm text-muted-foreground mt-2">Out of {results.totalQuestions * 4} possible</div>
          </div>
          <div className="text-lg font-semibold text-secondary mt-4">{getSalutation()}</div>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <Card
          className="p-4 md:p-6 bg-card/50 border-border/50 text-center animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="text-2xl md:text-3xl font-bold text-green-500">{results.correct}</div>
          <div className="text-xs md:text-sm text-muted-foreground mt-2">Correct</div>
        </Card>

        <Card
          className="p-4 md:p-6 bg-card/50 border-border/50 text-center animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="text-2xl md:text-3xl font-bold text-red-500">{results.incorrect}</div>
          <div className="text-xs md:text-sm text-muted-foreground mt-2">Wrong</div>
        </Card>

        <Card
          className="p-4 md:p-6 bg-card/50 border-border/50 text-center animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="text-2xl md:text-3xl font-bold text-yellow-500">{results.unattempted}</div>
          <div className="text-xs md:text-sm text-muted-foreground mt-2">Skipped</div>
        </Card>

        <Card
          className="p-4 md:p-6 bg-card/50 border-border/50 text-center animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="text-2xl md:text-3xl font-bold text-secondary">{accuracyPercentage.toFixed(0)}%</div>
          <div className="text-xs md:text-sm text-muted-foreground mt-2">Accuracy</div>
        </Card>
      </div>

      {/* Detailed Results */}
      <div className="max-w-2xl mx-auto mb-6">
        <Card className="p-6 bg-card/50 border-border/50 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <h3 className="text-lg font-bold text-foreground mb-4">Detailed Analysis</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-background/30 rounded">
              <span className="text-muted-foreground">Avg Time per Question</span>
              <span className="font-semibold text-foreground">{results.avgTime.toFixed(1)}s</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background/30 rounded">
              <span className="text-muted-foreground">Total Questions</span>
              <span className="font-semibold text-foreground">{results.totalQuestions}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background/30 rounded">
              <span className="text-muted-foreground">Questions Attempted</span>
              <span className="font-semibold text-foreground">
                {results.attempted} / {results.totalQuestions}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Button */}
      <div className="max-w-2xl mx-auto">
        <Button onClick={onBackToDashboard} className="w-full btn-primary text-base md:text-lg py-6">
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
