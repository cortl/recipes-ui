import { archivedResolver, recipeResolver, recipesResolver } from './recipe';

const resolvers = {
    Query: {
        recipes: recipesResolver,
        recipe: recipeResolver
    },

    Recipe: {
        archived: archivedResolver
    }
}

export { resolvers }
