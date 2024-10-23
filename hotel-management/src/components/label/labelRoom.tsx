import { Box, Button, UnorderedList, ListItem, Text } from "@chakra-ui/react";

export interface LabelProps {
  handleClick: () => void;
}

export default function Label({ handleClick }: LabelProps) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
    >
      <UnorderedList styleType="none" m={0} display="flex" gap={4}>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold">
            All room (100)
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold">
            Available room (20)
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold">
            Booked (80)
          </Text>
        </ListItem>
      </UnorderedList>
      <Button
        colorScheme="blue"
        borderRadius={8}
        onClick={handleClick}
        size="lg"
        width="115px"
        height="40px"
      >
        Add Room
      </Button>
    </Box>
  );
}
