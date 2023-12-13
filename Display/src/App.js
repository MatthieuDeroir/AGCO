import React, {useEffect, useState} from "react";
import TruckList from "./Components/TruckList";
import MediaDisplay from "./Components/MediaDisplay";
import dataService from "./services/dataService";
import './App.css';
import Veille from "./Components/Veille";
import moment from "moment";


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
    const [mediaIndex, setMediaIndex] = useState(0);
    const [isMediaDisplay, setIsMediaDisplay] = useState(false);
    const [truckIndex, setTruckIndex] = useState(0);
    const [resetInterval, setResetInterval] = useState(false);
    const [intervalDuration, setIntervalDuration] = useState(30000); // Default to 30 seconds

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

    const updateDisplay = () => {
        const currentTime = new Date().toLocaleTimeString();
        const isVeille = isWithinVeilleTime(currentTime, settings.debutVeille, settings.finVeille) || (!hasTrucks && !hasMedias);

        if (isVeille) {
            setIsMediaDisplay(false);
            setMediaIndex(0);
            setTruckIndex(0);
            // Ici, vous pouvez définir un état pour afficher l'écran de veille
        } else if (hasMedias && !hasTrucks) {
            setIsMediaDisplay(true);
            cycleMedias();
        } else if (hasTrucks && !hasMedias) {
            setIsMediaDisplay(false);
            cycleTrucks();
        } else if (hasTrucks && hasMedias) {
            // Alterner entre les camions et les médias
            if (isMediaDisplay) {
                cycleMedias();
            } else {
                cycleTrucks();
            }
        }
    };

    const cycleTrucks = () => {
        if ((truckIndex + 1) * 10 < trucks.length) {
            setTruckIndex(truckIndex + 1);
        } else {
            setTruckIndex(0);
            setIsMediaDisplay(true); // Passer aux médias après les camions
        }
        setIntervalDuration(settings.dureeDefilement * 1000);
    };

    const cycleMedias = () => {
        if (mediaIndex < medias.length - 1) {
            setMediaIndex(mediaIndex + 1);
        } else {
            setMediaIndex(0);
            setIsMediaDisplay(false); // Revenir aux camions après les médias
        }
        setIntervalDuration(medias[mediaIndex]?.duration * 1000 || 2000);
    };


    const updateDisplay = () => {
        const currentTime = new Date().toLocaleTimeString();
        const isVeille = isWithinVeilleTime(currentTime, settings.debutVeille, settings.finVeille) || (!hasTrucks && !hasMedias);

        if (isVeille) {
            setIsMediaDisplay(false);
            setMediaIndex(0);
            setTruckIndex(0);
            // Ici, vous pouvez définir un état pour afficher l'écran de veille
        } else if (hasMedias && !hasTrucks) {
            setIsMediaDisplay(true);
            cycleMedias();
        } else if (hasTrucks && !hasMedias) {
            setIsMediaDisplay(false);
            cycleTrucks();
        } else if (hasTrucks && hasMedias) {
            // Alterner entre les camions et les médias
            if (isMediaDisplay) {
                cycleMedias();
            } else {
                cycleTrucks();
            }
        }
    };


    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setMediaIndex((prevIndex) => {
    //             fetchData().then(() => {
    //                 console.log("Data refreshed");
    //             });
    //             if (prevIndex === -1) {
    //                 // Check if more truck pages are available
    //                 if ((truckIndex + 1) * 10 < trucks ? trucks.length : 0) {
    //                     // Move to the next truck page
    //                     setTruckIndex(truckIndex + 1);
    //                     setIntervalDuration(settings.dureeDefilement * 1000); // Duration for trucks
    //                     return -1;
    //                 } else if (medias && medias.length > 0) {
    //                     // Switch to media if available
    //                     setTruckIndex(0); // Reset truck index
    //                     setIntervalDuration(medias[0]?.duration * 1000 || 2000); // Duration for first media
    //                     return 0;
    //                 } else {
    //                     // If no media, keep displaying trucks
    //                     setTruckIndex(0); // Reset truck index
    //                     return -1;
    //                 }
    //             } else if (prevIndex >= medias.length - 1) {
    //                 // After the last media, show first truck page
    //
    //                 setIntervalDuration(settings.dureeDefilement * 1000); // Duration for trucks
    //                 setTruckIndex(0); // Start from the first truck page
    //                 return -1;
    //             } else {
    //                 // Move to the next media and set its duration
    //                 const nextMediaDuration = medias[prevIndex + 1]?.duration * 1000 || 2000;
    //                 setIntervalDuration(nextMediaDuration);
    //                 return prevIndex + 1;
    //             }
    //         });
    //     }, intervalDuration);
    //
    //
    //     // Clean up the interval when the component unmounts
    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, [resetInterval, medias, settings, truckIndex, trucks ? trucks.length : 0]);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         fetchData().then(() => console.log("Data refreshed"));
    //
    //         // Check if more truck pages are available
    //         if ((truckIndex + 1) * 10 < trucks.length) {
    //             // Move to the next truck page
    //             setTruckIndex(truckIndex + 1);
    //         } else {
    //             // Reset to the first truck page or switch to media
    //             setTruckIndex(0);
    //
    //             if (medias && medias.length > 0) {
    //                 // If media available, switch to media
    //                 setMediaIndex(0);
    //                 setIntervalDuration(medias[mediaIndex]?.duration * 1000 || 2000); // Duration for first media
    //             }
    //             else {
    //                 // If no media, continue displaying trucks
    //                 setIntervalDuration(settings.dureeDefilement * 1000); // Duration for trucks
    //                 setMediaIndex(-1);
    //             }
    //         }
    //     }, intervalDuration);

        useEffect(() => {
            fetchData().then(() => console.log("Data refreshed"));
            const timer = setInterval(() => {
                updateDisplay();
            }, intervalDuration);

            return () => clearInterval(timer);
        }, [intervalDuration, trucks, medias, settings, truckIndex, mediaIndex, isMediaDisplay]);


        return () => clearInterval(timer);
    }, [resetInterval, medias, settings, truckIndex, trucks.length]);



    useEffect(() => {
        setResetInterval(prev => !prev);
    }, [mediaIndex, intervalDuration]);


    return (
        <div className="App">
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
