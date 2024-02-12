import type { TagDistribution } from "../../../../types/statistics";
import { getAllPossibleTags } from "../../../utils/recipe-utils";
import type { Recipe } from "../../../../types/recipe";
import { tagTypeFilter } from "../tags";
import {
  HOLIDAYS,
  MEAL_TYPES,
  PROTEINS,
  METHODS,
} from "../../../../constants/tags";

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

const getTagTypesFromRecipes = (
  tagsList: string[],
  recipes: Recipe[],
): string[] => {
  const tags = recipes.reduce<string[]>((acc, recipe) => {
    const tagTypeTags = tagTypeFilter(tagsList)(recipe);

    tagTypeTags.forEach((tag) => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });

    return acc;
  }, []);

  return tags;
};

const proteinDistribtionResolver: StatisticsResolver<TagDistribution[]> = (
  parent,
) => {
  const { recipes } = parent;
  const proteinTags = getTagTypesFromRecipes(PROTEINS, recipes);

  const proteinDistribtion = reduceRecipesToDistribution(
    proteinTags,
    recipes,
  ).sort((a, b) => b.count - a.count);

  return proteinDistribtion;
};

const mealTypeDistribtionResolver: StatisticsResolver<TagDistribution[]> = (
  parent,
) => {
  const { recipes } = parent;
  const mealTypeTags = getTagTypesFromRecipes(MEAL_TYPES, recipes);

  const mealTypeDistribtion = reduceRecipesToDistribution(
    mealTypeTags,
    recipes,
  ).sort((a, b) => b.count - a.count);

  return mealTypeDistribtion;
};

const holidayDistribtionResolver: StatisticsResolver<TagDistribution[]> = (
  parent,
) => {
  const { recipes } = parent;
  const holidayTags = getTagTypesFromRecipes(HOLIDAYS, recipes);

  const holidayDistribtion = reduceRecipesToDistribution(
    holidayTags,
    recipes,
  ).sort((a, b) => b.count - a.count);

  return holidayDistribtion;
};

const methodsDistribtionResolver: StatisticsResolver<TagDistribution[]> = (
  parent,
) => {
  const { recipes } = parent;
  const methodsTags = getTagTypesFromRecipes(METHODS, recipes);

  const methodsDistribtion = reduceRecipesToDistribution(
    methodsTags,
    recipes,
  ).sort((a, b) => b.count - a.count);

  return methodsDistribtion;
};

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

export {
  getRecipeTagDistributionResolver,
  mealTypeDistribtionResolver,
  methodsDistribtionResolver,
  proteinDistribtionResolver,
  holidayDistribtionResolver,
};
