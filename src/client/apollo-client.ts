import type { NormalizedCacheObject } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = (
  graphqlUrl: string,
): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    cache: new InMemoryCache(),
    uri: graphqlUrl,
  });

export { createApolloClient };
