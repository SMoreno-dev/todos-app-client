import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import ErrorPanel from "../ErrorPanel/ErrorPanel";
import Todo from "../Todo/Todo";

import { Button } from "react-bootstrap";
import "./TodoCollection.css";

const TodoCollection = () => {
  //Error State
  const [error, setError] = useState({ error: false, message: "" });

  //TODO collection state
  const [todos, setTodos] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [limit, setLimit] = useState(10);

  //Navigate
  const navigate = useNavigate();

  //Fetch todos
  const fetchTodos = async () => {
    setTodos([]);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ADDRESS}/todos`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const parsedRes = await response.json();
      if (response.status !== 200) {
        console.log("ERROR");
        return setError({ error: true, message: parsedRes.message });
      }

      setTodos(parsedRes.body);
      setLoaded(true);
    } catch (error) {
      console.error(error);
      return setError({
        error: true,
        message: "Something went wrong loading the TODOs",
      });
    }
  };

  //useEffect
  useEffect(() => fetchTodos(), [limit]);

  return (
    <div>
      {error.error ? <ErrorPanel message={error.message} /> : null}
      <div className="todo-collection-title-box">
        <div className="todo-collection-title" onClick={() => navigate("/")}>
          TODOs
        </div>
        <div className="create-todo-link" onClick={() => navigate("/create")}>
          + new
        </div>
      </div>
      {!loaded ? <p className="p- 4">Loading...</p> : null}
      {!todos[0]
        ? null
        : todos.map((t, i) => {
            return (
              <Todo
                key={i}
                id={t.id}
                title={t.title}
                content={t.content}
                completed={t.completed}
              />
            );
          })}

      {todos.length < 10 ? null : (
        <Button
          className="todo-button mb-5"
          onClick={() => setLimit(limit + 10)}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default TodoCollection;
