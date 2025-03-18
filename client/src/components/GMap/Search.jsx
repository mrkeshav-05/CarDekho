import React, { useRef, useState } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import { GMapAPI, PUBLIC_MAP_ID } from "../../keys";

const containerStyle = {
  width: "400px",
  height: "40px",
};

const apiKey = {GMapAPI};

const AutocompleteExample = () => {
  const [options, setOptions] = useState([]);
  const autocompleteRef = useRef(null);

  const onLoad = (autoC) => {
    autocompleteRef.current = autoC;
    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
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
    <LoadScript googleMapsApiKey={apiKey}>
      <Autocomplete onLoad={onLoad}>
        <input
          type="text"
          placeholder="Enter a location"
          style={containerStyle}
        />
        <ul>
          {options.map((option, index) => (
            <li key={index}>
              {option.description} ({option.lat}, {option.lng})
            </li>
          ))}
        </ul>
      </Autocomplete>
    </LoadScript>
  );
};

export default AutocompleteExample;