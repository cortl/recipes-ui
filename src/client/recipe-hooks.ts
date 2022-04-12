import type { QueryResult } from "@apollo/client";
import { useQuery } from "@apollo/client";

import { GET_HOMEPAGE_RECIPES } from "./queries";

type RecipeResult = {
  recipes: Recipe[];
};

const useRecipes = (
  tags: string[],
  search: string,
  offset: number,
  limit: number
): QueryResult<RecipeResult> =>
  useQuery(GET_HOMEPAGE_RECIPES, {
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
        title: search
          ? {
              like: search,
            }
          : undefined,
        tags: tags
          ? {
              in: tags,
            }
          : undefined,
      },
    },
  });

export { useRecipes };
