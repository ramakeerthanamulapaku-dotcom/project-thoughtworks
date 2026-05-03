const express = require('express');
const router = express.Router();
const auth = require('../auth');
const { Land } = require('../models');

// Add Land
router.post('/', auth, async (req, res) => {
    try {
        const newLand = new Land({ ...req.body, owner: req.user.id });
        const savedLand = await newLand.save();
        res.json(savedLand);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get User's Land
router.get('/', auth, async (req, res) => {
    const lands = await Land.find({ owner: req.user.id });
    res.json(lands);
});

module.exports = router;