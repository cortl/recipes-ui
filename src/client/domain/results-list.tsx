import Masonry from "react-masonry-css";

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
  return (
    <Masonry
      breakpointCols={responsiveBreakpoints}
      className="masonry"
      columnClassName="masonry-column"
    >
      {recipes.map(({ title, slug, image, tags }: Recipe, i) => (
        <RecipeCard
          key={`${i}-${slug}`}
          slug={slug}
          title={title}
          image={image}
          tags={tags}
        />
      ))}
    </Masonry>
  );
};

export { ResultsList };
