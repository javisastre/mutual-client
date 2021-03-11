import React from "react";
import "./AlertButton.css";

import { withAuth } from "./../../context/auth-context";
import { withRouter } from 'react-router-dom'
import AlertService from "./../../services/alert-service";

function AlertButton (props) {
   const handleClick = async () => {

    const locationArray = [2.1901371017810924, 41.397680267661016]
    await AlertService.create(locationArray);
    await props.me();    
    props.activateAlert()
    console.log("activated alert from AlertButton")
  };

  return (
    <div className='alert-container' onClick={handleClick}>
      <button className='alert-button' type='submit'>
        Alert
      </button>
    </div>
  );
}

export default withRouter(withAuth(AlertButton));
