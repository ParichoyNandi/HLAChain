// routes/match.js

const express = require('express');
const Match = require('../models/match');
const Donor = require('../models/donor');
const Receiver = require('../models/receiver');
const authMiddleware = require('../middleware/authMiddleware'); // Import the authMiddleware

const router = express.Router();

// Get all matches (requires authentication)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const matches = await Match.find()
            .populate('donorId', 'fullName')
            .populate('receiverId', 'fullName');
        res.status(200).json(matches);
    } catch (err) {
        console.error('Error fetching matches:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Create a new match (requires authentication)
router.post('/', authMiddleware, async (req, res) => {
    const { donorId, receiverId, matchDate, status, hlaCompatibility, bloodTypeCompatibility, notes } = req.body;

    // Validate request body
    if (!donorId || !receiverId) {
        return res.status(400).json({ message: 'Donor and Receiver IDs are required' });
    }

    try {
        // Validate donor and receiver existence
        const donor = await Donor.findById(donorId);
        const receiver = await Receiver.findById(receiverId);

        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }

        if (!receiver) {
            return res.status(404).json({ message: 'Receiver not found' });
        }

        // Create and save the match
        const match = new Match({
            donorId,
            receiverId,
            matchDate,
            status,
            hlaCompatibility,
            bloodTypeCompatibility,
            notes
        });

        await match.save();
        res.status(201).json(match);
    } catch (err) {
        console.error('Error creating match:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update a match (requires authentication)
router.put('/:id', authMiddleware, async (req, res) => {
    const { donorId, receiverId, matchDate, status, hlaCompatibility, bloodTypeCompatibility, notes } = req.body;

    try {
        // Find and update the match
        const match = await Match.findByIdAndUpdate(
            req.params.id,
            { donorId, receiverId, matchDate, status, hlaCompatibility, bloodTypeCompatibility, notes },
            { new: true } // Return the updated match
        );

        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        res.status(200).json(match);
    } catch (err) {
        console.error('Error updating match:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a match (requires authentication)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        // Find and delete the match
        const match = await Match.findByIdAndDelete(req.params.id);

        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        res.status(200).json({ message: 'Match deleted successfully' });
    } catch (err) {
        console.error('Error deleting match:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
