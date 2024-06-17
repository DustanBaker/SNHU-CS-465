const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

const tripsList = async (req, res) => {
    try {
        const trips = await Model.find({}).exec();
        res.status(200).json(trips);
    } catch (err) {
        console.error('Error fetching trips:', err); // Log the error
        res.status(500).json({ error: err.message });
    }
};

const tripsFindByCode = async (req, res) => {
    try {
        const q = await Model.findOne({ 'code': req.params.tripCode }).exec(); // Changed to findOne for single result
        console.log('Trip found:', q);

        if (!q) {
            return res.status(404).json({ error: "No trip found" });
        } else {
            return res.status(200).json(q);
        }
    } catch (err) {
        console.error('Error finding trip by code:', err); // Log the error
        return res.status(500).json({ error: err.message });
    }
};

const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description        
        });

        const q = await newTrip.save();
        if (!q) {
            return res.status(404).json({ error: "Trip could not be saved" });
        } else {
            return res.status(201).json(q);
        }
    } catch (err) {
        console.error('Error adding new trip:', err); // Log the error
        res.status(500).json({ error: err.message });
    }
};

const tripsUpdateTrip = async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);

        const q = await Model
            .findOneAndUpdate(
                { 'code': req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                { new: true } // Return the updated document
            )
            .exec();

        if (!q) {
            return res.status(400).json({ error: "No trip found" });
        } else {
            return res.status(200).json(q); // Use status 200 for updates
        }
    } catch (err) {
        console.error('Error updating trip:', err); // Log the error
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
