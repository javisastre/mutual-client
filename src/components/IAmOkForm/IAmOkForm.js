import React, { Component } from "react";
import './IAmOkForm.css'

class IAmOkForm extends Component {
  state = {
    alertpublic: '',
    alertcategory: '',
    alertstory: '',
    alertId: '',
    publicBoolean: false,
    category: {
      gender: false,
      sexualorientation: false,
      race: false,
      ideology: false,
      religion: false,
      others: false,
    }
  };

  handleInputChange = (event) => {
    const value = event.target.checked;
    const name = event.target.name;

    console.log(name, value)
    //console.log("pre update", this.state)

    this.setState({ [name]: value });

    console.log(this.state)
    //console.log("post update", this.state)
  }

  componentDidMount() {
    this.setState({ alertId: this.props.alertData._id });
  }

  handleFormSubmit = () => {
    const { publicBoolean, alertstory, category } = this.state
    
    const public = publicBoolean

    console.log(public, alertstory, category)
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

  render() {
  
    return (
      <div>
        <h1 className="alerth1">Finished Alert</h1>

        <form className='iamokform iamokflex' onSubmit={this.handleFormSubmit}>
          <div className="yesorno iamokflex">
            <label>
              Do you want this alert’s information to go public anonymously?
            </label>

            <select name='alertpublic' onChange={this.handlePublic}>
              <option value='no'>No</option>
              <option value='yes'>Yes</option>
            </select>
          </div>

          {this.state.publicBoolean ? (
            
            <div className="conditionalform">

              <div className="checkboxes">
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
                  name='other'
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

export default IAmOkForm;
