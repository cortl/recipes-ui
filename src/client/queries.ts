import { gql } from "@apollo/client";

const GET_HOMEPAGE_RECIPES = gql`
  query GetHomePageRecipes($where: RecipesWhere, $sort: Sort, $offset: Int!, $limit: Int!) {
    recipes(where: $where, sort: $sort, offset: $offset, limit: $limit) {
      title
      slug
      image
      tags
    }
  }
`;

export { GET_HOMEPAGE_RECIPES };
