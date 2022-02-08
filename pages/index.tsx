import type { NextPage } from "next";
import {
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";

import { Layout } from "../src/client/components/layout";
import { Error } from "../src/client/components/error";
import { Loading } from "../src/client/components/loading";
import { useRecipes } from "../src/client/recipe-hooks";
import { useQueryFilters } from "../src/client/hooks/useQueryFilters";
import { Filters } from "../src/client/domain/filters";
import { ResultsList } from "../src/client/domain/results-list";

const HomePage: NextPage = () => {
  const filters = useQueryFilters();
  const [search, setSearch] = useState("");
  const [useableSearch, setUseableSearch] = useState("");
  const { loading, error, data } = useRecipes(filters, useableSearch);

  const content = loading ? (
    <Loading />
  ) : error ? (
    <Error message={error.message} />
  ) : (
    <ResultsList recipes={data.recipes} />
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
          <FormControl>
            <FormLabel htmlFor="search">Search</FormLabel>
            <HStack>
              <Input
                id="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);

                  if (e.target.value === "") {
                    setUseableSearch("");
                  }
                }}
              />
              <IconButton
                aria-label="search recipes"
                icon={<SearchIcon />}
                onClick={() => {
                  setUseableSearch(search);
                }}
              >
                {"Search"}
              </IconButton>
            </HStack>
          </FormControl>
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
