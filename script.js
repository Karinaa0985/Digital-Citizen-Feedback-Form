document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this);
    let mediaRecorder;
let audioChunks = [];

document.getElementById('startRecording').addEventListener('click', async function() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        document.getElementById('audioPlayback').src = audioUrl;

        // Convert Blob to File and store in hidden input field
        const file = new File([audioBlob], "voice_feedback.wav", { type: 'audio/wav' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        document.getElementById('recordedAudio').files = dataTransfer.files;
    };

    mediaRecorder.start();
    audioChunks = [];
    document.getElementById('startRecording').disabled = true;
    document.getElementById('stopRecording').disabled = false;
});

document.getElementById('stopRecording').addEventListener('click', function() {
    mediaRecorder.stop();
    document.getElementById('startRecording').disabled = false;
    document.getElementById('stopRecording').disabled = true;
});


    // Simulating form submission
    fetch('your-server-endpoint', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Feedback submitted successfully!');
        this.reset(); // Reset form after submission
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error submitting your feedback.');
    });
});