import React, { useState, useEffect } from 'react';
import './TruckList.css';

function TruckList({ trucks = [], duration }) {
    const [currentTruckIndex, setCurrentTruckIndex] = useState(0);
    const trucksPerPage = 10;

    useEffect(() => {
        if (trucks && trucks.length > 0) {
            const timer = setInterval(() => {
                setCurrentTruckIndex((prevIndex) => {
                    let newIndex = prevIndex + trucksPerPage;
                    if (newIndex >= trucks.length) {
                        newIndex = 0;
                    }
                    return newIndex;
                });
            }, duration * 1000);

            return () => clearInterval(timer);
        }
    }, [trucks ? trucks.length : 0]);

    const displayedTrucks = trucks && trucks.length > 0
        ? trucks.slice(currentTruckIndex, currentTruckIndex + trucksPerPage)
        : [];

    return (
        <div className="grid-container">
            <div className="header transporteur">Transporteur</div>
            <div className="header immat">Immat</div>
            <div className="header quai">Quai</div>
            {displayedTrucks.length > 0 ? (
                displayedTrucks.map(truck => (
                    <React.Fragment key={truck.id}>
                        <div className="item">{truck.transporteur}</div>
                        <div className="item">{truck.immatriculation}</div>
                        <div className="item">{truck.quai}</div>
                    </React.Fragment>
                ))
            ) : (
                <div className="no-trucks">No trucks available</div>
            )}
        </div>
    );
}


export default TruckList;