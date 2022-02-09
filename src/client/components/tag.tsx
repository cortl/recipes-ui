import { Badge, BadgeProps } from "@chakra-ui/react";

interface ITag extends BadgeProps {}

const Tag: React.FC<ITag> = ({ children, ...rest }) => {
  return (
    <Badge borderRadius="full" px="2" mr="1" {...rest}>
      {children}
    </Badge>
  );
};

export { Tag };
