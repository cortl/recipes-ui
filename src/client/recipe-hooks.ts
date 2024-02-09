import type { QueryResult } from "@apollo/client";
import { useQuery } from "@apollo/client";

import type { GraphQLRecipe } from "../types/graphql";

import { GET_HOMEPAGE_RECIPES } from "./queries";

type RecipeResult = {
  recipes: GraphQLRecipe[];
};

const useRecipes = (
  tags: string[],
  search: string,
  offset: number,
  limit: number,
): QueryResult<RecipeResult> =>
  useQuery<RecipeResult>(GET_HOMEPAGE_RECIPES, {
    variables: {
      limit,
      offset,
      sort: {
        direction: "DESC",
        field: "rating",
      },
      where: {
        archived: {
          is: false,
        },
        tags: {
          in: tags,
        },
        title: search
          ? {
              like: search,
            }
          : undefined,
      },
    },
  });

export { useRecipes };
