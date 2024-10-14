const generateId = () => {
  return Math.random().toString(36).slice(2)
}

export type Todo = {
  id: string
  content: string
  isDone: boolean
}

const todo = {
  id: generateId(),
  content: 'Hello Hono',
  isDone: false,
}

const store = new Map<string, Todo>([[todo.id, todo]])

export const todoStore = {
  getAll: (): Todo[] => Array.from(store.values()),

  getOne: (id: string) => store.get(id),

  createOne: (content: string) => {
    const todo = { id: generateId(), content, isDone: false }
    store.set(todo.id, todo)
    return todo
  },

  updateOne: (id: string, value: Omit<Todo, 'id'>) => {
    const todo = store.get(id)
    if (todo) {
      todo.content = value.content
      todo.isDone = value.isDone
    }
    return todo
  },

  deleteOne: (id: string) => store.delete(id),
}
