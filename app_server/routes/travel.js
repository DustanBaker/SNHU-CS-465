var express = require('express');
var router = express.Router();
var controller = require('../controllers/travel');

/* GET travel view */
const travel = async function(req, res, next) {
    // console.log('TRAVEL CONTROLLER BEGIN');
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            // console.log(json);
            let message = null;
            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if (!json.length) {
                    message = 'No trips exist in our database!';
                }
            }
            res.render('travel', { title: 'Travlr Getaways', trips: json, message });
        })
        .catch(err => res.status(500).send(err.message));
    // console.log('TRAVEL CONTROLLER AFTER RENDER');
};

module.exports = {
    travel
};

module.exports = router;
