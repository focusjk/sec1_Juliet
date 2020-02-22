import React from 'react';
import ReactMapGL from 'react-map-gl';
import LocationOnIcon from "@material-ui/icons/LocationOn";

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZm9jdXMtamsiLCJhIjoiY2s2aHg3OGhwMGRwOTNrdGkwNzhhMGNqYiJ9.Bh94-cyf4LgURAD9WLxLXA';
// Set your mapbox token here

class Map extends React.Component {
    state = {
        viewport: { longitude: 100.493117, latitude: 13.769059, zoom: 10 }
    };
    handleChange = (viewport) => {
        this.setState({ viewport })
        const { longitude, latitude } = viewport
        this.props.setLocation(longitude.toFixed(6), latitude.toFixed(6))
    }



    render() {
        const { viewport } = this.state;

        return (
            <ReactMapGL {...viewport}
                width="100%"
                height="300px"
                onViewportChange={viewport => this.handleChange(viewport)}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <LocationOnIcon fontSize="large" style={{ color: 'red' }} />
                </div>
            </ReactMapGL>
        );
    }
}
export default Map;