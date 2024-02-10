import {
  archivedResolver,
  imageResolver,
  recipeResolver,
  recipesResolver,
  relatedRecipesResolver,
} from "./recipe";
import { statisticsResolver, allStatisticsResolver } from "./statistics";

const resolvers = {
  Query: {
    recipe: recipeResolver,
    recipes: recipesResolver,
    statistics: allStatisticsResolver,
  },

  Recipe: {
    archived: archivedResolver,
    image: imageResolver,
    relatedRecipes: relatedRecipesResolver,
  },

  Statistics: statisticsResolver,
};

export { resolvers };
