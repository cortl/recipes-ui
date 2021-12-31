import { ApolloServer } from 'apollo-server-micro'
import type { NextApiRequest, NextApiResponse, PageConfig } from 'next'

import { typeDefs } from '../../graphql/types'
import { resolvers } from '../../graphql/resolvers';

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default handler;
