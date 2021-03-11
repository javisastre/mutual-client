import React, { Component } from "react";
import { withAuth } from "../../context/auth-context";
import { Link } from "react-router-dom";
import userService from "./../../services/user-service";

class Alerts extends Component {
  state = {
    alertArray: [],
  };

  async componentDidMount() {
    await this.props.me();

    const peopleIdArray = this.props.user.netAlerts.map((alert) => {
      return alert.person;
    });

    const allUsers = await userService.findAllUsers();
    const peopleArray = allUsers.filter((user) => {
      if (peopleIdArray.includes(user._id)) {
        return true;
      } else {
        return false;
      }
    });

    const commonNets = [];
    peopleArray.forEach((person, index) => {
      let netString = "";

      person.nets.forEach((personNet) => {
        this.props.user.nets.forEach((meNet) => {
          if (String(personNet) === String(meNet._id)) {
            netString += meNet.netname + " ";
          }
        });
      });
      commonNets.push(netString.trim());
    });

    const alertArray = [];
    this.props.user.netAlerts.forEach((alert, index) => {
      const user = {};
      user["alertId"] = alert._id;
      user["name"] = peopleArray[index].username;
      user["nets"] = commonNets[index];
      user["date"] = alert.date;
      user["hour"] = alert.hour;
      alertArray.push(user);
    });

    this.setState({ alertArray });
  }

  render() {
    if (!this.state.alertArray.length === 0) {
      return <h4>You have no alerts</h4>;
    } else {
      return (
        <div>
          {this.state.alertArray.map((alert) => {
            return (
              <div className='alert-item' key={alert.alertId}>
                <h3>{alert.name}</h3>
                <p>{alert.nets}</p>
                <p>
                  {alert.hour} h, {alert.date}
                </p>
                <Link to={`/alerts/map/${alert.alertId}`}>
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
