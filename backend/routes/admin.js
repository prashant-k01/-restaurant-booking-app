const express = require('express');
const { getAllBookings } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/bookings', protect, adminOnly, getAllBookings);

module.exports = router;
