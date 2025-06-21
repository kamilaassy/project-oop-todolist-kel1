import {
  TextInput,
  Button,
  Checkbox,
  Box,
  Group,
  Paper,
  Title,
  Stack,
  Text,
} from '@mantine/core'
import { DateTimePicker, DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import type {
  CreateTodoInput,
  EditTodoById,
  UpdateTodoInput,
} from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'

type FormTodo = NonNullable<EditTodoById['todo']>

interface TodoFormProps {
  todo?: EditTodoById['todo']
  onSave: (data: UpdateTodoInput, id?: FormTodo['id']) => void
  error: RWGqlError
  loading: boolean
}

const TodoForm = (props: TodoFormProps) => {
  const form = useForm({
    initialValues: {
      title: props.todo?.title || '',
      startAt: props.todo?.startAt ? new Date(props.todo.startAt) : null,
      endAt: props.todo?.endAt ? new Date(props.todo.endAt) : null,
      allDay: props.todo?.allDay || false,
      description: props.todo?.description || '',
      isDone: props.todo?.isDone || false,
      reminderAt: props.todo?.reminderAt
        ? new Date(props.todo.reminderAt)
        : null,
    },
    validate: {
      title: (value) => (value ? null : 'Title is required'),
      startAt: (value) => (value ? null : 'Start date is required'),
      endAt: (value, values) =>
        values.allDay || value ? null : 'End date is required',
    },
  })

  const onSubmit = (values: typeof form.values) => {
    const data: CreateTodoInput = {
      title: values.title,
      startAt: values.startAt?.toISOString(),
      endAt: values.allDay ? undefined : values.endAt?.toISOString(),
      allDay: values.allDay,
      description: values.description,
      isDone: values.isDone,
      reminderAt: values.reminderAt
        ? values.reminderAt.toISOString()
        : undefined,
    }

    props.onSave(data, props.todo?.id)
  }

  return (
    <Box
      pt="xl"
      pb="xl"
      display="flex"
      style={{
        minHeight: 'calc(100vh - 100px)',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Paper
        shadow="md"
        radius="lg"
        p="xl"
        withBorder
        w="100%"
        maw={500}
        mx="auto"
      >
        <Title order={3} mb="lg" ta="center" c="indigo.7">
          {props.todo ? '✏️ Edit Todo' : '📝 New Todo'}
        </Title>

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Title"
              placeholder="Enter title"
              {...form.getInputProps('title')}
              required
            />

            <Checkbox
              label="All Day"
              checked={form.values.allDay}
              onChange={(event) =>
                form.setFieldValue('allDay', event.currentTarget.checked)
              }
            />
            <Text size="xs" c="dimmed" mt={-10} mb="sm">
              When checked, the task is considered an all-day event.
            </Text>

            {form.values.allDay ? (
              <Box>
                <Text size="sm" mb={4}>
                  Start Date (All Day)
                </Text>
                <DatePickerInput
                  key={`start-date-${form.values.allDay}`}
                  label="Start Date (All Day)"
                  placeholder="Select date"
                  dropdownType="modal"
                  value={form.values.startAt}
                  onChange={(value) => {
                    if (value && !isNaN(new Date(value).getTime())) {
                      const start = new Date(value)
                      start.setHours(0, 0, 0, 0)
                      form.setFieldValue('startAt', start)
                    } else {
                      form.setFieldValue('startAt', null)
                    }
                  }}
                  required
                />
              </Box>
            ) : (
              <Group grow>
                <DateTimePicker
                  label="Start Date & Time"
                  value={form.values.startAt}
                  onChange={(value) => {
                    const parsed =
                      typeof value === 'string'
                        ? new Date(value)
                        : value ?? null
                    form.setFieldValue(
                      'startAt',
                      parsed && !isNaN(parsed.getTime()) ? parsed : null
                    )
                  }}
                  placeholder="Select start"
                  required
                />
                <DateTimePicker
                  label="End Date & Time"
                  value={form.values.endAt}
                  onChange={(value) => {
                    const parsed =
                      typeof value === 'string'
                        ? new Date(value)
                        : value ?? null
                    form.setFieldValue(
                      'endAt',
                      parsed && !isNaN(parsed.getTime()) ? parsed : null
                    )
                  }}
                  placeholder="Select end"
                  required
                />
              </Group>
            )}

            <TextInput
              label="Description"
              placeholder="Optional description"
              {...form.getInputProps('description')}
            />

            {props.todo && (
              <Checkbox
                label="Is Done"
                checked={form.values.isDone}
                onChange={(event) =>
                  form.setFieldValue('isDone', event.currentTarget.checked)
                }
              />
            )}

            <DateTimePicker
              label="Reminder"
              placeholder="Optional reminder"
              value={form.values.reminderAt}
              onChange={(value) => {
                const parsed =
                  typeof value === 'string'
                    ? new Date(value)
                    : value ?? null
                form.setFieldValue(
                  'reminderAt',
                  parsed && !isNaN(parsed.getTime()) ? parsed : null
                )
              }}
            />

            <Group justify="end" mt="sm">
              <Button
                type="submit"
                loading={props.loading}
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}
                radius="xl"
              >
                Save
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Box>
  )
}

export default TodoForm
