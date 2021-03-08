import React, { Component } from "react";
import { withAuth } from "../../../context/auth-context";
import { Redirect } from "react-router-dom";
import netService from "../../../services/net-service";

class JoinNet extends Component {
	state = {
		netname: "",
		netcode: "",
		netjoined: false,
	};

	handleFormSubmit = (event) => {
		event.preventDefault();
		const { netname, netcode } = this.state;

		netService.join(netname, netcode);
		this.setState({ netname: "", netcode: "", netjoined: true });
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	componentDidMount() {
		this.setState({ netjoined: false });
	}

	render() {
		const { netname, netcode } = this.state;

		if (this.state.netjoined) return <Redirect to='/profile' />;

		return (
			<div>
				<h1>Join a Net</h1>

				<form className='formInputs' onSubmit={this.handleFormSubmit}>
					<input
						type='text'
						name='netname'
						value={netname}
						onChange={this.handleChange}
						placeholder='Net name'
					/>

					<input
						type='password'
						name='netcode'
						value={netcode}
						onChange={this.handleChange}
						placeholder='Net code'
					/>

					<button type='submit'>Join</button>
				</form>
			</div>
		);
	}
}

export default withAuth(JoinNet);