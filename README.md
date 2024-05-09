# digit-recognition-gRPC
The main goal of this project is to create a web application that allows users to classify hand-drawn digits on a web page using Python and its frameworks and libraries. It employs a locally trained Convolutional Neural Network (CNN) on the MNIST dataset, a collection of 60,000 digit images. The communication from the Node.js server to the python server is done using gRPC.

## Prerequisites
- **Python:** Make sure Python 3.x is installed.
- **Node.js:** Ensure Node.js is installed

## Project Structure
- **Python Server:** 
  - Contains a `CNN` model that processes incoming images to predict digits.
  - Uses gRPC to receive requests and send responses.

- **Node.js Server:**
  - Provides a web interface to upload images.
  - Connects to the Python backend using gRPC.

## How to Set Up

### Python Server
1. **Install Dependencies:**
   - Install required packages via `pip`

2. **Model Training:**
   - Train your CNN model and save it to a file (e.g., `trained_model.pth`).

3. **Run the Python gRPC Server:**
   - Start the server by running:
     python server.py

### Node.js Server
1. **Install Node.js Dependencies:**
   - Initialize Node.js project and install dependencies:
     npm init

2. **Run the Node.js Server:**
   - Start the server with:
     node app.js

## Usage
1. **Access the Web Interface:**
   - Open a web browser and visit `http://localhost:6789`.

2. **Upload Images:**
   - Use the web interface to upload images and receive predictions.

## Notes
- Ensure that both Python and Node.js servers are running simultaneously.
- Adjust server ports as required in `app.js` and `server.py`.

## Author
This project provides a practical demonstration of a distributed digit recognition system using gRPC.

