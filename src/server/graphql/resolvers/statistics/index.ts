import * as RecipesRepository from "../../../repository/recipes";
import type { Recipe } from "../../../../types/recipe";

import { yearsResolver } from "./years";
import { getRecipeDistributionByTagsResolver } from "./recipe-distribution-by-tags";
import { averageRatingByTagsResolver } from "./average-rating-by-tags";
import { sourceDistributionResolver } from "./source-distribution";

type StatisticsResolverContext = {
  recipes: Recipe[];
};

type StatisticsResolver<T> = (
  parent: StatisticsResolverContext,
) => Promise<T> | T;

const allStatisticsResolver = async (): Promise<StatisticsResolverContext> => {
  const recipes = await RecipesRepository.getRecipes();

  return {
    recipes,
  };
};

const totalRecipesCountResolver: StatisticsResolver<number> = (parent) =>
  parent.recipes.length;

const statisticsResolver = {
  averageRatingByTags: averageRatingByTagsResolver,
  recipeDistributionByTags: getRecipeDistributionByTagsResolver,
  sourceDistribution: sourceDistributionResolver,
  totalRecipesCount: totalRecipesCountResolver,
  years: yearsResolver,
};

export type { StatisticsResolver };

export { allStatisticsResolver, statisticsResolver };
