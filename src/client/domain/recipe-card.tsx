import {
  Box,
  Image,
  Text,
  Link as CLink,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import Link from "next/link";

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
    <LinkBox>
      <Image src={image} />
      <Link href={`/${slug}`} passHref>
        <LinkOverlay />
      </Link>
    </LinkBox>
    <Box p="6">
      <ProteinTags slug={slug} tags={tags} />
      <MealTypeTags slug={slug} tags={tags} />
      <MethodTags slug={slug} tags={tags} />
      <HolidayTags slug={slug} tags={tags} />
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

export { RecipeCard };
