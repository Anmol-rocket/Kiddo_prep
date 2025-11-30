"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function SettingsPage() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [resetDone, setResetDone] = useState(false)

  const handleReset = () => {
    try {
      // Clear known global app/quiz states
      localStorage.removeItem("kiddoprep_appstate")
      localStorage.removeItem("kiddoprep_quizstate")
      localStorage.removeItem("kiddoprep_stats")

      // Remove any topic-specific selections/sessions
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) || ""
        if (
          key.startsWith("kiddoprep_selection_") ||
          key.startsWith("kiddoprep_session_")
        ) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k))

      setResetDone(true)
    } catch (e) {
      // no-op
    } finally {
      setConfirmOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-6">Manage your app preferences and saved progress.</p>

        <div className="bg-card rounded-lg p-4 border">
          <h2 className="text-lg font-semibold mb-2">Reset Progress</h2>
          <p className="text-sm text-muted-foreground mb-4">
            This will clear all saved quiz sessions, selections, and statistics from this browser.
          </p>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            Reset Progress
          </Button>
          {resetDone && (
            <div className="mt-3 text-sm text-green-600">All progress has been reset.</div>
          )}
        </div>

        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent>
            <DialogTitle>Reset all progress?</DialogTitle>
            <DialogDescription>
              This action will remove saved app state, quiz sessions, selections, and stats. You cannot undo this.
            </DialogDescription>
            <div className="mt-4 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
              <Button className="btn-primary" variant="destructive" onClick={handleReset}>Reset</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
