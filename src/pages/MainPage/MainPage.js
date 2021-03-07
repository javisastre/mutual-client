import React from "react";
import { withAuth } from "./../../context/auth-context";
import AlertButton from "./../../components/AlertButton/AlertButton"
import Authform from "./../../components/Authform/Authform"
import Netsform from "./../../components/Netsform/Netsform"

class MainPage extends React.Component {

  componentDidMount() {
    this.props.me()
  }

  render() {
    return (
      <div>
        {!this.props.isLoggedIn ? <Authform /> : null}
  
        {this.props.isLoggedIn && this.props.user.nets.length === 0 ? (
          <Netsform />
        ) : null}
  
        {this.props.isLoggedIn && this.props.user.nets.length > 0 ? (
          <AlertButton />
        ) : null}
      </div>
    );
  }
}

export default withAuth(MainPage);
