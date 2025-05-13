// Get references to DOM elements
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const videoElement = document.getElementById('recorded-video');

let mediaRecorder;
let recordedChunks = [];

async function startRecording() {
    try {
        // Request access to the screen (video capture)
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        
        // Create MediaRecorder instance
        mediaRecorder = new MediaRecorder(stream);

        // Event listener to capture data when recording
        mediaRecorder.ondataavailable = event => {
            recordedChunks.push(event.data);
        };

        // Event listener when recording stops
        mediaRecorder.onstop = () => {
            // Create a Blob from the recorded chunks
            const blob = new Blob(recordedChunks, { type: 'video/webm' });

            // Create a URL for the video blob
            const videoUrl = URL.createObjectURL(blob);
            
            // Set the video element's source to the recorded video
            videoElement.src = videoUrl;
        };

        // Start recording
        mediaRecorder.start();

        // Disable start button and enable stop button
        startBtn.disabled = true;
        stopBtn.disabled = false;
    } catch (err) {
        console.error('Error accessing screen media:', err);
    }
}

function stopRecording() {
    // Stop the media recording
    mediaRecorder.stop();

    // Disable stop button and enable start button for the next recording
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

// Event listeners for start and stop buttons
startBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);
