"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

import type { MonthlyBreakdown } from "../../../types/statistics";

const Chart = dynamic(async () => import("react-apexcharts"), { ssr: false });

type RecipesMadeChartProps = {
  readonly monthlyBreakdown: MonthlyBreakdown[];
};

const RecipesMadeChart: React.FC<RecipesMadeChartProps> = ({
  monthlyBreakdown,
}) => {
  const months = monthlyBreakdown.map((breakdown) => breakdown.title);
  const options: ApexOptions = {
    chart: {
      stacked: false,
      toolbar: {
        show: false,
      },
      type: "area",
    },
    colors: ["#3182CE"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: ["#90CDF4"],
      type: "solid",
    },
    markers: {
      size: 0,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: (val) => `${val} recipes`,
      },
    },
    xaxis: {
      categories: months,
    },
    yaxis: {
      opposite: true,
    },
  };

  const series = [
    {
      data: monthlyBreakdown.map((breakdown) => breakdown.totalRecipesMade),
      name: "Total Recipes",
    },
  ];

  return (
    <Chart
      height="350px"
      options={options}
      series={series}
      type="area"
      width="100%"
    />
  );
};

export { RecipesMadeChart };
