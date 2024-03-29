import type { AppProps } from "next/app";
import type { ReactNode } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  defaultDataIdFromObject,
} from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../src/client/theme";
import { useServiceWorker } from "../src/client/hooks/use-service-worker";
import type { Recipe } from "../src/types/recipe";
import "../styles/globals.css";

const client = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: (responseObject): string | undefined => {
      switch (responseObject.__typename) {
        case "Recipe":
          return `Recipe:${responseObject.slug}`;
        default:
          return defaultDataIdFromObject(responseObject);
      }
    },
    typePolicies: {
      Query: {
        fields: {
          recipes: {
            merge: (existing: Recipe[] = [], added: Recipe[]): Recipe[] => [
              ...existing,
              ...added,
            ],
          },
        },
      },
    },
  }),
  uri: "/api/graphql",
});

const App = ({ Component, pageProps }: AppProps): ReactNode => {
  useServiceWorker();

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default App;
