/* global document */
import React, { useState } from 'react';
import MapGL, { Marker } from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZm9jdXMtamsiLCJhIjoiY2s2aHg3OGhwMGRwOTNrdGkwNzhhMGNqYiJ9.Bh94-cyf4LgURAD9WLxLXA'; // Set your mapbox token here

const Map = () => {
    const [viewport, setViewport] = useState({
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14,
        bearing: 0,
        pitch: 0
    });
    const [location, setLocation] = useState({})
    const setUserLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            let setUserLocation = {
                lat: position.coords.latitude,
                long: position.coords.longitude
            };
            let newViewport = {
                height: "100vh",
                width: "100vw",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 10
            };
            setLocation({
                viewport: newViewport,
                userLocation: setUserLocation
            });
        });
    };
    return (
        <MapGL
            {...viewport}
            width="100vw"
            height="100vh"
            mapStyle="mapbox://styles/mapbox/dark-v9"
            onViewportChange={setViewport}
            // mapboxApiAccessToken={MAPBOX_TOKEN}
            // {...viewport}
            // mapStyle="mapbox://styles/mapbox/outdoors-v11"
            // onViewportChange={viewport => setViewport({ viewport })}
            mapboxApiAccessToken={MAPBOX_TOKEN}
        >
            {/* <Marker>I'm Here!!!</Marker> */}
        </MapGL>
    );
}
export default Map;