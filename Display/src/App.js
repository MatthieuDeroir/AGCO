import React, { useEffect, useState } from "react";
import TruckList from "./Components/TruckList";
import MediaDisplay from "./Components/MediaDisplay";
import dataService from "./services/dataService";

function App() {
  const [trucks, setTrucks] = useState([]);
  const [medias, setMedias] = useState([]);
  const [mediaIndex, setMediaIndex] = useState(-1);
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // If there are no medias, don't start the interval
    if (medias && medias.length === 0) return;

    const timer = setInterval(() => {
      // Increment media index to move to the next media
      setMediaIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        // If we've reached the end of the media array, reset the index to 0
        if (nextIndex >= medias.length) {
          const roundedTruckCount = Math.ceil(trucks.length / 10) * 10;
          setIntervalDuration(roundedTruckCount * 1000);
          fetchData();
          return -1;
        }

        // Otherwise, return the next index
        return nextIndex;
      });

      // Update the interval duration to the next media's duration if media is defined
      if (medias[mediaIndex]) {
        setIntervalDuration(medias[mediaIndex].duration * 1000);
      } else {
        setIntervalDuration(2000);
      }
    }, intervalDuration);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, [medias, mediaIndex, intervalDuration]);

  return (
    <div className="App">
      {mediaIndex >= 0 && medias[mediaIndex] ? (
        <MediaDisplay media={medias[mediaIndex]} />
      ) : (
        <TruckList trucks={trucks} />
      )}
    </div>
  );
}

export default App;
