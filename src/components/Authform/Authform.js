import React, { Component } from "react";
import "./Authform.css";
import mutualLogo from "./mutuallogo.png";

import Signup from "./Signup/Signup";
import Login from "./Login/Login";

class Authform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignupForm: false,
      showLoginFrom: false,
      back: false,
    };
  }

  handleSignUpBtn = () => {
    this.setState({
      showSignupForm: true,
      showLoginFrom: false,
    });
  };

  handleLogInBtn = () => {
    this.setState({
      showSignupForm: false,
      showLoginFrom: true,
    });
  };

  render() {
    return (
      <div className='authform'>
        {this.state.showSignupForm === false &&
        this.state.showLoginFrom === false ? (
          <div>
            <div className='logo'>
              <img src={mutualLogo} className='mutual-logo' alt='' />
              <h1>Welcome to Mutual</h1>
            </div>
            <div className='authbuttons'>
              <button onClick={this.handleSignUpBtn}>Sign Up</button>
              <button onClick={this.handleLogInBtn}>Log In</button>
            </div>
          </div>
        ) : null}

        {this.state.showSignupForm ? (
          <>
            <Signup />
            <button className='alreadymember' onClick={this.handleLogInBtn}>
              Already a member? Log in
            </button>
          </>
        ) : null}

        {this.state.showLoginFrom ? (
          <>
            <Login />
            <button className='alreadymember' onClick={this.handleSignUpBtn}>
              Not a member? Sign up
            </button>
          </>
        ) : null}
      </div>
    );
  }
}

export default Authform;
