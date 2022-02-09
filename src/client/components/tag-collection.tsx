import { Box, TagProps } from "@chakra-ui/react";
import { Tag } from "./tag";

interface ITagCollection extends TagProps {
  id: string;
  tags: string[];
}

const TagCollection: React.FC<ITagCollection> = ({ tags, id, ...rest }) => (
  <Box display={"inline-block"}>
    {tags.map((tag) => (
      <Tag key={`${id}-${tag}`} {...rest}>
        {tag}
      </Tag>
    ))}
  </Box>
);

export { TagCollection };
