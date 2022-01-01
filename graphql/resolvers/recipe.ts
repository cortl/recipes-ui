import recipes from '@cortl/recipes';
import { UserInputError } from 'apollo-server-micro';

import { RecipeInput, RecipesWhereInput } from '../../types/resolvers';

const archivedResolver = ({ archived }: Recipe) => {
    return Boolean(archived);
}

const recipesResolver = (_root: undefined, args: RecipesWhereInput) => {
    if (!args) {
        return recipes;
    }

    return recipes
}

const recipeResolver = (_root: undefined, args: RecipeInput) => {
    const recipe = recipes.find(recipe => recipe.slug === args.slug)

    if (!recipe) {
        throw new UserInputError(`${args} not found.`)
    }

    return recipe;
}

export { archivedResolver, recipeResolver, recipesResolver }