import fs from "fs";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const { image } = req.query;

  const path = `./node_modules/@cortl/recipes/images/${image}`;
  const fileExists = fs.existsSync(path);

  if (fileExists) {
    const foundImage = fs.readFileSync(path);

    res.status(200).write(foundImage);
    res.end();
  } else {
    res.status(404).send("Not Found");
  }
};

export default handler;
