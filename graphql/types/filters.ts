const typeDef = `
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
`

export default typeDef;