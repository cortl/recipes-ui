import {
  archivedResolver,
  imageResolver,
  recipeResolver,
  recipesResolver,
  relatedRecipesResolver,
} from "./recipe";
import { statisticsResolver } from "./statistics";

const resolvers = {
  Query: {
    recipe: recipeResolver,
    recipes: recipesResolver,
    statistics: statisticsResolver,
  },

  Recipe: {
    archived: archivedResolver,
    image: imageResolver,
    relatedRecipes: relatedRecipesResolver,
  },
};

export { resolvers };
