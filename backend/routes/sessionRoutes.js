const express = require('express');
const router = express.Router();
const { createSession, getSessions, updateSessionStatus } = require('../controllers/sessionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createSession)
  .get(protect, getSessions);

router.route('/:id/status')
  .put(protect, updateSessionStatus);

module.exports = router;
