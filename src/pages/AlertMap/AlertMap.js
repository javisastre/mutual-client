import React, { Component } from "react";

class AlertMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewLng: 2.1945,
      viewLat: 41.3988,
      viewZoom: 16,
      alert: [],
    };
    this.mapContainer = React.createRef();
  }

  loadAlertData = async () => {
    const alert = await alertService.heatmap();
    this.setState({ alert });
  };

  async componentDidMount() {
    await this.loadAlertData();

    // MapBox map load with the state's data
    const { viewLng, viewLat, viewZoom } = this.state;
    const heatmap = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
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
  }

  render() {
    return (
      <div>
        <div ref={this.mapContainer} className='map-container' />
      </div>
    );
  }
}

export default AlertMap;
