import Masonry from "react-masonry-css";
import { Center, Text } from "@chakra-ui/react";

import type { GraphQLRecipe } from "../../types/graphql";

import { RecipeCard } from "./recipe-card";

type IResultsList = {
  recipes?: GraphQLRecipe[];
};

const responsiveBreakpoints = {
  480: 1,
  768: 2,
  default: 3,
};

const ResultsList: React.FC<IResultsList> = ({ recipes }) => {
  if (recipes?.length) {
    return (
      <Masonry
        breakpointCols={responsiveBreakpoints}
        className="masonry"
        columnClassName="masonry-column"
      >
        {recipes.map((recipe, i) => (
          <RecipeCard key={`${i}-${recipe.slug}`} {...recipe} />
        ))}
      </Masonry>
    );
  }

  return (
    <Center pt="5">
      <Text>{"Looks like there isn't anything here... 😿"}</Text>
    </Center>
  );
};

export { ResultsList };
