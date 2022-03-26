import { BoxProps, Center, Heading, VStack } from "@chakra-ui/react";

interface IPageHeader extends BoxProps {
  text: string;
}

const PageHeader: React.FC<IPageHeader> = ({ text, ...rest }) => (
  <VStack mt={12} mb={12} {...rest}>
    <Center>
      <Heading as="h1" size="4xl" textAlign={"center"}>
        {text}
      </Heading>
    </Center>
  </VStack>
);

export { PageHeader };
