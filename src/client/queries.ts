import { gql } from "@apollo/client";

const GET_HOMEPAGE_RECIPES = gql`
  query GetHomePageRecipes(
    $where: RecipesWhere
    $sort: Sort
    $offset: Int!
    $limit: Int!
  ) {
    recipes(where: $where, sort: $sort, offset: $offset, limit: $limit)
      @connection(key: "recipes", filter: ["where"]) {
      title
      slug
      image
      tags
      time {
        label
        units {
          label
          measurement
        }
      }
    }
  }
`;

export { GET_HOMEPAGE_RECIPES };
