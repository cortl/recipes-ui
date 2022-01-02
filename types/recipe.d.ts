type Ingredient = {
    category: string;
    items: string[]
}

type TimeUnit = {
    measurement: number;
    label: string;
}

type Time = {
    label: string;
    units: TimeUnit[];
}

type Recipe = {
    title: string;
    servings: number;
    rating: number;
    slug: string;
    source: string;
    createdDate: string;
    instructions: string[];
    notes: string[];
    archived?: boolean;
    ingredients: Ingredient[];
    tags: string[];
    time: Time;
    image: string;

    [key: string]: unknown
}

declare module '@cortl/recipes' {
    declare const recipes: Recipe[]

    export = recipes;
}