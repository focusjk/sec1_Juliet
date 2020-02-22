/* global document */
import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import LocationOnIcon from "@material-ui/icons/LocationOn";

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZm9jdXMtamsiLCJhIjoiY2s2aHg3OGhwMGRwOTNrdGkwNzhhMGNqYiJ9.Bh94-cyf4LgURAD9WLxLXA';
// Set your mapbox token here

class Map extends React.Component {
    state = {
        viewport: { longitude: 100.493117, latitude: 13.769059, zoom: 15 },
        marker: { longitude: null, latitude: null }
    };
    componentDidMount() {
        const { longitude, latitude } = this.props
        this.setState({ marker: { longitude, latitude } })
    }
    handleChange = (viewport) => {
        this.setState({ viewport })
    }

    render() {
        const { viewport, marker } = this.state;

        return (
            <ReactMapGL {...viewport}
                width="100%"
                height="300px"
                onViewportChange={viewport => this.handleChange(viewport)}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <Marker longitude={marker.longitude} latitude={marker.latitude}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <LocationOnIcon fontSize="large" style={{ color: 'red' }} />
                    </div>
                </Marker>
            </ReactMapGL>
        );
    }
}
export default Map;