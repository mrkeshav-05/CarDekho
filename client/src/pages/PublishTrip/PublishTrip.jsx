import React, { useEffect, useRef } from "react";
import { useState } from "react";
import GMap from "../../components/GMap/GMap";
import {
  Autocomplete,
  useLoadScript,
} from "@react-google-maps/api";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,

  p: 4,
};

const GMapAPI = import.meta.env.VITE_GOOGLE_MAP_API;
function PublishTrip({ user, setUser, setIsLoggedIn }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GMapAPI,
    libraries: ["places", "geometry"],
  });
  console.log("Google Maps API Key:", GMapAPI);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [availableSeats, setAvailableSeats] = useState();
  const [selectedRouteIndex, setSelectedRouteIndex] = useState('');
  const [carModel, setCarModel] = useState("");
  const [maxSeats, setMaxSeats] = useState();
  const [date, setDate] = useState(new Date());
  const [fare, setFare] = useState(0);
  const navigate = useNavigate();
  const sourceRef = useRef();
  const destinationRef = useRef();
  const [routeLoading, setRouteLoading] = useState();
  const [directionResponses, setDirectionsResponses] = useState();



  const [isOpen, setIsOpen] = useState(false);

  //!open modal when publish click button pressed
  const handlePublishClick = () => {
    setIsOpen(true)
  }

  //!When the user finally click on yes
  const handleYes = async () => {
    try {
      const source1 = directionResponses.routes[selectedRouteIndex].legs[0].start_address
      const destination1 = directionResponses.routes[selectedRouteIndex].legs[0].end_address
      const totalTime =
        directionResponses.routes[selectedRouteIndex].legs[0].duration.text;
      const totalDistance =
        directionResponses.routes[selectedRouteIndex].legs[0].distance.text;
      const route = directionResponses.routes[0].summary;
      const data = {
        source: source1,
        destination: destination1,
        availableSeats,
        CarModel: carModel,
        Max_Seats: maxSeats,
        time: date,
        fare,
        driver: user,
        routes: route,
        totalTime,
        totalDistance,
      }
      console.log(data)
      const res = await axios.post('api/trip/createtrip', data);
      console.log(res);
      toast.success('Trip Published Successfully');
      navigate('/')
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  }

  //!when user click cancel
  const handleCancel = () => {
    setIsOpen(false)
  }


  useEffect(() => {
    console.log(selectedRouteIndex);
  }, [selectedRouteIndex]);
  if (!isLoaded) return <div>Loading...</div>;


  if (!isLoaded) return <div>Loading... Hi Hi</div>;

  const onSourceChange = (place) => {
    setSource(sourceRef.current.value);
  };
  const handleRouteClick = (index) => {
    setSelectedRouteIndex(index);
  };
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
    const directionsService = new window.google.maps.DirectionsService();

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

      console.log(results.routes);
      setDirectionsResponses(results);
    } catch (error) {
      console.error("Error calculating route:", error);
      toast(
        <div className="border border-red-500 text-red-500 font-semibold rounded-md p-3 shadow-md">
          Error calculating route: {error.message}
        </div>,
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
  const handleDestinationChange = () => {
    setDestination(destinationRef.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (maxSeats < 1) {
      toast.info("Maximum Seats should be greater than 0.");
      return;
    }
    if (new Date(date) < new Date()) {
      toast.warning("Date should be selected from today onwards.");
      return;
    }
    if (fare <= 0) {
      toast.warning("Fare should be greater than 0.");
      return;
    }
    if (!directionResponses) {
      toast.error('Click on Show Route')
      return;
    }
    if (selectedRouteIndex === '') {
      toast.error('Select any route')
      return;
    }
    handlePublishClick();
  };

  return (
    <>
      <div className="z-10">
        <Navbar user={user} setIsLoggedIn={setIsLoggedIn} />
      </div>
      <div className="container mx-auto px-4 py-8 flex">
        <div className="w-1/2 pr-4">
          <h1 className="text-4xl font-bold mb-6">Publish a Ride</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="Source"
                className="block text-gray-700 font-bold mb-2"
              >
                Source
              </label>
              <Autocomplete onPlaceChanged={onSourceChange}>
                <input
                  type="text"
                  placeholder="Enter source location"
                  ref={sourceRef}
                  required
                  className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Autocomplete>
            </div>
            <div className="mb-4">
              <label
                htmlFor="Destination"
                className="block text-gray-700 font-bold mb-2"
              >
                Destination
              </label>
              <Autocomplete onPlaceChanged={handleDestinationChange}>
                <input
                  type="text"
                  required
                  placeholder="Enter destination location"
                  ref={destinationRef}
                  className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Autocomplete>
            </div>

            <div className="mb-4">
              <label
                htmlFor="availableSeats"
                className="block text-gray-700 font-bold mb-2"
              >
                Available Seats
              </label>
              <input
                type="text"
                required
                id="availableSeats"
                value={availableSeats}
                onChange={(e) => {
                  setAvailableSeats(e.target.value);
                }}
                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="carModel"
                className="block text-gray-700 font-bold mb-2"
              >
                Car Model
              </label>
              <input
                type="text"
                id="carModel"
                required
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="maxSeats"
                className="block text-gray-700 font-bold mb-2"
              >
                Max Seats
              </label>
              <input
                type="text"
                id="maxSeats"
                required
                value={maxSeats}
                onChange={(e) => setMaxSeats(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 font-bold mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="fare"
                className="block text-gray-700 font-bold mb-2"
              >
                Fare
              </label>
              <input
                type="text"
                id="fare"
                required
                value={fare}
                onChange={(e) => setFare(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Publish
              </button>
              <button
                type="button"
                onClick={calculateRoute}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Show Routes
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/2">
          {
            <GMap
              apiKey={GMapAPI}
              start={source}
              end={destination}
              directionsResponses={directionResponses}
            />
          }
          {directionResponses && (
            <div className=" mt-4 p-4 border w-[80%] m-auto flex flex-col gap-4 overflow-y-auto h-[200px]">
              {directionResponses.routes.map((route, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`route${index}`}
                    name="routes"
                    value={index}
                    checked={selectedRouteIndex === index}
                    onChange={() => handleRouteClick(index)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`route${index}`}
                    className="flex-grow py-2 px-4 bg-gray-100 rounded-lg cursor-pointer"
                  >
                    <div className="font-semibold">{route.summary}</div>
                    <div className="text-sm text-gray-600">
                      <div>Distance: {route.legs[0].distance.text}</div>
                      <div>Duration: {route.legs[0].duration.text}</div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        <Modal
          open={isOpen}
          onClose={handleCancel}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="text-lg">
              Are you sure you want to confirm the trip ?
            </div>
            <div className="flex justify-between mt-4">
              <Button
                variant="outlined"
                color="success"
                size="large"
                onClick={handleYes}
              >
                YES
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="large"
                onClick={handleCancel}
              >
                NO
              </Button>
            </div>
          </Box>
        </Modal>
        <ToastContainer />
      </div>
    </>
  );
}

export default PublishTrip;
