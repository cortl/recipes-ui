import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";

type IError = {
  message: string;
};

const Error: React.FC<IError> = ({ message }) => (
  <Box mt={8}>
    <Alert borderRadius="lg" status="error">
      <AlertIcon />
      <AlertTitle>{"Error!"}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  </Box>
);

export { Error };
