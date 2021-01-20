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

class EditModal extends Component {
  state = {
    id: 0,
    nama: "",
    caption: "",
    stock: 0,
    harga: 0,
    image: {
      imageName: "Choose File",
      imageFile: undefined,
    },
  };

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (prevProps.data !== data && data) {
      this.setState({
        id: data.id,
        nama: data.nama,
        caption: data.caption,
        stock: data.stock,
        harga: data.harga,
      });
    }
    // undefined.stock
  }

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

  editButton = () => {
    const { toggle, editData } = this.props;
    toggle();
    editData(this.state);
  };

  render() {
    const { isOpen, toggle } = this.props;
    const { nama, caption, harga, stock } = this.state;
    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit a Product</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Product Name</Label>
                <Input
                  type="text"
                  id="nama"
                  onChange={this.onChangeInput}
                  value={nama}
                />
                <Label>Caption</Label>
                <Input
                  type="text"
                  id="caption"
                  onChange={this.onChangeInput}
                  value={caption}
                />
                <Label>Price</Label>
                <Input
                  type="number"
                  id="harga"
                  onChange={this.onChangeInput}
                  value={harga}
                />
                <Label>Stock</Label>
                <Input
                  type="number"
                  id="stock"
                  onChange={this.onChangeInput}
                  value={stock}
                />
                <Label>Image</Label>
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
            <Button color="primary" onClick={this.editButton}>
              Confirm Edit
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

export default EditModal;
