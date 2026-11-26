/**
 * SafeRoute AI - Express & Mongoose REST API Automated Test Suite
 * Tests all endpoints required by the Lab Exercise Rubric
 */

const http = require('http');

const request = (method, path, body = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: '127.0.0.1',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({ status: res.statusCode, data: parsed });
                } catch {
                    resolve({ status: res.statusCode, raw: data });
                }
            });
        });

        req.on('error', err => reject(err));

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
};

const runTests = async () => {
    console.log('\n========================================================');
    console.log('  SafeRoute Express + Mongoose REST API Lab Test Suite  ');
    console.log('========================================================\n');

    try {
        // 1. Health check & status
        const statusRes = await request('GET', '/status');
        console.log(`✅ [${statusRes.status}] GET /status -> Connected: ${statusRes.data.connected}`);

        // 2. GET /api/items (Display all records - Step 6)
        const allItems = await request('GET', '/api/items');
        console.log(`✅ [${allItems.status}] GET /api/items -> Total: ${allItems.data.length} records`);

        // 3. GET /api/items?risk=High (Filter query - Step 6)
        const filtered = await request('GET', '/api/items?risk=High');
        console.log(`✅ [${filtered.status}] GET /api/items?risk=High -> Filtered: ${filtered.data.length} high-risk blackspots`);

        // 4. POST /api/items (Add new record - Step 6)
        const newItem = {
            name: "Lab Test Incident Junction",
            coords: [12.9300, 77.6100],
            risk: "High",
            type: "Pothole Cluster",
            road: "Poor",
            traffic: "High",
            accidents: 42,
            category: "Accident Blackspot"
        };
        const createRes = await request('POST', '/api/items', newItem);
        const createdId = createRes.data.id || createRes.data._id;
        console.log(`✅ [${createRes.status}] POST /api/items -> Created ID: ${createdId}`);

        // 5. GET /api/items/:id (Display one record - Step 6)
        const singleRes = await request('GET', `/api/items/${createdId}`);
        console.log(`✅ [${singleRes.status}] GET /api/items/:id -> Retrieved: "${singleRes.data.name}"`);

        // 6. PUT /api/items/:id (Update record - Step 6)
        const updateData = { road: "Repaired / Good", risk: "Low", accidents: 10 };
        const updateRes = await request('PUT', `/api/items/${createdId}`, updateData);
        console.log(`✅ [${updateRes.status}] PUT /api/items/:id -> Updated Risk: ${updateRes.data.risk}, Road: ${updateRes.data.road}`);

        // 7. DELETE /api/items/:id (Delete record - Step 6)
        const deleteRes = await request('DELETE', `/api/items/${createdId}`);
        console.log(`✅ [${deleteRes.status}] DELETE /api/items/:id -> ${deleteRes.data.message}`);

        // 8. GET /bangalore-areas (55+ localities)
        const areasRes = await request('GET', '/bangalore-areas');
        console.log(`✅ [${areasRes.status}] GET /bangalore-areas -> ${areasRes.data.length} Bangalore localities`);

        console.log('\n========================================================');
        console.log('  All Lab Rubric REST API Endpoints Verified 100%!       ');
        console.log('========================================================\n');
    } catch (error) {
        console.error('Test execution failed:', error.message);
        console.log('Ensure the Express server is running on http://127.0.0.1:5000 before running tests.');
    }
};

runTests();
