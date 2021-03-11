import React, { Component } from "react";
import "./IAmOkForm.css";
import { withRouter } from "react-router-dom";
import { withAuth } from "./../../context/auth-context";
import alertService from "./../../services/alert-service";

class IAmOkForm extends Component {
  state = {
    alertpublic: "",
    alertcategory: "",
    alertstory: "",
    alertId: "",
    publicBoolean: false,
    category: {
      gender: false,
      sexualorientation: false,
      race: false,
      ideology: false,
      religion: false,
      others: false,
    },
  };

  handleInputChange = (event) => {
    const value = event.target.checked;
    const name = event.target.name;

    const updatedCategory = this.state.category;
    updatedCategory[name] = value;

    this.setState({ category: updatedCategory });
  };

  componentDidMount() {
    this.setState({ alertId: this.props.alertData._id, redirect: false });
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();

    const { publicBoolean, alertstory, category } = this.state;
    const publicAlert = publicBoolean;

    const categoryArray = [];
    for (let item in category) {
      if (category[item]) categoryArray.push(item);
    }

    const objectForUpdate = {
      alertId: this.state.alertId,
      publish: publicAlert,
      category: categoryArray,
      story: alertstory,
    };

    if (publicBoolean) alertService.archive(objectForUpdate);
    console.log("this should archive the alert");

    if (!publicBoolean) alertService.delete(this.state.alertId);
    console.log("this should delete the alert ");

    this.props.me();
    console.log("this should update the user data");

    this.props.history.push("/heatmap");
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handlePublic = (event) => {
    if (event.target.value === "no") {
      this.setState({ publicBoolean: false });
    } else {
      this.setState({ publicBoolean: true });
    }
  };

  async componentWillUnmount() {
    await this.props.me();
  }

  render() {
    return (
      <div>
        <h1 className='alerth1'>Finished Alert</h1>

        <form className='iamokform iamokflex' onSubmit={this.handleFormSubmit}>
          <div className='yesorno iamokflex'>
            <label>
              Do you want this alert’s information to go public anonymously?
            </label>

            <select name='alertpublic' onChange={this.handlePublic}>
              <option value='no'>No</option>
              <option value='yes'>Yes</option>
            </select>
          </div>

          {this.state.publicBoolean ? (
            <div className='conditionalform'>
              <div className='checkboxes'>
                <h4>Please classify the type of discrimination</h4>

                <label>
                  <input
                    name='gender'
                    type='checkbox'
                    checked={this.state.gender}
                    onChange={this.handleInputChange}
                  />
                  Gender
                </label>
                <label>
                  <input
                    name='sexualorientation'
                    type='checkbox'
                    checked={this.state.sexualorientation}
                    onChange={this.handleInputChange}
                  />
                  Sexual Orientation
                </label>
                <label>
                  <input
                    name='race'
                    type='checkbox'
                    checked={this.state.race}
                    onChange={this.handleInputChange}
                  />
                  Race
                </label>
                <label>
                  <input
                    name='ideology'
                    type='checkbox'
                    checked={this.state.ideology}
                    onChange={this.handleInputChange}
                  />
                  Ideology
                </label>
                <label>
                  <input
                    name='religion'
                    type='checkbox'
                    checked={this.state.religion}
                    onChange={this.handleInputChange}
                  />
                  Religion
                </label>
                <label>
                  <input
                    name='others'
                    type='checkbox'
                    checked={this.state.other}
                    onChange={this.handleInputChange}
                  />
                  Other
                </label>
              </div>

              <h4>Would you like to share your story?</h4>
              <textarea
                name='alertstory'
                className='alertstory'
                value={this.state.alertstory}
                onChange={this.handleChange}
                placeholder='Write your story here'
              />
            </div>
          ) : null}

          <button type='submit'>Send Alert Info</button>
        </form>
      </div>
    );
  }
}

export default withRouter(withAuth(IAmOkForm));
