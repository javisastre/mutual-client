import React, { Component } from "react";

import netService from "../../../services/net-service"

import { withAuth } from "../../../context/auth-context";
import { withRouter } from 'react-router-dom'

class CreateNet extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			netname: "", 
			netcode: "",
		};
	}

	updateUserData = () => {
		console.log("I am calling this.props.me to update User Data!!!")
		this.props.me()
	}

	handleFormSubmit = async (event) => {
		event.preventDefault();
		
		const { netname, netcode } = this.state;
		
    await netService.create(netname, netcode)
    
		
		this.updateUserData()
		
		console.log("this.props in create net just before redirecting", this.props)
		
		this.setState( { netname: "", netcode: "" } );
		
		this.props.history.push("/profile")
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		console.log("this.props in create net", this.props)
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

export default withRouter(withAuth(CreateNet));
