import React, { Component } from "react";
import { Input, Spinner, Button } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { registerAction } from "../redux/actions";

class RegisterPage extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    alamat: "",
  };

  onChangeInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { loading, username, registerAction } = this.props;
    if (username) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="my-2">
          <Input
            placeholder="Username"
            type="text"
            id="username"
            onChange={this.onChangeInput}
          />
        </div>
        <div className="my-2">
          <Input
            placeholder="Password"
            type="password"
            id="password"
            onChange={this.onChangeInput}
          />
        </div>
        <div className="my-2">
          <Input
            placeholder="Email"
            type="text"
            id="email"
            onChange={this.onChangeInput}
          />
        </div>
        <div className="my-2">
          <Input
            placeholder="Alamat"
            type="text"
            id="alamat"
            onChange={this.onChangeInput}
          />
        </div>
        <div className="my-2">
          <Button disabled={loading} onClick={() => registerAction(this.state)}>
            {loading ? <Spinner /> : "Register"}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = ({ user }) => {
  return {
    username: user.username,
    loading: user.loading,
  };
};

export default connect(mapStatetoProps, { registerAction })(RegisterPage);
