"use client";

import React from "react";
import dynamic from "next/dynamic";

import type { RecipeDistributionByTags } from "../../../types/statistics";

const Chart = dynamic(async () => import("react-apexcharts"), { ssr: false });

type RecipeDistributionGraphProps = {
  readonly distributions: RecipeDistributionByTags;
};

const RecipeDistributionGraph: React.FC<RecipeDistributionGraphProps> = ({
  distributions,
}) => {
  const [labels, series] = React.useMemo(() => {
    const total = distributions.reduce((acc, distribution) => {
      // eslint-disable-next-line no-param-reassign
      acc += distribution.count;

      return acc;
    }, 0);

    const labelsValues = distributions
      .slice(0, 5)
      .map((distribution) => distribution.tag);
    const seriesValues = distributions
      .slice(0, 5)
      .map((distribution) => distribution.count);

    return [labelsValues, seriesValues];
  }, [distributions]);

  const options = {
    chart: {
      type: "donut",
    },
    labels,
  };

  return (
    <div className="donut">
      <Chart options={options} series={series} type="bar" width="500" />
    </div>
  );
};

export { RecipeDistributionGraph };
