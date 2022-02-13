import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";

interface IError {
  message: string;
}

const Error: React.FC<IError> = ({ message }) => (
  <Box mt={8}>
    <Alert status="error" borderRadius={"lg"}>
      <AlertIcon />
      <AlertTitle>{"Error!"}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  </Box>
);

export { Error };
