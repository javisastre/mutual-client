import React, { Component } from "react";
import { Redirect } from "react-router";
import { withAuth } from "./../../context/auth-context";
import netService from "./../../services/net-service";

class Profile extends Component {
  state = {
    nets: [],
  };

  componentDidMount() {
    this.props.me();
    this.setState({ nets: this.props.user.nets });
  }

  handleLeave = (netId) => {
    netService.leave(netId);
    this.props.me();
    this.setState({ nets: this.props.user.nets });
  };

  render() {
    if (this.props.user.nets.length === 0) {
      return <Redirect to='/' />;
    } else {
      return (
        <div>
          {this.props.user.nets.map((net) => {
            return (
              <div className='net-card' key={net._id}>
                <h4>{net.netname}</h4>
                <p>Access code: {net.netcode}</p>
                <p>{net.members.length} members</p>
                <button onClick={() => this.handleLeave(net._id)}>Leave</button>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default withAuth(Profile);
