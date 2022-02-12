import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../src/client/theme";
import { usePageChange } from "../src/client/hooks/usePageChange";

import "../styles/globals.css";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          recipes: {
            merge: (existing = [], added) => {
              return [...existing, ...added];
            },
          },
        },
      },
    },
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  usePageChange();

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
