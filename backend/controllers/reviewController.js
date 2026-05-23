const Review = require('../models/Review');
const Session = require('../models/Session');

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  const { revieweeId, sessionId, rating, comment } = req.body;

  try {
    const session = await Session.findById(sessionId);
    
    if (!session || session.status !== 'completed') {
      return res.status(400).json({ message: 'Can only review completed sessions' });
    }

    const reviewExists = await Review.findOne({
      reviewerId: req.user._id,
      sessionId
    });

    if (reviewExists) {
      return res.status(400).json({ message: 'You have already reviewed this session' });
    }

    const review = new Review({
      reviewerId: req.user._id,
      revieweeId,
      sessionId,
      rating,
      comment
    });

    const createdReview = await review.save();
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get reviews for a user
// @route   GET /api/reviews/user/:userId
// @access  Public
const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ revieweeId: req.params.userId })
      .populate('reviewerId', 'name profilePhoto');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReview, getUserReviews };
