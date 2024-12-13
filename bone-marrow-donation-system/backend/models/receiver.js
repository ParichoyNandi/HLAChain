const mongoose = require('mongoose');

// Receiver-Specific Schema
const receiverSchema = new mongoose.Schema({
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
    currentMedicalConditions: [String],
    previousTreatments: [String],
    previousTransplants: [String],
  },
  eligibilityCriteria: {
    age: { type: Number, required: true },
    healthStatus: String,
    infectionsOrDiseases: [String],
    compatibility: {
      hlaCompatibility: String,
      bloodTypeCompatibility: String,
    },
  },
  treatmentHistory: {
    priorTreatments: [String],
    ongoingTherapies: [String],
    bloodTransfusions: Boolean,
    chemotherapy: Boolean,
    radiationTherapy: Boolean,
  },
  psychologicalAssessment: {
    mentalHealth: String,
    informedConsent: Boolean,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Receiver', receiverSchema);
