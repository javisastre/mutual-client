import React, { Component } from "react";
import { withAuth } from "../../context/auth-context";

class Alerts extends Component {
  render() {
    return (
      <div>
        <h1>Alert List</h1>
      </div>
    );
  }
}

export default withAuth(Alerts);
