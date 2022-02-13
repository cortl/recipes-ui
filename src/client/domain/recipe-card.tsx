import {
  Box,
  Image,
  Text,
  Link as CLink,
  LinkOverlay,
  LinkBox,
  Stack,
  Skeleton,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";

import { Card } from "../components/card";
import { RecipeTags } from "./recipe-tags";
import { TimeTag } from "./time-tag";

interface IRecipeCard {
  title: string;
  slug: string;
  image: string | null;
  tags: string[];
  time: Recipe["time"];
}

const RecipeCard: React.FC<IRecipeCard> = ({
  image,
  title,
  slug,
  tags,
  time,
}) => {
  return (
    <Card>
      {image && (
        <LinkBox>
          <Image src={image} fallback={<Skeleton height={"40"} />} />
          <Link href={`/${slug}`} passHref>
            <LinkOverlay />
          </Link>
        </LinkBox>
      )}
      <Box p="6">
        <RecipeTags slug={slug} tags={tags} />
        <Stack mt={1}>
          <TimeTag time={time} />
        </Stack>
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          <Link href={`/${slug}`}>
            <CLink>
              <Text isTruncated>{title}</Text>
            </CLink>
          </Link>
        </Box>
      </Box>
    </Card>
  );
};
export { RecipeCard };
