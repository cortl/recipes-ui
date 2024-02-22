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

type Image = {
  height: number;
  width: number;
  path: string;
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
  image: Image | null;
  related?: string[] | null;

  [key: string]: unknown;
};

export type { Recipe, Ingredient, TimeUnit, Time, Source };
