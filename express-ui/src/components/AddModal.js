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
  CustomInput,
} from "reactstrap";

class AddModal extends Component {
  state = {
    nama: "",
    caption: "",
    stock: 0,
    harga: 0,
    image: {
      imageName: "Choose File",
      imageFile: undefined,
    },
  };

  onChangeInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  };

  onChangeImage = (e) => {
    // File gambar masuk kedalam state
    if (e.target.files[0]) {
      this.setState({
        image: {
          imageName: e.target.files[0].name,
          imageFile: e.target.files[0],
        },
      });
    } else {
      this.setState({
        image: {
          imageName: "Choose File",
          imageFile: undefined,
        },
      });
    }
  };

  addButton = () => {
    const { toggle, addData } = this.props;
    toggle();
    // action creator membawa argumen data produk dan gambar
    addData(this.state);
  };

  toggleCancel = () => {
    const { toggle } = this.props;
    toggle();
    this.setState({
      image: {
        imageName: "Choose File",
        imageFile: undefined,
      },
    });
  };

  render() {
    console.log(this.state);
    const { isOpen } = this.props;
    return (
      <div>
        <Modal isOpen={isOpen} toggle={this.toggleCancel}>
          <ModalHeader toggle={this.toggleCancel}>Add a Product</ModalHeader>
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
                <Label>Image</Label>
                {/* File masuk disini */}
                {/* Ketika file diisi jalan function onchangeimage */}
                <CustomInput
                  id="inputImage"
                  type="file"
                  label={this.state.image.imageName}
                  onChange={this.onChangeImage}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addButton}>
              Add
            </Button>
            <Button color="secondary" onClick={this.toggleCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddModal;
