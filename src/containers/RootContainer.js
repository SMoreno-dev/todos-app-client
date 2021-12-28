import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LogIn from "../components/LogIn/LogIn";
import Register from "../components/Register/Register";

const RootContainer = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </div>
  );
};

export default RootContainer;
