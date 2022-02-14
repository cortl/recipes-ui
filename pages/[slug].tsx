import type {
  GetStaticPathsResult,
  GetStaticPropsResult,
  NextPage,
} from "next";
import Recipes from "@cortl/recipes";
import type { BoxProps, FlexProps } from "@chakra-ui/react";
import {
  Container,
  Heading,
  ListItem,
  Stack,
  UnorderedList,
  Text,
  List,
  SimpleGrid,
  GridItem,
  Flex,
  Link,
  Spacer,
  Box,
  Img,
  Center,
  useColorMode,
} from "@chakra-ui/react";
import type { ReactElement } from "react";

import { Layout } from "../src/client/components/layout";
import { PageHeader } from "../src/client/components/page-header";
import { RecipeTags } from "../src/client/domain/recipe-tags";
import { capitalizeFirstLetter, getSitenameFromUrl } from "../src/client/utils";

type IRecipePage = Recipe & {};

type IIngredientCollection = BoxProps & {
  showLabel?: boolean;
  ingredient: Ingredient;
};

const IngredientCollection: React.FC<IIngredientCollection> = ({
  ingredient,
  showLabel,
  ...rest
}) => (
  <Box {...rest}>
    {showLabel && (
      <Heading size="md">{capitalizeFirstLetter(ingredient.category)}</Heading>
    )}
    <UnorderedList listStylePos="inside" spacing={5}>
      {ingredient.items.map((item, i) => (
        <ListItem key={`ingredient-${i}`}>{item}</ListItem>
      ))}
    </UnorderedList>
  </Box>
);

const buildTime = (time: Time): ReactElement => {
  const { label: category, units } = time;

  return (
    <GridItem key={category}>
      <Text display="inline" fontWeight="bold">{`${category}: `}</Text>
      <Text display="inline">
        {units
          .map(({ measurement, label }) => `${measurement} ${label}`)
          .join(", ")}
      </Text>
    </GridItem>
  );
};

const Recipe: NextPage<IRecipePage> = ({
  title,
  ingredients,
  instructions,
  image,
  servings,
  time,
  slug,
  tags,
  createdDate,
  source,
  notes,
}) => {
  const author = getSitenameFromUrl(source);
  const { colorMode } = useColorMode();
  const borderColor =
    colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300";
  const shouldDisplayMiscSection = Boolean(notes.length);
  const flexProps: FlexProps = image
    ? {
        flexWrap: ["wrap", "wrap", "nowrap"],
      }
    : { flexDirection: "column" };

  return (
    <Layout description="a recipe." title={`${title} | Recipes`}>
      <Container maxW="container.lg">
        <Flex alignItems="center" {...flexProps}>
          <Box maxW="lg" ml="auto" mr="auto" pb={5} pt={5}>
            <Stack>
              <PageHeader text={title} />
              <Center>
                <RecipeTags slug={slug} tags={tags} />
              </Center>
              <Text size="small" textAlign="center">
                {`Adapted from `}
                <Link href={source}>{author}</Link>
                {createdDate ? ` on ${createdDate}` : ""}
              </Text>
              <SimpleGrid columns={[1, 1, 1, time.length]}>
                {time.map(buildTime)}
              </SimpleGrid>
            </Stack>
          </Box>
          <Box maxW="lg" ml="auto" mr="auto" pb={5} pl={[0, 0, 5]} pt={5}>
            {image && <Img src={image} />}
          </Box>
        </Flex>

        <Stack mt={8} as="section">
          <Flex borderBottom="1px" borderColor={borderColor}>
            <Heading size="xl">{"Ingredients"}</Heading>
            <Spacer />
            <Text textAlign="right">{`Serves/makes ${servings}`}</Text>
          </Flex>

          {ingredients.length === 1 ? (
            <IngredientCollection ingredient={ingredients[0]} />
          ) : (
            ingredients.map((ingredientGroup) => (
              <IngredientCollection
                ingredient={ingredientGroup}
                key={ingredientGroup.category}
                mb={8}
                showLabel
              />
            ))
          )}
        </Stack>
        <Stack mt={8} as="section">
          <Heading borderBottom="1px" borderColor={borderColor} size="xl">
            {"Instructions"}
          </Heading>
          <List listStylePos="inside" spacing={5}>
            {instructions.map((instruction, i) => (
              <ListItem key={`instruction-${i}`}>
                <Heading size="lg">{`${i + 1}.`}</Heading>
                <Text lineHeight="1.7">{instruction}</Text>
              </ListItem>
            ))}
          </List>
        </Stack>
        {shouldDisplayMiscSection && (
          <Stack mt={8} as="section">
            <Heading borderBottom="1px" borderColor={borderColor} size="xl">
              {"Misc."}
            </Heading>
            <UnorderedList listStylePos="inside" spacing={5}>
              {notes.map((note, i) => (
                <ListItem key={`note-${i}`}>{note}</ListItem>
              ))}
            </UnorderedList>
          </Stack>
        )}
      </Container>
    </Layout>
  );
};

type Params = {
  params: {
    slug: string;
  };
};

const getStaticProps = (context: Params): GetStaticPropsResult<IRecipePage> => {
  const {
    params: { slug },
  } = context;

  const { image, ...recipe } = Recipes.asMap[slug];

  return {
    props: {
      ...recipe,
      image: image ? `/api/recipes/images/${image}` : null,
    },
  };
};

const getStaticPaths = (): GetStaticPathsResult => {
  const slugs = Recipes.asArray.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    fallback: false,
    paths: slugs,
  };
};

export { getStaticProps, getStaticPaths };

export default Recipe;
