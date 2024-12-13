// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/match'); // Import match routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes); // Use the match routes

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error: ', err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
