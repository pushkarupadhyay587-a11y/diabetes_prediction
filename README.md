# Diabetes Prediction Web Application

A full-stack machine learning application that predicts the likelihood of diabetes based on patient health metrics. The application combines a powerful machine learning backend with an intuitive web interface.

## 🎯 Features

- **Machine Learning Prediction**: Uses a trained scikit-learn pipeline (LogisticRegression with StandardScaler and SimpleImputer)
- **RESTful API**: Flask-based backend for handling predictions
- **Interactive Web Interface**: User-friendly HTML/CSS/JavaScript frontend
- **Real-time Results**: Instant diabetes risk predictions with confidence scores
- **Color-Coded Results**: 
  - 🟢 **Green** box for low diabetes risk (Non-Diabetic)
  - 🔴 **Red** box for high diabetes risk (Diabetic)
- **Responsive Design**: Works on desktop and mobile devices
- **CORS Enabled**: Allows cross-origin requests for API integration

## 🏗️ Project Structure

```
diabetes-prediction/
├── app.py                      # Flask backend application
├── index.html                  # Frontend HTML with styling
├── script.js                   # Frontend JavaScript for API calls
├── diabetes_pipeline.joblib    # Trained ML model
├── diabetes.csv               # Dataset (in m/ folder)
├── requirements.txt           # Python dependencies
├── README.md                  # This file
└── myenv/                     # Python virtual environment
```

## 🛠️ Technologies Used

### Backend
- **Python 3.12**
- **Flask 3.1.3**: Web framework
- **Flask-CORS 6.0.5**: Cross-Origin Resource Sharing
- **scikit-learn 1.7.2**: Machine learning library
- **pandas**: Data manipulation
- **joblib**: Model serialization

### Frontend
- **HTML5**: Structure
- **CSS3**: Styling with responsive design
- **JavaScript**: Form handling and API integration
- **Fetch API**: HTTP requests to backend

## 📋 Prerequisites

- Python 3.12 or higher
- pip (Python package manager)
- Virtual environment (recommended)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd diabetes-prediction
```

### 2. Create Virtual Environment
```bash
# Windows
python -m venv myenv
myenv\Scripts\activate

# macOS/Linux
python3 -m venv myenv
source myenv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

If `requirements.txt` is not available, install manually:
```bash
pip install Flask==3.1.3
pip install Flask-CORS==6.0.5
pip install scikit-learn==1.7.2
pip install pandas
pip install numpy
pip install joblib
```

## ▶️ Running the Application

### Start the Flask Server
```bash
# Make sure virtual environment is activated
python app.py
```

The server will start at `http://127.0.0.1:5000`

### Access the Web Interface
Open your browser and navigate to:
```
http://127.0.0.1:5000
```

## 📊 How to Use

1. **Fill in Patient Data**: Enter the following health metrics:
   - **Pregnancies**: Number of pregnancies (0+)
   - **Glucose**: Blood glucose level (mg/dL)
   - **Blood Pressure**: Blood pressure (mmHg)
   - **Skin Thickness**: Triceps skin fold thickness (mm)
   - **Insulin**: 2-hour serum insulin (mU/ml)
   - **BMI**: Body Mass Index (kg/m²)
   - **Diabetes Pedigree Function**: Genetic risk score (0.0-1.0+)
   - **Age**: Patient age (years)

2. **Click "Predict"**: Submit the form to get prediction

3. **View Results**: 
   - Color-coded result box appears below the form
   - **Green box**: Low diabetes risk (Non-Diabetic)
   - **Red box**: High diabetes risk (Diabetic)
   - Confidence scores displayed as percentages

## 📡 API Endpoints

### GET `/`
Returns the index.html file (web interface)

### POST `/predict`
Predicts diabetes risk based on patient data

**Request Format:**
```json
{
  "Pregnancies": 6,
  "Glucose": 148,
  "BloodPressure": 72,
  "SkinThickness": 35,
  "Insulin": 0,
  "BMI": 33.6,
  "DiabetesPedigreeFunction": 0.627,
  "Age": 50
}
```

**Response Format (Diabetic):**
```json
{
  "prediction_class": 1,
  "prediction_label": "Diabetic",
  "confidence_scores": {
    "Non-Diabetic": 0.2941,
    "Diabetic": 0.7059
  }
}
```

**Response Format (Non-Diabetic):**
```json
{
  "prediction_class": 0,
  "prediction_label": "Non-Diabetic",
  "confidence_scores": {
    "Non-Diabetic": 0.9683,
    "Diabetic": 0.0317
  }
}
```

## 🤖 Model Details

- **Type**: Logistic Regression
- **Pipeline Steps**: 
  1. SimpleImputer (mean strategy)
  2. StandardScaler
  3. LogisticRegression
- **Training Data**: Pima Indians Diabetes Dataset
- **Accuracy**: Trained to predict diabetes risk with confidence scores

## ⚙️ Configuration

### Debug Mode
The application runs in debug mode by default (see `app.py`):
```python
app.run(debug=True)
```

**Warning**: Only use debug mode during development. For production, set `debug=False`.

### Port Configuration
To change the port, modify in `app.py`:
```python
app.run(debug=True, port=5000)  # Change 5000 to your desired port
```

## 🐛 Troubleshooting

### Issue: "Module not found" errors
**Solution**: Ensure all dependencies are installed:
```bash
pip install -r requirements.txt
```

### Issue: Port 5000 already in use
**Solution**: Change the port in `app.py` or kill the process using port 5000

### Issue: CORS errors in browser console
**Solution**: Ensure Flask-CORS is installed and enabled in `app.py`

### Issue: Model loading errors
**Solution**: Ensure `diabetes_pipeline.joblib` is in the same directory as `app.py`

## 📝 Example Predictions

### Low Risk Example
```
Pregnancies: 1
Glucose: 99
Blood Pressure: 65
Skin Thickness: 20
Insulin: 0
BMI: 22
Diabetes Pedigree Function: 0.2
Age: 25
→ Result: Non-Diabetic (96.83% confidence)
```

### High Risk Example
```
Pregnancies: 6
Glucose: 148
Blood Pressure: 72
Skin Thickness: 35
Insulin: 0
BMI: 33.6
Diabetes Pedigree Function: 0.627
Age: 50
→ Result: Diabetic (70.59% confidence)
```

## ⚠️ Medical Disclaimer

**This application is for educational and informational purposes only.** It should not be used as a substitute for professional medical diagnosis. Always consult with a qualified healthcare professional for medical advice and diagnosis.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created as part of the ProjectAI Diabetes Prediction from Health Data course.

## 📚 Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [scikit-learn Documentation](https://scikit-learn.org/)
- [MDN Web Docs - HTML/CSS/JavaScript](https://developer.mozilla.org/)
- [Pima Indians Diabetes Dataset](https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database)

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Version**: 1.0.0  
**Last Updated**: June 29, 2026  
**Status**: ✅ Production Ready
