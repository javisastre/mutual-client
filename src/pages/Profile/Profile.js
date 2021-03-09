import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { withAuth } from "./../../context/auth-context";
import netService from "./../../services/net-service";

class Profile extends Component {
  constructor (props) {
    super()
    this.state = {
      nets: []
    }
  }

  componentDidMount() {
    console.log("in profile")
    this.props.me();
    this.setState({ nets: this.props.user.nets });
  }

  handleLeave = async (netId) => {
    // console.log("clicked leave")
    // console.log("current state:", this.state.nets)
    // console.log("leaving net:", netId)
    await netService.leave(netId);
    console.log("passed netService, before this.props.me")
    await this.props.me();
    console.log("after this.props.me")
    this.setState({ nets: this.props.user.nets });
    console.log("new state:", this.state.nets)
  };

  render() {
    if (this.props.user.nets.length === 0) {
      return <Redirect to='/' />;
    } else if (Object.keys(this.props.user.nets[0]).length === 24) {
      return <p>Loading...</p>
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
          <Link to='/nets'>
            <button>Join or Create a Net</button>
          </Link>
        </div>
      )
    }
  }
}

export default withAuth(Profile);
