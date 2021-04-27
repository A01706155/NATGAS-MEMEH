const express = require('express');
const router = express.Router();
const loginControl = require("../controller/loginControl.js");



router.get('/', loginControl.get);
router.post('/submit', loginControl.post);

module.exports = router;