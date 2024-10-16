import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/main";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
