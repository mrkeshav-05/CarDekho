import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService} from '@react-google-maps/api';
import Map from './Map';

const GMap = ({ apiKey , start, end, directionsResponses}) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [response, setResponse] = useState('hello');
    const [error, setError] = useState(null);
    return <Map apiKey={apiKey} start={start} end={end} directionsResponses={directionsResponses}/>

    //? Function to get user live location using browser
   
};

export default GMap;
