import React, { Component } from "react";
import { withAuth } from "../../context/auth-context";
import { Link } from "react-router-dom";

class Alerts extends Component {
  render() {
    return (
      <div>
        {this.props.user.netAlerts.map((alert) => {
          return (
            <div className='alert-card' key={alert._id}>
              <h4>{alert.person}</h4>
              {/* <p>From: {alert.net}</p> */}
              <p>
                At {alert.hour}h, on{alert.date}
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

export default withAuth(Alerts);
