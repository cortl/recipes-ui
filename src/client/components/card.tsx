import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ICard {
  children: ReactNode;
}

const Card: React.FC<ICard> = ({ children }) => {
  return (
    <Box
      borderRadius={"lg"}
      maxW={"sm"}
      overflow="hidden"
      border="1px"
      borderColor={"whiteAlpha.300"}
      alignSelf={"flex-start"}
      mt={5}
      mr="auto"
      ml="auto"
    >
      {children}
    </Box>
  );
};

export { Card };
