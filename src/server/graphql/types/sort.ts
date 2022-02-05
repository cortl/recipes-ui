const typeDef = `
  enum SortDirection {
    ASC
    DESC
  }

  input Sort {
    field: String!
    direction: SortDirection!
  }
`

export default typeDef