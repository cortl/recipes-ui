import { GraphQLError } from "graphql";
import Fuse from "fuse.js";

import * as RecipeRepository from "../../repository/recipes";
import type {
  RecipeInput,
  RecipesWhereInput,
} from "../../../types/resolvers";
import { filterBoolean, filterArray, filterNumber } from "../../utils/filters";
import { sortByField } from "../../utils/sort";
import type { Recipe } from "../../../types/recipe";

const archivedResolver = ({ archived }: Recipe): boolean => Boolean(archived);

const recipesResolver = async (
  _root: undefined,
  args?: RecipesWhereInput,
): Promise<Recipe[]> => {
  const recipes = await RecipeRepository.getRecipes();

  if (!args) {
    return recipes;
  }

  let results = recipes;

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

const recipeResolver = async (
  _root: undefined,
  args: RecipeInput,
): Promise<Recipe> => {
  const recipe = await RecipeRepository.getRecipe(args.slug);

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

const relatedRecipesResolver = async ({
  related,
}: Recipe): Promise<Recipe[]> => {
  if (!related) {
    return [];
  }

  if (related.length === 0) {
    return [];
  }

  const relatedRecipes = await Promise.all(
    related.map(async (slug) => RecipeRepository.getRecipe(slug)),
  );

  return relatedRecipes.filter(Boolean) as Recipe[];
};

export {
  archivedResolver,
  recipeResolver,
  imageResolver,
  recipesResolver,
  relatedRecipesResolver,
};
