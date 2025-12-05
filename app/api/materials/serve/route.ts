import fs from "fs"
import path from "path"

// Ensure this API route runs on the Node.js runtime so `fs` works in production
export const runtime = "nodejs"

function getMime(ext: string) {
  switch (ext) {
    case ".pdf":
      return "application/pdf"
    case ".html":
    case ".htm":
      return "text/html; charset=utf-8"
    case ".txt":
      return "text/plain; charset=utf-8"
    default:
      return "application/octet-stream"
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const fileParam = url.searchParams.get("file")
    if (!fileParam) {
      return new Response("missing file param", { status: 400 })
    }

    const base = process.cwd()
    const resolved = path.resolve(base, fileParam)

    const allowedDirs = [
      path.join(base, "lib", "Material"),
      path.join(base, "lib", "Mock_papers"),
    ]

    const allowed = allowedDirs.some((d) => {
      const normD = d.endsWith(path.sep) ? d : d + path.sep
      return resolved === d || resolved.startsWith(normD)
    })

    if (!allowed) {
      return new Response("forbidden", { status: 403 })
    }

    if (!fs.existsSync(resolved)) {
      return new Response("not found", { status: 404 })
    }

    const stat = fs.statSync(resolved)
    if (!stat.isFile()) return new Response("not a file", { status: 400 })

    const ext = path.extname(resolved).toLowerCase()
    const mime = getMime(ext)
    const data = fs.readFileSync(resolved)

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": mime,
        "Content-Disposition": `inline; filename="${path.basename(resolved)}"`,
      },
    })
  } catch (err) {
    return new Response(String(err), { status: 500 })
  }
}
