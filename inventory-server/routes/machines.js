var express = require("express");
const pool = require("../../util/database");
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('lazy boy')
})

module.exports = router