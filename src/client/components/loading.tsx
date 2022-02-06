import { Box, Center, Spinner } from "@chakra-ui/react";

const Loading: React.FC = () => (
  <Center m={12}>
    <Box minH={12}>
      <Spinner size="xl" />
    </Box>
  </Center>
);

export { Loading };
