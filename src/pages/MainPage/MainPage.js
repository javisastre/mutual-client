import React from "react";
import { withAuth } from "./../../context/auth-context";

function MainPage(props) {
  return (
    <div>
      {!props.isLoggedIn ? <p>AuthForm here</p> : null}

      {props.isLoggedIn && props.user.nets.length === 0 ? (
        <p>NetForm here</p>
      ) : null}

      {props.isLoggedIn && props.user.nets.length > 0 ? (
        <p>ButtonAlert here</p>
      ) : null}
    </div>
  );
}

export default withAuth(MainPage);
