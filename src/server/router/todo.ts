import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'

import { todoStore } from '@/server/store/todo'

const todoSchema = z
  .object({
    id: z.string(),
    content: z.string(),
    isDone: z.boolean(),
  })
  .openapi('Todo')

export const todoRouter = new OpenAPIHono()
  .openapi(
    createRoute({
      tags: ['todo'],
      method: 'get',
      path: '/',
      summary: 'Get all todos',
      description: '모든 Todo를 가져온다',
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: z.array(todoSchema),
            },
          },
        },
      },
    }),
    async (ctx) => {
      const todos = todoStore.getAll()

      return ctx.json(todos, 200)
    },
  )
  .openapi(
    createRoute({
      tags: ['todo'],
      method: 'get',
      path: '/{id}',
      summary: 'Get one todo',
      description: 'ID에 해당하는 Todo를 가져온다',
      request: {
        params: todoSchema.pick({ id: true }),
      },
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: todoSchema,
            },
          },
        },
        404: {
          description: 'Not found',
        },
      },
    }),
    async (ctx) => {
      const { id } = ctx.req.valid('param')
      const todo = todoStore.getOne(id)

      if (!todo) {
        return ctx.notFound()
      }
      return ctx.json(todo, 200)
    },
  )
  .openapi(
    createRoute({
      tags: ['todo'],
      method: 'post',
      path: '/',
      summary: 'Create new todo',
      description: '새로운 Todo를 만든다',
      request: {
        body: {
          content: {
            'application/json': {
              schema: todoSchema.pick({ content: true }),
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Success',
          content: {
            'application/json': {
              schema: todoSchema,
            },
          },
        },
      },
    }),
    async (ctx) => {
      const { content } = ctx.req.valid('json')
      const todo = todoStore.createOne(content)

      return ctx.json(todo, 201)
    },
  )
  .openapi(
    createRoute({
      tags: ['todo'],
      method: 'patch',
      path: '/{id}',
      summary: 'Update one todo',
      description: 'ID에 해당하는 Todo를 수정한다',
      request: {
        params: todoSchema.pick({ id: true }),
        body: {
          content: {
            'application/json': {
              schema: todoSchema.omit({ id: true }),
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: todoSchema,
            },
          },
        },
        404: {
          description: 'Not found',
        },
      },
    }),
    async (ctx) => {
      const { id } = ctx.req.valid('param')
      const { content, isDone } = ctx.req.valid('json')
      const todo = todoStore.updateOne(id, { content, isDone })

      return ctx.json(todo, 200)
    },
  )
  .openapi(
    createRoute({
      tags: ['todo'],
      method: 'delete',
      path: '/{id}',
      summary: 'Delete one todo',
      description: 'ID에 해당하는 Todo를 수정한다',
      request: {
        params: todoSchema.pick({ id: true }),
      },
      responses: {
        204: {
          description: 'Success',
        },
        404: {
          description: 'Not found',
        },
      },
    }),
    async (ctx) => {
      const { id } = ctx.req.valid('param')
      const result = todoStore.deleteOne(id)

      if (result) {
        return ctx.body(null, 204)
      }
      return ctx.notFound()
    },
  )
