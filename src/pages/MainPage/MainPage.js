import React from "react";
import { withAuth } from "./../../context/auth-context";
import AlertButton from "./../../components/AlertButton/AlertButton"
import Authform from "./../../components/Authform/Authform"
import Netsform from "./../../components/Netsform/Netsform"

function MainPage(props) {
  return (
    <div>
      {!props.isLoggedIn ? <Authform /> : null}

      {props.isLoggedIn && props.user.nets.length === 0 ? (
        <Netsform />
      ) : null}

      {props.isLoggedIn && props.user.nets.length > 0 ? (
        <AlertButton />
      ) : null}
    </div>
  );
}

export default withAuth(MainPage);
