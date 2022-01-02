import recipes from '@cortl/recipes';
import { UserInputError } from 'apollo-server-micro';

import { ArrayFilter, BooleanFilter, NumberFilter, RecipeInput, RecipesWhereInput } from '../../types/resolvers';
import { getKeyValue, filterBoolean, filterArray, filterNumber } from './utils/filters';

const archivedResolver = ({ archived }: Recipe) => {
    return Boolean(archived);
}

const recipesResolver = (_root: undefined, args: RecipesWhereInput) => {
    if (!args) {
        return recipes;
    }

    if (args.where) {
        return recipes.filter(recipe => {
            const result = Object.entries(args.where).reduce((keep, [filterKey, filterValue]) => {
                if (!keep) {
                    return keep;
                }

                if (!filterValue) {
                    return keep;
                }

                const recipeField = getKeyValue<keyof Recipe, Recipe>(filterKey, recipe)
                let recipeMatchesCriteria = true;

                if (typeof recipeField === 'boolean' || recipeField == null) {
                    recipeMatchesCriteria = recipeMatchesCriteria && filterBoolean(recipeField, filterValue as BooleanFilter)
                }

                if (recipeField instanceof Array) {
                    recipeMatchesCriteria = recipeMatchesCriteria && filterArray(recipeField, filterValue as ArrayFilter)
                }

                if (typeof recipeField === 'number') {
                    recipeMatchesCriteria = recipeMatchesCriteria && filterNumber(recipeField, filterValue as NumberFilter)
                }

                return recipeMatchesCriteria;
            }, true);

            console.groupEnd();

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