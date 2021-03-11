import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../../context/auth-context";
import netService from "./../../services/net-service";

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      nets: [],
    };
  }

  async componentDidMount() {
    await this.props.me();
    this.setState({ nets: this.props.user.nets });
  }

  handleLeave = async (netId) => {
    await netService.leave(netId);
    await this.props.me();
    this.setState({ nets: this.props.user.nets });
  };

  render() {
    console.log("this.props in profile", this.props);
    if (this.props.user.nets.length === 0) {
      return (
        <div>
          <h1>You are not in any net</h1>
          <Link to='/nets'>
            <button>Join or Create</button>
          </Link>
        </div>
      );
    } else if (Object.keys(this.props.user.nets[0]).length === 24) {
      return <p>Loading...</p>;
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
      );
    }
  }
}

export default withAuth(Profile);
