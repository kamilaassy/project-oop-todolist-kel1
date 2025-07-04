import type {
  EditTodoById,
  UpdateTodoInput,
  UpdateTodoMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TodoForm from 'src/components/Todo/TodoForm'

export const QUERY: TypedDocumentNode<EditTodoById> = gql`
  query EditTodoById($id: Int!) {
    todo: todo(id: $id) {
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

const UPDATE_TODO_MUTATION: TypedDocumentNode<
  EditTodoById,
  UpdateTodoMutationVariables
> = gql`
  mutation UpdateTodoMutation($id: Int!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ todo }: CellSuccessProps<EditTodoById>) => {
  const [updateTodo, { loading, error }] = useMutation(UPDATE_TODO_MUTATION, {
    onCompleted: () => {
      toast.success('Todo updated')
      navigate(routes.todos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateTodoInput, id: EditTodoById['todo']['id']) => {
    updateTodo({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Todo {todo?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TodoForm todo={todo} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
