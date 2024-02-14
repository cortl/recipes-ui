import React from "react";
import { Heading, TabPanel } from "@chakra-ui/react";

import type { YearStatistic } from "../../../types/statistics";
import { ResultsList } from "../results-list";

import { StatsOverview } from "./stats-overview";
import { RecipeTagDistributionGraph } from "./tag-distribution-chart";
import { RecipesMadeChart } from "./recipes-made-chart";

type YearStatsProps = YearStatistic;

const DISTRIBUTIONS = [
  { key: "methodsDistribution", text: "Methods" },
  { key: "mealTypeDistribution", text: "Courses" },
  { key: "proteinDistribution", text: "Proteins" },
  { key: "holidayDistribution", text: "Holidays" },
];

const YearStats: React.FC<YearStatsProps> = (year) => {
  const { title, monthlyBreakdown, topRecipes } = year;

  return (
    <TabPanel padding={{ base: 0, md: 4 }}>
      <Heading as="h2" mb="5" mt="5" size="lg">
        {title}
      </Heading>
      <StatsOverview {...year} />
      {DISTRIBUTIONS
        // @ts-expect-error this is fine
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .filter(({ key }) => Boolean(year[key].length))
        .map(({ key, text }) => (
          <>
            <Heading as="h3" mt="3" size="md">
              {text}
            </Heading>
            <RecipeTagDistributionGraph
              // @ts-expect-error this is fine
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              distributions={year[key]}
              key={key}
            />
          </>
        ))}
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
