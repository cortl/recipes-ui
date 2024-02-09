/* eslint-disable no-console */
import { Storage } from "@google-cloud/storage";
import { Firestore } from "@google-cloud/firestore";

import type { Recipe } from "../../types/recipe";
import { timeFunction } from "../utils/timing";

const RECIPE_BUCKET = "cortl-recipes-json";

const storage = new Storage();
const firestore = new Firestore();

const getRecipeFromStorage = async (slug: string): Promise<Recipe | null> => {
  const file = storage.bucket(RECIPE_BUCKET).file(`${slug}.json`);

  try {
    const [content] = await file.download();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const recipe: Recipe = JSON.parse(content.toString());

    return recipe;
  } catch (error) {
    console.error("Error fetching recipe from bucket:", error);

    return null;
  }
};

const getRecipeFromFirestore = async (slug: string): Promise<Recipe | null> => {
  const doc = firestore.collection("recipes").doc(slug);

  try {
    const snapshot = await doc.get();

    if (!snapshot.exists) {
      console.log(`Recipe ${slug} not found in Firestore`);

      return null;
    }

    const recipe = snapshot.data() as Recipe;

    return recipe;
  } catch (error) {
    console.error("Error fetching recipe from Firestore:", error);

    return null;
  }
};

const getRecipe = async (slug: string): Promise<Recipe | null> => {
  const [recipe] = await Promise.all([
    timeFunction("(Recipe) Firestore", async () =>
      getRecipeFromFirestore(slug),
    ),
    timeFunction("(Recipe) Storage", async () => getRecipeFromStorage(slug)),
  ]);

  return recipe;
};

const getRecipesFromStorage = async (): Promise<Recipe[]> => {
  const bucket = storage.bucket(RECIPE_BUCKET);

  try {
    const [files] = await bucket.getFiles();

    const jsonFiles = files.filter((file) => file.name.endsWith(".json"));

    const recipes = await Promise.all(
      jsonFiles.map(async (file) => {
        const [content] = await file.download();

        return JSON.parse(content.toString()) as Recipe;
      }),
    );

    return recipes;
  } catch (error) {
    console.error("Error fetching recipes from bucket:", error);

    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw error;
  }
};

const getRecipesFromFirestore = async (): Promise<Recipe[]> => {
  const collection = firestore.collection("recipes");

  try {
    const snapshot = await collection.get();

    const recipes = snapshot.docs.map((doc) => doc.data() as Recipe);

    return recipes;
  } catch (error) {
    console.error("Error fetching recipes from Firestore:", error);

    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw error;
  }
};

const getRecipes = async (): Promise<Recipe[]> => {
  const [recipes] = await Promise.all([
    timeFunction("(Recipes) Firestore", async () => getRecipesFromFirestore()),
    timeFunction("(Recipes) Storage", async () => getRecipesFromStorage()),
  ]);

  return recipes;
};

export { getRecipe, getRecipes };
/* eslint-enable no-console */
