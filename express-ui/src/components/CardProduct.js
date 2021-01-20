import React, { Component } from "react";
import { Button, Card, CardText, CardTitle } from "reactstrap";
import { api_url } from "../helpers";
import placeholderPict from "../assets/download.png";

class CardProduct extends Component {
  state = {};
  render() {
    const {
      nama,
      harga,
      caption,
      stock,
      toggle,
      toggleEdit,
      imagepath,
    } = this.props;
    return (
      <Card
        body
        inverse
        style={{ backgroundColor: "#333", borderColor: "#333" }}
      >
        <img
          src={imagepath ? `${api_url}${imagepath}` : placeholderPict}
          alt="img"
          height="180px"
        />
        <CardTitle tag="h5">{nama}</CardTitle>
        <CardText>{caption}</CardText>
        <CardText>Rp.{harga.toLocaleString()}</CardText>
        <CardText>Stock: {stock}</CardText>
        <Button className="my-1" color="info">
          Details
        </Button>
        <Button className="my-1" color="danger" onClick={toggle}>
          Delete
        </Button>
        <Button className="my-1" color="primary" onClick={toggleEdit}>
          Edit
        </Button>
      </Card>
    );
  }
}

export default CardProduct;
