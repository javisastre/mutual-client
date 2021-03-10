import React, { Component } from "react";
import { withAuth } from "../../context/auth-context";
import { Link } from "react-router-dom";
import userService from "./../../services/user-service";

class Alerts extends Component {
  state = {
    senderArr: [],
  };

  async componentDidMount() {
    await this.props.me();

    const peopleIdArray = this.props.user.netAlerts.map( (alert) => {
      return alert.person
    })

    console.log("this should be the id of people", peopleIdArray)

    const senderPeople = peopleIdArray.map( async (personId) => {
      return await userService.alertSender(personId)
    })

    console.dir("this should be an array of populated people", senderPeople)
    
    this.setState({ senderArr: senderPeople})

    // const updatedNets = this.getCommonNets(senderPerson);
    // this.setState({ alertSender: senderPerson, commonNets: updatedNets });
  }

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
    if (!this.state.senderArr.length === 0) {
      return <p>Loading...</p>;
    } else {
      return (
        <div>
        <h1>Alert List here</h1>
          {/* {this.props.user.netAlerts.map((alert) => {
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
          })} */}
        </div>
      );
    }
  }
}

export default withAuth(Alerts);
