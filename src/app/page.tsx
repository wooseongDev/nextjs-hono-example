'use client'

import Link from 'next/link'
import { type FormEventHandler } from 'react'

import { useTodos } from '@/hooks/useTodos'

export default function Home() {
  const { isLoading, todos, refetch, addTodo, toggleTodo, deleteTodo } = useTodos()

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const content = Object.fromEntries(new FormData(event.currentTarget)).content as string
    if (content.trim()) {
      event.currentTarget.content.value = ''
      addTodo(content as string)
    }
  }

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <span>loading...</span>
      </div>
    )
  }
  return (
    <main className="flex flex-col items-center max-w-2xl w-full mx-auto">
      <div className="flex justify-between w-full p-4 text-sm">
        <button onClick={refetch}>refetch</button>
        <Link href="/api/swagger">Go to Swagger Docs →</Link>
      </div>

      <div className="w-full p-4">
        <h3 className="mb-4">Todo List</h3>

        <form className="flex w-full gap-4" onSubmit={onSubmit}>
          <input className="flex-1 border rounded px-3 py-2" name="content" placeholder="todo" autoComplete="off" />
          <button className="shrink-0 border rounded px-3 py-2 bg-gray-800 text-white" type="submit">
            Add
          </button>
        </form>

        <ul className="flex flex-col mt-12 gap-4">
          {todos.length === 0 ? <li className="flex items-center justify-center text-lg">🫠 Empty Todo list</li> : null}
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-4 text-sm">
              <input className="shrink-0" type="checkbox" defaultChecked={todo.isDone} onClick={toggleTodo(todo.id)} />
              <p className="flex-1 break-all">{todo.content}</p>
              <button className="shrink-0" onClick={deleteTodo(todo.id)}>
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
