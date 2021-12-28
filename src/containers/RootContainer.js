import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LogIn from "../components/LogIn/LogIn";
import Register from "../components/Register/Register";
import NavBar from "../components/NavBar/NavBar";

const RootContainer = () => {
  return (
    <div>
      <Router>
        {<NavBar />}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </div>
  );
};

export default RootContainer;
