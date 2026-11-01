// Vercel Node.js serverless function (all requests are rewritten here, see vercel.json).
// It serves the compiled build from `dist/` (tsc + tsc-alias), where the `#modules/*` aliases are already resolved.
import app from '../dist/server.js'

export default app
