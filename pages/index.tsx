import type { NextPage } from "next";
import {
  Center,
  Container,
  Heading,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { Layout } from "../src/client/components/layout";
import { Error } from "../src/client/components/error";
import { Loading } from "../src/client/components/loading";
import { useRecipes } from "../src/client/recipe-hooks";
import { useQueryFilters } from "../src/client/hooks/useQueryFilters";
import { Filters } from "../src/domain/filters";
import { useSearch } from "../src/client/hooks/useSearch";
import { ResultsList } from "../src/domain/results-list";
import { useDebounce } from "../src/client/hooks/useDebounce";

const HomePage: NextPage = () => {
  const filters = useQueryFilters();
  const { loading, error, data } = useRecipes(filters);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm: string = useDebounce<string>(search, 500);
  const results = useSearch(data?.recipes ?? [], debouncedSearchTerm, {
    keys: ["title"],
  });

  const content = loading ? (
    <Loading />
  ) : error ? (
    <Error message={error.message} />
  ) : (
    <ResultsList recipes={results} />
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
          <Input
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Stack>
        <Stack pt={5}>
          <Filters />
        </Stack>
        {content}
      </Container>
    </Layout>
  );
};

export default HomePage;
