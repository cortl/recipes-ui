import {
  HOLIDAYS,
  MEAL_TYPES,
  METHODS,
  PROTEINS,
} from "../../../constants/tags";
import type { Recipe } from "../../../types/recipe";

type TagResolver<T> = (parent: Recipe) => T;

type TagTypeFilter = (typeList: string[]) => TagResolver<string[]>;

// TODO: move elsewhere
const tagTypeFilter: TagTypeFilter = (typeList) => (recipe) => {
  const { tags } = recipe;

  return tags.filter((tag) => typeList.includes(tag));
};

const methodsResolver = tagTypeFilter(METHODS);
const holidaysResolver = tagTypeFilter(HOLIDAYS);
const proteinsResolver = tagTypeFilter(PROTEINS);
const mealTypesResolver = tagTypeFilter(MEAL_TYPES);

export {
  tagTypeFilter,
  methodsResolver,
  holidaysResolver,
  proteinsResolver,
  mealTypesResolver,
};
