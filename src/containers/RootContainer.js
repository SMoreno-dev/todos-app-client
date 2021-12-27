import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "../components/Register/Register";

const RootContainer = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default RootContainer;
