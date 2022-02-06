import { useRouter } from "next/router";
import type { NextPage } from "next";
import queryString from "query-string";

import { Layout } from "../src/client/components/layout";
import { Error } from "../src/client/components/error";
import { Loading } from "../src/client/components/loading";

import styles from "../styles/Home.module.css";
import { Button, ButtonGroup, filter, TagLeftIcon } from "@chakra-ui/react";
import { useRecipes } from "../src/client/recipe-hooks";

const BUTTONS = [
  "Vegan",
  "Vegetarian",
  "Poultry",
  "Fish",
  // "Beef",
  // "Pork",
  // "Drink",
  // "Soup",
  // "Appetizer",
  // "Quick",
  // "Salad",
  // "Sandwich",
  // "Pasta",
  // "Dinner",
  // "Dessert",
  // "Breakfast",
  // "Meal Prep",
  // "Topping",
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
    <>
      <ButtonGroup>
        {BUTTONS.map((tagName) => (
          <Button
            key={tagName}
            onClick={onTagClick(tagName)}
            isActive={filters.includes(tagName)}
          >
            {tagName}
          </Button>
        ))}
      </ButtonGroup>
      <ul>
        {data.recipes.map(({ title, slug }: Recipe) => {
          return <li key={slug}>{title}</li>;
        })}
      </ul>
    </>
  );

  return (
    <Layout
      title={"Recipe Book"}
      description={"Collection of recipes I've made"}
    >
      <h1 className={styles.title}>Recipes</h1>
      {content}
    </Layout>
  );
};

export default HomePage;
