# --- Import Core Libraries ---
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import os

# --- Load the Trained Machine Learning Pipeline ---
pipeline_path = 'diabetes_pipeline.joblib'
loaded_pipeline = joblib.load(pipeline_path)
print(f"Model pipeline from '{pipeline_path}' loaded successfully.")

# --- Create the Flask App Instance ---
app = Flask(__name__)

# --- Enable CORS ---
# This allows requests from the HTML/JavaScript frontend to communicate with this API
CORS(app)

# Get the directory of the current file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# --- Define API Endpoints ---

# Serve the index.html file from the root route
@app.route('/')
def index():
    return send_from_directory(BASE_DIR, 'index.html')

# Serve static files (CSS, JS)
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(BASE_DIR, filename)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print(f"Received data: {data}")
        
        if data is None:
            error_msg = "No JSON data received"
            print(f"Error: {error_msg}")
            return jsonify({"error": error_msg}), 400

        input_df = pd.DataFrame([data])
        print(f"Created DataFrame:\n{input_df}")
        print(f"DataFrame columns: {input_df.columns.tolist()}")
        
        prediction = loaded_pipeline.predict(input_df)
        prediction_probabilities = loaded_pipeline.predict_proba(input_df)
        print(f"Prediction: {prediction}, Probabilities: {prediction_probabilities}")

    except Exception as e:
        error_msg = f"Error during prediction: {str(e)}"
        print(f"ERROR: {error_msg}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": error_msg}), 400

    # Prepare the JSON Response
    final_prediction_class = int(prediction[0])
    probabilities = prediction_probabilities[0]
    prediction_label = "Diabetic" if final_prediction_class == 1 else "Non-Diabetic"

    response_data = {
        "prediction_class": final_prediction_class,
        "prediction_label": prediction_label,
        "confidence_scores": {
            "Non-Diabetic": float(probabilities[0]),
            "Diabetic": float(probabilities[1])
        }
    }
    
    print(f"Sending response: {response_data}")
    return jsonify(response_data)

# This is the standard Python entry point.
# The code inside this 'if' block will only run when you execute the script directly
# (e.g., 'python app.py' in the terminal). It will not run if the script is imported as a module.
if __name__ == '__main__':
    # app.run() starts the Flask development web server.
    # debug=True enables debug mode, which provides helpful error messages and automatically
    # reloads the server when you make changes to the code. This is great for development.
    app.run(debug=True)