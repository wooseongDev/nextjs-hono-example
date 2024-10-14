import { hc } from 'hono/client'

import { routes } from '@/server/app'

type AppType = typeof routes

export const client = hc<AppType>('http://localhost:3000', {
  headers: {
    'X-Custom-Header': 'Hello Hono',
  },
})
