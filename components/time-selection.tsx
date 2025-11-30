"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TimeSelectionProps {
  onTimeSelected: (time: number) => void
  onBack: () => void
}

const TIME_OPTIONS = [
  { label: "30 Seconds", value: 30 },
  { label: "1 Minute", value: 60 },
  { label: "3 Minutes", value: 180 },
  { label: "5 Minutes", value: 300 },
]

export default function TimeSelection({ onTimeSelected, onBack }: TimeSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-md animate-slide-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Select Time</h1>
          <p className="text-muted-foreground">Choose time per question</p>
        </div>

        <div className="space-y-3">
          {TIME_OPTIONS.map((option, index) => (
            <Card
              key={option.value}
              className="p-6 bg-card/50 border-border/50 cursor-pointer hover:bg-card/70 hover:border-primary/50 transition-all duration-300 animate-fade-in card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onTimeSelected(option.value)}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{option.label}</div>
                <div className="text-sm text-muted-foreground">per question</div>
              </div>
            </Card>
          ))}
        </div>

        <Button onClick={onBack} variant="ghost" className="w-full mt-6">
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
