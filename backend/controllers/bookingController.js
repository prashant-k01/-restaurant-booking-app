const Booking = require('../models/Booking');
const sendConfirmationEmail = require('../utils/emailService'); // Make sure the path is correct

exports.createBooking = async (req, res) => {
  const { table, date, timeSlot } = req.body;

  try {
    console.log('Booking request data:', { table, date, timeSlot });

    const conflict = await Booking.findOne({ table, date, timeSlot, status: 'booked' });
    if (conflict) {
      console.log('Conflict found for table:', { table, date, timeSlot });
      return res.status(400).json({ message: 'Table already booked at that time' });
    }

    console.log("req.user:", req.user);

    const booking = await Booking.create({
      user: req.user.id,
      table,
      date,
      timeSlot,
      status: 'booked' // ensure status is included
    });

    // Prepare details for email
    const userEmail = req.user.email; // assuming req.user has email
    const bookingDetails = {
      tableNumber: table,
      date,
      time: timeSlot
    };

    await sendConfirmationEmail(userEmail, bookingDetails);

    res.status(201).json(booking);
  } catch (err) {
    console.error("Error occurred:", err.stack);
    res.status(500).json({ message: 'Failed to create booking' });
  }
};

  

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('table');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

exports.cancelBooking = async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking || booking.user.toString() !== req.user.id)
        return res.status(404).json({ message: 'Booking not found or unauthorized' });
  
      booking.status = 'cancelled';
      await booking.save();
      res.json({ message: 'Booking cancelled' });
    } catch (err) {
        console.error("Cancel Booking Error:", err);
      res.status(500).json({ message: 'Failed to cancel booking' });
    }
  };
  