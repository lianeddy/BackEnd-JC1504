import React, { Component } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

class SideBar extends Component {
  state = {};
  render() {
    const { checkToggle, toggleAdd } = this.props;
    return (
      <div className="col-2 d-flex flex-column">
        <FormGroup check>
          <Label check>
            <Input type="checkbox" id="checkbox2" onChange={checkToggle} />
            Available Products
          </Label>
        </FormGroup>
        <Button className="my-1">Search</Button>
        <Button className="my-1" onClick={toggleAdd}>
          Add Product
        </Button>
      </div>
    );
  }
}

export default SideBar;
