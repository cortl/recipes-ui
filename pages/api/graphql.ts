import { ApolloServer } from "apollo-server-micro";
import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import fs from "fs";

import { resolvers } from "../../src/server/graphql/resolvers";
import { buildSchema } from "graphql";

const SCHEMA_PATH = "src/server/graphql/types";

const typeDefs = buildSchema(
  fs
    .readdirSync(SCHEMA_PATH)
    .map((file) => fs.readFileSync(`${SCHEMA_PATH}/${file}`).toString())
    .join("\n")
);

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
};

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default handler;
