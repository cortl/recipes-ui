import type { GraphQLRecipe } from "../../types/graphql";

import {
  HolidayTags,
  MealTypeTags,
  MethodTags,
  ProteinTags,
} from "./recipe-tag";

type IRecipeTags = Pick<
  GraphQLRecipe,
  "holidays" | "mealTypes" | "methods" | "proteins" | "slug"
>;

const RecipeTags: React.FC<IRecipeTags> = ({
  slug,
  holidays,
  mealTypes,
  methods,
  proteins,
}) => (
  <>
    <ProteinTags slug={slug} tags={proteins} />
    <MealTypeTags slug={slug} tags={mealTypes} />
    <MethodTags slug={slug} tags={methods} />
    <HolidayTags slug={slug} tags={holidays} />
  </>
);

export { RecipeTags };
