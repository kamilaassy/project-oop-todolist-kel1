import { useEffect } from 'react'

import { useLocalStorage } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import type { FindTodos, FindTodosVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Todos from 'src/components/Todo/Todos'

export const QUERY: TypedDocumentNode<FindTodos, FindTodosVariables> = gql`
  query FindTodos {
    todos {
      id
      title
      startAt
      endAt
      allDay
      description
      isDone
      reminderAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div className="rw-text-center">
    No todos yet.{' '}
    <Link to={routes.newTodo()} className="rw-link">
      Create one?
    </Link>
  </div>
)

export const Failure = ({ error }: CellFailureProps<FindTodos>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  todos,
}: CellSuccessProps<FindTodos, FindTodosVariables>) => {
  const [remindedIds, setRemindedIds] = useLocalStorage({
    key: 'reminded-todo-ids',
    defaultValue: [] as number[],
  })

  useEffect(() => {
    const now = new Date()
    todos.forEach((todo) => {
      if (
        todo.reminderAt &&
        new Date(todo.reminderAt) <= now &&
        !remindedIds.includes(todo.id) &&
        !todo.isDone
      ) {
        modals.openConfirmModal({
          title: '🔔 Reminder',
          centered: true,
          size: 'md',
          children: (
            <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>
              <div>{todo.title}</div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginTop: 6 }}>
                {todo.description || 'No Descriptions'}
              </div>
            </div>
          ),
          labels: { confirm: 'OK', cancel: 'Later' },
          onConfirm: () => {
            setRemindedIds((prev) => [...prev, todo.id])
          },
          onCancel: () => {
            setRemindedIds((prev) => [...prev, todo.id])
          },
        })
      }
    })
  }, [todos, remindedIds, setRemindedIds])

  return <Todos todos={todos} />
}
