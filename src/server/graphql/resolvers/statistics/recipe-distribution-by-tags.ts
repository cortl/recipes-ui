import type { TagDistribution } from "../../../../types/statistics";
import { getAllPossibleTags } from "../../../utils/recipe-utils";
import type { Recipe } from "../../../../types/recipe";

import type { StatisticsResolver } from ".";

const reduceRecipesToDistribution = (
  tags: string[],
  recipes: Recipe[],
): { tag: string; count: number }[] =>
  tags.map((tag) => {
    const count = recipes.filter((recipe) => recipe.tags.includes(tag)).length;

    return {
      count,
      tag,
    };
  });

const getRecipeTagDistributionResolver: StatisticsResolver<
  TagDistribution[]
> = (parent) => {
  const { recipes } = parent;

  const tags = getAllPossibleTags(recipes);

  const distributionsFromAllRecipes = reduceRecipesToDistribution(
    tags,
    recipes,
  ).sort((a, b) => b.count - a.count);

  const topFiveTagDistributions = distributionsFromAllRecipes.slice(0, 5);

  return topFiveTagDistributions;
};

export { getRecipeTagDistributionResolver };
