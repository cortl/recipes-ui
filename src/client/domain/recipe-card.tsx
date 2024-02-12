import { Box, Text, LinkOverlay, LinkBox, Stack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import Image from "next/image";

import { Card } from "../components/card";
import type { GraphQLRecipe } from "../../types/graphql";

import { RecipeTags } from "./recipe-tags";
import { TimeTag } from "./time-tag";

type IRecipeCard = GraphQLRecipe;

const RecipeCard: React.FC<IRecipeCard> = ({
  image,
  title,
  slug,
  holidays,
  methods,
  proteins,
  mealTypes,
  time,
}) => (
  <Card>
    {image && (
      <LinkBox>
        <LinkOverlay as={Link} href={`/${slug}`}>
          <Image
            alt={`Image of ${title} recipe`}
            height={image.height}
            src={image.url}
            width={image.width}
          />
        </LinkOverlay>
      </LinkBox>
    )}
    <Box p="6">
      <RecipeTags
        holidays={holidays}
        mealTypes={mealTypes}
        methods={methods}
        proteins={proteins}
        slug={slug}
      />
      <Stack mt={1}>
        <TimeTag time={time} />
      </Stack>
      <Box as="h4" fontWeight="semibold" lineHeight="tight" mt="1">
        <Link href={`/${slug}`}>
          <Text noOfLines={1}>{title}</Text>
        </Link>
      </Box>
    </Box>
  </Card>
);

export { RecipeCard };
