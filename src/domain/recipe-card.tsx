import { Badge, Box, Image } from "@chakra-ui/react";

import { Card } from "../client/components/card";
import { HOLIDAYS, MEAL_TYPES, METHODS, PROTEINS } from "../utils/tags";

interface IRecipeCard {
  title: string;
  image: string;
  tags: string[];
}

const buildTagsFor = (tagCategory: string[], tags: string[], color: string) => {
  const proteinTags = tags.filter((tag) => tagCategory.includes(tag));

  if (!proteinTags.length) {
    return null;
  }

  return (
    <Box display={'inline-block'}>
      {proteinTags.map((tag) => (
        <Badge key={tag} borderRadius="full" px="2" mr="1" colorScheme={color}>
          {tag}
        </Badge>
      ))}
    </Box>
  );
};

const RecipeCard: React.FC<IRecipeCard> = ({ image, title, tags }) => (
  <Card>
    <Image src={image} />
    <Box p="6">
      {buildTagsFor(PROTEINS, tags, "red")}
      {buildTagsFor(MEAL_TYPES, tags, "teal")}
      {buildTagsFor(METHODS, tags, "purple")}
      {buildTagsFor(HOLIDAYS, tags, "yellow")}
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {title}
      </Box>
    </Box>
  </Card>
);

export { RecipeCard };
