import { VStack, Image, Link, List, ListItem } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import roomIcon from "@/assets/icons/room.svg";
import logoIcon from "@/assets/icons/logo.svg";
import rateIcon from "@/assets/icons/rate.svg";
import { borderRadius } from "@/themes/Base/metrics";

const Sidebar = () => {
  return (
    <VStack
      as="aside"
      w="220px"
      bg="white.200"
      gap="32px"
      alignItems="flex-start"
    >
      <Link w="196px" h="40px" as={RouterLink} to="/room">
        <Image src={logoIcon} alt="Logo" />
      </Link>
      <List
        spacing="15px"
        textColor="grey.600"
        fontSize="14px"
        fontWeight="500"
      >
        <ListItem>
          <Link
            as={RouterLink}
            to="/room"
            display="flex"
            alignItems="center"
            borderRadius="borderRadius.md"
            _hover={{
              bg: "blue.100",
              borderRadius: borderRadius.md,
              textColor: "blue.600",
              transition: "background-color 0.2s ease",
            }}
            w="196px"
            p="8px 12px"
          >
            <Image src={roomIcon} alt="Room" mr="15px" />
            Room
          </Link>
        </ListItem>
        <ListItem>
          <Link
            as={RouterLink}
            to="/rate"
            display="flex"
            alignItems="center"
            borderRadius="borderRadius.md"
            _hover={{
              bg: "blue.100",
              borderRadius: borderRadius.md,
              transition: "background-color 0.2s ease",
              textColor: "blue.600",
            }}
            w="196px"
            p="8px 12px"
          >
            <Image src={rateIcon} alt="Rate" mr="15px" />
            Rate
          </Link>
        </ListItem>
      </List>
    </VStack>
  );
};

export default Sidebar;
