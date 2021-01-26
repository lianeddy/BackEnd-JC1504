import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Input } from "reactstrap";
import { changePassAction } from "../redux/actions";

class ChangePassPage extends Component {
  state = {
    password: "",
    confirmPassword: "",
  };

  onChangeInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onClickChange = () => {
    const { changePassAction } = this.props;
    const { password } = this.state;
    const token = new URLSearchParams(this.props.location.search).get("token");
    changePassAction({ password, token });
  };

  render() {
    const { password, confirmPassword } = this.state;
    return (
      <div className="container">
        <div>
          <Input onChange={this.onChangeInput} id="password" type="password" />
        </div>
        <div>
          <Input
            onChange={this.onChangeInput}
            id="confirmPassword"
            type="password"
          />
        </div>
        <div>
          <Button
            onClick={
              password && confirmPassword
                ? this.onClickChange
                : () => alert("Password invalid")
            }
          >
            Confirm
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(null, { changePassAction })(ChangePassPage);
