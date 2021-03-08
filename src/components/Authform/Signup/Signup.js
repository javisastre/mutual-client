import React, { Component } from "react";
import { withAuth } from "../../../context/auth-context";
import "./Signup.css";

class Signup extends Component {
  state = { username: "", email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    this.props.signup(username, email, password);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <div className='signupform'>
        <h1>Welcome to Mutual</h1>

        <form className='formInputs' onSubmit={this.handleFormSubmit}>
          <input
            type='text'
            name='username'
            value={username}
            onChange={this.handleChange}
            placeholder='Username'
          />

          <input
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            placeholder='Email'
          />

          <input
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            placeholder='Password'
          />

          <button type='submit'> SignUp </button>
        </form>
      </div>
    );
  }
}

export default withAuth(Signup);

// const EnhancedSignup = withAuth(Signup)
// export default EnhancedSignup;
