import {
  archivedResolver,
  imageResolver,
  recipeResolver,
  recipesResolver,
} from "./recipe";

const resolvers = {
  Query: {
    recipes: recipesResolver,
    recipe: recipeResolver,
  },

  Recipe: {
    archived: archivedResolver,
    image: imageResolver,
  },
};

export { resolvers };
