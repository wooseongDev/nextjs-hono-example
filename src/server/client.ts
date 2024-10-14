import { hc } from 'hono/client'

import { routes } from '@/server/app'

type AppType = typeof routes

const BASE_URL = process.env.VERCEL_URL ?? 'http://localhost:3000'

export const client = hc<AppType>(BASE_URL, {
  headers: {
    'X-Custom-Header': 'Hello Hono',
  },
})
