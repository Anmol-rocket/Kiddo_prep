# Materials & Mock Papers Static Hosting



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
- If a directory is empty, the list will show “No materials found.”
