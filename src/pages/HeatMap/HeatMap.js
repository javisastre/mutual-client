import React, { Component } from "react";
import alertService from "./../../services/alert-service";
import "./HeatMap.css";

import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  "pk.eyJ1IjoiZmVkZW11bmllbnRlIiwiYSI6ImNrbHh6ZnA2MjB1bzYydXJ6c3Zxd3JnaG0ifQ.MYXBWDkRnwRoUQn8Dz1RRg";

class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Poblenou coords
      viewLng: 2.1945,
      viewLat: 41.3988,
      viewZoom: 14,
      // alertDB
      alerts: [
        {
          "active": false,
          "person": "604783be98faba5c88f6e3c3",
          "location": [2.1908485, 41.3988098, 0],
          "publish": true,
          "category": ["others"],
          "story": "example story",
          "hour": "15:18:38",
          "date": "09/03/2021",
        },
      ],
      colorCode: {
        gender: "#bb00fd", // purple
        race: "#0296f0", // blue
        sexualorientation: "#fff400", // yellow
        ideology: "#06bd00", // light green
        religion: "#e7005d", // pink
        others: "#ff3131", // red
      },
    };
    this.mapContainer = React.createRef();
  }

  loadAlertsFromDB = async () => {
    try {
      const alerts = await alertService.heatmap();
      this.setState({ alerts });
    } catch (error) {
      console.log(error);
    }
  };

  printAlerts = (heatmap) => {
    this.state.alerts.map((al) => {
      return new mapboxgl.Marker({
        color: this.state.colorCode[al.category[0]],
        draggable: false,
      })
        .setLngLat(al.location)
        .addTo(heatmap);
    });
  };

  async componentDidMount() {
    try {
      await this.loadAlertsFromDB();

      // MapBox map load with the state's data
      const { viewLng, viewLat, viewZoom } = this.state;
      const heatmap = new mapboxgl.Map({
        container: this.mapContainer.current,
        style: "mapbox://styles/mapbox/bright-v8",
        center: [viewLng, viewLat],
        zoom: viewZoom,
      });

      // MapBox map movement function
      heatmap.on("move", () => {
        this.setState({
          viewLng: heatmap.getCenter().lng.toFixed(4),
          viewLat: heatmap.getCenter().lat.toFixed(4),
          viewZoom: heatmap.getZoom().toFixed(2),
        });
      });

      // Print the array of public alerts coming from the DB
      this.printAlerts(heatmap);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <div ref={this.mapContainer} className='map-container' />
      </div>
    );
  }
}
export default HeatMap;
