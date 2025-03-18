import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  OverlayView,
} from "@react-google-maps/api";

const Map = ({ directionsResponses }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds timeout
      maximumAge: 0, // Do not use cached location
    };

    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ lat: latitude, lng: longitude });
      setError(null); // Reset error if location is retrieved successfully
    };

    const errorCallback = (err) => {
      console.error("Geolocation error:", err);

      switch (err.code) {
        case 1:
          setError("Location access denied. Please allow location permissions.");
          break;
        case 2:
          setError("Location unavailable. Trying again...");
          setTimeout(() => navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options), 5000);
          break;
        case 3:
          setError("Location request timed out. Please try again.");
          break;
        default:
          setError("An unknown error occurred.");
      }
    };

    const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, options);

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const mapContainerStyle = {
    height: "420px",
    width: "100%",
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
            {currentLocation && (
              <>
                {/* User's Current Location Marker */}
                <Marker
                  position={currentLocation}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  }}
                />

                {/* Label below the marker */}
                <OverlayView
                  position={currentLocation}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "black",
                      position: "relative",
                      top: "20px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    You are here
                  </div>
                </OverlayView>
              </>
            )}

            {/* Render multiple routes with color distinction */}
            {directionsResponses?.routes?.map((route, index) => (
              <div
                key={index}
                onClick={() => setSelectedRouteIndex(index)}
                style={{ cursor: "pointer" }} // Ensures clickable area
              >
                <DirectionsRenderer
                  directions={{ ...directionsResponses, routes: [route] }}
                  options={{
                    polylineOptions: {
                      strokeColor: index === selectedRouteIndex ? "red" : "blue",
                      strokeOpacity: index === selectedRouteIndex ? 1 : 0.6,
                      strokeWeight: index === selectedRouteIndex ? 6 : 4,
                    },
                  }}
                />
              </div>
            ))}
          </GoogleMap>
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Map;