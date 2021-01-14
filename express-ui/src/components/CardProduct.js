import React, { Component } from "react";
import { Button, Card, CardText, CardTitle } from "reactstrap";

class CardProduct extends Component {
  state = {};
  render() {
    const { nama, harga, caption, stock, toggle } = this.props;
    return (
      <Card
        body
        inverse
        style={{ backgroundColor: "#333", borderColor: "#333" }}
      >
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
      </Card>
    );
  }
}

export default CardProduct;
