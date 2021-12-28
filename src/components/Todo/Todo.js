import React, { useEffect, useState } from "react";

import BearerToken from "../../utils/BearerToken";
import CheckStatus from "../../utils/CheckStatus";
import ErrorPanel from "../ErrorPanel/ErrorPanel";
import { useNavigate } from "react-router";

import "./Todo.css";

const Todo = ({ id, title, content, completed }) => {
  //State
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [isCompleted, defineIsCompleted] = useState(undefined);

  //Navigate
  const navigate = useNavigate();

  //useEffect
  useEffect(() => {
    defineIsCompleted(completed);
  }, [completed]);

  //PATCH request
  const submitCompleted = async (status) => {
    try {
      const bearer = BearerToken();
      if (!bearer) return navigate("/login");

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
      const checkedStatus = CheckStatus(response.status, parsedResponse);
      return !checkedStatus.error
        ? window.location.reload()
        : setError(checkedStatus);
    } catch (error) {
      console.error("ERROR:", error);
      setError({ error: true, message: "Something went wrong." });
    }
  };

  //Delete handler
  const deleteHandler = async () => {
    try {
      const bearer = BearerToken();
      if (!bearer) return navigate("/login");

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ADDRESS}/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
          },
        }
      );

      const parsedResponse = await response.json();

      const checkedStatus = CheckStatus(response.status, parsedResponse);
      return !checkedStatus.error
        ? window.location.reload()
        : setError(checkedStatus);
    } catch (error) {
      console.error(error);
      return setError({
        error: true,
        message: "Something went wrong deleting this TODO",
      });
    }
  };

  //Handler for click action
  const completedHandler = async () => {
    if (isCompleted === false) {
      defineIsCompleted(true);
      return submitCompleted(true);
    }

    defineIsCompleted(false);
    submitCompleted(false);
  };

  return (
    <div className="todo-container">
      {error.error ? (
        <ErrorPanel
          message={error.message}
          redirect={
            typeof error.redirect !== undefined ? error.redirect : false
          }
        />
      ) : null}
      <div className="todo-details">
        <div className="todo-id-and-title">
          <div className="todo-id">{"#" + (id || "0")}</div>
          <div className="todo-title">{title || "Mock Title"}</div>
        </div>
        <div className="todo-content">
          <p>{content || "Create a TODO collection component"}</p>
        </div>
      </div>
      <div className="todo-actions">
        <div className="todo-completed" onClick={() => completedHandler()}>
          <p className={isCompleted ? "todo-completed" : "todo-not-completed"}>
            {typeof isCompleted === undefined ? "Loading..." : null}
            Status: {isCompleted ? "✔" : "✕"}
          </p>
        </div>
        <div className="todo-delete" onClick={() => deleteHandler()}>
          <p>Delete 🗑</p>
        </div>
      </div>
    </div>
  );
};

export default Todo;
