import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import MainLayout from "../layouts/main";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout component={undefined} />} />
      </Routes>
    </Router>
  );
};

export default App;
