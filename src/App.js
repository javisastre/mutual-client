import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { withAuth } from "./context/auth-context";

// Pages
import MainPage from "./pages/MainPage/MainPage";
import HeatMap from "./pages/HeatMap/HeatMap";
import NetAlerts from "./pages/NetAlerts/NetAlerts";
import Profile from "./pages/Profile/Profile";
import UserAlert from "./pages/UserAlert/UserAlert";
import Netsform from "./pages/Netsform/Netsform";

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
          <PrivateRoute exact path='/nets' component={Netsform} />
          <PrivateRoute exact path='/heatmap' component={HeatMap} />
          <PrivateRoute exact path='/alerts' component={NetAlerts} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <PrivateRoute exact path='/alerts/:alertId' component={UserAlert} />
        </Switch>
      </div>
    );
  }
}

export default withAuth(App);
