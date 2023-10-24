import type { TagProps } from "@chakra-ui/react";
import { Box, Link as CLink } from "@chakra-ui/react";
import Link from "next/link";

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
        <Link href={`/?filters=${tag}`} key={`${id}-${tag}`} passHref>
          <CLink>
            <Tag {...rest}>{tag}</Tag>
          </CLink>
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
