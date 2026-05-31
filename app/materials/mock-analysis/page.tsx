"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Perf = { score: number; total: number; accuracy?: number; date: string }

export default function MockAnalysisPage() {
  const [perfs, setPerfs] = useState<Record<string, Perf>>({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kiddoprep_mock_perf")
      if (raw) setPerfs(JSON.parse(raw))
    } catch {
      // ignore
    }
  }, [])

  const entries = Object.entries(perfs)
  const aggregate = entries.reduce(
    (acc, [, p]) => {
      acc.attempts += 1
      acc.totalScore += p.score
      acc.totalMax += p.total
      if (typeof p.accuracy === 'number') acc.accSum += p.accuracy
      return acc
    },
    { attempts: 0, totalScore: 0, totalMax: 0, accSum: 0 }
  )

  const avgPercent = aggregate.totalMax > 0 ? Math.round((aggregate.totalScore / aggregate.totalMax) * 100) : 0
  const avgAccuracy = aggregate.attempts > 0 ? Math.round(aggregate.accSum / aggregate.attempts) : undefined

  const clearAll = () => {
    try {
      localStorage.removeItem("kiddoprep_mock_perf")
      setPerfs({})
    } catch {}
  }

  const editPerf = (key: string) => {
    const current = perfs[key]
    const scoreStr = prompt("Edit score", current ? String(current.score) : "0")
    if (scoreStr == null) return
    const totalStr = prompt("Edit total", current ? String(current.total) : "100")
    if (totalStr == null) return
    const score = Number(scoreStr)
    const total = Number(totalStr)
    if (!Number.isFinite(score) || !Number.isFinite(total) || total <= 0) {
      alert("Please enter valid numeric values.")
      return
    }
    const entry = { score, total, date: new Date().toISOString() }
    const next = { ...perfs, [key]: entry }
    try {
      localStorage.setItem("kiddoprep_mock_perf", JSON.stringify(next))
    } catch {}
    setPerfs(next)
  }

  const deletePerf = (key: string) => {
    const ok = confirm(`Delete saved performance for "${key}"?`)
    if (!ok) return
    const next = { ...perfs }
    delete next[key]
    try {
      localStorage.setItem("kiddoprep_mock_perf", JSON.stringify(next))
    } catch {}
    setPerfs(next)
  }

  return (
    <main className="min-h-screen bg-background px-4 md:px-6 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mock Analysis</h1>
        <Button variant="outline" onClick={clearAll}>Clear All</Button>
      </div>

      <Card className="p-4 mb-6">
        <div className="text-sm text-muted-foreground">Attempts: {aggregate.attempts}</div>
        <div className="text-sm text-muted-foreground">Total: {aggregate.totalScore}/{aggregate.totalMax}</div>
        <div className="text-lg font-semibold">Avg. Percentage: {avgPercent}%</div>
        {typeof avgAccuracy === 'number' && (
          <div className="text-sm text-muted-foreground">Avg. Accuracy: {avgAccuracy}%</div>
        )}
      </Card>

      {entries.length === 0 ? (
        <div className="text-sm text-muted-foreground">No saved performance yet. Go to Materials and save results.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {entries.map(([key, p]) => (
            <Card key={key} className="p-4">
              <div className="text-sm font-mono break-all mb-2">{key}</div>
              <div className="text-sm">Score: {p.score}/{p.total}</div>
              {typeof p.accuracy === 'number' && (
                <div className="text-sm">Accuracy: {p.accuracy}%</div>
              )}
              <div className="text-xs text-muted-foreground">Date: {new Date(p.date).toLocaleString()}</div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" onClick={() => editPerf(key)}>Edit</Button>
                <Button variant="destructive" onClick={() => deletePerf(key)}>Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Button asChild>
          <a href="/">Back to Home</a>
        </Button>
      </div>
    </main>
  )
}
