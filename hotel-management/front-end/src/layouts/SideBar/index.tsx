import { VStack, Image, Link, List, ListItem } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import roomIcon from "@/assets/icons/room.svg";
import logoIcon from "@/assets/icons/logo.svg";
import rateIcon from "@/assets/icons/rate.svg";
import guestIcon from "@/assets/icons/guest.svg";
import dealIcon from "@/assets/icons/deal.svg";

const Sidebar = () => {
  const location = useLocation();

  // Navigation items array
  const navItems = [
    { path: "/", label: "Room", icon: roomIcon },
    { path: "/rate", label: "Rate", icon: rateIcon },
    { path: "/guest", label: "Guest", icon: guestIcon },
    { path: "/deal", label: "Deal", icon: dealIcon },
  ];

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
        {navItems.map(({ path, label, icon }) => {
          const isActive = location.pathname === path;
          return (
            <ListItem key={path}>
              <Link
                as={RouterLink}
                to={path}
                display="flex"
                alignItems="center"
                borderRadius="10px"
                bg={isActive ? "blue.100" : "transparent"}
                textColor={isActive ? "blue.600" : "grey.600"}
                _hover={{
                  bg: "blue.100",
                  transition: "background-color 0.2s ease",
                  textColor: "blue.600",
                }}
                w="196px"
                p="8px 12px"
              >
                <Image src={icon} alt={label} mr="15px" />
                {label}
              </Link>
            </ListItem>
          );
        })}
      </List>
    </VStack>
  );
};

export default Sidebar;
