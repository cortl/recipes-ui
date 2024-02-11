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
import {
  holidaysResolver,
  mealTypesResolver,
  methodsResolver,
  proteinsResolver,
} from "./tags";

const resolvers = {
  MonthlyBreakdown: monthlyBreakdownResolver,

  Query: {
    recipe: recipeResolver,
    recipes: recipesResolver,
    statistics: allStatisticsResolver,
  },

  Recipe: {
    archived: archivedResolver,
    holidays: holidaysResolver,
    image: imageResolver,
    mealTypes: mealTypesResolver,
    methods: methodsResolver,
    proteins: proteinsResolver,
    relatedRecipes: relatedRecipesResolver,
  },

  Statistics: statisticsResolver,

  YearStatistic: yearStatisticResolver,
};

export { resolvers };
