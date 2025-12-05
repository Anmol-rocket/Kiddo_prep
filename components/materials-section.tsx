"use client"

import React, { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Item = { name: string; group: string; url: string; ext: string; size: number; type: string }

export default function MaterialsSection() {
  const [items, setItems] = useState<Item[] | null>(null)
  const [loading, setLoading] = useState(true)

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
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">Materials & Mock Papers</h2>
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

                  <div className="flex gap-2">
                    {it.type === "pdf" ? (
                      <Button asChild className="flex-1 btn-primary text-sm md:text-base">
                        <a href={`/materials/pdf?file=${encodeURIComponent(it.url)}`}>View in App</a>
                      </Button>
                    ) : (
                      <Button asChild className="flex-1 btn-primary text-sm md:text-base">
                        <a href={it.url} target="_blank" rel="noreferrer">View</a>
                      </Button>
                    )}
                    <Button asChild variant="outline" className="flex-1 text-sm md:text-base bg-transparent">
                      <a href={it.url} download={it.name}>Download</a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
