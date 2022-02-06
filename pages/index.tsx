import { useRouter } from "next/router";
import type { NextPage } from "next";
import queryString from "query-string";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  VStack,
} from "@chakra-ui/react";

import { Layout } from "../src/client/components/layout";
import { Error } from "../src/client/components/error";
import { Loading } from "../src/client/components/loading";
import { useRecipes } from "../src/client/recipe-hooks";

// const BUTTONS = [

// "Thanksgiving",
// "Christmas",
// "Super Bowl",
// "Baking",
// "Roasting",
// "Frying",
// "Slow Cooker",
// "Braising & Stewing",
// "No Cook",
// "Stovetop",
// "Fermenting",
// "Pressure Cooker",
// "Seasoning Blend",
// "Grilling",
// ];

const PROTEIN_BUTTONS = [
  "Vegan",
  "Vegetarian",
  "Poultry",
  "Fish",
  "Beef",
  "Pork",
];

const MEAL_TYPE_BUTTONS = [
  "Soup",
  "Salad",
  "Sandwich",
  "Pasta",
  "Dinner",
  "Dessert",
  "Breakfast",
  "Meal Prep",
  "Topping",
];

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
    <ul>
      {data.recipes.map(({ title, slug }: Recipe) => {
        return <li key={slug}>{title}</li>;
      })}
    </ul>
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

      <Container maxW={"container.md"}>
        <Stack pt={5}>
          <Heading size="md">{"Protein"}</Heading>
          <ButtonGroup alignItems="left" variant={"outline"}>
            {PROTEIN_BUTTONS.map((tagName) => (
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
            {MEAL_TYPE_BUTTONS.map((tagName) => (
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

const Thing = (
  <Box
    w={"100%"}
    borderRadius={"lg"}
    border="1px"
    borderColor={"whiteAlpha.300"}
    padding={3}
    mt={5}
  >
    <Stack></Stack>
  </Box>
);

export default HomePage;
