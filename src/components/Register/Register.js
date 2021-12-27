import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import ErrorPanel from "../ErrorPanel/ErrorPanel";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Register.css";

//Env variables
const { REACT_APP_SERVER_ADDRESS } = process.env;

const Register = () => {
  const navigate = useNavigate();

  //State
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
          message: "You must complete all fields in order to sign up.",
        });
      }

      const response = await fetch(
        `${REACT_APP_SERVER_ADDRESS}/users/register`,
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

      if (response.status !== 201) {
        return setError({
          error: true,
          message: parsedResponse.message,
        });
      } else {
        //TODO: Redirect to main component
        console.log(parsedResponse);
      }
    } catch (error) {
      console.log("ERROR:", error);
      throw new Error();
    }
  };

  return (
    <div>
      <Container className="center register">
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
            <h1 className="register-title-box">
              <span className="register-title rounded">Sign Up</span>
            </h1>
            {error.error ? <ErrorPanel message={error.message} /> : null}
            <Card className="register-card">
              <form>
                <label htmlFor="input-email" className="register-subtitle">
                  E-mail
                </label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="E-mail"
                  onChange={handleEmail}
                ></input>

                <label htmlFor="input-password" className="register-subtitle">
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
                  className="mb-4 register-button"
                  variant="secondary"
                  onClick={() => handleSubmit()}
                >
                  Sign Up
                </Button>

                <Link to="/signin">I already have an account</Link>
              </form>
            </Card>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
