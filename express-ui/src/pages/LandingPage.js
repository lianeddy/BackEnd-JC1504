import React, { Component } from "react";
import Axios from "axios";
import { api_url } from "../helpers";
import { CardProduct, DeleteModal } from "../components";
import { Button, FormGroup, Input, Label } from "reactstrap";

class LandingPage extends Component {
  state = {
    data: [],
    isOpen: false,
    idProduct: 0,
    isAvailable: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    let url = `${api_url}/products`;
    if (this.state.isAvailable) {
      url += "?isAvailable=1";
    }
    Axios.get(url)
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggle = (id) => {
    this.setState({ isOpen: !this.state.isOpen, idProduct: id });
  };

  deleteData = (id = 0) => {
    Axios.put(`${api_url}/products/${id}`)
      .then((res) => {
        this.toggle();
        this.fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderCardProducts = () => {
    return this.state.data.map(({ id, nama, harga, caption, stock }) => {
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
    console.log(this.state.isAvailable);
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
          <Button onClick={this.fetchData}>Search</Button>
        </div>
        <div className="d-flex justify-content-center col-9">
          <div className="d-flex flex-wrap">{this.renderCardProducts()}</div>
          <DeleteModal
            isOpen={this.state.isOpen}
            toggle={this.toggle}
            deleteData={() => this.deleteData(this.state.idProduct)}
          />
        </div>
      </div>
    );
  }
}

export default LandingPage;
