import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Header } from "./components";
import { LandingPage } from "./pages";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Header />
        <Route path="/" exact component={LandingPage} />
      </div>
    );
  }
}

export default App;
