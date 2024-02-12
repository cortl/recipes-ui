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
      image {
        url
        height
        width
      }
      holidays
      methods
      proteins
      mealTypes
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

const GET_RECIPE_QUERY = gql`
  query GetRecipe($slug: String!) {
    recipe(slug: $slug) {
      title
      title
      servings
      rating
      slug
      source {
        url
        name
      }
      createdDate
      instructions
      notes
      archived
      ingredients {
        category
        items
      }
      holidays
      methods
      proteins
      mealTypes
      time {
        label
        units {
          label
          measurement
        }
      }
      image {
        url
        height
        width
      }
      relatedRecipes {
        title
        slug
        holidays
        methods
        proteins
        mealTypes
        time {
          label
          units {
            label
            measurement
          }
        }
        image {
          url
          height
          width
        }
      }
    }
  }
`;

const GET_STATISTICS = gql`
  query GetStatistics {
    statistics {
      averageRating
      numberOfTopRatings
      totalRecipesMade
      favoriteTag
      years {
        title
        totalRecipesMade
        averageRating
        numberOfTopRatings
        favoriteTag
        topRecipes {
          title
          slug
          holidays
          methods
          proteins
          mealTypes
          time {
            label
            units {
              label
              measurement
            }
          }
          image {
            url
            height
            width
          }
        }
        tagDistribution {
          tag
          count
        }
        holidayDistribution {
          tag
          count
        }
        methodsDistribution {
          tag
          count
        }
        proteinDistribution {
          tag
          count
        }
        mealTypeDistribution {
          tag
          count
        }
        monthlyBreakdown {
          title
          totalRecipesMade
          averageRating
        }
      }
    }
  }
`;

export { GET_HOMEPAGE_RECIPES, GET_RECIPE_QUERY, GET_STATISTICS };
