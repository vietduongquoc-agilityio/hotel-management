import { Button, Box } from "@chakra-ui/react";

export interface LabelProps {
  handleClick: () => void;
}

export default function LabelRate({ handleClick }: LabelProps) {
  return (
    <Box display="flex" justifyContent="flex-end" mb={4}>
      <Button
        onClick={handleClick}
        colorScheme="blue"
        borderRadius={8}
        width="115px"
        height="40px"
      >
        Add Rate
      </Button>
    </Box>
  );
}
