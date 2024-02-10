import type { AverageRatingByTags } from "../../../../types/statistics";
import { getAllPossibleTags } from "../../../utils/recipe-utils";

import type { StatisticsResolver } from ".";

const averageRatingByTagsResolver: StatisticsResolver<AverageRatingByTags> = (
  parent,
) => {
  const { recipes } = parent;

  const tags = getAllPossibleTags(recipes);

  const ratings = tags.map((tag) => {
    const count = recipes.filter((recipe) => recipe.tags.includes(tag)).length;

    const totalRating = recipes
      .filter((recipe) => recipe.tags.includes(tag))
      .reduce((acc, recipe) => acc + recipe.rating, 0);

    return {
      averageRating: totalRating / count,
      count,
      tag,
    };
  });

  return ratings;
};

export { averageRatingByTagsResolver };
