// Function to show the feedback form when a button is clicked
function showFeedbackForm(issueType) {
    // Show the feedback form
    document.getElementById("feedbackForm").style.display = "block";

    // Reset the form
    document.getElementById("issueForm").reset();
    document.getElementById("gpsLocation").innerText = "No location available";
    document.getElementById("audioStatus").innerText = "No audio recorded";

    // Set the title of the form based on the selected issue
    document.getElementById("feedbackForm").querySelector("h2").innerText = `Report ${issueType}`;
}

// Get the user's GPS location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            document.getElementById("gpsLocation").innerText = `Latitude: ${lat}, Longitude: ${lon}`;
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Audio recording (for demo purposes)
let audioRecording = false;
let mediaRecorder;
let audioChunks = [];

function startRecording() {
    if (audioRecording) {
        mediaRecorder.stop();
        audioRecording = false;
        document.getElementById("audioStatus").innerText = "Recording stopped.";
    } else {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            audioChunks = [];
            mediaRecorder.ondataavailable = function(event) {
                audioChunks.push(event.data);
            };
            mediaRecorder.onstop = function() {
                const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
                const audioUrl = URL.createObjectURL(audioBlob);
                document.getElementById("audioStatus").innerText = "Audio recorded. You can submit it.";
            };
            audioRecording = true;
            document.getElementById("audioStatus").innerText = "Recording audio...";
        }).catch(function(err) {
            alert("Audio recording failed: " + err);
        });
    }
}

// Submit the form data (for now, just show an alert)
document.getElementById("issueForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thank you for your feedback! Your issue has been submitted.");
    document.getElementById("feedbackForm").style.display = "none"; // Hide the form after submission
});
