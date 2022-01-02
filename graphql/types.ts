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

  input BooleanFilter {
    is: Boolean
    exists: Boolean
  }

  input ArrayFilter {
    in: [String!]!
    exists: Boolean
  }

  input NumberFilter {
    gt: Int
    lt: Int
    eq: Int
    exists: Boolean
  }

  input RecipesWhere {
    rating: NumberFilter
    image: BooleanFilter
    archived: BooleanFilter
    tags: ArrayFilter
  }

  type Query {
    recipes(where: RecipesWhere): [Recipe]
    recipe(slug: String!): Recipe
  }
`

export { typeDefs }