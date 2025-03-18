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
                {/* Marker */}
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
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "black",
                      position: "relative",
                      top: "20px", // Moves the label below the marker
                      whiteSpace: "nowrap",
                    }}
                  >
                    You are here
                  </div>
                </OverlayView>
              </>
            )}

            {directionsResponses?.routes?.map((route, index) => (
              <DirectionsRenderer
                key={index}
                directions={{ ...directionsResponses, routes: [route] }}
                options={{
                  polylineOptions: {
                    strokeColor: index === selectedRouteIndex ? "red" : "blue",
                    strokeOpacity: index === selectedRouteIndex ? 1 : 0.6,
                    strokeWeight: index === selectedRouteIndex ? 6 : 4,
                  },
                }}
                onClick={() => setSelectedRouteIndex(index)}
              />
            ))}

            {error && <p>{error}</p>}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default Map;