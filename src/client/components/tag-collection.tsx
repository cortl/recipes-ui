import type { TagProps } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

import { Tag } from "./tag";

type ITagCollection = TagProps & {
  id: string;
  slug?: string;
  tags: string[];
};

const TagCollection: React.FC<ITagCollection> = ({
  tags,
  slug,
  id,
  ...rest
}) => (
  <Box display="inline-block">
    {tags.map((tag) =>
      slug ? (
        <Link href={`/?filters=${tag}`} key={`${id}-${tag}`}>
          <Tag {...rest}>{tag}</Tag>
        </Link>
      ) : (
        <Tag key={`${id}-${tag}`} {...rest}>
          {tag}
        </Tag>
      ),
    )}
  </Box>
);

export { TagCollection };
