import process from "process";

import type { NextPage, GetServerSideProps } from "next";
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
  Spacer,
  Box,
  Center,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import Image from "next/image";
import type { ReactElement } from "react";

import { createApolloClient } from "../src/client/apollo-client";
import { Layout } from "../src/client/components/layout";
import { PageHeader } from "../src/client/components/page-header";
import { RecipeTags } from "../src/client/domain/recipe-tags";
import { capitalizeFirstLetter } from "../src/client/utils";
import type { Ingredient, Time } from "../src/types/recipe";
import type { GraphQLRecipe } from "../src/types/graphql";
import { GET_RECIPE_QUERY } from "../src/client/queries";

type LinkedRecipe = {
  slug: string;
  title: string;
};

type RecipePageProps = GraphQLRecipe & {
  relatedRecipes: LinkedRecipe[];
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

const RecipePage: NextPage<RecipePageProps> = ({
  title,
  ingredients,
  instructions,
  image,
  servings,
  time,
  slug,
  holidays,
  proteins,
  methods,
  mealTypes,
  createdDate,
  source,
  notes,
  relatedRecipes,
}) => {
  const { name: author, url: sourceUrl } = source;
  const { colorMode } = useColorMode();
  const borderColor =
    colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300";
  const shouldDisplayMiscSection =
    Boolean(notes.length) || Boolean(relatedRecipes.length);
  const flexProps: FlexProps = image
    ? {
        flexWrap: ["wrap", "wrap", "nowrap"],
      }
    : { flexDirection: "column" };
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}/${slug}`;

  return (
    // TODO: this image is busted
    <Layout image={`${baseUrl}${image}`} title={title} url={url}>
      <Container fontSize="lg" maxW="container.lg">
        <Flex alignItems="center" {...flexProps}>
          <Box maxW="lg" ml="auto" mr="auto" pb={5} pt={5}>
            <Stack>
              <PageHeader text={title} />
              <Center>
                <RecipeTags
                  holidays={holidays}
                  mealTypes={mealTypes}
                  methods={methods}
                  proteins={proteins}
                  slug={slug}
                />
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
            {image && (
              <Image
                alt={`Cover image for ${title} recipe`}
                height={image.height}
                src={image.url}
                width={image.width}
              />
            )}
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
            {relatedRecipes.length && (
              <>
                <Heading size="md">{"Related Recipes"}</Heading>
                <UnorderedList listStylePos="inside">
                  {relatedRecipes.map(
                    ({ slug: relatedSlug, title: relatedTitle }) => (
                      <ListItem key={`related-${relatedSlug}`}>
                        <Link href={`/${relatedSlug}`}>{relatedTitle}</Link>
                      </ListItem>
                    ),
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

type RecipeResponse = {
  recipe: GraphQLRecipe | null;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getServerSideProps = (async (context) => {
  const { req, params } = context;
  const { slug } = params ?? {};

  const protocol = req.headers["x-forwarded-proto"] ?? "http";
  const host = req.headers.host;
  const graphqlUrl = `${protocol}://${host}/api/graphql`;

  if (typeof slug !== "string") {
    return {
      notFound: true,
    };
  }

  const client = createApolloClient(graphqlUrl);

  try {
    const { data } = await client.query<RecipeResponse>({
      errorPolicy: "all",
      query: GET_RECIPE_QUERY,
      variables: { slug },
    });

    if (!data.recipe) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        ...data.recipe,
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching recipe", error);

    return {
      notFound: true,
    };
  }
}) satisfies GetServerSideProps<GraphQLRecipe>;

export { getServerSideProps };

export default RecipePage;
