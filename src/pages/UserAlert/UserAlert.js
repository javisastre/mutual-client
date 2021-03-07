import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import { Redirect } from "react-router-dom";
import AlertService from "./../../services/alert-service";
import IAmOkForm from "../../components/IAmOkForm/IAmOkForm";

class UserAlert extends Component {
  state = {
    alert: {},
    redirectHome: false,
    iAmOk: false,
  };

  componentDidMount() {
    this.getActiveAlert();
  }

  getActiveAlert = async () => {
    const activeAlert = await AlertService.active(
      this.props.match.params.alertId
    );
    this.setState({ alert: activeAlert, redirectHome: false, iAmOk: false });
  };

  handleCancelBtn = async () => {
    await AlertService.delete(this.state.alert._id);
    this.setState({ redirectHome: true });
  };

  handleFineBtn = async () => {
    await AlertService.iamfine(this.state.alert._id);
    this.setState({ iAmOk: true });
  };

  render() {
    const alertScreen = (
      <div>
        <h4>Alert sent at:</h4>
        <h2>{this.state.alert.hour}</h2>
        <h2>{this.state.alert.date}</h2>

        <h4>To the following nets:</h4>
        {this.props.user.nets.map((net) => {
          return <h2 key={net._id}>{net.netname}</h2>;
        })}

        <button className='cancel-alert' onClick={this.handleCancelBtn}>
          Cancel, not an alert
        </button>
        <button className='finish-alert' onClick={this.handleFineBtn}>
          I'm Ok, finish alert
        </button>
      </div>
    );

    if (this.state.redirectHome) return <Redirect to='/' />;

    return (
      <>
        {this.state.iAmOk ? (
          <IAmOkForm alertData={this.state.alert} />
        ) : (
          alertScreen
        )}
      </>
    );
  }
}

export default withAuth(UserAlert);
