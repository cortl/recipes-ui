import React from "react";
import { Heading, TabPanel } from "@chakra-ui/react";

import type { YearStatistic } from "../../../types/statistics";
import { ResultsList } from "../results-list";

import { StatsOverview } from "./stats-overview";
import { RecipeTagDistributionGraph } from "./tag-distribution-chart";
import { RecipesMadeChart } from "./recipes-made-chart";

type YearStatsProps = YearStatistic;

const YearStats: React.FC<YearStatsProps> = (year) => {
  const {
    title,
    holidayDistribution,
    mealTypeDistribution,
    methodsDistribution,
    proteinDistribution,
    monthlyBreakdown,
    topRecipes,
  } = year;

  return (
    <TabPanel>
      <Heading as="h2" mb="5" mt="5" size="lg">
        {title}
      </Heading>
      <StatsOverview {...year} />
      {methodsDistribution.length && (
        <>
          <Heading as="h3" mt="3" size="md">
            {"Methods"}
          </Heading>
          <RecipeTagDistributionGraph distributions={methodsDistribution} />
        </>
      )}
      {mealTypeDistribution.length && (
        <>
          <Heading as="h3" mt="3" size="md">
            {"Courses"}
          </Heading>
          <RecipeTagDistributionGraph distributions={mealTypeDistribution} />
        </>
      )}
      {proteinDistribution.length && (
        <>
          <Heading as="h3" mt="3" size="md">
            {"Proteins"}
          </Heading>
          <RecipeTagDistributionGraph distributions={proteinDistribution} />
        </>
      )}
      {holidayDistribution.length && (
        <>
          <Heading as="h3" mt="3" size="md">
            {"Holidays"}
          </Heading>
          <RecipeTagDistributionGraph distributions={holidayDistribution} />
        </>
      )}
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

export { YearStats };
