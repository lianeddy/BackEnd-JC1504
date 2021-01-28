import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Header } from "./components";
import {
  ChangePassPage,
  ChatPage,
  ForgetPage,
  LandingPage,
  LoginPage,
  RegisterPage,
  VerifyPage,
} from "./pages";
import { keepLoginAction } from "./redux/actions";
import { connect } from "react-redux";

class App extends Component {
  state = {};
  componentDidMount() {
    const { keepLoginAction } = this.props;
    const token = localStorage.getItem("token");
    if (token) {
      keepLoginAction();
    }
  }
  render() {
    return (
      <div>
        <Header />
        <Route path="/" exact component={LandingPage} />
        <Route path="/change-password" component={ChangePassPage} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/forget-password" component={ForgetPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/verify" component={VerifyPage} />
      </div>
    );
  }
}

export default connect(null, { keepLoginAction })(App);
