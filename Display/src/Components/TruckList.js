import React, { useState, useEffect } from 'react';
import './TruckList.css';

function TruckList({trucks }) {
    

    return (
        <div className="grid-container">
            <div className="header transporteur">Transporteur</div>
            <div className="header immat">Immat</div>
            <div className="header quai">Quai</div>
            {trucks.map(truck => (
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
