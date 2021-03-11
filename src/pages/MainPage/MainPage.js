import React from "react";
import { withAuth } from "./../../context/auth-context";
import { Redirect } from "react-router-dom";
import AlertButton from "./../../components/AlertButton/AlertButton";
import AlertUser from "./../../pages/AlertUser/AlertUser"
import Authform from "./../../components/Authform/Authform";

class MainPage extends React.Component {
  state = {
    hasAlert: false
  }
  async componentDidMount() {

    await this.props.me();    
    if (this.props.user && this.props.user.userAlert ) {
      this.setState( {hasAlert: true} )
    }
  }

  
  deactivateAlert = () => {
    this.setState({hasAlert: false})
  }

  activateAlert = () => {
    this.setState({hasAlert: true})
  }
  
  render() {
    return (
      <div>
        {!this.props.isLoggedIn ? <Authform data={this.getuserData} /> : null}

        {this.props.isLoggedIn && this.props.user.nets.length === 0 ? (
          <Redirect to='/nets' />
        ) : null}

        {this.props.isLoggedIn && this.props.user.nets.length > 0 
          ? this.state.hasAlert
            ? <AlertUser deactivateAlert={this.deactivateAlert} />
            : <AlertButton  activateAlert={this.activateAlert} />          
         : null}
      </div>
    );
  }
}

export default withAuth(MainPage);
