import React, { useState, useEffect } from 'react';
import './MediaDisplay.css';

// {
//     {media.type === 'image' ? (
//         <img src={media.path} alt="Media" />
//     ) : (
//         <video src={media.path} autoPlay muted />
//     )}}
// : <div
function MediaDisplay({ media }) {
    return (
        <div className="media-container">
            {media ? (
                media.type === 'image' ? (
                    <img src={media.path} alt="Media" />
                ) : (
                    <video src={media.path} autoPlay muted />
                )
            ) : (
                <div className="no-media">No media available</div>
            )}

        </div>
    );
}

export default MediaDisplay;
