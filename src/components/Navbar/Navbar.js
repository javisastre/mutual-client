import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../../context/auth-context";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    // const { user, logout, isLoggedin } = this.props;
    return (
      <nav className='navbar'>
        <Link to={"/"} id='home-btn' onClick={this.props.me}>
          <h4>Home</h4>
        </Link>

        {this.props.isLoggedIn ? (
          <>
            <p>username: {this.props.user && this.props.user.username}</p>
            <p>
              alerts: {this.props.user && this.props.user.netAlerts.length}
            </p>

            <button
              onClick={() => {
                this.props.logout();
                this.props.update();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login'>
              <button className='navbar-button'>Login</button>{" "}
            </Link>
            <br />
            <Link to='/signup'>
              <button className='navbar-button'>Sign Up</button>{" "}
            </Link>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
