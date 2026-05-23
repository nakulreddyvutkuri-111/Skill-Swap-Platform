const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getUserById } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, upload.single('profilePhoto'), updateUserProfile);

router.get('/:id', getUserById);

module.exports = router;
