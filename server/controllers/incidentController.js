const Incident = require('../models/Incident');

// @desc    Display all records / filter by category or risk
// @route   GET /api/items  OR  GET /api/incidents
// @access  Public
exports.getAllIncidents = async (req, res) => {
    try {
        const { category, risk, q } = req.query;
        const filter = {};

        // Filter by category or risk (e.g. /api/items?category=Blackspot or ?risk=High)
        if (category) {
            filter.$or = [
                { category: { $regex: category, $options: 'i' } },
                { type: { $regex: category, $options: 'i' } },
                { risk: { $regex: category, $options: 'i' } }
            ];
        }

        if (risk) {
            filter.risk = { $regex: `^${risk}$`, $options: 'i' };
        }

        if (q) {
            filter.$or = [
                { name: { $regex: q, $options: 'i' } },
                { type: { $regex: q, $options: 'i' } }
            ];
        }

        const incidents = await Incident.find(filter).sort({ createdAt: -1 });
        res.status(200).json(incidents);
    } catch (error) {
        console.error('Error fetching incidents:', error);
        res.status(500).json({ success: false, error: 'Server Error: Failed to retrieve records' });
    }
};

// @desc    Display one record by ID
// @route   GET /api/items/:id  OR  GET /api/incidents/:id
// @access  Public
exports.getIncidentById = async (req, res) => {
    try {
        const { id } = req.params;
        let incident = null;

        // Try searching by custom numeric id or by Mongoose _id
        const isNumeric = !isNaN(id);
        if (isNumeric) {
            incident = await Incident.findOne({ id: Number(id) });
        }
        if (!incident && id.match(/^[0-9a-fA-F]{24}$/)) {
            incident = await Incident.findById(id);
        }
        if (!incident) {
            incident = await Incident.findOne({ id: id });
        }

        if (!incident) {
            return res.status(404).json({ success: false, error: `Incident not found with ID ${id}` });
        }

        res.status(200).json(incident);
    } catch (error) {
        console.error('Error fetching incident by ID:', error);
        res.status(500).json({ success: false, error: 'Server Error: Invalid ID format or server failure' });
    }
};

// @desc    Add new record
// @route   POST /api/items  OR  POST /api/incidents
// @access  Public
exports.createIncident = async (req, res) => {
    try {
        const { name, coords, risk, type, road, traffic, accidents, category } = req.body;

        // Input Validation (Step 13)
        if (!name || name.trim() === '') {
            return res.status(400).json({ success: false, error: 'Validation Error: Locality / Incident name is required' });
        }
        if (!coords || !Array.isArray(coords) || coords.length !== 2) {
            return res.status(400).json({ success: false, error: 'Validation Error: Coordinates [lat, lng] are required' });
        }

        const newIncident = await Incident.create({
            id: req.body.id || Date.now(),
            name: name.trim(),
            coords: [Number(coords[0]), Number(coords[1])],
            risk: risk || 'Medium',
            type: type || 'Urban Road Hazard',
            road: road || 'Moderate',
            traffic: traffic || 'Moderate',
            accidents: accidents !== undefined ? Number(accidents) : 0,
            category: category || 'Accident Blackspot'
        });

        res.status(201).json(newIncident);
    } catch (error) {
        console.error('Error creating incident:', error);
        res.status(400).json({ success: false, error: error.message || 'Validation Error' });
    }
};

// @desc    Update record
// @route   PUT /api/items/:id  OR  PUT /api/incidents/:id
// @access  Public
exports.updateIncident = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        let query = {};
        if (!isNaN(id)) {
            query = { $or: [{ id: Number(id) }, { id: id }] };
        } else if (id.match(/^[0-9a-fA-F]{24}$/)) {
            query = { _id: id };
        } else {
            query = { id: id };
        }

        const updatedIncident = await Incident.findOneAndUpdate(query, updateData, {
            new: true,
            runValidators: true
        });

        if (!updatedIncident) {
            return res.status(404).json({ success: false, error: `Cannot update: No incident found with ID ${id}` });
        }

        res.status(200).json(updatedIncident);
    } catch (error) {
        console.error('Error updating incident:', error);
        res.status(400).json({ success: false, error: error.message || 'Update Failed' });
    }
};

// @desc    Delete record
// @route   DELETE /api/items/:id  OR  DELETE /api/incidents/:id
// @access  Public
exports.deleteIncident = async (req, res) => {
    try {
        const { id } = req.params;

        let query = {};
        if (!isNaN(id)) {
            query = { $or: [{ id: Number(id) }, { id: id }] };
        } else if (id.match(/^[0-9a-fA-F]{24}$/)) {
            query = { _id: id };
        } else {
            query = { id: id };
        }

        const deletedIncident = await Incident.findOneAndDelete(query);

        if (!deletedIncident) {
            return res.status(404).json({ success: false, error: `Cannot delete: No incident found with ID ${id}` });
        }

        res.status(200).json({ success: true, message: `Record deleted successfully`, id: id });
    } catch (error) {
        console.error('Error deleting incident:', error);
        res.status(500).json({ success: false, error: 'Server Error: Deletion failed' });
    }
};
