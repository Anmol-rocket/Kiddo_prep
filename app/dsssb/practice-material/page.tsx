"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftRight, BookOpen, ChevronLeft, MessageSquareQuote, Search, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  VILOM_LIST,
  PARYAYVACHI_LIST,
  MUHAVARE_LIST,
  type VilomItem,
  type ParyayvachiItem,
  type MuhavaraItem,
} from "@/lib/dsssb-vocab"

type Category = "vilom" | "paryayvachi" | "muhavara"

const CATEGORIES: { id: Category; label: string; icon: React.ReactNode; count: number }[] = [
  { id: "vilom", label: "विलोम शब्द", icon: <ArrowLeftRight className="h-4 w-4" />, count: VILOM_LIST.length },
  { id: "paryayvachi", label: "पर्यायवाची शब्द", icon: <BookOpen className="h-4 w-4" />, count: PARYAYVACHI_LIST.length },
  { id: "muhavara", label: "मुहावरे", icon: <MessageSquareQuote className="h-4 w-4" />, count: MUHAVARE_LIST.length },
]

function matches(haystack: string[], query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return haystack.some((h) => h.toLowerCase().includes(q))
}

export default function PracticeMaterialPage() {
  const router = useRouter()
  const [category, setCategory] = useState<Category>("vilom")
  const [query, setQuery] = useState("")

  const filteredVilom = useMemo(
    () => VILOM_LIST.filter((v) => matches([v.word, v.vilom], query)),
    [query]
  )
  const filteredParyayvachi = useMemo(
    () => PARYAYVACHI_LIST.filter((p) => matches([p.word, ...p.synonyms], query)),
    [query]
  )
  const filteredMuhavare = useMemo(
    () => MUHAVARE_LIST.filter((m) => matches([m.muhavara, m.meaning], query)),
    [query]
  )

  const activeCount =
    category === "vilom"
      ? filteredVilom.length
      : category === "paryayvachi"
        ? filteredParyayvachi.length
        : filteredMuhavare.length

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dsssb")}
            className="text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Practice Material
            </h1>
            <span className="text-[10px] text-emerald-400/80 uppercase tracking-wider">
              हिंदी शब्दावली · DSSSB
            </span>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-3xl space-y-6 animate-fade-in">
        {/* Intro */}
        <Card className="bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border-emerald-500/30 p-5">
          <p className="text-sm text-emerald-100/70 leading-relaxed">
            The most frequently asked विलोम शब्द (antonyms), पर्यायवाची शब्द (synonyms) and मुहावरे
            (idioms) for the DSSSB Hindi Language section — all in one place for quick revision.
          </p>
        </Card>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="खोजें… (e.g. सूर्य, कायर, नाक)"
            className="pl-9 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
          />
        </div>

        {/* Category switcher */}
        <div className="grid grid-cols-3 gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-xl border px-2 py-3 transition-all",
                category === c.id
                  ? "bg-emerald-600/20 border-emerald-500 text-emerald-300"
                  : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
              )}
            >
              {c.icon}
              <span className="text-xs font-semibold text-center leading-tight">{c.label}</span>
              <span className="text-[10px] text-zinc-500">{c.count} items</span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-xs text-zinc-500">
          {activeCount} {activeCount === 1 ? "result" : "results"}
          {query && <> for "{query}"</>}
        </div>

        {/* Lists */}
        {category === "vilom" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredVilom.map((v) => (
              <VilomCard key={v.word} item={v} />
            ))}
            {filteredVilom.length === 0 && <EmptyState />}
          </div>
        )}

        {category === "paryayvachi" && (
          <div className="space-y-3">
            {filteredParyayvachi.map((p) => (
              <ParyayvachiCard key={p.word} item={p} />
            ))}
            {filteredParyayvachi.length === 0 && <EmptyState />}
          </div>
        )}

        {category === "muhavara" && (
          <div className="space-y-3">
            {filteredMuhavare.map((m) => (
              <MuhavaraCard key={m.muhavara} item={m} />
            ))}
            {filteredMuhavare.length === 0 && <EmptyState />}
          </div>
        )}

        {/* CTA to rapid quiz */}
        <Card className="bg-gradient-to-br from-teal-900/30 to-emerald-900/10 border-teal-500/30 p-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Zap className="h-4 w-4 text-teal-400" />
              Ready to test yourself?
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Take the Rapid Quiz — quick-fire MCQs from this exact material.
            </p>
          </div>
          <Button
            onClick={() => router.push("/dsssb/rapid-quiz")}
            className="bg-teal-600 hover:bg-teal-700 shrink-0"
          >
            Start
          </Button>
        </Card>
      </main>
    </div>
  )
}

function VilomCard({ item }: { item: VilomItem }) {
  return (
    <Card className="bg-zinc-900/60 border-zinc-800 p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-base font-semibold text-white">{item.word}</span>
        <ArrowLeftRight className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
        <span className="text-base font-semibold text-emerald-400">{item.vilom}</span>
      </div>
    </Card>
  )
}

function ParyayvachiCard({ item }: { item: ParyayvachiItem }) {
  return (
    <Card className="bg-zinc-900/60 border-zinc-800 p-4">
      <div className="text-base font-semibold text-white mb-2">{item.word}</div>
      <div className="flex flex-wrap gap-1.5">
        {item.synonyms.map((s) => (
          <Badge
            key={s}
            variant="outline"
            className="border-emerald-500/30 text-emerald-300 bg-emerald-500/5 font-normal pointer-events-none"
          >
            {s}
          </Badge>
        ))}
      </div>
    </Card>
  )
}

function MuhavaraCard({ item }: { item: MuhavaraItem }) {
  return (
    <Card className="bg-zinc-900/60 border-zinc-800 p-4">
      <div className="text-base font-semibold text-white">"{item.muhavara}"</div>
      <div className="text-sm text-zinc-400 mt-1.5 leading-relaxed">{item.meaning}</div>
    </Card>
  )
}

function EmptyState() {
  return (
    <div className="col-span-full text-center py-10 text-sm text-zinc-500">
      कोई परिणाम नहीं मिला। कुछ और खोजें।
    </div>
  )
}
