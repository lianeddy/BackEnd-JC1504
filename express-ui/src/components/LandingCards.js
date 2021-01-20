import React, { Component } from "react";
import { Spinner } from "reactstrap";
import { CardProduct } from ".";

class LandingCards extends Component {
  state = {};

  renderCardProducts = () => {
    const { productList, toggle, isOpen, toggleEdit } = this.props;
    return productList.map(({ id, nama, harga, caption, stock, imagepath }) => {
      return (
        <div className="mx-2 my-2" style={{ width: "250px" }} key={id}>
          <CardProduct
            nama={nama}
            harga={harga}
            caption={caption}
            stock={stock}
            imagepath={imagepath}
            toggle={() => toggle(id)}
            isOpen={isOpen}
            toggleEdit={() => toggleEdit(id)}
          />
        </div>
      );
    });
  };

  render() {
    const { loading } = this.props;
    return (
      <div className="d-flex justify-content-center col-10">
        {loading ? (
          <div>
            <Spinner color="info" />
          </div>
        ) : (
          <div className="d-flex flex-wrap">{this.renderCardProducts()}</div>
        )}
      </div>
    );
  }
}

export default LandingCards;
