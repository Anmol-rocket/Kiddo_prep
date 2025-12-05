import fs from "fs"
import path from "path"

// Ensure this API route runs on the Node.js runtime so `fs` works in production
export const runtime = "nodejs"
// Ensure the route is always dynamic (no static prerender/caching)
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const base = process.cwd()
    const dirs = [
      { name: "materials", dir: path.join(base, "public", "materials") },
      { name: "mock_papers", dir: path.join(base, "public", "mock_papers") },
    ]

    const items: Array<{ name: string; group: string; url: string; ext: string; size: number; type: string }> = []

    for (const d of dirs) {
      if (!fs.existsSync(d.dir)) continue
      const files = fs.readdirSync(d.dir)
      for (const f of files) {
        const abs = path.join(d.dir, f)
        const stat = fs.statSync(abs)
        if (!stat.isFile()) continue
        const ext = path.extname(f).toLowerCase()
        const url = `/${d.name}/${encodeURIComponent(f)}`
        const type = ext === ".pdf" ? "pdf" : ext === ".html" || ext === ".htm" ? "html" : "other"
        items.push({ name: f, group: d.name, url, ext, size: stat.size, type })
      }
    }

    return new Response(JSON.stringify(items), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}
