const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    // Check if all required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }
  
    try {
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new user
      const user = await User.create({ name, email, password: hashedPassword });
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: '1h',  // You can adjust the expiration time
      });
  
      // Respond with the token
      res.status(201).json({ token });
  
    } catch (err) {
      // Log the error details for debugging
      console.error(err);
  
      // Respond with a generic error message
      res.status(500).json({ message: 'Server error during registration', error: err.message });
    }
  };

  exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ message: 'Invalid email or password' });
  
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
  
      res.json({ token, isAdmin: user.isAdmin }); // ✅ Include isAdmin in response
    } catch (err) {
      res.status(500).json({ message: 'Server error during login' });
    }
  };
  