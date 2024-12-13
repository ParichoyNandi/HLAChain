const mongoose = require('mongoose');

// Admin-Specific Schema
const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  loginCredentials: {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  role: { type: String, default: 'admin' },
  permissions: {
    dataAccessLevel: { type: String, enum: ['Read-only', 'Write', 'Full Control'] },
    modulesAccessible: [String],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admin', adminSchema);
