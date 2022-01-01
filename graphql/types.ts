import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  type IngredientCategory {
    category: String!
    items: [String!]!
  }

  type TimeUnit {
    measurement: Int!
    label: String!
  }

  type Time {
    label: String!
    units: [TimeUnit!]!
  }

  type Recipe {
    title: String!
    servings: Int!
    rating: Int!
    slug: String!
    source: String!
    createdDate: String
    instructions: [String!]!
    notes: [String]!
    archived: Boolean!
    ingredients: [IngredientCategory!]!
    tags: [String!]!
    time: [Time!]!
    image: String
  }

  input RecipesWhere {
    hasImage: Boolean
  }

  type Query {
    recipes(where: RecipesWhere): [Recipe]
    recipe(slug: String!): Recipe
  }
`

export { typeDefs }