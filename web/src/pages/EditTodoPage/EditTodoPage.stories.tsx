import type { Meta, StoryObj } from '@storybook/react'

import EditTodoPage from './EditTodoPage'

const meta: Meta<typeof EditTodoPage> = {
  component: EditTodoPage,
}

export default meta

type Story = StoryObj<typeof EditTodoPage>

export const Primary: Story = {}
