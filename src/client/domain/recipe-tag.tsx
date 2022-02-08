import { HOLIDAYS, MEAL_TYPES, METHODS, PROTEINS } from "../../utils/tags";
import { TagCollection } from "../components/tag-collection";

enum RecipeTagType {
  PROTEIN_TYPE = "protein",
  MEAL_TYPE = "mealtype",
  METHOD_TYPE = "method",
  HOLIDAY_TYPE = "holiday",
}

const MAPPING = {
  [RecipeTagType.PROTEIN_TYPE]: {
    contains: PROTEINS,
    key: "protein",
    color: "red",
  },
  [RecipeTagType.MEAL_TYPE]: {
    contains: MEAL_TYPES,
    key: "mealtype",
    color: "teal",
  },
  [RecipeTagType.METHOD_TYPE]: {
    contains: METHODS,
    key: "method",
    color: "purple",
  },
  [RecipeTagType.HOLIDAY_TYPE]: {
    contains: HOLIDAYS,
    key: "holiday",
    color: "yellow",
  },
};

interface IGenericRecipeTag {
  type: RecipeTagType;
  tags: string[];
  slug: string;
}

const Generic: React.FC<IGenericRecipeTag> = ({ slug, type, tags }) => {
  const { contains, key, color } = MAPPING[type];

  const givenTags = tags.filter((tag) => contains.includes(tag));

  if (!givenTags.length) {
    return null;
  }

  return <TagCollection id={`${slug}-${key}`} color={color} tags={givenTags} />;
};

interface IRecipeTags {
  slug: string;
  tags: string[];
}

const ProteinTags: React.FC<IRecipeTags> = ({ tags, slug }) => (
  <Generic slug={slug} type={RecipeTagType.PROTEIN_TYPE} tags={tags} />
);

const MealTypeTags: React.FC<IRecipeTags> = ({ tags, slug }) => (
  <Generic slug={slug} type={RecipeTagType.MEAL_TYPE} tags={tags} />
);

const MethodTags: React.FC<IRecipeTags> = ({ tags, slug }) => (
  <Generic slug={slug} type={RecipeTagType.METHOD_TYPE} tags={tags} />
);

const HolidayTags: React.FC<IRecipeTags> = ({ tags, slug }) => (
  <Generic slug={slug} type={RecipeTagType.HOLIDAY_TYPE} tags={tags} />
);

export { ProteinTags, MealTypeTags, MethodTags, HolidayTags };
