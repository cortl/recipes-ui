import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Recipe {
    title: String!
  }

  type Query {
    getRecipes: [Recipe]
  }
`

export { typeDefs }