import { Box, UnorderedList, ListItem, Text } from "@chakra-ui/react";
import AddRoomModal from "../../modal/roomModal/add/index";

export default function Label() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
    >
      <UnorderedList styleType="none" m={0} display="flex" gap={4}>
        <ListItem>
          <Text
            fontSize="md"
            fontWeight="500"
            border="1px solid #989fad"
            borderRadius="100px"
            p="8px 16px"
            _hover={{
              color: "blue.600",
              bg: "blue.100",
              border: "1px solid #1570ef",
            }}
            transition="background-color 0.3s ease"
          >
            All room (100)
          </Text>
        </ListItem>
        <ListItem>
          <Text
            transition="background-color 0.3s ease"
            fontSize="md"
            fontWeight="500"
            border="1px solid #989fad"
            borderRadius="100px"
            p="8px 16px"
            _hover={{
              color: "blue.600",
              bg: "blue.100",
              border: "1px solid #1570ef",
            }}
          >
            Available room (20)
          </Text>
        </ListItem>
        <ListItem>
          <Text
            transition="background-color 0.3s ease"
            fontSize="md"
            fontWeight="500"
            border="1px solid #989fad"
            borderRadius="100px"
            p="8px 16px"
            _hover={{
              color: "blue.600",
              bg: "blue.100",
              border: "1px solid #1570ef",
            }}
          >
            Booked (80)
          </Text>
        </ListItem>
      </UnorderedList>
      <AddRoomModal></AddRoomModal>
    </Box>
  );
}
