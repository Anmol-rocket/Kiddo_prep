"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface QuestionCardProps {
  question: {
    id: number
    question: string
    options: string[]
    correctAnswer: number
    explanation?: string
  }
  selectedOption: number | null
  onSelectOption: (index: number) => void
  isAnswering: boolean
  explanationAvailable?: boolean
  skipped?: boolean
  openExplanation?: boolean
  wasCorrect?: boolean | null
}

export default function QuestionCard({ question, selectedOption, onSelectOption, isAnswering, explanationAvailable = false, skipped = false, openExplanation = false, wasCorrect = null }: QuestionCardProps) {
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    if (openExplanation) setShowExplanation(true)
  }, [openExplanation])
  return (
    <Card className="p-6 md:p-8 bg-card/50 border-border/50">
      {/* Question */}
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-foreground leading-relaxed">{question.question}</h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const correct = index === question.correctAnswer
          const chosen = selectedOption === index
          let outerClass = "md:p-4 p-5 rounded-lg border-2 transition-all duration-200 touch-target"
          let innerDot = null

          // Only reveal correct/incorrect highlighting when explanation is shown
          if (showExplanation) {
            if (correct) {
              outerClass += " border-green-300 bg-green-50"
              innerDot = <div className="w-2 h-2 bg-green-900 rounded-full" />
            } else if (chosen && !correct) {
              outerClass += " border-red-300 bg-red-50"
              innerDot = <div className="w-2 h-2 bg-red-900 rounded-full" />
            } else {
              outerClass += " border-border/50 bg-background/30"
            }
          } else {
            outerClass += chosen ? " border-primary bg-primary/10 shadow-md cursor-default" : " border-border/50 bg-background/30 hover:border-primary/50 hover:bg-background/50"
          }

          return (
            <div key={index} className={outerClass} role="button" tabIndex={0} onClick={() => !isAnswering && !explanationAvailable && onSelectOption(index)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { !isAnswering && !explanationAvailable && onSelectOption(index) } }}>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${chosen ? "border-primary bg-primary" : "border-border"}`}>
                  {innerDot}
                </div>
                <span className={`option-text-mobile flex-1 ${showExplanation && (correct || (chosen && !correct)) ? "text-black" : "text-foreground"}`}>{option}</span>
                {showExplanation && correct && <span className="text-sm text-green-700 font-medium">Correct</span>}
                {showExplanation && chosen && !correct && <span className="text-sm text-red-600 font-medium">Your answer</span>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Explanation toggle (available after an attempt or skip) */}
      {question.explanation && (
        <div className="mt-4 flex flex-col gap-2">
          {/* Immediate correctness / skipped banner */}
          {showExplanation && (wasCorrect !== null || skipped) && (
            <div
              className={`mb-2 px-3 py-2 rounded-md font-semibold ${
                skipped ? "bg-yellow-50 text-yellow-900" : wasCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
              }`}
            >
              {skipped ? "Skipped" : wasCorrect ? "Correct" : "Incorrect"}
            </div>
          )}
          <div className="flex items-center gap-3">
            {explanationAvailable ? (
              <Button variant="ghost" size="sm" onClick={() => setShowExplanation((v) => !v)}>
                {showExplanation ? "Hide explanation" : "View explanation"}
              </Button>
            ) : null}
            {skipped && (
              <div className="text-sm px-2 py-1 rounded-full bg-yellow-100 text-yellow-900 font-medium border border-yellow-200">Skipped</div>
            )}
          </div>

          {showExplanation && (
            <>
              {/* small textual hint */}
              {selectedOption !== null && (
                <div className="text-sm text-muted-foreground">You answered: {question.options[selectedOption]}</div>
              )}
              <div className="mt-3 p-4 bg-muted text-muted-foreground rounded-md text-sm">
                {question.explanation}
              </div>
            </>
          )}
        </div>
      )}
    </Card>
  )
}
