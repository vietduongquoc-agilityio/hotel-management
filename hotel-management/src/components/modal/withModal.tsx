import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import Button from "../button";

const withModal =
  (WrappedComponent: React.ComponentType<any>, modalTitle: string) =>
  (props: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);

    return (
      <>
        <Button
          onClick={toggleModal}
          text={`${modalTitle}`}
          buttonType={"first"}
        >
          {modalTitle}
        </Button>
        <Modal isOpen={isOpen} onClose={toggleModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalBody>
              <WrappedComponent {...props} onClose={toggleModal} />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={toggleModal}
                text={"Close"}
                buttonType={"first"}
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

export default withModal;
