import React, { useEffect, useState } from "react";
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
        if (prevIndex >= medias.length - 1 || prevIndex === -1) {
          // Calcul du temps total à passer sur tous les camions
          const totalTruckTime = Math.ceil(trucks.length / 10) * 2000; // 10 seconds for each set of 10 trucks
          setIntervalDuration(totalTruckTime); // Set interval duration to totalTruckTime

          return 0; // Reset mediaIndex to 0
        } else {
          // Otherwise, advance to the next media
          if (medias.length > 0 && prevIndex + 1 < medias.length) {
            setIntervalDuration(medias[prevIndex + 1].duration * 1000); // Set interval duration to the duration of the media
          }
          return prevIndex + 1;
        }
      });
    }, intervalDuration);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, [medias, intervalDuration, trucks]); // Add trucks to dependency array

  return (
    <div className="App">
      {mediaIndex === -1 ? (
        <TruckList trucks={trucks} />
      ) : (
        <MediaDisplay media={medias[mediaIndex]} />
      )}
    </div>
  );
}

export default App;
