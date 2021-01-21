import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Header } from "./components";
import { LandingPage, LoginPage } from "./pages";
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
        <Route path="/login" component={LoginPage} />
      </div>
    );
  }
}

export default connect(null, { keepLoginAction })(App);
