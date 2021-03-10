import React from "react";
import { withAuth } from "./../../context/auth-context";
import { Redirect } from "react-router-dom";
import AlertButton from "./../../components/AlertButton/AlertButton";
import Authform from "./../../components/Authform/Authform";
import AlertUser from "./../AlertUser/AlertUser";


class MainPage extends React.Component {

  async componentDidMount() {
    await this.getuserData();
  }

  getuserData = async () => {
    await this.props.me();
  };

  render() {
    return (
      <div>
        {!this.props.isLoggedIn ? <Authform data={this.getuserData} /> : null}

        {this.props.isLoggedIn && this.props.user.nets.length === 0 ? (
          <Redirect to='/nets' />
        ) : null}

        {this.props.isLoggedIn && this.props.user.nets.length > 0 ? (
          <AlertButton />
        ) : null}

        {/* {this.props.user.userAlert ? <AlertUser />: null} */}
      </div>
    );
  }
}

export default withAuth(MainPage);
