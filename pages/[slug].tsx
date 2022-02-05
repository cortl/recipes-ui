import type { NextPage } from "next";
import Recipes from "@cortl/recipes";
import { Layout } from "../src/client/components/layout";

interface IRecipePage {
  title: string;
}

const Recipe: NextPage<IRecipePage> = ({ title }) => {
  return (
    <Layout title={`${title} | Recipes`} description={'a recipe.'}>
      <h1>{title}</h1>
    </Layout>
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
