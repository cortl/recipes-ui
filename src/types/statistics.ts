import type { Recipe } from "./recipe";

type Year = {
  title: string;
  totalRecipesMade: number;
  averageRating: number;
  numberOfTopRatings: number;
  topRecipes: Recipe[];
};

type TagDistribution = {
  tag: string;
  count: number;
};

type TagRating = {
  tag: string;
  averageRating: number;
};

type SourceDistribution = {
  source: string;
  count: number;
};

type RecipeDistributionByTags = TagDistribution[];

type AverageRatingByTags = TagRating[];

type SourceDistributions = SourceDistribution[];

export type {
  Year,
  RecipeDistributionByTags,
  TagDistribution,
  AverageRatingByTags,
  SourceDistributions
};
