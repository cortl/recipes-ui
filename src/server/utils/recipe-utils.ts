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

export { getAllPossibleTags };
