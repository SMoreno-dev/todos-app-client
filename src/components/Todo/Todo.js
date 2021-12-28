import React, { useEffect, useState } from "react";
import "./Todo.css";

import ErrorPanel from "../ErrorPanel/ErrorPanel";
import { useNavigate } from "react-router";

const Todo = ({ id, title, content, completed }) => {
  //State
  const [error, setError] = useState({ error: false, message: "" });
  const [isCompleted, defineIsCompleted] = useState(undefined);
  const [completedIcon, setCompletedIcon] = useState({
    class: "",
    text: "loading...",
  });

  //Navigate
  const navigate = useNavigate();

  //useEffect
  useEffect(() => {
    const completedIconHandler = () => {
      switch (isCompleted) {
        case undefined:
          return setCompletedIcon({ class: "", text: "Loading..." });

        case true:
          return setCompletedIcon({ class: "todo-completed", text: "☑" });

        case false:
          return setCompletedIcon({ class: "todo-completed", text: "❎" });

        default:
          const errorToThrow = new Error();
          errorToThrow.message =
            "isCompleted state should be boolean or undefined";
          console.error(errorToThrow);
          break;
      }
    };
    completedIconHandler();
    defineIsCompleted(completed || false);
  }, [completed, isCompleted]);

  //PATCH request
  const submitCompleted = async (status) => {
    try {
      if (!localStorage.token || !localStorage.id) {
        return navigate("/login");
      }
      const bearer = "Bearer " + localStorage.token;

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ADDRESS}/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: status,
          }),
        }
      );

      const parsedResponse = await response.json();
      if (response.status !== 200) {
        return setError({
          error: true,
          message: parsedResponse.message,
        });
      }

      window.location.reload();
    } catch (error) {
      console.error("ERROR:", error);
      setError({ error: true, message: "Something went wrong." });
    }
  };

  //Handler for click action
  const completedHandler = async () => {
    if (isCompleted === false) {
      submitCompleted(true);
      defineIsCompleted(true);
    }

    submitCompleted(false);
    defineIsCompleted(false);
  };

  //Handler for completed status icon

  return (
    <div className="todo-container">
      {error.error ? <ErrorPanel message={error.message} /> : null}
      <div className="todo-box">
        <div className="todo-title-and-id">
          <div className="todo-id">{"#" + (id || "0")}</div>
          <div className="todo-title">{title || "Mock Title"}</div>
        </div>

        <br />

        <div className="todo-content">
          <p>{content || "Create a TODO collection component"}</p>
        </div>

        <br />
      </div>

      <div className="todo-actions">
        <div className="todo-completed" onClick={() => completedHandler()}>
          <p className={completedIcon.class}>{completedIcon.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Todo;
