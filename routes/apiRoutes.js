const express = require('express');
const router = express.Router();
const apiKeyAuth = require('../middleware/apiKeyAuth');
const countryService = require('../services/countryService');

router.get('/countries', apiKeyAuth, async (req, res) => {
  try {
    const countries = await countryService.getFilteredCountries();
    res.json(countries);
  } catch (err) {
    console.error('Error fetching countries:', err);
    res.status(500).json({ error: 'Failed to fetch country data' });
  }
});

module.exports = router;
