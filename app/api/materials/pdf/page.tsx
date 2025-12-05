"use client"

import { useSearchParams } from "next/navigation"

export default function PdfViewerPage() {
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
