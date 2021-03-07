import React, { Component } from "react";
import { withAuth } from "./../../../context/auth-context";

class CreateNet extends Component {

	state = { netname: "", netcode: "" };

	handleFormSubmit = (event) => {
		event.preventDefault();
		const { netname, netcode } = this.state;
    console.log(netname, netcode)
		
    // Call function coming from AuthProvider ( via withAuth )
		//this.props.login(username, password);
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		const { netname, netcode } = this.state;

		return (
			<div>
				<h1>Create a Net</h1>

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

					<button type='submit'>Create</button>
				</form>
			</div>
		);
	}
}

export default withAuth(CreateNet);
