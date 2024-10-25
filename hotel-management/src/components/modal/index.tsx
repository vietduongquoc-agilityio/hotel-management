import React, { useState } from "react";
import Button from "../button";

const Modal = ({ buttonName = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  if (!buttonName) return null;

  return (
    <React.Fragment>
      {buttonName && (
        <Button onClick={toggleModal} text={""} buttonType={"first"}>
          {buttonName}
        </Button>
      )}
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
              <Button onClick={toggleModal} text={""} buttonType={"first"}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Modal;
