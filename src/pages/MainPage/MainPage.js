import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";

class MainPage extends Component {
  state = {
    showAuthForm: false,
    showNetForm: false,
    showAlertButton: false,
  };

  componentDidMount() {
    if (this.props.isLoggedIn && this.props.user.nets.length > 0) {
      this.setState({
        showAuthForm: false,
        showNetForm: false,
        showAlertButton: true,
      });
    } else if (this.props.isLoggedIn && this.props.user.nets.length === 0) {
      this.setState({
        showAuthForm: false,
        showNetForm: true,
        showAlertButton: false,
      });
    } else if (!this.props.isLoggedIn) {
      this.setState({
        showAuthForm: true,
        showNetForm: false,
        showAlertButton: false,
      });
    }
  }

  componentDidUpdate() {
    
  }

  render() {
    return (
      <div>
        <h1>MainPage Fede</h1>
        {this.state.showAuthForm ? <p>AuthForm here</p> : null}
        {this.state.showNetForm ? <p>NetForm here</p> : null}
        {this.state.showAlertButton ? <p>ButtonAlert here</p> : null}
      </div>
    );
  }
}

export default withAuth(MainPage);
