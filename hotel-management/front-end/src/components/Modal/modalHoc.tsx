import { useLocation } from "react-router-dom";
import React, { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

//Components
import { Button } from "@/components";

//Store
import { useRateStore } from "@/store";

const withModal = (
  WrappedComponent: React.ComponentType<any>,
  modalTitle: string
) => {
  return (props: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);
    const { rates } = useRateStore();
    const { pathname } = useLocation();

    const isDisabled = rates.length === 0 && pathname === "/";

    return (
      <>
        <Button
          isDisabled={isDisabled}
          onClick={toggleModal}
          text={modalTitle}
          buttonType="primary"
        />
        <Modal isOpen={isOpen} onClose={toggleModal}>
          <ModalOverlay />
          <ModalContent bg="white.200" top="160px">
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
