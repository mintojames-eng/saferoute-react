const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const incidentRoutes = require('./routes/incidentRoutes');
const Incident = require('./models/Incident');
const BangaloreArea = require('./models/BangaloreArea');
const Alert = require('./models/Alert');

// Load environment variables
dotenv.config();

// Connect to MongoDB Database (Step 5)
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (Step 7: Enable CORS & JSON Body Parsing)
app.use(cors());
app.use(express.json());

// ── REST API ROUTES (Step 6) ──

// 1. Primary CRUD Endpoints (Mapped to /api/items as required by Lab Rubric)
app.use('/api/items', incidentRoutes);

// 2. Domain-Specific Route Aliases
app.use('/api/incidents', incidentRoutes);
app.use('/incidents', incidentRoutes);

// 3. Bangalore Comprehensive Areas API (55+ Localities across 5 Zones)
app.get('/bangalore-areas', async (req, res) => {
    try {
        const { zone, q } = req.query;
        const filter = {};

        if (zone && zone.toLowerCase() !== 'all') {
            filter.zone = { $regex: `^${zone}$`, $options: 'i' };
        }
        if (q) {
            filter.$or = [
                { name: { $regex: q, $options: 'i' } },
                { type: { $regex: q, $options: 'i' } }
            ];
        }

        const areas = await BangaloreArea.find(filter);
        res.status(200).json(areas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Geocode Endpoint
app.get('/geocode', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ error: 'Query parameter q is required' });

        const area = await BangaloreArea.findOne({ name: { $regex: q, $options: 'i' } });
        if (area) return res.status(200).json(area);

        res.status(404).json({ error: `No area matching '${q}' found` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Community Safety Alerts API
app.get('/alerts', async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ createdAt: -1 });
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/alerts/:id/verify', async (req, res) => {
    try {
        const { id } = req.params;
        const { isVerifiedByUser } = req.body;
        const delta = isVerifiedByUser ? 1 : -1;

        const updated = await Alert.findOneAndUpdate(
            { id: id },
            { $inc: { verifiedCount: delta }, $set: { isVerifiedByUser: isVerifiedByUser } },
            { new: true }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6. Dashboard Statistics
app.get('/dashboardStats', (req, res) => {
    res.status(200).json([{
        id: 1,
        totalAccidents: 2481,
        highRiskAreas: 24,
        poorRoadConditions: 31,
        confidenceScore: 78,
        monthlyTrend: [120, 190, 150, 210, 180, 240],
        riskSegments: [25, 45, 30]
    }]);
});

// 7. AI Risk Prediction Engine (Neural Telematics)
app.post('/predict', (req, res) => {
    const { location, destination, start, road_condition, road, time_of_day, time } = req.body;
    const startLoc = start || location || 'Current Location';
    const destLoc = destination || 'Target Destination';
    const roadState = road || road_condition || 'good';
    const timeState = time || time_of_day || 'morning';

    let score = 25;
    const highTrafficZones = ['Silk Board', 'Hebbal', 'Marathahalli', 'KR Puram', 'Electronic City', 'Majestic'];
    const isPeak = highTrafficZones.some(z => startLoc.includes(z) || destLoc.includes(z));

    if (isPeak) score += 25;
    if (timeState === 'evening' || timeState === 'morning') score += 15;
    if (roadState === 'poor') score += 25;
    if (roadState === 'construction') score += 30;

    score = Math.min(Math.max(score, 12), 96);
    const riskLevel = score > 65 ? 'High' : score > 35 ? 'Medium' : 'Low';
    const action = score > 65 ? 'reroute' : score > 35 ? 'suggest_alternative' : 'proceed';

    res.status(200).json({
        risk_score: score,
        risk_label: `${riskLevel} Risk`,
        risk_level: riskLevel,
        action: action,
        recommendation: action === 'reroute'
            ? 'Immediate reroute advised. Avoid Silk Board and take Outer Ring Road.'
            : action === 'suggest_alternative'
                ? 'Consider secondary arterial corridors.'
                : 'Route is safe. Proceed with normal caution.',
        predicted_traffic: isPeak ? 'High Density' : 'Moderate',
        live_weather: 'Clear (26°C)',
        start: startLoc,
        destination: destLoc
    });
});

// 8. System Status & MongoDB Health Check
app.get('/status', async (req, res) => {
    try {
        const incidentsCount = await Incident.countDocuments();
        const areasCount = await BangaloreArea.countDocuments();
        const alertsCount = await Alert.countDocuments();

        res.status(200).json({
            database: 'MongoDB',
            connected: true,
            database_name: 'saferoute',
            counts: {
                incidents: incidentsCount,
                bangalore_areas: areasCount,
                alerts: alertsCount
            }
        });
    } catch (error) {
        res.status(500).json({ connected: false, error: error.message });
    }
});

// 9. Root Landing Page
app.get('/', async (req, res) => {
    try {
        const incidentsCount = await Incident.countDocuments();
        const areasCount = await BangaloreArea.countDocuments();

        res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>SafeRoute AI - Express & Mongoose Server</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; margin: 0; line-height: 1.6; }
                .container { max-width: 780px; margin: 0 auto; background: #1e293b; padding: 36px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.08); }
                h1 { color: #38bdf8; margin-top: 8px; }
                .badge { display: inline-block; background: #10b981; color: white; padding: 4px 12px; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; }
                .links { display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0; }
                .links a { background: #0284c7; color: white; padding: 8px 14px; border-radius: 8px; text-decoration: none; font-size: 0.88rem; font-weight: 500; transition: background 0.2s; }
                .links a:hover { background: #0369a1; }
                .btn-ui { display: block; text-align: center; background: #0891b2; color: white; padding: 14px; border-radius: 10px; font-weight: bold; font-size: 1.05rem; text-decoration: none; margin-top: 20px; box-shadow: 0 4px 15px rgba(8,145,178,0.4); }
                .btn-ui:hover { background: #0e7490; }
                code { background: #334155; padding: 2px 6px; border-radius: 4px; color: #38bdf8; font-size: 0.9em; }
            </style>
        </head>
        <body>
            <div class="container">
                <span class="badge">🍃 Express + Mongoose Connected</span>
                <h1>SafeRoute AI — Node.js & Express REST Server</h1>
                <p>The Express backend is active and listening on port <code>${PORT}</code>.</p>
                <p><strong>Database:</strong> MongoDB <code>saferoute</code> on <code>localhost:27017</code><br>
                <strong>Active Collections:</strong> ${incidentsCount} Incidents (Blackspots), ${areasCount} Bangalore Localities</p>
                
                <h3>Lab Required REST API Endpoints (Step 6):</h3>
                <div class="links">
                    <a href="/api/items" target="_blank">GET /api/items (All Records)</a>
                    <a href="/api/items?category=Blackspot" target="_blank">GET /api/items?category=Blackspot</a>
                    <a href="/api/items?risk=High" target="_blank">GET /api/items?risk=High</a>
                    <a href="/status" target="_blank">GET /status</a>
                    <a href="/bangalore-areas" target="_blank">GET /bangalore-areas</a>
                </div>

                <hr style="border: 0; border-top: 1px solid #334155; margin: 24px 0;">

                <h3>React Client Frontend (Port 5173):</h3>
                <a class="btn-ui" href="http://localhost:5173" target="_blank">Open SafeRoute React UI (http://localhost:5173) &rarr;</a>
            </div>
        </body>
        </html>
        `);
    } catch (e) {
        res.send("SafeRoute Express Server Running");
    }
});

// Start Server (Step 9)
app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  SafeRoute Node.js & Express Server (Port ${PORT})    `);
    console.log(`======================================================`);
    console.log(`Server URL: http://localhost:${PORT}`);
    console.log(`API Root:   http://localhost:${PORT}/api/items`);
    console.log(`Database:   MongoDB (mongodb://localhost:27017/saferoute)`);
    console.log(`======================================================\n`);
});
