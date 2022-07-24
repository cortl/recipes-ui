type Ingredient = {
  category: string;
  items: string[];
};

type TimeUnit = {
  measurement: number;
  label: string;
};

type Time = {
  label: string;
  units: TimeUnit[];
};

type Source = {
  url: string;
  name: string;
};

type Recipe = {
  title: string;
  servings: number;
  rating: number;
  slug: string;
  source: Source;
  createdDate: string;
  instructions: string[];
  notes: string[];
  archived?: boolean;
  ingredients: Ingredient[];
  tags: string[];
  time: Time[];
  image: string | null;

  [key: string]: unknown;
};

type AsMap = Record<string, Recipe>;

declare module "@cortl/recipes" {
  declare const recipes: Recipe[];
  declare const asMap: AsMap;

  export default {
    asArray: recipes,
    asMap,
  };
}
