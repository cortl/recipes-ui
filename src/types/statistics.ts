import type { Recipe } from "./recipe";

type Year = {
  title: string;
  totalRecipesMade: number;
  averageRating: number;
  numberOfTopRatings: number;
  topRecipes: Recipe[];
};

export type { Year };
