const express = require('express');
const { getTables, addTable, deleteTable } = require('../controllers/tableController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { availableTable } = require('../controllers/tableController');
const router = express.Router();

router.get('/', getTables);
router.get('/available',availableTable)
router.post('/', protect, adminOnly, addTable);
router.delete('/:id', protect, adminOnly, deleteTable);


module.exports = router;
