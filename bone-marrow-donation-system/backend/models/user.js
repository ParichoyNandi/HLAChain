// backend/models/user.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['donor', 'receiver', 'admin'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypt the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('passwordHash')) {
        return next();
    }
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
