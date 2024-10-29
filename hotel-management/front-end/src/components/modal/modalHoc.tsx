import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import Button from "../button";

const withModal = (
  WrappedComponent: React.ComponentType<any>,
  modalTitle: string
) => {
  return (props: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);

    return (
      <>
        <Button onClick={toggleModal} text={modalTitle} buttonType="first" />
        <Modal isOpen={isOpen} onClose={toggleModal}>
          <ModalOverlay />
          <ModalContent bg="white.200">
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalBody>
              <WrappedComponent {...props} onClose={toggleModal} />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
};

export default withModal;
