import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

interface HomeProps {
  recipes: Recipe[];
}

const Home: NextPage<HomeProps> = ({ recipes }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Recipe Book</title>
        <meta name="description" content="Collection of recipes I've made" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Recipes</h1>
        <ul>
          {recipes.map(({ title }: Recipe) => {
            return <li>{title}</li>;
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a href="https://cortlan.dev" target="_blank" rel="noopener noreferrer">
          Built with 💖 by Cortlan Bainbridge
        </a>
      </footer>
    </div>
  );
};

const getStaticProps = async () => {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetHomePageRecipes($where: RecipesWhere, $sort: Sort) {
        recipes(where: $where, sort: $sort) {
          title
          slug
        }
      }
    `,
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

  return { props: { recipes: data.recipes } };
};

export { getStaticProps };

export default Home;
