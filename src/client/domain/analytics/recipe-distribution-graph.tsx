"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

import type { RecipeTagDistributionByYears } from "../../../types/statistics";

const Chart = dynamic(async () => import("react-apexcharts"), { ssr: false });

type RecipeDistributionGraphProps = {
  readonly distributions: RecipeTagDistributionByYears;
};

const RecipeDistributionGraph: React.FC<RecipeDistributionGraphProps> = ({
  distributions,
}) => {
  const series = React.useMemo(() => {
    const { tags, years } = distributions;

    return tags.map((tag) => {
      const data: number[] = years.map((year) => {
        const distribution = year.distributions.find((d) => d.tag === tag) ?? {
          percentOfTotal: 0,
        };

        return distribution.percentOfTotal;
      });

      return {
        data,
        name: tag,
      };
    });
  }, [distributions]);

  const options: ApexOptions = {
    chart: {
      stacked: true,
      stackType: "100%",
      toolbar: {
        show: false,
      },
      type: "bar",
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
    xaxis: {
      categories: distributions.years.map((year) => year.year),
    },
  };

  return <Chart options={options} series={series} type="bar" width="100%" />;
};

export { RecipeDistributionGraph };
