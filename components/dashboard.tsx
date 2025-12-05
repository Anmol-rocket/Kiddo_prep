"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"
import Heatmap from "./heatmap"
import TopicCard from "./topic-card"
import { questions } from "@/lib/questions"

function HeatmapController() {
  const [open, setOpen] = useState(false)
  const pushedRef = useRef(false)
  const ignorePop = useRef(false)

  useEffect(() => {
    if (open) {
      // push a history entry so the back button will close the dialog
      try {
        window.history.pushState({ kiddoprep_heatmap: true }, "")
        pushedRef.current = true
      } catch (e) {
        // ignore
      }

      const onPop = () => {
        if (open) {
          ignorePop.current = true
          setOpen(false)
        }
      }

      window.addEventListener("popstate", onPop)
      return () => window.removeEventListener("popstate", onPop)
    } else {
      // closed via UI: if we previously pushed, navigate back to remove that entry
      if (pushedRef.current && !ignorePop.current) {
        try {
          window.history.back()
        } catch (e) {
          // ignore
        }
      }
      pushedRef.current = false
      ignorePop.current = false
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Heatmap</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogTitle>Study Heatmap</DialogTitle>
        <DialogDescription>Activity by day — darker = more questions attempted.</DialogDescription>
        <div className="mt-4">
          <Heatmap />
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface DashboardProps {
  onStartQuiz: (topicId: string, mode: "topic" | "random" | "all") => void
  onReviewTopic?: (topicId: string) => void
}

interface Stats {
  attempted: number
  correct: number
  incorrect: number
  unattempted: number
  score: number
  avgTime: number
}

interface TopicStats {
  [key: string]: Stats
}

export default function Dashboard({ onStartQuiz, onReviewTopic }: DashboardProps) {
  const [topicStats, setTopicStats] = useState<TopicStats>({})
  const router = useRouter()

  // Touch / swipe confirmation for mobile: first left-swipe shows a prompt,
  // second left-swipe within a short window performs `router.back()`.
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [showSwipeConfirm, setShowSwipeConfirm] = useState(false)
  const swipeTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem("kiddoprep_stats")
    if (savedStats) {
      try {
        setTopicStats(JSON.parse(savedStats))
      } catch (e) {
        console.error("Error loading stats:", e)
      }
    }
  }, [])

  useEffect(() => {
    return () => {
      // cleanup pending timeout
      if (swipeTimeoutRef.current) {
        try {
          window.clearTimeout(swipeTimeoutRef.current)
        } catch (e) {
          // ignore
        }
        swipeTimeoutRef.current = null
      }
    }
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches && e.touches.length === 1) {
      setTouchStartX(e.touches[0].clientX)
      setTouchStartY(e.touches[0].clientY)
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX == null) return
    const endX = e.changedTouches[0].clientX
    const endY = e.changedTouches[0].clientY
    const dx = touchStartX - endX
    const dy = Math.abs((touchStartY ?? 0) - endY)
    const LEFT_SWIPE_THRESHOLD = 70

    // only treat primarily-horizontal left swipes
    if (dx > LEFT_SWIPE_THRESHOLD && dy < 100) {
      if (!showSwipeConfirm) {
        setShowSwipeConfirm(true)
        // clear any previous timeout
        if (swipeTimeoutRef.current) window.clearTimeout(swipeTimeoutRef.current)
        // hide confirmation after 3 seconds
        swipeTimeoutRef.current = window.setTimeout(() => {
          setShowSwipeConfirm(false)
          swipeTimeoutRef.current = null
        }, 3000) as unknown as number
      } else {
        // second swipe within the window: navigate back
        try {
          router.back()
        } catch (err) {
          // fallback: try history.back
          try {
            window.history.back()
          } catch (e) {
            // ignore
          }
        }
      }
    }

    setTouchStartX(null)
    setTouchStartY(null)
  }

  const getOverallStats = () => {
    let totalAttempted = 0
    let totalCorrect = 0
    let totalIncorrect = 0
    let totalScore = 0
    let totalTime = 0
    let topicsWithData = 0

    Object.values(topicStats).forEach((stats) => {
      if (stats.attempted > 0) {
        totalAttempted += stats.attempted
        totalCorrect += stats.correct
        totalIncorrect += stats.incorrect
        totalScore += stats.score
        totalTime += stats.avgTime * stats.attempted
        topicsWithData++
      }
    })

    return {
      attempted: totalAttempted,
      correct: totalCorrect,
      incorrect: totalIncorrect,
      accuracy: totalAttempted > 0 ? ((totalCorrect / totalAttempted) * 100).toFixed(1) : "0",
      score: totalScore,
      avgTimePerQuestion: totalAttempted > 0 ? (totalTime / totalAttempted).toFixed(1) : "0",
      topicsWithData,
    }
  }

  const stats = getOverallStats()

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-background to-background/50 p-4 md:p-8"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="mb-8 animate-slide-in flex items-center justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">KIDDOPREP</h1>
          <p className="text-sm md:text-base text-muted-foreground">Master AIIMS CRE with Confidence</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Settings link (visible on mobile and desktop) */}
          <Link href="/settings" className="md:hidden">
            <Button variant="outline" size="sm">Settings</Button>
          </Link>
          {/* Desktop-only heatmap trigger */}
          <div className="hidden md:block">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">View Heatmap</Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogTitle>Study Heatmap</DialogTitle>
                <DialogDescription>Activity by day — darker = more questions attempted.</DialogDescription>
                <div className="mt-4">
                  <Heatmap />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile: no heatmap controls shown */}
          {/* Also show Settings on desktop alongside heatmap */}
          <div className="hidden md:block">
            <Link href="/settings">
              <Button variant="outline" size="sm">Settings</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        <Card
          className="p-4 md:p-6 bg-card/50 border-border/50 hover:bg-card/70 transition-colors animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="text-2xl md:text-3xl font-bold text-accent">{stats.score}</div>
          <div className="text-xs md:text-sm text-muted-foreground mt-1">Total Score</div>
        </Card>

        <Card
          className="p-4 md:p-6 bg-card/50 border-border/50 hover:bg-card/70 transition-colors animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="text-2xl md:text-3xl font-bold text-primary">{stats.attempted}</div>
          <div className="text-xs md:text-sm text-muted-foreground mt-1">Attempted</div>
        </Card>

        <Card
          className="p-4 md:p-6 bg-card/50 border-border/50 hover:bg-card/70 transition-colors animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="text-2xl md:text-3xl font-bold text-green-500">{stats.accuracy}%</div>
          <div className="text-xs md:text-sm text-muted-foreground mt-1">Accuracy</div>
        </Card>

        <Card
          className="p-4 md:p-6 bg-card/50 border-border/50 hover:bg-card/70 transition-colors animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="text-2xl md:text-3xl font-bold text-secondary">{stats.avgTimePerQuestion}s</div>
          <div className="text-xs md:text-sm text-muted-foreground mt-1">Avg Time/Q</div>
        </Card>
      </div>

      {/* Topics */}
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Available Topics</h2>
        {/* Scrollable container: caps height and enables vertical scroll for long lists */}
        <div className="max-h-[60vh] md:max-h-[50vh] overflow-y-auto pr-2 no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.topics.map((topic, index) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                stats={topicStats[topic.id]}
                onStartTopicQuiz={() => onStartQuiz(topic.id, "topic")}
                onAttemptAll={() => onStartQuiz(topic.id, "all")}
                onReviewTopic={() => onReviewTopic && onReviewTopic(topic.id)}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Mobile swipe confirmation banner: first left-swipe shows this, swipe again to confirm */}
      {showSwipeConfirm && (
        <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-card/90 text-sm px-4 py-2 rounded-lg shadow-lg">
          Swipe again to leave this page
        </div>
      )}
    </div>
  )
}
