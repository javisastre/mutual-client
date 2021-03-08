import React, { Component } from "react";
import { withAuth } from "../../../context/auth-context";
import { Redirect } from 'react-router-dom'
import netService from "../../../services/net-service"

class CreateNet extends Component {

	state = { 
    netname: "", 
    netcode: "",
    netcreated: false
  };

	handleFormSubmit = (event) => {
		event.preventDefault();
		const { netname, netcode } = this.state;
		
    netService.create(netname, netcode)
    this.setState( { netname: "", netcode: "", netcreated: true } );
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

  componentDidMount() {
    this.setState({ netcreated: false})
  }

	render() {
		const { netname, netcode } = this.state;

    if(this.state.netcreated) return <Redirect to="/profile" />

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
