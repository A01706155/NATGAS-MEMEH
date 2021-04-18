const express = require('express');
const path = require('path');
const router = express.Router();
const homeControl = require("../controller/homeControl.js");

router.use('/', homeControl.get);

module.exports = router;


