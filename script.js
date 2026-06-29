// This confirms the script is loaded.
console.log("JavaScript file loaded successfully!");

// Get a reference to the HTML form element.
const predictionForm = document.getElementById('prediction-form');
const resultContainer = document.getElementById('result-container');
const errorContainer = document.getElementById('error-container');

// Add an event listener to the form for the 'submit' event.
predictionForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior.
    event.preventDefault();
    console.log("Form submission detected! Default action prevented.");

    // Hide previous results and errors
    resultContainer.classList.remove('show');
    errorContainer.classList.remove('show');

    // Gather and clean the form data.
    const formData = new FormData(predictionForm);
    const data = Object.fromEntries(formData.entries());
    for (const key in data) {
        data[key] = parseFloat(data[key]);
    }
    console.log("Gathered and cleaned form data:", data);

    // Construct the JSON payload.
    const jsonPayload = JSON.stringify(data);
    console.log("Constructed JSON Payload:", jsonPayload);

    // --- Use the fetch() API to send the POST request ---
    // The first argument is the URL of our Flask API's predict endpoint.
    // The second argument is an options object to configure the request.
    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST', // We are sending data, so we use the POST method.
        headers: {
            // This header is crucial. It tells the server the body of our request is JSON.
            'Content-Type': 'application/json'
        },
        // The 'body' of the request is our serialized JSON payload.
        body: jsonPayload
    })
    .then(response => {
        // .then() is called when the server sends a response back.
        // First, check if the response was successful (HTTP status code 200-299).
        if (!response.ok) {
            // If the server response was not ok, we create our own error to be
            // caught by the .catch() block, so we can handle it in one place.
            throw new Error(`Server responded with an error: ${response.status}`);
        }
        // If the response is ok, we parse the JSON body of the response.
        // response.json() also returns a Promise, which is why we need another .then().
        return response.json();
    })
    .then(predictionData => {
        // This .then() is called when the response.json() Promise resolves.
        // 'predictionData' is now the JavaScript object sent back from our Flask API.
        console.log("Success! Received prediction from API:", predictionData);

        // Determine if diabetic or non-diabetic for styling
        const isDiabetic = predictionData.prediction_class === 1;
        const containerClass = isDiabetic ? 'diabetic' : 'non-diabetic';
        const headerIcon = isDiabetic ? '⚠️' : '✓';
        const headerText = isDiabetic ? 'Diabetic Risk Detected' : 'Low Diabetes Risk';

        // Create HTML to display the prediction result with dynamic styling
        const resultHTML = `
            <div class="result-box ${containerClass}">
                <h2>${headerIcon} ${headerText}</h2>
                <p><strong>Prediction Result:</strong> ${predictionData.prediction_label}</p>
                <p><strong>Risk Classification:</strong> ${predictionData.prediction_class === 1 ? 'High Risk' : 'Low Risk'}</p>
                <p><strong>Confidence Analysis:</strong></p>
                <div style="margin-left: 15px;">
                    <div class="confidence-item">
                        <strong>Non-Diabetic Probability:</strong> ${(predictionData.confidence_scores['Non-Diabetic'] * 100).toFixed(2)}%
                    </div>
                    <div class="confidence-item">
                        <strong>Diabetic Probability:</strong> ${(predictionData.confidence_scores['Diabetic'] * 100).toFixed(2)}%
                    </div>
                </div>
                <p style="margin-top: 15px; font-size: 12px; font-style: italic; color: #666;">
                    ${isDiabetic 
                        ? '⚠️ This indicates a higher likelihood of diabetes. Please consult with a healthcare professional.' 
                        : '✓ This indicates a lower likelihood of diabetes. Continue maintaining healthy habits.'}
                </p>
            </div>
        `;
        
        // Inject the result HTML into the result container
        resultContainer.innerHTML = resultHTML;
        resultContainer.classList.add('show');
        console.log("Prediction result displayed on the webpage with dynamic styling.");
    })
    .catch(error => {
        // The .catch() block is executed if there's a network error (e.g., server is down)
        // or if we threw an error in the first .then() block.
        console.error("Error communicating with the API:", error);
        
        // Display error message
        const errorHTML = `
            <h2>✗ Error</h2>
            <p>${error.message}</p>
            <p><strong>Make sure the Flask server is running at http://127.0.0.1:5000</strong></p>
        `;
        
        errorContainer.innerHTML = errorHTML;
        errorContainer.classList.add('show');
    });
});