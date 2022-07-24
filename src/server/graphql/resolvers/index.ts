import {
  archivedResolver,
  imageResolver,
  recipeResolver,
  recipesResolver,
} from "./recipe";

const resolvers = {
  Query: {
    recipe: recipeResolver,
    recipes: recipesResolver,
  },

  Recipe: {
    archived: archivedResolver,
    image: imageResolver,
  },
};

export { resolvers };
