import React from "react";
import ReactDOM from "react-dom";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

const DeleteConfirmation = ({
  isOpen = false,
  title,
  message = "Are you sure? Action cannot be undone.",
  toggle,
  action,
}) => {
  return ReactDOM.createPortal(
    <Modal isOpen={isOpen} size="sm">
      <ModalHeader className="bg-danger text-light py-2">{title}</ModalHeader>
      <ModalBody>
        <div className="d-flex justify-content-start">
          <i
            className="bi bi-exclamation-triangle-fill me-2"
            style={{ color: "#dc3545" }}
          ></i>
          {/* <WarningIcon style={{ color: "#dc3545" }} /> */}
          <p className="pl-3 mb-0">{message}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <div class="btn-wrapper">
          <button
            className="btn app-btn-default btn-sm"
            onClick={(e) => {
              toggle(false);
            }}
          >
            Cancel
          </button>
          <button className="btn app-btn-danger btn-sm" onClick={action}>
            Delete
          </button>
        </div>
      </ModalFooter>
    </Modal>,
    document.getElementById("delete-confirmations")
  );
};

export default DeleteConfirmation;
