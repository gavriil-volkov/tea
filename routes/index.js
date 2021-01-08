const express = require('express');

const router = express.Router();
const Entry = require('../models/entry.js');

router.get('/', async (req, res) => {
  const cards = await Entry.find();
  res.render('index', { cards });
});

module.exports = router;
