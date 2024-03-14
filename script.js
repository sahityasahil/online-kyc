// Get elements from the DOM
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const photoInput = document.getElementById('photo');

// Check if the browser supports getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Request access to the camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      // Display the video stream from the camera
      video.srcObject = stream;
      video.play();
    })
    .catch(function(error) {
      console.error('Error accessing the camera:', error);
    });

  // Capture photo when the capture button is clicked
  captureBtn.addEventListener('click', function() {
    // Draw the current frame from the video onto the canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL representing the image
    const dataURL = canvas.toDataURL('image/png');

    // Set the value of the hidden input field to the data URL
    photoInput.value = dataURL;
  });
} else {
  console.error('getUserMedia is not supported by this browser');
}
