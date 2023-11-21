import React, { useState, useEffect } from 'react';
import './MediaDisplay.css';

function MediaDisplay({ media }) {
    return (
        <div className="media-container">
            {media.type === 'image' ? (
                <img src={`http://localhost:4000/${media.path}`} alt="Media" />
            ) : (
                <video src={`http://localhost:4000/${media.path}`} autoPlay muted />
            )}
        </div>
    );
}

export default MediaDisplay;
