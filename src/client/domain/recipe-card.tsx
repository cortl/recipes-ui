import { Box, Image } from "@chakra-ui/react";

import { Card } from "../components/card";
import {
  HolidayTags,
  MealTypeTags,
  MethodTags,
  ProteinTags,
} from "./recipe-tag";

interface IRecipeCard {
  title: string;
  slug: string;
  image: string;
  tags: string[];
}

const RecipeCard: React.FC<IRecipeCard> = ({ image, title, slug, tags }) => (
  <Card>
    <Image src={image} />
    <Box p="6">
      <ProteinTags slug={slug} tags={tags} />
      <MealTypeTags slug={slug} tags={tags} />
      <MethodTags slug={slug} tags={tags} />
      <HolidayTags slug={slug} tags={tags} />
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {title}
      </Box>
    </Box>
  </Card>
);

export { RecipeCard };
