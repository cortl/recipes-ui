import type { NextPage } from "next";
import Recipes from "@cortl/recipes";
import { Layout } from "../src/client/components/layout";
import { PageHeader } from "../src/client/components/page-header";
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
  BoxProps,
} from "@chakra-ui/react";

interface IRecipePage extends Recipe {}

interface IIngredientCollection extends BoxProps {
  showLabel?: boolean;
  ingredient: Ingredient;
}

const IngredientCollection: React.FC<IIngredientCollection> = ({
  ingredient,
  showLabel,
  ...rest
}) => {
  return (
    <Box {...rest}>
      {showLabel && <Heading size={"md"}>{ingredient.category}</Heading>}
      <UnorderedList listStylePos={"inside"} spacing={5}>
        {ingredient.items.map((item, i) => (
          <ListItem key={`ingredient-${i}`}>{item}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const getSitenameFromUrl = (source: string) => {
  const host = new URL(source).hostname;
  const site = host.replace("www.", "");

  return capitalizeFirstLetter(site.substring(0, site.indexOf(".")));
};

const buildTime = (time: Time) => {
  const { label, units } = time;

  return (
    <GridItem key={label}>
      <Text display={"inline"} fontWeight={"bold"}>{`${label}: `}</Text>
      <Text display={"inline"}>
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
  createdDate,
  source,
  notes,
}) => {
  const author = getSitenameFromUrl(source);
  const shouldDisplayMiscSection = Boolean(notes.length);

  return (
    <Layout title={`${title} | Recipes`} description={"a recipe."}>
      <Container maxW={"container.lg"}>
        <Flex alignItems={"center"} flexWrap={["wrap", "wrap", "nowrap"]}>
          <Box maxW={"lg"} pt={5} pb={5} mr={"auto"} ml={"auto"}>
            <Stack>
              <PageHeader text={title} />
              <Text size={"small"} textAlign={"center"}>
                {`Adapted from `}
                <Link href={source}>{author}</Link>
                {createdDate ? ` on ${createdDate}` : ""}
              </Text>
              <SimpleGrid columns={[1, 1, 1, time.length]}>
                {time.map(buildTime)}
              </SimpleGrid>
            </Stack>
          </Box>
          <Box maxW={"lg"} pl={[0, 0, 5]} pt={5} pb={5} mr={"auto"} ml={"auto"}>
            <Img src={image} />
          </Box>
        </Flex>

        <Stack mt={8}>
          <Flex borderBottom={"1px"} borderColor={"whiteAlpha.300"}>
            <Heading size="xl">{"Ingredients"}</Heading>
            <Spacer />
            <Text textAlign={"right"}>{`Serves/makes ${servings}`}</Text>
          </Flex>

          {ingredients.length === 1 ? (
            <IngredientCollection ingredient={ingredients[0]} />
          ) : (
            ingredients.map((ingredientGroup) => {
              return (
                <IngredientCollection
                  key={ingredientGroup.category}
                  showLabel
                  ingredient={ingredientGroup}
                  mb={8}
                />
              );
            })
          )}
        </Stack>
        <Stack mt={8}>
          <Heading
            size="xl"
            borderBottom={"1px"}
            borderColor={"whiteAlpha.300"}
          >
            {"Instructions"}
          </Heading>
          <List spacing={5} listStylePos={"inside"}>
            {instructions.map((instruction, i) => (
              <ListItem key={`instruction-${i}`}>
                <Heading size={"lg"}>{`${i + 1}.`}</Heading>
                <Text lineHeight="1.7">{instruction}</Text>
              </ListItem>
            ))}
          </List>
        </Stack>
        {shouldDisplayMiscSection && (
          <Stack mt={8}>
            <Heading
              size="xl"
              borderBottom={"1px"}
              borderColor={"whiteAlpha.300"}
            >
              {"Misc."}
            </Heading>
            <UnorderedList spacing={5} listStylePos={"inside"}>
              {notes.map((note) => (
                <ListItem>{note}</ListItem>
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

const getStaticProps = async (context: Params) => {
  const {
    params: { slug },
  } = context;

  const { image, ...recipe } = Recipes.asMap[slug];

  return {
    props: {
      ...recipe,
      image: image ? `http://localhost:3000/api/recipes/images/${image}` : null,
    },
  };
};

const getStaticPaths = async () => {
  const slugs = Recipes.asArray.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths: slugs,
    fallback: false,
  };
};

export { getStaticProps, getStaticPaths };

export default Recipe;
