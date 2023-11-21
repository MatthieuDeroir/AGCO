import React, { useEffect, useState } from 'react';
import TruckList from "./Components/TruckList";
import MediaDisplay from "./Components/MediaDisplay";
import dataService from "./services/dataService";

function App() {
  const [trucks, setTrucks] = useState([]);
  const [medias, setMedias] = useState([]);
  const [mediaIndex, setMediaIndex] = useState(-1);
  const [truckIndex, setTruckIndex] = useState(0);
  const [intervalDuration, setIntervalDuration] = useState(2000); // Default to 10 seconds

  // Fetch data from server
  const fetchData = async () => {
    try {
      const [trucksData, mediasData] = await Promise.all([
        dataService.getTrucks(),
        dataService.getMedias(),
      ]);
      setTrucks(trucksData);
      setMedias(mediasData);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setMediaIndex((prevIndex) => {
 
        if (prevIndex >= medias.length - 1 ) {
          setIntervalDuration(2000); // Set duration to 10 seconds for trucks
          setTruckIndex((prevTruckIndex) => {
            console.log("Previous truck index:", prevTruckIndex);
            if (prevTruckIndex >= trucks.length - 10) {
                console.log("Looping back to start"+ prevIndex);
              return 0; // Loop back to start
            } else {
                console.log("Moving to next group of trucks"+ prevIndex);
              return prevTruckIndex + 10; // Move to next group of trucks
            }
          });
          console.log("Moving to trucks"+ prevIndex);
          return -1;  // Loop back to show trucks
        } else {
            console.log("Moving to next media"+ prevIndex);
          setIntervalDuration(medias[prevIndex + 1].duration * 1000); // Set duration to media duration
          return prevIndex + 1;
        }
      });
    }, intervalDuration);

    return () => {
      clearInterval(timer);
    };
  }, [medias, intervalDuration, trucks]);

  return (
    <div className="App">
      {mediaIndex === -1 ? (
        <TruckList trucks={trucks.slice(truckIndex, truckIndex + 10)} />
      ) : (
        <MediaDisplay media={medias[mediaIndex]} />
      )}
    </div>
  );
}

export default App;