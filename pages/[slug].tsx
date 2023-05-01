import process from "process";

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
import { capitalizeFirstLetter } from "../src/client/utils";

type LinkedRecipe = {
  slug: string;
  title: string;
};

type RecipePageProps = Recipe & {
  linkedRecipes: LinkedRecipe[] | null;
};

type IngredientCollectionProps = BoxProps & {
  showLabel?: boolean;
  ingredient: Ingredient;
};

const IngredientCollection: React.FC<IngredientCollectionProps> = ({
  ingredient,
  showLabel,
  mb,
  ...rest
}) => (
  <Box {...rest}>
    {showLabel && (
      <Heading size="md">{capitalizeFirstLetter(ingredient.category)}</Heading>
    )}
    <UnorderedList listStylePos="outside" m="0" mb={mb} pl="20px" spacing={2}>
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

const Recipe: NextPage<RecipePageProps> = ({
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
  linkedRecipes,
}) => {
  const { name: author, url: sourceUrl } = source;
  const { colorMode } = useColorMode();
  const borderColor =
    colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300";
  const shouldDisplayMiscSection =
    Boolean(notes.length) || Boolean(linkedRecipes?.length);
  const flexProps: FlexProps = image
    ? {
        flexWrap: ["wrap", "wrap", "nowrap"],
      }
    : { flexDirection: "column" };
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}/${slug}`;

  return (
    <Layout image={`${baseUrl}${image}`} title={title} url={url}>
      <Container fontSize="lg" maxW="container.lg">
        <Flex alignItems="center" {...flexProps}>
          <Box maxW="lg" ml="auto" mr="auto" pb={5} pt={5}>
            <Stack>
              <PageHeader text={title} />
              <Center>
                <RecipeTags slug={slug} tags={tags} />
              </Center>
              <Text size="small" textAlign="center">
                {`Adapted from `}
                <Link href={sourceUrl}>{author}</Link>
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

        <Stack as="section" mt={8}>
          <Flex
            alignItems="baseline"
            borderBottom="1px"
            borderColor={borderColor}
          >
            <Heading size="xl">{"Ingredients"}</Heading>
            <Spacer />
            <Text textAlign="right">{`Serves/makes ${servings}`}</Text>
          </Flex>

          {ingredients.length === 1 ? (
            <IngredientCollection ingredient={ingredients[0]} />
          ) : (
            ingredients.map((ingredientGroup, i) => (
              <IngredientCollection
                ingredient={ingredientGroup}
                key={ingredientGroup.category}
                mb={ingredients.length - 1 > i ? "5" : "0"}
                showLabel
              />
            ))
          )}
        </Stack>
        <Stack as="section" mt={8}>
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
          <Stack as="section" mt={8}>
            <Heading borderBottom="1px" borderColor={borderColor} size="xl">
              {"Misc."}
            </Heading>
            {notes.length && (
              <>
                <Heading size="md">{"Notes"}</Heading>
                <UnorderedList listStylePos="inside" spacing={5}>
                  {notes.map((note, i) => (
                    <ListItem key={`note-${i}`}>{note}</ListItem>
                  ))}
                </UnorderedList>
              </>
            )}
            {linkedRecipes?.length && (
              <>
                <Heading size="md">{"Related Recipes"}</Heading>
                <UnorderedList listStylePos="inside">
                  {linkedRecipes.map(
                    ({ slug: relatedSlug, title: relatedTitle }) => (
                      <ListItem key={`related-${relatedSlug}`}>
                        <Link href={`/${relatedSlug}`}>{relatedTitle}</Link>
                      </ListItem>
                    )
                  )}
                </UnorderedList>
              </>
            )}
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

const getStaticProps = (
  context: Params
): GetStaticPropsResult<RecipePageProps> => {
  const {
    params: { slug },
  } = context;

  const { image, related, ...recipe } = Recipes.asMap[slug];

  const linkedRecipes = related?.map((relatedSlug) => {
    const relatedRecipe = Recipes.asMap[relatedSlug];

    return {
      slug: relatedSlug,
      title: relatedRecipe.title,
    };
  });

  return {
    props: {
      ...recipe,
      image: image ? `/api/recipes/images/${image}` : null,
      linkedRecipes: linkedRecipes ?? null,
      related: related ?? null,
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
