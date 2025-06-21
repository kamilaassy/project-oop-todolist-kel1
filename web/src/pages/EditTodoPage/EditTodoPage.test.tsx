import { render } from '@redwoodjs/testing/web'

import EditTodoPage from './EditTodoPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EditTodoPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditTodoPage />)
    }).not.toThrow()
  })
})
