import React, { Component } from "react";
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
    console.log(this.props.user);
    this.setState({ nets: this.props.user.nets });
  };

  render() {
    return (
      // TODO redirect to create net or join net
      <div>
        {this.state.nets.map((net) => {
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

export default withAuth(Profile);
