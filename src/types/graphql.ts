import type { Recipe } from "./recipe";

enum Tag {
  PREP = "Prep",
  COOK = "Cook",
  PROOF = "Proof",
  BULK_FERMENT = "Bulk Ferment",
  CARAMELIZE = "Caramelize",
  BROIL = "Broil",
  MARINATE = "Marinate",
  ACTIVE = "Active",
  TOTAL = "Total",
  INACTIVE = "Inactive",
  VEGAN = "Vegan",
  VEGETARIAN = "Vegetarian",
  POULTRY = "Poultry",
  FISH = "Fish",
  BEEF = "Beef",
  PORK = "Pork",
  DRINK = "Drink",
  SOUP = "Soup",
  APPETIZER = "Appetizer",
  QUICK = "Quick",
  SALAD = "Salad",
  SANDWICH = "Sandwich",
  PASTA = "Pasta",
  DINNER = "Dinner",
  DESSERT = "Dessert",
  BREAKFAST = "Breakfast",
  MEAL_PREP = "Meal Prep",
  TOPPING = "Topping",
  SEASONING_BLEND = "Seasoning Blend",
  THANKSGIVING = "Thanksgiving",
  CHRISTMAS = "Christmas",
  SUPER_BOWL = "Super Bowl",
  BAKING = "Baking",
  ROASTING = "Roasting",
  FRYING = "Frying",
  SLOW_COOKER = "Slow Cooker",
  BRAISING_AND_STEWING = "Braising & Stewing",
  NO_COOK = "No Cook",
  STOVETOP = "Stovetop",
  FERMENTING = "Fermenting",
  PRESSURE_COOKER = "Pressure Cooker",
  GRILLING = "Grilling",
}

type Filter = {
  exists: boolean;
};

type BooleanFilter = Filter & {
  is: boolean;
};

type StringFilter = Filter & {
  like: string;
};

type ArrayFilter = Filter & {
  in: Tag[];
};

type NumberFilter = Filter & {
  gt: number;
  lt: number;
  eq: number;
};

enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

type Sort = {
  field: string;
  direction: SortDirection;
};

type RecipesWhereInput = {
  where?: {
    title?: StringFilter | undefined;
    rating?: NumberFilter | undefined;
    tags?: ArrayFilter | undefined;
    image?: StringFilter | undefined;
    archived?: BooleanFilter | undefined;
  };
  sort?: Sort;
  limit: number;
  offset: number;
};

type RecipeInput = {
  slug: string;
};

type Image = {
  url: string;
  width: number;
  height: number;
};

type GraphQLRecipe = Recipe & {
  image: Image | null;
  holidays: string[]
  methods: string[]
  proteins: string[]
  mealTypes: string[]
};

export { SortDirection };

export type {
  Filter,
  BooleanFilter,
  StringFilter,
  ArrayFilter,
  NumberFilter,
  Sort,
  RecipesWhereInput,
  RecipeInput,
  GraphQLRecipe,
  Image,
};
