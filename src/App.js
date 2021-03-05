import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { withAuth } from "./context/auth-context";

// Pages
import MainPage from "./pages/MainPage/MainPage";
// import Signup from "./pages/Signup/Signup";
// import Login from "./pages/Login/Login";
// import Private from "./pages/Private/Private";

// Components
import Navbar from "./components/Navbar/Navbar";
// import AnonRoute from "./components/AnonRoute/AnonRoute";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

class App extends Component {
  state = { user: {} };

  render() {
    return (
      <div className='container'>
        <Navbar />
        <Switch>
          <Route exact path='/' component={MainPage} />

          {/* <AnonRoute exact path='/signup' component={Signup} />
          <AnonRoute exact path='/login' component={Login} />
          <PrivateRoute exact path='/private' component={Private} />  */}
        </Switch>
      </div>
    );
  }
}

export default withAuth(App);
