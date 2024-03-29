import process from "process";

import type { NextPage } from "next";
import {
  Container,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Stack,
  chakra,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { IoIosFunnel } from "react-icons/io";

import { Layout } from "../src/client/components/layout";
import { Error } from "../src/client/components/error";
import { Loading } from "../src/client/components/loading";
import { useRecipes } from "../src/client/recipe-hooks";
import { useQueryFilters } from "../src/client/hooks/use-query-filters";
import { Filters } from "../src/client/domain/filters";
import { ResultsList } from "../src/client/domain/results-list";
import { usePageBottom } from "../src/client/hooks/use-page-bottom";
import { PageHeader } from "../src/client/components/page-header";

const FunnelIcon = chakra(IoIosFunnel);

const PAGE_SIZE = 12;

const HomePage: NextPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const filters = useQueryFilters();
  const [search, setSearch] = useState("");
  const [useableSearch, setUseableSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [filtersToggled, setToggledFilters] = useState(false);
  const isBottom = usePageBottom();
  const [isLoading, setIsLoading] = useState(false);
  const { loading, error, data, fetchMore } = useRecipes(
    filters,
    useableSearch,
    offset,
    PAGE_SIZE,
  );

  const resetAndFetch = useCallback(() => {
    void fetchMore({
      variables: { limit: PAGE_SIZE, offset: 0 },
    });
    setOffset(0);
  }, [fetchMore, setOffset]);

  useEffect(() => {
    const recipesLength = data?.recipes.length ?? 0;

    const fetchMoreRecipes = async (): Promise<void> => {
      setIsLoading(true);
      await fetchMore({
        variables: { limit: PAGE_SIZE, offset: offset + PAGE_SIZE },
      });
      setOffset(offset + PAGE_SIZE);
      setIsLoading(false);
    };

    if (isBottom && offset <= recipesLength && !isLoading) {
      void fetchMoreRecipes();
    }
  }, [isBottom, fetchMore, setOffset, offset, data, isLoading]);

  const onEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        resetAndFetch();
        setUseableSearch(search);
      }
    },
    [resetAndFetch, setUseableSearch, search],
  );

  const content = error ? (
    <Error message={error.message} />
  ) : loading || !data?.recipes.length ? (
    <Loading />
  ) : (
    <>
      <ResultsList recipes={data.recipes} />
      {isLoading && <Loading />}
    </>
  );

  return (
    <Layout
      description={"Collection of recipes I've made"}
      title="Recipe Book"
      url={baseUrl}
    >
      <PageHeader text="Recipe Book" />
      <Container fontSize="lg" maxW="container.xl">
        <Stack pt={5}>
          <FormControl>
            <FormLabel htmlFor="search">{"Search"}</FormLabel>
            <HStack>
              <Input
                id="search"
                onChange={(e): void => {
                  setSearch(e.target.value);

                  if (e.target.value === "") {
                    setUseableSearch("");
                  }
                }}
                onKeyPress={onEnter}
                value={search}
              />
              <IconButton
                aria-label="search recipes"
                icon={<SearchIcon />}
                onClick={(): void => {
                  resetAndFetch();
                  setUseableSearch(search);
                }}
              />
              <IconButton
                aria-label="filter recipes"
                icon={<FunnelIcon />}
                isActive={filtersToggled}
                onClick={(): void => {
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
