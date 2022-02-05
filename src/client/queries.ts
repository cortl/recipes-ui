import { gql } from "@apollo/client";

const GET_HOMEPAGE_RECIPES = gql`
  query GetHomePageRecipes($where: RecipesWhere, $sort: Sort) {
    recipes(where: $where, sort: $sort) {
      title
      slug
    }
  }
`;

export { GET_HOMEPAGE_RECIPES };
