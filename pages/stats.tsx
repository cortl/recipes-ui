import process from "process";

import type { GetStaticPropsResult, NextPage } from "next";
import Link from "next/link";
import {
  Box,
  Container,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  OrderedList,
  ListItem,
  Link as CLink,
  useColorMode,
} from "@chakra-ui/react";
import Recipes from "@cortl/recipes";

import { Layout } from "../src/client/components/layout";
import { PageHeader } from "../src/client/components/page-header";
import { byRating, calculateAverageFromField } from "../src/client/utils";

type YearStats = {
  year: string;
  totalRecipesMade: number;
  averageRating: number;
  numberOfTopRatings: number;
  topRecipes: Recipe[];
};

type StatsPageProps = {
  years: YearStats[];
};

type YearlyStatsProps = {
  year: YearStats;
};

const YearlyStats: React.FC<YearlyStatsProps> = ({ year }) => {
  const { colorMode } = useColorMode();

  const borderColor =
    colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300";

  return (
    <Box
      as="section"
      border="1px"
      borderColor={borderColor}
      borderRadius="lg"
      m="4"
      ml="auto"
      mr="auto"
      padding="4"
    >
      <Heading as="h2">{year.year}</Heading>
      <StatGroup>
        <Stat>
          <StatLabel>{"Total recipes made"}</StatLabel>
          <StatNumber>{year.totalRecipesMade}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>{"Average rating given:"}</StatLabel>
          <StatNumber>{year.averageRating}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>{"Number of 10s given:"}</StatLabel>
          <StatNumber>{year.totalRecipesMade}</StatNumber>
        </Stat>
      </StatGroup>
      <Box mt="2">
        <Heading as="h3" size="md">
          {"Top recipes made:"}
        </Heading>
        <OrderedList>
          {year.topRecipes.map((recipe) => (
            <ListItem key={`top-${recipe.slug}`}>
              <Link href={`/${recipe.slug}`} passHref>
                <CLink>{recipe.title}</CLink>
              </Link>
            </ListItem>
          ))}
        </OrderedList>
      </Box>
    </Box>
  );
};

const StatsPage: NextPage<StatsPageProps> = ({ years }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Layout description="Statistics" title="Statistics" url={baseUrl}>
      <PageHeader text="Statistics" />

      <Container fontSize="lg" maxW="container.xl">
        {years.map((year) => (
          <YearlyStats key={year.year} year={year} />
        ))}
      </Container>
    </Layout>
  );
};

const mapRecipesToYear = (recipes: Recipe[]): Record<number, Recipe[]> =>
  recipes
    .filter((recipe) => recipe.createdDate)
    .reduce<Record<number, Recipe[]>>((years, recipe) => {
      const year = new Date(recipe.createdDate).getFullYear();

      if (year in years) {
        years[year].push(recipe);
      } else {
        // eslint-disable-next-line no-param-reassign
        years[year] = [recipe];
      }

      return years;
    }, {});

const getStaticProps = (): GetStaticPropsResult<StatsPageProps> => {
  const recipesByYear = mapRecipesToYear(Recipes.asArray);

  const years = Object.keys(recipesByYear)
    .sort()
    .reverse()
    .map((year) => {
      const recipesInYear = recipesByYear[Number.parseInt(year)];

      return {
        averageRating: calculateAverageFromField<Recipe>(
          recipesInYear,
          "rating"
        ),
        numberOfTopRatings: recipesInYear.filter(
          (recipe) => recipe.rating === 10
        ).length,
        topRecipes: recipesInYear.sort(byRating).slice(0, 3),
        totalRecipesMade: recipesInYear.length,
        year,
      };
    });

  return {
    props: {
      years,
    },
  };
};

export { getStaticProps };

export default StatsPage;
