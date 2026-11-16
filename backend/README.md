# SafeRoute AI - Flask & MongoDB Backend

High-performance REST API and Neural Risk Prediction Engine for SafeRoute AI, powered by **Flask** and **MongoDB 8.3**.

## 🚀 Architecture & Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/status` | MongoDB health check & real-time collection count |
| `GET` | `/incidents` | Fetch all historical blackspot incident clusters |
| `POST` | `/incidents` | Create a new road safety incident |
| `PUT` | `/incidents/<id>` | Update an existing incident |
| `DELETE` | `/incidents/<id>` | Delete an incident |
| `GET` | `/dashboardStats` | Real-time commuter safety analytics & KPIs |
| `POST` | `/auth/login` | Commuter authentication & credential check |
| `POST` | `/auth/register` | New driver/commuter registration |
| `GET` / `PUT` | `/users/<id>` | Driver profile, emergency contacts & saved routes |
| `GET` | `/alerts` | Real-time community hazard & flood alerts |
| `POST` | `/alerts` | Report active road hazard / waterlogging |
| `PUT` | `/alerts/<id>/verify`| Upvote / verify community hazard alerts |
| `GET` | `/bangalore-areas` | **All 55 Greater Bangalore Areas** across Central, South, East, North, and West zones (supports `?zone=` and `?q=` filtering) |
| `GET` | `/geocode?q=<area>` | Bangalore coordinate geocoding lookup |
| `POST` | `/predict` | AI Neural Risk Prediction engine + MongoDB audit log |

---

## 🛠️ Setup & Running

### 1. Prerequisites
- **MongoDB Server** running locally on `mongodb://localhost:27017/`
- **Python 3.11+**

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Backend Server
```bash
python app.py
```
Server starts on **http://127.0.0.1:5000** with auto-seeding enabled.

### 4. Run Automated Test Suite
```bash
python test_all_apis.py
```
