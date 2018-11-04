const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ Text: 'e-ToDo' });
});

module.exports = router;
