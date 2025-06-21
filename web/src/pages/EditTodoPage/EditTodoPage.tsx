// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const EditTodoPage = () => {
  return (
    <>
      <Metadata title="EditTodo" description="EditTodo page" />

      <h1>EditTodoPage</h1>
      <p>
        Find me in <code>./web/src/pages/EditTodoPage/EditTodoPage.tsx</code>
      </p>
      {/*
          My default route is named `editTodo`, link to me with:
          `<Link to={routes.editTodo()}>EditTodo</Link>`
      */}
    </>
  )
}

export default EditTodoPage
