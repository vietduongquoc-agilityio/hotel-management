import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "@/layouts/Main";
import RoomPage from "@/pages/Room";
import RatePage from "@/pages/Rate";
import theme from "@/themes/Themes";
import GuestPage from "@/pages/Guest";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<RoomPage />} />
            <Route path="rate" element={<RatePage />} />
            <Route path="guest" element={<GuestPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
