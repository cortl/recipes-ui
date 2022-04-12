import Recipes from "@cortl/recipes";
import { UserInputError } from "apollo-server-micro";
import Fuse from "fuse.js";

import type {
  ArrayFilter,
  BooleanFilter,
  NumberFilter,
  RecipeInput,
  RecipesWhereInput,
} from "../../../../types/resolvers";
import {
  getKeyValue,
  filterBoolean,
  filterArray,
  filterNumber,
} from "../../utils/filters";
import { sortByField } from "../../utils/sort";

const archivedResolver = ({ archived }: Recipe): boolean => Boolean(archived);

const recipesResolver = (
  _root: undefined,
  args?: RecipesWhereInput
): Recipe[] => {
  if (!args) {
    return Recipes.asArray;
  }

  let results = Recipes.asArray;

  if (args.where) {
    results = results.filter((recipe) => {
      const result = Object.entries(args.where).reduce(
        (keep, [filterKey, filterValue]) => {
          if (!keep) {
            return keep;
          }

          if (!filterValue) {
            return keep;
          }

          const recipeField = getKeyValue<keyof Recipe, Recipe>(
            filterKey,
            recipe
          );
          let recipeMatchesCriteria = true;

          if (typeof recipeField === "boolean" || recipeField === null) {
            recipeMatchesCriteria = filterBoolean(
              recipeField,
              filterValue as BooleanFilter
            );
          }

          if (Array.isArray(recipeField)) {
            recipeMatchesCriteria =
              recipeMatchesCriteria &&
              filterArray(recipeField, filterValue as ArrayFilter);
          }

          if (typeof recipeField === "number") {
            recipeMatchesCriteria =
              recipeMatchesCriteria &&
              filterNumber(recipeField, filterValue as NumberFilter);
          }

          return recipeMatchesCriteria;
        },
        true
      );

      return result;
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
    (recipeToFilter) => recipeToFilter.slug === args.slug
  );

  if (!recipe) {
    throw new UserInputError(`args not found.`);
  }

  return recipe;
};

const imageResolver = ({ image }: Recipe): string | null => {
  if (image) return `/api/recipes/images/${image}`;

  return null;
};

export { archivedResolver, recipeResolver, imageResolver, recipesResolver };
