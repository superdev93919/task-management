"use client";

import { ModalProps } from "../../types/task";

const BasicModal: React.FC<ModalProps> = ({
  openModal,
  setOpenModal,
  children,
}) => {
  return (
    <div className={`modal ${openModal ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <label
          onClick={() => setOpenModal(false)}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        {children}
      </div>
    </div>
  );
};

export default BasicModal;
