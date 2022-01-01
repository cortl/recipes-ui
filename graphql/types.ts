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

  input RecipeWhere {
    slug: String
  }

  type Query {
    recipes(where: RecipeWhere): [Recipe]
    recipe(slug: String!): Recipe
  }
`

export { typeDefs }