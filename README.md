# Quoral: An ML-Based Coral Monitoring System

Quoral is an innovative solution designed for researchers to monitor coral reefs more effectively, without relying on manual scuba diving expeditions. Our project automates continuous monitoring, generating alerts and providing data insights to help make informed decisions that protect coral ecosystems.

## Project Overview

Current coral reef monitoring relies heavily on satellite imagery and manual scuba diving. Quoral offers an enhanced method using a waterproof device powered by a Raspberry Pi, connected to a camera and a temperature sensor. This device is trained to monitor coral and detect whether the coral is healthy or bleached.

The project uses two machine learning models:
- **YOLOv5 Object Detection**: Identifies coral in the footage.
- **K-Means Health Classification**: Classifies the coral as either bleached or healthy.

The captured video data is sent via WebSocket to our FastAPI server, which is hosted on an AWS EC2 instance. The server handles:
- POST requests from the Raspberry Pi devices to process the incoming video data.
- GET requests from the frontend React app to retrieve coral health data.

### Web Application Features
- Live Video Feed: View live footage from the device monitoring coral reefs.
- Health and Temperature Data: Visualize past data with graphs showing coral health status and temperature readings.
- Interactive Map: See the locations of all devices. Clicking on a device reveals its real-time feed and data.
- Recent Data Snapshots: View recent images and coral health classifications.

## Technical Stack

- **Hardware**: Raspberry Pi with a USB camera and temperature sensor.
- **Backend**: 
  - FastAPI for handling video data and API requests.
  - Hosted on AWS EC2 for scalability.
- **Frontend**: React app that provides interactive maps, live feeds, and data visualizations.
- **Machine Learning**: 
  - YOLOv5 object detection for identifying coral.
  - K-Means coral health classification as bleached or healthy.
