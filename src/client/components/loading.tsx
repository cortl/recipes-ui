import { Box, Spinner } from "@chakra-ui/react";

const Loading: React.FC = () => (
  <Box minH={12}>
    <Spinner size="xl" />
  </Box>
);

export { Loading };
