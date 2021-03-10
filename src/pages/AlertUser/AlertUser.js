import React, { Component } from "react";
import { withAuth } from "../../context/auth-context";
import { Redirect, Link } from "react-router-dom";
import AlertService from "../../services/alert-service";
import IAmOkForm from "../../components/IAmOkForm/IAmOkForm";
import "./AlertUser.css";

class AlertUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      alert: {},
      iAmOk: false,
      sent: null
    };
  }

  componentDidMount() {
    this.getActiveAlert();
    this.setState({ redirectHome: null });
  }

  getActiveAlert = async () => {
    const activeAlert = await AlertService.active(
      this.props.match.params.alertId
    );
    this.setState({ alert: activeAlert, iAmOk: false });
  };

  handleCancelBtn = async () => {

    await AlertService.delete(this.state.alert._id);
  };

  handleFineBtn = async () => {
    await AlertService.iamfine(this.state.alert._id);
    this.setState({ iAmOk: true });
  };

  render() {
    const alertScreen = (
      <div className='user-alert'>
        <div className='content'>
          <span class='dot'></span>
          <h4>Alert sent at:</h4>
          <h2>{this.state.alert.hour}</h2>
          <h2>{this.state.alert.date}</h2>

          <h4>To the following nets:</h4>
          {this.props.user.nets.map((net) => {
            return <h2 key={net._id}>{net.netname}</h2>;
          })}
        </div>
        <div className='buttons-div'>
          <Link to='/'>
            <button className='cancel-alert' onClick={this.handleCancelBtn}>
              <p className='button-big'>Cancel</p>
              <p className='button-baseline'>not an alert</p>
            </button>
          </Link>
          <button className='finish-alert' onClick={this.handleFineBtn}>
            <p className='button-big'>I'm Ok</p>
            <p className='button-baseline'>finish alert</p>
          </button>
        </div>
      </div>
    );

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

export default withAuth(AlertUser);
