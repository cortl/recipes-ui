import { useQuery } from "@apollo/client";
import type { NextPage } from "next";

import { Layout } from "../src/client/components/layout";
import { GET_HOMEPAGE_RECIPES } from "../src/client/queries";

import styles from "../styles/Home.module.css";

const HomePage: NextPage = () => {
  const { loading, error, data } = useQuery(GET_HOMEPAGE_RECIPES, {
    variables: {
      where: {
        archived: {
          is: false,
        },
      },
      sort: {
        field: "rating",
        direction: "DESC",
      },
    },
  });

  const content = loading ? (
    <p>{"Loading..."}</p>
  ) : error ? (
    <p>{`Error! ${error.message}`}</p>
  ) : (
    <ul>
      {data.recipes.map(({ title, slug }: Recipe) => {
        return <li key={slug}>{title}</li>;
      })}
    </ul>
  );

  return (
    <Layout
      title={"Recipe Book"}
      description={"Collection of recipes I've made"}
    >
      <h1 className={styles.title}>Recipes</h1>
      {content}
    </Layout>
  );
};

export default HomePage;
