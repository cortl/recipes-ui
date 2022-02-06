import { useQuery } from "@apollo/client";
import { GET_HOMEPAGE_RECIPES } from "./queries";

const useRecipes = (tags: string[]) => {
  return useQuery(GET_HOMEPAGE_RECIPES, {
    variables: {
      where: {
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
    },
  });
};

export { useRecipes };
