import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import "./Navbar.css";
import Menu from "./Menu";

class Navbar extends Component {
  state = {
    displayMenu: undefined,
  };

  componentDidMount() {
    this.setState({ displayMenu: false });
  }

  toggleMenu = () => {
    this.state.displayMenu
      ? this.setState({ displayMenu: false })
      : this.setState({ displayMenu: true });
  };

  render() {
    // const { user, logout, isLoggedin } = this.props;
    return (
      <nav className='navbar'>
        {this.props.isLoggedIn ? (
          <>
            {this.state.displayMenu ? (
              <>
                <i
                  class='fas fa-times'
                  id='menu-btn'
                  onClick={this.toggleMenu}
                ></i>
                <Menu toggle={this.toggleMenu} />
              </>
            ) : (
              <i
                className='fas fa-bars'
                id='menu-btn'
                onClick={this.toggleMenu}
              ></i>
            )}
            <p>username: {this.props.user && this.props.user.username}</p>
            <p>alerts: {this.props.user && this.props.user.netAlerts.length}</p>
          </>
        ) : null}
      </nav>
    );
  }
}

export default withAuth(Navbar);
