import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'

import { todoRouter } from '@/server/router/todo'

export const app = new OpenAPIHono().basePath('/api')

app.doc('/swagger.json', {
  openapi: '3.1.0',
  info: {
    title: 'Hono Nextjs API',
    version: '1.0.0',
  },
})

app.get('/swagger', swaggerUI({ url: '/api/swagger.json' }))

app.get('/health', (ctx) => {
  return ctx.text('ok')
})

export const routes = app.route('/todo', todoRouter)
