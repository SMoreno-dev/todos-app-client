import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LogIn from "../components/LogIn/LogIn";
import Register from "../components/Register/Register";
import NavBar from "../components/NavBar/NavBar";
import TodoCollection from "../components/TodoCollection/TodoCollection";
import CreateTodo from "../components/CreateTodo/CreateTodo";

const RootContainer = () => {
  return (
    <div>
      <Router>
        {<NavBar />}
        <Routes>
          <Route exact path="/" element={<TodoCollection />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/create" element={<CreateTodo />} />
        </Routes>
      </Router>
    </div>
  );
};

export default RootContainer;
