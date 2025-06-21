import { Button, Title, Container, Group, Divider } from '@mantine/core'

import { Link, routes } from '@redwoodjs/router'

import TodosCell from 'src/components/Todo/TodosCell'

const TodosPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9f9ff',
        backgroundImage:
          'radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <Container size="lg" pt="xl">
        <Group justify="apart" mb="lg">
          <Title order={2} fw={700} c="indigo.7">
            📋 My Todos
          </Title>
          <Button
            component={Link}
            to={routes.newTodo()}
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            radius="xl"
          >
            + New Todo
          </Button>
        </Group>

        <Divider my="md" />

        <TodosCell />
      </Container>
    </div>
  )
}

export default TodosPage
