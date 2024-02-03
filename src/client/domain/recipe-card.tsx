import {
  Box,
  Image,
  Text,
  Link as CLink,
  LinkOverlay,
  LinkBox,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import Link from "next/link";

import { Card } from "../components/card";
import type { Recipe } from "../../../types/recipe";

import { RecipeTags } from "./recipe-tags";
import { TimeTag } from "./time-tag";

type IRecipeCard = {
  title: string;
  slug: string;
  image: string | null;
  tags: string[];
  time: Recipe["time"];
};

const RecipeCard: React.FC<IRecipeCard> = ({
  image,
  title,
  slug,
  tags,
  time,
}) => (
  <Card>
    {image && (
      <LinkBox>
        <Link href={`/${slug}`} passHref>
          <LinkOverlay>
            <Image fallback={<Skeleton height="40" />} src={image} />
          </LinkOverlay>
        </Link>
      </LinkBox>
    )}
    <Box p="6">
      <RecipeTags slug={slug} tags={tags} />
      <Stack mt={1}>
        <TimeTag time={time} />
      </Stack>
      <Box as="h4" fontWeight="semibold" lineHeight="tight" mt="1">
        <Link href={`/${slug}`} passHref>
          <CLink>
            <Text noOfLines={1}>{title}</Text>
          </CLink>
        </Link>
      </Box>
    </Box>
  </Card>
);

export { RecipeCard };
