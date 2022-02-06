import { useRouter } from "next/router";
import type { NextPage } from "next";
import queryString from "query-string";
import {
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  Heading,
  Stack,
  VStack,
} from "@chakra-ui/react";

import { Layout } from "../src/client/components/layout";
import { Error } from "../src/client/components/error";
import { Loading } from "../src/client/components/loading";
import { useRecipes } from "../src/client/recipe-hooks";
import { MEAL_TYPES, PROTEINS } from "../src/utils/tags";
import { RecipeCard } from "../src/domain/recipe-card";

const removeFromArray = (arr: string[], str: string) => {
  const index = arr.indexOf(str);
  if (index > -1) {
    arr.splice(index, 1);
  }
};

const HomePage: NextPage = () => {
  const router = useRouter();

  const queryFilters = router.query.filters;
  const filters = queryFilters
    ? Array.isArray(queryFilters)
      ? queryFilters
      : [queryFilters]
    : [];

  const onTagClick = (tag: string) => () => {
    let newFilters = [...filters];

    if (!newFilters.includes(tag)) {
      newFilters.push(tag);
    } else {
      removeFromArray(newFilters, tag);
    }

    router.push(
      `/?${queryString.stringify({
        filters: newFilters,
      })}`,
      undefined,
      {
        shallow: true,
      }
    );
  };

  const { loading, error, data } = useRecipes(filters);

  const content = loading ? (
    <Loading />
  ) : error ? (
    <Error message={error.message} />
  ) : (
    <Flex flexFlow={"wrap"} justifyContent={"space-around"}>
      {data.recipes.map(({ title, slug, image, tags }: Recipe) => (
        <RecipeCard key={slug} title={title} image={image} tags={tags} />
      ))}
    </Flex>
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
          <Heading size="md">{"Protein"}</Heading>
          <ButtonGroup alignItems="left" variant={"outline"}>
            {PROTEINS.map((tagName) => (
              <Button
                key={tagName}
                onClick={onTagClick(tagName)}
                isActive={filters.includes(tagName)}
              >
                {tagName}
              </Button>
            ))}
          </ButtonGroup>
          <Heading size="md">{"Meal"}</Heading>
          <ButtonGroup alignItems="left" variant={"outline"}>
            {MEAL_TYPES.map((tagName) => (
              <Button
                key={tagName}
                onClick={onTagClick(tagName)}
                isActive={filters.includes(tagName)}
              >
                {tagName}
              </Button>
            ))}
          </ButtonGroup>
        </Stack>
        {content}
      </Container>
    </Layout>
  );
};

export default HomePage;
