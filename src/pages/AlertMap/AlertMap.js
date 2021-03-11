import React, { Component } from "react";
import alertService from "./../../services/alert-service";
import "./AlertMap.css";
import { Link } from "react-router-dom";

import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  "pk.eyJ1IjoiZmVkZW11bmllbnRlIiwiYSI6ImNrbHh6ZnA2MjB1bzYydXJ6c3Zxd3JnaG0ifQ.MYXBWDkRnwRoUQn8Dz1RRg";

class AlertMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewLat: 41.3988,
      viewLng: 2.1945,
      viewZoom: 16,
      alert: null,
    };
    this.mapContainer = React.createRef();
  }

  loadAlertData = async () => {
    try {
      const alert = await alertService.active(this.props.match.params.alertId);
      this.setState({
        alert,
        viewLng: alert.location[0],
        viewLat: alert.location[1],
      });
    } catch (error) {
      console.log(error);
    }
  };

  printAlert = (map) => {
    new mapboxgl.Marker({
      color: "#ff033e",
      draggable: false,
    })
      .setLngLat(this.state.alert.location)
      .addTo(map);
  };

  async componentDidMount() {
    try {
      await this.loadAlertData();

      // MapBox map load with the state's data
      const { viewLng, viewLat, viewZoom } = this.state;
      const alertMap = new mapboxgl.Map({
        container: this.mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [viewLng, viewLat],
        zoom: viewZoom,
      });

      // MapBox map movement function
      alertMap.on("move", () => {
        this.setState({
          viewLng: alertMap.getCenter().lng.toFixed(4),
          viewLat: alertMap.getCenter().lat.toFixed(4),
          viewZoom: alertMap.getZoom().toFixed(2),
        });
      });

      // Print the array of public alerts coming from the DB
      this.printAlert(alertMap);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <div
          ref={this.mapContainer}
          className='map-container'
          id='single-alert-map'
        />
        {this.state.alert ? (
          <div className='alert-user-info'>
            <Link to='/alerts'>Back</Link>
            <div className='alert-bar-text'>
              <p>Sent by:</p>
              <p className='alert-bar-username'>
                {this.state.alert.person.username}
              </p>
              <p>{this.state.alert.hour}</p>
              <p>{this.state.alert.date}</p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default AlertMap;
