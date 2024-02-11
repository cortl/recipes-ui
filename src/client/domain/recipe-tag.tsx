import { RecipeTagType, useTagTypeColorMapping } from "../colors";
import { TagCollection } from "../components/tag-collection";

type IGenericRecipeTag = {
  type: string;
  tags: string[];
  slug: string;
  color: string;
};

const Generic: React.FC<IGenericRecipeTag> = ({ slug, type, tags, color }) => {
  if (!tags.length) return null;

  return (
    <TagCollection
      colorScheme={color}
      id={`${slug}-${type}`}
      slug={slug}
      tags={tags}
    />
  );
};

type IRecipeTags = {
  slug: string;
  tags: string[];
};

const ProteinTags: React.FC<IRecipeTags> = ({ tags, slug }) => {
  const { color, key } = useTagTypeColorMapping(RecipeTagType.PROTEIN_TYPE);

  return <Generic color={color} slug={slug} tags={tags} type={key} />;
};

const MealTypeTags: React.FC<IRecipeTags> = ({ tags, slug }) => {
  const { color, key } = useTagTypeColorMapping(RecipeTagType.MEAL_TYPE);

  return <Generic color={color} slug={slug} tags={tags} type={key} />;
};

const MethodTags: React.FC<IRecipeTags> = ({ tags, slug }) => {
  const { color, key } = useTagTypeColorMapping(RecipeTagType.METHOD_TYPE);

  return <Generic color={color} slug={slug} tags={tags} type={key} />;
};

const HolidayTags: React.FC<IRecipeTags> = ({ tags, slug }) => {
  const { color, key } = useTagTypeColorMapping(RecipeTagType.HOLIDAY_TYPE);

  return <Generic color={color} slug={slug} tags={tags} type={key} />;
};

export { ProteinTags, MealTypeTags, MethodTags, HolidayTags };
