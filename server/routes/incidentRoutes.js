const express = require('express');
const router = express.Router();
const {
    getAllIncidents,
    getIncidentById,
    createIncident,
    updateIncident,
    deleteIncident
} = require('../controllers/incidentController');

// Routes mapped for CRUD operations & filtering (Step 6)
router.route('/')
    .get(getAllIncidents)      // GET /api/items  OR  GET /api/items?category=...
    .post(createIncident);     // POST /api/items

router.route('/:id')
    .get(getIncidentById)      // GET /api/items/:id
    .put(updateIncident)       // PUT /api/items/:id
    .delete(deleteIncident);   // DELETE /api/items/:id

module.exports = router;
