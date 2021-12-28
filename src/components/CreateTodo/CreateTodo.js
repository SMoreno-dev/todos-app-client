import React, { useState } from "react";

import BearerToken from "../../utils/BearerToken";
import CheckStatus from "../../utils/CheckStatus";
import ErrorPanel from "../ErrorPanel/ErrorPanel";

//Css
import { Button } from "react-bootstrap";
import "./CreateTodo.css";
import { useNavigate } from "react-router";

const CreateTodo = () => {
  //Error State
  const [error, setError] = useState({
    error: false,
    message: "",
    redirect: false,
  });

  //Todo State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //Navigate
  const navigate = useNavigate();

  //Event Handlers
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  //Submit handler
  const handleSubmit = async () => {
    try {
      const bearer = BearerToken();
      if (!bearer) return navigate("/login");

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ADDRESS}/todos`,
        {
          method: "POST",
          headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            userId: localStorage.id,
          }),
        }
      );

      const parsedResponse = await response.json();
      const checkedStatus = CheckStatus(response.status, parsedResponse);
      if (checkedStatus.error === true) {
        return setError(checkedStatus);
      }
      return navigate("/");
    } catch (error) {
      console.error("ERROR:", error);
      setError({
        error: true,
        message: "Something went wrong creating the TODO.",
      });
    }
  };

  return (
    <>
      <div className="create-todo">
        {error.error ? (
          <ErrorPanel
            message={error.message}
            redirect={
              typeof error.redirect !== undefined ? error.redirect : false
            }
          />
        ) : null}

        <div className="create-todo-form">
          <form>
            <div className="create-todo-input container-fluid">
              <h1>Create a TODO</h1>
              <label htmlFor="title-input" className="title-label">
                Title
              </label>
              <input
                className="title-input"
                type="text"
                name="title"
                value={title}
                onChange={handleTitle}
              ></input>

              <label htmlFor="content-input" className="content-label">
                Content
              </label>
              <input
                className="content-input"
                type="text"
                name="content"
                value={content}
                onChange={handleContent}
              ></input>

              <Button
                className="todo-button"
                variant="secondary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTodo;
