import {
  HOLIDAYS,
  MEAL_TYPES,
  METHODS,
  PROTEINS,
} from "../../../constants/tags";
import type { Recipe } from "../../../types/recipe";

type TagResolver<T> = (parent: Recipe) => T;

type TagsResolver = (typeList: string[]) => TagResolver<string[]>;

const tagsResolver: TagsResolver = (typeList) => (parent) => {
  const { tags } = parent;

  return tags.filter((tag) => typeList.includes(tag));
};

const methodsResolver = tagsResolver(METHODS);
const holidaysResolver = tagsResolver(HOLIDAYS);
const proteinsResolver = tagsResolver(PROTEINS);
const mealTypesResolver = tagsResolver(MEAL_TYPES);

export {
  methodsResolver,
  holidaysResolver,
  proteinsResolver,
  mealTypesResolver,
};
