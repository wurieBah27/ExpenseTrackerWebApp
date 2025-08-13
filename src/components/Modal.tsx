import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { type ReactNode } from "react";

type ModalComponentProps = {
  children: ReactNode;
  openModal?: boolean;
  setOpenModal: (value: boolean) => void;
  title: string;
};

const ModalComponent = ({
  children,
  setOpenModal,
  openModal,
  title,
}: ModalComponentProps) => {
  return (
    <>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </Modal>
    </>
  );
};

export default ModalComponent;
