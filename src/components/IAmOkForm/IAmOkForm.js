import React, { Component } from "react";

class IAmOkForm extends Component {
  state = {
    alertpublic: "",
    alertcategory: "",
    alertstory: "",
    alertId: "",
    publicBoolean: false,
  };

  componentDidMount() {
    this.setState({ alertId: this.props.alertData._id });
  }

  handleFormSubmit = () => {};

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

  render() {
    return (
      <div>
        <h1>Finished Alert</h1>

        <form className='formInputs' onSubmit={this.handleFormSubmit}>
          <label>
            Do you want this alert’s information to go public anonymously?
          </label>
          <select name='alertpublic' onChange={this.handlePublic}>
            <option value='no'>No</option>
            <option value='yes'>Yes</option>
          </select>

          {this.state.publicBoolean ? (
            <div>
              <label>
                Gender
                <input type='checkbox' value='gender' />
              </label>
              <label>
                Sexual Orientation
                <input type='checkbox' value='sexualorientation' />
              </label>
              <label>
                Race
                <input type='checkbox' value='race' />
              </label>
              <label>
                Ideology
                <input type='checkbox' value='ideology' />
              </label>
              <label>
                Religion
                <input type='checkbox' value='religion' />
              </label>
              <label>
                Other
                <input type='checkbox' value='other' />
              </label>

              <textarea
                name='alertstory'
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

export default IAmOkForm;
