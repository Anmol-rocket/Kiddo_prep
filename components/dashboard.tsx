"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { StatsCard, FeatureCard, SectionHeader, ProgressRing } from "@/components/dashboard/index"
import Heatmap from "./heatmap"
import TopicCard from "./topic-card"
import { questions } from "@/lib/questions"
import { 
  Target, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Settings, 
  BarChart3,
  Flame,
  BookOpen,
  GraduationCap
} from "lucide-react"

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
  const [heatmapOpen, setHeatmapOpen] = useState(false)
  const router = useRouter()

  // Touch / swipe confirmation for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [showSwipeConfirm, setShowSwipeConfirm] = useState(false)
  const swipeTimeoutRef = useRef<number | null>(null)

  // Weightage prep stats
  const [weightageStats, setWeightageStats] = useState<{
    attempted: number
    correct: number
    incorrect: number
  }>({ attempted: 0, correct: 0, incorrect: 0 })

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

    // Load weightage prep stats
    const savedWeightageStats = localStorage.getItem("kiddoprep_weightage_stats")
    if (savedWeightageStats) {
      try {
        const parsed = JSON.parse(savedWeightageStats)
        let totalAttempted = 0
        let totalCorrect = 0
        let totalIncorrect = 0
        Object.values(parsed).forEach((topicStats: any) => {
          totalAttempted += topicStats.attempted || 0
          totalCorrect += topicStats.correct || 0
          totalIncorrect += topicStats.incorrect || 0
        })
        setWeightageStats({ attempted: totalAttempted, correct: totalCorrect, incorrect: totalIncorrect })
      } catch (e) {
        console.error("Error loading weightage stats:", e)
      }
    }
  }, [])

  useEffect(() => {
    return () => {
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

    if (dx > LEFT_SWIPE_THRESHOLD && dy < 100) {
      if (!showSwipeConfirm) {
        setShowSwipeConfirm(true)
        if (swipeTimeoutRef.current) window.clearTimeout(swipeTimeoutRef.current)
        swipeTimeoutRef.current = window.setTimeout(() => {
          setShowSwipeConfirm(false)
          swipeTimeoutRef.current = null
        }, 3000) as unknown as number
      } else {
        try {
          router.back()
        } catch (err) {
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

    // Include weightage prep stats
    totalAttempted += weightageStats.attempted
    totalCorrect += weightageStats.correct
    totalIncorrect += weightageStats.incorrect

    const accuracy = totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : 0

    return {
      attempted: totalAttempted,
      correct: totalCorrect,
      incorrect: totalIncorrect,
      accuracy: accuracy.toFixed(1),
      accuracyNum: accuracy,
      score: totalScore,
      avgTimePerQuestion: totalAttempted > 0 ? (totalTime / totalAttempted).toFixed(1) : "0",
      topicsWithData,
      weightageAttempted: weightageStats.attempted,
    }
  }

  const stats = getOverallStats()

  // Calculate total questions for progress
  const totalQuestions = questions.topics.reduce((acc, topic) => acc + topic.questions.length, 0)
  const progressPercent = totalQuestions > 0 ? Math.min((stats.attempted / totalQuestions) * 100, 100) : 0

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-background via-background to-background/80"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header Section */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-5">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  KIDDOPREP
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
                  Master AIIMS CRE with Confidence
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Heatmap - Desktop */}
              <Dialog open={heatmapOpen} onOpenChange={setHeatmapOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>Heatmap</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogTitle>Study Heatmap</DialogTitle>
                  <DialogDescription>Your activity by day — darker = more questions attempted.</DialogDescription>
                  <div className="mt-4">
                    <Heatmap />
                  </div>
                </DialogContent>
              </Dialog>

              {/* Settings */}
              <Link href="/settings">
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-8">
        {/* Stats Overview Section */}
        <section className="animate-slide-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Main Progress Card */}
            <Card className="lg:col-span-1 p-5 md:p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-border/40">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Overall Progress</h3>
                  <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">
                    {stats.attempted} <span className="text-lg text-muted-foreground font-normal">/ {totalQuestions}</span>
                  </p>
                </div>
                <ProgressRing progress={progressPercent} size={70} strokeWidth={5}>
                  <span className="text-sm font-bold text-primary">{progressPercent.toFixed(0)}%</span>
                </ProgressRing>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">{stats.correct} correct</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-muted-foreground">{stats.incorrect} wrong</span>
                </div>
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <StatsCard
                value={stats.score}
                label="Total Score"
                icon={<Target className="w-5 h-5" />}
                variant="accent"
                delay="0.1s"
              />
              <StatsCard
                value={stats.attempted}
                label="Attempted"
                icon={<CheckCircle2 className="w-5 h-5" />}
                variant="primary"
                delay="0.15s"
              />
              <StatsCard
                value={`${stats.accuracy}%`}
                label="Accuracy"
                icon={<TrendingUp className="w-5 h-5" />}
                variant="success"
                delay="0.2s"
              />
              <StatsCard
                value={`${stats.avgTimePerQuestion}s`}
                label="Avg Time/Q"
                icon={<Clock className="w-5 h-5" />}
                variant="warning"
                delay="0.25s"
              />
            </div>
          </div>
        </section>

        {/* Quick Actions / Features Section */}
        <section>
          <SectionHeader 
            title="Study Modes" 
            subtitle="Choose your preferred way to practice"
          />
          <div className="space-y-4">
            <FeatureCard
              href="/weightage-prep"
              icon={<Flame />}
              title="Weightage Prep"
              description="Study topics based on AIIMS CRE exam weightage for maximum marks"
              gradient="bg-gradient-to-br from-orange-500/10 via-red-500/5 to-transparent"
              borderColor="border-orange-500/30 hover:border-orange-500/50"
              iconColor="text-orange-500"
              stats={weightageStats.attempted > 0 ? (
                <div className="flex gap-3 text-xs">
                  <span className="text-green-500">{weightageStats.correct} correct</span>
                  <span className="text-red-500">{weightageStats.incorrect} wrong</span>
                  <span className="text-muted-foreground">{weightageStats.attempted} total</span>
                </div>
              ) : undefined}
            />
            <FeatureCard
              href="/materials"
              icon={<BookOpen />}
              title="Study Materials"
              description="Access mock papers, notes, PDFs and reference materials"
              gradient="bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent"
              borderColor="border-blue-500/30 hover:border-blue-500/50"
              iconColor="text-blue-500"
            />
          </div>
        </section>

        {/* Topics Section */}
        <section>
          <SectionHeader 
            title="Practice by Topic" 
            subtitle={`${questions.topics.length} topics available`}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.topics.map((topic, index) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                stats={topicStats[topic.id]}
                onStartTopicQuiz={() => onStartQuiz(topic.id, "topic")}
                onAttemptAll={() => onStartQuiz(topic.id, "all")}
                onReviewTopic={() => onReviewTopic && onReviewTopic(topic.id)}
                style={{ animationDelay: `${0.05 + index * 0.05}s` }}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Mobile swipe confirmation banner */}
      {showSwipeConfirm && (
        <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-card/95 backdrop-blur-sm text-sm px-4 py-2.5 rounded-xl shadow-lg border border-border/50 animate-slide-in">
          Swipe again to leave this page
        </div>
      )}
    </div>
  )
}
