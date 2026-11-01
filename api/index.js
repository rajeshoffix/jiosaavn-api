// Vercel Node.js serverless function (all requests are rewritten here, see vercel.json).
// It serves the compiled build from `dist/` (tsc + tsc-alias), where the `#modules/*` aliases are already resolved.
import app from '../dist/server.js'

// The API routes live under `/api` (e.g. `/api/search/songs`). Many clients (music bots etc.) call the
// short form (`/search/songs`, `/songs/{id}`, ...), so requests without the `/api` prefix are mapped to it.
// `/`, `/docs` and `/swagger` are served as they are.
const ROOT_PATHS = new Set(['/', '/docs', '/swagger'])

export default {
  fetch(request, ...args) {
    const url = new URL(request.url)
    const { pathname } = url

    if (pathname === '/api' || pathname.startsWith('/api/') || ROOT_PATHS.has(pathname)) {
      return app.fetch(request, ...args)
    }

    url.pathname = `/api${pathname}`
    return app.fetch(new Request(url, request), ...args)
  }
}
