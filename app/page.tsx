"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Dashboard from "@/components/dashboard"
import Review from "@/components/review"
import TimeSelection from "@/components/time-selection"
import Quiz from "@/components/quiz"
import Results from "@/components/results"

type AppState = "dashboard" | "time-selection" | "quiz" | "results" | "review"

interface QuizState {
  selectedTopic: string | null
  timePerQuestion: number | null
  mode: "topic" | "random" | "all"
}

export default function Home() {
  // Start with server-safe defaults. Restore persisted state on mount in a client-only effect
  const [appState, setAppState] = useState<AppState>("dashboard")
  const [quizState, setQuizState] = useState<QuizState>({
    selectedTopic: null,
    timePerQuestion: null,
    mode: "topic",
  })
  const [quizResults, setQuizResults] = useState(null)

  const handleStartQuiz = (topicId: string, mode: "topic" | "random" | "all") => {
    setQuizState((prev) => ({
      ...prev,
      selectedTopic: topicId,
      mode,
    }))
    setAppState("time-selection")
  }

  const handleReviewTopic = (topicId: string) => {
    setQuizState((prev) => ({
      ...prev,
      selectedTopic: topicId,
    }))
    setAppState("review")
  }

  const handleTimeSelected = (time: number) => {
    setQuizState((prev) => ({
      ...prev,
      timePerQuestion: time,
    }))
    setAppState("quiz")
  }

  const handleQuizComplete = (results: any) => {
    setQuizResults(results)
    setAppState("results")
  }

  const handleBackToDashboard = () => {
    setAppState("dashboard")
    setQuizResults(null)
    // clear persisted app/quiz state
    try {
      localStorage.removeItem("kiddoprep_appstate")
      localStorage.removeItem("kiddoprep_quizstate")
    } catch (e) {
      /* ignore */
    }
  }

  // Router and history handling: sync state <-> URL so screens are linkable
  const router = useRouter()
  const isHandlingPop = useRef(false)
  const [navDirection, setNavDirection] = useState<"forward" | "back">("forward")

  const parseFromUrl = () => {
    try {
      const params = new URLSearchParams(window.location.search)
      const a = params.get("app") as AppState | null
      const topic = params.get("topic")
      const time = params.get("time")
      const mode = (params.get("mode") as QuizState["mode"]) || undefined

      if (a) setAppState(a)
      if (topic || time || mode) {
        setQuizState((prev) => ({
          ...prev,
          selectedTopic: topic ?? prev.selectedTopic,
          timePerQuestion: time ? Number(time) : prev.timePerQuestion,
          mode: mode ?? prev.mode,
        }))
      }
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    if (params.toString()) {
      // URL has params -> use them
      parseFromUrl()
    } else {
      // No URL params -> restore persisted state from localStorage
      try {
        const rawApp = localStorage.getItem("kiddoprep_appstate")
        const rawQuiz = localStorage.getItem("kiddoprep_quizstate")
        if (rawApp) setAppState(rawApp as AppState)
        if (rawQuiz) setQuizState(JSON.parse(rawQuiz))
      } catch (e) {
        // ignore
      }
    }

    const onPop = () => {
      isHandlingPop.current = true
      setNavDirection("back")
      parseFromUrl()
    }

    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync appState/quizState to URL when they change (unless change originated from popstate)
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        if (isHandlingPop.current) {
          isHandlingPop.current = false
        } else {
          setNavDirection("forward")
          const params = new URLSearchParams()
          if (appState) params.set("app", appState)
          if (quizState.selectedTopic) params.set("topic", quizState.selectedTopic)
          if (quizState.timePerQuestion) params.set("time", String(quizState.timePerQuestion))
          if (quizState.mode) params.set("mode", quizState.mode)
          const qs = params.toString()
          const newUrl = qs ? `/?${qs}` : "/"
          if (newUrl !== window.location.pathname + window.location.search) {
            router.push(newUrl)
          }
        }
      }
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState, quizState])

  // persist appState and quizState so refresh restores view
  useEffect(() => {
    try {
      localStorage.setItem("kiddoprep_appstate", appState)
      localStorage.setItem("kiddoprep_quizstate", JSON.stringify(quizState))
    } catch (e) {
      // ignore
    }
  }, [appState, quizState])

  return (
    <main className="min-h-screen bg-background">
      <div key={appState} className={navDirection === "forward" ? "page-slide-forward" : "page-slide-back"}>
        {appState === "dashboard" && <Dashboard onStartQuiz={handleStartQuiz} onReviewTopic={handleReviewTopic} />}
        {appState === "time-selection" && (
          <TimeSelection onTimeSelected={handleTimeSelected} onBack={() => setAppState("dashboard")} />
        )}
        {appState === "quiz" && (
          <Quiz
            topicId={quizState.selectedTopic!}
            timePerQuestion={quizState.timePerQuestion!}
            mode={quizState.mode}
            onComplete={handleQuizComplete}
          />
        )}
        {appState === "results" && <Results results={quizResults} onBackToDashboard={handleBackToDashboard} />}
        {appState === "review" && (
          <Review topicId={quizState.selectedTopic!} onBack={() => setAppState("dashboard")} />
        )}
      </div>
    </main>
  )
}
