"use client"

import React, { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Item = { name: string; group: string; url: string; ext: string; size: number; type: string }

export default function MaterialsSection() {
  const [items, setItems] = useState<Item[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [doneSet, setDoneSet] = useState<Set<string>>(new Set())
  const [perfMap, setPerfMap] = useState<Record<string, { score: number; total: number; accuracy?: number; date: string }>>({})

  useEffect(() => {
    let mounted = true
    fetch("/api/materials")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return
        setItems(data)
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  // Load persisted "done" marks
  useEffect(() => {
    try {
      const raw = localStorage.getItem("kiddoprep_mock_done")
      if (raw) {
        const arr: string[] = JSON.parse(raw)
        setDoneSet(new Set(arr))
      }
    } catch {
      // ignore
    }
  }, [])

  // Load persisted performance
  useEffect(() => {
    try {
      const raw = localStorage.getItem("kiddoprep_mock_perf")
      if (raw) {
        setPerfMap(JSON.parse(raw))
      }
    } catch {
      // ignore
    }
  }, [])

  const persistDone = (next: Set<string>) => {
    try {
      localStorage.setItem("kiddoprep_mock_done", JSON.stringify(Array.from(next)))
    } catch {
      // ignore
    }
  }

  const toggleDone = (key: string) => {
    setDoneSet((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      persistDone(next)
      return next
    })
  }

  const savePerf = (key: string) => {
    const scoreStr = prompt("Enter score obtained", "0")
    if (scoreStr == null) return
    const totalStr = prompt("Enter total marks", "100")
    if (totalStr == null) return
    const score = Number(scoreStr)
    const total = Number(totalStr)
    if (!Number.isFinite(score) || !Number.isFinite(total) || total <= 0) {
      alert("Please enter valid numeric values.")
      return
    }
    const accStr = prompt("Enter accuracy (%) — optional", "")
    let accuracy: number | undefined = undefined
    if (accStr !== null && accStr.trim() !== "") {
      const accVal = Number(accStr)
      if (!Number.isFinite(accVal) || accVal < 0 || accVal > 100) {
        alert("Please enter accuracy as 0-100.")
        return
      }
      accuracy = Math.round(accVal)
    }
    const entry = { score, total, accuracy, date: new Date().toISOString() }
    setPerfMap((prev) => {
      const next = { ...prev, [key]: entry }
      try {
        localStorage.setItem("kiddoprep_mock_perf", JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }

  if (loading) return <div className="mt-6">Loading materials…</div>

  if (!items || items.length === 0)
    return <div className="mt-6 text-sm text-muted-foreground">No materials found.</div>

  const groups = items.reduce<Record<string, Item[]>>((acc, it) => {
    acc[it.group] = acc[it.group] || []
    acc[it.group].push(it)
    return acc
  }, {})

  function fmtSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    const mb = kb / 1024
    return `${mb.toFixed(1)} MB`
  }

  function iconFor(type: string) {
    switch (type) {
      case "pdf":
        return "📄"
      case "html":
        return "🌐"
      default:
        return "📦"
    }
  }

  return (
    <div className="mt-8 md:mt-10 px-4 md:px-0">
      <div className="mb-4 md:mb-6 flex items-center justify-between gap-2">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Materials & Mock Papers</h2>
        <Button asChild variant="outline" className="text-sm md:text-base">
          <a href="/materials/mock-analysis">Mock Analysis</a>
        </Button>
      </div>
      <div className="max-h-[60vh] md:max-h-[50vh] overflow-y-auto pr-2 no-scrollbar">
        {Object.entries(groups).map(([group, list]) => (
          <div key={group} className="mb-5 md:mb-6">
            <h3 className="text-lg font-semibold mb-2 md:mb-3">{group.replace("_", " ")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {list.map((it, index) => (
                <Card
                  key={it.url}
                  className="p-5 md:p-6 bg-card/50 border-border/50 hover:bg-card/70 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="mb-3 md:mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-1 md:mb-2 flex items-center gap-2">
                      <span>{iconFor(it.type)}</span>
                      <span>{it.name}</span>
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{fmtSize(it.size)}</p>
                  </div>

                  {/* Primary actions row */}
                  <div className="flex gap-2">
                    {it.type === "pdf" ? (
                      <Button asChild className="flex-1 btn-primary text-sm md:text-base">
                        <a href={`/materials/pdf?file=${encodeURIComponent(it.url)}`}>📖 View</a>
                      </Button>
                    ) : (
                      <Button asChild className="flex-1 btn-primary text-sm md:text-base">
                        <a href={it.url} target="_blank" rel="noreferrer">📖 View</a>
                      </Button>
                    )}
                    <Button asChild variant="outline" className="flex-1 text-sm md:text-base bg-transparent">
                      <a href={it.url} download={it.name}>⬇️ Download</a>
                    </Button>
                  </div>

                  {/* Mock paper actions row */}
                  {it.group === "mock_papers" && (
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                      <Button
                        type="button"
                        variant={doneSet.has(it.url) ? "secondary" : "outline"}
                        className={`flex-1 text-xs sm:text-sm md:text-base transition-all ${
                          doneSet.has(it.url)
                            ? "bg-green-500/20 border-green-500/50 text-green-600 dark:text-green-400 hover:bg-green-500/30"
                            : "hover:border-green-500/50"
                        }`}
                        onClick={() => toggleDone(it.url)}
                      >
                        {doneSet.has(it.url) ? "✅ Done" : "☑️ Mark Done"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className={`flex-1 text-xs sm:text-sm md:text-base transition-all truncate ${
                          perfMap[it.name]
                            ? "bg-blue-500/20 border-blue-500/50 text-blue-600 dark:text-blue-400 hover:bg-blue-500/30"
                            : "hover:border-blue-500/50"
                        }`}
                        onClick={() => savePerf(it.name)}
                      >
                        {perfMap[it.name]
                          ? `📊 ${perfMap[it.name].score}/${perfMap[it.name].total}${typeof perfMap[it.name].accuracy === "number" ? ` • ${perfMap[it.name].accuracy}%` : ""}`
                          : "📝 Save Score"}
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
