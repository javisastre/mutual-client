import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { withAuth } from "./../../context/auth-context";

function Menu(props) {
  return (
    <div className='menu flex'>
      <div className='flex'>
        <Link to='/'>
          <button className='menu-button' onClick={props.toggle}>
            Send an Alert
          </button>
        </Link>
        <Link to='/alerts'>

          <button className='menu-button' onClick={props.toggle}>
            Alert List
          </button>
        </Link>
        <Link to='/profile'>
          <button className='menu-button' onClick={props.toggle}>
            Manage Nets
          </button>
        </Link>
        <Link to='/heatmap'>
          <button className='menu-button' onClick={props.toggle}>
            Heat Map
          </button>
        </Link>
      </div>

      <button
        className='menu-button'
        onClick={() => {
          props.logout();
          props.toggle();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default withAuth(Menu);
