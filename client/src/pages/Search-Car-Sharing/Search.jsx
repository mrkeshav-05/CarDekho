import React, { useState , useRef} from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar.jsx";
import GMap from "../../components/GMap/GMap";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { GMapAPI } from "../../keys";
import TripList from "../../components/TripCard/TripList";
import "./SearchTrip.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinearProgress from '@mui/material/LinearProgress';

function SearchTrip({ user,setIsLoggedIn }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date());
  const [resdata, setResdata] = useState([]);
  const [routeLoading, setRouteLoading] = useState();
  const [directionResponses, setDirectionsResponses] = useState();

  const sourceRef = useRef();
  const destinationRef = useRef();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyClnzcci8V997acQhlpEiYhaLlz_ogR_Vc",
    libraries: ["places"],
  });
  if (!isLoaded) return <div><LinearProgress/></div>;

  async function calculateRoute() {
    if (source === "" || destination === "") {
      toast.error("Please enter Origin and Destination", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    setRouteLoading(true);
    const directionsService = new window.google.maps.DirectionsService()

    try {
      const results = await directionsService.route({
        origin: source,
        destination: destination,
        provideRouteAlternatives: true,
        travelMode: "DRIVING",
      });
      setRouteLoading(false);

      if (results.status !== "OK") {
        throw new Error("Error: " + results.status);
      }
      setDirectionsResponses(results);
    } catch (error) {
      toast.error(`Error calculating route: ${error.message}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      setRouteLoading(false);
    }
  }

  const onSourceChange = () => {
    setSource(sourceRef.current.value);
  };
  const handleDestinationChange = () => {
    setDestination(destinationRef.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSource(sourceRef.current.value)
    setDestination(destinationRef.current.value)
    calculateRoute()
    const data = {
      source,
      destination,
      time: date,
      user: user
    };
    console.log(data);
    try {
      const response = await axios.post(
        "https://car-saathi.onrender.com/api/trip/findtrip",
        data
      );
      setResdata(response.data.trip);
      console.log(resdata);
      console.log("hi from search page");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Navbar user={user} setIsLoggedIn={setIsLoggedIn}/>
      <div className="container flex flex-col">
        <div className="Top flex">
          <div className="left-section p-4">
            <h1 className="title">Search a Ride</h1>
            <form onSubmit={handleSubmit} className="form">
              <label className="label">
                Source:
                <Autocomplete onPlaceChanged={onSourceChange}>
                  <input
                    type="text"
                    placeholder="Enter source location"
                    ref={sourceRef}
                    required
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </Autocomplete>
              </label>
              <label className="label">
                Destination:
                <Autocomplete onPlaceChanged={handleDestinationChange}>
                  <input
                    type="text"
                    required
                    placeholder="Enter destination location"
                    ref={destinationRef}
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </Autocomplete>
              </label>
              <label className="label">
                Date:
                <input
                  type="date"
                  value={date.toISOString().slice(0, 10)}
                  onChange={(e) => setDate(new Date(e.target.value))}
                  className="input"
                />
              </label>
              <button type="submit" className="search-btn">
                Search
              </button>
            </form>
          </div>
          <div className="left-section">
          {<GMap apiKey={GMapAPI} start={source} end={destination} directionsResponses={directionResponses} />}
        </div>
        </div>
        <div className="grid grid-cols-2">
          <TripList trips={resdata} />
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default SearchTrip;
