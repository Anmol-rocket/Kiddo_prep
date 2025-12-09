"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import MaterialsSection from "@/components/materials-section"
import { ChevronLeft, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function MaterialsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-5">
          <div className="flex items-center justify-between">
            {/* Back & Title */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => router.push("/")}
                className="rounded-xl"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  Study Materials
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Mock papers, PDFs, and reference materials
                </p>
              </div>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        <MaterialsSection />
      </main>
    </div>
  )
}
