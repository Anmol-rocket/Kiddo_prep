"use client"

import React, { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Globe, Download, Eye, CheckCircle, BarChart3, X } from "lucide-react"
import { cn } from "@/lib/utils"

type Item = { name: string; group: string; url: string; ext: string; size: number; type: string }

export default function MaterialsSection() {
  const [items, setItems] = useState<Item[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [doneSet, setDoneSet] = useState<Set<string>>(new Set())
  const [perfMap, setPerfMap] = useState<Record<string, { score: number; total: number; accuracy?: number; date: string }>>({})

  // Modal state for score input
  const [scoreModal, setScoreModal] = useState<{ open: boolean; key: string }>({ open: false, key: "" })
  const [scoreInput, setScoreInput] = useState("")
  const [totalInput, setTotalInput] = useState("100")
  const [accuracyInput, setAccuracyInput] = useState("")
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

  const openScoreModal = (key: string) => {
    const existing = perfMap[key]
    setScoreInput(existing ? String(existing.score) : "")
    setTotalInput(existing ? String(existing.total) : "100")
    setAccuracyInput(existing?.accuracy !== undefined ? String(existing.accuracy) : "")
    setScoreModal({ open: true, key })
  }

  const closeScoreModal = () => {
    setScoreModal({ open: false, key: "" })
    setScoreInput("")
    setTotalInput("100")
    setAccuracyInput("")
  }

  const submitScore = () => {
    const score = Number(scoreInput)
    const total = Number(totalInput)
    if (!Number.isFinite(score) || !Number.isFinite(total) || total <= 0) {
      return
    }
    let accuracy: number | undefined = undefined
    if (accuracyInput.trim() !== "") {
      const accVal = Number(accuracyInput)
      if (Number.isFinite(accVal) && accVal >= 0 && accVal <= 100) {
        accuracy = Math.round(accVal)
      }
    }
    const entry = { score, total, accuracy, date: new Date().toISOString() }
    setPerfMap((prev) => {
      const next = { ...prev, [scoreModal.key]: entry }
      try {
        localStorage.setItem("kiddoprep_mock_perf", JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
    closeScoreModal()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Loading materials…</span>
        </div>
      </div>
    )
  }

  if (!items || items.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="w-12 h-12 text-muted-foreground/50 mb-3" />
        <p className="text-muted-foreground">No materials found.</p>
      </div>
    )

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

  function IconFor({ type }: { type: string }) {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5" />
      case "html":
        return <Globe className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  function getTypeColor(type: string) {
    switch (type) {
      case "pdf":
        return "text-red-500 bg-red-500/10"
      case "html":
        return "text-blue-500 bg-blue-500/10"
      default:
        return "text-muted-foreground bg-muted/50"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Materials & Mock Papers</h2>
          <p className="text-sm text-muted-foreground mt-1">Study resources and practice tests</p>
        </div>
        <Button asChild variant="outline" size="sm" className="gap-2">
          <a href="/materials/mock-analysis">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Mock Analysis</span>
          </a>
        </Button>
      </div>

      {/* Groups */}
      <div className="space-y-8">
        {Object.entries(groups).map(([group, list]) => (
          <div key={group}>
            {/* Group Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
              <h3 className="text-lg font-semibold text-foreground capitalize">
                {group.replace(/_/g, " ")}
              </h3>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {list.length} {list.length === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {list.map((it, index) => {
                const isDone = doneSet.has(it.url)
                const perf = perfMap[it.name]

                return (
                  <Card
                    key={it.url}
                    className={cn(
                      "group relative overflow-hidden p-4 md:p-5",
                      "bg-card/40 backdrop-blur-sm border-border/40",
                      "hover:bg-card/60 hover:border-border/60 hover:shadow-lg",
                      "transition-all duration-300 animate-fade-in",
                      isDone && "border-green-500/30 bg-green-500/5"
                    )}
                    style={{ animationDelay: `${0.05 + index * 0.05}s` }}
                  >
                    {/* Done badge */}
                    {isDone && (
                      <div className="absolute top-3 right-3">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className={cn("flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center", getTypeColor(it.type))}>
                        <IconFor type={it.type} />
                      </div>
                      <div className="flex-1 min-w-0 pr-8">
                        <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {it.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground uppercase">{it.type}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{fmtSize(it.size)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Performance Stats */}
                    {perf && (
                      <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-blue-500 font-medium">Score: {perf.score}/{perf.total}</span>
                          {typeof perf.accuracy === "number" && (
                            <span className="text-blue-400">Accuracy: {perf.accuracy}%</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Primary Actions */}
                    <div className="flex gap-2">
                      {it.type === "pdf" ? (
                        <Button asChild size="sm" className="flex-1 gap-1.5">
                          <a href={`/materials/pdf?file=${encodeURIComponent(it.url)}`}>
                            <Eye className="w-4 h-4" />
                            View
                          </a>
                        </Button>
                      ) : (
                        <Button asChild size="sm" className="flex-1 gap-1.5">
                          <a href={it.url} target="_blank" rel="noreferrer">
                            <Eye className="w-4 h-4" />
                            View
                          </a>
                        </Button>
                      )}
                      <Button asChild variant="outline" size="sm" className="flex-1 gap-1.5">
                        <a href={it.url} download={it.name}>
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                      </Button>
                    </div>

                    {/* Mock Paper Actions */}
                    {it.group === "mock_papers" && (
                      <div className="flex gap-2 mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className={cn(
                            "flex-1 gap-1.5 transition-all",
                            isDone
                              ? "bg-green-500/10 border-green-500/30 text-green-500 hover:bg-green-500/20"
                              : "hover:border-green-500/50 hover:text-green-500"
                          )}
                          onClick={() => toggleDone(it.url)}
                        >
                          <CheckCircle className="w-4 h-4" />
                          {isDone ? "Completed" : "Mark Done"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className={cn(
                            "flex-1 gap-1.5 transition-all",
                            perf
                              ? "bg-blue-500/10 border-blue-500/30 text-blue-500 hover:bg-blue-500/20"
                              : "hover:border-blue-500/50 hover:text-blue-500"
                          )}
                          onClick={() => openScoreModal(it.name)}
                        >
                          <BarChart3 className="w-4 h-4" />
                          {perf ? "Update Score" : "Save Score"}
                        </Button>
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Score Input Modal */}
      {scoreModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <Card className="relative w-full max-w-md p-6 space-y-5 animate-fade-in border-border/50 bg-card">
            {/* Close button */}
            <button
              onClick={closeScoreModal}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-foreground">Save Score</h3>
              <p className="text-sm text-muted-foreground mt-1 truncate">{scoreModal.key}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="score-input">Score Obtained</Label>
                <Input
                  id="score-input"
                  type="number"
                  placeholder="e.g. 45"
                  value={scoreInput}
                  onChange={(e) => setScoreInput(e.target.value)}
                  autoFocus
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="total-input">Total Marks</Label>
                <Input
                  id="total-input"
                  type="number"
                  placeholder="e.g. 50"
                  value={totalInput}
                  onChange={(e) => setTotalInput(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accuracy-input">Accuracy % <span className="text-muted-foreground">(optional)</span></Label>
                <Input
                  id="accuracy-input"
                  type="number"
                  placeholder="e.g. 90"
                  min={0}
                  max={100}
                  value={accuracyInput}
                  onChange={(e) => setAccuracyInput(e.target.value)}
                  className="h-11"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1 h-11" onClick={closeScoreModal}>
                Cancel
              </Button>
              <Button
                className="flex-1 h-11"
                onClick={submitScore}
                disabled={!scoreInput || !totalInput || Number(totalInput) <= 0}
              >
                Save Score
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
