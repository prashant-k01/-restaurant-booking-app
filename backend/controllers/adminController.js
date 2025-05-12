const Booking = require('../models/Booking');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user table');
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err); 
    res.status(500).json({ message: 'Failed to fetch all bookings' });
  }
};
