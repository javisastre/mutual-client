import React from "react";
import "./Menu.css";
import { withAuth } from "./../../context/auth-context";

function Menu(props) {
  return (
    <div className='menu'>
      <button
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
