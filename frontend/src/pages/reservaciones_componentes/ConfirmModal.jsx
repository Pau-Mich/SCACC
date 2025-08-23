// src/components/ConfirmModal.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({ show, title, message, onConfirm, onCancel }) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Confirmación"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message || "¿Estás segura(o)?"}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
