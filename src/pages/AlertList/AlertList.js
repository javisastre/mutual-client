import React, { Component } from "react";
import { withAuth } from "../../context/auth-context";
import { Link } from "react-router-dom";
import userService from "./../../services/user-service";

class Alerts extends Component {
  state = {
    alertSender: {},
    commonNets: [],
  };

  componentDidMount() {
    this.props.me();
    const senderPerson = this.getSenderPerson();
    const updatedNets = this.getCommonNets(senderPerson);
    this.setState({ alertSender: senderPerson, commonNets: updatedNets });
  }

  getSenderPerson = () => {
    const person = userService.alertSender(this.props.user.netAlerts[0].person);
    return person;
  };

  getCommonNets = (senderPerson) => {
    const commonNets = this.props.user.nets.map((ownNet) => {
      if (senderPerson.nets.includes(ownNet)) {
        return ownNet.netname;
      }
      return ownNet.netname
    });
    return commonNets;
  };

  render() {
    if (!this.state.senderPerson || !this.state.commonNets) {
      return <p>Loading...</p>;
    } else {
      return (
        <div>
          {this.props.user.netAlerts.map((alert) => {
            return (
              <div className='alert-card' key={alert._id}>
                <h4>{this.state.alertSender.username}</h4>
                <p>
                  At {alert.hour}h, on{alert.date}
                </p>
                <p>
                  From:{" "}
                  {this.state.commonNets.map((net) => {
                    return <p>{net}</p>;
                  })}
                </p>
                <Link to={`/alerts/map/${alert._id}`}>
                  <button>Map</button>
                </Link>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default withAuth(Alerts);
