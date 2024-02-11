import { HOLIDAYS, MEAL_TYPES, METHODS, PROTEINS } from "../../constants/tags";
import { TagCollection } from "../components/tag-collection";

enum RecipeTagType {
  PROTEIN_TYPE = "protein",
  MEAL_TYPE = "mealtype",
  METHOD_TYPE = "method",
  HOLIDAY_TYPE = "holiday",
}

// TODO: this is duplicated between here are colors.ts
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

type IGenericRecipeTag = {
  type: RecipeTagType;
  tags: string[];
  slug: string;
};

const Generic: React.FC<IGenericRecipeTag> = ({ slug, type, tags }) => {
  const { contains, key, color } = MAPPING[type];

  const givenTags = tags.filter((tag) => contains.includes(tag));

  if (!givenTags.length) {
    return null;
  }

  return (
    <TagCollection
      colorScheme={color}
      id={`${slug}-${key}`}
      slug={slug}
      tags={givenTags}
    />
  );
};

type IRecipeTags = {
  slug: string;
  tags: string[];
};

const ProteinTags: React.FC<IRecipeTags> = ({ tags, slug }) => (
  <Generic slug={slug} tags={tags} type={RecipeTagType.PROTEIN_TYPE} />
);

const MealTypeTags: React.FC<IRecipeTags> = ({ tags, slug }) => (
  <Generic slug={slug} tags={tags} type={RecipeTagType.MEAL_TYPE} />
);

const MethodTags: React.FC<IRecipeTags> = ({ tags, slug }) => (
  <Generic slug={slug} tags={tags} type={RecipeTagType.METHOD_TYPE} />
);

const HolidayTags: React.FC<IRecipeTags> = ({ tags, slug }) => (
  <Generic slug={slug} tags={tags} type={RecipeTagType.HOLIDAY_TYPE} />
);

export { ProteinTags, MealTypeTags, MethodTags, HolidayTags };
