import React, { Component } from "react";

class UserAlert extends Component {
  render() {
    const createdAt = this.props.user.userAlert.created_at.toString();
    return (
      <div>
        <h4>Alert sent to:</h4>
        <p>{createdAt}</p>
      </div>
    );
  }
}

export default withAuth(UserAlert);
