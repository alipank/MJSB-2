const express = require('express')
const pool = require("../../util/database");
var router = express.Router();


router.get("/", async function (req, res, next) {
    const sqlQuery = "SELECT id, brand_name FROM machine_brands";

    const brands = await pool.query(sqlQuery);

    res.json(brands);
});

router.post("/", async function (req, res, next) {
    const { brand_name } = req.body;

    const sqlQuery = "INSERT INTO machine_brands (brand_name) VALUES (?)";

    console.log(req.body);

    await pool
        .query(sqlQuery, brand_name)
        .then((success) => {
            console.log(success);
            res.json({
                brand_name: brand_name.toUpperCase(),
            });
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
