import type { BoxProps } from "@chakra-ui/react";
import { Center, Heading, VStack } from "@chakra-ui/react";

type IPageHeader = BoxProps & {
  text: string;
};

const PageHeader: React.FC<IPageHeader> = ({ text, ...rest }) => (
  <VStack mb={12} mt={12} {...rest}>
    <Center>
      <Heading as="h1" size="4xl" textAlign="center">
        {text}
      </Heading>
    </Center>
  </VStack>
);

export { PageHeader };
