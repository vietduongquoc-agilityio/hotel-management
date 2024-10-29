import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button as ChakraButton,
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
          <ModalContent>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalBody>
              <WrappedComponent {...props} onClose={toggleModal} />
            </ModalBody>
            <ModalFooter>
              <ChakraButton colorScheme="blue" onClick={toggleModal}>
                Close
              </ChakraButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
};

export default withModal;
