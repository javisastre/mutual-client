import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { withAuth } from "./context/auth-context";

// Pages
import MainPage from "./pages/MainPage/MainPage";
import HeatMap from "./pages/HeatMap/HeatMap";
import Alerts from "./pages/Alerts/Alerts";
import Profile from "./pages/Profile/Profile";

// Components
import Navbar from "./components/Navbar/Navbar";
import AnonRoute from "./components/AnonRoute/AnonRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

class App extends Component {
  state = { user: {} };

  render() {
    return (
      <div className='container'>
        <Navbar />
        <Switch>
          <Route exact path='/' component={MainPage} />
          <PrivateRoute exact path='/heatmap' component={HeatMap} />
          <PrivateRoute exact path='/alerts' component={Alerts} />
          <PrivateRoute exact path='/profile' component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default withAuth(App);
