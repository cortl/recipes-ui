import {
  HolidayTags,
  MealTypeTags,
  MethodTags,
  ProteinTags,
} from "./recipe-tag";

type IRecipeTags = {
  slug: string;
  tags: string[];
};

const RecipeTags: React.FC<IRecipeTags> = ({ slug, tags }) => (
  <>
    <ProteinTags slug={slug} tags={tags} />
    <MealTypeTags slug={slug} tags={tags} />
    <MethodTags slug={slug} tags={tags} />
    <HolidayTags slug={slug} tags={tags} />
  </>
);

export { RecipeTags };
