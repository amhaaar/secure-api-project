const express = require('express');
const router = express.Router();
const sessionAuth = require('../middleware/sessionAuth');
const apiKeyService = require('../services/apiKeyService');

router.get('/dashboard', sessionAuth, async (req, res) => {
  const apiKey = await apiKeyService.getUserApiKey(req.session.user.id);
  res.render('dashboard', {
    email: req.session.user.email,
    apiKey: apiKey ? apiKey.key : null,
  });
});

router.post('/api-keys', sessionAuth, async (req, res) => {
  await apiKeyService.generate(req.session.user.id);
  res.redirect('/admin/dashboard');
});

// GET /countries page
router.get('/countries', sessionAuth, (req, res) => {
    res.render('countries');
  });

module.exports = router;

