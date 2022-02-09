import Masonry from "react-masonry-css";
import { Center, Text } from "@chakra-ui/react";

import { RecipeCard } from "./recipe-card";

interface IResultsList {
  recipes: Recipe[];
}

const responsiveBreakpoints = {
  default: 3,
  768: 2,
  480: 1,
};

const ResultsList: React.FC<IResultsList> = ({ recipes }) => {
  if (recipes && recipes.length) {
    return (
      <Masonry
        breakpointCols={responsiveBreakpoints}
        className="masonry"
        columnClassName="masonry-column"
      >
        {recipes.map(({ title, slug, image, tags, time }: Recipe, i) => (
          <RecipeCard
            key={`${i}-${slug}`}
            slug={slug}
            title={title}
            image={image}
            tags={tags}
            time={time}
          />
        ))}
      </Masonry>
    );
  } else {
    return (
      <Center pt='5'>
        <Text>{"Looks like there isn't anything here... 😿"}</Text>
      </Center>
    );
  }
};

export { ResultsList };
