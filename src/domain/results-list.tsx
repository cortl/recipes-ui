import Masonry from "react-masonry-css";

import { RecipeCard } from "./recipe-card";

interface IResultsList {
  recipes: Recipe[];
}

const ResultsList: React.FC<IResultsList> = ({ recipes }) => {
  return (
    <Masonry
      breakpointCols={3}
      className="masonry"
      columnClassName="masonry-column"
    >
      {recipes.map(({ title, slug, image, tags }: Recipe) => (
        <RecipeCard key={slug} title={title} image={image} tags={tags} />
      ))}
    </Masonry>
  );
};

export { ResultsList };
