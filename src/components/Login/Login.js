import React, { Component } from "react";
import { withAuth } from './../../context/auth-context';

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    // Call function coming from AuthProvider ( via withAuth )
    this.props.login(username, password);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
			<div>
				<h1>Login to Mutual</h1>

				<form className="formInputs" onSubmit={this.handleFormSubmit}>
					<input
						type='text'
						name='username'
						value={username}
						onChange={this.handleChange}
						placeholder='Username'
					/>

					<input
						type='password'
						name='password'
						value={password}
						onChange={this.handleChange}
						placeholder='Password'
					/>

					<button type='submit'>Login</button>
				</form>
			</div>
		);
  }
}

export default withAuth(Login);
