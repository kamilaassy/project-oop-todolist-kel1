import type { FindTodoById, FindTodoByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Todo from 'src/components/Todo/Todo'

export const QUERY: TypedDocumentNode<FindTodoById, FindTodoByIdVariables> =
  gql`
    query FindTodoById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Todo not found</div>

export const Failure = ({ error }: CellFailureProps<FindTodoByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  todo,
}: CellSuccessProps<FindTodoById, FindTodoByIdVariables>) => {
  return <Todo todo={todo} />
}
