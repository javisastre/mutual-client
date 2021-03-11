import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../../context/auth-context";
import "./Navbar.css";
import Menu from "./Menu";

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayMenu: undefined,
    };
  }

  componentDidMount() {
    this.setState({ displayMenu: false });
  }

  toggleMenu = () => {
    this.state.displayMenu
      ? this.setState({ displayMenu: false })
      : this.setState({ displayMenu: true });
  };

  render() {
    return (
      <nav className='navbar'>
        {this.props.isLoggedIn ? (
          <>
            {this.state.displayMenu ? (
              <>
                <Menu toggle={this.toggleMenu} />
                <i className='fas fa-times' onClick={this.toggleMenu}></i>
                <Link to='/' onClick={this.toggleMenu}>
                  <p className='username'>
                    {this.props.user && this.props.user.username}
                  </p>
                </Link>
                <span style={{ width: "width: 4.3vh" }}></span>
              </>
            ) : (
              <>
                <i className='fas fa-bars' onClick={this.toggleMenu}></i>
                <Link to='/'>
                  <p className='username'>
                    {this.props.user && this.props.user.username}
                  </p>
                </Link>
                {this.props.user.netAlerts.length === 0 ? (
                  <span className='notif-num zero'>
                    <p>{this.props.user && this.props.user.netAlerts.length}</p>
                  </span>
                ) : (
                  <Link to='/alerts'>
                    <span className='notif-num'>
                      <p>
                        {this.props.user && this.props.user.netAlerts.length}
                      </p>
                    </span>
                  </Link>
                )}
              </>
            )}
          </>
        ) : null}
      </nav>
    );
  }
}

export default withAuth(Navbar);
