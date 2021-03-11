import React, { Component } from "react";

import netService from "../../../services/net-service";

import { withAuth } from "../../../context/auth-context";
import { withRouter } from "react-router-dom";

class CreateNet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      netname: "",
      netcode: "",
    };
  }

  handleFormSubmit = async (event) => {
    try {
      event.preventDefault();

      const { netname, netcode } = this.state;
      await netService.create(netname, netcode);

      await this.props.me();

      this.setState({ netname: "", netcode: "" });

      this.props.history.push("/profile");
    } catch (error) {
      console.log(error);
    }
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

export default withRouter(withAuth(CreateNet));
