import type { AppProps } from "next/app";
import type { ReactNode } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../src/client/theme";
import { usePageChange } from "../src/client/hooks/use-page-change";
import { useServiceWorker } from "../src/client/hooks/use-service-worker";
import type { Recipe } from "../types/recipe";
import "../styles/globals.css";

const client = new ApolloClient({
  cache: new InMemoryCache({
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

const MyApp = ({ Component, pageProps }: AppProps): ReactNode => {
  usePageChange();
  useServiceWorker();

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
