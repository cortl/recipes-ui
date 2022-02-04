import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { image } = req.query;

  const path = `./node_modules/@cortl/recipes/images/${image}`;
  const fileExists = fs.existsSync(path);

  if (fileExists) {
    const foundImage = fs.readFileSync(path);

    console.log(foundImage);
    res.status(200).write(foundImage);
    res.end();
  } else {
    res.status(404).send("Not Found");
  }
};

export default handler;
