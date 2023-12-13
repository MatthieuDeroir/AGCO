import React, {useEffect, useState} from "react";
import TruckList from "./Components/TruckList";
import MediaDisplay from "./Components/MediaDisplay";
import dataService from "./services/dataService";
import Veille from "./Components/Veille";
import moment from "moment";
import './Global.css';


const DebugInfo = ({mediaIndex, intervalDuration, trucks, medias, settings}) => {
    // Ensure trucks and medias are arrays before accessing their length
    const trucksLength = Array.isArray(trucks) ? trucks.length : 0;
    const mediasLength = Array.isArray(medias) ? medias.length : 0;

    return (
        <div style={{textAlign: 'left', margin: '10px', padding: '10px', border: '1px solid #ccc'}}>
            <h4>Debug Information:</h4>
            <p>Media Index: {mediaIndex}</p>
            <p>Interval Duration: {intervalDuration}</p>
            <p>Number of Trucks: {trucksLength}</p>
            <p>Number of Medias: {mediasLength}</p>
            <p>Settings: {JSON.stringify(settings)}</p>
        </div>
    );
};


function App() {
    const [time, setTime] = useState(0);
    const [trucks, setTrucks] = useState([]);
    const [medias, setMedias] = useState([]);
    const [settings, setSettings] = useState([]);
    const [mediaIndex, setMediaIndex] = useState(-1);
    const [truckIndex, setTruckIndex] = useState(0);
    const [resetInterval, setResetInterval] = useState(false);
    const [intervalDuration, setIntervalDuration] = useState(10000);

    // Fetch data from server
    const fetchData = async () => {
        //set time with current time
        setTime(new Date().toLocaleTimeString());
        try {
            const [trucksData, mediasData, settingsData] = await Promise.all([
                dataService.getTrucks(),
                dataService.getMedias(),
                dataService.getSettings()
            ]);
            setTrucks(trucksData);
            setMedias(mediasData);
            setSettings(settingsData[0]);
            setIntervalDuration(settingsData[0].dureeDefilement * 1000); // Duration for trucks
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData()
    }, []);

    const isWithinVeilleTime = (currentTime, startTime, endTime) => {
        const current = moment(currentTime, 'HH:mm');
        const start = moment(startTime, 'HH:mm');
        const end = moment(endTime, 'HH:mm');
        console.log("Veille time ? " + startTime + endTime + current.isBetween(start, end));
        return current.isBetween(start, end);
    };

    const hasTrucks = Array.isArray(trucks) && trucks.length > 0;
    const hasMedias = Array.isArray(medias) && medias.length > 0;

    const shouldDisplayVeille = !hasTrucks && !hasMedias;
    const shouldDisplayMedias = !hasTrucks && hasMedias;
    const isVeilleTime = isWithinVeilleTime(time, settings.debutVeille, settings.finVeille);

    const getCurrentTruckPage = () => {
        if (!Array.isArray(trucks) || trucks.length === 0) {
            // Return an empty array if trucks is not an array or is empty
            return [];
        }

        const startIndex = truckIndex * 10;
        return trucks.slice(startIndex, startIndex + 10);
    };


    useEffect(() => {
        const timer = setInterval(() => {
            setMediaIndex((prevIndex) => {
                fetchData().then(() => {
                    console.log("Data refreshed");
                });
                if (prevIndex === -1) {
                    // Check if more truck pages are available even if there is less than 10 trucks
                    if (trucks && trucks.length > 0 && truckIndex < Math.ceil(trucks.length / 10) - 1) {
                        // Move to the next truck page
                        setTruckIndex(truckIndex + 1);
                        setIntervalDuration(settings.dureeDefilement * 1000); // Duration for trucks
                        return -1;
                    } else if (medias && medias.length > 0) {
                        // Switch to media if available
                        setTruckIndex(0); // Reset truck index
                        setIntervalDuration(medias[mediaIndex]?.duration * 1000 || 2000); // Duration for first media
                        return 0;
                    } else {
                        // If no media, keep displaying trucks
                        setTruckIndex(0); // Reset truck index
                        return -1;
                    }
                } else if (prevIndex >= medias.length - 1) {
                    // After the last media, show first truck page

                    setIntervalDuration(settings.dureeDefilement * 1000); // Duration for trucks
                    setTruckIndex(0); // Start from the first truck page
                    return -1;
                } else {
                    // Move to the next media and set its duration
                    const nextMediaDuration = medias[prevIndex + 1]?.duration * 1000 || 2000;
                    setIntervalDuration(nextMediaDuration);
                    return prevIndex + 1;
                }
            });
        }, intervalDuration);

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(timer);
        };
    }, [resetInterval, medias, settings, truckIndex, trucks ? trucks.length : 0]);


    useEffect(() => {
        setResetInterval(prev => !prev);
    }, [mediaIndex, intervalDuration]);


    return (
        <div
        style={{
          maxHeight: `${process.env.REACT_APP_HEIGHT}px`,
          maxWidth: `${process.env.REACT_APP_WIDTH}px`,
          overflow: "hidden",
        }}
      >
            {isVeilleTime || shouldDisplayVeille ? (
                <Veille/>
            ) : shouldDisplayMedias || mediaIndex !== -1 ? (
                <MediaDisplay media={medias[mediaIndex]}/>
            ) : (
                <TruckList trucks={getCurrentTruckPage()} duration={settings.dureeDefilement}/>
            )}
        </div>
    );
}

export default App;
