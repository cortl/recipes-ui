import process from "process";

import type { GetServerSideProps, NextPage } from "next";
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
  useColorMode,
} from "@chakra-ui/react";
import { Link, Card } from "@chakra-ui/next-js";

import { Layout } from "../src/client/components/layout";
import { PageHeader } from "../src/client/components/page-header";
import type {
  RecipeTagDistributionByYears,
  Year,
} from "../src/types/statistics";
import { GET_STATISTICS } from "../src/client/queries";
import { createApolloClient } from "../src/client/apollo-client";
import { RecipeDistributionGraph } from "../src/client/domain/analytics/recipe-distribution-graph";

type StatsPageProps = {
  years: Year[];
  recipeDistributionByTags: RecipeTagDistributionByYears;
};

type YearlyStatsProps = {
  year: Year;
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
      <Heading as="h2">{year.title}</Heading>
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
              <Link href={`/${recipe.slug}`}>{recipe.title}</Link>
            </ListItem>
          ))}
        </OrderedList>
      </Box>
    </Box>
  );
};

const StatsPage: NextPage<StatsPageProps> = ({
  years,
  recipeDistributionByTags,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Layout description="Statistics" title="Statistics" url={baseUrl}>
      <PageHeader text="Statistics" />

      <Container fontSize="lg" maxW="container.xl">
        <RecipeDistributionGraph distributions={recipeDistributionByTags} />
        {years.map((year) => (
          <YearlyStats key={year.title} year={year} />
        ))}
      </Container>
    </Layout>
  );
};

type StatisticsResponse = {
  statistics: {
    years: Year[];
    recipeTagDistributionByYears: RecipeTagDistributionByYears;
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getServerSideProps = (async (context) => {
  const { req } = context;

  const protocol = req.headers["x-forwarded-proto"] ?? "http";
  const host = req.headers.host;
  const graphqlUrl = `${protocol}://${host}/api/graphql`;

  const client = createApolloClient(graphqlUrl);

  const { data } = await client.query<StatisticsResponse>({
    query: GET_STATISTICS,
  });

  return {
    props: {
      recipeDistributionByTags: data.statistics.recipeTagDistributionByYears,
      years: data.statistics.years,
    },
  };
}) satisfies GetServerSideProps<StatsPageProps>;

export { getServerSideProps };

export default StatsPage;
