// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Todos" titleTo="todos" buttonLabel="New Todo" buttonTo="newTodo">
        <Route path="/todos/new" page={TodoNewTodoPage} name="newTodo" />
        <Route path="/todos/{id:Int}/edit" page={TodoEditTodoPage} name="editTodo" />
        <Route path="/todos/{id:Int}" page={TodoTodoPage} name="todo" />
        <Route path="/todos" page={TodoTodosPage} name="todos" />
      </Set>
      <Route path="/" redirect="/todos" />

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
