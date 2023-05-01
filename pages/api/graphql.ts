import fs from "node:fs";

import { createSchema, createYoga } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { buildSchema } from "graphql";

import { resolvers } from "../../src/server/graphql/resolvers";

const SCHEMA_PATH = "src/server/graphql/types";

const typeDefs = buildSchema(
  fs
    .readdirSync(SCHEMA_PATH)
    .map((file) => fs.readFileSync(`${SCHEMA_PATH}/${file}`).toString())
    .join("\n")
);

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  graphqlEndpoint: "/api/graphql",
  schema: createSchema({
    resolvers,
    typeDefs,
  }),
});
