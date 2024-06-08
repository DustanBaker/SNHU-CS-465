const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

const tripsList = async () => {
    try {
        const trips = await Model.find({}).exec();
        return trips;
    } catch (err) {
        throw new Error(err.message);
    }
};

const tripsFindByCode = async (req, res) => {
    try {
        const q = await Model.find({ 'code': req.params.tripCode }).exec();
        console.log(q);

        if (!q) {
            return res
                .status(404)
                .json({ error: "No trips found" });
        } else {
            return res
                .status(200)
                .json(q);
        }
    } catch (err) {
        return res
            .status(500)
            .json({ error: err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};
