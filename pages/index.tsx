import type { NextPage } from "next";
import { Center, Container, Heading, Stack, VStack } from "@chakra-ui/react";
import Masonry from "react-masonry-css";

import { Layout } from "../src/client/components/layout";
import { Error } from "../src/client/components/error";
import { Loading } from "../src/client/components/loading";
import { useRecipes } from "../src/client/recipe-hooks";
import { RecipeCard } from "../src/domain/recipe-card";
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
    <Masonry
      breakpointCols={3}
      className="masonry"
      columnClassName="masonry-column"
    >
      {data.recipes.slice(0, 10).map(({ title, slug, image, tags }: Recipe) => (
        <RecipeCard key={slug} title={title} image={image} tags={tags} />
      ))}
    </Masonry>
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
