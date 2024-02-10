import {
  archivedResolver,
  imageResolver,
  recipeResolver,
  recipesResolver,
  relatedRecipesResolver,
} from "./recipe";
import {
  statisticsResolver,
  allStatisticsResolver,
  yearStatisticResolver,
  monthlyBreakdownResolver,
} from "./statistics";

const resolvers = {
  MonthlyBreakdown: monthlyBreakdownResolver,

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

  YearStatistic: yearStatisticResolver,
};

export { resolvers };
