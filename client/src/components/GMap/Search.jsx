import React, { useRef, useState } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import { GMapAPI } from "../../keys"; // Ensure this is a string

const containerStyle = {
  width: "400px",
  height: "40px",
};

// Keep the API key as a string
const apiKey = GMapAPI;

const AutocompleteExample = () => {
  const [options, setOptions] = useState([]);
  const autocompleteRef = useRef(null);

  const onLoad = (autoC) => {
    autocompleteRef.current = autoC;
    autoC.addListener("place_changed", () => {
      const place = autoC.getPlace();
      if (place.geometry) {
        const { location } = place.geometry;
        setOptions([
          {
            description: place.name,
            lat: location.lat(),
            lng: location.lng(),
          },
        ]);
      }
    });
  };

  return (
    <Autocomplete onLoad={onLoad}>
      <input type="text" placeholder="Enter a location" style={containerStyle} />
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            {option.description} ({option.lat}, {option.lng})
          </li>
        ))}
      </ul>
    </Autocomplete>
  );
};

// Wrap with LoadScript outside the component
const WrappedAutocompleteExample = () => (
  <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
    <AutocompleteExample />
  </LoadScript>
);

export default WrappedAutocompleteExample;