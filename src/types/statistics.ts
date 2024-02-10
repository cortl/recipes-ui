import type { Recipe } from "./recipe";

type TagDistribution = {
  tag: string;
  count: number;
};

type MonthlyBreakdown = {
  title: string
  totalRecipesMade: number;
  averageRating: number;
}

type YearStatistic = {
  title: string;
  totalRecipesMade: number;
  averageRating: number;
  numberOfTopRatings: number;
  favoriteTag: string
  tagDistribution: TagDistribution[];
  monthlyBreakdown: MonthlyBreakdown[];
  topRecipes: Recipe[];
};

type Statistics = {
  totalRecipesMade: number;
  averageRating: number;
  numberOfTopRatings: number;
  favoriteTag: string;
  years: YearStatistic[];
}

export type {
  TagDistribution,
  MonthlyBreakdown,
  YearStatistic,
  Statistics,
};
