import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { withAuth } from "./context/auth-context";

// Pages
import MainPage from "./pages/MainPage/MainPage";
import HeatMap from "./pages/HeatMap/HeatMap";
import AlertList from "./pages/AlertList/AlertList";
import Profile from "./pages/Profile/Profile";
import Netsform from "./pages/Netsform/Netsform";
import AlertMap from "./pages/AlertMap/AlertMap";

// Components
import Navbar from "./components/Navbar/Navbar";
// import AnonRoute from "./components/AnonRoute/AnonRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App () {
  return (
    <div className='container'>
      <Navbar />
      <Switch>
        <Route exact path='/' component={MainPage} />
        <PrivateRoute exact path='/nets' component={Netsform} />
        <PrivateRoute exact path='/heatmap' component={HeatMap} />
        <PrivateRoute exact path='/alerts' component={AlertList} />
        <PrivateRoute exact path='/profile' component={Profile} />

        <PrivateRoute
          exact
          path='/alerts/map/:alertId'
          component={AlertMap}
        />
      </Switch>
    </div>
  );
}

export default withAuth(App);
