import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import ErrorPanel from "../ErrorPanel/ErrorPanel";
import CheckStatus from "../../utils/CheckStatus";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./LogIn.css";

const LogIn = () => {
  const navigate = useNavigate();

  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ error: false, message: "" });

  //Handlers
  const handleEmail = (event) => {
    return setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    return setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (email.length === 0 || password.length === 0) {
        return setError({
          error: true,
          message: "You must complete all fields in order to log in.",
        });
      }

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ADDRESS}/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const parsedResponse = await response.json();
      const checkedStatus = CheckStatus(response.status, parsedResponse);
      if (checkedStatus.error === true) {
        return setError(checkedStatus);
      }
      localStorage.setItem("id", parsedResponse.body.user.id);
      localStorage.setItem("token", parsedResponse.body.token);
      return navigate("/");
    } catch (error) {
      console.log("ERROR:", error);
      return setError({ error: true, message: "Something went wrong." });
    }
  };

  return (
    <Container className="center login">
      <Row>
        <Col sm={3}></Col>

        <Col sm={6}>
          {error.error ? <ErrorPanel message={error.message} /> : null}

          <h1 className="login-title-box">
            <span className="login-title rounded">Log In</span>
          </h1>
          <Card className="login-card">
            <form>
              <label htmlFor="input-email" className="login-subtitle">
                Email
              </label>
              <input
                className="form-input"
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                onChange={handleEmail}
              ></input>

              <label htmlFor="input-password" className="login-subtitle">
                Password
              </label>
              <input
                className="form-input"
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={handlePassword}
              ></input>

              <Button
                className="mb-4 login-button"
                variant="secondary"
                onClick={() => handleSubmit()}
              >
                Log In
              </Button>

              <Link to="/register">I don't have an account</Link>
            </form>
          </Card>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
};

export default LogIn;
