import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import AlertService from "./../../services/alert-service"
class UserAlert extends Component {

  state = {
    alert: {}
  }

  getActiveAlert = async () => {
    const activeAlert = await AlertService.active(this.props.match.params.alertId)
    console.log(activeAlert)
    this.setState({ alert: activeAlert})
  }

  componentDidMount() {
    this.getActiveAlert()
  }
  render() {
    // const time = String(this.state.alert.created_at)
    // const hour = time.slice(11, 19)
    // const day = time.slice(0, 10);

    return (
			<div>
				<h4>Alert sent at:</h4>
				<h2>{this.state.alert.hour}</h2>
				<h2>{this.state.alert.date}</h2>

				<h4>To the following nets:</h4>
				{this.props.user.nets.map((net) => {
					return <h2 key={net._id}>{net.netname}</h2>;
				})}

				<button>Cancel, not an alert</button>
				<button>I'm Ok, finist alert</button>
			</div>
		);
  }
}

export default withAuth(UserAlert);
