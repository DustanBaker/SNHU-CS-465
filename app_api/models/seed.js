// Bring in the DB connection and the Trip schema
const mongoose = require('mongoose');
const db = require('./db');
const Trip = require('./travlr');

// Read seed data from JSON file
const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('data/trips.json', 'utf8'));

// Delete any existing records, then insert seed data
const seed = async () => {
    try {
        await Trip.deleteMany({});
        await Trip.insertMany(trips);
        console.log('Database seeded successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

seed();
