import recipes from '@cortl/recipes';

import { archivedResolver } from './recipe';

const resolvers = {
    Query: {
        recipes: () => recipes
    },

    Recipe: {
        archived: archivedResolver
    }
}

export { resolvers }
