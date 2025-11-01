import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const users = [
  { id: '1', name: 'John Doe', age: 30, isMarried: true },
  { id: '2', name: 'Jane Smith', age: 25, isMarried: false },
  { id: '3', name: 'Alice Johnson', age: 28, isMarried: false },
]

//create authors data
const authors = [
  { id: 1, name: 'J. K. Rowling' },
  { id: 2, name: 'J. R. R. Tolkien' },
  { id: 3, name: 'Brent Weeks' },
]

//create books data
const books = [
  { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
  { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
  { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
  { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
  { id: 5, name: 'The Two Towers', authorId: 2 },
  { id: 6, name: 'The Return of the King', authorId: 2 },
  { id: 7, name: 'The Way of Shadows', authorId: 3 },
  { id: 8, name: 'Beyond the Shadows', authorId: 3 },
]

const typeDefs = `#graphql
  type Query {
    getAllUsers: [User],
    getUserById(id:ID!): User
  }

  type Mutation {
    createUser(name: String!, age: Int!, isMarried: Boolean!): User!,
    updateUserByID(id:ID!,name: String!, age: Int!, isMarried: Boolean!): User!
  }

  type User {
    id: ID!,
    name: String!,
    age: Int!,
    isMarried: Boolean!
  }

`

const resolvers = {
  Query: {
    getAllUsers: () => {
      return users
    },
    getUserById: (parent, args) => {
      const searchedID = args.id

      return users.find((user) => {
        return user.id === searchedID
      })
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, age, isMarried } = args

      const newUser = {
        id: (users.length + 1).toString(),
        name,
        age,
        isMarried,
      }

      console.log(newUser)
      users.push(newUser)

      return newUser
    },
    updateUserByID: (parent, args) => {
      const { id, name, age, isMarried } = args

      const userIndex = users.findIndex((user) => user.id === id)

      if (userIndex === -1) {
        throw new Error('User not found')
      }

      users[userIndex] = {
        ...users[userIndex],
        name,
        age,
        isMarried,
      }
      
      return users[userIndex]
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 8000 },
  context: async () => ({}),
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})

console.log(`🚀 Server ready at ${url}`)
