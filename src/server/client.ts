import { hc } from 'hono/client'

import { routes } from '@/server/app'

type AppType = typeof routes

const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://nextjs-hono-example.vercel.app' : 'http://localhost:3000'

export const client = hc<AppType>(BASE_URL, {
  headers: {
    'X-Custom-Header': 'Hello Hono',
  },
})
