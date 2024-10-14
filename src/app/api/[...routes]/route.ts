import { handle } from 'hono/vercel'

import { routes } from '@/server/app'

const handler = handle(routes)

//export const  OPTIONS = handler
export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
