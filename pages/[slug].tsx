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
  List
} from "@chakra-ui/react";

interface IRecipePage {
  title: string;
  ingredients: Recipe["ingredients"];
  instructions: Recipe["instructions"];
}

interface IIngredientCollection {
  showLabel?: boolean;
  ingredient: Ingredient;
}

const IngredientCollection: React.FC<IIngredientCollection> = ({
  ingredient,
}) => {
  return (
    <UnorderedList listStylePos={"inside"} spacing={5}>
      {ingredient.items.map((item, i) => (
        <ListItem key={`ingredient-${i}`}>{item}</ListItem>
      ))}
    </UnorderedList>
  );
};

const Recipe: NextPage<IRecipePage> = ({
  title,
  ingredients,
  instructions,
}) => {
  return (
    <Layout title={`${title} | Recipes`} description={"a recipe."}>
      <PageHeader text={title} />
      <Container maxW={"container.lg"}>
        <Stack mt={5}>
          <Heading
            size="xl"
            borderBottom={"1px"}
            borderColor={"whiteAlpha.300"}
          >
            {"Ingredients"}
          </Heading>
          {ingredients.length === 1 ? (
            <IngredientCollection ingredient={ingredients[0]} />
          ) : (
            ingredients.map((ingredientGroup) => {
              <IngredientCollection
                key={ingredientGroup.category}
                showLabel
                ingredient={ingredientGroup}
              />;
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
                <Heading size={'lg'}>{`${i+1}.`}</Heading>
                <Text lineHeight="1.7">{instruction}</Text>
              </ListItem>
            ))}
          </List>
        </Stack>
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

  return {
    props: Recipes.asMap[slug],
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
