import type { NextPage } from "next";
import { Center, Container, Heading, Stack, VStack } from "@chakra-ui/react";

import { Layout } from "../src/client/components/layout";
import { Error } from "../src/client/components/error";
import { Loading } from "../src/client/components/loading";
import { useRecipes } from "../src/client/recipe-hooks";
import { RecipeCard } from "../src/domain/recipe-card";

import styles from "../styles/Home.module.css";
import { useQueryFilters } from "../src/client/hooks/useQueryFilters";
import { Filters } from "../src/domain/filters";

const HomePage: NextPage = () => {
  const filters = useQueryFilters();
  const { loading, error, data } = useRecipes(filters);

  const content = loading ? (
    <Loading />
  ) : error ? (
    <Error message={error.message} />
  ) : (
    <div className={styles.masonry}>
      {data.recipes.slice(0, 10).map(({ title, slug, image, tags }: Recipe) => (
        <RecipeCard key={slug} title={title} image={image} tags={tags} />
      ))}
    </div>
  );

  return (
    <Layout
      title={"Recipe Book"}
      description={"Collection of recipes I've made"}
    >
      <VStack mt={24} mb={2}>
        <Center>
          <Heading as="h1" size="4xl">
            {"Recipe Book"}
          </Heading>
        </Center>
      </VStack>

      <Container maxW={"container.xl"}>
        <Stack pt={5}>
          <Filters />
        </Stack>
        {content}
      </Container>
    </Layout>
  );
};

export default HomePage;
