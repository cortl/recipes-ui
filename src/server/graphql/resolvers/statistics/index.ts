import * as RecipesRepository from "../../../repository/recipes";
import type { Recipe } from "../../../../types/recipe";
import {
  getAllPossibleTags,
  reduceRecipesByYear,
} from "../../../utils/recipe-utils";
import type {
  MonthlyBreakdown,
  YearStatistic,
} from "../../../../types/statistics";

import { getRecipeTagDistributionResolver } from "./recipe-distribution-by-tags";

type StatisticsResolverContext = {
  recipes: Recipe[];
  recipesByYear: Record<number, Recipe[]>;
};

type StatisticsResolver<T> = (
  parent: StatisticsResolverContext,
) => Promise<T> | T;

const allStatisticsResolver = async (): Promise<StatisticsResolverContext> => {
  const recipes = await RecipesRepository.getRecipes();
  const recipesByYear = reduceRecipesByYear(recipes);

  return {
    recipes,
    recipesByYear,
  };
};

const totalRecipesCountResolver: StatisticsResolver<number> = (parent) =>
  parent.recipes.length;

const averageRatingResolver: StatisticsResolver<number | null> = (parent) => {
  const totalRatings = parent.recipes.reduce(
    (acc, recipe) => acc + recipe.rating,
    0,
  );

  if (totalRatings === 0) return null;

  return Number((totalRatings / parent.recipes.length).toFixed(2));
};

const topRatingsResolver: StatisticsResolver<number> = (parent) => {
  const topRatings = parent.recipes.filter((recipe) => recipe.rating === 10);

  return topRatings.length;
};

const favoriteTagResolver: StatisticsResolver<string> = ({ recipes }) => {
  const tags = getAllPossibleTags(recipes);

  const [topTag] = tags
    .map((tag) => {
      const count = recipes.filter((recipe) =>
        recipe.tags.includes(tag),
      ).length;

      return {
        count,
        tag,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 1);

  return topTag.tag;
};

const topRecipesResolver: StatisticsResolver<Recipe[]> = (parent) => {
  const { recipes } = parent;

  return recipes.sort((a, b) => b.rating - a.rating).slice(0, 3);
};

type YearsResolverResponse = Pick<YearStatistic, "title">;

const yearsResolver: StatisticsResolver<YearsResolverResponse[]> = (parent) => {
  const { recipesByYear } = parent;
  const years = Object.keys(recipesByYear)
    .map((year) => Number(year))
    .sort((a, b) => b - a);

  return years.map((year) => {
    const recipes = recipesByYear[year];

    return { recipes, title: String(year) };
  });
};

type Month = {
  title: string;
  recipes: Recipe[];
};

const allMonthlyBreakdownResolver: StatisticsResolver<Month[]> = ({
  recipes,
}) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthsByIndex = monthNames.reduce<
    Record<number, { title: string; recipes: Recipe[] }>
  >((acc, month, index) => {
    // eslint-disable-next-line no-param-reassign
    acc[index] = {
      recipes: [],
      title: month,
    };

    return acc;
  }, {});

  recipes.forEach((recipe) => {
    const date = new Date(recipe.createdDate);
    const month = date.getMonth();

    monthsByIndex[month].recipes.push(recipe);
  });

  const months: Month[] = monthNames.map((month, index) => ({
    recipes: monthsByIndex[index].recipes,
    title: month,
  }));

  return months;
};

const monthlyBreakdownResolver = {
  averageRating: averageRatingResolver,
  totalRecipesMade: totalRecipesCountResolver,
};

const yearStatisticResolver = {
  averageRating: averageRatingResolver,
  favoriteTag: favoriteTagResolver,
  monthlyBreakdown: allMonthlyBreakdownResolver,
  numberOfTopRatings: topRatingsResolver,
  tagDistribution: getRecipeTagDistributionResolver,
  topRecipes: topRecipesResolver,
  totalRecipesMade: totalRecipesCountResolver,
};

const statisticsResolver = {
  averageRating: averageRatingResolver,
  favoriteTag: favoriteTagResolver,
  numberOfTopRatings: topRatingsResolver,
  totalRecipesMade: totalRecipesCountResolver,
  years: yearsResolver,
};

export type { StatisticsResolver };

export {
  allStatisticsResolver,
  statisticsResolver,
  yearStatisticResolver,
  monthlyBreakdownResolver,
};
