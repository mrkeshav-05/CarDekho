import React from 'react';
import TripCard from './TripCard'; 

const TripList = ({ trips, user}) => {
  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    if(arr){
      for (let i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size));
      }
    }
    
    return chunkedArr;
  };
  console.log(trips);
  const chunkedTrips = chunkArray(trips, 2);

  return (
    <div className=" ml-16">
      {trips.length === 0 ? (
        <div className="text-center mt-8 text-gray-500">No Trips Exist</div>
      ) : (
        <div>
          {chunkedTrips.map((row, rowIndex) => (
            <div key={rowIndex} className="flex mb-4">
              {row.map((trip, index) => (
                <div key={index} className="flex-1 mx-4">
                  <TripCard trip={trip} user={user}/>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripList;
