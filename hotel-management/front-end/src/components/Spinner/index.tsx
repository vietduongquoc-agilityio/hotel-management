import { Spinner, Box } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Box
      data-testid="loading-spinner-box"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100px"
    >
      <Spinner size="xl" />
    </Box>
  );
};

export default LoadingSpinner;
