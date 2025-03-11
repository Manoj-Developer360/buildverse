import cv2
import numpy as np
import requests
import time

# RTSP Stream URL (Change as needed)
RTSP_URL = "rtsp://192.168.1.11:8080/h264_opus.sdp"
ALERT_API_URL = "http://localhost:3000/alert"

# Initialize video capture
cap = cv2.VideoCapture(RTSP_URL)
if not cap.isOpened():
    print("Error: Could not open RTSP stream.")
    exit()

# Motion detection variables
ret, frame1 = cap.read()
ret, frame2 = cap.read()

# Variables for motion detection
motion_detected = False
motion_start_time = None
alert_sent = False

while cap.isOpened():
    diff = cv2.absdiff(frame1, frame2)
    gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    _, thresh = cv2.threshold(blur, 20, 255, cv2.THRESH_BINARY)
    dilated = cv2.dilate(thresh, None, iterations=3)
    contours, _ = cv2.findContours(dilated, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    
    # Check for motion
    motion_detected = False
    for contour in contours:
        if cv2.contourArea(contour) > 500:  # Adjust threshold as needed
            motion_detected = True
            x, y, w, h = cv2.boundingRect(contour)
            # Uncomment the next line if you want to draw rectangles for debugging
            # cv2.rectangle(frame1, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # Handle motion detection logic
    if motion_detected:
        if motion_start_time is None:
            motion_start_time = time.time()  # Start the timer
        elif time.time() - motion_start_time >= 2:  # Check if motion persists for 2 seconds
            if not alert_sent:  # Send alert only if not already sent
                print("Motion detected! Sending alert...")
                try:
                    response = requests.post(ALERT_API_URL, json={"message": "Motion detected!"})
                    print("Alert sent, response:", response.status_code)
                    alert_sent = True  # Mark alert as sent
                except Exception as e:
                    print("Error sending alert:", e)
    else:
        # Reset if no motion is detected
        motion_start_time = None
        alert_sent = False  # Reset alert status

    # cv2.imshow("Live Feed", frame1)
    frame1 = frame2
    ret, frame2 = cap.read()
    
    if not ret:
        print("Error: Could not read frame from stream.")
        break
    
    # Remove the display code
    # if cv2.waitKey(10) & 0xFF == ord('q'):
    #     break

cap.release()
cv2.destroyAllWindows()
