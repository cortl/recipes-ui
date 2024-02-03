import process from "process";

import type { GetServerSideProps, NextPage } from "next";
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

import { Layout } from "../src/client/components/layout";
import { PageHeader } from "../src/client/components/page-header";
import type { Year } from "../types/statistics";
import { GET_STATISTICS } from "../src/client/queries";
import { createApolloClient } from "../src/client/apollo-client";

type StatsPageProps = {
  years: Year[];
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
          <YearlyStats key={year.title} year={year} />
        ))}
      </Container>
    </Layout>
  );
};

type StatisticsResponse = {
  statistics: {
    years: Year[];
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
      years: data.statistics.years,
    },
  };
}) satisfies GetServerSideProps<StatsPageProps>;

export { getServerSideProps };

export default StatsPage;
