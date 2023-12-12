import React, {useEffect, useState} from "react";
import TruckList from "./Components/TruckList";
import MediaDisplay from "./Components/MediaDisplay";
import dataService from "./services/dataService";
import './App.css';




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
    const [trucks, setTrucks] = useState([]);
    const [medias, setMedias] = useState([]);
    const [settings, setSettings] = useState([]);
    const [mediaIndex, setMediaIndex] = useState(-1);
    const [truckIndex, setTruckIndex] = useState(0);
    const [resetInterval, setResetInterval] = useState(false);
    const [intervalDuration, setIntervalDuration] = useState(30000); // Default to 30 seconds

    // Fetch data from server
    const fetchData = async () => {
        try {
            const [trucksData, mediasData, settingsData] = await Promise.all([
                dataService.getTrucks(),
                dataService.getMedias(),
                dataService.getSettings()
            ]);
            setTrucks(trucksData);
            setMedias(mediasData);
            setSettings(settingsData[0]);
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData()
    }, []);

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
                if (prevIndex === -1) {
                    // Check if more truck pages are available
                    if ((truckIndex + 1) * 10 < trucks ? trucks.length : 0) {
                        // Move to the next truck page
                        setTruckIndex(truckIndex + 1);
                        return -1;
                    } else if (medias && medias.length > 0) {
                        // Switch to media if available
                        setTruckIndex(0); // Reset truck index
                        setIntervalDuration(medias[0]?.duration * 1000 || 2000); // Duration for first media
                        return 0;
                    } else {
                        // If no media, keep displaying trucks
                        fetchData()
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
        <div className="App">
            {/*<DebugInfo*/}
            {/*    mediaIndex={mediaIndex}*/}
            {/*    intervalDuration={intervalDuration}*/}
            {/*    trucks={trucks}*/}
            {/*    medias={medias}*/}
            {/*    settings={settings.dureeDefilement}*/}
            {/*/>*/}
            {mediaIndex !== -1 && Array.isArray(medias) ? (
                <MediaDisplay media={medias[mediaIndex]}/>
            ) : (
                <TruckList trucks={getCurrentTruckPage()} duration={settings.dureeDefilement}/>
            )}
        </div>
    );
}

export default App;
