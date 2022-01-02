const typeDef = `
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
`

export default typeDef;