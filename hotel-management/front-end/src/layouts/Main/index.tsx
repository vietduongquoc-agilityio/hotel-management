import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Sidebar from "@/layouts/SideBar";

const MainLayout = () => {
  return (
    <Flex p="32px 15px" m="0 auto" w="1280px">
      <Sidebar />
      <Box w="1020px" ml="20px" mt="40px">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default MainLayout;
