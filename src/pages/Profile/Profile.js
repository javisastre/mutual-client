import React, { Component } from "react";
import { Redirect } from "react-router";
import { withAuth } from "./../../context/auth-context";
import netService from "./../../services/net-service";

class Profile extends Component {
  state = {
    nets: [],
  };

  componentDidMount() {
    console.log("ComponentDidMount before me", this.props.user.nets);
    this.props.me();
    console.log("ComponentDidMount after me", this.props.user.nets);
    this.setState({ nets: this.props.user.nets });
  }

  handleLeave = (netId) => {
    netService.leave(netId);
    console.log("handleLeave before me", this.props.user);
    this.props.me();
    console.log("handleLeave after me", this.props.user);
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
