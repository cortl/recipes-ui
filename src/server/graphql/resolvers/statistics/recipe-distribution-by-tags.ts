import type { RecipeDistributionByTags } from "../../../../types/statistics";
import { getAllPossibleTags } from "../../../utils/recipe-utils";

import type { StatisticsResolver } from ".";

const getRecipeDistributionByTagsResolver: StatisticsResolver<
  RecipeDistributionByTags
> = (parent) => {
  const { recipes } = parent;

  const tags = getAllPossibleTags(recipes);

  const distributions = tags
    .map((tag) => {
      const count = recipes.filter((recipe) =>
        recipe.tags.includes(tag),
      ).length;

      return {
        count,
        tag,
      };
    })
    .sort((a, b) => b.count - a.count);

  const topFive = distributions.slice(0, 5);
  const other = distributions.slice(5);
  const otherDistribution = other.reduce(
    (acc, distribution) => {
      // eslint-disable-next-line no-param-reassign
      acc.count += distribution.count;

      return acc;
    },
    { count: 0, tag: "Other" },
  );

  return [...topFive, otherDistribution];
};

export { getRecipeDistributionByTagsResolver };
