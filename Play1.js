// ==UserScript==
// @name         Hover-to-Play Video Player
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Show a video player on hover and play the content
// @author       Your Name
// @match        *://*/*  // Replace with the URL pattern where you want this to work
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create the player container dynamically
    const playerContainer = document.createElement('div');
    playerContainer.style.position = 'absolute';
    playerContainer.style.display = 'none';
    playerContainer.style.width = '300px';
    playerContainer.style.height = '200px';
    playerContainer.style.background = 'black';
    playerContainer.style.zIndex = '1000';
    playerContainer.style.border = '2px solid white';
    document.body.appendChild(playerContainer);

    const videoElement = document.createElement('video');
    videoElement.controls = true;
    videoElement.muted = true;
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    playerContainer.appendChild(videoElement);

    // Find all the links (you can modify this selector based on your needs)
    const links = document.querySelectorAll('a');  // You can refine this with a specific selector

    // Add event listeners for hover
    links.forEach(link => {
        // Only apply for links that have a video URL or some indicator
        const videoUrl = link.getAttribute('href');  // Assuming the href has the video URL
        if (videoUrl && (videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm'))) {
            link.addEventListener('mouseenter', (e) => {
                // Set the video source and play
                videoElement.src = videoUrl;
                videoElement.play();

                // Position the player near the link
                const rect = link.getBoundingClientRect();
                playerContainer.style.top = `${rect.bottom + window.scrollY}px`;
                playerContainer.style.left = `${rect.left + window.scrollX}px`;
                playerContainer.style.display = 'block';
            });

            link.addEventListener('mouseleave', () => {
                videoElement.pause();
                playerContainer.style.display = 'none';
            });
        }
    });
})();
