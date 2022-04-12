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

export interface Filter {
  exists: boolean;
}

export interface BooleanFilter extends Filter {
  is: boolean;
}

export interface StringFilter extends Filter {
  like: string;
}

export interface ArrayFilter extends Filter {
  in: Tag[];
}

export interface NumberFilter extends Filter {
  gt: number;
  lt: number;
  eq: number;
}

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export interface Sort {
  field: string;
  direction: SortDirection;
}

export type RecipesWhereInput = {
  where?: {
    title?: StringFilter;
    rating?: NumberFilter;
    tags?: ArrayFilter;
    image?: StringFilter;
    archived?: BooleanFilter;

    [key: string]: unknown;
  };
  sort?: Sort;
  limit: number;
  offset: number;
};

export type RecipeInput = {
  slug: string;
};
