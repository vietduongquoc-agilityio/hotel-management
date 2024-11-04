import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

//Components
import Header from "@/layouts/Header/Header";
import Sidebar from "@/layouts/SideBar/SideBar";

const MainLayout = () => {
  return (
    <Flex p="32px 15px" m="0 auto" w="1280px">
      <Sidebar />
      <Box w="1020px" ml="20px">
        <Header />
        <Outlet />
      </Box>
    </Flex>
  );
};

export default MainLayout;
