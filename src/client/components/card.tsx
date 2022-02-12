import { Box, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ICard {
  children: ReactNode;
}

const Card: React.FC<ICard> = ({ children }) => {
  const { colorMode } = useColorMode();

  const borderColor =
    colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300";

  return (
    <Box
      borderRadius={"lg"}
      maxW={"sm"}
      overflow="hidden"
      border="1px"
      borderColor={borderColor}
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
