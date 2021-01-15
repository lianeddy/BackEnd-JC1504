import React, { Component } from "react";
import { CardProduct, DeleteModal } from "../components";
import { Button, FormGroup, Input, Label, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { fetchProductsAction, deleteProductsAction } from "../redux/actions";

class LandingPage extends Component {
  state = {
    isOpen: false,
    idProduct: 0,
    isAvailable: false,
  };

  async componentDidMount() {
    const { fetchProductsAction } = this.props;
    fetchProductsAction();
    // this.fetchData();
  }

  toggle = (id) => {
    this.setState({ isOpen: !this.state.isOpen, idProduct: id });
  };

  renderCardProducts = () => {
    const { productList } = this.props;
    return productList.map(({ id, nama, harga, caption, stock }) => {
      return (
        <div className="mx-2 my-2" style={{ width: "200px" }} key={id}>
          <CardProduct
            nama={nama}
            harga={harga}
            caption={caption}
            stock={stock}
            toggle={() => this.toggle(id)}
            isOpen={this.state.isOpen}
          />
        </div>
      );
    });
  };

  render() {
    const {
      loading,
      // error
      deleteProductsAction,
    } = this.props;
    return (
      <div className="row">
        <div className="col-3 d-flex flex-column">
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                id="checkbox2"
                onChange={(e) =>
                  this.setState({ isAvailable: e.target.checked })
                }
              />
              Available Products
            </Label>
          </FormGroup>
          <Button>Search</Button>
        </div>
        <div className="d-flex justify-content-center col-9">
          {loading ? (
            <div>
              <Spinner color="info" />
            </div>
          ) : (
            <div className="d-flex flex-wrap">{this.renderCardProducts()}</div>
          )}
          {/* {error ? error : null} */}

          <DeleteModal
            isOpen={this.state.isOpen}
            toggle={this.toggle}
            deleteData={() => deleteProductsAction(this.state.idProduct)}
          />
        </div>
      </div>
    );
  }
}

const mapStatetoProps = ({ product }) => {
  return {
    loading: product.loading,
    productList: product.productList,
    error: product.error,
  };
};

export default connect(mapStatetoProps, {
  fetchProductsAction,
  deleteProductsAction,
})(LandingPage);
