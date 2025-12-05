"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

function PdfContent() {
  const params = useSearchParams()
  const file = params.get("file") || ""
  const src = file || ""

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-semibold mb-3">PDF Viewer</h1>
        {!file ? (
          <div className="text-sm text-muted-foreground">No file specified.</div>
        ) : (
          <div className="border rounded-md overflow-hidden">
            <iframe
              src={src}
              className="w-full h-[80vh]"
              title="PDF viewer"
            />
          </div>
        )}
        {file && (
          <div className="mt-3">
            <a href={src} download className="text-sm text-primary underline">
              Download PDF
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PdfViewerPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading PDF...</div>}>
      <PdfContent />
    </Suspense>
  )
}
