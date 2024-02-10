import type { SourceDistributions } from "../../../../types/statistics";
import type { Recipe } from "../../../../types/recipe";

import type { StatisticsResolver } from ".";

const getAllPossibleSources = (recipes: Recipe[]): string[] => {
  const sources = recipes.reduce<string[]>((acc, recipe) => {
    if (!acc.includes(recipe.source.name)) {
      acc.push(recipe.source.name);
    }

    return acc;
  }, []);

  return sources;
};

const sourceDistributionResolver: StatisticsResolver<SourceDistributions> = (
  parent,
) => {
  const { recipes } = parent;
  const sources = getAllPossibleSources(recipes);

  const distributions = sources.map((source) => {
    const count = recipes.filter(
      (recipe) => recipe.source.name === source,
    ).length;

    return {
      count,
      source,
    };
  });

  return distributions;
};

export { sourceDistributionResolver };
