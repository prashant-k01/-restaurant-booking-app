const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const tableRoutes = require('./routes/tables');
const bookingRoutes = require('./routes/bookings');
const adminRoutes = require('./routes/admin');
const connectDB = require('./config/db');

dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(cors({
    origin:'http://192.168.0.195:3000',
    credentials:true,
    methods:['GET','POST','PUT','DELETE','PATCH'],
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
