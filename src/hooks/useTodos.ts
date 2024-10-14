'use client'

import { useCallback, useEffect, useState } from 'react'

import { client } from '@/server/client'
import type { Todo } from '@/server/store/todo'

const fetcher = async () => {
  const response = await client.api.todo.$get()
  return response.json()
}

export const useTodos = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown | null>(null)
  const [todos, setTodos] = useState<Todo[]>([])

  const fetch = useCallback(() => {
    fetcher()
      .then(setTodos)
      .catch(setError)
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const refetch = () => {
    setIsLoading(true)
    fetch()
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addTodo = async (content: string) => {
    const response = await client.api.todo.$post({ json: { content } })
    const todo = await response.json()

    setTodos((prev) => [...prev, todo])
  }

  const toggleTodo = (id: string) => async () => {
    const todo = todos.find((todo) => todo.id === id)
    if (!todo) {
      return
    }

    const response = await client.api.todo[':id'].$patch({
      param: { id },
      json: { content: todo.content, isDone: !todo.isDone },
    })
    if (response.ok) {
      const updated = await response.json()
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)))
    }
  }

  const deleteTodo = (id: string) => async () => {
    const response = await client.api.todo[':id'].$delete({
      param: { id },
    })
    if (response.status === 204) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }
  }

  return { isLoading, error, todos, refetch, addTodo, toggleTodo, deleteTodo }
}
