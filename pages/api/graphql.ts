import fs from "fs";

import { ApolloServer } from "apollo-server-micro";
import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { buildSchema } from "graphql";

import { resolvers } from "../../src/server/graphql/resolvers";

const SCHEMA_PATH = "src/server/graphql/types";

const typeDefs = buildSchema(
  fs
    .readdirSync(SCHEMA_PATH)
    .map((file) => fs.readFileSync(`${SCHEMA_PATH}/${file}`).toString())
    .join("\n")
);

const apolloServer = new ApolloServer({ resolvers, typeDefs });
const startServer = apolloServer.start();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
};

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default handler;
