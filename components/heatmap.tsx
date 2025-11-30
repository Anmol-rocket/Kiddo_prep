"use client"

import React, { useEffect, useMemo, useState } from "react"

// Simple calendar heatmap showing counts per day for the past N days.
interface DayCount {
  date: Date
  count: number
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function formatYMD(d: Date) {
  return d.toISOString().slice(0, 10)
}

export default function Heatmap({ days = 90 }: { days?: number }) {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [isSmall, setIsSmall] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kiddoprep_stats")
      if (!raw) return
      const stats = JSON.parse(raw)
      const dayCounts: Record<string, number> = {}

      // stats structure: { topicId: { attempts: [ { timestamp: string, answers: [...] }, ... ] } }
      Object.values(stats).forEach((topic: any) => {
        if (!topic.attempts || !Array.isArray(topic.attempts)) return
        topic.attempts.forEach((attempt: any) => {
          const ts = attempt.timestamp || attempt.ts || attempt.time || null
          if (!ts) return
          const d = startOfDay(new Date(ts))
          const key = formatYMD(d)
          dayCounts[key] = (dayCounts[key] || 0) + (attempt.attempted ?? (Array.isArray(attempt.answers) ? attempt.answers.filter((a: any) => a.attempted).length : 0))
        })
      })

      setCounts(dayCounts)
    } catch (e) {
      // ignore
    }
  }, [])

  // detect small viewport: hide heatmap on small screens
  useEffect(() => {
    const check = () => setIsSmall(typeof window !== "undefined" && window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const today = startOfDay(new Date())

  const daysArray: DayCount[] = useMemo(() => {
    const arr: DayCount[] = []
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      const key = formatYMD(d)
      arr.push({ date: d, count: counts[key] || 0 })
    }
    return arr
  }, [counts, days, today])

  const maxCount = Math.max(0, ...daysArray.map((d) => d.count))

  const colorFor = (c: number) => {
    if (c <= 0) return "bg-card/30"
    if (maxCount === 0) return "bg-green-200"
    const ratio = c / maxCount
    if (ratio < 0.25) return "bg-green-200"
    if (ratio < 0.5) return "bg-green-400"
    if (ratio < 0.75) return "bg-green-600"
    return "bg-green-800"
  }

  // layout: 7 columns (weekday) x weeks rows; we will render in week columns (Sunday..Saturday)
  // Build grid keyed by weekday rows per week.
  const weeks: DayCount[][] = []
  // Ensure alignment to week start (Sunday)
  let week: DayCount[] = []
  daysArray.forEach((d) => {
    const wd = d.date.getDay() // 0..6
    week.push(d)
    if (wd === 6) {
      weeks.push(week)
      week = []
    }
  })
  if (week.length) weeks.push(week)

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  if (isSmall) {
    return (
      <div className="py-6 px-4 text-center">
        <div className="text-sm text-muted-foreground">Heatmap is available on larger screens only.</div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex">
        {/* Weekday labels (visible on md+) */}
        <div className="hidden md:flex flex-col gap-1 mr-2">
          {weekdays.map((d) => (
            <div key={d} className="text-xs text-muted-foreground h-6 md:h-6 flex items-center">
              {d}
            </div>
          ))}
        </div>

        {/* Weeks: horizontally scrollable on small screens */}
        <div className="flex items-start gap-2 md:gap-1 overflow-x-auto md:overflow-visible pb-2">
          {weeks.map((w, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const item = w.find((d) => d.date.getDay() === dayIdx)
                if (!item)
                  return (
                    <div key={dayIdx} className={`rounded-sm bg-card/20 w-8 h-8 md:w-6 md:h-6`} />
                  )
                const cls = colorFor(item.count)
                const title = `${formatYMD(item.date)} — ${item.count} attempts`
                return (
                  <div
                    key={dayIdx}
                    title={title}
                    className={`rounded-sm ${cls} w-8 h-8 md:w-6 md:h-6`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 text-sm text-muted-foreground">
        Showing last {days} days. Darker squares indicate more attempts that day.
      </div>
    </div>
  )
}
