import type { BadgeProps } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";

type ITag = BadgeProps & {}

const Tag: React.FC<ITag> = ({ children, ...rest }) => (
    <Badge borderRadius="full" mr="1" px="2" {...rest}>
      {children}
    </Badge>
  );

export { Tag };
