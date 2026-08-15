const express = require('express');
const {
  STATE_NAMES,
  STATE_MULTIPLIERS,
  QUALITY_TIER_COST_PER_SQFT,
} = require('../config/defaults');

const router = express.Router();

router.get('/', (req, res) => {
  const states = Object.keys(STATE_NAMES).map((code) => {
    const mult = STATE_MULTIPLIERS[code];
    const standard = QUALITY_TIER_COST_PER_SQFT.standard;
    return {
      code,
      name: STATE_NAMES[code],
      multiplier: mult,
      avgCostPerSqftLow: Math.round(standard.low * mult),
      avgCostPerSqftHigh: Math.round(standard.high * mult),
    };
  }).sort((a, b) => a.name.localeCompare(b.name));

  res.json({ success: true, data: states });
});

module.exports = router;
