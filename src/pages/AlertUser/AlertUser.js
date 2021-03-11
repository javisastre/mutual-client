import React, { Component } from "react";
import { withAuth } from "../../context/auth-context";
import AlertService from "../../services/alert-service";
import IAmOkForm from "../../components/IAmOkForm/IAmOkForm";
import "./AlertUser.css";

class AlertUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iAmOk: false,
    };
  }

  async componentDidMount() {
    try {
      this.setState({ iAmOk: false });
      await this.props.me();
    } catch (error) {
      console.log(error);
    }
  }

  handleCancelBtn = async () => {
    try {
      await AlertService.delete(this.props.user.userAlert._id);

      await this.props.me();
      console.log("i just did this.props.me");

      this.props.deactivateAlert();
      console.log("deactivated alert from AlertUser");
    } catch (error) {
      console.log(error);
    }
  };

  handleFineBtn = async () => {
    try {
      await AlertService.iamfine(this.props.user.userAlert._id);
      this.setState({ iAmOk: true });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        {this.props.user && this.props.user.userAlert != null ? (
          this.state.iAmOk ? (
            <IAmOkForm deactivateAlert={this.props.deactivateAlert} />
          ) : (
            <div className='user-alert'>
              <div className='content'>
                <span className='dot'></span>
                <h4>Alert sent at:</h4>
                <h2>{this.props.user.userAlert.hour}</h2>
                <h2>{this.props.user.userAlert.date}</h2>

                <h4>To the following nets:</h4>
                {this.props.user.nets.map((net) => {
                  return <h2 key={net._id}>{net.netname}</h2>;
                })}
              </div>
              <div className='buttons-div'>
                <button className='cancel-alert' onClick={this.handleCancelBtn}>
                  <p className='button-big'>Cancel</p>
                  <p className='button-baseline'>not an alert</p>
                </button>
                <button className='finish-alert' onClick={this.handleFineBtn}>
                  <p className='button-big'>I'm Ok</p>
                  <p className='button-baseline'>finish alert</p>
                </button>
              </div>
            </div>
          )
        ) : (
          <h4>Loading</h4>
        )}
      </>
    );
  }
}

export default withAuth(AlertUser);
