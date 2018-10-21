'use strict';

let express = require('express');
let router = express.Router();
let registerController = require('../controllers/registerController');

router.post('/', registerController.register);

module.exports = router;