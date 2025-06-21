import {
  Card,
  Group,
  Text,
  Badge,
  Button,
  Container,
  Title,
  SimpleGrid,
  ActionIcon,
} from '@mantine/core'
import { IconTrash, IconEdit, IconEye } from '@tabler/icons-react'
import type {
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
  FindTodos,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Todo/TodosCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_TODO_MUTATION: TypedDocumentNode<
  DeleteTodoMutation,
  DeleteTodoMutationVariables
> = gql`
  mutation DeleteTodoMutation($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
`

type TodosListProps = {
  todos: FindTodos['todos']
}

const TodosList = ({ todos }: TodosListProps) => {
  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION, {
    onCompleted: () => {
      toast.success('Todo deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteTodoMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete todo ' + id + '?')) {
      deleteTodo({ variables: { id } })
    }
  }

  const isReminderDue = (reminderAt: string | null | undefined) => {
    return reminderAt && new Date(reminderAt) <= new Date()
  }

  return (
    <Container size="xl" py="xl">
      <Title order={2} mb="xl" ta="center" c="indigo.7">
        All Todos
      </Title>

      {todos.length === 0 ? (
        <Text ta="center" color="dimmed">
          🎉 No todos. Add a new one to get started!{' '}
        </Text>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {todos.map((todo) => (
            <Card
              key={todo.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{
                backgroundColor: todo.isDone ? '#e6fcf5' : '#f8f9fa',
                opacity: todo.isDone ? 0.8 : 1,
                borderLeft: `5px solid ${todo.isDone ? '#40c057' : '#fab005'}`,
              }}
            >
              <Text size="lg" fw={600} mb={4}>
                {truncate(todo.title)}
              </Text>
              <Text size="sm" color="dimmed" mb={4}>
                {truncate(todo.description) || 'No description'}
              </Text>
              <Text size="xs" c="gray.6" mb={4}>
                  📅Start: {todo.allDay
                    ? new Date(todo.startAt).toLocaleDateString()
                    : new Date(todo.startAt).toLocaleString()}
                  <br />
                  📅End: {todo.allDay
                    ? '-'
                    : todo.endAt
                      ? new Date(todo.endAt).toLocaleString()
                      : '-'}
                  <br />
                  ⏰Reminder: {todo.reminderAt ? new Date(todo.reminderAt).toLocaleString() : '-'}
                </Text>
              <Group gap="sm" mb="sm">
                {isReminderDue(todo.reminderAt) && (
                  <Badge color="red">Reminder Due!</Badge>
                )}
                <Badge color={todo.isDone ? 'green' : 'yellow'}>
                  {todo.isDone ? 'Completed' : 'Pending'}
                </Badge>
              </Group>

              <Group justify="end" gap="xs" mt="md">
                <Button
                  component={Link}
                  to={routes.todo({ id: todo.id })}
                  size="xs"
                  leftSection={<IconEye size={14} />}
                  variant="default"
                >
                  View
                </Button>
                <Button
                  component={Link}
                  to={routes.editTodo({ id: todo.id })}
                  size="xs"
                  leftSection={<IconEdit size={14} />}
                  color="blue"
                >
                  Edit
                </Button>
                <ActionIcon
                  variant="light"
                  color="red"
                  onClick={() => onDeleteClick(todo.id)}
                  aria-label="Delete todo"
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Container>
  )
}

export default TodosList
