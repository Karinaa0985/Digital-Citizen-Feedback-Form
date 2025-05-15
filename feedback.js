document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startRecording");
    const stopButton = document.getElementById("stopRecording");
    const audioPlayback = document.getElementById("audioPlayback");
    const recordedAudioInput = document.getElementById("recordedAudio");

    let mediaRecorder;
    let audioChunks = [];
    let recordingIndicator;

    // Function to start recording
    startButton.addEventListener("click", async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
                const audioUrl = URL.createObjectURL(audioBlob);
                audioPlayback.src = audioUrl;
                audioPlayback.style.display = "block"; // Show the player

                // Convert blob to a file and set it in the hidden input field
                const file = new File([audioBlob], "recorded_audio.wav", { type: "audio/wav" });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                recordedAudioInput.files = dataTransfer.files;

                // Remove recording indicator
                removeRecordingIndicator();
            };

            mediaRecorder.start();
            startButton.disabled = true;
            stopButton.disabled = false;
            audioChunks = []; // Reset audio chunks

            // Show recording indicator
            showRecordingIndicator();
        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert("Microphone access is required for recording.");
        }
    });

    // Function to stop recording
    stopButton.addEventListener("click", () => {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
            startButton.disabled = false;
            stopButton.disabled = true;
        }
    });

    // Function to show "Recording..." text with a blinking red dot
    function showRecordingIndicator() {
        recordingIndicator = document.createElement("div");
        recordingIndicator.innerHTML = `<span style="color: red; font-weight: bold;">● Recording...</span>`;
        recordingIndicator.id = "recordingIndicator";
        startButton.parentNode.insertBefore(recordingIndicator, startButton.nextSibling);
    }

    // Function to remove the recording indicator
    function removeRecordingIndicator() {
        if (recordingIndicator) {
            recordingIndicator.remove();
        }
    }
});
