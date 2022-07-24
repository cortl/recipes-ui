import { Box, useColorMode } from "@chakra-ui/react";
import type { ReactNode } from "react";

type ICard = {
  children: ReactNode;
};

const Card: React.FC<ICard> = ({ children }) => {
  const { colorMode } = useColorMode();

  const borderColor =
    colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300";

  return (
    <Box
      alignSelf="flex-start"
      border="1px"
      borderColor={borderColor}
      borderRadius="lg"
      maxW="sm"
      ml="auto"
      mr="auto"
      mt={5}
      overflow="hidden"
    >
      {children}
    </Box>
  );
};

export { Card };
