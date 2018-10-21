'use strict';

let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {
    res.render('firemap');
});

router.get('/data', function(req, res) {
    res.send('../static/data.csv')
})

module.exports = router;