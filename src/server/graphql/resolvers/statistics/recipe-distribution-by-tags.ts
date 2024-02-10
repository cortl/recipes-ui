import type {
  RecipeTagDistributionByYears,
  TagDistributionYear,
} from "../../../../types/statistics";
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

const getRecipeDistributionByTagsResolver: StatisticsResolver<
  RecipeTagDistributionByYears
> = (parent) => {
  const { recipes, recipesByYear } = parent;

  const tags = getAllPossibleTags(recipes);

  const distributionsFromAllTime = reduceRecipesToDistribution(
    tags,
    recipes,
  ).sort((a, b) => b.count - a.count);

  const topFiveTagDistributions = distributionsFromAllTime
    .slice(0, 5)
    .map((distribution) => distribution.tag);

  const years: TagDistributionYear[] = Object.keys(recipesByYear).map(
    (year) => {
      const recipesInYear = recipesByYear[Number.parseInt(year)];

      const distributions = reduceRecipesToDistribution(
        topFiveTagDistributions,
        recipesInYear,
      );

      const totalForYear = distributions.reduce(
        (acc, distribution) => acc + distribution.count,
        0,
      );

      const distributionsWithPercent = distributions.map((distribution) => ({
        ...distribution,
        percentOfTotal: Math.round((distribution.count / totalForYear) * 100),
      }));

      return { distributions: distributionsWithPercent, year };
    },
  );

  return { tags: topFiveTagDistributions, years };
};

export { getRecipeDistributionByTagsResolver };
