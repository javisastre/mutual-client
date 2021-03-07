import React, { Component } from "react";
import "./Netsform.css";

import { withAuth } from './../../context/auth-context'
import CreateNet from "./CreateNet/CreateNet"
import JoinNet from "./JoinNet/JoinNet";

class Netsform extends Component {
	state = {
		showCreateNet: false,
		showJoinNet: false,
		back: false,
	};

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
