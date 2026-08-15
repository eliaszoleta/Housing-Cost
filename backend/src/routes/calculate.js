const express = require('express');
const { calculateBuildCost } = require('../services/buildCostEngine');

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const result = calculateBuildCost(req.body || {});
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message || 'Calculation failed.' });
  }
});

module.exports = router;
