const express = require('express');
const upload  = require('../Middleware/upload');
const { register } = require('../Controllers/user.controller');
const router = express.Router();

router.route('/register').post(upload.single("avatar"),register)

module.exports = router;