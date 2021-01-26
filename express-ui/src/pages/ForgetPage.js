import React, { Component } from "react";
import { Button, Input, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { sendEmailChangeAction } from "../redux/actions";

class ForgetPage extends Component {
  state = {
    email: "",
  };
  render() {
    const { sendEmailChangeAction, loading } = this.props;
    return (
      <div className="container">
        <div className="my-2">
          <h3>Masukkan email anda untuk mengganti password</h3>
        </div>
        <div className="my-2">
          <Input
            type="text"
            id="email"
            placeholder="Email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>
        <div className="my-2">
          <Button
            color="info"
            onClick={() => sendEmailChangeAction({ email: this.state.email })}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Send Recovery Email"}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = ({ user: { loading } }) => {
  return {
    loading,
  };
};

export default connect(mapStatetoProps, { sendEmailChangeAction })(ForgetPage);
