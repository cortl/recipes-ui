import process from "process";

import type { GetServerSideProps, NextPage } from "next";
import {
  Container,
  useColorMode,
  Tabs,
  TabList,
  Tab,
  TabPanels,
} from "@chakra-ui/react";
import React from "react";

import { Layout } from "../src/client/components/layout";
import { PageHeader } from "../src/client/components/page-header";
import type { Statistics } from "../src/types/statistics";
import { GET_STATISTICS } from "../src/client/queries";
import { createApolloClient } from "../src/client/apollo-client";
import { StatsOverview } from "../src/client/domain/statistics/stats-overview";
import { YearStats } from "../src/client/domain/statistics/year-stats-tab";

type StatsPageProps = {
  statistics: Statistics;
};

const StatsPage: NextPage<StatsPageProps> = ({ statistics }) => {
  const { colorMode } = useColorMode();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { years } = statistics;
  const borderColor =
    colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300";

  return (
    <Layout description="Statistics" title="Statistics" url={baseUrl}>
      <PageHeader text="Statistics" />

      <Container fontSize="lg" maxW="container.xl">
        <StatsOverview {...statistics} />
        <Tabs
          border="1px"
          borderColor={borderColor}
          borderRadius="lg"
          mt="8"
          padding={{ base: 2, md: 4 }}
          variant="soft-rounded"
        >
          <TabList overflowX="auto" pb="2">
            {years.map((year) => (
              <Tab key={year.title}>{year.title}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {years.map((year) => (
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
