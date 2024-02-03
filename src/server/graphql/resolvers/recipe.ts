import Recipes from "@cortl/recipes";
import { GraphQLError } from "graphql";
import Fuse from "fuse.js";

import type {
  RecipeInput,
  RecipesWhereInput,
} from "../../../../types/resolvers";
import { filterBoolean, filterArray, filterNumber } from "../../utils/filters";
import { sortByField } from "../../utils/sort";

const archivedResolver = ({ archived }: Recipe): boolean => Boolean(archived);

const recipesResolver = (
  _root: undefined,
  args?: RecipesWhereInput,
): Recipe[] => {
  if (!args) {
    return Recipes.asArray;
  }

  let results = Recipes.asArray;

  if (args.where) {
    const { where } = args;

    results = results.filter((recipe) => {
      let keep = true;

      if (where.archived) {
        const filter = where.archived;
        const result = filterBoolean(recipe.archived, filter);

        keep = result;
      }

      if (where.rating) {
        const filter = where.rating;
        const result = filterNumber(recipe.rating, filter);

        keep = keep && result;
      }

      if (where.tags) {
        const filter = where.tags;
        const result = filterArray(recipe.tags, filter);

        keep = keep && result;
      }

      return keep;
    });
  }

  if (args.where?.title?.like) {
    const fuse = new Fuse(results, {
      keys: ["title"],
    });

    results = fuse.search(args.where.title.like).map(({ item }) => item);
  } else if (args.sort) {
    results.sort(sortByField(args.sort.field, args.sort.direction));
  }

  const { offset, limit } = args;

  return results.slice(offset, offset + limit);
};

const recipeResolver = (_root: undefined, args: RecipeInput): Recipe => {
  const recipe = Recipes.asArray.find(
    (recipeToFilter) => recipeToFilter.slug === args.slug,
  );

  if (!recipe) {
    throw new GraphQLError(`args not found.`);
  }

  return recipe;
};

const imageResolver = ({ image }: Recipe): string | null => {
  if (image)
    return `https://storage.googleapis.com/cortl-recipe-images/${image}`;

  return null;
};

export { archivedResolver, recipeResolver, imageResolver, recipesResolver };
