/* eslint-disable unicorn/no-unused-properties */
import { HOLIDAYS, MEAL_TYPES, METHODS, PROTEINS } from "../constants/tags";

enum RecipeTagType {
  PROTEIN_TYPE = "protein",
  MEAL_TYPE = "mealtype",
  METHOD_TYPE = "method",
  HOLIDAY_TYPE = "holiday",
}

const MAPPING = {
  [RecipeTagType.PROTEIN_TYPE]: {
    color: "red",
    contains: PROTEINS,
    key: "protein",
  },
  [RecipeTagType.MEAL_TYPE]: {
    color: "teal",
    contains: MEAL_TYPES,
    key: "mealtype",
  },
  [RecipeTagType.METHOD_TYPE]: {
    color: "purple",
    contains: METHODS,
    key: "method",
  },
  [RecipeTagType.HOLIDAY_TYPE]: {
    color: "yellow",
    contains: HOLIDAYS,
    key: "holiday",
  },
};

type Color = "purple" | "red" | "teal" | "yellow";

const getRecipeTagTypeForTag = (tag: string): RecipeTagType | null => {
  if (HOLIDAYS.includes(tag)) return RecipeTagType.HOLIDAY_TYPE;

  if (METHODS.includes(tag)) return RecipeTagType.METHOD_TYPE;

  if (PROTEINS.includes(tag)) return RecipeTagType.PROTEIN_TYPE;

  if (MEAL_TYPES.includes(tag)) return RecipeTagType.MEAL_TYPE;

  return null
};

const getColorForTagType = (tagType: RecipeTagType): Color => {
  const { color } = MAPPING[tagType];

  if (!color) {
    throw new Error(`No color defined for ${tagType}`);
  }

  return color as unknown as Color;
};

export { getRecipeTagTypeForTag, getColorForTagType };
/* eslint-enable unicorn/no-unused-properties */