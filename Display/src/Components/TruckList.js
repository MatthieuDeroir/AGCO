import React, { useState, useEffect } from 'react';
import './TruckList.css';

function TruckList({trucks }) {
    const [currentTruckIndex, setCurrentTruckIndex] = useState(0);
    const trucksPerPage = 10; // Change this to the number of trucks you want to show at once

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTruckIndex((prevIndex) => {
                let newIndex = prevIndex + trucksPerPage;
                if (newIndex >= trucks.length) {
                    newIndex = 0; // Loop back to the start
                }
                return newIndex;
            });
        }, 2000); // Change this to the amount of time you want to wait between changes

        return () => clearInterval(timer); // Clean up the interval on unmount
    }, [trucks.length]);

    const displayedTrucks = trucks.slice(currentTruckIndex, currentTruckIndex + trucksPerPage);

    return (
        <div className="grid-container">
            <div className="header transporteur">Transporteur</div>
            <div className="header immat">Immat</div>
            <div className="header quai">Quai</div>
            {displayedTrucks.map(truck => (
                <React.Fragment key={truck.id}>
                    <div className="item">{truck.transporteur}</div>
                    <div className="item">{truck.immatriculation}</div>
                    <div className="item">{truck.quai}</div>
                </React.Fragment>
            ))}
        </div>
    );
}

export default TruckList;