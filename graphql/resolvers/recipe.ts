import recipes from '@cortl/recipes';
import { UserInputError } from 'apollo-server-micro';

import { RecipeInput, RecipesWhereInput } from '../../types/resolvers';
import { hasField } from './utils/filters';

const archivedResolver = ({ archived }: Recipe) => {
    return Boolean(archived);
}

const getFieldForQuery = (queryField: string): any => {
    const fields = {
        hasImage: 'image'
    }

    return (fields as any)[queryField] ?? queryField;
}

const recipesResolver = (_root: undefined, args: RecipesWhereInput) => {
    if (!args) {
        return recipes;
    }

    if (args.where) {
        return recipes.filter(recipe => {
            const result = Object.entries(args.where).reduce((keep, [filterKey, filterValue]) => {
                const keyToFilter = getFieldForQuery(filterKey);

                if (typeof filterValue === "boolean") {
                    return keep && hasField(keyToFilter, filterValue)(recipe);
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