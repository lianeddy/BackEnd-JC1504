import React, { Component } from "react";
import { AddModal, DeleteModal, LandingCards, SideBar } from "../components";
import { connect } from "react-redux";
import {
  addProductAction,
  deleteProductsAction,
  fetchProductsAction,
  nullifyErrorAction,
} from "../redux/actions";

class LandingPage extends Component {
  state = {
    isOpen: false,
    idProduct: 0,
    isAvailable: false,
    isOpenAdd: false,
  };

  componentDidMount() {
    const { fetchProductsAction } = this.props;
    fetchProductsAction();
    // this.fetchData();
  }

  componentWillUnmount() {
    this.props.nullifyErrorAction();
  }

  toggle = (id) => {
    this.setState({ isOpen: !this.state.isOpen, idProduct: id });
  };

  toggleAdd = () => {
    this.setState({ isOpenAdd: !this.state.isOpenAdd });
  };

  render() {
    const { loading, error, deleteProductsAction, productList } = this.props;
    return (
      <div className="m-2">
        <div className="row">
          <SideBar
            checkToggle={(e) =>
              this.setState({ isAvailable: e.target.checked })
            }
            toggleAdd={this.toggleAdd}
          />
          <LandingCards
            productList={productList}
            toggle={this.toggle}
            isOpen={this.state.isOpen}
            loading={loading}
            error={error}
          />
        </div>
        <DeleteModal
          isOpen={this.state.isOpen}
          toggle={this.toggle}
          deleteData={() => deleteProductsAction(this.state.idProduct)}
        />
        <AddModal
          isOpen={this.state.isOpenAdd}
          toggle={this.toggleAdd}
          addData={this.props.addProductAction}
        />
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
  addProductAction,
  deleteProductsAction,
  fetchProductsAction,
  nullifyErrorAction,
})(LandingPage);
