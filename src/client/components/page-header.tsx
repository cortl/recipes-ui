import { Center, Heading, VStack } from "@chakra-ui/react";

interface IPageHeader {
    text: string;
}

const PageHeader: React.FC<IPageHeader> = ({ text }) => (
  <VStack mt={24} mb={2}>
    <Center>
      <Heading as="h1" size="4xl" textAlign={'center'}>
        {text}
      </Heading>
    </Center>
  </VStack>
);

export {PageHeader}