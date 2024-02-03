import type { QueryResult } from "@apollo/client";
import { useQuery } from "@apollo/client";

import type { Recipe } from "../../types/recipe";

import { GET_HOMEPAGE_RECIPES } from "./queries";

type RecipeResult = {
  recipes: Recipe[];
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
