import type { NextPage } from "next";
import {
  Container,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { SearchIcon, ViewIcon } from "@chakra-ui/icons";

import { Layout } from "../src/client/components/layout";
import { Error } from "../src/client/components/error";
import { Loading } from "../src/client/components/loading";
import { useRecipes } from "../src/client/recipe-hooks";
import { useQueryFilters } from "../src/client/hooks/useQueryFilters";
import { Filters } from "../src/client/domain/filters";
import { ResultsList } from "../src/client/domain/results-list";
import { usePageBottom } from "../src/client/hooks/usePageBottom";
import { PageHeader } from "../src/client/components/page-header";

const PAGE_SIZE = 12;

const HomePage: NextPage = () => {
  const filters = useQueryFilters();
  const [search, setSearch] = useState("");
  const [useableSearch, setUseableSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [filtersToggled, setToggledFilters] = useState(false);
  const isBottom = usePageBottom();
  const { loading, error, data, fetchMore } = useRecipes(
    filters,
    useableSearch,
    offset,
    PAGE_SIZE
  );

  const resetAndFetch = useCallback(() => {
    fetchMore({
      variables: { offset: 0, limit: PAGE_SIZE },
    });
    setOffset(0);
  }, [fetchMore, setOffset]);

  useEffect(() => {
    if (isBottom && offset <= data?.recipes.length) {
      fetchMore({
        variables: { offset: offset + PAGE_SIZE, limit: PAGE_SIZE },
      });
      setOffset(offset + PAGE_SIZE);
    }
  }, [isBottom, fetchMore, setOffset, offset, data]);

  const onEnter = useCallback(
    (e) => {
      if (e.key === "Enter") {
        resetAndFetch();
        setUseableSearch(search);
      }
    },
    [resetAndFetch, setUseableSearch, search]
  );

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
      <PageHeader text={"Recipe Book"} />
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
                onKeyPress={onEnter}
              />
              <IconButton
                aria-label="search recipes"
                icon={<SearchIcon />}
                onClick={() => {
                  resetAndFetch();
                  setUseableSearch(search);
                }}
              />
              <IconButton
                aria-label="filter recipes"
                isActive={filtersToggled}
                icon={<ViewIcon />}
                onClick={() => {
                  setToggledFilters(!filtersToggled);
                }}
              />
            </HStack>
          </FormControl>
        </Stack>
        {filtersToggled && (
          <Stack pt={5}>
            <Filters onChange={resetAndFetch} />
          </Stack>
        )}
        {content}
      </Container>
    </Layout>
  );
};

export default HomePage;
