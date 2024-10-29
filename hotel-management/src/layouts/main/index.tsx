import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../sideBar";
import Header from "../header";
import { Outlet } from "react-router-dom";

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
