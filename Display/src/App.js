import React, {useEffect, useState} from "react";
import TruckList from "./Components/TruckList";
import MediaDisplay from "./Components/MediaDisplay";
import dataService from "./services/dataService";
import './App.css';
import Veille from "./Components/Veille";
import moment from "moment";

function App() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [trucks, setTrucks] = useState([]);
    const [medias, setMedias] = useState([]);
    const [settings, setSettings] = useState([]);
    const [mediaIndex, setMediaIndex] = useState(0);
    const [truckIndex, setTruckIndex] = useState(0);
    const [isMediaDisplay, setIsMediaDisplay] = useState(false);

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
            setTime(new Date().toLocaleTimeString());
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();

    }, []);

    const isWithinVeilleTime = (currentTime, startTime, endTime) => {
        const current = moment(currentTime, 'HH:mm');
        const start = moment(startTime, 'HH:mm');
        const end = moment(endTime, 'HH:mm');
        return current.isBetween(start, end);
    };

    const updateDisplay = () => {
        const currentTime = new Date().toLocaleTimeString();
        const isVeille = isWithinVeilleTime(currentTime, settings.debutVeille, settings.finVeille) || (!trucks.length && !medias.length);

        if (isVeille) {
            setIsMediaDisplay(false);
            setMediaIndex(0);
            setTruckIndex(0);
        } else if (medias.length && !trucks.length) {
            setIsMediaDisplay(true);
            cycleMedias();
        } else if (trucks.length && !medias.length) {
            setIsMediaDisplay(false);
            cycleTrucks();
        } else if (trucks.length && medias.length) {
            isMediaDisplay ? cycleMedias() : cycleTrucks();
        }
    };

    const cycleTrucks = () => {
        setTruckIndex((truckIndex + 1) * 10 < trucks.length ? truckIndex + 1 : 0);
        setIsMediaDisplay(truckIndex === 0);
    };

    const cycleMedias = () => {
        setMediaIndex(mediaIndex < medias.length - 1 ? mediaIndex + 1 : 0);
        setIsMediaDisplay(!(mediaIndex === medias.length - 1));
    };

    const isVeilleTime = (currentTime, startTime, endTime) => {
        const current = moment(currentTime, 'HH:mm');
        const start = moment(startTime, 'HH:mm');
        const end = moment(endTime, 'HH:mm');
        return current.isBetween(start, end);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            fetchData();
            updateDisplay();
        }, settings.dureeDefilement); // Durée par défaut pour changer l'affichage

        return () => clearInterval(timer);
    }, [truckIndex, mediaIndex, isMediaDisplay]);

    return (
        <div className="App">
            {isVeilleTime(time, settings.debutVeille, settings.finVeille) || (!trucks.length && !medias.length) ? (
                <Veille/>
            ) : isMediaDisplay ? (
                <MediaDisplay media={medias[mediaIndex]}/>
            ) : (
                <TruckList trucks={trucks.slice(truckIndex * 10, (truckIndex + 1) * 10)} duration={settings.dureeDefilement}/>
            )}
        </div>
    );
}

export default App;
