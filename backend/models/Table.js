const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  seats: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Table', tableSchema);
