import { RecipeTagType, useTagTypeColorMapping } from "../colors";
import { TagCollection } from "../components/tag-collection";

type IGenericRecipeTag = {
  type: RecipeTagType;
  tags: string[];
  slug: string;
};

const Generic: React.FC<IGenericRecipeTag> = ({ slug, type, tags }) => {
  const { color, contains, key } = useTagTypeColorMapping(type);

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
