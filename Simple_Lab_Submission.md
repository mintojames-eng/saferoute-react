# 📋 SafeRoute AI — Lab Submission Summary

**Student Name:** Minto James  
**Project Domain:** SafeRoute AI (Urban Road Safety & Incident Management)  
**Selected Module:** Incident / Blackspot Management (`incidents`)  
**Technology Stack:** React 19, Node.js, Express.js, MongoDB 8.3, Tailwind CSS  
**GitHub Repository:** [https://github.com/mintojames-eng/saferoute-app](https://github.com/mintojames-eng/saferoute-app)  

---

## 1. Project Structure

```text
saferoute-app/
├── client/                     <-- React 19 + Vite + Tailwind CSS + Axios
│   ├── src/
│   │   ├── components/         <-- Navbar, Forms, Map, Incident Cards, Footer
│   │   ├── services/api.js     <-- Axios REST API client
│   │   └── App.jsx
│   └── package.json
│
└── server/                     <-- Node.js + Express + Mongoose (MVC)
    ├── database/db.js          <-- MongoDB connection (Port 27017)
    ├── models/Incident.js      <-- Mongoose Incident Schema
    ├── controllers/            <-- CRUD business logic
    ├── routes/                 <-- Route mapping (/api/items)
    ├── server.js               <-- Express server entrypoint
    ├── test_apis.js            <-- Automated API test script
    └── package.json
```

---

## 2. Database & Collection Details

* **Database Engine:** MongoDB Server v8.3 (Port `27017`)
* **Database Name:** `saferoute`
* **Main Collection:** `incidents`

**Sample Document:**
```json
{
  "_id": "6afa890a4b419f32b603703a",
  "id": 1,
  "name": "Silk Board Junction",
  "coords": [12.9172, 77.6227],
  "risk": "High",
  "type": "Multi-vehicle collision zone",
  "road": "Poor",
  "traffic": "High",
  "accidents": 182
}
```

---

## 3. REST API Endpoints Table (Step 6)

| Method | Endpoint | Purpose | Status Code |
|---|---|---|:---:|
| **GET** | `/api/items` | Display all incident records | `200 OK` |
| **GET** | `/api/items/:id` | Display one specific incident record | `200 OK` |
| **GET** | `/api/items?risk=High` | Filter records (e.g., High risk blackspots) | `200 OK` |
| **POST** | `/api/items` | Add new incident (with input validation) | `201 Created` |
| **PUT** | `/api/items/:id` | Update an existing incident | `200 OK` |
| **DELETE** | `/api/items/:id` | Delete an incident by ID | `200 OK` |
| **GET** | `/status` | MongoDB connection health check | `200 OK` |

---

## 4. How to Run the Project

### Option A: 1-Click Launch (Recommended)
Double-click **`start_all.bat`** in the `saferoute-app` folder.

### Option B: Terminal Commands
1. **Start MongoDB:**  
   Double-click `start_mongodb.bat` *(or run `mongod --dbpath "C:\Users\minto\mongodb_data"`)*
2. **Start Backend Server:**  
   `cd server && npm run dev` *(Running on `http://localhost:5000`)*
3. **Start Frontend Client:**  
   `cd client && npm run dev` *(Running on `http://localhost:5173`)*

---

## 5. API Testing & Verification (Step 8)

Run the automated test script:
```bash
cd server
node test_apis.js
```

**Output:**
```text
✅ [200] GET /status -> Connected: true
✅ [200] GET /api/items -> Total: 19 records
✅ [200] GET /api/items?risk=High -> Filtered: 6 high-risk blackspots
✅ [201] POST /api/items -> Created new record
✅ [200] GET /api/items/:id -> Retrieved record by ID
✅ [200] PUT /api/items/:id -> Updated record
✅ [200] DELETE /api/items/:id -> Record deleted successfully
```

---

## 6. Quick MongoDB Shell Commands (`mongosh`)

```javascript
mongosh
use saferoute
show collections

// 1. Read records
db.incidents.find().limit(2)

// 2. Insert record
db.incidents.insertOne({ name: "Koramangala Sony World", risk: "High", accidents: 45 })

// 3. Update record
db.incidents.updateOne({ name: "Koramangala Sony World" }, { $set: { risk: "Low" } })

// 4. Delete record
db.incidents.deleteOne({ name: "Koramangala Sony World" })
```
