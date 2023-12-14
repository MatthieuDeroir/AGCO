import React, { useState, useEffect } from "react";
import "./TruckList.css";

function TruckList({ trucks, duration }) {
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

  const displayedTrucks =
    trucks && trucks.length > 0
      ? trucks.slice(currentTruckIndex, currentTruckIndex + trucksPerPage)
      : [];

  return (
    <div className="grid-container">
        
      <div className="header">Transporteur</div>
      <div className="header">Immat</div>
      <div className="header">Quai</div>

      {displayedTrucks.length > 0 ? (
        displayedTrucks.map((truck) => (
          <React.Fragment key={truck.id}>
          
              <div className="item transporteur">{truck.transporteur}</div>
              <div className="item immat">{truck.immatriculation}</div>
              <div className="item quai">{truck.quai}</div>
            
          </React.Fragment>
        ))
      ) : (
        <div className="no-trucks"></div>
      )}
    </div>
  );
}

export default TruckList;
