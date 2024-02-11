"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

import type { TagDistribution } from "../../../types/statistics";
// import { getColorForTagType, getRecipeTagTypeForTag } from "../../colors";

const Chart = dynamic(async () => import("react-apexcharts"), { ssr: false });

type RecipeTagDistributionGraphProps = {
  readonly distributions: TagDistribution[];
};

type Series = { name: string; data: number[] };

const RecipeTagDistributionGraph: React.FC<RecipeTagDistributionGraphProps> = ({
  distributions,
}) => {
  const series = React.useMemo(() => {
    const stuff = distributions.reduce<Series[]>((acc, distribution) => {
      acc.push({
        data: [distribution.count],
        name: distribution.tag,
      });

      return acc;
    }, []);

    return stuff;
  }, [distributions]);

  // TODO
  // const colors = series.map((distributionSeries) => {
  //   const { name } = distributionSeries;
  //   const tagType = getRecipeTagTypeForTag(name);

  //   if (!tagType) {
  //     return "gray";
  //   }

  //   const color = getColorForTagType(tagType);

  //   return color;
  // });

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
