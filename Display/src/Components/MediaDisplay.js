import React, { useState, useEffect } from 'react';
import './MediaDisplay.css';

function MediaDisplay({ media }) {
    useEffect(() => {
        console.log(media);
    }
    , [media]);
    return (
        <div className="media-container">
            {media.type === 'image' ? (
                <img src={media.path} alt="Media" />
            ) : (
                <video src={media.path} autoPlay muted />
            )}
        </div>
    );
}

export default MediaDisplay;
