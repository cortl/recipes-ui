import type { Recipe } from "../../types/recipe";

const getAllPossibleTags = (recipes: Recipe[]): string[] => {
  const tags = recipes.reduce<string[]>((acc, recipe) => {
    recipe.tags.forEach((tag) => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });

    return acc;
  }, []);

  return tags;
};

const reduceRecipesByYear = (recipes: Recipe[]): Record<number, Recipe[]> =>
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

export { getAllPossibleTags, reduceRecipesByYear };
