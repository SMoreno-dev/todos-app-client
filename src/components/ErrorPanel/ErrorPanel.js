import React, { useState } from "react";
import { useNavigate } from "react-router";

import "./ErrorPanel.css";
import { Modal, Button } from "react-bootstrap";

const SignUpError = ({ message, redirect }) => {
  const [show, showPanel] = useState(true);
  const navigate = useNavigate();

  const handleReload = () => {
    showPanel(false);
    window.location.reload();
  };

  const handleRedirect = () => {
    showPanel(false);
    navigate.push(redirect);
  };

  return (
    <Modal show={show} className="panel-modal">
      <Modal.Header className="panel-title">
        <Modal.Title className="">Error</Modal.Title>
      </Modal.Header>
      <Modal.Body className="panel-message">
        {!message ? "Unknown error. Please try again." : message}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={!redirect ? () => handleReload() : () => handleRedirect()}
        >
          Try Again
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpError;
