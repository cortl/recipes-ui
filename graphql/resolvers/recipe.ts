import recipes from '@cortl/recipes';
import { UserInputError } from 'apollo-server-micro';

import { ArrayFilter, BooleanFilter, RecipeInput, RecipesWhereInput } from '../../types/resolvers';
import { getKeyValue, filterBoolean, filterArray } from './utils/filters';

const archivedResolver = ({ archived }: Recipe) => {
    return Boolean(archived);
}

const recipesResolver = (_root: undefined, args: RecipesWhereInput) => {
    if (!args) {
        return recipes;
    }

    if (args.where) {
        return recipes.slice(0, 50).filter(recipe => {
            const result = Object.entries(args.where).reduce((keep, [filterKey, filterValue]) => {
                if (!filterValue) {
                    return keep;
                }

                const recipeField = getKeyValue<keyof Recipe, Recipe>(filterKey, recipe)

                if (typeof recipeField === 'boolean' || recipeField == null) {
                    return keep && filterBoolean(recipeField, filterValue as BooleanFilter)
                }

                if (recipeField instanceof Array) {
                    return keep && filterArray(recipeField, filterValue as ArrayFilter)
                }

                return keep;
            }, true);

            return result;
        })
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