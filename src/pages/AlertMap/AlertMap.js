import React, { Component } from "react";
import { Link } from 'react-router-dom'

class AlertMap extends Component {
  render() {
    return (
      <div>
        <h1>Alert Map</h1>
        <Link to="/">
          <button>Back to main page</button>
        </Link>
      </div>
    );
  }
}

export default AlertMap;
