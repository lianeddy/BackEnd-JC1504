import React, { Component } from "react";
import {
  AddModal,
  DeleteModal,
  EditModal,
  LandingCards,
  SideBar,
} from "../components";
import { connect } from "react-redux";
import {
  addProductAction,
  editProductsAction,
  deleteProductsAction,
  fetchProductsAction,
  nullifyErrorAction,
} from "../redux/actions";
import { Alert } from "reactstrap";

class LandingPage extends Component {
  state = {
    isOpen: false,
    idProduct: 0,
    isAvailable: false,
    isOpenAdd: false,
    isOpenEdit: false,
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

  toggleEdit = (id) => {
    this.setState({ isOpenEdit: !this.state.isOpenEdit, idProduct: id });
  };

  toggleAdd = () => {
    this.setState({ isOpenAdd: !this.state.isOpenAdd });
  };

  render() {
    const {
      loading,
      error,
      deleteProductsAction,
      productList,
      verified,
    } = this.props;
    return (
      <div className="m-2">
        {!verified ? (
          <Alert color="danger">Akun anda belum terverifikasi</Alert>
        ) : null}
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
            toggleEdit={this.toggleEdit}
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
        <EditModal
          isOpen={this.state.isOpenEdit}
          toggle={this.toggleEdit}
          data={
            this.state.idProduct
              ? productList.find((val) => val.id === this.state.idProduct)
              : {}
          }
          editData={this.props.editProductsAction}
        />
      </div>
    );
  }
}

const mapStatetoProps = ({ product, user }) => {
  return {
    loading: product.loading,
    productList: product.productList,
    error: product.error,
    verified: user.verified,
  };
};

export default connect(mapStatetoProps, {
  addProductAction,
  editProductsAction,
  deleteProductsAction,
  fetchProductsAction,
  nullifyErrorAction,
})(LandingPage);
