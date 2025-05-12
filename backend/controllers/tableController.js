const Table = require('../models/Table');
const Booking = require('../models/Booking');
const mongoose=require('mongoose')
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tables' });
  }
};

exports.addTable = async (req, res) => {
  const { tableNumber, seats } = req.body;

  try {
    const existing = await Table.findOne({ tableNumber });
    if (existing) return res.status(400).json({ message: 'Table number already exists' });

    const table = new Table({ tableNumber, seats });
    await table.save();
    res.status(201).json(table);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add table' });
  }
};


exports.deleteTable = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid table ID' });
    }
    const existingBooking = await Booking.findOne({ table: id });
    if (existingBooking) {
      return res.status(400).json({ message: 'Table is currently booked and cannot be deleted.' });
    }

    // Find and delete the table by _id
    const table = await Table.findByIdAndDelete(id);

    if (!table) {
      return res.status(404).send({ message: 'Table not found' });
    }

    // Send success response
    res.send({ message: 'Table deleted successfully' });
  } catch (err) {
    console.error('Error during table deletion:', err);  // Log error for debugging
    res.status(500).send({ message: 'Server error during table deletion', error: err.message });
  }
};
// routes/tables.js

exports.availableTable = async (req, res) => {
  const { date, timeSlot } = req.query;

  try {
    // Get all tables
    const tables = await Table.find();

    // Find booked tables for the date and timeSlot
    const bookedTables = await Booking.find({ date, timeSlot }).select("table");

    // Convert to string for comparison
    const bookedTableIds = bookedTables.map(booking => booking.table.toString());

    // Filter available tables
    const availableTables = tables.filter(
      table => !bookedTableIds.includes(table._id.toString())
    );

    res.json(availableTables);
  } catch (err) {
    console.error("Error fetching available tables:", err);
    res.status(500).json({ message: "Failed to fetch available tables" });
  }
};
