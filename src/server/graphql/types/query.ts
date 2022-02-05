const typeDef = `
 input RecipesWhere {
    rating: NumberFilter
    image: BooleanFilter
    archived: BooleanFilter
    tags: ArrayFilter
  }

  type Query {
    recipes(where: RecipesWhere, sort: Sort): [Recipe]
    recipe(slug: String!): Recipe
  }
`

export default typeDef;