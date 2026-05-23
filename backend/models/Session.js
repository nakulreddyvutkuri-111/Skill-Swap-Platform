const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
  meetingLink: { type: String, default: '' },
  notes: { type: String, default: '' }
}, {
  timestamps: true
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
