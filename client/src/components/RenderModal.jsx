import { Modal } from "@mui/material";
import React from "react";

function RenderModal({ open, children }) {
  return (
    <Modal
      open={open}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      className="flex justify-center items-center"
    >
      {children}
    </Modal>
  );
}

export default RenderModal;
