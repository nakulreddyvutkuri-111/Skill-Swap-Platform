const Session = require('../models/Session');

// @desc    Create a new session request
// @route   POST /api/sessions
// @access  Private
const createSession = async (req, res) => {
  const { mentorId, skillId, date, notes } = req.body;

  try {
    const session = new Session({
      requesterId: req.user._id,
      mentorId,
      skillId,
      date,
      notes
    });

    const createdSession = await session.save();
    res.status(201).json(createdSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user's sessions (as requester or mentor)
// @route   GET /api/sessions
// @access  Private
const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      $or: [{ requesterId: req.user._id }, { mentorId: req.user._id }]
    })
    .populate('requesterId', 'name profilePhoto')
    .populate('mentorId', 'name profilePhoto')
    .populate('skillId', 'name category');

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update session status (accept, reject, complete)
// @route   PUT /api/sessions/:id/status
// @access  Private
const updateSessionStatus = async (req, res) => {
  const { status, meetingLink } = req.body;

  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Check if user is the mentor or the requester
    if (session.mentorId.toString() !== req.user._id.toString() && session.requesterId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this session' });
    }

    session.status = status;
    if (meetingLink) {
      session.meetingLink = meetingLink;
    }

    const updatedSession = await session.save();
    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSession, getSessions, updateSessionStatus };
