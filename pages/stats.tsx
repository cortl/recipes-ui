import process from "process";

import type { GetServerSideProps, NextPage } from "next";
import {
  Container,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  useColorMode,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

import { Layout } from "../src/client/components/layout";
import { PageHeader } from "../src/client/components/page-header";
import type { Statistics, YearStatistic } from "../src/types/statistics";
import { GET_STATISTICS } from "../src/client/queries";
import { createApolloClient } from "../src/client/apollo-client";
import { RecipeTagDistributionGraph } from "../src/client/domain/analytics/tag-distribution-chart";
import { RecipesMadeChart } from "../src/client/domain/analytics/recipes-made-chart";
import { ResultsList } from "../src/client/domain/results-list";

type StatsPageProps = {
  statistics: Statistics;
};

type GeneralStatProps = Pick<
  Statistics,
  "averageRating" | "favoriteTag" | "numberOfTopRatings" | "totalRecipesMade"
>;

const GeneralStats: React.FC<GeneralStatProps> = ({
  totalRecipesMade,
  averageRating,
  numberOfTopRatings,
  favoriteTag,
}) => {
  const { colorMode } = useColorMode();

  const borderColor =
    colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300";

  return (
    <StatGroup
      border="1px"
      borderColor={borderColor}
      borderRadius="lg"
      ml="auto"
      mr="auto"
      padding="5"
    >
      <Stat>
        <StatLabel>{"Total recipes made"}</StatLabel>
        <StatNumber>{totalRecipesMade}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>{"Average rating"}</StatLabel>
        <StatNumber>{averageRating}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>{"Number of top ratings"}</StatLabel>
        <StatNumber>{numberOfTopRatings}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>{"Favorite category"}</StatLabel>
        <StatNumber>{favoriteTag}</StatNumber>
      </Stat>
    </StatGroup>
  );
};

type YearStatsProps = YearStatistic;

const YearStats: React.FC<YearStatsProps> = (year) => {
  const { title, tagDistribution, monthlyBreakdown, topRecipes } = year;

  return (
    <TabPanel>
      <Heading as="h2" mb="5" mt="5" size="lg">
        {title}
      </Heading>
      <GeneralStats {...year} />
      <Heading as="h3" mt="5" size="md">
        {"Top Tags"}
      </Heading>
      <RecipeTagDistributionGraph distributions={tagDistribution} />
      <Heading as="h3" mt="5" size="md">
        {"Recipes made"}
      </Heading>
      <RecipesMadeChart monthlyBreakdown={monthlyBreakdown} />
      <Heading as="h3" mt="5" size="md">
        {"Top Recipes"}
      </Heading>
      <ResultsList recipes={topRecipes} />
    </TabPanel>
  );
};

const StatsPage: NextPage<StatsPageProps> = ({ statistics }) => {
  const { colorMode } = useColorMode();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const borderColor =
    colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300";

  return (
    <Layout description="Statistics" title="Statistics" url={baseUrl}>
      <PageHeader text="Statistics" />

      <Container fontSize="lg" maxW="container.xl">
        <GeneralStats {...statistics} />
        <Tabs
          border="1px"
          borderColor={borderColor}
          borderRadius="lg"
          mt="8"
          padding="5"
          variant="soft-rounded"
        >
          <TabList>
            {statistics.years.map((year) => (
              <Tab key={year.title}>{year.title}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {statistics.years.map((year) => (
              <YearStats key={`year-${year.title}-stats`} {...year} />
            ))}
          </TabPanels>
        </Tabs>
      </Container>
    </Layout>
  );
};

type StatisticsResponse = {
  statistics: Statistics;
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
      statistics: data.statistics,
    },
  };
}) satisfies GetServerSideProps<StatsPageProps>;

export { getServerSideProps };

export default StatsPage;
