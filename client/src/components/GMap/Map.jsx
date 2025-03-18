import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  Autocomplete,
} from "@react-google-maps/api";

const Map = ({ directionsResponses }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [source, setSource] = useState();
  const [selectedRouteIndex, setSelectedRouteIndex] = useState();

  const handleRouteClick = (index) => {
    setSelectedRouteIndex(index);
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current location:", error);
          setError("Error getting current location");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  }, []);

  const mapContainerStyle = {
    height: "420px",
    width: "108%",
    margin: "20px auto",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "80%" }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={currentLocation || { lat: -34.397, lng: 150.644 }}
          >
            {currentLocation && <Marker position={currentLocation} />}
            {directionsResponses &&
              directionsResponses.routes.map((route, index) => (
                <DirectionsRenderer
                  key={index}
                  directions={{ ...directionsResponses, routes: [route] }}
                  options={{
                    polylineOptions: {
                      strokeColor: "blue",
                      strokeOpacity: index === selectedRouteIndex ? 1 : 0.5,
                      strokeWeight: index === selectedRouteIndex ? 8 : 4,
                    },
                  }}
                  onClick={() => handleRouteClick(index)}
                />
              ))}
            {(!directionsResponses ||
              directionsResponses.routes.length === 0) && (
              <p>Please enter valid route locations.</p>
            )}
            {error && <p>{error}</p>}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default Map;
