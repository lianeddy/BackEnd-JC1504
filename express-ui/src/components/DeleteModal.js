import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class DeleteModal extends Component {
  state = {};
  render() {
    const { isOpen, toggle, deleteData } = this.props;
    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Delete product ?</ModalHeader>
          <ModalBody>Apakah anda yakin mau menghapus produk ?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={deleteData}>
              Delete Product
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteModal;
