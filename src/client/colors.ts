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
    colorHex: "#E53E3E",
    key: "protein",
  },
  [RecipeTagType.MEAL_TYPE]: {
    color: "teal",
    colorHex: "#38B2AC",
    key: "mealtype",
  },
  [RecipeTagType.METHOD_TYPE]: {
    color: "purple",
    colorHex: "#9F7AEA",
    key: "method",
  },
  [RecipeTagType.HOLIDAY_TYPE]: {
    color: "yellow",
    colorHex: "F6E05E",
    key: "holiday",
  },
};

type Color = "purple" | "red" | "teal" | "yellow";

const getRecipeTagTypeForTag = (tag: string): RecipeTagType | null => {
  if (HOLIDAYS.includes(tag)) return RecipeTagType.HOLIDAY_TYPE;

  if (METHODS.includes(tag)) return RecipeTagType.METHOD_TYPE;

  if (PROTEINS.includes(tag)) return RecipeTagType.PROTEIN_TYPE;

  if (MEAL_TYPES.includes(tag)) return RecipeTagType.MEAL_TYPE;

  return null;
};

const getColorForTagType = (tagType: RecipeTagType): string => {
  const { colorHex } = MAPPING[tagType];

  if (!colorHex) {
    throw new Error(`No color defined for ${tagType}`);
  }

  return colorHex;
};

type UseTagTypeForColorMappingReturn = {
  key: string;
  color: Color;
};

type UseTagTypeColorMappingFn = (
  tagType: RecipeTagType,
) => UseTagTypeForColorMappingReturn;

const useTagTypeColorMapping: UseTagTypeColorMappingFn = (tagType) => {
  const { key, color } = MAPPING[tagType];

  return { color: color as unknown as Color, key };
};

export {
  RecipeTagType,
  getRecipeTagTypeForTag,
  getColorForTagType,
  useTagTypeColorMapping,
};
