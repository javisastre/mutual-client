import React, { Component } from "react";
import { withAuth } from "../../../context/auth-context";
import netService from "../../../services/net-service";
import { withRouter } from 'react-router-dom'

class JoinNet extends Component {
	constructor (props) {
		super(props)
		this.state = {
			netname: "",
			netcode: "",
		};
	}

	handleFormSubmit = async (event) => {
		
		event.preventDefault();

		const { netname, netcode } = this.state;

		await netService.join(netname, netcode);

		this.setState({ netname: "", netcode: "" });
		
		await this.props.me()
		
		this.props.history.push("/profile")
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		const { netname, netcode } = this.state;

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

export default withRouter(withAuth(JoinNet));
