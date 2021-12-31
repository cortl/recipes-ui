import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Recipe {
    title: String!
    servings: Int!
    rating: Int!
    slug: String!
    source: String!
  }

  type Query {
    getRecipes: [Recipe]
  }
`

export { typeDefs }