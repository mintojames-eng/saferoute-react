import requests
import json

BASE_URL = "http://127.0.0.1:5000"

def print_result(name, response):
    print(f"\n--- Testing {name} ---")
    print(f"Status: {response.status_code}")
    try:
        print(json.dumps(response.json(), indent=2))
    except:
        print(response.text[:200])

print("==================================================")
print("  Starting SafeRoute MongoDB Full Stack API Tests ")
print("==================================================\n")

try:
    # 0. Test MongoDB Status
    res = requests.get(f"{BASE_URL}/status")
    print_result("GET /status (MongoDB Health & Counts)", res)

    # 1. Test Incidents List (MongoDB Collection)
    res = requests.get(f"{BASE_URL}/incidents")
    print(f"\n--- Testing GET /incidents (MongoDB) ---")
    print(f"Status: {res.status_code}")
    incidents = res.json()
    print(f"Found {len(incidents)} incidents in MongoDB.")
    if len(incidents) > 0:
        print("First incident sample:", json.dumps(incidents[0], indent=2))

    # 2. Test Create Incident in MongoDB
    new_inc = {
        "name": "Electronic City Phase 2 Toll",
        "coords": [12.8390, 77.6775],
        "risk": "High",
        "type": "Heavy truck traffic merge",
        "road": "Moderate",
        "traffic": "High",
        "accidents": 98
    }
    res = requests.post(f"{BASE_URL}/incidents", json=new_inc)
    print_result("POST /incidents (Insert to MongoDB)", res)
    created_id = res.json().get('id')

    # 3. Test Delete the created incident
    if created_id:
        res = requests.delete(f"{BASE_URL}/incidents/{created_id}")
        print_result(f"DELETE /incidents/{created_id} (Remove from MongoDB)", res)

    # 4. Test Dashboard Stats from MongoDB
    res = requests.get(f"{BASE_URL}/dashboardStats")
    print_result("GET /dashboardStats (MongoDB)", res)

    # 5. Test Safety Alerts from MongoDB
    res = requests.get(f"{BASE_URL}/alerts")
    print_result("GET /alerts (MongoDB)", res)

    # 6. Test Demo User Login from MongoDB
    login_data = {
        "email": "minto@saferoute.ai",
        "password": ""
    }
    res = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print_result("POST /auth/login (MongoDB User Auth)", res)

    # 7. Test AI Prediction (Logged to MongoDB)
    pred_data = {
        "start": "Silk Board",
        "destination": "Whitefield",
        "weather": "rain",
        "traffic": "high",
        "road": "poor",
        "time": "evening"
    }
    res = requests.post(f"{BASE_URL}/predict", json=pred_data)
    print_result("POST /predict (Neural Inference + MongoDB Log)", res)

    # 8. Test 50+ Bangalore Areas API (MongoDB)
    res = requests.get(f"{BASE_URL}/bangalore-areas")
    print(f"\n--- Testing GET /bangalore-areas (MongoDB Master Areas) ---")
    print(f"Status: {res.status_code}")
    areas = res.json()
    print(f"Retrieved {len(areas)} areas across all Greater Bangalore zones.")

    # 9. Test Geocoding / Zone Query
    res = requests.get(f"{BASE_URL}/geocode?q=hebbal")
    print_result("GET /geocode?q=hebbal (Coordinate Lookup)", res)

    print("\n==================================================")
    print("  All MongoDB Full Stack API Tests Completed!     ")
    print("==================================================")

except requests.exceptions.ConnectionError:
    print("\n[Notice] Flask API is not currently running.")
    print("Run 'python app.py' in a terminal, then re-run this script to execute tests live.")
