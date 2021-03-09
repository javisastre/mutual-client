import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import { Redirect } from "react-router-dom";
import "./AlertButton.css";
import AlertService from "./../../services/alert-service";
//import AuthService from "./../../services/auth-service";

class AlertButton extends Component {
  constructor(props) {
    super();
    this.state = {
      alertsent: false,
      alertId: "",
      alert: {},
    };
  }

  handleClick = async () => {
    const createdAlert = await AlertService.create();
    await this.props.me();
    const alertId = createdAlert._id;
    this.setState({ alertsent: true, alertId });
  };

  componentDidMount() {
    this.setState({ alertsent: false });
  }

  render() {
    if (this.state.alertsent)
      return <Redirect to={`/alerts/${this.state.alertId}`} />;

    return (
      <div className='alert-container' onClick={this.handleClick}>
        <button className='alert-button' type='submit'>
          Alert
        </button>
      </div>
    );
  }
}

export default withAuth(AlertButton);
