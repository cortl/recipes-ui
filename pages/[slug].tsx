import type { NextPage } from "next";
import Recipes from "@cortl/recipes";

interface IRecipePage {
  title: string;
}

const Recipe: NextPage<IRecipePage> = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};

type Params = {
  params: {
    slug: string;
  };
};

const getStaticProps = async (context: Params) => {
  const {
    params: { slug },
  } = context;

  return {
    props: Recipes.asMap[slug],
  };
};

const getStaticPaths = async () => {
  const slugs = Recipes.asArray.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths: slugs,
    fallback: false,
  };
};

export { getStaticProps, getStaticPaths };

export default Recipe;
