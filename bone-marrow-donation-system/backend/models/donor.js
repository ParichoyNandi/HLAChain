const mongoose = require('mongoose');

// Donor-Specific Schema
const donorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  nationality: { type: String, required: true },
  medicalHistory: {
    bloodType: { type: String, required: true },
    hlaTyping: {
      hlaA: String,
      hlaB: String,
      hlaDR: String,
    },
    generalHealthStatus: String,
    currentMedicalConditions: [String],
    medications: [String],
    surgicalHistory: [String],
    previousDonations: Number,
  },
  eligibilityCriteria: {
    age: { type: Number, required: true },
    height: Number,
    weight: Number,
    healthStatus: String,
    infectionsOrDiseases: [String],
    familyMedicalHistory: [String],
  },
  donationProcess: {
    preferredMethod: { type: String, enum: ['PBSC', 'Bone Marrow Aspiration'] },
    willingnessToDonate: Boolean,
  },
  lifestyle: {
    smoking: Boolean,
    alcohol: Boolean,
    drugUse: Boolean,
    occupationalHazards: String,
    travelHistory: [String],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donor', donorSchema);
