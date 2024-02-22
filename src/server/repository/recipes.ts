import { Storage } from "@google-cloud/storage";

import type { Recipe } from "../../types/recipe";

const RECIPE_BUCKET = "cortl-recipes-json";

const storage = new Storage();

let cachedRecipes: Recipe[] | null = null;
let lastFetchTime: Date | null = null;

const getRecipe = async (slug: string): Promise<Recipe | null> => {
  const file = storage.bucket(RECIPE_BUCKET).file(`${slug}.json`);

  try {
    const [content] = await file.download();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const recipe: Recipe = JSON.parse(content.toString());

    return recipe;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching recipe:", error);

    return null; // Or handle the error as you prefer
  }
};

const getRecipes = async (): Promise<Recipe[]> => {
  const oneHourAgo = new Date();

  oneHourAgo.setHours(oneHourAgo.getHours() - 1);

  if (cachedRecipes && lastFetchTime && lastFetchTime > oneHourAgo) {
    // eslint-disable-next-line no-console
    console.log("Returning cached recipes");

    return cachedRecipes;
  }

  try {
    // eslint-disable-next-line no-console
    console.log("Fetching new recipes");

    const file = storage.bucket(RECIPE_BUCKET).file(`index.json`);
    const [content] = await file.download();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const recipes: Recipe[] = JSON.parse(content.toString());

    cachedRecipes = recipes;
    lastFetchTime = new Date();

    return recipes;
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error("Error fetching recipes:", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Unable to fetch all recipes");
  }
};

export { getRecipe, getRecipes };
