import React, { Component } from "react";
import "./Netsform.css";

import { withAuth } from "../../context/auth-context";
import CreateNet from "./CreateNet/CreateNet";
import JoinNet from "./JoinNet/JoinNet";

class Netsform extends Component {
  constructor(props) {
    super();
    this.state = {
      showCreateNet: false,
      showJoinNet: false,
    };
  }

  handleCreateBtn = () => {
    this.setState({
      showCreateNet: true,
      showJoinNet: false,
    });
  };

  handleJoinBtn = () => {
    this.setState({
      showCreateNet: false,
      showJoinNet: true,
    });
  };

  render() {
    return (
      <div className='authform'>
        {this.props.user && this.props.user.nets === 0 ? (
          <h4>You are not part of any net yet</h4>
        ) : (
          <h4>Create or join a net</h4>
        )}

        {this.state.showCreateNet === false &&
        this.state.showJoinNet === false ? (
          <div className='authbuttons'>
            <button onClick={this.handleCreateBtn}>Create a net</button>
            <button onClick={this.handleJoinBtn}>Join a net</button>
          </div>
        ) : null}

        {this.state.showCreateNet ? (
          <>
            <CreateNet />
            <button className='alreadymember' onClick={this.handleJoinBtn}>
              Want to join a net?
            </button>
          </>
        ) : null}

        {this.state.showJoinNet ? (
          <>
            <JoinNet />

            <button className='alreadymember' onClick={this.handleCreateBtn}>
              Want to create a new net?
            </button>
          </>
        ) : null}
      </div>
    );
  }
}

export default withAuth(Netsform);
