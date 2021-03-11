import React, { Component } from "react";
import "./AlertButton.css";

import { withAuth } from "./../../context/auth-context";
import { withRouter, Redirect } from 'react-router-dom'
import AlertService from "./../../services/alert-service";

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

    //     const locationArray = []
    //     navigator.geolocation.getCurrentPosition( (position) => {
    //     locationArray.push(position.coords.latitude)
    //     locationArray.push(position.coords.longitude);
    // })

    const locationArray = [2.1901371017810924, 41.397680267661016]
    
    const createdAlert = await AlertService.create(locationArray);

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

export default withRouter(withAuth(AlertButton));
