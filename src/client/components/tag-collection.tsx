import { Badge, Box } from "@chakra-ui/react";

interface ITagCollection {
  id: string;
  color: string;
  tags: string[];
}

const TagCollection: React.FC<ITagCollection> = ({ tags, id, color }) => (
  <Box display={"inline-block"}>
    {tags.map((tag) => (
      <Badge
        key={`${id}-${tag}`}
        borderRadius="full"
        px="2"
        mr="1"
        colorScheme={color}
      >
        {tag}
      </Badge>
    ))}
  </Box>
);

export { TagCollection };
