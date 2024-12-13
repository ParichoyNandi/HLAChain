const mongoose = require('mongoose');

const transactionLogSchema = new mongoose.Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match', // Reference to the Match collection
    required: true
  },
  action: {
    type: String,
    required: true, // Action performed, e.g., 'Create', 'Update'
    enum: ['Create', 'Update', 'Delete', 'Other'] // Define possible actions
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User collection (who performed the action)
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now // Default to current timestamp
  },
  details: {
    type: String, // Optional field for additional details about the action
    default: ''
  }
});

module.exports = mongoose.model('TransactionLog', transactionLogSchema);
