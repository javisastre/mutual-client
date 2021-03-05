import React, { Component } from 'react'
import './Authform.css'

import Signup from '../Signup/Signup'
import Login from '../Login/Login'

class Authform extends Component {
  state = {
    showSignupForm: false,
    showLoginFrom: false,
    back: false
  }

  handleSignUpBtn = () => {
    this.setState({
      showSignupForm: true,
      showLoginFrom: false,
    })
  } 
  
  handleLogInBtn = () => {
    this.setState({
      showSignupForm: false,
      showLoginFrom: true,
    })
  } 
  
  

  render() {
    return (
      <div>
        <h1>AuthFormPage</h1>

        {this.state.showSignupForm === false && this.state.showLoginFrom === false
        ? (
          <>
          <button onClick={this.handleSignUpBtn} >Sign Up</button>
          <button onClick={this.handleLogInBtn} >Log In</button>
          </>
        )
        : null
        }

        {this.state.showSignupForm
        ? (
         <> 
          <Signup />
          <button onClick={this.handleLogInBtn} >Already a member? Log in</button>
         </>
        )
        : null
        }

        {this.state.showLoginFrom
        ? (
         <> 
          <Login />
          <button onClick={this.handleSignUpBtn} >Not a member? Sign up</button>
         </>
        )
        : null
        }
        

      </div>
    )
  }
}

export default Authform