const data = [
    { title: 'Mashed Potatoes' }
]

const resolvers = {
    Query: {
        getRecipes: () => data
    }
}

export { resolvers }
