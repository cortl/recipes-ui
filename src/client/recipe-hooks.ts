import { useQuery } from "@apollo/client";
import { GET_HOMEPAGE_RECIPES } from "./queries";

const useRecipes = (tags: string[], search: string, offset: number, limit: number) => {
  return useQuery(GET_HOMEPAGE_RECIPES, {
    variables: {
      where: {
        title: search
          ? {
              like: search,
            }
          : undefined,
        archived: {
          is: false,
        },
        tags: tags
          ? {
              in: tags,
            }
          : undefined,
      },
      sort: {
        field: "rating",
        direction: "DESC",
      },
      offset,
      limit
    },
  });
};

export { useRecipes };
