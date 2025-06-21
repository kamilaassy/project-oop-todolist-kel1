export const schema = gql`
  type Todo {
    id: Int!
    title: String!
    description: String
    startAt: DateTime
    endAt: DateTime
    allDay: Boolean!
    isDone: Boolean!
    reminderAt: DateTime
  }

  type Query {
    todos: [Todo!]! @requireAuth
    todo(id: Int!): Todo @requireAuth
  }

  input CreateTodoInput {
    title: String!
    description: String
    startAt: DateTime
    endAt: DateTime
    allDay: Boolean!
    isDone: Boolean!
    reminderAt: DateTime
  }

  input UpdateTodoInput {
    title: String
    description: String
    startAt: DateTime
    endAt: DateTime
    allDay: Boolean
    isDone: Boolean
    reminderAt: DateTime
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo! @requireAuth
    updateTodo(id: Int!, input: UpdateTodoInput!): Todo! @requireAuth
    deleteTodo(id: Int!): Todo! @requireAuth
  }
`
