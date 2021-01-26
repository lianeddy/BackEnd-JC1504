import React, { Component } from "react";
import { emailVerificationAction } from "../redux/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// import QueryString from "querystring";

class VerifyPage extends Component {
  componentDidMount() {
    // const params = QueryString.parse(this.props.location.search);
    // console.log(params["?username"]); Username
    // console.log(params.password); Password

    const { emailVerificationAction } = this.props;
    const username = new URLSearchParams(this.props.location.search).get(
      "username"
    );
    const password = new URLSearchParams(this.props.location.search).get(
      "password"
    );
    if (username && password) {
      emailVerificationAction({ username, password });
    }
  }
  render() {
    const { verified } = this.props;
    if (verified === 1) {
      return <Redirect to="/" />;
    }
    return <div>Verification Page</div>;
  }
}

const mapStatetoProps = ({ user: { verified } }) => {
  return {
    verified,
  };
};

export default connect(mapStatetoProps, { emailVerificationAction })(
  VerifyPage
);
