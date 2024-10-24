import React, { useState } from "react";

const Modal = ({ buttonName = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  if (!buttonName) return null;

  return (
    <React.Fragment>
      {buttonName && <button onClick={toggleModal}>{buttonName}</button>}
      {isOpen && (
        <div className="modalWrapper">
          <div className="modalHeader">
            <p>Heading Content</p>
            <span onClick={toggleModal}>x</span>
          </div>
          <div className="modalBody">
            <div className="modalContent">
              <p>Modal Body Content</p>
            </div>
            <div className="modalFooter">
              <button onClick={toggleModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Modal;
