import React, { Component } from "react";
import "./Profile.css";
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
    try {
      await this.props.me();
      this.setState({ nets: this.props.user.nets });
    } catch (error) {
      console.log(error);
    }
  }

  handleLeave = async (netId) => {
    try {
      await netService.leave(netId);
      await this.props.me();
      this.setState({ nets: this.props.user.nets });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.props.user.nets.length === 0) {
      return (
        <div className="empty-net-list">
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
        <div className='nets-list-container'>
          {this.props.user.nets.map((net) => {
            return (
              <div className='net-card' key={net._id}>
                <div className='net-card-info'>
                  <h4>{net.netname}</h4>
                  <p>Access code:</p>
                  <p className='netcode'>{net.netcode}</p>
                  <p>{net.members.length} members</p>
                </div>
                <div className='net-card-btn'>
                  <button onClick={() => this.handleLeave(net._id)}>
                    Leave
                  </button>
                </div>
              </div>
            );
          })}
          <Link to='/nets'>
            <button className='joinorcreatebtn'>Join or Create a Net</button>
          </Link>
        </div>
      );
    }
  }
}

export default withAuth(Profile);
