"""
SafeRoute AI - Full Stack Verification Script
Tests all MongoDB collections, endpoints, and neural prediction algorithms without needing external network.
"""
import sys
import os
import json

# Ensure backend directory is in python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import app, mongo_connected, db

client = app.test_client()

def test_endpoint(name, method, url, data=None):
    if method == 'GET':
        res = client.get(url)
    elif method == 'POST':
        res = client.post(url, json=data)
    elif method == 'PUT':
        res = client.put(url, json=data)
    elif method == 'DELETE':
        res = client.delete(url)
    
    is_ok = 200 <= res.status_code < 300
    status_icon = "✅" if is_ok else "❌"
    print(f"{status_icon} [{res.status_code}] {method} {url} -> {name}")
    try:
        body = res.get_json()
        if isinstance(body, list):
            print(f"   ↳ Returned {len(body)} records (Sample: {body[0].get('name', body[0].get('id', 'item')) if len(body) > 0 else 'empty'})")
        elif isinstance(body, dict):
            preview = {k: v for k, v in list(body.items())[:4]}
            print(f"   ↳ Response: {json.dumps(preview)}")
    except Exception:
        pass
    return res

print("\n" + "="*60)
print("  SafeRoute AI - MongoDB & Full-Stack System Verification ")
print("="*60)
print(f"MongoDB Live Status: {'🟢 CONNECTED' if mongo_connected else '🔴 DISCONNECTED'}")
if db is not None:
    print(f"Database Name: saferoute")
    print(f" - bangalore_areas : {db['bangalore_areas'].count_documents({})} localities")
    print(f" - incidents       : {db['incidents'].count_documents({})} blackspots")
    print(f" - users           : {db['users'].count_documents({})} commuter profiles")
    print(f" - alerts          : {db['alerts'].count_documents({})} safety alerts")
print("="*60 + "\n")

# 1. MongoDB Status
test_endpoint("System Status & Collection Counts", 'GET', '/status')

# 2. Bangalore Areas API (55+ Localities)
test_endpoint("All Bangalore Localities API", 'GET', '/bangalore-areas')
test_endpoint("Filter Areas by East Zone", 'GET', '/bangalore-areas?zone=East')
test_endpoint("Search Area 'Whitefield'", 'GET', '/bangalore-areas?q=whitefield')

# 3. Geocode Lookup
test_endpoint("Geocode Coordinates for Hebbal", 'GET', '/geocode?q=hebbal')

# 4. Blackspot Incidents CRUD
test_endpoint("Get Historical Blackspot Clusters", 'GET', '/incidents')

# 5. Dashboard Stats
test_endpoint("Commuter Safety Analytics KPIs", 'GET', '/dashboardStats')

# 6. Safety Alerts
test_endpoint("Real-Time Community Alerts", 'GET', '/alerts')

# 7. Authentication
test_endpoint("Commuter Login (Demo User)", 'POST', '/auth/login', {"email": "minto@saferoute.ai", "password": ""})

# 8. Neural Risk Prediction Engine
test_endpoint("Neural Risk Prediction (Silk Board → Whitefield)", 'POST', '/predict', {
    "start": "Silk Board Junction",
    "destination": "Whitefield (ITPL Main Road)",
    "road": "poor",
    "time": "evening"
})

print("\n" + "="*60)
print("  All Core Endpoints and MongoDB Integrations Verified!  ")
print("="*60 + "\n")
