const express = require('express')
const pool = require("../util/database");
const { getBrands, postBrand } = require('../controllers/brands');
var router = express.Router();


router.get("/", getBrands);

router.post("/", postBrand);

module.exports = router;
