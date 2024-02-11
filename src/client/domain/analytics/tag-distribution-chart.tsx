"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

import type { TagDistribution } from "../../../types/statistics";
import { getColorForTagType, getRecipeTagTypeForTag } from "../../colors";

const Chart = dynamic(async () => import("react-apexcharts"), { ssr: false });

type RecipeTagDistributionGraphProps = {
  readonly distributions: TagDistribution[];
};

const RecipeTagDistributionGraph: React.FC<RecipeTagDistributionGraphProps> = ({
  distributions,
}) => {
  const series = React.useMemo(() => {
    const stuff = distributions.reduce<ApexAxisChartSeries>(
      (acc, distribution) => {
        const { tag, count } = distribution;
        const tagType = getRecipeTagTypeForTag(tag);
        const color = tagType ? getColorForTagType(tagType) : "#00B5D8";

        acc.push({
          color,
          data: [count],
          name: tag,
        });

        return acc;
      },
      [],
    );

    return stuff;
  }, [distributions]);

  const options: ApexOptions = {
    chart: {
      offsetX: -10,
      stacked: true,
      stackType: "100%",
      toolbar: {
        show: false,
      },
      type: "bar",
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    series,
    stroke: {
      colors: ["#fff"],
      width: 1,
    },
    tooltip: {
      shared: false,
      y: {
        formatter: (val) => `${val} tag(s)`,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };

  return (
    <Chart
      height="150px"
      options={options}
      series={series}
      type="bar"
      width="100%"
    />
  );
};

export { RecipeTagDistributionGraph };
