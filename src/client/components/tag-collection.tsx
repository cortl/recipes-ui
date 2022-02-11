import { Box, TagProps, Link as CLink } from "@chakra-ui/react";
import Link from "next/link";

import { Tag } from "./tag";

interface ITagCollection extends TagProps {
  id: string;
  slug?: string;
  tags: string[];
}

const TagCollection: React.FC<ITagCollection> = ({
  tags,
  slug,
  id,
  ...rest
}) => (
  <Box display={"inline-block"}>
    {tags.map((tag) => {
      const createdTag = (
        <Tag key={`${id}-${tag}`} {...rest}>
          {tag}
        </Tag>
      );

      return slug ? (
        <Link href={`/?filters=${tag}`} passHref>
          <CLink>{createdTag}</CLink>
        </Link>
      ) : (
        createdTag
      );
    })}
  </Box>
);

export { TagCollection };
