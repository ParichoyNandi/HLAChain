const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor', // Reference to Donor collection
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receiver', // Reference to Receiver collection
    required: true
  },
  matchDate: {
    type: Date,
    default: Date.now // Default to current date if not specified
  },
  status: {
    type: String,
    enum: ['Pending', 'Matched', 'Completed'],
    default: 'Pending' // Default status is 'Pending'
  },
  hlaCompatibility: {
    type: String,
    required: true // Must provide HLA compatibility information
  },
  bloodTypeCompatibility: {
    type: String,
    required: true // Must provide blood type compatibility information
  },
  notes: {
    type: String, // Optional field for additional notes
    default: ''
  }
});

module.exports = mongoose.model('Match', matchSchema);
