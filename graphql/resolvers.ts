import recipes from '@cortl/recipes';

const resolvers = {
    Query: {
        getRecipes: () => recipes
    }
}

export { resolvers }
