# Materials & Mock Papers Static Hosting

This app now expects materials to be served statically from the `public/` directory for simpler URLs and better performance.

## Move your files

Relocate existing assets from:
- `lib/Material/*` ➜ `public/materials/`
- `lib/Mock_papers/*` ➜ `public/mock_papers/`

Supported file types: PDF (`.pdf`), HTML (`.html`, `.htm`), and others will be served as downloads.

## Accessing files

Files become available at these URLs:
- PDFs/HTML in `public/materials` ➜ `/materials/<filename>`
- PDFs/HTML in `public/mock_papers` ➜ `/mock_papers/<filename>`

The Settings page lists and links them automatically via the `/api/materials` index.

## Notes

- The previous `/api/materials/serve` route is no longer required for static files; PDFs are embedded directly in the in-app viewer.
- If a directory is empty, the list will show “No materials found.”
