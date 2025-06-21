import {
  Card,
  Text,
  Badge,
  Group,
  Title,
  Button,
  Container,
  Stack,
} from '@mantine/core'
import { IconEdit, IconArrowLeft } from '@tabler/icons-react'

import { Link, routes } from '@redwoodjs/router'

import { timeTag } from 'src/lib/formatters'

const Todo = ({ todo }) => {
  return (
    <Container size="sm" mt="xl">
      <Card shadow="md" radius="md" p="xl" withBorder>
        <Stack gap="sm">
          <Group justify="space-between" mb="sm">
            <Title order={3} fw={700} c="indigo.7">
              📝 {todo.title}
            </Title>
            <Badge color={todo.isDone ? 'green' : 'yellow'}>
              {todo.isDone ? 'Completed' : 'Pending'}
            </Badge>
          </Group>

          <Text size="sm" c="dimmed">
            Description:
          </Text>
          <Text>{todo.description || 'No description'}</Text>

          <Text size="sm" c="dimmed">
            Start At:
          </Text>
          <Text>
            {todo.startAt ? timeTag(todo.startAt) : 'Not specified'}
          </Text>

          <Text size="sm" c="dimmed">
            End At:
          </Text>
          <Text>{todo.endAt ? timeTag(todo.endAt) : 'Not specified'}</Text>

          <Text size="sm" c="dimmed">
            All Day:
          </Text>
          <Text>{todo.allDay ? 'Yes' : 'No'}</Text>

          <Text size="sm" c="dimmed">
            Reminder:
          </Text>
          <Text>{todo.reminderAt ? timeTag(todo.reminderAt) : 'None'}</Text>

          <Group justify="space-between" mt="lg">
            <Button
              component={Link}
              to={routes.editTodo({ id: todo.id })}
              leftSection={<IconEdit size={16} />}
              color="blue"
            >
              Edit
            </Button>
            <Button
              component={Link}
              to={routes.todos()}
              variant="light"
              leftSection={<IconArrowLeft size={16} />}
            >
              Back to list
            </Button>
          </Group>
        </Stack>
      </Card>
    </Container>
  )
}

export default Todo
