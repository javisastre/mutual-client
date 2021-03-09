import React, { Component } from 'react'
import { withAuth } from './../../context/auth-context'
import { WithRouter, Redirect } from 'react-router-dom'

class AlertCancel extends Component {
  
  async componentDidMount() {
    await this.props.me
  }
  
  render() {
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }
}

export default withRouter(withAuth(AlertCancel));