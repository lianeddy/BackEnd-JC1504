import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  FormGroup,
  Input,
} from "reactstrap";

class AddModal extends Component {
  state = {
    nama: "",
    caption: "",
    stock: 0,
    harga: 0,
  };

  onChangeInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  };

  addButton = () => {
    const { toggle, addData } = this.props;
    toggle();
    addData(this.state);
  };

  render() {
    const { isOpen, toggle } = this.props;
    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add a Product</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Product Name</Label>
                <Input type="text" id="nama" onChange={this.onChangeInput} />
                <Label>Caption</Label>
                <Input type="text" id="caption" onChange={this.onChangeInput} />
                <Label>Price</Label>
                <Input type="number" id="harga" onChange={this.onChangeInput} />
                <Label>Stock</Label>
                <Input type="number" id="stock" onChange={this.onChangeInput} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addButton}>
              Add
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

export default AddModal;
