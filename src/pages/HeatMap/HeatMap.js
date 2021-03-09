import React, { Component } from 'react';
import './HeatMap.css'

import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoiZmVkZW11bmllbnRlIiwiYSI6ImNrbHh6ZnA2MjB1bzYydXJ6c3Zxd3JnaG0ifQ.MYXBWDkRnwRoUQn8Dz1RRg';

class Heatmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 2.1896,
      lat: 41.3988,
      zoom: 14,
      alerts: [[2.19, 41.39],[2.19, 41.38]],
    };
    this.mapContainer = React.createRef();
  }
  
  componentDidMount() {
    const { lng, lat, zoom } = this.state;    
    
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    
    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    
    
    this.state.alerts.map( (singleAlert) => {
      return new mapboxgl.Marker({
      color: "#ca0043",
      draggable: false
    }).setLngLat(singleAlert)
    .addTo(map);
  })   
}


  render() {

    const { lng, lat, zoom } = this.state;
    return (
      <div>
        <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    )
  }
}

export default Heatmap;