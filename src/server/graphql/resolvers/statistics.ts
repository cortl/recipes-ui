import * as RecipeRepository from "../../repository/recipes";
import type { Recipe } from "../../../types/recipe";
import type { Year } from "../../../types/statistics";

const byRating = (recipeA: Recipe, recipeB: Recipe): number =>
  recipeB.rating > recipeA.rating
    ? 1
    : recipeA.rating > recipeB.rating
      ? -1
      : 0;

const calculateAverageFromField = <T extends Object>(
  objects: T[],
  field: string,
): number =>
  Math.round(
    (objects.reduce((total, obj) => {
      const value = obj[field as keyof T];

      if (typeof value === "number") return total + value;

      return total;
    }, 0) /
      objects.length) *
      100,
  ) / 100;

const mapRecipesToYear = (recipes: Recipe[]): Record<number, Recipe[]> =>
  recipes
    .filter((recipe) => recipe.createdDate)
    .reduce<Record<number, Recipe[]>>((years, recipe) => {
      const year = new Date(recipe.createdDate).getFullYear();

      if (year in years) {
        years[year].push(recipe);
      } else {
        // eslint-disable-next-line no-param-reassign
        years[year] = [recipe];
      }

      return years;
    }, {});

type StatisticsQuery = {
  years: Year[];
};

const statisticsResolver = async (): Promise<StatisticsQuery> => {
  const recipes = await RecipeRepository.getRecipes();
  const recipesByYear = mapRecipesToYear(recipes);

  const years = Object.keys(recipesByYear)
    .sort()
    .reverse()
    .map((year) => {
      const recipesInYear = recipesByYear[Number.parseInt(year)];

      const yearMapped: Year = {
        averageRating: calculateAverageFromField<Recipe>(
          recipesInYear,
          "rating",
        ),
        numberOfTopRatings: recipesInYear.filter(
          (recipe) => recipe.rating === 10,
        ).length,
        title: year,
        topRecipes: recipesInYear.sort(byRating).slice(0, 3),
        totalRecipesMade: recipesInYear.length,
      };

      return yearMapped;
    });

  const response: StatisticsQuery = {
    years,
  };

  return response;
};

export { statisticsResolver };
